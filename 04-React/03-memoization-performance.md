# React Memoization & Performance — Deep Dive

## React.memo
```jsx
// Wraps component — only re-renders if props change (shallow comparison)
const UserCard = React.memo(function UserCard({ user, onDelete }) {
    console.log('UserCard rendered');
    return (
        <div>
            <h2>{user.name}</h2>
            <button onClick={() => onDelete(user.id)}>Delete</button>
        </div>
    );
});

// Custom comparison function
const UserCard = React.memo(
    function UserCard({ user, onDelete }) { /* ... */ },
    (prevProps, nextProps) => {
        // Return true if props are equal (skip re-render)
        return prevProps.user.id === nextProps.user.id &&
               prevProps.user.name === nextProps.user.name;
    }
);
```

### Common Pitfall: Object/Function Props Break Memo
```jsx
function Parent() {
    const [count, setCount] = useState(0);
    
    // ❌ New object reference every render → memo useless
    return <Child style={{ color: 'red' }} onClick={() => doSomething()} />;
    
    // ✅ Memoize the values
    const style = useMemo(() => ({ color: 'red' }), []);
    const handleClick = useCallback(() => doSomething(), []);
    return <Child style={style} onClick={handleClick} />;
}

const Child = React.memo(function Child({ style, onClick }) {
    return <div style={style} onClick={onClick}>Child</div>;
});
```

## useMemo
```jsx
// Memoize expensive computation
function ProductList({ products, filter }) {
    const filteredProducts = useMemo(() => {
        return products.filter(p => p.category === filter)
            .sort((a, b) => a.price - b.price);
    }, [products, filter]);
    
    return filteredProducts.map(p => <Product key={p.id} item={p} />);
}

// Memoize object/array to prevent child re-renders
function Parent() {
    const config = useMemo(() => ({ theme: 'dark', lang: 'en' }), []);
    return <Child config={config} />;
}

// DON'T overuse — adds overhead for simple computations
// ❌ const doubled = useMemo(() => count * 2, [count]);
// ✅ const doubled = count * 2; // simple math, no memo needed
```

## useCallback
```jsx
function TodoList({ todos, onToggle }) {
    // Without useCallback: new function reference every render
    // With useCallback: same reference if dependencies unchanged
    const handleToggle = useCallback((id) => {
        onToggle(id);
    }, [onToggle]);
    
    return todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
    ));
}

const TodoItem = React.memo(function TodoItem({ todo, onToggle }) {
    return (
        <li onClick={() => onToggle(todo.id)}>
            {todo.text}
        </li>
    );
});
```

## When to Optimize (Decision Framework)
```
Is the component re-rendering too often? → Profile first!
│
├── Is there an expensive computation?
│   └── Yes → useMemo
│
├── Is a callback prop causing child re-renders?
│   └── Yes → useCallback + React.memo on child
│
├── Is context causing too many re-renders?
│   └── Yes → Split context, or memoize context value
│
├── Is a large list rendering slowly?
│   └── Yes → Virtualization (react-window / react-virtual)
│
└── Is the initial render slow?
    └── Yes → Code splitting (React.lazy + Suspense)
```

## Virtualization (Long Lists)
```jsx
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
    const Row = ({ index, style }) => (
        <div style={style}>
            {items[index].name}
        </div>
    );
    
    return (
        <FixedSizeList
            height={600}
            width={400}
            itemCount={items.length}
            itemSize={50}
        >
            {Row}
        </FixedSizeList>
    );
}
// Only renders visible items — handles 100k+ items smoothly
```

## Code Splitting
```jsx
// Route-based splitting
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Settings = React.lazy(() => import('./pages/Settings'));

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Suspense>
    );
}
```

## Context Performance
```jsx
// Problem: ANY change to context re-renders ALL consumers
const AppContext = createContext({ user: null, theme: 'light', notifications: [] });

// Solution 1: Split contexts by change frequency
const UserContext = createContext(null);
const ThemeContext = createContext('light');
const NotificationContext = createContext([]);

// Solution 2: Memoize context value
function AppProvider({ children }) {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState('light');
    
    const value = useMemo(() => ({ user, theme, setUser, setTheme }), [user, theme]);
    
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Solution 3: Use selector pattern (with use-context-selector library)
```

## Profiling (React DevTools)
```
1. Open React DevTools → Profiler tab
2. Click "Record" → interact with app → "Stop"
3. Look for:
   - Components that render when they shouldn't
   - Components with long render times
   - Cascading re-renders from context/state changes
4. Use "Why did this render?" to find the trigger
```

## Interview Questions

**Q: When should you use React.memo?**
> When a component re-renders often with the same props (e.g., child of a frequently updating parent), and the render is expensive or has many children. Always profile first — React.memo adds shallow comparison overhead.

**Q: Can you have too much memoization?**
> Yes. useMemo/useCallback have overhead: storing previous values, comparing dependencies. For cheap computations, the memoization cost exceeds the computation cost. Memoize only when profiling shows a bottleneck.

**Q: How do you optimize a list with 10,000 items?**
> Virtualization (react-window or react-virtual) to render only visible items. Use React.memo on list items with stable keys. Memoize filtered/sorted lists with useMemo. Consider pagination as an alternative.
