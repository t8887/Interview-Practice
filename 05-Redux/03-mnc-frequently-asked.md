# Redux & RTK — MNC & Product Company Frequently Asked Questions

> Sources: Glassdoor, GreatFrontend, AmbitionBox, GeeksforGeeks, Stackademic
> Companies: Amazon, Flipkart, Atlassian, Razorpay, Walmart, PhonePe, Swiggy

---

## Core Redux Concepts

### Q1: Explain the three principles of Redux.
> 1. **Single source of truth** — entire app state in one store
> 2. **State is read-only** — only way to change state is dispatching an action
> 3. **Changes via pure functions** — reducers are pure functions `(prevState, action) => newState`

### Q2: What is the Redux data flow?
> **Unidirectional:**
> ```
> UI dispatches Action --> Middleware --> Reducer --> Store (new state) --> UI re-renders
> ```
> 1. User interacts → `dispatch(action)`
> 2. Middleware intercepts (logging, async)
> 3. Reducer computes next state
> 4. Store notifies subscribers
> 5. Connected components re-render

### Q3: Why is immutability important in Redux?
> **A:** Redux uses shallow comparison (`===`) to detect changes. If you mutate state directly:
> - `prevState === nextState` is `true`
> - Redux thinks nothing changed → **no re-render**
> With RTK, `createSlice` uses **Immer** internally, so you can write "mutating" syntax that produces immutable updates.

### Q4: What is the difference between Redux and Context API?
> | Redux | Context API |
> |-------|------------|
> | Full state management | Dependency injection |
> | Middleware support (thunks, sagas) | No middleware |
> | DevTools, time-travel debugging | Limited debugging |
> | Selective re-renders (selectors) | Re-renders ALL consumers |
> | Better for complex, large apps | Better for theme, locale, auth |
> **Where asked:** Almost every React round at MNCs

---

## Redux Toolkit (RTK)

### Q5: Why use Redux Toolkit over plain Redux?
> - **Less boilerplate** — `createSlice` generates action creators + reducers
> - **Immer built-in** — write "mutating" logic safely
> - **configureStore** — sets up Redux DevTools + thunk middleware automatically
> - **createAsyncThunk** — standardized async handling
> - **RTK Query** — built-in data fetching/caching

### Q6: What is `createSlice`? Explain with example.
```javascript
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        increment(state) { state.value += 1; }, // Immer handles immutability
        incrementByAmount(state, action) { state.value += action.payload; },
    },
});

export const { increment, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```
> `createSlice` auto-generates action types as `"counter/increment"` and action creators.

### Q7: What is `createAsyncThunk`? How does it handle loading states?
```javascript
const fetchUsers = createAsyncThunk('users/fetch', async (_, { rejectWithValue }) => {
    try {
        const res = await fetch('/api/users');
        return await res.json();
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

// In slice:
extraReducers: (builder) => {
    builder
        .addCase(fetchUsers.pending, (state) => { state.loading = true; })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
}
```
> **Three lifecycle actions** auto-generated: `pending`, `fulfilled`, `rejected`.
> **Where asked:** Flipkart, Razorpay, Walmart

---

## Middleware

### Q8: What is middleware in Redux? Give examples.
> **A:** Functions that intercept actions between dispatch and reducer. Chain: `dispatch → middleware1 → middleware2 → ... → reducer`.
> - **redux-thunk** — dispatch functions (async logic)
> - **redux-saga** — side effects via generators
> - **redux-logger** — log actions + state changes
> - Custom middleware for analytics, error reporting

### Q9: Write a simple custom middleware.
```javascript
const loggerMiddleware = (store) => (next) => (action) => {
    console.log('Dispatching:', action.type);
    console.log('Prev state:', store.getState());
    const result = next(action); // pass to next middleware/reducer
    console.log('Next state:', store.getState());
    return result;
};
```
> **Signature:** `store => next => action => {}` (curried function)

### Q10: Redux Thunk vs Redux Saga — when to use which?
> | Thunk | Saga |
> |-------|------|
> | Simple async (API calls) | Complex async flows |
> | Functions | Generator functions |
> | Easy to learn | Steeper learning curve |
> | Imperative | Declarative |
> | Use for: most projects | Use for: race conditions, retries, debouncing, websockets |
> **Trend:** Most companies use Thunk (via `createAsyncThunk`). Saga is legacy in many codebases.

