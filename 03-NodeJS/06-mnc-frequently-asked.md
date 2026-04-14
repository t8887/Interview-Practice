# Node.js — MNC & Product Company Frequently Asked Questions

> Sources: Glassdoor, AmbitionBox, GeeksforGeeks, GreatFrontend, LinkedIn interview experiences
> Companies: Amazon, Flipkart, Walmart, Atlassian, Razorpay, PayPal, PhonePe, Swiggy, Paytm, Microsoft

---

## Event Loop & Async (Most Asked Category)

### Q1: Is Node.js single-threaded? Explain.
> **A:** The JS execution and event loop are single-threaded. But Node.js uses:
> - **libuv thread pool** (default 4 threads) for blocking I/O (fs, crypto, dns.lookup, zlib)
> - **OS kernel** async APIs for networking (epoll on Linux, kqueue on macOS)
> So Node.js as a **platform** is multi-threaded. Only your **JS code** runs on one thread.
> **Where asked:** Literally every Node.js interview.

### Q2: Explain the event loop phases in order
> **A:** timers → pending callbacks → idle/prepare → **poll** → check → close callbacks
> Microtasks (nextTick, Promises) drain **between every phase**.
> **Follow-up:** What is the difference between nextTick and setImmediate?
> - `nextTick`: runs after current operation, before event loop continues (can starve I/O)
> - `setImmediate`: runs in check phase (after poll), yields to event loop

### Q3: What is the output?
```javascript
setTimeout(() => console.log('A'), 0);
setImmediate(() => console.log('B'));
process.nextTick(() => console.log('C'));
Promise.resolve().then(() => console.log('D'));
```
> **A:** `C`, `D`, `A`, `B` (A/B order may vary in main module)
> **Where asked:** Flipkart, Razorpay, Amazon

### Q4: How does Node.js handle 10,000 concurrent connections without threads?
> **A:** Non-blocking I/O + event loop + OS kernel multiplexing (epoll/kqueue). Each connection doesn't need a dedicated thread. The event loop delegates I/O to the kernel, which notifies Node.js when data is ready. This is why Node.js excels at I/O-heavy workloads but struggles with CPU-bound tasks.

---

## Streams (Senior Level Filter)

### Q5: What are the 4 types of streams in Node.js?
> 1. **Readable** — `fs.createReadStream()`, `http request`
> 2. **Writable** — `fs.createWriteStream()`, `http response`
> 3. **Duplex** — `net.Socket`, TCP sockets (read + write)
> 4. **Transform** — `zlib.createGzip()`, modify data as it passes through

### Q6: What is backpressure? How does Node.js handle it?
> **A:** When a writable stream can't consume data as fast as the readable produces it. Node.js handles via:
> - `readable.pipe(writable)` — handles automatically
> - Manual: `writable.write()` returns `false` → pause reading → wait for `'drain'` event
> **Where asked:** Walmart, Amazon, Atlassian

### Q7: When would you use streams vs reading entire file into memory?
> **A:** Streams for: large files (>100MB), real-time data, video/audio processing, CSV imports. Buffer for: small files, when you need entire content at once.

---

## Worker Threads & Clustering

### Q8: When would you use Worker Threads vs Cluster mode?
> | | Worker Threads | Cluster |
> |--|---------------|---------|
> | Level | Thread-level | Process-level |
> | Memory | Shared via SharedArrayBuffer | Separate memory per process |
> | Use case | CPU-intensive tasks (image processing, crypto) | Scaling HTTP servers across CPU cores |
> | IPC | `postMessage`, `MessageChannel` | IPC via `process.send()` |
> **Where asked:** Flipkart, Razorpay, senior-level rounds

### Q9: How do you prevent the event loop from blocking?
> 1. Use `worker_threads` for CPU-heavy work
> 2. Break loops with `setImmediate()` to yield
> 3. Use async versions of all APIs (`fs.promises.readFile` not `readFileSync`)
> 4. Offload to external services (Redis, message queues)

---

## Express.js & API Design (Practical Rounds)

### Q10: What is middleware in Express? Explain the middleware chain.
> **A:** Functions with `(req, res, next)` signature that execute in order. Each can:
> - Modify `req`/`res`
> - End the request-response cycle
> - Call `next()` to pass to next middleware
> Order matters. Error middleware has 4 args: `(err, req, res, next)`.

### Q11: How do you handle errors in Express?
```javascript
// Async handler wrapper
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Centralized error handler (must be LAST middleware)
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    res.status(status).json({
        status: 'error',
        message: err.isOperational ? err.message : 'Internal server error',
    });
});
```
> **Where asked:** Every Node.js backend interview

### Q12: How would you structure a production Express app?
> Feature-based (not file-type-based):
> ```
> src/
>   features/
>     users/
>       user.controller.js
>       user.service.js
>       user.model.js
>       user.routes.js
>       user.validation.js
>   middleware/
>   utils/
>   app.js        ← Express app (no listen)
>   server.js     ← HTTP server (listen here)
> ```

### Q13: What is the difference between `app.js` and `server.js`?
> **A:** Separation of concerns. `app.js` defines Express middleware and routes (testable). `server.js` creates HTTP server, connects DB, and calls `listen()`. This way you can import `app` in tests without starting the server.

---

## Security (Always Asked in Senior Rounds)

