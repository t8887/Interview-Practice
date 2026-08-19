# Master Roadmap — Google-Tier Preparation, Built From YOUR Repository

> Refines `_meta/imported/03_MASTER_ROADMAP.md` (the Claude.ai baseline, generated from a 10-week-stale GitHub clone with no file-by-file read) using `_meta/KNOWLEDGE_GRAPH.md`, `_meta/SKILL_GAP_ANALYSIS.md`, and `_meta/PRODUCT_COMPANY_READINESS.md` — all built from a full local read of all 100 content files. Per `CLAUDE.md` rule 6, the baseline's structure and phase ordering stand; this version corrects specific claims where local evidence disagreed, and adds one thing the baseline could not have known: **a list of 15 confirmed, reproducible bugs sitting inside content that would otherwise be rehearsed as ready-to-recite.**
>
> Legend: ✅ exists & good · 🔧 exists, upgrade · ❌ create new · 📦 exists but misfiled (move) · 🐛 exists, contains a confirmed bug — fix before reuse.

---

## 0. Operating Principles (unchanged from baseline — still correct)

1. **Two tracks always.** Track A = active pipeline (revise from `*-mnc-frequently-asked.md`, JS puzzles, company files). Track B = this roadmap. **Track A gets the first hour of any day, every day, no exceptions** — this roadmap never pauses a real interview's prep.
2. **The unit of progress is an artifact, not a reading session.** A solved-problem file, an upgraded note, a design write-up, a mock log. No file change, no progress.
3. **Every topic runs the loop:** `Learn → Implement → Solve → Explain (aloud) → Review (D1/D3/D7/D21) → Mock`.
4. **Notes are the revision layer, not the learning layer.** This is no longer a hypothesis — `_meta/PRODUCT_COMPANY_READINESS.md` confirms it directly: DSA notes are independently rated Advanced-to-Expert, and the solving-ability score is *still capped at 2/5* because zero solved-problem artifacts exist. Read that file's DSA row before doubting rule 4 on a tired day.
5. **NEW — Don't rehearse a bug.** This pass found 15 confirmed, reproducible defects (numeric contradictions, crashing code, silently-wrong algorithms) sitting inside otherwise-strong content across the repo. Every one is fixed in Phase 0 below, before any rail that would reuse that content starts. Building Phase 2–8 on unfixed source material would mean practicing the wrong answer until it's memorized.

---

## 1. Knowledge Graphs

Full dependency chains with per-node status live in **`_meta/KNOWLEDGE_GRAPH.md`** — this section only lists what changed against the baseline's chain diagrams, plus the exact new-file numbering this roadmap commits to (baseline and `KNOWLEDGE_GRAPH.md` proposed two compatible but differently-numbered splits; this is the reconciled, authoritative version).

**Corrections to the baseline's DSA chain:**
- **Trie does not need to move.** The baseline's chain said `Trie 📦 (01-JavaScript/02 → 08-DSA/16)`. A full read of `08-DSA/07-trees.md` found it **already contains a correct, complete Trie** (insert/search/startsWith/autocomplete/delete) as a "bonus" beyond its promised scope — confirmed the canonical home. Action shrinks from "create a new file" to "delete or link the weaker duplicate in `01-JavaScript/02-advanced-senior-level.md`."
- **`queue.shift()` is a repo-wide, self-contradicting bug, not just a style nit.** `08-DSA/04-stack-queue.md` explicitly warns against it; `08-DSA/07-trees.md`'s `levelOrder`/`rightSideView` and `08-DSA/11-mnc-frequently-asked.md` Q14 both do it anyway — 3 occurrences of a file breaking its own sibling's stated rule. Bundled into Phase 0.

