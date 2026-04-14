# Node.js Async Patterns — Deep Dive

## Evolution of Async in Node.js

### 1. Callbacks (Original Pattern)
```javascript
const fs = require('fs');

fs.readFile('/path/file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log(data);
});

// Callback Hell
getUser(userId, (err, user) => {
    getOrders(user.id, (err, orders) => {
        getOrderItems(orders[0].id, (err, items) => {
            // deeply nested, hard to read, hard to handle errors
        });
    });
});
```

### 2. Promises
```javascript
function readFileAsync(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

// Chaining
readFileAsync('/path/file1.txt')
    .then(data1 => readFileAsync('/path/file2.txt'))
    .then(data2 => process(data2))
    .catch(err => console.error(err))
    .finally(() => cleanup());

// Promise creation patterns
const resolved = Promise.resolve(42);
const rejected = Promise.reject(new Error('fail'));
```

### 3. Async/Await (Use This)
```javascript
async function processFiles() {
    try {
        const data1 = await fs.promises.readFile('/path/file1.txt', 'utf8');
        const data2 = await fs.promises.readFile('/path/file2.txt', 'utf8');
        return process(data1, data2);
    } catch (err) {
        console.error('Error:', err);
        throw err; // re-throw if caller should handle it
    }
}
```

## Concurrency Patterns

### Promise.all — Parallel execution, fail fast
```javascript
async function fetchAllUsers(ids) {
    const promises = ids.map(id => fetchUser(id));
    const users = await Promise.all(promises);
    return users;
}
// If ANY promise rejects, the whole thing rejects immediately
// Use when: all results needed, any failure is fatal
```

### Promise.allSettled — Parallel execution, no fail
```javascript
async function fetchAllUsersSafe(ids) {
    const results = await Promise.allSettled(ids.map(id => fetchUser(id)));
    
    const successful = results
        .filter(r => r.status === 'fulfilled')
        .map(r => r.value);
    
    const failed = results
        .filter(r => r.status === 'rejected')
        .map(r => r.reason);
    
    return { successful, failed };
}
// Use when: want all results regardless of individual failures
```

### Promise.race — First to settle wins
```javascript
async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    
    const fetchPromise = fetch(url, { signal: controller.signal });
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            controller.abort();
            reject(new Error('Request timed out'));
        }, timeout);
    });
    
    return Promise.race([fetchPromise, timeoutPromise]);
}
// Use when: timeout, fallback, or first-response-wins scenarios
```

### Promise.any — First to succeed wins
```javascript
async function fetchFromMirrors(mirrors) {
    try {
        return await Promise.any(
            mirrors.map(url => fetch(url))
        );
    } catch (err) {
        // AggregateError — ALL promises rejected
        console.error('All mirrors failed:', err.errors);
    }
}
// Use when: want first successful result, ignore individual failures
```

## Advanced Patterns

### Retry with Exponential Backoff
```javascript
async function retry(fn, maxRetries = 3, baseDelay = 1000) {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (err) {
            if (attempt === maxRetries) throw err;
            
            const delay = baseDelay * Math.pow(2, attempt);
            const jitter = delay * (0.5 + Math.random() * 0.5); // add jitter
            console.log(`Attempt ${attempt + 1} failed, retrying in ${Math.round(jitter)}ms`);
            await new Promise(resolve => setTimeout(resolve, jitter));
        }
    }
}

// Usage
const data = await retry(() => fetchUser(userId), 3, 1000);
```

### Concurrency Limiter
```javascript
async function parallelLimit(tasks, limit) {
    const results = [];
    const executing = new Set();
    
    for (const [index, task] of tasks.entries()) {
        const promise = task().then(result => {
            executing.delete(promise);
            results[index] = result;
        });
        executing.add(promise);
        
        if (executing.size >= limit) {
            await Promise.race(executing);
        }
    }
    
    await Promise.all(executing);
    return results;
}

// Usage: process 100 URLs, max 5 concurrent
const tasks = urls.map(url => () => fetch(url));
const results = await parallelLimit(tasks, 5);
```

### Event-Driven Async with EventEmitter
```javascript
const EventEmitter = require('events');

class OrderProcessor extends EventEmitter {
    async processOrder(order) {
        this.emit('order:received', order);
        
        try {
            const validated = await this.validateOrder(order);
            this.emit('order:validated', validated);
            
            const payment = await this.processPayment(validated);
            this.emit('order:paid', payment);
            
            const shipped = await this.shipOrder(payment);
            this.emit('order:shipped', shipped);
        } catch (err) {
            this.emit('order:failed', { order, error: err });
        }
    }
}

const processor = new OrderProcessor();
processor.on('order:paid', (data) => sendEmail(data));
processor.on('order:failed', (data) => alertOps(data));
```

### Async Iterator / Generator
```javascript
async function* paginatedFetch(baseUrl) {
    let page = 1;
    while (true) {
        const response = await fetch(`${baseUrl}?page=${page}`);
        const data = await response.json();
        if (data.items.length === 0) break;
        yield data.items;
        page++;
    }
}

// Usage
for await (const items of paginatedFetch('/api/users')) {
    for (const item of items) {
        processUser(item);
    }
}
```

## Error Handling Best Practices

```javascript
// 1. Always handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    // Log to monitoring, then gracefully shutdown
});

// 2. Centralized error handling in Express
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/users', asyncHandler(async (req, res) => {
    const users = await UserService.getAll();
    res.json(users);
}));

// 3. Custom error classes
class AppError extends Error {
    constructor(message, statusCode, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends AppError {
    constructor(resource = 'Resource') {
        super(`${resource} not found`, 404);
    }
}
```

## Interview Questions

**Q: What's the difference between Promise.all and Promise.allSettled?**
> `Promise.all` short-circuits on first rejection. `Promise.allSettled` waits for all promises to settle (resolve or reject) and returns an array of result objects with `status` and `value`/`reason`.

**Q: How do you handle errors in async/await?**
> Try/catch blocks for local handling, global `unhandledRejection` listener as safety net, and error middleware in Express. Operational errors (expected) should be thrown as custom error classes; programmer errors should crash the process.

**Q: How would you implement a rate limiter for API calls?**
> Use a concurrency limiter with a semaphore pattern — track active promises and wait when at limit. For distributed systems, use Redis with sliding window or token bucket algorithm.
