# 📘 System Design Interview Preparation

> **How to use this file:** Each topic has a plain-English explanation, a real-world analogy to lock it in memory, and a sharp interview tip. At the end of every section, test yourself with the Quick Revision Checklist before moving on.

---

# 🗂️ Core Concepts

---

## 1. Networking Basics

> *Every system design interview starts here — if you can't explain how data travels, you can't design where it goes.*

---

### HTTP / HTTPS

**Explanation:**
HTTP (HyperText Transfer Protocol) is the request-response protocol browsers and APIs use to communicate. Client sends a request, server sends back a response. HTTPS is HTTP with TLS encryption layered on top — the data is unreadable to anyone intercepting the wire.

**Analogy:**
HTTP is like sending a postcard — anyone who handles it can read it. HTTPS is the same postcard in a sealed, tamper-evident envelope that only the recipient can open.

**Interview Tip:**
Know the key HTTP methods (GET, POST, PUT, PATCH, DELETE) and status code families (2xx success, 3xx redirect, 4xx client error, 5xx server error). When designing APIs, mention HTTPS as non-negotiable for any data in transit — interviewers notice when security is proactive, not an afterthought.

---

### DNS (Domain Name System)

**Explanation:**
DNS translates human-readable domain names (google.com) into IP addresses (142.250.80.46) that machines understand. Your browser queries a DNS resolver, which walks a tree of authoritative servers until it finds the IP for the domain, then caches it for a TTL period.

**Analogy:**
DNS is the phone book of the internet. You know someone's name (google.com) but you need their number (IP address) to actually call them.

**Interview Tip:**
In large-scale designs, mention DNS-based load balancing and geo-routing (Route 53 latency-based routing). A low TTL means changes propagate quickly but DNS servers get hammered. A high TTL reduces DNS load but slows down failover — always mention this tradeoff.

---

### TCP vs UDP

**Explanation:**
TCP (Transmission Control Protocol) guarantees delivery — it establishes a connection (3-way handshake), sequences packets, and retransmits lost ones. UDP (User Datagram Protocol) is fire-and-forget — no connection, no guarantee, but much faster with lower overhead.

**Analogy:**
TCP is a registered letter with delivery confirmation — you know it arrived. UDP is a flyer thrown out a car window — fast, but you don't know if anyone picked it up.

**Interview Tip:**
Use TCP when correctness matters (APIs, file transfers, financial transactions). Use UDP when speed matters more than perfection (live video streaming, online gaming, DNS lookups). In system design, video calls (WebRTC) use UDP — a dropped frame is better than a frozen call.

---

### REST vs WebSocket

**Explanation:**
REST is stateless request-response over HTTP — client asks, server responds, connection closes. WebSocket is a persistent full-duplex connection — once established, both client and server can push messages to each other at any time without re-initiating a request.

**Analogy:**
REST is texting — you send a message, wait for a reply, conversation ends. WebSocket is a phone call — both sides can speak freely for the duration of the connection.

**Interview Tip:**
Default to REST for standard CRUD APIs. Reach for WebSocket when you need real-time bidirectional communication: live chat, collaborative editing, live dashboards, stock tickers. Mention that WebSockets require sticky sessions or a shared pub/sub layer (Redis) when you have multiple backend servers — interviewers love this nuance.

---

### ✅ Quick Revision Checklist — Networking

- [ ] Can I explain what happens between typing `https://google.com` and seeing the page (DNS → TCP → TLS → HTTP)?
- [ ] Do I know when to use TCP vs UDP and can I give one example of each?
- [ ] Can I explain why HTTP status 503 is different from 404?
- [ ] Do I know why WebSocket needs a shared pub/sub layer in a multi-server setup?
- [ ] Can I explain what TLS does and why HTTPS alone isn't enough without proper certificate validation?

---

## 2. Scalability

> *How to handle millions of users — the core question behind every large-scale design.*

---

### Horizontal vs Vertical Scaling

**Explanation:**
Vertical scaling (scale up) means adding more power to one machine — bigger CPU, more RAM. Horizontal scaling (scale out) means adding more machines and distributing load across them. Vertical has a physical ceiling and a single point of failure. Horizontal can scale indefinitely but adds complexity (distributed state, coordination).

**Analogy:**
Vertical scaling is upgrading your one chef to Gordon Ramsay. Horizontal scaling is hiring 10 regular chefs and building more kitchen stations.

**Interview Tip:**
Always prefer horizontal scaling in design interviews — it signals you understand distributed systems. Mention that stateless services scale horizontally easily, while stateful services (sessions, DB) need extra work (sticky sessions, distributed caches, read replicas).

---

### Load Balancers

**Explanation:**
A load balancer sits in front of your servers and distributes incoming requests across them using an algorithm (round-robin, least connections, IP hash). It also performs health checks — if a server goes down, the load balancer stops sending it traffic.

