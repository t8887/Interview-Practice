# Coforge — Technical Lead (Node.js + React) — Interview Prep

> **Candidate:** Onkar Sawant · ~6 yrs · Pune · Immediate joiner · Target: **25 LPA**
> **Leverage:** Encora L1 cleared + other active pipelines
> **Role type:** Client-facing delivery Tech Lead, team of ~4–8, services model
> **Process:** Recruiter screen → (sometimes aptitude) → Tech R1 (Node/React/coding) → Tech R2 (**often with client panel** — system design + project deep-dive) → Managerial → HR → BGV. Rounds ~4–5 days apart. **Chase HR proactively** (templates in §14).
> **Difficulty:** Medium tech bar, **HIGH communication bar** — clarity is scored in every round.

---

## 1. Company & Role Decode [HIGH — read before every round]

### What Coforge is

| Fact | Detail | Why it matters to you |
|---|---|---|
| Identity | Ex-**NIIT Technologies**, rebranded 2020. HQ Noida, ~$1.5B revenue run-rate, 30k+ people, offices incl. **Pune** | Mid-size = Tech Leads get real client exposure, not lost in a pyramid |
| Top verticals | **BFSI, Insurance, Travel/Transport/Hospitality (TTH)** | Your prep designs (§6) are deliberately insurance + travel |
| Insurance depth | Historic strength in **London Market insurance** (Lloyd's ecosystem); Duck Creek-style policy-admin implementations; SLK Global acquisition (2021) added banking/insurance BPS | Drop "London Market / policy admin / claims" vocabulary in the client round |
| Travel depth | NIIT Tech heritage: airlines, airports, cargo, GDS ecosystem. **Sabre mega-deal (~$1.56B, 13-yr, announced 2024)** — largest in company history, heavily AI-flavored | If the client panel is travel-side, you speak inventory/booking natively (§6b) |
| Quality eng | Acquired **Cigniti** (2024) — QE at scale | Expect testing-strategy questions to be taken seriously |
| AI push | **Coforge Quasar** — in-house enterprise AI platform; GenAI baked into large deals | Your EY Risk.ai story is directly sellable (§11) |

### "Technical Lead" at a services company ≠ product company

| Dimension | Product-company Lead | **Coforge Tech Lead (what they're hiring)** |
|---|---|---|
| Owns | A codebase/domain long-term | A **client deliverable**: scope, dates, quality, team throughput |
| Estimation | Rough, iterative | **Contractual** — your estimate feeds an SOW/change request; being wrong costs money |
| Client | Internal PM proxy | **You are on client calls weekly** — demos, status, escalations, saying "no" politely |
| Team | Stable, hand-picked | 4–8 engineers, mixed seniority, **rotation risk** — you standardize so anyone can be swapped in |
| Escalations | Rare | First line of defense: prod incidents, slipped dates, client unhappiness land on you first |
| Extras | — | Interviewing for account staffing, onboarding, utilization awareness, audit/compliance artifacts |

### 3 talking points proving you've lived this model (iProgrammer = services DNA)

1. **"I've been the client's daily technical contact before."** At iProgrammer, UTEC (UltraTech) was a client account — I ran sprint demos, defended estimates, and handled VAPT audit findings directly with the client's security team. I know a Tech Lead's real job is **making the client confident**, not just making code work.
2. **"I estimate like it's contractual."** I break epics into a WBS, size with the team (not for them), add explicit spike tickets for unknowns, and flag scope-vs-date tradeoffs *early* in writing — because in services, a silent slip becomes an escalation.
3. **"I build teams that survive rotation."** Services teams churn. My answer: enforced conventions (NestJS module structure, lint/CI gates), ADRs for every architecture decision, and onboarding docs — at EY a new joiner ships in week one because the repo explains itself.

---

## 2. The Title-Bridge Strategy [HIGH — this decides the offer level]

**Core reframe:** You are not "a senior asking for a promotion." You are **someone who has been doing lead work without the label**, interviewing for the title that matches it. Never apologize for the title; inventory the behaviors.

### Evidence inventory (memorize — deploy 2–3 per answer, never the whole list)

| Lead behavior | Your proof |
|---|---|
| Module/track ownership | Owned end-to-end modules at EY Risk.ai and UTEC — design → delivery → prod support |
| Architecture decisions | Drove GPT-4→GPT-5.1 agentic re-architecture at EY; EC2→Lambda migration decision at Vkonnect; serverless + IaC architecture at UTEC |
| Client-facing | UTEC client demos/VAPT closure (iProgrammer); EY stakeholder reviews; P&G Olay migration calls |
| Mentoring | Onboarded/mentored juniors at EY & iProgrammer; PR review discipline; pairing on design |
| Estimation & planning | Sprint estimation, WBS breakdown, spike identification across EY/iProgrammer |
| Quality gates | Code review standards, CI checks, testing strategy on my modules |

### 60-second "Tell me about yourself" (Coforge cut — rehearse aloud)

> "I'm a senior engineer with ~6 years building and **leading delivery of** Node.js, React, and AWS serverless systems — mostly in client-services setups, which is exactly Coforge's model. At iProgrammer I was the client-facing technical owner for UltraTech's UTEC platform — a serverless construction SaaS serving ~6 million users — where I drove the architecture, the IaC, and closed a VAPT security audit directly with the client. Currently at EY I re-architected Risk.ai, an agentic AI platform, from GPT-4 to GPT-5.1 — agents, RAG, LangGraph — while mentoring juniors and running estimation for my module. So I've been doing the Tech Lead job — architecture ownership, client calls, mentoring, estimation — without the formal title, and I'm looking for the role where the title matches the work. Coforge fits because it's client-delivery in BFSI, insurance and travel, and I bring the extra edge of production agentic-AI experience your clients are asking for. I'm Pune-based and an immediate joiner."

### "Have you led a team?"

> "Not with a formal Lead title — and I'll be straightforward about that. But functionally, yes: at EY I own a module's architecture, break down and estimate its work, review every PR that touches it, and mentor two juniors who now ship independently. At iProgrammer I was the technical point of contact the client called first. What I haven't done is formal appraisals and staffing — and that's precisely the growth I'm signing up for here. Everything else on a Tech Lead's plate, I've already carried."

**Why this works:** honest → credible; "functionally yes" + specifics → capable; names the actual gap (people admin) → self-aware, and it's the *smallest* gap to close.

### "Why should we hire you as a Lead when you were a Senior Engineer?"

> "Because the title lag is about org structure, not capability. At EY, Lead slots are ring-fenced by band; the work I do — architecture calls, estimation, client demos, mentoring — is the Coforge Tech Lead JD. Three concrete proofs: I drove a platform re-architecture decision (GPT-4→5.1 agentic redesign) and defended it to stakeholders; I've owned client-facing delivery including a security audit closure at UltraTech scale; and engineers I mentored now work independently. Hiring me as a Lead isn't a bet on potential — it's recognizing work already done, plus you get a lead who still codes at depth and brings agentic-AI delivery experience you can put in front of clients."

**Language rules for every round:** say **"I owned / I drove / I decided / my module"**. Never "I was involved in", "I helped with", "we somehow". Credit the team for execution, claim the decisions.

---

## 3. Round-by-Round Battle Plan

### Round 0 — Recruiter screen (phone, ~15 min)

| What's tested | Prep focus | Risk areas | Exact talking points |
|---|---|---|---|
| CTC/notice/stack checklist match | 60-sec pitch (§2); confirm keywords: Node, React, AWS, microservices, lead experience | Underselling lead-readiness; fumbling CTC question | "Functionally leading for 2+ years — architecture, client calls, mentoring." · "**Immediate joiner**" (say it twice — it's rare and valuable). Salary: give expectation, deflect CTC per §12 script |

### Round 0.5 — Aptitude test (sometimes, lateral hires occasionally skipped)

| What's tested | Prep focus | Risk areas | Talking points |
|---|---|---|---|
| Quant/logical/verbal, sometimes basic coding MCQ | 30 min of practice aptitude the night before; don't over-invest | Careless speed errors | N/A — just don't be rusty. If offered a waiver as a lateral, accept gracefully |

### Round 1 — Technical: core Node/React/coding (~60 min, Coforge panel)

| What's tested | Prep focus | Risk areas | Exact talking points |
|---|---|---|---|
| Node internals (event loop, streams, cluster), React perf/state, 1–2 DSA easy-medium live, REST/microservices basics | §4 rapid-fire daily; §5; §9 problems 1–10 in JS with running code | Over-architecting a simple coding question; talking while stuck instead of thinking structurally | Narrate approach → code → test with an edge case, out loud. Every internals answer ends with a **story hook** — that's what separates lead from senior. If unsure: "I haven't hit that in prod; here's how I'd reason about it…" |

### Round 2 — Technical with **CLIENT panel** (system design + project deep-dive) [HIGHEST STAKES]

| What's tested | Prep focus | Risk areas | Exact talking points |
|---|---|---|---|
| Can this person be put in front of *our* stakeholders? System design (likely their domain: insurance/travel/banking), deep-dive on YOUR architecture, communication clarity | §6 all three walkthroughs narrated aloud on a timer; UTEC retell polished; one page of *business vocabulary* for insurance & travel (§6a/6b intros) | Diving into tech before framing business value; jargon-dumping; not asking clarifying questions; badmouthing any past client | See "client-round dynamic" below. Open every answer with the business outcome, offer depth: "Happy to go deeper into the queueing model if useful." |

**The client-round dynamic — pyramid communication:**
1. **Business first (30 sec):** "UTEC is UltraTech's contractor engagement platform — ~6M users. The business needed reliability during campaign spikes at predictable cost, so I designed it serverless."
2. **Architecture next (2 min):** components + *why* for each, in plain terms ("a queue between intake and processing so a downstream slowdown never loses a request").
3. **Tech depth on demand:** only when pulled — then go genuinely deep (that's where you win).
4. **Clarify before designing:** "Before I design — is claims intake digital-first or also call-center? What's the straight-through-processing goal?" Asking 2–3 sharp domain questions *is* the lead signal.
5. Never: acronym soup, criticizing their current stack, "it depends" without following through with the actual decision factors.

### Round 3 — Managerial (delivery, prioritization, team handling)

| What's tested | Prep focus | Risk areas | Exact talking points |
|---|---|---|---|
| Delivery ownership, escalation handling, estimation, people situations, title-bridge probing | §10 all STARs aloud; §2 scripts; first-30-days plan | Rambling STARs (>2.5 min); blaming clients/teammates; vague metrics | Every answer = Situation 15s → Task 10s → Action 60s → Result + learning 20s. Own failures explicitly ("my estimation miss — here's what I changed"). Close with the 30-day plan if asked how you'd start |

### Round 4 — HR + documentation/BGV

| What's tested | Prep focus | Risk areas | Exact talking points |
|---|---|---|---|
| Salary, notice, stability (Synechron!), docs | §12 scripts verbatim; salary anchoring; have payslips/relieving letters ready NOW (BGV is doc-heavy) | Inflating CTC (BGV verifies!); apologizing for Synechron; going soft on 25 | Synechron 3-line framing (§12) — deliver it calmly, don't over-explain. Anchor 25 with pipeline leverage. "Immediate joiner — I can start as soon as your BGV clears." |

---

## 4. Node.js — LEAD Level [HIGH]

### 4.1 Depth notes (skim before R1)

**Event loop — the answer that signals lead:** phases are `timers → pending callbacks → idle/prepare → poll (I/O) → check (setImmediate) → close`. The lead-level detail: **microtask queues (`process.nextTick` first, then Promise jobs) drain after *every* callback**, not merely between phases — so a recursive `nextTick` or a promise chain that never yields starves I/O entirely.

**libuv threadpool:** default **4 threads** (`UV_THREADPOOL_SIZE`, max 1024). Used by `fs.*`, `crypto.pbkdf2/scrypt/randomBytes`, `zlib` (async), `dns.lookup`. **Network sockets do NOT use it** — they use epoll/kqueue/IOCP. So "Node is single-threaded" is wrong twice: threadpool + your JS being the only single thread.

**Process/thread scaling:**

| | `cluster` | `worker_threads` | PM2 |
|---|---|---|---|
| Model | Multi-**process**, shared port | Threads, shared memory (SharedArrayBuffer) | Process manager *around* cluster |
| Use for | I/O-bound HTTP on multi-core VM/ECS | CPU-bound work (crypto, parsing, image) | Ops: restarts, zero-downtime reload, logs |
| Don't use when | On Lambda (concurrency = more instances) | For I/O (adds cost, no benefit) | On K8s/ECS (orchestrator does its job) |

**Streams & backpressure:** `write()` returning `false` means "internal buffer past `highWaterMark` — pause until `'drain'`". Ignore it and memory balloons. Use `pipeline()` (not `.pipe()`) — it propagates errors and destroys all streams on failure:

```js
import { pipeline } from "node:stream/promises";
await pipeline(
  s3.getObject(params).createReadStream(),
  zlib.createGunzip(),
  csvTransform,          // Transform stream — constant memory at any file size
  uploadPassThroughToS3
);
```

**Memory leak diagnosis (prod-safe order):** 1) confirm with metrics (`process.memoryUsage().heapUsed` trending up across GCs); 2) attach `--inspect` / take heap snapshots (2–3, minutes apart) via Chrome DevTools or `v8.writeHeapSnapshot()`; 3) diff snapshots — sort by retained size; usual suspects: **module-level caches with no eviction, event listeners never removed, closures held by timers, unbounded arrays (logs/metrics buffers)**; 4) fix, replay under `autocannon` load, verify flat heap.

