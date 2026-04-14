# JavaScript — MNC & Product Company Frequently Asked Questions

> Sources: Glassdoor, AmbitionBox, GreatFrontend, Stackademic, GeeksforGeeks, LinkedIn interview experiences
> Companies: Google, Amazon, Flipkart, Atlassian, Razorpay, CRED, Swiggy, Zerodha, Microsoft, Paytm, PhonePe

---

## Output-Based Questions (Most Repeated Category)

### Q1: What is the output?
```javascript
console.log(typeof null);        // ?
console.log(typeof undefined);   // ?
console.log(null == undefined);  // ?
console.log(null === undefined); // ?
```
> **A:** `"object"`, `"undefined"`, `true`, `false`
> `typeof null` is a famous JS bug (since JS v1). `==` does type coercion, `===` does not.

### Q2: What is the output?
```javascript
console.log(1 + "2" + "2");   // ?
console.log(1 + +"2" + "2");  // ?
console.log("A" - "B" + "2"); // ?
console.log("A" - "B" + 2);   // ?
```
> **A:** `"122"`, `"32"`, `"NaN2"`, `NaN`
> `+` with string = concatenation. `-` always converts to number. `+"2"` is unary plus = `2`.

### Q3: What is the output? (Asked at Flipkart, Razorpay)
```javascript
var a = 1;
function foo() {
    console.log(a); // ?
    var a = 2;
    console.log(a); // ?
}
foo();
```
> **A:** `undefined`, `2`
> `var a` is hoisted to top of function (declaration, not assignment). First log sees hoisted `undefined`.

### Q4: What is the output? (Asked at Google, Amazon)
```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000);
}
```
> **A:** `3, 3, 3` — `var` has function scope, all closures share the same `i` which is `3` after loop.
> **Follow-up: How to fix?** Use `let`, IIFE, or `setTimeout` 3rd arg: `setTimeout(console.log, 1000, i)`

### Q5: What is the output? (Asked at Atlassian)
```javascript
const obj = { a: 1, b: 2, c: 3 };
const { a, ...rest } = obj;
console.log(rest); // ?
```
> **A:** `{ b: 2, c: 3 }` — destructuring with rest collects remaining properties.

### Q6: What is the output?
```javascript
console.log([] == false);   // ?
console.log([] == ![]);     // ?
console.log('' == false);   // ?
console.log(0 == '');       // ?
```
> **A:** `true`, `true`, `true`, `true`
> All due to type coercion. `![]` = `false`, `[]` converts to `""` → `0`, `false` → `0`.

---

## Closures & Scope (Asked at Almost Every Company)

### Q7: Create a function that runs only once
```javascript
function once(fn) {
    let called = false;
    return function (...args) {
        if (!called) {
            called = true;
            return fn.apply(this, args);
        }
    };
}
```
> **Where asked:** Flipkart, Razorpay, PhonePe, Amazon

### Q8: Explain closure with a practical example
> **A:** A closure is a function that remembers variables from its outer (enclosing) scope even after the outer function has returned. Practical uses: data privacy, function factories, event handlers, memoization, module pattern.

### Q9: Implement a counter using closures
```javascript
function createCounter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count,
    };
}
```
> **Where asked:** Swiggy, Paytm, Intuit

### Q10: What is the Temporal Dead Zone (TDZ)?
> **A:** The period between entering a scope and the point where a `let`/`const` variable is declared. Accessing the variable in this zone throws `ReferenceError`. `var` doesn't have TDZ — it's hoisted with `undefined`.

---

## Promises & Async (Top 3 Most Asked Topic)

### Q11: What is the output?
```javascript
console.log('start');
setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('promise'));
console.log('end');
```
> **A:** `start`, `end`, `promise`, `timeout`
> Microtasks (Promises) execute before macrotasks (setTimeout).
> **Where asked:** Every single company. Period.

### Q12: Implement Promise.all from scratch
```javascript
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completed = 0;
        if (promises.length === 0) return resolve([]);
        
        promises.forEach((p, i) => {
            Promise.resolve(p).then(value => {
                results[i] = value;
                completed++;
                if (completed === promises.length) resolve(results);
            }).catch(reject);
        });
    });
}
```
> **Where asked:** Google, Amazon, Flipkart, Atlassian, Microsoft

