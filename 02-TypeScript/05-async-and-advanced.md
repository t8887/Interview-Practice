# TypeScript Async Typing & Advanced Patterns — Deep Dive

## Async Typing

### Typing Async Functions
```typescript
// Return type is always Promise<T>
async function fetchUser(id: number): Promise<User> {
    const res = await fetch(`/api/users/${id}`);
    return res.json() as Promise<User>;
}

// Async arrow function
const getUsers = async (): Promise<User[]> => {
    const res = await fetch('/api/users');
    return res.json();
};

// Extracting return type from async function
type UserResult = Awaited<ReturnType<typeof fetchUser>>; // User
```

### Typing Promises
```typescript
// Promise constructor typing
function delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

// Promise.all preserves tuple types
async function fetchAll() {
    const [users, posts, comments] = await Promise.all([
        fetchUsers(),    // Promise<User[]>
        fetchPosts(),    // Promise<Post[]>
        fetchComments(), // Promise<Comment[]>
    ]);
    // users: User[], posts: Post[], comments: Comment[]
}

// Promise.allSettled typing
async function fetchSafe(urls: string[]) {
    const results = await Promise.allSettled(urls.map(url => fetch(url)));
    
    results.forEach(result => {
        if (result.status === 'fulfilled') {
            console.log(result.value); // Response
        } else {
            console.log(result.reason); // any (rejection reason)
        }
    });
}
```

### Typing Callbacks & Event Handlers
```typescript
// Node.js callback pattern
type NodeCallback<T> = (error: Error | null, result?: T) => void;

function readConfig(path: string, cb: NodeCallback<Config>): void {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) return cb(err);
        cb(null, JSON.parse(data));
    });
}

// EventEmitter typing
import { EventEmitter } from 'events';

interface AppEvents {
    'user:created': (user: User) => void;
    'user:deleted': (userId: string) => void;
    'error': (error: Error) => void;
}

class TypedEmitter extends EventEmitter {
    emit<K extends keyof AppEvents>(event: K, ...args: Parameters<AppEvents[K]>): boolean {
        return super.emit(event, ...args);
    }
    
    on<K extends keyof AppEvents>(event: K, listener: AppEvents[K]): this {
        return super.on(event, listener);
    }
}
```

## Advanced Patterns

### Template Literal Types
```typescript
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type APIPath = `/api/v1/${string}`;

type EventName = `${'user' | 'order'}:${'created' | 'updated' | 'deleted'}`;
// "user:created" | "user:updated" | "user:deleted" | "order:created" | ...

// Getter/Setter generation
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface User { name: string; age: number; }
type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; }
```

### Conditional Types
```typescript
// Infer keyword — extract types from other types
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;

type ElementType<T> = T extends (infer E)[] ? E : T;
type A = ElementType<string[]>;  // string
type B = ElementType<number>;    // number

// Distributive conditional types
type ToArray<T> = T extends any ? T[] : never;
type C = ToArray<string | number>; // string[] | number[]

// Non-distributive
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type D = ToArrayNonDist<string | number>; // (string | number)[]
```

### Brand Types (Nominal Typing)
```typescript
// TypeScript is structural — these are the same type:
type UserId = string;
type OrderId = string;
// You can pass a UserId where OrderId is expected!

// Brand types prevent this
type Brand<T, B> = T & { __brand: B };
type UserId = Brand<string, 'UserId'>;
type OrderId = Brand<string, 'OrderId'>;

function getUser(id: UserId): User { /* ... */ }
function getOrder(id: OrderId): Order { /* ... */ }

const userId = 'abc' as UserId;
const orderId = 'xyz' as OrderId;

getUser(userId);   // OK
getUser(orderId);  // Error! OrderId is not assignable to UserId
```

### Builder Pattern with Strict Typing
```typescript
class QueryBuilder<T extends Record<string, any>> {
    private conditions: Partial<T> = {};
    
    where<K extends keyof T>(key: K, value: T[K]): this {
        this.conditions[key] = value;
        return this;
    }
    
    build(): Partial<T> {
        return { ...this.conditions };
    }
}

interface UserFilter {
    name: string;
    age: number;
    active: boolean;
}

const query = new QueryBuilder<UserFilter>()
    .where('name', 'Tyson')  // OK
    .where('age', 25)        // OK
    .where('age', 'twenty'); // Error! 'twenty' is not assignable to number
```

### Strict Function Typing
```typescript
// Function overloads
function createElement(tag: 'input'): HTMLInputElement;
function createElement(tag: 'div'): HTMLDivElement;
function createElement(tag: 'span'): HTMLSpanElement;
function createElement(tag: string): HTMLElement;
function createElement(tag: string): HTMLElement {
    return document.createElement(tag);
}

const input = createElement('input'); // HTMLInputElement
const div = createElement('div');     // HTMLDivElement

// Generic constraints with multiple overloads
function parse(input: string): object;
function parse<T>(input: string, schema: Schema<T>): T;
function parse(input: string, schema?: any) {
    const parsed = JSON.parse(input);
    return schema ? schema.validate(parsed) : parsed;
}
```

### Index Signatures & Record Patterns
```typescript
// Strict index with known keys
interface StrictConfig {
    database: string;
    port: number;
    [key: string]: string | number; // allow additional string/number properties
}

// Discriminated map
type HandlerMap = {
    [K in EventName]: (event: Extract<Event, { type: K }>) => void;
};
```

## tsconfig.json Key Options
```json
{
    "compilerOptions": {
        "strict": true,              // Enable ALL strict checks
        "noImplicitAny": true,       // Error on implicit any
        "strictNullChecks": true,    // null/undefined are distinct types
        "noUnusedLocals": true,      // Error on unused variables
        "noUnusedParameters": true,  // Error on unused function params
        "exactOptionalPropertyTypes": true, // Stricter optional property handling
        "noUncheckedIndexedAccess": true,   // Array access returns T | undefined
        "target": "ES2022",
        "module": "NodeNext",
        "moduleResolution": "NodeNext"
    }
}
```

## Interview Questions

**Q: How do you type a function that can return different types based on input?**
> Function overloads for a few specific cases, or generic with conditional types for dynamic dispatch. Overloads give the best DX for known cases.

**Q: What are branded/nominal types and when would you use them?**
> TypeScript is structural, so `type UserId = string` and `type OrderId = string` are interchangeable. Brand types add a phantom property to make them incompatible. Use them for IDs, currencies, or any domain primitives that should not be mixed.

**Q: How does `strict: true` change TypeScript behavior?**
> It enables all strict type checking: `strictNullChecks` (null/undefined separate), `noImplicitAny`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `noImplicitThis`, `alwaysStrict`. It catches many more bugs at compile time.