**Profiling toolchain:** `node --cpu-prof` or `clinic flame` → flamegraph for hot functions; `perf_hooks.monitorEventLoopDelay()` for loop lag (alert if p99 > ~100ms); `autocannon` for load; X-Ray/OpenTelemetry for cross-service latency.

**Graceful shutdown (fleet standard I'd enforce as lead):**

```js
process.on("SIGTERM", async () => {
  server.close();                 // stop new connections; LB/readiness already failing
  sqsConsumer.stop();             // stop pulling new messages
  await inFlight.drain({ timeout: 25_000 });  // < orchestrator's grace period
  await Promise.allSettled([db.end(), redis.quit(), logger.flush()]);
  process.exit(0);
});
```

**Error-handling strategy across a service fleet (the lead answer):** classify **operational** (retryable: timeouts, 5xx deps) vs **programmer** (bug: crash fast, restart). One shared error middleware/Nest exception filter → uniform error envelope + correlation ID. Retries with exponential backoff **+ jitter**, only on idempotent ops. Async paths: DLQs + redrive + alarm on DLQ depth. `unhandledRejection`/`uncaughtException`: log, flush, `exit(1)` — never limp on.

**Security (OWASP-for-Node checklist):** schema validation at the edge (zod/joi — reject, don't sanitize); `helmet` headers; rate limiting (API GW throttling / `rate-limiter-flexible` on Redis); short-TTL JWTs + refresh rotation; parameterized queries only; secrets in SSM/Secrets Manager (never env-committed); `npm audit`/Snyk in CI; lockfile pinning; SSRF-guard any URL-fetching feature.

### 4.2 Fifteen rapid-fire Q&A

| # | Question | Lead answer (2–4 lines) |
|---|---|---|
| 1 | Walk me through the event loop phases. | Timers → pending → idle/prepare → poll → check → close. Microtasks (`nextTick` first, then promises) drain after **every callback**, not per phase. Poll blocks waiting for I/O when idle. **→ Story hook:** used this to explain a Lambda latency spike at EY — a promise-heavy loop starving the poll phase. |
| 2 | `process.nextTick` vs `setImmediate` vs `setTimeout(0)`? | nextTick: before any other microtask — recursion starves I/O. setImmediate: check phase, after poll — the safe "yield". setTimeout(0): timers phase, ≥1ms effective. **→ Story hook:** replaced a recursive nextTick batching hack with setImmediate at Vkonnect to stop socket timeouts. |
| 3 | What uses the libuv threadpool? | fs, crypto.pbkdf2/scrypt, zlib, dns.lookup — **not** network I/O (epoll). Default 4 threads; raise `UV_THREADPOOL_SIZE` if fs/crypto-heavy. **→ Story hook:** tuned it at Vkonnect where bcrypt logins queued behind file ops. |
| 4 | Cluster vs worker_threads vs PM2 — when each? | Cluster: multi-core HTTP on VMs. worker_threads: CPU-bound tasks, shared memory. PM2: ops wrapper (reloads/restarts) on bare VMs; redundant on ECS/K8s/Lambda. **→ Story hook:** at UTEC we needed none — Lambda scales per-request; that was the point of going serverless. |
| 5 | Explain backpressure and how you handle it. | Producer faster than consumer → buffer growth. `write()===false` → wait for `drain`; in practice use `pipeline()` which manages it and error-propagates. **→ Story hook:** UTEC report exports stream S3→transform→S3 at constant memory for any size. |
| 6 | Prod service leaks memory — your exact process? | Metrics confirm trend → heap snapshots via `--inspect` (2–3 spaced) → diff retained size → usual suspects: unbounded caches, listeners, timer closures → fix, load-test, verify flat heap. **→ Story hook:** ran exactly this on an EY service — an in-memory prompt cache with no LRU eviction. |
| 7 | How do you detect event-loop blocking? | `monitorEventLoopDelay()` exported as a metric; alert p99 >100ms. Causes: sync crypto/fs, giant `JSON.parse`, catastrophic regex. Fix: stream, offload to workers, precompile/limit regex. **→ Story hook:** flagged a synchronous 30MB JSON parse in a UTEC batch import. |
| 8 | Design graceful shutdown for a fleet. | SIGTERM → fail readiness + `server.close()` → stop SQS polling → drain in-flight with timeout < orchestrator grace → close pools, flush logs, exit 0. Enforced as a shared bootstrap lib. **→ Story hook:** standardized this in EY's NestJS template so every service behaves identically on deploy. |
| 9 | Error-handling strategy across 10 services? | Operational vs programmer split; shared exception filter → uniform envelope + correlation ID; retries w/ backoff+jitter on idempotent ops only; DLQ + alarm for async; crash-and-restart on programmer errors. **→ Story hook:** my module's error envelope became the EY team convention after a debugging war story. |
| 10 | `uncaughtException` — recover or die? | Die. Process state is unknowable; log, flush, exit(1), orchestrator restarts. `unhandledRejection` same policy in modern Node. Recovering is how you get corrupted state at 2 a.m. **→ Story hook:** VAPT reviewers at UTEC specifically checked our crash-recovery posture. |
| 11 | Secure a public Node API — top 5 moves? | Edge validation (zod), helmet, rate limiting (API GW/Redis), short-TTL JWT + rotation, secrets in SSM + dependency scanning in CI. **→ Story hook:** closed UltraTech's VAPT findings — the audit report is my checklist since. |
| 12 | How do you profile a slow endpoint? | Reproduce under autocannon → X-Ray to isolate the hop → `--cpu-prof` flamegraph if compute → EXPLAIN if DB → fix, re-benchmark, record numbers in the PR. **→ Story hook:** this loop cut a P&G Olay API's p95 during the Shopify migration. |
| 13 | Streams vs buffers for a 2GB export? | Never `readFile`. Stream source→transform→S3 multipart via `pipeline()`; constant memory, backpressure-safe, abort-safe. **→ Story hook:** UTEC data exports. |
| 14 | What's AsyncLocalStorage good for? | Request-scoped context (correlation ID, user, tenant) available in any log/call without threading params through every function — foundation of fleet-wide traceability. **→ Story hook:** wired into EY's logging interceptor; every log line carries request ID. |
| 15 | Express vs NestJS for a team of 6 — as a lead? | NestJS: enforced structure survives team rotation, DI = testability, decorators standardize validation. Express: thin Lambdas, tiny services. The lead reason is **consistency**, not features. **→ Story hook:** EY runs NestJS; new joiners ship week one because every module looks the same. |

---

## 5. React — LEAD Level [HIGH]

### 5.1 Depth notes

**Feature-slice structure (what I'd enforce):**

```
src/
  features/claims/        # everything colocated
    api/  components/  hooks/  types.ts  index.ts   # index.ts = ONLY public API
  shared/ui/              # design-system components
  shared/lib/             # cross-cutting utils
  app/                    # routing, providers, layout
```
Rule: features import from other features **only via their `index.ts`** — ESLint-enforced. That's what keeps 6 devs from creating a dependency hairball.

**State management decision table (recite this, it's a guaranteed question):**

| Tool | Use when | Avoid when |
|---|---|---|
| **React Query / server state** | Anything fetched — cache, retry, invalidation solved | Never for pure client state |
| Context | Low-frequency globals: theme, auth, locale | High-frequency updates (re-renders whole subtree) |
| Zustand | Modest client state, minimal ceremony | Team needs strict conventions/devtools discipline |
| Redux Toolkit | Complex client-side domain logic, time-travel debugging, large teams needing one enforced pattern | CRUD apps where React Query already removed 80% of the need |

Lead line: *"Most Redux in the wild is mis-homed server state. Separate the two first; the remaining client state is usually small enough for Zustand or Context."*

**Rendering performance:** measure with React DevTools Profiler **before** memoizing. Strategy: `memo` at expensive subtree boundaries with stable props; `useMemo`/`useCallback` only to preserve referential equality for those boundaries; virtualize any list >~200 rows (`react-window`); kill inline object/array props on hot paths. Blanket-memoizing everything adds comparison cost and noise.

**Code splitting:** route-level `React.lazy` + `Suspense` first (biggest win, zero risk), then component-level for heavy widgets (charts, editors, PDF). Verify with bundle analyzer in CI — set a budget, fail the build on regression.

**Micro-frontends:**

| Use when | Don't use when |
|---|---|
| Multiple **independent teams** with separate deploy cadences share one shell | One team of 4–8 (that's a Coforge account team!) — the complexity tax (shared deps, versioning, contract testing) buys nothing |
| Gradual strangler migration of a legacy monolith UI | "It sounds modern" |

Lead line: *"Micro-frontends solve an org problem, not a tech problem. For a single account team I'd pick a well-modularized monorepo SPA every time."*

**Testing strategy (Cigniti-owner Coforge will care):** trophy shape — most value in **RTL integration tests** (user-visible behavior, MSW-mocked APIs), a thin Playwright E2E layer for critical journeys (login → book → pay), plain unit tests for pure logic. Snapshot tests: only for design-system primitives, if at all.

**SSR/Next.js:** yes for SEO/marketing/first-paint-critical commerce; no for authenticated internal dashboards (SPA + CDN is simpler and cheaper). Know the vocabulary: RSC, streaming, ISR — and the ops cost: you now run/scale a Node render tier.

### 5.2 Twelve rapid-fire Q&A

| # | Question | Lead answer |
|---|---|---|
| 1 | How do you structure a 40-screen React app for a team? | Feature-slice, colocation, public-API-only imports enforced by ESLint. Structure is a *team-scaling* tool, not aesthetics. **→ Story hook:** UTEC's dashboard modules were split this way so parallel workstreams never collided. |
| 2 | Context vs Redux vs Zustand vs React Query? | First split server vs client state — React Query owns server state; then Context for low-frequency globals, Zustand for light client state, RTK only for genuinely complex client domains. **→ Story hook:** on Vkonnect, moving fetch state into query caching deleted a third of our Redux code. |
| 3 | When does `memo` make things worse? | Unstable props (inline objects/functions) = compare cost + re-render anyway; trivial components = overhead > savings. Profile first, memoize boundaries. **→ Story hook:** profiling UTEC's dealer list showed 2 memo boundaries beat the 40 we almost added. |
| 4 | 10k-row table is janky — fix? | Virtualize (react-window), stable keys, extract row to memoized component with primitive props, debounce filter input, paginate server-side if data transfer is the real cost. **→ Story hook:** UTEC contractor ledger — virtualization took it from unusable to 60fps. |
| 5 | Code-splitting strategy? | Route-level lazy+Suspense first, heavy widgets second, bundle-analyzer budget in CI so it can't regress. **→ Story hook:** Olay storefront — splitting the review/media widgets off the PDP protected first paint during the Shopify migration. |
| 6 | Micro-frontends — would you use them here? | Only for multiple independent teams on one shell or strangler UI migrations. For a 4–8 account team: modular SPA monorepo. Org problem, not tech problem. **→ Story hook:** evaluated and *rejected* MFEs at EY for exactly this reason — one team, one cadence. |
| 7 | How do you run a design system for an account? | Tokens (color/space/type) → headless primitives → documented in Storybook → versioned package; Storybook doubles as the client demo surface. **→ Story hook:** shared UI kit at UTEC kept 3 parallel modules visually identical without meetings. |
| 8 | Your React testing pyramid? | Mostly RTL integration (user behavior + MSW), thin Playwright E2E on money paths, unit for pure logic. Test behavior, not implementation — refactors shouldn't break tests. **→ Story hook:** this let us re-platform Olay's checkout wiring with tests green throughout. |
| 9 | SSR/Next — when is it the wrong call? | Authenticated dashboards: no SEO need, adds a render tier to run and scale. Right call: commerce/marketing where first paint & SEO are revenue. **→ Story hook:** Olay (commerce) = SSR storefront; UTEC (logged-in SaaS) = SPA + CloudFront. Same stack, opposite decisions — that's the tradeoff. |
| 10 | Forms at scale — approach? | react-hook-form (uncontrolled = no per-keystroke re-render) + zod schema shared with the backend for one source of validation truth. **→ Story hook:** Vkonnect patient-intake forms — shared zod schemas killed the "frontend allows, backend rejects" class of bugs. |
| 11 | Error handling in the React tier? | Error boundaries per route/feature with meaningful fallbacks, React Query retry/error states for fetches, frontend errors shipped to monitoring with release tags — the UI is part of observability. **→ Story hook:** EY Risk.ai chat UI — boundary isolation kept one failing panel from killing the session. |
| 12 | How do you keep quality consistent across 6 React devs? | CI gates (strict TS, ESLint incl. import rules, test threshold), PR checklist, Storybook as component contract, ADRs for pattern changes — review the *pattern* once, not every PR forever. **→ Story hook:** my EY review checklist cut repeat comments; juniors self-correct before PR. |

---

## 6. Microservices & System Design [HIGH — explicitly asked at Coforge]

### 6.1 Pattern judgment table (WHEN beats WHAT at lead level)

| Pattern | Use when | NOT when / cost |
|---|---|---|
| **API Gateway** | Single entry: authN, throttling, routing, WAF | Business logic creeps into it → distributed monolith at the front door |
| **BFF** | Web vs mobile need different shapes/auth | One client type — needless hop |
| **Saga — choreography** | 2–3 services, simple happy path (events only) | Flow becomes invisible; debugging = archaeology |
| **Saga — orchestration** | 4+ steps, compensations, SLAs, visibility needed (Step Functions) | Orchestrator = coupling point; keep it *flow-only*, no business rules |
| **Circuit breaker** | Protect callers from a flaky downstream; fail fast + fallback | Internal reliable calls — added complexity for nothing |
| **CQRS** | Read/write shapes & scale genuinely diverge (write Dynamo → read OpenSearch) | Symmetric CRUD — two models to maintain for zero gain |
| **Event sourcing** | Audit-critical domains where the event *is* the record (claims history, payments ledger) | **Usually NOT**: replay complexity, versioning pain, team unfamiliarity. Default: CRUD + outbox events + audit table |
| **Outbox pattern** | Need "DB write + event publish" atomically — write event to outbox table in same txn, relay publishes | You accepted dual-write risk consciously (rarely OK) |
| **Idempotency** | Always, at every retryable boundary: client-supplied key, store result, replay returns stored response | Never skip — retries + at-least-once delivery are facts of life |
| **DB-per-service** | True autonomy: schema changes and scaling don't ripple | Shared reporting need → solve with events into a warehouse, NOT a shared DB |
| **Distributed tracing** | >2 services, always (X-Ray/OTel, correlation IDs from edge) | — |
| **Strangler fig** | Modernizing a client's legacy system incrementally behind a facade | Big-bang rewrite is being seriously considered — that's the anti-pattern |

**Coforge framing:** as a services Tech Lead, patterns are also **client conversations**. "Event sourcing" isn't a tech choice — it's "are you willing to pay 2x delivery time for perfect replay-ability? Usually an audit table is what you actually need."

### 6.2 SQS vs SNS vs EventBridge vs Kafka (your experience vs the market)

| | SQS | SNS | EventBridge | Kafka |
|---|---|---|---|---|
| Model | Queue (pull, 1 consumer group) | Pub/sub fanout (push) | Event **bus** + content-based rules, schema registry | Distributed **log**, replayable, partitioned |
| Ordering | FIFO variant (300–3k msg/s) | No | No | Per-partition, strong |
| Replay | No (msg gone after ack) | No | Archive+replay (limited) | **Yes — core feature**, retention-based |
| Best for | Decouple + buffer work, DLQs | Fanout one event to N | Cross-service/SaaS routing, low ops | Streams, high throughput, multiple independent readers, event sourcing |
| Ops | Zero | Zero | Zero | Heavy (or MSK/Confluent $$) |

**Interview line:** *"I default to SQS+SNS/EventBridge on AWS — zero-ops and fits serverless. I'd reach for Kafka when I need replayable history, strict ordering at scale, or many independent consumers reading the same stream at their own pace — a claims audit stream or clickstream analytics. The concepts map directly: consumer groups ≈ queue subscriptions, partitions ≈ ordered shards, offsets ≈ checkpoints."*

### 6.3 Design walkthrough (a) — Insurance claims processing [Coforge vertical — most likely ask]

**15-min narration skeleton (practice on a timer):**

**Business frame (30s):** "Claims is where an insurer wins or loses the customer. Goals: maximize straight-through processing (STP) so simple claims pay in hours not weeks, keep adjusters for genuinely complex cases, and keep a bulletproof audit trail for regulators."

**Clarify (1 min):** Lines of business (motor/health/property)? Channels (app, portal, call center, broker)? STP target %? Legacy policy-admin system to integrate (there usually is — Duck Creek/Guidewire/mainframe)? Volumes (assume 50k claims/day, 10x CAT-event spikes).

**Architecture (draw this):**

```
 App/Portal/CallCenter/Broker
        │
   API Gateway (authN, throttle, idempotency-key)
        │
   FNOL Service ──► S3 (docs/photos) ──► Textract/AI extraction ──► doc-metadata
        │  (validate against Policy Service; persist; outbox)
        ▼
   EventBridge  ──"ClaimRegistered"──►
        │
   Step Functions ORCHESTRATED SAGA per claim:
     1. Coverage check      (Policy Service — often adapter to legacy admin system)
     2. Fraud scoring       (rules + ML/GenAI service; score → route)
     3. Adjudication        (rules engine: auto-approve under threshold ⇒ STP path)
     4a. STP ⇒ Payment Service (idempotent payout, PSP webhook reconcile)
     4b. Manual ⇒ Adjuster Workbench queue (SQS, priority by SLA)
     5. Notify (SNS → email/SMS/push)  +  SLA timers (EventBridge scheduled rules)
        │
   Every state change → append-only claim_events table (audit) → OpenSearch (adjuster search, ops dashboards)
```

**Deep-dive picks (pull 2):**
- **Idempotency:** FNOL submissions retry from flaky mobile networks — client idempotency key at API GW + conditional write; duplicate returns original claim ID. Payment step doubly idempotent (never pay twice).
- **Why orchestration not choreography:** claims = long-running (days), compensations (reverse a payout hold), SLA timers, and the business *demands* "where is claim X stuck?" — Step Functions gives an inspectable state machine.
- **Failure modes:** legacy policy system down → circuit breaker + queue claims in "pending-verification", degrade gracefully, never lose FNOL. Fraud model down → fall back to rules-only, flag for retro-scan.
- **Audit:** append-only event log per claim satisfies regulators without full event-sourcing complexity — CQRS-lite: writes normalized, reads projected to OpenSearch.

**Client-panel one-liner:** "The design goal is: simple claims pay out same-day untouched by humans, complex ones reach the right adjuster with everything attached, and every state change is auditable."

### 6.4 Design walkthrough (b) — Travel booking (inventory + payments)

**Business frame (30s):** "Search is high-volume and cache-friendly; booking is low-volume and correctness-critical. The architecture splits those two worlds — and the hard problem is holding inventory while a human decides and a payment settles."

**Clarify (1 min):** Direct inventory or GDS/NDC aggregation (Sabre!)? Hold duration? Overbooking policy (business decision, not tech)? Peak: fare-sale spikes 20x.

```
  Search path (read-heavy, eventually consistent):
    Client → API GW → Search Service → Redis/Dynamo cache (short TTL) → GDS/NDC adapters (rate-limited, circuit-broken)

  Booking path (write, strongly consistent):
    Client → API GW (Idempotency-Key) → Booking Orchestrator (Step Functions saga):
      1. HOLD inventory   (Inventory svc: conditional write + TTL, e.g. 15 min — auto-release on expiry)
      2. AUTH payment     (PSP; 3-DS redirect; webhook + poll reconcile — webhooks WILL arrive late/dup)
      3. ISSUE ticket/PNR (supplier confirm)
      4. CONFIRM → capture payment; else COMPENSATE: void auth, release hold
    Events → EventBridge → notifications, loyalty, analytics consumers
```

**Deep-dive picks:**
- **Hold with TTL** beats locking: DynamoDB conditional update `available>0` decrements + hold record with TTL; expiry event releases. No distributed locks, no leaked seats.
- **Payment truth:** the PSP webhook is the source of truth, arrives at-least-once and out of order → idempotent handler keyed on payment-intent ID + state machine tolerates "capture confirm before auth confirm".
- **Saga compensation demo:** ticket issuance fails after capture → automated refund + hold release + alert; customer sees "payment reversed", not silence.
- **Search scale:** cache-aside with 30–120s TTL, request coalescing so one cache miss triggers one upstream call during fare-sale stampedes.

### 6.5 Design walkthrough (c) — UTEC retold as a design-interview answer [your signature story]

Tell it as if you were *given* the problem, then reveal it shipped:

**Business frame:** "UltraTech needed a contractor/dealer engagement platform — target ~6M users, campaign-driven traffic (10–50x spikes on launch days), enterprise security review (VAPT), and a small team — so ops overhead had to be near zero."

**Requirements → decisions:**

| Requirement | Decision | Tradeoff owned |
|---|---|---|
| Spiky traffic, small team | **Serverless**: API GW + Lambda | Cold starts → provisioned concurrency on the 3 hot APIs only (cost-targeted) |
| Key-value heavy access, scale | DynamoDB, single-table for hot paths | Modeled access patterns up front; complex ad-hoc queries → offloaded to OpenSearch |
| Search/dashboards | DynamoDB Streams → OpenSearch projections | Eventual consistency accepted & stated to client |
| Decoupling & spikes | SQS between intake and processing + DLQs | At-least-once → every consumer idempotent |
| Media at scale | S3 + CloudFront, presigned uploads | — |
| Enterprise security | VAPT-driven hardening: WAF, rate limits, JWT rotation, secrets in SSM, least-priv IAM | Closed findings directly with client's security team |
| Repeatability | **CloudFormation IaC** for every environment | Dev/UAT/prod identical; env spin-up in hours |

**Results line:** "~6M users, campaign spikes absorbed without capacity planning meetings, infra cost scaled with usage, VAPT cleared. The retrospective lesson I carry: model DynamoDB access patterns *before* committing — we paid one painful mid-flight remodel on a module that outgrew its keys."

*(Ending on a self-critical lesson = lead maturity signal. Always include it.)*

---

## 7. Database & API Design [MED]

### PostgreSQL at lead level

| Topic | The answer that lands |
|---|---|
| Indexing strategy | B-tree default; **composite index column order = equality cols first, then range** (`WHERE tenant_id=? AND created_at>?` → `(tenant_id, created_at)`); partial indexes for hot subsets (`WHERE status='PENDING'`); covering (`INCLUDE`) to enable index-only scans. Every index taxes writes — indexes are designed from query logs, not guessed. |
| Query plans | `EXPLAIN (ANALYZE, BUFFERS)`: red flags = Seq Scan on big tables, row-estimate vs actual off by 100x (stale stats → `ANALYZE`), nested-loop on huge sets, sort spilling to disk. |
| N+1 | ORM lazy-loading in a loop. Fix: eager join/`IN` batch, or DataLoader in GraphQL. Detect via query-count-per-request metric in dev. **→ Story hook:** Olay GraphQL resolvers used DataLoader batching from day one. |
| Transactions/isolation | Postgres default **Read Committed**; Repeatable Read for consistent multi-read logic (retry on serialization failure); Serializable rarely — retry-loop cost. Money movement: `SELECT … FOR UPDATE` + short transactions, or make ops idempotent instead. |
| Pooling under Lambda | Classic pool per container × 1000 concurrent Lambdas = connection exhaustion. Answer: **RDS Proxy** (or pgbouncer), pool size 1–2 per container, and honest alternative: if access is key-value, this pain is a hint DynamoDB fit better. |

### MongoDB schema tradeoffs (one paragraph you can say aloud)

Embed when data is read together and bounded (order + line items); reference when unbounded growth or independently accessed (user ↔ activity log); bucket pattern for time-series (Vkonnect vitals: one doc per patient-day, not per reading). Design from access patterns; the 16MB doc limit is the guardrail that tells you an embed decision was wrong. **→ Story hook:** Vkonnect consult records embedded prescription snapshots — immutability by copy, deliberately denormalized.

### API design

| Topic | Lead position |
|---|---|
| Versioning | URI (`/v2/`) for external clients — cache/gateway-friendly and explicit; additive-only changes within a version; deprecation = comms plan + sunset headers, because clients are *contracts* in services work. |
| Pagination | **Cursor-based** (opaque token from sort key) for anything that grows — offset skews under insertion and O(n)-scans deep pages. Offset acceptable for small admin tables. |
| Idempotency keys | Client sends `Idempotency-Key` on POSTs; server stores key→result (TTL'd); replay returns stored result with a replay header. Non-negotiable for payments/claims/bookings. |
| Webhook design | Sign payloads (HMAC + timestamp to kill replays), deliver at-least-once with backoff, expect consumer idempotency, provide redelivery UI. As a *consumer*: verify sig, enqueue fast-ACK, process async. **→ Story hook:** Shopify webhooks on Olay — dedupe by event ID after learning they re-deliver. |
| GraphQL vs REST | GraphQL when clients are many/varied and over/under-fetching is real (storefronts, aggregation BFFs); costs: caching complexity, query-depth limiting, N+1 discipline. REST for service-to-service and simple resources. **→ Story hook:** Olay was *the* GraphQL case — one storefront API shaped per surface, replacing chatty BigCommerce REST calls; product page went from ~6 round-trips to 1. |

---

## 8. AWS & DevOps [MED]

| Topic | Lead answer |
|---|---|
| Cold starts | Init phase (runtime + deps + handler init) hits first/scaled requests. Mitigate: small bundles (esbuild, no fat SDK imports), init outside handler, **provisioned concurrency only on latency-critical hot paths** (it costs — targeted, not blanket). **→ Story hook:** UTEC — PC on 3 user-facing functions, batch paths eat the cold start. |
| ECS vs Lambda framework | Lambda: spiky/event-driven, <15 min, per-request billing wins at low-mid volume, zero ops. ECS/Fargate: long-lived (websockets, Kafka consumers), steady high traffic (cheaper at sustained load), >15 min jobs, custom runtimes. Say it as a *cost-and-team* decision, not fashion. |
| CloudFormation (mine) vs Terraform | CFN: native, drift detection, rollback-on-fail stacks; SAM/CDK sugar. Terraform: multi-cloud, plan preview, module ecosystem, state file to manage. Concepts are 1:1 (stack≈state, template≈config, changeset≈plan) — "I'm fluent in IaC thinking; the dialect is a week's switch." |
| CI/CD design | Trunk-based + short branches → PR gates (lint, types, unit/integration, `npm audit`, SAST) → build once, promote same artifact dev→UAT→prod → IaC deploys the env → smoke tests → auto-rollback on alarm. For clients: UAT gate + change-record automation (services reality). |
| Observability | Three pillars wired to correlation IDs from the edge: structured JSON logs (CloudWatch Insights-queryable), metrics + alarms on **symptoms** (p99, error rate, DLQ depth, Lambda throttles), X-Ray traces across API GW→Lambda→Dynamo/SQS. Dashboards per service; alarm = runbook link. |
| Cost stories | (1) UTEC: serverless meant cost tracked usage — campaign spikes didn't require pre-provisioning; (2) right-sized Lambda memory via power-tuning (memory↑ can *lower* cost via duration↓); (3) Vkonnect EC2→Lambda migration killed idle-server spend for a bursty telemedicine workload; (4) S3 lifecycle → IA/Glacier for media archives. |
| Blue-green vs canary | Blue-green: two environments, instant cutover + instant rollback — fits big-bang releases and DB-compatible schema changes. Canary: shift 5→50→100% watching alarms (CodeDeploy does this natively for **Lambda aliases**) — catches real-traffic bugs cheaply. Default: canary for services, blue-green for the rare risky platform cut. |

---

## 9. DSA Warm-Up [MED — services companies ask easy-medium; keep light]

*All in JavaScript. Name → pattern → 3-line approach. Re-solve 1–10 by hand before R1.*

| # | Problem | Pattern | Approach |
|---|---|---|---|
| 1 | Two Sum | Hashmap | One pass; store `need = target−x` seen so far; return when current x in map. O(n). |
| 2 | Valid Anagram | Hashmap/count | 26-slot count array: +1 for s, −1 for t; all zeros = anagram. |
| 3 | Group Anagrams | Hashmap key | Key = sorted word (or char-count string); map key→list. |
| 4 | Longest Substring w/o Repeating | Sliding window | Window + last-seen index map; on repeat jump left pointer past previous occurrence; track max. |
| 5 | Maximum Subarray | Kadane | Running sum; reset to current when sum < current; track best. |
| 6 | Merge Intervals | Sort + sweep | Sort by start; extend last merged if `start ≤ lastEnd`, else push new. |
| 7 | Product of Array Except Self | Prefix/suffix | Left-products pass, then right-running multiplier in reverse pass. No division. |
| 8 | 3Sum | Sort + two-pointer | Sort; fix i; two-pointer the rest for −nums[i]; skip duplicates at all three positions. |
| 9 | Container With Most Water | Two-pointer | Pointers at ends; compute area; move the shorter line inward. |
| 10 | Valid Parentheses | Stack | Push openers; on closer, top must match; empty stack at end. |
| 11 | Min Stack | Aux stack | Second stack tracks min-so-far; push/pop in lockstep. |
| 12 | Best Time to Buy/Sell Stock | One pass | Track min price so far; best = max(best, price−min). |
| 13 | First/Last Position in Sorted Array | Binary search ×2 | Two binary searches: leftmost ≥ target, rightmost ≤ target. |
| 14 | Reverse Linked List | Pointer flip | `prev/curr/next` walk; classic — write it cold. |
| 15 | Linked List Cycle | Floyd | Slow/fast pointers; meet ⇒ cycle. |
| 16 | LRU Cache | Map + order | JS `Map` keeps insertion order: on get/set, delete+re-set key; evict `map.keys().next().value`. |
| 17 | Binary Tree Level Order | BFS | Queue; per level, drain current size into one row. |
| 18 | Validate BST | DFS bounds | Recurse with (min,max) bounds; node must sit strictly inside; pass down narrowed bounds. |
| 19 | Number of Islands | Grid BFS/DFS | Scan; on '1', flood-fill neighbors to '0', count++. |
| 20 | Implement debounce & throttle | JS closures | Debounce: clear+set timer each call. Throttle: run if `now−last ≥ wait`. **Asked constantly in JS interviews — write both cold.** |

---

## 10. Leadership & Delivery Scenarios [HIGH — the managerial round IS this section]

*STAR drafts on your real stories. **Before the interview: replace bracketed metrics with your true numbers** — never quote a number you can't defend.*

| Scenario | STAR draft (compress to ~90 sec spoken) |
|---|---|
| **Missed deadline** | **S:** UTEC campaign-linked release; a dependent module (payments/integration) slipped and my module's date was at risk. **T:** Protect the client's campaign date. **A:** Flagged risk in writing the day I saw it (not the day it hit), re-cut scope with the client into must-have vs fast-follow, re-sequenced so unblocked work continued, added a daily 15-min sync until green. **R:** Campaign launched on date with core scope; fast-follow shipped [X days] later. **Learning:** dates slip silently — my rule is *escalate at risk-detection, not at failure*. |
| **Underperforming teammate** | **S:** Junior at EY repeatedly missing sprint commitments, PRs needing heavy rework. **T:** Fix throughput without breaking the person. **A:** Private 1:1 → root cause was task-breakdown skill, not effort; started co-writing subtasks at sprint planning, daily 10-min checkpoint for two sprints, paired on one gnarly PR, publicly credited their next win. **R:** Within [2] sprints, on-time and PRs approved in ≤2 passes; they now mentor the next junior. **Learning:** diagnose before prescribing — most "attitude" problems are skill or clarity problems. |
| **Disagreeing with architect/client** | **S:** EY Risk.ai re-architecture — senior stakeholder favored extending the monolithic prompt pipeline; I believed an agentic decomposition (LangGraph) was needed for GPT-5.1. **T:** Change the decision without a turf war. **A:** Built a 2-week spike with eval numbers on real cases, presented both options with *their* criteria (quality, cost, migration risk), conceded a real con of my approach (orchestration complexity), let data decide. **R:** Agentic design adopted; [~20%] response-quality improvement post-migration. **Learning:** disagree with prototypes and numbers, not adjectives — and give the other side an honest ledger. |
| **Production incident ownership** | **S:** Vkonnect telemedicine — consultation booking failures spiked during evening peak [after a deploy]. **T:** Restore service, then make it not recur. **A:** Declared the incident, communicated status to stakeholders in plain language on a cadence, rolled back first (mitigate > diagnose), traced root cause [connection pool exhaustion under peak], wrote the blameless postmortem, shipped fixes: alerting on the leading metric + load test in the pipeline. **R:** Restored in [~40 min]; zero recurrence. **Learning:** in incidents the lead's #1 output is *calm and communication* — engineers debug better when someone else owns the noise. |
| **Estimation gone wrong** | **S:** Olay BigCommerce→Shopify migration — I under-estimated data/catalog migration edge cases [multi-variant products, redirects]. **T:** Recover the plan and client trust. **A:** Owned it explicitly to the client with a revised, evidence-based re-estimate (spike-first), split remaining work into fixed-scope drops so the client saw weekly value, added buffer policy for integration unknowns. **R:** Migration completed [with revised plan met]; client relationship intact — because the *revised* estimate held. **Learning:** the first estimate is a hypothesis; my rule now — unknown integrations get a time-boxed spike before a committed number. |
| **Mentoring a junior to independence** | **S:** EY junior strong on code, weak on design confidence. **T:** Grow them to independent module ownership. **A:** Progressive ownership ladder: pair-design → they design/I review → they own with ADR sign-off; made them present their design at the team review; deliberate "productive struggle" windows before I'd answer. **R:** They now own [a module] end-to-end and run its client demo. **Learning:** mentoring is transferring *judgment*, not answers — the ADR review is where judgment gets taught. |
| **Pushing back on scope creep** | **S:** Client kept adding "small" asks mid-sprint on UTEC [new dashboard widgets during a committed release]. **T:** Protect the committed date without saying a raw "no". **A:** Made cost visible: maintained a change-log with size estimates, offered the trade every time ("we can take widget A if report B moves out"), routed >1-day asks to the change-request process, kept PM aligned so we spoke with one voice. **R:** Sprint commitments held [3/3 releases on date]; client *adopted* the trade-off ritual themselves. **Learning:** never argue scope — price it and offer trades. Clients respect a menu more than a no. |
| **Client escalation** | **S:** UTEC VAPT report landed with findings flagged to client leadership as release-blocking. **T:** Turn a red flag into confidence. **A:** Responded within a day with a severity-triaged remediation plan (fix-now vs scheduled vs risk-accepted-with-signoff), gave twice-weekly written status, walked the client's security team through fixes live, closed with a re-test report. **R:** All blocking findings closed [on plan]; the security review became a *reference point* the client cited in the next phase. **Learning:** escalations are won with structure and cadence — panic is contagious, so is calm. |

### Code review philosophy (say in ~45 sec)

> "Reviews are a quality gate *and* a teaching channel, so I keep them fast and layered: automation (lint, types, tests, security scan) handles style so humans never argue about commas. I review in order: correctness & edge cases → design fit & blast radius → readability. Comments are labeled blocking vs suggestion; more than N rounds of back-and-forth means we jump on a 10-min call. And the goal is that my checklist migrates into the team's heads — I measure success by my comments getting rarer."

### Sprint estimation approach (say in ~45 sec)

> "Team-based relative sizing — planning poker on story points, because the conversation when estimates diverge is the real value. Anything with an unknown integration gets a time-boxed **spike** before a committed number — that rule came from a real miss on a migration project. I track velocity over 3+ sprints for forecasting, keep a visible buffer for services realities (client clarifications, UAT churn), and re-baseline openly with the client when scope moves — estimates are commitments in delivery work, so they're maintained, not archived."

### First 30 days as a new Coforge Tech Lead

| Week | Focus | Concrete outputs |
|---|---|---|
| 1 | **Listen & map** | 1:1s with every team member + PM + client counterpart; read the SOW/backlog; map architecture & environments; identify the top 3 delivery risks. Ship one small thing myself to feel the pipeline. |
| 2 | **Baseline quality & flow** | Review CI/CD, test coverage, alerting, runbooks; sit in every ceremony without changing them yet; start a decision log (ADRs); triage tech debt into a visible, priced list. |
| 3 | **Fix the highest-leverage gap** | Pick ONE improvement (usually observability or PR/CI gates) and land it with the team, not on them; agree estimation & escalation norms; align with client on comms cadence. |
| 4 | **Commit & communicate** | Present a 90-day plan to delivery manager + client: risks, quality baseline, improvement roadmap, team growth plan (who's mentored toward what). By day 30 the client should know exactly who owns their delivery. |

---

## 11. The AI Differentiator [HIGH — this is what makes you memorable]

**Context to name-drop:** Coforge is selling AI hard — the Sabre deal is AI-flavored, and **Quasar** is their in-house AI platform. A Tech Lead who has *shipped* agentic AI is a billable asset beyond one project.

### 3 weaponized talking points

1. **"I've done the migration your clients are scared of."** At EY I re-architected Risk.ai from a GPT-4 pipeline to a GPT-5.1 **agentic architecture** — LangGraph orchestration, RAG grounding, MCP tool integration — in a risk domain where wrong answers have consequences. That's exactly the "we have a POC, make it production" gap most enterprises are stuck in, and where Coforge bills.
2. **"I can stand in a pre-sales room, not just a sprint room."** I can demo agentic patterns, scope a RAG build honestly (including where it will disappoint), and translate eval metrics into business language — useful to Coforge in BFSI/insurance pitches where clients ask "can you actually build this?" and a delivery person with prod-AI scars is the credible answer. Claims automation, underwriting assistance, policy-document RAG — I can whiteboard each today.
3. **"I know where AI breaks, which is what clients pay for."** Hallucination containment via grounding + eval suites, cost control (model routing, caching, context budgets), data-boundary and compliance concerns for regulated clients. Selling AI is easy; *delivering it with an SLA* is the differentiator I bring.

### "How would you introduce AI-assisted development to your team responsibly?" (say in ~60 sec)

> "Three moves. First, **policy before tools**: agree what code AI may touch — fine for boilerplate, tests, migrations; human-owned for auth, payments, security-sensitive paths — and confirm the client's data policy, because pasting client code into unapproved tools is a contractual breach in our world. Second, **the review bar doesn't move**: AI-generated code enters through the same PR gates, and the author owns it exactly as if they typed it — 'the AI wrote it' is not a review response. Third, **measure, don't vibe**: pilot with 2 engineers for a sprint, look at cycle time and defect escape rate, then roll out with team norms. I've lived this at EY — the honest observation is juniors need *more* review coaching with AI, not less, because it produces plausible code faster than they can evaluate it."

---

## 12. Behavioral + Sensitive Framings

### Why leaving EY (~30 sec, exact words)

> "EY has been excellent — I've built production agentic AI there. Two reasons: first, the Lead role — at EY the work I do is lead-scope but the band structure means the title and team ownership are years out; Coforge is hiring for exactly the role I'm already performing. Second, I want my AI and serverless experience applied across client deliveries rather than one internal platform — that's a services strength. I'm moving *toward* a role, not away from a problem."

### Synechron 3-month tenure (Dec 2024–Mar 2025) — exact words, deliver calmly, then STOP talking

> "Short and honest: the role's actual work turned out to be quite different from what was scoped when I joined — [mismatch: e.g. legacy maintenance vs the modernization work discussed]. I judged that quickly, made a clean professional exit rather than coasting, and moved to EY where I've delivered exactly what I'm known for. One data point next to 5+ years of solid tenures — and it taught me to diligence a role's day-to-day, which is why my questions for you today are specific."

*Rules: never badmouth Synechron, never over-explain, don't raise it unprompted, bridge immediately to EY delivery. (Adjust the bracketed mismatch to your true reason — keep it about role-fit, not people.)*

### Why a services company (after product-ish roles)?

> "My best work has *been* services-shaped — iProgrammer was client delivery, EY is client-facing consulting. I genuinely like the rhythm: real clients, hard dates, visible outcomes, new domains every couple of years. And the Tech Lead role at a services firm is bigger than at a product firm at my stage — you own architecture *and* client trust *and* a team. Coforge's BFSI-insurance-travel mix is exactly where my claims/booking/serverless prep and AI experience compound."

### Salary script — anchoring 25 LPA

| They say | You say |
|---|---|
| "Current CTC?" | "I'd rather anchor on the role's value — my expectation is **25 LPA**, which is aligned with active offers in my pipeline. Happy to share current comp during documentation." *(If forced: state it honestly — BGV + payslips verify; never inflate. Then immediately re-anchor: "…and my expectation reflects the lead scope and market, not a % on current.")* |
| "That's above band." | "I understand bands. For context, I've **cleared Encora's technical round** and have other active processes — 25 is where my market is converging, not an aspiration. If the band truly caps below that, let's talk total structure — joining bonus, earlier review cycle — I'm flexible on shape, less on value." |
| "Is it negotiable?" | "I'm flexible for the right role — and this looks like the right role. My expectation is anchored at 25 based on live alternatives; I have modest room for a strong overall offer, and I bring an immediate join, which saves you 60–90 days of notice-period risk." |
| "Do you have an offer letter?" | Truth only: "Encora L1 is cleared and the process is progressing; others are active. I won't wave a letter I don't have — but the pipeline is real, and timing matters to me." *(Never bluff a written offer you don't hold — it's checkable and it torches trust.)* |

**Leverage stack (in order):** immediate joiner (rare, saves them notice-period risk) → live pipeline (Encora L1 cleared — true and verifiable) → scarce skill combo (Node/React lead + prod agentic AI) → calm flexibility on *structure*, firmness on *value*.

---

## 13. Questions to Ask (per round)

| Round | Ask |
|---|---|
| **Technical (R1)** | 1. "What does the current architecture look like for the account this role supports — and what's the biggest technical debt the team is carrying?" 2. "How much freedom does a Tech Lead here have on stack and design decisions versus client-mandated standards?" |
| **Client round (R2)** | 1. "What does success look like for this platform in the next 12 months from *your* side — and where does engineering most often fall short of that?" 2. "How involved is your team day-to-day — do you prefer working demos every sprint, or milestone-level checkpoints?" *(Domain-curious, partnership-signaling — exactly what a client wants in a lead.)* |
| **Managerial** | 1. "How is the team structured — seniority mix, and does the Tech Lead have input into staffing and appraisals?" 2. "How do delivery escalations flow here — what's the Tech Lead's authority to re-scope or re-sequence before it goes up the chain? And what's the on-call/prod-support model?" |
| **HR** | 1. "I'm an immediate joiner — if we move forward, what's the fastest realistic start date given BGV timelines?" 2. "What's the expected timeline for remaining rounds? I have other processes in late stages and want to prioritize Coforge properly." *(Politely starts the clock — pairs with §14 follow-up cadence.)* |

---

## 14. 5-Day Study Plan (2–3 hrs/day alongside EY)

| Day | Focus (priority order) | Do |
|---|---|---|
| **1** | System design + microservices [HIGH] | §6 pattern table until WHEN-to-use is reflexive; narrate claims design (§6.3) aloud on a 15-min timer twice; SQS/SNS/EventBridge/Kafka table cold. |
| **2** | Node lead-depth [HIGH] | §4 depth notes + all 15 rapid-fire aloud *with story hooks*; write graceful-shutdown and pipeline snippets from memory; rehearse memory-leak diagnosis as a spoken runbook. |
| **3** | Leadership + title-bridge [HIGH] | §2 scripts memorized (60-sec pitch ×3 aloud); all 8 STARs at ≤90 sec each; code review + estimation + 30-day answers; §12 sensitive framings word-for-word. |
| **4** | React + DSA [HIGH/MED] | §5 twelve rapid-fire + state-management table; solve DSA #1–10 in JS by hand, read #11–20 approaches; debounce/throttle from memory. |
| **5** | Full mock day | Morning: self-mock R1 (5 random Node + 3 React + 1 DSA, out loud). Evening: mock R2 — narrate travel booking (§6.4) + UTEC retell (§6.5) on timers; then §15 question bank, flag misses, patch. |

**Every day ends with these 10 active-recall questions (same 10 — repetition is the point):**
1. Event loop phases in order + where microtasks drain?
2. Choreography vs orchestration saga — when each?
3. My 60-second pitch — deliver it now, aloud.
4. Outbox pattern — what problem, what mechanics?
5. Why did UTEC go serverless, and what tradeoff did we pay?
6. Context vs Redux vs Zustand vs React Query — 4-line answer.
7. "Have you led a team?" — deliver the answer now.
8. SQS vs Kafka — 3 differences + when I'd pick Kafka.
9. Idempotency key flow for a payment POST?
10. Synechron framing — 3 sentences, calm, stop.

### HR follow-up cadence (Coforge is known-slow between rounds — you drive)

**Day 3 post-interview (WhatsApp/email, 2 lines):**
> "Hi [Name], thank you for organizing the [round] discussion on [date] — I enjoyed the conversation with the panel. Any update on feedback or next steps? As an immediate joiner with other processes in late stages, I'd love to keep Coforge my priority."

**Day 6 post-interview (2 lines, still warm, adds gentle urgency):**
> "Hi [Name], following up on the [round] from [date]. I want to be transparent — I'm in final stages elsewhere and Coforge remains my first preference; if the panel needs anything more from my side to conclude, I can make myself available same-day."

---

## 15. Active Recall Question Bank — 50 rapid-fire (answers live above; ordered by likelihood)

**Node.js (1–15)**
1. Walk through the event-loop phases and where microtasks run.
2. `process.nextTick` vs `setImmediate` — and which can starve I/O?
3. What operations use the libuv threadpool, and what's the default size?
4. Cluster vs worker_threads vs PM2 — when each, and why none on Lambda?
5. What is backpressure and how does `pipeline()` handle it?
6. Your step-by-step process for a production memory leak?
7. How do you detect and fix event-loop blocking?
8. Design graceful shutdown for a service fleet.
9. Operational vs programmer errors — and your fleet-wide handling strategy?
10. `uncaughtException` — recover or exit? Defend it.
11. Top 5 security controls on a public Node API.
12. How do you profile a slow endpoint end-to-end?
13. Why streams over buffers for large files?
14. What does AsyncLocalStorage solve in a microservices fleet?
15. NestJS vs Express for a 6-person account team — the *lead* reason?

**System design / microservices (16–27)**
16. Choreography vs orchestration saga — when each, with an example?
17. Design a claims processing system — 2-minute version, business framing first.
18. Why is event sourcing usually the wrong default? What do you do instead?
19. Outbox pattern — problem and mechanics?
20. How do you make a booking/payment API idempotent end-to-end?
21. SQS vs SNS vs EventBridge vs Kafka — model differences + when Kafka wins?
22. Circuit breaker — states, and what happens half-open?
23. Database-per-service — the benefit, and how do you do cross-service reporting?
24. How would you hold airline seat inventory during checkout without locks?
25. CQRS — when is it justified? Where did UTEC use a CQRS-lite shape?
26. Strangler fig — how would you pitch it to a client with a legacy policy system?
27. Where do correlation IDs originate and how do they propagate?

**React (28–37)**
28. Your folder architecture for a large multi-dev React app, and how it's enforced?
29. Server state vs client state — why does the distinction decide your state library?
30. When does `memo` hurt performance?
31. Fix a janky 10k-row table — full answer.
32. Your code-splitting strategy and how you stop bundle regressions?
33. Micro-frontends — when justified, and why not for a Coforge account team?
34. Your React testing pyramid — what layer gets the most investment and why?
35. SSR vs SPA — give one project where each was correct (you have both).
36. How do you handle forms at scale, and where does validation truth live?
37. How do you keep React quality consistent across 6 developers?

**Leadership / behavioral (38–45)**
38. "Have you led a team?" — your bridge answer.
39. "Why hire you as Lead when you were a Senior Engineer?"
40. A deadline is at risk mid-sprint — walk me through your first 48 hours.
41. Your underperforming-teammate story, ≤90 seconds.
42. Tell me about disagreeing with a senior stakeholder — how did you win?
43. Your production incident story — what's the lead's #1 job during an incident?
44. How do you handle client scope creep without saying "no"?
45. Your first 30 days as Tech Lead on a new Coforge account?

**AWS / DB (46–50)**
46. Lambda cold starts — causes and your targeted mitigation strategy?
47. ECS vs Lambda — your decision framework in 4 lines.
48. Composite index column ordering rule + what `EXPLAIN ANALYZE` red flags do you scan for?
49. Why do Lambdas exhaust Postgres connections, and the two fixes?
50. Blue-green vs canary — and which does CodeDeploy give you natively for Lambda?

---

*Last updated: 2026-08-13 · Sources to re-check before the client round: Coforge latest quarterly results + any new AI/vertical announcements (2-min skim of their newsroom).*
