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
