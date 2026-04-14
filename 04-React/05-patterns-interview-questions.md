# React Patterns & Interview Questions — Comprehensive

## Controlled vs Uncontrolled Components
```jsx
// CONTROLLED — React state is the source of truth
function ControlledForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password }); // Values always available
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            <button disabled={!email || !password}>Submit</button>
        </form>
    );
}

// UNCONTROLLED — DOM is the source of truth
function UncontrolledForm() {
    const emailRef = useRef();
    const passwordRef = useRef();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            email: emailRef.current.value,
            password: passwordRef.current.value
        });
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input ref={emailRef} defaultValue="" />
            <input ref={passwordRef} defaultValue="" type="password" />
            <button>Submit</button>
        </form>
    );
}
```

| Feature | Controlled | Uncontrolled |
|---|---|---|
| Source of truth | React state | DOM |
| Instant validation | ✅ | ❌ |
| Conditional disable | ✅ | ❌ |
| Dynamic inputs | ✅ | ❌ |
| Performance (many fields) | Slower (re-renders) | Faster |
| When to use | Most cases | File inputs, simple forms, performance-critical |

## Higher-Order Components (HOC)
```jsx
// Legacy pattern — still appears in interviews
function withAuth(WrappedComponent) {
    return function AuthenticatedComponent(props) {
        const { user } = useAuth();
        if (!user) return <Navigate to="/login" />;
        return <WrappedComponent {...props} user={user} />;
    };
}

const ProtectedDashboard = withAuth(Dashboard);
```

## Render Props Pattern
```jsx
// Sharing logic via a prop that is a function
function MouseTracker({ render }) {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
        const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);
    
    return render(pos);
}

// Usage
<MouseTracker render={({ x, y }) => <p>Mouse: {x}, {y}</p>} />

// Modern equivalent — custom hook
function useMousePosition() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handler);
        return () => window.removeEventListener('mousemove', handler);
    }, []);
    return pos;
}
```

## Compound Components Pattern
```jsx
// Parent manages shared state, children consume via context
const TabsContext = createContext();

function Tabs({ children, defaultTab }) {
    const [activeTab, setActiveTab] = useState(defaultTab);
    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className="tabs">{children}</div>
        </TabsContext.Provider>
    );
}

Tabs.Tab = function Tab({ id, children }) {
    const { activeTab, setActiveTab } = useContext(TabsContext);
    return (
        <button className={activeTab === id ? 'active' : ''} onClick={() => setActiveTab(id)}>
            {children}
        </button>
    );
};

Tabs.Panel = function Panel({ id, children }) {
    const { activeTab } = useContext(TabsContext);
    return activeTab === id ? <div>{children}</div> : null;
};

// Usage — flexible, declarative
<Tabs defaultTab="profile">
    <Tabs.Tab id="profile">Profile</Tabs.Tab>
    <Tabs.Tab id="settings">Settings</Tabs.Tab>
    <Tabs.Panel id="profile"><ProfilePage /></Tabs.Panel>
    <Tabs.Panel id="settings"><SettingsPage /></Tabs.Panel>
</Tabs>
```

## Error Boundaries
```jsx
class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };
    
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    
    componentDidCatch(error, info) {
        console.error('Error caught:', error, info.componentStack);
        // Send to error tracking service
    }
    
    render() {
        if (this.state.hasError) {
            return this.props.fallback || <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

// Usage
<ErrorBoundary fallback={<ErrorPage />}>
    <Dashboard />
</ErrorBoundary>

// Note: Error boundaries don't catch:
// - Event handlers (use try/catch)
// - Async code (use .catch())
// - Server-side rendering
// - Errors in the boundary itself
```

## Portals
```jsx
import { createPortal } from 'react-dom';

function Modal({ children, onClose }) {
    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}
// Renders outside parent DOM tree but still within React tree (events bubble up)
```

