# Repository Analysis — `t8887/Interview-Practice`

> Analyzed: 18 Aug 2026 · Cloned from GitHub (public) · 103 files · ~204,000 words · Last commit: **8 Jun 2026** ("added-redme-file")
> ⚠️ The GitHub copy is **~10 weeks behind your local repo** — your recent company preps (Guardian, Coforge, HDFC Ergo/EY Apigee, Metron, Coffeee.io, Recro/CheQ, bolttech) are not committed. Re-run the deep analysis locally with the prompt system in `05_CLAUDE_CODE_PROMPT_SYSTEM.md` to cover everything.

---

# 🚨 URGENT — Fix Before Anything Else (P0, today)

**Your repository is PUBLIC, and it exposes your entire negotiation position.** Any recruiter or HR person who opens the GitHub link on your resume/LinkedIn can read:

| Exposure | Where | Why it hurts you |
|---|---|---|
| **Real current CTC: ₹12 LPA, with breakdown (₹10L base / ₹1.5L variable / ₹0.5L benefits)** | `13-Salary-Negotiation/salary-negotiation-mastery.md` (lines 162–200) | HR now knows your floor. Every anchor you set at 20–25 LPA is instantly discounted. This alone can cost you lakhs. |
| **Your target bands (₹18–22 LPA) and every negotiation script + fallback** | Same file | They can read your playbook before the call. |
| **Phone number + locality (Hinjewadi)** | `OnkarSawant-FullStack-Developer-5+Years.pdf` in repo root | Scrapeable personal data on a public repo. |
| **Infosys Candidate ID (1002894770)** | `12-Company/infosys-L2-interview-prep.md` | Account/identity detail in public. |
| **Your full interview pipeline + layoff explanation script** | `12-Company/*` folder names, `10-Interview-Prep/01-stories-behavioral.md` | Companies can see who else you're talking to and your prepared framing. |

**Fix (pick one, do it today):**
1. **Simplest:** `Settings → General → Change visibility → Private`. Done in 30 seconds.
2. **If you want a public portfolio:** split into two repos — public `interview-notes` (folders 01–09, 14, 15 only) and private `interview-war-room` (10, 12, 13, resume, tracking). Note: making a repo private does **not** scrub GitHub caches/forks of past public commits — assume the CTC number is already seen, and negotiate from market value, not from current CTC ("I'd prefer to discuss the value of the role; my expectation is X based on market benchmarks").

---

# Executive Summary

## 1. Repository Health Score

| Dimension | Score | Evidence |
|---|:---:|---|
| Organization & structure | 7.5/10 | Clean numbered folders 01–15, logical sequence, good README hub. Marred by an exact duplicate folder and DSA content misfiled under JavaScript. |
| Content depth | 6/10 | Median file ≈ 900–1,200 words: strong revision notes, but few files reach "teach it from scratch" depth. Standouts: Node event loop, System Design in-depth, JS puzzles. |
| Coverage vs Google-tier syllabus | 5.5/10 | Zero OS coverage, no LLD practice, Design Patterns is a stub (2 of ~12 sections), 10 of ~22 DSA patterns present, no distributed-systems discipline, no Redis/OpenSearch deep files. |
| **Practice-to-theory ratio** | **3/10** | **1 code file (`01-JavaScript/Practice/1.js`) vs 100 markdown files.** The repo reads about problems; it does not solve them. This is the #1 structural issue for Google-level goals. |
| Freshness & sync | 5/10 | TRACKING.md is a stale 30-day sprint (started 24 Mar 2026); GitHub is 10 weeks behind local; tracker contradicts repo (TypeScript marked "Not Started" while 6 TS files exist; notes still reference old folder name `11-JS-Puzzles`). |
| Hygiene & safety | 3/10 | Public exposure of CTC/phone/pipeline (above); duplicate `design-patterns/` folder; resume PDF in repo root. |

