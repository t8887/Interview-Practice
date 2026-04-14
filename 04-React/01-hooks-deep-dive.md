# React Hooks — Deep Dive

## useState
```jsx
const [count, setCount] = useState(0);

// Functional update — use when new state depends on previous
setCount(prev => prev + 1); // ✅ correct
setCount(count + 1);         // ⚠️ stale closure risk in async/timeouts

// Lazy initialization — expensive computation only runs once
const [data, setData] = useState(() => computeExpensiveInitialValue());

// State is NOT merged (unlike class this.setState)
const [user, setUser] = useState({ name: '', age: 0 });
setUser(prev => ({ ...prev, name: 'Tyson' })); // must spread manually
```

## useEffect
```jsx
// Runs after every render
useEffect(() => { console.log('render'); });

// Runs once on mount
useEffect(() => { fetchData(); }, []);

// Runs when dependency changes
useEffect(() => { fetchUser(userId); }, [userId]);

// Cleanup function — runs before next effect AND on unmount
useEffect(() => {
    const subscription = subscribe(userId);
    return () => subscription.unsubscribe(); // cleanup
}, [userId]);

// Common pitfall: infinite loop
useEffect(() => {
    setCount(count + 1); // triggers re-render → triggers effect → infinite loop
}, [count]); // DON'T do this
```

### useEffect vs useLayoutEffect
- `useEffect`: runs asynchronously AFTER paint (browser has updated the screen)
- `useLayoutEffect`: runs synchronously BEFORE paint (blocks visual update)
- Use `useLayoutEffect` for: DOM measurements, preventing visual flicker

## useRef
```jsx
// 1. Accessing DOM elements
function TextInput() {
    const inputRef = useRef<HTMLInputElement>(null);
    const focusInput = () => inputRef.current?.focus();
    return <input ref={inputRef} />;
}

// 2. Persisting values across renders WITHOUT causing re-render
function Timer() {
    const intervalRef = useRef<number | null>(null);
    
    useEffect(() => {
        intervalRef.current = window.setInterval(() => { /* tick */ }, 1000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);
}

// 3. Tracking previous value
function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T>();
    useEffect(() => { ref.current = value; });
    return ref.current;
}
```

## useMemo & useCallback
```jsx
// useMemo — memoize expensive computation result
const sortedUsers = useMemo(() => {
    return users.slice().sort((a, b) => a.name.localeCompare(b.name));
}, [users]); // only recompute when users array changes

// useCallback — memoize function reference
const handleClick = useCallback((id: number) => {
    deleteUser(id);
}, [deleteUser]);

// When to use:
// ✅ Expensive computations (useMemo)
// ✅ Passing callbacks to memoized child components (useCallback + React.memo)
// ✅ Dependencies of other hooks
// ❌ Simple computations — overhead of memoization > computation cost
// ❌ Every function — don't prematurely optimize
```

## useReducer
```jsx
type State = { count: number; step: number };
type Action = 
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'setStep'; payload: number }
    | { type: 'reset' };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'increment': return { ...state, count: state.count + state.step };
        case 'decrement': return { ...state, count: state.count - state.step };
        case 'setStep': return { ...state, step: action.payload };
        case 'reset': return { count: 0, step: 1 };
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });
    return (
        <>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        </>
    );
}
// Use when: complex state logic, multiple sub-values, next state depends on previous
```

## useContext
```jsx
interface AuthContextType {
    user: User | null;
    login: (credentials: Credentials) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    
    const login = async (credentials: Credentials) => {
        const user = await authService.login(credentials);
        setUser(user);
    };
    
    const logout = () => { setUser(null); };
    
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook for consuming context
function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
```

## Custom Hooks

### useFetch
```jsx
function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const abortController = new AbortController();
        
        async function fetchData() {
            try {
                setLoading(true);
                const res = await fetch(url, { signal: abortController.signal });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                setData(json);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        }
        
        fetchData();
        return () => abortController.abort();
    }, [url]);
    
    return { data, loading, error };
}
```

### useDebounce
```jsx
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    
    return debouncedValue;
}

// Usage
function SearchInput() {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 300);
    
    useEffect(() => {
        if (debouncedQuery) searchAPI(debouncedQuery);
    }, [debouncedQuery]);
}
```

## Rules of Hooks
1. **Only call at top level** — never inside conditions, loops, or nested functions
2. **Only call from React functions** — components or custom hooks
3. **Custom hooks must start with `use`**

## Interview Questions

**Q: Why can't we call hooks conditionally?**
> React relies on the ORDER of hook calls to match hook state between renders. If hooks are called conditionally, the order might change between renders, corrupting state mapping.

**Q: useState vs useReducer?**
> useState for simple, independent state values. useReducer for complex state with multiple sub-values, when next state depends on previous, or when you want to centralize state logic. useReducer also helps avoid stale closures.

**Q: How do you avoid stale closures in useEffect?**
> Include all dependencies in the dependency array. Use functional updates for setState. Use refs for values that should be current without triggering re-renders.
