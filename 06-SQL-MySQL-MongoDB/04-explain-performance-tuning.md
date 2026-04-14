# MySQL & MongoDB — EXPLAIN Plans, Query Optimization & Performance Tuning

## MySQL EXPLAIN Deep Dive
```sql
EXPLAIN SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.status = 'active'
GROUP BY u.id
ORDER BY order_count DESC
LIMIT 10;
```

### EXPLAIN Output Columns

| Column | What it means | What to look for |
|---|---|---|
| `id` | Query step number | Higher = executed first |
| `select_type` | SIMPLE / PRIMARY / SUBQUERY | SUBQUERY = potential optimization |
| `table` | Table being scanned | |
| `type` | Access method (best→worst) | const > eq_ref > ref > range > index > ALL |
| `possible_keys` | Indexes that _could_ be used | |
| `key` | Index actually used | NULL = full table scan |
| `key_len` | Bytes of index used | Shorter = fewer columns used |
| `rows` | Estimated rows to examine | High = expensive |
| `filtered` | % of rows remaining after WHERE | Low = lots discarded |
| `Extra` | Additional info | Watch for filesort/temporary |

### Access Types (Best to Worst)
```
const      → Primary key lookup: WHERE id = 1
eq_ref     → JOIN with unique/PK index: JOIN ON users.id = orders.user_id
ref        → Non-unique index lookup: WHERE status = 'active'
range      → Index range scan: WHERE date > '2024-01-01'
index      → Full index scan (all rows but from index)
ALL        → Full table scan (worst — no useful index)
```

### Dangerous `Extra` Values
```
Using filesort      → Sorting without index — add index on ORDER BY columns
Using temporary     → GROUP BY/DISTINCT needs temp table — restructure or index
Using where         → Filtering after fetch (normal, but check 'rows')
Using index         → Good! Covering index — no table lookup
Using index condition → ICP — filtering in storage engine (good)
```

### Real Optimization Examples

```sql
-- BEFORE: Full scan + filesort
EXPLAIN SELECT * FROM orders WHERE user_id = 5 ORDER BY created_at DESC;
-- type: ALL, key: NULL, Extra: Using where; Using filesort

-- FIX: Add composite index
CREATE INDEX idx_user_date ON orders(user_id, created_at);

-- AFTER: Index range scan, no filesort
-- type: ref, key: idx_user_date, Extra: Using index condition

-- BEFORE: JOIN with full scan on orders
EXPLAIN SELECT u.name, o.total
FROM users u JOIN orders o ON u.id = o.user_id
WHERE o.status = 'shipped';
-- type for orders: ALL

-- FIX:
CREATE INDEX idx_orders_status_userid ON orders(status, user_id);

-- AFTER: type for orders: ref
```

## MySQL Query Optimization Tips
```sql
-- 1. Avoid SELECT * — fetch only needed columns
SELECT name, email FROM users WHERE id = 5;

-- 2. Use EXISTS instead of IN for correlated checks
-- Slow:
SELECT * FROM users WHERE id IN (SELECT user_id FROM orders);
-- Faster:
SELECT * FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);

-- 3. Avoid functions on indexed columns
-- ❌ WHERE YEAR(created_at) = 2024           → full scan
-- ✅ WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'  → range scan

-- 4. Use UNION ALL instead of UNION (unless you need dedup)
SELECT name FROM users UNION ALL SELECT name FROM admins;

-- 5. Batch INSERTs
INSERT INTO logs (msg) VALUES ('a'), ('b'), ('c'), ('d');
-- Much faster than 4 separate INSERTs

-- 6. Use connection pooling
-- mysql2 pool in Node.js: pool.getConnection() → reuse connections

-- 7. Limit results early
SELECT * FROM huge_table WHERE status = 'active' ORDER BY id DESC LIMIT 100;
```

## MongoDB explain()
```javascript
db.orders.find({ userId: "u1", status: "pending" }).explain("executionStats");

// Key metrics:
// executionStats.nReturned       — docs returned
// executionStats.totalDocsExamined — docs scanned
// executionStats.totalKeysExamined — index entries scanned
// executionStats.executionTimeMillis — time
// winningPlan.inputStage.stage   — IXSCAN (good) vs COLLSCAN (bad)

// Ideal: nReturned ≈ totalDocsExamined ≈ totalKeysExamined
// Bad:   totalDocsExamined >> nReturned (scanning too many)
```

### MongoDB Profiler
```javascript
// Enable slow query logging
db.setProfilingLevel(1, { slowms: 100 }); // Log queries >100ms

// Check slow queries
db.system.profile.find().sort({ ts: -1 }).limit(5);

// Disable
db.setProfilingLevel(0);
```

## Connection Pooling (Node.js)

### MySQL
```javascript
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'app',
    waitForConnections: true,
    connectionLimit: 10,     // max concurrent connections
    queueLimit: 0,           // unlimited queue
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

// Usage
const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
```

### MongoDB (Mongoose)
```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/app', {
    maxPoolSize: 10,         // default: 100
    minPoolSize: 2,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
});
```

## Redis Caching Layer
```javascript
const Redis = require('ioredis');
const redis = new Redis();

// Cache-aside pattern
async function getUser(userId) {
    const cacheKey = `user:${userId}`;
    
    // Check cache first
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
    
    // Cache miss — query DB
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    const user = rows[0];
    
    // Store in cache with TTL (1 hour)
    if (user) {
        await redis.setex(cacheKey, 3600, JSON.stringify(user));
    }
    
    return user;
}

// Invalidate on write
async function updateUser(userId, data) {
    await pool.query('UPDATE users SET ? WHERE id = ?', [data, userId]);
    await redis.del(`user:${userId}`);
}
```

## Interview Questions

**Q: How do you optimize a slow SQL query?**
> 1. Run EXPLAIN to identify the bottleneck. 2. Check for full table scans (type=ALL) → add index. 3. Look for filesort/temporary → add covering index. 4. Rewrite subqueries as JOINs. 5. Avoid functions on indexed columns. 6. Reduce SELECT * to specific columns. 7. Consider pagination.

**Q: What's a covering index?**
> An index that contains all columns needed by the query — the DB can answer from the index alone without looking up the table row. EXPLAIN shows "Using index" in Extra. Fastest possible query execution.

**Q: How do you handle slow MongoDB queries?**
> 1. Use explain("executionStats") to check COLLSCAN vs IXSCAN. 2. Create appropriate indexes (compound for multi-field queries). 3. Use projection to limit returned fields. 4. Switch from skip() to cursor pagination. 5. Check document size — large embedded arrays slow reads.

**Q: What is connection pooling and why is it important?**
> Reusing a pool of database connections instead of creating/destroying per request. Creating a TCP+handshake+auth connection is expensive (~50-100ms). Pool maintains open connections, lends them to requests, and reclaims after use. Essential for Node.js apps handling hundreds of concurrent requests.