**Analogy:**
A load balancer is the maitre d' at a busy restaurant — they look at which tables are free and seat incoming customers accordingly, never sending 10 people to one table while others are empty.

**Interview Tip:**
There are two layers: Layer 4 (TCP/IP level — fast, no content inspection) and Layer 7 (application level — can route based on URL path, headers, cookies). L7 load balancers (like AWS ALB) are standard for web apps. Always mention health checks — they're what turn load balancers into automatic failover mechanisms.

---

### CDN (Content Delivery Network)

**Explanation:**
A CDN is a globally distributed network of edge servers that cache static content (images, CSS, JS, videos) close to end users. Instead of a user in Mumbai fetching an image from a server in Virginia, they get it from a CDN node in Mumbai — dramatically reducing latency.

**Analogy:**
A CDN is like a chain of 7-Elevens. Instead of driving to the main warehouse to buy a Coke, you go to the nearest convenience store that already stocked it.

**Interview Tip:**
CDNs don't just serve static files — modern CDNs (Cloudflare, CloudFront) can run edge functions, terminate TLS, and even do A/B testing at the edge. In design interviews, mention CDN whenever the system has global users, heavy media content, or read-heavy static assets. Always clarify CDN invalidation strategy — how do you purge stale content after a deployment?

---

### Auto Scaling

**Explanation:**
Auto scaling automatically adds or removes compute instances based on real-time demand metrics (CPU usage, request count, queue depth). Scale-out during traffic spikes, scale-in during quiet periods to save cost.

**Analogy:**
Auto scaling is like a call centre that hires temporary staff during the holiday rush and lets them go in January — capacity matches demand without permanently over-provisioning.

**Interview Tip:**
Mention the two types: reactive (scale when CPU > 70%) and predictive (scale up before the Monday 9am traffic spike based on historical patterns). Always pair auto scaling with stateless application design — if your app stores session data in memory, a new instance has none of it. That's why sessions go in Redis, not RAM.

---

### ✅ Quick Revision Checklist — Scalability

- [ ] Can I explain why a stateful service is harder to scale horizontally than a stateless one?
- [ ] Do I know the difference between an L4 and L7 load balancer and when to use each?
- [ ] Can I describe a scenario where a CDN would NOT help (e.g., dynamic personalised content)?
- [ ] Do I know what metric I would trigger auto-scaling on for a queue-based worker service?
- [ ] Can I explain why vertical scaling has a ceiling and horizontal scaling does not?

---

## 3. Databases

> *SQL vs NoSQL + when to use what — getting this wrong in an interview is a red flag.*

---

### SQL vs NoSQL

**Explanation:**
SQL databases (MySQL, PostgreSQL) store data in structured tables with predefined schemas and enforce relationships via foreign keys. NoSQL databases (MongoDB, DynamoDB, Cassandra) store data in flexible formats (documents, key-value, wide-column, graph) without a fixed schema. SQL excels at complex queries and strict consistency. NoSQL excels at flexible schemas, horizontal scaling, and write-heavy workloads.

**Analogy:**
SQL is a filing cabinet with labelled folders and strict alphabetical order — fast to query, hard to restructure. NoSQL is a pile of sticky notes — flexible and fast to add to, but harder to query across all of them systematically.

**Interview Tip:**
Never say "NoSQL is better than SQL" — the answer is always "it depends." Choose SQL for financial data, user accounts, anything with complex relationships or transactions. Choose NoSQL for user activity logs, product catalogs, content with variable fields, or anything needing horizontal write scaling. Interviewers want to hear your reasoning, not your preference.

---

### Indexing

**Explanation:**
An index is a separate data structure (usually a B-Tree) that the database maintains alongside a table to speed up lookups on specific columns. Without an index, a query scans every row (full table scan). With an index, it jumps directly to the matching rows.

**Analogy:**
An index is the table of contents in a textbook. Without it, you read every page to find "recursion." With it, you flip to page 312 immediately.

**Interview Tip:**
Indexes dramatically speed up reads but slow down writes (every INSERT/UPDATE must update the index too). Composite indexes are powerful but order matters — an index on `(city, age)` can satisfy queries filtering by `city` alone, but NOT queries filtering by `age` alone. Always mention `EXPLAIN` / `EXPLAIN ANALYZE` when discussing query optimization — it shows whether the index is actually being used.

---

### Sharding

**Explanation:**
Sharding splits a large database horizontally across multiple machines — each machine (shard) holds a subset of the data. A routing layer determines which shard holds which data based on a shard key (e.g., user_id % 4 = shard number).

**Analogy:**
Sharding is like splitting a phone book into four volumes: A–D, E–M, N–S, T–Z. Each volume lives on a different shelf. You know exactly which shelf to go to based on the first letter.

**Interview Tip:**
Choosing a bad shard key creates "hot spots" — one shard gets all the traffic (e.g., sharding Twitter by region gives the US shard 10× more writes). The ideal shard key distributes data evenly AND is always present in your most common queries. Consistent hashing is the go-to algorithm for shard assignment — it minimises data reshuffling when you add/remove shards.