### Q13: Implement Promise.allSettled from scratch
```javascript
function promiseAllSettled(promises) {
    return Promise.all(
        promises.map(p =>
            Promise.resolve(p)
                .then(value => ({ status: 'fulfilled', value }))
                .catch(reason => ({ status: 'rejected', reason }))
        )
    );
}
```

### Q14: What is the difference between Promise.all, Promise.allSettled, Promise.race, Promise.any?
> | Method | Resolves when... | Rejects when... |
> |--------|-----------------|-----------------|
> | `all` | All resolve | First rejection |
> | `allSettled` | All settle (resolve or reject) | Never rejects |
> | `race` | First to settle (resolve OR reject) | First to settle if it rejects |
> | `any` | First to resolve | All reject (AggregateError) |

### Q15: Implement retry with exponential backoff
```javascript
async function retry(fn, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (err) {
            if (i === retries - 1) throw err;
            await new Promise(r => setTimeout(r, delay * Math.pow(2, i)));
        }
    }
}
```
> **Where asked:** Amazon, Razorpay, Atlassian

---

## `this` Keyword & Binding (Trick Question Favorite)

### Q16: What is the output?
```javascript
const obj = {
    name: 'Alice',
    greet: function () { console.log(this.name); },
    greetArrow: () => { console.log(this.name); },
};
obj.greet();       // ?
obj.greetArrow();  // ?
```
> **A:** `"Alice"`, `undefined`
> Arrow functions don't have their own `this` — they use the enclosing lexical `this` (window/global).

### Q17: What is the output?
```javascript
const obj = {
    name: 'Bob',
    greet() { console.log(this.name); }
};
const fn = obj.greet;
fn(); // ?
```
> **A:** `undefined` (strict mode: `TypeError`). When extracted, `this` is lost.
> **Fix:** `const fn = obj.greet.bind(obj);`

### Q18: Implement Function.prototype.bind polyfill
```javascript
Function.prototype.myBind = function (context, ...args) {
    const fn = this;
    return function (...innerArgs) {
        return fn.apply(context, [...args, ...innerArgs]);
    };
};
```
> **Where asked:** Flipkart, Amazon, Zerodha, PhonePe, Razorpay

---

## Prototypes & Inheritance

### Q19: What is the prototype chain?
> **A:** Every object has `__proto__` pointing to its constructor's `prototype`. When accessing a property, JS walks up the chain: `obj → Object.getPrototypeOf(obj) → ... → Object.prototype → null`.

### Q20: What is the output?
```javascript
function Person(name) { this.name = name; }
Person.prototype.greet = function () { return `Hi, I'm ${this.name}`; };

const p = new Person('Alice');
console.log(p.hasOwnProperty('name'));  // ?
console.log(p.hasOwnProperty('greet')); // ?
```
> **A:** `true`, `false` — `name` is own property, `greet` is on the prototype.

---

## Event Loop & Async Execution (Senior Level Filter)

### Q21: What is the output? (Asked at Google, Flipkart)
```javascript
async function foo() {
    console.log('foo start');
    await bar();
    console.log('foo end');
}

async function bar() {
    console.log('bar');
}

