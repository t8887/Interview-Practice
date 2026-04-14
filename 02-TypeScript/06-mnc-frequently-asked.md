# TypeScript — MNC & Product Company Frequently Asked Questions

> Sources: Glassdoor, ZeroToMastery, DEV Community (30 Frontend TS Questions), GreatFrontend, AmbitionBox
> Companies: Google, Microsoft, Amazon, Atlassian, Flipkart, Razorpay, Stripe, CRED

---

## Core Concepts (Warm-up Round)

### Q1: What is TypeScript and why use it over JavaScript?
> **A:** TypeScript is a typed superset of JavaScript that compiles to plain JS. Benefits:
> - Catch errors at compile time instead of runtime
> - Better IDE support (autocomplete, refactoring)
> - Self-documenting code via types
> - Easier large codebase maintenance
> - Interfaces and generics for better abstractions

### Q2: What is the difference between `any`, `unknown`, and `never`?
> | Type | Meaning | Can assign to? | Can call methods? |
> |------|---------|---------------|-------------------|
> | `any` | Opt out of type checking | Anything | Yes (unsafe) |
> | `unknown` | Type-safe "any" | Only after narrowing | No (must check first) |
> | `never` | Impossible/unreachable value | Nothing | N/A |
>
> **Rule:** Use `unknown` over `any` for incoming data. Use `never` for exhaustive checks.

### Q3: What is `type` vs `interface`? When to use which?
> **A:** Both define object shapes. Key differences:
> - **Interface:** declaration merging, `extends`, better for object shapes and class contracts
> - **Type:** unions, intersections, mapped types, conditional types, primitives
> - **Rule of thumb:** Use `interface` for public API/library types, `type` for everything else
> **Where asked:** Every company. #1 most asked TS question.

### Q4: What is `enum` vs `const enum` vs union types?
```typescript
// enum — generates runtime JS object
enum Direction { Up, Down, Left, Right }

// const enum — inlined at compile time, no runtime object
const enum Status { Active = 'active', Inactive = 'inactive' }

// Union type — preferred for string literals
type Color = 'red' | 'green' | 'blue'; // zero runtime cost
```
> **Best practice:** Prefer union types over enums for string constants.

---

## Generics (Most Asked Advanced Topic)

### Q5: Write a generic function that returns the first element of an array
```typescript
function first<T>(arr: T[]): T | undefined {
    return arr[0];
}
```

### Q6: What is a generic constraint? Give an example.
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// Usage
getProperty({ name: 'Alice', age: 30 }, 'name'); // ✅ string
getProperty({ name: 'Alice', age: 30 }, 'email'); // ❌ Error
```
> **Where asked:** Atlassian, Microsoft, Stripe

### Q7: Implement a type-safe `merge` function
```typescript
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}
```

### Q8: What is `infer` keyword? Give a practical example.
```typescript
// Extract return type of a function
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Fn = (x: number) => string;
type Result = GetReturnType<Fn>; // string
```
> **Where asked:** Google, Stripe, senior-level interviews

---

## Utility Types (Coding Round Favorites)

### Q9: Implement `Partial<T>` from scratch
```typescript
type MyPartial<T> = {
    [K in keyof T]?: T[K];
};
```

### Q10: Implement `Pick<T, K>` from scratch
```typescript
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

### Q11: Implement `Omit<T, K>` from scratch
```typescript
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### Q12: Implement `Readonly<T>` from scratch
```typescript
type MyReadonly<T> = {
    readonly [K in keyof T]: T[K];
};
```

### Q13: Implement `DeepPartial<T>`
```typescript
type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
```
> **Where asked:** Atlassian, Razorpay, Amazon

### Q14: What is the difference between `Exclude` and `Omit`?
> - `Exclude<T, U>` works on **union types**: removes members from union
> - `Omit<T, K>` works on **object types**: removes keys from object
> ```typescript
> type A = Exclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'
> type B = Omit<{ a: 1; b: 2; c: 3 }, 'a'>; // { b: 2; c: 3 }
> ```

---

## Type Narrowing & Guards

### Q15: What are the ways to narrow types in TypeScript?
> 1. `typeof` checks
> 2. `instanceof` checks
> 3. `in` operator
> 4. Equality narrowing (`===`, `!==`)
> 5. Truthiness narrowing
> 6. Discriminated unions (tagged unions)
> 7. Custom type guards (`is` keyword)
> 8. Assertion functions (`asserts`)

### Q16: Write a user-defined type guard
```typescript
interface Cat { meow(): void; }
interface Dog { bark(): void; }

