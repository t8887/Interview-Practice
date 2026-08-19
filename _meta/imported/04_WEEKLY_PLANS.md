# Weekly Execution Plans

> Both plans assume Track A (live interview pipeline) continues in parallel — revision for actual interviews always wins the day's first hour.
> Loop for every topic: **Learn → Implement → Solve → Explain aloud → Review (D1/D3/D7/D21) → Mock.**
> Friday is always review day (clear the `/prep-revise` queue). Sunday = weekly exit review + next-week plan (20 min).

---

## Plan A — 12 Weeks (aggressive: ~3.5–4 hrs/day, 6 days/wk)

Daily shape: **90 min DSA (2 problems)** + **60–90 min rail-of-the-week** + **30 min revision queue**.

| Wk | DSA focus (problems) | Anchor problems (solve these named ones minimum) | Parallel rail | Files touched/created | Mock |
|---|---|---|---|---|---|
| 1 | Complexity + Arrays/Strings/Hashing (14) | Two Sum, Group Anagrams, Product Except Self, Longest Consecutive Sequence, Valid Anagram, Top-K Frequent, Encode/Decode Strings | Phase 0 cleanup (privacy! dup delete, scaffolding) + OS: processes-threads | `16-DSA-Practice/{arrays,hashing}/`, `00-complexity.md`, `17-CS/os/01` | — |
| 2 | Two Pointers + Sliding Window + Prefix Sum (14) | 3Sum, Container With Most Water, Trapping Rain Water, Longest Substring w/o Repeating, Min Window Substring, Sliding Window Maximum, Subarray Sum Equals K | TS advanced types + katas 1–5 | `02-TypeScript/07`, `katas/`, migrate `01-JavaScript/03` → DSA | — |
| 3 | Binary Search + Stack/Queue/Monotonic (12) | Search Rotated Array, Koko Eating Bananas, Median of Two Sorted (attempt), Min Stack, Daily Temperatures, Largest Rectangle in Histogram, Car Fleet | TS katas 6–10 + OS: scheduling/concurrency | `08-DSA/12,13` (prefix-sum, monotonic), `17-CS/os/02` | — |
| 4 | Linked List + Recursion intro (10) | Reverse LL, Reorder List, LRU Cache (full class — you know the DS ✅, now the API), Merge K Lists (heap preview), Copy List Random Pointer | Redis deep files 01–03 + **HLD #1: Rate limiter (aloud, 45 min)** | `20-.../redis/01-03`, `21-Mock-Interviews/` created | **DSA mock #1** |
| 5 | Backtracking (12) | Subsets I/II, Permutations, Combination Sum I/II, Word Search, Palindrome Partitioning, N-Queens (attempt) | Redis 04–06 + **HLD #2: Notification system = write YOUR UTEC design doc** | `08-DSA/14-backtracking`, `07-SD/designs/my-notification-system.md` | DSA mock #2 |
| 6 | Trees + BST (15) | Invert, Max Depth, Diameter, LCA, Level Order, Right Side View, Validate BST, Kth Smallest, Build from Pre+In, Serialize/Deserialize | OpenSearch 01–03 (inverted index, analyzers, query DSL) + OS: memory/paging | `20-.../opensearch/01-03`, `17-CS/os/03` | DSA mock #3 |
| 7 | Heap + Trie + Intervals (12) | Kth Largest, Merge K Lists, Find Median from Stream, Task Scheduler, Implement Trie ✅→word-search-II, Merge Intervals, Non-overlapping Intervals, Meeting Rooms II | OpenSearch 04–07 incl. **07-MY-migration.md (2s→200ms internals)** + **HLD #3: Search autocomplete (ties to OpenSearch)** | `08-DSA/15,16,18`, `opensearch/04-07` | **Design mock #1** |
| 8 | Graphs I: BFS/DFS/grids (12) | Number of Islands, Clone Graph, Rotting Oranges, Pacific Atlantic, Surrounded Regions, Walls and Gates | LLD kickoff: SOLID rewrite + Strategy/Observer/Decorator + **machine coding #1: Parking Lot (TS)** | `14-Design-Patterns/` per todo, `18-LLD/parking-lot/` | DSA mock #4 |
| 9 | Graphs II: topo/UF/Dijkstra (12) | Course Schedule I/II, Number of Connected Components, Redundant Connection, Graph Valid Tree, Network Delay Time, Cheapest Flights (attempt) | Distributed systems 01–04 (CAP, consistency, **idempotency — your SQS story**, delivery semantics) + **HLD #4: Payment system** | `08-DSA/17`, `19-Distributed/01-04` | Design mock #2 |
| 10 | DP I: 1D + knapsack (12) | Climbing Stairs→House Robber I/II (redo from ✅ notes, unaided), Coin Change, Word Break, Partition Equal Subset, Decode Ways | Distributed 05–07 (outbox/saga ← your EventBridge, locks, clocks) + **machine coding #2: BookMyShow** | `19-Distributed/05-07`, `18-LLD/bookmyshow/` | DSA mock #5 |
| 11 | DP II: 2D/strings/LIS (12) | LCS, Edit Distance, LIS (n² → n log n), Unique Paths, Longest Palindromic Substring, Interleaving String (attempt) | DB internals: B+Tree, MVCC, **deadlock repro lab** + **HLD #5: News feed** + Node leak lab | `17-CS/db-internals/`, `03-NodeJS/07-leak-lab` | Design mock #3 |
| 12 | Mixed unseen set (10) + weak-pattern redos | 3 unseen mediums in one timed sitting = Phase-2 exit test | Behavioral: reach 8–10 stories, Google-axis mapped + **FULL LOOP DAY** (2 DSA + 1 design + 1 behavioral) | `10-Interview-Prep/` expanded, `21-Mocks/full-loop-1.md` | **Full loop** |

