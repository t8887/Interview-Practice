# 🏢 Infosys L2 Interview – Complete Preparation Guide

> **Candidate:** Onkar Mahesh Sawant  
> **Candidate ID:** 1002894770  
> **Interview Date:** 11-04-2026, 10:00 AM IST  
> **Location:** Hinjewadi Phase 2, Infosys Limited, SDB 6 Ground Floor, Pune, 411057 (Near Grand Tamanna Hotel)  
> **Role:** Senior Software Engineer (L2)  
> **Stack:** Node.js / React.js / TypeScript / AWS / MySQL / MongoDB

---

## TABLE OF CONTENTS

1. [Interview Day Logistics & Checklist](#1-interview-day-logistics--checklist)
2. [Infosys L2 Interview Format](#2-infosys-l2-interview-format)
3. [Self Introduction (Tell Me About Yourself)](#3-self-introduction)
4. [Resume-Based Questions & Answers](#4-resume-based-questions--answers)
5. [JavaScript – Core Questions](#5-javascript--core-questions)
6. [Node.js – Technical Questions](#6-nodejs--technical-questions)
7. [React.js – Technical Questions](#7-reactjs--technical-questions)
8. [TypeScript – Technical Questions](#8-typescript--technical-questions)
9. [AWS – Cloud Questions](#9-aws--cloud-questions)
10. [Database – MySQL & MongoDB](#10-database--mysql--mongodb)
11. [System Design Questions](#11-system-design-questions)
12. [DSA / Coding Questions](#12-dsa--coding-questions)
13. [Behavioral / HR Questions](#13-behavioral--hr-questions)
14. [Questions to Ask the Interviewer](#14-questions-to-ask-the-interviewer)
15. [Quick Revision Cheatsheet](#15-quick-revision-cheatsheet)

---

## 1. Interview Day Logistics & Checklist

### 🎒 What to Carry
- [ ] **Government ID Card** (PAN Card / Passport / Driving License — NOT Aadhaar as per their email)
- [ ] Resume (2-3 printed copies)
- [ ] Pen and notebook
- [ ] Water bottle
- [ ] Candidate ID: **1002894770** (memorize or keep written)

### 👔 Dress Code
- **Business formal attire is MANDATORY** (as per Infosys security guidelines)
- Suit/blazer with formal shirt, formal trousers, formal shoes
- Entry may be restricted if dress code not followed

### ⚠️ Important Rules
- **NO personal laptops allowed** on premises
- Arrive **30 minutes early** (by 9:30 AM)
- Carry your phone but keep it on silent during interview
- If any issues on interview day, call: **1800 419 5477** (toll-free) or email: Talent-Acquisition@infosys.com

### 🛣️ Location Tips
- Hinjewadi Phase 2, SDB 6 Ground Floor (Near Grand Tamanna Hotel)
- Since you're from Hinjewadi, plan for traffic — Phase 2 morning traffic can be heavy
- Locate the exact building on Google Maps the night before

---

## 2. Infosys L2 Interview Format

Based on Glassdoor reviews and candidate experiences (2025-2026), Infosys L2 for experienced Senior Software Engineers typically follows:

### Round Structure
| Round | Type | Duration | Focus |
|-------|------|----------|-------|
| L1 (Already Cleared) | Technical Screening | 45-60 min | Basic tech fundamentals |
| **L2 (Your Interview)** | **Deep Technical + Managerial** | **60-90 min** | **Advanced tech, system design, problem solving, projects** |
| L3 (If applicable) | HR / Client Round | 30-45 min | Culture fit, salary, joining |

### What L2 Panelists Evaluate
1. **Deep technical expertise** in your primary stack (Node.js, React)
2. **System design thinking** – how you architect solutions
3. **Problem-solving approach** – how you debug/resolve issues
4. **Project ownership** – your specific contributions and impact
5. **Communication & leadership** – can you mentor, lead, and explain clearly
6. **Real-world scenarios** – "What was the major error you resolved recently?"

### Common L2 Patterns (from Glassdoor March 2026)
- They ask about **past working experience** and **recent error resolving scenarios**
- **Logical thinking** about how you resolve issues
- **Day to day activities** of current position
- May include **live coding** or **whiteboard design**
- Questions on **JWT, authentication, API design**
- **Two Sum** style coding problems

---

## 3. Self Introduction

> **Practice this out loud 3-4 times tonight. Keep it 90 seconds.**

### Script:

"Good morning! I'm Onkar Sawant, a Senior Software Developer with over 5 years of experience in full-stack development, primarily working with Node.js, React.js, TypeScript, and AWS.

Currently, I'm working at LTIMindtree as a Senior Software Engineer. I've been working on two key projects there:

First, the **P&G Olay project**, where I designed and maintained Azure Functions for high-volume e-commerce data migration from BigCommerce to Shopify. I optimized batch operations achieving 50% faster processing and reduced API response times by 40%.

Second, the **EY Risk.ai** project, where I upgraded AI agents from GPT-4 to GPT-5.1 by revamping the prompt infrastructure and improved agent response quality by 20%.

Before that, at **Iprogrammer Solutions**, I led backend development for UTEC — UltraTech's large-scale construction management system. I architected the infrastructure using AWS Lambda, EC2, S3, and OpenSearch. I improved search query times by 30% and database latency by 25% using Redis and MySQL optimization.

I'm passionate about building scalable, high-performance systems and I enjoy mentoring junior developers. I'm excited about this opportunity at Infosys and confident I can bring strong technical leadership to your team."

---

## 4. Resume-Based Questions & Answers

### Q1: Walk me through your most impactful project.
**A:** "At Iprogrammer, I led backend development for UTEC — UltraTech's construction management platform with a 110-member team. I architected the AWS infrastructure using Lambda, EC2, S3, and OpenSearch. The key wins were:
- Enhanced search with OpenSearch, reducing query times by 30%
- Optimized MySQL + Redis caching, cutting latency by 25%
- Conducted VAPT testing ensuring security compliance
- Integrated multiple third-party APIs, increasing customer satisfaction by 20%
- Our team was awarded 'Best Team' recognition."

### Q2: Explain the BigCommerce to Shopify migration you did at LTIMindtree.
**A:** "For P&G Olay, we had to migrate high-volume e-commerce data from BigCommerce to Shopify. I designed Azure Functions to handle the migration pipeline. The challenge was mapping BigCommerce v2/v3 API schemas to Shopify's GraphQL mutations while maintaining 100% data consistency. I used batch operations and parallel processing to achieve 50% faster processing. For API calls, I implemented efficient pagination and parallel fetch patterns in Node.js, which reduced response times by 40%."

### Q3: Tell me about your experience with AI/Agentic AI at EY Risk.ai.
**A:** "I worked on upgrading AI agents from GPT-4 to GPT-5.1 for an internal audit tool. This involved revamping the entire prompt infrastructure — rewriting system-level prompts, implementing prompt chaining, and fine-tuning agent behavior through systematic testing. I also built React UI changes and Node.js backend refinements based on user stories. The result was a 20% improvement in agent response quality."

### Q4: What was the major error you resolved recently?
**A:** "During the BigCommerce to Shopify migration, we encountered data inconsistency issues where product variants were being duplicated during batch processing. The root cause was a race condition in our parallel fetch operations — multiple Azure Function instances were processing overlapping data ranges. I implemented a distributed locking mechanism using Azure Blob lease and added idempotency keys to our Shopify GraphQL mutations. This eliminated duplicates and ensured 100% data consistency post-migration."

### Q5: Why did you leave / are you looking to move?
**A:** "I've had great experiences at LTIMindtree working on enterprise-scale projects. I'm looking for the next level of challenge — working on larger-scale systems with more architectural ownership. Infosys's scale of operations and the breadth of projects, especially in digital transformation, is very appealing to me."

### Q6: Explain the gap between Synechron and LTIMindtree (Dec 24 - March 25 at Synechron).
**A:** "At Synechron, I was in Asurion Japan project where I was onboarding — going through directed learning, understanding project workflows, and participating in training sessions. It was a short engagement and I moved to LTIMindtree for a role that better aligned with my core Node.js and React expertise."

### Q7: Describe your day-to-day activities.
**A:** "My typical day starts with a standup where I sync with the team on sprint progress. I spend most of my time on feature development or bug fixes — writing Node.js backend services, building React components, or working on Azure Functions. I do code reviews for junior developers, participate in architecture discussions, and write unit tests. I also coordinate with QA for testing and deployment cycles."

### Q8: How do you mentor junior developers?
**A:** "At Iprogrammer, I mentored juniors through structured code reviews where I'd explain not just what to fix but why. I enforced coding standards like consistent error handling, proper async/await patterns, and meaningful variable naming. I also conducted knowledge-sharing sessions on topics like Node.js event loop internals and AWS best practices."

---

## 5. JavaScript – Core Questions

### Q1: What is a closure? Give a practical example.
**A:** A closure is a function that retains access to its outer (lexical) scope even after the outer function has returned.

```javascript
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count
  };
}
const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount(); // 2
```
**Practical use:** Data privacy, factory functions, memoization, event handlers.

### Q2: Explain the Event Loop in JavaScript.
**A:** JavaScript is single-threaded. The event loop manages async operations by:
1. **Call Stack** — executes synchronous code
2. **Web APIs / Node APIs** — handle async operations (setTimeout, fetch, I/O)
3. **Microtask Queue** — Promises, MutationObserver (higher priority)
4. **Macrotask Queue** — setTimeout, setInterval, I/O callbacks
5. The event loop checks: Call Stack empty → Microtask Queue (drain all) → one Macrotask → repeat

```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2
```

### Q3: What is the difference between `var`, `let`, and `const`?
**A:**
| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function-scoped | Block-scoped | Block-scoped |
| Hoisting | Hoisted (undefined) | Hoisted (TDZ) | Hoisted (TDZ) |
| Re-declaration | Yes | No | No |
| Re-assignment | Yes | Yes | No |
| TDZ (Temporal Dead Zone) | No | Yes | Yes |

### Q4: Explain Promises and async/await. What is Promise.all vs Promise.allSettled?
**A:** 
- **Promise** — represents an async operation's eventual result (pending → fulfilled/rejected)
- **async/await** — syntactic sugar over Promises for cleaner async code
- **Promise.all()** — resolves when ALL promises resolve; rejects if ANY rejects (fail-fast)
- **Promise.allSettled()** — waits for ALL promises to settle (resolve or reject); never short-circuits
- **Promise.race()** — resolves/rejects with the first settled promise
- **Promise.any()** — resolves with the first fulfilled; rejects only if all reject

```javascript
// Promise.all - use when all results needed, fail if any fails
const [users, orders] = await Promise.all([fetchUsers(), fetchOrders()]);

// Promise.allSettled - use when partial results are acceptable
const results = await Promise.allSettled([api1(), api2(), api3()]);
results.forEach(r => {
  if (r.status === 'fulfilled') process(r.value);
  else logError(r.reason);
});
```

### Q5: What is prototypal inheritance?
**A:** In JavaScript, objects can inherit directly from other objects. Every object has an internal `[[Prototype]]` link. When a property isn't found on an object, JS looks up the prototype chain.

```javascript
const animal = { speak() { return 'sound'; } };
const dog = Object.create(animal);
dog.bark = () => 'woof';
dog.speak(); // 'sound' (inherited from prototype)
```

### Q6: What is `this` keyword? How does it behave in different contexts?
**A:**
- **Global scope:** `window` (browser) / `global` (Node) / `undefined` (strict mode)
- **Object method:** the object itself
- **Arrow function:** inherits `this` from enclosing scope (lexical binding)
- **Constructor / `new`:** the newly created instance
- **`call/apply/bind`:** explicitly set `this`

### Q7: Explain debounce and throttle.
**A:**
- **Debounce:** delays execution until after a pause in events (e.g., search input — wait until user stops typing)
- **Throttle:** limits execution to at most once per interval (e.g., scroll handler — fire at most every 100ms)

```javascript
// Debounce
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Throttle
function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

### Q8: What is the difference between `==` and `===`?
**A:** `==` does type coercion before comparison, `===` checks both value AND type without coercion. Always use `===` in production code.

```javascript
0 == '0'    // true (coercion)
0 === '0'   // false (strict)
null == undefined  // true
null === undefined // false
```

---

## 6. Node.js – Technical Questions

### Q1: Explain the Node.js Event Loop in detail.
**A:** Node.js event loop has 6 phases:
1. **Timers** — executes `setTimeout` and `setInterval` callbacks
2. **Pending Callbacks** — I/O callbacks deferred from previous cycle
3. **Idle/Prepare** — internal use only
4. **Poll** — retrieves new I/O events, executes I/O callbacks
5. **Check** — `setImmediate()` callbacks
6. **Close Callbacks** — `socket.on('close')` etc.

Between each phase, **microtasks** (Promise callbacks, `process.nextTick`) are drained. `process.nextTick` has higher priority than Promise microtasks.

```javascript
setImmediate(() => console.log('setImmediate'));
setTimeout(() => console.log('setTimeout'), 0);
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('promise'));
// Output: nextTick → promise → setTimeout → setImmediate (usually)
```

### Q2: How do you handle errors in Node.js?
**A:**
1. **try/catch** for synchronous code and async/await
2. **`.catch()`** for Promise chains
3. **Error-first callbacks** (legacy pattern)
4. **Express error middleware:** `(err, req, res, next) => { ... }`
5. **Uncaught exceptions:** `process.on('uncaughtException', handler)`
6. **Unhandled rejections:** `process.on('unhandledRejection', handler)`
7. **Custom Error classes** for different error types:

```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Express error middleware
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.isOperational ? err.message : 'Internal Server Error'
  });
});
```

### Q3: What are Streams in Node.js?
**A:** Streams process data in chunks without loading everything into memory.
- **Readable** — reading data (fs.createReadStream, HTTP request)
- **Writable** — writing data (fs.createWriteStream, HTTP response)
- **Duplex** — both read and write (TCP socket)
- **Transform** — modify data while reading/writing (gzip compression)

```javascript
const readable = fs.createReadStream('large-file.csv');
const writable = fs.createWriteStream('output.csv');
const transform = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
});
readable.pipe(transform).pipe(writable);
```

### Q4: What is the difference between `process.nextTick()` and `setImmediate()`?
**A:** 
- `process.nextTick()` — fires BEFORE the event loop continues (microtask queue, after current operation)
- `setImmediate()` — fires in the CHECK phase of the event loop (after Poll phase)
- `nextTick` can starve I/O if used recursively; `setImmediate` is I/O-friendly

### Q5: How do you scale a Node.js application?
**A:**
1. **Cluster module** — fork worker processes per CPU core
2. **PM2** — process manager with load balancing
3. **Horizontal scaling** — multiple instances behind a load balancer
4. **Microservices** — split monolith into independent services
5. **Message queues** — SQS, RabbitMQ for async processing
6. **Caching** — Redis for frequently accessed data
7. **Database optimization** — indexing, connection pooling, read replicas

### Q6: Explain middleware in Express.js.
**A:** Middleware functions have access to `req`, `res`, `next`. They execute sequentially and can:
- Execute code
- Modify request/response
- End the request-response cycle
- Call `next()` to pass control

```javascript
// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

app.use('/api', authenticate);
```

### Q7: How do you implement JWT authentication?
**A:**
1. User logs in with credentials
2. Server validates, generates JWT with `jwt.sign(payload, secret, { expiresIn })`
3. Client stores token (httpOnly cookie preferred over localStorage)
4. Client sends token in `Authorization: Bearer <token>` header
5. Server middleware verifies with `jwt.verify(token, secret)`

**JWT Components:** Header (algo + type) . Payload (claims) . Signature  
**How to invalidate JWT?** Token blacklist in Redis, short expiry + refresh tokens, or token versioning in DB.

### Q8: What is connection pooling? Why is it important?
**A:** Connection pooling maintains a cache of database connections that can be reused. Instead of opening/closing connections for each query, requests borrow from the pool and return after use. This reduces connection overhead, improves response times, and prevents database connection exhaustion.

```javascript
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'mydb',
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
});
```

---

## 7. React.js – Technical Questions

### Q1: Explain the Virtual DOM and Reconciliation.
**A:** React maintains a virtual DOM (JS object tree). When state changes:
1. React creates a new virtual DOM tree
2. **Diffing algorithm** compares new tree with old tree
3. Identifies minimal changes needed
4. **Batches** DOM updates and applies them in one go

**Reconciliation rules:**
- Different element types → tear down old tree, build new
- Same type → keep node, update attributes
- Keys help React identify which items changed in lists

### Q2: Explain React Hooks — useState, useEffect, useRef, useMemo, useCallback.
**A:**
- **useState** — adds state to functional components
- **useEffect** — side effects (data fetching, subscriptions). Cleanup via return function. Dependency array controls when it fires.
- **useRef** — mutable ref that persists across renders without causing re-render
- **useMemo** — memoizes computed values; recomputes only when deps change
- **useCallback** — memoizes function references; prevents unnecessary child re-renders
- **useContext** — access context values without prop drilling

```javascript
// useMemo vs useCallback
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => handleClick(id), [id]);
```

### Q3: What causes unnecessary re-renders? How to optimize?
**A:**
**Causes:** Parent re-renders, new object/array references in props, inline function creation, context value changes

**Solutions:**
1. `React.memo()` — skip re-render if props unchanged
2. `useMemo` / `useCallback` — stable references
3. State lifting / co-locating state closer to where it's used
4. Memoize context values
5. Use `React.lazy` + `Suspense` for code splitting

### Q4: What is the difference between controlled and uncontrolled components?
**A:**
- **Controlled:** React manages form state via `useState`. Value set by state, updated via onChange.
- **Uncontrolled:** DOM manages form state. Use `useRef` to access values. Less React-idiomatic.

### Q5: Explain React Context vs Redux. When to use which?
**A:**
- **Context:** Built-in, good for low-frequency updates (theme, locale, auth). Re-renders ALL consumers on change.
- **Redux:** External library, optimized for high-frequency updates. Selector-based rendering, DevTools, middleware, time-travel debugging.
- **Rule of thumb:** Context for simple shared state, Redux for complex state with many actions/reducers.

### Q6: What are custom hooks? When do you create them?
**A:** Custom hooks extract reusable stateful logic into functions prefixed with `use`.

```javascript
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
```

### Q7: What is the difference between useEffect and useLayoutEffect?
**A:**
- `useEffect` — runs asynchronously AFTER paint (non-blocking)
- `useLayoutEffect` — runs synchronously AFTER DOM mutations but BEFORE paint (blocking)
- Use `useLayoutEffect` for DOM measurements or to prevent visual flickering

---

## 8. TypeScript – Technical Questions

### Q1: What are Generics? Why use them?
**A:** Generics provide type-safe reusable code without losing type information.

```typescript
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}
getFirst<number>([1, 2, 3]); // number
getFirst<string>(['a', 'b']); // string
```

### Q2: Explain `interface` vs `type` in TypeScript.
**A:**
| Feature | Interface | Type |
|---------|-----------|------|
| Extend | `extends` keyword | `&` intersection |
| Declaration merging | Yes | No |
| Union types | No | Yes |
| Primitive aliases | No | Yes |
| Use for | Object shapes, class contracts | Unions, computed types, primitives |

### Q3: What are Utility Types?
**A:**
- `Partial<T>` — all properties optional
- `Required<T>` — all properties required
- `Pick<T, K>` — select specific properties
- `Omit<T, K>` — exclude specific properties
- `Record<K, V>` — construct object type with keys K and values V
- `Readonly<T>` — all properties readonly
- `ReturnType<T>` — extract return type of function

### Q4: What is Type Narrowing?
**A:** Refining types within conditional blocks using type guards.

```typescript
function process(value: string | number) {
  if (typeof value === 'string') {
    // TypeScript knows value is string here
    return value.toUpperCase();
  }
  return value.toFixed(2); // number
}
```

---

## 9. AWS – Cloud Questions

### Q1: Explain AWS Lambda. How did you use it in your projects?
**A:** Lambda is serverless compute — runs code without managing servers, scales automatically, pay per execution.

"At Reapmind, I migrated our Node.js application from EC2 to Lambda, which enhanced scalability and reduced infrastructure costs. I used AWS Serverless Framework to manage the CI/CD pipeline. At Iprogrammer (UTEC), Lambda handled event-driven processing for the construction management system."

### Q2: How does API Gateway work with Lambda?
**A:** API Gateway is the front door for Lambda. Client → API Gateway (routes, auth, rate limiting, CORS) → triggers Lambda → returns response. Supports REST and WebSocket APIs.

### Q3: Explain S3 use cases.
**A:** Object storage for static assets, file uploads, backups, static website hosting, data lake storage. At UTEC, we used S3 for storing construction documents and assets. Features: versioning, lifecycle policies, cross-region replication, presigned URLs.

### Q4: How does Redis/ElastiCache improve performance?
**A:** Redis is an in-memory data store. At UTEC, I used it for:
- **Caching** frequently queried data (cut DB latency by 25%)
- **Session storage** for user sessions
- **Rate limiting** for APIs
- **Queue buffers** for background jobs

### Q5: What is CloudFormation?
**A:** Infrastructure as Code (IaC) — define AWS resources in JSON/YAML templates. "I implemented nested CloudFormation stacks to streamline deployment, reducing deployment time by 40%."

### Q6: Explain the difference between EC2, Lambda, and ECS.
**A:**
- **EC2** — virtual servers you manage (OS, scaling, patching)
- **Lambda** — serverless functions (event-driven, no server management, max 15 min)
- **ECS** — container orchestration (Docker containers, managed by AWS)
- Choose Lambda for short-lived, event-driven tasks; EC2 for long-running processes; ECS for containerized apps.

### Q7: What is VPC? Why is it important?
**A:** Virtual Private Cloud — isolated network within AWS. Controls inbound/outbound traffic via Security Groups and NACLs. Enables private subnets for databases, public subnets for web servers.

### Q8: How did you use OpenSearch in your projects?
**A:** "At UTEC, we integrated OpenSearch (managed ELK stack) for full-text search across construction data. I designed the index mappings, implemented search queries with filtering and aggregations, and optimized query performance — reducing search response times by 30%. Used analyzers for multi-language support."

---

## 10. Database – MySQL & MongoDB

### Q1: Explain different types of JOINs.
**A:**
- **INNER JOIN** — only matching rows from both tables
- **LEFT JOIN** — all rows from left + matching from right (NULL if no match)
- **RIGHT JOIN** — all rows from right + matching from left
- **FULL OUTER JOIN** — all rows from both (MySQL doesn't support, simulate with UNION)
- **CROSS JOIN** — cartesian product

### Q2: What is indexing? Types of indexes?
**A:** Index is a data structure (B-tree/Hash) that speeds up data retrieval at the cost of write performance and storage.
- **Primary Key Index** — unique, clustered
- **Unique Index** — enforces uniqueness
- **Composite Index** — multiple columns (leftmost prefix rule)
- **Full-text Index** — for text search
- **Covering Index** — contains all queried columns

```sql
CREATE INDEX idx_user_email ON users(email);
EXPLAIN SELECT * FROM users WHERE email = 'test@test.com';
```

### Q3: What are ACID properties?
**A:**
- **Atomicity** — all or nothing (transaction completes fully or rolls back)
- **Consistency** — database goes from one valid state to another
- **Isolation** — concurrent transactions don't interfere
- **Durability** — committed data persists even after crash

### Q4: Explain MongoDB aggregation pipeline.
**A:** A series of stages that transform documents:
```javascript
db.orders.aggregate([
  { $match: { status: 'completed' } },
  { $group: { _id: '$userId', total: { $sum: '$amount' } } },
  { $sort: { total: -1 } },
  { $limit: 10 }
]);
```
Common stages: `$match`, `$group`, `$project`, `$sort`, `$lookup` (join), `$unwind`, `$addFields`

### Q5: SQL vs NoSQL — when to use which?
**A:**
- **SQL (MySQL):** Structured data, complex queries, ACID required, relationships (e-commerce, banking)
- **NoSQL (MongoDB):** Flexible schema, horizontal scaling, document-based, rapid iteration (CMS, IoT, real-time apps)
- "At UTEC I used **MySQL** for structured construction data with complex relationships, and at Reapmind I used **MongoDB** for flexible document storage in the health platform."

### Q6: How do you optimize slow queries?
**A:**
1. Use `EXPLAIN` to analyze query plan
2. Add proper indexes (composite indexes for multi-column WHERE)
3. Avoid `SELECT *` — select only needed columns
4. Optimize JOINs — ensure join columns are indexed
5. Use query caching (Redis)
6. Paginate large result sets
7. Avoid N+1 queries
8. Denormalize when read-heavy

---

## 11. System Design Questions

### Q1: Design a URL Shortener (like bit.ly)
**A:**
- **Requirements:** Shorten URL, redirect to original, analytics, expiration
- **API:** `POST /shorten { url }` → returns short code; `GET /:code` → 301 redirect
- **Storage:** Key-value (code → URL). Use Base62 encoding of auto-increment ID or random hash
- **Scale:** Redis cache for hot URLs, MySQL for persistence, CDN for redirect
- **Collision handling:** Check existence, retry with new code
- **Analytics:** Log clicks asynchronously via message queue (SQS)

### Q2: Design a Real-time Notification System
**A:**
- **Push methods:** WebSockets (real-time), SSE (server-sent events), push notifications
- **Architecture:** API Server → Message Queue (SQS/SNS) → Notification Service → Delivery (Socket/Email/SMS)
- **Storage:** User preferences in DB, notification log
- **Scale:** Fan-out on write for small friend lists, fan-out on read for large

### Q3: How would you design the UTEC system you built?
**A:** "UTEC is a construction management system. 
- **Architecture:** Microservices on AWS (Lambda + API Gateway)
- **Data layer:** MySQL for relational data (projects, users, tasks), S3 for documents, OpenSearch for search
- **Caching:** Redis (ElastiCache) for frequently accessed data
- **Real-time:** Node.js async processing for live updates
- **Search:** OpenSearch cluster with custom analyzers and mappings
- **Security:** IAM roles, Security Groups, VAPT-certified
- **Deployment:** Nested CloudFormation stacks for IaC"

### Q4: How do you handle API rate limiting?
**A:**
- **Token Bucket** or **Sliding Window** algorithm
- Store in Redis: key = user/IP, value = request count with TTL
- Return 429 Too Many Requests with Retry-After header
- API Gateway native rate limiting

### Q5: Explain Caching Strategies.
**A:**
- **Cache-aside (Lazy loading):** App checks cache → miss → query DB → populate cache
- **Write-through:** App writes to cache + DB simultaneously
- **Write-behind:** App writes to cache, cache async writes to DB
- **TTL-based invalidation:** Set expiration time
- "At UTEC, I used cache-aside with Redis. Cache hit ratio was ~85%, reducing DB load significantly."

---

## 12. DSA / Coding Questions

> Infosys L2 may ask 1-2 coding problems. Focus on these patterns:

### Two Sum (Most commonly asked at Infosys)
```javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}
```

### Reverse a String
```javascript
function reverseString(str) {
  return str.split('').reverse().join('');
}
// Without built-in:
function reverseManual(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) result += str[i];
  return result;
}
```

### Check Palindrome
```javascript
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++; right--;
  }
  return true;
}
```

### Fibonacci (Iterative & Recursive)
```javascript
// Iterative O(n)
function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}
```

### Find Duplicates in Array
```javascript
function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();
  for (const num of arr) {
    if (seen.has(num)) duplicates.add(num);
    seen.add(num);
  }
  return [...duplicates];
}
```

### Merge Two Sorted Arrays
```javascript
function mergeSorted(a, b) {
  const result = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) result.push(a[i++]);
    else result.push(b[j++]);
  }
  return result.concat(a.slice(i), b.slice(j));
}
```

### FlattenArray (commonly asked for JS roles)
```javascript
function flatten(arr) {
  return arr.reduce((acc, item) =>
    acc.concat(Array.isArray(item) ? flatten(item) : item), []);
}
// Or: arr.flat(Infinity)
```

### Debounce Implementation (Polyfill)
```javascript
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

