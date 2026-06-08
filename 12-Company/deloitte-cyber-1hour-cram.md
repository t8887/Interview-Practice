# 🛡️ Deloitte Cyber LSA — 1-Hour Final Cram

> **Role:** Lead Solution Advisor — Deloitte Cyber / Cyber Operate (5–7 yrs, full-stack + security)
> **Candidate:** Onkar Sawant (~5 yrs, Pune)
> **How to use this in 60 minutes:**
>
> | Section | Mins |
> |---|---|
> | A. Self-Intro (cyber-flavored) | 3 |
> | B. Node.js (must-asked + trick) | 7 |
> | C. React + TypeScript | 6 |
> | D. AWS + Serverless + DevOps | 6 |
> | E. Databases + Graph DB cyber framing | 7 |
> | F. AI / Gen AI (your differentiator) | 6 |
> | G. System Design + named patterns + code | 8 |
> | H. OOP / Design Patterns / Testing | 4 |
> | I. Web Security / Cyber Fundamentals | 5 |
> | J. Trick / Trap Questions | 3 |
> | K. Behavioral / LSA STAR (5 stories) | 3 |
> | L. Closers + smart questions | 2 |
>
> 🔶 = honest bridge answer (don't claim deep hands-on; deliver as written)

---

## Section A — 90-Second Self-Intro (Cyber-flavored)

> "Good morning, I'm Onkar Sawant — a Senior Full-Stack Developer with around 5 years of experience across Node.js, React, TypeScript, AWS, and a strong applied bent toward **secure software delivery**.
>
> Currently at LTIMindtree on two enterprise programs. First, **EY Risk.ai** — an AI-driven internal audit platform where I upgraded the agent layer from GPT-4 to GPT-5.1, redesigned the prompt infrastructure, and lifted agent response quality by **20%**. Second, **P&G Olay** — I led the BigCommerce-to-Shopify migration on Azure Functions, cutting batch processing time by **50%** and API response time by **40%** with **100% data consistency**.
>
> Before LTIMindtree, at Iprogrammer I worked on **UTEC by UltraTech Cement** — a large-scale construction management platform on Node.js + AWS. There I owned **OpenSearch-backed search** that cut query time by **30%**, optimized MySQL + Redis to drop latency by **25%**, and — most relevant to this role — I was **directly involved in VAPT testing and implementing security protocols** across the platform. I also mentored juniors through code reviews on a 110-member project that won the Best Team award.
>
> Earlier at Reapmind I built **Vkonnect Health**, a MERN telemedicine platform on AWS Amplify with serverless migration and **99.99% uptime**.
>
> What draws me to Deloitte Cyber specifically is the combination of full-stack engineering and a security-first mandate. My VAPT background, IAM/KMS work on AWS, and secure-coding habits map directly to Cyber Operate's identity-lifecycle and continuous-compliance focus — and the Big-Four consulting environment is exactly the next step I'm looking for."

---

## Section B — Most-Asked Node.js

| # | Question | Answer (spoken) |
|---|----------|-----------------|
| 1 | Explain the Node.js event loop | "Node is single-threaded with a libuv-backed event loop. Each tick: timers → pending callbacks → poll (I/O) → check (setImmediate) → close. Between every phase, the microtask queue (Promises, `process.nextTick`) drains. Async I/O is offloaded to libuv's thread pool (default 4) so the main thread never blocks." |
| 2 | How does Node handle concurrency if it's single-threaded? | "It doesn't *compute* in parallel — it *waits* in parallel. I/O calls are non-blocking; callbacks queue on completion. CPU-bound work is the trap — that's where you reach for `worker_threads` or break work into chunks." |
| 3 | `process.nextTick` vs `setImmediate` | "`nextTick` fires **before** the next event-loop iteration — between phases, after the current op. `setImmediate` fires in the **check** phase, after I/O callbacks. Order: nextTick > microtasks > setImmediate. Overuse of `nextTick` starves I/O." |
| 4 | Streams — when did you use them? | "Streams process data in chunks: Readable, Writable, Duplex, Transform. On P&G migration I piped large product catalogs through a Transform stream — parse → normalize → push to Shopify GraphQL — so memory stayed flat regardless of file size." |
| 5 | Error handling in production Node | "Layered: (a) operational 4xx via validation middleware, (b) global error middleware for 5xx with structured logs, (c) `unhandledRejection` + `uncaughtException` handlers that log and let PM2/PM-process-manager restart, (d) circuit breakers around external APIs." |
| 6 | Clustering vs worker_threads | "**Cluster** = multiple OS processes sharing a port via the master — scale across CPU cores for I/O-bound apps. **worker_threads** = threads inside one process sharing memory via `SharedArrayBuffer` — for CPU-bound work like image processing, parsing, crypto." |
| 7 | How do you detect memory leaks? | "Heap snapshots via Chrome DevTools or `--inspect`, watch RSS over time. Common culprits: global caches without TTL, unclosed DB connections, listeners not removed, large closures retained. On EY Risk.ai I caught a leak from un-aborted OpenAI streams — fixed with an explicit `AbortController`." |
| 8 | Middleware pattern in Express | "`(req, res, next)` — runs in order. Used for auth (JWT verify), logging, rate-limit, request validation, error handling. Order matters: auth before route handler, error handler last." |

### 🎯 Trick / Output-Prediction Questions

**Q. Predict the order:**
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
process.nextTick(() => console.log('4'));
console.log('5');
```
> **Answer: 1, 5, 4, 3, 2.** Sync first (1, 5). Then `nextTick` (4) drains before microtasks. Then microtasks/Promise (3). Then macrotask/setTimeout (2).

**Q. `this` inside a callback?**
> "In a regular function, `this` is dynamic — often `undefined` in strict mode or the global object. In an arrow function, `this` is lexically captured. Rule of thumb: always use arrow functions for callbacks inside methods, or bind explicitly."

**Q. Why is blocking the event loop dangerous?**
> "One slow synchronous call — a big JSON.parse, sync crypto, regex catastrophic backtracking — freezes **every** connection on that Node process. Health checks fail, the load balancer marks the instance unhealthy, traffic shifts elsewhere, cascading load. Always async, always chunked."

---

## Section C — Most-Asked React + TypeScript

### React

| # | Question | Answer (spoken) |
|---|---|---|
| 1 | Virtual DOM + reconciliation | "React keeps a virtual tree, diffs old vs new on state change, applies the minimal real-DOM patch. Keys identify list items so React can match siblings across renders — without keys it re-renders the whole list." |
| 2 | `useMemo` vs `useCallback` | "`useMemo` memoizes a computed **value**; `useCallback` memoizes a **function reference**. Both take deps. Use `useCallback` when passing handlers to memoized children; use `useMemo` only when the computation is genuinely expensive — premature memoization adds overhead." |
| 3 | Context vs Redux | "Context = simple shared state, avoids prop drilling, **every consumer re-renders on any change** — bad for hot state. Redux/Zustand = selector-based subscriptions, time-travel debugging, middleware (sagas) for async — use it for app-wide hot state." |
| 4 | Controlled vs uncontrolled | "Controlled: form value lives in React state via `value`+`onChange` — single source of truth, validation easy. Uncontrolled: DOM owns state, accessed via `ref` — used for file inputs and third-party integrations." |
| 5 | Performance optimization | "Code splitting with `React.lazy` + Suspense; `React.memo` + stable refs via `useCallback`; virtualize long lists with `react-window`; bundle analyzer to kill dead weight; lazy-load images. I shipped most of these on Vkonnect's patient dashboard." |
| 6 | Legacy → functional migration (real story) | "On Vkonnect's admin panel I migrated class components to hooks: `componentDidMount/Update/Unmount` → `useEffect`; `setState` → `useState`/`useReducer`; HOCs → custom hooks. Did it incrementally — one feature per PR with tests, no big-bang." |

### TypeScript

| # | Question | Answer (spoken) |
|---|---|---|
| 7 | Generics — practical example | "Reusable, type-safe abstractions. `function getById<T>(id: string): Promise<T>` — same fetcher, type-safe per entity. Used across our API client layer on EY Risk.ai." |
| 8 | `interface` vs `type` | "`interface` for domain models — supports declaration merging and `extends`. `type` for utility/composition — unions, intersections, conditional and mapped types." |
| 9 | Utility types I use most | "`Partial`, `Required`, `Pick`, `Omit`, `Readonly`, `Record`, `ReturnType`, `Awaited`. `Pick`+`Omit` are how I derive DTOs from domain models without duplication." |
| 10 | `unknown` vs `any` | "`any` opts out of type checking. `unknown` is type-safe — you must narrow before using. Always prefer `unknown` for external inputs (LLM responses, API payloads) — forces validation." |
| 11 | Decorators | "Metadata annotations on classes/methods. Heavy in NestJS — `@Controller`, `@Injectable`, `@UseGuards`. Experimental but production-stable." |

### 🎯 Trick Questions

**Q. Stale closure in `useEffect` — what's wrong?**
```javascript
useEffect(() => {
  const id = setInterval(() => setCount(count + 1), 1000);
  return () => clearInterval(id);
}, []); // empty deps
```
> "Bug: `count` is captured from the first render — always 0, so it stays at 1 forever. Fix: functional updater `setCount(c => c + 1)`, or add `count` to deps and re-create the interval."

**Q. Dependency array gotchas?**
> "Object/array literals in deps cause re-fires every render — reference inequality. Functions defined inline change every render. Fix: `useMemo` the object, `useCallback` the function, or destructure primitives into deps."

---

## Section D — Most-Asked AWS + Serverless + DevOps

| # | Question | Answer (spoken) |
|---|---|---|
| 1 | Lambda vs EC2 | "Lambda — event-driven, auto-scales, pay-per-invocation, 15-min hard limit, cold-start tax. EC2 — long-running, full OS control, predictable latency. On Vkonnect I migrated EC2 → Lambda for low-traffic endpoints and cut cost meaningfully without sacrificing UX." |
| 2 | Cold starts — how do you mitigate? | "Provisioned Concurrency for hot paths; smaller deployment bundles (esbuild, no dev deps); minimal init code; warm-keeper if you really need it. ARM/Graviton Lambdas are cheaper and often faster." |
| 3 | API Gateway — what does it solve? | "One front door for many services: auth (Cognito/JWT authorizer), throttling/rate-limit, request validation, WAF integration, request/response transforms, usage plans for API keys." |
| 4 | SQS vs SNS | "SQS — pull queue, one consumer per message, used for async work decoupling. SNS — push pub/sub, fan-out to many subscribers. Common pattern: SNS → multiple SQS queues." |
| 5 | ElastiCache vs in-app cache | "ElastiCache (Redis) is shared across instances — required for distributed systems (rate limit, session, blacklist). In-app caches are per-instance — fine for static reference data only." |
| 6 | IAM least-privilege — how do you actually do it? | "Roles per service, not shared keys. Inline policies scoped to specific ARNs and actions. No `*` resources in prod. Rotate keys via Secrets Manager. Audit with Access Analyzer and CloudTrail." |
| 7 | KMS + Secrets Manager | "KMS = managed encryption keys with audit; envelope encryption for data at rest. Secrets Manager = rotating credentials (DB passwords, API keys) with automatic rotation Lambdas. Never check secrets into git." |
| 8 | CloudFormation nested stacks (real story) | "On UTEC I split a monolithic template into nested stacks per concern — VPC, IAM, app, data. Deploy time dropped **40%** because unchanged stacks were skipped. Also made review smaller and rollback safer." |
| 9 | Amplify CI/CD (Vkonnect) | "Amplify wired branch → build → deploy with preview URLs per PR. Reviewers got a live link, environment vars per branch, automatic invalidation of CloudFront. Saved manual deploy steps." |
| 10 | CloudWatch — what do you actually watch? | "Metric alarms on latency p95/p99, error rate, throttles. Log Insights queries for error patterns. Custom metrics from app code for business KPIs. Subscribe critical alarms to SNS → PagerDuty." |

### 🔶 Conceptual Bridges (JD asks; I'm honest)

**Docker** 🔶
> "Containers package app + deps + runtime into an immutable image — same artifact runs identically dev → prod, kills 'works on my machine'. I've used Docker for local dev environments and read Dockerfiles in our pipelines; my production deploys have been Lambda/Azure-Functions-based, so I haven't owned a Dockerfile in prod, but I'm comfortable with the model and conventions."

**Kubernetes** 🔶
> "K8s orchestrates containers at scale — deployments (declarative pods), services (stable network IDs), ingress (routing), HPA (auto-scale on metrics). Conceptually I understand the control loop and the declarative manifest model. My hands-on has been serverless rather than K8s, so I'd treat this as a fast learning curve on the role."

**GitOps** 🔶
> "Git as the single source of truth for infra and deploys — tools like ArgoCD/Flux watch the repo and reconcile cluster state to match. Tied to PR-based review of infra changes. I've followed this pattern on the IaC side via CloudFormation in Azure DevOps pipelines — same principle, different tooling."

**DevSecOps**
> "Security shifted left into CI/CD. Concretely: SAST (SonarQube, Snyk Code), dependency scanning (Snyk, Dependabot), secret scanning (gitleaks), container scanning (Trivy), DAST in staging (OWASP ZAP), IaC scanning (Checkov). On UTEC I worked alongside the security team's VAPT cycle and we wired automated dependency checks into the pipeline — that's the DevSecOps mindset Deloitte Cyber operates at, scaled up."

---

## Section E — Databases (with Cyber-Framed Graph DB bridge)

### MySQL

| # | Question | Answer |
|---|---|---|
| 1 | JOIN types | "INNER (matches both), LEFT (all left + matched right), RIGHT (mirror), FULL OUTER (MySQL: simulate with LEFT UNION RIGHT)." |
| 2 | Indexing trade-offs | "B-Tree indexes speed up reads, slow writes. Composite indexes: leftmost-prefix rule — order matters. Covering indexes serve a query entirely from the index. Always `EXPLAIN`." |
| 3 | ACID | "Atomic (all-or-nothing), Consistent (valid → valid), Isolated (no interference), Durable (survives crash). Isolation levels trade consistency for concurrency: READ COMMITTED → REPEATABLE READ → SERIALIZABLE." |
| 4 | N+1 problem | "1 query for parents, then N queries for children. Fix: JOIN, or `WHERE id IN (...)` batch, or ORM eager-load." |
| 5 | Second-highest salary | See below. |
| 6 | Query optimization | "`EXPLAIN`/`EXPLAIN ANALYZE` → look for full table scans, filesort, using-temporary. Add the right index, rewrite N+1, denormalize hot reads carefully." |

```sql
-- Second-highest salary — three flavors
SELECT * FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;

SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);