**12-week exit bar:** ~135 logged problems · 8 mocks (last 3 DSA ≥3/4 avg) · 5 HLD docs incl. 2 of your own systems · 2 LLD machine-coding solutions · Redis+OpenSearch+Distributed folders complete · OS rail done · migration-defense talk recorded.

**Not in the 12-week plan (deliberately deferred):** React Fiber/testing depth, AWS scenario pass, remaining LLD problems, remaining HLD designs → they're weeks 13–16 if you're still interviewing, or fold into Plan B.

---

## Plan B — 24 Weeks (sustainable: ~2 hrs/day, 6 days/wk)

Same dependency order, halved daily load, deeper coverage, more mocks. One rail at a time instead of two.

| Wks | DSA (1 problem/day pace, ~10/fortnight) | Rail | Milestone at end of block |
|---|---|---|---|
| 1–2 | Complexity, arrays, strings, hashing | Phase 0 cleanup + tracker rewrite | Repo private, scaffolding live, 12 problems logged |
| 3–4 | Two pointers, sliding window, prefix sum | OS files 01–02 | Explain thread-pool-vs-event-loop aloud, recorded |
| 5–6 | Binary search, stack/queue, monotonic | TS advanced + 10 katas | Katas compile, zero `any` |
| 7–8 | Linked list, recursion | Redis 6 files | Redlock trade-offs from memory; **mock #1** |
| 9–10 | Backtracking | OpenSearch 7 files incl. YOUR migration doc | 10-min migration defense recorded |
| 11–12 | Trees, BST | HLD reps: rate limiter, notification (yours), autocomplete | 3 design docs; **design mock #1** |
| 13–14 | Heap, trie, intervals | LLD: SOLID + 4 patterns + Parking Lot | Parking Lot runs in TS |
| 15–16 | Graphs I (BFS/DFS) | Distributed 01–04 | Idempotency narrative uses your SQS consumers; **mock #3** |
| 17–18 | Graphs II (topo, UF, Dijkstra) | Distributed 05–07 + HLD: payment system | Outbox explained via your EventBridge flows |
| 19–20 | DP I | DB internals + deadlock lab + Node leak lab | Both labs written up; **mock #5** |
| 21–22 | DP II + greedy + bit manip | LLD: BookMyShow + Splitwise + remaining patterns | 3 LLD solutions total |
| 23–24 | Mixed unseen sets, weak-pattern redos | React block (Fiber, concurrent, testing) + AWS scenarios + behavioral to 10 stories + **2 full-loop days** | Exit bar below |

**24-week exit bar:** ~160 problems · 12+ mocks · 9 HLD docs (3 your own systems) · 5 LLD solutions · all new folders complete · every existing 🔧 file upgraded with the linked-doc header · 2 full-loop simulations passed at ≥3/4.

---

## Daily Template (put in TRACKING.md; `/prep-daily` fills it)

```
## 2026-08-24 · Phase 2 wk1 · Energy: __/5
□ [Track A, if interview this week] 45 min targeted revision: ____
□ DSA #1: ____ (timer 25:00, talk aloud) → logged
□ DSA #2: ____ → logged
□ Rail block (60–90m): ____
□ Revision queue (D1/D3/D7/D21 due today): __ items → cleared
□ 1 line in TRACKING.md
Struggled with: ____ → added to redo queue
```

## Spaced-Repetition Rules (mechanical, no willpower needed)

- Every solved problem / finished note gets `next_review: +1d`. Clean recall → +3d → +7d → +21d → *mastered*. Any failure → back to +1d.
- Friday clears the whole due queue before new material.
- Weekly exit review asks exactly four questions: problems done vs planned? unaided-medium streak? due-queue cleared? single biggest struggle → what changes next week?

## Two Warnings (from your own history)

1. **Don't over-systematize.** The tracker exists to record work, not to *be* the work — your previous 30-day sprint died partly from tracking overhead. If maintaining the system takes >10 min/day, simplify it, don't perfect it.
2. **Notes are your comfort zone; solving is the goal.** When tired, the temptation will be to "just improve a note." The rule: no note-writing until the day's 2 problems are logged.
