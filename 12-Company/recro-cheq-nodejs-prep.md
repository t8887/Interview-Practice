# 💳 Recro × CheQ — Node.js Developer Interview: Complete Preparation Guide

> **Candidate:** Onkar Mahesh Sawant — Senior SDE, 5+ yrs (Node.js, TypeScript, Express, AWS Serverless, MERN)
> **Agency:** Recro Technologies (talent partner — you interview twice: Recro bar + client fit)
> **Client:** CheQ Digital Pvt Ltd — Bengaluru fintech (credit card bill payments, rewards, credit)
> **Role:** Node.js Developer | **JD Band:** 2–5 years | **Location:** Bengaluru
> **JD Stack:** Node.js REST · Python/Shell batch-cron · React · MySQL/MongoDB/Redis · GCP or AWS · Docker/K8s
> **Prepared:** July 14, 2026

---

## 📑 Table of Contents

| # | Section | Priority |
|---|---------|----------|
| ⚡ | [Quick Start — Read This First](#quick-start) | 🔴 First |
| 1 | [Role Snapshot & Strategy](#sec1) | 🔴 High |
| 2 | [JD ↔ Skill Matrix](#sec2) | 🔴 High |
| 3 | [Node.js Deep Dive — 30 Q&A](#sec3) | 🔴 High (confirmed Recro topics) |
| 4 | [Python + Shell Crash Course — PRIORITY GAP](#sec4) | 🔴 Highest risk |
| 5 | [Fintech Domain Primer](#sec5) | 🟠 High (client round) |
| 6 | [Databases — 20 Q&A + 6 SQL Drills](#sec6) | 🟠 High |
| 7 | [React + Build Tools Refresher](#sec7) | 🟡 Medium |
| 8 | [Cloud & DevOps (GCP↔AWS, Docker, K8s)](#sec8) | 🟡 Medium |
| 9 | [Coding Practice Set — 15 JS + 3 Machine Coding](#sec9) | 🔴 High |
| 10 | [STAR Bank + Client Round](#sec10) | 🟠 High |
| 11 | [7-Day Plan](#sec11) | 🟢 Track daily |

**Reuse — don't re-read here:**
- React hooks, VDOM/Fiber, `call/apply/bind`, `reduce` → [HCLTech prep](HCLTech_MERN_Interview_Prep.md)
- Event loop basics, JWT, Redis basics, Docker/K8s basics, SQS/SNS/DLQ → [Encora prep](encora-L2-backend-engineer.md)

---

<a id="quick-start"></a>
## ⚡ QUICK START — Read This First

### The round map

| Round | Format | What they test | Your play |
|-------|--------|----------------|-----------|
| **0. Online assessment** (possible) | JS/React MCQ + 2 coding problems | JS output questions (promises, `this`, hoisting), array/string manipulation | §9 problems 1–15; HCLTech MCQ list |
| **1. Recro internal** (~90 min) | Core Q&A + problem solving + architecture/algorithm | **Confirmed topics: async/await, streams, worker threads, promises, timers** + live coding | §3 is built exactly around these; §9 machine coding |
| **2. CheQ client round** (30–60 min) | Experience-based, possibly machine coding | Can you own a payments service? Do you get fintech constraints (idempotency, reconciliation, security)? | §5 vocabulary + §10 STAR stories |

### Your 20-second pitch (memorize)

> "I'm a senior full-stack engineer, 5+ years, backend-heavy on Node.js and TypeScript. I've built and scaled a construction-commerce platform to 6M+ users at UltraTech — including leading its VAPT/OWASP security remediation — migrated a telemedicine platform from EC2 to Lambda, and most recently built an agentic LLM risk platform at EY. I care about resilient services: idempotent APIs, queues with DLQs, caching, and clean CI/CD. Payments-scale reliability at CheQ is exactly the kind of problem I want to work on."

### Top 5 things to nail (in priority order)

- [ ] **Recro's confirmed Node topics** — async/await, streams, worker threads, promises, timers → [§3](#sec3). Expect *output-prediction* questions.
- [ ] **The Python/Shell question** — the JD says "2+ years Python and Shell". You have ~0. Your framing script + 8 practiced scripts → [§4](#sec4). This is the one question that can kill the offer if fumbled.
- [ ] **Fintech vocabulary** — idempotency key, reconciliation, settlement, chargeback, state machine, PCI DSS. Drop these naturally in the client round → [§5](#sec5).
- [ ] **Security story** — the JD explicitly says "strong grasp of modern security principles." Your VAPT/OWASP remediation at UTEC is a literal match. Tell it early → [§10 STAR-1](#sec10).
- [ ] **Hand-coded JS** — debounce, promise pool, retry, groupBy, flatten — written from memory, not recognized → [§9](#sec9).

### Biggest risks

| Risk | Mitigation |
|------|-----------|
| ❌ Python/Shell probe goes deep | §4 honest framing + demo scripts; pivot to Node cron war stories (P&G batch migration) |
| ⚠️ "Why is a 5+ YOE senior applying to a 2–5 band?" | §1 positioning script — growth into fintech domain, not a step down |
| ⚠️ GCP-specific questions (CheQ may be on GCP) | §8 mapping table — answer in AWS terms, translate out loud |
| ⚠️ Timer/event-loop output questions under pressure | §3 Q1–Q6 — practice predicting output before running |

---

<a id="sec1"></a>
## 1. 🎯 Role Snapshot & Strategy

### 1.1 How the Recro model works (know this going in)

Recro is a **talent partner / staff augmentation platform**: they hire developers, deploy them at client sites (here: CheQ), and typically keep you on **Recro payroll** while you work day-to-day inside the client's team. Key implications:

1. **You clear two bars.** Recro's internal round is a genuine technical filter (they protect their reputation with clients); the CheQ round is about fit, domain sense, and "can this person ship in our codebase next week."
2. **Conversion is a thing.** Many Recro deployments convert to client FTE after 6–12 months — but policy varies per client. **Ask about it explicitly** (§10.3 has the wording).
3. **Speed matters to them.** Reported Recro hiring cycles average ~2 weeks. Be decisive about notice period, expected CTC, and availability — indecision reads as risk to an agency.
4. **The Recro interviewer is a generalist bar-raiser**, not a CheQ engineer. Expect textbook-correct Node.js questions (their published guidance emphasizes event loop, promises, streams, worker threads, timers) rather than payments-domain questions. Save the fintech depth for the client round.

### 1.2 Positioning 5+ YOE for a 2–5 band

The risk isn't "not good enough" — it's **"overqualified / too expensive / will leave in 6 months."** Neutralize all three proactively:

> **If asked "You're senior — why this role?":**
> "Two honest reasons. First, domain: I've done scale (6M+ users) and security (VAPT remediation), but I haven't done **money movement** — payments is the deepest backend domain in India right now and CheQ processes a meaningful slice of the country's credit card bills. I'd rather be a strong IC in a fintech that's actually profitable than a title-holder somewhere stagnant. Second, the JD is genuinely my stack — Node, React, Redis, MySQL/Mongo — so I can contribute from week one, not month three."

**Rules for the band:**
- Never say "this is a step down" or negotiate seniority in the technical rounds.
- Don't inflate answers with "when I led/managed…" on every question — lead with **hands-on** verbs (built, debugged, profiled, migrated). The JD says "hands-on development" twice in spirit.
- Keep CTC expectations aligned to the band before anchoring high; Recro margins are real. Anchor on **role + conversion path**, negotiate money with data (§13-Salary-Negotiation folder).

### 1.3 Your 3 differentiators (say each at least once)

| # | Differentiator | Where it lands | One-liner to deliver |
|---|----------------|----------------|----------------------|
| 1 | **Security/VAPT** | JD: "strong grasp of modern security principles"; CheQ is PCI DSS certified | "I led VAPT remediation for a 6M-user platform — fixed OWASP Top-10 findings across auth, injection, and rate limiting. I know what an auditor asks for." |
| 2 | **6M-user scale** | JD: "resilient code that performs and scales" | "I've operated Node services for 6M+ users — queue-backed notifications, Redis caching, OpenSearch for search offload. Scale isn't theoretical for me." |
| 3 | **LLM/agentic work** | CheQ's Wisor AI credit assistant | "At EY I re-architected an agentic LLM platform through a GPT-4→GPT-5.1 migration with ~20% quality gain. If Wisor's roadmap needs backend engineers who speak LLM, that's a bonus I bring." |

### 1.4 CheQ intel card (for "what do you know about us?")

- **Founded 2022, Bengaluru**, by **Aditya Soni** (ex-Flipkart payments leadership). Elevated Bipin Toro and Vished Banger to co-founders as the company scaled.
- **Products:** credit card bill payments (core), EMI payments, rewards (**CheQ Chips**), credit score dashboard, wallet, UPI, personal loans, LAMF (loans against mutual funds), **CheQ AU co-branded credit card**, **Wisor** — AI credit assistant.
- **Scale & health (FY26):** turned **profitable** (cash + P&L); exit-run-rate ≈ **$42M revenue**, ≈ **$7Bn annual payments** (CC + utility), ~$150M lending, ~$250M wallet. Handles ≈ **2% of India's retail credit card transactions monthly**. Raised ~$17.8M total (3one4 Capital, Y Combinator, Sherpalo).
- **Why this matters in your answers:** profitable fintech ⇒ they value **cost-aware engineering** (your EC2→Lambda cost story) and **correctness over feature-rush** (reconciliation, idempotency). PCI DSS certified ⇒ security answers must be concrete, not buzzwordy.

> **Model answer — "Why CheQ?"**
> "Three things. One, the problem: credit card bills are the highest-stakes recurring payment an Indian consumer makes, and CheQ owns that moment — roughly 2% of retail CC transactions monthly. Two, the engineering bar that implies: money movement needs idempotency, reconciliation, and audit-grade security — that's the kind of backend work I want. Three, you're a *profitable* fintech, which is rare — it tells me engineering discipline and unit economics matter there, and that's the culture I work best in."

---
<a id="sec2"></a>
## 2. 📊 JD ↔ Skill Matrix

Legend: ✅ STRONG (lead with it) · ⚠️ PARTIAL (have a bridge answer ready) · ❌ GAP (prep section assigned)

| # | JD Requirement | Verdict | Your evidence / story | Prep action |
|---|----------------|---------|----------------------|-------------|
| 1 | Work with stakeholders (POs, PMs, scrum masters) to define/clarify requirements | ✅ | UTEC: 110-person program, sprint ceremonies, requirement grooming with product owners; EY: consulting-side stakeholder management | STAR-7 (§10) ready |
| 2 | Hands-on front-end + middle-tier + back-end | ✅ | MERN across all 4 projects; React front-ends at UTEC/Vkonnect, Node/Express APIs everywhere | Refresh React via HCLTech file (§7 pointers) |
| 3 | Leverage DevOps team; build/deploy/test across release cycles dev→prod | ✅ | UTEC: 5 environments, nested CloudFormation, SAM deploys, change sets | STAR-6 (§10); CI/CD narrative §8.4 |
| 4 | Strong grasp of modern security principles | ✅ 🌟 | **VAPT/OWASP remediation at UTEC — your #1 differentiator**; JWT hardening, rate limiting, injection fixes | STAR-1 (§10); §3 Q26–Q30 |
| 5 | Resilient code that performs & scales with usage | ✅ | 6M+ users UTEC; queue-backed fan-out; Redis caching; OpenSearch offload; Vkonnect EC2→Lambda | STAR-2, STAR-3 (§10) |
| 6 | 2+ yrs RESTful web services with NodeJS | ✅ | 5+ yrs Node/Express/TypeScript, serverless REST on API Gateway + Lambda | §3 all; §9 machine coding 3 |
| 7 | **2+ yrs batch/cron with Python and Shell** | ❌ 🔴 | Only Node-based jobs: EventBridge-scheduled Lambdas, SQS batch consumers (UTEC), Azure Functions batch migration (P&G) | **§4 entirely.** Framing script + 8 practice scripts. Do NOT claim 2 yrs |
| 8 | 2+ yrs web app dev with JS libraries + ReactJS | ✅ | React across UTEC/Vkonnect/P&G storefront work | HCLTech prep re-read (Day 6) |
| 9 | Basic TS, JS, HTML, CSS, JSON, REST | ✅ | TypeScript daily; REST design is home turf | Nothing extra |
| 10 | RDBMS + NoSQL: MySQL, MongoDB, Redis | ✅/⚠️ | MongoDB + Redis production-strong; MySQL solid but joins/isolation-levels rusty under interview pressure | §6 all 20 Q&A + 6 hand-written SQL drills |
| 11 | Git | ✅ | Branching strategy across 5 envs at UTEC; PR review culture | One-liner ready: trunk vs GitFlow trade-offs |
| 12 | Cloud on **GCP** or AWS + Docker + **Kubernetes** | ⚠️ | AWS deep (Lambda, API GW, SQS/SNS, CFN); Docker yes; **GCP ❌ conceptual only; K8s ⚠️ conceptual (Encora prep)** | §8 GCP↔AWS table + K8s objects + framing answer |
| 13 | JS build/package tools: Grunt, Gulp, Bower, **Webpack**, NPM | ⚠️ | NPM daily; Webpack used but never authored a config from scratch; Grunt/Gulp/Bower = legacy, never used | §7.2 Webpack core; §7.4 legacy one-liners |

### The three answers to script before anything else

**❌ Gap #7 — Python/Shell** → full script in [§4.1](#sec4). Short version: *never claim the 2 years; sell identical batch-job concepts from Node + demonstrated Python basics.*

**⚠️ Gap #12 — GCP/K8s** →
> "I'm AWS-native — Lambda, API Gateway, SQS/SNS, CloudFormation at production scale. I haven't run GCP in production, but the mapping is mechanical: Cloud Run ↔ Fargate/Lambda, GKE ↔ EKS, Pub/Sub ↔ SNS+SQS, Cloud Scheduler ↔ EventBridge, Secret Manager ↔ Parameter Store. The architectural decisions — stateless services, queues, IaC, least-privilege IAM — are cloud-agnostic, and those I've made for years."

**⚠️ Gap #13 — build tools** →
> "Day to day I live in NPM scripts and have worked in Webpack-based apps — I understand entry/output, loaders vs plugins, and code splitting, though most configs I touched were established ones I extended rather than authored. Grunt and Gulp I know as the task-runner generation before bundlers; Bower was the pre-npm front-end package manager — I'd migrate all three toward npm + a modern bundler if I met them in a codebase."

---
<a id="sec3"></a>
## 3. 🟢 Node.js Deep Dive — 30 Q&A

> Recro's confirmed focus: **async/await, streams, worker threads, promises, timers.** Every group below maps to one of those. Deeper than the Encora L1 basics — expect *output prediction* and *"implement it"* follow-ups.

**Groups:** [Event loop & timers Q1–6](#s3-el) · [Promises & async Q7–12](#s3-prom) · [Streams Q13–17](#s3-streams) · [Workers/cluster Q18–21](#s3-workers) · [Errors & memory Q22–25](#s3-err) · [Express security Q26–30](#s3-sec)

<a id="s3-el"></a>
### 3A. Event Loop & Timers (Q1–Q6)

**Q1: Walk me through the phases of the Node.js event loop.**

> **Why asked:** The #1 Node filter question. Recro interviewers use it to separate "used Node" from "understands Node."

The event loop (implemented by **libuv**, not V8) cycles through six phases; each phase has a FIFO queue of callbacks:

```
   ┌─► 1. timers          — expired setTimeout / setInterval callbacks
   │   2. pending callbacks— deferred system-level callbacks (e.g. TCP errors)
   │   3. idle, prepare    — internal bookkeeping
   │   4. poll             — ★ retrieve new I/O events; run I/O callbacks;
   │                          may BLOCK here waiting for I/O if nothing else is due
   │   5. check            — setImmediate callbacks
   └── 6. close callbacks  — socket.on('close'), etc.
```

Key points to say:
1. **The poll phase is home base.** Node spends most time there. If the poll queue is empty, libuv checks: are there `setImmediate` callbacks? → jump to check. Are there timers due? → wrap to timers. Otherwise block on I/O.
2. **Microtasks are not a phase.** `process.nextTick` and resolved-promise callbacks run **between every callback**, before the loop continues (Node ≥ 11 semantics).
3. **JS is single-threaded; Node is not.** libuv keeps a thread pool (default 4) for fs, dns.lookup, crypto, zlib — see Q6.

*Verify-it-yourself snippet:*

```js
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));
console.log('sync');
// sync → nextTick → promise → then timeout/immediate (order of those two
// is non-deterministic at top level — see Q3)
```

---

**Q2: Microtasks vs macrotasks — what exactly runs when?**

> **Why asked:** Output-prediction questions live here. Recro loves these in the 90-min round.

Two microtask queues in Node, drained **completely** after every callback, before the event loop moves on:
1. **`process.nextTick` queue** — highest priority, drained first.
2. **Promise microtask queue** — `.then/.catch/.finally`, `await` continuations, `queueMicrotask`.

Macrotasks = the phase queues themselves: timers, I/O callbacks, `setImmediate`, close callbacks.

**Drill this output:**

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => {
  console.log('3');
  process.nextTick(() => console.log('4'));
});
process.nextTick(() => console.log('5'));
queueMicrotask(() => console.log('6'));
console.log('7');
// Output: 1 7 5 3 6 4 2
```

Why: sync (`1`,`7`) → nextTick queue (`5`) → promise queue (`3`, then `6` which was queued earlier… careful: `6` was queued during sync phase so runs after `3`) → the nextTick `4` registered inside a microtask still runs **before** timers → macrotask `2`.

⚠️ **Trap to mention:** recursive `process.nextTick` **starves** the event loop (I/O never runs); recursive `setImmediate` does not — it yields each iteration. That's the interview-grade difference between them.

---

**Q3: `setTimeout(fn, 0)` vs `setImmediate(fn)` vs `process.nextTick(fn)` — differences and when order is guaranteed?**

- **`process.nextTick`** — not part of the event loop; fires before it continues, after the current operation. Use: emitting events right after construction, deferring a callback to stay async-consistent. Abuse: starvation (Q2).
- **`setTimeout(fn, 0)`** — timers phase; actual minimum is clamped to ~1 ms. Fires next loop iteration *if* the timer heap says it's due.
- **`setImmediate`** — check phase; "run after the current poll phase completes."

**The classic ordering question:**

```js
// Top level (main module): ORDER NON-DETERMINISTIC
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
// Depends on whether the loop enters the timers phase <1ms after start.

// Inside an I/O callback: ORDER GUARANTEED
const fs = require('fs');
fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
});
// ALWAYS: immediate → timeout
// We're in the poll phase; check (setImmediate) comes right after poll,
// while timers must wait for the next loop iteration.
```

Saying "inside an I/O callback, `setImmediate` always wins because check follows poll" is a senior-level answer that lands well.

---

**Q4: How do Node timers actually work? Why is `setTimeout` not exact? `setInterval` pitfalls?**

- Timers live in a **min-heap** keyed by expiry time; each loop iteration, libuv computes "time until the nearest timer" and uses it as the poll-phase timeout.
- `setTimeout(fn, 100)` means "**not before** ~100 ms" — never "exactly at." Delay sources: a busy poll phase, long synchronous callbacks ahead of you, CPU contention.
- **`setInterval` pitfall:** it fires on schedule regardless of whether the previous run finished — if your job takes longer than the interval, runs **overlap or bunch up**. For jobs (fintech: pollers, batch triggers), use a **recursive `setTimeout`** so the next run schedules only after the current one completes:

```js
async function poll() {
  try {
    await checkPaymentStatus();     // may take longer than 5s sometimes
  } finally {
    setTimeout(poll, 5000);         // fixed GAP between runs, no overlap
  }
}
poll();
```

- Bonus points: `timeout.unref()` — a timer that won't keep the process alive (perfect for periodic cache refresh in a short-lived script); `timeout.refresh()` — reset without re-allocating (idle-session timeouts).

---

**Q5: What blocks the event loop, how do you detect it, and how do you fix it?**

> **Why asked:** Maps 1:1 to the JD's "resilient code that performs and scales."

**Blockers:** synchronous fs (`readFileSync`), `JSON.parse/stringify` on multi-MB payloads, sync crypto (`pbkdf2Sync`, `bcrypt.hashSync`), catastrophic regex (ReDoS), tight CPU loops (report generation, image processing), huge array sorts.

**Detection:**

```js
// Poor-man's event-loop lag monitor — production-safe
let last = process.hrtime.bigint();
setInterval(() => {
  const now = process.hrtime.bigint();
  const lagMs = Number(now - last) / 1e6 - 1000;
  if (lagMs > 100) console.warn(`Event loop lag: ${lagMs.toFixed(0)}ms`);
  last = now;
}, 1000).unref();
```

Production: `perf_hooks.monitorEventLoopDelay()`, clinic.js (`clinic doctor`), APM (Datadog/New Relic event-loop metrics).

**Fixes, in order of preference:**
1. Use the async API variant (`fs.promises`, async bcrypt/argon2).
2. **Chunk** the work — process N items, then `setImmediate(nextChunk)` to yield.
3. Move CPU-bound work to a **worker thread** (Q19) or a separate job service/queue.
4. Stream instead of buffering (Q17).

**Your story hook:** "At UTEC our notification fan-out briefly blocked the loop serializing large payloads; we moved fan-out behind SQS and processed in batches — p95 latency recovered immediately."

---

**Q6: What is the libuv thread pool? Which operations use it — and which don't?**

- Default **4 threads** (tune with `UV_THREADPOOL_SIZE`, max 1024, set **before** startup).
- **Uses the pool:** `fs.*` (file I/O), `dns.lookup()` (because it calls the OS resolver), `crypto.pbkdf2/scrypt/randomBytes` (async forms), `zlib` async.
- **Does NOT use the pool:** network sockets! TCP/HTTP use the OS's non-blocking notification mechanism (epoll/kqueue/IOCP) directly on the loop thread. This is why Node handles 10k sockets with 1 thread but chokes on 5 concurrent bcrypt calls with the default pool.
- **Interview gotcha:** 4 slow `fs` reads + 1 `dns.lookup` = the DNS lookup **waits**. Symptom: mysterious latency spikes in services doing heavy fs + outbound HTTP (dns). Fix: raise `UV_THREADPOOL_SIZE`, or use `dns.resolve()` (c-ares, no pool), or cache lookups / use keep-alive agents.

---

<a id="s3-prom"></a>
### 3B. Promises & Async Patterns (Q7–Q12)

**Q7: Explain promise states and how error propagation works in chains vs async/await.**

A promise is a state machine: **pending → fulfilled | rejected** (settled states are final). `.then()` returns a *new* promise, which is how chaining works — each handler's return value (or thrown error) settles the next link.

```js
fetchBill(id)
  .then(bill => computeDues(bill))        // return value → next then
  .then(dues => { throw new Error('x'); })// throw → skips to nearest catch
  .catch(err => fallbackDues())           // recovers: chain continues fulfilled
  .then(dues => render(dues))
  .finally(() => metrics.done());         // runs either way, gets no value

// async/await is the same machine with sync-looking syntax:
async function getDues(id) {
  try {
    const bill = await fetchBill(id);     // await = .then + suspension
    return computeDues(bill);
  } catch (err) {                          // catches BOTH sync throws and rejections
    return fallbackDues();
  } finally {
    metrics.done();
  }
}
```

Points that score: a `.catch` **recovers** the chain (what it returns becomes a fulfilled value); a missing `return`/`await` inside `.then` breaks the chain silently (floating promise); `async` functions **always** return a promise; throwing inside one = rejecting that promise.

---

**Q8: `Promise.all` vs `allSettled` vs `race` vs `any` — and a real use for each.**

| Combinator | Resolves when | Rejects when | Fintech use |
|---|---|---|---|
| `all` | every promise fulfills → array of values | **first** rejection (fail-fast; others keep running but are ignored) | Load user + cards + reward balance for dashboard — all required |
| `allSettled` | always — array of `{status, value|reason}` | never | Fan out bill-fetch to 8 banks; show whatever succeeded, retry failures |
| `race` | first to **settle** (fulfil or reject) | first settle if it's a rejection | **Timeout pattern** (below) |
| `any` | first to **fulfil** | all rejected (`AggregateError`) | Query primary + fallback status API; take whichever answers first |

```js
// The timeout pattern — memorize, it's a favorite live-coding ask:
function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}
// await withTimeout(gatewayStatusCheck(txnId), 3000);
```

⚠️ Mention: `Promise.all` rejection does **not cancel** the losers — they still run and may still charge/write. For payments, pair fan-out with `AbortController` or idempotency (§5.2).

---

**Q9: Sequential vs parallel async iteration — `for..of await` vs `map` + `Promise.all`.**

```js
// SEQUENTIAL — one at a time. Use when: order matters, rate limits,
// each step depends on the previous, or you must not hammer a downstream bank API.
for (const bill of bills) {
  await payBill(bill);              // total time = sum of calls
}

// PARALLEL — all at once. Use when: independent work, downstream can take it.
const results = await Promise.all(bills.map(bill => payBill(bill)));
// total time ≈ slowest call

// ⚠️ TRAP: forEach ignores promises entirely — this "finishes" immediately:
bills.forEach(async bill => { await payBill(bill); });  // ❌ floating promises
```

Senior nuance: unbounded `Promise.all` on 10,000 items = self-inflicted DDoS on your own DB/downstream. The right answer is **bounded concurrency** → Q10.

---

**Q10: Implement a promise pool (concurrency limiter). — frequent live-coding ask**

<details>
<summary>✍️ Full solution + how to talk through it</summary>

```js
/**
 * Run `tasks` (functions returning promises) with at most `limit` in flight.
 * Results keep input order. One worker-loop per slot — no external deps.
 */
async function promisePool(tasks, limit) {
  const results = new Array(tasks.length);
  let next = 0;

  async function worker() {
    while (next < tasks.length) {
      const i = next++;               // claim an index (single-threaded ⇒ safe)
      results[i] = await tasks[i]();
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker));
  return results;
}

// Demo:
const jobs = Array.from({ length: 10 }, (_, i) => () =>
  new Promise(res => setTimeout(() => { console.log('done', i); res(i); }, 300)));
promisePool(jobs, 3).then(r => console.log('results', r));
```

Talk-through: "I spawn `limit` worker loops; each grabs the next unclaimed index. Because JS is single-threaded, `next++` can't race. Order is preserved by writing into `results[i]`. In production I'd add per-task try/catch so one failure doesn't kill a worker — or use `p-limit`."

</details>

---

**Q11: What happens to unhandled promise rejections in Node? How do you handle them properly?**

- Since **Node 15**, an unhandled rejection **crashes the process** by default (`--unhandled-rejections=throw`), same as an uncaught exception. Before that it was just a warning — know both because legacy services differ.
- Handling hierarchy: (1) catch where you can act on it; (2) central Express error middleware for request-scoped code (Q22); (3) last-resort process hook — **log + flush + exit**, never "log and continue":

```js
process.on('unhandledRejection', (reason) => {
  logger.fatal({ reason }, 'Unhandled rejection — exiting');
  process.exit(1);            // let PM2/K8s restart us into a clean state
});
```

- Why exit? After an unknown failure your process state is suspect — in a payments service, continuing risks **corrupt writes**, which is worse than a restart blip. (Same logic as Q23.)
- Common source to name: `async` handler passed to Express (rejections bypass Express's sync error handling) — fixed by an `asyncHandler` wrapper (Q22) or Express 5's built-in async support.

---

**Q12: How do you propagate request context (request ID, user ID) through async code? — `AsyncLocalStorage`**

> **Why asked:** Traceability is table stakes in payments — every log line must tie to a transaction.

```js
const { AsyncLocalStorage } = require('async_hooks');
const { randomUUID } = require('crypto');
const als = new AsyncLocalStorage();

// Express middleware — one line at the top of the app:
app.use((req, res, next) => {
  const store = { requestId: req.get('x-request-id') || randomUUID() };
  als.run(store, next);                     // everything downstream sees the store
});

// Anywhere deep in service code — no parameter drilling:
function log(msg) {
  const store = als.getStore();
  console.log(JSON.stringify({ requestId: store?.requestId, msg }));
}
```

`AsyncLocalStorage` (stable, built on `async_hooks`) keeps the store across `await`s, timers, and callbacks in the same async chain — the Node equivalent of thread-local storage. Use cases: request-ID logging, per-request DB transaction handles, auth context. Cost is small but nonzero; keep the store minimal. This pairs with your fintech story: "at CheQ-scale I'd attach `requestId` + `txnId` to every log line via ALS so reconciliation and support can trace a payment end-to-end."

---
<a id="s3-streams"></a>
### 3C. Streams & Backpressure (Q13–Q17)

**Q13: What are the four types of streams? Give a built-in example of each.**

| Type | Direction | Built-in examples | Fintech example |
|------|-----------|-------------------|-----------------|
| **Readable** | source → you | `fs.createReadStream`, `http.IncomingMessage` (req), `process.stdin` | Reading a 500 MB settlement file from the bank |
| **Writable** | you → sink | `fs.createWriteStream`, `http.ServerResponse` (res), `process.stdout` | Writing the reconciliation report |
| **Duplex** | both, independent sides | `net.Socket`, `tls.TLSSocket` | Persistent connection to a payment switch |
| **Transform** | Duplex where output = f(input) | `zlib.createGzip`, `crypto.createCipheriv` | Parse/normalize each settlement record in flight |

Extras that score: streams are `EventEmitter`s; everything is chunks (`Buffer`/string, or any JS value in **objectMode**); two reading modes — flowing (`.on('data')`) vs paused (`.read()`); modern code can consume readables with `for await (const chunk of stream)`.

---

**Q14: Explain backpressure. What is `highWaterMark`? What does `write()` returning `false` mean?**

**Backpressure = the slower consumer pushing back on a faster producer** so memory doesn't blow up. Without it: fast disk read → slow network write → chunks pile up in RAM → OOM.

Mechanics:
1. Every stream has an internal buffer with a threshold: **`highWaterMark`** (default 64 KB for byte streams, 16 objects in objectMode). It's a *soft* limit — a courtesy line, not a wall.
2. `writable.write(chunk)` returns **`false`** when the internal buffer has crossed `highWaterMark` → "I'll take it, but please stop."
3. A well-behaved producer **pauses** and resumes on the `'drain'` event:

```js
// Manual backpressure — know it to explain it (pipe/pipeline do this for you):
function writeMillionRows(writable) {
  let i = 0;
  function writeChunk() {
    let ok = true;
    while (i < 1_000_000 && ok) {
      ok = writable.write(`row-${i++}\n`);   // false = buffer full
    }
    if (i < 1_000_000) writable.once('drain', writeChunk); // resume later
    else writable.end();
  }
  writeChunk();
}
```

The interview one-liner: *"`pipe()` and `pipeline()` implement exactly this pause/drain dance automatically — that's their whole job."*

---

**Q15: `pipe()` vs `stream.pipeline()` — why does everyone say "use pipeline"?**

```js
// ❌ pipe: backpressure yes, but error handling is a trap
src.pipe(gzip).pipe(dest);
// - an error on ANY stream is NOT propagated to the others
// - streams aren't destroyed on failure → fd/memory leaks
// - you'd need .on('error') on every single stream

// ✅ pipeline: backpressure + error propagation + cleanup
const { pipeline } = require('stream/promises');
const fs = require('fs');
const zlib = require('zlib');

await pipeline(
  fs.createReadStream('settlement-2026-07-14.csv'),
  zlib.createGzip(),
  fs.createWriteStream('settlement-2026-07-14.csv.gz')
);  // throws on first error, destroys all streams either way
```

`pipeline` (esp. the `stream/promises` version) gives: single error path, guaranteed `destroy()` on all streams, await-ability, and optional `AbortSignal`. `pipe()` remains fine for quick REPL work and is what `pipeline` uses internally — but in production code, `pipeline` is the answer.

---

**Q16: Write a Transform stream — e.g. parse a CSV of transactions line by line.**

<details>
<summary>✍️ Runnable solution — line splitter + CSV-to-JSON transform</summary>

```js
const { Transform, pipeline } = require('stream');

// 1) Chunks don't respect line boundaries — buffer the partial last line.
class LineSplitter extends Transform {
  constructor() { super({ readableObjectMode: true }); this.tail = ''; }
  _transform(chunk, _enc, cb) {
    const lines = (this.tail + chunk).split('\n');
    this.tail = lines.pop();                 // maybe-incomplete final piece
    for (const line of lines) if (line.trim()) this.push(line);
    cb();
  }
  _flush(cb) { if (this.tail.trim()) this.push(this.tail); cb(); }
}

// 2) objectMode transform: CSV line → txn object
class CsvToTxn extends Transform {
  constructor() { super({ objectMode: true }); this.header = null; }
  _transform(line, _enc, cb) {
    const cols = String(line).split(',');
    if (!this.header) { this.header = cols; return cb(); }
    const txn = Object.fromEntries(this.header.map((h, i) => [h.trim(), cols[i]]));
    txn.amount_paise = Math.round(parseFloat(txn.amount) * 100); // money as integers!
    this.push(txn);
    cb();
  }
}

// Demo with an in-memory readable:
const { Readable, Writable } = require('stream');
const csv = 'txn_id,amount,status\nT1,999.50,SUCCESS\nT2,120.00,FAILED\n';
pipeline(
  Readable.from([csv.slice(0, 20), csv.slice(20)]),  // simulate arbitrary chunking
  new LineSplitter(),
  new CsvToTxn(),
  new Writable({ objectMode: true, write(txn, _e, cb) { console.log(txn); cb(); } }),
  err => err ? console.error('failed:', err) : console.log('done')
);
```

Talking points: the `tail` buffer (chunk boundaries ≠ line boundaries — the classic bug), `_flush` for the last line, objectMode switch mid-pipeline, and **storing money in paise as integers** (floating-point money is a fintech red flag — §5.9).

</details>

---

**Q17: When would you stream instead of `readFile` / `res.json`? Prove the difference.**

Rule of thumb: **buffer if small & needed whole; stream if large, unbounded, or forwardable.**

```js
// ❌ Loads the entire file into memory — 2 GB file = ~2 GB RSS, per request!
app.get('/report', async (req, res) => {
  const data = await fs.promises.readFile('big-report.csv');
  res.send(data);
});

// ✅ Constant ~64KB memory regardless of file size; download starts instantly
app.get('/report', (req, res) => {
  res.setHeader('content-type', 'text/csv');
  const stream = fs.createReadStream('big-report.csv');
  stream.on('error', () => res.destroy());   // or use pipeline(stream, res, cb)
  stream.pipe(res);
});
```

Where you'd use it at CheQ: statement/report downloads, ingesting bank settlement files, request-body uploads to S3/GCS (pipe through, never buffer), log shipping. Watch-out to mention: JSON is a poor streaming format (needs the whole document) — use NDJSON or CSV for streamed exports.

---

<a id="s3-workers"></a>
### 3D. Worker Threads vs Cluster vs Child Process (Q18–Q21)

**Q18: Compare `worker_threads`, `cluster`, and `child_process`. When do you pick each?**

| | `worker_threads` | `cluster` | `child_process` |
|---|---|---|---|
| Unit | Thread in same process | Forked **processes** of your app | Any process (incl. non-Node) |
| Memory | Own V8 isolate + loop; **can share** via `SharedArrayBuffer` | Fully separate | Fully separate |
| Communication | `postMessage` (structured clone), shared memory | IPC channel | IPC / stdio pipes |
| Port sharing | N/A | ✅ built-in (master distributes connections, round-robin) | manual |
| Startup cost | Light-ish (~ms, still a full isolate) | Heavy (full process) | Heavy |
| Crash isolation | Crash can be contained per worker | Excellent — one worker dies, others serve | Excellent |
| **Use for** | **CPU-bound work** inside a service (hashing, parsing, PDF/report gen) | **Scaling HTTP across cores** on a VM | Running **other programs** (ffmpeg, python scripts!, git), or fully isolated jobs |

Decision script: *"CPU-bound task inside my API? → worker thread. Use all 8 cores for HTTP? → cluster or PM2 cluster mode — though in Docker/K8s I'd usually run 1 process per container and scale replicas instead (Q20). Need to shell out to Python for a batch job? → child_process.spawn."* (That last one is a neat bridge to the JD's Python requirement.)

---

**Q19: Show me worker_threads code — offload a CPU-heavy task from an API.**

<details>
<summary>✍️ Runnable single-file example (worker + main via isMainThread)</summary>

```js
// cpu-worker.js — run: node cpu-worker.js
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function heavyHash(iterations) {          // stand-in for statement PDF gen / crypto
  const { pbkdf2Sync } = require('crypto');
  let out;
  for (let i = 0; i < iterations; i++)
    out = pbkdf2Sync('card-data', 'salt', 50_000, 64, 'sha512');
  return out.toString('hex').slice(0, 16);
}

if (isMainThread) {
  console.time('worker');
  const worker = new Worker(__filename, { workerData: { iterations: 20 } });
  worker.on('message', (msg) => { console.log('result:', msg); console.timeEnd('worker'); });
  worker.on('error', (err) => console.error('worker failed:', err));
  worker.on('exit', (code) => { if (code !== 0) console.error('exit code', code); });

  // PROOF the event loop stays free while the worker burns CPU:
  const t = setInterval(() => console.log('event loop alive ✓'), 200);
  worker.on('exit', () => clearInterval(t));
} else {
  parentPort.postMessage(heavyHash(workerData.iterations));
}
```

Talking points: the same file acts as main + worker via `isMainThread`; messages are **structured-cloned** (copied — no shared state bugs by default); the interval keeps printing → HTTP requests would still be served. Production notes: pre-warm a **pool** (`piscina` library) instead of spawning per request; spawning a worker costs milliseconds + memory for a new isolate, so it only pays off for genuinely heavy work.

</details>

---

**Q20: How does the cluster module share one port across processes? Is cluster still relevant in Docker/K8s?**

- `cluster.fork()` spawns N copies of your app. On Linux, the **primary process accepts connections and round-robins them** to workers over IPC (default since Node 0.12 — avoids OS-level accept imbalance). Workers *think* they're listening on the port; actually the primary owns the socket (alternate mode: `SO_REUSEPORT`-style shared handle on some platforms).
- Each worker = separate process = separate memory (no shared in-memory cache! — push shared state to Redis).
- **PM2** wraps this: `pm2 start app.js -i max` gives clustering + restarts + zero-downtime `pm2 reload` without you writing cluster code.
- **The modern answer interviewers want:** in K8s/Docker, prefer **one process per container, small CPU request, scale horizontally with replicas + HPA**. The orchestrator does what cluster did, plus spreading across *machines*, plus health-check-driven restarts. Cluster still makes sense on a big bare VM/EC2 box you want to saturate. — This positions your K8s conceptual knowledge (§8) nicely.

---

**Q21: How do workers communicate? What's transferred vs copied vs shared?**

Three data-movement modes — knowing all three = senior signal:

1. **Copy (default):** `postMessage(obj)` uses the **structured clone** algorithm — deep copy, handles cycles/Maps/Dates/Buffers; functions and class instances' prototypes don't survive.
2. **Transfer:** `postMessage(buf, [buf.buffer])` — moves an `ArrayBuffer` zero-copy; the sender's reference becomes unusable (neutered). Use for big payloads (parsed file contents) to avoid double memory.
3. **Share:** `SharedArrayBuffer` — truly shared memory; both sides see writes. Requires **`Atomics`** (`Atomics.add`, `Atomics.wait/notify`) to avoid races. Use sparingly — a counter/flag between a main thread and a worker pool; anything complex, prefer message passing.

`MessageChannel` gives you extra port pairs to wire worker↔worker directly instead of routing through main. Honest close: "In practice I default to message passing — shared memory in JS needs the same discipline as C, and payments code should be boring."

---
<a id="s3-err"></a>
### 3E. Error Handling & Memory (Q22–Q25)

**Q22: How do you structure error handling in an Express API?**

Core distinction first: **operational errors** (expected failures: validation, 404, downstream timeout, insufficient balance) vs **programmer errors** (bugs: undefined is not a function). Handle the first gracefully; crash-and-restart on the second (Q23).

<details>
<summary>✍️ The full pattern — AppError class + asyncHandler + central middleware</summary>

```js
// errors.js
class AppError extends Error {
  constructor(statusCode, code, message, details) {
    super(message);
    this.statusCode = statusCode;   // HTTP status
    this.code = code;               // machine-readable: 'BILL_NOT_FOUND'
    this.details = details;
    this.isOperational = true;      // "expected" failure — safe to keep serving
  }
}

// asyncHandler — without this, rejections in async routes bypass Express (≤v4)
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// routes
app.get('/bills/:id', asyncHandler(async (req, res) => {
  const bill = await billService.get(req.params.id);
  if (!bill) throw new AppError(404, 'BILL_NOT_FOUND', `No bill ${req.params.id}`);
  res.json(bill);
}));

// central error middleware — LAST app.use, 4 args exactly
app.use((err, req, res, next) => {
  const operational = err.isOperational === true;
  logger.error({ err, requestId: req.id, path: req.path });
  res.status(operational ? err.statusCode : 500).json({
    error: {
      code: operational ? err.code : 'INTERNAL',
      message: operational ? err.message : 'Something went wrong', // never leak stack
      requestId: req.id,     // support/debugging handle — fintech essential
    },
  });
  if (!operational) process.emit('SIGTERM'); // trigger graceful shutdown (Q25)
});
```

Score points: consistent error envelope (`code` + `requestId`), never leaking stack traces to clients (a VAPT finding class you actually fixed at UTEC), and the `asyncHandler` explanation.

</details>

---

**Q23: `uncaughtException` and `unhandledRejection` — what's the right production policy?**

**Log, flush, exit(1). Never keep serving.** After an uncaught error, closures, connections, and in-flight state are all suspect. In a payments service the worst outcome isn't downtime — it's a *half-applied write* (customer debited, ledger not updated). A crash-restart costs seconds behind a load balancer; corrupted state costs a reconciliation incident.

```js
process.on('uncaughtException', (err) => {
  logger.fatal({ err }, 'Uncaught exception');
  // give the logger ~1s to flush, then die; PM2/K8s restarts us clean
  setTimeout(() => process.exit(1), 1000).unref();
  server.close(() => process.exit(1));   // stop taking new work meanwhile
});
process.on('unhandledRejection', (reason) => {
  throw reason;   // funnel into the same path (also Node 15+ default behavior)
});
```

Complete the answer with the recovery half: the restart is done by **PM2 / systemd / K8s restartPolicy**, health checks keep traffic away until ready, and alerting fires on restart-rate. "Crash-only software": design so that *any* restart is safe — which circles back to idempotent handlers (§5.2).

---

**Q24: What causes memory leaks in Node? How do you find one in production?**

**Usual suspects:**
1. **Unbounded in-process caches/Maps** — the #1 real-world leak (fix: LRU with max size, or Redis).
2. **Event listeners never removed** — re-registering `on('data')` per request on a shared emitter; watch for the `MaxListenersExceededWarning` (default threshold 10 — it's a leak detector, not a nuisance).
3. **Closures capturing big objects** in long-lived callbacks/timers.
4. **Forgotten timers/intervals** holding references (and keeping the process alive — `unref()`).
5. **Global accumulation** — arrays used for "temporary" bookkeeping that only grow.

**Hunting process (tell it as a story):**
1. Confirm: plot `process.memoryUsage().heapUsed` / container RSS over hours — sawtooth-that-trends-up = leak.
2. Reproduce under load (autocannon/k6) locally with `node --inspect`.
3. Chrome DevTools → Memory → **two heap snapshots** N minutes apart → "Objects allocated between snapshot 1 and 2" → sort by retained size → follow the retainer chain to the culprit variable.
4. No local repro? `heapdump`/`v8.writeHeapSnapshot()` on a canary pod, or `clinic heapprofiler`.
5. Regression-proof it: memory assertion in a soak test.

Quick hygiene wins: `WeakMap`/`WeakRef` for metadata keyed by objects, bounded queues, `res.on('close')` cleanup for aborted requests.

---

**Q25: How do you shut a Node service down gracefully? (SIGTERM, K8s)**

The sequence — order matters:

```js
const server = app.listen(PORT);
let shuttingDown = false;

process.on('SIGTERM', async () => {         // K8s/PM2/docker stop sends SIGTERM
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info('SIGTERM: draining');

  healthz.setNotReady();                    // 1. fail readiness → LB stops routing
  server.close(async () => {                // 2. stop accepting; wait for in-flight
    await queueConsumer.stop();             // 3. finish/ack current messages
    await db.pool.end();                    // 4. close DB/Redis connections
    logger.info('Clean exit'); process.exit(0);
  });
  setTimeout(() => {                        // 5. hard deadline < K8s grace (30s)
    logger.warn('Forced exit'); process.exit(1);
  }, 25_000).unref();
});
```

K8s specifics that impress: pod deletion sends SIGTERM **and** removes the pod from endpoints *concurrently* — so a short `preStop: sleep 5` plus failing readiness first prevents "connection refused" blips; `terminationGracePeriodSeconds` (default 30s) is your hard budget, then SIGKILL. Fintech angle: draining matters most for **queue consumers mid-payment** — stop pulling, finish the message, *then* exit; never SIGKILL a handler between "debit" and "record."

---

<a id="s3-sec"></a>
### 3F. Securing Express APIs (Q26–Q30) — your VAPT story's home turf

**Q26: How do you harden an Express API for production? (Walk your checklist)**

Frame it: *"This is exactly what I did during UTEC's VAPT remediation — I'll walk the layers."*

```js
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();

app.disable('x-powered-by');                      // don't advertise the stack
app.use(helmet());                                // security headers: HSTS, nosniff, frame-deny…
app.use(express.json({ limit: '100kb' }));        // body-size DoS guard
app.use(cors({ origin: ['https://app.cheq.one'], credentials: true })); // allowlist, never '*'+creds
app.use(rateLimit({ windowMs: 60_000, max: 100, standardHeaders: true }));
```

Then the non-middleware layers: **validate every input at the edge** (zod/joi schema per route — types, ranges, allowlisted fields); **parameterized queries only** (`mysql2` placeholders / Mongoose — no string-built SQL); **authn/authz split** (JWT verifies who, route-level checks verify may — IDOR was a classic VAPT finding: user A fetching user B's bill by ID); **secrets out of code** (Q29); **audit logging** with requestId (Q12); dependency hygiene (`npm audit`, lockfiles, Dependabot); HTTPS/TLS termination + HSTS. Close with: "and we re-ran the VAPT scan to verify each finding closed."

---

**Q27: JWT auth — best practices and common mistakes.**

- **Two tokens:** short-lived access token (5–15 min) + refresh token (days) with **rotation** — each refresh issues a new refresh token and invalidates the old; a reused old one signals theft → kill the session family.
- **Algorithm:** HS256 (shared secret) fine within one service; **RS256/ES256** (private sign, public verify) once multiple services verify — verifiers can't mint tokens. Always pin expected algorithms in `jwt.verify(token, key, { algorithms: ['RS256'] })` — the `alg: none` / algorithm-confusion attack is a named VAPT classic.
- **Storage (browser):** access token in memory; refresh token in `httpOnly; Secure; SameSite=Strict` cookie — never `localStorage` (XSS-readable).
- **Revocation:** JWTs are stateless, so logout/ban needs a **Redis denylist of jti** (TTL = remaining token life) or short expiry + refresh-check against DB. For a fintech, per-device session records are worth the statefulness.
- **Claims hygiene:** minimal payload (`sub`, `roles`, `exp`, `jti`) — no PII/card data; JWTs are only *encoded*, not encrypted.

---

**Q28: OWASP Top 10 — give me the Node-specific versions you've actually handled.**

Pick 5–6 and be concrete (matches your remediation story):

1. **Injection — NoSQL flavor:** `db.users.find({ email: req.body.email, pass: req.body.pass })` with body `{"pass": {"$gt": ""}}` → auth bypass. Fix: validate types (zod), `mongo-sanitize`, never pass raw objects into queries.
2. **Broken access control (IDOR):** `/bills/:id` fetching by ID without an owner check. Fix: `WHERE id = ? AND user_id = ?` — ownership in the query itself.
3. **Broken authentication:** long-lived JWTs, no rotation, tokens in localStorage → Q27 fixes.
4. **SSRF:** any endpoint fetching a user-supplied URL (webhook testers, image fetch) → attacker reads cloud metadata (`169.254.169.254`). Fix: URL allowlist, block private IP ranges, egress proxy.
5. **Prototype pollution (Node-specific):** deep-merge of user JSON setting `__proto__.isAdmin = true`. Fix: `Object.create(null)` maps, patched merge libs, freeze prototypes, validate keys.
6. **Vulnerable dependencies:** lockfile + `npm audit` in CI + rapid patching (name a real one you handled if probed).
7. **Security misconfiguration:** stack traces in prod responses, permissive CORS, missing headers → Q22/Q26.

---

**Q29: How do you manage secrets and configuration?**

- **Never in git** — including "just for now." `.env` is for local dev only, gitignored, with a committed `.env.example` of keys-without-values.
- **Production:** a secret manager — AWS Parameter Store/Secrets Manager (my stack at UTEC: SAM injected Parameter Store refs into Lambda env), GCP Secret Manager, or K8s Secrets (base64 ≠ encryption — pair with encryption-at-rest/External Secrets Operator).
- **Pattern:** validate config at boot with a schema so a missing var fails fast at startup, not at 2 AM mid-request:

```js
const { cleanEnv, str, num, url } = require('envalid');
const env = cleanEnv(process.env, {
  DATABASE_URL: url(),
  JWT_PRIVATE_KEY: str(),
  REDIS_URL: url(),
  PORT: num({ default: 3000 }),
});
```

- **Rotation:** secrets have TTLs; design for hot-reload or rolling restarts. **Blast-radius:** per-service credentials, least-privilege DB users (the API user can't `DROP TABLE`). PCI angle: key management/rotation is an explicit PCI DSS requirement family — one sentence of awareness lands well (§5.8).

---

**Q30: Design rate limiting for a payments API. In-memory vs Redis? What do you limit on?**

- **In-memory (`express-rate-limit` default):** fine for one process; useless across replicas — each pod has its own counters, so N pods = N× the intended limit. State it; it's the trap.
- **Distributed:** counters in **Redis**. Two algorithms to know:
  - **Fixed window** (INCR + EXPIRE): cheap, but bursts at window edges (2× limit straddling the boundary).
  - **Sliding window log** (sorted set of timestamps): accurate, slightly costlier — right for payment endpoints. Full implementation = machine-coding task §9-MC1.
- **What to key on (layered):** per-IP (bot floods), per-user/token (abuse), per-endpoint class (login/OTP get the tightest limits — credential stuffing & OTP-bombing are fintech-specific threats), plus per-downstream (protect the bank/biller API you call — a *client-side* limiter/circuit breaker).
- **Responses:** `429` + `Retry-After` + `RateLimit-*` headers; **fail-open vs fail-closed** decision if Redis is down — for login/OTP fail-closed (security), for reads fail-open (availability). Naming that trade-off unprompted is a senior marker.

---
<a id="sec4"></a>
## 4. 🐍 Python + Shell Crash Course for Batch/Cron — PRIORITY GAP

> The JD asks for "2+ years of experience writing batch/cron jobs using Python and Shell scripting." You have ~0 years of Python. **This section exists so that gap costs you at most 5 awkward seconds instead of the offer.**

### 4.1 The honest framing script (memorize the shape, not the words)

**Never claim the 2 years.** A single follow-up ("which Python version? used pandas? virtualenv or poetry?") exposes it, and in an agency pipeline a caught exaggeration is fatal. Instead:

> **"How much Python and Shell experience do you have?"**
> "Straight answer: my production batch and cron experience is in **Node.js**, not Python. At UltraTech I ran scheduled jobs as EventBridge-cron Lambdas — settlement-style data syncs, notification digests, SQS batch consumers with DLQs — and at P&G I ran a large batch migration on Azure Functions, where I solved the classic batch problems: overlapping runs, idempotency, checkpointing, reconciliation of ~100K records. So the *discipline* of batch jobs — scheduling, locking, retries, exit codes, alerting — I've done for years. The *syntax* I've been closing deliberately: I've written a set of Python and shell scripts recently — log rotation, CSV reconciliation, a retry-with-backoff poller, DB backups. Python is a smaller language than JavaScript; give me a fortnight in your codebase and you won't be able to tell this was a gap."

Why this works: leads with truth (credibility), immediately supplies **equivalent experience** (the interviewer's real question is "can you own our cron jobs?"), shows **initiative already taken**, and ends confident, not apologetic.

**If they push ("but the JD requires it"):** "Understood — if Python fluency is the bar, test me on it today: happy to write any of those scripts live." (You can, after this section.)

---

### 4.2 Python in 20 minutes — the primer that makes the scripts readable

```python
#!/usr/bin/env python3
"""Every construct you need for batch scripts, in one runnable file."""
import os, sys, json, csv, time, logging
from datetime import datetime, timedelta, timezone
from pathlib import Path

# --- variables & types (dynamic, like JS but stricter: no implicit coercion)
amount_paise = 99950                  # int — snake_case is the convention
user = {"name": "Onkar", "cards": ["AU", "HDFC"]}   # dict ≈ JS object
bills = [1200.50, 890.00, 15000.75]  # list ≈ JS array

# --- f-strings ≈ template literals
print(f"{user['name']} owes ₹{sum(bills):,.2f}")

# --- blocks by INDENTATION, no braces; 'elif' not 'else if'
for i, b in enumerate(bills):         # enumerate ≈ .entries()
    if b > 10000:
        print(f"bill {i}: large")
    elif b > 1000:
        print(f"bill {i}: medium")

# --- comprehensions ≈ map/filter in one
large = [b for b in bills if b > 1000]          # filter
paise = [int(b * 100) for b in bills]           # map
by_id = {i: b for i, b in enumerate(bills)}     # dict comprehension

# --- functions: def, default args, no 'return undefined' weirdness
def retry_delay(attempt: int, base: float = 1.0) -> float:
    return base * (2 ** attempt)      # ** is exponent

# --- try/except ≈ try/catch; 'finally' same; exceptions are typed
try:
    data = json.loads('{"status": "SUCCESS"}')   # JSON.parse
except json.JSONDecodeError as e:
    print(f"bad json: {e}", file=sys.stderr)
    sys.exit(1)                        # non-zero exit code = failure (cron cares!)

# --- files: 'with' auto-closes (≈ try/finally + close)
with open("out.txt", "w") as f:
    f.write("done\n")

# --- pathlib + datetime — batch-job bread and butter
cutoff = datetime.now(timezone.utc) - timedelta(days=30)
for p in Path(".").glob("*.log"):
    if datetime.fromtimestamp(p.stat().st_mtime, tz=timezone.utc) < cutoff:
        print(f"would delete {p}")

# --- entry-point guard ≈ require.main === module
if __name__ == "__main__":
    print("running as a script")
```

**The five stumbling blocks for a JS dev (say these if asked "what's different?"):** indentation is syntax; `snake_case`; no `===` (Python `==` is already strict, `is` checks identity); truthiness includes empty list/dict/string; and default sync execution — no event loop unless you opt into `asyncio` (batch scripts rarely need it — that's a *feature* for cron work).

### 4.3 Python ↔ Node syntax cheat sheet

| Concept | Node.js | Python |
|---|---|---|
| Print | `console.log(x)` | `print(x)` |
| String interp | `` `Hi ${name}` `` | `f"Hi {name}"` |
| Array/List | `arr.push(x)` / `arr.length` | `lst.append(x)` / `len(lst)` |
| Slice | `arr.slice(1, 3)` | `lst[1:3]` (also `lst[-1]` = last) |
| Map / Filter | `arr.map(f)` / `arr.filter(f)` | `[f(x) for x in lst]` / `[x for x in lst if p(x)]` |
| Reduce | `arr.reduce((a,b)=>a+b, 0)` | `sum(lst)` / `functools.reduce` |
| Object/Dict | `obj.key` / `obj['key']` | `d['key']` / `d.get('key', default)` |
| Iterate object | `Object.entries(o)` | `d.items()` |
| Spread/merge | `{...a, ...b}` | `{**a, **b}` (or `a \| b` in 3.9+) |
| Arrow / lambda | `x => x * 2` | `lambda x: x * 2` (single expression only) |
| Null | `null` / `undefined` | `None` (check: `if x is None`) |
| Ternary | `a ? b : c` | `b if a else c` |
| Try/catch | `try {} catch (e) {}` | `try: ... except ValueError as e: ...` |
| JSON | `JSON.parse` / `JSON.stringify` | `json.loads` / `json.dumps` |
| Read file | `fs.readFileSync(p, 'utf8')` | `Path(p).read_text()` |
| HTTP call | `fetch(url)` | `requests.get(url)` (lib) / `urllib.request` (stdlib) |
| Env var | `process.env.KEY` | `os.environ.get('KEY')` |
| CLI args | `process.argv` | `sys.argv` (or `argparse`) |
| Exit code | `process.exit(1)` | `sys.exit(1)` |
| Sleep | `await new Promise(r => setTimeout(r, 1000))` | `time.sleep(1)` |
| Packages | `npm i x` → `package.json` | `pip install x` → `requirements.txt` |
| Isolation | `node_modules` per project | **virtualenv**: `python -m venv .venv && source .venv/bin/activate` |
| Run script | `node job.js` | `python3 job.py` |
| Entry guard | `require.main === module` | `if __name__ == "__main__":` |

### 4.4 Cron — syntax, tooling choices, and the fintech gotchas

**The five fields (memorize the mnemonic "minute hour dom month dow"):**

```
┌───────── minute        (0–59)
│ ┌─────── hour          (0–23)
│ │ ┌───── day of month  (1–31)
│ │ │ ┌─── month         (1–12)
│ │ │ │ ┌─ day of week   (0–6, Sun=0)
│ │ │ │ │
* * * * *  command
```

| Expression | Meaning |
|---|---|
| `0 2 * * *` | daily at 02:00 (classic batch window) |
| `*/15 * * * *` | every 15 minutes |
| `0 9 * * 1-5` | weekdays at 09:00 (bill reminders!) |
| `0 0 1 * *` | 1st of every month, midnight (statement generation) |
| `30 23 * * 0` | Sundays 23:30 (weekly reconciliation) |

Commands: `crontab -e` (edit), `crontab -l` (list); system-wide: `/etc/cron.d/`. Redirect output or lose it: `0 2 * * * /opt/jobs/backup.sh >> /var/log/backup.log 2>&1`.

**node-cron vs system cron vs cloud schedulers — the comparison they'll actually ask:**

| | `node-cron` (in-process) | system cron (crontab) | Cloud Scheduler / EventBridge |
|---|---|---|---|
| Runs where | Inside your Node app | On the host OS | Managed cloud service |
| Survives app crash | ❌ dies with the process | ✅ | ✅ |
| **Multiple replicas** | ❌ **every pod fires** → duplicate jobs unless you add a distributed lock | ⚠️ per-machine | ✅ single trigger, fans out via Pub/Sub/SQS or hits one endpoint |
| Observability | Your app logs | Mail/log files, easy to lose | Built-in metrics, retries, DLQ |
| Best for | Dev, single-instance apps, tiny periodic cache refresh | Single VMs, ops scripts (backups) | **Production fintech jobs** — my default |

> **Model answer:** "At UTEC every scheduled job was an EventBridge cron rule triggering a Lambda — settlement-style syncs, digest notifications. In K8s I'd use a **CronJob** object or GCP Cloud Scheduler → Pub/Sub. I avoid in-process node-cron in replicated services because every replica fires — unless I add a Redis `SET NX` lock so only one instance wins (§6-Q20). "

**Fintech cron gotchas (drop any one of these to sound like you've been burned):**
1. **Timezone:** servers run UTC; "9 AM reminder" means 03:30 UTC. Store schedule TZ explicitly (`CRON_TZ=Asia/Kolkata` / scheduler timezone field). DST doesn't affect IST, but your GCP region defaults will.
2. **Overlap:** job still running when the next tick fires → double processing. Fix: lockfile (`flock -n`), Redis lock, or K8s CronJob `concurrencyPolicy: Forbid`.
3. **Missed runs:** machine down at 02:00 → job never ran. Cloud schedulers retry; cron doesn't. Design jobs to **catch up from last checkpoint**, not "process yesterday."
4. **Idempotency:** every batch job must be safe to re-run — the P&G migration lesson (STAR-4).

---
### 4.5 Eight practice scripts (write each once by hand before the interview)

Progress: [ ] 1 · [ ] 2 · [ ] 3 · [ ] 4 · [ ] 5 · [ ] 6 · [ ] 7 · [ ] 8

**Script 1 — Log rotation (Shell).** *Compress logs older than 1 day, delete archives older than 30; safe to re-run.*

<details>
<summary>✍️ Solution</summary>

```bash
#!/usr/bin/env bash
# rotate-logs.sh — cron: 0 1 * * * /opt/jobs/rotate-logs.sh >> /var/log/rotate.log 2>&1
set -euo pipefail                 # die on error/unset var/pipe failure — say this line out loud

LOG_DIR="${1:-/var/log/myapp}"
KEEP_DAYS=30

echo "[$(date -Is)] rotating in $LOG_DIR"

# compress *.log older than 1 day (skip already-gzipped)
find "$LOG_DIR" -name "*.log" -type f -mtime +0 -print0 |
  while IFS= read -r -d '' f; do
    gzip -9 "$f" && echo "gzipped: $f"
  done

# delete old archives
find "$LOG_DIR" -name "*.log.gz" -type f -mtime +"$KEEP_DAYS" -delete -print

echo "[$(date -Is)] done"
```

**Talking points:** `set -euo pipefail` (the professional tell), `find -mtime` day semantics, `-print0/read -d ''` for spaces in names, idempotent by construction. Bonus: "in real life I'd reach for `logrotate` with a config in `/etc/logrotate.d/` — copy/compress/rotate/postrotate signals — and only script it when logrotate isn't available."

</details>

**Script 2 — CSV reconciliation job (Python).** *Compare internal transactions vs gateway settlement file; report missing/mismatched. The single most CheQ-relevant script here.*

<details>
<summary>✍️ Solution</summary>

```python
#!/usr/bin/env python3
"""reconcile.py — usage: python3 reconcile.py internal.csv gateway.csv
CSV columns: txn_id,amount,status
Exit codes: 0 = reconciled, 2 = discrepancies (cron alerts on non-zero)."""
import csv, sys
from pathlib import Path

def load(path: str) -> dict:
    """txn_id -> (amount_paise, status). Integers for money — never float."""
    out = {}
    with open(path, newline="") as f:
        for row in csv.DictReader(f):
            out[row["txn_id"]] = (round(float(row["amount"]) * 100), row["status"].upper())
    return out

def main() -> int:
    ours, theirs = load(sys.argv[1]), load(sys.argv[2])

    missing_at_gateway = ours.keys() - theirs.keys()      # set ops — clean & fast
    unknown_to_us      = theirs.keys() - ours.keys()
    mismatched = [
        (t, ours[t], theirs[t])
        for t in ours.keys() & theirs.keys()
        if ours[t] != theirs[t]
    ]

    with open("recon_report.csv", "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["type", "txn_id", "ours", "gateway"])
        for t in sorted(missing_at_gateway): w.writerow(["MISSING_AT_GATEWAY", t, ours[t], ""])
        for t in sorted(unknown_to_us):      w.writerow(["UNKNOWN_TO_US", t, "", theirs[t]])
        for t, o, g in mismatched:           w.writerow(["MISMATCH", t, o, g])

    total = len(missing_at_gateway) + len(unknown_to_us) + len(mismatched)
    print(f"checked={len(ours)} discrepancies={total} -> recon_report.csv")
    return 2 if total else 0

if __name__ == "__main__":
    sys.exit(main())
```

**Talking points:** money as integer paise; dict-key **set operations** for the three discrepancy classes; non-zero exit so cron/scheduler alerting fires; in production this reads from MySQL + SFTP and writes to a recon table (§5.6 explains the domain).

</details>

**Script 3 — Retry-with-backoff API poller (Python).** *Poll a status endpoint until terminal state; exponential backoff + jitter; give up after N attempts.*

<details>
<summary>✍️ Solution</summary>

```python
#!/usr/bin/env python3
"""poll_status.py — poll a payment-status API until SUCCESS/FAILED."""
import json, random, sys, time, urllib.request, urllib.error

URL = "https://api.example.com/v1/payments/{txn}/status"
TERMINAL = {"SUCCESS", "FAILED", "EXPIRED"}
MAX_ATTEMPTS, BASE, CAP = 8, 1.0, 60.0

def fetch_status(txn: str) -> str:
    req = urllib.request.Request(URL.format(txn=txn), headers={"Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=10) as resp:      # stdlib only
        return json.load(resp)["status"]

def poll(txn: str) -> str:
    for attempt in range(MAX_ATTEMPTS):
        try:
            status = fetch_status(txn)
            if status in TERMINAL:
                return status
            reason = f"non-terminal: {status}"
        except (urllib.error.URLError, TimeoutError, KeyError) as e:
            reason = f"error: {e}"
        delay = min(CAP, BASE * (2 ** attempt)) * random.uniform(0.5, 1.5)  # jitter!
        print(f"attempt {attempt + 1}/{MAX_ATTEMPTS} ({reason}); sleeping {delay:.1f}s")
        time.sleep(delay)
    raise TimeoutError(f"{txn} not terminal after {MAX_ATTEMPTS} attempts")

if __name__ == "__main__":
    try:
        print(poll(sys.argv[1] if len(sys.argv) > 1 else "TXN123"))
    except TimeoutError as e:
        print(e, file=sys.stderr); sys.exit(3)     # distinct exit code → page on-call
```

**Talking points:** exponential backoff **with jitter** (herd of pollers must not synchronize — same reasoning as SQS/Lambda retries you've configured), cap on delay, distinct exit codes per failure mode, and "in Node this is my §9-P10 retry util — identical shape."

</details>

**Script 4 — MySQL backup (Shell).** *Nightly dump, compress, upload, prune; fail loudly.*

<details>
<summary>✍️ Solution</summary>

```bash
#!/usr/bin/env bash
# db-backup.sh — cron: 30 2 * * * /opt/jobs/db-backup.sh >> /var/log/db-backup.log 2>&1
set -euo pipefail

DB="cheq_prod"; BACKUP_DIR="/backups"; KEEP_DAYS=14
STAMP="$(date +%F_%H%M)"                       # 2026-07-14_0230
OUT="$BACKUP_DIR/${DB}_${STAMP}.sql.gz"

trap 'echo "[FATAL] backup failed at line $LINENO" >&2' ERR   # loud failure for cron mail/alerts

mkdir -p "$BACKUP_DIR"

# credentials from ~/.my.cnf or env — NEVER inline -p'password' (visible in `ps`!)
mysqldump --single-transaction --routines --triggers "$DB" | gzip -6 > "$OUT"

# verify non-trivial size before trusting it
[ "$(stat -c%s "$OUT")" -gt 10240 ] || { echo "backup suspiciously small" >&2; exit 1; }

aws s3 cp "$OUT" "s3://cheq-db-backups/$(date +%Y/%m)/" --only-show-errors
# GCP equivalent: gsutil cp "$OUT" gs://cheq-db-backups/...

find "$BACKUP_DIR" -name "${DB}_*.sql.gz" -mtime +"$KEEP_DAYS" -delete -print
echo "[$(date -Is)] OK -> $OUT"
```

**Talking points:** `--single-transaction` = consistent InnoDB snapshot **without locking tables** (the line that proves you understand it); password never on the command line; size sanity check; `trap ... ERR`; offsite copy; and "a backup isn't a backup until you've tested restore — I'd schedule a monthly restore drill."

</details>

**Script 5 — Settlement report generator (Python).** *Query yesterday's transactions, aggregate by status, emit CSV + summary. Runnable via sqlite3; swap connector for MySQL.*

<details>
<summary>✍️ Solution</summary>

```python
#!/usr/bin/env python3
"""settlement_report.py — daily 06:00 job. Uses sqlite3 so you can run it as-is;
in prod: import pymysql / mysql-connector and change the connect() line only."""
import csv, sqlite3
from datetime import date, timedelta

def main():
    conn = sqlite3.connect("payments.db")
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    # --- demo seed (delete in prod) ---
    cur.executescript("""
      CREATE TABLE IF NOT EXISTS transactions(
        txn_id TEXT PRIMARY KEY, user_id INT, amount_paise INT,
        status TEXT, created_at TEXT);
      INSERT OR IGNORE INTO transactions VALUES
        ('T1', 1, 99950, 'SUCCESS', date('now','-1 day')),
        ('T2', 2, 450000, 'SUCCESS', date('now','-1 day')),
        ('T3', 1, 120000, 'FAILED',  date('now','-1 day')),
        ('T4', 3, 78000,  'PENDING', date('now','-1 day'));
    """)

    day = (date.today() - timedelta(days=1)).isoformat()
    cur.execute("""
        SELECT status, COUNT(*) AS n, COALESCE(SUM(amount_paise), 0) AS total_paise
        FROM transactions
        WHERE date(created_at) = ?          -- parameterized, never f-strings in SQL
        GROUP BY status ORDER BY status
    """, (day,))
    rows = cur.fetchall()

    out = f"settlement_{day}.csv"
    with open(out, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["date", "status", "count", "total_inr"])
        for r in rows:
            w.writerow([day, r["status"], r["n"], f'{r["total_paise"] / 100:.2f}'])

    total = sum(r["total_paise"] for r in rows if r["status"] == "SUCCESS")
    print(f"{out}: success volume ₹{total/100:,.2f} across {sum(r['n'] for r in rows)} txns")

if __name__ == "__main__":
    main()
```

**Talking points:** parameterized SQL (injection — even in batch jobs), yesterday-window logic, money formatting only at the output edge, and where it fits in the settlement flow (§5.6: this is the file ops/finance reconciles against the bank's).

</details>

**Script 6 — File watcher (Python).** *Watch an SFTP-drop directory; process new settlement files exactly once.*

<details>
<summary>✍️ Solution</summary>

```python
#!/usr/bin/env python3
"""watch_inbox.py — stdlib polling watcher. Prod alternatives: `watchdog` lib
(inotify), or better: event-driven (S3 event → Lambda / GCS → Pub/Sub)."""
import shutil, time
from pathlib import Path

INBOX, PROCESSED, FAILED = Path("inbox"), Path("processed"), Path("failed")
for d in (INBOX, PROCESSED, FAILED): d.mkdir(exist_ok=True)

def is_stable(p: Path, wait: float = 2.0) -> bool:
    """Upload might still be in progress — size must be unchanged across `wait`."""
    s1 = p.stat().st_size; time.sleep(wait); return p.stat().st_size == s1

def process(p: Path) -> None:
    print(f"processing {p.name} ({p.stat().st_size} bytes)")
    # ... parse & load (Script 2's reconciler would be called here) ...

def main():
    print(f"watching {INBOX.resolve()}")
    while True:
        for p in sorted(INBOX.glob("*.csv")):
            if not is_stable(p):
                continue                      # still uploading; next pass
            try:
                process(p)
                shutil.move(str(p), PROCESSED / p.name)   # move = the "exactly once" marker
            except Exception as e:
                print(f"FAILED {p.name}: {e}")
                shutil.move(str(p), FAILED / p.name)      # quarantine, don't retry-loop
        time.sleep(5)

if __name__ == "__main__":
    main()
```

**Talking points:** the **partial-upload race** (`is_stable` — real SFTP-drop bug), move-after-process as the idempotency marker, quarantine directory instead of infinite retry, and the senior close: "if I control the source, I'd make this event-driven instead of polling."

</details>

**Script 7 — Bulk reminder job (Python).** *Send due-bill reminders in batches; rate-limited; idempotent per (user, bill, day); dry-run flag.*

<details>
<summary>✍️ Solution</summary>

```python
#!/usr/bin/env python3
"""send_reminders.py — cron: 0 9 * * * (IST! set CRON_TZ=Asia/Kolkata)
usage: python3 send_reminders.py due_bills.csv [--dry-run]"""
import csv, sys, time
from datetime import date
from pathlib import Path

BATCH, PER_SECOND = 50, 10
SENT_LOG = Path(f"sent_{date.today().isoformat()}.log")   # per-day idempotency ledger

def already_sent() -> set:
    return set(SENT_LOG.read_text().split()) if SENT_LOG.exists() else set()

def send(user_id: str, bill_id: str, amount: str, dry: bool) -> None:
    if dry:
        print(f"[dry-run] would remind user={user_id} bill={bill_id} ₹{amount}")
        return
    # real impl: provider SDK / SMTP / push. Point to make: provider must get an
    # idempotency key too: f"reminder-{bill_id}-{date.today()}"
    print(f"sent -> user={user_id} bill={bill_id}")

def main():
    dry = "--dry-run" in sys.argv
    sent = already_sent()
    with open(sys.argv[1], newline="") as f:
        rows = [r for r in csv.DictReader(f) if r["bill_id"] not in sent]

    print(f"{len(rows)} to send ({len(sent)} already done today)")
    with SENT_LOG.open("a") as ledger:
        for i, r in enumerate(rows):
            send(r["user_id"], r["bill_id"], r["amount"], dry)
            if not dry:
                ledger.write(r["bill_id"] + "\n"); ledger.flush()  # checkpoint EVERY send
            if (i + 1) % PER_SECOND == 0: time.sleep(1)            # crude rate limit
            if (i + 1) % BATCH == 0: print(f"progress: {i + 1}/{len(rows)}")

if __name__ == "__main__":
    main()
```

**Talking points:** the **sent-ledger makes a crashed run resumable** (checkpointing — same pattern as your P&G batch fix), flush-per-send so a crash loses ≤1 record, dry-run as a batch-job norm, rate limiting to protect the notification provider, and timezone (9 AM IST, not UTC).

</details>

**Script 8 — Cleanup job (Shell).** *Purge temp/export files older than 7 days, warn on low disk; the "smallest real cron job" they might ask you to write live.*

<details>
<summary>✍️ Solution</summary>

```bash
#!/usr/bin/env bash
# cleanup.sh — cron: 0 3 * * * /opt/jobs/cleanup.sh >> /var/log/cleanup.log 2>&1
set -euo pipefail

TARGETS=("/tmp/exports" "/var/myapp/tmp")
DAYS=7; DISK_ALERT=85

for dir in "${TARGETS[@]}"; do
  [ -d "$dir" ] || continue
  echo "[$(date -Is)] cleaning $dir"
  find "$dir" -type f -mtime +"$DAYS" -delete -print | wc -l | xargs echo "files removed:"
  find "$dir" -mindepth 1 -type d -empty -delete      # then empty dirs
done

USED=$(df --output=pcent / | tail -1 | tr -dc '0-9')
if [ "$USED" -ge "$DISK_ALERT" ]; then
  echo "[WARN] disk at ${USED}% (threshold ${DISK_ALERT}%)" >&2
  exit 1          # non-zero → alerting picks it up
fi
echo "[$(date -Is)] disk at ${USED}% — OK"
```

**Talking points:** arrays + quoting in bash, files-then-empty-dirs order, `df --output=pcent` parsing, threshold + non-zero exit as the alert hook. If asked to write shell live, this is the shape to reproduce.

</details>

---
<a id="sec5"></a>
## 5. 💳 Fintech Domain Primer — Speak CheQ's Language

> You don't need to be a payments veteran; you need to show you **think in payments failure modes**. Each concept below ends with the likely interview question it unlocks.

### 5.1 Credit card bill payment flow (CheQ's core loop)

```
User (CheQ app)
  │ 1. Fetch bill (biller/BBPS* fetch: amount due, min due, due date)
  ▼
CheQ backend ── 2. create PaymentIntent (state=INITIATED, idempotency key) ──► DB
  │ 3. Collect funds: UPI / wallet / netbanking via PSP (payment gateway)
  ▼
PSP/Bank rails ── 4. webhook: payment.captured ──► CheQ (verify signature! §5.3)
  │ 5. Remit to card issuer via biller rails (BBPS/NPCI Bharat Connect for CC bills)
  ▼
Issuer posts credit to the card account (can take hours → user anxiety → status polling,
  proactive notifications, and a well-designed PENDING experience matter)
  │ 6. T+1/T+2: settlement files → reconciliation (§5.6) → rewards (CheQ Chips) release
```

*BBPS = Bharat Bill Payment System (NPCI's interoperable bill rails; credit-card bill category is why apps like CheQ/Cred can pay any bank's bill). Two-phase reality to internalize: **collection** (user→CheQ) and **remittance** (CheQ→issuer) are separate legs that fail independently — most of the hard engineering is in the gap between them.*

> **Likely Q: "Design the happy path and the two ugliest failure modes of a bill payment."**
> Happy path above. Ugly #1: **collected but remittance failed** → money with us, bill unpaid → auto-retry remittance with backoff; if still failing, refund + alert; never leave the state ambiguous. Ugly #2: **webhook lost** (PSP sent, we were down) → payment stuck INITIATED → periodic **status-poll sweeper** for stale intents (poller = §4 Script 3) reconciles the truth from the PSP API. Both answers hinge on the state machine (§5.4) + idempotency (§5.2).

### 5.2 Idempotency keys — the #1 payments interview topic

**Problem:** user taps Pay, request times out, client retries → **double charge** without protection.
**Solution:** client generates a key (UUID) per logical payment; server stores the first result under that key and replays it for any retry.

```js
// Express middleware sketch — the shape matters more than the details
app.post('/payments', async (req, res) => {
  const key = req.get('Idempotency-Key');
  if (!key) return res.status(400).json({ error: { code: 'IDEMPOTENCY_KEY_REQUIRED' } });

  // Atomic claim: only ONE request per key wins the right to execute.
  // NX = only-if-absent; value marks "in progress"; TTL bounds crash leaks.
  const claimed = await redis.set(`idem:${key}`, 'PROCESSING', 'NX', 'EX', 86400);
  if (!claimed) {
    const saved = await redis.get(`idem:${key}`);
    if (saved === 'PROCESSING')
      return res.status(409).json({ error: { code: 'RETRY_LATER' } }); // original still running
    return res.status(200).json(JSON.parse(saved));                    // replay stored response
  }

  const result = await paymentService.execute(req.body);               // the real work, once
  await redis.set(`idem:${key}`, JSON.stringify(result), 'EX', 86400);
  res.status(201).json(result);
});
```

Details that score: the claim must be **atomic** (`SET NX`, or a DB unique constraint on the key column — the DB version survives Redis loss and is what I'd use for money); same key + *different* body should be rejected (422) by storing a request hash; retries must also flow through to the **PSP** (gateways accept idempotency keys too — end-to-end, not just at your edge).

> **Likely Q: "User double-taps Pay — walk me through exactly why they aren't charged twice."** — Answer with the above, end-to-end: client key → server claim → PSP key.

### 5.3 Webhooks + signature verification

Webhooks are unauthenticated-by-default HTTP calls into your system claiming "money moved." Verify or be spoofed:

```js
const crypto = require('crypto');

// ⚠️ Must verify against the RAW body — re-serialized JSON breaks the HMAC.
app.post('/webhooks/psp', express.raw({ type: 'application/json' }), (req, res) => {
  const expected = crypto.createHmac('sha256', process.env.PSP_WEBHOOK_SECRET)
                         .update(req.body)              // req.body is a Buffer here
                         .digest('hex');
  const given = req.get('x-psp-signature') || '';
  const ok = given.length === expected.length &&
             crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected));
  if (!ok) return res.status(401).end();

  const event = JSON.parse(req.body);
  enqueue(event);            // ack fast (2xx), process async — PSPs retry slow endpoints
  res.status(200).end();
});
```

Checklist: raw body, `timingSafeEqual` (timing attacks), **fast 2xx then async processing**, **idempotent handling** (PSPs deliver at-least-once — dedupe on event id), out-of-order tolerance (a `captured` can arrive after a `refunded`; let the state machine reject invalid transitions), and replay defense via a signed timestamp window.

> **Likely Q: "How do you secure and harden a payment webhook endpoint?"** — the checklist above, in that order.

### 5.4 Transaction state machines

Never a bare `status` string mutated ad hoc — an explicit machine with legal transitions:

```
INITIATED ──► COLLECT_PENDING ──► COLLECTED ──► REMIT_PENDING ──► SUCCESS
     │               │                │               │             │
     ▼               ▼                ▼               ▼             ▼
  EXPIRED         FAILED          REFUND_PENDING ◄── REMIT_FAILED  REFUNDED
                                       └──────────► REFUNDED   (chargeback path too)
```

```js
const TRANSITIONS = {
  INITIATED:       ['COLLECT_PENDING', 'EXPIRED'],
  COLLECT_PENDING: ['COLLECTED', 'FAILED'],
  COLLECTED:       ['REMIT_PENDING', 'REFUND_PENDING'],
  REMIT_PENDING:   ['SUCCESS', 'REMIT_FAILED'],
  REMIT_FAILED:    ['REMIT_PENDING', 'REFUND_PENDING'],   // retry or bail out
  REFUND_PENDING:  ['REFUNDED'],
  SUCCESS: [], REFUNDED: [], FAILED: [], EXPIRED: [],     // terminal
};

async function transition(txnId, from, to) {
  if (!TRANSITIONS[from]?.includes(to))
    throw new AppError(409, 'ILLEGAL_TRANSITION', `${from} → ${to}`);
  // Optimistic-concurrency UPDATE: only succeeds if still in `from`.
  const [r] = await db.execute(
    'UPDATE transactions SET status = ?, updated_at = NOW() WHERE id = ? AND status = ?',
    [to, txnId, from]);
  if (r.affectedRows === 0) throw new AppError(409, 'STALE_STATE', 'concurrent update');
  await audit.log(txnId, from, to);          // append-only history — audit + debugging
}
```

Why it matters: makes duplicate/out-of-order webhooks harmless (illegal transition → rejected), makes "where can money get stuck?" answerable (every non-terminal state gets a sweeper + SLA), and the `WHERE status = ?` guard is your concurrency story in one line.

> **Likely Q: "Two webhooks for the same payment arrive at the same time — what happens?"** — Both try `COLLECT_PENDING → COLLECTED`; one row-update wins, the other affects 0 rows and is rejected as stale. No locks needed beyond the atomic UPDATE.

### 5.5 Double-entry basics (enough to sound literate)

Every money movement writes **two entries — a debit and a credit — that always sum to zero**. Nothing is ever UPDATE-d; corrections are new reversing entries (append-only ledger).

| Ledger entry (₹4,500 bill payment, ₹10 fee) | Debit | Credit |
|---|---|---|
| User wallet (liability ↓) | 4,510 | |
| Payable-to-issuer (liability ↑) | | 4,500 |
| Fee revenue | | 10 |

Why interviewers care: the invariant (`SUM(debits) = SUM(credits)`, always) makes bugs *detectable* — if the books don't balance, code is wrong, full stop. Vocabulary: journal entry, account, posting, trial balance. One sentence of humility works: "I haven't built a ledger service, but I know the invariant and why fintechs insist on append-only double entries — and I'd never model balances as a mutable column that code `+=`s."

> **Likely Q: "How would you store user wallet balances?"** — Balance = **derived** from the entries (`SUM` over postings, with periodic snapshots for speed), not a source-of-truth column. Concurrency: append entries in a DB transaction; balance checks via `SELECT ... FOR UPDATE` on the snapshot or a constraint.

### 5.6 Reconciliation & settlement

- **Settlement:** the PSP/bank actually moving your money, in batches — T+1/T+2, cut-off times, MDR/fees deducted, one lump credit for thousands of transactions.
- **Reconciliation:** proving three views agree — **(1)** your DB, **(2)** PSP/gateway settlement file, **(3)** bank statement ("3-way recon"). Daily batch job (typically Python — this is *exactly* the JD's batch/cron line) that classifies breaks:

| Break | Meaning | Action |
|---|---|---|
| In ours, not in PSP file | Stuck/failed payment we think succeeded | Status-poll API, fix state, maybe refund |
| In PSP file, not in ours | We lost a webhook / wrote nothing | Investigate, replay event |
| Amount/status mismatch | Partial capture, fee miscalc, currency/rounding | Manual queue + root-cause |

Your bridge: "§4 Script 2 is my hand-rolled version of this recon job; at P&G I wrote reconciliation scripts to verify a 100K-record migration — same discipline, different domain."

> **Likely Q: "The PSP says they paid you ₹1 crore yesterday; your DB says ₹98 lakh. Go."** — Don't guess an answer; describe the recon process: pull settlement file, diff by txn-id (set operations), classify breaks per the table, sweep stuck states, and report with evidence. Process > heroics.

### 5.7 Rate limiting & fraud checks (velocity thinking)

Beyond §3-Q30's mechanics, fintech adds **velocity rules**: N payment attempts per card per hour, M new payees per day, amount caps per KYC tier, OTP-request throttles (OTP-bombing is an India-specific abuse wave), device-fingerprint + IP-reputation signals, and step-up verification (extra OTP) rather than hard-block for gray cases. Architecture point: rules evaluate on **Redis counters/sorted sets** in the hot path (<10 ms budget), with async ML scoring downstream; borderline → step-up, clear fraud → block + case queue.

> **Likely Q: "How would you stop someone testing 500 stolen cards through us?"** — per-device/per-IP velocity counters in Redis, exponential cooldowns, BIN-country/device mismatch signals, step-up auth, and an async review queue; emphasize you'd tune thresholds with the fraud/risk team, not alone.

### 5.8 PCI DSS awareness (they are certified; you must not sound naive)

- **What it is:** the card industry's security standard (12 requirement families: network segmentation, encryption at rest/in transit, access control, logging/monitoring, vulnerability management, secure SDLC…). Applies to anyone storing/processing/transmitting **cardholder data**.
- **The developer's golden rule: shrink scope.** Never let raw PANs touch your systems — use the PSP's **tokenization** (India's RBI card-on-file tokenization mandate pushed this ecosystem-wide); store only tokens + last-4 + network. No PAN in logs (log-scrubbing middleware), no card data in analytics events, TLS everywhere, secrets in a manager (§3-Q29), quarterly scans + annual **VAPT**.
- **Your hook:** "I've been on the receiving end of VAPT audits at UTEC and remediated the findings — so PCI's requirements read to me like a checklist of things I've actually done: no sensitive data in logs, access reviews, patched dependencies, audit trails."

> **Likely Q: "Have you worked in a PCI environment?"** — "Not PCI-certified specifically, but I've done the engineering equivalent — VAPT-driven remediation, OWASP hardening, audit logging — and I know the developer-facing core: keep card data out of scope via tokenization, scrub logs, encrypt, least privilege."

### 5.9 Money in JavaScript — the trap question

```js
0.1 + 0.2 === 0.3            // false — IEEE-754 floats
19.99 * 100                  // 1998.9999999999998 😱
```

**Rules:** store and compute money as **integer minor units** (paise) in `INT/BIGINT` (or `DECIMAL` in SQL — never `FLOAT/DOUBLE`); convert to rupees only at the display edge; for amounts beyond `Number.MAX_SAFE_INTEGER` (~₹90 trillion in paise — fine for retail, but say you know the boundary) use `BigInt` or a decimal library; rounding policy (banker's vs half-up) is a **product decision written down once**, not per-call-site.

> **Likely Q: "Why is `0.1 + 0.2 !== 0.3` and what does that mean for our schema?"** — binary floats can't represent decimal tenths; therefore `amount_paise BIGINT` / `DECIMAL(12,2)`, integer math in code, format at the edge.

---
<a id="sec6"></a>
## 6. 🗄️ Databases — 20 Q&A + 6 SQL Drills

**Working schema for all examples (also used in the drills):**

```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  kyc_tier TINYINT NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE transactions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  txn_ref CHAR(20) NOT NULL UNIQUE,            -- external reference
  user_id BIGINT NOT NULL,
  amount_paise BIGINT NOT NULL,                -- integer money (§5.9)
  status ENUM('INITIATED','PENDING','SUCCESS','FAILED','REFUNDED') NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_created (user_id, created_at),
  INDEX idx_status_created (status, created_at)
);
```

### 6A. MySQL (Q1–Q8)

**Q1: Explain the join types with this schema.**
- `INNER JOIN` — only matching rows both sides: *users who have transactions*.
- `LEFT JOIN` — all left rows, NULLs where no match: *all users incl. those with zero txns* (basis of drill D3).
- `RIGHT JOIN` — mirror of LEFT (rarely written; re-order tables instead).
- `CROSS JOIN` — cartesian product (every user × every status, for report scaffolding).
- `SELF JOIN` — table joined to itself (a txn to its refund parent).
Interview reflex: "users **without** transactions" = `LEFT JOIN … WHERE t.id IS NULL` or `NOT EXISTS` — say both, prefer `NOT EXISTS` on big tables (stops at first match, no NULL surprises).

**Q2: How does MySQL indexing actually work?**
InnoDB indexes are **B+trees**. The **clustered index** = the table itself, ordered by primary key (why PK choice matters; why UUIDv4 PKs fragment pages — use `AUTO_INCREMENT` or time-ordered ids). **Secondary indexes** store the indexed columns + the PK, requiring a second lookup unless the index **covers** the query. **Composite indexes** obey the **leftmost-prefix rule**: `(user_id, created_at)` serves `WHERE user_id = ?` and `WHERE user_id = ? AND created_at > ?` but **not** `WHERE created_at > ?` alone. Range column goes **last**. A **covering index** (all selected columns in the index) skips the table entirely — `EXPLAIN` shows `Using index`. Costs: writes maintain every index; don't index low-cardinality columns alone (`status` — but `(status, created_at)` for sweeper queries is fine).

**Q3: How do you diagnose a slow query?**
`EXPLAIN` (or `EXPLAIN ANALYZE` in 8.0 for actual timings): read **type** (`const` > `ref` > `range` > `index` ≫ `ALL` = full scan), **key** (index chosen — or NULL 🚨), **rows** (estimate), **Extra** (`Using filesort`/`Using temporary` = sort/group not served by an index). Process: slow-query log → `EXPLAIN` → check leftmost-prefix fit → add/adjust composite index → re-explain. Real causes I've hit: function on an indexed column (`DATE(created_at) = …` kills the index — rewrite as a range), leading-wildcard `LIKE '%x'`, implicit type conversion (string column, numeric literal), `OFFSET 100000` pagination (Q7).

**Q4: What do transactions guarantee? (ACID, InnoDB specifics)**
**A**tomicity — all-or-nothing via undo logs; **C**onsistency — constraints hold at commit; **I**solation — Q5; **D**urability — redo log (WAL) fsync'd at commit. Node usage: get one connection from the pool, `BEGIN` … `COMMIT`/`ROLLBACK` in `finally`, **never** interleave two logical flows on one connection. Fintech reflex: debit + ledger entries + state transition = one transaction (§5.4/§5.5); cross-service consistency = outbox pattern, not distributed transactions.

**Q5: Isolation levels — differences, anomalies, and what a payments system uses.**

| Level | Prevents | Still allows | Note |
|---|---|---|---|
| READ UNCOMMITTED | — | dirty reads | never |
| READ COMMITTED | dirty reads | non-repeatable reads, phantoms | common OLTP default (Postgres) |
| **REPEATABLE READ** | + non-repeatable reads | write skew; lost updates without locking | **InnoDB default**; MVCC snapshots + gap locks handle most phantoms |
| SERIALIZABLE | everything | — | throughput cost; rarely default |

The anomaly to narrate: **lost update** — two concurrent "read balance 500, subtract 300, write" flows both succeed → balance −100 in effect. MVCC alone doesn't stop it. Fixes: `SELECT … FOR UPDATE` (pessimistic row lock), atomic single statement (`UPDATE wallet SET bal = bal - 300 WHERE user_id = ? AND bal >= 300` + check affectedRows), or optimistic versioning (`WHERE version = ?`). In payments: atomic conditional UPDATE first, `FOR UPDATE` when multi-row invariants require it.

**Q6: How do deadlocks happen and how do you handle them?**
Two transactions acquire row locks in opposite orders (T1 locks A then wants B; T2 locks B then wants A). InnoDB detects and kills one (`ER_LOCK_DEADLOCK 1213`). Prevention: lock rows in a **canonical order** (sort ids before multi-row updates), keep transactions short (no external API calls inside a transaction — the classic payments bug: calling the PSP while holding row locks), use conditional atomic updates over read-modify-write. Handling: deadlock errors are **retryable by design** — wrap in a small retry (3 attempts, jitter). Saying "1213 is normal at scale; you retry" is a senior tell.

**Q7: OFFSET pagination is slow on big tables. What do you use?**
`LIMIT 20 OFFSET 100000` reads and discards 100 020 rows — O(offset), and rows shift between pages. **Keyset (cursor) pagination:**

```sql
SELECT id, txn_ref, amount_paise, status, created_at
FROM transactions
WHERE user_id = ? AND (created_at, id) < (?, ?)   -- cursor from last row of prev page
ORDER BY created_at DESC, id DESC
LIMIT 20;   -- walks idx_user_created directly; O(page) regardless of depth
```

`id` in the tuple breaks `created_at` ties (stable order). API shape: return `next_cursor` (base64 of `created_at|id`). This is the pagination used in machine-coding task §9-MC3.

**Q8: Design review: what's right/wrong with the `transactions` table above?**
Right: integer paise; `txn_ref UNIQUE` (idempotent inserts — duplicate webhook = constraint violation, not double row); composite indexes matching the two hot queries (user history; status sweepers); FK for integrity. Would add at scale: `updated_at`, append-only `transaction_events` audit table (§5.4), partitioning by month once past ~100M rows (archival + recon jobs scan bounded partitions), and read replicas for reporting with the caveat of **replica lag** (never read your own writes from a replica right after payment — bad UX bug worth mentioning).

### 6B. MongoDB (Q9–Q14)

**Q9: When Mongo over MySQL (and the reverse)?**
Mongo: flexible/evolving schema (bill formats differ per biller!), document-shaped reads (fetch user's whole card profile in one doc), horizontal scale via native sharding, high-volume event/log data. MySQL: relational integrity, multi-row invariants, mature transactional semantics — **the ledger and transactions live in MySQL; biller metadata, notification templates, user-preference docs can live in Mongo.** Answer with a split like that rather than a winner — CheQ's JD lists both, which tells you they run both.

**Q10: Write an aggregation: monthly successful spend per user, top 5, last 90 days.**

```js
db.transactions.aggregate([
  { $match: { status: 'SUCCESS',
              createdAt: { $gte: new Date(Date.now() - 90 * 864e5) } } }, // filter FIRST (uses index)
  { $group: { _id: { user: '$userId',
                     month: { $dateToString: { format: '%Y-%m', date: '$createdAt' } } },
              totalPaise: { $sum: '$amountPaise' },
              count: { $sum: 1 } } },
  { $sort: { totalPaise: -1 } },
  { $limit: 5 },
  { $project: { _id: 0, user: '$_id.user', month: '$_id.month',
                totalInr: { $divide: ['$totalPaise', 100] }, count: 1 } },
]);
```

Say the optimization rule: `$match`/`$sort` early so they ride indexes; `$project` late; check with `.explain()`; `allowDiskUse` for big groups.

**Q11: Mongo indexing — what's different from MySQL?**
Same B-tree idea, same leftmost-prefix logic, plus the **ESR rule** for compound indexes: **E**quality fields, then **S**ort fields, then **R**ange fields — `{ userId: 1, createdAt: -1 }` for "user's txns newest-first." Mongo extras worth naming: **TTL indexes** (`expireAfterSeconds` — auto-purge OTPs/sessions), **partial indexes** (`{ status: 1 }` only where `status: 'PENDING'` — tiny index for the sweeper), **unique** (idempotency keys), **text/wildcard**. Watch: index builds on huge collections (rolling builds), and the same write-cost trade-off as MySQL.

**Q12: Embed or reference? Give the decision rule.**
**Embed** what you read together and what has bounded size (a bill's line items, a user's notification preferences). **Reference** what grows without bound or is queried independently (a user's transactions — unbounded array in the user doc is the classic 16MB-document-limit horror story). Rules of thumb: 1:few → embed; 1:many-unbounded → reference; many:many → reference; "data that's accessed together should be stored together" but never unbounded arrays. Denormalize read-hot snapshot fields (store `billerName` in the txn doc at write time — historical correctness is a *feature* in payments: the name at payment time shouldn't change retroactively).

**Q13: Do MongoDB transactions exist? Would you use them?**
Yes — multi-document ACID transactions since 4.0 (replica sets) / 4.2 (sharded). But they cost: latency, lock contention, 60s default limit. The idiomatic answer: **model so single-document atomicity suffices** (a document updates atomically by itself — put the state + history array in one doc), reach for multi-doc transactions sparingly, and keep the money-critical invariants in MySQL anyway (Q9 split). Knowing they exist but preferring design-around = the senior answer.

**Q14: What are change streams? Where would you use one here?**
`db.collection.watch()` — a cursor of real-time change events (insert/update/…), built on the oplog, resumable via resume tokens. Uses: cache invalidation (§6-Q18) without app-level hooks, syncing Mongo → OpenSearch (your UTEC search pipeline story: "we did this with a pipeline into OpenSearch"), notifying on payment-status writes. Caveats: needs replica set; consumer must handle resume-token persistence; not a message queue — pair with one for fan-out.

### 6C. Redis (Q15–Q20)

**Q15: Why is Redis fast, and which data structures do you actually use?**
In-memory + single-threaded command loop (no lock contention, atomic commands) + efficient structures. Production uses: **string** (cache blobs, counters via `INCR` — rate limits), **hash** (session/user objects, `HINCRBY` for per-field counters), **list** (simple queues, `LPUSH`/`BRPOP`), **set** (dedupe, e.g. processed webhook ids), **sorted set** (leaderboards, sliding-window rate limiter §9-MC1, delayed-job queues by score=timestamp), plus TTLs on everything cacheable. Single-threaded caveat: one `KEYS *` or huge `SMEMBERS` blocks everyone — `SCAN` in production, always.

**Q16: Explain caching patterns — which do you default to?**
- **Cache-aside (lazy)** — app reads cache → miss → read DB → `SET` with TTL. Default; resilient (cache down = slow, not wrong). My UTEC pattern.
- **Read-through / write-through** — cache library sits in line with the DB; writes update both synchronously. Consistent but write-latency cost.
- **Write-behind** — write to cache, flush to DB async. Fast writes, **data-loss window — disqualified for payments**; fine for view counters.
Answer shape: "cache-aside with TTL + explicit invalidation on write (Q18); write-through only for read-heavy config; write-behind never for money."

**Q17: How do TTL and eviction work? Which policy would you set?**
TTL: `SET k v EX 300`, `EXPIRE`, `TTL k`; expiry is lazy (on access) + active sampling. Eviction when `maxmemory` hits: `noeviction` (errors on write — right for Redis-as-store: locks, idempotency keys), `allkeys-lru` (right for pure cache), `volatile-lru/ttl` (mixed workloads, evict only TTL'd keys), `allkeys-lfu` (frequency beats recency for skewed access). Interview answer: **separate Redis instances by role** — cache instance `allkeys-lru`, state instance (locks/idempotency/rate limits) `noeviction` — because one instance mixing both silently evicts your locks under memory pressure. That failure mode is a great story to *predict*.

**Q18: Cache invalidation and the stampede problem.**
Invalidation options: TTL (bounded staleness — fine for a credit-score widget), delete-on-write (`DEL user:42:summary` after update; delete, don't set — avoids write races), event-driven (change streams/CDC → invalidator), versioned keys (`user:42:v7` — bump version, old keys age out). **Stampede:** hot key expires → 5 000 concurrent misses hammer MySQL. Fixes: (1) per-key mutex — one rebuilder, others wait or serve stale (`SET rebuild:k 1 NX EX 10`); (2) **jittered TTLs** (`300 + rand(60)` — never let a whole class of keys expire in sync); (3) stale-while-revalidate — serve expired value, refresh in background; (4) pre-warm known-hot keys on deploy. Month-end bill-due spikes at CheQ are exactly where this matters — say so.

**Q19: Redis pub/sub vs Streams vs a real queue — when each?**
**Pub/sub:** fire-and-forget broadcast; **no persistence — subscriber down = message gone**. Fine: live dashboards, invalidation pings, WebSocket fan-out across nodes. **Redis Streams:** append-only log with consumer groups, acks, replay (`XADD`/`XREADGROUP`/`XACK`) — a real lightweight queue with at-least-once semantics. **SQS/Pub/Sub/Kafka:** durability SLAs, DLQs, scale (my default for payment events — my UTEC stack was SQS/SNS with DLQs). Rule: money events never ride Redis pub/sub; anything requiring "must be processed" needs acks + persistence + DLQ.

**Q20: Implement a distributed lock in Redis. What are the pitfalls?**

```js
const { randomUUID } = require('crypto');

async function withLock(redis, resource, ttlMs, fn) {
  const token = randomUUID();                       // fencing: only owner may unlock
  const ok = await redis.set(`lock:${resource}`, token, 'NX', 'PX', ttlMs);
  if (!ok) throw new Error('LOCK_HELD');
  try {
    return await fn();
  } finally {
    // atomic check-and-delete — never plain DEL (you might delete someone else's lock)
    await redis.eval(
      `if redis.call("get", KEYS[1]) == ARGV[1] then
         return redis.call("del", KEYS[1]) else return 0 end`,
      1, `lock:${resource}`, token);
  }
}
// use: cron singleton across replicas — withLock(redis, 'job:reminders:2026-07-14', 60000, run)
```

Pitfalls to name: (1) **TTL vs job duration** — job outlives lock → two holders; heartbeat-extend or size TTL generously; (2) unlock-by-token via Lua (atomicity); (3) single Redis = single point of failure — **Redlock** (quorum over 5 nodes) exists but is debated (Kleppmann's fencing-token critique); the honest senior line: "for correctness-critical mutual exclusion I put the invariant in the database (unique constraint / conditional update) and use Redis locks only to avoid duplicate *work*, not to guarantee correctness."

### 6D. Six SQL drills — write by hand, then check

Progress: [ ] D1 · [ ] D2 · [ ] D3 · [ ] D4 · [ ] D5 · [ ] D6 (schema at §6 top)

**D1. Top 5 users by successful spend, last 30 days (name + total).**

<details>
<summary>Solution</summary>

```sql
SELECT u.id, u.email, SUM(t.amount_paise) / 100 AS total_inr, COUNT(*) AS txn_count
FROM users u
JOIN transactions t ON t.user_id = u.id
WHERE t.status = 'SUCCESS'
  AND t.created_at >= NOW() - INTERVAL 30 DAY
GROUP BY u.id, u.email
ORDER BY SUM(t.amount_paise) DESC
LIMIT 5;
```

Trap: filter in `WHERE` (before grouping), not `HAVING`; `HAVING` is for aggregate conditions like `HAVING COUNT(*) > 3`.

</details>

**D2. Find duplicate payments: same user, same amount, within 5 minutes of each other.**

<details>
<summary>Solution</summary>

```sql
SELECT a.id AS txn_a, b.id AS txn_b, a.user_id, a.amount_paise,
       TIMESTAMPDIFF(SECOND, a.created_at, b.created_at) AS gap_s
FROM transactions a
JOIN transactions b
  ON a.user_id = b.user_id
 AND a.amount_paise = b.amount_paise
 AND a.id < b.id                                   -- each pair once, no self-pairs
 AND b.created_at BETWEEN a.created_at AND a.created_at + INTERVAL 5 MINUTE
WHERE a.status = 'SUCCESS' AND b.status = 'SUCCESS';
```

Self-join with `a.id < b.id` is the pattern; this is a real fraud/recon query shape.

</details>

**D3. Users with zero transactions in the last 60 days (dormant — for re-engagement).**

<details>
<summary>Solution</summary>

```sql
SELECT u.id, u.email
FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM transactions t
  WHERE t.user_id = u.id
    AND t.created_at >= NOW() - INTERVAL 60 DAY
);

-- equivalent LEFT JOIN form (be ready to write both):
SELECT u.id, u.email
FROM users u
LEFT JOIN transactions t
  ON t.user_id = u.id AND t.created_at >= NOW() - INTERVAL 60 DAY
WHERE t.id IS NULL;
```

⚠️ Classic mistake: putting the date filter in the `WHERE` of the LEFT JOIN version — that turns it into an INNER JOIN. Extra conditions on the outer table go in the `ON`.

</details>

**D4. Running total of successful spend per user by day (window function).**

<details>
<summary>Solution</summary>

```sql
SELECT user_id,
       DATE(created_at) AS day,
       SUM(amount_paise) AS day_paise,
       SUM(SUM(amount_paise)) OVER (
         PARTITION BY user_id ORDER BY DATE(created_at)
       ) AS running_paise
FROM transactions
WHERE status = 'SUCCESS'
GROUP BY user_id, DATE(created_at)
ORDER BY user_id, day;
```

The `SUM(SUM(...)) OVER` looks odd — inner SUM is the group aggregate, outer is the window over the grouped rows. If that's shaky, wrap the GROUP BY in a subquery and window over it.

</details>

**D5. Second-highest successful transaction amount (the classic, 3 ways).**

<details>
<summary>Solution</summary>

```sql
-- 1) OFFSET (simple; DISTINCT handles ties)
SELECT DISTINCT amount_paise FROM transactions
WHERE status = 'SUCCESS'
ORDER BY amount_paise DESC LIMIT 1 OFFSET 1;

-- 2) Subquery (works everywhere)
SELECT MAX(amount_paise) FROM transactions
WHERE status = 'SUCCESS'
  AND amount_paise < (SELECT MAX(amount_paise) FROM transactions WHERE status = 'SUCCESS');

-- 3) DENSE_RANK (generalizes to Nth)
SELECT amount_paise FROM (
  SELECT amount_paise, DENSE_RANK() OVER (ORDER BY amount_paise DESC) AS rnk
  FROM transactions WHERE status = 'SUCCESS'
) ranked WHERE rnk = 2 LIMIT 1;
```

</details>

**D6. Daily settlement summary: one row per day with success/failed/refunded counts and success amount (conditional aggregation).**

<details>
<summary>Solution</summary>

```sql
SELECT DATE(created_at) AS day,
       COUNT(*)                                                   AS total_txns,
       SUM(status = 'SUCCESS')                                    AS success_count,
       SUM(status = 'FAILED')                                     AS failed_count,
       SUM(status = 'REFUNDED')                                   AS refunded_count,
       SUM(CASE WHEN status = 'SUCCESS' THEN amount_paise END)/100 AS success_inr,
       ROUND(100 * SUM(status = 'SUCCESS') / COUNT(*), 2)         AS success_rate_pct
FROM transactions
WHERE created_at >= CURDATE() - INTERVAL 7 DAY
GROUP BY DATE(created_at)
ORDER BY day DESC;
```

`SUM(condition)` works in MySQL because booleans are 0/1; portable form is `SUM(CASE WHEN … THEN 1 ELSE 0 END)`. This is the query behind §4 Script 5 — say that.

</details>

---
<a id="sec7"></a>
## 7. ⚛️ React + Build Tools Refresher

### 7.1 Pointers into your HCLTech prep (re-read, don't re-learn)

| Topic (in [HCLTech_MERN_Interview_Prep.md](HCLTech_MERN_Interview_Prep.md)) | Why CheQ/Recro may ask it |
|---|---|
| Hooks: `useState`/`useEffect`/`useMemo`/`useCallback` + dependency arrays | OA MCQs + "optimize this component" |
| Virtual DOM & Fiber reconciliation | Recro loves "how does React update the DOM?" |
| `call`/`apply`/`bind`, closures, `this` | JS output MCQs in the OA |
| `reduce` and array-method fluency | Feeds directly into §9 problems |
| Controlled components & forms | Fintech = forms (card entry, payment amounts) |
| Custom hooks | "How would you share bill-fetch logic across screens?" |

Add-ons worth 10 minutes each (not in HCLTech file): `React.memo` vs `useMemo` distinction; lazy loading routes (`React.lazy` + `Suspense` — ties into code-splitting below); error boundaries (payments UI must fail gracefully).

### 7.2 Webpack core concepts (JD names it explicitly)

The mental model — **five nouns**:
1. **Entry** — module(s) where dependency-graph building starts (`./src/index.js`).
2. **Output** — bundled files + naming (`[name].[contenthash].js` → long-term caching; hash changes only when content does).
3. **Loaders** — per-file transformers, applied right-to-left: webpack only speaks JS/JSON natively; `babel-loader` (JSX/TS), `css-loader` (CSS→JS module), `style-loader`/`MiniCssExtractPlugin` (inject vs extract).
4. **Plugins** — whole-build hooks: `HtmlWebpackPlugin` (inject bundles into HTML), `DefinePlugin` (env constants), `MiniCssExtractPlugin`, `BundleAnalyzerPlugin`.
5. **Mode** — `production` enables minification (Terser), tree-shaking, scope hoisting; `development` enables fast rebuilds + rich source maps.

```js
// webpack.config.js — minimal but complete; be able to sketch this on a whiteboard
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
    publicPath: '/',
  },
  resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
  module: {
    rules: [
      { test: /\.[jt]sx?$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },  // applied RIGHT → LEFT
      { test: /\.(png|svg|woff2?)$/, type: 'asset' },           // webpack 5 asset modules
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
  optimization: { splitChunks: { chunks: 'all' } },  // vendor/common chunk splitting
  devServer: { historyApiFallback: true, port: 3000, hot: true },
};
```

**Code splitting — the three mechanisms:** multiple entries (rare now); `optimization.splitChunks` (auto-extract shared/vendor chunks); **dynamic `import()`** — the one to talk about:

```jsx
const RewardsPage = React.lazy(() => import('./pages/RewardsPage')); // own chunk,
// fetched on first navigation — first-load bundle stays small (payments app = mobile users)
```

**Tree shaking** one-liner: dead-export elimination, requires ESM (`import/export`, not `require`), production mode, and `"sideEffects": false` (or a list) in package.json so webpack knows removals are safe.

### 7.3 npm — the parts interviews touch

- **Scripts:** `npm run x` runs with `node_modules/.bin` on PATH (why `"test": "jest"` works). Lifecycle hooks: `prebuild`/`build`/`postbuild` auto-chain. `npx` = run a package binary without global install.
- **`package-lock.json`:** exact resolved tree — commit it; `npm ci` (clean, lockfile-exact, fails on drift) in CI/Docker, `npm install` locally.
- **Semver:** `^1.2.3` = up to <2.0.0 (minor+patch float); `~1.2.3` = patch only; pin exact for risk-sensitive deps.
- **`dependencies` vs `devDependencies`:** runtime vs build/test; `npm ci --omit=dev` in the production Docker stage (§8.2).
- Security: `npm audit` in CI + lockfile review — supply-chain attacks land via postinstall scripts; `--ignore-scripts` where feasible. (Security JD line again.)

### 7.4 Legacy one-liners (deliver with a smile, don't over-explain)

- **Grunt:** "Config-driven task runner from the pre-bundler era — file watching, concat, minify defined in a Gruntfile; superseded by npm scripts + bundlers."
- **Gulp:** "Grunt's successor — code-over-config, Node streams piping files through transforms; faster than Grunt's write-to-disk-between-tasks model; same fate."
- **Bower:** "Front-end package manager before npm swallowed that role; flat dependency tree; officially deprecated — migration path is npm/yarn + a bundler."
- **Modern context (shows currency):** "New projects I'd start with **Vite** — esbuild-powered dev server, Rollup production builds; webpack remains the incumbent in large existing apps, which is why I keep it sharp."

---

<a id="sec8"></a>
## 8. ☁️ Cloud & DevOps — AWS-Native, GCP-Ready

### 8.1 GCP ↔ AWS service mapping (CheQ may be on either)

| Need | AWS (your home) | GCP equivalent | One-line note |
|---|---|---|---|
| VMs | EC2 | Compute Engine | like-for-like |
| Containers, serverless | Fargate / Lambda | **Cloud Run** | Cloud Run = containers-as-serverless; scale-to-zero; closest to "Lambda for containers" |
| Functions | Lambda | Cloud Functions | same triggers idea (HTTP, pub/sub, storage) |
| Kubernetes | EKS | **GKE** | GKE is the most-managed K8s anywhere (Autopilot mode) |
| Object storage | S3 | Cloud Storage (GCS) | `gsutil`/`gcloud storage` ≈ `aws s3` |
| Queues + fan-out | SQS + SNS | **Pub/Sub** (one service does both) | topics + subscriptions; pull or push; DLQ = dead-letter topics |
| Cron triggers | EventBridge Scheduler | **Cloud Scheduler** | fires HTTP/Pub-Sub on cron — the JD's batch/cron in cloud form |
| Managed MySQL | RDS/Aurora | **Cloud SQL** / AlloyDB | read replicas, PITR — same concepts |
| Redis | ElastiCache | Memorystore | same client code |
| NoSQL managed | DynamoDB | Firestore/Bigtable | different data models — say "closest, not identical" |
| Warehouse | Redshift/Athena | **BigQuery** | serverless SQL — GCP's crown jewel; recon/analytics jobs |
| Secrets | Secrets Manager / Parameter Store | Secret Manager | same envelope pattern |
| IaC | CloudFormation/SAM/CDK | Deployment Manager / **Terraform** (de facto) | "my CFN experience maps to Terraform HCL in a week" |
| Observability | CloudWatch | Cloud Logging + Monitoring (ex-Stackdriver) | structured JSON logs work identically |
| IAM | IAM roles/policies | IAM + service accounts | GCP: service accounts attach to workloads — like instance profiles |

**Delivery script:** pick the row they ask about, answer in AWS from experience, translate explicitly: *"At UTEC this was EventBridge → Lambda with an SQS DLQ; on GCP I'd wire Cloud Scheduler → Pub/Sub → Cloud Run with a dead-letter topic — same architecture, different nouns."*

### 8.2 Docker essentials (you know this — have the artifacts ready)

```dockerfile
# Multi-stage Node build — memorize the shape
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci                      # lockfile-exact, cache-friendly layer
COPY . .
RUN npm run build               # tsc / webpack

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
USER node                                    # never run as root (VAPT reflex)
EXPOSE 3000
HEALTHCHECK CMD node -e "fetch('http://localhost:3000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "dist/server.js"]               # node directly — npm swallows SIGTERM (§3-Q25!)
```

Talking points: layer-caching order (lockfiles before source — deps rebuild only when they change), multi-stage (build tools never ship; smaller attack surface), `.dockerignore` (`node_modules`, `.env`, `.git`), `USER node`, and **`CMD ["node", ...]` not `npm start`** — npm doesn't forward SIGTERM, which breaks the graceful shutdown you described in §3-Q25. That cross-reference is a killer interview moment.

### 8.3 Kubernetes core objects (conceptual fluency, honestly framed)

Opening frame when K8s comes up: *"I haven't operated K8s in production — my orchestration experience is Lambda/serverless — but I know the object model and how my services should behave inside it."* Then prove it:

| Object | What it is | Your mental mapping |
|---|---|---|
| **Pod** | Smallest unit: 1+ containers, shared network/volumes | ≈ one running task/container instance |
| **Deployment** | Desired-state manager for N pod replicas; rolling updates + rollback | ≈ Lambda versions/aliases + ASG in one |
| **Service** | Stable virtual IP/DNS load-balancing across pods (ClusterIP/NodePort/LoadBalancer) | ≈ internal ALB/target group |
| **Ingress** | L7 HTTP routing (host/path → services) + TLS termination | ≈ API Gateway/ALB rules |
| **HPA** | Auto-scales replicas on CPU/memory/custom metrics | ≈ Lambda concurrency scaling made explicit |
| ConfigMap / Secret | Config and secrets mounted as env/files | ≈ Parameter Store / Secrets Manager refs |
| CronJob | Scheduled pods | ≈ EventBridge cron → the JD's batch jobs |

```yaml
# Enough YAML to not blink at a whiteboard:
apiVersion: apps/v1
kind: Deployment
metadata: { name: payments-api }
spec:
  replicas: 3
  selector: { matchLabels: { app: payments-api } }
  template:
    metadata: { labels: { app: payments-api } }
    spec:
      containers:
        - name: api
          image: registry/payments-api:1.4.2
          ports: [{ containerPort: 3000 }]
          resources:
            requests: { cpu: 250m, memory: 256Mi }
            limits: { cpu: "1", memory: 512Mi }
          readinessProbe: { httpGet: { path: /health/ready, port: 3000 } }
          livenessProbe:  { httpGet: { path: /health/live,  port: 3000 } }
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata: { name: payments-api }
spec:
  scaleTargetRef: { apiVersion: apps/v1, kind: Deployment, name: payments-api }
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource: { name: cpu, target: { type: Utilization, averageUtilization: 70 } }
```

The two probe types are a favorite question: **liveness** = "restart me if this fails" (deadlock detector); **readiness** = "don't route to me" (startup, drain during shutdown — ties to §3-Q25). Getting them backwards in production causes restart storms — knowing *that* is the senior tell.

### 8.4 CI/CD narrative — your UTEC story, told for this JD

> "At UTEC I owned deployment infrastructure for a serverless estate — **245+ Lambdas across 5 environments** (dev → test → stage → preprod → prod). IaC was **nested CloudFormation** via SAM: a root stack composing network, data, and per-domain service stacks, `samconfig.toml` per environment, and **change sets reviewed before every prod deploy** — infrastructure diffs got code review like application code. Pipeline: Git branch → build + unit tests → deploy to dev → integration tests → promote the *same artifact* through environments with manual gates at preprod/prod. Rollback = redeploy previous template/artifact version; we rehearsed it. The **VAPT remediation rode this pipeline** — security fixes went through the same gates with scan verification at the end. The JD says 'leverage the DevOps team across all release cycles' — this was me being that DevOps leverage. In a GKE/Cloud Build world the nouns change — image per commit SHA, deployment rollout, `kubectl rollout undo` — but the discipline is identical: immutable artifacts, promotion not rebuild, gates, rehearsed rollback."

---
<a id="sec9"></a>
## 9. 💻 Coding Practice Set — 15 JS Problems + 3 Machine-Coding Tasks

> Rules of engagement: solve on paper/blank editor **before** opening the solution; say complexity out loud; narrate as you code (Recro interviewers grade communication). The promise pool is already solved at §3-Q10 — that one's a freebie.

Progress: [ ] P1 [ ] P2 [ ] P3 [ ] P4 [ ] P5 [ ] P6 [ ] P7 [ ] P8 [ ] P9 [ ] P10 [ ] P11 [ ] P12 [ ] P13 [ ] P14 [ ] P15 · [ ] MC1 [ ] MC2 [ ] MC3

**P1. Flatten a nested array — without `Array.flat`, then with configurable depth.**

<details>
<summary>Solution</summary>

```js
// Full flatten — recursion + reduce (the version they expect)
const flatten = arr =>
  arr.reduce((acc, x) => acc.concat(Array.isArray(x) ? flatten(x) : x), []);

// Depth-limited (how Array.prototype.flat actually behaves)
const flattenDepth = (arr, d = 1) =>
  d < 1 ? arr.slice()
        : arr.reduce((acc, x) =>
            acc.concat(Array.isArray(x) ? flattenDepth(x, d - 1) : x), []);

console.log(flatten([1, [2, [3, [4]], 5]]));        // [1,2,3,4,5]
console.log(flattenDepth([1, [2, [3, [4]]]], 1));   // [1,2,[3,[4]]]
```

O(n) over total elements; recursion depth = nesting depth. Follow-up they like: iterative version with a stack (avoids call-stack limits).

</details>

**P2. Implement `debounce` and `throttle`. Explain a fintech use for each.**

<details>
<summary>Solution</summary>

```js
function debounce(fn, wait) {          // fire AFTER quiet period
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

function throttle(fn, wait) {          // fire at most once per window
  let last = 0, timer;
  return function (...args) {
    const now = Date.now(), remaining = wait - (now - last);
    if (remaining <= 0) { last = now; fn.apply(this, args); }
    else if (!timer) timer = setTimeout(() => {
      last = Date.now(); timer = null; fn.apply(this, args);
    }, remaining);       // trailing call so the final event isn't lost
  };
}
```

Uses: debounce = biller-name search box (fire the API after typing stops); throttle = scroll-position tracker or a "check payment status" button (at most one call per 2s). Say why `function` not arrow: to preserve caller `this` with `apply`. (Your `01-JavaScript/Practice/debounce-throttle.js` has your earlier take — compare.)

</details>

**P3. Group anagrams: `['eat','tea','tan','ate','nat','bat']` → `[['eat','tea','ate'],['tan','nat'],['bat']]`.**

<details>
<summary>Solution</summary>

```js
function groupAnagrams(words) {
  const map = new Map();
  for (const w of words) {
    const key = [...w].sort().join('');          // canonical form
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(w);
  }
  return [...map.values()];
}
```

O(n · k log k). Follow-up: replace sort with a 26-char count key → O(n·k). The pattern (canonical key → Map bucket) recurs in half these problems — name it.

</details>

**P4. First non-repeating character in a string (return index or -1).**

<details>
<summary>Solution</summary>

```js
function firstUniqueChar(s) {
  const counts = new Map();
  for (const c of s) counts.set(c, (counts.get(c) || 0) + 1);
  for (let i = 0; i < s.length; i++) if (counts.get(s[i]) === 1) return i;
  return -1;
}
console.log(firstUniqueChar('cheqcheque'));  // index of 'u'
```

Two passes, O(n). Trap: a single pass with nested `indexOf/lastIndexOf` is O(n²) — mention you avoided it.

</details>

**P5. Two-sum: return indices of the pair summing to target (one pass).**

<details>
<summary>Solution</summary>

```js
function twoSum(nums, target) {
  const seen = new Map();                        // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}
```

O(n)/O(n). Check-before-insert handles duplicates (`[3,3]`, target 6) correctly — say that unprompted.

</details>

**P6. Deep clone an object (handle arrays, dates, nested objects, cycles).**

<details>
<summary>Solution</summary>

```js
function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value;
  if (value instanceof Date) return new Date(value);
  if (seen.has(value)) return seen.get(value);            // cycle guard

  const out = Array.isArray(value) ? [] : {};
  seen.set(value, out);
  for (const [k, v] of Object.entries(value)) out[k] = deepClone(v, seen);
  return out;
}
```

Then level up the answer: `structuredClone(obj)` is built-in (Node 17+) and handles Maps/Sets/cycles; `JSON.parse(JSON.stringify(x))` is the naive version — drops functions/undefined, breaks Dates, throws on cycles. Knowing all three tiers is the point of the question.

</details>

**P7. Flatten an object to dot-notation keys (and unflatten).**

<details>
<summary>Solution</summary>

```js
function flattenObj(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) flattenObj(v, key, out);
    else out[key] = v;
  }
  return out;
}
console.log(flattenObj({ user: { name: 'Onkar', card: { last4: '4242' } }, active: true }));
// { 'user.name': 'Onkar', 'user.card.last4': '4242', active: true }

function unflatten(flat) {
  const out = {};
  for (const [path, v] of Object.entries(flat)) {
    const keys = path.split('.');
    let node = out;
    keys.slice(0, -1).forEach(k => (node = node[k] ??= {}));
    node[keys.at(-1)] = v;
  }
  return out;
}
```

Real-world hook: Mongo update paths (`$set: {'user.card.last4': …}`) use exactly this form.

</details>

**P8. Implement `Promise.all` from scratch (a confirmed Recro favorite).**

<details>
<summary>Solution</summary>

```js
function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const items = [...iterable];
    const results = new Array(items.length);
    let remaining = items.length;
    if (remaining === 0) return resolve([]);

    items.forEach((item, i) => {
      Promise.resolve(item).then(value => {     // handles non-promise values too
        results[i] = value;                     // ORDER by index, not completion
        if (--remaining === 0) resolve(results);
      }, reject);                               // first rejection wins
    });
  });
}

promiseAll([1, Promise.resolve(2), new Promise(r => setTimeout(() => r(3), 100))])
  .then(console.log);   // [1, 2, 3]
```

The three graded details: `Promise.resolve` wrapping, index-based ordering, and the counter (not `results.length`, which lies with sparse arrays). Follow-up: `allSettled` = same skeleton, push `{status, value/reason}` and never reject.

</details>

**P9. Retry an async function with exponential backoff + jitter (Node twin of §4 Script 3).**

<details>
<summary>Solution</summary>

```js
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function retry(fn, { attempts = 5, baseMs = 200, capMs = 5000, retryOn = () => true } = {}) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); }
    catch (err) {
      lastErr = err;
      if (i === attempts - 1 || !retryOn(err)) break;
      const delay = Math.min(capMs, baseMs * 2 ** i) * (0.5 + Math.random()); // jitter
      await sleep(delay);
    }
  }
  throw lastErr;
}

// retry(() => payGateway.status(txnId), { retryOn: e => e.code !== 'INVALID_TXN' })
```

Talk about `retryOn`: retrying a 4xx is a bug (it'll never succeed); retry 5xx/timeouts only — and for POSTs, only with an idempotency key (§5.2). That sentence is the senior differentiator.

</details>

**P10. Chunk an array: `chunk([1,2,3,4,5], 2) → [[1,2],[3,4],[5]]`.**

<details>
<summary>Solution</summary>

```js
const chunk = (arr, size) => {
  if (size < 1) throw new RangeError('size >= 1');
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};
```

O(n). Use case to mention: batching 10K reminder sends into API-friendly pages (§4 Script 7 did the same in Python).

</details>

**P11. LRU cache with O(1) get/put (Map insertion order trick).**

<details>
<summary>Solution</summary>

```js
class LRUCache {
  constructor(capacity) { this.cap = capacity; this.map = new Map(); }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key); this.map.set(key, val);      // re-insert = mark recent
    return val;
  }
  put(key, val) {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size >= this.cap)
      this.map.delete(this.map.keys().next().value);   // oldest = first key
    this.map.set(key, val);
  }
}
```

JS `Map` preserves insertion order, so it replaces the classic hashmap+doubly-linked-list — but *say* you know the classic design (that's what makes it O(1) in other languages). Bridge: "this is Redis `allkeys-lru` in miniature (§6-Q17)."

</details>

**P12. Longest substring without repeating characters (sliding window).**

<details>
<summary>Solution</summary>

```js
function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let best = 0, left = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (lastSeen.has(c) && lastSeen.get(c) >= left)
      left = lastSeen.get(c) + 1;                 // jump left past the repeat
    lastSeen.set(c, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}
