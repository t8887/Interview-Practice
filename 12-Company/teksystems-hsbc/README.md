# TEKsystems → HSBC — Node.js Backend Developer / Architect Interview Prep

> **Vendor:** TEKsystems (Allegis Group) | **End client:** HSBC | **Target:** Node.js Backend Developer / Architect, 5+ yrs, Pune
> **Stack match:** Node.js · TypeScript · Express · Microservices · AWS serverless · MongoDB · Redis · System design
> **Domain to bridge:** Banking / fintech — frame every answer through *security, idempotency/correctness, auditability, reliability*.

---

## Company Brief

**TEKsystems** is a staffing / managed-services firm (Allegis Group) that places contractors into client teams. **Interview difficulty and content depend almost entirely on the *client* — here, HSBC — not on TEKsystems.** Expect a recruiter screen, a possible **KARAT** live technical assessment (third-party, recorded, with a real engineer + auto follow-ups), then HSBC's own panel.

**HSBC** manages ~$3.2T in assets across ~60+ markets — its engineering culture is **risk-disciplined, security-first, reliability-obsessed**. They probe CS fundamentals hard (even at senior level), go deep on project architecture, and align behavioural questions to **four core values**: *We value difference · We succeed together · We take responsibility · We get it done.* Difficulty ~3/5, thorough not brutal — depth + clarity wins.

**Likely 2-round split** (confirm with the recruiter): Round 1 = technical deep-dive (Node internals, REST API, SQL+NoSQL, possible KARAT coding); Round 2 = system design / architecture + project walkthrough + behavioural.

*Sources: Glassdoor (TEKsystems & HSBC, incl. Pune/KARAT reports), Naukri/Code360, LeetCode Discuss, GeeksforGeeks, HSBC published values. See the full guide: [`../teksystems-hsbc-nodejs-backend.md`](../teksystems-hsbc-nodejs-backend.md).*

---

## Buckets