---

### Replication

**Explanation:**
Replication copies data from a primary database node to one or more replica nodes. Replicas can serve read traffic (read replicas), act as failover targets if the primary goes down, or be used for backups without affecting primary performance.

**Analogy:**
Replication is like photocopying the master document and distributing copies to multiple offices. Everyone can read from their local copy; only the head office processes updates.

**Interview Tip:**
Two replication modes: **synchronous** (primary waits for replica to confirm before responding to client — strong consistency, higher latency) and **asynchronous** (primary responds immediately, replica catches up — lower latency, risk of data loss on failover). For most web apps, async replication with read replicas is the standard answer. Mention replication lag — if a user writes data and immediately reads from a replica, they might not see their own write yet (read-your-writes consistency issue).

---

### ACID vs BASE

**Explanation:**
**ACID** (Atomicity, Consistency, Isolation, Durability) — the guarantees traditional SQL databases provide. Transactions are all-or-nothing, data is always in a valid state, concurrent transactions don't interfere, and committed data survives crashes.

**BASE** (Basically Available, Soft state, Eventually consistent) — the tradeoff NoSQL systems make. The system stays available even during failures, state may be temporarily inconsistent, but it will eventually converge to consistency.

**Analogy:**
ACID is a bank vault — every transaction is recorded precisely, nothing is lost, no shortcuts. BASE is a WhatsApp group — messages eventually reach everyone, but there might be a brief moment where some members haven't received the latest message yet.

**Interview Tip:**
Use ACID when correctness is non-negotiable: financial transactions, bookings, inventory. Use BASE when availability and scale matter more than instant consistency: social media feeds, shopping cart (show approximate stock), analytics counters. In interviews, CAP Theorem (covered in Section 7) is the theoretical backing for why this tradeoff exists.

---

### ✅ Quick Revision Checklist — Databases

- [ ] Can I name two scenarios where I'd choose MongoDB over MySQL, with justification?
- [ ] Do I know why composite index column order matters?
- [ ] Can I explain what a "hot shard" is and how to avoid it?
- [ ] Do I know the difference between synchronous and asynchronous replication and when each is appropriate?
- [ ] Can I explain the ACID vs BASE tradeoff without using technical jargon?

---

## 4. Caching

> *Speed up reads, reduce DB load — caching is the single highest-leverage optimization in most systems.*

---

### Redis / Memcached

**Explanation:**
Redis and Memcached are in-memory key-value stores used as caches. They live entirely in RAM, making reads ~1ms vs ~10ms for DB queries. Redis supports rich data structures (lists, sets, sorted sets, streams, pub/sub) and optional persistence. Memcached is simpler and slightly faster for pure key-value caching.

**Analogy:**
Redis is the whiteboard in your office — you write the most-used formulas on it so you don't open the textbook every time. The textbook (database) is always the source of truth, but the whiteboard is faster.

**Interview Tip:**
Default to Redis in design interviews — it does everything Memcached does plus pub/sub, TTL-based expiry, sorted sets for leaderboards, and Lua scripting for atomic operations. Always discuss what you're caching, for how long (TTL), and what the cache invalidation strategy is. "Cache invalidation is one of the two hard problems in computer science" — mention it, then explain your approach.

---

### Cache Eviction Policies (LRU / LFU)

**Explanation:**
When a cache is full and a new item needs to be stored, the eviction policy determines what gets removed. **LRU** (Least Recently Used) evicts the item that hasn't been accessed for the longest time. **LFU** (Least Frequently Used) evicts the item accessed the fewest times overall.

**Analogy:**
LRU is like clearing out your closet by removing clothes you haven't worn in the longest time. LFU is like removing the clothes you've worn the fewest times total — even if you wore them recently.

**Interview Tip:**
LRU is the default in Redis and works well for most use cases (recently accessed items are likely to be accessed again). LFU is better when access patterns are skewed — e.g., a viral post that suddenly gets millions of hits should stay cached even if it was inserted recently with a low frequency count. In interviews, mentioning which policy you'd pick and why shows depth.

---

### Write-Through vs Write-Back

**Explanation:**
**Write-through:** Every write goes to the cache AND the database simultaneously. Cache is always in sync with DB. Slightly slower writes, but no data loss on cache failure.

**Write-back (write-behind):** Writes go to cache only, first. The cache asynchronously flushes to DB later. Faster writes, but if cache crashes before flushing, data is lost.

**Analogy:**
Write-through is taking notes in your notebook AND entering them into the computer simultaneously — always in sync. Write-back is scribbling on a sticky note first, then typing it up later — faster in the moment, but you could lose the sticky note.

**Interview Tip:**
For most web apps, write-through is the safe choice. Write-back is used where write performance is critical and brief data loss is acceptable (e.g., analytics event counters, gaming leaderboards). There's a third pattern worth mentioning: **cache-aside (lazy loading)** — the app checks the cache first; on a miss, it queries the DB and populates the cache. This is the most common pattern in practice.

