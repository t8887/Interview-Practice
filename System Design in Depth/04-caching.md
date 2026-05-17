# ⚡ Caching

> **Chief Architect Note:** Caching is the highest-leverage optimization. A well-designed cache can reduce DB load by 100x.

---

## 4.1 Redis vs Memcached

### Redis

**In-memory key-value store with rich data structures.**

```javascript
// Redis data types
redis.set('user:123:name', 'John');                    // String
redis.lpush('queue:jobs', job1, job2, job3);          // List (queue)
redis.sadd('tags:javascript', 'tag1', 'tag2');        // Set (unique values)
redis.zadd('leaderboard', 100, 'user1', 90, 'user2'); // Sorted Set (ranking)
redis.hset('user:123', 'email', 'john@example.com');  // Hash (object)
redis.xadd('events', '*', 'type', 'login');           // Stream (event log)
```

**Persistence Options:**
- **AOF (Append-Only File):** Every write logged to disk (safer, slower)
- **RDB (Snapshot):** Periodic snapshots to disk (faster, risk of loss between snapshots)
- **Hybrid:** AOF + RDB

**Use Cases:**
- Session storage
- Rate limiting counters
- Caching (cache-aside pattern)
- Leaderboards (Sorted Sets)
- Real-time messaging (Pub/Sub, Streams)
- Feature flags
- Distributed locks (Lua scripting)

### Memcached

**Simple in-memory key-value store.**

```javascript
// Memcached only supports strings
memcached.set('user:123', JSON.stringify(user), 3600);  // Must serialize
memcached.get('user:123');                              // Must deserialize
// That's it — no lists, sets, hashes, etc.
```

**No Persistence (RAM only):**
- Crash → all data gone
- Good for cache (can rebuild from DB)
- Bad for primary storage

**Use Cases:**
- HTTP session cache
- Database result caching
- Object caching (serialized)

### Redis vs Memcached Comparison

| Feature | Redis | Memcached |
|---------|-------|-----------|
| Data Types | Rich (lists, sets, sorted sets, hashes, streams) | Strings only |
| Persistence | Optional (RDB, AOF) | None (RAM only) |
| Replication | Master-slave | None (clustering is manual) |
| Pub/Sub | ✅ Native | ❌ |
| Sorted Sets (leaderboards) | ✅ Native | ❌ (must build in app) |
| Cluster | ✅ Redis Cluster | ❌ (consistent hashing manually) |
| Speed | ~1ms latency | ~0.5ms latency |

**Default choice in 2026:** Redis. It does everything Memcached does, plus much more. Memcached is legacy.

---

## 4.2 Cache Eviction Policies

### When Cache is Full

A cache has finite memory. When full and a new item arrives, which old item gets evicted?

### LRU (Least Recently Used)

**Evict the item not accessed for the longest time.**

```
Cache size: 3 items

History:
  T=0: Access A (cache: [A])
  T=1: Access B (cache: [A, B])
  T=2: Access C (cache: [A, B, C])
  T=3: Access A (cache: [B, C, A])  ← A moved to most recent
  T=4: Add D (cache: [C, A, D])     ← B evicted (least recently used)
  T=5: Add E (cache: [A, D, E])     ← C evicted
```

**Implementation:**
```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();  // O(1) lookup
    this.order = [];       // Track access order
  }
  
  get(key) {
    if (!this.map.has(key)) return null;
    const value = this.map.get(key);
    
    // Move to end (most recent)
    this.order.splice(this.order.indexOf(key), 1);
    this.order.push(key);
    
    return value;
  }
  
  set(key, value) {
    if (this.map.has(key)) {
      this.order.splice(this.order.indexOf(key), 1);
    }
    
    this.map.set(key, value);
    this.order.push(key);
    
    if (this.order.length > this.capacity) {
      const lruKey = this.order.shift();  // Remove oldest
      this.map.delete(lruKey);
    }
  }
}
```

**Redis: LRU is default eviction policy**
```
redis.config_set('maxmemory-policy', 'allkeys-lru');
```

### LFU (Least Frequently Used)

**Evict the item accessed the fewest times.**

```
Cache size: 3 items

Access frequency:
  A: accessed 10 times (hot)
  B: accessed 2 times (cold)
  C: accessed 8 times (warm)
  D: just added

Add D: Evict B (least frequently accessed)

Scenario where LFU > LRU:
  A viral post: accessed 1000 times, but not recently (last access 1 hour ago)
  LRU would evict it (least recent)
  LFU would keep it (most frequent)
```

