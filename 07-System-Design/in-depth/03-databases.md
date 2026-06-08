# 🗄️ Databases

> **Chief Architect Note:** The most critical architectural decision you'll make. Get this wrong and you'll either lose data, can't scale, or burn money on infrastructure.

---

## 3.1 SQL vs NoSQL: The Real Story

### SQL (Relational Databases)

**Structure: Tables with rigid schema**

```
Users Table:
┌─────┬──────────┬─────────────┬──────┐
│ id  │ email    │ created_at  │ role │
├─────┼──────────┼─────────────┼──────┤
│ 1   │ john@... │ 2026-01-15  │ user │
│ 2   │ jane@... │ 2026-01-20  │ admin│
└─────┴──────────┴─────────────┴──────┘

Orders Table:
┌─────┬─────────┬──────────┬──────────────┐
│ id  │ user_id │ amount   │ created_at   │
├─────┼─────────┼──────────┼──────────────┤
│ 101 │ 1       │ 999.99   │ 2026-02-01   │
│ 102 │ 2       │ 1499.50  │ 2026-02-02   │
└─────┴─────────┴──────────┴──────────────┘

Relationship: user_id in Orders MUST exist in Users.id (Referential Integrity)
```

**Key Properties:**

| Property | Description | Example |
|----------|-------------|---------|
| **Atomicity** | Transaction is all-or-nothing | Debit account A, credit B → both succeed or both fail |
| **Consistency** | Data moves from valid state to valid state | No orphaned orders (order → user_id must exist) |
| **Isolation** | Concurrent txns don't interfere | Two users can't decrement same inventory below 0 |
| **Durability** | Committed data survives crashes | Even if server dies, txn is persisted to disk |

### NoSQL (Non-Relational Databases)

**Structure: Flexible, schemaless documents**

```
MongoDB Document:
{
  "_id": ObjectId("5e8f9a3c1d7c2e4f5g6h7i8j"),
  "email": "john@example.com",
  "created_at": ISODate("2026-01-15T10:30:00Z"),
  "role": "user",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "age": 30,
    "address": {
      "street": "123 Main St",
      "city": "New York"
    }
  },
  "preferences": {
    "notifications": true,
    "theme": "dark"
  },
  "tags": ["premium", "verified", "early-adopter"]
}

Every document can have different structure — no schema enforcement
```

**Key Tradeoff: Eventual Consistency**

```
Write: User updates their profile
  ├─ Write goes to primary node (acknowledges immediately)
  └─ Asynchronously replicates to 2 secondary nodes (eventually)

Read from primary: ✅ Sees latest data immediately
Read from secondary (stale): ❌ Might see old data for a few seconds
```

### SQL vs NoSQL Decision Matrix

| Scenario | SQL | NoSQL | Why |
|----------|-----|-------|-----|
| **Financial transactions** | ✅ | ❌ | ACID guarantees, must never lose money |
| **User accounts & auth** | ✅ | ❌ | Complex relationships, strong consistency needed |
| **Product catalog** | ✅ | ❌ | Relationships (product → category → supplier) |
| **Social media feed** | ❌ | ✅ | High write volume, eventual consistency OK |
| **User activity logs** | ❌ | ✅ | Flexible schema, append-heavy |
| **Real-time analytics** | ❌ | ✅ | TimeSeries data, high throughput |
| **Shopping cart** | ❌ | ✅ | Flexible items, eventual consistency OK |
| **Recommendations** | ❌ | ✅ | Sparse data, schemaless JSON perfect |

### Chief Architect Pattern: Polyglot Persistence

**Don't pick one database for everything. Pick the right DB for each problem.**

```
Deloitte Financial Services Client:
  ├─ User accounts, financial txns → PostgreSQL (ACID)
  ├─ Risk documents, unstructured data → MongoDB (flexible schema)
  ├─ Session data, caching → Redis (in-memory)
  ├─ Document search (full-text) → Elasticsearch (search)
  ├─ Time-series risk metrics → Cassandra (high-throughput writes)
  └─ Real-time notifications → Kafka (event stream)

Each DB solves a specific problem. Each is the "best" for its job.
```

---

## 3.2 Indexing

### What an Index Is

An **index** is a separate data structure (usually a B-Tree) that the database maintains to speed up lookups on specific columns.

**Without Index:**
```
Query: SELECT * FROM users WHERE email = 'john@example.com'
Database: Scan all 10 million rows, check each email
Time: ~5 seconds (slow scan of entire table)
```

**With Index:**
```
CREATE INDEX idx_email ON users(email);

Query: SELECT * FROM users WHERE email = 'john@example.com'
Database: Look up 'john@example.com' in B-Tree index
  └─ Finds immediately that it's at row 1,234,567
Time: ~1 millisecond (direct lookup)
```

### B-Tree Index Structure