---

### Cache Stampede

**Explanation:**
A cache stampede (also called "thundering herd") happens when a popular cache key expires and simultaneously hundreds or thousands of requests miss the cache and all hit the database at once to regenerate it — potentially bringing the DB down.

**Analogy:**
Imagine a concert ticket goes on sale at exactly noon. Everyone hits the website at the same second. If the cache with ticket availability just expired, all 10,000 users query the database simultaneously — the server collapses under the load.

**Interview Tip:**
Three mitigation strategies to know: (1) **Mutex lock** — only one process regenerates the cache key; others wait. (2) **Probabilistic early expiry** — randomly regenerate the cache slightly before it expires, so the stampede never forms. (3) **Stale-while-revalidate** — serve the stale cached value while asynchronously refreshing it in the background. Mentioning cache stampede unprompted is a strong signal of real-world system design experience.

---

### ✅ Quick Revision Checklist — Caching

- [ ] Can I explain the difference between Redis and Memcached and when I'd choose each?
- [ ] Do I know three cache eviction policies and can I give a use case for LRU vs LFU?
- [ ] Can I describe cache-aside, write-through, and write-back patterns and when each applies?
- [ ] Can I explain what a cache stampede is and name two ways to prevent it?
- [ ] Do I know what Redis data structure I'd use for a real-time leaderboard? (Sorted Set — `ZADD`, `ZRANK`)

---

# 🏗️ Architecture & Patterns

---

## 5. System Architecture

> *The most asked design patterns — how you structure the system at the macro level.*

---

### Monolith vs Microservices

**Explanation:**
A monolith is a single deployable unit where all features (auth, payments, notifications, user management) live in one codebase and process. Microservices split those features into independently deployable services, each with its own codebase, database, and deployment pipeline. Monoliths are simpler to build and debug. Microservices scale independently and are easier to change without affecting the whole system.

**Analogy:**
A monolith is a Swiss Army knife — one tool, everything built in, easy to carry. Microservices are a full kitchen — each appliance is specialised and can be upgraded or replaced without rebuilding the whole kitchen.

**Interview Tip:**
The right answer in an interview is "start with a monolith, extract microservices when you have a clear scaling or team boundary problem." Premature microservices are a known anti-pattern (distributed monolith). Mention that microservices introduce network latency, distributed tracing complexity, and the need for service discovery — tradeoffs an interviewer wants you to acknowledge.

---

### API Gateway

**Explanation:**
An API Gateway is a single entry point for all client requests to a microservices backend. It handles cross-cutting concerns: authentication/authorization, rate limiting, SSL termination, request routing, response aggregation, and logging — so individual services don't have to.

**Analogy:**
An API Gateway is the reception desk at a large hospital. You don't walk directly into the cardiology ward — you go to reception, they verify who you are, tell you which floor to go to, and log your visit. Each ward (service) only deals with its actual job.

**Interview Tip:**
Always put an API Gateway in front of microservices. Without it, every service needs its own auth and rate-limiting logic — duplicated and inconsistently maintained. AWS API Gateway + Lambda is a popular serverless combo. Mention that the Gateway itself can become a bottleneck and should be horizontally scalable with no application state.

---

### Event-Driven Architecture

**Explanation:**
In event-driven architecture, services communicate by producing and consuming events (messages) rather than calling each other directly. A service publishes an event ("order placed"), and any number of downstream services (inventory, email, analytics) react to it independently and asynchronously.

**Analogy:**
Event-driven is like a radio broadcast. The radio station (producer) broadcasts a signal. Any radio (consumer) tuned to that frequency picks it up independently. The station doesn't know or care who's listening.

**Interview Tip:**
Event-driven decouples producers from consumers — a critical design principle. The key tradeoff is eventual consistency: the order service doesn't know if the email service successfully sent the confirmation. To handle failures, mention dead letter queues (DLQ) — failed events land there for inspection and retry. This is the architecture behind most large-scale systems (Uber, LinkedIn, Netflix).

---

### CQRS (Command Query Responsibility Segregation)

**Explanation:**
CQRS separates the read model from the write model. Commands (writes) go through one path and update the database. Queries (reads) go through a separate path and read from a differently optimised store — often a denormalised read replica or a search index.

**Analogy:**
CQRS is like a library where you write new books through the acquisitions department (write model), but you find and read books via the catalogue system (read model). The two systems are optimised for their respective jobs.

**Interview Tip:**
CQRS shines when read and write patterns are drastically different — e.g., an e-commerce system writes one order at a time but reads need to aggregate orders by customer, by product, by date. The read store (Elasticsearch, Redis, denormalised MySQL view) is built exactly for the query patterns. Pair with Event Sourcing for full auditability — but call out the added complexity, interviewers appreciate knowing you don't over-engineer.

---

