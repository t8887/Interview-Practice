# TypeScript Utility Types — Deep Dive

## Built-in Utility Types

### Partial<T> — All properties optional
```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

// For update operations — only send changed fields
function updateUser(id: number, updates: Partial<User>): User {
    const existing = getUserById(id);
    return { ...existing, ...updates };
}

updateUser(1, { name: "Tyson" }); // OK — email not required
```

### Required<T> — All properties required
```typescript
interface Config {
    host?: string;
    port?: number;
    debug?: boolean;
}

// Ensure all config is provided after merging defaults
const finalConfig: Required<Config> = {
    host: "localhost",
    port: 3000,
    debug: false
};
```

### Pick<T, K> — Select specific properties
```typescript
type UserPreview = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }

// For API responses — only expose safe fields
type PublicUser = Pick<User, 'id' | 'name'>;
```

### Omit<T, K> — Remove specific properties
```typescript
type CreateUserDTO = Omit<User, 'id'>;
// { name: string; email: string; }

// Remove sensitive fields
type SafeUser = Omit<User, 'password' | 'ssn'>;
```

### Record<K, V> — Map keys to values
```typescript
type Roles = 'admin' | 'user' | 'guest';
type Permissions = Record<Roles, string[]>;

const permissions: Permissions = {
    admin: ['read', 'write', 'delete'],
    user: ['read', 'write'],
    guest: ['read']
};

// Dynamic object typing
type StringMap = Record<string, string>;
type UserMap = Record<number, User>;
```

### Readonly<T> — Immutable properties
```typescript
const config: Readonly<Config> = { host: "localhost", port: 3000 };
config.port = 4000; // Error! Cannot assign to 'port' because it is a read-only property

// Deep readonly (recursive)
type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
```

### Extract<T, U> — Types in T assignable to U
```typescript
type T = Extract<'a' | 'b' | 'c', 'a' | 'f'>; // 'a'

type NumericEvents = Extract<Event, { value: number }>;
```

### Exclude<T, U> — Types in T NOT assignable to U
```typescript
type T = Exclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'

type NonNullableString = Exclude<string | null | undefined, null | undefined>; // string
```

### NonNullable<T> — Remove null and undefined
```typescript
type T = NonNullable<string | null | undefined>; // string
```

### ReturnType<T> — Get function return type
```typescript
function getUser() {
    return { id: 1, name: "Tyson", role: "admin" as const };
}

type User = ReturnType<typeof getUser>;
// { id: number; name: string; role: "admin" }
```

### Parameters<T> — Get function parameter types as tuple
```typescript
function createUser(name: string, age: number, email: string) { /* ... */ }

type CreateUserParams = Parameters<typeof createUser>;
// [string, number, string]
```

### Awaited<T> — Unwrap Promise type
```typescript
type A = Awaited<Promise<string>>;           // string
type B = Awaited<Promise<Promise<number>>>;  // number
```

## Practical Patterns

### API Response Wrapper
```typescript
type ApiResponse<T> = {
    data: T;
    error: null;
    status: 'success';
} | {
    data: null;
    error: string;
    status: 'error';
};

async function fetchUser(id: number): Promise<ApiResponse<User>> {
    try {
        const user = await db.findUser(id);
        return { data: user, error: null, status: 'success' };
    } catch (err) {
        return { data: null, error: err.message, status: 'error' };
    }
}
```

### Form State Types
```typescript
type FormState<T> = {
    values: T;
    errors: Partial<Record<keyof T, string>>;
    touched: Partial<Record<keyof T, boolean>>;
    isSubmitting: boolean;
};

interface LoginForm {
    email: string;
    password: string;
}

const state: FormState<LoginForm> = {
    values: { email: '', password: '' },
    errors: { email: 'Required' },
    touched: { email: true },
    isSubmitting: false,
};
```

### Builder Pattern with Required Fields
```typescript
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>> &
    { [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>> }[Keys];

interface SearchParams {
    query?: string;
    category?: string;
    tag?: string;
}

// Must provide at least one search criterion
type ValidSearch = RequireAtLeastOne<SearchParams, 'query' | 'category' | 'tag'>;
```

## Custom Utility Types
```typescript
// Make specific properties optional
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Make specific properties required
type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Mutable (remove readonly)
type Mutable<T> = { -readonly [K in keyof T]: T[K] };

// Nullable version of all properties
type Nullable<T> = { [K in keyof T]: T[K] | null };

// Get keys of type that match a value type
type KeysOfType<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T];

type StringKeys = KeysOfType<User, string>; // 'name' | 'email'
```

## Interview Tip
When asked about utility types, show you know:
1. **What** each does (Partial, Pick, Omit, Record, etc.)
2. **When** to use them (DTOs, API responses, form state)
3. **How** to compose them for real-world scenarios
4. **How** to build custom utility types using mapped types + conditional types
