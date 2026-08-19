# Setu — Senior Software Engineer / SDE 2 Interview Prep

> **Candidate:** Onkar Mahesh Sawant | **Target:** SDE 2 / Senior Engineer | **Comp target:** ~20–25 LPA
> **Stack match:** Node.js · TypeScript · API design · Distributed systems · Fintech/healthtech APIs

---

## Company Brief

**Setu (setu.co)** — Bangalore-based fintech API infrastructure platform, backed by Pine Labs. Founded 2018. ~150–200 employees.

**What they build:** Clean, developer-friendly API bundles that abstract India's messy financial infrastructure. Products: UPI collection/payouts, BBPS (bill payments), Account Aggregator (Open Banking gateway), KYC/Aadhaar e-KYC, eSign, NACH mandates. Customers include fintechs, banks, NBFCs, and healthtech platforms that embed financial services.

**Why it's relevant for a healthtech candidate:** Many Indian health platforms (insurance TPAs, diagnostic chains, pharmacy networks) use Setu's AA gateway for consent-based financial data access and their BBPS layer for insurance premium payments. The domain overlap is real.

**Engineering signals:**
- Clean API design is a core value — they publish developer docs as a product
- Likely Go / Python / TypeScript backend with microservices architecture
- System design rounds are heavy — expect to design payment flows, idempotency, and distributed consistency
- Interview format: 5 rounds — HackerEarth OA (2 medium DSA) → Exploratory call → Deep Dive → Offline coding project → Founders call
- SDE 2 compensation: ~20 LPA base + ~1 LPA joining bonus (Glassdoor, Jan 2026)
- Culture: merit-based hiring; values ownership, craftsmanship, clear communication

*Sources: setu.co, Glassdoor (glassdoor.co.in/Interview/Setu-Interview-Questions-E4280387), LeetCode Discuss (Setu | Pine Labs | SDE 2), AmbitionBox*

---

## Buckets

