# System Design — MNC & Product Company Frequently Asked Questions

> Sources: Glassdoor, AmbitionBox, ByteByteGo, DesignGurus, LeetCode Discuss
> Companies: Google, Amazon, Microsoft, Flipkart, Atlassian, Uber, Swiggy, Razorpay, CRED, Walmart

---

## Framework for Answering (Use in Every Round)

> 1. **Clarify requirements** (functional + non-functional, scale, latency)
> 2. **API design** (endpoints, request/response)
> 3. **High-level design** (boxes + arrows)
> 4. **Data model** (schema, DB choice)
> 5. **Deep dive** (bottlenecks, scaling, caching, trade-offs)
> 6. **Wrap up** (monitoring, alerting, failure handling)

---

## Authentication & Authorization

### Q1: Design an authentication system. JWT vs Sessions?
> | JWT | Sessions |
> |-----|---------|
> | Stateless (token has claims) | Stateful (session in server/Redis) |
> | Scalable (no shared state) | Need sticky sessions or shared store |
> | Can't revoke easily | Easy to revoke (delete session) |
> | Larger payload (sent every request) | Small cookie |
> | Good for: microservices, mobile | Good for: monoliths, web apps |
>
> **Architecture:**
> ```
> Client -> API Gateway -> Auth Service
>                            |
>                         Redis (refresh tokens / blacklist)
>                            |
>                         User DB (PostgreSQL)
> ```
> - Access token: short-lived (15 min), JWT
> - Refresh token: long-lived (7 days), stored in httpOnly cookie + Redis
> - On refresh: rotate refresh token, invalidate old one

### Q2: How does OAuth2 / SSO work?
> **OAuth2 Authorization Code Flow:**
> 1. User clicks "Login with Google"
> 2. Redirect to Google's auth page
> 3. User consents → Google redirects back with **authorization code**
> 4. Server exchanges code for **access token** (server-to-server)
> 5. Server uses token to get user info from Google
> 6. Create/find user in DB → issue own JWT
> **Where asked:** Razorpay, Atlassian, PhonePe

### Q3: How do you implement Role-Based Access Control (RBAC)?
> ```
> Users <-> User_Roles <-> Roles <-> Role_Permissions <-> Permissions
> ```
> - Middleware checks: `hasPermission('orders:write')` not `isAdmin()`
> - Store permissions in JWT claims (or fetch from Redis per request)
> - For fine-grained: Attribute-Based Access Control (ABAC)

---

## Caching

### Q4: What caching strategies do you know?
> | Strategy | How it works | Use case |
> |----------|-------------|----------|
> | **Cache-Aside** | App checks cache → miss → fetch DB → populate cache | General purpose |
> | **Read-Through** | Cache fetches from DB on miss (transparent) | ORM-level caching |
> | **Write-Through** | Write to cache + DB simultaneously | Consistency critical |
> | **Write-Behind** | Write to cache, async write to DB | Write-heavy, eventual consistency OK |
> | **Write-Around** | Write to DB only, cache populated on read | Infrequent reads |

### Q5: How do you handle cache invalidation?
> **"The two hard problems in CS: cache invalidation, naming things, and off-by-one errors."**
> - **TTL-based:** Set expiry time. Simple but stale data window.
> - **Event-based:** Invalidate on write (publish event → cache subscriber deletes key)
> - **Version-based:** Cache key includes version/timestamp
> - **Tag-based:** Group cache entries, invalidate by tag
> **Where asked:** Amazon, Flipkart, Razorpay (hot topic)

### Q6: Redis as cache vs Redis as primary store?
> - As **cache:** TTL on keys, eviction policy (LRU/LFU), cache-aside pattern
> - As **primary store:** Persistence (RDB snapshots + AOF), Redis Cluster for HA
> - Data structures: Strings, Hashes, Lists, Sets, Sorted Sets, Streams
> - Use cases: Rate limiting (INCR + EXPIRE), leaderboards (Sorted Set), session store, pub/sub

---

## API Design