---

## 13. Behavioral / HR Questions

### Q1: Why Infosys?
**A:** "Infosys is a global leader in digital transformation. The scale of projects, investment in innovation, and the opportunity to work on large enterprise-level systems is very appealing. I admire Infosys's training culture and the emphasis on continuous learning. Also, being based in Pune-Hinjewadi, it's a great fit for me geographically."

### Q2: Tell me about a conflict with a team member and how you resolved it.
**A:** "At Iprogrammer during the UTEC project, a junior developer and I had different views on the database schema design. He wanted a more normalized approach while I preferred some strategic denormalization for read performance. I proposed we benchmark both approaches with realistic data volumes. The results showed my approach was 3x faster for our read-heavy use case. He appreciated the data-driven approach, and we documented the decision for the team."

### Q3: Tell me about a time you failed.
**A:** "Early in the UTEC project, I underestimated the complexity of integrating a third-party logistics API. I committed to a 2-week timeline but the API documentation was outdated and had undocumented rate limits. I missed the deadline by a week. I learned to always do a thorough API spike/POC before committing to timelines, and now I always add buffer time for third-party integrations."

### Q4: How do you handle pressure/tight deadlines?
**A:** "I prioritize ruthlessly — identify what's critical for the release vs what can be deferred. I communicate early with stakeholders if a deadline is at risk. During the P&G migration, we had a tight deadline to sync product catalogs. I broke the work into parallelizable tasks, delegated where possible, and we delivered on time by focusing on the critical path."