```
Root Node
├─ 'a' to 'f' → Branch 1
├─ 'g' to 'n' → Branch 2
└─ 'o' to 'z' → Branch 3

Branch 1 (Leaf nodes):
├─ 'alice@...' → row 100
├─ 'bob@...' → row 200
├─ 'charlie@...' → row 300
├─ 'diana@...' → row 400
└─ ...

To find 'bob@example.com':
  1. Start at root, 'b' is in range 'a'-'f', go to Branch 1
  2. In Branch 1, 'bob' is between 'alice' and 'charlie'
  3. Found in ~3 comparisons (log complexity)
  vs scanning 10M rows
```

### Composite Indexes (Order Matters)

```sql
CREATE INDEX idx_city_age ON users(city, age);

This index is optimized for:
  ✅ WHERE city = 'NYC' AND age = 30
  ✅ WHERE city = 'NYC'
  ❌ WHERE age = 30 (doesn't use index)
  ❌ WHERE age = 30 AND city = 'NYC' (uses index, but less efficiently)

The leftmost column (city) must be in the WHERE clause for the index to be useful.
```

### Index Tradeoff: Write Penalty

```javascript
// INSERT query (with 3 indexes)
INSERT INTO users (email, name, city)
VALUES ('john@example.com', 'John Doe', 'NYC');

What the database does:
  1. Write row to table → ~10ms (disk write)
  2. Update email index → ~5ms (B-Tree insert)
  3. Update name index → ~5ms (B-Tree insert)
  4. Update city index → ~5ms (B-Tree insert)
  Total: ~25ms

Without indexes: ~10ms

Result: Indexes slow down writes but speed up reads
```

**Chief Architect Rule:**
- Add an index only for columns you **frequently query**.
- Remove unused indexes (they slow down writes, waste space).
- Monitor with `EXPLAIN ANALYZE` to see which indexes are actually used.

### Covering Indexes

```sql
-- Query
SELECT email, created_at FROM users WHERE status = 'active';

-- Without covering index
CREATE INDEX idx_status ON users(status);
  └─ Index tells us which rows have status='active'
  └─ But we still need to fetch those rows to get email and created_at
  └─ Requires index lookup + row lookup (2 operations)

-- With covering index
CREATE INDEX idx_status_covering ON users(status) INCLUDE (email, created_at);
  └─ Index stores status + email + created_at together
  └─ Database can answer query from index alone (no row lookup needed)
  └─ Called "covering" because index covers all columns in query
```

### Indexing Strategy for Deloitte Client System

**Real-world scenario: Risk.ai searches documents by multiple filters**

```sql
-- Common queries
SELECT * FROM documents WHERE status='active' AND risk_level >= 7 AND upload_date > '2026-01-01';
SELECT * FROM documents WHERE category='Regulatory' AND department='Finance';
SELECT * FROM documents WHERE owner_id=123 AND created_date DESC LIMIT 10;

-- Optimal indexes
CREATE INDEX idx_status_risk_date ON documents(status, risk_level, upload_date);
CREATE INDEX idx_category_department ON documents(category, department);
CREATE INDEX idx_owner_date ON documents(owner_id, created_date DESC);

-- Result
-- Each query uses one optimal index
-- No full table scans
-- Response time: <100ms even for millions of documents
```

---

## 3.3 Sharding

### What Sharding Is

Sharding **horizontally partitions** data across multiple databases. Each shard holds a different subset of rows.

```
Monolithic Database (1 billion users):
  One MySQL server with all users
  Write QPS: 100,000 (server hits limit)
  Can't scale reads beyond replicas
  One database failure = entire service down

Sharded Database (1 billion users, 4 shards):
  ├─ Shard 0: user_id % 4 == 0 (250M users)
  ├─ Shard 1: user_id % 4 == 1 (250M users)
  ├─ Shard 2: user_id % 4 == 2 (250M users)
  └─ Shard 3: user_id % 4 == 3 (250M users)
  
  Write QPS: 100,000 ÷ 4 = 25,000 per shard (comfortableFor each)
  Can scale reads with replicas per shard
  One shard failure = 25% of users affected (not 100%)
```

### Shard Key Selection (Critical!)

```
Good Shard Keys:
  ✅ user_id → Well distributed, always in queries
  ✅ company_id (for multi-tenant) → Keeps one company's data together
  ✅ timestamp / date → Time-series data, old shards can be archived

Bad Shard Keys:
  ❌ Country → Heavily skewed (India has 1.4B people, Luxembourg has 600K)
  ❌ Email domain → Skewed (gmail.com has billions, company_email.com has 100s)
  ❌ Status → Skewed (active=90%, inactive=10%)
```

### Hot Shard Problem

**Scenario:** Shard users by country, one country's server gets 10x more traffic.

```
Sharding by country:
  Shard US: 330M users, 80% of traffic
  Shard India: 1.4B users, 15% of traffic
  Shard Europe: 450M users, 5% of traffic

Shard US is overwhelmed, requests time out
Other shards have idle capacity, can't help
```