## Custom Hooks (Common Patterns)
```jsx
// useDebounce
function useDebounce(value, delay = 300) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debounced;
}

// useLocalStorage
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch { return initialValue; }
    });
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    
    return [value, setValue];
}

// useOnClickOutside
function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (e) => {
            if (!ref.current || ref.current.contains(e.target)) return;
            handler(e);
        };
        document.addEventListener('mousedown', listener);
        return () => document.removeEventListener('mousedown', listener);
    }, [ref, handler]);
}

// useFetch with abort
function useFetch(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        
        fetch(url, { signal: controller.signal })
            .then(r => r.json())
            .then(setData)
            .catch(e => { if (e.name !== 'AbortError') setError(e); })
            .finally(() => setLoading(false));
        
        return () => controller.abort();
    }, [url]);
    
    return { data, error, loading };
}
```

## React 18+ Features Cheat Sheet

| Feature | Purpose |
|---|---|
| `useTransition` | Mark state update as non-urgent (keep UI responsive) |
| `useDeferredValue` | Defer re-rendering expensive component with new value |
| `Suspense` | Show fallback while async component/data loads |
| `startTransition` | Wrap non-urgent updates outside components |
| `useId` | Generate unique IDs for SSR hydration |
| `useSyncExternalStore` | Subscribe to external stores (Redux, Zustand internals) |

## Top Interview Questions & Answers

**Q: What is the Virtual DOM and why does React use it?**
> A JS object tree mirroring the real DOM. React diffs the new VDOM against the previous, computes minimal changes, and batch-applies them to the real DOM. This is faster than directly manipulating the DOM for complex UIs.

**Q: Explain React's reconciliation algorithm.**
> (1) Different element types → unmount old tree, mount new. (2) Same element type → update props, recurse children. (3) Lists use `key` to match old/new items — stable keys prevent unnecessary unmounts.

**Q: What happens when you call setState?**
> React enqueues a state update, schedules a re-render. In React 18, updates are batched (even in async/timeouts). On re-render, component function runs again with new state, new VDOM is diffed, and real DOM is patched.

**Q: Explain useEffect cleanup.**
> The function returned from useEffect runs: (1) before the effect re-runs (when deps change), and (2) when the component unmounts. Used for: removing event listeners, clearing timers, aborting fetch requests, unsubscribing.

**Q: What are React keys and why are they important?**
> Keys help React identify which list items changed/moved/removed. Without keys (or with index keys), React may re-use DOM nodes incorrectly — causing state bugs (e.g., input values appearing in wrong items). Use stable unique IDs.

**Q: How to prevent unnecessary re-renders?**
> (1) React.memo for pure components. (2) useMemo/useCallback to stabilize props. (3) Split contexts to reduce consumer re-renders. (4) Move state closer to where it's used. (5) Virtualize long lists. (6) Code-split heavy routes.

**Q: What is a React Portal? Use case?**
> Renders children into a different DOM node outside the parent hierarchy, but events still bubble through the React tree. Used for: modals, tooltips, dropdowns that need to escape overflow:hidden or z-index stacking.

**Q: Controlled vs Uncontrolled — which is better?**
> Controlled is the React way — state is predictable, enables validation, conditional rendering. Uncontrolled is simpler for file inputs or when you only need value on submit. Most forms should be controlled (or use React Hook Form which uses uncontrolled internally for performance).

**Q: How do you handle errors in React?**
> (1) Error Boundaries (class components with getDerivedStateFromError) for rendering errors. (2) try/catch in event handlers and async code. (3) Global error handler for uncaught promises. Error boundaries don't catch event handler or async errors.

**Q: What's the difference between useEffect and useLayoutEffect?**
> useEffect fires asynchronously after paint — good for data fetching, subscriptions. useLayoutEffect fires synchronously after DOM mutations but before paint — good for measuring DOM (tooltips, animations) or preventing visual flicker.

**Q: How does React handle forms at scale?**
> React Hook Form (useForm) — uncontrolled internally for performance, validates on blur/submit, minimal re-renders. Alternative: Formik (controlled). For very complex forms, combine with Zod/Yup for schema validation.

## Practice Problems
1. Build a custom `useForm` hook that handles validation
2. Create a reusable Modal component using Portals
3. Implement infinite scroll using Intersection Observer + React Query
4. Build a compound Tab component with keyboard navigation
5. Create a theme switcher with Context + localStorage persistence