### Q5: Where do you see yourself in 5 years?
**A:** "I see myself growing into a technical architect or engineering manager role, leading larger teams and making high-impact architectural decisions. I want to deepen my expertise in system design and cloud architecture while continuing to stay hands-on with code."

### Q6: What are your strengths and weaknesses?
**A:**
- **Strengths:** Strong problem-solving skills, architectural thinking, ability to optimize performance, and mentoring ability
- **Weakness:** "I tend to over-engineer solutions sometimes. I've been actively working on this by following the YAGNI principle — You Aren't Gonna Need It — and validating requirements before building."

### Q7: Do you have any notice period? When can you join?
**A:** Be honest about your current notice period. Infosys typically expects 30-60 days. If you can negotiate early release, mention it.

---

## 14. Questions to Ask the Interviewer

> Always ask 2-3 questions. It shows interest and engagement.

1. "What would be the tech stack and type of projects I'd be working on in this role?"
2. "How is the team structured? What does a typical sprint look like?"
3. "What are the growth and learning opportunities at Infosys for someone in this role?"
4. "What does the onboarding process look like for experienced hires?"
5. "Is there a focus on any particular cloud platform (AWS/Azure/GCP) in the current projects?"

---

## 15. Quick Revision Cheatsheet

### JavaScript Quick Hits
| Concept | One-liner |
|---------|-----------|
| Closure | Function + its outer scope variables |
| Hoisting | Declarations moved to top; `var`=undefined, `let/const`=TDZ |
| Event Loop | Call Stack → Microtasks (Promises) → Macrotasks (setTimeout) |
| `this` | Depends on call context; arrow fn inherits from outer scope |
| Prototype | `__proto__` chain for property lookup |
| Spread/Rest | `...` spreads into elements or collects into array |
| Destructuring | Extract values: `const {a, b} = obj;` |

