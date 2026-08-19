# TEKsystems → HSBC — Node.js Backend Developer / Architect
### Interview Prep & Study File · Pune · 5+ Years

> **Vendor:** TEKsystems (Allegis Group) · **End client:** HSBC · **Location:** Pune
> **Recruiter:** Suraj Vidap — svidap@teksystems.com · +91 88560 74779
> **Rounds promised:** 2 interviews
> **My profile fit:** Node.js / TypeScript / Express / Microservices / AWS serverless / MongoDB / Redis / system design — strong. Banking-domain experience is the gap to bridge in framing.
> **Priority weak areas to weight heavily:** System design depth · Node event-loop internals · Behavioural STAR.

---

## 0. How to use this file
- **Interview 1** is almost certainly a *technical deep-dive* (Node internals + API design + DB + possibly a live coding problem). Prep Sections 4, 6, 7.
- **Interview 2** is almost certainly *system design + architecture + behavioural/managerial* (this is what "Architect" in the title signals). Prep Sections 5, 7, 8.
- Read Section 1–3 once to understand *how TEKsystems and HSBC actually run their loops* — it changes how you behave, not just what you say.
- Section 8 (STAR) maps **your real projects** to HSBC's 4 values. Fill in the bracketed numbers before the interview.

---

## 1. How TEKsystems actually works (the vendor model)

TEKsystems is a **staffing / managed-services firm** (Allegis Group), not the employer you'll work for day-to-day. They partner with a large share of Fortune 500 companies and place contractors/contract-to-hire engineers into client teams. **The single most important fact from candidate reports: interview difficulty and content depend almost entirely on the *client*, not on TEKsystems.** Here, the client is HSBC, so prep to HSBC's bar.

**Typical TEKsystems pipeline (from Glassdoor / Indeed / Naukri reports):**
1. **Recruiter screen** (~30 min, phone/Zoom) — background, experience, motivation, availability, rate/CTC expectations, location. Standard "get to know you." This has likely already happened with Suraj.
2. **Vendor technical screen** — sometimes a **KARAT** assessment (third-party live technical interview TEKsystems uses) or an internal/online coding test. Not always present; depends on client.
3. **Client interview(s)** — with HSBC engineers/leads. This is where the real bar is.

**Pune-specific signal (recent Glassdoor report):** a candidate went resume shortlist → first round → **KARAT assessment** → client technical (SQL) → client face-to-face. So **be ready for a KARAT-style live technical screen** as one of your two rounds, with the second being HSBC's own panel.

**Most likely mapping of your "2 interviews":**

| Round | Most likely format | What to bring |
|---|---|---|
| **Interview 1** | Technical screen — Node.js internals, Express, REST API design, SQL + NoSQL, maybe 1 live coding problem (KARAT-style or HSBC engineer) | Section 4, 6, 7 |
| **Interview 2** | HSBC panel — system design / architecture deep-dive + project walkthrough + behavioural aligned to HSBC values | Section 5, 7, 8 |

> ⚠️ Don't bet the house on this split. It could be *two technical rounds*, or *technical + managerial*. **Prepare both tracks fully.** Ask Suraj directly: *"What's the format and panel for each of the two rounds, and is there a coding/KARAT assessment?"* — recruiters answer this readily and it removes guesswork.