function isCat(animal: Cat | Dog): animal is Cat {
    return (animal as Cat).meow !== undefined;
}

function makeSound(animal: Cat | Dog) {
    if (isCat(animal)) {
        animal.meow(); // TypeScript knows it's Cat
    } else {
        animal.bark(); // TypeScript knows it's Dog
    }
}
```
> **Where asked:** Microsoft, Flipkart, Razorpay

### Q17: What is a discriminated union? Show an example.
```typescript
type Shape =
    | { kind: 'circle'; radius: number }
    | { kind: 'rectangle'; width: number; height: number };

function area(shape: Shape): number {
    switch (shape.kind) {
        case 'circle': return Math.PI * shape.radius ** 2;
        case 'rectangle': return shape.width * shape.height;
    }
}
```
> Add exhaustive check with `default: const _exhaustive: never = shape;`

---

## Advanced Types (Senior Level)

### Q18: What are mapped types? Give an example.
```typescript
type Optional<T> = { [K in keyof T]?: T[K] };
type Nullable<T> = { [K in keyof T]: T[K] | null };
type Mutable<T> = { -readonly [K in keyof T]: T[K] };
```

### Q19: What are conditional types?
```typescript
type IsString<T> = T extends string ? 'yes' : 'no';

type A = IsString<string>;  // 'yes'
type B = IsString<number>;  // 'no'
type C = IsString<string | number>; // 'yes' | 'no' (distributive!)
```
> **Key concept:** Conditional types distribute over union types.

### Q20: What are template literal types?
```typescript
type EventName = `on${Capitalize<'click' | 'focus' | 'blur'>}`;
// 'onClick' | 'onFocus' | 'onBlur'

type Getter<T extends string> = `get${Capitalize<T>}`;
type NameGetter = Getter<'name'>; // 'getName'
```

### Q21: What is declaration merging?
```typescript
// Interfaces merge automatically
interface User { name: string; }
interface User { age: number; }
// Result: User has both name and age

// Types CANNOT merge — error on duplicate
```
> This is why libraries use `interface` — consumers can extend them.

### Q22: Explain the `satisfies` operator (TS 4.9+)
```typescript
type Colors = Record<string, [number, number, number] | string>;

const palette = {
    red: [255, 0, 0],
    green: '#00ff00',
} satisfies Colors;

// palette.red is still tuple, not string | tuple
palette.red.map(x => x); // ✅ works — type is preserved
```
> `satisfies` validates against a type WITHOUT widening the inferred type.

---

## Async TypeScript

### Q23: How do you type an async function?
```typescript
async function fetchUser(id: string): Promise<User> {
    const res = await fetch(`/api/users/${id}`);
    return res.json();
}

// Typing callbacks
type AsyncCallback = (id: string) => Promise<void>;
```

### Q24: What is the `Awaited<T>` utility type?
```typescript
type A = Awaited<Promise<string>>;                // string
type B = Awaited<Promise<Promise<number>>>;       // number (unwraps recursively)
type C = Awaited<string | Promise<number>>;       // string | number
```

---

## React + TypeScript (Frontend Rounds)

### Q25: How do you type React component props?
```typescript
// With interface
interface ButtonProps {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => (
    <button onClick={onClick} className={variant}>{label}</button>
);
```

### Q26: Type a custom hook
```typescript
function useToggle(initial: boolean = false): [boolean, () => void] {
    const [value, setValue] = useState(initial);
    const toggle = useCallback(() => setValue(v => !v), []);
    return [value, toggle];
}
```

### Q27: What is the difference between `React.FC` and plain function?
> **A:**
> - `React.FC` implicitly includes `children` prop (pre-React 18) and defines return type
> - Plain function gives you full control over props typing
> - **Modern recommendation:** Skip `React.FC`, type props explicitly

### Q28: How do you type `useRef` for DOM elements?
```typescript
const inputRef = useRef<HTMLInputElement>(null);
// inputRef.current is HTMLInputElement | null
```

---

## Tricky Questions

### Q29: What is the output?
```typescript
type A = string & number; // never (no value can be both)
type B = string | never;  // string (never is absorbed)
type C = string & unknown; // string (unknown is identity for &)
type D = string | unknown; // unknown (unknown absorbs in |)
```

### Q30: Explain `keyof` and `typeof` in TypeScript
```typescript
const config = { host: 'localhost', port: 3000 };

type ConfigType = typeof config; // { host: string; port: number }
type ConfigKeys = keyof typeof config; // 'host' | 'port'
```
> `typeof` extracts type from a value. `keyof` extracts key names as union.
