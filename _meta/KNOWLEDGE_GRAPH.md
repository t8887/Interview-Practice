# Knowledge Graph

Dependency chains across the six domains that gate a Google-tier SDE-2/Senior offer, built from what `_meta/REPOSITORY_ANALYSIS.md` actually found inside each file — not from folder/file titles. Every node is one of:

- ✅ **exists, adequate** — content matches or exceeds the required bar for its position in the chain
- 🔧 **exists, upgrade** — real content, but a named gap or bug caps it below the bar
- 📦 **misfiled** — correct content, wrong location; `from → to` given
- ❌ **create** — no file covers this node; exact proposed path given

Where a node's status is disputed between what the baseline `_meta/imported/` analysis assumed and what a full local read found, that's called out explicitly — this graph supersedes the baseline wherever the two disagree, per `CLAUDE.md` rule 6.

---

## 1. DSA

```
Arrays/Strings → Hash Maps → Two Pointers → Sliding Window
                                    ↓
                              Stack/Queue → Monotonic Stack/Deque
                                    ↓
Linked List → Trees → Tries → Graphs → Union-Find/Topo-Sort
                                    ↓
                            Binary Search → Binary-Search-on-Answer
                                    ↓
                        Dynamic Programming (1D→2D→Knapsack→Interval)
                                    ↓
                    Heap/Priority Queue (blocks: Two Heaps, Dijkstra, Merge-K)
                                    ↓
              Intervals · Greedy · Bit Manipulation · Backtracking
                                    ↓
                         16-DSA-Practice/ (solved-problem log)
```

