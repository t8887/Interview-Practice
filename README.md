# Senior Full-Stack & Cloud Engineer — Interview Preparation Hub

> **Owner:** Onkar Sawant · Full-Stack + Backend + Cloud + Agentic AI Engineer  
> **Goal:** Interview-ready in 30 days — targeting Senior/L2 Full-Stack roles at MNCs and product companies  
> **Stack:** JavaScript · TypeScript · Node.js · React · Redux · SQL/MongoDB · System Design · AWS · Agentic AI · DSA

---

## What This Repository Is

This is a structured, production-quality interview preparation system — not a random collection of notes. Every folder follows a deliberate learning sequence: language fundamentals → data layer →
architecture → cloud → AI. Each topic includes deep-dive theory, MNC-sourced interview questions (from Glassdoor, AmbitionBox, LeetCode Discuss), coding patterns, and decision-making frameworks.

The repository is actively maintained and directly tied to a 30-day preparation sprint tracked in [`TRACKING.md`](TRACKING.md).

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
├── 08-DSA/                     ← 75 problems across 10 patterns, MNC Qs
├── 09-Agentic-AI/              ← Agents, RAG, Tool Calling, Frameworks, MNC Qs
├── 10-Interview-Prep/          ← Behavioral, STAR stories, Layoff script
├── 11-AI-Risk-Assistant-Project/ ← Portfolio project: full-stack AI compliance tool
├── 12-Company/                 ← Company-specific prep (Capgemini, Infosys, Deloitte, etc.)
├── 13-Salary-Negotiation/      ← Negotiation handbook: anchoring, scripts, tactics
├── 14-Design-Patterns/         ← SOLID, DRY/KISS/YAGNI, Creational patterns
├── 15-AWS-Services/            ← 35 AWS services: deep-dive notes + cheatsheet
└── TRACKING.md                 ← 30-day sprint tracker with 173 tasks
```

---

## Module Breakdown

### 01 — JavaScript

**Files:** 6 · **Focus:** Senior-level JS internals and coding patterns

The hardest filter at Razorpay, Swiggy, Flipkart, and Cred — companies that live and die by JS runtime behavior.

| File                                | What's Inside                                                                                                                            |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `01-closures-promises-polyfills.md` | Counter, once, memoize, curry, pipe, Promise.all/race/allSettled, debounce, throttle, deep clone, flatten, bind/call/apply, EventEmitter |
| `02-advanced-senior-level.md`       | LRU Cache (Map + DLL), LFU Cache, Trie + autocomplete, Design Twitter, URL Shortener, Rate Limiter (token bucket + sliding window)       |
| `03-pattern-based-must-know.md`     | Kadane's, Floyd's Cycle Detection, Binary Search variants, Prefix Sum, Monotonic Stack, Backtracking template                            |
| `04-mnc-frequently-asked.md`        | 40 MNC Qs — output-based, closures, promises, `this`, prototypes, event loop, polyfills, ES6+, currying                                  |
| `05-answers.md`                     | Worked answers to the MNC question set                                                                                                   |
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

**Files:** 11 · **Target:** 75+ problems across 10 patterns

| File                         | Pattern                               | Problems  |
| ---------------------------- | ------------------------------------- | --------- |
| `01-arrays-strings.md`       | Traversal, prefix, two-pass           | 10        |
| `02-hash-maps.md`            | Frequency counting, grouping          | 8         |
| `03-two-pointers.md`         | Opposite ends, same direction         | 8         |
| `04-stack-queue.md`          | Monotonic stack, deque                | 8         |
| `05-sliding-window.md`       | Fixed/variable window                 | 6         |
| `06-linked-list.md`          | Reverse, cycle, merge                 | 8         |
| `07-trees.md`                | Traversals, BST, Trie                 | 10        |
| `08-graphs.md`               | BFS/DFS, topological, union-find      | 8         |
| `09-dynamic-programming.md`  | 1D/2D DP, knapsack variants           | 10        |
| `10-binary-search.md`        | Template, rotated array, answer-space | 7         |
| `11-mnc-frequently-asked.md` | Top problems, pattern recognition     | 22 MNC Qs |

**Difficulty split:** ~50% Medium, ~10% Hard, ~40% Easy  
**Target companies:** Capgemini, Infosys, Deloitte, TCS, Encora, CitiusTech

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

**Files:** 8 · **Coverage:** Tailored guides per company

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

| Phase                  |  Topics |   Done |        % |
| ---------------------- | ------: | -----: | -------: |
| JavaScript             |       3 |      3 |     100% |
| Node.js                |       5 |      5 |     100% |
| React                  |       5 |      5 |     100% |
| System Design in Depth |       9 |      9 |     100% |
| Company Prep           |       5 |      5 |     100% |
| Salary Negotiation     |       1 |      1 |     100% |
| TypeScript             |       5 |      0 |       0% |
| Redux                  |       4 |      0 |       0% |
| SQL / MongoDB          |       5 |      0 |       0% |
| DSA Problems           |      75 |      0 |       0% |
| Agentic AI             |       2 |      0 |       0% |
| AI Project Build       |       5 |      0 |       0% |
| Mock Interviews        |       5 |      0 |       0% |
| **TOTAL**              | **173** | **28** | **~16%** |

Full task-level tracking → [`TRACKING.md`](TRACKING.md)

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

[`OnkarSawant-FullStack-Developer-5+Years.pdf`](OnkarSawant-FullStack-Developer-5+Years.pdf) — available in the root of this repository.
