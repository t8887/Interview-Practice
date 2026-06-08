# 🛡️ Reliability & Availability

> **Chief Architect Note:** Reliability is not about never failing — it's about failing gracefully, recovering quickly, and learning from every failure.

---

## 7.1 CAP Theorem

### The Theorem

In a distributed system, you can guarantee at most two of three properties:

- **Consistency (C):** Every read returns the most recent write
- **Availability (A):** Every request gets a response (no timeouts)
- **Partition Tolerance (P):** System works even if network partitions occur

### The Network Partition Scenario

```
Datacenters:
  DC-US (New York)      DC-EU (Frankfurt)
         ↓                     ↓
    [Database A]        [Database B]
         ↓                     ↓
    100 servers          100 servers
         
         ↕ (Network link between DCs)
         
Network partition occurs: Link between DC-US and DC-EU fails

Now:
  ├─ DC-US can talk to each other (100 servers)
  ├─ DC-EU can talk to each other (100 servers)
  └─ DC-US ↔ DC-EU communication: BROKEN
```

### CP: Consistency + Partition Tolerance

**When network partition happens, block writes to prevent inconsistency.**

```
User A (connected to DC-US): Writes data to Database A
  └─ DC-US processes write (Database A updated)

User B (connected to DC-EU): Tries to write data to Database B
  └─ DC-EU: Can't reach DC-US, doesn't know if it's crashed
  └─ Decision: Better to reject this write than risk inconsistency
  └─ Response to User B: "Error: Service temporarily unavailable" (503)

Result:
  ├─ Consistency maintained (DB A and DB B never diverge)
  ├─ Partition tolerance achieved (system detected partition)
  └─ Availability sacrificed (User B's request rejected)
```

**Databases:** HBase, PostgreSQL (with careful transaction settings), Zookeeper

**Use Case:** Financial systems, banking, healthcare — **losing money is worse than being temporarily unavailable.**

### AP: Availability + Partition Tolerance

**When network partition happens, keep accepting writes (merge conflicts later).**

```
User A (DC-US): Writes data to Database A
User B (DC-EU): Writes CONFLICTING data to Database B
  (Both don't know about each other due to partition)

T=5 seconds: Network partition heals
  └─ DC-US and DC-EU reconnect
  └─ Both have written conflicting versions of same data

Merge conflict:
  ├─ System detects both versions exist
  ├─ Strategies: Last-write-wins, merge algorithms (CRDTs)
  └─ Eventually both DCs converge to same state
```

**Databases:** Cassandra, DynamoDB, MongoDB (default), Riak

**Use Case:** Social media feeds, shopping carts, analytics — **temporary inconsistency acceptable, availability is critical.**

### CA: Consistency + Availability

**Can't handle network partitions (breaks in distributed systems).**

**Databases:** Single-server SQL databases, anything without replication

**Reality:** Not practical for modern distributed systems because network partitions will happen.

### Chief Architect Decision Matrix

| System | Choice | Reasoning |
|--------|--------|-----------|
| **Banking App** | CP | Can't afford inconsistent balances; temporary outage acceptable |
| **Social Media** | AP | Temporary feed inconsistency OK; must stay available |
| **E-commerce Cart** | AP | Customers can shop offline; merge on sync |
| **Inventory** | Hybrid | Read: AP (serve stale inventory), Write: CP (prevent overselling) |
| **Real-time Gaming** | AP | Players accept stale positions; availability critical |

---

## 7.2 Rate Limiting

### Token Bucket Algorithm

**Bucket fills at fixed rate; each request costs one token. If bucket empty, request is rejected.**

```javascript
// Token Bucket Implementation
class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;        // Max tokens (e.g., 100)
    this.refillRate = refillRate;    // Tokens per second (e.g., 10)
    this.tokens = capacity;          // Start full
    this.lastRefill = Date.now();
  }
  
  async consume(count = 1) {
    // Calculate tokens since last check
    const now = Date.now();
    const timePassed = (now - this.lastRefill) / 1000;  // seconds
    const tokensAdded = timePassed * this.refillRate;
    
    this.tokens = Math.min(
      this.capacity,
      this.tokens + tokensAdded
    );
    this.lastRefill = now;
    
    if (this.tokens >= count) {
      this.tokens -= count;
      return true;  // Request allowed
    }
    return false;  // Request denied (rate limited)
  }
}

// Usage
const bucket = new TokenBucket(100, 10);  // 100 tokens, 10 per second

app.get('/api/data', async (req, res) => {
  const allowed = await bucket.consume(1);
  
  if (!allowed) {
    return res.status(429).json({
      error: 'Too many requests',
      retryAfter: Math.ceil((1 - bucket.tokens) / bucket.refillRate)
    });
  }
  
  // Process request
  res.json({ data: 'response' });
});
```