**Solution: Re-shard or use Consistent Hashing**

---

## 3.4 Replication

### Master-Slave Replication

```
Master (Primary):
  ├─ Accepts all writes
  ├─ Logs every write to WAL (Write-Ahead Log)
  └─ Replicates WAL to slaves asynchronously

Slave 1 (Read Replica):
  ├─ Applies same writes in order
  ├─ Lag: ~100ms behind master
  └─ Serves read queries (takes load off master)

Slave 2 (Backup):
  ├─ Applies same writes in order
  ├─ Not accessed for reads
  └─ If master fails, promote to master (failover)
```

**Replication Lag Risk:**

```
T=0: User writes data to master
     data: user.email = 'new@example.com'
T=50ms: Slave 1 hasn't replicated yet

T=50ms: Same user reads from Slave 1 (for load balancing)
Result: User sees old email (not their new email)
Problem: "Read your own write" inconsistency
```

**Solution: Read-after-write consistency**

```javascript
// Write to master, then read from master (not replica)
const writeId = await master.insert('users', user);  // T=0
const result = await master.query('SELECT * FROM users WHERE id = ?', [writeId]); // T=5ms

// For other users, can read from replica
const otherUser = await replica.query('SELECT * FROM users WHERE id = ?', [otherId]); // T=5ms
```

### Synchronous vs Asynchronous Replication

| Type | Master Waits? | Consistency | Latency | Data Loss Risk |
|------|---------------|-------------|---------|-----------------|
| **Sync** | Yes (waits for all slaves to ACK) | Strongest | High (200ms+) | None |
| **Async** | No (acknowledges immediately) | Weakest | Low (5ms) | Possible |
| **Semi-sync** | Yes (waits for ≥1 slave to ACK) | Strong | Medium (50ms) | Minimal |

**Choice:**
- **Financial system:** Synchronous (must never lose money)
- **Social media:** Asynchronous (temporary inconsistency OK)
- **Real-time data:** Semi-synchronous (balance performance + safety)

### Replication for Deloitte Risk.ai

```
Primary DB (us-east-1):
  ├─ Accepts all writes (risk documents)
  ├─ Replicates to Replica 1 (us-east-1, read-heavy)
  ├─ Replicates to Replica 2 (eu-west-1, EU users)
  └─ Replicates to Replica 3 (ap-southeast-1, Asia users)

Query Pattern:
  Write: Risk team uploads document → Primary
  Read: Risk analyst queries document → Nearest replica (low latency)
  
Failover:
  If primary fails → Promote Replica 1 to primary
  All writes now go to new primary
  Other replicas replicate from new primary
```

---

## 3.5 ACID vs BASE

### ACID: Strong Consistency

```
Transaction:
  1. Debit Account A: $100
  2. Credit Account B: $100

ACID guarantees:
  ✅ Atomicity: Both steps succeed, or both fail (no partial)
  ✅ Consistency: Balance always = Assets, never negative
  ✅ Isolation: No other txn sees intermediate state
  ✅ Durability: If server crashes after commit, money is safe
```

### BASE: Eventual Consistency

```
Distributed System (multiple datacenters):
  User writes to DC-US: "I liked this post"
  
BASE guarantees:
  ✅ Availability: Write succeeds immediately (don't wait for other DCs)
  ✅ Soft State: Data might temporarily be inconsistent (DC-EU might not have the like yet)
  ⚠️ Eventual Consistency: After a few seconds, all DCs will have the like
  
Tradeoff: Slightly stale data, but system always available & responsive
```

### CAP Theorem Insight

```
CP Databases (Consistency + Partition Tolerance):
  ├─ HBase, Zookeeper, PostgreSQL
  ├─ If network partition, block writes to prevent inconsistency
  └─ Use case: Financial systems, banking

AP Databases (Availability + Partition Tolerance):
  ├─ Cassandra, DynamoDB, MongoDB (default)
  ├─ If network partition, still accept writes (merge conflicts later)
  └─ Use case: Social media, shopping carts, analytics

CA Databases (Consistency + Availability):
  ├─ Traditional single-server SQL
  ├─ Work great until network partition (then fail)
  └─ Not practical for distributed systems
```

**Chief Architect Rule:** For Deloitte engagements, discuss CAP tradeoff explicitly. Financial clients want CP (lose availability for consistency). Media/marketing clients want AP (lose consistency for availability).

---

## ✅ Quick Revision Checklist — Databases

- [ ] Can I name three scenarios where I'd pick NoSQL over SQL with justification?
- [ ] Do I know why composite index column order matters?
- [ ] Can I explain the hot shard problem and how to avoid it?
- [ ] Do I understand the difference between sync and async replication?
- [ ] Can I explain "read your own write" consistency and how to fix it?
- [ ] Do I know the CAP theorem and can I pick CP or AP based on use case?
- [ ] Can I explain why indexes slow down writes?
- [ ] Do I understand polyglot persistence (using multiple databases)?