### Q7: REST vs GraphQL — when to use which?
> | REST | GraphQL |
> |------|---------|
> | Resource-based URLs | Schema + query language |
> | Over-fetching / under-fetching | Client asks for exactly what it needs |
> | Cacheable (HTTP) | Harder to cache (POST for queries) |
> | Simple, widely understood | Flexible but complex |
> | Good for: CRUD, simple APIs | Good for: multiple clients, complex data graphs |
>
> **Where asked:** Atlassian, Razorpay, Swiggy

### Q8: How do you design rate limiting?
> **Algorithms:**
> | Algorithm | How | Pros |
> |-----------|-----|------|
> | **Token Bucket** | Tokens added at fixed rate, consumed per request | Allows bursts |
> | **Sliding Window** | Count requests in rolling window | Smooth limiting |
> | **Fixed Window** | Count per time window | Simple |
> | **Leaky Bucket** | Process at fixed rate, queue excess | Constant rate |
>
> **Implementation:** Redis INCR + EXPIRE per user/IP. Return `429 Too Many Requests` with `Retry-After` header.
> Apply at: API Gateway level (e.g., Kong, NGINX) + application level.

### Q9: How do you handle pagination in APIs?
> | Approach | Pros | Cons |
> |----------|------|------|
> | **Offset** `?page=3&limit=20` | Simple | Slow for large offsets, inconsistent with inserts |
> | **Cursor** `?after=abc123&limit=20` | Consistent, performant | Can't jump to page N |
> | **Keyset** `?created_after=2024-01-01&limit=20` | Very fast with index | Need sortable column |
> **Rule:** Use cursor-based for infinite scroll, offset for admin panels with page numbers.

---

## Queues & Async Processing

### Q10: When do you use a message queue? Which one?
> **Use when:** Async processing, decoupling services, load leveling, retry with backoff
> | Queue | Best for |
> |-------|---------|
> | **RabbitMQ** | Complex routing, task queues, RPC |
> | **Kafka** | Event streaming, high throughput, log aggregation |
> | **SQS** | Simple queue on AWS, no infra management |
> | **BullMQ** | Node.js job queue (Redis-backed) |
>
> **Pattern:** Producer → Queue → Consumer(s)
> **Examples:** Email sending, image processing, payment processing, notifications

### Q11: How do you ensure exactly-once processing?
> **A:** True exactly-once is nearly impossible. Use **at-least-once + idempotency**.
> - Store processed message IDs (idempotency key)
> - Use DB transactions: check if already processed before executing
> - Kafka: transactional producers + consumer offsets in same transaction

---

## Scaling & High Availability

### Q12: How do you scale a web application?
> **Vertical:** Bigger machine (quick, limited)
> **Horizontal:** More machines behind load balancer
> ```
> Client → CDN → Load Balancer → App Servers (N instances)
>                                      |
>                              Read Replicas ← Primary DB
>                                      |
>                                    Cache (Redis)
> ```
> **Strategy progression:**
> 1. Optimize code & queries
> 2. Add caching (Redis)
> 3. DB read replicas
> 4. Horizontal scaling + LB
> 5. CDN for static assets
> 6. Microservices (if needed)
> 7. Sharding / partitioning

### Q13: What is a load balancer? Algorithms?
> | Algorithm | How |
> |-----------|-----|
> | **Round Robin** | Rotate evenly |
> | **Weighted Round Robin** | Higher weight = more requests |
> | **Least Connections** | Send to server with fewest active connections |
> | **IP Hash** | Same client → same server (sticky) |
> L4 (TCP level) vs L7 (HTTP level — can route by URL, header).

### Q14: Explain database replication strategies.
> - **Primary-Replica:** Primary handles writes, replicas handle reads. Async replication → eventual consistency.
> - **Primary-Primary:** Both handle writes. Conflict resolution needed. Used rarely.
> - **Synchronous vs Async:** Sync = strong consistency, slower. Async = faster, risk of data loss.
> **Where asked:** Amazon, Flipkart, Walmart

---

## Architecture Scenarios (Common Design Questions)