SELECT salary FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) rnk FROM employees
) t WHERE rnk = 2;  -- handles duplicates correctly
```

### MongoDB

| # | Question | Answer |
|---|---|---|
| 7 | When over SQL? | "Flexible/nested schema (audit logs, AI traces, health records), high write throughput, document-oriented access. Avoid when you need multi-document transactions across many entities — though Mongo 4+ supports them, MySQL is still simpler." |
| 8 | Aggregation pipeline | "Staged transforms: `$match` → `$group` → `$sort` → `$project` → `$lookup` (join). Push filters as early as possible to shrink the working set." |
| 9 | Indexing in Mongo | "Same B-Tree concept. Compound indexes follow leftmost prefix. Text indexes for search. Use `.explain('executionStats')` to confirm index usage." |

### Redis

| # | Question | Answer |
|---|---|---|
| 10 | Data structures | "Strings, Lists, Sets, Sorted Sets (leaderboards), Hashes (objects), Streams (event log), Bitmaps, HyperLogLog." |
| 11 | Cache-aside pattern | "Read: cache miss → DB → write cache with TTL. Write: update DB → invalidate cache key. Avoid write-through unless you need read-after-write consistency." |
| 12 | Rate limiting | "Sliding window counter in Redis with `INCR` + `EXPIRE`, or token bucket via Lua script for atomicity. On UTEC we used Redis-backed rate limits per API key." |
| 13 | Distributed locks | "`SET key value NX PX 30000` — atomic acquire with TTL. Release only if you own the token (Lua script compares). For correctness-critical locks: Redlock with quorum." |
| 14 | Pub/Sub | "Fire-and-forget messaging, no persistence. For durable: Redis Streams with consumer groups." |

### JD Extras

| DB | When to choose | Cyber tie-in |
|----|---|---|
| **PostgreSQL** | When you want stronger SQL features (CTEs, window functions, JSONB, GIS), check constraints, mature replication. PG > MySQL for analytical workloads. | Row-level security, native UUID, fine-grained roles — popular for security platforms. |
| **DynamoDB** 🔶 | Massive-scale key-value with single-digit-ms latency, serverless. Designed around access patterns, not relational normalization. | Event/audit log store at scale, GSI for query flexibility, TTL for retention compliance. |
| **Cassandra** 🔶 | Wide-column, masterless, tunable consistency. For huge write throughput across regions — IoT telemetry, security event ingest. | Same use case as security SIEM ingest pipelines. |

### 🔶 Graph DB — Neo4j / Memgraph (Cyber Frame)

> **The honest setup:** "I haven't run Neo4j or Memgraph in production. Conceptually I'm fluent on graph data models, and I can speak to **why cyber platforms specifically use graph DBs** — because that's the relevant question for this role."

**Q. What is a graph database?**
> "Nodes (entities) + edges (relationships) + properties on both. Queried with Cypher (Neo4j) or openCypher (Memgraph). Native graph storage means traversals are index-free — following edges is constant-time per hop, not a JOIN."

**Q. Why is graph DB the right tool for cyber?**
> "Three killer use cases:
> 1. **Attack path modeling** — nodes are assets (users, hosts, services), edges are 'can-authenticate-to', 'has-permission-on', 'can-RCE'. A graph traversal answers 'what's the shortest path from this compromised laptop to the crown-jewel DB?' — that's the BloodHound model for AD.
> 2. **Identity / IAM relationship modeling** — users → groups → roles → permissions → resources. Graph traversal finds privilege-escalation chains a relational JOIN can't express cleanly.
> 3. **Lateral movement & threat intel correlation** — IPs, domains, hashes, campaigns linked by 'observed-with' edges. Graph queries spot infrastructure overlap between intrusion sets.
>
> SQL can model this — but every n-hop question becomes n JOINs and performance falls off a cliff. Graph DBs are native to this shape."

**Q. What's my closest equivalent?**
> "On UTEC I built **OpenSearch-based relationship search** across construction project entities — contracts, vendors, materials, sites. The access patterns were similar: 'show me everything connected to vendor X N hops out.' I solved it with denormalized indexes and aggregation; a graph DB would have been more elegant. So I understand the *shape of problem* graph DBs solve — I just haven't operated one in prod, and I'd ramp on Cypher quickly."

---

## Section F — AI / Gen AI (Your EY Risk.ai Differentiator)

| # | Question | Answer |
|---|---|---|
| 1 | Walk me through a RAG pipeline | "Eight stages: ingest → chunk (500–1000 tokens, 10–15% overlap) → embed → store in vector DB (OpenSearch k-NN with HNSW) → query embed → retrieve top-K → re-rank top 3–5 → generate with strict 'answer only from context + cite' instructions. On EY Risk.ai this is exactly how the agent answered risk-policy questions without hallucinating." |
| 2 | What's an embedding + cosine? | "Dense vector capturing semantic meaning — sentences with similar meaning sit close. Cosine similarity measures the angle (range -1 to 1, closer to 1 = more similar). It's the default because magnitude doesn't matter on normalized embeddings." |
| 3 | OpenSearch in RAG | "Three roles in one store: k-NN vector search, BM25 lexical, and hybrid scoring. We used hybrid on EY Risk.ai — beat either alone by ~15% on recall. Plus it was already in our AWS footprint, so no new vendor." |
| 4 | How did you reduce hallucinations? | "Five concrete techniques: (a) strict grounding prompt — 'answer only from context, else say I don't know'; (b) citations required for every claim; (c) temperature 0.1–0.2 for factual tasks; (d) post-generation validator re-checks answer against retrieved chunks; (e) refusal phrasing tuned per model. Together: big slice of our 20% accuracy lift." |
| 5 | Prompt-infra redesign for GPT-4 → GPT-5.1 | "Three things broke: (a) context window grew → re-tuned chunk size up and reduced top-K; (b) tool-calling JSON schema validation got stricter — tightened JSON schemas, added retry-on-validation-error; (c) instruction weighting shifted — refusal phrasing that worked in 4 became too aggressive in 5.1, so I rewrote system prompts with a golden Q&A regression suite to catch drift." |
| 6 | What *actually* changed GPT-4 → 5.1? (honest answer) | "Honestly — for our use case, the **biggest wins were lower hallucination rate and better tool-calling reliability**. The single biggest pain was prompt drift: instructions weighted differently, so we couldn't just swap the model ID. We shipped behind a feature flag, A/B tested 50 golden questions, and only cut over once accuracy was ≥ baseline + 15%." |
| 7 | Token & cost optimization (35% cut) | "Five levers: (a) **model routing** — 80% of traffic to GPT-5.1-mini, only complex reasoning to full; (b) **prompt compression** — cut verbose few-shots once zero-shot proved reliable; (c) **Redis response cache** keyed on `hash(prompt+context)`; (d) **chunk pruning** — re-ranker drops low-confidence chunks before they hit the context; (e) **stream early-termination** for tool-calling agents. 35% per-query cost cut, zero quality loss." |
| 8 | Agent vs single LLM call | "Single call = one prompt, one response. Agent = LLM + tools + memory + control loop. Model picks a tool, executes, observes, decides next step. On EY Risk.ai our agents had vector search, structured DB lookup, regulation API, and a risk-scoring calculator." |
| 9 | How did you eval agent quality? (the +20%) | "Golden dataset of ~200 Q&A pairs. CI runs the suite on every prompt change, tracks accuracy, latency p95, token count. Apples-to-apples comparison is how we measured the 20% lift — not vibes, the suite." |
| 10 | Streaming + rate limits | "SSE over HTTP — `Content-Type: text/event-stream`, forward chunks as they arrive. Time-to-first-token drops from ~3s to ~300ms. Rate limits: exponential backoff with jitter, token bucket on our side in Redis, SQS-queued non-interactive jobs so batch can't starve interactive traffic." |

### 🔶 JD Good-to-Have

**TensorFlow vs PyTorch** 🔶
> "Both deep-learning frameworks. PyTorch — dynamic graph, Pythonic, dominant in research and increasingly in production. TensorFlow — static graph + eager mode, strong serving/mobile story via TF Lite. My production work has been LLM/RAG-side via OpenAI APIs, not training models directly — but I can read PyTorch code and would treat this as a domain to ramp into."

---

## Section G — System Design / Architecture Patterns

### 1. Notification Service (multi-channel)

```
[Producer] → [SNS topic] ─┬─→ [SQS: email]   → [Lambda] → SES
                          ├─→ [SQS: SMS]     → [Lambda] → SNS-SMS / Twilio
                          └─→ [SQS: push]    → [Lambda] → FCM/APNs
                                ↓ (failure)
                          [DLQ + alarm]
