# JS-Specific Puzzles — Gold for Frontend + Fullstack Interviews

> These are asked at Razorpay, Swiggy, Flipkart, Meesho, Cred, Atlassian, etc.
> You WILL get 1-3 of these in every frontend/fullstack round.

---

## CLOSURES & SCOPE

### 1. Counter Using Closure
```javascript
function createCounter(initial = 0) {
    let count = initial;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count,
        reset: () => { count = initial; return count; }
    };
}

const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.increment()); // 12
console.log(counter.getCount());  // 12
console.log(counter.reset());     // 10

// Classic interview trap:
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100); // 3, 3, 3 (var is function-scoped)
}
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100); // 0, 1, 2 (let is block-scoped)
}
// Fix with closure:
for (var i = 0; i < 3; i++) {
    ((j) => {
        setTimeout(() => console.log(j), 100); // 0, 1, 2
    })(i);
}
```

### 2. Once Function (Runs Only Once)
```javascript
function once(fn) {
    let called = false;
    let result;
    return function (...args) {
        if (!called) {
            called = true;
            result = fn.apply(this, args);
        }
        return result;
    };
}

const initDB = once(() => {
    console.log('Connecting to DB...');
    return { connected: true };
});

initDB(); // "Connecting to DB..." → { connected: true }
initDB(); // → { connected: true } (no log, returns cached result)
initDB(); // → { connected: true }
```

### 3. Memoize Function
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

const expensiveSquare = memoize((n) => {
    console.log('Computing...');
    return n * n;
});

expensiveSquare(5); // "Computing..." → 25
expensiveSquare(5); // → 25 (cached, no log)
expensiveSquare(6); // "Computing..." → 36

// Advanced: memoize with WeakMap for object args (avoids memory leaks)
function memoizeWeak(fn) {
    const cache = new WeakMap();
    return function (obj) {
        if (cache.has(obj)) return cache.get(obj);
        const result = fn(obj);
        cache.set(obj, result);
        return result;
    };
}
```

### 4. Function Currying
```javascript
// Basic curry
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function (...nextArgs) {
            return curried.apply(this, [...args, ...nextArgs]);
        };
    };
}

const add = curry((a, b, c) => a + b + c);
console.log(add(1)(2)(3));     // 6
console.log(add(1, 2)(3));     // 6
console.log(add(1)(2, 3));     // 6
console.log(add(1, 2, 3));     // 6

// Infinite curry (sum(1)(2)(3)...() → returns value when called with no args)
function sum(a) {
    return function (b) {
        if (b === undefined) return a;
        return sum(a + b);
    };
}
console.log(sum(1)(2)(3)(4)()); // 10

// Infinite curry with valueOf (sum(1)(2)(3) + 0 → 6)
function sum2(a) {
    function inner(b) {
        return sum2(a + b);
    }
    inner.valueOf = () => a;
    return inner;
}
console.log(sum2(1)(2)(3) + 0); // 6
```

### 5. Pipe & Compose Functions
```javascript
// pipe: left-to-right execution
function pipe(...fns) {
    return function (value) {
        return fns.reduce((acc, fn) => fn(acc), value);
    };
}

// compose: right-to-left execution
function compose(...fns) {
    return function (value) {
        return fns.reduceRight((acc, fn) => fn(acc), value);
    };
}

const double = (x) => x * 2;
const addTen = (x) => x + 10;
const square = (x) => x * x;

const transform = pipe(double, addTen, square);
console.log(transform(3)); // 3 → 6 → 16 → 256

const transform2 = compose(square, addTen, double);
console.log(transform2(3)); // same: 3 → 6 → 16 → 256

// Async pipe
function asyncPipe(...fns) {
    return function (value) {
        return fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(value));
    };
}

const process = asyncPipe(
    async (x) => x * 2,
    async (x) => x + 10,
    async (x) => x.toString()
);
await process(5); // "20"
```

---

## PROMISES & ASYNC

### 6. Implement Promise.all
```javascript
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('Argument must be an array'));
        }
        
        const results = [];
        let completed = 0;
        const total = promises.length;
        
        if (total === 0) return resolve([]);
        
        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then((value) => {
                    results[index] = value; // maintain order
                    completed++;
                    if (completed === total) resolve(results);
                })
                .catch(reject); // first rejection rejects all
        });
    });
}

// Test
const p1 = Promise.resolve(1);
const p2 = new Promise((res) => setTimeout(() => res(2), 100));
const p3 = Promise.resolve(3);

promiseAll([p1, p2, p3]).then(console.log); // [1, 2, 3]
promiseAll([p1, Promise.reject('err'), p3]).catch(console.log); // "err"
```

### 7. Implement Promise.race
```javascript
function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('Argument must be an array'));
        }
        
        promises.forEach((promise) => {
            Promise.resolve(promise).then(resolve, reject);
        });
    });
}