### ✅ Quick Revision Checklist — System Architecture

- [ ] Can I explain three concrete problems that microservices introduce that a monolith doesn't?
- [ ] Can I name four responsibilities an API Gateway handles so individual services don't have to?
- [ ] Do I know the difference between synchronous (REST) and asynchronous (event-driven) inter-service communication?
- [ ] Can I explain when CQRS is worth the added complexity vs when it's overkill?
- [ ] Can I draw a simple event-driven order processing flow with at least 3 consuming services?

---

## 6. Message Queues

> *Async communication between services — the backbone of resilient distributed systems.*

---

### Kafka

**Explanation:**
Apache Kafka is a distributed, high-throughput event streaming platform. Producers write messages to topics; consumers read from topics at their own pace. Messages are persisted to disk for a configurable retention period (not deleted after consumption), so multiple consumer groups can read the same messages independently.

**Analogy:**
Kafka is a newspaper printing press and distribution system. The press (producer) prints papers and stores them in the archive. Multiple subscribers (consumers) pick up and read the same paper independently on their own schedule — the archive keeps copies for 7 days.

**Interview Tip:**
Kafka is the right answer when you need: high throughput (millions of events/sec), message replay (reprocess historical events), multiple independent consumers of the same stream, or event sourcing. It's NOT the right answer for simple task queues with low volume — that's SQS or RabbitMQ. Mention consumer groups — multiple instances of the same service share the load of a topic partition without duplicate processing.

---

### RabbitMQ

