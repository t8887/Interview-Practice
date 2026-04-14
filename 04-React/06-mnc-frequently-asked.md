# React — MNC & Product Company Frequently Asked Questions

> Sources: GreatFrontend (100+ React Qs), Glassdoor, GeeksforGeeks, PlainEnglish (Senior React), AmbitionBox
> Companies: Google, Meta, Amazon, Flipkart, Atlassian, Razorpay, Swiggy, CRED, PhonePe, Microsoft

---

## Hooks (Most Asked Category)

### Q1: What are the rules of hooks?
> 1. Only call hooks at the **top level** — never inside loops, conditions, or nested functions
> 2. Only call hooks from **React function components** or **custom hooks**
> Why: React relies on call order to match hooks to state. Conditional calls break this.

### Q2: What is the difference between `useState` and `useReducer`?
> | `useState` | `useReducer` |
> |-----------|-------------|
> | Simple state (primitives, single values) | Complex state (objects, multiple sub-values) |
> | No related state transitions | State transitions depend on previous state |
> | Quick and concise | Predictable with action-based updates |
> **Rule:** If you have `useState` + `useEffect` that updates based on prev state, switch to `useReducer`.

### Q3: Explain `useEffect` cleanup. When does it run?
> **A:** The cleanup function runs:
> 1. **Before the next effect** runs (on re-render with changed deps)
> 2. **On unmount**
> Use for: unsubscribing, clearing timers, aborting fetch requests, removing event listeners
> ```javascript
> useEffect(() => {
>     const controller = new AbortController();
>     fetch('/api', { signal: controller.signal });
>     return () => controller.abort(); // cleanup
> }, [dep]);
> ```
> **Where asked:** Every React interview. Every single one.

### Q4: What is the stale closure problem in hooks?
```javascript
function Counter() {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        const id = setInterval(() => {
            console.log(count); // Always logs 0! (stale closure)
        }, 1000);
        return () => clearInterval(id);
    }, []); // Empty deps = closure captures initial count
}
```
> **Fix:** Use functional updater `setCount(c => c + 1)` or add `count` to deps.
> **Where asked:** Flipkart, Atlassian, Razorpay

### Q5: What is the difference between `useRef` and `useState`?
> | `useRef` | `useState` |
> |---------|-----------|
> | Doesn't trigger re-render | Triggers re-render |
> | Mutable `.current` | Immutable (via setter) |
> | Persists across renders | Persists across renders |
> | For DOM access, timers, previous values | For UI state |

### Q6: When does `useLayoutEffect` run vs `useEffect`?
> - `useLayoutEffect`: runs **synchronously after DOM mutation, before browser paint** (blocking)
> - `useEffect`: runs **asynchronously after paint** (non-blocking)
> Use `useLayoutEffect` for: measuring DOM, preventing visual flicker, tooltip positioning

---

## Rendering & Reconciliation

### Q7: What is the Virtual DOM? How does reconciliation work?
> **A:** VDOM is a lightweight JS representation of the real DOM. On state change:
> 1. React creates new VDOM tree
> 2. **Diffing**: compares new VDOM with old VDOM
> 3. Calculates minimal changes needed
> 4. **Commits** only those changes to real DOM
> **Key heuristics:** Different element types = rebuild subtree. `key` prop identifies list items.
> **Where asked:** Every company. Foundation question.

### Q8: Why are keys important in lists?
> **A:** Keys help React identify which items changed, were added, or removed. Without keys (or with index as key), React may:
> - Reuse wrong component instances
> - Lose component state
> - Create bugs with inputs/animations
> **Rule:** Use stable, unique IDs. Never use array index for dynamic lists.
> **Where asked:** Flipkart, Amazon, PhonePe

### Q9: What is React Fiber? Why was it introduced?
> **A:** Fiber is React's reconciliation engine (React 16+). Key change: rendering work can be **split into chunks** and paused/resumed. Enables:
> - Prioritizing updates (user input > data fetch)
> - Concurrent rendering (React 18)
> - Suspense & lazy loading
> Old engine (Stack) was synchronous — couldn't interrupt rendering.