// Test
const slow = new Promise((res) => setTimeout(() => res('slow'), 500));
const fast = new Promise((res) => setTimeout(() => res('fast'), 100));
promiseRace([slow, fast]).then(console.log); // "fast"
```

### 8. Implement Promise.allSettled
```javascript
function promiseAllSettled(promises) {
    return new Promise((resolve) => {
        const results = [];
        let completed = 0;
        const total = promises.length;
        
        if (total === 0) return resolve([]);
        
        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then((value) => {
                    results[index] = { status: 'fulfilled', value };
                })
                .catch((reason) => {
                    results[index] = { status: 'rejected', reason };
                })
                .finally(() => {
                    completed++;
                    if (completed === total) resolve(results);
                });
        });
    });
}
```

### 9. Retry API Call with Delay
```javascript
async function retry(fn, retries = 3, delay = 1000, backoff = 2) {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            return await fn();
        } catch (err) {
            if (attempt === retries) throw err;
            console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
            await new Promise((res) => setTimeout(res, delay));
            delay *= backoff; // exponential backoff
        }
    }
}

// Usage
const data = await retry(
    () => fetch('https://api.example.com/data').then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
    }),
    3,    // max retries
    1000  // initial delay
);
```

### 10. Debounce Function
```javascript
function debounce(fn, delay = 300) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// With immediate option (fire on leading edge)
function debounce(fn, delay = 300, { leading = false } = {}) {
    let timer;
    return function (...args) {
        const callNow = leading && !timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            if (!leading) fn.apply(this, args);
        }, delay);
        if (callNow) fn.apply(this, args);
    };
}

// Usage
const handleSearch = debounce((query) => {
    fetch(`/api/search?q=${encodeURIComponent(query)}`);
}, 300);

input.addEventListener('input', (e) => handleSearch(e.target.value));
```

### 11. Throttle Function
```javascript
function throttle(fn, limit = 300) {
    let inThrottle = false;
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => { inThrottle = false; }, limit);
        }
    };
}

// Advanced: with trailing call (fires after throttle period if called during)
function throttle(fn, limit = 300) {
    let inThrottle = false;
    let lastArgs = null;
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
                if (lastArgs) {
                    fn.apply(this, lastArgs);
                    lastArgs = null;
                }
            }, limit);
        } else {
            lastArgs = args;
        }
    };
}

// Usage
const handleScroll = throttle(() => {
    console.log('Scroll position:', window.scrollY);
}, 200);

window.addEventListener('scroll', handleScroll);
```

### Debounce vs Throttle
```
Debounce: Waits until user STOPS doing something for X ms, then fires
          Use for: search input, resize, form validation
          
Throttle: Fires at most once every X ms, regardless of how often triggered
          Use for: scroll events, mouse move, API rate limiting

Timeline (X = event, O = fires):
Events:   X X X X X X _ _ _ X X _ _ _
Debounce: _ _ _ _ _ _ _ _ O _ _ _ _ O   (waits for pause)
Throttle: O _ _ O _ _ O _ _ O _ O _ _   (regular intervals)
```

---

## OBJECTS & POLYFILLS

### 12. Deep Clone Object
```javascript
// Method 1: Recursive (handles nested objects, arrays, dates, regex)
function deepClone(obj, seen = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);
    
    // Handle circular references
    if (seen.has(obj)) return seen.get(obj);
    
    const clone = Array.isArray(obj) ? [] : {};
    seen.set(obj, clone);
    
    for (const key of Object.keys(obj)) {
        clone[key] = deepClone(obj[key], seen);
    }
    
    return clone;
}

// Method 2: structuredClone (built-in, modern)
const clone = structuredClone(original);
// Handles: nested objects, arrays, Date, RegExp, Map, Set, ArrayBuffer
// Does NOT handle: functions, DOM nodes, symbols as keys

// Test
const obj = { a: 1, b: { c: 2, d: [3, 4] }, date: new Date() };
obj.self = obj; // circular reference
const cloned = deepClone(obj);
cloned.b.c = 99;
console.log(obj.b.c); // 2 (original unchanged)
```

### 13. Flatten Object
```javascript
function flattenObject(obj, prefix = '', result = {}) {
    for (const key of Object.keys(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            flattenObject(obj[key], newKey, result);
        } else {
            result[newKey] = obj[key];
        }
    }
    return result;
}

const nested = {
    a: 1,
    b: { c: 2, d: { e: 3 } },
    f: [4, 5]
};

console.log(flattenObject(nested));
// { 'a': 1, 'b.c': 2, 'b.d.e': 3, 'f': [4, 5] }