**Behavior:**
```
T=0s:   Bucket: 100 tokens, request arrives → consume 1 → 99 tokens left
T=0.1s: Bucket: 99 + 1 = 100 tokens, request arrives → consume 1 → 99
...
T=1s:   Bucket: 10 new tokens added (10/sec refill) → 110, cap at 100
```

### Distributed Rate Limiting (Redis)

```javascript
// Rate limit per user across multiple servers
async function isAllowed(userId) {
  const key = `rate-limit:${userId}`;
  const now = Date.now();
  
  // Use Redis INCR (atomic counter)
  const count = await redis.incr(key);
  
  // Set expiry on first request
  if (count === 1) {
    await redis.expire(key, 60);  // 1 minute window
  }
  
  // Allow 100 requests per minute
  if (count <= 100) {
    return true;
  }
  
  // Get TTL (how long until bucket resets)
  const ttl = await redis.ttl(key);
  throw new TooManyRequestsError(ttl);
}
```

### Rate Limiting Strategies

| Strategy | Use Case | Example |
|----------|----------|---------|
| **Global** | Protect entire API | 10,000 req/sec total |
| **Per-user** | Fair usage | 100 req/min per user |
| **Per-IP** | Prevent DoS | 1000 req/min per IP |
| **Per-endpoint** | Protect expensive endpoints | POST /search: 10 req/min, GET /status: 1000 req/min |
| **Adaptive** | Smart limits | ML detects attack, drops limit to 10 req/sec |

---

## 7.3 Circuit Breaker

### The Three States

**CLOSED:** Normal operation, requests pass through

**OPEN:** Service is down, requests fail fast (no waiting)

**HALF-OPEN:** Testing if service recovered

```javascript
class CircuitBreaker {
  constructor(fn, options = {}) {
    this.fn = fn;
    this.failureThreshold = options.failureThreshold || 5;
    this.successThreshold = options.successThreshold || 2;
    this.timeout = options.timeout || 60000;  // ms
    
    this.state = 'CLOSED';
    this.failures = 0;
    this.successes = 0;
    this.nextAttempt = Date.now();
  }
  
  async execute(...args) {
    if (this.state === 'OPEN') {
      // Circuit is open
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      
      // Try half-open
      this.state = 'HALF_OPEN';
      console.log('Circuit HALF_OPEN: attempting recovery');
    }
    
    try {
      const result = await this.fn(...args);
      
      if (this.state === 'HALF_OPEN') {
        this.successes++;
        if (this.successes >= this.successThreshold) {
          this.state = 'CLOSED';
          this.failures = 0;
          this.successes = 0;
          console.log('Circuit CLOSED: service recovered');
        }
      }
      
      return result;
    } catch (error) {
      this.failures++;
      
      if (this.failures >= this.failureThreshold) {
        this.state = 'OPEN';
        this.nextAttempt = Date.now() + this.timeout;
        console.log('Circuit OPEN: service is down');
      }
      
      throw error;
    }
  }
}

// Usage
const breaker = new CircuitBreaker(
  async () => {
    return await fetch('http://external-api.com/data');
  },
  { failureThreshold: 3, timeout: 30000 }
);

app.get('/data', async (req, res) => {
  try {
    const data = await breaker.execute();
    res.json(data);
  } catch (error) {
    // Circuit is open, or service is down
    // Return fallback (cached data, default, etc.)
    res.json({ data: cache.get('last-data') || DEFAULT_DATA });
  }
});
```

### Circuit Breaker + Fallback

```javascript
async function getRecommendations(userId) {
  try {
    return await breaker.execute(() => 
      fetch(`/recommendations/${userId}`)
    );
  } catch (error) {
    // Service down: return fallback
    if (breaker.state === 'OPEN') {
      console.log('Recommendations service down, returning popular items');
      return await db.query('SELECT * FROM products ORDER BY popularity DESC LIMIT 10');
    }
    throw error;
  }
}
```

### Cascading Failures: Circuit Breaker Prevents Them

```
Without Circuit Breaker:
  Service A calls Service B (down)
    ├─ A waits 5 seconds for timeout (blocking 100 threads)
    ├─ Timeout → retry → another 5 seconds
    ├─ Threads pile up (resource exhaustion)
    └─ Service A becomes slow/unresponsive

With Circuit Breaker:
  Service A calls Service B (down)
    ├─ Request 1: fails, failure count = 1
    ├─ Request 2: fails, failure count = 2
    ├─ Request 3: fails, failure count = 3 → OPEN circuit
    ├─ Request 4-100: fail immediately (no waiting)
    └─ Service A stays responsive (returns fallback fast)
```