### Q15: Design a URL shortener (like bit.ly).
> - **Generate ID:** Counter-based, or Base62 encode hash
> - **Store:** `{ shortCode: "abc123", originalUrl: "https://...", createdAt, userId }`
> - **Redirect:** GET /abc123 → 301/302 redirect
> - **DB:** Redis for hot URLs + MySQL/Postgres for persistence
> - **Scale:** Sharding by shortCode prefix, CDN for popular URLs
> - **Analytics:** Kafka → analytics pipeline (clicks, referrer, geo)
> **Capacity:** 100M URLs/month, 10:1 read:write ratio

### Q16: Design a notification system.
> ```
> Event Source → Notification Service → Queue (per channel)
>                                         |
>                   +-----------+---------+---------+
>                   |           |         |         |
>                Push (FCM)  Email    SMS      In-App (WebSocket)
> ```
> - **Priorities:** Urgent (push immediately) vs batch (daily digest)
> - **User preferences:** Per-user channel + frequency settings
> - **Delivery guarantee:** At-least-once + dedup by notification ID
> - **Scale:** Kafka partitioned by user ID, dedicated workers per channel

### Q17: Design a chat application (like WhatsApp/Slack).
> - **Real-time:** WebSocket connections per user
> - **Message flow:** Client → WS Server → Message Queue → Recipient's WS Server
> - **Storage:** Messages in Cassandra/DynamoDB (write-heavy), metadata in PostgreSQL
> - **Features:** Read receipts (last_read_at per conversation), typing indicators (ephemeral via WS), file uploads (S3 + CDN)
> - **Offline:** Messages queued, delivered on reconnect
> - **Group chat:** Fan-out on write (copy to each member's inbox) vs fan-out on read (query group messages)

### Q18: Design a rate limiter at scale.
> - **Distributed:** Redis (INCR + EXPIRE), sliding window log in sorted set
> - **Per-user, per-IP, per-endpoint** limits
> - **Architecture:** API Gateway → Rate Limiter (Redis) → App
> - **Headers:** `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
> - **Where asked:** Razorpay, Flipkart, Atlassian

---

## Microservices & Architecture

### Q19: Monolith vs Microservices — trade-offs?
> | Monolith | Microservices |
> |----------|--------------|
> | Simple to develop, deploy, test | Independent deployment per service |
> | Single DB, easy consistency | DB per service, eventual consistency |
> | Scales as one unit | Scale individual services |
> | Good for: startups, small teams | Good for: large orgs, complex domains |
> **Rule:** Start monolith, extract microservices when you hit scaling/team boundaries.

### Q20: What happens when a microservice goes down?
> **Resilience patterns:**
> 1. **Circuit Breaker** — stop calling failed service, return fallback
> 2. **Retry with exponential backoff** — transient failures
> 3. **Timeout** — don't wait forever
> 4. **Bulkhead** — isolate failures (separate thread pools/connections per service)
> 5. **Fallback** — degraded response (cached data, default values)
> Libraries: `opossum` (Node.js circuit breaker), Hystrix (Java)

---

## Observability

### Q21: What are the three pillars of observability?
> 1. **Logs** — structured (JSON), centralized (ELK Stack / CloudWatch)
> 2. **Metrics** — counters, gauges, histograms (Prometheus + Grafana)
> 3. **Traces** — distributed request tracing (Jaeger, OpenTelemetry)
> **Key metrics to monitor:** Latency (p50, p95, p99), error rate, throughput, saturation.
> **Alerting:** Alert on symptoms (high latency), not causes (CPU usage).

---

## Quick Fire

### Q22: CAP Theorem?
> **C**onsistency, **A**vailability, **P**artition tolerance — pick 2 (in practice, choose CP or AP when network partition happens). CP = return error if inconsistent. AP = return stale data but stay available.

### Q23: What is eventual consistency?
> **A:** All replicas converge to same state over time, but may serve stale data temporarily. Used by: DynamoDB, Cassandra, DNS, CDN caches. Trade-off: faster writes + availability vs immediate consistency.

### Q24: What is CQRS?
> **A:** Command Query Responsibility Segregation — separate read and write models. Write model: normalized, optimized for writes. Read model: denormalized, optimized for queries. Connected via events. Use when read and write patterns are very different.