console.log(lengthOfLongestSubstring('abcabcbb')); // 3
```

O(n), one pass. The `>= left` guard (stale entries) is where most candidates bug out — rehearse explaining it.

</details>

**P13. Transaction report with `reduce`: total + count per status from a txn list (Recro loves reduce).**

<details>
<summary>Solution</summary>

```js
const txns = [
  { id: 'T1', status: 'SUCCESS', amountPaise: 99950 },
  { id: 'T2', status: 'FAILED',  amountPaise: 120000 },
  { id: 'T3', status: 'SUCCESS', amountPaise: 450000 },
  { id: 'T4', status: 'PENDING', amountPaise: 78000 },
];

const report = txns.reduce((acc, t) => {
  const s = (acc[t.status] ??= { count: 0, totalPaise: 0 });
  s.count += 1;
  s.totalPaise += t.amountPaise;
  return acc;
}, {});
// { SUCCESS: {count:2, totalPaise:549950}, FAILED: {...}, PENDING: {...} }

// generic groupBy — the follow-up:
const groupBy = (arr, keyFn) =>
  arr.reduce((acc, x) => ((acc[keyFn(x)] ??= []).push(x), acc), {});
```

This is drill D6 in JavaScript — say that; interviewers love cross-domain recognition.

</details>

**P14. Implement `memoize` (configurable cache key; mention the cache-growth trap).**

<details>
<summary>Solution</summary>

```js
function memoize(fn, keyFn = (...args) => JSON.stringify(args)) {
  const cache = new Map();
  return function (...args) {
    const key = keyFn(...args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    if (result instanceof Promise)                    // async memoize nuance:
      result.catch(() => cache.delete(key));          // don't cache rejections
    return result;
  };
}
```

Two senior notes: unbounded Map = the memory leak from §3-Q24 (cap it — LRU from P11); and caching in-flight promises deduplicates concurrent identical calls — that's cache-stampede protection (§6-Q18) in five lines.

</details>

**P15. Build an `EventEmitter` (on/once/off/emit).**

<details>
<summary>Solution</summary>

```js
class Emitter {
  #listeners = new Map();                       // event -> Set<fn>
  on(evt, fn) {
    if (!this.#listeners.has(evt)) this.#listeners.set(evt, new Set());
    this.#listeners.get(evt).add(fn);
    return () => this.off(evt, fn);             // unsubscribe handle
  }
  once(evt, fn) {
    const wrap = (...a) => { this.off(evt, wrap); fn(...a); };
    return this.on(evt, wrap);
  }
  off(evt, fn) { this.#listeners.get(evt)?.delete(fn); }
  emit(evt, ...args) {
    for (const fn of [...(this.#listeners.get(evt) ?? [])]) fn(...args);
    // copy before iterating: a listener that calls off() mid-emit won't skip others
  }
}
```

Ties to §3-Q24 (leaks = listeners never `off`'d) and Node's own `events` module (`maxListeners` warning). The copy-before-iterate line is the detail that separates you.

</details>

---
### 9-MC. Machine-coding tasks (60–90 min format — build, then defend)

**MC1. Rate limiter middleware — sliding window, per-user, Redis-backed with in-memory fallback.**
*Spec: 100 requests/min per API key; 429 + Retry-After; must work across multiple replicas.*

<details>
<summary>✍️ Full solution</summary>

```js
// rate-limiter.js
// In-memory sliding-window (single instance) + Redis sorted-set version (replicas).

class MemorySlidingWindow {
  constructor(limit, windowMs) { this.limit = limit; this.windowMs = windowMs; this.hits = new Map(); }
  check(key, now = Date.now()) {
    const cutoff = now - this.windowMs;
    const arr = (this.hits.get(key) || []).filter(t => t > cutoff);  // drop expired
    if (arr.length >= this.limit) {
      this.hits.set(key, arr);
      return { allowed: false, retryAfterMs: arr[0] + this.windowMs - now };
    }
    arr.push(now); this.hits.set(key, arr);
    return { allowed: true, remaining: this.limit - arr.length };
  }
}

// Redis version — sorted set per key: member=uuid, score=timestamp. Atomic via MULTI.
async function redisSlidingWindow(redis, key, limit, windowMs) {
  const now = Date.now(), cutoff = now - windowMs;
  const zkey = `rl:${key}`;
  const [, count] = await redis
    .multi()
    .zremrangebyscore(zkey, 0, cutoff)          // evict old hits
    .zcard(zkey)                                 // count current window
    .exec()
    .then(rs => rs.map(([, v]) => v));
  if (count >= limit) {
    const oldest = await redis.zrange(zkey, 0, 0, 'WITHSCORES');
    const retryAfterMs = Math.max(0, Number(oldest[1]) + windowMs - now);
    return { allowed: false, retryAfterMs };
  }
  await redis.multi()
    .zadd(zkey, now, `${now}:${Math.random()}`)  // unique member per hit
    .pexpire(zkey, windowMs)                     // GC idle keys
    .exec();
  return { allowed: true, remaining: limit - count - 1 };
}

// Express middleware factory
function rateLimit({ limit = 100, windowMs = 60_000, redis = null, keyFn = req => req.get('x-api-key') || req.ip } = {}) {
  const mem = new MemorySlidingWindow(limit, windowMs);
  return async (req, res, next) => {
    const key = keyFn(req);
    let result;
    try {
      result = redis ? await redisSlidingWindow(redis, key, limit, windowMs)
                     : mem.check(key);
    } catch {
      result = { allowed: true };   // fail-open for reads; discuss fail-closed for OTP (§3-Q30)
    }
    res.set('RateLimit-Limit', String(limit));
    if (!result.allowed) {
      res.set('Retry-After', String(Math.ceil(result.retryAfterMs / 1000)));
      return res.status(429).json({ error: { code: 'RATE_LIMITED' } });
    }
    res.set('RateLimit-Remaining', String(result.remaining ?? ''));
    next();
  };
}

module.exports = { rateLimit, MemorySlidingWindow, redisSlidingWindow };

// Quick self-test: node rate-limiter.js
if (require.main === module) {
  const rl = new MemorySlidingWindow(3, 1000);
  for (let i = 0; i < 5; i++) console.log(i, rl.check('user1'));
  setTimeout(() => console.log('after window', rl.check('user1')), 1100);
}
```

**Defense points:** sliding window vs fixed (edge bursts); sorted set = timestamps in window; `MULTI` for atomicity (upgrade path: single Lua script — fully race-free); memory Map fallback + the honest note that it under-limits with N replicas; fail-open/fail-closed as a *stated decision*; headers per draft RFC.

</details>

**MC2. Card-due-date reminder service.**
*Spec: daily 9 AM IST job; remind users with bills due in 3 days; no duplicate reminders; survives restarts; testable without waiting for 9 AM.*

<details>
<summary>✍️ Full solution</summary>

```js
// reminder-service.js — npm i node-cron ; node reminder-service.js --now
const cron = require('node-cron');

// --- fake repos (in prod: MySQL via mysql2/promise) ---------------------
const db = {
  bills: [
    { billId: 'B1', userId: 'U1', cardLast4: '4242', duePaise: 1249900, dueDate: addDays(3) },
    { billId: 'B2', userId: 'U2', cardLast4: '9001', duePaise: 560000,  dueDate: addDays(3) },
    { billId: 'B3', userId: 'U3', cardLast4: '7777', duePaise: 89900,   dueDate: addDays(10) }, // not due yet
  ],
  remindersSent: new Set(),   // prod: UNIQUE(bill_id, remind_date) table — DB is the dedupe, not memory
};
function addDays(n) { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }

async function findBillsDueOn(date) { return db.bills.filter(b => b.dueDate === date); }
async function alreadySent(billId, date) { return db.remindersSent.has(`${billId}:${date}`); }
async function markSent(billId, date) { db.remindersSent.add(`${billId}:${date}`); }
async function sendReminder(bill) {     // prod: push/SMS provider with idempotency key
  console.log(`📲 U:${bill.userId} card *${bill.cardLast4} — ₹${(bill.duePaise / 100).toLocaleString('en-IN')} due ${bill.dueDate}`);
}

// --- the job, idempotent & re-runnable -----------------------------------
async function runReminderJob(today = new Date()) {
  const target = new Date(today); target.setDate(target.getDate() + 3);
  const targetDate = target.toISOString().slice(0, 10);
  const bills = await findBillsDueOn(targetDate);
  console.log(`[job] ${bills.length} bill(s) due ${targetDate}`);

  let sent = 0, skipped = 0, failed = 0;
  for (const bill of bills) {                       // small batch; use §3-Q10 pool at scale
    try {
      if (await alreadySent(bill.billId, targetDate)) { skipped++; continue; }
      await sendReminder(bill);
      await markSent(bill.billId, targetDate);      // send-then-mark: crash ⇒ possible resend,
      sent++;                                        // never a silent miss (at-least-once choice)
    } catch (err) { failed++; console.error(`[job] ${bill.billId} failed:`, err.message); }
  }
  console.log(`[job] done sent=${sent} skipped=${skipped} failed=${failed}`);
  return { sent, skipped, failed };
}

// --- scheduling ----------------------------------------------------------
if (process.argv.includes('--now')) {
  runReminderJob().then(() => process.exit(0));     // testability: run on demand
} else {
  cron.schedule('0 9 * * *', () => runReminderJob(), { timezone: 'Asia/Kolkata' });
  console.log('Scheduled daily 09:00 IST. Ctrl+C to stop.');
}
```

**Defense points:** idempotency via a sent-ledger keyed `(billId, date)` — rerun-safe, crash-safe; **send-then-mark** = at-least-once (duplicate possible) vs mark-then-send = at-most-once (miss possible) — for reminders pick at-least-once and let the provider's idempotency key dedupe; explicit IST timezone; `--now` flag for testing; and the deployment caveat from §4.4 — with N replicas, either a Redis lock (§6-Q20) or move the trigger to Cloud Scheduler/K8s CronJob with `concurrencyPolicy: Forbid`.

</details>

**MC3. Paginated `GET /transactions` with Redis caching.**
*Spec: filter by status, cursor pagination, cache page-1 responses 60s, invalidate on new transaction.*

<details>
<summary>✍️ Full solution</summary>

```js
// app.js — npm i express ioredis ; assumes mysql2 pool as `db`
const express = require('express');
const Redis = require('ioredis');
const app = express();
app.use(express.json());
const redis = new Redis(process.env.REDIS_URL);

const enc = c => Buffer.from(JSON.stringify(c)).toString('base64url');
const dec = s => { try { return JSON.parse(Buffer.from(s, 'base64url').toString()); } catch { return null; } };

async function queryPage({ userId, status, cursor, limit }) {
  const params = [userId];
  let where = 'WHERE user_id = ?';
  if (status) { where += ' AND status = ?'; params.push(status); }
  if (cursor) { where += ' AND (created_at, id) < (?, ?)'; params.push(cursor.t, cursor.id); }
  params.push(limit + 1);                              // fetch one extra → hasMore
  const [rows] = await db.execute(
    `SELECT id, txn_ref, amount_paise, status, created_at
     FROM transactions ${where}
     ORDER BY created_at DESC, id DESC LIMIT ?`, params);
  const hasMore = rows.length > limit;
  const page = hasMore ? rows.slice(0, limit) : rows;
  const last = page[page.length - 1];
  return { page, nextCursor: hasMore ? enc({ t: last.created_at, id: last.id }) : null };
}

app.get('/users/:userId/transactions', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const status = req.query.status;                    // TODO zod-validate enum
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);   // cap it!
    const cursor = req.query.cursor ? dec(req.query.cursor) : null;
    if (req.query.cursor && !cursor)
      return res.status(400).json({ error: { code: 'BAD_CURSOR' } });

    // Cache ONLY page 1 (hot path: app opens → latest txns). Deep pages: low hit rate.
    const cacheKey = !cursor ? `txns:${userId}:${status || 'all'}:p1:${limit}` : null;
    if (cacheKey) {
      const hit = await redis.get(cacheKey);
      if (hit) { res.set('X-Cache', 'HIT'); return res.json(JSON.parse(hit)); }
    }

    const body = await queryPage({ userId, status, cursor, limit });
    if (cacheKey)
      await redis.set(cacheKey, JSON.stringify(body), 'EX', 55 + Math.floor(Math.random() * 10)); // jittered TTL (§6-Q18)
    res.set('X-Cache', 'MISS');
    res.json(body);
  } catch (err) { next(err); }
});

// Write path invalidates the user's page-1 variants (delete-on-write, §6-Q18)
app.post('/users/:userId/transactions', async (req, res, next) => {
  try {
    // ... INSERT INTO transactions ... (idempotency key per §5.2!)
    const keys = await redis.keys(`txns:${req.params.userId}:*`); // small per-user keyspace;
    if (keys.length) await redis.del(keys);                       // at scale: SCAN or versioned keys
    res.status(201).json({ ok: true });
  } catch (err) { next(err); }
});

app.use((err, req, res, next) => {                     // central error handler (§3-Q22)
  console.error(err);
  res.status(500).json({ error: { code: 'INTERNAL' } });
});
app.listen(3000, () => console.log('on :3000'));
```

**Defense points:** keyset pagination over OFFSET (§6-Q7) with the `(created_at, id)` tie-break; fetch-limit-plus-one for `hasMore`; opaque base64 cursor (clients can't fabricate offsets); cache page-1 only + jittered TTL + delete-on-write; limit cap (someone *will* send `?limit=100000`); and where you'd add the rate limiter from MC1 and validation.

</details>

---
<a id="sec10"></a>
## 10. ⭐ STAR Bank + Client Round

### 10.1 Eight STAR stories mapped to JD bullets

| # | Story | JD bullet it answers | Trigger questions |
|---|-------|---------------------|-------------------|
| S1 | VAPT/OWASP remediation (UTEC) | "modern security principles" | "security experience?", "hardest bug?" |
| S2 | 6M-user notification fan-out (UTEC) | "resilient code that performs and scales" | "scale story?", "production issue?" |
| S3 | EC2→Lambda migration (Vkonnect) | cloud deployment; cost awareness | "architecture decision you drove?" |
| S4 | Batch migration + idempotency (P&G) | **"batch/cron jobs"** ← your Python-gap shield | "batch experience?", "data integrity?" |
| S5 | GPT-4→5.1 re-architecture (EY) | innovation; Wisor relevance | "learning something new fast?" |
| S6 | Nested CloudFormation, 5 envs (UTEC) | "leverage DevOps across release cycles" | "CI/CD experience?" |
| S7 | Requirement clarification saves a sprint (UTEC) | "work with stakeholders to define requirements" | "conflict/ambiguity story?" |
| S8 | Mentoring + review culture (UTEC/Iprogrammer) | seniority without overqualification | "team contribution beyond code?" |

<details>
<summary>S1 — VAPT/OWASP remediation (your opener — rehearse until fluid)</summary>

- **S:** UltraTech's construction-commerce platform (6M+ users) went through a mandated VAPT audit; the report landed with findings across auth, injection, and information disclosure.
- **T:** As senior backend engineer, own remediation across the Node.js API surface and get a clean re-test — without freezing feature delivery.
- **A:** Triaged findings by exploitability; fixed IDOR by moving ownership checks into queries (`WHERE id = ? AND user_id = ?`); hardened JWT flow (expiry, rotation, algorithm pinning); added helmet, strict CORS allowlist, rate limiting on auth endpoints; killed stack-trace leakage with a central error envelope; added log scrubbing for sensitive fields; parameterized every dynamic query; then wired `npm audit` + dependency pinning into CI so classes of findings stayed fixed.
- **R:** Clean re-test on the following VAPT cycle; the practices became team defaults via the PR checklist I wrote. **Close with:** "That's why CheQ being PCI DSS certified is a plus for me — I've lived the audit-remediate-verify loop."

</details>

<details>
<summary>S2 — Scale: notification fan-out at 6M users</summary>

- **S:** UTEC notification bursts (order updates, campaigns) were degrading API latency — fan-out ran in-request.
- **T:** Restore p95 latency without dropping notifications.
- **A:** Moved fan-out behind SQS with batch consumers; DLQ + alarm for poison messages; Redis cache for hot template/user-pref lookups; tuned batch size and Lambda concurrency; added event-loop-lag and queue-depth dashboards so regressions surfaced as metrics, not tickets.
- **R:** API latency recovered (fan-out fully async), notification throughput scaled with queue depth instead of user traffic, and the DLQ pattern became standard for every async flow. **Bridge:** "Month-end bill-due spikes at CheQ have the same shape — burst absorption belongs in the queue, not the request path."

</details>

<details>
<summary>S3 — EC2→Lambda migration (Vkonnect telemedicine)</summary>

- **S:** MERN telemedicine platform on always-on EC2 — paying for idle at night, scaling manually for consult-hour peaks.
- **T:** Re-architect for elasticity and lower ops burden with a small team.
- **A:** Decomposed the Express monolith into Lambda handlers behind API Gateway; stateless-ified sessions (JWT + Redis); moved uploads to S3 presigned URLs; mitigated cold starts on hot paths (memory sizing, keep-warm pings); IaC'd the lot for repeatable deploys.
- **R:** Infra cost dropped meaningfully (idle eliminated), peak handling became automatic, deploys simplified. **Honest caveat to volunteer:** "I'd also tell you where serverless *isn't* right — long-lived connections and steady high-throughput services — which is why K8s on GKE makes sense for a CheQ-style always-on payments core."

</details>

<details>
<summary>S4 — Batch migration + idempotency (P&G Olay) — your batch/cron shield</summary>

- **S:** BigCommerce→Shopify migration: ~100K products through batch functions calling Shopify's GraphQL API; duplicates appeared and the run fell behind schedule.
- **T:** Find the root cause, guarantee integrity, land the cutover window.
- **A:** Traced duplicates to overlapping batch ranges; added distributed lease-locks so ranges processed exactly once; made every mutation idempotent via per-product keys; built checkpointing so a crashed run resumed instead of restarting; wrote a reconciliation script proving source count == destination count before sign-off.
- **R:** Zero-duplicate final migration, on the revised schedule, with an auditable recon report. **The pivot line when Python comes up:** "Locking, idempotency, checkpointing, reconciliation — that's the entire batch-job discipline the JD's Python line is really asking about. Syntax is the easy part; I've done the hard part."

</details>

<details>
<summary>S5 — LLM re-architecture (EY Risk.ai) — your Wisor bridge</summary>

- **S:** Agentic risk-analysis platform built on GPT-4; GPT-5.1 migration broke prompt behavior and output quality drifted.
- **T:** Re-architect the prompt/agent layer and prove quality objectively.
- **A:** Rebuilt prompts into structured, testable units with an eval harness (golden sets, scoring); redesigned agent hand-offs; versioned prompts like code with regression gates in CI.
- **R:** ~20% measured quality improvement post-migration, and model upgrades became routine instead of scary. **Bridge:** "If CheQ's Wisor team ever needs backend engineers who treat prompts as tested, versioned artifacts — I've built exactly that muscle."

</details>

<details>
<summary>S6 — CI/CD ownership (UTEC) — full narrative already at §8.4</summary>

Use §8.4 verbatim: 245+ Lambdas, 5 environments, nested CloudFormation, change-set reviews, immutable artifact promotion, rehearsed rollback. **R:** deploy cadence held while the platform and team grew; prod incidents from bad deploys trended to ~zero.

</details>

<details>
<summary>S7 — Stakeholder story: the requirement that wasn't</summary>

- **S:** UTEC product owner requested "real-time" partner-inventory sync; engineering estimate ballooned (websockets, event infra, weeks of work).
- **T:** Clarify what the business actually needed before the sprint committed.
- **A:** Sat with the PO and traced the request to its source — a partner complaint about *day-old* data. Asked "what staleness is acceptable?" Answer: minutes. Proposed a 5-minute scheduled sync + on-demand refresh button; wrote the trade-off note (cost/complexity/latency) the PO could carry upward.
- **R:** Shipped in days instead of weeks; the pattern ("interrogate the requirement, offer the cheapest thing that meets the real need") became how I engage POs. Maps to the JD's first bullet almost word-for-word.

</details>

<details>
<summary>S8 — Mentoring & review culture (seniority, safely framed)</summary>

- **S:** UTEC backend team mixed seniority; review quality was inconsistent, juniors were stuck on the same classes of bugs (async error handling, N+1 queries).
- **T:** Raise the floor without becoming a bottleneck.
- **A:** Wrote the PR checklist (error paths, indexes, idempotency, tests); ran short pairing sessions on recurring topics; pushed praise-in-public/fix-in-private review tone; delegated review ownership per domain so knowledge spread.
- **R:** Review turnaround improved, repeat-bug classes dropped, two juniors grew into independent module owners. **Band-safe framing:** "I don't need a 'lead' title to do this — it's just what senior ICs owe the team."

</details>

### 10.2 Ten likely CheQ client-round questions — model answers

- [ ] **1. "Walk me through the architecture of something you built end-to-end."** → S2 skeleton: React front → API Gateway → Node services → MySQL/Mongo split (§6-Q9 logic) → SQS async spine → Redis cache → CloudFormation CI/CD. Draw it; name the failure modes unprompted (queue backlog, cache stampede, replica lag). End: "and every mutation idempotent — I assume retries everywhere."
- [ ] **2. "Why fintech? Why CheQ?"** → §1.4 model answer (problem 2% of CC transactions → engineering bar → profitable = disciplined).
- [ ] **3. "How would you handle money amounts in our stack?"** → §5.9 in 60 seconds: integer paise end-to-end, `BIGINT`/`DECIMAL`, format at the edge, `0.1+0.2` demo if whiteboard available.
- [ ] **4. "Payment succeeded at the bank but your DB write failed. Now what?"** → The gold-star answer: this is *why* state machines + recon exist. Webhook retries (PSP re-delivers) catch most; the status-poll sweeper (§5.1) catches stragglers; daily recon (§5.6) is the safety net; and the write itself should be transactional with the state transition so "partially recorded" can't exist. Never: "that can't happen."
- [ ] **5. "Design a bill-reminder system for 5M users."** → MC2 scaled up: nightly query builds the day's reminder set (indexed `(due_date, status)` scan) → SQS/Pub-Sub → worker pool with per-provider rate limits → idempotency via `(bill_id, date)` unique key → DLQ + retry with backoff → metrics on sent/failed/latency. Mention timezone batching (send at 9 AM *user's* local hour) for bonus.
- [ ] **6. "How do you make an API safe to retry?"** → §5.2 end-to-end: client UUID key → atomic server claim (DB unique constraint for money) → stored response replay → same key passed to PSP. Distinguish GET (naturally idempotent) / PUT (idempotent by semantics) / POST (needs the key).
- [ ] **7. "Month-end: bill-due traffic 10×. What breaks first and what do you do?"** → Layer-by-layer: DB connection pool saturates (pool sizing, keyset pagination, read replicas for dashboards) → cache stampedes on hot billers (§6-Q18: jitter + mutex) → downstream PSP rate limits (client-side limiter + queue buffering + graceful degradation: accept-and-queue instead of reject) → autoscaling with pre-warm before known spikes ("month-end is *scheduled* load — scale on the calendar, not just on CPU").
- [ ] **8. "What do you know about UPI / BBPS?"** → Two sentences each, honestly bounded: "UPI: NPCI's real-time account-to-account rails — VPA addressing, PSP apps, collect vs pay flows, and India's default payment UX. BBPS (Bharat Connect): NPCI's interoperable bill-payment system — standardized biller onboarding, fetch-bill and pay-bill operations, which is what makes any-bank credit-card bill payment possible for apps like CheQ. I haven't integrated either directly — my gateway experience is e-commerce PSPs — but the integration disciplines (webhooks, recon, idempotency) are the same."
- [ ] **9. "Why through Recro, and what's your commitment horizon?"** → "The role and client matter more to me than the paper the offer prints on — Recro got me to CheQ's problem space, that's the value. I'm looking for a multi-year run in fintech; if a conversion path exists I'd welcome it, but I'm signing up for the work either way." (Calm, zero defensiveness.)
- [ ] **10. "You're 5+ years — this band is 2–5. Comfortable with the scope?"** → §1.2 script, compressed: "Yes — I optimized for domain and problem quality, not title. You get someone who's already made the mistakes on someone else's platform: idempotency, queue hygiene, security audits. I'm productive in week one and I mentor by default without needing it on my card."

### 10.3 Five sharp questions to ask them

- [ ] 1. **(Recro round)** "What's the payroll and benefits entity for this deployment — Recro or CheQ — and how do appraisals work while deployed?" *(You need this answer anyway; asking it crisply signals experience with the model.)*
- [ ] 2. **(Recro round)** "What's the track record of Recro deployments at CheQ converting to full-time — is there a defined policy or timeline?"
- [ ] 3. **(CheQ round)** "How is engineering structured — pods by product area (bills, rewards, lending, Wisor)? Which pod is this seat in, and who reviews my code?"
- [ ] 4. **(CheQ round)** "How is the batch/reconciliation estate split between Node and Python today, and where do you want it to go?" *(Directly probes the JD's Python line — and tells you how much §4 will matter on the job.)*
- [ ] 5. **(CheQ round)** "What does on-call look like for payment-critical services — rotation size, incident volume, and what's the last incident the team did a post-mortem on?" *(Their answer tells you about engineering maturity more than any pitch.)*

---
<a id="sec11"></a>
## 11. 📅 7-Day Plan (weighted to your gaps)

> Rhythm: ~3 focused hours/day (split 2 + 1). Every day ends with 15 minutes of §10.2 answers **spoken out loud** — fluency is a muscle.

### Day 1 — Python/Shell I + fintech vocabulary 🔴
- [ ] §4.1 framing script: write it in your own words, record yourself once
- [ ] §4.2 primer + §4.3 cheat sheet — type every line into a real `python3` session
- [ ] §4.5 Scripts 1–4 written by hand and run
- [ ] §5.1–5.4 read; redraw the bill-payment flow + state machine from memory

### Day 2 — Python/Shell II + fintech deep half 🔴
- [ ] §4.5 Scripts 5–8 written and run
- [ ] §4.4 cron: write the 5 example expressions from memory; say the node-cron-vs-scheduler answer aloud
- [ ] §5.5–5.9 read; rehearse the recon answer (Q: "PSP says ₹1Cr, you say ₹98L")
- [ ] Re-run Script 2 (reconciliation) — this one may literally be asked

### Day 3 — Node internals (Recro's confirmed topics) 🔴
- [ ] §3 Q1–Q12: predict every output snippet *before* running it — run all
- [ ] §3 Q13–Q21: run the Transform-stream and worker-thread examples
- [ ] §3 Q22–Q30 read; rehearse the VAPT-flavored answers (Q26, Q28) aloud
- [ ] Encora prep skim: event loop + SQS/DLQ sections (don't re-study, just reactivate)

### Day 4 — Databases 🟠
- [ ] §6A MySQL Q1–Q8; §6B Mongo Q9–Q14; §6C Redis Q15–Q20
- [ ] All 6 SQL drills **hand-written before opening solutions** (D1–D6)
- [ ] Rerun D2 and D3 from a blank page (the two with classic traps)
- [ ] Speak the isolation-levels + lost-update answer aloud twice

### Day 5 — Coding drills 🔴
- [ ] §9 P1–P8 from a blank editor (target: ≤10 min each)
- [ ] §9 P9–P15 from a blank editor
- [ ] MC1 (rate limiter) built end-to-end in 45 min, timed
- [ ] Re-do whichever two problems felt shaky

### Day 6 — React/cloud + mock day 🟡
- [ ] HCLTech prep re-read (hooks, VDOM/Fiber, call/apply/bind, reduce)
- [ ] §7.2 Webpack: sketch the config skeleton from memory; say the 5 nouns
- [ ] §8.1 GCP↔AWS table: cover the GCP column, recall from the AWS side
- [ ] §8.2 Dockerfile from memory + the `CMD ["node"]`-not-npm reason
- [ ] **Mock:** 60-min self-run Recro round — 10 random §3 questions + P-problem + MC2, out loud, timed
- [ ] **Mock:** 30-min client round — §10.2 questions 1, 4, 5, 7 answered standing up

### Day 7 — STAR + weak-spot sweep 🟢
- [ ] All 8 STAR stories told aloud, ≤2 min each (time them)
- [ ] §10.3 questions memorized (asking crisp questions is a prepared move, not improv)
- [ ] Re-hit your 3 weakest checkboxes from the week
- [ ] §1.2 + §4.1 scripts one final pass — these two carry the most risk
- [ ] Logistics: interview link/venue, resume copies, quiet room, water, notebook

### Day-before checklist
- [ ] Re-read ⚡ Quick Start only (no new material after lunch — consolidation beats cramming)
- [ ] 20-second pitch ×3 aloud
- [ ] Python framing script ×2 aloud
- [ ] Sleep > revision. A rested "let me think for a second" beats a tired instant answer.

---

## 🏁 Final word

The JD wants a Node engineer who can also babysit batch jobs, speak security, and not be scared of a React file. **You are that engineer on 11 of 13 bullets** — the prep above exists to make the other two (Python/Shell, GCP/K8s) cost you a shrug instead of an offer. Walk in leading with VAPT + 6M users + profitable-fintech alignment, be cheerfully honest about the gaps, and prove them closable in the same breath. Go get it. 🚀

