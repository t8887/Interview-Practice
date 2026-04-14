# TypeScript Generics — Deep Dive

## What Are Generics?
Generics let you write reusable code that works with any type while keeping type safety.

```typescript
// Without generics — loses type information
function identity(arg: any): any { return arg; }

// With generics — preserves type
function identity<T>(arg: T): T { return arg; }

const num = identity<number>(42);     // T is number
const str = identity("hello");        // T inferred as string
```

## Generic Functions

### Basic Examples
```typescript
function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
    return arr.map(fn);
}

// Multiple type parameters
function pair<A, B>(first: A, second: B): [A, B] {
    return [first, second];
}

const p = pair("hello", 42); // [string, number]
```

### Constrained Generics
```typescript
// T must have a .length property
function longest<T extends { length: number }>(a: T, b: T): T {
    return a.length >= b.length ? a : b;
}

longest("hello", "world");  // OK
longest([1, 2], [1, 2, 3]); // OK
longest(10, 100);            // Error! number has no .length

// T must be a key of object
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { name: "Tyson", age: 25 };
getProperty(user, "name"); // string
getProperty(user, "foo");  // Error! "foo" is not a key of user
```

## Generic Interfaces & Types
```typescript
// Generic interface
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

interface User { id: number; name: string; }
type UserResponse = ApiResponse<User>;
type UsersResponse = ApiResponse<User[]>;

// Generic type alias
type Result<T, E = Error> = 
    | { success: true; data: T }
    | { success: false; error: E };

function divide(a: number, b: number): Result<number, string> {
    if (b === 0) return { success: false, error: "Division by zero" };
    return { success: true, data: a / b };
}
```

## Generic Classes
```typescript
class Stack<T> {
    private items: T[] = [];
    
    push(item: T): void { this.items.push(item); }
    pop(): T | undefined { return this.items.pop(); }
    peek(): T | undefined { return this.items[this.items.length - 1]; }
    isEmpty(): boolean { return this.items.length === 0; }
}

const numStack = new Stack<number>();
numStack.push(1);
numStack.push("hello"); // Error! Expected number

// Generic repository pattern
class Repository<T extends { id: string }> {
    private items = new Map<string, T>();
    
    create(item: T): T {
        this.items.set(item.id, item);
        return item;
    }
    
    findById(id: string): T | undefined {
        return this.items.get(id);
    }
    
    findAll(): T[] {
        return [...this.items.values()];
    }
    
    delete(id: string): boolean {
        return this.items.delete(id);
    }
}
```

## Advanced Generic Patterns

### Conditional Types with Generics
```typescript
type IsArray<T> = T extends any[] ? "array" : "not array";

type A = IsArray<string[]>;  // "array"
type B = IsArray<number>;    // "not array"

// Practical: extract promise value type
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

type X = Awaited<Promise<Promise<string>>>; // string
```

### Generic Constraints with keyof
```typescript
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>;
    for (const key of keys) {
        result[key] = obj[key];
    }
    return result;
}

const user = { id: 1, name: "Tyson", email: "t@x.com", age: 25 };
const picked = pick(user, ["name", "email"]); // { name: string; email: string }
```

### Mapped Types with Generics
```typescript
type Readonly<T> = { readonly [K in keyof T]: T[K] };
type Partial<T> = { [K in keyof T]?: T[K] };
type Required<T> = { [K in keyof T]-?: T[K] };

// Make specific fields optional
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface User { id: number; name: string; email: string; }
type CreateUserDTO = PartialBy<User, 'id'>; // id becomes optional
```

### Generic Factory Pattern
```typescript
function createFactory<T>(constructor: new (...args: any[]) => T) {
    return (...args: ConstructorParameters<typeof constructor>) => new constructor(...args);
}

class UserEntity {
    constructor(public name: string, public age: number) {}
}

const createUser = createFactory(UserEntity);
const user = createUser("Tyson", 25); // UserEntity
```

## Interview Questions

**Q: What's the difference between `any` and generics?**
> `any` disables type checking entirely — you lose all safety. Generics preserve type information through the function call. `identity<number>(42)` returns `number`, not `any`.

**Q: When would you use a generic constraint?**
> When your generic function needs to access specific properties of the type parameter. Example: `<T extends { id: string }>` ensures T has an id field you can safely access.

**Q: How are generics implemented at runtime?**
> They aren't — generics are erased during compilation. They exist only at the type level. At runtime, `Array<number>` is just `Array`. This is called type erasure.
