# React State Management — Deep Dive

## Local State (useState)
```jsx
// Simple — use for component-scoped state
function Counter() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## Lifting State Up
```jsx
// When siblings need shared state → lift to parent
function Parent() {
    const [filter, setFilter] = useState('all');
    
    return (
        <>
            <FilterBar value={filter} onChange={setFilter} />
            <ProductList filter={filter} />
        </>
    );
}
```

## useReducer (Complex Local State)
```jsx
const initialState = { items: [], loading: false, error: null };

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, items: action.payload };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'ADD_ITEM':
            return { ...state, items: [...state.items, action.payload] };
        case 'DELETE_ITEM':
            return { ...state, items: state.items.filter(i => i.id !== action.payload) };
        default:
            return state;
    }
}

function ItemList() {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        dispatch({ type: 'FETCH_START' });
        fetch('/api/items')
            .then(res => res.json())
            .then(data => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
            .catch(err => dispatch({ type: 'FETCH_ERROR', payload: err.message }));
    }, []);
    
    if (state.loading) return <p>Loading...</p>;
    if (state.error) return <p>Error: {state.error}</p>;
    
    return state.items.map(item => (
        <div key={item.id}>
            {item.name}
            <button onClick={() => dispatch({ type: 'DELETE_ITEM', payload: item.id })}>
                Delete
            </button>
        </div>
    ));
}
```

## Context API
```jsx
// 1. Create context
const AuthContext = createContext(null);

// 2. Provider
function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    
    const login = useCallback(async (email, password) => {
        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        setUser(data.user);
    }, []);
    
    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('token');
    }, []);
    
    const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Custom hook
function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be within AuthProvider');
    return context;
}

// 4. Usage
function Navbar() {
    const { user, logout } = useAuth();
    return user ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>;
}
```

### Context Limitations
```
❌ Not designed for high-frequency updates (every keystroke)
❌ No built-in selector — all consumers re-render on any change
❌ No middleware, devtools, or time-travel debugging
✅ Perfect for: theme, auth, locale, feature flags (infrequent changes)
```

## Redux Toolkit (Global State)
```jsx
// store/todosSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk('todos/fetch', async () => {
    const res = await fetch('/api/todos');
    return res.json();
});

const todosSlice = createSlice({
    name: 'todos',
    initialState: { items: [], loading: false, error: null },
    reducers: {
        addTodo: (state, action) => {
            state.items.push(action.payload); // Immer allows "mutation"
        },
        toggleTodo: (state, action) => {
            const todo = state.items.find(t => t.id === action.payload);
            if (todo) todo.completed = !todo.completed;
        },
        removeTodo: (state, action) => {
            state.items = state.items.filter(t => t.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => { state.loading = true; })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;

// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';

export const store = configureStore({
    reducer: { todos: todosReducer },
});

// Component usage
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, fetchTodos } from './store/todosSlice';

function TodoList() {
    const { items, loading } = useSelector(state => state.todos);
    const dispatch = useDispatch();
    
    useEffect(() => { dispatch(fetchTodos()); }, [dispatch]);
    
    return items.map(todo => (
        <div key={todo.id} onClick={() => dispatch(toggleTodo(todo.id))}>
            {todo.completed ? '✅' : '⬜'} {todo.text}
        </div>
    ));
}
```

## Zustand (Lightweight Alternative)
```jsx
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useStore = create(
    devtools(
        persist(
            (set, get) => ({
                todos: [],
                filter: 'all',
                
                addTodo: (text) => set(state => ({
                    todos: [...state.todos, { id: Date.now(), text, completed: false }]
                })),
                
                toggleTodo: (id) => set(state => ({
                    todos: state.todos.map(t =>
                        t.id === id ? { ...t, completed: !t.completed } : t
                    )
                })),
                
                setFilter: (filter) => set({ filter }),
                
                // Derived / computed
                get filteredTodos() {
                    const { todos, filter } = get();
                    if (filter === 'completed') return todos.filter(t => t.completed);
                    if (filter === 'active') return todos.filter(t => !t.completed);
                    return todos;
                },
                
                // Async actions — no middleware needed
                fetchTodos: async () => {
                    const res = await fetch('/api/todos');
                    const data = await res.json();
                    set({ todos: data });
                },
            }),
            { name: 'todo-storage' } // localStorage key
        )
    )
);

// Usage — no Provider needed!
function TodoList() {
    const todos = useStore(state => state.todos); // auto-selects, minimal re-renders
    const toggleTodo = useStore(state => state.toggleTodo);
    
    return todos.map(todo => (
        <div key={todo.id} onClick={() => toggleTodo(todo.id)}>
            {todo.text}
        </div>
    ));
}
```

## React Query / TanStack Query (Server State)
```jsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function TodoList() {
    const queryClient = useQueryClient();
    
    // Fetch
    const { data: todos, isLoading, error } = useQuery({
        queryKey: ['todos'],
        queryFn: () => fetch('/api/todos').then(r => r.json()),
        staleTime: 5 * 60 * 1000, // 5 min before refetch
    });
    
    // Mutate with optimistic update
    const deleteMutation = useMutation({
        mutationFn: (id) => fetch(`/api/todos/${id}`, { method: 'DELETE' }),
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['todos'] });
            const previous = queryClient.getQueryData(['todos']);
            queryClient.setQueryData(['todos'], old => old.filter(t => t.id !== id));
            return { previous };
        },
        onError: (err, id, context) => {
            queryClient.setQueryData(['todos'], context.previous);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });
    
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    return todos.map(todo => (
        <div key={todo.id}>
            {todo.text}
            <button onClick={() => deleteMutation.mutate(todo.id)}>Delete</button>
        </div>
    ));
}
```

## Decision Matrix: Which to Use?

| Scenario | Solution |
|---|---|
| Simple ephemeral UI state | `useState` |
| Complex state with many transitions | `useReducer` |
| State shared between siblings | Lift state up |
| App-wide infrequent changes (theme, auth) | Context API |
| App-wide frequent changes, large state | Redux Toolkit or Zustand |
| Server/API state (caching, refetch) | TanStack Query / SWR |
| Minimal bundle, simple global state | Zustand |
| Team with Redux experience, large app | Redux Toolkit |

## Interview Questions

**Q: Context API vs Redux — when to use which?**
> Context is for low-frequency, app-wide values (theme, auth, locale). Redux is for complex state with frequent updates, middleware needs (logging, persistence), time-travel debugging, or when multiple slices interact.

**Q: What is Zustand's advantage over Redux?**
> Minimal boilerplate — no Provider, no action creators, no switch statements. Selectors are automatic. Built-in middleware (devtools, persist). ~1KB bundle. Async actions are just functions, no thunks/sagas.

**Q: How does TanStack Query differ from Redux for API data?**
> TanStack Query manages server state with automatic caching, background refetching, stale-while-revalidate, pagination, and optimistic updates — all built-in. Redux would require manually implementing all of these for API data.

**Q: What is prop drilling and how do you solve it?**
> Passing props through many intermediate components that don't use them. Solutions: Context API, composition (render props / children), state management library, or component composition where you pass pre-built elements down.