**Decision:**
- **LRU:** General-purpose, works for most applications
- **LFU:** Skewed access patterns (some items wildly popular)

---

## 4.3 Write Patterns

### Cache-Aside (Lazy Loading)

**Application checks cache first; on miss, fetches from DB and populates cache.**

```javascript
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const cacheKey = `user:${userId}`;
  
  // Step 1: Check cache
  let user = await redis.get(cacheKey);
  if (user) return res.json(JSON.parse(user));  // Cache hit
  
  // Step 2: Cache miss, fetch from DB
  user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
  
  // Step 3: Store in cache for next time
  await redis.setex(cacheKey, 3600, JSON.stringify(user));
  
  res.json(user);
});
```

**Pros:**
- Only cache what's actually used
- Simple to implement
- No cache invalidation needed (TTL handles it)

**Cons:**
- First request gets cache miss (slow)
- Cache stampede if key expires (many requests hit DB simultaneously)

### Write-Through

**Every write goes to cache AND database simultaneously.**

```javascript
app.put('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  
  // Write to database
  await db.query('UPDATE users SET ? WHERE id = ?', [updates, userId]);
  
  // Write to cache simultaneously
  const user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
  await redis.setex(`user:${userId}`, 3600, JSON.stringify(user));
  
  res.json(user);
});
```

**Pros:**
- Cache and DB always in sync
- No data loss on cache crash (still in DB)

**Cons:**
- Slightly slower writes (must wait for both)
- Extra network round-trip

### Write-Back (Write-Behind)

**Writes go to cache first, asynchronously flushed to database later.**

```javascript
app.put('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  
  // Step 1: Update cache immediately
  const newUser = { ...oldUser, ...updates };
  await redis.setex(`user:${userId}`, 3600, JSON.stringify(newUser));
  
  // Step 2: Queue database update for later
  await queue.enqueue({
    type: 'db-update',
    table: 'users',
    id: userId,
    changes: updates
  });
  
  // Step 3: Return to client immediately (fast!)
  res.json(newUser);
});

// Background worker processes queue
async function flushToDB() {
  while (true) {
    const job = await queue.dequeue();
    if (!job) break;
    
    await db.query('UPDATE users SET ? WHERE id = ?', [job.changes, job.id]);
    console.log(`Flushed ${job.id} to DB`);
  }
}
```

**Pros:**
- Fastest writes (return immediately)
- Good for analytics, counters, non-critical data

**Cons:**
- Data loss if cache crashes before flush (unacceptable for financial data)
- Increased complexity (background workers, retry logic)

**Use Case:**
```javascript
// Increment view counter (eventual consistency is fine)
app.get('/post/:id', async (req, res) => {
  const postId = req.params.id;
  
  // Write-back: increment cache immediately, flush to DB later
  await redis.incr(`post:${postId}:views`);  // Returns immediately
  
  // Don't wait for DB write — user sees post right away
  const post = await redis.get(`post:${postId}`);
  res.json(post);
});

// Background worker: flush view counts to DB every minute
setInterval(async () => {
  const keys = await redis.keys('post:*:views');
  for (const key of keys) {
    const count = await redis.get(key);
    const postId = key.split(':')[1];
    await db.query('UPDATE posts SET views = ? WHERE id = ?', [count, postId]);
  }
}, 60000);  // Every 60 seconds
```

---

## 4.4 Cache Stampede

### What It Is

When a popular cache key expires and **hundreds or thousands of requests simultaneously miss the cache and hit the database**, potentially overwhelming it.

```
Scenario:
  Key: "user_count" (total active users)
  TTL: 60 seconds
  Current: 1 million requests/second
  
T=59s: Cache still valid
  ├─ Cache: "user_count" → 45,231,000
  └─ All 1M req/sec return immediately (cache hit)

T=60s: Cache expires
  ├─ 1 million requests ALL miss cache simultaneously
  ├─ All 1M requests query database: SELECT COUNT(*) FROM users
  └─ Database gets 1M concurrent queries → CRASH
```

### Solution 1: Mutex Lock

**Only one request regenerates cache; others wait.**

```javascript
async function getUserCount() {
  const cacheKey = 'user_count';
  const lockKey = `${cacheKey}:lock`;
  
  // Step 1: Try to get from cache
  let count = await redis.get(cacheKey);
  if (count) return count;
  
  // Step 2: Try to acquire lock
  const lockAcquired = await redis.set(lockKey, '1', 'EX', 10, 'NX');
  
  if (lockAcquired) {
    // I got the lock! Regenerate cache
    count = await db.query('SELECT COUNT(*) FROM users');
    await redis.setex(cacheKey, 60, count);
    await redis.del(lockKey);  // Release lock
    return count;
  } else {
    // Another request is regenerating, I'll wait and retry
    await sleep(100);
    return getUserCount();  // Retry after 100ms
  }
}
```