```
- **Idempotency:** every notification has a stable `event_id`; consumer dedupes via Redis SET-NX with TTL
- **Retries:** SQS visibility timeout + max receives → DLQ after N attempts
- **Throttle per user** (Redis token bucket) to prevent spam
- **🛡️ Cyber/cost trade-off:** PII (email, phone) encrypted at rest via KMS; messages signed so consumers can verify origin; SES + Twilio cost-managed via per-tenant quotas

### 2. JWT Auth (full flow — tie to identity-lifecycle in JD)

```
Login → server signs access (15 min) + refresh (7 day, rotation)
       → access in httpOnly+Secure+SameSite cookie (NOT localStorage — XSS risk)
       → refresh in separate httpOnly cookie, single-use, rotated on every refresh
Middleware → verify signature + exp + jti not in Redis blacklist
Logout    → add jti to Redis blacklist with TTL = remaining lifetime
RBAC      → roles in claim; authorize per route via middleware
SSO       → OAuth2/OIDC for federated login; SAML for enterprise IdP integration
```
- **🛡️ Cyber:** rotating refresh tokens defeat replay; jti blacklist defeats stolen-token reuse; short access TTL limits blast radius; SAML/OIDC is exactly the identity-lifecycle work Deloitte Cyber Operate runs for clients

### 3. Circuit Breaker

| State | Behavior | Transition |
|-------|----------|-----------|
| **Closed** | Calls pass through; count failures | failures > threshold → **Open** |
| **Open** | Fail fast (no real calls); return fallback | after cooldown → **Half-Open** |
| **Half-Open** | Allow a few probe calls | all succeed → **Closed**; any fail → **Open** |

- **Why:** stops cascading failure when a downstream is sick — protects your latency budget and gives the downstream room to recover
- **Libraries:** `opossum` (Node), Hystrix-style, Resilience4j (Java)
- **🛡️ Cyber tie-in:** circuit breaker also defends against poisoned upstream (e.g., compromised third-party API returning malicious payloads) — fail fast, alert, isolate

### 4. Debounce / Throttle / Retry / Circuit Breaker — Read-Off Code

```typescript
// (a) Debounce — fire once after the pause
function debounce<T extends (...a: any[]) => void>(fn: T, ms: number) {
  let t: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

// (b) Throttle — fire at most once per interval
function throttle<T extends (...a: any[]) => void>(fn: T, ms: number) {
  let last = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - last >= ms) {
      last = now;
      fn(...args);
    }
  };
}