| Node | Status | Evidence / Gap |
|---|---|---|
| Arrays/Strings | 🔧 | `08-DSA/01-arrays-strings.md` — Improve/P0. No brute-force baseline before the optimized answer; `removeDuplicates` byte-identical dup with `03-two-pointers.md`. |
| Hash Maps | 🔧 | `08-DSA/02-hash-maps.md` — explains hashmap mechanics in prose but never implements one from scratch; no WeakMap/WeakSet. |
| Two Pointers | 🔧 | `08-DSA/03-two-pointers.md` — Advanced reasoning (best "why" explanations in the folder), but Dutch National Flag and the two-array merge pattern are named in its own table and never coded. |
| Sliding Window | 🔧 (minor) | `08-DSA/05-sliding-window.md` — strongest file in the folder; only missing the general monotonicity-invariant statement. |
| Stack/Queue | 🔧 | `08-DSA/04-stack-queue.md` — hand-rolled O(1) queue actually de-optimizes V8 via repeated `delete`; no Max Stack; monotonic-deque connection to sliding window unstated. |
| Monotonic Stack / Kadane's / Prefix Sum / Backtracking / Binary-Search variants | 📦 | Currently live in `01-JavaScript/03-pattern-based-must-know.md`, not `08-DSA/`. This is why `08-DSA/` "looks thinner than it is" (confirmed by both the baseline and local analysis). The file itself is high-value (Advanced, best interview-value-per-line in the repo) — recommendation is **promote it to the `08-DSA/` entry point** and split/cross-link its patterns into the matching numbered files, not delete it. |
| Linked List (+ LRU Cache) | 🔧 | `08-DSA/06-linked-list.md` — canonical, correct home for LRU Cache (confirmed O(1) HashMap+DLL). Floyd's cycle-start math asserted, never proven; Copy-List-with-Random-Pointer named in its own table, never coded. |
| Trees (+ Trie) | 🔧 | `08-DSA/07-trees.md` — canonical Trie home. `levelOrder`/`rightSideView` use `queue.shift()`, the exact O(n) anti-pattern `04-stack-queue.md` itself warns against — a repo-internal contradiction. No Fenwick Tree despite direct relevance to the OpenSearch/range-query story anchor. |
| Graphs (+ Union-Find, Topo-Sort) | 🔧 | `08-DSA/08-graphs.md` — Union-Find and Kahn's topological sort are both complete and correct here. Its own Decision Framework names Dijkstra as the answer for weighted shortest path — **Dijkstra is never implemented anywhere in the repo.** |
| Binary Search | 🔧 (minor) | `08-DSA/10-binary-search.md` — Advanced/Expert (Median of Two Sorted Arrays done correctly, rare at this depth). Missing a generalized Binary-Search-on-Answer template despite having only one instance (Koko). |
| Dynamic Programming | 🔧 | `08-DSA/09-dynamic-programming.md` — only file in the folder showing two optimization levels of the same problem (LIS: O(n²) then O(n log n)). Names "top-down (memoization) vs bottom-up" as the two core approaches, then shows only bottom-up in all 10 patterns. No interval or bitmask DP. |
| Heap / Priority Queue | ❌ | No file anywhere implements a heap. Blocks: Two Heaps (streaming median — named in `01-JavaScript/03-pattern-based-must-know.md`'s own cheat sheet, never coded), Dijkstra (blocked above), an O(N log k) Merge-K-Lists via heap (currently divide-and-conquer only). **Create `08-DSA/12-heaps.md`.** |
| Intervals | ❌ | Merge Intervals exists once, well-solved, inside `12-Company/metron-security-doselect-prep.md` — not in `08-DSA/`. **Create `08-DSA/13-intervals.md`**, migrating that solution as the seed. |
| Greedy | ❌ | No dedicated pattern file anywhere. **Create `08-DSA/14-greedy.md`.** |
| Bit Manipulation | ❌ | No dedicated pattern file anywhere. **Create `08-DSA/15-bit-manipulation.md`.** |
| MNC cram (`08-DSA/11`) | 🔧 | Q14's `levelOrder` repeats the `shift()` bug a **third** time in the repo with no fix anywhere. Nearly every one of its 22 code blocks re-pastes canonical-file code verbatim rather than linking — the single largest redundancy source found in `08-DSA/`. |
| `16-DSA-Practice/` (solved-problem log) | ❌ | **The actual blocker**, confirmed independently by both the baseline analysis and this local pass: one code file exists in the entire repository (`01-JavaScript/Practice/1.js`); every DSA file above is revision notes for problems not yet solved by the candidate under time pressure. No file, no path exists yet. **Create `16-DSA-Practice/` with one file per solved problem** (attempt-first, then optimal, complexity, edge cases, redo-date) — this is the single highest-leverage empty node in the whole graph. |

---

## 2. JavaScript → TypeScript → Node.js

```
JS Fundamentals (closures/promises/polyfills)
        ↓
JS Senior Patterns (LRU/LFU/Trie/rate-limiter) ←→ JS Puzzles + Answer Key
        ↓
TypeScript (generics → utility types → narrowing → interfaces/types → async/advanced)
        ↓
Node.js Internals (event loop → async patterns → streams/workers → error handling → Express)
        ↓
AsyncLocalStorage · memory-leak lab · profiling
```

| Node | Status | Evidence / Gap |
|---|---|---|
| JS Fundamentals | ✅ (canonical) | `01-JavaScript/01-closures-promises-polyfills.md` — WeakMap-safe circular-ref `deepClone`, correct `Promise.all/race/allSettled`. 🔧 `myBind` isn't `new`-safe; `Promise.any` never implemented anywhere in the repo despite being named in 2 other files' tables. |
| JS Senior Patterns | ✅ (canonical) | `01-JavaScript/02-advanced-senior-level.md` — LRU/LFU/Trie/Twitter/URL-shortener/rate-limiter, all hand-traced correct. Designate as the canonical home; `06-answers.md` Problem 100 and the LRU inside `persistent-aws-backend-developer.md` should link here instead of re-implementing (the latter's version has a confirmed live bug — see §PRODUCT_COMPANY_READINESS). |
| JS Puzzles (`05-tricky-output-puzzles.md`) + Answer Key (`06-answers.md`) | 🔧 P0 | Answer key's Problem 86 `deepClone` has **no circular-ref guard**, regressing the correct WeakMap version in JS Fundamentals — the puzzle file's own designed use ("attempt, then verify") silently teaches the bug. |
| JS MNC cram (`04`) | 🔧 | At least 6 of 40 questions are exact-logic duplicates of JS Fundamentals content (bind, map/reduce polyfills, debounce/throttle, curry, memoize, pipe) — convert to links, keep the unique trivia/output-puzzle content and company attribution. |
| `03-pattern-based-must-know.md` | 📦 | See DSA §1 — pure DSA content, misfiled under JavaScript. |
| TypeScript (`02-TypeScript/01–05`) | ✅ | Advanced/Expert throughout — recursive `Awaited<T>`, `RequireAtLeastOne<T,K>`, exhaustiveness-checking `assertNever`, distributive-vs-non-distributive conditional types, `TypedEmitter`. Zero bugs found across all 5 files. This is materially stronger than the baseline's "2.5⚠️, tracker says Not Started" score assumed — see §PRODUCT_COMPANY_READINESS for the corrected score. |
| `02-TypeScript/04-interfaces-vs-types.md` | 🔧 P0 | Its `declare module 'express'` pattern for typing `req.user` is the exact fix needed by **3 separate untyped JWT auth-middleware implementations** elsewhere in the repo (`03-NodeJS/05-express-design.md`, `07-System-Design/01-auth-caching-api.md`, `07-System-Design/in-depth/05-system-architecture.md`) — currently no cross-link connects them. |
| TypeScript MNC cram (`06`) | 🔧 | Q25–Q28 (React+TypeScript) is genuinely unique content not duplicated anywhere else in `02-TypeScript/` — flag as the folder's only React+TS material, cross-check against `04-React/` once consolidated. |
| Node.js Event Loop (`03-NodeJS/01`) | ✅ (gold standard) | Expert — correctly states the ordering nuance most prep resources get wrong (`setTimeout`-vs-`setImmediate` non-determinism at the top level, deterministic inside I/O callbacks). Use as the template file when upgrading siblings. |
| Node Async Patterns (`02`) | 🔧 | All 4 Promise combinators correctly covered (rare — most resources miss `allSettled`/`any`). `AbortController` used once, never explained generally. |
| Node Streams/Workers (`03`) | 🔧 | `WorkerPool` never terminates/recreates workers — silent shared-state risk if `worker.js` has module-level mutable state. `.pipe()` chains' per-stream error-propagation gap vs. `pipeline()` is used but not explained. |
| Node Error Handling (`04`) | 🔧 | `queryWithRetry`'s backoff has no jitter, unlike the correctly-jittered version in sibling file `02` — same folder, inconsistent implementation of the same pattern. |
| Node Express Design (`05`) | 🔧 | Real production patterns (feature-based structure, `app.js`/`server.js` split) but never states the sync-throw-vs-async-rejection rule that this repo, uniquely, has both correct examples of side by side. `asyncHandler`/JWT-middleware idiom duplicated ≥3× across the repo — needs one canonical version. |
| Node MNC cram (`06`) | 🔧 (minor) | Mostly well-condensed (tables, not code pastes); 4 of 30 questions re-paste code that should link instead. |
| `AsyncLocalStorage` (dedicated coverage) | ❌ | Named as a gap in both `01-event-loop.md`'s own entry and multiple `12-Company/` files (recro-cheq, setu-health) that use it correctly in isolation — no canonical topic-file section demonstrates it as request-scoped-context-without-parameter-drilling. **Add a subsection to `03-NodeJS/01-event-loop.md`.** |
| Memory-leak lab / profiling | ❌ | Named as a gap in the baseline and confirmed still absent — no file walks through taking a heap snapshot and finding a real leak. **Create `03-NodeJS/07-memory-profiling.md`.** |

---

## 3. React (+ Redux)

```
Hooks Deep-Dive → Rendering/Reconciliation → Memoization/Performance
        ↓
State Management (local → Context → Redux Toolkit → Zustand → TanStack Query)
        ↓
Patterns (HOC/render-props/compound-components/error-boundaries) → Custom Hooks
        ↓
Redux Toolkit Fundamentals → RTK Query Advanced
        ↓
04-React/08-testing.md (RTL/Jest)
```

| Node | Status | Evidence / Gap |
|---|---|---|
| Hooks Deep-Dive (`04-React/01`) | 🔧 P0 | Advanced (`useFetch`'s correct `AbortController` cleanup, correctly-stated "state is NOT merged" distinction). **`useFetch`/`useDebounce`/`usePrevious` are each independently re-implemented, near-unchanged, in `01`, `05`, and `06`** — the largest single redundancy footprint in `04-React/`. |
| Rendering/Reconciliation (`02`) | 🔧 (minor) | Expert — correct React-18-automatic-batching-extends-beyond-event-handlers explanation, real keys-diffing trace. Ironically, its own Concurrent Features section omits the useTransition-vs-useDeferredValue one-liner that the *lighter* cram files (`05`, `06`) state more crisply — backport it. |
| Memoization/Performance (`03`) | 🔧 (minor) | Advanced — "profile first" framing correctly leads. No mention of React Compiler as the emerging alternative to manual `useMemo`/`useCallback`. |
| State Management (`04`) | 🔧 (minor) | Expert-level spread across `useState`→Context→RTK→Zustand→TanStack Query with a genuinely useful 8-row decision matrix. Correct optimistic-update rollback. Missing a cross-link from Context's stated limitations to `03`'s own mitigation section it already implements. |
| Patterns/Interview Qs (`05`) | 🔧 P0 | Second leg of the 3-way hooks duplication (see `01`). Otherwise Advanced/Expert — render-props-vs-custom-hook side-by-side comparison is genuinely excellent pedagogy. |
| MNC cram (`06`) | 🔧 P0 | Completes and confirms the 3-way hooks duplication. |
| `04-React/08-testing.md` (RTL/Jest) | 📦 | Content exists but lives inside `12-Company/citiustech-L1-interview-prep.md` (lines ~886–930), not in `04-React/`. **Move.** |
| `04-React/07-custom-hooks.md` (consolidation target) | ❌ | **Create** as the single canonical home for `useFetch`/`useDebounce`/`usePrevious`; convert the 2 other appearances into links. |
| Redux Toolkit Fundamentals (`05-Redux/01`) | ✅ (canonical) | Advanced — current RTK v2 APIs, non-trivial Entity Adapter section. The earlier "todosSlice duplicated with `01-JavaScript/02`" flag was checked directly and **does not hold** (that file has no Redux content at all) — the real, smaller overlap is with `04-React/04-state-management.md`'s own `createAsyncThunk` boilerplate, which should trim to a link here. |
| RTK Query Advanced (`02`) | ✅ | Advanced, genuinely distinct from `01` — no code-level overlap found. Missing `refetchOnFocus`/`refetchOnReconnect` explanation. |
| Redux MNC cram (`03`) | 🔧 | Highest-duplication file in the Redux cluster — Q9's custom middleware is byte-identical to `01`'s. Same split treatment as the JS/DSA cram files: keep trivia, link the rest. |

---

## 4. System Design (HLD) → LLD → Distributed Systems

### 4a. HLD

```
Networking Basics → Scalability → Databases → Caching
        ↓
System Architecture (monolith/microservices/event-driven/CQRS)
        ↓
Message Queues → Reliability & Availability (CAP/circuit-breaker/consistent-hashing)
        ↓
Classic Design Problems (URL shortener/Twitter/WhatsApp/YouTube/Uber)
        ↓
Payment System · News Feed Ranking · Web Crawler · File Storage · Own-System Design Docs
```

| Node | Status | Evidence / Gap |
|---|---|---|
| Networking Basics (`in-depth/01`) | ✅ | Expert — one of the best files in the repo. Real EY Risk.ai `https.Agent` connection-pooling scenario with before/after numbers (3min→3sec), unprompted project-story anchoring. This scores materially higher than the baseline's "one good 3.2K-word file, medium gap" — see §PRODUCT_COMPANY_READINESS. |
| Scalability (`in-depth/02`) | 🔧 (minor) | Expert — the single most information-dense file in the repo (real AWS instance/cost numbers, cooldown-period walkthrough). Missing blue-green/canary deployment naming and connection-draining-during-scale-in. |
| Databases (`in-depth/03`) | 🔧 | Expert — 6-datastore polyglot-persistence pattern, correct B-Tree walkthrough, correct read-your-own-write replica-lag fix. Covering-index example uses Postgres/SQL-Server `INCLUDE` syntax presented as universal — invalid on MySQL. |
| Caching (`in-depth/04`) | 🔧 P0 | Expert — 3 complete, runnable cache-stampede mitigations (rare). Its own hand-rolled `LRUCache` is **O(n)** (array `indexOf`+`splice`), directly contradicting the correct O(1) HashMap+DLL version in `08-DSA/06-linked-list.md` — two files disagree on the complexity of the same canonical structure. |
| System Architecture (`in-depth/05`) | 🔧 P0 | Expert — two independent Kafka consumer services shown in real code. The "independent" Payment worker **reuses the Inventory service's `consumer` variable/group** — a concrete copy-paste bug that breaks the section's own teaching point. No outbox pattern despite every `db.insert()`+`producer.send()` pair being exposed to the dual-write problem. |
| Message Queues (`in-depth/06`) | 🔧 P0 | Expert — correct, complete RabbitMQ DLQ retry-then-nack logic. The retry counter is declared **outside** the per-message callback — a shared-state bug where one message's success silently resets another's retry count. Kafka's DLQ presented as if it were a native mechanic (it isn't — manual retry-topics required). |
| Reliability & Availability (`in-depth/07`) | 🔧 P0 | Arguably the most code-complete file in the repo (only file with a from-scratch consistent-hashing ring). **Two distinct bugs in the same `ConsistentHash` class:** `getServer()` linear-scans a structure built for binary search; `removeServer()`'s array filter runs *after* the values it's filtering on have already been deleted, so it removes nothing. No Redlock (multi-node) algorithm shown, despite being the natural place to fix the single-node lock bug in `01-auth-caching-api.md`. |
| Classic Design Problems (`in-depth/08`) | 🔧 P0 | 5 fully worked (Expert), 3 honestly-abbreviated. URL shortener's insert-then-update is non-atomic (orphaned-row risk on crash). "Token Bucket in Redis" is actually a **fixed-window counter** — the code contradicts its own name and the genuinely correct token-bucket class sitting in sibling file `07`. |
| Top-level `01-auth-caching-api.md` | 🔧 P0 | Advanced — hashed refresh tokens, atomic sliding-window rate limiter (real distributed rate-limiting, not a toy). Its distributed lock deletes unconditionally in `finally` — the textbook Redlock-unsafe pattern (no owner-check before delete). No JWT `alg:none`/algorithm-confusion coverage despite being the direct technical backup for the VAPT project-story anchor. |
| Top-level `02-queues-scaling-observability.md` | 🔧 P0 | Advanced — production-grade graceful shutdown, independent DB+Redis health checks. DLQ named, never configured in either Bull or SQS code. **No SNS or EventBridge coverage at all**, despite both being named verbatim in `CLAUDE.md`'s stack line — only SQS is covered. |
| Top-level `03-architecture-scenarios.md` | 🔧 P0 | Expert — the search-system scenario is explicitly, unprompted, anchored to the UTEC OpenSearch story with a real index mapping. `crypto.randomBytes(5).toString('base62')` **throws `ERR_UNKNOWN_ENCODING`** — `'base62'` isn't a valid Buffer encoding; a concrete, reproducible crash in Critical-importance code. |
| Top-level `04-mnc-frequently-asked.md` | ✅ | Low-redundancy-by-design condensation (tables/prose, not re-pasted code) — the model the DSA/Redux "-mnc" files should be rewritten to match. |
| `01-system-design-interview-prep.md` (the "master" cram file) | 🔧 P0 restructure | **The single largest redundancy in the entire repository** — its 8 sections scope-duplicate ~17,000+ words across the 8 `in-depth/` files. Its analogy layer (HTTP as postcard, CDN as 7-Eleven chain, CAP theorem as a disconnected Google Doc) is genuinely unique and valuable. **Recommended fix:** merge each analogy into the top of its matching `in-depth/` section, then reduce this file to a "how to use" note + master reference table + links. |
| Payment System / News Feed Ranking / Web Crawler / File Storage (Dropbox-style) / Food Delivery designs | ❌ | Named in the baseline as missing from the classic-design roster; confirmed still absent — the 5 `in-depth/08` designs + `04-mnc-frequently-asked.md`'s condensed set never reach these. **Add to `in-depth/08-classic-design-problems.md`**, prioritizing Payment System given the fintech-adjacent pipeline (recro-cheq/setu-health). |
| Own-system design write-ups (UTEC notification engine, OpenSearch migration, Risk.ai agent architecture) | ❌ | The single highest-leverage HLD gap per the baseline's own reasoning: interviewers spend 20 minutes on "walk me through something you built," and none of these three flagship stories has a dedicated design-doc-style write-up using the repo's own diagramming conventions. **Create `07-System-Design/own-systems/`** with one file per story, and — critically — resolve the OpenSearch latency-figure contradiction (§SKILL_GAP_ANALYSIS, §PRODUCT_COMPANY_READINESS) before writing that one. |
| Capacity-estimation drill sheet | ❌ | Named in the baseline, confirmed still absent. **Create `07-System-Design/capacity-estimation-drills.md`** (QPS→storage→bandwidth in 5 minutes, repeatable template). |

### 4b. LLD / Design Patterns

```
SOLID/DRY-KISS-YAGNI/Anti-Patterns/Composition-vs-Inheritance/Coupling-Cohesion (fundamentals/)
        ↓
Creational (Factory ✅, Singleton ✅, Abstract Factory ❌, Builder ❌, Prototype ❌)
        ↓
Structural (❌ all) · Behavioral (❌ all) · Architecture Patterns (❌ all)
        ↓
LLD Machine-Coding Problems (Parking Lot, BookMyShow, Splitwise, Elevator, Rate Limiter class)
```

| Node | Status | Evidence / Gap |
|---|---|---|
| `README.md` | 🔧 | Overstates completeness — 8 of 10 listed subfolders don't exist on disk. Contains a leftover AI-chat sentence ("If you'd like, I can proceed to generate the next phase...") that must be removed regardless of any other change. |
| `todo.md` | ✅ (planning source) | More honest than the README; use its 8 unchecked items directly as the `/prep-curriculum lld` input queue. |
| `fundamentals/anti-patterns.md` | 🔧 | 80 words, 4 anti-patterns, zero code, zero project-anchored example — despite its own prompt explicitly demanding one. |
| `fundamentals/composition-vs-inheritance.md` | 🔧 | 86 words, zero code; "prefer HOCs" reflects pre-hooks React and should reconcile against `04-React/01`. |
| `fundamentals/coupling-vs-cohesion.md` | 🔧 | The one canonical Q&A it poses ("split a monolith") is answered in a single sentence with no worked example. |
| `fundamentals/dry-kiss-yagni.md` | 🔧 | 107 words, no code, no project-anchored example. |
| `fundamentals/solid-principles.md` | 🔧 P0 | **The single highest-leverage LLD fix in the repo:** well-structured (real table, use-case sections) but **zero code across all 5 principles**, for a topic that's one of the most reliably asked "walk me through it" requests at this level. |
| `creational/factory/README.md` | ✅ (template) | Advanced/Expert — real runnable JS+TS code, genuine interview trick question, explicit anti-pattern comparison. Use as the literal rubric for every future pattern page. |
| `creational/singleton/README.md` | ✅ | Advanced/Expert — the Lambda-cold-start-unsafety trick question is genuinely excellent and directly ties to the Vkonnect EC2→Lambda story anchor. |
| `creational/abstract-factory/` | ❌ | `todo.md` marks this "in progress"; no file or folder exists anywhere on disk. |
| `creational/builder/`, `creational/prototype/` | ❌ | Not even referenced in `todo.md` — full gap. |
| `structural/` (Adapter, Decorator, Facade, Proxy, Composite, Bridge, Flyweight) | ❌ | Entire category absent. |
| `behavioral/` (Strategy, Observer, Command, State, Chain of Responsibility, Template Method, Iterator, Mediator) | ❌ | Entire category absent. |
| `architecture-patterns/`, `distributed-systems/` (as a patterns subfolder), `frontend-patterns/`, `nodejs-patterns/`, `cloud-patterns/`, `code-examples/` | ❌ | All absent, per `todo.md`'s own honest status. |
| `interview/` (LLD machine-coding: Parking Lot, BookMyShow, Splitwise, Elevator, Rate Limiter class design) | ❌ | Zero machine-coding LLD problems exist anywhere in the repo — the standard dedicated round at Indian product companies (Flipkart, Swiggy, Razorpay, Atlassian) for this YOE. **Create `18-LLD-Machine-Coding/`** (top-level, per the baseline's proposed structure) — one problem per file, one per week. |
| `design-patterns/` (root duplicate) | 📦 → delete | Byte-identical duplicate of the entire `14-Design-Patterns/` folder (`diff -rq` clean, confirmed in `_meta/INVENTORY.md`). Pure dead weight — delete outright, not a misfile to relocate. |

### 4c. Distributed Systems

No dedicated folder exists; the discipline is real but scattered across System-Design files (some buggy, see 4a) and `12-Company/` files (mostly correct, uncredited as canonical).

| Node | Status | Evidence / Gap |
|---|---|---|
| CAP / PACELC | ✅ (embedded) | `07-System-Design/in-depth/07-reliability-and-availability.md`'s CP/AP decision matrix (5 system types incl. a genuinely sophisticated Hybrid row) is Expert-level — just not extracted into a standalone reference. |
| Idempotency patterns | 🔧 | Deeply and correctly covered inside `12-Company/recro-cheq-nodejs-prep.md` §5.2 (client key → atomic server claim → PSP key, end-to-end) and echoed correctly in `teksystems-hsbc-nodejs-backend.md`, `setu-health/README.md`, `healthsystems/README.md` — genuinely strong content, but it lives in 4 different company files with no canonical topic-file home. |
| Delivery semantics (at-least-once, exactly-once myth) | ✅ (embedded) | `07-System-Design/04-mnc-frequently-asked.md` Q11 correctly states true exactly-once is nearly impossible — accurate, but one line, not a deep treatment. |
| Saga / outbox pattern | 🔧 | Named correctly in prose (`03-architecture-scenarios.md`, `coforge-tech-lead/coforge-prep.md`'s pattern-judgment table with an explicit "NOT when/cost" column) and even implemented in full for the money-transfer domain in `teksystems-hsbc-nodejs-backend.md` (Q32: saga + outbox + CP-under-CAP reasoning, "genuinely sophisticated, correct distributed-systems design"). But the one file that actually shows the vulnerable dual-write code (`05-system-architecture.md`) never applies the fix. |
| Distributed locks (Redlock) | 🔧 P0 | The one implementation in the topic folder (`01-auth-caching-api.md`) is unsafe (see 4a). No file anywhere implements the real multi-node Redlock algorithm — `recro-cheq-nodejs-prep.md` §6-Q20 is the closest, and it correctly self-limits to "Redis locks avoid duplicate *work*, not correctness — put the invariant in the database." |
| Consistent hashing | 🔧 P0 | See 4a — two confirmed bugs in the only implementation. |
| Clock/time issues (logical clocks, vector clocks, NTP drift) | ❌ | Entirely absent anywhere in the repo. |
| `19-Distributed-Systems/` (top-level folder) | ❌ | **Create**, consolidating and fixing the scattered-but-good company-file content above into 5–7 canonical files (idempotency, delivery-semantics, saga/outbox, distributed locks, consistent hashing, CAP/PACELC, clocks) — each explicitly linked back to an AWS story the candidate already owns, per the baseline's original recommendation. |

---

## 5. Databases (SQL / Mongo / Redis / OpenSearch)

```
Joins/Indexing → Transactions/Isolation → EXPLAIN/Performance Tuning
        ↓
MongoDB Schema/Aggregation
        ↓
Redis (data structures → caching patterns → eviction → distributed locks)
        ↓
OpenSearch (inverted index → analyzers → query DSL → shard sizing → _bulk)
```

| Node | Status | Evidence / Gap |
|---|---|---|
| Joins/Indexing (`06-SQL.../01`) | 🔧 | Expert — 3 different "second highest salary" methods with different tie-handling, correct correlated-subquery-vs-JOIN reasoning. The "Consecutive Numbers" solution silently assumes gap-free IDs (LeetCode #180 explicitly allows gaps) — a real production footgun with no caveat. |
| Transactions/Isolation (`02`) | 🔧 | Expert — correctly hedges REPEATABLE READ's phantom-read prevention ("Possible*... InnoDB prevents via gap locking in most cases," more precise than most prep material). Deadlock example fixed with real, runnable `transferFunds` code. Never names MVCC/undo-logs as the actual mechanism — describes the "what," not the "how." |
| MongoDB Schema/Aggregation (`03`) | ✅ | Expert — `$graphLookup`, Bucket Pattern, Computed Pattern are genuinely advanced content rare in prep material. Missing the concrete 16MB-limit failure case and the embed-to-avoid-transactions cost motivation. |
| EXPLAIN/Performance Tuning (`04`) | 🔧 (minor) | Advanced — real before/after `EXPLAIN` output, not just description. Doesn't explain *why* a full index scan beats a full table scan (both touch every row, but one avoids the wider row-data fetch). |
| SQL MNC cram (`05`) | 🔧 | Q15's ESR rule (Equality→Sort→Range for Mongo compound indexes) is genuinely valuable content that exists **only** here, not in the deep-dive file that owns MongoDB indexing — backport it. |
| DB internals layer (B+Tree mechanics, gap locks, LSM-vs-B-Tree) | ✅ (embedded, uncredited) | Materially better covered than the baseline assumed — `07-System-Design/in-depth/03-databases.md`'s B-Tree walkthrough and `06-SQL.../02`'s deadlock/isolation content together cover most of what the baseline flagged as a standalone "internals" gap. Real remaining gap: WiredTiger internals and Mongo shard-key design depth. |
| Redis | 🔧 | **Major correction to the baseline's "near-absent, 1.5/5" score:** `12-Company/recro-cheq-nodejs-prep.md` §6C (Q15–Q20) is genuinely Expert-level — per-role Redis-instance separation (`allkeys-lru` cache instance vs. `noeviction` state instance, "because one instance mixing both silently evicts your locks under memory pressure"), a correct Lua atomic-unlock distributed lock, cache-stampede mitigations, and an honest Redlock critique (Kleppmann's fencing-token argument). The gap is **organizational, not technical** — this content is buried inside one company's prep file, not a canonical topic file, so it isn't discoverable or rehearsed as "the Redis chapter." |
| OpenSearch | 🔧 P0 | `15-AWS-Services/analytics-search.md` — Advanced, correctly covers inverted indexes, refresh latency, over-sharding. One claim (OpenSearch-vs-Elasticsearch shard-split/reindex divergence) needs verification against current docs before being stated as fact. **This is the single highest-risk node in the entire graph** — see `_meta/SKILL_GAP_ANALYSIS.md` and `_meta/PRODUCT_COMPANY_READINESS.md` for the cross-file OpenSearch-metric contradiction (8+ different "2s→200ms"-equivalent figures across 6 files) discovered this session, which makes the resume-defense risk the baseline flagged even more concrete than originally assessed. |
| `20-Redis-OpenSearch/redis.md` | ❌ | **Create**, promoting `recro-cheq-nodejs-prep.md` §6C to a canonical, company-agnostic topic file. |
| `20-Redis-OpenSearch/opensearch-deep.md` | ❌ | **Create** — must resolve the cross-file latency-number contradiction as its first paragraph, then add the `_bulk` API (named as missing — the actual mechanism the UTEC MySQL→SQS→Lambda→OpenSearch CDC pipeline would use) and a worked custom-analyzer example. |

---

## 6. AWS / Cloud

```
README (index) → 00-cheatsheet.md (34-service one-liner table)
        ↓
compute.md · databases.md · storage.md · networking.md · security.md
        ↓
messaging-integration.md · iac-devops.md · analytics-search.md
```

This is the best-structured folder in the repository — a genuine three-layer design (index → cheatsheet → deep reference) with **no** redundant cram file, unlike every other cluster in the repo. Use this structure as the explicit `/prep-restructure` template for the JS/Redux/DSA "-mnc-frequently-asked.md" duplication problem.

| Node | Status | Evidence / Gap |
|---|---|---|
| `README.md` | ✅ (template) | Accurately maps all 9 files present, Tier 1/Tier 2 sequencing. "Map to my projects" is blank across all 8 domain files — the one real gap in an otherwise exemplary index. |
| `00-cheatsheet.md` | ✅ | Zero factual errors across 34 services. Missing API Gateway REST-vs-HTTP-API row and a CloudWatch Logs Insights/X-Ray row — both closed by `networking.md` and `iac-devops.md` respectively, just not surfaced at cheatsheet level. |
| `compute.md` | ✅ | Advanced, zero errors (Lambda limits, EC2 stop-vs-terminate, IMDSv2). Missing Lambda SnapStart / response streaming. |
| `databases.md` | ✅ | Advanced, zero errors (DynamoDB 400KB item cap, GSI/LSI, Redis Cluster limits). Missing `TransactWriteItems`/`TransactGetItems`. |
| `iac-devops.md` | ✅ | Advanced, zero errors (500-resource-per-stack limit correctly `[VERIFY-2026]`-tagged — the figure `capgemini-L2-interview-prep.md` self-contradicts, see §PRODUCT_COMPANY_READINESS). No CDK code shown despite CDK being named as the modern alternative. |
| `messaging-integration.md` | ✅ (best file in the folder) | Exceptional — the single most technically dense, zero-contradiction file reviewed in the whole project; a complete, direct match to `CLAUDE.md`'s named SQS/SNS/EventBridge stack. |
| `networking.md` | 🔧 P0 | Advanced, one confirmed factual bug: states ALB has a "fixed 60-second idle timeout" — it's actually configurable 1–4000s (only NLB's 350s is truly fixed). Would produce a wrong answer to a natural follow-up. |
| `security.md` | ✅ | Advanced, zero errors (IAM evaluation order, KMS envelope encryption, Secrets Manager rotation contract). Directly supports the VAPT project-story anchor but isn't cross-linked to it yet. |
| `storage.md` | 🔧 | Advanced. EFS-vs-S3 cost ratio stated as "~3×" — real current pricing puts it closer to ~10–13×, and notably lacks the `[VERIFY-2026]` tag the rest of the folder applies to perishable pricing facts. |
| `analytics-search.md` | 🔧 P0 | See §5 (Databases) — the file underpinning the flagship OpenSearch story. |
| DR patterns (RTO/RPO), cost-optimization drills, scenario-based Qs per service | ❌ | Named in the baseline as a light-touch addition across all 9 files; confirmed still absent. Lower priority than the P0 items above given the folder's otherwise-strong state. |