### Node.js Quick Hits
| Concept | One-liner |
|---------|-----------|
| Event Loop Phases | Timers → Pending → Poll → Check → Close |
| Streams | Process data in chunks (Readable, Writable, Duplex, Transform) |
| Cluster | Fork workers per CPU core for parallelism |
| Middleware | `(req, res, next)` — chain of request handlers |
| Error Handling | Async: try/catch, Express: error middleware |

### React Quick Hits
| Concept | One-liner |
|---------|-----------|
| Virtual DOM | JS representation of DOM, diffed for minimal updates |
| useState | State in functional component |
| useEffect | Side effects after render |
| useMemo | Memoize computed values |
| useCallback | Memoize function references |
| Keys | Help React identify changed list items |

### AWS Quick Hits
| Service | Purpose |
|---------|---------|
| Lambda | Serverless functions |
| EC2 | Virtual servers |
| S3 | Object storage |
| API Gateway | REST/WebSocket API front door |
| RDS | Managed relational DB |
| ElastiCache | In-memory cache (Redis/Memcached) |
| CloudFormation | IaC templates |
| OpenSearch | Search & analytics |
| SQS/SNS | Message queuing / pub-sub |
| IAM | Access management |

### Impact Numbers to Remember (from your resume)
- 50% faster processing (BigCommerce → Shopify batch operations)
- 40% reduction in API response times (pagination + parallel fetch)
- 30% faster search queries (OpenSearch at UTEC)
- 25% reduced DB latency (MySQL + Redis at UTEC)
- 20% improved agent response quality (EY Risk.ai)
- 20% increase in customer satisfaction (third-party API integrations)
- 99.99% server uptime (Vkonnect Health)
- 40% reduced deployment time (nested CloudFormation stacks)
- 100% data consistency (BigCommerce → Shopify migration)