### Solution 2: Probabilistic Early Expiry

**Randomly refresh cache *before* it expires, so stampede never forms.**

```javascript
async function getUserCount() {
  const cacheKey = 'user_count';
  const data = await redis.get(cacheKey);
  const ttl = await redis.ttl(cacheKey);
  
  if (data && ttl > 0) {
    // Cache still valid
    return JSON.parse(data);
  }
  
  // Refresh with small probability (10% when TTL < 10% of max)
  if (ttl > 0 && ttl < 6 && Math.random() < 0.1) {
    // 10% chance to refresh early (reduces stampede to 10% of traffic)
    const count = await db.query('SELECT COUNT(*) FROM users');
    await redis.setex(cacheKey, 60, count);
    return count;
  }
  
  // Cache expired or need full refresh
  const count = await db.query('SELECT COUNT(*) FROM users');
  await redis.setex(cacheKey, 60, count);
  return count;
}
```

### Solution 3: Stale-While-Revalidate

**Serve stale data immediately, refresh in background.**

```javascript
async function getUserCount() {
  const cacheKey = 'user_count';
  const data = await redis.get(cacheKey);
  
  if (data) {
    // Serve stale data immediately
    setImmediate(async () => {
      // Refresh in background (don't wait)
      const count = await db.query('SELECT COUNT(*) FROM users');
      await redis.setex(cacheKey, 60, count);
    });
    
    return JSON.parse(data);  // Return immediately
  }
  
  // No cached data, fetch synchronously
  const count = await db.query('SELECT COUNT(*) FROM users');
  await redis.setex(cacheKey, 60, count);
  return count;
}
```

**Result:** User gets response in 1ms (cached), and backend refreshes cache in background. No stampede.

---

## 4.5 Deloitte Client Example: Risk Document Caching

**Scenario:** Risk team accesses the same 100 documents repeatedly (documents rarely change).

```javascript
// Cache-aside with write-through
app.get('/documents/:docId', async (req, res) => {
  const docId = req.params.docId;
  const cacheKey = `doc:${docId}`;
  
  // Check cache
  let doc = await redis.get(cacheKey);
  if (doc) {
    res.header('X-Cache', 'HIT');
    return res.json(JSON.parse(doc));
  }
  
  // Cache miss: fetch from DB
  doc = await db.query('SELECT * FROM documents WHERE id = ?', [docId]);
  
  // Store in cache with 1-hour TTL
  await redis.setex(cacheKey, 3600, JSON.stringify(doc));
  res.header('X-Cache', 'MISS');
  res.json(doc);
});

// On document update: invalidate cache and write-through
app.put('/documents/:docId', async (req, res) => {
  const docId = req.params.docId;
  const updates = req.body;
  
  // Update database
  await db.query('UPDATE documents SET ? WHERE id = ?', [updates, docId]);
  
  // Invalidate cache
  await redis.del(`doc:${docId}`);
  
  // Optionally: write-through to cache
  const doc = await db.query('SELECT * FROM documents WHERE id = ?', [docId]);
  await redis.setex(`doc:${docId}`, 3600, JSON.stringify(doc));
  
  res.json(doc);
});

// Metrics: Cache hit ratio
setInterval(async () => {
  const hits = await db.query('SELECT COUNT(*) FROM cache_metrics WHERE type="HIT"');
  const misses = await db.query('SELECT COUNT(*) FROM cache_metrics WHERE type="MISS"');
  const hitRatio = hits / (hits + misses);
  console.log(`Cache hit ratio: ${(hitRatio * 100).toFixed(2)}%`);
  // Target: > 90% hit ratio
}, 60000);
```

---

## ✅ Quick Revision Checklist — Caching

- [ ] Can I explain the difference between Redis and Memcached?
- [ ] Do I know three cache eviction policies and when to use each?
- [ ] Can I explain cache-aside, write-through, and write-back patterns?
- [ ] Do I understand cache stampede and can I name three solutions?
- [ ] Can I explain LRU vs LFU with a concrete use case?
- [ ] Do I know how to implement a distributed lock in Redis?
- [ ] Can I explain "stale-while-revalidate" and why it reduces stampede?
- [ ] Do I know how to track cache hit ratio and optimize it?

