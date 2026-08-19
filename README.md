# Senior Full-Stack & Cloud Engineer — Interview Preparation Hub

> **Owner:** Onkar Sawant · Full-Stack + Backend + Cloud + Agentic AI Engineer  
> **Goal:** Senior/L2 Full-Stack readiness at MNCs (active pipeline) building toward a Google-tier SDE-2/Senior bar (Track B) — see `_meta/MASTER_ROADMAP.md` for the phased plan  
> **Stack:** JavaScript · TypeScript · Node.js · React · Redux · SQL/MongoDB · System Design · AWS · Agentic AI · DSA

---

## What This Repository Is

This is a structured, production-quality interview preparation system — not a random collection of notes. Every folder follows a deliberate learning sequence: language fundamentals → data layer →
architecture → cloud → AI. Each topic includes deep-dive theory, MNC-sourced interview questions (from Glassdoor, AmbitionBox, LeetCode Discuss), coding patterns, and decision-making frameworks.

The repository runs on a Claude Code prep-system (`.claude/commands/`) that tracks real state in `_meta/state.json` and `_meta/PRODUCT_COMPANY_READINESS.md` rather than a fixed-date sprint — see [`TRACKING.md`](TRACKING.md) for the rolling weekly log, or run `/prep-status` for a dashboard.

---

## Folder Structure

```
📁 Interview Preparation Hub
├── 01-JavaScript/              ← Closures, Promises, Polyfills, Puzzles, MNC Qs
├── 02-TypeScript/              ← Generics, Utility Types, Narrowing, Async, MNC Qs
├── 03-NodeJS/                  ← Event Loop, Streams, Workers, Express, MNC Qs
├── 04-React/                   ← Hooks, Reconciliation, Performance, Patterns, MNC Qs
├── 05-Redux/                   ← RTK, RTK Query, Middleware, Selectors, MNC Qs
├── 06-SQL-MySQL-MongoDB/       ← Joins, Indexing, Transactions, Aggregation, MNC Qs
├── 07-System-Design/           ← Auth, Caching, Queues, Scaling, Architecture, MNC Qs
│   └── in-depth/               ← Networking, Scalability, Databases, Caching deep dives
├── 08-DSA/                     ← 15 pattern files (10 original + 5 split out of 01-JavaScript/03), MNC Qs — 0 problems logged solved so far, see 16-DSA-Practice/LOG.md
├── 09-Agentic-AI/              ← Agents, RAG, Tool Calling, Frameworks, MNC Qs
├── 10-Interview-Prep/          ← Behavioral, STAR stories, Layoff script
├── 11-AI-Risk-Assistant-Project/ ← Portfolio project: full-stack AI compliance tool (scaffold — not yet built)
├── 12-Company/                 ← Company-specific prep (20+ companies)
├── 13-Salary-Negotiation/      ← Negotiation handbook: anchoring, scripts, tactics (gitignored — see .gitignore)
├── 14-Design-Patterns/         ← SOLID, DRY/KISS/YAGNI, Creational patterns (2 of 10 planned categories complete — see todo.md)
├── 15-AWS-Services/            ← 34 AWS services: deep-dive notes + cheatsheet
├── 16-DSA-Practice/            ← Solved-problem layer (attempt → optimal → complexity → redo-date), distinct from 08-DSA/'s notes
├── 17-CS-Fundamentals/         ← os/, networking/, database-internals/ — OS is a confirmed 0/5 gap
├── 18-LLD-Machine-Coding/      ← Parking Lot, BookMyShow, Splitwise, Elevator, Rate Limiter (class design)
├── 19-Distributed-Systems/     ← CAP/PACELC, idempotency, saga/outbox, distributed locks, clocks
├── 20-Redis-OpenSearch/        ← redis/, opensearch/ — including the migration-story defense write-up
├── 21-Mock-Interviews/         ← Logged mocks with a communication/approach/correctness/complexity/edge-cases rubric
├── 22-Revision/                ← Spaced-repetition queue (D1/D3/D7/D21)
└── TRACKING.md                 ← Rolling weekly log (rewritten 2026-08-19 — see _meta/MASTER_ROADMAP.md for the actual plan)
```

