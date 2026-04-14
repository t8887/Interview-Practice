# RTK Query & Advanced Redux Patterns

> **RTK Query** is Redux Toolkit's built-in data fetching and caching solution. It eliminates the need to write thunks, reducers, and loading state for API calls.

---

## 1. RTK Query — Setup

### Define an API Slice
```ts
// features/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface User {
  id: number;
  name: string;
  email: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['User', 'Post'],
  endpoints: (builder) => ({
    // GET /api/users
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
    // GET /api/users/:id
    getUserById: builder.query<User, number>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    // POST /api/users
    addUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'], // Auto-refetch user lists
    }),
    // PUT /api/users/:id
    updateUser: builder.mutation<User, Partial<User> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
  }),
});

// Auto-generated hooks
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
} = apiSlice;
```

### Add to Store
```ts
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
```

---

## 2. Using RTK Query in Components

### Query (GET)
```tsx
const UsersList = () => {
  const { data: users, isLoading, isError, error, refetch } = useGetUsersQuery();

  if (isLoading) return <Spinner />;
  if (isError) return <Error message={error} />;

  return (
    <ul>
      {users?.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
};
```

### Mutation (POST/PUT/DELETE)
```tsx
const AddUserForm = () => {
  const [addUser, { isLoading }] = useAddUserMutation();

  const handleSubmit = async (userData) => {
    try {
      await addUser(userData).unwrap(); // .unwrap() throws on error
      toast.success('User added!');
    } catch (err) {
      toast.error('Failed to add user');
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
};
```

---

## 3. Cache & Tags System

**Tags** are RTK Query's automatic cache invalidation system:
- `providesTags` — "this query provides data tagged as X"
- `invalidatesTags` — "this mutation invalidates cache tagged as X"

```
getUsers (providesTags: ['User'])
    ↓
addUser (invalidatesTags: ['User'])
    ↓
getUsers automatically refetches!
```

**Interview Q:** *How does RTK Query handle cache invalidation?*
- Tag-based: queries declare what data they provide, mutations declare what they invalidate
- When a mutation invalidates a tag, all queries providing that tag automatically refetch
- Supports granular tags: `[{ type: 'User', id: 5 }]` — only invalidate specific items

---

## 4. Advanced RTK Query Features

### Polling
```tsx
const { data } = useGetUsersQuery(undefined, {
  pollingInterval: 30000, // refetch every 30s
});
```

### Conditional Fetching
```tsx
const { data } = useGetUserByIdQuery(userId, {
  skip: !userId, // don't fetch until userId exists
});
```

### Optimistic Updates
```ts
updateUser: builder.mutation({
  query: ({ id, ...patch }) => ({ url: `/users/${id}`, method: 'PUT', body: patch }),
  async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
    // Optimistically update cache
    const patchResult = dispatch(
      apiSlice.util.updateQueryData('getUsers', undefined, (draft) => {
        const user = draft.find(u => u.id === id);
        if (user) Object.assign(user, patch);
      })
    );
    try {
      await queryFulfilled;
    } catch {
      patchResult.undo(); // Rollback on failure
    }
  },
}),
```

### Transforming Responses
```ts
getUsers: builder.query<User[], void>({
  query: () => '/users',
  transformResponse: (response: { data: User[] }) => response.data,
}),
```

---

## 5. Redux Persist

```ts
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // only persist auth slice
};

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todosReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
```

---

## 6. Redux vs Alternatives — When to Use What

| Tool | Best For | Avoid When |
|------|----------|------------|
| **Redux Toolkit** | Complex global state, many slices, DevTools needed | Simple apps, only server state |
| **RTK Query** | API data fetching + caching | Already using React Query/SWR |
| **React Query / TanStack Query** | Server state only, simpler setup | Need complex client-side state |
| **Zustand** | Lightweight global state, less boilerplate | Need middleware ecosystem, DevTools |
| **Context API** | Theme, locale, auth token (rarely changing) | Frequent updates — causes re-render storms |

---

## 7. Interview Quick-Fire

| Question | Answer |
|----------|--------|
| RTK Query vs React Query? | RTK Query integrates with Redux store/DevTools. React Query is standalone and lighter. Both handle caching, deduplication, refetching. |
| What is `unwrap()` on mutations? | Extracts the fulfilled value or throws the rejected value — enables try/catch pattern. |
| How to handle auth headers in RTK Query? | Use `prepareHeaders` in `fetchBaseQuery` to inject tokens from the store. |
| What is `baseQuery`? | The function RTK Query uses for every request. `fetchBaseQuery` wraps native fetch. You can write custom ones for axios, etc. |
| How does RTK Query deduplicate? | Multiple components using the same query share one request. Data is reference-counted — cached until all subscribers unmount. |
| What are `extraReducers` vs `reducers`? | `reducers` handle actions created by the same slice. `extraReducers` handle actions from other slices or thunks. |