---

## 7.4 Consistent Hashing

### Problem with Traditional Hashing

```
Traditional: hash(key) % num_servers

Cache: 4 servers
  user_123 → hash(123) % 4 = 0 → Server 0
  user_456 → hash(456) % 4 = 2 → Server 2
  user_789 → hash(789) % 4 = 1 → Server 1

Add 1 new server (now 5 servers):
  user_123 → hash(123) % 5 = 0 → Server 0 ✓ (same)
  user_456 → hash(456) % 5 = 1 → Server 1 ✗ (cache miss!)
  user_789 → hash(789) % 5 = 4 → Server 4 ✗ (cache miss!)

Result: 3 out of 3 keys remapped → massive cache miss storm
```

### Consistent Hashing Solution

**Virtual ring where both keys and servers are mapped. Adding/removing servers affects only nearby keys.**

```
Ring (0 to 360 degrees):
        (0°)
         ↑
   ◀─────┼─────▶
   │            │
   │    Ring    │
   │            │
   └────────────┘

Servers on ring:
  Server A at 45°
  Server B at 135°
  Server C at 225°
  Server D at 315°

Keys on ring:
  key1 at 30° → goes to nearest server clockwise → Server A (45°)
  key2 at 100° → goes to nearest server clockwise → Server B (135°)
  key3 at 200° → goes to nearest server clockwise → Server C (225°)
  key4 at 340° → goes to nearest server clockwise → Server A (45°, wrapped)

Add Server E at 60°:
  key1 at 30° → now goes to Server E (60°) ✓ only key1 remaps
  key2 at 100° → still goes to Server B (135°) ✓ unchanged
  key3 at 200° → still goes to Server C (225°) ✓ unchanged
  key4 at 340° → still goes to Server A (45°) ✓ unchanged

Result: Only 1 out of 4 keys remapped (25%, vs 75% with traditional hashing)
```

### Consistent Hashing Implementation

```javascript
class ConsistentHash {
  constructor(virtualNodes = 150) {
    this.ring = {};  // hash → server
    this.sortedKeys = [];
    this.servers = new Set();
    this.virtualNodes = virtualNodes;  // More nodes = more even distribution
  }
  
  addServer(server) {
    this.servers.add(server);
    
    // Add virtual nodes (replicate server 150 times on ring)
    for (let i = 0; i < this.virtualNodes; i++) {
      const hash = hashFn(`${server}:${i}`);
      this.ring[hash] = server;
      this.sortedKeys.push(hash);
    }
    
    this.sortedKeys.sort((a, b) => a - b);
  }
  
  removeServer(server) {
    this.servers.delete(server);
    
    for (let i = 0; i < this.virtualNodes; i++) {
      const hash = hashFn(`${server}:${i}`);
      delete this.ring[hash];
    }
    
    this.sortedKeys = this.sortedKeys.filter(k => this.ring[k] !== server);
  }
  
  getServer(key) {
    const hash = hashFn(key);
    
    // Find first server clockwise
    for (const nodeHash of this.sortedKeys) {
      if (nodeHash >= hash) {
        return this.ring[nodeHash];
      }
    }
    
    // Wrapped around: first server
    return this.ring[this.sortedKeys[0]];
  }
}

// Usage
const ch = new ConsistentHash();
ch.addServer('server1');
ch.addServer('server2');
ch.addServer('server3');

console.log(ch.getServer('user:123'));  // 'server2'
console.log(ch.getServer('user:456'));  // 'server1'

// Add new server (only ~33% of keys remapped)
ch.addServer('server4');
console.log(ch.getServer('user:789'));  // might be 'server4'
```

### Applications of Consistent Hashing

- **Distributed caching:** Memcached, Redis Cluster
- **Database sharding:** Which shard holds user_123?
- **CDN edge routing:** Route user to nearest CDN node
- **Load balancing:** Consistent routing without sticky sessions

---

## ✅ Quick Revision Checklist — Reliability & Availability

- [ ] Can I explain CAP theorem and pick CP or AP for a given scenario?
- [ ] Do I know three rate-limiting algorithms?
- [ ] Can I describe the three states of a circuit breaker?
- [ ] Do I understand why traditional hashing fails for distributed caching?
- [ ] Can I explain how consistent hashing solves the problem?
- [ ] Do I know how to implement a fallback when circuit breaker opens?
- [ ] Can I explain cascading failures and how circuit breakers prevent them?
- [ ] Do I know how to detect and measure system reliability (uptime, P99 latency)?