**Known TEKsystems friction (so you're not blindsided):** candidates repeatedly report **ghosting / slow feedback** and decisions sometimes hinging on **domain experience** (one Pune candidate was rejected for "no banking experience" despite strong technicals). Mitigation:
- Proactively address the banking gap in your intro (see Section 3).
- Keep a polite follow-up cadence with Suraj (every 2–3 business days post-round). Don't wait silently.
- Confirm rate, contract length, and conversion-to-FTE possibility *before* round 2.

---

## 2. HSBC as the client — what they screen for

**Mission:** "Opening up a world of opportunity." **HSBC manages ~$3.2T in assets across ~60+ markets** — so the engineering culture is **risk-disciplined, security-first, reliability-obsessed**. Frame everything you say through *security, correctness, auditability, and scale*.

**HSBC's four core values** (these drive the behavioural round and any values/situational-judgement assessment — memorise them):

| Value | What it means | How to show it |
|---|---|---|
| **We value difference** | Seek views unlike your own; empathy for diverse perspectives | Story about incorporating differing opinions / working across distributed teams |
| **We succeed together** | Trust, support, connect across boundaries; collaboration | Cross-functional delivery story (frontend/DevOps/QA) |
| **We take responsibility** | High standards, accountability, good judgement | Owning a production bug / security issue end-to-end |
| **We get it done** | Steady progress, continuous improvement, clear choices | Shipping at scale under constraint / deadline |

**What HSBC technical interviews emphasise (aggregated from Glassdoor / LeetCode / GeeksforGeeks experiences):**
- **CS fundamentals are non-negotiable:** OOP, DBMS/SQL, DSA, system design. Even at senior level they probe basics.
- **Project deep-dives:** they go *in-depth* on architecture, your specific role, technologies, and the challenges you faced. "Explain a backend project you built and the challenges you hit" is a recurring opener.
- **Architecture-level questions** reported for engineer roles: *design a secure REST API from scratch · explain CI/CD and how you'd set up a deployment pipeline for a microservices app · how do you handle memory management and prevent leaks in a high-throughput backend · when would you choose microservices over a monolith.*
- For experienced/lateral candidates (e.g. a 4-yr SDE-2 report): **deep language-internals grilling** (their Java loop probed Java 8 streams, concurrency, SOLID, microservices) — the Node.js equivalent is **event loop, async model, streams, clustering, error handling, SOLID, microservices patterns.**
- A **values / situational-judgement assessment** is common in HSBC's own process (situational MCQs + sometimes video). For a vendor placement you may skip this, but be ready to answer scenario questions verbally.

**Difficulty read:** HSBC software-engineer interviews rate ~3/5 difficulty and ~70% positive. Not brutal — but thorough. Depth + clarity wins, not exotic puzzles.

---

## 3. Closing the "banking domain" gap (do this in your intro)

You don't have banking on your resume — neutralise it proactively rather than hoping it's not raised. Bridging language:

> "Most of my work has been on large-scale, security-sensitive platforms — UltraTech's construction-management system served ~6M users and went through full VAPT security hardening, and the EY Risk.ai platform was an enterprise risk product. So while the *domain* label is new, the *engineering concerns* banking cares about — data security, auditability, high availability, correctness under load — are exactly what I've been building for. I ramp on domain fast."

Tie every technical answer back to **security, idempotency/correctness, and reliability** — that's the banking mindset and it signals fit better than claiming domain knowledge you don't have.

---

## 4. INTERVIEW 1 — Node.js & Backend technical deep-dive

> Format answers as: short definition → *why it matters* → concrete example/trade-off. HSBC rewards depth + clarity. Star (★) = your flagged weak area, drill these hardest.

### 4.1 ★ Event loop & runtime internals (highest-frequency senior topic)

**Q: Explain the Node.js event loop.**
Node runs JS on a single main thread using a non-blocking, event-driven model built on **libuv**. The event loop processes work in ordered **phases**, each with its own callback queue:
1. **timers** — `setTimeout` / `setInterval` callbacks whose threshold elapsed
2. **pending callbacks** — deferred I/O callbacks (some system errors)
3. **idle/prepare** — internal
4. **poll** — retrieves new I/O events; executes I/O callbacks; this is where the loop blocks waiting for I/O
5. **check** — `setImmediate` callbacks
6. **close callbacks** — e.g. `socket.on('close')`

Between **every** phase (and after each macrotask) Node drains the **microtask queues**: first the **`process.nextTick`** queue, then the **Promise** microtask queue. `nextTick` has *higher* priority than Promise microtasks — overusing it can starve the loop.

**Q: What's the difference between `setTimeout(fn,0)`, `setImmediate(fn)`, and `process.nextTick(fn)`?**
- `process.nextTick` runs *before* the loop continues to the next phase — soonest.
- `setImmediate` runs in the **check** phase (after poll).
- `setTimeout(fn,0)` runs in **timers** with a minimum ~1ms clamp.
- Inside an I/O callback, `setImmediate` reliably fires before `setTimeout(0)`; at the top level the order between them is non-deterministic.

**Q: Node is "single-threaded" — so how does it do work in parallel?**
The JS execution is single-threaded, but **libuv maintains a thread pool (default 4 threads, `UV_THREADPOOL_SIZE`)** used for filesystem ops, DNS lookups (`dns.lookup`), some crypto (`pbkdf2`, `randomBytes`), and zlib. **Network I/O does *not* use the thread pool** — it uses the OS async primitives (epoll on Linux, kqueue on macOS, IOCP on Windows). So thousands of concurrent sockets are handled efficiently without thread-per-connection.

**Q: How would you scale Node across CPU cores?**
- **`cluster` module** — forks multiple *processes*, each with its own event loop and memory, sharing a server port via the primary process (round-robin distribution). Best for scaling **request handling** across cores. A worker dying can be auto-restarted.
- **`worker_threads`** — multiple *threads* in one process, **shared memory** via `SharedArrayBuffer`. Best for **CPU-bound work** (parsing, crypto, image/data processing) that would otherwise block the event loop.
- In production, prefer **PM2** (process manager + cluster + restart/zero-downtime reload) or, better, **horizontal scaling behind a load balancer / Kubernetes**, treating each container as a single Node process.

**One-liner that lands well:** *"cluster = scale I/O across cores via processes; worker_threads = move CPU work off the main loop via threads; containers + LB = scale across machines."*

### 4.2 Async patterns & error handling

- **Callbacks → Promises → async/await.** Know error-first callback convention `(err, data)`, callback hell, and how `async/await` is syntactic sugar over Promises.
- **`Promise.all` vs `allSettled` vs `race` vs `any`** — `all` rejects on first failure; `allSettled` waits for all and reports each; `race` settles on first settle; `any` resolves on first fulfilment.
- **Error handling rules:** wrap `await` in `try/catch`; for Express, route async errors to **error-handling middleware** `(err, req, res, next)`; attach handlers for `unhandledRejection` and `uncaughtException` (log + graceful shutdown, **don't** keep serving after an uncaught exception).
- **Backpressure & streams:** use `pipe()` / `pipeline()` to process large data without buffering it all in memory — directly relevant to "high-throughput backend."

### 4.3 ★ Memory leaks in a high-throughput backend (HSBC asks this explicitly)

**Common causes:** unbounded in-memory caches/maps, accumulating event listeners (forgetting `removeListener`), timers never cleared, closures holding large references, global state growing per request, leaking DB connections.
**How to detect/fix:**
- `process.memoryUsage()` (watch `heapUsed`, `rss`) and trend it.
- **Heap snapshots** via `--inspect` + Chrome DevTools; compare two snapshots to find retained objects.
- **`clinic.js` / `0x`** for flame graphs; `node --prof` for V8 profiling.
- Fixes: bound caches with TTL/LRU (e.g. `lru-cache`), pool and release DB connections, remove listeners, clear intervals, avoid module-scope mutable accumulation.
**Banking framing:** memory stability = availability = trust. Mention canary deploys + alerting on memory trend.

### 4.4 Express & REST API design

**Q: Design a secure REST API from scratch (HSBC favourite).** Walk through:
- **Resource modelling & verbs:** nouns for resources, correct HTTP methods; **idempotency** — GET/PUT/DELETE idempotent, POST not. For money operations use **idempotency keys** to prevent double-processing on retries.
- **Status codes:** 200/201/204, 400/401/403/404/409/422, 429 (rate limit), 5xx.
- **Versioning:** `/v1/...` (URL) or header-based.
- **Validation:** schema-validate every input (Joi/Zod/celebrate) — never trust client input (injection defence).
- **AuthN/AuthZ:** JWT/OAuth2 (below), least-privilege scopes, RBAC.
- **Security headers & hardening:** `helmet`, CORS allow-list, rate limiting, request size limits, `npm audit`/Snyk for deps, secrets in env/secrets-manager (never in code).
- **Pagination / filtering:** cursor or offset; avoid unbounded result sets.
- **Observability:** structured logging (correlation/trace IDs), metrics, audit logs (critical for banking).
- **Transport:** TLS everywhere; encrypt sensitive data at rest.

**Express middleware order:** request → global middleware (logging, body parse, helmet, cors) → route middleware (auth, validation) → handler → **error-handling middleware last**.

### 4.5 Auth — JWT & OAuth2

- **JWT structure:** `header.payload.signature` (base64url), signed (HS256 symmetric / RS256 asymmetric). **Stateless** — server doesn't store sessions. Downsides: can't trivially revoke before expiry → mitigate with **short-lived access tokens + refresh tokens + a denylist/rotation**.
- **Sessions vs JWT:** sessions = stateful (store server-side, scales worse but easy revoke); JWT = stateless (scales horizontally, harder revoke). Don't store JWTs in localStorage if XSS is a concern — prefer httpOnly cookies.
- **OAuth2 flows:** **Authorization Code (+ PKCE)** for user-facing apps; **Client Credentials** for service-to-service. Know the difference between **authentication** (who you are — OIDC) and **authorization** (what you can do).

### 4.6 Databases — SQL + NoSQL (JD requires both)

- **SQL (MySQL/PostgreSQL):** strong **ACID** guarantees, relational integrity, joins, **transactions** — ideal for financial/consistency-critical data. Know normalization (1NF–3NF), indexes (B-tree, composite, covering), `EXPLAIN`/query plans, isolation levels (read committed → serializable) and the anomalies they prevent (dirty/non-repeatable/phantom reads).
- **NoSQL (MongoDB):** flexible schema, horizontal scale via **sharding**, **BASE** / eventual consistency. Know document modelling (embed vs reference), indexing, the **aggregation pipeline**, and that **multi-document ACID transactions** exist (since 4.0) but cost performance — use sparingly.
- **When to use which:** SQL for transactional/relational, strong-consistency data (accounts, ledgers); NoSQL for high-write, flexible, or denormalised read-optimised data (events, sessions, catalogues). Polyglot persistence is fine.
- **Scaling reads:** replication (primary-replica) + read replicas; **scaling writes:** sharding/partitioning.

### 4.7 Caching & Redis

- **Patterns:** **cache-aside** (lazy load on miss — most common), **write-through** (write cache+DB together), **write-behind** (async flush).
- **Redis uses:** caching, session store, rate-limiting counters, pub/sub, distributed locks (Redlock — with caveats), leaderboards (sorted sets).
- **Invalidation & TTLs:** the hard part. Use TTLs; bust on write; beware **cache stampede** (mitigate with locks / request coalescing / jittered TTLs) and **hot keys**.

### 4.8 Containers & CI/CD (preferred in JD, expected by HSBC)

- **Docker:** multi-stage builds (small images), non-root user, `.dockerignore`, health checks, env-driven config (12-factor).
- **Kubernetes:** pods/deployments/services, liveness/readiness probes, HPA (autoscaling), rolling updates, secrets/configmaps.
- **CI/CD pipeline (HSBC asks you to design one):** commit → lint + unit tests → build image → SAST/dependency scan → push to registry → deploy to staging → integration/e2e → **canary or blue-green** to prod → automated rollback on health-check failure. Emphasise **security gates** and **zero-downtime** for a bank.

---

## 5. INTERVIEW 2 — System Design & Architecture ★

> This is the "Architect" half of the role and your flagged weak area. Use a repeatable framework so you never freeze.

### 5.1 The framework (say it out loud, drive the whiteboard)
1. **Clarify** — functional + non-functional requirements; scope; who/what uses it.
2. **Estimate** — scale: QPS, read/write ratio, data size, latency targets, growth.
3. **API contract** — key endpoints.
4. **High-level design** — clients → LB → services → data stores → async/queues → cache.
5. **Data model** — storage choice + schema + access patterns.
6. **Deep-dive** — the 1–2 hardest parts (consistency, hot path, bottleneck).
7. **Scale & resilience** — caching, sharding, replication, load balancing, rate limiting, circuit breakers, failover.
8. **Trade-offs** — name them explicitly (CAP, consistency vs availability, cost).

### 5.2 Core concepts to have crisp
- **Horizontal vs vertical scaling**; **stateless services** (so you can scale out).
- **Load balancing:** L4 vs L7; algorithms (round-robin, least-connections, hashing); health checks.
- **CAP theorem:** under partition, choose consistency or availability. Banks lean **CP for money movement**, AP-tolerant for non-critical reads.
- **Caching layers:** client → CDN → app cache (Redis) → DB cache.
- **DB scaling:** replication (read scale, HA) + sharding/partitioning (write scale); know the trade-offs (cross-shard joins, rebalancing).
- **Async / messaging:** decouple with queues; **eventual consistency**; **saga pattern** for distributed transactions with **compensating actions** (instead of 2PC).
- **Resilience patterns:** retries with **exponential backoff + jitter**, **circuit breaker**, **bulkhead**, **idempotency keys**, **rate limiting** (token bucket / leaky bucket), graceful degradation, dead-letter queues.
- **Observability:** the three pillars — logs, metrics, distributed traces (correlation IDs).

### 5.3 ★ Worked example A — **Money / fund transfer service** (perfect for HSBC)
- **Requirements:** transfer X from account A → B; never lose or double-apply money; auditable; highly available.
- **Why it's hard:** correctness under concurrency + failures; you must avoid double-debit on retries.
- **Design:**
  - Use a **transactional ledger** in a **strongly consistent SQL store**; model transfers as **immutable double-entry ledger records** (debit + credit), never mutate balances in place.
  - **Idempotency key** per transfer request → dedupe retries (client sends key; server stores result keyed by it).
  - For cross-service/cross-DB transfers, use a **saga** with compensating transactions (reserve → debit → credit → confirm; on failure, reverse).
  - **Outbox pattern** + message queue for reliable event publishing (no lost events).
  - **Audit log** (append-only, immutable) for compliance.
  - HA: multi-AZ, synchronous replication for the ledger; define **RPO/RTO**.
- **Trade-off to name:** strong consistency over latency for the money path; eventual consistency acceptable for notifications/analytics.

### 5.4 Worked example B — **Rate limiter**
Token-bucket per user/API key in **Redis** (atomic `INCR` + TTL, or a Lua script for token-bucket). Distributed → centralise counters in Redis; discuss sliding-window vs fixed-window vs token-bucket trade-offs, and what to return (HTTP 429 + `Retry-After`).

### 5.5 Worked example C — **Scalable notification/alert service**
Producers publish events → **Kafka/SQS** → consumer workers fan out to channels (email/SMS/push) → provider adapters with **retries + DLQ**; idempotent sends; rate-limit per provider; template service; track delivery status. Decoupled, horizontally scalable, resilient to provider outages.

### 5.6 Microservices vs monolith (HSBC asks the trade-off)
- **Monolith:** simpler to build/deploy/debug early; one codebase; strong consistency easy. Hurts at scale: deploy coupling, scaling everything together, large blast radius.
- **Microservices:** independent deploy/scale, team autonomy, fault isolation, polyglot. Costs: distributed-systems complexity, network failures, **distributed transactions** (saga/eventual consistency), observability overhead, ops burden.
- **Mature take:** *"Start modular-monolith; extract services along bounded contexts when scaling, team, or deploy pressure justifies it. Don't pay distributed-systems tax before you need to."* — this nuance reads as senior/architect, not buzzword.
- **Inter-service comms:** sync (REST/gRPC) vs async (events) — prefer async for decoupling; use **API gateway**, **service discovery**, **circuit breakers**.

### 5.7 Kafka vs RabbitMQ (Good-to-Have in JD)
- **Kafka:** distributed **commit log**; very high throughput; **partitions + consumer groups**; ordering *per partition*; **replayable** (retain + re-consume); great for event streaming/event sourcing/analytics.
- **RabbitMQ:** traditional **message broker** (AMQP); rich **routing** (exchanges), per-message **ack**, **DLQ**, priority; lower latency for task/work queues; messages typically gone after consumption.
- **Pick:** Kafka for high-volume event streams + replay; RabbitMQ for complex routing + reliable task queues / RPC-style work distribution.

---

## 6. Coding round prep (likely in Interview 1 / KARAT)

HSBC + KARAT coding tends toward **easy–medium**: DSA basics, pattern printing, two-sum, BST range trim, rotting oranges, SQL queries, plus **JS-specific** mechanics. Your existing reference list is the right target — drill these to muscle memory:

- **JS mechanics:** `debounce` / `throttle`, **deep clone**, `Promise.all` polyfill, custom `EventEmitter`, currying, **predict-the-output** async ordering questions (event loop / microtask vs macrotask) — *flagged as highest-frequency Mettl/KARAT topic*.
- **DSA:** arrays/strings (two-sum, sliding window), hashmaps, BST operations, BFS/DFS (rotting oranges), basic DP. Write **clean, optimised** code and **state time/space complexity** unprompted.
- **SQL:** joins, group-by/having, window functions, second-highest-salary type queries.

**KARAT tip:** it's a live recorded interview with a real engineer + auto follow-ups. **Talk through your approach continuously**, clarify before coding, test your code aloud. Silence reads badly.

---

## 7. Questions to drill on YOUR resume (they *will* go deep)

Be ready to whiteboard the architecture and defend every decision for each:
- **UTEC / UltraTech** — 6M-user construction platform: walk the architecture, how you handled scale, the **VAPT security** hardening (what vulns, what you fixed), AWS serverless choices (Lambda/API Gateway/SQS/SNS/EventBridge/OpenSearch). *This is your strongest "scale + security" story — banks love it.*
- **EY Risk.ai** — agentic GPT risk platform, the GPT-4 → GPT-5.1 prompt re-architecture: what broke, how you re-architected, reliability/cost. *Your "ownership + modern" story.*
- **P&G Olay** — BigCommerce → Shopify migration: data migration correctness, zero-downtime cutover, cross-functional coordination. *Your "collaboration + get-it-done" story.*
- **Vkonnect Health** — MERN telemedicine: real-time, data sensitivity (health PII ≈ banking-grade privacy thinking).

For each, have ready: **the hardest technical challenge**, **a decision you'd make differently now**, and **a measurable result** (latency cut, users served, incidents reduced — insert real numbers).

---

## 8. ★ Behavioural — STAR mapped to HSBC's 4 values

Use **S**ituation → **T**ask → **A**ction → **R**esult. Keep each ~90 seconds. Fill the `[brackets]` with real numbers before the interview.

**"We get it done" → UltraTech scale delivery**
- S: UTEC platform had to support ~6M users with [feature/deadline pressure].
- T: I owned [backend module / API performance].
- A: I [introduced caching/queues/serverless scaling], [specific actions].
- R: [Reduced latency by X% / handled Y concurrent users / shipped on date].

**"We take responsibility" → a production/security issue you owned**
- S: During VAPT, [vulnerability / production incident] was found in [service].
- T: I was accountable for remediation under [time/compliance] constraint.
- A: I [root-caused, fixed, added tests/monitoring, prevented recurrence].
- R: [Closed all findings / zero recurrence / passed re-audit].

**"We succeed together" → Olay migration cross-functional**
- S: BigCommerce → Shopify migration needed frontend, DevOps, and client stakeholders aligned.
- T: I [owned backend/data migration] while coordinating across teams.
- A: I [set up sync points, handled dependencies, unblocked others].
- R: [Migrated with zero data loss / on-time cutover / X downtime].

**"We value difference" → incorporating a differing view**
- S: On [project], a teammate/stakeholder pushed a [different approach] I initially disagreed with.
- T: Decide the right path without steamrolling.
- A: I [heard them out, tested both, combined the best of each / changed my mind on evidence].
- R: [Better outcome + stronger team trust].

**Other near-certain behavioural prompts:** *Why HSBC? · Why are you leaving your current role? · Tell me about a conflict with a teammate · A time you failed · How do you handle tight deadlines · How do you keep skills current.* Prep crisp answers; tie back to values + the role.

**"Why HSBC?" template:** global scale + engineering rigour + impact ("opening up a world of opportunity") + my fit on security-sensitive, high-scale backends. Avoid generic "big brand" answers.

---

## 9. Questions to ask THEM (signals seniority)

For HSBC engineers (round 2):
- What does the service/team own, and what's the current scale (QPS, data volume)?
- Biggest current architecture challenge — what would I work on first 90 days?
- How are correctness/consistency and security handled in the money/data path?
- Deployment cadence and CI/CD maturity?
- Monolith vs microservices today — where on that journey?

For Suraj (logistics):
- Exact format + panel for each of the 2 rounds; is there a KARAT/coding assessment?
- Contract length, day rate / CTC, and conversion-to-FTE possibility.
- Timeline for feedback after each round.

---

## 10. Logistics & documents checklist
- Suraj asked you to **share the required documents** — get these ready now: updated CV (use your **plain ATS resume** for the vendor portal), ID/PAN, last 3 payslips, current/previous offer letters, education/experience certs, and notice-period details.
- Confirm **interview mode** (Zoom/Teams/in-person at IndiQube Orchid Tower, Yerawada, Pune) and exact times.
- **Follow-up cadence:** ping Suraj every 2–3 business days after each round. TEKsystems ghosting is common — stay polite but visible.

---

## 11. 5-day micro-plan (compresses to 3 if needed)
- **Day 1:** Event loop / libuv / cluster vs worker_threads / async + error handling (Section 4.1–4.3). Out-loud explanations.
- **Day 2:** REST API design + JWT/OAuth + security + SQL vs NoSQL + caching (4.4–4.7). Do the "design a secure REST API" answer end-to-end.
- **Day 3:** System design framework + money-transfer + rate limiter + microservices vs monolith + Kafka vs RabbitMQ (Section 5). Whiteboard each once.
- **Day 4:** Coding drills — JS mechanics + async output prediction + 6 DSA + 3 SQL (Section 6). Timed.
- **Day 5:** STAR stories written out with real numbers (Section 8) + resume deep-dive rehearsal (Section 7) + "Why HSBC" + mock the full loop.

---

## Appendix — Reusable company research prompt (for your next target)

> Paste this into Claude (or Claude Code in your Interview-Practice repo) for any future role to generate a file like this one. Replace the bracketed parts.

```
You are my interview-prep researcher. Target role:
- Vendor/agency: [VENDOR]
- End client: [CLIENT]
- Role/title: [ROLE], [YEARS] years, [LOCATION]
- JD (paste full text): [JD]
- My background: Senior full-stack dev — Node.js/TypeScript/Express, microservices,
  AWS serverless, MongoDB, Redis, system design. Projects: [LIST]. Weak areas: [LIST].

Do deep web research across AmbitionBox, Glassdoor, Fishbowl, LeetCode Discuss,
GeeksforGeeks, Naukri/Code360, and the client's own values/careers page. Then produce a
single well-structured .md study file for my Interview-Practice/companies folder containing:
1. How the VENDOR runs interviews (rounds, assessments like KARAT, ghosting/logistics).
2. How the CLIENT runs interviews + their core values + what they screen for.
3. Predicted round-by-round structure for MY specific N interviews, with a caveat to confirm.
4. Per-round technical Q&A with real, correct answers (depth-first, with trade-offs),
   weighted toward my flagged weak areas (★).
5. System design framework + 2-3 worked examples relevant to the client's domain.
6. Coding-round prediction + drill list.
7. Behavioural STAR section mapping the client's values to MY real projects (leave
   [brackets] for me to insert metrics).
8. Questions to ask them, a documents/logistics checklist, and a 5-day micro-plan.
Paraphrase all sourced material; cite where claims are non-obvious. Be feasibility-honest —
flag uncertainty, don't invent specifics.
```

---
*Sources synthesised: Glassdoor (TEKsystems & HSBC interview reports, incl. Pune/KARAT), Indeed, Naukri/Code360, LeetCode Discuss, GeeksforGeeks, InterviewQuery, Dataford, and HSBC's published values. Interview structures vary by client and panel — treat the predicted split as a strong prior, not a guarantee, and confirm with Suraj.*
