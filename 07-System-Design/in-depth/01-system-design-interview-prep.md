# 📘 System Design Interview Prep — Index

> **Restructure note (2026-08-19):** This file used to fully duplicate the 8 deep-dive files below — same 8 sections, same subtopics, ~6,980 words of scope overlap confirmed via `/prep-analyze` (`_meta/REPOSITORY_ANALYSIS.md`) and verified again during `/prep-restructure`. It's now a pure index into those files, **plus the one thing this file had that they didn't: a memorable one-line analogy per concept.** That analogy layer is kept below rather than discarded — use it as a 5-minute pre-interview warm-up, then go deep in the linked file for anything that needs more than a one-liner.

---

## The 8 deep-dive files (canonical — go here for full depth)

| # | Topic | File |
|---|---|---|
| 1 | Networking Basics (HTTP/HTTPS, DNS, TCP/UDP, REST/WebSocket) | [`01-networking-basics.md`](./01-networking-basics.md) |
| 2 | Scalability (horizontal/vertical, load balancers, CDN, auto scaling) | [`02-scalability.md`](./02-scalability.md) |
| 3 | Databases (SQL/NoSQL, indexing, sharding, replication, ACID/BASE) | [`03-databases.md`](./03-databases.md) |
| 4 | Caching (Redis/Memcached, eviction, write patterns, stampede) | [`04-caching.md`](./04-caching.md) |
| 5 | System Architecture (monolith/microservices, API Gateway, event-driven, CQRS) | [`05-system-architecture.md`](./05-system-architecture.md) |
| 6 | Message Queues (Kafka, RabbitMQ, Pub/Sub, DLQ) | [`06-message-queues.md`](./06-message-queues.md) |
| 7 | Reliability & Availability (CAP, rate limiting, circuit breaker, consistent hashing) | [`07-reliability-and-availability.md`](./07-reliability-and-availability.md) |
| 8 | Classic Design Problems (URL shortener, Twitter, WhatsApp, YouTube, Uber + 3 abbreviated) | [`08-classic-design-problems.md`](./08-classic-design-problems.md) |

For rapid-fire condensed Q&A across all of these, see [`../04-mnc-frequently-asked.md`](../04-mnc-frequently-asked.md).

---

## 🧠 Memorable analogies (5-minute warm-up — the one thing this file uniquely had)

### 1. Networking

| Concept | Analogy |
|---|---|
| HTTP vs HTTPS | A postcard anyone can read, vs. the same postcard in a sealed, tamper-evident envelope. |
| DNS | The internet's phone book — you know the name, DNS gives you the number. |
| TCP vs UDP | A registered letter with delivery confirmation, vs. a flyer thrown out a car window. |
| REST vs WebSocket | Texting (send, wait, done) vs. a phone call (both sides talk freely, connection stays open). |

### 2. Scalability

| Concept | Analogy |
|---|---|
| Vertical vs Horizontal scaling | Upgrading your one chef to Gordon Ramsay, vs. hiring 10 regular chefs and building more stations. |
| Load Balancer | The maître d' at a busy restaurant, seating incoming customers at whichever table is free. |
| CDN | A chain of 7-Elevens — you get your Coke from the nearest store, not the main warehouse. |
| Auto Scaling | A call centre hiring temp staff for the holiday rush and letting them go in January. |

### 3. Databases

| Concept | Analogy |
|---|---|
| SQL vs NoSQL | A filing cabinet with labelled folders, vs. a pile of sticky notes — fast to add to, harder to query systematically. |
| Indexing | A textbook's table of contents — jump to page 312 instead of reading every page. |
| Sharding | A phone book split into 4 volumes (A–D, E–M, N–S, T–Z), each on its own shelf. |
| Replication | Photocopying the master document to multiple offices — everyone reads locally, one office processes updates. |
| ACID vs BASE | A bank vault (nothing lost, no shortcuts) vs. a WhatsApp group (messages eventually reach everyone). |

### 4. Caching

| Concept | Analogy |
|---|---|
| Redis/Memcached | The whiteboard in your office — the most-used formulas, so you don't reopen the textbook every time. |
| LRU vs LFU | Clearing your closet by what you haven't worn *longest* vs. what you've worn *least often overall*. |
| Write-through vs write-back | Notebook + computer entry simultaneously, vs. a sticky note now, typed up later (faster, riskier). |
| Cache stampede | A concert ticket drops at noon and 10,000 people hit the site the same second the cache just expired. |

### 5. System Architecture

| Concept | Analogy |
|---|---|
| Monolith vs Microservices | A Swiss Army knife (one tool, everything built in) vs. a full kitchen (specialised, upgradeable appliances). |
| API Gateway | The reception desk at a large hospital — verifies you, routes you, logs the visit, before any ward sees you. |
| Event-Driven Architecture | A radio broadcast — the station doesn't know or care who's tuned in. |
| CQRS | A library's acquisitions department (writes) vs. its catalogue system (reads) — each optimised for its job. |

### 6. Message Queues

| Concept | Analogy |
|---|---|
| Kafka | A newspaper press and archive — multiple subscribers read the same issue independently, on their own schedule. |
| RabbitMQ | A postal sorting office — packages routed to the right conveyor belt, delivered once, then gone. |
| Pub/Sub | A YouTube channel — the creator uploads, all subscribers get notified, independently. |
| Dead Letter Queue | The "Return to Sender" bin — undeliverable mail set aside for investigation, without blocking the rest. |

### 7. Reliability & Availability

| Concept | Analogy |
|---|---|
| CAP Theorem | Three friends on a shared Google Doc lose internet — lock everyone out (CP) or let them all keep editing locally (AP). |
| Rate Limiting | A toll booth with a car counter — 100 cars/minute through, the rest queue or get turned away. |
| Circuit Breaker | The fuse box in your house — trips on overload (fail fast), you reset it later to test recovery. |
| Consistent Hashing | Seating at a circular table — when one guest leaves, only their nearest neighbours need to move. |

---

## 📌 Master Reference: Which Concept Applies Where

| Scenario | Key Concepts |
|---|---|
| High read load | Caching (Redis), Read Replicas, CDN |
| High write load | Sharding, Kafka, NoSQL (Cassandra) |
| Real-time features | WebSocket, Redis Pub/Sub, Kafka |
| Global users | CDN, DNS geo-routing, multi-region DB replication |
| Async processing | SQS/Kafka, Event-driven, Worker pools |
| Failure resilience | Circuit Breaker, DLQ, Retry with backoff |
| Fair API access | Rate Limiting (Token Bucket), API Gateway |
| Data distribution | Consistent Hashing, Sharding |
| Search at scale | Elasticsearch / OpenSearch, Trie (autocomplete) |
| Strong consistency needed | SQL + ACID, CP databases (HBase, Zookeeper) |
| High availability over consistency | Cassandra, DynamoDB (AP in CAP) |
| Separation of read/write | CQRS + Event Sourcing |

---

*Classic Design Problems' full worked solutions (URL shortener, Twitter, WhatsApp, YouTube, Uber, plus 3 abbreviated) now live only in [`08-classic-design-problems.md`](./08-classic-design-problems.md) — this file no longer carries a third, lighter copy of the same 8 problems.*