console.log('start');
foo();
console.log('end');
```
> **A:** `start`, `foo start`, `bar`, `end`, `foo end`
> `await` pauses `foo`, schedules rest as microtask. Sync code continues first.

### Q22: What is the output?
```javascript
setTimeout(() => console.log(1), 0);
setImmediate(() => console.log(2));
process.nextTick(() => console.log(3));
Promise.resolve().then(() => console.log(4));
console.log(5);
```
> **A:** `5`, `3`, `4`, `1`, `2` (1 and 2 order may vary in main module)
> **Priority:** Sync → nextTick → Promise → setTimeout → setImmediate

---

## Polyfills (Coding Round Staple)

### Q23: Implement Array.prototype.map polyfill
```javascript
Array.prototype.myMap = function (cb, thisArg) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (i in this) result[i] = cb.call(thisArg, this[i], i, this);
    }
    return result;
};
```
> **Where asked:** Almost every product company in India

### Q24: Implement Array.prototype.reduce polyfill
```javascript
Array.prototype.myReduce = function (cb, initialValue) {
    let acc = initialValue;
    let startIndex = 0;
    if (acc === undefined) {
        acc = this[0];
        startIndex = 1;
    }
    for (let i = startIndex; i < this.length; i++) {
        acc = cb(acc, this[i], i, this);
    }
    return acc;
};
```

### Q25: Implement debounce and throttle
```javascript
// Debounce: wait until user stops calling for `delay` ms
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Throttle: call at most once every `limit` ms
function throttle(fn, limit) {
    let inThrottle = false;
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
```
> **Where asked:** Swiggy, Flipkart, Razorpay, Amazon, Atlassian, CRED

### Q26: Implement Array.prototype.flat (deep flatten)
```javascript
function flatten(arr, depth = 1) {
    return depth > 0
        ? arr.reduce((acc, val) =>
            acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val), [])
        : arr.slice();
}
```

---

## ES6+ Features (Quick Fire)

### Q27: What is the difference between `var`, `let`, and `const`?
> | Feature | `var` | `let` | `const` |
> |---------|-------|-------|---------|
> | Scope | Function | Block | Block |
> | Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
> | Re-declaration | Yes | No | No |
> | Re-assignment | Yes | Yes | No |
> | Global object property | Yes | No | No |

### Q28: What are generators and when would you use them?
> **A:** Functions that can pause/resume execution with `yield`. Use cases: lazy evaluation, infinite sequences, async iteration, custom iterators.

### Q29: What is the difference between `==` and `===`?
> **A:** `==` does type coercion before comparison. `===` checks type AND value without coercion. Always use `===` except when intentionally comparing with `null` (`val == null` catches both `null` and `undefined`).

### Q30: What are WeakMap and WeakSet?
> **A:** Collections that hold "weak" references to objects — they don't prevent garbage collection. Keys in `WeakMap` must be objects. Not iterable. Use cases: storing metadata about objects, private data, DOM node data.

---

## DOM & Browser (Frontend Rounds)

### Q31: What is event delegation? (Asked at Flipkart, Amazon)
> **A:** Attaching a single event listener to a **parent** element instead of multiple children. Works because of event **bubbling**. More memory-efficient, handles dynamically added elements.

### Q32: What is the difference between `stopPropagation()` and `preventDefault()`?
> **A:** `stopPropagation()` stops the event from bubbling up to parent elements. `preventDefault()` stops the default browser action (form submit, link navigation) but event still bubbles.

### Q33: Explain event capturing vs event bubbling
> **A:** **Capturing** (top-down): event goes from `window → document → ... → target`. **Bubbling** (bottom-up): event goes from `target → ... → document → window`. Default is bubbling. Use `addEventListener(event, fn, true)` for capturing.

---

## Miscellaneous Must-Know

### Q34: What is the difference between deep copy and shallow copy?
> **A:** **Shallow copy** copies top-level properties (spread, `Object.assign`). Nested objects are still shared references. **Deep copy** recursively copies everything (`structuredClone()`, `JSON.parse(JSON.stringify(obj))` with caveats).

### Q35: What is currying? Implement a curry function.
```javascript
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function (...args2) {
            return curried.apply(this, [...args, ...args2]);
        };
    };
}
// Usage: curry(add)(1)(2)(3) === 6
```
> **Where asked:** Flipkart, Swiggy, Intuit, Atlassian

### Q36: What is memoization? Implement it.
```javascript
function memoize(fn) {
    const cache = new Map();
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}
```
> **Where asked:** Google, Amazon, Razorpay

### Q37: Implement `pipe` and `compose`
```javascript
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);
```

### Q38: What is the difference between `call`, `apply`, and `bind`?
> **A:** All set `this` context.
> - `call(context, arg1, arg2)` — invokes immediately, args individually
> - `apply(context, [arg1, arg2])` — invokes immediately, args as array
> - `bind(context, arg1)` — returns new function, doesn't invoke immediately

### Q39: What are the different ways to create objects in JavaScript?
> 1. Object literal: `{}`
> 2. `new Object()`
> 3. `Object.create(proto)`
> 4. Constructor function: `new Person()`
> 5. Class: `new class Person {}`
> 6. Factory function

### Q40: Implement `Promise.race` from scratch
```javascript
function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(p => {
            Promise.resolve(p).then(resolve).catch(reject);
        });
    });
}
```