---

## 🔥 TONIGHT'S PRIORITY STUDY ORDER (3-4 hours max)

1. **Practice self-introduction out loud** (15 min) — Section 3
2. **Resume-based Q&A** (30 min) — Section 4 (most likely to be asked)
3. **Node.js deep questions** (30 min) — Section 6 (your primary skill)
4. **JavaScript core** (20 min) — Section 5 (event loop, closures, promises)
5. **React essentials** (20 min) — Section 7 (hooks, virtual DOM)
6. **System Design - UTEC walkthrough** (20 min) — Section 11 Q3
7. **AWS services you used** (15 min) — Section 9
8. **Database questions** (15 min) — Section 10
9. **Behavioral answers** (15 min) — Section 13
10. **DSA - Two Sum & Palindrome** (10 min) — Section 12
11. **Quick revision cheatsheet** (10 min) — Section 15

---

## ✅ FINAL REMINDERS

- Sleep well tonight — a rested mind > cramming
- Arrive by 9:30 AM
- Government ID + business formals = MANDATORY
- No laptop allowed on premises
- Be confident about your numbers/metrics
- If you don't know an answer, say "I haven't worked on that specifically, but here's how I'd approach it..."
- Make eye contact, be conversational, show enthusiasm
- Emergency contact: 1800 419 5477

**All the best, Onkar! You've got this! 🚀**