### Q10: What triggers a re-render in React?
> 1. `setState` / `useState` setter called
> 2. Parent component re-renders (even if props unchanged)
> 3. Context value changes
> 4. `forceUpdate()` (class components)
> **Key insight:** Props changing does NOT trigger re-render; the parent re-rendering does.

---

## Performance & Memoization

### Q11: What is `React.memo`? When to use it?
> **A:** HOC that skips re-render if props haven't changed (shallow comparison).
> ```javascript
> const ExpensiveList = React.memo(({ items }) => {
>     return items.map(item => <Item key={item.id} {...item} />);
> });
> ```
> Use when: component renders often with same props, renders are expensive.
> Don't use: when props always change, cheap renders, premature optimization.

### Q12: `useMemo` vs `useCallback` — what's the difference?
> - `useMemo(() => compute(a, b), [a, b])` — memoizes **return value**
> - `useCallback((x) => doSomething(x, a), [a])` — memoizes **function reference**
> - `useCallback(fn, deps)` === `useMemo(() => fn, deps)`
> **When to use:** `useCallback` when passing callbacks to memoized children. `useMemo` for expensive computations.

### Q13: How do you optimize a large list?
> 1. **Virtualization** — `react-window` / `react-virtuoso` (render only visible items)
> 2. **Pagination** — load chunks
> 3. **Infinite scroll** — Intersection Observer
> 4. `React.memo` on list items
> 5. Stable keys
> **Where asked:** Swiggy, Flipkart, CRED

### Q14: What is code splitting? How to implement in React?
```javascript
const Dashboard = React.lazy(() => import('./Dashboard'));

function App() {
    return (
        <Suspense fallback={<Spinner />}>
            <Dashboard />
        </Suspense>
    );
}
```
> Route-based splitting is most impactful. Use with React Router `lazy()`.

---

## State Management

### Q15: Context API vs Redux — when to use which?
> | Context | Redux |
> |---------|-------|
> | Low-frequency updates (theme, auth, locale) | High-frequency updates |
> | Simple apps | Complex state logic |
> | No middleware needed | Need middleware (thunks, sagas) |
> | Can cause unnecessary re-renders | Selective subscriptions via selectors |
> **Key insight:** Context is NOT a state management tool — it's a dependency injection mechanism. Every consumer re-renders when context value changes.

### Q16: How do you prevent unnecessary re-renders with Context?
> 1. **Split contexts** — separate frequently changing data from stable data
> 2. **Memoize** context value: `useMemo(() => ({ user, theme }), [user, theme])`
> 3. **Move state down** — if only one component needs it, don't put it in context
> 4. Use **selectors** with libraries like `use-context-selector`

### Q17: What is Zustand and when would you pick it over Redux?
> **A:** Minimal state manager with hooks-based API. Pick over Redux when:
> - You want less boilerplate
> - No need for middleware/devtools (though Zustand supports both)
> - Small to medium app
> - Don't need RTK Query for data fetching
> ```javascript
> const useStore = create((set) => ({
>     count: 0,
>     increment: () => set((s) => ({ count: s.count + 1 })),
> }));
> ```

---

## Patterns (Design Round Favorites)

### Q18: Controlled vs Uncontrolled components?
> | Controlled | Uncontrolled |
> |-----------|-------------|
> | React state drives value | DOM holds state |
> | `value` + `onChange` | `ref` to read value |
> | Full control, validation | Quick forms, file inputs |
> **Rule:** Prefer controlled for complex forms. Uncontrolled is fine for simple/one-off inputs.

### Q19: What are Higher-Order Components (HOCs)?
> **A:** Functions that take a component and return an enhanced component.
> ```javascript
> const withAuth = (Component) => (props) => {
>     const isAuth = useAuth();
>     return isAuth ? <Component {...props} /> : <Redirect to="/login" />;
> };
> ```
> Mostly replaced by hooks. Still used in: error boundaries, route guards, analytics wrappers.