1. [Core JavaScript / TypeScript](#1-core-javascript--typescript) — 8 questions
2. [Node.js Internals & Backend](#2-nodejs-internals--backend) — 8 questions
3. [System Design & Architecture](#3-system-design--architecture) — 5 questions
4. [AWS / Cloud](#4-aws--cloud) — 5 questions
5. [React / React Native](#5-react--react-native) — 4 questions
6. [Fintech Domain & Compliance](#6-fintech-domain--compliance-india-specific) — 5 questions
7. [Setu-Specific](#7-setu-specific) — 5 questions
8. [Behavioral / STAR](#8-behavioral--star) — 5 questions

---

## 1. Core JavaScript / TypeScript

### Q1 — What is the difference between `var`, `let`, and `const`? Why does `var` cause bugs? `Easy`

<details>
<summary>Answer</summary>

| | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function | Block | Block |
| Hoisting | Yes (initialised as `undefined`) | Yes (TDZ — throws if accessed before declaration) | Yes (TDZ) |
| Re-declaration | Allowed | Not allowed | Not allowed |
| Re-assignment | Allowed | Allowed | Not allowed |

**Classic `var` bug:**
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Prints: 3, 3, 3  (all closures share the same `i`)

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Prints: 0, 1, 2  (each iteration has its own block-scoped `i`)
```

In payment processing code, a `var` loop counter inside an async function is a silent bug waiting to happen. Always `const` by default, `let` when you need mutation, never `var`.

**What they're really testing →** Scope and hoisting fundamentals — a must for async heavy code.

</details>

---

### Q2 — Explain how async/await works under the hood. `Medium`

<details>
<summary>Answer</summary>

`async/await` is syntactic sugar over Promises. The compiler transforms an `async` function into a state machine.

```ts
async function fetchUser(id: string) {
  const user = await db.findUser(id);  // suspends here
  const profile = await api.getProfile(user.email);  // suspends here
  return profile;
}

// Equivalent desugared form (roughly):
function fetchUser(id: string): Promise<Profile> {
  return db.findUser(id).then(user =>
    api.getProfile(user.email)
  );
}
```

**Key behaviour:**
- `await` yields control back to the event loop while the Promise is pending
- Errors in `await` throw synchronously (catchable with `try/catch`) — equivalent to `.catch()` on the Promise
- `await Promise.all([...])` — concurrent; `await p1; await p2` — sequential (don't do sequential if the calls are independent)

**In payment code:** sequential awaits for independent calls = unnecessary latency. At Setu's transaction volume, that adds up.

**What they're really testing →** Async fluency and performance instinct.

</details>

---

### Q3 — What are generators and when would you use them in a backend service? `Hard`

<details>
<summary>Answer</summary>

Generators are functions that can pause execution and yield values one at a time. They return an iterator.

```ts
function* paginator<T>(
  fetchPage: (cursor: string | null) => Promise<{ data: T[]; nextCursor: string | null }>,
) {
  let cursor: string | null = null;
  do {
    const page = await fetchPage(cursor); // note: use async generators (async function*)
    yield page.data;
    cursor = page.nextCursor;
  } while (cursor !== null);
}

// Consumer
for await (const page of paginator(fetchTransactions)) {
  await processPage(page);
}
```

**Use cases in a fintech/healthtech backend:**
- Lazy pagination over large datasets (transaction history, patient records) — don't load everything into memory
- State machines for multi-step flows (payment → confirmation → settlement) where each step yields status
- Infinite streams of events from an SQS/Kafka consumer

Generators shine when you need to decouple production from consumption of data without buffering.

**What they're really testing →** Advanced JS knowledge and whether you can apply it, not just define it.

</details>

---

### Q4 — What is the Proxy object in JavaScript and give a practical use case? `Hard`

<details>
<summary>Answer</summary>

`Proxy` wraps an object and intercepts operations on it (get, set, delete, apply, etc.) via handler traps.

```ts
// Validation proxy for financial transaction objects
function createValidatedTransaction(data: Partial<Transaction>): Transaction {
  return new Proxy(data as Transaction, {
    set(target, key, value) {
      if (key === 'amount' && (typeof value !== 'number' || value <= 0)) {
        throw new RangeError(`Invalid amount: ${value}`);
      }
      if (key === 'currency' && !['INR', 'USD'].includes(value)) {
        throw new TypeError(`Unsupported currency: ${value}`);
      }
      target[key as keyof Transaction] = value;
      return true;
    },
    get(target, key) {
      if (!(key in target)) throw new Error(`Unknown field: ${String(key)}`);
      return target[key as keyof Transaction];
    },
  });
}
```

Other use cases: reactive state (Vue 3 uses Proxy for reactivity), memoisation, access logging, mock objects in tests.

**What they're really testing →** Deep JS metaprogramming knowledge — Setu engineers are expected to understand the language, not just use it.

</details>

---

### Q5 — What is TypeScript's `satisfies` operator and when is it useful? `Medium`

<details>
<summary>Answer</summary>

`satisfies` (TS 4.9+) validates that a value matches a type while still inferring the most specific type.

```ts
type APIConfig = Record<string, { url: string; retries: number }>;

// Without satisfies: config inferred as APIConfig — loses specific key knowledge
const config: APIConfig = {
  upi: { url: 'https://api.setu.co/upi', retries: 3 },
};
config.upi.url; // type: string ✓ but no autocomplete on 'upi' key

// With satisfies: validates shape AND retains literal key types
const config2 = {
  upi: { url: 'https://api.setu.co/upi', retries: 3 },
  bbps: { url: 'https://api.setu.co/bbps', retries: 5 },
} satisfies APIConfig;

config2.upi.url; // type: string ✓ AND TS knows 'upi' is a valid key
// config2.unknown; // TS error ✗ — doesn't exist
```

Useful for configuration objects, route maps, and any record where you want both shape validation and autocomplete.

**What they're really testing →** Are you current with the TypeScript ecosystem? SDE 2s are expected to know recent language features.

</details>

---

### Q6 — What is tail call optimisation and does Node.js support it? `Hard`

<details>
<summary>Answer</summary>

A tail call is a function call that is the last operation in a function. Tail call optimisation (TCO) reuses the current stack frame instead of adding a new one, preventing stack overflow in deep recursion.

```ts
// NOT tail-recursive — multiplies after the recursive call returns
function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1); // multiply happens AFTER call returns
}

// Tail-recursive — recursive call IS the last operation
function factorialTCO(n: number, acc = 1): number {
  if (n <= 1) return acc;
  return factorialTCO(n - 1, n * acc); // nothing happens after this
}
```

**Node.js support:** V8 implemented strict-mode TCO in Node 6 but then removed it (the implementation was buggy and not worth the maintenance cost). As of 2024, Node.js does **not** reliably support TCO.

**Practical alternative:** Use iterative loops, trampolining, or limit recursion depth. For deep recursion in a payment retry tree, use an explicit stack (array) rather than the call stack.

**What they're really testing →** CS fundamentals depth — important at a company that values craftsmanship.

</details>

---

### Q7 — Explain WeakMap and WeakSet. When would you use them? `Medium`

<details>
<summary>Answer</summary>

`WeakMap` — keys must be objects; keys are held weakly (garbage-collectable when no other reference exists). No `.size`, no iteration.
`WeakSet` — same weak-reference semantics; stores objects, not primitives.

```ts
// Cache per-object without preventing GC
const requestCache = new WeakMap<Request, CachedResult>();

function processRequest(req: Request): CachedResult {
  if (requestCache.has(req)) return requestCache.get(req)!;
  const result = expensiveProcess(req);
  requestCache.set(req, result);
  return result;
}
// When `req` is GC'd (request lifecycle ends), the cache entry is automatically removed
// A regular Map would retain `req` indefinitely — memory leak

// Track visited objects in a graph traversal without modifying them
const visited = new WeakSet<TransactionNode>();
function traverseGraph(node: TransactionNode) {
  if (visited.has(node)) return;
  visited.add(node);
  node.links.forEach(traverseGraph);
}
```

In long-running Node.js servers processing millions of API requests, WeakMap caches avoid the memory leak that a regular Map would cause.

**What they're really testing →** Memory management awareness — critical for a fintech API platform with high throughput.

</details>

---

### Q8 — What is type narrowing in TypeScript? Give three ways to narrow. `Easy`

<details>
<summary>Answer</summary>

Type narrowing is TypeScript's ability to refine a union type to a more specific type within a conditional block.

```ts
type PaymentResult = 
  | { status: 'success'; transactionId: string }
  | { status: 'failed'; errorCode: string }
  | { status: 'pending'; estimatedTime: number };

function handleResult(result: PaymentResult) {

  // 1. Discriminant property (best for unions)
  if (result.status === 'success') {
    console.log(result.transactionId); // TS knows: PaymentResult & { status: 'success' }
  }

  // 2. typeof
  function process(val: string | number) {
    if (typeof val === 'string') val.toUpperCase(); // narrowed to string
  }

  // 3. instanceof
  function handleError(e: unknown) {
    if (e instanceof Error) console.log(e.message); // narrowed to Error
  }

  // 4. in operator
  if ('transactionId' in result) {
    console.log(result.transactionId);
  }

  // 5. User-defined type guard
  function isSuccess(r: PaymentResult): r is { status: 'success'; transactionId: string } {
    return r.status === 'success';
  }
}
```

**What they're really testing →** Practical TS usage — discriminated unions are the backbone of clean API response handling.

</details>

---

## 2. Node.js Internals & Backend

### Q9 — How does Node.js libuv thread pool work and what operations use it? `Hard`

<details>
<summary>Answer</summary>

libuv maintains a thread pool (default size: 4, configurable via `UV_THREADPOOL_SIZE`) for operations the OS can't make non-blocking natively.

**Operations that use the thread pool:**
- `fs.*` calls (file I/O — except on Linux with io_uring in recent Node)
- `dns.lookup()` (not `dns.resolve()` which uses OS async)
- `crypto` heavy operations (hashing, key generation, randomBytes)
- `zlib` compression/decompression
- User-initiated `worker_threads`

**Operations that do NOT use the thread pool** (use OS async I/O):
- `net` / HTTP / TCP sockets
- `timers` (setTimeout, setInterval)
- `dns.resolve()`

**Why this matters in a payment API:** if you're doing bcrypt password hashing (CPU-heavy crypto) in a hot path, you're consuming thread pool slots. With 4 threads and a concurrent burst of 100 requests, 96 of them queue behind 4 bcrypt operations. Solution: move bcrypt off the request path (don't do it on every API call) or increase `UV_THREADPOOL_SIZE`.

**What they're really testing →** True Node.js internals knowledge — SDE 2 candidates are expected to know this.

</details>

---

### Q10 — What is backpressure in Node.js streams and how do you handle it? `Hard`

<details>
<summary>Answer</summary>

Backpressure occurs when a Writable stream can't consume data as fast as the Readable produces it. Without handling it, data buffers in memory until the process OOMs.

```ts
// BAD — ignoring backpressure
readableStream.on('data', chunk => {
  writableStream.write(chunk); // write() returns false when internal buffer is full
  // but we never check — we keep reading, buffer grows unboundedly
});

// GOOD — manual backpressure handling
readableStream.on('data', chunk => {
  const ok = writableStream.write(chunk);
  if (!ok) {
    readableStream.pause(); // stop producing until buffer drains
    writableStream.once('drain', () => readableStream.resume());
  }
});

// BEST — use pipeline() which handles backpressure automatically
import { pipeline } from 'stream/promises';
await pipeline(readableStream, transformStream, writableStream);
```

**Real scenario at Setu's scale:** streaming a large batch of 10K UPI settlement transactions from S3 through a parser to a DB write stream. Without backpressure handling, the S3 stream floods the DB batch inserter and you OOM the Lambda.

**What they're really testing →** Production stream handling — not just knowing streams exist.

</details>

---

### Q11 — How do you design a robust retry mechanism with exponential backoff? `Medium`

<details>
<summary>Answer</summary>

```ts
interface RetryOptions {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs: number;
  retryOn?: (error: Error) => boolean;
}

async function withRetry<T>(
  fn: () => Promise<T>,
  opts: RetryOptions,
): Promise<T> {
  const { maxAttempts, baseDelayMs, maxDelayMs, retryOn } = opts;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const isLast = attempt === maxAttempts;
      const shouldRetry = retryOn ? retryOn(err as Error) : true;

      if (isLast || !shouldRetry) throw err;

      // Exponential backoff with jitter
      const exponential = baseDelayMs * Math.pow(2, attempt - 1);
      const jitter = Math.random() * baseDelayMs;
      const delay = Math.min(exponential + jitter, maxDelayMs);

      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('unreachable');
}

// Usage — NPCI UPI call
const result = await withRetry(
  () => npciClient.initiatePayment(payload),
  {
    maxAttempts: 3,
    baseDelayMs: 500,
    maxDelayMs: 5000,
    retryOn: (err) => err.message.includes('TIMEOUT') || err.message.includes('503'),
    // Don't retry on 400/validation errors — they'll keep failing
  },
);
```

**Jitter** is critical at scale — without it, all failed requests retry simultaneously and create a thundering herd that takes the upstream down again.

**What they're really testing →** Resilience engineering — essential for a payment platform hitting RBI-regulated third-party systems.

</details>

---

### Q12 — Explain the difference between a message queue and a pub/sub system. When do you use each? `Medium`

<details>
<summary>Answer</summary>

| | Message Queue (SQS, RabbitMQ) | Pub/Sub (SNS, Kafka, EventBridge) |
|---|---|---|
| Delivery model | One consumer per message | All subscribers receive each message |
| Consumer model | Competing consumers (load balancing) | Fan-out |
| Message retention | Until consumed | Configurable; Kafka retains for replay |
| Use case | Task queues, work distribution | Event broadcast, audit streams |

**When to use queue (SQS):**
- Payment processing jobs — one Lambda should process each transaction, not all of them
- Email sending — distribute load across multiple workers

**When to use pub/sub (SNS):**
- `PaymentCompleted` event — needs to trigger: billing update + audit log + user notification + analytics. Fan-out to multiple queues.

**Combined pattern (SNS→SQS fan-out):**
```
PaymentService → SNS (PaymentEvents)
                    ↓             ↓            ↓
               SQS-Billing   SQS-Audit   SQS-Notify
                    ↓             ↓            ↓
              BillingLambda AuditLambda NotifyLambda
```
Each consumer gets its own queue — independent failure domains, independent scaling.

**What they're really testing →** Distributed messaging architecture — the backbone of Setu's event-driven payment platform.

</details>

---

### Q13 — How do you implement rate limiting in a Node.js API? `Medium`

<details>
<summary>Answer</summary>

For a payment API with per-client rate limits, use a sliding window counter in Redis:

```ts
import Redis from 'ioredis';

async function checkRateLimit(
  clientId: string,
  limitPerMin: number,
): Promise<{ allowed: boolean; remaining: number }> {
  const key = `rl:${clientId}:${Math.floor(Date.now() / 60_000)}`; // 1-min window

  const pipeline = redis.pipeline();
  pipeline.incr(key);
  pipeline.expire(key, 60);
  const [[, count]] = await pipeline.exec() as [[null, number]];

  const remaining = Math.max(0, limitPerMin - count);
  return { allowed: count <= limitPerMin, remaining };
}

// Express middleware
export function rateLimiter(limitPerMin: number) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.headers['x-client-id'] as string;
    const { allowed, remaining } = await checkRateLimit(clientId, limitPerMin);

    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Limit', limitPerMin);

    if (!allowed) return res.status(429).json({ error: 'Rate limit exceeded' });
    next();
  };
}
```

**For distributed deployments:** Redis is shared across all Lambda instances — limits are cluster-wide, not per-instance. Use `INCR` + `EXPIRE` in a pipeline (atomic enough for most cases; use Lua script for strict atomicity).

**What they're really testing →** Practical rate limiting design — Setu's API platform must enforce per-client throttles for NPCI/RBI compliance.

</details>

---

### Q14 — What is the difference between `require` and `import`? How does ESM affect Node.js? `Easy`

<details>
<summary>Answer</summary>

`require` — CommonJS (CJS). Synchronous, dynamic. Loads at runtime. `.js` files in Node.
`import` — ES Modules (ESM). Static, asynchronous. Resolved at parse time. `.mjs` or `.js` in packages with `"type": "module"`.

**Key differences:**
```ts
// CJS — dynamic, can be conditional
const lib = require(process.env.NODE_ENV === 'test' ? './mock' : './real');

// ESM — static, top-level only (dynamic import() for conditional)
import { fn } from './lib'; // must be at top level
const lib = await import(condition ? './mock' : './real'); // dynamic import
```

**ESM in Node.js (since Node 12+):**
- Better tree-shaking in bundlers
- Top-level `await` supported
- Named exports are live bindings (CJS exports are copies)
- Interop caveat: CJS packages can be `import`ed but CJS can't `require()` ESM — the main friction point when migrating

In a TypeScript project: compile to CJS (`"module": "commonjs"` in tsconfig) for maximum compatibility with the Node.js ecosystem unless you specifically need ESM features.

**What they're really testing →** Module system literacy — relevant when dealing with mixed dependency trees.

</details>

---

### Q15 — How do you prevent memory leaks in a long-running Node.js service? `Hard`

<details>
<summary>Answer</summary>

Common sources and fixes:

1. **Event listener accumulation** — every `emitter.on()` without a corresponding `off()`:
```ts
// BAD — adds a new listener on every request
server.on('request', (req, res) => {
  db.on('error', handleError); // leaks if db emits 'error' on each request
});

// GOOD — register once, or use .once()
db.on('error', handleError); // outside request handler
```

2. **Uncleared timers/intervals:**
```ts
// BAD
setInterval(() => pollExternalAPI(), 5000); // never cleared

// GOOD
const timer = setInterval(() => pollExternalAPI(), 5000);
process.on('SIGTERM', () => clearInterval(timer));
```

3. **Growing caches without eviction:**
```ts
// BAD
const cache = new Map(); // grows forever
// GOOD: LRU cache with size limit
import { LRUCache } from 'lru-cache';
const cache = new LRUCache<string, Result>({ max: 1000, ttl: 60_000 });
```

4. **Closures holding references** — large objects captured in closures that live longer than expected (callbacks stored in arrays, event handlers)

**Detection:** Use `--inspect` flag + Chrome DevTools heap snapshots. Take two snapshots 10 minutes apart; anything growing is a leak candidate. In production, use Clinic.js or Datadog's Node.js profiler.

**What they're really testing →** Production Node.js reliability — memory leaks in a payment API = weekend pager alerts.

</details>

---

### Q16 — How do you structure a Node.js / TypeScript monorepo for multiple API services? `Medium`

<details>
<summary>Answer</summary>

Use **pnpm workspaces** + **Turborepo** for build orchestration:

```
packages/
  shared/           # DTOs, validation schemas, utility functions
    src/
      types.ts
      validators.ts
  upi-service/      # UPI payment API
    src/
      handlers/
      services/
  bbps-service/     # Bill payment API
  aa-gateway/       # Account Aggregator
apps/
  api-gateway/      # Routes to services
turbo.json          # Build pipeline config
pnpm-workspace.yaml
```

**Key benefits:**
- Shared types between services — no copy-paste of `TransactionSchema`
- `turbo build` only rebuilds packages affected by a change (dependency graph aware)
- Single `node_modules` at root (hoisted) — faster installs, consistent versions

**Deployment:** each service is independently deployable. Turborepo's `--filter` flag lets CI build only the changed service.

At UTEC we ran a similar structure across 245+ Lambda functions — shared validation schemas and error types in a common package prevented the same bug from appearing in 10 different places.

**What they're really testing →** Code organisation at scale — does this engineer think beyond a single service?

</details>

---

## 3. System Design & Architecture

### Q17 — Design a UPI payment collection API for a B2B SaaS platform. `Hard`

<details>
<summary>Answer</summary>

**Requirements:** Merchant creates a payment link → customer pays via UPI → merchant gets webhook → settlement T+1.

**Architecture:**

```
Merchant API  →  [POST /payment-links]  →  Payment Service Lambda
                                                   ↓
                                         Generate UPI Intent / QR
                                         (via NPCI / bank partner)
                                                   ↓
                                           DynamoDB (payment record)
                                           status: CREATED

Customer → UPI App → Bank → NPCI → Bank Partner → [POST /webhooks/upi]
                                                         ↓
                                                  Webhook Validator Lambda
                                                  (verify HMAC signature)
                                                         ↓
                                                  SQS (payment-events)
                                                         ↓
                                                  Payment Processor Lambda
                                                  (idempotency check → update status)
                                                         ↓
                                                  Merchant Webhook Lambda
                                                  (POST to merchant's webhook URL)
```

**Critical design decisions:**

1. **Idempotency** — bank/NPCI may deliver the same webhook twice. Store `transactionRef` in DynamoDB with `ConditionExpression: attribute_not_exists(transactionRef)` — second write fails cleanly.

2. **Webhook signature verification** — NPCI sends HMAC-SHA256 signed payloads. Verify before processing — a fake "payment succeeded" webhook is a fraud vector.

3. **Merchant webhook retry** — if merchant's server is down, retry with exponential backoff up to 24h. Store retry state in SQS with visibility timeout.

4. **Status state machine:**
   `CREATED → PENDING → SUCCESS | FAILED | EXPIRED`
   Only allow forward transitions (use DynamoDB conditional writes).

5. **Data residency** — all transaction data in `ap-south-1` (RBI requires payment data localisation in India).

**What they're really testing →** Can you design the core product you'd be building at Setu?

</details>

---

### Q18 — How would you design the Account Aggregator consent flow? `Hard`

<details>
<summary>Answer</summary>

The **Account Aggregator (AA)** framework (RBI-regulated) lets users share their financial data (bank statements, mutual fund holdings) with consent.

**Actors:**
- **FIU (Financial Information User)** — Setu's customer (e.g., a lender wanting bank statements)
- **AA (Account Aggregator)** — Setu acts as the technology layer between FIU and FIP
- **FIP (Financial Information Provider)** — the user's bank

**Consent flow:**

```
1. FIU → POST /Consent to AA
   Body: { customerId, fiTypes: ['DEPOSIT'], dateRange, purpose: 'LOAN_UNDERWRITING' }

2. AA → redirect customer to consent screen (web/app)

3. Customer → approves/rejects on AA app
   Selects which accounts to share

4. AA → notifies FIU: POST /Consent/Notification
   Body: { consentId, status: 'ACTIVE', consentHandle }

5. FIU → POST /FI/request to AA
   Body: { consentId, consentHandle, keyMaterial: { publicKey } }

6. AA → fetches data from FIP (using consent artefact)
   FIP returns encrypted FI data (encrypted with FIU's public key)

7. AA → delivers to FIU via callback
   FIU decrypts with private key → processes statements
```

**Node.js implementation:**
```ts
// ECDH key pair generation for each FI request
const ecdh = crypto.createECDH('prime256v1');
const publicKey = ecdh.generateKeys('base64');
// Store private key in Secrets Manager keyed by requestId
await secretsManager.putSecretValue({
  SecretId: `aa-session/${requestId}`,
  SecretString: ecdh.getPrivateKey('base64'),
});
```

**Consent revocation:** FIU must honour revocation events from AA — delete or quarantine the fetched data.

**What they're really testing →** Deep understanding of Setu's core AA product — critical for this role.

</details>

---

### Q19 — Design a system to handle 10,000 UPI webhook callbacks per second. `Hard`

<details>
<summary>Answer</summary>

At 10K RPS, a single Lambda or server won't cut it without thoughtful design.

**Ingestion layer (must be ultra-fast):**
```
NPCI/Bank → ALB (sticky disabled) → Webhook Receiver Lambda
                                          ↓
                                  1. Verify HMAC (nanoseconds)
                                  2. Write to Kinesis Data Stream
                                  3. Return 200 ACK immediately
```
The receiver does the minimum — verify and enqueue. 200ms timeout budget.

**Processing layer (decoupled):**
```
Kinesis (10 shards × 1000 records/s/shard = 10K/s capacity)
    ↓
Payment Processor Lambda (parallelism = shard count)
    ↓
DynamoDB (on-demand mode — auto-scales to traffic bursts)
    ↓
SNS → SQS per merchant → Merchant Notification Lambda
```

**Key decisions:**
- **Kinesis over SQS for ingestion** — ordered within a shard (by transactionId), exactly-once via sequence numbers, replay capability for debugging
- **DynamoDB on-demand** — no pre-provisioning; handles traffic spikes without throttling
- **Partial batch responses** — Lambda Kinesis processor returns `batchItemFailures` to avoid reprocessing successful messages on partial failure
- **DLQ on Kinesis** — after 3 retries, failed records go to S3 for manual inspection (fraud investigation)

**Monitoring:** CloudWatch metric filter on `payment.failed` events + PagerDuty alert if error rate > 0.1%.

**What they're really testing →** High-throughput event processing at fintech scale.

</details>

---

### Q20 — How do you design for zero-downtime deployments in a payment service? `Hard`

<details>
<summary>Answer</summary>

A payment service has two hard constraints: no in-flight transactions should be lost during deployment, and no API consumers should see errors.

**Strategy: Blue-Green + DB migration decoupling**

**Step 1 — DB migrations first (expand phase):**
- Add new columns as nullable (old code still works)
- Deploy old code reading new column with fallback to old column
- Never drop columns in the same deploy that removes references

**Step 2 — Blue-Green deployment:**
```
ALB Target Group Blue (current prod, 100% traffic)
ALB Target Group Green (new version, 0% traffic)

1. Deploy new version to Green
2. Run smoke tests against Green (via test traffic header)
3. Shift 5% → 25% → 50% → 100% traffic to Green (canary release)
4. Monitor error rate at each step; CloudWatch alarm triggers rollback
5. Drain Blue (wait for in-flight requests to complete, default 30s)
6. Terminate Blue
```

**Step 3 — DB migration cleanup (contract phase):**
- Deploy again to remove old column references
- Then run migration to drop old columns

**Idempotency as a safety net:** if a Lambda is killed mid-transaction during a deployment, the client retries with the same idempotency key → the new version finds the completed-or-pending state and responds correctly.

**What they're really testing →** Deployment engineering — critical when "downtime" means failed payments.

</details>

---

### Q21 — How do you handle distributed tracing across multiple microservices? `Medium`

<details>
<summary>Answer</summary>

Use **OpenTelemetry** (vendor-neutral) with AWS X-Ray or Datadog as the backend.

```ts
// In each service — propagate trace context
import { trace, context, propagation } from '@opentelemetry/api';

const tracer = trace.getTracer('payment-service');

async function processPayment(req: Request) {
  // Extract trace context from incoming headers (from API gateway / upstream)
  const ctx = propagation.extract(context.active(), req.headers);

  return context.with(ctx, async () => {
    const span = tracer.startSpan('processPayment', {
      attributes: {
        'payment.transactionId': req.body.transactionId,
        'payment.amount': req.body.amount,
      },
    });

    try {
      const result = await doWork();
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (err) {
      span.recordException(err as Error);
      span.setStatus({ code: SpanStatusCode.ERROR });
      throw err;
    } finally {
      span.end();
    }
  });
}
```

**Propagation:** inject `traceparent` header (W3C standard) into every outbound HTTP call and SQS message attribute. This threads a single trace ID across: API Gateway → Payment Lambda → SQS → Notification Lambda → merchant webhook.

**In production:** X-Ray sampling at 5% for normal traffic, 100% for errors. Store traces for 30 days.

**What they're really testing →** Observability engineering — at Setu's scale you can't debug with console.log.

</details>

---

## 4. AWS / Cloud

### Q22 — How would you architect a multi-region active-active setup for a payment API? `Hard`

<details>
<summary>Answer</summary>

For RBI compliance, primary region must be `ap-south-1` (Mumbai). DR in `ap-southeast-1` (Singapore).

**Active-Active vs Active-Passive:**
- Active-Passive: simpler, but failover takes minutes. RTO ~5 minutes.
- Active-Active: both regions serve traffic simultaneously. RTO near-zero but complex data consistency.

For payment APIs, I'd use **Active-Active with global tables:**

```
Route53 (latency-based routing)
    ↓           ↓
ap-south-1   ap-southeast-1
  Lambda          Lambda
    ↓               ↓
DynamoDB Global Tables (multi-region replication, ~1s lag)
    ←  bidirectional replication  →
```

**Conflict resolution:** DynamoDB Global Tables uses last-write-wins with timestamps. For payment state machines, use conditional writes with version numbers to detect conflicts — if a transaction is being processed in both regions simultaneously, one will fail the conditional write and retry.

**Data residency caveat:** if RBI mandates India-only storage, Active-Active with Singapore violates this for the primary data. In that case use Active-Passive: Mumbai primary, Singapore cold standby with DynamoDB cross-region backups.

**What they're really testing →** Multi-region architecture awareness + regulatory constraint handling.

</details>

---

### Q23 — Explain AWS Lambda cold starts and how you mitigate them. `Medium`

<details>
<summary>Answer</summary>

A cold start happens when Lambda has no warm execution environment — it must download the deployment package, start the runtime, and run initialisation code before handling the request.

**Timeline:** Download package (~50ms for small ZIPs) + Start runtime (~100ms for Node.js) + Execute init code (your time — DB connection setup etc.) = typically 200–800ms for Node.js Lambdas.

**Mitigation strategies:**

1. **Provisioned Concurrency** — pre-warm N instances. Cost: you pay for idle time. Use for latency-sensitive paths (payment initiation endpoint).

2. **Minimize package size** — only bundle what you use. Use esbuild (tree-shakes dead code). Lambda with a 1MB ZIP cold-starts faster than one with a 50MB ZIP.

3. **Move heavy init outside the handler:**
```ts
// Cold start — runs once per container lifecycle
const dbPool = new Pool({ connectionString: process.env.DB_URL });
const secretsCache = await getSecrets(); // cache at init time

// Handler — runs on every invocation
export const handler = async (event: APIGatewayEvent) => {
  // dbPool and secretsCache already initialised — no cold-start cost here
  const result = await dbPool.query('SELECT...');
};
```

4. **Ping/keep-warm** — EventBridge rule fires every 5 minutes to keep Lambdas warm (hacky but free; not needed if using provisioned concurrency)

5. **SnapStart (Java only)** — not relevant for Node.js

**What they're really testing →** Lambda performance tuning — at Setu's API throughput, cold starts affect P99 latency.

</details>

---

### Q24 — How do you implement a dead letter queue strategy for a payment event pipeline? `Medium`

<details>
<summary>Answer</summary>

```
SQS Main Queue (payment-events)
    ↓  (maxReceiveCount: 3)
SQS Dead Letter Queue (payment-events-dlq)
    ↓
CloudWatch Alarm (DLQ depth > 0 → PagerDuty)
    ↓
DLQ Processor Lambda (manual trigger or scheduled)
    ↓
Investigation + replay or write to audit DB
```

**Configuration:**
```yaml
PaymentQueue:
  Type: AWS::SQS::Queue
  Properties:
    VisibilityTimeout: 300  # must be >= Lambda timeout × 6
    RedrivePolicy:
      deadLetterTargetArn: !GetAtt PaymentDLQ.Arn
      maxReceiveCount: 3  # 3 attempts before moving to DLQ

PaymentDLQ:
  Type: AWS::SQS::Queue
  Properties:
    MessageRetentionPeriod: 1209600  # 14 days — gives time for investigation
```

**DLQ handling discipline:**
- Never silently swallow DLQ messages — every one represents a failed transaction
- DLQ alarm is P1 for a payment team
- Replay script: after fixing the bug, move messages back to main queue using `aws sqs send-message` from the DLQ

At UTEC, our DLQ depth alarm saved us from a silent 2-hour notification failure during a promotional campaign.

**What they're really testing →** Production reliability thinking — DLQs are your safety net.

</details>

---

### Q25 — How do you manage secrets and API keys in a serverless AWS architecture? `Medium`

<details>
<summary>Answer</summary>

**Never** store secrets in environment variables as plain text — they appear in CloudFormation console and CloudTrail logs.

**AWS Secrets Manager approach:**

```ts
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManagerClient({ region: 'ap-south-1' });

// Cache at cold start — don't call Secrets Manager on every invocation
let cachedSecrets: Secrets | null = null;
let cacheExpiry = 0;

async function getSecrets(): Promise<Secrets> {
  if (cachedSecrets && Date.now() < cacheExpiry) return cachedSecrets;

  const { SecretString } = await client.send(
    new GetSecretValueCommand({ SecretId: '/prod/payment-service' }),
  );
  cachedSecrets = JSON.parse(SecretString!);
  cacheExpiry = Date.now() + 5 * 60 * 1000; // refresh every 5 min
  return cachedSecrets;
}
```

**Rotation:** Secrets Manager supports automatic rotation via a rotation Lambda — rotate DB passwords without downtime by updating the secret and updating the connection string.

**Access control:** Lambda execution role gets `secretsmanager:GetSecretValue` only on its specific secret ARN. No wildcard.

**For non-sensitive config** (feature flags, region endpoints): use SSM Parameter Store (Standard tier — free) with `/env/{environment}/service/key` naming convention.

**What they're really testing →** Security-first infrastructure design — at a fintech, leaked credentials = account takeover = regulatory action.

</details>

---

### Q26 — How do you observe and debug a Lambda that is silently failing? `Medium`

<details>
<summary>Answer</summary>

Silent failures in Lambda (no error thrown, but wrong output) are the hardest to debug.

**Structured logging first:**
```ts
// Every Lambda invocation should emit a structured log with outcome
export const handler = async (event: SQSEvent) => {
  const logger = createLogger({ traceId: event.Records[0]?.messageId });

  for (const record of event.Records) {
    try {
      const result = await processRecord(record);
      logger.info({ event: 'record_processed', recordId: record.messageId, result });
    } catch (err) {
      logger.error({ event: 'record_failed', recordId: record.messageId, error: err });
      // Re-throw to trigger DLQ — don't swallow
      throw err;
    }
  }
};
```

**CloudWatch Logs Insights query for silent failures:**
```sql
fields @timestamp, traceId, event, recordId
| filter event = 'record_processed' and result != 'success'
| sort @timestamp desc
| limit 100
```

**Metrics:** emit custom metrics via `aws-embedded-metrics` — `payment.processed`, `payment.failed`, `payment.duration`. Set CloudWatch alarms on success rate dropping below threshold.

**X-Ray tracing:** enables you to see which downstream call (DynamoDB, external API) added latency or returned an unexpected response even when the Lambda itself didn't throw.

**What they're really testing →** Observability discipline — you can't fix what you can't see.

</details>

---

## 5. React / React Native

### Q27 — How does React reconciliation (diffing) work? `Medium`

<details>
<summary>Answer</summary>

React's reconciler (Fiber in React 16+) diffs the new virtual DOM tree against the previous one to compute the minimal set of DOM mutations.

**Heuristics:**
1. **Different element types** → destroy old subtree, create new one (don't try to diff across types)
2. **Same element type** → update existing DOM node in place (change attributes)
3. **Lists** → use `key` prop to match elements across renders; without keys, React uses index (causes bugs on reorder)

```tsx
// BAD — index as key causes wrong component to update on filter/sort
{patients.map((p, i) => <PatientRow key={i} patient={p} />)}

// GOOD — stable unique ID
{patients.map(p => <PatientRow key={p.id} patient={p} />)}
```

**Fiber** enables concurrent rendering by splitting the reconciliation work into units of work ("fibers") that can be paused and resumed — this is the foundation for Suspense and Transitions.

**What they're really testing →** React internals understanding — important for debugging performance issues in data-heavy UIs.

</details>

---

### Q28 — How do you test React components effectively? `Medium`

<details>
<summary>Answer</summary>

Use **React Testing Library** (RTL) — test behaviour, not implementation.

```tsx
// Testing a payment form component
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('PaymentForm', () => {
  it('submits with correct amount and shows success', async () => {
    const mockSubmit = jest.fn().mockResolvedValue({ transactionId: 'TXN-001' });
    render(<PaymentForm onSubmit={mockSubmit} />);

    await userEvent.type(screen.getByLabelText('Amount'), '500');
    await userEvent.selectOptions(screen.getByLabelText('Method'), 'UPI');
    await userEvent.click(screen.getByRole('button', { name: /pay/i }));

    await waitFor(() => {
      expect(screen.getByText('Payment successful')).toBeInTheDocument();
    });
    expect(mockSubmit).toHaveBeenCalledWith({ amount: 500, method: 'UPI' });
  });

  it('shows validation error for negative amount', async () => {
    render(<PaymentForm onSubmit={jest.fn()} />);
    await userEvent.type(screen.getByLabelText('Amount'), '-100');
    await userEvent.click(screen.getByRole('button', { name: /pay/i }));
    expect(screen.getByText('Amount must be positive')).toBeInTheDocument();
  });
});
```

**Philosophy:** query by accessible role/label (not by className or testId) — if a screen reader can't find it, the test shouldn't either. Test the user's experience, not internal state.

**What they're really testing →** Test quality judgment — does this engineer write tests that give confidence or false confidence?

</details>

---

### Q29 — How do you handle deep linking and navigation in React Native? `Medium`

<details>
<summary>Answer</summary>

Use **React Navigation** with `Linking` configuration for deep links.

```ts
// App.tsx — link config
const linking: LinkingOptions<RootParamList> = {
  prefixes: ['setu://', 'https://app.setu.co'],
  config: {
    screens: {
      PaymentStatus: 'payment/:transactionId',
      ConsentApproval: 'consent/:consentId',
    },
  },
};

// Android: Intent filter in AndroidManifest.xml
// iOS: URL scheme in Info.plist + Universal Links entitlement

// Navigation
const PaymentStatusScreen = () => {
  const { transactionId } = useRoute<PaymentStatusRouteProp>().params;
  const { data } = useQuery(['payment', transactionId], () =>
    api.getPayment(transactionId),
  );
  return <View>{/* render status */}</View>;
};
```

**UPI deep links:** UPI apps (GPay, PhonePe) use `upi://pay?pa=merchant@upi&pn=MerchantName&am=500&tn=OrderRef` — this is a standard, not Setu-specific. After the UPI app completes, it returns to your app via the `callbackUri` you passed.

**What they're really testing →** Mobile integration awareness — Setu's SDK surfaces in mobile apps.

</details>

---

### Q30 — What is the Virtual DOM and why does React Native not use it? `Easy`

<details>
<summary>Answer</summary>

The **Virtual DOM** is a JavaScript representation of the UI tree. React diffs it against the previous tree to compute minimal DOM mutations, then applies them to the real browser DOM in a batch.

**React Native** doesn't have a browser DOM — it renders to native platform views (UIKit on iOS, Android Views). Instead of a Virtual DOM → browser DOM pipeline, React Native has:

```
JSX → React reconciler → Shadow tree (JS thread)
                              ↓
                     Yoga layout engine (cross-platform C++ layout)
                              ↓
                     Native bridge → Native UI (UIView / android.view.View)
```

**New Architecture (React Native 0.71+):** The bridge (serialized JSON over async bridge) is replaced by **JSI (JavaScript Interface)** — synchronous, direct C++ calls from JS. **Fabric** is the new renderer, **TurboModules** are the new native module system. This eliminates the async bridge bottleneck.

**What they're really testing →** Cross-platform rendering knowledge — useful if Setu has a React Native SDK.

</details>

---

## 6. Fintech Domain & Compliance (India-specific)

### Q31 — What is the Account Aggregator framework and how does it differ from screen-scraping? `Medium`

<details>
<summary>Answer</summary>

**Screen-scraping:** a third party takes the user's bank username/password and logs in on their behalf to fetch data. Illegal under RBI guidelines (sharing credentials violates bank T&Cs), insecure, breaks on UI changes.

**Account Aggregator (AA):** RBI-regulated framework where:
- User grants consent to a specific FIU (lender, insurer, etc.) for specific data, time period, and purpose
- FIP (bank) shares data directly with the AA/FIU without the user sharing credentials
- Consent is digitally signed, auditable, revocable
- Data is encrypted in transit (ECDH key exchange per session)

**Technical difference:**
```
Screen scraping: FIU → user's bank login (credential theft risk)
AA:              User → Consent Manager → signs artefact
                 FIU presents artefact → FIP validates → shares encrypted data
```

**Consent properties:** purpose-limited (can't use salary data for marketing), data-type limited (only bank deposits, not mutual funds unless specified), time-limited (auto-expires), revocable at any time.

**What they're really testing →** Understanding of Setu's core AA product vs the illegal alternative it replaces.

</details>

---

### Q32 — What are the key RBI guidelines for payment data storage that affect your API design? `Hard`

<details>
<summary>Answer</summary>

**RBI Storage of Payment System Data circular (2018) and updates:**

1. **Data localisation** — all payment system data must be stored only in India. No mirroring to foreign data centres. AWS `ap-south-1` only for payment data; disable cross-region replication for payment DBs.

2. **Card data** — PCI-DSS compliance: never store CVV; store card numbers only in tokenised form (Visa/Mastercard network tokens); encrypted at rest with HSM-managed keys.

3. **Transaction data retention** — store for 5 years (audit trail requirement).

4. **Access controls** — role-based access to production payment data; access logs for all queries on payment records; quarterly access review.

5. **Breach notification** — notify RBI within 6 hours of a payment data breach (stricter than DPDP's 72h for general PHI).

**Engineering implications:**
```ts
// Payment records: ap-south-1 DynamoDB, no global tables with foreign regions
// Card tokens: never log, mask in all log outputs
const maskedCard = `****${cardNumber.slice(-4)}`; // log this, never the full number
// Retention: DynamoDB TTL set to current_time + 5 years
```

**What they're really testing →** RBI compliance knowledge — every Setu engineer must understand this.

</details>

---

### Q33 — Explain UPI and NPCI's role in the payment stack. What are UPI's transaction limits? `Easy`

<details>
<summary>Answer</summary>

**UPI (Unified Payments Interface)** — NPCI's real-time interbank payment protocol. Built on IMPS rails, layered with VPA (Virtual Payment Address), instant settlement, 24×7 availability.

**NPCI (National Payments Corporation of India)** — the umbrella organisation for retail payments in India. Operates UPI, IMPS, RuPay, NACH, AePS, BBPS, FASTag.

**UPI payment flow:**
```
Payer App → PSP (Payment Service Provider) → NPCI switch → Beneficiary PSP → Bank
                                                      ↓
                                              Real-time debit/credit
                                              Settlement: NPCI net-settles banks T+1
```

**Transaction limits (as of 2024):**
- Regular UPI: ₹1 lakh per transaction
- UPI Lite (offline, wallet-based): ₹500 per transaction, ₹2,000 wallet limit
- UPI One World (international): varies
- IPO, insurance, medical: higher limits (₹2–5 lakh in specific categories)

**Failure codes** every Setu engineer knows:
- `ZM` — transaction declined by remitter bank
- `AM` — amount not available
- `XB` — UPI transaction not permitted (limits/risk)
- `TS` — transaction timed out (retry with same TXNID for idempotency)

**What they're really testing →** Payment domain fluency — can you speak the language of India's payment infrastructure?

</details>

---

### Q34 — What is BBPS and how would you integrate a biller into it? `Medium`

<details>
<summary>Answer</summary>

**BBPS (Bharat Bill Payment System)** — NPCI's interoperable bill payment platform. Covers electricity, water, gas, broadband, insurance, education, FASTag, municipal taxes. ~10,000+ billers registered.

**Actors:**
- **Customer Ou (COU)** — the customer-facing app (Paytm, CRED, Setu-powered app)
- **Operating Unit (OU)** — an NPCI-licensed entity that connects billers and agents (Setu is an OU)
- **Biller** — the utility company wanting to receive payments

**Biller integration steps:**

```
1. Biller registers on BBPS portal → gets Biller ID
2. Biller exposes two APIs to Setu/OU:
   a. fetchBill: POST { billerId, customerIdentifier } → { billAmount, dueDate }
   b. confirmPayment: POST { txnId, billerId, amount } → { confirmationNo }
3. Setu maps biller to BBPS category + validates response schema
4. End-to-end test on BBPS UAT environment
5. Production go-live after NPCI certification
```

**Node.js integration:**
```ts
async function fetchBill(billerId: string, identifier: string) {
  const response = await billerClient.post('/fetchBill', {
    billerID: billerId,
    customerParams: [{ name: 'mobileNumber', value: identifier }],
  });
  // Map biller-specific response to BBPS canonical format
  return mapToBBPSBill(response.data);
}
```

**What they're really testing →** Understanding of Setu's BBPS product — the candidate should know the product they'd be building.

</details>

---

### Q35 — How does NACH (National Automated Clearing House) work and what are the failure modes? `Medium`

<details>
<summary>Answer</summary>

**NACH** — RBI/NPCI's bulk recurring debit system. Used for EMI collection, SIP mandates, insurance premiums, utility standing instructions.

**NACH mandate flow:**
```
1. Mandate Registration:
   Customer → signs e-NACH mandate (Aadhaar/netbanking OTP)
   Sponsor bank → presents mandate to NPCI
   NPCI → routes to Destination bank → approves/rejects
   TTL: 3-5 working days

2. Debit Transaction:
   Sponsor (lender/insurer) → sends debit file to NPCI (batch, D-1)
   NPCI → presents to destination banks
   Settlement: T+1 (next business day)
```

**Common failure modes:**
| Code | Meaning | Handling |
|---|---|---|
| `01` | Account closed | Mark mandate inactive; notify customer |
| `05` | Do Not Honor | Retry once; escalate to customer |
| `51` | Insufficient funds | Retry in 3 days; send SMS reminder |
| `54` | Expired account | Mark inactive; request mandate re-registration |
| `57` | Transaction not permitted | Check mandate limits; don't retry |

**Engineering implications:** NACH is batch-based (not real-time) — build async status polling, reconciliation jobs, and proper state machines for mandate lifecycle (`PENDING → ACTIVE → PAUSED → CANCELLED`).

**What they're really testing →** Fintech infrastructure depth beyond UPI — shows you understand the full India payment stack.

</details>

---

## 7. Setu-Specific

### Q36 — How would you improve Setu's developer experience for an API that handles both sync and async callbacks? `Hard`

<details>
<summary>Answer</summary>

A payment API that returns immediately but delivers the final result via webhook creates friction for developers. My approach to improve DX:

**1. Webhooks + polling fallback:**
```ts
// Client doesn't need to set up a webhook for testing
// GET /payment-links/{id}/status returns current state
// Polling is less efficient but removes the tunnel/ngrok requirement for devs
```

**2. Sandbox with instant resolution:**
```ts
// POST /payment-links (sandbox environment)
// Add a test header: X-Setu-Simulate: success | failure | timeout
// Webhook fires synchronously in sandbox so devs can see the flow without waiting
```

**3. Webhook inspector (like Stripe's dashboard):**
- Show every webhook delivery attempt, payload, response code, and retry history
- "Resend webhook" button for manual replay during debugging

**4. SDK design:**
```ts
// Don't make devs poll — SDK handles it
const setu = new Setu({ clientId, clientSecret, mode: 'sandbox' });

const result = await setu.payments.waitForCompletion(paymentLinkId, {
  timeout: 30_000,  // SDK polls internally, resolves when terminal state
  pollInterval: 2000,
});
```

**5. Error messages that explain what to do:**
```json
{ "error": "MANDATE_NOT_ACTIVE", "message": "The NACH mandate for this customer is not active.", "action": "Re-register mandate via /mandates endpoint" }
```

**What they're really testing →** API design empathy — Setu's product IS the developer experience.

</details>

---

### Q37 — A merchant reports payments going through on their side but not reflecting in your system. How do you debug it? `Hard`

<details>
<summary>Answer</summary>

This is a webhook delivery failure or idempotency issue. I'd work through layers:

**Step 1 — Get identifiers:**
- Merchant's transaction reference, timestamp, amount
- Their UPI transaction ID (from their bank statement)

**Step 2 — Check NPCI logs:**
- Did NPCI confirm the transaction? Check the UPI transaction ID in our NPCI reconciliation feed
- If NPCI shows success → our ingestion layer missed it

**Step 3 — Check webhook receipt:**
```sql
SELECT * FROM webhook_events
WHERE source_transaction_id = 'TXN-XYZ'
ORDER BY received_at DESC;
```
- If row exists → check processing status. Was it a processing failure?
- If no row → we never received the webhook. Check with bank/NPCI.

**Step 4 — Check idempotency table:**
- Did we receive the webhook but dedup it incorrectly?
- Did we process it but fail to update the merchant-facing status?

**Step 5 — Manual reconciliation:**
- Compare NPCI settlement file (received T+1) against our DB
- Any transaction in NPCI file not in our DB = missed webhook → needs manual credit

**Step 6 — Fix and prevent:**
- If webhook was missed: trigger manual reprocessing from DLQ or NPCI file
- Root cause: likely a Lambda timeout or HMAC verification bug on a specific bank's payload format
- Add contract test to catch format divergence from this bank

**What they're really testing →** Production incident debugging — can you trace a missing payment end-to-end?

</details>

---

### Q38 — How would you design Setu's SDK for Node.js? What would the ideal API surface look like? `Medium`

<details>
<summary>Answer</summary>

```ts
// Initialization — minimal config required
const setu = new Setu({
  clientId: process.env.SETU_CLIENT_ID,
  clientSecret: process.env.SETU_CLIENT_SECRET,
  mode: 'production', // | 'sandbox'
});

// UPI collection — clear, fluent, typed
const link = await setu.upi.createCollectionLink({
  amount: 500_00, // in paise — no ambiguity
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  customerVpa: 'customer@upi',
  merchantOrderId: 'ORD-001', // used as idempotency key
  description: 'Order payment',
});
// link.shortUrl, link.paymentUrl, link.upiDeepLink

// Webhook verification — built into SDK, devs shouldn't parse manually
app.post('/webhooks/setu', (req, res) => {
  const event = setu.webhooks.parse(req.body, req.headers['x-setu-signature']);
  // event is fully typed: SetuPaymentEvent | SetuRefundEvent | ...
  if (event.type === 'payment.captured') {
    console.log(event.data.transactionId);
  }
});

// Error handling — structured, actionable
try {
  await setu.upi.refund({ transactionId, amount });
} catch (err) {
  if (err instanceof SetuError) {
    console.log(err.code);   // 'REFUND_WINDOW_EXPIRED'
    console.log(err.action); // 'Refund must be initiated within 24h of payment'
  }
}
```

**Design principles:**
- Paise over rupees (eliminates float bugs)
- All timestamps as `Date` objects (not strings)
- Typed discriminated unions for event types
- Idempotency keys built-in (merchant order ID = natural idempotency key)
- Auto-retry for network errors, not for business logic errors

**What they're really testing →** API design taste — the SDK is Setu's product interface.

</details>

---

### Q39 — Setu processes billions of rupees in transactions. How would you approach a performance regression? `Hard`

<details>
<summary>Answer</summary>

**Define "regression" first:** P50 latency increase? P99? Error rate? Throughput drop? Without a baseline metric, you can't declare a regression.

**Investigation workflow:**

1. **Identify the metric that degraded** — CloudWatch dashboard: Lambda duration P99, DynamoDB consumed RCU/WCU, external API latency

2. **Correlate with deploy timeline:**
```bash
# When did P99 start climbing?
# Did it coincide with a deploy? A traffic spike? An upstream (NPCI) degradation?
```

3. **Flame graph / profiling** — use `clinic flame` or `0x` on a Lambda with representative traffic replay to find hot functions

4. **Database query analysis:**
```sql
-- PostgreSQL: find slow queries since last deploy
SELECT query, mean_exec_time, calls
FROM pg_stat_statements
WHERE mean_exec_time > 100
ORDER BY mean_exec_time DESC;
```
Missing index after schema change is the #1 cause of post-deploy regressions in DB-backed services.

5. **N+1 check** — did a recent feature add a loop that queries inside a loop?

6. **Memory pressure** — heap usage growing? GC pauses increasing? Check `process.memoryUsage()` metrics.

**After finding the cause:** deploy fix to staging, run load test (Artillery/k6) to confirm regression is gone before promoting to prod.

**What they're really testing →** Performance debugging maturity — systematic investigation, not random guessing.

</details>

---

### Q40 — Why do you want to join Setu specifically? `Easy`

<details>
<summary>Answer</summary>

Setu is building the plumbing for India's financial system — the same way AWS built infrastructure that other companies build on. That's a genuinely hard problem with deep regulatory complexity, high-stakes reliability requirements, and a developer experience challenge on top.

My background is production API infrastructure at scale: 245+ Lambda functions at UTEC, an agentic AI platform at EY, and a telemedicine API at Vkonnect. At every point I've cared about API design quality and system reliability. Setu is the company in India where those two obsessions — clean APIs and distributed systems correctness — are the product.

The AA gateway specifically is interesting to me because I see how it intersects with ABDM. Health data sharing via consent-based financial data access is the next frontier — a patient's financial stress is a health determinant; a lender who can see both financial and health context gives better credit decisions. That integration is where I want to be.

**What they're really testing →** Motivation depth — do you understand the product or are you just looking for a job?

</details>

---

## 8. Behavioral / STAR

### Q41 — Tell me about a time you improved the reliability of a critical system. `Medium`

<details>
<summary>Answer</summary>

**Situation:** At UTEC, our notification pipeline was delivering payment confirmation messages unreliably during peak hours — about 3–5% of messages were silently dropped, which we discovered only when contractors called support.

**Task:** Find the root cause and fix it without a full rewrite, since the pipeline was live and processing thousands of events daily.

**Action:**
- Instrumented every Lambda consumer with structured logging and a `processed/failed` metric
- Found the issue: Lambda concurrency was hitting its reserved limit (20), causing SQS messages to timeout and re-queue, then eventually expire without being delivered
- Short-term: raised concurrency limit to 100 for that specific Lambda
- Long-term fix: refactored the Lambda to use SQS batch processing (`batchSize: 10`) instead of single-message polling — 10× throughput with the same concurrency footprint
- Added a DLQ alarm: any message hitting DLQ triggers a PagerDuty alert within 60 seconds

**Result:** Silent drop rate dropped to 0. SQS DLQ alarm has fired twice in 8 months — both times caught within 2 minutes and fixed before user impact.

**What they're really testing →** Production reliability ownership — at a payment company this is non-negotiable.

</details>

---

### Q42 — Describe a time you had to learn something quickly to meet a deadline. `Easy`

<details>
<summary>Answer</summary>

**Situation:** EY brought me onto Risk.ai mid-project when they needed someone who could integrate GPT-4 into a production Node.js backend. I had used OpenAI's API for side projects but had no production agentic AI experience.

**Task:** Build a multi-step document analysis agent that could read 50-page risk assessment PDFs, extract structured findings, and generate a risk score — in 3 weeks before a client demo.

**Action:**
- Spent the first 3 days reading the OpenAI function-calling docs, LangChain source code, and published papers on ReAct (Reasoning + Acting) agents
- Built a minimal agent loop in TypeScript without LangChain to understand the primitives — tool calling, context window management, multi-turn conversation state
- Identified the hardest problem early: PDFs exceeded the context window. Solved with a chunking + RAG approach using OpenSearch for vector search
- Wrote daily notes summarising what I'd learned and what I'd build the next day — kept me from going in circles

**Result:** Demo landed. Risk.ai now processes 200+ documents/day in production. That architecture (TypeScript agent loop + RAG) became my template for all subsequent agentic AI work.

**What they're really testing →** Learning velocity and structured self-teaching — critical at a fast-moving startup like Setu.

</details>

---

### Q43 — How do you approach code reviews? Give an example of a difficult feedback you gave or received. `Medium`

<details>
<summary>Answer</summary>

My code review philosophy: correctness first, then performance, then readability. I comment on what matters and don't nitpick style (that's what linters are for).

**Difficult feedback I gave:** At UTEC, a junior engineer submitted a PR that added a feature flag by reading SSM Parameter Store on every request — a 50ms cold I/O hit on every API call in a hot path. Telling someone their code is fundamentally wrong (not just stylistically off) requires care.

How I handled it:
1. Started with what was right: "The feature flag approach is exactly right for this use case — it allows us to roll back without a deploy."
2. Explained the problem specifically: "The issue is calling SSM on every request — that's ~50ms latency added to every API call, and at our traffic volume that's significant."
3. Suggested the fix: "Cache the SSM value in a module-level variable, refresh every 5 minutes. Here's a pattern we use elsewhere: [link to existing code]."
4. Offered to pair on it: "Want to do a quick 20 min session to work through the caching pattern?"

The engineer implemented it well, and it became a teaching moment he referenced in future PRs.

**What they're really testing →** Collaboration and mentoring ability — SDE 2s are expected to raise the team's quality.

</details>

---

### Q44 — Tell me about a time you pushed back on a product requirement and were right. `Hard`

<details>
<summary>Answer</summary>

**Situation:** At UTEC, product wanted to add a "retry failed payment" button that would automatically re-initiate the payment with the same amount and reference ID if the first attempt failed.

**Task:** I needed to flag a serious risk before we built this.

**Action:**
- Flagged the idempotency concern immediately: "If the first payment actually succeeded but the webhook failed to reach us, clicking 'retry' would charge the contractor twice."
- Backed it up with data: showed 3 historical cases where our webhook receiver had a 30-second outage and payments succeeded at the bank but were marked as failed in our system
- Proposed an alternative: before allowing a retry, call the bank's transaction status API to confirm the original payment actually failed. Show the confirmed status to the user before the retry button is active.
- Estimated the effort: 1 extra day to add the status check vs potentially weeks of support incidents and refunds for double-charges

**Result:** Product agreed. We built the status-check-first retry flow. In the 6 months after launch, we detected 14 cases where a "failed" payment had actually succeeded — preventing 14 double-charges. No support incident related to this feature.

**What they're really testing →** Technical judgment and stakeholder influence — can you protect the product from well-intentioned but dangerous features?

</details>

---

### Q45 — Where do you see yourself in 3 years? `Easy`

<details>
<summary>Answer</summary>

In 3 years I want to be the engineer that junior engineers come to when they're stuck on a hard distributed systems or API design problem — the person who's seen enough production failures and edge cases to give them a grounded answer, not just a theoretical one.

Specifically in the fintech/healthtech space: I want to have deep working knowledge of the full India financial infrastructure stack — UPI, AA, NACH, BBPS, ABDM — not just as an integrator but as someone who can design new products on top of it. The intersection of financial and health data (consent-based data sharing, insurance underwriting with health context) is where I think the most interesting engineering problems are in India right now.

At a company like Setu, that means contributing to the core platform — not just using the APIs but making them better. I'd want to be the person who ships the next version of the SDK design, or solves the AA consent flow edge case that's been blocking enterprise clients.

I'm not in a rush for a management track — I want to stay technical and go deeper, not broader.

**What they're really testing →** Ambition calibration and alignment with the company's trajectory.

</details>

---

*Generated for interview prep — covers Setu's fintech API infrastructure domain with Node.js/TypeScript/AWS depth and India-specific payment/regulatory context.*