**Explanation:**
RabbitMQ is a traditional message broker implementing the AMQP protocol. Producers send messages to exchanges; exchanges route them to queues based on routing rules; consumers pull from queues. Messages are deleted from the queue once consumed (unlike Kafka's retention model).

**Analogy:**
RabbitMQ is a postal sorting office. Packages (messages) come in, are sorted by routing rules onto the right conveyor belt (queue), picked up by the right courier (consumer), and delivered. Once delivered, the package is gone.

**Interview Tip:**
Use RabbitMQ for task queues — where each message should be processed by exactly one worker and then removed (email sending, PDF generation, payment processing). Use Kafka for event streaming — where the log of events itself is valuable and multiple services need to react. In AWS context, SQS is the managed equivalent of RabbitMQ.

---

### Pub/Sub Pattern

**Explanation:**
Publish-Subscribe decouples message producers (publishers) from consumers (subscribers). Publishers emit messages to a topic/channel without knowing who's listening. Subscribers register interest in topics and receive all messages published to them.

**Analogy:**
Pub/Sub is like a YouTube channel. The creator (publisher) uploads a video. All subscribers get notified simultaneously and independently. The creator doesn't know or control who watches.

**Interview Tip:**
The key benefit is loose coupling — you can add new consumers (subscribers) without changing the publisher. Redis Pub/Sub is great for lightweight real-time messaging (chat notifications, live dashboards) within a single datacenter. For durable, cross-service pub/sub at scale, use Kafka topics or AWS SNS + SQS fan-out. Always clarify: does the subscriber need to receive messages that arrived while it was offline? If yes, you need a durable queue (SQS), not Redis pub/sub.

---

### Dead Letter Queue (DLQ)

**Explanation:**
A Dead Letter Queue is a special queue where messages that could not be processed successfully are automatically sent after a configurable number of retry attempts. It prevents failed messages from blocking the main queue and allows engineers to inspect, fix, and reprocess them.

**Analogy:**
A DLQ is the "Return to Sender" bin at a post office. Mail that couldn't be delivered after multiple attempts gets set aside in a separate tray for investigation — it doesn't block the rest of the mail from being processed.

**Interview Tip:**
Always mention DLQs in event-driven designs — forgetting them is a common mistake that leads to silent data loss. In AWS: SQS has native DLQ support; SNS can route undeliverable messages to an SQS DLQ. Key operational practice: set up alerts on DLQ depth — if it starts growing, something in the consumer is broken. Also mention idempotency: when messages are retried from the DLQ, the consumer must handle duplicate processing gracefully.

---

### ✅ Quick Revision Checklist — Message Queues

- [ ] Can I explain the key difference between Kafka and RabbitMQ/SQS in terms of message retention?
- [ ] Do I know when to choose Pub/Sub over a standard task queue?
- [ ] Can I explain what a consumer group is in Kafka and why it enables horizontal scaling?
- [ ] Do I know what a Dead Letter Queue is and how I'd operationally monitor it?
- [ ] Can I explain why consumer idempotency is essential when using DLQs?

---

## 7. Reliability & Availability

> *Build systems that don't go down — and recover gracefully when they inevitably do.*

---

### CAP Theorem

**Explanation:**
CAP Theorem states that a distributed system can only guarantee two of three properties simultaneously: **Consistency** (every read returns the most recent write), **Availability** (every request gets a response, even if it's not the latest data), and **Partition Tolerance** (the system continues to function even if network partitions occur). Since network partitions are inevitable in distributed systems, the real choice is between CP and AP.

**Analogy:**
Three friends share a Google Doc. If the internet goes down (partition), they have two options: lock everyone out until connectivity is restored (CP — consistent, not available) or let everyone keep editing their local copy and merge conflicts later (AP — available, not immediately consistent).

**Interview Tip:**
In distributed systems, P (partition tolerance) is not optional — networks fail. So the real choice is CP vs AP. Zookeeper, HBase → CP (banking, inventory). Cassandra, DynamoDB → AP (social feeds, shopping carts). Cite this when justifying your DB choice — "I chose Cassandra here because for a social feed, availability is more important than strong consistency."

---

### Rate Limiting

**Explanation:**
Rate limiting restricts how many requests a client can make to an API within a time window. It protects the system from abuse, prevents resource exhaustion, and enforces fair usage among clients.

**Analogy:**
Rate limiting is like a toll booth with a car counter. Only 100 cars per minute are allowed through. Anyone beyond that gets queued or turned away — not to be mean, but to prevent gridlock.

**Interview Tip:**
Know three algorithms: **Fixed Window** (simple, but burst at window boundary), **Sliding Window** (smoother, slightly more complex), **Token Bucket** (allows controlled bursts, most used in practice). In a distributed setup, rate limit counters must live in Redis (not local memory) — otherwise each server has its own counter and the limit is effectively multiplied by the number of servers. Return HTTP 429 Too Many Requests with a `Retry-After` header.

---

### Circuit Breaker

**Explanation:**
A circuit breaker wraps calls to an external service. In normal state (closed), requests pass through. If the failure rate exceeds a threshold, the circuit "opens" and requests fail fast (no waiting for timeout) — protecting the caller from being dragged down by a failing dependency. After a cooldown, it enters "half-open" and lets a few test requests through to see if the service recovered.

**Analogy:**
A circuit breaker is exactly what it sounds like — the electrical one in your fuse box. If there's an overload (failing service), it trips and cuts the circuit immediately (fail fast). You manually reset it later (half-open test) to see if the fault is cleared.

**Interview Tip:**
Circuit breakers prevent cascading failures — one slow service bringing down the entire system through timeouts. Hystrix (Netflix) and Resilience4j are the standard Java implementations. In Node.js, use `opossum`. Always pair with a fallback: "If the recommendations service is down, return the top 10 most popular items from cache instead." Interviewers appreciate that you think about graceful degradation, not just failure detection.

---

### Consistent Hashing

**Explanation:**
Consistent hashing is an algorithm for distributing data or requests across a dynamic set of nodes such that when nodes are added or removed, only a minimal fraction of keys need to be remapped. Each node and each key is assigned a position on a virtual ring. A key is assigned to the first node clockwise from its position on the ring.

**Analogy:**
Consistent hashing is like assigning seats at a circular table. Each guest (node) takes a section of the table. When a guest leaves, only the people sitting nearest to them need to move. Everyone else stays put.

**Interview Tip:**
Traditional hashing (`key % n`) fails when `n` changes — almost every key remaps to a different server (catastrophic for caches). Consistent hashing remaps only `K/n` keys on average. This is how Redis Cluster, Cassandra, and CDN edge routing work. Mention "virtual nodes" — each physical node maps to multiple positions on the ring for better load distribution. This is a favourite mid-to-senior level interview question.

---

### ✅ Quick Revision Checklist — Reliability & Availability

- [ ] Can I explain the CAP theorem and give a real DB example for both CP and AP?
- [ ] Do I know three rate limiting algorithms and their tradeoffs?
- [ ] Can I draw the three states of a circuit breaker (closed → open → half-open)?
- [ ] Do I know why `key % n` fails for distributed caching and how consistent hashing solves it?
- [ ] Can I explain what "cascading failure" means and name two patterns that prevent it?

---

# 🏛️ Classic Design Problems

> *Practice these end-to-end. Each problem below shows the key components, main bottlenecks, and which concepts from the sections above to apply.*

---

## 8. Classic Design Problems

---

### Problem 1: Design a URL Shortener (like bit.ly)

**Key Components:**
- **API layer:** `POST /shorten` (returns short code), `GET /{code}` (redirects to original URL)
- **Short code generation:** Base62 encoding of an auto-incremented ID (or MD5 hash truncated to 7 chars)
- **Database:** MySQL to store `(short_code, original_url, created_at, expiry, click_count)`
- **Cache (Redis):** Cache `short_code → original_url` mappings — the read path is hot and the data rarely changes
- **Redirect:** HTTP 301 (permanent, browser caches it — no future requests hit your server) vs 302 (temporary, every click hits your server — better for analytics)

**Main Bottlenecks:**
- Read-heavy (100:1 read-to-write ratio) — solved by Redis cache
- ID generation at scale — use a dedicated ID generation service (Snowflake) or distributed counter to avoid DB single point of failure
- Hot URLs (a viral link gets millions of hits) — multi-layer caching at CDN + Redis

**Concepts Applied:**
Horizontal scaling (Section 2), Redis caching + cache-aside pattern (Section 4), SQL indexing on `short_code` (Section 3), rate limiting on the `POST /shorten` endpoint to prevent abuse (Section 7)

---

### Problem 2: Design Twitter Feed

**Key Components:**
- **Post service:** Accepts tweet writes, publishes "tweet created" event
- **Fan-out service:** On tweet event, writes tweet ID to the follower feeds (pre-computed feed lists in Redis)
- **Feed service:** Reads from the pre-computed Redis feed list for fast timeline retrieval
- **Media service:** Images/videos stored in S3 + served via CDN
- **Search:** OpenSearch / Elasticsearch index for tweet full-text search
- **Notification service:** Subscribed to tweet events for push notifications

**Main Bottlenecks:**
- **Celebrity problem (hot user):** A user with 100M followers — fan-out on write creates 100M Redis writes per tweet. Solution: hybrid fan-out — pre-compute feeds for regular users, but fetch celebrity tweets at read time and merge
- **Read scalability:** Pre-computed feeds (fan-out on write) are far faster to read than computing feed at query time (fan-out on read)
- **Timeline ordering:** Use a Sorted Set in Redis with tweet timestamp as score — `ZREVRANGE` fetches most recent tweets

**Concepts Applied:**
Event-driven architecture + Kafka (Section 5, 6), Redis Sorted Sets (Section 4), CDN for media (Section 2), Pub/Sub for notifications (Section 6), consistent hashing for feed sharding (Section 7)

---

### Problem 3: Design WhatsApp (Chat System)

**Key Components:**
- **Connection service:** Each client maintains a persistent WebSocket connection to a chat server
- **Message service:** Stores messages in Cassandra — append-heavy, partition by `conversation_id`, sort by `timestamp`
- **Presence service:** Redis to track online/offline status with TTL (client heartbeat refreshes TTL)
- **Push notifications:** When recipient is offline, message queued in SQS → Lambda → APNs/FCM
- **Media:** Images/videos uploaded to S3, URL stored in message; CDN serves media

**Main Bottlenecks:**
- **Message delivery guarantee:** At-least-once delivery with client-side deduplication via `message_id`; client sends ACK after displaying message
- **Offline message queuing:** Messages queued in SQS until device comes online and consumes them
- **Scalability of connections:** WebSocket connections are stateful — consistent hashing routes a user to the same chat server; if server dies, reconnect to new server (Redis stores which server each user is on)

**Concepts Applied:**
WebSocket (Section 1), Cassandra AP database (Section 3, 7), Redis for presence (Section 4), SQS + DLQ (Section 6), CAP theorem — AP choice for messaging (Section 7)

---

### Problem 4: Design YouTube

**Key Components:**
- **Upload service:** Client uploads video → stored in S3 raw bucket → triggers encoding job
- **Encoding service:** Transcodes video into multiple resolutions (360p, 720p, 1080p, 4K) using worker fleet; output stored in S3
- **CDN:** Processed video segments served via CDN (CloudFront / Akamai) — users stream from nearest edge node
- **Metadata DB:** MySQL for video metadata (title, description, uploader, tags, view count)
- **Search:** Elasticsearch index for video search
- **Recommendation:** Offline ML job computes recommendations; results stored in Cassandra and served via cache
- **View count:** Redis counter per video; asynchronously flushed to MySQL every few minutes (BASE — eventual consistency acceptable for view counts)

**Main Bottlenecks:**
- **Video encoding:** CPU-intensive; use auto-scaling worker pool triggered by SQS queue depth
- **Streaming at scale:** HLS (HTTP Live Streaming) — video split into small chunks; CDN serves chunks; client dynamically adjusts resolution (adaptive bitrate)
- **Hot videos:** A viral video causes thundering herd on CDN. Mitigate with pre-warming CDN edge nodes for trending content

**Concepts Applied:**
CDN + auto scaling (Section 2), S3 object storage, SQS for encoding job queue (Section 6), Redis for view counters + cache stampede prevention (Section 4), CQRS — read model separate from write model for recommendations (Section 5)

---

### Problem 5: Design a Ride-Sharing App (like Uber)

**Key Components:**
- **Location service:** Drivers send GPS coordinates every 5 seconds → stored in Redis GeoHash (sorted set with geospatial indexing)
- **Matching service:** On ride request, query Redis for nearby available drivers within radius; assign closest available driver
- **Trip service:** Manages trip state machine (requested → accepted → started → completed) in MySQL
- **Pricing service:** Dynamic surge pricing based on supply/demand ratio in a geofenced area
- **Notification service:** WebSocket or push notification to driver and rider with trip updates

**Main Bottlenecks:**
- **Real-time location updates:** Millions of drivers sending location every 5s = massive write throughput → Redis GeoSet handles this; Kafka stream for analytics
- **Matching latency:** Must match driver in < 1 second — in-memory Redis lookup, not DB query
- **Surge pricing accuracy:** Eventual consistency acceptable; computed from aggregated demand signals, not per-request DB query

**Concepts Applied:**
WebSocket (Section 1), Redis GeoHash + consistent hashing (Sections 4, 7), Kafka for event streaming (Section 6), horizontal scaling + load balancer (Section 2), rate limiting on matching API (Section 7)

---

### Problem 6: Design a Distributed Rate Limiter

**Key Components:**
- **Redis atomic counter:** `INCR` + `EXPIRE` for fixed window; Lua script for sliding window atomicity
- **Token bucket in Redis:** Store `(tokens, last_refill_time)` per user key; refill tokens at a fixed rate on each request
- **API Gateway integration:** Rate limiter runs as middleware in API Gateway — checked before request reaches any service
- **Response headers:** `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`, `Retry-After` on 429

**Main Bottlenecks:**
- **Single Redis node:** SPOF — use Redis Cluster for HA; Redlock algorithm for distributed lock across multiple Redis nodes
- **Race conditions:** Two simultaneous requests checking the counter before either increments — solved by Lua scripts (atomic multi-step operations)
- **Local vs distributed counters:** In-memory counters are fastest but don't work with multiple servers — Redis is the standard answer

**Concepts Applied:**
Redis (Section 4), Rate limiting algorithms (Section 7), consistent hashing for Redis Cluster key distribution (Section 7), API Gateway (Section 5)

---

### Problem 7: Design a Notification System

**Key Components:**
- **Notification service:** Accepts notification requests from internal services; validates and enriches payload
- **Message Queue (Kafka/SQS):** Buffers notifications; decouples producers from delivery workers
- **Channel workers:** Separate workers for Email (SendGrid), SMS (Twilio), Push (APNs/FCM), In-App
- **User preference store:** MySQL table for per-user notification preferences (opted-out channels, quiet hours, digest frequency)
- **Template service:** Renders notification content from templates + user data
- **Dead Letter Queue:** Failed notifications (bounce, invalid token) routed here for retry or alerting

**Main Bottlenecks:**
- **Thundering herd on broadcast:** Sending a notification to 10M users simultaneously → fan-out via Kafka partitions, each worker handles a partition; estimated time to deliver all: ~10 min at 100K/sec
- **Rate limiting per channel:** Email providers (SendGrid) have per-second send limits — worker respects rate limits with exponential backoff
- **Deduplication:** Same event triggering duplicate notifications — `idempotency_key` checked in Redis before processing

**Concepts Applied:**
Kafka + DLQ (Section 6), Event-driven architecture (Section 5), Redis deduplication + rate limiting (Sections 4, 7), microservices — one worker per channel type (Section 5)

---

### Problem 8: Design a Search Autocomplete System (like Google Suggest)

**Key Components:**
- **Trie data structure:** In-memory trie storing top-K completions per prefix; built offline from query log analytics
- **Cache layer:** Redis stores pre-computed top suggestions for common prefixes (covers ~80% of traffic)
- **Autocomplete service:** For cache misses, query the in-memory trie; results returned in < 100ms
- **Data pipeline:** Offline batch job (daily) aggregates query logs → computes frequency → rebuilds trie → pushes to all autocomplete service instances

**Main Bottlenecks:**
- **Prefix explosion:** A trie for all possible prefixes is huge — only store top-K (e.g., top 10) suggestions per prefix node; prune low-frequency entries
- **Trie update latency:** Rebuilding the full trie after every new query is expensive — use offline batch updates (daily or hourly), accept slight staleness
- **Global users:** Different languages, different popular queries — shard trie by language; serve from CDN edge for ultra-low latency

**Concepts Applied:**
Redis caching (Section 4), CDN for edge serving (Section 2), horizontal scaling — stateless autocomplete service behind load balancer (Section 2), CAP theorem — AP: slight staleness acceptable for suggestions (Section 7)

---

### ✅ Quick Revision Checklist — Classic Design Problems

- [ ] For URL Shortener: Can I explain the tradeoff between HTTP 301 and 302 redirects?
- [ ] For Twitter Feed: Can I describe the "celebrity problem" and the hybrid fan-out solution?
- [ ] For WhatsApp: Can I explain how offline message delivery works end-to-end?
- [ ] For YouTube: Can I explain HLS adaptive bitrate streaming and why it matters for UX?
- [ ] For Ride-sharing: Can I explain why driver location is stored in Redis, not MySQL?
- [ ] For Rate Limiter: Can I explain why in-memory counters fail in a multi-server setup?
- [ ] For Notifications: Can I explain how to prevent duplicate notifications using idempotency keys?
- [ ] For Autocomplete: Can I explain why the trie is rebuilt offline rather than updated in real time?

---

# 📌 Master Reference: Which Concept Applies Where

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

*Last updated: May 2026*
