# Weekly Execution Plans

> Refines `_meta/imported/04_WEEKLY_PLANS.md` against `_meta/MASTER_ROADMAP.md`'s revised phases. Both plans assume **Track A (live interview pipeline) continues in parallel — it gets the first hour of every day, no exceptions.**
> Loop for every topic: **Learn → Implement → Solve → Explain aloud → Review (D1/D3/D7/D21) → Mock.**
> **Fridays = clear the `/prep-revise` due queue. Sundays = 20-min weekly exit review** (problems done vs. planned? unaided-medium streak? due-queue cleared? single biggest struggle → what changes next week?).
> Columns per the standard: **Week | DSA (count + named anchors) | Rail | Files touched | Mock.**

---

## Plan A — 12 Weeks (aggressive: ~3.5–4 hrs/day, 6 days/wk)

Daily shape: **90 min DSA (2 problems)** + **60–90 min rail-of-the-week** + **30 min revision queue.** Week 1's DSA time is replaced by the Phase 0 correctness-debt pass (see below) — DSA reps start in earnest from Week 1's second half / Week 2.

| Wk | DSA (count + named anchors) | Rail | Files touched | Mock |
|---|---|---|---|---|
| 1 | **0 new** — Phase 0 instead: 15 correctness-bugs fixed (`MASTER_ROADMAP.md` §2 table) + privacy/dedup. Arrays/Hashing reps begin Day 4+ if time allows (aim 6–8): Two Sum, Group Anagrams, Product Except Self | Phase 0 cleanup (privacy! dup delete, 15-bug pass) + OS: processes-threads | 15 bug-fix diffs across `01-JavaScript/06-answers.md`, `07-System-Design/*` (6 files), `15-AWS-Services/{networking,storage}.md`, `12-Company/{tcs,persistent-aws}*`, `11-AI-Risk-Assistant-Project/README.md`; `16-DSA-Practice/`, `17-CS/os/01`, scaffolding folders created | — |
| 2 | Arrays/Strings/Hashing finish (8) + Two Pointers/Sliding Window start (6): Longest Consecutive Sequence, Valid Anagram, Top-K Frequent, Encode/Decode Strings, 3Sum, Container With Most Water | TS: 4 named gaps added to existing files (not a new file — see §5 revision) + katas 1–5 | `02-TypeScript/{01,02,03,04}.md` (gap additions), `02-TypeScript/katas/`, migrate `01-JavaScript/03` → `08-DSA/12,13,14` | — |
| 3 | Sliding Window/Prefix Sum finish (8) + Binary Search (8): Trapping Rain Water, Longest Substring w/o Repeating, Min Window Substring, Sliding Window Maximum, Subarray Sum Equals K, Search Rotated Array, Koko Eating Bananas, Median of Two Sorted (attempt) | TS katas 6–10 + OS: scheduling/concurrency | `02-TypeScript/katas/`, `17-CS/os/02` | — |
| 4 | Stack/Queue/Monotonic (10) + Linked List start (4): Min Stack, Daily Temperatures, Largest Rectangle in Histogram, Car Fleet, Reverse LL, Reorder List, LRU Cache (full OO class — the DS logic already exists ✅, this is the API layer) | **Redis extraction pass (fast — real content exists, see §7 revision)**: `20-.../redis/01-03` + **HLD #1: Rate limiter (aloud, 45 min, now correctly named post-Phase-0)** | `20-.../redis/01-03` (from `recro-cheq-nodejs-prep.md` §6C), `21-Mock-Interviews/` created | **DSA mock #1** |
| 5 | Linked List finish (4) + Backtracking (12): Merge K Lists, Copy List Random Pointer, Subsets I/II, Permutations, Combination Sum I/II, Word Search, Palindrome Partitioning, N-Queens (attempt) | `20-.../redis/04-06` (distributed locks, pub/sub, stampede) + **HLD #2: Notification system = write YOUR UTEC design doc** | `20-.../redis/04-06`, `07-System-Design/own-systems/notification-engine.md` | DSA mock #2 |
| 6 | Trees + BST (15): Invert, Max Depth, Diameter, LCA, Level Order (index-pointer queue, not `shift()`), Right Side View, Validate BST, Kth Smallest, Build from Pre+In, Serialize/Deserialize | OpenSearch 01–03 (inverted index, analyzers, query DSL) + OS: memory/paging | `20-.../opensearch/01-03`, `17-CS/os/03` | DSA mock #3 |
| 7 | Heap + Intervals (12): Kth Largest, Merge K Lists (heap version), Find Median from Stream, Task Scheduler, Merge Intervals, Non-overlapping Intervals, Meeting Rooms II | OpenSearch 04–07 incl. **`07-MY-migration.md` — the 2s→200ms internals rewrite. Depends on Phase 0 bug #1 being fixed in Week 1.** + **HLD #3: Search autocomplete (ties to OpenSearch)** | `08-DSA/15,17`, `20-.../opensearch/04-07` | **Design mock #1** |
| 8 | Graphs I: BFS/DFS/grids (12): Number of Islands, Clone Graph, Rotting Oranges, Pacific Atlantic, Surrounded Regions, Walls and Gates | LLD kickoff: **`solid-principles.md` — 1 TS before/after per principle first (highest-leverage LLD fix)**, then Strategy/Observer/Decorator + **machine coding #1: Parking Lot (TS)** | `14-Design-Patterns/fundamentals/solid-principles.md`, `14-Design-Patterns/behavioral/*`, `18-LLD-Machine-Coding/parking-lot/` | DSA mock #4 |
| 9 | Graphs II: topo/UF/Dijkstra (12): Course Schedule I/II, Number of Connected Components, Redundant Connection, Graph Valid Tree, Network Delay Time, Cheapest Flights (attempt) | Distributed extraction (01–04): CAP, consistency, **idempotency — your SQS story, extracted from `recro-cheq`/`setu-health`/`healthsystems`** delivery semantics + **HLD #4: Payment system** | `08-DSA/16`, `19-Distributed-Systems/01-04` | Design mock #2 |
| 10 | DP I: 1D + knapsack (12): Climbing Stairs→House Robber I/II (redo from ✅ notes, unaided), Coin Change, Word Break, Partition Equal Subset, Decode Ways | Distributed 05–07 (outbox/saga — extracted from `teksystems-hsbc-nodejs-backend.md` Q32, mapped to your EventBridge flows; locks — depends on Phase 0 bug #3 fix; clocks) + **machine coding #2: BookMyShow** | `19-Distributed-Systems/05-07`, `18-LLD-Machine-Coding/bookmyshow/` | DSA mock #5 |
| 11 | DP II: 2D/strings/LIS (12): LCS, Edit Distance, LIS (n²→n log n), Unique Paths, Longest Palindromic Substring, Interleaving String (attempt) | DB internals: B+Tree, **MVCC subsection (mechanism, not just behavior)**, deadlock repro lab + **HLD #5: News feed** + Node leak lab | `17-CS/database-internals/`, `03-NodeJS/07-leak-lab.md` | Design mock #3 |
| 12 | Mixed unseen set (10) + weak-pattern redos: 3 unseen mediums in one timed sitting = Phase-2 exit test | Behavioral: reach 8–10 stories incl. the missing P&G Olay anchor, Google-axis mapped (Story 2's OpenSearch numbers now consistent since Week 1) + **FULL LOOP DAY** (2 DSA + 1 design + 1 behavioral) | `10-Interview-Prep/01-stories-behavioral.md` expanded, `21-Mock-Interviews/full-loop-1.md` | **Full loop** |

**12-week exit bar:** all 15 correctness bugs fixed (Week 1) · ~130 logged problems (10 fewer than the un-revised baseline since Week 1's DSA slot goes to bug-fixing) · 8 mocks (last 3 DSA ≥3/4 avg) · 5 HLD docs incl. 2 of your own systems · 2 LLD machine-coding solutions · Redis+OpenSearch+Distributed folders complete (as extraction/consolidation, not from-scratch authorship) · OS rail done · migration-defense talk recorded using one consistent number throughout.

**Not in the 12-week plan (deliberately deferred):** React Fiber/testing consolidation, AWS scenario pass, remaining LLD structural patterns, remaining HLD designs → weeks 13–16 if still interviewing, or fold into Plan B.

---

## Plan B — 24 Weeks (sustainable: ~2 hrs/day, 6 days/wk)

Same dependency order, halved daily load, deeper coverage, more mocks. One rail at a time instead of two.

| Wks | DSA (count + named anchors) | Rail | Files touched | Mock |
|---|---|---|---|---|
| 1–2 | **0–8**: Phase 0 (15 bugs + privacy/dedup) fills week 1; Two Sum, Group Anagrams, Product Except Self, Longest Consecutive Sequence, Valid Anagram, Top-K Frequent, Encode/Decode Strings, Valid Anagram (~8) in week 2 | Phase 0 cleanup + tracker rewrite | 15 bug-fix diffs, scaffolding folders created | — |
| 3–4 | Two pointers, sliding window, prefix sum (~12) | OS files 01–02 | `17-CS/os/01,02` | — |
| 5–6 | Binary search, stack/queue, monotonic (~12) | TS: 4 named gaps (not a new file) + 10 katas | `02-TypeScript/{01-04}.md` gap additions, `02-TypeScript/katas/` | Explain thread-pool-vs-event-loop aloud, recorded |
| 7–8 | Linked list, recursion (~10) | **Redis extraction (fast — content already exists in `recro-cheq-nodejs-prep.md` §6C)**: 6 files | `20-Redis-OpenSearch/redis/01-06` | Katas compile, zero `any`; **mock #1** |
| 9–10 | Backtracking (~12) | OpenSearch 6 files incl. **`07-MY-migration.md`** (blocked on Phase 0 bug #1, fixed weeks 1–2) | `20-Redis-OpenSearch/opensearch/01-07` | Redlock trade-offs from memory |
| 11–12 | Trees, BST (~15) | HLD reps: rate limiter, notification (yours), autocomplete | `07-System-Design/own-systems/`, `21-Mock-Interviews/` | 10-min migration defense recorded; **design mock #1** |
| 13–14 | Heap, intervals (~12) | LLD: **SOLID code-per-principle first**, then 4 more patterns + Parking Lot | `14-Design-Patterns/fundamentals/solid-principles.md`, `structural/`, `18-LLD-Machine-Coding/parking-lot/` | 3 design docs |
| 15–16 | Graphs I (BFS/DFS) (~12) | Distributed 01–04 (extraction from company files) | `19-Distributed-Systems/01-04` | Parking Lot runs in TS; **mock #3** |
| 17–18 | Graphs II (topo, UF, Dijkstra) (~12) | Distributed 05–07 + HLD: payment system | `19-Distributed-Systems/05-07` | Idempotency narrative uses your own SQS consumers |
| 19–20 | DP I (~12) | DB internals (+ MVCC mechanism) + deadlock lab + Node leak lab | `17-CS/database-internals/`, `03-NodeJS/07-leak-lab.md` | Outbox explained via your EventBridge flows; **mock #5** |
| 21–22 | DP II + greedy + bit manip (~12) | LLD: BookMyShow + Splitwise + remaining behavioral patterns | `18-LLD-Machine-Coding/{bookmyshow,splitwise}/` | Both labs written up |
| 23–24 | Mixed unseen sets, weak-pattern redos (~10) | React consolidation (3-way hook dedup, testing extraction from citiustech) + AWS scenarios + behavioral to 10 stories (incl. P&G Olay) + **2 full-loop days** | `04-React/{07,08,09}.md`, `10-Interview-Prep/01-stories-behavioral.md` | 3 LLD solutions total; exit bar below |

**24-week exit bar:** all 15 bugs fixed (week 1) · ~155 problems (5 fewer than the un-revised baseline for the same week-1 reason) · 12+ mocks · 9 HLD docs (3 your own systems) · 5 LLD solutions · all new folders complete (mostly via extraction of already-strong content rather than from-scratch authorship — Redis and Distributed Systems specifically) · every existing 🔧 file upgraded with the linked-doc header · 2 full-loop simulations passed at ≥3/4.

---

## Daily Template (put in `TRACKING.md`; `/prep-daily` fills it)

```
## 2026-08-19 · Phase 0 · Energy: __/5
□ [Track A, if interview this week] 45 min targeted revision: ____
□ Phase 0 item: ____ (bug # or hygiene task) → fixed, diff committed
□ Rail block (60–90m, once Phase 0 clears): ____
□ Revision queue (D1/D3/D7/D21 due today): __ items → cleared
□ 1 line in TRACKING.md
Struggled with: ____ → added to redo queue
```

Once Phase 2 starts (Week 1's second half onward), replace the "Phase 0 item" line with:
```
□ DSA #1: ____ (timer 25:00, talk aloud) → logged
□ DSA #2: ____ → logged
```

## Spaced-Repetition Rules (mechanical, no willpower needed — unchanged from baseline)

- Every solved problem / finished note gets `next_review: +1d`. Clean recall → +3d → +7d → +21d → *mastered*. Any failure → back to +1d.
- Friday clears the whole due queue before new material.
- Weekly exit review asks exactly four questions: problems done vs. planned? unaided-medium streak? due-queue cleared? single biggest struggle → what changes next week?

## Two Warnings (from your own history — unchanged, still true)

1. **Don't over-systematize.** The tracker exists to record work, not to *be* the work. If maintaining it takes >10 min/day, simplify it, don't perfect it.
2. **Notes are your comfort zone; solving is the goal.** When tired, the temptation will be to "just improve a note." The rule: no note-writing until the day's 2 problems are logged (once Phase 2 is running).

## What changed vs. the baseline plan, and why

- **Week 1 no longer opens with DSA reps.** The baseline assumed a clean slate; this pass found 15 confirmed, reproducible bugs sitting in content that would otherwise be rehearsed as correct. Fixing them (~3.5 hrs) is cheaper than un-learning them later, so Week 1 is a correctness-and-hygiene week, with DSA starting in earnest from Week 1's back half.
- **The Redis and Distributed Systems rails are extraction passes, not research-and-author passes.** Both were scored much higher on full local read than the baseline's stale-clone-based guess — the content exists, correctly, inside specific company-prep files and just needs promoting to canonical topic files.
- **TypeScript's block shrank.** No new file-from-scratch; 4 named gap-fixes plus the katas the baseline already planned.
- **The OpenSearch migration write-up (Week 7 / Weeks 9–10) explicitly depends on Week 1's bug-fix pass landing first** — this is the one new hard dependency this revision adds to the schedule.