**Finalized new-file numbering for `08-DSA/`** (baseline's numbers, minus the now-unnecessary Trie file):

| Path | Status | Source |
|---|---|---|
| `08-DSA/12-prefix-sum.md` | ❌ create | migrate from `01-JavaScript/03-pattern-based-must-know.md` |
| `08-DSA/13-monotonic-stack.md` | ❌ create | migrate from `01-JavaScript/03`, cross-link the sliding-window-maximum overlap with `04-stack-queue.md`/`05-sliding-window.md` |
| `08-DSA/14-backtracking.md` | ❌ create | migrate template + expand from `01-JavaScript/03` |
| `08-DSA/15-heap-priority-queue.md` | ❌ create | net new — unblocks Two Heaps, Dijkstra, and an O(N log k) Merge-K-Lists |
| `08-DSA/16-graph-advanced.md` | ❌ create | Dijkstra (named in `08-graphs.md`'s own decision framework, never implemented anywhere), bipartite check — depends on `15` |
| `08-DSA/17-intervals.md` | ❌ create | net new; seed from the correctly-solved Merge Intervals already sitting in `12-Company/metron-security-doselect-prep.md` |
| `08-DSA/18-greedy.md` | ❌ create | net new |
| `08-DSA/19-bit-manipulation.md` | ❌ create | net new, light (6–8 problems) |

**`01-JavaScript/03-pattern-based-must-know.md`'s fate:** don't delete after migration — `KNOWLEDGE_GRAPH.md` independently rates it "best interview-value-to-length ratio found in the repo so far." **Promote it to the `08-DSA/` folder's entry point/index** once its content is split into the files above, rather than discarding it.

**Corrections to the baseline's other chains:**
- **TypeScript's chain needs far less new content than planned.** Baseline assumed a 2.5/5 base and planned a whole new `02-TypeScript/07-advanced-types.md`. Local read found 3.5/5, zero bugs across all 6 existing files, and genuinely Expert-level constructs (recursive `Awaited<T>`, `RequireAtLeastOne<T,K>`, distributive conditional types) already implemented. **Revised scope:** skip building a new file from scratch; add the ~4 specific named gaps (generic variance, `ReturnType`/`Parameters`-on-overloads gotcha, narrowing-lost-in-closures, the `declare module 'express'` cross-link fix) as small additions to the existing files, then spend the freed time on katas.
- **Redis's chain needs extraction, not authorship.** Baseline assumed 1.5/5 near-absent and planned writing 6 files from research. Local read found 3/5 genuinely Expert-level implementation content already exists — buried in `12-Company/recro-cheq-nodejs-prep.md` §6C (Q15–Q20), not the topic folder. **Revised scope:** the `20-Redis-OpenSearch/redis/` files become an extraction-and-generalization pass on already-written, already-verified-correct content, not new research — materially faster than the baseline assumed.
- **Networking needs almost nothing.** Baseline scored it a medium gap. `07-System-Design/in-depth/01-networking-basics.md` is independently rated "Expert — one of the best files in the entire repo" on full read. Only gap: HTTP/3 (QUIC) depth to match the existing TLS 1.3 treatment.
- **HLD's chain is deeper than the baseline knew, but has correctness debt the baseline couldn't see.** 7 of the 15 P0 bugs below live inside the `07-System-Design/` HLD files specifically — see Phase 0.

---

## 2. Phase 0 — Repository Cleanup, Safety & Correctness Debt (Days 1–3, ~7 hrs total)

**Objective:** stop the bleeding, sync reality, create the practice scaffolding, and — new this pass — fix every confirmed bug before any later phase reuses the content it's in.

### 0a. Safety & hygiene (baseline items, unchanged, ~1.5 hrs)

1. 🔒 Make the repo private, or split public-notes/private-war-room. Remove the resume PDF + candidate ID from git history.
2. `git rm -r design-patterns/` (byte-identical duplicate of `14-Design-Patterns/`, confirmed via `diff -rq`).
3. Commit the local-only company preps (11 entries per `_meta/INVENTORY.md`'s uncommitted-vs-GitHub delta) so the repo reflects reality.
4. Remove the leftover AI-chat sentence in `14-Design-Patterns/README.md` ("If you'd like, I can proceed to generate the next phase contents step-by-step").

### 0b. Correctness-debt paydown — 15 confirmed bugs, ~3.5 hrs total (NEW this pass)

Every row is a specific, reproducible defect found during `/prep-analyze`'s full read, confirmed and cross-referenced during `/prep-gaps`. Fix time is per-bug, not cumulative guesswork.

| # | File | Bug | Fix | Est. |
|---|---|---|---|---|
| 1 | `10-Interview-Prep/01-stories-behavioral.md` + `12-Company/encora-L2-backend-engineer.md` + `capgemini-L2-interview-prep.md` + `tcs-L2-hr-preparation.md` + `persistent-aws-backend-developer.md` (×2 internally) | **The flagship "OpenSearch 2s→200ms" story is stated with 8+ mutually contradictory values across 6 files** — the single biggest resume-defense risk found (`PRODUCT_COMPANY_READINESS.md` Mismatch §1). | Pick CLAUDE.md's "2s→200ms" (already independently agreed by 4+ files) as canonical; correct every outlier. **Blocks Phase 5's `07-MY-migration.md`.** | 30 min |
| 2 | `01-JavaScript/06-answers.md` Problem 86 | `deepClone` has no circular-ref guard — a live bug in a self-described *answer key*, regressing the correct WeakMap version in `01-closures-promises-polyfills.md`. | Copy the WeakMap guard across; add the same self-referencing test case. | 5 min |
| 3 | `07-System-Design/01-auth-caching-api.md` | Distributed lock deletes unconditionally in `finally` — the textbook Redlock-unsafe pattern (no owner-check before delete). | Atomic Lua check-and-delete, matching the correct pattern already in `recro-cheq-nodejs-prep.md` §6-Q20. | 15 min |
| 4 | `07-System-Design/in-depth/05-system-architecture.md` | Payment Kafka consumer reuses the Inventory service's `consumer` variable/group — breaks the section's own "independent services" teaching point. | Give Payment its own `kafka.consumer({ groupId: 'payment-service' })`. | 5 min |
| 5 | `07-System-Design/in-depth/06-message-queues.md` | DLQ retry counter declared outside the per-message callback — shared across all messages, so one message's success silently resets another's count. | Track retry count per-message via RabbitMQ `x-death` header or a message-id-keyed map. | 10 min |
| 6 | `07-System-Design/in-depth/07-reliability-and-availability.md` | `ConsistentHash.getServer()` linear-scans a structure built for binary search; `removeServer()`'s filter runs *after* the values it filters on are already deleted, so it removes nothing. | Binary search in `getServer()`; reorder `removeServer()` so the filter runs before deletion. | 20 min |
| 7 | `07-System-Design/in-depth/08-classic-design-problems.md` | URL shortener's insert-then-update isn't atomic (orphaned row on crash); "Token Bucket in Redis" is actually a fixed-window counter — code contradicts its own name and the genuinely correct token-bucket class in file `07`. | Make the insert atomic; rename or replace the mislabeled function. | 15 min |
| 8 | `07-System-Design/03-architecture-scenarios.md` | `crypto.randomBytes(5).toString('base62')` throws `ERR_UNKNOWN_ENCODING` — not a valid Buffer encoding. Will crash on execution. | Convert to a number/BigInt and pass through the file's own already-defined `encode()` function. | 5 min |
| 9 | `07-System-Design/in-depth/04-caching.md` | Hand-rolled `LRUCache` is O(n) (array `indexOf`+`splice`), contradicting the correct O(1) HashMap+DLL version in `08-DSA/06-linked-list.md` — two files disagree on the complexity of the same canonical structure. | Replace with the O(1) version; cross-link the two files. | 10 min |
| 10 | `12-Company/persistent-aws-backend-developer.md` Problem 2 | LRU cache `get()` deletes the key **before** reading its value — every cache hit returns `undefined`. The only functional code bug found that visibly fails when run. | Read-before-delete, matching the correct order in `recro-cheq-nodejs-prep.md` P11. | 5 min |
| 11 | `15-AWS-Services/networking.md` | States ALB has a "fixed 60-second idle timeout" — it's actually configurable 1–4000s; only NLB's 350s is truly fixed. Produces a wrong answer to a natural follow-up. | Correct the line; note the `idle_timeout.timeout_seconds` attribute. | 5 min |
| 12 | `15-AWS-Services/storage.md` | EFS-vs-S3 cost ratio stated as "~3×" — real current pricing is closer to ~10–13×. | Correct the ratio; add the `[VERIFY-2026]` tag the rest of the folder uses for perishable pricing facts. | 5 min |
| 13 | `12-Company/tcs-L2-hr-preparation.md` + `persistent-aws-backend-developer.md` | Both independently state salary figures roughly **double** the ₹12–26 LPA range every other file in the repo agrees on for this candidate. | Replace with figures consistent with `13-Salary-Negotiation/salary-negotiation-mastery.md`. | 10 min |
| 14 | `11-AI-Risk-Assistant-Project/README.md` | "Interview Talking Points" written in completed past tense for a project that's an unbuilt scaffold — no `ai-risk-assistant/` directory exists anywhere. | Reword to present/in-progress tense, or gate past-tense on a tracked build-completion flag in `_meta/state.json`. | 10 min |
| 15 | `01-JavaScript/02-advanced-senior-level.md`, `08-DSA/11-mnc-frequently-asked.md` Q14 | `queue.shift()`-based BFS appears 3 times, contradicting `04-stack-queue.md`'s own explicit warning. | Rewrite both using an index-pointer queue, matching `04-stack-queue.md`'s own pattern. | 10 min |

**Completion criteria:** all 15 rows have a corresponding diff; grep the repo once more for `"5s"` / `"3-5 second"` / `"800ms"` near "OpenSearch" and confirm zero stray hits remain.

### 0c. Scaffolding & tracker (baseline items, unchanged, ~2 hrs)

5. Move misfiled DSA content per §1 above.
6. Create empty scaffolding: `16-DSA-Practice/`, `17-CS-Fundamentals/{os,networking,database-internals}/`, `18-LLD-Machine-Coding/`, `19-Distributed-Systems/`, `20-Redis-OpenSearch/{redis,opensearch}/`, `21-Mock-Interviews/`, `22-Revision/`.
7. Rewrite `TRACKING.md` as the rolling tracker (§5 below). Fix the TypeScript "Not Started" lie (6 files exist, all Advanced/Expert per `PRODUCT_COMPANY_READINESS.md`). Renumber `01-JavaScript/06-answers.md` (two files share prefix `05`).
8. Confirm `/prep-daily` and `/prep-status` both run cleanly against the new state.

**Track A hygiene — do in spare cycles, not blocking, but urgent for the live pipeline:** reconcile the "5+ years" vs. CLAUDE.md's "~6 YOE" self-intro line (6 of 8+ `12-Company/` files say "5+"), and pick one consistent private account of the Synechron/Asurion-Japan short stint (5 different framings currently exist across 5 files — `PRODUCT_COMPANY_READINESS.md` Mismatch §3–4). Neither blocks Track B; both are things an interviewer could catch this week.

**Phase 0 completion criteria:** repo private ✓ · duplicate folder gone ✓ · all 15 bugs fixed ✓ · scaffolding committed ✓ · `/prep-daily` runs ✓.

---

## 3. Phase 1 — Foundations (Week 1, alongside Phase 2 start)

**Objective:** complexity fluency + first CS-fundamentals rail.
**Prerequisites:** Phase 0 complete. **Existing:** JS fundamentals ✅ strong — skip relearning.
**Create:** `16-DSA-Practice/00-complexity.md` (annotate 10 of your existing `08-DSA` solutions with time/space + justification) · `17-CS-Fundamentals/os/01-processes-threads.md` (must include a "how does this show up in Node?" section — thread pool, `worker_threads`, why `fork()` ≠ `cluster.fork()`).
**Completion criteria:** state the complexity of any `08-DSA` solution in <30s with justification; explain process vs. thread vs. Node worker in 2 minutes aloud, recorded.

---

## 4. Phase 2 — Problem-Solving Engine (Weeks 1–10 · THE priority, unchanged from baseline)

**Objective:** DSA solving ability 2/5 → 4/5 (per `PRODUCT_COMPANY_READINESS.md`'s hard-capped score). ~130–150 logged problems.

**Method, non-negotiable per problem:**
1. Read the problem. 5 min silent thinking; write the approach in comments *before* code.
2. Attempt 25 min (easy: 15). Talk aloud from week 3 onward.
3. Stuck → 1 hint max → 10 more minutes → then study the optimal from the matching `08-DSA` note.
4. Log to `16-DSA-Practice/<pattern>/<problem>.js`: problem ID, date, time taken, hints used, brute force, optimal, edge cases, redo-date.
5. Append one line to `16-DSA-Practice/LOG.md`.

**Sequence & counts:** arrays/strings/hashing 15 → two-pointers/sliding-window/prefix-sum 15 → binary search 8 → stack/queue/monotonic 10 → linked list 8 → recursion/backtracking 12 → trees/BST 15 → heap/trie 10 → graphs (BFS/DFS/topo/UF/Dijkstra) 18 → intervals/greedy 10 → DP 20 → bit manip 6.

**Completion criteria (the honest bar — never "finish chapter"):** 3 *unseen* mediums solved clean in ≤25 min each, narrated, across different patterns, in one sitting. Problem count alone does not close this phase.

---

## 5. Phase 3 — Language & Runtime Mastery (Weeks 2–5, parallel rail, ~3–4 hrs/wk — lighter than baseline given the TypeScript revision)

**Existing:** Node event loop ✅ gold standard · JS internals ✅ · **TypeScript ✅ 3.5/5, zero bugs across 6 files (revised up — see §1).**

**Do:**
- TypeScript: **do not build a new file from scratch.** Add 4 named gaps as small sections to the existing files — generic variance/co-contravariance (`02-TypeScript/01-generics.md`), the `ReturnType`/`Parameters`-on-overloaded-functions gotcha (`02-utility-types.md`), narrowing-lost-in-closures (`03-narrowing.md`), and the cross-link from `04-interfaces-vs-types.md`'s `declare module 'express'` fix into the 3 untyped auth middlewares that need it (`03-NodeJS/05-express-design.md`, `07-System-Design/01-auth-caching-api.md`, `07-System-Design/in-depth/05-system-architecture.md`). Then 10 type katas in `02-TypeScript/katas/` (DeepPartial, PathsOf<T>, typed EventEmitter, exhaustive reducer, etc.).
- Node upgrades: streams/backpressure 🔧 (`03-NodeJS/03` — explain *why* `pipeline()` beats chained `.pipe()`, flag the `WorkerPool` reuse/shared-state gotcha), error/shutdown 🔧 (`04` — add jitter to `queryWithRetry`, matching the correctly-jittered version already in sibling file `02`), `AsyncLocalStorage` section added to `01-event-loop.md`, one real memory-leak lab ❌ (`03-NodeJS/07` — write a leaking server, capture 2 heap snapshots, find and fix it, document).
- JS additions: generators/iterators ❌, memory/GC ❌ (both still confirmed absent).

**Completion criteria:** all 10 katas compile with no `any`; demo the leak-hunt from your own lab notes; explain backpressure with real `highWaterMark` numbers; explain the sync-throw-vs-async-rejection Express rule using `03-NodeJS/05`'s own `authenticate` vs. `04`'s `asyncHandler`-wrapped routes as the paired contrast (a genuinely teachable moment the repo already has both halves of).

---

## 6. Phase 4 — Frontend Engineering (Weeks 8–10, parallel, ~3 hrs/wk — P2)

**Existing:** rendering/reconciliation ✅ Expert, hooks ✅ Advanced, memoization ✅ Advanced, state management ✅ Expert (8-row decision matrix, correct optimistic-update rollback).

**Do:** consolidate the 3-way `useFetch`/`useDebounce`/`usePrevious` duplication (currently independently re-implemented in `01`, `05`, `06`) into `04-React/08-custom-hooks.md` ❌, converting the other 2 appearances into links. Extend `04-React/02`'s Concurrent Features section with the useTransition-vs-useDeferredValue one-liner that the *cram files* already state more crisply than the deep-dive itself. Add `04-React/07-concurrent-features.md` ❌ (Suspense depth, RSC awareness). Move the RTL/Jest content trapped inside `12-Company/citiustech-L1-interview-prep.md` into `04-React/09-testing.md` ❌.

**Completion criteria:** whiteboard the render→commit pipeline; explain when `useTransition` helps and when it doesn't; write one RTL test suite for a form component; confirm all 3 hook-duplication sites now link to one canonical file.

---

## 7. Phase 5 — Backend & Data Engineering (Weeks 3–8, parallel rail, ~4 hrs/wk — the resume-defense phase)

**This phase's #1 dependency: Phase 0 bug #1 (the OpenSearch number reconciliation) must be complete before `07-MY-migration.md` is written, or this phase reproduces the exact contradiction it exists to fix.**

- `20-Redis-OpenSearch/redis/` — **revised scope: extraction, not authorship.** Promote `12-Company/recro-cheq-nodejs-prep.md` §6C (Q15–Q20) into 5–6 canonical, company-agnostic files: data-structures-use-cases, caching-patterns (link to the now-fixed `in-depth/04`), eviction-TTL (the per-role-instance-separation insight is genuinely good, keep it), distributed-locks (the Lua atomic-unlock pattern + the honest Redlock/Kleppmann critique), pub-sub-vs-streams, stampede-hotkeys.
- `20-Redis-OpenSearch/opensearch/` — 6 files (inverted-index, analyzers-mappings, query-dsl, scoring-bm25, aggregations, shard-sizing) building out from `15-AWS-Services/analytics-search.md`'s already-Advanced base, plus **`07-MY-migration.md`** — rewrite the UTEC story with full internals: the reconciled canonical figure, the actual mapping, which analyzer, why latency dropped, shard count, what you'd do differently, the `_bulk` API (named as the missing piece — the actual mechanism your own MySQL→SQS→Lambda→OpenSearch CDC pipeline would use), and one worked custom-analyzer example. **This single file de-risks the highest-scored mismatch in `PRODUCT_COMPANY_READINESS.md`.**
- DB internals: `17-CS-Fundamentals/database-internals/` — B+Tree pages (extending the already-correct walkthrough in `07-System-Design/in-depth/03-databases.md`), an explicit MVCC/undo-log subsection (behavior is already correctly described in `06-SQL-MySQL-MongoDB/02`; the mechanism is not yet named), **reproduce one deadlock in MySQL yourself** and write it up, isolation-anomaly table.

**Completion criteria:** 10-minute recorded talk defending the OpenSearch migration with internals, using the reconciled number consistently throughout; deadlock repro committed; Redis lock trade-offs explained without notes.

---

## 8. Phase 6 — System Design + LLD + Distributed (Weeks 4–12, parallel rail, ~5 hrs/wk)

**HLD:** 1 design/week aloud (45-min timer, framework from `in-depth/08` — now bug-fixed per Phase 0): Rate limiter (revise, now correctly named) → Notification system (write the UTEC version as a design doc — this is the single highest-leverage *new* HLD content per the baseline's own reasoning, since interviewers spend 20 minutes on "walk me through something you built") → Payment system ❌ → News feed ranking ❌ → Chat deep-dive (revise) → Web crawler ❌ → File storage ❌ (Dropbox-style) → Search autocomplete (revise + explicit OpenSearch tie-in) → Logging/analytics platform ❌. Add a capacity-estimation drill sheet ❌ (`07-System-Design/00-estimation.md`) and practice the 5-minute QPS→storage→bandwidth pass for every design.

**LLD — revised priority order:** `fundamentals/solid-principles.md` first, ahead of the structural/behavioral folder build-out — it's well-structured but has **zero code across all 5 principles**, for one of the most reliably-asked "walk me through it" topics at this level (`SKILL_GAP_ANALYSIS.md`'s single highest-leverage LLD fix). Add one TypeScript before/after example per principle. Then complete `14-Design-Patterns/` per its own honest `todo.md` (structural + behavioral, each matching the `creational/factory/README.md` template's depth — 20-section structure, real trick questions, anti-pattern comparisons). Then `18-LLD-Machine-Coding/` ❌, one problem/week: Parking Lot → LRU Cache class (the data structure logic already exists ✅ — this is now the full OO API design) → Rate Limiter class → Splitwise → BookMyShow → Elevator.

**Distributed — revised scope: consolidate scattered-but-good content, fix the 2 buggy reference implementations.** The idempotency and saga/outbox content already exists at genuine implementation depth (`teksystems-hsbc-nodejs-backend.md` Q32's complete saga+outbox+CP-under-CAP design; `setu-health`/`healthsystems`/`recro-cheq`'s idempotency-key patterns) — the work is extraction into `19-Distributed-Systems/` (7 files: CAP/PACELC, consistency models, idempotency — anchored to your own SQS consumers, delivery semantics/exactly-once-myth, outbox/saga — anchored to your own EventBridge flows, distributed locks, clocks/ordering), not authorship from zero. Distributed locks and consistent hashing specifically depend on Phase 0 bugs #3 and #6 being fixed first.

**Completion criteria:** 9 design docs exist; 6 LLD solutions run; narrate the outbox pattern using your own Lambda architecture as the example; all 5 SOLID principles have a working TypeScript before/after.

---

## 9. Phase 7 — Cloud & Production (Weeks 9–11, light, ~2 hrs/wk — depends on Phase 0 bugs #11–12)

Scenario questions into each `15-AWS-Services/*` file ("design X — which services, why, cost"), DR patterns with RTO/RPO, quota gotchas (Lambda concurrency, API GW 29s, SQS visibility). This folder is already the best-structured, lowest-error section of the repo (`PRODUCT_COMPANY_READINESS.md`: 4/5, "cleanest file, by density of checkable facts, reviewed in the project") — this phase is genuinely light-touch, not a rebuild. Optional: schedule SAA-C03 after week 12.

**Completion criteria:** answer 3 scenario questions cold per service file.

---

## 10. Phase 8 — Interview Simulation (Weeks 4→∞, escalating)

- Week 4+: 1 DSA mock/week via `/prep-mock`. Log every mock in `21-Mock-Interviews/` with rubric: communication / approach / correctness / complexity / edge cases, 1–4 each.
- Week 7+: alternate DSA and system-design mocks.
- Week 10+: full loop simulation (2 DSA + 1 design + 1 behavioral in one day) once.
- Behavioral rail: +1 STAR story/week into `10-Interview-Prep/` until 10 exist, each mapped to Google axes (GCA / leadership / googleyness / role knowledge). Story 2 (OpenSearch) is only safe to rehearse once Phase 0 bug #1 is fixed — the file otherwise contains its own numeric contradiction. Add the missing 5th story for the P&G Olay anchor (currently the only one of CLAUDE.md's 4 project anchors with no dedicated entry).

**Completion criteria:** 8+ logged mocks; last 3 DSA mocks scored ≥3/4 average; full-loop day completed.

---

## 11. Prioritization (formula: interview-frequency × gap × dependency-weight × role-relevance)

| Priority | Items | One-line justification |
|---|---|---|
| **P0** | 15-bug correctness pass (Phase 0b) | Zero cost to skip today, maximum cost the day it's rehearsed verbatim in a real round — fixing takes ~3.5 hrs total, cheaper than any other item on this list. |
| **P0** | Repo privacy + duplicate deletion | Live PII/CTC exposure on a public repo; a `diff -rq`-confirmed dead-weight duplicate folder costs nothing to remove. |
| **P0** | DSA solving engine (arrays→graphs core, `16-DSA-Practice/`) | Highest interview frequency of any domain × the single largest confirmed gap (0 solved artifacts vs. 100 note files) × every later phase's mock reps depend on it. |
| **P0** | OpenSearch depth + the 1-file migration write-up | Directly defends CLAUDE.md's named flagship story, which this pass found is *currently indefensible* — the number itself isn't consistent across the candidate's own material. |
| **P0** | `fundamentals/solid-principles.md` code-per-principle | Highest LLD interview-frequency topic in the folder, currently zero implementation evidence despite strong structure — cheapest LLD fix with the largest defensibility gain. |
| **P1** | LLD rail (structural/behavioral patterns + machine coding) | Standard dedicated round at this YOE (Flipkart/Swiggy/Razorpay/Atlassian-tier); large gap, but sequenced after the P0 SOLID fix. |
| **P1** | Redis + OpenSearch folder build-out (post-extraction) | Second-highest resume-defense risk; smaller lift than originally scored since real content already exists and needs promotion, not authorship. |
| **P1** | Distributed systems consolidation | Feeds directly off SQS/EventBridge experience already owned; large gap, but consolidation of existing good content, not zero-to-one authorship. |
| **P1** | TypeScript katas + 4 named gaps | Medium gap remaining once the (revised-up) existing depth is credited — practice reps, not new theory. |
| **P1** | Node streams/leak-lab, DB internals, OS rail | Standard senior-loop gates; medium-to-large but well-scoped gaps. |
| **P1** | Weekly HLD reps + mocks (Phase 8) | The pressure-tested version of everything above; starts week 4, escalates through week 12. |
| **P2** | React Fiber/concurrent/testing consolidation | Real gap, but React internals already independently rated 3.5/5 — smaller lift, lower frequency for a backend-lean target role. |
| **P2** | AWS scenario questions + DR patterns | The AWS folder is already the strongest-scored domain in the repo (4/5) — light-touch addition, not a gap-close. |
| **P2** | Track A hygiene ("5+ years" vs. "~6 YOE", Synechron framing) | Real, checkable resume-defense risk, but doesn't block Track B progress — fits inside Track A's protected first hour. |
| **P3** | Redux/RTK (done, 4/5) · advanced DSA (segment trees, digit DP, MST proofs) · EKS depth | Low frequency for a Node/TS/React/AWS backend-lean target, or already at or above bar. |

---

## 12. The Linked-Documentation Standard (unchanged from baseline — apply to every new/upgraded file)

```markdown
---
topic: Streams & Backpressure
level: advanced        # beginner|intermediate|advanced|expert
status: solid          # todo|draft|solid|mastered
last_reviewed: 2026-08-19
next_review: 2026-08-26   # D1/D3/D7/D21 chain
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

No `/prep-link` command exists yet in `.claude/commands/` to retrofit this automatically (the baseline assumed one would exist by now) — apply the header manually as each file is touched during Phase 0–8, or scope a `/prep-link` command during a future `/prep-restructure` pass. `next_review` powers `/prep-revise` (D1→D3→D7→D21; a topic is *mastered* only after a clean D21 recall).

## 13. Rolling Tracker (replaces the dead 30-day sprint in `TRACKING.md`)

```markdown
# Week of 2026-08-24  ·  Phase 0 + Phase 1
Mon | 5 correctness-bugs fixed ✅ | OS: processes-threads draft ✅
Tue | Repo private + dup deleted ✅ | 5 more bugs fixed ✅
...
## Weekly exit review (Sun, 20 min)
Problems: 0/0 (Phase 0 week) · Bugs fixed: 15/15 · Mocks: 0 (starts wk4)
Due reviews cleared: n/a · Biggest struggle: ____
Next week adjustment: ____
```

**Two constraints from your own history, preserved without exception:**
1. **Don't over-systematize.** If maintaining this tracker takes more than 10 minutes a day, simplify it — don't perfect it. The previous 30-day sprint died partly from tracking overhead.
2. **Notes are your comfort zone; solving is the goal.** When tired, the temptation is to "just improve a note." Rule: no note-writing until the day's 2 problems are logged (once Phase 2 starts).

---

*Weekly execution tables (12-week and 24-week) → `_meta/WEEKLY_PLANS.md`.*
