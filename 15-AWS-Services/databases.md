# Databases

---

### RDS / Aurora
- **What it is:** RDS = managed relational DB service (Postgres, MySQL, MariaDB, Oracle, SQL Server). Aurora = AWS-built MySQL/Postgres-compatible engine with higher throughput and unique storage architecture.
- **Interviewers probe:**
  - Multi-AZ vs Read Replicas: Multi-AZ is HA failover (synchronous standby); Read Replicas are for read scaling (async replication)
  - Aurora storage: automatically grows in 10 GB increments, 6-way replication across 3 AZs
  - Aurora Serverless v2: scales capacity in fine-grained ACUs (Aurora Capacity Units), good for variable/unpredictable load
  - RDS Proxy: connection pooler that reduces Lambda→RDS connection exhaustion
- **When to use vs alternatives:** RDS/Aurora for relational schemas, complex queries, transactions (ACID). Use DynamoDB for key-value/document access patterns at any scale with no complex queries. Aurora over RDS when you need higher throughput, global databases, or serverless scaling. Use ElastiCache in front of RDS to cache hot reads.
- **Rapid Q&A:**
  - *What is the failover time for Multi-AZ RDS?* Typically 60–120 seconds for automatic failover via DNS flip.
  - *Can Read Replicas be promoted?* Yes — they can be promoted to standalone DB instances (Aurora replicas can be promoted instantly).
  - *What is Aurora Global Database?* Single Aurora cluster spanning multiple regions with <1s replication; supports cross-region failover.
  - *Why use RDS Proxy with Lambda?* Lambda functions open/close DB connections per invocation; Proxy pools connections to prevent exhausting DB connection limits.
- **Gotchas/limits:**
  - Read Replicas are async — slight replication lag; don't use for reads requiring immediate consistency after writes.
  - Aurora Serverless v2 has a minimum ACU — not truly zero-cost when idle.
  - RDS automated backups are limited to the DB instance's region.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

---

### DynamoDB
- **What it is:** Serverless, fully managed NoSQL key-value and document database; single-digit millisecond latency at any scale.
- **Interviewers probe:**
  - Partition key (hash) + sort key (range) — design determines scalability
  - GSI (Global Secondary Index) and LSI (Local Secondary Index) for alternate access patterns
  - Read/write capacity: Provisioned (reserved RCU/WCU) vs On-Demand (pay per request)
  - DynamoDB Streams — ordered change log of item modifications; feeds Lambda triggers
- **When to use vs alternatives:** DynamoDB for known, simple access patterns at massive scale with no ad-hoc queries. Avoid for complex joins, aggregations, or unpredictable query patterns (use Aurora or Postgres instead). ElastiCache in front of DynamoDB for sub-millisecond hot key reads.
- **Rapid Q&A:**
  - *What is a hot partition?* When too many requests land on one partition key, causing throttling — distribute load with better key design or add a random suffix.
  - *What is conditional write?* A write that only proceeds if a condition expression on the item is true — enables optimistic locking.
  - *What is the difference between a GSI and LSI?* GSI has its own partition key (can query any attribute); LSI shares the table's partition key but has a different sort key. LSIs must be defined at table creation.
  - *What is single-table design?* Storing multiple entity types in one table, using overloaded keys and GSIs to support all access patterns efficiently.
- **Gotchas/limits:**
  - Max item size is 400 KB.
  - GSIs have their own read/write capacity — writes to a table also consume GSI write capacity.
  - Strongly consistent reads consume 2× RCUs vs eventually consistent reads.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

---

### ElastiCache / Redis
- **What it is:** Managed in-memory data store. ElastiCache supports Redis and Memcached engines; Redis is the default choice for most use cases.
- **Interviewers probe:**
  - Caching patterns: cache-aside (application manages), write-through (write to cache + DB together), read-through
  - Redis data structures: strings, hashes, lists, sets, sorted sets, streams — enables leaderboards, rate limiting, pub/sub
  - Redis Cluster mode: shards data across nodes for horizontal scaling; Cluster mode disabled = single shard with replicas
  - TTL and eviction policies: LRU, LFU, allkeys-lru, volatile-lru
- **When to use vs alternatives:** ElastiCache/Redis for sub-millisecond reads of hot data, session storage, rate limiting, leaderboards, pub/sub. Memcached is simpler (pure cache, no persistence, no data structures) — use Redis unless you specifically need Memcached's multi-threaded simplicity. DynamoDB Accelerator (DAX) is a DynamoDB-specific cache if your backend is DynamoDB.
- **Rapid Q&A:**
  - *What is the difference between Cluster mode enabled and disabled?* Enabled shards data across multiple nodes (scales writes); disabled has one primary + replicas (scales reads only).
  - *How does Redis handle persistence?* RDB snapshots (point-in-time) and/or AOF (append-only log); ElastiCache supports both.
  - *What eviction policy should you use for a session cache?* `volatile-lru` — evict least-recently-used keys that have a TTL set.
- **Gotchas/limits:**
  - ElastiCache nodes are VPC-only — no public endpoint.
  - Redis Cluster mode does not support multi-key operations across shards (e.g., multi-key transactions).
  - Failover to a replica takes 10–30 seconds — not suitable as primary storage for write-critical paths.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_