---

## RTK Query

### Q11: What is RTK Query? How is it different from React Query?
> **A:** RTK Query is Redux Toolkit's built-in data fetching & caching solution.
> | RTK Query | React Query (TanStack) |
> |-----------|----------------------|
> | Part of Redux ecosystem | Standalone |
> | State lives in Redux store | Own cache |
> | Auto-generates hooks | Auto-generates hooks |
> | Good when already using Redux | Good standalone or with any state mgmt |
> ```javascript
> const api = createApi({
>     baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
>     endpoints: (builder) => ({
>         getUsers: builder.query({ query: () => '/users' }),
>         addUser: builder.mutation({ query: (body) => ({ url: '/users', method: 'POST', body }) }),
>     }),
> });
> export const { useGetUsersQuery, useAddUserMutation } = api;
> ```

### Q12: How does cache invalidation work in RTK Query?
> **A:** Tag-based invalidation:
> ```javascript
> endpoints: (builder) => ({
>     getUsers: builder.query({
>         query: () => '/users',
>         providesTags: ['Users'],
>     }),
>     addUser: builder.mutation({
>         query: (body) => ({ url: '/users', method: 'POST', body }),
>         invalidatesTags: ['Users'], // triggers refetch of getUsers
>     }),
> }),
> ```
> Mutations `invalidatesTags` → queries with matching `providesTags` auto-refetch.

### Q13: What is `baseQuery`? How to add auth headers?
```javascript
const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers;
    },
});
```

---

## Selectors & Performance

### Q14: What are selectors? Why use `createSelector`?
> **A:** Functions that extract specific data from store state.
> ```javascript
> // Simple selector
> const selectUsers = (state) => state.users.list;
>
> // Memoized selector (reselect)
> const selectActiveUsers = createSelector(
>     selectUsers,
>     (users) => users.filter(u => u.active) // only recomputes if users change
> );
> ```
> **Why:** Without memoization, `.filter()` creates new array every render → unnecessary re-renders.
> **Where asked:** Atlassian, Flipkart, Amazon

### Q15: How do you prevent unnecessary re-renders with Redux?
> 1. **Memoized selectors** (`createSelector` from reselect)
> 2. **`useSelector` with shallow equality** — `useSelector(select, shallowEqual)`
> 3. **Normalize state** — flat structure with IDs, not nested arrays
> 4. **Split selectors** — select only what component needs, not entire slice

---

## Architecture & Patterns

### Q16: How do you structure a large Redux application?
> **Feature-based (recommended by RTK):**
> ```
> src/
>   features/
>     auth/
>       authSlice.js
>       authAPI.js
>       Login.jsx
>     users/
>       usersSlice.js
>       usersAPI.js
>       UserList.jsx
>   app/
>     store.js
>     rootReducer.js
> ```
> Colocate slice + components + API per feature.

### Q17: How do you handle optimistic updates in Redux?
```javascript
addUser: builder.mutation({
    query: (newUser) => ({ url: '/users', method: 'POST', body: newUser }),
    async onQueryStarted(newUser, { dispatch, queryFulfilled }) {
        // Optimistic update
        const patch = dispatch(
            api.util.updateQueryData('getUsers', undefined, (draft) => {
                draft.push(newUser);
            })
        );
        try {
            await queryFulfilled;
        } catch {
            patch.undo(); // Rollback on failure
        }
    },
})
```

### Q18: Redux vs Zustand vs Jotai — when to pick what?
> | Redux | Zustand | Jotai |
> |-------|---------|-------|
> | Large apps, teams | Medium apps | Atomic state |
> | Strict patterns | Minimal boilerplate | Bottom-up approach |
> | DevTools, middleware | DevTools support | React-centric |
> | RTK Query for data | Pair with React Query | Pair with React Query |
> **Rule:** Redux if you need a proven ecosystem. Zustand for simplicity. Jotai for granular atom-based state.

---

## Quick Fire (Rapid Round)

### Q19: What is `configureStore` vs `createStore`?
> `configureStore` = RTK's wrapper around `createStore`. Adds: DevTools, thunk middleware, development checks (serializable, immutability). **Always use `configureStore`.**

### Q20: What happens if you dispatch an action with no matching reducer?
> **A:** State is returned unchanged. Reducers must return current state for unknown actions (RTK's `createSlice` handles this automatically via default case).
