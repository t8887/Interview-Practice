# Master Roadmap — Google-Tier Preparation, Built From YOUR Repository

> Legend used throughout: ✅ exists & good · 🔧 exists, upgrade · ❌ create new · 📦 exists but misfiled (move)
> Every node links to a real path in `Interview-Practice/`. Nothing useful gets discarded (your rule #18).

---

## 0. Operating Principles

1. **Two tracks always.** Track A = active pipeline (revise from `*-mnc-frequently-asked.md`, JS puzzles, company files — already fit for purpose). Track B = this roadmap. Never pause Track A for Track B.
2. **The unit of progress is an artifact, not a reading session.** A solved problem file, an upgraded note, a design write-up, a mock log. If a study block produces no file change, it didn't happen.
3. **Every topic runs the loop:** `Learn → Implement → Solve → Explain (aloud) → Review (D1/D3/D7/D21) → Mock`.
4. **Notes are the revision layer, not the learning layer.** Your existing `08-DSA` notes become the thing you re-read *after* solving, not instead of it.

---

## 1. Knowledge Graphs (annotated with your files)

### 1a. DSA dependency chain

```
Complexity analysis ❌ (create 16-DSA-Practice/00-complexity.md — 1 page, Big-O of your own past solutions)
  ↓
Arrays & Strings ✅ 08-DSA/01  →  Hashing ✅ 08-DSA/02
  ↓
Two Pointers ✅ 08-DSA/03  →  Sliding Window ✅ 08-DSA/05
  ↓
Prefix Sum 📦 (in 01-JavaScript/03 — move to 08-DSA/12)
  ↓
Binary Search ✅ 08-DSA/10 (+ variants 📦 from 01-JavaScript/03)
  ↓
Stack/Queue ✅ 08-DSA/04  →  Monotonic Stack 📦 (01-JavaScript/03 → 08-DSA/13)
  ↓
Linked List ✅ 08-DSA/06 (+ Floyd cycle 📦)
  ↓
Recursion → Backtracking 📦❌ (template in 01-JavaScript/03; needs full file 08-DSA/14)
  ↓
Trees ✅ 08-DSA/07  →  BST ❌ (extend 07)  →  Heap/Priority Queue ❌ 08-DSA/15  →  Trie 📦 (01-JavaScript/02 → 08-DSA/16)
  ↓
Graphs ✅ 08-DSA/08  →  Topological Sort ❌  →  Union-Find ❌  →  Dijkstra ❌ (one file: 08-DSA/17-graph-advanced.md)
  ↓
Intervals ❌ 08-DSA/18  →  Greedy ❌ 08-DSA/19
  ↓
Dynamic Programming ✅ 08-DSA/09 (1D/2D/knapsack/LIS/LCS present; add subsequence-string DP + tree DP section)
  ↓
Bit Manipulation ❌ 08-DSA/20 (light — 1 file, 8 problems)
```

### 1b. JavaScript → Node.js chain

```
Execution context / scope / closures ✅ 01-JavaScript/01
  ↓
this / prototypes / classes ✅ 01-JavaScript/04+05-answers
  ↓
Event loop (browser) ✅ puzzles in 01-JavaScript/05-tricky
  ↓
Promises internals + polyfills ✅ 01-JavaScript/01
  ↓
Generators / iterators ❌ (add 01-JavaScript/06-generators-iterators.md)
  ↓
Memory & GC ❌ (add 01-JavaScript/07-memory.md — feeds Node leak lab)
  ↓
NODE: runtime architecture + event loop ✅✅ 03-NodeJS/01 (gold standard — reuse its format everywhere)
  ↓
libuv thread pool ✅ (inside 01)  →  Async patterns 🔧 03-NodeJS/02 (+ p-limit, AsyncLocalStorage)
  ↓
Streams & backpressure 🔧 03-NodeJS/03 (highWaterMark, drain, pipeline, Transform)
  ↓
Workers vs Cluster vs PM2 🔧 03-NodeJS/03 (decision table)
  ↓
Error handling & graceful shutdown 🔧 03-NodeJS/04
  ↓
Memory-leak lab ❌ 03-NodeJS/07 (one real heap-snapshot exercise)
  ↓
Production architecture ✅ 03-NodeJS/05 + 07-System-Design/02
```

### 1c. React chain (P2 — run after backend rails)

```
Rendering & re-rendering ✅ 04-React/02 → Hooks ✅ 04-React/01 → Memoization ✅ 04-React/03
  ↓
Reconciliation → Fiber internals 🔧 (lanes, scheduler — extend 04-React/02)
  ↓
Concurrent features ❌ 04-React/07 (useTransition, useDeferredValue, Suspense)
  ↓
State management ✅ 04-React/04 + 05-Redux/*
  ↓
Testing ❌ 04-React/08 (extract RTL content trapped in 12-Company/citiustech-L1!)
  ↓
Architecture & RSC awareness ❌ (half-page in 04-React/07)
```

### 1d. System Design chain

```
Networking ✅ in-depth/01 → extend into 17-CS-Fundamentals/networking/
  ↓
OS basics ❌ 17-CS-Fundamentals/os/ (NEW rail — nothing exists)
  ↓
Databases ✅ in-depth/03 + internals ❌ 17-CS-Fundamentals/database-internals/
  ↓
Caching ✅ in-depth/04 + Redis depth ❌ 20-Redis-OpenSearch/redis/
  ↓
Search ❌ 20-Redis-OpenSearch/opensearch/ (inverted index → shard sizing → YOUR migration)
  ↓
Load balancing & scaling ✅ in-depth/02
  ↓
Queues & async ✅ in-depth/06 → Distributed systems ❌ 19-Distributed-Systems/ (7 files)
  ↓
Reliability ✅ in-depth/07 → Observability 🔧 (extend 07-System-Design/02)
  ↓
Classic designs ✅ in-depth/08 (8 done) → +6 new designs ❌ → YOUR-system design docs ❌ (highest leverage)
  ↓
LLD rail: SOLID 🔧 14-Design-Patterns/fundamentals → patterns ❌ (complete per its todo.md) → machine coding ❌ 18-LLD-Machine-Coding/
```

---

## 2. The Phases

### PHASE 0 — Repository Cleanup & Safety (Days 1–3, ~4 hrs total)

**Objective:** stop the bleeding, sync reality, create the practice scaffolding.

1. 🔒 **Make repo private** (or split public-notes / private-war-room). Remove resume PDF + candidate ID. *(30 min — details in `01_REPOSITORY_ANALYSIS.md` urgent section.)*
2. Commit your local uncommitted work (recent company preps) so the repo reflects reality.
3. `git rm -r design-patterns/` (duplicate of `14-`).
4. Resolve System-Design duplication: keep in-depth/01–08 split files; convert `in-depth/01-system-design-interview-prep.md` into a linked index.
5. Move misfiled DSA: `01-JavaScript/03-pattern-based-must-know.md` content → `08-DSA/` (prefix-sum, monotonic-stack, backtracking, binary-search-variants files); LRU/LFU/Trie from `01-JavaScript/02` → practice corpus.
6. Create empty scaffolding: `16-DSA-Practice/` `17-CS-Fundamentals/{os,networking,database-internals}/` `18-LLD-Machine-Coding/` `19-Distributed-Systems/` `20-Redis-OpenSearch/{redis,opensearch}/` `21-Mock-Interviews/` `22-Revision/`.
7. Rewrite `TRACKING.md` as rolling tracker (template §4 below). Fix TS "Not Started" lies. Renumber `01-JavaScript/05-answers.md`.
8. Install the Claude Code command system (`05_CLAUDE_CODE_PROMPT_SYSTEM.md`) — it automates 5–7 and everything after.

**Completion criteria:** repo private ✓ · duplicate gone ✓ · scaffolding committed ✓ · `/prep-daily` runs ✓.

---

### PHASE 1 — Foundations (Week 1, alongside Phase 2 start)

**Objective:** complexity fluency + first CS-fundamentals rail + TS gap opened.
**Prerequisites:** none. **Existing:** JS fundamentals ✅ strong — skip relearning.
**Create:** `16-DSA-Practice/00-complexity.md` (Big-O drill: annotate 10 of your existing repo solutions with time/space + justification) · `17-CS-Fundamentals/os/01-processes-threads.md` (must include: "how does this show up in Node?" section — thread pool, worker_threads, why fork() ≠ cluster fork).
**Completion criteria:** you can state complexity of any of your 08-DSA solutions in <30s with justification; you can explain process vs thread vs Node worker in 2 min aloud, recorded.

### PHASE 2 — Problem-Solving Engine (Weeks 1–10 · THE priority)

**Objective:** 2/5 → 4/5 solving ability. ~130–150 logged problems across all patterns.
**Method — non-negotiable per problem:**
1. Read problem. 5 min silent thinking, write approach in comments *before* code.
2. Attempt 25 min (easy: 15). Talking aloud from week 3 onward.
3. Stuck → 1 hint max → 10 more min → then study optimal from your `08-DSA` note.
4. Write the problem file in `16-DSA-Practice/<pattern>/<problem>.js`:
   ```js
   // LC 239 Sliding Window Maximum | Hard | 2026-08-24
   // Attempt: 31 min | Hints: 1 (monotonic deque) | Result: solved-with-hint
   // Brute force: O(n·k) — check window max each slide
   // Optimal: monotonic decreasing deque, O(n)/O(k)
   // Edge cases: k=1, k=n, all-equal, strictly decreasing
   // Redo: D3 ✗→D7
   ```
5. Log line appended to `16-DSA-Practice/LOG.md` (the `/prep-daily` command does this).
**Sequence & counts:** arrays/strings/hashing 15 → two-pointers/sliding-window/prefix-sum 15 → binary search 8 → stack/queue/monotonic 10 → linked list 8 → recursion/backtracking 12 → trees/BST 15 → heap/trie 10 → graphs (BFS/DFS/topo/UF/Dijkstra) 18 → intervals/greedy 10 → DP 20 → bit manip 6.
**Completion criteria (the honest bar):** 3 *unseen* mediums solved clean in ≤25 min each, narrated, across different patterns, in one sitting. Until that happens, Phase 2 isn't done regardless of problem count.

### PHASE 3 — Language & Runtime Mastery (Weeks 2–5, parallel rail, ~4 hrs/wk)

**Existing:** Node event loop ✅ · JS internals ✅.
**Do:** TypeScript advanced block (`02-TypeScript/07-advanced-types.md` — conditional, mapped, infer, template literal + **10 type katas** in `02-TypeScript/katas/`: DeepPartial, PathsOf<T>, typed EventEmitter, exhaustive reducer) · Node upgrades (streams/backpressure 🔧, error/shutdown 🔧, **one real memory-leak lab** ❌ `03-NodeJS/07`: write a leaking server, capture 2 heap snapshots, find it, fix it, document) · JS additions (generators ❌, memory/GC ❌).
**Completion criteria:** all 10 katas compile with no `any`; you can demo the leak-hunt from your own lab notes; you can explain backpressure with `highWaterMark` numbers.

### PHASE 4 — Frontend Engineering (Weeks 8–10, parallel, ~3 hrs/wk — P2)

Fiber depth 🔧, concurrent features ❌, testing ❌ (extract RTL from citiustech file), RSC awareness ❌.
**Completion criteria:** whiteboard the render→commit pipeline; explain when useTransition helps and when it doesn't; write one RTL test suite for a form component.

### PHASE 5 — Backend & Data Engineering (Weeks 3–8, parallel rail, ~4 hrs/wk)

**The resume-defense phase.**
- `20-Redis-OpenSearch/redis/`: 01-data-structures-use-cases, 02-caching-patterns (link ✅ in-depth/04), 03-eviction-ttl, 04-distributed-locks (Redlock + its critiques), 05-pubsub-vs-streams, 06-stampede-hotkeys.
- `20-Redis-OpenSearch/opensearch/`: 01-inverted-index, 02-analyzers-mappings, 03-query-dsl-filter-vs-query, 04-scoring-bm25, 05-aggregations, 06-shards-sizing, **07-MY-migration.md — rewrite your 2s→200ms UTEC story with full internals: what the mapping was, which analyzer, why latency dropped, shard count, what you'd do differently.** This one file de-risks your hardest expected interview drill.
- DB internals: `17-CS-Fundamentals/database-internals/` — B+Tree pages, MVCC, locking + **reproduce one deadlock in MySQL yourself and write it up**, isolation-anomaly table.
**Completion criteria:** 10-min recorded talk defending the OpenSearch migration with internals; deadlock repro committed; Redis lock trade-offs explained without notes.

### PHASE 6 — System Design + LLD + Distributed (Weeks 4–12, parallel rail, ~5 hrs/wk)

- **HLD:** 1 design/week aloud (45-min timer, framework from your ✅ in-depth/08): weeks 4–12 → Rate limiter (revise) → Notification system (**yours — write the UTEC version as a design doc**) → Payment system ❌ → News feed ranking ❌ → Chat deep-dive → Web crawler ❌ → File storage ❌ → Search autocomplete (revise + OpenSearch tie-in) → Logging/analytics platform ❌. Plus a capacity-estimation drill sheet ❌ (`07-System-Design/in-depth/00-estimation.md`) — practice 5-min QPS→storage→bandwidth for every design.
- **LLD:** complete `14-Design-Patterns` per its own todo.md (structural + behavioral, each ≥ Factory-file depth, TS examples) + `18-LLD-Machine-Coding/` one per week: Parking Lot → LRU cache class (you have the logic ✅ — now do full OO API design) → Rate limiter class → Splitwise → BookMyShow → Elevator. Each = requirements, class diagram, working TS, extension question answered.
- **Distributed:** `19-Distributed-Systems/` 7 files, each anchored to YOUR experience: 01-cap-pacelc, 02-consistency-models, 03-idempotency (your SQS consumers!), 04-delivery-semantics-exactly-once-myth, 05-outbox-saga (map to your EventBridge flows), 06-distributed-locks, 07-clocks-ordering.
**Completion criteria:** 9 design docs exist; 6 LLD solutions run; you can narrate outbox pattern using your own Lambda architecture as the example.

### PHASE 7 — Cloud & Production (Weeks 9–11, light, ~2 hrs/wk)

Scenario Qs into each `15-AWS-Services/*` file ("design X — which services, why, cost"), DR patterns with RTO/RPO, quota gotchas (Lambda concurrency, API GW 29s, SQS visibility). Optional: schedule SAA-C03 after week 12.
**Completion criteria:** answer 3 scenario questions cold per service file.

### PHASE 8 — Interview Simulation (Weeks 4→∞, escalating)

- Week 4+: 1 DSA mock/week (Pramp/peer/Claude-as-interviewer via `/prep-mock` in file 05). Log every mock in `21-Mock-Interviews/` with rubric: communication / approach / correctness / complexity / edge cases, 1–4 each.
- Week 7+: alternate DSA and system-design mocks.
- Week 10+: full loop simulation (2 DSA + 1 design + 1 behavioral in one day) once.
- Behavioral rail: +1 STAR story/week into `10-Interview-Prep/` until 10 exist, each mapped to Google axes (GCA / leadership / googleyness / role knowledge).
**Completion criteria:** 8+ logged mocks; last 3 DSA mocks scored ≥3/4 average; full-loop day completed.

---

## 3. Prioritization (formula: interview-frequency × gap × dependency-weight × role-relevance)

| Priority | Items | Why |
|---|---|---|
| **P0** | Repo privacy · DSA engine (arrays→graphs core) · OpenSearch depth · Redis depth · idempotency/delivery-semantics · design-docs of your own systems | Highest frequency × largest gap × everything downstream depends on them × directly on your resume |
| **P1** | LLD rail · DP mastery · TS advanced · Node streams/leak-lab · DB internals · OS rail · behavioral expansion · weekly HLD reps · mocks | Standard senior-loop gates; medium-large gaps |
| **P2** | React Fiber/concurrent/testing · AWS scenarios · networking extension · Agentic-AI additions · security notes | Real but smaller gaps, or areas already near-bar |
| **P3** | Redux (done) · advanced DSA (segment tree, digit DP) · MST proofs · EKS depth | Low frequency for your target role, or complete |

---

## 4. The Linked-Documentation Standard (apply to every new/upgraded file)

Header template — this is what turns notes into an operating system:

```markdown
---
topic: Streams & Backpressure
level: advanced        # beginner|intermediate|advanced|expert
status: solid          # todo|draft|solid|mastered
last_reviewed: 2026-08-24
next_review: 2026-08-31   # D1/D3/D7/D21 chain
---
## Prerequisites
[Event Loop](../03-NodeJS/01-event-loop.md) · [Buffers](./03-streams-workers.md#buffers)
## Related
[Message Queues](../07-System-Design/in-depth/06-message-queues.md) · [SQS](../15-AWS-Services/messaging-integration.md)
## Interview Questions   (5–10, hardest first)
## Exercises             (≥1 implementation task)
## My Real-World Usage   (which of your 4 project stories this connects to)
## Common Mistakes
```

The `/prep-link` command in file 05 retrofits this onto existing files in batches. `next_review` powers `/prep-revise` (spaced repetition D1→D3→D7→D21; a topic is *mastered* only after a clean D21 recall).

## 5. Rolling Tracker (replaces the dead 30-day sprint in TRACKING.md)

```markdown
# Week of 2026-08-24  ·  Phase 2 wk1 + Phase 1
Mon | 2 problems (arrays) ✅ | OS: processes-threads draft ✅
Tue | 2 problems (hashing) ✅ | —
...
## Weekly exit review (Sun, 20 min)
Problems: 12/12 · unaided-medium streak: 1 · Mocks: 0 (starts wk4)
Due reviews cleared: 8/8 · Biggest struggle: off-by-one in sliding window
Next week adjustment: +2 sliding-window redos
```

---

*Weekly execution tables (12-week and 24-week) → `04_WEEKLY_PLANS.md`. Automation for all of the above → `05_CLAUDE_CODE_PROMPT_SYSTEM.md`.*