### Q14: How do you secure a Node.js application?
> 1. **Helmet** — sets security HTTP headers
> 2. **CORS** — whitelist trusted origins
> 3. **Rate limiting** — `express-rate-limit`
> 4. **Input validation** — Joi / Zod / express-validator
> 5. **SQL injection prevention** — parameterized queries
> 6. **XSS prevention** — sanitize user input, CSP headers
> 7. **JWT best practices** — short expiry, httpOnly cookies, refresh tokens
> 8. **HTTPS** everywhere
> 9. **Dependency auditing** — `npm audit`
> **Where asked:** Amazon, PayPal, Razorpay, every fintech

### Q15: What is CORS? How do you configure it?
> **A:** Cross-Origin Resource Sharing. Browser blocks requests from different origins by default. Configure:
> ```javascript
> app.use(cors({
>     origin: ['https://myapp.com'],
>     credentials: true,
>     methods: ['GET', 'POST', 'PUT', 'DELETE'],
> }));
> ```

---

## Error Handling & Debugging

### Q16: What is the difference between operational and programmer errors?
> | Operational Errors | Programmer Errors |
> |-------------------|-------------------|
> | Expected failures at runtime | Bugs in code |
> | DB connection failed, API timeout | TypeError, null reference |
> | Handle gracefully, retry | Fix the code, crash & restart |
> | Communicate to user | Log and alert developers |

### Q17: How do you handle uncaught exceptions and unhandled rejections?
```javascript
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Graceful shutdown: close server, flush logs, then exit
    process.exit(1); // MUST exit — state is unreliable
});

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    // In production: log and exit
});
```
> **Key point:** After `uncaughtException`, process state is unreliable. Always exit.

### Q18: How do you implement graceful shutdown?
```javascript
process.on('SIGTERM', () => {
    server.close(() => {
        // Close DB connections
        // Flush logs
        // Then exit
        process.exit(0);
    });
    // Force kill after timeout
    setTimeout(() => process.exit(1), 10000);
});
```
> **Where asked:** Amazon, Walmart, senior-level rounds

---

## Database Integration

### Q19: How does connection pooling work in Node.js?
> **A:** Instead of opening a new DB connection per request, a pool maintains a set of reusable connections. When a query needs a connection, it borrows one from the pool. After the query, the connection returns to the pool.
> ```javascript
> const pool = mysql.createPool({ connectionLimit: 10 });
> ```
> Prevents connection exhaustion under high traffic.

### Q20: What is the N+1 query problem? How to solve it?
> **A:** Loading a list of items (1 query), then loading related data for each item individually (N queries). Fix: use JOINs, eager loading, or batched queries (DataLoader pattern).

---

## Performance & Optimization

### Q21: How do you scale a Node.js application?
> 1. **Cluster mode** — fork workers per CPU core
> 2. **Reverse proxy** — Nginx for load balancing
> 3. **Caching** — Redis for frequently accessed data
> 4. **Horizontal scaling** — multiple servers + load balancer
> 5. **Message queues** — offload async work to Bull/BullMQ
> 6. **Microservices** — split by domain
> 7. **PM2** — process manager with auto-restart & load balancing

### Q22: What is memory leak in Node.js? How to detect?
> **Common causes:** global variables, closures holding references, event listeners not removed, unclosed streams/timers
> **Detection:**
> - `process.memoryUsage()` — check heapUsed growing over time
> - `--inspect` flag + Chrome DevTools heap snapshots
> - `clinic.js` for profiling

### Q23: What is the `UV_THREADPOOL_SIZE` and when would you change it?
> **A:** Default is 4 threads in libuv thread pool. Increase for apps with heavy `fs`, `crypto`, or `dns.lookup` operations. Set via `process.env.UV_THREADPOOL_SIZE = 8`. Max 1024. Don't set too high — threads have memory overhead.

---

## Authentication & Sessions

### Q24: How does JWT authentication work in Node.js?
> 1. User logs in → server creates JWT with payload + secret → sends to client
> 2. Client stores JWT (httpOnly cookie preferred over localStorage)
> 3. Client sends JWT with each request (Authorization: Bearer token)
> 4. Server verifies JWT signature → extracts user info → authorizes
> **Follow-up:** Refresh tokens, token rotation, blacklisting

### Q25: Session-based auth vs JWT auth?
> | | Session | JWT |
> |--|---------|-----|
> | State | Server-side (DB/Redis) | Stateless (token has data) |
> | Scalability | Needs shared session store | Easy horizontal scaling |
> | Revocation | Easy (delete session) | Hard (need blacklist) |
> | Size | Small cookie | Large token |
> | Best for | Traditional web apps | APIs, microservices, mobile |

---

## Quick Fire (Rapid Round)

### Q26: CommonJS vs ES Modules?
> CJS: `require()` / `module.exports` — synchronous, dynamic. ESM: `import` / `export` — async, static, tree-shakeable. Node.js supports both. Use `.mjs` or `"type": "module"` in package.json for ESM.

### Q27: What is `package-lock.json`?
> Locks exact dependency versions (including transitive) for reproducible installs. Should be committed to git. `npm ci` uses it for deterministic installs.

### Q28: What is the difference between `dependencies` and `devDependencies`?
> `dependencies` — needed in production (express, mongoose). `devDependencies` — only for development (jest, eslint, nodemon). `npm install --production` skips devDependencies.

### Q29: What is middleware chaining pattern?
```javascript
const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    error ? res.status(400).json({ error: error.message }) : next();
};

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    req.user = jwt.verify(token, SECRET);
    next();
};

app.post('/api/orders', authenticate, validate(orderSchema), createOrder);
```

### Q30: What are environment variables and how to manage them?
> **A:** Runtime config values (`DB_HOST`, `JWT_SECRET`). Use `dotenv` package. Never commit `.env` to git. Use `.env.example` for template. In production, use platform env vars (AWS Parameter Store, Docker env, etc.).