> **Progress and gap analysis live in `_meta/`, not in this tree.** For the current phase, skill scores, and priority-ordered next actions, see `_meta/MASTER_ROADMAP.md`, `_meta/PRODUCT_COMPANY_READINESS.md`, and `_meta/state.json` — or run `/prep-status`.

---

## Module Breakdown

### 01 — JavaScript

**Files:** 6 · **Focus:** Senior-level JS internals and coding patterns

The hardest filter at Razorpay, Swiggy, Flipkart, and Cred — companies that live and die by JS runtime behavior.

| File                                | What's Inside                                                                                                                            |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `01-closures-promises-polyfills.md` | Counter, once, memoize, curry, pipe, Promise.all/race/allSettled, debounce, throttle, deep clone, flatten, bind/call/apply, EventEmitter (canonical home — other files link here) |
| `02-advanced-senior-level.md`       | Design Twitter, URL Shortener, Rate Limiter (token bucket + sliding window). LRU Cache/LFU Cache/Trie moved to `16-DSA-Practice/design/` during `/prep-restructure`. |
| `03-pattern-based-must-know.md`     | Kadane's, Floyd's Cycle Detection (kept here) + links to Binary Search Variants/Prefix Sum/Monotonic Stack/Backtracking, moved to `08-DSA/12-15` during `/prep-restructure` |
| `04-mnc-frequently-asked.md`        | 40 MNC Qs — output-based, closures, promises, `this`, prototypes, event loop, polyfills, ES6+, currying                                  |
| `06-answers.md`                     | Worked answers to the MNC question set + `05-tricky-output-puzzles.md` (renumbered from `05-answers.md` to fix a double-`05` collision) |
| `05-tricky-output-puzzles.md`       | Output prediction exercises (closure trap, async ordering, prototype chain)                                                              |
| `Practice/`                         | Hands-on coding scratch files                                                                                                            |

**Key concepts:** Closure scoping, prototype chain, event loop microtask queue, Promise internal mechanics, generator functions, WeakMap/WeakSet use cases.

---

### 02 — TypeScript

**Files:** 6 · **Focus:** Type system mastery for senior roles

| File                         | What's Inside                                                                       |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| `01-generics.md`             | Generic functions, constraints, conditional types, mapped types, infer keyword      |
| `02-utility-types.md`        | Partial, Required, Pick, Omit, Record, Readonly, ReturnType, custom utilities       |
| `03-narrowing.md`            | `typeof`, `instanceof`, discriminated unions, exhaustiveness checking               |
| `04-interfaces-vs-types.md`  | Structural typing, declaration merging, when to use each                            |
| `05-async-and-advanced.md`   | Template literal types, branded types, builder pattern, decorators                  |
| `06-mnc-frequently-asked.md` | 30 MNC Qs — core TS, generics, utility types, narrowing, advanced types, React + TS |

---

### 03 — Node.js

**Files:** 6 · **Focus:** Backend internals that L2+ interviewers probe

| File                         | What's Inside                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| `01-event-loop.md`           | 6 phases of the event loop, microtask queue, libuv thread pool, blocking detection           |
| `02-async-patterns.md`       | Callbacks → Promises → async/await evolution, concurrency control, Promise.all vs allSettled |
| `03-streams-workers.md`      | Readable/Writable/Transform/Duplex streams, backpressure, worker_threads, child_process      |
| `04-error-handling.md`       | Operational vs programmer errors, domain errors, graceful shutdown, uncaughtException        |
| `05-express-design.md`       | Production project structure, middleware ordering, security headers, rate limiting           |
| `06-mnc-frequently-asked.md` | 30 MNC Qs — event loop, streams, Express, security, error handling, performance, auth        |

---

### 04 — React

**Files:** 6 · **Focus:** React internals and performance patterns

| File                                 | What's Inside                                                                       |
| ------------------------------------ | ----------------------------------------------------------------------------------- |
| `01-hooks-deep-dive.md`              | useState, useEffect, useRef, useCallback, useMemo, useReducer, custom hooks         |
| `02-rendering-reconciliation.md`     | Virtual DOM, Fiber architecture, concurrent features, Suspense, transitions         |
| `03-memoization-performance.md`      | React.memo, useMemo vs useCallback, code splitting, virtualization, bundle analysis |
| `04-state-management.md`             | Context API, Redux, Zustand, TanStack Query — when to use which                     |
| `05-patterns-interview-questions.md` | HOC, render props, compound components, Error Boundaries, portals                   |
| `06-mnc-frequently-asked.md`         | 30 MNC Qs — hooks, rendering, reconciliation, performance, state mgmt, React 18+    |