### Q20: What are Error Boundaries?
> **A:** Class components that catch JS errors in their child tree. Can't be hooks (yet).
> ```javascript
> class ErrorBoundary extends React.Component {
>     state = { hasError: false };
>     static getDerivedStateFromError(error) { return { hasError: true }; }
>     componentDidCatch(error, info) { logError(error, info); }
>     render() {
>         return this.state.hasError ? <Fallback /> : this.props.children;
>     }
> }
> ```
> **Limitation:** Don't catch errors in event handlers, async code, or server-side rendering.
> **Where asked:** Amazon, Atlassian, Flipkart

### Q21: What are Portals? When to use them?
> **A:** Render children into a DOM node outside the parent hierarchy.
> ```javascript
> createPortal(<Modal />, document.getElementById('modal-root'));
> ```
> Use for: modals, tooltips, dropdowns, toasts — anything that needs to "break out" of overflow/z-index constraints. Events still bubble through React tree (not DOM tree).

---

## React 18+ Features

### Q22: What is automatic batching in React 18?
> **A:** React 18 batches ALL state updates — including those inside `setTimeout`, promises, and native event handlers. Before React 18, only React event handlers were batched.
> ```javascript
> // React 18: ONE re-render (batched)
> setTimeout(() => {
>     setCount(1);
>     setFlag(true);
>     // Only 1 render, not 2
> }, 1000);
> ```

### Q23: What is `useTransition`? When to use it?
> **A:** Marks state updates as **non-urgent**. React can interrupt them to handle urgent updates (typing, clicking) first.
> ```javascript
> const [isPending, startTransition] = useTransition();
> startTransition(() => {
>     setSearchResults(filterLargeList(query));
> });
> ```
> Use for: filtering large lists, tab switches, heavy computations triggered by state.

### Q24: What is Suspense? How does it work with data fetching?
> **A:** Component that shows fallback while children are loading.
> - Works with `React.lazy()` for code splitting
> - Works with data fetching libraries (React Query, Relay) that support Suspense
> - Enables streaming SSR in React 18

### Q25: What is `useDeferredValue`?
> **A:** Defers updating a value until urgent updates are done. Similar to `useTransition` but for values you receive (vs transitions you trigger).
> ```javascript
> const deferredQuery = useDeferredValue(query);
> // deferredQuery lags behind query during heavy renders
> ```

---

## Custom Hooks (Coding Round)

### Q26: Implement `useFetch`
```javascript
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        fetch(url, { signal: controller.signal })
            .then(res => res.json())
            .then(setData)
            .catch(err => {
                if (err.name !== 'AbortError') setError(err);
            })
            .finally(() => setLoading(false));
        return () => controller.abort();
    }, [url]);

    return { data, loading, error };
}
```
> **Where asked:** Flipkart, Swiggy, PhonePe, Razorpay

### Q27: Implement `useDebounce`
```javascript
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
}
```

### Q28: Implement `usePrevious`
```javascript
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => { ref.current = value; });
    return ref.current;
}
```

---

## Tricky Questions

### Q29: Can you use `async` function directly in `useEffect`?
> **No.** `useEffect` must return `undefined` or a cleanup function. `async` returns a Promise.
> ```javascript
> // ❌ Wrong
> useEffect(async () => { await fetch(...) }, []);
>
> // ✅ Correct
> useEffect(() => {
>     const fetchData = async () => { await fetch(...) };
>     fetchData();
> }, []);
> ```

### Q30: What is prop drilling? How to avoid it?
> **A:** Passing props through multiple intermediate components that don't use them. Solutions:
> 1. **Context API** — for widely used data
> 2. **Component composition** — pass children/render props
> 3. **State management** (Redux, Zustand)
> 4. **Custom hooks** — encapsulate data fetching
> Best approach is often **composition** — restructure components so data flows naturally.
