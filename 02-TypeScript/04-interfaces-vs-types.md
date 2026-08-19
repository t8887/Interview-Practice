---
topic: Interfaces vs Types
level: advanced
status: solid
last_reviewed: 2026-08-19
next_review: 2026-08-20
---

# Interfaces vs Types — Deep Dive

## Quick Decision
- **Interface**: for object shapes, especially when extensibility matters
- **Type**: for unions, intersections, primitives, tuples, mapped types
- **In practice**: both work for most cases. Pick one style for your codebase and be consistent.

## Interface
```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

// Declaration merging (interfaces can be re-opened)
interface User {
    role: string; // adds to the original User interface
}

// Now User has: id, name, email, role

// Extends (inheritance)
interface Admin extends User {
    permissions: string[];
}

// Multiple extends
interface SuperAdmin extends Admin, Auditable {
    canDelete: boolean;
}
```

## Type
```typescript
type User = {
    id: number;
    name: string;
    email: string;
};

// Cannot re-declare — Error: Duplicate identifier
// type User = { role: string; }

// Intersection (composition)
type Admin = User & {
    permissions: string[];
};

// Union types (ONLY types, not interfaces)
type Status = 'active' | 'inactive' | 'banned';
type Result = Success | Failure;

// Primitive types
type ID = string | number;

// Tuple types
type Coordinate = [number, number];
type NameAge = [string, number];

// Conditional types
type IsString<T> = T extends string ? true : false;

// Mapped types
type Flags<T> = { [K in keyof T]: boolean };
```

## Key Differences

| Feature | Interface | Type |
|---------|-----------|------|
| Object shapes | ✅ | ✅ |
| Extends/Inheritance | ✅ extends | ✅ & intersection |
| Declaration merging | ✅ | ❌ |
| Union types | ❌ | ✅ |
| Primitive aliases | ❌ | ✅ |
| Tuple types | ❌ | ✅ |
| Mapped types | ❌ | ✅ |
| Conditional types | ❌ | ✅ |
| implements (class) | ✅ | ✅ |
| Computed properties | ❌ | ✅ |

## When to Use Interface
```typescript
// 1. Object shapes / contracts
interface Repository<T> {
    findById(id: string): Promise<T>;
    findAll(): Promise<T[]>;
    create(item: T): Promise<T>;
    delete(id: string): Promise<void>;
}

// 2. Class implementation
interface Serializable {
    serialize(): string;
    deserialize(data: string): void;
}

class User implements Serializable {
    serialize() { return JSON.stringify(this); }
    deserialize(data: string) { Object.assign(this, JSON.parse(data)); }
}

// 3. Extending third-party types (declaration merging)
// Extend Express Request
declare module 'express' {
    interface Request {
        user?: { id: string; role: string };
        correlationId?: string;
    }
}
```

## When to Use Type
```typescript
// 1. Union types
type Event = 
    | { type: 'click'; x: number; y: number }
    | { type: 'keypress'; key: string }
    | { type: 'scroll'; delta: number };

// 2. Utility compositions
type CreateUserDTO = Omit<User, 'id' | 'createdAt'>;
type UpdateUserDTO = Partial<Pick<User, 'name' | 'email'>>;

// 3. Function types
type Validator<T> = (value: T) => boolean;
type AsyncHandler = (req: Request, res: Response) => Promise<void>;

// 4. Complex mapped types
type EventHandlers<T> = {
    [K in keyof T as `on${Capitalize<string & K>}`]: (value: T[K]) => void;
};

// 5. Template literal types
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = `/${string}`;
type Route = `${HTTPMethod} ${Endpoint}`;
```

## Common Interview Pattern: Both Together
```typescript
// Interface for the shape contracts
interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

interface User extends BaseEntity {
    name: string;
    email: string;
}

// Types for derived/utility types
type CreateUserDTO = Omit<User, keyof BaseEntity>;
type UpdateUserDTO = Partial<CreateUserDTO>;
type UserResponse = Pick<User, 'id' | 'name' | 'email'>;

// Type for unions
type ApiResponse<T> = 
    | { status: 'success'; data: T }
    | { status: 'error'; message: string };
```

## Interview Answer Template
> "I use interfaces for object shapes and class contracts because they support declaration merging and reads clearly as a structural contract. I use types for unions, intersections, utility compositions, and anything that interfaces can't express. In practice, the choice matters less than consistency — pick one convention and stick with it across the codebase."

## Prerequisites
[`02-TypeScript/01-generics.md`](./01-generics.md) (the `Repository<T>` pattern here assumes comfort with generic constraints).

## Related
**High-leverage, currently-missing cross-link:** this file's `declare module 'express'` pattern (§"When to Use Interface", example 3) is the exact fix needed by 3 separate untyped JWT auth-middleware implementations elsewhere in the repo, none of which currently link here: [`03-NodeJS/05-express-design.md`](../03-NodeJS/05-express-design.md), [`07-System-Design/01-auth-caching-api.md`](../07-System-Design/01-auth-caching-api.md), [`07-System-Design/in-depth/05-system-architecture.md`](../07-System-Design/in-depth/05-system-architecture.md) — all three write `req.user = decoded` in plain JavaScript with `req.user`'s type never established. [`02-TypeScript/02-utility-types.md`](./02-utility-types.md) (the `CreateUserDTO`/`UpdateUserDTO` pattern here is the same `Omit`/`Partial` composition taught there in more depth).

## Interview Questions (hardest first)
1. Port one of the repo's plain-JavaScript `authenticate` middlewares to TypeScript using this file's `declare module 'express'` pattern — do it live, not from memory of having done it once.
2. Why can't you re-declare a `type` alias the way you can re-open an `interface` via declaration merging? What's the underlying TS design reason (interfaces are open, types are closed/exact)?
3. Give one example each of something only `interface` can do and something only `type` can do.
4. When would you deliberately use BOTH interface and type together in the same domain model (the "Common Interview Pattern" section) rather than picking one?
5. `ReturnType<T>`/`Parameters<T>` behave unexpectedly on overloaded functions — what do they actually resolve to, and why? (Cross-file gotcha — the answer lives conceptually in `05-async-and-advanced.md`'s function-overloads section, not here; know both.)

## Exercises
1. Port `03-NodeJS/05-express-design.md` or `07-System-Design/01-auth-caching-api.md`'s plain-JS `authenticate` middleware to TypeScript using this file's `declare module 'express'` pattern to properly type `req.user`.
2. Extend the Express `Request` augmentation to also include `correlationId` (used as a bare string elsewhere in the repo) and verify type-checking now catches a missing field.
3. Write the "both together" pattern for a domain object from one of your own project stories — e.g. a `RiskDocument` type for the EY Risk.ai story.

## My Real-World Usage
The `declare module 'express'` pattern is the concrete fix for typing `req.user` across every Express-based auth middleware in this repo's Node.js/System-Design content — a direct, immediately-applicable technique for any of the 4 project-story anchors that touch an authenticated API (UTEC, EY Risk.ai, Vkonnect Health).

## Common Mistakes
- Not knowing declaration merging exists, and instead re-declaring an interface (which silently *extends* it) when the intent was to replace it.
- Using `type` for a class-implementable contract when `interface` reads more idiomatically and supports merging if a third-party type needs augmenting later.
- Forgetting that `ReturnType`/`Parameters` resolve to the *last* overload signature on an overloaded function — a real, commonly-missed gotcha this repo teaches overloads for elsewhere but doesn't cross-link back to this file.