---

### 05 — Redux

**Files:** 3 · **Focus:** RTK and RTK Query in production

| File                               | What's Inside                                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| `01-redux-toolkit-fundamentals.md` | configureStore, createSlice, Immer immutability, createAsyncThunk, entity adapter                |
| `02-rtk-query-advanced.md`         | API slices, cache tags, polling, optimistic updates, redux-persist, Redux vs Zustand vs TanStack |
| `03-mnc-frequently-asked.md`       | 20 MNC Qs — core Redux, RTK, middleware, RTK Query, selectors, architecture decisions            |

---

### 06 — SQL, MySQL & MongoDB

**Files:** 5 · **Focus:** Data modeling and query performance

| File                               | What's Inside                                                                                 |
| ---------------------------------- | --------------------------------------------------------------------------------------------- |
| `01-joins-indexing.md`             | INNER/LEFT/RIGHT/FULL joins, B-Tree vs hash indexes, covering indexes, window functions       |
| `02-transactions-isolation.md`     | ACID properties, isolation levels, pessimistic vs optimistic locking, deadlock prevention     |
| `03-mongodb-schema-aggregation.md` | Embed vs reference, $lookup, $group, $unwind, aggregation pipeline optimization               |
| `04-explain-performance-tuning.md` | EXPLAIN ANALYZE, query hints, connection pooling, Redis caching layer                         |
| `05-mnc-frequently-asked.md`       | 25 MNC Qs — JOINs, indexing, transactions, window functions, MongoDB aggregation, N+1 problem |

---

### 07 — System Design

**Files:** 13 (4 top-level + 9 in-depth) · **Focus:** End-to-end architecture for senior rounds

**Top-level:**

| File                                 | What's Inside                                                                             |
| ------------------------------------ | ----------------------------------------------------------------------------------------- |
| `01-auth-caching-api.md`             | JWT vs sessions, OAuth 2.0/OIDC, Redis caching strategies, REST vs GraphQL, rate limiting |
| `02-queues-scaling-observability.md` | Message queues, horizontal vs vertical scaling, load balancing, distributed tracing       |
| `03-architecture-scenarios.md`       | Design URL shortener, notification system, newsfeed, file upload pipeline, chat system    |
| `04-mnc-frequently-asked.md`         | 24 MNC Qs — auth, caching, scaling, API design, microservices vs monolith                 |

**In-depth sub-folder (`in-depth/`):**

| File                                 | What's Inside                                                          |
| ------------------------------------ | ---------------------------------------------------------------------- |
| `01-networking-basics.md`            | TCP/IP, HTTP/2/3, TLS handshake, DNS resolution                        |
| `01-system-design-interview-prep.md` | Interview tactics: clarify → estimate → design → drill                 |
| `02-scalability.md`                  | Horizontal scaling, sharding strategies, consistent hashing            |
| `03-databases.md`                    | RDBMS vs NoSQL selection criteria, OLTP vs OLAP                        |
| `04-caching.md`                      | Redis data structures, eviction policies, cache-aside vs write-through |
| `05-system-architecture.md`          | Microservices, monolith, event-driven, CQRS, saga pattern              |
| `06-message-queues.md`               | Kafka vs SQS, idempotency, consumer groups, DLQs                       |
| `07-reliability-and-availability.md` | SLAs/SLOs, chaos engineering, circuit breakers, bulkhead               |
| `08-classic-design-problems.md`      | Instagram, Uber, WhatsApp, Netflix — solved with tradeoffs             |

---

### 08 — DSA

**Files:** 15 (10 original + 4 split out of `01-JavaScript/03-pattern-based-must-know.md` during `/prep-restructure`) · Note in every one of these files: solutions are *shown*, not yet *solved-by-you* — see `16-DSA-Practice/LOG.md` for the actual count that matters.