// (c) Retry with exponential backoff + jitter
async function retry<T>(
  fn: () => Promise<T>,
  attempts = 3,
  baseMs = 200
): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const delay = baseMs * 2 ** i * (0.7 + Math.random() * 0.6); // jitter
      await new Promise(r => setTimeout(r, delay));
    }
  }
  throw lastErr;
}

// (d) Circuit breaker wrapper
function circuitBreaker<T>(
  fn: () => Promise<T>,
  { threshold = 5, cooldownMs = 30_000 } = {}
) {
  let failures = 0;
  let openUntil = 0;
  return async (): Promise<T> => {
    if (Date.now() < openUntil) throw new Error('circuit_open');
    try {
      const result = await fn();
      failures = 0;
      return result;
    } catch (err) {
      failures++;
      if (failures >= threshold) openUntil = Date.now() + cooldownMs;
      throw err;
    }
  };
}
```

### 5. E-Commerce Architecture (frame around P&G migration)

```
[CDN/CloudFront] → [API Gateway/WAF]
   ├─→ Catalog svc       (read-heavy, Redis cache, OpenSearch for search/filter)
   ├─→ Cart svc          (Redis-backed, session-scoped)
   ├─→ Order svc         (MySQL, transactional)
   ├─→ Inventory svc     (event-driven; SNS on stock change)
   ├─→ Payment svc       (PCI-isolated; tokenized via Stripe/Adyen)
   └─→ Search svc        (OpenSearch — products + facets)
