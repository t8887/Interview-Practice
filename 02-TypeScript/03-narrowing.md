# TypeScript Narrowing & Type Guards — Deep Dive

## What is Narrowing?
Narrowing is when TypeScript refines a type to a more specific type within a code block.

## Built-in Narrowing

### typeof Guard
```typescript
function padLeft(value: string | number, padding: string | number): string {
    if (typeof padding === "number") {
        // padding is narrowed to `number`
        return " ".repeat(padding) + value;
    }
    // padding is narrowed to `string`
    return padding + value;
}
```

### Truthiness Narrowing
```typescript
function printName(name: string | null | undefined) {
    if (name) {
        // name is narrowed to `string` (excludes null, undefined, "")
        console.log(name.toUpperCase());
    }
}

// Double-bang for boolean coercion with narrowing
function getLength(arr: string[] | null): number {
    return arr?.length ?? 0;
}
```

### Equality Narrowing
```typescript
function compare(x: string | number, y: string | boolean) {
    if (x === y) {
        // Both are narrowed to `string` (only common type)
        x.toUpperCase();
        y.toLowerCase();
    }
}
```

### instanceof Guard
```typescript
function logError(err: Error | string) {
    if (err instanceof Error) {
        console.log(err.message); // Error type
        console.log(err.stack);
    } else {
        console.log(err); // string type
    }
}
```

### in Operator
```typescript
interface Fish { swim(): void; }
interface Bird { fly(): void; }

function move(animal: Fish | Bird) {
    if ("swim" in animal) {
        animal.swim(); // narrowed to Fish
    } else {
        animal.fly();  // narrowed to Bird
    }
}
```

## Custom Type Guards

### Type Predicate (is)
```typescript
interface User { type: 'user'; name: string; email: string; }
interface Admin { type: 'admin'; name: string; permissions: string[]; }

// Type predicate: return type is `param is Type`
function isAdmin(person: User | Admin): person is Admin {
    return person.type === 'admin';
}

function greet(person: User | Admin) {
    if (isAdmin(person)) {
        console.log(`Admin: ${person.name}, perms: ${person.permissions}`);
    } else {
        console.log(`User: ${person.name}, email: ${person.email}`);
    }
}
```

### Assertion Function
```typescript
function assertDefined<T>(value: T | null | undefined, name: string): asserts value is T {
    if (value === null || value === undefined) {
        throw new Error(`${name} is not defined`);
    }
}

function processUser(user: User | null) {
    assertDefined(user, 'user');
    // After assertion, user is narrowed to User (non-null)
    console.log(user.name);
}
```

## Discriminated Unions (Most Important Pattern)
```typescript
// The shared property (kind/type/status) is the discriminant
type Shape = 
    | { kind: 'circle'; radius: number }
    | { kind: 'rectangle'; width: number; height: number }
    | { kind: 'triangle'; base: number; height: number };

function area(shape: Shape): number {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'rectangle':
            return shape.width * shape.height;
        case 'triangle':
            return 0.5 * shape.base * shape.height;
    }
}

// Exhaustiveness checking with never
function assertNever(x: never): never {
    throw new Error(`Unexpected value: ${x}`);
}

function areaExhaustive(shape: Shape): number {
    switch (shape.kind) {
        case 'circle': return Math.PI * shape.radius ** 2;
        case 'rectangle': return shape.width * shape.height;
        case 'triangle': return 0.5 * shape.base * shape.height;
        default: return assertNever(shape); // compile error if new shape added
    }
}
```

### Real-World: API Response
```typescript
type ApiResult<T> =
    | { status: 'loading' }
    | { status: 'success'; data: T }
    | { status: 'error'; error: string; code: number };

function renderResult<T>(result: ApiResult<T>) {
    switch (result.status) {
        case 'loading':
            return '<Spinner />';
        case 'success':
            return renderData(result.data); // data is available
        case 'error':
            return `Error ${result.code}: ${result.error}`; // error fields available
    }
}
```

### Real-World: Redux Actions
```typescript
type Action =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: User[] }
    | { type: 'FETCH_ERROR'; error: string }
    | { type: 'ADD_USER'; payload: User };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, users: action.payload };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.error };
        case 'ADD_USER':
            return { ...state, users: [...state.users, action.payload] };
    }
}
```

## Control Flow Analysis
```typescript
function example(x: string | number | boolean) {
    if (typeof x === "string") {
        // x is string here
        return x.toUpperCase();
    }
    // x is number | boolean here (string eliminated)
    
    if (typeof x === "number") {
        // x is number here
        return x.toFixed(2);
    }
    // x is boolean here (string and number eliminated)
    return x ? "yes" : "no";
}
```

## Interview Questions

**Q: What is a discriminated union?**
> A union of types that share a common literal type property (the discriminant). TypeScript uses switch/if on that property to narrow to the specific variant. It's the primary pattern for modeling state machines, API responses, and Redux actions in TypeScript.

**Q: What's the difference between `as` (type assertion) and type guards?**
> `as` forces TypeScript to treat a value as a type — no runtime check, can be wrong. Type guards (`typeof`, `instanceof`, `in`, custom `is` predicates) narrow types based on runtime checks — they're safe because the runtime behavior matches the type system.

**Q: How do you ensure exhaustive handling of a union?**
> Use a never check in the default case. If a new variant is added to the union but not handled, TypeScript will error because the value can't be assigned to `never`.