| File                          | Pattern                                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------------------- |
| `01-arrays-strings.md`        | Traversal, prefix, two-pass                                                                 |
| `02-hash-maps.md`             | Frequency counting, grouping                                                                |
| `03-two-pointers.md`          | Opposite ends, same direction                                                                |
| `04-stack-queue.md`           | Monotonic stack, deque                                                                       |
| `05-sliding-window.md`        | Fixed/variable window                                                                        |
| `06-linked-list.md`           | Reverse, cycle, merge, LRU Cache (canonical — see also `16-DSA-Practice/design/`)             |
| `07-trees.md`                 | Traversals, BST, Trie                                                                        |
| `08-graphs.md`                | BFS/DFS, topological, union-find (Dijkstra still a gap — see `_meta/KNOWLEDGE_GRAPH.md`)      |
| `09-dynamic-programming.md`   | 1D/2D DP, knapsack variants                                                                  |
| `10-binary-search.md`         | Template, rotated array, answer-space                                                       |
| `11-mnc-frequently-asked.md`  | Top problems, pattern recognition (22 Qs)                                                    |
| `12-15` (prefix-sum, monotonic-stack, backtracking, binary-search-variants) | Migrated from `01-JavaScript/03` — see those files for noted overlaps with `04`/`10` |

**Still missing (❌ per `_meta/KNOWLEDGE_GRAPH.md`):** Heap/Priority Queue, Intervals, Greedy, Bit Manipulation.

---

### 09 — Agentic AI

**Files:** 3 · **Focus:** Production AI systems — the highest-leverage differentiator for 2026 roles

| File                          | What's Inside                                                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `01-agents-tools-rag.md`      | ReAct loop, tool/function calling, RAG pipeline (chunking → embedding → retrieval), guardrails, evaluation |
| `02-frameworks-production.md` | LangChain, LangGraph, streaming with SSE, cost tracking, AWS Lambda deployment                             |
| `03-mnc-frequently-asked.md`  | 20 MNC Qs — RAG vs fine-tuning, embeddings, agents, ReAct, LangChain, hallucination handling               |

---

### 10 — Interview Prep (Behavioral)

**Files:** 1 · **Focus:** Non-technical round prep

- `01-stories-behavioral.md` — Layoff/gap script, 5 STAR-format achievement stories, leadership under pressure, conflict resolution, "tell me about yourself" structure

---

### 11 — AI Risk Assistant Project

**Files:** 1 · **Status:** Architecture scaffolded, build in progress

A portfolio-grade full-stack AI application demonstrating the complete senior engineer skill set in a single project.

**Architecture:**

```
React + TypeScript (Dashboard)
        │
   Express + TypeScript (API Gateway)
   Auth │ Rate Limit │ Validation │ Logging
        │
 MySQL  MongoDB  Redis  OpenAI  S3/OpenSearch
 RBAC   Reports  Cache  Agent   Documents
```

**Tech Stack:** React 18, TypeScript, TailwindCSS, TanStack Query, Node.js/Express, MySQL, MongoDB, Redis, OpenAI function calling, RAG pipeline, JWT + RBAC, SSE streaming, AWS S3  
**Key selling point:** AI agent that uses tool calling to search compliance databases, calculate risk scores, and generate structured reports — with full audit logging for regulatory compliance.

---

### 12 — Company-Specific Prep

**Files:** 20+ (this table lists a representative subset — the folder grew past 8 without this table being kept current; a full, accurate listing needs a fresh `12-Company/INDEX.md` pass, out of scope for this restructure) · **Coverage:** Tailored guides per company

| File                                  | Company            | Round Level                             |
| ------------------------------------- | ------------------ | --------------------------------------- |
| `capgemini-L2-interview-prep.md`      | Capgemini          | L2 — Node.js, system design, behavioral |
| `infosys-L2-interview-prep.md`        | Infosys            | L2 — Full-stack, architecture           |
| `deloitte-interview-prep.md`          | Deloitte           | LSA — consulting + technical            |
| `deloitte-cyber-1hour-cram.md`        | Deloitte           | Cyber division — 1-hour rapid cram      |
| `citiustech-L1-interview-prep.md`     | CitiusTech         | L1 — Healthcare IT, Node.js             |
| `encora-L2-backend-engineer.md`       | Encora             | L2 — Backend engineer deep dive         |
| `persistent-aws-backend-developer.md` | Persistent Systems | AWS + backend                           |
| `tcs-L2-hr-preparation.md`            | TCS                | L2 HR round                             |

---

### 13 — Salary Negotiation

**Files:** 1 · **Status:** Complete