1. [Core JavaScript / TypeScript](#1-core-javascript--typescript) — 6 questions
2. [Node.js Internals & Backend](#2-nodejs-internals--backend) — 8 questions
3. [REST API & Express Design](#3-rest-api--express-design) — 5 questions
4. [Security & Auth](#4-security--auth) — 5 questions
5. [Databases & Caching](#5-databases--caching) — 6 questions
6. [System Design & Architecture](#6-system-design--architecture) — 7 questions
7. [DevOps / CI-CD / Containers](#7-devops--ci-cd--containers) — 3 questions
8. [Behavioral / STAR (HSBC values)](#8-behavioral--star-hsbc-values) — 5 questions

**Total: 45**

---

## 1. Core JavaScript / TypeScript

### Q1 — Predict the output: ordering of `setTimeout`, `setImmediate`, `process.nextTick`, and a Promise. `Hard`

<details>
<summary>Answer</summary>

```js
console.log('start');
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));
console.log('end');
```

**Output:**
```
start
end
nextTick     // microtask: nextTick queue drains first
promise      // microtask: Promise queue drains after nextTick
timeout      // (timeout vs immediate order is non-deterministic at top level)
immediate
```

**The rules that matter:**
- Synchronous code runs first (`start`, `end`).
- Between phases, Node drains microtasks: **`process.nextTick` queue first, then the Promise queue.** `nextTick` has *higher* priority — overusing it can starve the loop.
- `setTimeout(fn, 0)` (timers phase, ~1ms clamp) vs `setImmediate` (check phase) order is **non-deterministic at the top level**. Inside an I/O callback, `setImmediate` reliably fires first.

**What they're really testing →** Event-loop fluency via output prediction — the highest-frequency Mettl/KARAT JS topic. Don't just memorise the answer; explain *why*.

</details>

---

### Q2 — Why does a `var` loop counter inside an async callback print the wrong value? `Easy`

<details>
<summary>Answer</summary>

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Prints: 3, 3, 3  — all closures share the one function-scoped `i`

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Prints: 0, 1, 2  — each iteration gets its own block-scoped `i`
```

`var` is **function-scoped** and hoisted (initialised `undefined`); by the time the async callbacks run, the loop has finished and `i === 3`. `let`/`const` are **block-scoped** with a TDZ, so each iteration captures a fresh binding. Rule: `const` by default, `let` when you need mutation, never `var` — in money-handling async code a `var` counter is a silent bug.

**What they're really testing →** Scope, hoisting, and closure fundamentals — non-negotiable for async-heavy backend code.

</details>

---

### Q3 — `Promise.all` vs `allSettled` vs `race` vs `any` — when do you use each? `Medium`

<details>
<summary>Answer</summary>

| Combinator | Settles when | Result |
|---|---|---|
| `Promise.all` | all fulfil **or** first rejects | array of values, or first error (fail-fast) |
| `Promise.allSettled` | all settle | array of `{status, value/reason}` — never rejects |
| `Promise.race` | first settles (fulfil **or** reject) | that value/reason |
| `Promise.any` | first **fulfils** (or all reject) | first value, or `AggregateError` |

**Banking framing:**
- `all` — fan-out to several services where you need *all* to succeed (fail-fast on any error).
- `allSettled` — batch of independent operations (e.g. notify 100 recipients); you want every result, partial failure is acceptable.
- `race` — implement a **timeout** (`Promise.race([work, timeout])`).
- `any` — first healthy replica/provider wins.

Also: `await p1; await p2` is **sequential** (double the latency if independent) — use `Promise.all([p1, p2])` for concurrency.

**What they're really testing →** Async fluency and a performance instinct.

</details>

---

### Q4 — Implement `debounce` and explain how it differs from `throttle`. `Medium`

<details>
<summary>Answer</summary>

```js
// debounce: run fn only after `delay` ms of silence (resets on each call)
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// throttle: run fn at most once per `limit` ms
function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    if (inThrottle) return;
    fn.apply(this, args);
    inThrottle = true;
    setTimeout(() => (inThrottle = false), limit);
  };
}
```

**Difference:** *debounce* waits for a quiet period and fires once (search-as-you-type, autosave, resize-end). *throttle* guarantees a steady max rate (scroll handlers, rate-limited API calls, telemetry). Debounce = "fire after it stops"; throttle = "fire at most every N ms".

**What they're really testing →** A classic KARAT/Mettl JS-mechanics question — closures + timers in practice.

</details>

---

### Q5 — Write a deep clone. What are the pitfalls of `JSON.parse(JSON.stringify(x))`? `Medium`

<details>
<summary>Answer</summary>

```js
function deepClone(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);
  if (seen.has(obj)) return seen.get(obj);     // handle circular refs

  const copy = Array.isArray(obj) ? [] : {};
  seen.set(obj, copy);
  for (const key of Reflect.ownKeys(obj)) {
    copy[key] = deepClone(obj[key], seen);
  }
  return copy;
}
```

**`JSON.parse(JSON.stringify(x))` pitfalls:** drops `undefined`, functions, and `Symbol`s; turns `Date` into a string; loses `Map`/`Set`/`RegExp`/`BigInt`; throws on circular references; `NaN`/`Infinity` become `null`. Fine for plain JSON-safe DTOs, dangerous for rich objects. Modern alternative: `structuredClone()` (Node 17+) handles cycles, Maps/Sets, typed arrays — but not functions.

**What they're really testing →** Recursion, edge-case awareness (cycles, special types), and knowing the standard-library shortcut.

</details>

---

### Q6 — What is `satisfies` in TypeScript and when is it useful? `Medium`

<details>
<summary>Answer</summary>

`satisfies` (TS 4.9+) checks that a value conforms to a type **while keeping the most specific inferred type** — you don't widen to the annotation.

```ts
type RouteConfig = Record<string, { method: string; auth: boolean }>;

const routes = {
  transfer: { method: 'POST', auth: true },
  balance:  { method: 'GET',  auth: true },
} satisfies RouteConfig;

routes.transfer.method; // type 'POST' (literal kept) AND 'transfer' is a known key
// routes.unknown;      // ✗ compile error — caught at build time
```

With a plain `: RouteConfig` annotation you'd validate the shape but lose the literal keys/values (no autocomplete on `transfer`). Useful for config objects, route maps, enum-like records. Signals you keep current with the language — HSBC probes whether seniors know recent features.

**What they're really testing →** Modern TypeScript fluency and type-safety instinct.

</details>

---

## 2. Node.js Internals & Backend

### Q7 — Explain the Node.js event loop and its phases. `Hard`

<details>
<summary>Answer</summary>

Node runs JS on a single main thread with a non-blocking, event-driven model built on **libuv**. The loop runs ordered **phases**, each with its own callback queue:

1. **timers** — `setTimeout` / `setInterval` callbacks whose threshold elapsed
2. **pending callbacks** — deferred I/O callbacks (some system errors)
3. **idle/prepare** — internal
4. **poll** — retrieve new I/O events; execute I/O callbacks; the loop **blocks here** waiting for I/O
5. **check** — `setImmediate` callbacks
6. **close callbacks** — e.g. `socket.on('close')`

Between **every** phase Node drains the **microtask queues**: `process.nextTick` queue first, then the Promise queue. A long synchronous task blocks the *entire* loop — so offload CPU-bound work (Q10).

**Banking framing:** a blocked event loop = every concurrent request stalls = breached latency SLOs. Keep handlers async and non-blocking.

**What they're really testing →** The single highest-frequency senior Node topic. Know the phase order and where microtasks drain.

</details>

---

### Q8 — `setTimeout(fn,0)` vs `setImmediate(fn)` vs `process.nextTick(fn)`. `Medium`

<details>
<summary>Answer</summary>

- **`process.nextTick(fn)`** — runs *before* the loop proceeds to the next phase. Soonest. Highest priority; overuse starves I/O.
- **`setImmediate(fn)`** — runs in the **check** phase, right after **poll**.
- **`setTimeout(fn, 0)`** — runs in the **timers** phase with a minimum ~1ms clamp.

Inside an **I/O callback**, `setImmediate` *reliably* fires before `setTimeout(0)` (you're already past poll → check is next). At the **top level**, the order between the two is non-deterministic (depends on how long the loop took to start). `nextTick` and Promise microtasks always run before either.

**What they're really testing →** Precise understanding of phase ordering, not just memorised trivia.

</details>

---

### Q9 — Node is "single-threaded" — how does it do work in parallel? `Hard`

<details>
<summary>Answer</summary>

JS *execution* is single-threaded, but Node isn't single-threaded overall:

- **libuv thread pool** (default 4, `UV_THREADPOOL_SIZE`) handles work the OS can't do async natively: `fs.*`, `dns.lookup()`, some `crypto` (`pbkdf2`, `randomBytes`, bcrypt), and `zlib`.
- **Network I/O does NOT use the thread pool** — it uses OS async primitives (epoll/kqueue/IOCP). That's why thousands of concurrent sockets scale without a thread per connection.

**Gotcha to mention:** doing bcrypt or heavy crypto on every request consumes the 4 pool threads — a burst of 100 requests queues behind 4 slots. Fix: move it off the hot path or raise `UV_THREADPOOL_SIZE`.

**What they're really testing →** Whether you actually understand the runtime model vs reciting "Node is single-threaded".

</details>

---

### Q10 — How do you scale Node across CPU cores? `cluster` vs `worker_threads`. `Medium`

<details>
<summary>Answer</summary>

- **`cluster`** — forks multiple *processes*, each with its own event loop and memory, sharing a port via the primary (round-robin). Best for scaling **request handling / I/O** across cores; a dead worker can be auto-restarted.
- **`worker_threads`** — multiple *threads* in one process with **shared memory** (`SharedArrayBuffer`). Best for **CPU-bound work** (parsing, crypto, data crunching) that would otherwise block the main loop.
- **Production:** prefer **PM2** (cluster + zero-downtime reload) or, better, **horizontal scaling behind a load balancer / Kubernetes**, one Node process per container.

**One-liner:** *"cluster = scale I/O across cores via processes; worker_threads = move CPU work off the main loop via threads; containers + LB = scale across machines."*

**What they're really testing →** Knowing the right tool for I/O-bound vs CPU-bound scaling.

</details>

---

### Q11 — How do you handle errors correctly in async Node code? `Medium`

<details>
<summary>Answer</summary>

- **`async/await`:** wrap awaited calls in `try/catch`. An unhandled rejection in a route otherwise crashes or hangs the request.
- **Express:** route async errors to **error-handling middleware** `(err, req, res, next)` registered *last*. Use an async wrapper (`(req,res,next) => fn(req,res,next).catch(next)`) so rejected promises reach it.
- **Process-level:** attach `process.on('unhandledRejection')` and `process.on('uncaughtException')` to **log + gracefully shut down**. After an uncaught exception the process is in an unknown state — drain connections and exit; let the orchestrator restart it. **Don't keep serving.**
- **Distinguish** operational errors (bad input, downstream timeout — handle/retry) from programmer errors (bugs — fail fast).

**What they're really testing →** Production reliability discipline — a bank cannot have a process silently wedged.

</details>

---

### Q12 — What is backpressure in streams and how do you handle it? `Hard`

<details>
<summary>Answer</summary>

Backpressure happens when a Writable can't consume data as fast as a Readable produces it; without handling, data buffers in memory until the process OOMs.

```js
// BAD — ignores write()'s false return, buffer grows unboundedly
readable.on('data', chunk => writable.write(chunk));

// GOOD — pause/resume on the drain signal
readable.on('data', chunk => {
  if (!writable.write(chunk)) {
    readable.pause();
    writable.once('drain', () => readable.resume());
  }
});

// BEST — pipeline() handles backpressure + error propagation + cleanup
import { pipeline } from 'stream/promises';
await pipeline(readable, transform, writable);
```

**Banking scenario:** streaming a large settlement/transaction export from S3 through a parser to a DB writer — without backpressure the source floods the sink and OOMs the worker. Use `pipeline()`.

**What they're really testing →** Production stream handling for "high-throughput backend", not just that streams exist.

</details>

---

### Q13 — How do you find and prevent memory leaks in a long-running Node service? `Hard`

<details>
<summary>Answer</summary>

**Common causes:** unbounded in-memory caches/Maps, accumulating event listeners (no `removeListener`), uncleared timers/intervals, closures holding large references, module-scope state growing per request, leaked DB connections.

**Detect:**
- Trend `process.memoryUsage()` (`heapUsed`, `rss`).
- **Heap snapshots** via `--inspect` + Chrome DevTools — take two snapshots minutes apart; objects that keep growing are leak candidates.
- `clinic.js` / `0x` flame graphs; `node --prof` for V8 profiling; Datadog/CloudWatch in prod.

**Fix:**
```js
import { LRUCache } from 'lru-cache';
const cache = new LRUCache({ max: 1000, ttl: 60_000 }); // bounded, not a raw Map

const t = setInterval(poll, 5000);
process.on('SIGTERM', () => clearInterval(t));            // clear timers on shutdown

db.on('error', handleError);                              // register listeners once, outside handlers
```

**Banking framing:** memory stability = availability = trust. Add a canary deploy + alert on the memory trend.

**What they're really testing →** This is an explicit HSBC question. Show detection tooling + concrete fixes, not just "use less memory".

</details>

---

### Q14 — Design a robust retry mechanism with exponential backoff. Why jitter? `Medium`

<details>
<summary>Answer</summary>

```js
async function withRetry(fn, { maxAttempts, baseMs, maxMs, retryOn }) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const last = attempt === maxAttempts;
      if (last || (retryOn && !retryOn(err))) throw err;
      const expo = baseMs * 2 ** (attempt - 1);
      const delay = Math.min(expo + Math.random() * baseMs, maxMs); // jitter
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
```

- **Exponential backoff** spaces out retries so you don't hammer a struggling downstream.
- **Jitter** (randomness) is critical at scale: without it, thousands of clients that failed at the same instant retry *simultaneously* → a thundering herd that takes the upstream down again.
- **Only retry idempotent / transient failures** (timeouts, 503). Never blindly retry a money debit without an **idempotency key**, or a 400 validation error (it will keep failing).

**What they're really testing →** Resilience engineering — essential when calling regulated third-party banking systems.

</details>

---

## 3. REST API & Express Design

### Q15 — Design a secure REST API from scratch. `Hard`

<details>
<summary>Answer</summary>

Walk it end to end:

- **Resources & verbs:** nouns for resources; correct methods. **Idempotency:** GET/PUT/DELETE idempotent, POST not — for money operations require an **idempotency key** so a retried request doesn't double-process.
- **Status codes:** 200/201/204; 400/401/403/404/409/422; **429** (rate limit); 5xx.
- **Validation:** schema-validate *every* input (Zod/Joi/celebrate) — never trust the client (injection defence).
- **AuthN/AuthZ:** OAuth2/JWT, least-privilege scopes, RBAC.
- **Hardening:** `helmet` security headers, CORS allow-list, rate limiting, request-size limits, `npm audit`/Snyk on deps, secrets in a secrets manager (never in code).
- **Versioning:** `/v1/...` or header-based.
- **Pagination/filtering:** cursor or offset — never unbounded result sets.
- **Observability:** structured logs with correlation/trace IDs, metrics, **append-only audit logs** (critical for banking).
- **Transport:** TLS everywhere; encrypt sensitive data at rest.

**What they're really testing →** An explicit HSBC favourite. Lead with security and idempotency — that's the banking lens.

</details>

---

### Q16 — What's the correct Express middleware order, and why does it matter? `Easy`

<details>
<summary>Answer</summary>

```
request
  → global middleware: request logging, body parser, helmet, cors, rate limiter
  → route middleware: authentication, authorization, input validation
  → route handler
  → error-handling middleware  (err, req, res, next)   ← registered LAST
```

Order matters because middleware runs top-to-bottom. Body parsing must precede handlers that read `req.body`; auth must precede the handler it guards; **the 4-argument error handler must be registered last** or Express won't route errors to it. Forgetting `next(err)` (or `.catch(next)` on async handlers) means errors never reach it and requests hang.

**What they're really testing →** Practical Express mechanics — a frequent screen question.

</details>

---

### Q17 — How do idempotency keys prevent double-processing of payments? `Hard`

<details>
<summary>Answer</summary>

A network timeout doesn't tell the client whether the server processed the request — so clients retry. Without protection, a retried "transfer ₹X" debits twice.

**Mechanism:**
1. Client generates a unique **idempotency key** (UUID) per logical operation and sends it (e.g. `Idempotency-Key` header).
2. Server stores the key with a uniqueness constraint *in the same transaction* as the effect (e.g. `INSERT ... ON CONFLICT DO NOTHING`, or DynamoDB `ConditionExpression: attribute_not_exists`).
3. First request: process + persist key + cache the response.
4. Retry with the same key: detect the existing record → return the **stored original response** without re-executing.

Keys should expire (e.g. 24h). Combine with a **state machine** (`CREATED → PENDING → SUCCESS|FAILED`) allowing only forward transitions via conditional writes.

**What they're really testing →** The core correctness pattern for money movement — the most important idea for an HSBC backend.

</details>

---

### Q18 — How would you implement API rate limiting in a distributed Node deployment? `Medium`

<details>
<summary>Answer</summary>

Per-instance counters don't work behind a load balancer — centralise in **Redis** so limits are cluster-wide.

```js
async function checkLimit(clientId, limitPerMin) {
  const key = `rl:${clientId}:${Math.floor(Date.now() / 60_000)}`;
  const [, count] = await redis.multi().incr(key).expire(key, 60).exec();
  return { allowed: count <= limitPerMin, remaining: Math.max(0, limitPerMin - count) };
}
// On exceed: respond 429 with Retry-After header.
```

Discuss **algorithm trade-offs:** fixed-window (simple, allows bursts at boundaries), sliding-window (smoother, more state), **token bucket** (allows controlled bursts — often best for APIs; implement atomically with a Lua script). Return `429` + `Retry-After` and `X-RateLimit-*` headers.

**What they're really testing →** Distributed-state thinking + the per-instance pitfall.

</details>

---

### Q19 — REST vs gRPC for inter-service communication — when each? `Medium`

<details>
<summary>Answer</summary>

- **REST/JSON over HTTP:** ubiquitous, human-readable, easy to debug/cache, great for public/partner APIs and browser clients. Costs: verbose payloads, no built-in streaming, looser contracts.
- **gRPC (HTTP/2 + Protobuf):** binary, compact, fast; strong typed contracts via `.proto`; bidirectional streaming; great for **internal service-to-service** at high volume.
- **Also weigh async/event-driven** (Kafka/queues) when you want decoupling and don't need a synchronous reply.

**Rule of thumb:** REST/JSON at the edge (public APIs), gRPC for chatty internal microservice calls, events for decoupled workflows. For a bank, add: explicit timeouts, circuit breakers, and **idempotency** on any call that mutates money.

**What they're really testing →** Pragmatic protocol choice, not dogma.

</details>

---

## 4. Security & Auth

### Q20 — Explain JWT structure and its trade-offs vs server-side sessions. `Medium`

<details>
<summary>Answer</summary>

**JWT** = `header.payload.signature`, each base64url-encoded; signed with **HS256** (symmetric secret) or **RS256** (asymmetric — verifiers only need the public key). The payload holds claims (`sub`, `exp`, scopes). **Stateless:** the server validates the signature, stores nothing.

| | Sessions (stateful) | JWT (stateless) |
|---|---|---|
| Storage | Server-side store (Redis/DB) | Nothing server-side |
| Scaling | Needs shared session store | Scales horizontally easily |
| Revocation | Easy (delete the session) | **Hard** — valid until `exp` |

**JWT downside & fix:** you can't trivially revoke before expiry → use **short-lived access tokens + refresh tokens + a denylist / rotation**. Store tokens in **httpOnly cookies**, not localStorage, if XSS is a concern.

**What they're really testing →** Auth fundamentals + the revocation trade-off (banks care a lot about revocation).

</details>

---

### Q21 — Walk through OAuth2 Authorization Code + PKCE vs Client Credentials. `Hard`

<details>
<summary>Answer</summary>

- **Authorization Code + PKCE** — for user-facing apps (SPA/mobile). User authenticates at the auth server; an authorization **code** is returned and exchanged for tokens. **PKCE** (`code_verifier`/`code_challenge`) stops a stolen code from being redeemed by an attacker — essential for public clients that can't keep a secret.
- **Client Credentials** — for **service-to-service** (no user). The service authenticates with its own client ID/secret and gets an access token for its own scopes.

Also clarify **authentication vs authorization**: AuthN = *who you are* (OIDC sits on top of OAuth2 for identity); AuthZ = *what you're allowed to do* (scopes/roles). Use least-privilege scopes; validate `aud`/`iss`/`exp` on every token.

**What they're really testing →** Whether you understand OAuth2 flows beyond "we use JWTs".

</details>

---

### Q22 — How do you protect a Node API against the OWASP Top 10 risks? `Hard`

<details>
<summary>Answer</summary>

- **Injection (SQL/NoSQL):** parameterised queries / prepared statements / ORM; never string-concatenate input; validate & sanitise (Zod/Joi).
- **Broken auth:** strong password hashing (bcrypt/argon2), short-lived tokens, MFA, lockout/rate-limit on login.
- **Broken access control:** enforce RBAC/scopes **server-side** on every request; never trust client-side role checks; object-level authorization (don't let user A fetch user B's record by ID).
- **Sensitive data exposure:** TLS in transit, encryption at rest, mask secrets/PII in logs, never log full card/account numbers.
- **Security misconfig:** `helmet`, CORS allow-list, disable verbose error stacks in prod.
- **Vulnerable deps:** `npm audit` / Snyk in CI, pin versions.
- **SSRF/injection of headers, request-size limits, rate limiting.**
- **Logging & monitoring:** audit logs with correlation IDs; alert on anomalies.

**What they're really testing →** Security-first mindset — the strongest signal you can send a bank.

</details>

---

### Q23 — How do you manage secrets and credentials in a Node service? `Medium`

<details>
<summary>Answer</summary>

**Never** hardcode secrets or commit them; plain env vars are weak (leak via logs, process dumps, dashboards). Use a dedicated **secrets manager** (AWS Secrets Manager / HashiCorp Vault / SSM Parameter Store).

```js
// Cache at startup; don't fetch on every request. Support rotation via TTL refresh.
let cache = null, exp = 0;
async function getSecrets() {
  if (cache && Date.now() < exp) return cache;
  cache = JSON.parse((await sm.getSecretValue({ SecretId: '/prod/payment' })).SecretString);
  exp = Date.now() + 5 * 60_000;
  return cache;
}
```

Principles: **least-privilege IAM** (the service can read only its own secret ARN), **automatic rotation** (rotate DB passwords without downtime), separate secrets per environment, and audit access. Non-sensitive config → Parameter Store / env.

**What they're really testing →** Secure infra design — leaked credentials at a bank = account takeover + regulatory action.

</details>

---

### Q24 — How do you ensure auditability and data protection in a banking backend? `Medium`

<details>
<summary>Answer</summary>

- **Append-only audit log:** every state-changing action (who, what, when, before/after, correlation ID) written to an immutable store — never updated or deleted in place. This is a compliance requirement, not a nice-to-have.
- **Correlation/trace IDs** threaded through every service and log line so an action is reconstructable end to end.
- **PII/secret masking:** mask account/card numbers in all logs (`****1234`); never log tokens, passwords, or full PANs.
- **Encryption:** TLS in transit, encryption at rest (HSM/KMS-managed keys), tokenise card data (PCI-DSS).
- **Access control & review:** RBAC on production data, access logging, periodic access review.
- **Retention:** keep transaction records per regulation (often years) with controlled deletion.

**What they're really testing →** Do you instinctively design for audit and compliance — the banking differentiator.

</details>

---

## 5. Databases & Caching

### Q25 — Explain ACID and SQL isolation levels. Which anomalies do they prevent? `Hard`

<details>
<summary>Answer</summary>

**ACID:** Atomicity (all-or-nothing), Consistency (constraints hold), Isolation (concurrent txns don't corrupt each other), Durability (committed data survives crashes).

**Isolation levels** (weak → strong) and the anomalies each prevents:

| Level | Dirty read | Non-repeatable read | Phantom read |
|---|---|---|---|
| Read Uncommitted | possible | possible | possible |
| Read Committed | prevented | possible | possible |
| Repeatable Read | prevented | prevented | possible* |
| Serializable | prevented | prevented | prevented |

(*MySQL InnoDB's Repeatable Read also blocks many phantoms via gap locks.) Stronger isolation = more locking/serialization = less concurrency. For a **ledger / money path** lean strong (Serializable or Repeatable Read with explicit locks / version checks); for analytics reads, Read Committed is fine.

**What they're really testing →** DBMS fundamentals — HSBC probes these even at senior level.

</details>

---

### Q26 — How do database indexes work, and how do you diagnose a slow query? `Medium`

<details>
<summary>Answer</summary>

An **index** (usually a B-tree) keeps column values sorted so lookups are O(log n) instead of a full O(n) scan — at the cost of extra storage and slower writes (every write updates indexes).

- **Composite index** order matters: `(a, b)` helps `WHERE a=? AND b=?` and `WHERE a=?`, but not `WHERE b=?` alone (leftmost-prefix rule).
- **Covering index** includes all columns a query needs → answered from the index without touching the table.
- **Diagnose:** run `EXPLAIN` / `EXPLAIN ANALYZE` — look for full table scans, the chosen index, estimated vs actual rows, and join order. Add/adjust indexes, avoid functions on indexed columns in `WHERE` (kills index use), and watch for N+1 query patterns from the ORM.

**What they're really testing →** Whether you can make a real query fast, not just define an index.

</details>

---

### Q27 — SQL vs NoSQL — when do you choose each for a banking system? `Medium`

<details>
<summary>Answer</summary>

- **SQL (PostgreSQL/MySQL):** strong ACID, relational integrity, joins, multi-row transactions. **Use for accounts, ledgers, balances** — anything requiring strong consistency and complex relational queries.
- **NoSQL (MongoDB/DynamoDB):** flexible schema, horizontal scale via sharding, BASE/eventual consistency, high write throughput. **Use for** events, sessions, audit/event streams, catalogues, denormalised read-optimised views. MongoDB has multi-document ACID transactions since 4.0, but they cost performance — use sparingly.
- **Polyglot persistence is fine:** ledger in Postgres, event stream in Kafka, hot reads/sessions in Redis, document data in Mongo.

**Scaling:** reads → replication (read replicas); writes → sharding/partitioning (mind cross-shard joins & rebalancing).

**What they're really testing →** Sound storage-selection judgement, with the consistency-critical money data going to SQL.

</details>

---

### Q28 — Explain caching strategies and Redis use cases. `Medium`

<details>
<summary>Answer</summary>

**Patterns:**
- **Cache-aside (lazy):** app checks cache; on miss, load from DB and populate. Most common.
- **Write-through:** write cache + DB together (fresh cache, slower writes).
- **Write-behind:** write cache now, flush to DB async (fast, risk of loss on crash).

**Redis use cases:** read cache, session store, rate-limit counters, pub/sub, distributed locks (Redlock — with caveats), leaderboards (sorted sets), queues.

**The hard part is invalidation:** use TTLs, bust on write, and design key naming carefully. Beware **stale reads** for money data — don't cache authoritative balances; cache reference/lookup data instead.

**What they're really testing →** Practical caching beyond "put Redis in front of the DB".

</details>

---

### Q29 — What is a cache stampede (and a hot key), and how do you mitigate them? `Hard`

<details>
<summary>Answer</summary>

**Cache stampede / thundering herd:** a popular key expires and thousands of concurrent requests miss simultaneously, all hammering the DB to recompute the same value — the DB buckles.

**Mitigations:**
- **Locking / single-flight:** first miss acquires a lock and recomputes; others wait and read the fresh value (request coalescing).
- **Jittered TTLs:** randomise expiry so keys don't all die at once.
- **Early/probabilistic recompute:** refresh slightly before expiry.
- **Stale-while-revalidate:** serve the stale value while one worker refreshes in the background.

**Hot key:** a single key gets disproportionate traffic and saturates one Redis shard. Mitigate with **local in-process caching** in front of Redis, key replication/sharding, or splitting the value.

**What they're really testing →** Awareness of real cache failure modes at scale.

</details>

---

### Q30 — What's the difference between a message queue and pub/sub, and when do you use each? `Medium`

<details>
<summary>Answer</summary>

| | Message Queue (SQS, RabbitMQ) | Pub/Sub (SNS, Kafka, EventBridge) |
|---|---|---|
| Delivery | one consumer per message | every subscriber gets each message |
| Model | competing consumers (load balance) | fan-out |
| Retention | until consumed | configurable; Kafka retains for replay |
| Use | task/work distribution | event broadcast, audit streams |

- **Queue:** process each payment job exactly once across a pool of workers; smooth load spikes.
- **Pub/sub:** a `PaymentCompleted` event must trigger billing **and** audit **and** notification **and** analytics — fan out to independent consumers.
- **Combined (SNS→SQS fan-out):** one event, one queue per consumer → independent failure domains and scaling.

**What they're really testing →** Event-driven architecture fundamentals — the backbone of decoupled banking systems.

</details>

---

## 6. System Design & Architecture

### Q31 — Walk me through your system-design framework. `Medium`

<details>
<summary>Answer</summary>

Say it out loud and drive the discussion:

1. **Clarify** — functional + non-functional requirements, scope, actors.
2. **Estimate** — QPS, read/write ratio, data size, latency targets, growth.
3. **API contract** — key endpoints.
4. **High-level design** — clients → LB → services → data stores → queues → cache.
5. **Data model** — storage choice, schema, access patterns.
6. **Deep-dive** — the 1–2 hardest parts (consistency, hot path, bottleneck).
7. **Scale & resilience** — caching, sharding, replication, LB, rate limiting, circuit breakers, failover.
8. **Trade-offs** — name them explicitly (CAP, consistency vs availability, cost).

Using a repeatable framework stops you freezing and signals architect-level structure.

**What they're really testing →** That you have a method, not ad-hoc box-drawing.

</details>

---

### Q32 — Design a money / fund transfer service. `Hard`

<details>
<summary>Answer</summary>

**Requirements:** transfer X from account A → B; never lose or double-apply money; auditable; highly available.

**Design:**
- **Double-entry ledger** in a **strongly consistent SQL store** — model each transfer as **immutable** debit + credit records; never mutate a balance in place (balance = sum/materialised view of ledger entries).
- **Idempotency key** per request → dedupe retries (store result keyed by it; see Q17).
- **Atomic debit+credit** in one DB transaction within a single DB; across services/DBs use a **saga** with compensating transactions (reserve → debit → credit → confirm; reverse on failure).
- **Outbox pattern** + message queue for reliable event publishing (no lost events).
- **Append-only audit log** for compliance.
- **HA:** multi-AZ, synchronous replication for the ledger; define **RPO/RTO**.

**Trade-off to name:** choose **strong consistency over latency** on the money path; eventual consistency is fine for notifications/analytics. **CAP:** under partition the money path stays **CP**.

**What they're really testing →** The flagship HSBC design — correctness under concurrency and failure.

</details>

---

### Q33 — Microservices vs monolith — when do you choose each? `Medium`

<details>
<summary>Answer</summary>

- **Monolith:** simpler to build/deploy/debug early; one codebase; strong consistency is easy. Hurts at scale — deploy coupling, scale-everything-together, large blast radius.
- **Microservices:** independent deploy/scale, team autonomy, fault isolation, polyglot. Costs: distributed-systems complexity, network failures, **distributed transactions** (saga/eventual consistency), observability overhead, ops burden.

**Mature take (reads as architect, not buzzword):** *"Start with a modular monolith; extract services along bounded contexts when scaling, team, or deploy pressure justifies it. Don't pay the distributed-systems tax before you need to."*

Add: communicate sync (REST/gRPC) vs async (events); use an **API gateway**, **service discovery**, and **circuit breakers**.

**What they're really testing →** Nuanced judgement — they want the trade-off, not a dogmatic answer.

</details>

---

### Q34 — Kafka vs RabbitMQ — how do you choose? `Medium`

<details>
<summary>Answer</summary>

- **Kafka:** distributed **commit log**; very high throughput; **partitions + consumer groups**; ordering *per partition*; **replayable** (retain and re-consume). Best for event streaming, event sourcing, analytics pipelines, audit streams.
- **RabbitMQ:** traditional **broker** (AMQP); rich **routing** via exchanges, per-message **ack**, **DLQ**, priority; lower latency for task/work queues; messages typically gone after consumption.

**Pick:** Kafka for high-volume event streams + replay/audit; RabbitMQ for complex routing and reliable task/work distribution. For a bank, Kafka's replayable, ordered log doubles as an auditable event source.

**What they're really testing →** Messaging-tech selection with the right mental model (log vs broker).

</details>

---

### Q35 — How do you design resilience into a distributed system? `Hard`

<details>
<summary>Answer</summary>

Name the patterns and where each applies:

- **Retries with exponential backoff + jitter** — for transient failures (Q14).
- **Circuit breaker** — stop calling a failing downstream after N failures; fail fast, periodically probe to recover. Prevents cascading failure.
- **Bulkhead** — isolate resource pools so one slow dependency can't exhaust all threads/connections.
- **Idempotency keys** — safe retries on mutating operations.
- **Rate limiting** (token/leaky bucket) — protect from overload and abuse.
- **Timeouts everywhere** — never wait indefinitely on a network call.
- **Graceful degradation / fallbacks** — serve stale/partial data instead of erroring.
- **DLQ** — capture poison messages for investigation, don't lose them.
- **Health checks + failover** — liveness/readiness probes, multi-AZ.

**What they're really testing →** Whether you design for failure as the default — exactly the banking reliability mindset.

</details>

---

### Q36 — How would you design zero-downtime deployments for a payment service? `Hard`

<details>
<summary>Answer</summary>

Two hard constraints: no in-flight transaction lost, no consumer sees errors.

- **Expand/contract DB migrations:** add new columns as nullable first; deploy code that reads new-with-fallback-to-old; only after everything's migrated, deploy code that drops the old references, then drop columns. Never break old code in a single deploy.
- **Blue-green / canary:** deploy new version alongside old; smoke-test; shift traffic 5% → 25% → 50% → 100% with health/error-rate alarms; **auto-rollback** on breach; drain old instances (let in-flight requests finish) before terminating.
- **Idempotency as safety net:** if an instance is killed mid-request during rollout, the client retries with the same idempotency key and the new version returns the already-recorded result (no double-charge).
- **Graceful shutdown:** on SIGTERM stop accepting new requests, finish in-flight, close DB pools.

**What they're really testing →** Deployment engineering where "downtime" means failed payments.

</details>

---

### Q37 — How do you do observability across microservices? `Medium`

<details>
<summary>Answer</summary>

The **three pillars**, tied together by a correlation/trace ID:

- **Logs** — structured (JSON), with a **correlation ID** propagated across every service and log line so one request is reconstructable end to end. Mask PII.
- **Metrics** — RED (Rate, Errors, Duration) per endpoint, business metrics (`payment.success/failed`), resource metrics (memory trend for leak detection). Alert on SLO breaches.
- **Distributed tracing** — OpenTelemetry / X-Ray; inject the `traceparent` (W3C) header into every outbound HTTP call and queue message so a trace threads gateway → service → queue → worker → downstream. Sample (e.g. 5% normal, 100% errors).

**Banking framing:** you can't `console.log`-debug a payment failure across 6 services at 3am — observability is how you meet incident-response SLAs and produce audit evidence.

**What they're really testing →** Production operability thinking.

</details>

---

## 7. DevOps / CI-CD / Containers

### Q38 — How do you build a production-grade Docker image for a Node service? `Medium`

<details>
<summary>Answer</summary>

- **Multi-stage build:** a `build` stage with dev dependencies (compile TS, run tests), then copy only the built artefacts + production deps into a slim `runtime` stage (`node:20-slim` / alpine). Smaller image = faster pulls, smaller attack surface.
- **Run as non-root** (`USER node`) — never run the app as root.
- **`.dockerignore`** to keep `node_modules`, `.git`, secrets out of the build context.
- **`npm ci --omit=dev`** for reproducible, production-only installs.
- **HEALTHCHECK** instruction; **12-factor** config via env vars (no baked-in secrets).
- Pin a specific base image digest; scan the image (Trivy/Snyk) in CI.

**What they're really testing →** Container hygiene and security-conscious packaging.

</details>

---

### Q39 — Design a CI/CD pipeline for a microservices app at a bank. `Hard`

<details>
<summary>Answer</summary>

```
commit → lint + unit tests
       → build image
       → SAST + dependency/secret scan        ← security gate (fail the build)
       → push to registry
       → deploy to staging
       → integration / e2e tests
       → canary or blue-green to prod
       → automated rollback on health-check failure
```

Emphasise the bank-specific parts:
- **Security gates as blocking steps:** SAST (SonarQube/CodeQL), dependency scan (Snyk/`npm audit`), secret scanning, container image scan — a failing gate stops promotion.
- **Zero-downtime release:** canary/blue-green with automated rollback (Q36).
- **Separation of duties & approvals:** prod deploys gated by review; immutable, signed artefacts; full audit trail of who deployed what.
- **Environment parity** (dev/staging/prod) and infrastructure-as-code so deployments are reproducible.

**What they're really testing →** An explicit HSBC question — lead with security gates and zero-downtime.

</details>

---

### Q40 — How do you do a zero-data-loss database migration during a cutover? `Medium`

<details>
<summary>Answer</summary>

(Relevant to your P&G Olay BigCommerce → Shopify story.)

- **Backfill + dual-write:** copy historical data, then dual-write to old and new stores while keeping the old as source of truth; reconcile counts/checksums.
- **Expand/contract schema changes** so old and new code both work during the transition (never a breaking change in one step).
- **Reconciliation job:** compare row counts and checksums between source and target before cutover; investigate any drift.
- **Cutover:** flip reads to the new store behind a feature flag during a low-traffic window; keep the old store as instant rollback for a defined period.
- **Idempotent, resumable migration scripts** so a failure mid-run can be re-run safely.

**Result framing:** zero data loss + a tested rollback path = the correctness/auditability mindset a bank wants.

**What they're really testing →** Migration correctness and rollback safety.

</details>

---

## 8. Behavioral / STAR (HSBC values)

> HSBC's four values drive this round: **We value difference · We succeed together · We take responsibility · We get it done.** Use S→T→A→R, ~90 seconds each, and insert real metrics where bracketed.

### Q41 — "We get it done": tell me about delivering at scale under pressure. `Medium`

<details>
<summary>Answer</summary>

**Situation:** The UTEC construction platform had to support ~6M users with [feature/deadline pressure].
**Task:** I owned [backend module / API performance] and had to make it hold under peak load.
**Action:** I [introduced caching / queues / serverless autoscaling], [specific actions — e.g. moved hot reads to Redis, added SQS batching, tuned Lambda concurrency].
**Result:** [reduced p95 latency by X% / handled Y concurrent users / shipped on date with zero rollbacks].

**Tip:** end on a measurable outcome and tie it to "steady progress, clear choices" — the essence of *We get it done*.

**What they're really testing →** Delivery ownership and bias for shipping.

</details>

---

### Q42 — "We take responsibility": a production or security issue you owned end-to-end. `Hard`

<details>
<summary>Answer</summary>

**Situation:** During VAPT on the UTEC platform, [vulnerability / production incident] was found in [service].
**Task:** I was accountable for remediation under [time/compliance] constraint.
**Action:** I [root-caused it, fixed the vulnerability, added regression tests + monitoring/alerting, and documented the fix to prevent recurrence].
**Result:** [closed all findings / zero recurrence / passed the re-audit].

**Banking hook:** owning a *security* issue is the strongest possible story for HSBC — it shows accountability + the security-first mindset. Lead with how you took responsibility without being asked.

**What they're really testing →** High standards, accountability, sound judgement under pressure.

</details>

---

### Q43 — "We succeed together": a cross-functional delivery story. `Medium`

<details>
<summary>Answer</summary>

**Situation:** The P&G Olay BigCommerce → Shopify migration needed frontend, DevOps, and client stakeholders aligned.
**Task:** I [owned the backend / data migration] while coordinating across teams.
**Action:** I [set up sync points, mapped dependencies, unblocked others, communicated cutover risks early].
**Result:** [migrated with zero data loss / on-time cutover / X minutes downtime].

**Tip:** emphasise *connecting across boundaries* — that's the literal definition of *We succeed together*. Credit the team, not just yourself.

**What they're really testing →** Collaboration and trust across functions.

</details>

---

### Q44 — "We value difference": a time you incorporated a view unlike your own. `Hard`

<details>
<summary>Answer</summary>

**Situation:** On [project], a teammate/stakeholder pushed a [different approach] I initially disagreed with.
**Task:** Decide the right path without steamrolling them.
**Action:** I [heard them out fully, tested both approaches with data, and combined the best of each / changed my mind on the evidence].
**Result:** [better outcome + stronger team trust].

**Tip:** the value is about *seeking views unlike your own with empathy*. The best version of this story is one where the other person was partly right and you adapted.

**What they're really testing →** Openness to diverse perspectives and ego-free decision-making.

</details>

---

### Q45 — Why HSBC, and how do you handle joining a domain (banking) that's new to you? `Easy`

<details>
<summary>Answer</summary>

**Why HSBC:** global scale + engineering rigour + real impact ("opening up a world of opportunity"), and a strong fit with my background on security-sensitive, high-scale backends. (Avoid generic "big brand" answers.)

**On the domain gap:** "Most of my work has been on large-scale, security-sensitive platforms — UTEC served ~6M users and went through full VAPT hardening; EY Risk.ai was an enterprise risk product. So while the *banking* label is new, the *engineering concerns* banking cares about — data security, auditability, high availability, correctness under load — are exactly what I've been building for. I ramp on domain fast." Then give a concrete example of quickly learning a new domain (e.g. agentic AI at EY in 3 weeks).

**What they're really testing →** Genuine motivation + whether you neutralise the domain gap with confidence rather than apology.

</details>

---

*Generated for interview prep — TEKsystems vendor model + HSBC's security-first banking bar, with Node.js/TypeScript backend and system-design depth. Frame every answer through security, idempotency/correctness, auditability, and reliability. Full long-form guide: [`../teksystems-hsbc-nodejs-backend.md`](../teksystems-hsbc-nodejs-backend.md).*
