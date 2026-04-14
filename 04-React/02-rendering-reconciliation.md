# React Rendering & Reconciliation — Deep Dive

## How React Renders

### Rendering Pipeline
```
Trigger → Render Phase → Commit Phase → Browser Paint

1. TRIGGER: State change, prop change, parent re-render, context change
2. RENDER PHASE (pure, no side effects):
   - React calls your component function
   - Returns new Virtual DOM (React elements)
   - React diffs old vs new VDOM (reconciliation)
3. COMMIT PHASE:
   - Apply minimal DOM changes
   - Run useLayoutEffect
4. BROWSER PAINT → Run useEffect
```

### What Triggers a Re-render?
```jsx
// 1. setState / setCount
const [count, setCount] = useState(0);
setCount(1); // triggers re-render

// 2. Parent re-renders → children re-render (even if props unchanged!)
function Parent() {
    const [count, setCount] = useState(0);
    return <Child />; // Child re-renders every time Parent re-renders
}

// 3. Context value changes
// Every consumer re-renders when provider value changes

// 4. forceUpdate (class components)
```

### What Does NOT Trigger Re-render
```jsx
// Mutating state directly
const [items, setItems] = useState([1, 2, 3]);
items.push(4);     // ❌ No re-render — same reference
setItems(items);   // ❌ Still same reference!
setItems([...items, 4]); // ✅ New reference → re-renders

// Changing refs
const countRef = useRef(0);
countRef.current++; // ❌ No re-render — refs don't trigger renders
```

## Reconciliation Algorithm (Diffing)

### React's Heuristics
1. **Different element types** → tear down old tree, build new tree
2. **Same element type** → keep DOM node, update changed attributes
3. **Children** → use `key` prop for efficient reordering

### Keys Are Critical
```jsx
// BAD: Using index as key — breaks with reorder/delete
{items.map((item, index) => (
    <Item key={index} data={item} /> // ❌
))}

// GOOD: Stable unique ID
{items.map(item => (
    <Item key={item.id} data={item} /> // ✅
))}

// WHY it matters:
// Without stable keys, React can't match old items to new items
// It may reuse DOM of item A for item B → state leaks, wrong data
```

### How Diffing Works
```
Old Tree:          New Tree:
<div>              <div>
  <A key="1" />      <A key="1" />  ← same key, update
  <B key="2" />      <C key="3" />  ← new key, mount C
  <C key="3" />      <B key="2" />  ← same key, moved
</div>             </div>

React: keeps A, mounts new C, moves B, doesn't recreate them
Without keys: React compares by position → updates all props in-place → broken state
```

## Batching
```jsx
// React 18: ALL state updates are batched (inside and outside events)
function handleClick() {
    setCount(c => c + 1);  // queued
    setFlag(f => !f);       // queued
    setName('Tyson');       // queued
    // → ONE re-render with all three updates
}

// Even in async:
async function handleSubmit() {
    await saveToAPI(data);
    setLoading(false);     // batched in React 18
    setData(newData);      // batched in React 18
    // → ONE re-render
}

// To force synchronous update (rare):
import { flushSync } from 'react-dom';
flushSync(() => setCount(c => c + 1));
// DOM is updated immediately here
```

## Fiber Architecture
```
Fiber = unit of work in React's reconciliation

Before Fiber (React < 16):
- Reconciliation was synchronous and uninterruptible
- Long updates blocked the main thread → janky UI

With Fiber (React 16+):
- Work broken into small units (fibers)
- React can pause, resume, abort reconciliation
- Enables concurrent features (Suspense, transitions)

Each Fiber node represents:
- A component instance
- Links to parent, child, sibling fibers
- Pending props, state, effects
- Priority level
```

## Concurrent Features (React 18)

### useTransition
```jsx
function SearchResults() {
    const [query, setQuery] = useState('');
    const [isPending, startTransition] = useTransition();
    
    function handleChange(e) {
        // HIGH priority: update input immediately
        setQuery(e.target.value);
        
        // LOW priority: update results (can be interrupted)
        startTransition(() => {
            setSearchResults(filterResults(e.target.value));
        });
    }
    
    return (
        <>
            <input value={query} onChange={handleChange} />
            {isPending ? <Spinner /> : <Results data={searchResults} />}
        </>
    );
}
```

### useDeferredValue
```jsx
function SearchResults({ query }) {
    const deferredQuery = useDeferredValue(query);
    
    // deferredQuery lags behind query during fast updates
    // React renders with old value first (instant), then updates with new value
    const results = useMemo(() => filterResults(deferredQuery), [deferredQuery]);
    
    return <ResultList items={results} />;
}
```

### Suspense
```jsx
function App() {
    return (
        <Suspense fallback={<Loading />}>
            <UserProfile />   {/* can "suspend" while loading data */}
        </Suspense>
    );
}

// With React.lazy for code splitting
const Dashboard = React.lazy(() => import('./Dashboard'));

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <Dashboard />
        </Suspense>
    );
}
```

## Interview Questions

**Q: What is Virtual DOM and why does React use it?**
> Virtual DOM is a lightweight JS representation of the real DOM. React creates a new VDOM tree on each render, diffs it against the previous one (reconciliation), and applies only the minimal set of real DOM changes. This is faster than directly manipulating the DOM for complex UIs because DOM operations are expensive.

**Q: Why shouldn't you mutate state directly?**
> React uses reference equality (===) to detect changes. If you mutate an object/array, the reference stays the same, so React thinks nothing changed and skips the re-render. Always create new references.

**Q: How does Fiber improve React's performance?**
> Fiber breaks rendering work into small units that can be paused, resumed, or aborted. This prevents long renders from blocking the main thread, enabling features like concurrent rendering, Suspense, and transitions. High-priority updates (user input) can interrupt low-priority updates (data fetching results).

**Q: When does a child component re-render?**
> Whenever its parent re-renders, regardless of whether props changed. To prevent this, use React.memo (checks props shallowly), or lift state up/down to minimize the re-rendering tree.