```
- **Monolith vs microservices:** start with a modular monolith; extract a service when you have a clear scale/independent-deploy driver. Premature microservices = distributed monolith pain.
- **Zero-downtime migration (P&G real):** dual-write window, idempotent upserts via stable `external_id`, hourly reconciliation diff (mine caught 340 mismatches), rollback gate on error threshold
- **🛡️ Cyber:** payment service in isolated VPC subnet; tokenization so PCI scope stays small; WAF on storefront; rate-limit on /checkout and /login

### 6. Redis Usage Patterns

| Pattern | Use case | Key shape |
|---------|---------|----------|
| Cache-aside | API response cache, TTL 30–300s | `cache:user:{id}` |
| Session store | JWT blacklist, refresh tokens | `blacklist:jti:{id}` |
| Rate limit | Per-IP/user `INCR + EXPIRE` | `rl:{userId}:{minute}` |
| Distributed lock | Cron coordination, idempotent jobs | `lock:{job}:{shard}` |
| Leaderboard | Sorted sets — `ZADD/ZRANGE` | `lb:{game}` |
| Pub/Sub | Real-time fan-out | `events:{channel}` |
| Streams | Durable event log w/ consumer groups | `stream:audit` |

---

## Section H — OOP, Design Patterns & Testing

### SOLID (1-line each)

| | What | Example |
|---|---|---|
| **S**ingle Responsibility | One reason to change | `UserRepo` doesn't send emails |
| **O**pen/Closed | Open to extend, closed to modify | Plugin/strategy pattern, not switch-case |
| **L**iskov Substitution | Subclass must honor parent's contract | Don't override `withdraw` to throw on valid input |
| **I**nterface Segregation | Many narrow interfaces > one fat one | Separate `Readable` and `Writable`, not `IO` |
| **D**ependency Inversion | Depend on abstractions | Inject `Logger` interface, not `WinstonLogger` concretely |

### GoF Patterns — Name + One-Liner + Real Example

| Pattern | Use | My example |
|---------|-----|-----------|
| **Factory** | Create objects without exposing instantiation logic | LLM client factory: `createClient('gpt-5.1-mini')` returns the right adapter on EY Risk.ai |
| **Singleton** | One shared instance (carefully — testability pain) | DB connection pool, config loader |
| **Strategy** | Swap algorithms behind a common interface | Notification channels (email/SMS/push) all implement `Notifier` |
| **Observer** | Many subscribers react to one event | Event emitter on order-placed → email + analytics + inventory |
| **Repository** | Abstract data access behind a domain interface | `UserRepository` hides Mongo vs MySQL details |
| **Adapter** | Translate one interface to another | Wrapping BigCommerce v2 + v3 REST behind one internal interface during the P&G migration |
| **Circuit Breaker** | Fail fast on a sick downstream | See Section G |
| **Decorator** | Add behavior without modifying the underlying | Auth middleware decorating route handlers |

### 🔶 JUnit + Mockito (JD must-have, I'm JS-side)

> "JUnit is the standard Java unit-test framework — `@Test`, `@BeforeEach`, assertions. Mockito mocks collaborators so you can test a class in isolation — `when(x.foo()).thenReturn(y)`, then `verify(x).foo()`. Conceptually identical to my world: **Jest + jest.mock** in TypeScript/Node — describe/it blocks, mock functions with `mockResolvedValue`, `expect(spy).toHaveBeenCalledWith(...)`. On EY Risk.ai I wrote Jest unit tests for prompt builders and agent step parsers, plus integration tests against a mocked OpenAI. Same discipline, different syntax — I'd ramp on JUnit/Mockito in a week."

---

## Section I — Web Security / Cyber Fundamentals (THE differentiator round)

### OWASP Top 10 (2021) — Know These Cold

| # | Risk | One-line defense |
|---|------|------------------|
| A01 | Broken Access Control | Authorize **every** request server-side; never trust the client's claims |
| A02 | Cryptographic Failures | TLS everywhere; KMS-managed keys; no MD5/SHA1; AES-GCM, not ECB |
| A03 | Injection (SQLi, XSS, command) | Parameterized queries; output encoding; CSP header |
| A04 | Insecure Design | Threat model the feature; trust boundaries explicit |
| A05 | Security Misconfiguration | Hardened defaults; no debug in prod; principle of least privilege |
| A06 | Vulnerable Components | Snyk/Dependabot in CI; pin versions; SBOM |
| A07 | Identification & Auth Failures | MFA; rate-limit /login; rotating refresh tokens; no JWT in localStorage |
| A08 | Software & Data Integrity | Signed packages; verify webhook signatures; CI provenance |
| A09 | Logging & Monitoring Failures | Centralized logs; immutable audit trail; alert on anomalies |
| A10 | SSRF | Egress allowlist; block link-local 169.254.x.x; URL validation |

### Specific Attacks — Defense in One Sentence

| Attack | Defense |
|--------|---------|
| **XSS** | Output encoding by framework default; strict CSP; HttpOnly cookies for tokens |
| **CSRF** | SameSite=Lax/Strict cookies; CSRF tokens for state-changing requests; verify Origin/Referer |
| **SQL injection** | Parameterized queries (`?`/`$1`); never string-concat user input; least-privilege DB user |
| **SSRF** | Allowlist of outbound hosts; block private IP ranges; URL parse + validate scheme |
| **IDOR** | Authorize by *resource ownership*, not just login; never trust IDs from the client without check |

### Secure Headers (the ones to name)
- `Strict-Transport-Security` (HSTS)
- `Content-Security-Policy` (CSP)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` (or `frame-ancestors` in CSP)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`

### OAuth2 / OIDC (cyber-relevant)
- **OAuth2** = delegated authorization (third-party can act on your behalf)
- **OIDC** = identity layer on top of OAuth2 (ID token = JWT proving who the user is)
- **PKCE** for public clients (mobile, SPA) — prevents auth-code interception
- **SAML** is the enterprise SSO predecessor — still dominant for B2B Federation; OIDC is the modern replacement

### 🛡️ What VAPT Actually Involves (real story)

> "On UTEC I was directly involved in the VAPT cycle. Concretely:
> 1. **Scope** — defined target endpoints, environments, accounts, and rules of engagement
> 2. **Vulnerability assessment** — automated scans (Burp Suite, OWASP ZAP, Nessus) on the staging environment to catalog issues — CVEs in deps, misconfigured headers, weak TLS
> 3. **Manual penetration testing** — testers attempted real exploits: auth bypass, IDOR, injection, SSRF, business-logic abuse
> 4. **Findings report** — severity-ranked (Critical/High/Medium/Low) with reproduction steps and remediation guidance
> 5. **Remediation cycle** — my side: prioritize, fix, write regression tests, and re-engage the testers for verification
> 6. **Sign-off** — re-test and clean report before go-live
>
> Specific things I fixed: tightened JWT expiry + added Redis blacklist on logout; replaced a string-concat query with parameterized SQL; added rate-limit on /login; rolled secrets from env files into Secrets Manager; locked S3 buckets to specific IAM roles. That's the muscle memory I'd bring to a Cyber Operate engagement."

### DevSecOps in CI/CD (already wired this on UTEC)

| Stage | Check |
|-------|-------|
| Pre-commit | `gitleaks` secret scan, lint |
| PR open | SAST (SonarQube/Snyk Code), dependency scan (Snyk/Dependabot), unit tests |
| Build | Container image scan (Trivy), IaC scan (Checkov) |
| Staging deploy | DAST (OWASP ZAP automated), smoke tests |
| Prod deploy | Manual approval gate; canary; observability alarms armed |

---

## Section J — Trick / Trap Questions (Rapid Fire)

| # | Q | Sharp answer |
|---|---|---|
| 1 | Predict: `1`, `setTimeout(0)`, `Promise.resolve().then`, `nextTick`, `5` | `1, 5, 4, 3, 2` — sync, then nextTick, then Promise microtask, then setTimeout |
| 2 | `==` vs `===` — what surprises you? | `[] == false` is true (coercion!), `null == undefined` is true. Always `===`. |
| 3 | Hoisting + TDZ | `var` hoisted as `undefined`; `let/const` hoisted but **inaccessible** until init — that's TDZ. ReferenceError if you touch them early. |
| 4 | `0.1 + 0.2` | `0.30000000000000004` — IEEE 754 binary float can't represent decimals exactly. Compare with `Math.abs(a - b) < Number.EPSILON`. |
| 5 | Closure in loop with `var` | All callbacks log the final value because `var` is function-scoped — one shared `i`. Fix: `let` (block-scoped per iteration) or IIFE. |
| 6 | How do you check for NaN? | `Number.isNaN(x)` — not `x === NaN` (always false) and not `isNaN(x)` (coerces, false positives). |
| 7 | Shallow vs deep copy | Spread/`Object.assign` copy one level. Deep: `structuredClone(obj)` (built-in), or recursive — `JSON.parse(JSON.stringify())` loses functions/Date/undefined. |
| 8 | Event delegation | Attach one listener on the parent; use `event.target` to identify the child. Performance + works for dynamically added children. |
| 9 | CORS in one breath | Browser-enforced. Server sends `Access-Control-Allow-Origin`. Preflight `OPTIONS` for non-simple requests. Credentials require `Allow-Credentials: true` + non-wildcard origin. |
| 10 | Idempotency — what & why? | Same request, same result, no extra side effect. Critical for retries — without it, double-charges, double-orders. Use `Idempotency-Key` header on writes. |
| 11 | Why NOT store JWT in localStorage? | XSS-accessible → any injected script steals it. **HttpOnly Secure SameSite cookie** is the correct store; pair with CSRF token for state-changing requests. |
| 12 | 🛡️ `npm install` supply-chain risk | A malicious or hijacked transitive dep can execute install scripts and exfiltrate secrets. Defenses: lockfile commits, `npm ci` in CI, `--ignore-scripts` where possible, Snyk/Dependabot, SBOM, internal mirror/proxy for sensitive projects. Recent real incidents: `event-stream`, `ua-parser-js`, several `npm` typosquats. |

---

## Section K — Behavioral / LSA STAR Stories (Cyber-Flavored)

> Each ~60 seconds. End with a number. Practice aloud.

### 1. Conflict — P&G Migration Approach
> **S:** P&G client tech lead wanted a big-bang BigCommerce → Shopify cutover. **T:** I was backend lead and believed it was high-risk. **A:** I built a one-page risk matrix overnight (failure modes, downtime cost, rollback complexity), proposed a phased plan with reconciliation gates and a dual-write window, walked the client lead through it 1:1 before the next standup. **R:** They switched to the phased plan; we hit go-live **2 weeks ahead**; reconciliation caught **340 mismatches** pre-launch, saving a $50K+ refund scenario.

### 2. Failure + Lesson — Idempotency Miss
> **S:** Early in the P&G migration my Azure Function retried mid-batch and **double-wrote ~1,200 historical orders** to Shopify. **T:** Caught by monitoring within the hour. **A:** Owned it on the client channel immediately, paused the worker, wrote a diff/cleanup script, rewrote the upsert with stable `external_id` + idempotency tokens so the same retry is now a no-op. **R:** Zero customer-visible impact, fixed same business day, idempotency became a hard checklist item for every subsequent batch worker. **Lesson:** in distributed batch systems, retry-safe by design is Day-1, not a fix-later.

### 3. Leading Without Authority — GPT-5.1 Migration
> **S:** On EY Risk.ai, GPT-5.1 dropped. Team's instinct was "GPT-4 works, don't touch it." I was a senior IC, not the tech lead. **T:** I believed migrating would unlock real accuracy gains. **A:** Ran a 3-day spike on my own time — 50-question eval comparing GPT-4 vs GPT-5.1-mini with cost and latency. Packaged as a one-pager. Shared it with the tech lead and client architect in the same thread. Offered to own the prompt-infra rebuild and mentor two juniors through chunking changes. **R:** Migration approved; shipped behind a feature flag; final result **20% accuracy gain, 35% cost reduction**. Both juniors ran their own prompt updates by the end of the migration.

### 4. Ambiguity Under Deadline — EY Citation Requirement
> **S:** Mid-way through the GPT-5.1 migration, EY compliance came in with a new must-have: **every agent answer must cite the source document** for audit. 3 weeks to cutover. **T:** Push the date, descope, or absorb. **A:** 30-min call with compliance to split must-have (inline citations with doc ID + page) from nice-to-have (clickable links to viewer UI). Re-sequenced the sprint: integrated citations into the same retrieval-layer refactor; deferred viewer UI to v2; added citations to the eval suite for regression. Communicated trade-off upfront. **R:** Shipped citations on time, cutover date held, compliance signed off; viewer landed 2 weeks later as planned. **Zero scope creep, zero date slip.**

### 5. 🛡️ Security Incident — VAPT Finding → Remediation
> **S:** On UTEC, the VAPT cycle flagged **HIGH-severity issues**: stale JWTs accepted post-logout, a string-concat query in a legacy report endpoint vulnerable to SQLi, and secrets sitting in env files in the repo. **T:** Remediate before go-live, then prove it in re-test. **A:** (a) Added Redis-backed JWT blacklist with TTL = remaining token lifetime; (b) replaced the vulnerable query with parameterized statements and added an integration test that runs payloads; (c) migrated secrets to AWS Secrets Manager with IAM-role access and rotated all exposed keys; (d) added `gitleaks` to the CI pipeline so it can't happen again. **R:** Re-test came back clean, sign-off on schedule, and the dependency-scan + gitleaks gates I added stayed in the pipeline as standard. That's the kind of close-the-loop work I'd own on a Cyber Operate engagement.

---

## Section L — 30-Second Closers + Smart Questions

### "Why Deloitte Cyber specifically?"
> "Three reasons. **One** — this is a Big Four Cyber practice with real client ownership, not a generic dev role. **Two** — the JD is a genuine fit: I've done VAPT, I've shipped IAM/KMS-grounded systems, I've ground out secure-coding work, and I have the AI/Gen AI layer on top from EY Risk.ai which is where Cyber is heading. **Three** — Deloitte's USI model gives me US-client exposure with a consulting career path I can't build inside a pure delivery firm. WorldClimate and Greenhouse signal a firm that actually invests in its people. That's the next step I want."

### "Why are you switching?"
> "I've had a strong run at LTIMindtree — P&G Olay and EY Risk.ai have both been complex, high-ownership work. The switch isn't about dissatisfaction; it's about moving into a security-focused consulting practice where my VAPT and secure-coding background is the **core** of the role, not a side skill. Deloitte Cyber is exactly that environment."

### Expected CTC anchor
> "Based on 5+ years across P&G, EY, and UltraTech delivery, my AWS / Node.js / React specialization plus the Gen AI and VAPT layer, I'm targeting **₹24–26 LPA**, which aligns with the LSA band based on current market data. Open to discussing the full package including variable and joining support."

### Biggest weakness
> "Early in my career I'd jump to coding before fully scoping a problem — I'd build a clean solution to the wrong question. I now force a 'requirements checklist' on myself before any sprint: write down the business outcome, assumptions, and success metric, then validate with the stakeholder. On EY Risk.ai it caught a misread requirement that would have cost us two days of rework. It's a real weakness — but one I've systematized around."

### 3 Smart Questions to Ask About Cyber Operate

1. "What does the typical client engagement look like for an LSA on the Cyber Operate side — are we embedded in the client's SOC/IAM team, or running specific platform builds?"
2. "How does the practice balance build-side engineering (platforms, automations) against operate-side runbook work? Where does an LSA spend most of their week?"
3. "What's the most common technical learning curve for engineers joining from a general full-stack background into Cyber — graph DBs, threat intel platforms, or something else? I want to know what to ramp on first."

---

## ✅ Final 5-Minute Checklist (read right before the call)

- [ ] Mic + camera tested, clean background, water
- [ ] Resume open in a tab — every bullet I can defend with a metric
- [ ] **Section A intro** — said once aloud, under 90 seconds
- [ ] **VAPT story** (Section K #5) — said once aloud — this is my single biggest differentiator
- [ ] **EY Risk.ai numbers cold**: 20% accuracy, 35% cost cut, GPT-4 → 5.1
- [ ] **P&G numbers cold**: 50% faster batch, 40% lower API time, 100% consistency, 340 mismatches caught, 2 weeks early
- [ ] **UTEC numbers cold**: 30% query time cut, 25% latency cut, 110-member team, Best Team award
- [ ] **CTC anchor** ready: ₹24–26 LPA, LSA band
- [ ] **🔶 honest bridges** mentally tagged: Docker/K8s, Neo4j, Cassandra/DynamoDB, JUnit/Mockito, PyTorch — don't fake
- [ ] **3 questions** to ask, written on a sticky note
- [ ] Breathe. You're ready.

> **Mindset:** You are not interviewing for a coder role. You are interviewing for a **security-aware consultant who codes**. Every answer should lean toward: cost, risk, client outcome, security posture. That's Deloitte Cyber.

---

## Generation Summary

- **File:** `12-Company/deloitte-cyber-1hour-cram.md`
- **Sections:** A–L + Final Checklist
- **Estimated read time:** ~60 minutes (per the timing table at the top)
- **Coverage:** Node.js, React/TS, AWS/Serverless/DevOps, MySQL/Mongo/Redis + PG/Dynamo/Cassandra/**Graph DB cyber framing**, Gen AI / RAG / EY Risk.ai, 6 system-design walkthroughs incl. **runnable JS for debounce/throttle/retry/circuit-breaker**, SOLID + GoF + JUnit/Mockito bridge, **OWASP/VAPT/DevSecOps fundamentals**, 12 trick questions, 5 STAR stories (incl. one security-incident story), closers + 3 smart questions.
- **Honest bridges (🔶):** Docker, Kubernetes, GitOps, Neo4j/Memgraph, DynamoDB, Cassandra, TensorFlow/PyTorch, JUnit/Mockito — clearly marked so you deliver them as conceptual fluency + honest pivot, not faked hands-on.
- **Cyber framing:** woven throughout — VAPT story headlined, JWT/IAM/KMS/OWASP/DevSecOps front-and-center, supply-chain (`npm install`) trick question, graph DB framed for attack-path / identity / lateral-movement modeling.