`salary-negotiation-mastery.md` — Full negotiation handbook: anchoring tactics, counter-offer scripts, how to navigate multiple offers, equity vs cash tradeoffs, when to walk away.

---

### 14 — Design Patterns

**Files:** 7 across 2 sub-folders · **Status:** In progress

| Area            | Files                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------- |
| `fundamentals/` | SOLID principles, DRY/KISS/YAGNI, coupling vs cohesion, composition vs inheritance, anti-patterns |
| `creational/`   | Singleton pattern, Factory pattern                                                                |

---

### 15 — AWS Services

**Files:** 10 · **Coverage:** 35 services across 8 domains

A complete AWS interview-prep reference for Senior Full-Stack / Node + AWS roles.

| File                       | Services                                                               |
| -------------------------- | ---------------------------------------------------------------------- |
| `00-cheatsheet.md`         | All 35 services — rapid-fire table (service → one-liner → when to use) |
| `compute.md`               | EC2, Lambda, ECS/EKS/Fargate, Auto Scaling                             |
| `storage.md`               | S3, EBS, EFS                                                           |
| `databases.md`             | RDS/Aurora, DynamoDB, ElastiCache/Redis                                |
| `networking.md`            | VPC, Route 53, CloudFront, ALB/NLB, API Gateway                        |
| `messaging-integration.md` | SQS, SNS, EventBridge, Step Functions, Kinesis                         |
| `iac-devops.md`            | CloudFormation/SAM, CloudWatch, CodePipeline                           |
| `security.md`              | IAM, KMS, Secrets Manager, Cognito                                     |
| `analytics-search.md`      | Athena, OpenSearch, Glue                                               |

Each service is documented using a fixed template: What it is → Interviewers probe → When to use vs alternatives → Rapid Q&A → Gotchas/limits → Recency.

**Tier 1 must-know (come up in nearly every AWS interview):**  
Lambda · API Gateway · DynamoDB · S3 · IAM · SQS · RDS/Aurora · VPC · CloudWatch · ECS/Fargate

---

## Progress Snapshot

This table was a fixed 173-task count tied to the expired 30-day sprint (`_meta/imported/01_REPOSITORY_ANALYSIS.md` flagged it as self-contradictory — e.g. it showed TypeScript at 0% despite 6 Advanced/Expert-rated files already existing). Real, evidence-cited progress now lives in `_meta/PRODUCT_COMPANY_READINESS.md` (0–5 score per skill, every score backed by a cited file) and `_meta/state.json` (machine-readable phase/count state). Snapshot as of this restructure:

| Signal | Where | Current state |
| --- | --- | --- |
| Files deep-analyzed | `_meta/state.json` | 100 / 100 |
| DSA problems solved & logged | `16-DSA-Practice/LOG.md` | 0 |
| Design-Patterns categories complete | `14-Design-Patterns/todo.md` | 2 / 10 |
| Mock interviews logged | `21-Mock-Interviews/` | 0 |
| Current roadmap phase | `_meta/MASTER_ROADMAP.md` | Phase 0 (Repository Cleanup, Safety & Correctness Debt) |

Run `/prep-status` for the live dashboard version of this table.

---

## How to Navigate This Repo

**If you are reviewing this repo:**

- Start with any numbered folder to see the depth of notes on that topic
- `08-DSA/` shows LeetCode problem tracking with pattern coverage
- `15-AWS-Services/00-cheatsheet.md` gives a fast overview of cloud knowledge
- `11-AI-Risk-Assistant-Project/README.md` shows the portfolio project architecture

**If you are studying alongside this repo:**

1. Follow the folder sequence 01 → 15 — the order is intentional (each topic builds on the previous)
2. For each topic: read theory → do the `mnc-frequently-asked.md` file → close and recite
3. For system design rounds: combine `07-System-Design/` with `15-AWS-Services/`
4. Before any interview: 30-minute pass of the relevant company file in `12-Company/` + `00-cheatsheet.md` in `15-AWS-Services/`

---

## Resume

Kept locally in the repo root, no longer tracked in git (untracked during `/prep-restructure` 2026-08-19, per `_meta/INVENTORY.md`'s privacy flags — a PII PDF has no reason to be in version-control history on a repo that may be shared). Ask the owner directly rather than expecting a link here.