**Overall: 6.5/10 as an MNC-senior revision hub — it demonstrably works (you've been clearing L1/L2 rounds). 4/10 as a Google-tier preparation operating system — the gap is not knowledge notes, it's solving reps, LLD, and CS fundamentals.**

## 2. Current Strengths (evidence-based — protect these)

1. **Node.js internals** — `03-NodeJS/01-event-loop.md` (1,946 words) is genuinely excellent: 6-queue priority model, "microtasks drain between every callback" rule, libuv phase walkthrough, thread-pool sizing, blocking detection + fixes, worked execution-order traces. This is interview-winning material.
2. **JavaScript machine coding** — `01-JavaScript/01` + `02` + `03`: 20+ polyfills/utilities (Promise.all/race, debounce, throttle, curry, deep clone, EventEmitter), LRU (Map+DLL), LFU, Trie + autocomplete, rate limiters. Plus 5,240 words of output puzzles **with** a 6,366-word answer key. This is exactly what Razorpay/Flipkart/Cred screens test.
3. **System Design in-depth** — 8 progressive files (networking → scalability → databases → caching → architecture → queues → reliability → 8 classic designs with real decisions: fan-out-on-write for Twitter, WebSocket+queue for WhatsApp, GeoHash for Uber). Best-organized section in the repo.
4. **Behavioral foundation** — 4 STAR stories with real numbers (Lambda migration, OpenSearch 2s→200ms, Risk.ai prompt infra, VAPT) + a rehearsed layoff script.
5. **Agentic AI** — 3 files backed by real EY Risk.ai experience. Very few candidates at your level have this; it's a genuine differentiator in 2026 loops.
6. **Company-prep muscle** — 76K words across 8 companies shows you can spin up targeted prep fast.

## 3. Critical Gaps

| # | Gap | Evidence | Why it blocks Google-tier |
|---|---|---|---|
| 1 | **DSA solving practice** | 10 pattern-note files (avg ~950 words) containing *final* solutions + a "Problems to Solve" wishlist; 1 actual code file in the whole repo; no attempt logs, no brute→optimal derivations, no complexity/edge-case sections. Missing patterns entirely: heap, intervals, greedy, backtracking*, monotonic stack*, prefix sum*, trie*, union-find, topological sort, Dijkstra, bit manipulation (*exist but misfiled in `01-JavaScript/`). | Google/product loops = 2–3 live coding rounds. Reading solutions ≠ producing them in 25 min while talking. |
| 2 | **LLD / OOD** | `14-Design-Patterns/` is a stub: fundamentals files are 80–270 words, only Singleton + Factory done, its own `todo.md` shows 9 of 12 sections pending. Zero machine-coding design problems (Parking Lot, BookMyShow, Splitwise…). | Standard dedicated round at Indian product companies (Flipkart, Swiggy, Razorpay, Atlassian) for 6-yr candidates. |
| 3 | **CS fundamentals — OS** | No folder, no file. Nothing on processes/threads, scheduling, virtual memory, deadlocks. | Asked directly at Google-tier + underpins every Node.js concurrency answer you give. |
| 4 | **Distributed systems as a discipline** | Fragments inside queues/reliability files, but no CAP/PACELC, consistency models, idempotency, saga/outbox, delivery semantics, distributed locks as standalone mastery. | Senior system-design rounds live here; "at-least-once + idempotent consumer" is a near-guaranteed question for your queue-heavy resume. |
| 5 | **Redis + OpenSearch depth vs resume claims** | Resume/story claims OpenSearch migration (2s→200ms) and caching ownership, but repo has only AWS-service-level notes (`15-AWS-Services/analytics-search.md`, 845w) and caching strategies. No inverted index, analyzers, query DSL, shard sizing; no Redis data structures, distributed locks, eviction internals. | Interviewers drill exactly where your resume claims wins. This is your highest-risk resume-vs-prep mismatch. |
| 6 | **Notes exist, links don't** | Zero cross-references between files (e.g., event loop ↛ JS microtasks ↛ streams). Monotonic stack lives in the JS folder, not DSA. Duplicate `design-patterns/` + a 6,816-word `in-depth/01-system-design-interview-prep.md` that duplicates the 8 split files' headers. | You asked for an interconnected operating system; right now it's isolated notes. |

## 4. Highest-Priority Topics (P0 → start this week)

1. Repo privacy fix (above).
2. **DSA solving engine** — arrays/hashing → two pointers → sliding window first (details in `03_MASTER_ROADMAP.md`).
3. OpenSearch + Redis deep files (defend your own resume).
4. Distributed-systems primer (idempotency, delivery semantics, outbox) — directly feeds your Lambda/SQS stories.
5. LLD sprint kickoff (SOLID properly + 1 machine-coding problem/week).

## 5. Estimated Readiness Level

- **India MNC / service-co senior loops (your current pipeline):** ~75–80% ready. Your notes + company files are well-matched; keep using them as-is for Encora-style L2s.
- **Google-tier product loops (stated goal):** ~40–45% ready. Blockers: DSA (2/5 vs needed 4/5), LLD (1.5/5 vs 3.5/5), OS (0.5/5), distributed systems (2/5). Full scoring in `02_SKILL_GAP_AND_READINESS.md`.
- **Realistic timeline to Google-tier bar:** 12 weeks at 3.5–4 focused hrs/day, or 24 weeks at ~2 hrs/day. Plans in `04_WEEKLY_PLANS.md`.

## 6. Recommended Preparation Sequence

**Two tracks, run in parallel:**
- **Track A — Active pipeline (now):** keep revising from `*-mnc-frequently-asked.md` files, JS puzzles, Node event loop, behavioral stories. These are already fit for purpose. Don't pause live interviews to "finish the syllabus."
- **Track B — Google-tier build (12–24 wk):** Phase 0 cleanup → DSA solving engine → CS fundamentals rail → LLD → distributed systems → design reps → mock loops. Full dependency-ordered plan in `03_MASTER_ROADMAP.md`.

---

# Repository Map & Folder-by-Folder Verdicts

```
Interview-Practice/                    103 files · ~204K words
│
├── 01-JavaScript/        6 md + 1 js   ✅ KEEP + SPLIT (move DSA content out)
├── 02-TypeScript/        6 md          🔧 IMPROVE (advanced type system missing)
├── 03-NodeJS/            6 md          ✅ KEEP + deepen streams/memory
├── 04-React/             6 md          🔧 IMPROVE (Fiber/concurrent/testing)
├── 05-Redux/             3 md          ✅ KEEP (done)
├── 06-SQL-MySQL-MongoDB/ 5 md          🔧 IMPROVE (internals: B+Tree, MVCC, locks)
├── 07-System-Design/     4 + 8 md      ✅ KEEP + MERGE dup + EXTEND designs
├── 08-DSA/               11 md         🔴 REBUILD as practice engine (P0)
├── 09-Agentic-AI/        3 md          ✅ KEEP (differentiator; light additions)
├── 10-Interview-Prep/    1 md          🔧 EXTEND (4 → 10 stories)
├── 11-AI-Risk-Assistant-Project/ 1 md  🔧 BUILD or reframe as design doc
├── 12-Company/           8 md          🔒 MOVE PRIVATE + sync local files
├── 13-Salary-Negotiation/1 md          🔒 MOVE PRIVATE immediately
├── 14-Design-Patterns/   8 md          🔴 COMPLETE (stub; own todo 9/12 pending)
├── 15-AWS-Services/      9 md          ✅ KEEP + scenario questions
├── design-patterns/      8 md          ❌ DELETE (byte-identical duplicate of 14)
├── OnkarSawant-...pdf                  ❌ REMOVE from repo (public PII)
├── README.md                           🔧 UPDATE after restructure
└── TRACKING.md                         🔧 REWRITE (stale 30-day sprint → rolling system)
```

**Missing folders to create** (additive — nothing useful gets discarded):
`16-DSA-Practice/` (solved code corpus + attempt log) · `17-CS-Fundamentals/` (os/, networking/, database-internals/) · `18-LLD-Machine-Coding/` · `19-Distributed-Systems/` · `20-Redis-OpenSearch/` · `21-Mock-Interviews/` (logs + rubric) · `22-Revision/` (spaced-repetition queue)

---

# File-by-File Analysis

### 01-JavaScript/ — depth range 743–6,366 words · Interview importance: **Critical**

| File | Words | Verdict | Notes |
|---|---:|---|---|
| `01-closures-promises-polyfills.md` | 2,163 | **Keep** | 20+ implementations (once, memoize, curry, pipe, Promise.all/race/allSettled, debounce, throttle, deep clone, bind/call/apply, EventEmitter). Add: thenable/chaining edge cases to the Promise polyfill; `AbortController`-aware debounce. |
| `02-advanced-senior-level.md` | 1,503 | **Split** | LRU (Map+DLL), LFU, Trie+autocomplete, Design Twitter, URL shortener, rate limiters. LRU/LFU/Trie belong in the DSA practice corpus; Twitter/URL-shortener duplicate `07-System-Design/in-depth/08`. Keep JS-specific parts here, cross-link the rest. |
| `03-pattern-based-must-know.md` | 2,222 | **Move → 08-DSA** | Kadane's, Floyd's cycle, binary-search variants, prefix sum, monotonic stack, backtracking template — this is pure DSA misfiled under JavaScript, which is why the DSA folder looks thinner than it is. |
| `04-mnc-frequently-asked.md` + `05-answers.md` | 1,961 + 6,366 | **Keep** | 40 Q&A pairs — your best rapid-revision asset. Minor: renumber `05-answers.md` (two files share prefix `05`). |
| `05-tricky-output-puzzles.md` | 5,240 | **Keep** | Output-prediction drills (closure traps, async ordering, prototype chain). Add a "why" line to any puzzle missing one. |
| `Practice/1.js` | — | **Grow** | The lone code file in the repo. Symptom, not sin: the whole repo needs a practice layer. |

**Missing here:** generators/iterators as a topic, structured memory-management notes (GC generations, leak patterns tie into Node), `WeakRef/FinalizationRegistry`, Proxy/Reflect. Priority **P1**.

### 02-TypeScript/ — 637–1,465 words · Importance: **High**

Covers generics, utility types, narrowing, interfaces-vs-types, async, MNC Qs at solid intermediate depth. **Contradiction:** TRACKING.md marks all TS tasks "Not Started" — tracker and repo are out of sync, so your own dashboard under-reports you.

**Missing (the exact topics senior TS rounds use to separate levels):** conditional types, mapped types, `infer`, template-literal types, discriminated-union exhaustiveness (`never` checks), declaration merging, `satisfies`, type-level exercises (build `DeepPartial`, `PathsOf<T>`, a typed event emitter), tsconfig strictness flags, runtime-boundary validation (zod-style) as an architecture topic. Verdict: **Improve**, P1.

### 03-NodeJS/ — 801–1,946 words · Importance: **Critical** (your flagship)

| File | Verdict | Notes |
|---|---|---|
| `01-event-loop.md` (1,946w) | **Keep — gold standard** | Use this file's format as the template when upgrading every other file. |
| `02-async-patterns.md` (900w) | Improve | Add: promise concurrency control (p-limit pattern from scratch), async context tracking (`AsyncLocalStorage`) — you'll get asked about request-scoped logging. |
| `03-streams-workers.md` (902w) | **Improve (priority)** | Needs: backpressure mechanics (`highWaterMark`, `drain`, why `pipe` vs `pipeline`), Transform streams, worker_threads vs cluster vs PM2 decision table, `SharedArrayBuffer`/`Atomics` mention. Your "245+ Lambdas" story invites streams/backpressure follow-ups. |
| `04-error-handling.md` (801w) | Improve | Add: `unhandledRejection` policy, graceful shutdown (SIGTERM, draining keep-alive), retries + idempotency keys, error taxonomies (operational vs programmer). |
| `05-express-design.md` (810w) | Keep | Add rate-limiting middleware internals + request validation layering. |
| `06-mnc-frequently-asked.md` (1,704w) | Keep | — |

**Missing:** memory-leak lab (take a heap snapshot, find a leak — do it once for real), profiling (`--inspect`, flamegraphs), Node LTS feature awareness. **P1.**

### 04-React/ — 750–1,886 words · Importance: **High** (P2 for backend-lean targets)

Hooks deep-dive, rendering/reconciliation, memoization, state management, patterns, MNC Qs — good working coverage. **Missing:** Fiber architecture beyond name-drop (lanes, scheduler, work loop), concurrent features (`useTransition`, `useDeferredValue`), Suspense data patterns, Server Components awareness, error boundaries, testing with RTL (oddly, some RTL content lives inside `12-Company/citiustech-L1`— extract it). Verdict: **Improve**, P2.

### 05-Redux/ — RTK, RTK Query, MNC Qs. Adequate and done. **Keep**, P3.

### 06-SQL-MySQL-MongoDB/ — 1,031–1,926 words · Importance: **High**

Joins/indexing, transactions/isolation, Mongo schema/aggregation, EXPLAIN tuning, MNC Qs — genuinely practical. **Missing (the "internals" layer Google-tier probes):** B+Tree page mechanics and why covering indexes work, MVCC/undo logs, gap/next-key locks + reproduce a deadlock yourself, isolation anomalies table (dirty/non-repeatable/phantom mapped to levels), window functions drills, Mongo WiredTiger + sharding key design. Verdict: **Improve**, P1.

### 07-System-Design/ — Importance: **Critical** · Your best section

Top-level 4 files (auth/caching/API, queues/scaling/observability, architecture scenarios, MNC Qs) + `in-depth/` with 8 progressive files ending in 8 classic designs.

**Issue found:** `in-depth/01-system-design-interview-prep.md` (6,816w) has the **same 8 section headers** as the 8 individual in-depth files — internal duplication. **Merge decision needed:** keep the split files as canonical, turn the big file into a linked index (or delete it). Maintaining both guarantees drift.

**Missing designs vs target list:** Payment system (critical for fintech targets), News Feed ranking (beyond fan-out), Web Crawler, Logging/Analytics platform, File storage (Dropbox-style), Food delivery. **Missing skills:** a capacity-estimation drill sheet (QPS→storage→bandwidth in 5 min), and — highest leverage — **design-doc write-ups of YOUR OWN systems** (UTEC notification engine, the OpenSearch migration, Risk.ai agent architecture). Interviewers spend 20 minutes on "walk me through something you built"; having these pre-written is worth more than two extra classic designs. Verdict: **Keep + Merge + Extend**, P0.

### 08-DSA/ — 743–2,032 words · Importance: **Critical** · 🔴 The blocker

Ten pattern files (arrays-strings, hash-maps, two-pointers, stack-queue, sliding-window, linked-list, trees, graphs, DP, binary-search) + MNC Qs. Format everywhere: *final optimized solution + 1–2-line intuition + unsolved "Problems to Solve" list*. Example: the DP file presents clean space-optimized answers to Climbing Stairs, House Robber, Coin Change, LIS, LCS… with no brute-force derivation, no complexity discussion per problem, no edge cases, no failure log.

**Diagnosis:** these are **revision notes for problems you haven't solved yet** — the order is inverted. README claims "75 problems across 10 patterns"; the repo contains 0 solved-by-you implementations. **Verdict: keep the notes as the revision layer, but build `16-DSA-Practice/` as the primary layer:** one file per problem, your attempt first (even failed), then optimal, complexity, edge cases, and a log line (date, time-taken, hints-needed, redo-date). Missing patterns to add: heap, intervals, greedy, union-find, topological sort, Dijkstra, bit manipulation, monotonic stack + prefix sum + backtracking + trie (migrate from `01-JavaScript/`). **P0.** Full curriculum in `03_MASTER_ROADMAP.md`.

### 09-Agentic-AI/ — **Keep**, P2 maintain

Agents/tools/RAG, frameworks/production, MNC Qs — backed by real EY work. Light additions: agent evals/observability, failure modes (looping, tool-hallucination) with your real mitigations, MCP notes, cost/latency trade-offs. In 2026 loops this section + your Risk.ai story is a legitimate edge — keep it sharp.

### 10-Interview-Prep/ — **Extend**, P1

One file: layoff script + 4 STAR stories + 5 behavioral Q&As + numbers-to-remember. For senior product loops you need **8–10 stories** covering: conflict with a senior/manager, a real failure + postmortem, ambiguity without requirements, influencing without authority, prioritization under deadline, scope pushback, mentoring (exists). Map each story to Google's axes (GCA / leadership / googleyness / role knowledge). Your Kolhapur-construction-style stakeholder management could even seed a "managing difficult stakeholders" story if a work version is thin.

### 11-AI-Risk-Assistant-Project/ — README only (1,137w). Either commit actual code (it becomes portfolio proof) or retitle as a design document and link it from System Design. **P2.**

### 12-Company/ — 8 files, 76K words (37% of the repo) · **Move private + sync**

Capgemini (19.5K), Deloitte (14K + 7K cram), Encora (11K), Persistent (10.2K), CitiusTech (9K), TCS-HR (8.9K), Infosys (5.7K). Observation worth sitting with: **per-company cramming is 37% of your repo while durable-skill practice is ~1%.** Company files decay the moment the interview ends; solved problems compound. The ratio should roughly invert for a Google-tier goal. Also: extract reusable gems (e.g., RTL testing content in CitiusTech, JS table in Deloitte-cram) into topic folders before archiving.

### 13-Salary-Negotiation/ — Excellent playbook, catastrophic location. **Private, today.** (See urgent section.)

### 14-Design-Patterns/ + duplicate `design-patterns/` — 🔴 **Complete + Delete duplicate**

Fundamentals are 80–270-word stubs; only Singleton + Factory exist; `todo.md` honestly shows structural, behavioral, architectural, distributed, frontend, Node, cloud patterns + examples all pending. The duplicate folder at root is byte-identical (`diff -rq` clean) — delete it, keep `14-`. This folder becomes the theory layer under the new `18-LLD-Machine-Coding/`. **P1.**

### 15-AWS-Services/ — **Keep + improve lightly**, P2

Nine files + cheatsheet across compute/storage/databases/networking/messaging/security/IaC/analytics. Good service-level breadth matching real experience. Add: scenario-based questions per file ("design a fan-out image pipeline — which services and why"), cost-optimization drills, DR patterns (backup/restore → pilot light → warm standby → multi-site) with RTO/RPO, service quotas that bite (Lambda concurrency, API GW timeouts, SQS visibility). Align with your SAA-C03 plan.

### Root files

- `README.md` (2,086w): good hub; the "75 problems" claim overstates (they're listed, not solved) — update after restructure.
- `TRACKING.md` (3,776w): 30-day sprint from 24 Mar 2026 — expired, self-contradictory (TS status), references renamed folders. **Rewrite** as a rolling weekly system (template in `03_MASTER_ROADMAP.md`); the `/prep-daily` command in file 05 keeps it honest automatically.
- Resume PDF: remove from repo (PII on public GitHub).

---

# Duplicates & Overlaps (complete list)

1. `design-patterns/` ≡ `14-Design-Patterns/` — byte-identical. Delete root copy.
2. `07-System-Design/in-depth/01-system-design-interview-prep.md` duplicates the content of in-depth files 01–08. Convert to index or delete.
3. DSA patterns split across `01-JavaScript/03-pattern-based-must-know.md` and `08-DSA/*` (Kadane, binary search, prefix sum, monotonic stack, backtracking in the wrong folder).
4. LRU/Trie/URL-shortener appear in both `01-JavaScript/02` and System Design classic problems.
5. Two files share the `05-` prefix in `01-JavaScript/`.
6. RTL/testing content buried in `12-Company/citiustech-L1` instead of `04-React/`.

---

*Next: `02_SKILL_GAP_AND_READINESS.md` for honest 0–5 scoring · `03_MASTER_ROADMAP.md` for the dependency-linked plan · `05_CLAUDE_CODE_PROMPT_SYSTEM.md` to re-run all of this against your fresher local repo and generate the full 20-document set.*