// Unflatten
function unflattenObject(obj) {
    const result = {};
    for (const key of Object.keys(obj)) {
        const parts = key.split('.');
        let current = result;
        for (let i = 0; i < parts.length - 1; i++) {
            if (!(parts[i] in current)) current[parts[i]] = {};
            current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = obj[key];
    }
    return result;
}
```

### 14. Flatten Array
```javascript
// Method 1: Recursive
function flatten(arr, depth = Infinity) {
    const result = [];
    for (const item of arr) {
        if (Array.isArray(item) && depth > 0) {
            result.push(...flatten(item, depth - 1));
        } else {
            result.push(item);
        }
    }
    return result;
}

// Method 2: Iterative (stack-based)
function flattenIterative(arr) {
    const stack = [...arr];
    const result = [];
    while (stack.length) {
        const item = stack.pop();
        if (Array.isArray(item)) {
            stack.push(...item);
        } else {
            result.unshift(item);
        }
    }
    return result;
}

// Method 3: Built-in
[1, [2, [3, [4]]]].flat(Infinity); // [1, 2, 3, 4]

// Test
console.log(flatten([1, [2, [3, [4, [5]]]]]));     // [1, 2, 3, 4, 5]
console.log(flatten([1, [2, [3, [4]]]], 1));         // [1, 2, [3, [4]]]
```

### 15. Implement Function.prototype.bind
```javascript
Function.prototype.myBind = function (context, ...boundArgs) {
    const fn = this;
    return function (...callArgs) {
        return fn.apply(context, [...boundArgs, ...callArgs]);
    };
};

// Test
const obj = { name: 'Tyson' };
function greet(greeting, punctuation) {
    return `${greeting}, ${this.name}${punctuation}`;
}

const boundGreet = greet.myBind(obj, 'Hello');
console.log(boundGreet('!'));  // "Hello, Tyson!"
console.log(boundGreet('.')); // "Hello, Tyson."
```

### 16. Implement Function.prototype.call / apply
```javascript
Function.prototype.myCall = function (context = globalThis, ...args) {
    const sym = Symbol('temp');
    context[sym] = this;
    const result = context[sym](...args);
    delete context[sym];
    return result;
};

Function.prototype.myApply = function (context = globalThis, args = []) {
    const sym = Symbol('temp');
    context[sym] = this;
    const result = context[sym](...args);
    delete context[sym];
    return result;
};

// Test
function greet(greeting) {
    return `${greeting}, ${this.name}`;
}
console.log(greet.myCall({ name: 'Tyson' }, 'Hey'));    // "Hey, Tyson"
console.log(greet.myApply({ name: 'Tyson' }, ['Hey'])); // "Hey, Tyson"
```

### 17. Event Emitter Class
```javascript
class EventEmitter {
    constructor() {
        this.events = new Map();
    }
    
    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push({ listener, once: false });
        return this; // chainable
    }
    
    once(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push({ listener, once: true });
        return this;
    }
    
    emit(event, ...args) {
        if (!this.events.has(event)) return false;
        const listeners = this.events.get(event);
        
        // Filter out 'once' listeners after calling them
        this.events.set(event, listeners.filter(({ listener, once }) => {
            listener.apply(this, args);
            return !once;
        }));
        
        return true;
    }
    
    off(event, listenerToRemove) {
        if (!this.events.has(event)) return this;
        this.events.set(event,
            this.events.get(event).filter(({ listener }) => listener !== listenerToRemove)
        );
        return this;
    }
    
    removeAllListeners(event) {
        if (event) {
            this.events.delete(event);
        } else {
            this.events.clear();
        }
        return this;
    }
    
    listenerCount(event) {
        return this.events.has(event) ? this.events.get(event).length : 0;
    }
}

// Test
const emitter = new EventEmitter();

const handler = (data) => console.log('Received:', data);
emitter.on('message', handler);
emitter.once('connect', () => console.log('Connected!'));

emitter.emit('connect');    // "Connected!"
emitter.emit('connect');    // nothing (once)
emitter.emit('message', { text: 'hello' }); // "Received: {text: 'hello'}"
emitter.off('message', handler);
emitter.emit('message', 'test'); // nothing (removed)
```

---

## Quick Reference: What Gets Asked Where

| Company Type | Most Asked |
|---|---|
| **Razorpay, Swiggy, Flipkart** | Debounce, throttle, Promise.all, curry, event emitter |
| **Cred, Meesho** | Deep clone, flatten, memoize, pipe/compose |
| **Atlassian, Intuit** | bind/call/apply polyfills, closures, once |
| **Startups (YC, Series A)** | All of the above in a timed coding round |

## Practice Checklist
- [ ] Counter with closure
- [ ] Once function
- [ ] Memoize function
- [ ] Curry function (basic + infinite)
- [ ] Pipe & Compose
- [ ] Promise.all implementation
- [ ] Promise.race implementation
- [ ] Retry with exponential backoff
- [ ] Debounce (with leading option)
- [ ] Throttle (with trailing call)
- [ ] Deep clone (handle circular refs)
- [ ] Flatten object
- [ ] Flatten array
- [ ] Implement bind
- [ ] Implement call/apply
- [ ] Event emitter class
