# TCS L2 Technical Round + Managerial Round + HR Round

## Comprehensive Interview Preparation for Node.js + AWS Backend Developer

**Prepared for:** Onkar Sawant  
**Target Role:** Node.js + AWS Backend Developer (L2)  
**Company:** Tata Consultancy Services (TCS)  
**Your Profile:** 5+ years Node.js, 1+ year React, AWS/OpenSearch expertise, large-scale systems  
**Document Purpose:** Advanced L2 interview mastery across technical, managerial, and HR rounds  
**Last Updated:** May 2026

---

## TABLE OF CONTENTS

1. [Understanding TCS L2 Round](#1-understanding-tcs-l2-round)
2. [Deep Project-Based Cross Questioning](#2-deep-project-based-cross-questioning)
3. [Advanced AWS Backend Questions](#3-advanced-aws-backend-questions)
4. [Node.js Advanced Backend Round](#4-nodejs-advanced-backend-round)
5. [System Design & Architecture](#5-system-design--architecture)
6. [Production Incident & Debugging](#6-production-incident--debugging-round)
7. [Managerial Round Preparation](#7-managerial-round-preparation)
8. [HR Round Master Preparation](#8-hr-round-master-preparation)
9. [Salary Negotiation Strategy](#9-salary-negotiation-strategy)
10. [Mock Interview Simulation](#10-mock-interview-simulation)
11. [15-Day Intensive Preparation Plan](#11-15-day-intensive-preparation-plan)
12. [Final Rapid Revision Cheat Sheet](#12-final-rapid-revision-cheat-sheet)

---

## 1. UNDERSTANDING TCS L2 ROUND

### What is L2 at TCS?

**L2 = Senior Engineer / Tech Lead (4-7 years experience)**

- You're expected to own a system end-to-end
- Make architectural decisions, not just implement
- Mentor juniors and drive quality
- Think about scalability, cost, and operations
- Communicate with clients and managers fluently

### L1 vs L2: Key Differences

| Aspect              | L1 (Mid-level)              | L2 (Senior)                   |
| ------------------- | --------------------------- | ----------------------------- |
| **Problem Scope**   | Given task, implement it    | Design solution, own quality  |
| **Complexity**      | Single service optimization | Multi-service architecture    |
| **Mentoring**       | Receives mentoring          | Mentors juniors               |
| **Communication**   | Technical, code-focused     | Business + technical          |
| **Decision Making** | Takes direction             | Makes architectural decisions |
| **Ownership**       | Feature ownership           | System ownership              |
| **Proactivity**     | Reactive (task-based)       | Proactive (identifies issues) |

### What Senior Interviewers Evaluate (L2 Signals)

| Signal                     | What It Means                                  | Your Position                   |
| -------------------------- | ---------------------------------------------- | ------------------------------- |
| **Architectural thinking** | Can design systems at scale                    | ✅ UTEC, multiple services      |
| **Trade-off analysis**     | Understands cost vs performance vs consistency | ✅ OpenSearch optimization      |
| **Production mindset**     | Thinks about monitoring, reliability, costs    | ✅ VAPT, 99.9% uptime           |
| **Communication clarity**  | Explains complex ideas simply                  | ⚠️ Practice with clear examples |
| **Leadership**             | Mentored others, raised bar for team           | ✅ Mentored juniors at UTEC     |
| **Problem-solving**        | Debugs production issues independently         | ✅ OpenSearch slow queries case |
| **Learning velocity**      | Picks up new tech quickly                      | ✅ Learned OpenSearch for UTEC  |
| **Ownership**              | Takes responsibility, not blame-shifting       | Important to demonstrate        |

### Common Rejection Reasons for L2 Candidates

❌ **Cannot explain architectural decisions**

- Instead of: "I used Lambda because it's good"
- Say: "I chose Lambda because our traffic is unpredictable (cost efficiency), and we don't want to manage infrastructure. The 15-minute timeout is acceptable for our use case."

❌ **Cannot handle follow-up questions**

- Interviewer: "What if DynamoDB throttles?"
- Bad: "Uh, we'd have to..." (stuttering, unsure)
- Good: "We implemented exponential backoff with DLQ. If throttling persists, we'd scale DynamoDB capacity or implement caching."

❌ **Overspeaks / Shows overconfidence**

- Saying "I know everything about AWS" then failing on follow-up
- Senior engineers know what they don't know

❌ **No awareness of trade-offs**

- Pushing a solution without considering downsides
- Good L2s say: "It depends on..."

❌ **Cannot discuss failure handling**

- L1s say "It works fine"; L2s say "Here's our retry logic, DLQ, and alerts"

### Interview Psychology at L2

**What the interviewer is thinking:**

1. **Can I work with this person?** (Collaboration signal)
2. **Will they solve problems independently or need constant direction?** (Ownership signal)
3. **Can they mentor others?** (Leadership signal)
4. **Will they communicate well with clients?** (Client-facing signal)
5. **Are they overconfident or appropriately humble?** (Maturity signal)

**Red Flags Interviewers Listen For:**

🚩 "I don't know" (without following up with how you'd figure it out) 🚩 "That's not my problem" or "I'm not responsible for that" 🚩 Long-winded explanations (shows poor communication) 🚩
Blame-shifting ("The team didn't follow my design") 🚩 "I learned it from a tutorial" (no production depth) 🚩 Changing answers after follow-up questions 🚩 Defending past decisions aggressively

**Green Flags Interviewers Listen For:**

✅ "I haven't used that, but here's how I'd approach it" ✅ "That's a great question; here are two approaches with trade-offs" ✅ "I made a mistake there; here's what I learned" ✅ Clear examples from
real projects ✅ "This depends on [constraint], so I'd choose [option]" ✅ Asking clarifying questions before answering ✅ "We monitored X metric to validate this decision"

### How to Communicate Like a Senior Backend Engineer

**Pattern: Situation → Problem → Solution → Result → Learning**

❌ **Junior style:** "We used Lambda" ✅ **Senior style:** "We had unpredictable traffic spikes (situation). Cold starts were causing API latency (problem). We chose Lambda with Provisioned
Concurrency and optimized bundle size (solution). Latency improved from 2.5s to 800ms p95 (result). Learned: right tool matters, but implementation details are critical (learning)."

**Key phrases that signal seniority:**

- "We measured X to validate the decision"
- "The trade-off here is [perf] vs [cost], we chose [option] because..."
- "If this assumption changes, we'd need to reconsider"
- "We had [issue], here's the root cause, and how we prevented recurrence"
- "This depends on [business constraint] and [technical constraint]"

### Client-Facing Expectations at L2

TCS is a client-facing company. Interviewers will evaluate:

1. **Communication clarity** — Can you explain technical concepts to non-technical clients?
2. **Business acumen** — Do you understand how your technical decisions affect business?
3. **Problem-solving pragmatism** — Do you balance technical perfection with business deadlines?
4. **Professionalism** — Would a client trust you?

**Example:**

- ❌ "The API is slow because our Node.js event loop is saturated"
- ✅ "The API response time is higher than expected. We're investigating query optimization and considering adding a caching layer. I'll have a concrete proposal by EOD."

---

## 2. DEEP PROJECT-BASED CROSS QUESTIONING

### Project 1: UTEC (Large-Scale Construction Management System)

**Your role:** Senior Node.js Developer, Backend Architect  
**Team size:** 110+ members  
**Scope:** Construction project management, real-time collaboration, document search  
**Key metrics:** 99.9% uptime, 30% search latency reduction

#### Question Set 1: Architecture & Scalability

**Q1: "Describe UTEC's backend architecture. Why did you choose Lambda over EC2?"**

**Strong L2 Answer:** "UTEC had unpredictable traffic patterns. During business hours, we'd see 10K requests/min; off-peak, maybe 100/min. Here's the trade-off analysis:

| Factor             | EC2                                     | Lambda                 |
| ------------------ | --------------------------------------- | ---------------------- |
| Cost per idle hour | $0.50                                   | $0                     |
| Scaling speed      | 5-10 min (cold start new instances)     | Automatic (ms)         |
| Operational burden | Patching, monitoring, capacity planning | Managed by AWS         |
| Cold start latency | N/A                                     | 1-2 sec (we optimized) |

**Decision factors:**

1. Unpredictable traffic → Lambda's auto-scaling is perfect
2. No idle servers to pay for → Cost efficiency for startup budget
3. Operational simplicity → Team was 3 backend engineers, can't manage EC2 fleet

**Trade-off we accepted:** Cold start latency. We mitigated with:

- Provisioned Concurrency on critical APIs (search, auth)
- Bundle size optimization (3.2MB → 1.8MB)
- Lazy loading modules (reduced init time by 40%)

**Result:** 60% lower infrastructure costs vs EC2, auto-scales to peaks instantly."

**Weak L2 Answer:** "Lambda is good for serverless stuff, so we used it."

**Follow-up Questions Interviewer Will Ask:**

- "What if your traffic became predictable at 50K RPS constant? Would you still use Lambda?"
- "How did you handle Lambda's 15-minute timeout?"
- "What was your cold start impact on user experience?"

**How Senior Engineers Answer:** Senior engineers add numbers, mention decisions they'd revisit, discuss what they learned.

---

**Q2: "You achieved 99.9% uptime. How did you design for reliability?"**

**L2 Answer:** "99.9% uptime = 8.76 hours downtime/year. Here's our strategy:

**Availability Design:**

1. **Multi-AZ Architecture**
    - Lambda functions in us-east-1a, 1b, 1c
    - DynamoDB with auto-failover
    - API Gateway (built-in high availability)

2. **Failure Scenarios & Handling:**

    ```
    Scenario 1: Single Lambda cold start too slow
    → Solution: Provisioned Concurrency (always warm)

    Scenario 2: DynamoDB consumed capacity exceeded
    → Solution: On-demand billing + alerts at 80% capacity

    Scenario 3: Search index (OpenSearch) corruption
    → Solution: Nightly backup, DynamoDB Streams replay

    Scenario 4: API Gateway rate limit hit
    → Solution: Raise limit, implement client-side backoff
    ```

3. **Monitoring & Alerting:**
    - CloudWatch dashboard (Lambda errors, duration, throttles)
    - Alerts: Lambda errors > 1%, latency p99 > 500ms, DynamoDB throttles
    - On-call rotation (if alert fires, wake up engineer)

4. **Incident Response:**
    - Post-incident review: what failed, why, prevention
    - Chaos engineering: regularly kill one AZ, test failover

**Results:**

- Actual uptime: 99.95% (exceeded goal)
- Mean time to recovery (MTTR): 5 minutes
- Root cause: No single point of failure, all critical paths replicated"

**Mistakes to Avoid:**

- ❌ "We never had outages" (unrealistic)
- ❌ "We just trusted AWS" (no proactive monitoring)
- ❌ Can't explain how you'd debug an outage

---

**Q3: "Tell me about OpenSearch optimization. The 30% latency reduction — explain the full journey."**

**L2 Answer (STAR + Technical Depth):**

**Situation:** "Users reported search taking 3-5 seconds. This was blocking UX (users waiting for results). Search was hitting our product catalogue (millions of documents)."

**Task:** "Reduce search latency to under 200ms for better UX."

**Action:**

_Step 1: Root Cause Analysis_

```
Before optimization:
- Query: Full text search on raw document text
- DynamoDB scan: Check every item
- Time: 800ms in DynamoDB + network latency = 3-5 sec total
```

_Step 2: Decision - Implement Elasticsearch/OpenSearch_ "Why Elasticsearch?

- Inverted indices: find documents in O(log n) instead of O(n)
- Full-text search: built-in tokenization, stemming
- Distributed: scales horizontally

Why not just optimize DynamoDB?

- DynamoDB isn't designed for full-text search
- Scan operation is inherently slow"

_Step 3: Implementation_

```javascript
// Mapping strategy: tell OpenSearch how to index fields
const mapping = {
    properties: {
        projectName: { type: "text", analyzer: "standard" },
        projectCode: { type: "keyword" }, // Exact matches only
        category: { type: "keyword" }, // Filtering
        tags: { type: "keyword" },
        description: { type: "text", analyzer: "english" },
    },
};

// Query: Use bool + multi_match for relevance
const query = {
    bool: {
        must: [
            {
                multi_match: {
                    query: "construction materials",
                    fields: ["projectName^2", "description", "tags"],
                },
            },
        ],
        filter: [{ term: { status: "active" } }, { range: { createdAt: { gte: "now-30d" } } }],
    },
};
```

_Step 4: Indexing Pipeline_

```
DynamoDB Table (source of truth)
    ↓ (DynamoDB Streams)
Lambda (UpdateSearchIndex)
    ↓ (batches updates)
OpenSearch (search index, updated in real-time)
```

_Step 5: Caching Layer_

```
Redis (ElastiCache)
├─ Cache: Top 100 searches (65% hit rate)
├─ TTL: 5 minutes
└─ Bypass: Personalized searches not cached
```

**Result:**

- Search latency: 3500ms → 250ms (85% improvement, headline says 30% but full stack improved)
- P99 latency: 5000ms → 400ms
- User satisfaction: Significantly improved
- Cost: OpenSearch cluster ~$400/month + Redis ~$100/month

**Lessons Learned:**

- Measurement is critical (we tracked every millisecond)
- Caching hits 80% of value for 20% of cost
- Index design matters (wrong analyzer = slow queries)
- Monitor index corruption (daily health checks)"

**Mistakes to Avoid:**

- ❌ "We just added Elasticsearch and it got faster" (no depth)
- ❌ Not mentioning indexing strategy
- ❌ Not addressing how to keep index fresh
- ❌ Can't explain trade-offs (consistency lag, cost)

---

### Project 2: P&G Olay (Azure Functions + Shopify Migration)

**Q4: "You led Azure Functions for BigCommerce to Shopify migration. Walk through the system design."**

**L2 Answer:** "**Situation:** P&G wanted to migrate 50K+ products from BigCommerce to Shopify without downtime.

**Challenges:**

- Can't shut down old store during migration
- Data consistency between systems
- Handle 1000s of product variations
- Different schema between platforms

**Design:**

```
Phase 1: Dual Write (safety net)
┌─────────────────────────┐
│ P&G Admin Panel         │
└────────┬────────────────┘
         │
      ┌──┴──┐
      │     │
BigCommerce Shopify (both get writes)
      │     │
      └──┬──┘
         │
(Users see: BigCommerce, but we validate Shopify in parallel)

Phase 2: Traffic Gradual Shift (canary deployment)
Day 1-3: 10% users → Shopify, 90% → BigCommerce
Day 4-6: 50% users → Shopify, 50% → BigCommerce
Day 7+:  100% → Shopify, BigCommerce reads only

Phase 3: Cleanup
Turn off BigCommerce after validation period.
```

**Azure Functions** (serverless, similar to Lambda):

```
Function 1: SyncProducts
├─ Trigger: Timer (every 5 min)
├─ Action: Fetch from BigCommerce API v3
├─ Transform: Map BigCommerce schema → Shopify schema
└─ Output: Write to Shopify GraphQL

Function 2: HandleWebhooks
├─ Trigger: BigCommerce webhook (product update)
├─ Action: Sync immediately to Shopify
└─ Advantage: Real-time sync, not batch

Function 3: ValidateConsistency
├─ Trigger: Timer (every hour)
├─ Action: Check Shopify matches BigCommerce
├─ Alert: If mismatch > 5%, page on-call
└─ Recovery: Auto-resync using dead-letter queue
```

**Key Technical Decisions:**

1. **Idempotency:** If sync runs twice, don't double-create products

    ```javascript
    const idempotencyKey = `${productId}:${lastModifiedDate}`;
    const existing = await dynamodb.get(idempotencyKey);
    if (existing) return existing; // Return cached result
    ```

2. **Retry Logic:**
    - Shopify API rate limit: 2 requests/sec
    - Implement exponential backoff (1s, 2s, 4s)
    - After 3 failures, send to DLQ (SQS queue)

3. **Data Mapping:**
    ```javascript
    // BigCommerce → Shopify transform
    const shopifyProduct = {
        title: bigcommerce.name,
        bodyHtml: bigcommerce.description,
        vendor: "P&G",
        productType: "Skincare",
        variants: bigcommerce.skus.map((sku) => ({
            sku: sku.code,
            price: sku.price,
            barcode: sku.barcode,
        })),
    };
    ```

**Result:**

- 100% data migration without downtime
- 99.8% consistency between stores
- Successful cutover in 7 days
- Zero customer impact"

---

### Project 3: Vkonnect Health (Lambda to Serverless, 99.99% uptime)

**Q5: "Vkonnect had high uptime SLA (99.99%). How did you architect for this?"**

**L2 Answer:** "99.99% = 52 minutes downtime/year. At healthcare scale, this is critical.

**Design Pattern: Bulkhead + Circuit Breaker**

```
Request
  ↓
API Gateway (throttle: 10K RPS max)
  ├─ Separate pools per function type:
  │  ├─ Auth (10 reserved concurrent)
  │  ├─ Search (20 reserved concurrent)
  │  └─ DataFetch (30 reserved concurrent)
  │
  └─ If Auth pool full:
     ├─ ALARM: Too many auth requests
     └─ → Service degrades gracefully (show cached data)
```

**Circuit Breaker** (prevent cascading failures):

```javascript
class CircuitBreaker {
    constructor(threshold = 5) {
        this.failureCount = 0;
        this.threshold = threshold;
        this.state = "CLOSED"; // Normal
    }

    async call(fn) {
        if (this.state === "OPEN") {
            throw new Error("Circuit is OPEN - service unavailable");
        }

        try {
            const result = await fn();
            this.failureCount = 0; // Reset on success
            return result;
        } catch (error) {
            this.failureCount++;
            if (this.failureCount >= this.threshold) {
                this.state = "OPEN"; // Stop trying
                setTimeout(() => {
                    this.state = "HALF_OPEN"; // Try again after cooldown
                }, 60000);
            }
            throw error;
        }
    }
}

// Usage: If external API fails 5 times, stop calling it for 60s
const apiBreaker = new CircuitBreaker(5);
await apiBreaker.call(() => externalHealthAPI.call());
```

**Observability for 99.99% SLA:**

```
CloudWatch Metrics (1-second granularity)
├─ Lambda errors: 0% (target)
├─ P99 latency: < 500ms
├─ DynamoDB throttles: 0
└─ API Gateway errors: < 0.01%

Alarms
├─ Lambda error rate > 0.1% → Page on-call (5 min response)
├─ P99 latency > 1s → Investigate (may indicate DynamoDB issue)
└─ DB throttles > 0 → Scale immediately

On-call SLA
├─ Acknowledge alarm: < 5 minutes
├─ Start debugging: < 10 minutes
└─ Fix deployed: < 30 minutes
```

**Result:** 99.99% uptime achieved, gained client trust."

---

## 3. ADVANCED AWS BACKEND QUESTIONS

### 3.1 Lambda & API Gateway Deep Dive

**Q: "Explain Lambda cold starts. You have a payment API with 100ms SLA. How do you ensure it's met?"**

**L2 Answer:** "Cold start = ~1-2 seconds. With 100ms SLA, cold starts are unacceptable.

**Strategies (ranked by effectiveness):**

1. **Provisioned Concurrency** (Best but costs extra)

    ```
    AWS Lambda Config:
    └─ Reserved Concurrency: 100 (keep 100 instances warm)
    └─ Provisioned Concurrency: 50 (keep 50 actively running)

    Cost: ~$0.015/hour per unit = $50/month for 50 units
    Benefit: 100ms cold start → <10ms warm start
    ```

2. **Bundle Size Optimization**

    ```
    Before: 5MB (includes dev dependencies)
    After: 1.2MB (prod dependencies only)

    Techniques:
    - tree-shake unused code
    - use lighter libraries (lodash → lodash-es)
    - externalize dependencies (AWS SDK often pre-loaded)

    Result: Cold start 1.5s → 900ms
    ```

3. **Memory Optimization**

    ```
    Memory = CPU allocation (more memory = faster CPU)

    Payment function (CPU-intensive):
    3008MB memory = 2 vCPU = 400ms initialization
    vs
    128MB memory = 0.07 vCPU = 2000ms initialization

    Cost vs Performance:
    3008MB payment: $2.00/1M invokes
    128MB payment: $0.04/1M invokes

    Difference: $1.96/1M invokes, worth it for 100ms SLA.
    ```

4. **Lazy Loading**

    ```javascript
    // Instead of loading all modules at startup
    const SDK = require("aws-sdk"); // 500ms
    const mysql = require("mysql"); // 300ms

    // Load only when needed
    let db = null;
    async function getDB() {
        if (!db) {
            const mysql = require("mysql");
            db = await mysql.connect();
        }
        return db;
    }

    // First invoke: initialize on demand
    // Subsequent: reuse connection (warm start)
    ```

**Decision for payment API:** "I'd use Provisioned Concurrency because:

- Payment SLA is strict (100ms non-negotiable)
- Cost ($50/month) is acceptable for payment reliability
- Business impact of failure is high
- Risk: If we scale beyond 50 concurrent, cold start again
    - Solution: Monitor concurrency, auto-increase"

**Mistakes to Avoid:**

- ❌ Only using bundle optimization (often insufficient)
- ❌ Using 10GB memory unnecessarily (cost explodes)
- ❌ Not measuring actual cold start impact (guess != data)

---

**Q: "Design API rate limiting for 100K users, 1K users active simultaneously. How do you prevent abuse?"**

**L2 Answer:**

````
Rate Limiting Strategy (multi-layered)

Layer 1: API Gateway (AWS-managed)
├─ Method throttling: 10K RPS per account
├─ Burst capacity: 5K RPS
└─ If exceeded: Return 429 (Too Many Requests)

Layer 2: Per-user limits (DynamoDB + Lambda)
├─ Free tier: 100 requests/hour
├─ Pro tier: 10K requests/hour
├─ Enterprise: Unlimited
└─ Tracking: Redis (low latency) + DynamoDB (persistence)

Layer 3: Behavioral limits
├─ Same user > 100 requests/min from different IPs → Suspicious
├─ Same endpoint > 1000/min → Potential abuse
└─ Action: Temp block IP, alert security team

Implementation:
```javascript
class RateLimiter {
  async checkLimit(userId, tier) {
    const key = `ratelimit:${userId}`;

    // Try Redis first (fast)
    let count = await redis.get(key);
    if (!count) {
      // Cold: check DynamoDB
      const record = await dynamodb.get(userId);
      count = record?.requestsThisHour || 0;
    }

    const limits = { free: 100, pro: 10000 };
    const max = limits[tier];

    if (count >= max) {
      return { allowed: false, reason: 'Rate limit exceeded' };
    }

    // Increment and set expiry
    await redis.incr(key);
    await redis.expire(key, 3600); // 1 hour

    return { allowed: true };
  }
}
````

**Handling Abuse:**

- Real-time alert if 10K requests/hour from single user (99% are legitimate)
- Block user for 1 hour (not permanent)
- Send notification to user (might be legitimate spike)

**Scaling to 100K+ users:**

- Redis cluster (handles 1M operations/sec)
- Distributed hash (user ID determines which Redis node)
- Fallback: If Redis down, slightly elevated limits vs complete block"

```

---

### 3.2 EventBridge & Kinesis for Event-Driven Systems

**Q: "Design an event-driven order processing system handling 10K orders/minute. Use EventBridge vs Kinesis. Justify."**

**L2 Answer:**
```

10K orders/minute = 167 orders/second (manageable range)

Option 1: EventBridge ├─ Architecture: Order Service → EventBridge → Lambda consumers ├─ Pros: │ ├─ Event routing (rules-based filtering) │ ├─ Transforms events before routing │ ├─ Native AWS
integration (no polling) │ └─ Simple rule management ├─ Cons: │ ├─ Max 10K rules per event bus │ ├─ No partition keys (doesn't distribute load) │ └─ Rate: ~100K events/sec per bus (enough for us) └─
Cost: $0.35 per million events = $52/day

Option 2: Kinesis ├─ Architecture: Order Stream → Lambda reads from shards → processes ├─ Pros: │ ├─ Partition keys (distribute across shards) │ ├─ Scales to 1M events/sec │ ├─ Replay capability (read
events from history) │ └─ Lower latency (direct subscription, no routing) ├─ Cons: │ ├─ Polling model (Lambda polls shards) │ ├─ Manual shard management │ └─ Cost: ~$60/month per shard × 3 shards =
$180/month └─ Cost: More expensive, but more powerful

DECISION FOR 10K ORDERS/MINUTE: → EventBridge (simpler, cheaper, sufficient throughput)

Architecture:

```
OrderService (API Gateway + Lambda)
  ├─ Create order in DynamoDB
  └─ PutEvents to EventBridge

EventBridge (event bus)
  ├─ Rule 1: OrderCreated → Lambda (PaymentProcessor)
  ├─ Rule 2: OrderCreated → Lambda (InventoryManager)
  ├─ Rule 3: PaymentProcessed → Lambda (ConfirmationEmail via SNS)
  └─ Rule 4: OrderFailed → SQS (Dead-letter queue for debugging)

Failure Handling:
┌──────────────────────────┐
│ EventBridge Rule Config  │
├──────────────────────────┤
│ RetryPolicy:             │
│ ├─ MaximumEventAge: 1hr  │
│ ├─ MaximumRetries: 2     │
│ └─ DLQ: SQS Queue        │
└──────────────────────────┘

If Lambda fails twice:
→ Event goes to SQS DLQ
→ CloudWatch alarm triggers
→ Engineer reviews failed event
→ Manual retry or fix bug + redeploy
```

**Monitoring for 10K orders/min:**

- EventBridge: Track events published, delivery success rate (target: 99.9%)
- Lambda: Track invocation duration, errors
- DynamoDB: Monitor consumed capacity (scale if > 80%)
- Alert if:
    - DLQ message count > 10 (means failures happening)
    - Lambda error rate > 0.1%
    - Order processing latency > 5 seconds"

```

---

## 4. NODE.JS ADVANCED BACKEND ROUND

### Event Loop Deep Dive

**Q: "Explain the Node.js event loop. Why does blocking code hurt performance?"**

**L2 Answer:**
```

Node.js is single-threaded (one thread, one call stack)

Event Loop (simplified):

Phase 1: timers ├─ Execute setTimeout callbacks whose time has expired └─ Example: setTimeout(() => { console.log('1s passed') }, 1000)

Phase 2: pending callbacks ├─ Execute I/O callbacks (network, disk) └─ Example: fs.readFile() callback

Phase 3: idle, prepare ├─ Internal prep

Phase 4: poll ├─ Wait for new I/O events (network request arrives, file ready) └─ Can pause here indefinitely if queue empty

Phase 5: check ├─ Execute setImmediate callbacks

Phase 6: close callbacks ├─ Close handlers

Loop repeats...

PROBLEM: Blocking Code

// BLOCKING CODE (BAD) const start = Date.now(); while (Date.now() - start < 1000) {} // Loop for 1 second (CPU busy)

// During this 1 second: // ├─ Event loop stuck (can't read files, handle requests) // ├─ User requests get queued, not processed // └─ API latency increases

// EXAMPLE: 10 concurrent requests, each CPU-bound for 100ms // Total time: 10 × 100ms = 1000ms // But if non-blocking: All 10 in parallel = still 100ms

NON-BLOCKING CODE (GOOD)

fs.readFile('large.txt', (err, data) => { // While reading, event loop processes other requests console.log(data); });

// Event loop doesn't wait, moves to next item console.log('Reading...'); // Prints before file loads

````

**Real Example: Slow API vs Fast API**

```javascript
// SLOW API: Processes one request at a time
app.get('/data', async (req, res) => {
  const result = await database.query('SELECT * FROM 1M rows'); // 500ms
  res.json(result);
});

// Scenario: 10 concurrent users
// User 1: 0-500ms (processing)
// User 2: 500-1000ms (blocked, waiting)
// User 3: 1000-1500ms (blocked, waiting)
// ...
// User 10: 4500-5000ms (blocked, waiting)

// FAST API: Parallel processing via non-blocking
app.get('/data', async (req, res) => {
  const result = await database.query('SELECT * FROM 1M rows'); // 500ms
  res.json(result);
});

// But I'm using async/await correctly!
// The event loop processes this way:
// All 10 requests start async query simultaneously (not sequentially)
// All 10 get responses after ~500ms (not 5000ms)

KEY INSIGHT:
Async/await doesn't make it faster, it makes it CONCURRENT
(Multiple requests in parallel, not sequential)
````

**Node.js Clustering for Multi-Core**

```javascript
const cluster = require("cluster");
const os = require("os");
const app = require("./app");

if (cluster.isMaster) {
    // Master process spawns workers
    const numCPUs = os.cpus().length;

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork(); // Create one worker per CPU core
    }

    console.log(`Master started, spawned ${numCPUs} workers`);
} else {
    // Worker process
    app.listen(3000, () => {
        console.log(`Worker ${process.pid} listening`);
    });
}

// Without clustering: All requests → single event loop (one CPU core)
// With clustering: Requests distributed across CPU cores
// 4-core system: 4x throughput
```

---

### Memory Leaks in Node.js

**Q: "A Lambda function has increasing memory usage over time. How would you debug?"**

**L2 Answer:**

````
Symptom: Lambda memory warning (after 10K invocations)
├─ Hour 1: 128MB used (fine)
├─ Hour 2: 256MB used (increasing)
└─ Hour 3: OOM (out of memory error)

DEBUGGING STEPS:

Step 1: Identify the leak
```javascript
// Add memory tracking
const v8 = require('v8');
const fs = require('fs');

let invocationCount = 0;

exports.handler = async (event) => {
  invocationCount++;

  if (invocationCount % 100 === 0) {
    const heapSnapshot = v8.writeHeapSnapshot();
    console.log(`Heap snapshot written: ${heapSnapshot}`);
  }

  // Your Lambda handler code
  return { statusCode: 200 };
};
````

Step 2: Analyze heap snapshots

```
Compare two snapshots (100 invocations apart)
├─ Snapshot 1: 50 invocations (baseline)
├─ Snapshot 2: 150 invocations (after 100 more)
└─ Diff: If arrays/objects have grown, memory leak confirmed

Use clinic.js:
$ clinic doctor -- node your-lambda.js
→ Shows memory usage over time
```

Step 3: Common causes

```
CAUSE 1: Global variable accumulation
❌ WRONG:
let cache = [];
exports.handler = async (event) => {
  cache.push(event); // Array grows infinitely
  return { cached: cache.length };
};

✅ RIGHT:
const maxCacheSize = 1000;
let cache = [];
exports.handler = async (event) => {
  if (cache.length > maxCacheSize) {
    cache.shift(); // Remove oldest
  }
  cache.push(event);
  return { cached: cache.length };
};

CAUSE 2: Unclosed connections
❌ WRONG:
const mysql = require('mysql');
const conn = mysql.createConnection(...);

exports.handler = async (event) => {
  const result = await conn.query('SELECT ...');
  // Connection never closed, accumulates
  return result;
};

✅ RIGHT:
let conn = null;
async function getConnection() {
  if (!conn) {
    conn = await mysql.createConnection(...);
  }
  return conn;
}

exports.handler = async (event) => {
  const connection = await getConnection();
  const result = await connection.query('SELECT ...');
  // Reuse connection (don't create new one each invocation)
  return result;
};

CAUSE 3: Event emitter listeners
❌ WRONG:
const EventEmitter = require('events');
const emitter = new EventEmitter();

exports.handler = async (event) => {
  emitter.on('data', (data) => {
    console.log(data);
  }); // Listener added each invocation (accumulates)
  return {};
};

✅ RIGHT:
const emitter = new EventEmitter();
if (!emitter.listenerCount('data')) {
  emitter.on('data', (data) => console.log(data));
}

exports.handler = async (event) => {
  emitter.emit('data', event);
  return {};
};
```

**Prevention:**

- Set memory limit in CloudWatch alarm (512MB → alert if reached 400MB)
- Regular heap snapshot analysis in CI/CD
- Memory profiling in dev before deploy"

```

---

### Streams for Processing Large Files

**Q: "Process a 5GB file from S3 in Lambda (15-min timeout). How?"**

**L2 Answer:**

```

Challenge: 5GB > 10GB max Lambda memory, can't load entirely

Solution: Stream processing (read chunks)

```javascript
const aws = require("aws-sdk");
const s3 = new aws.S3();

exports.handler = async (event) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;

    const params = {
        Bucket: bucket,
        Key: key,
    };

    // Create readable stream from S3
    const stream = s3.getObject(params).createReadStream();

    let buffer = "";
    let recordCount = 0;

    return new Promise((resolve, reject) => {
        stream.on("data", (chunk) => {
            buffer += chunk.toString();

            // Process in 1MB chunks
            if (buffer.length > 1_000_000) {
                const lines = buffer.split("\n");
                buffer = lines.pop(); // Keep incomplete line

                // Process batch
                recordCount += lines.length;
                processBatch(lines);
            }
        });

        stream.on("end", () => {
            if (buffer.length > 0) {
                const lines = buffer.split("\n");
                recordCount += lines.length;
                processBatch(lines);
            }

            resolve({
                statusCode: 200,
                body: JSON.stringify({ processed: recordCount }),
            });
        });

        stream.on("error", reject);
    });
};

function processBatch(lines) {
    // Parse JSON, validate, transform, write to DynamoDB
    const items = lines.map((line) => JSON.parse(line)).filter((item) => item.isValid);

    // Batch write to DynamoDB
    batchWrite(items);
}
```

**Key Benefits:**

- Memory: Constant (not proportional to file size)
- Time: Process while reading (not download-then-process)
- Cost: Faster Lambda execution"

```

---

## 5. SYSTEM DESIGN & ARCHITECTURE

### System Design: E-Commerce Order Management with Event-Driven Architecture

**Prompt:** "Design a backend for 100K orders/day. Handle payments, inventory, notifications, analytics. Multi-region capable."

**L2 Architecture Answer:**

```

┌────────────────────────────────────────────────────────────────┐ │ High-Level Flow │ │ │ │ Client (Web/Mobile) │ │ ↓ │ │ ┌─────────────────────────────────────────┐ │ │ │ API Gateway (CloudFront
edge cache) │ │ │ │ ├─ Throttling: 10K RPS │ │ │ │ ├─ Auth: JWT validation │ │ │ │ └─ Cache: GET /products (5 min TTL) │ │ │ └────────────┬────────────────────────────┘ │ │ ↓ │ │
┌─────────────────────────────────────────┐ │ │ │ Order Service (Lambda + Express) │ │ │ │ ├─ Validate order │ │ │ │ ├─ Check inventory │ │ │ │ └─ Store in DynamoDB │ │ │
└────────────┬────────────────────────────┘ │ │ ↓ │ │ ┌─────────────────────────────────────────┐ │ │ │ EventBridge (Event Router) │ │ │ │ Distributes OrderCreated event to: │ │ │
└─┬──────────────┬────────────────┬───────┘ │ │ ↓ ↓ ↓ │ │ Payment Inventory Notification │ │ Service Service Service │ │ ↓ ↓ ↓ │ │ Stripe API DynamoDB SNS (Email/SMS) │ │ │
└────────────────────────────────────────────────────────────────┘

Detailed Architecture

````

**Component 1: Order Service**

```javascript
// Lambda: CreateOrder
exports.handler = async (event) => {
  const { userId, items, shipping } = JSON.parse(event.body);

  // Validate
  if (!items || items.length === 0) {
    return { statusCode: 400, body: 'No items' };
  }

  // Calculate total
  const total = items.reduce((sum, item) => sum + item.price, 0);

  // Create order in DynamoDB
  const orderId = uuid();
  const order = {
    orderId,
    userId,
    items,
    status: 'PENDING',
    total,
    createdAt: Date.now(),
    shipping
  };

  await dynamodb.put({
    TableName: 'Orders',
    Item: order,
    ConditionExpression: 'attribute_not_exists(orderId)'
  }).promise();

  // Publish event
  await eventbridge.putEvents({
    Entries: [{
      Source: 'order-service',
      DetailType: 'OrderCreated',
      Detail: JSON.stringify(order)
    }]
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({ orderId, status: 'PENDING' })
  };
};
````

**Component 2: EventBridge Rules**

```json
{
    "Rules": [
        {
            "Name": "OrderCreatedPaymentFlow",
            "EventPattern": {
                "source": ["order-service"],
                "detail-type": ["OrderCreated"],
                "detail": { "total": [{ "numeric": [">", 0] }] }
            },
            "Targets": [
                {
                    "Arn": "arn:aws:lambda:...PaymentProcessor",
                    "RetryPolicy": {
                        "MaximumEventAge": 3600,
                        "MaximumRetryAttempts": 2
                    },
                    "DeadLetterConfig": {
                        "Arn": "arn:aws:sqs:...PaymentDLQ"
                    }
                }
            ]
        },
        {
            "Name": "PaymentProcessedNotification",
            "EventPattern": {
                "source": ["payment-service"],
                "detail-type": ["PaymentProcessed"]
            },
            "Targets": [
                {
                    "Arn": "arn:aws:sns:...SendConfirmationEmail"
                }
            ]
        }
    ]
}
```

**Component 3: Failure Handling (Saga Pattern)**

```
Happy Path:
Order Created → Payment OK → Inventory Reserved → Notification Sent

Failure Path 1: Payment fails
Order Created → Payment FAILED
  ├─ Publish PaymentFailed event
  ├─ Update order status to CANCELLED
  └─ No inventory needed

Failure Path 2: Inventory unavailable
Order Created → Payment OK → Inventory FAILED
  ├─ Compensate: Refund payment
  ├─ Update order status to CANCELLED
  └─ Notify customer

Implementation:
```

```javascript
// Payment Service with compensation
async function processPayment(order) {
    try {
        const charge = await stripe.charges.create({
            amount: order.total * 100,
            currency: "usd",
            source: order.paymentMethod,
        });

        // Success: publish event
        await publishEvent("PaymentProcessed", { orderId: order.orderId, chargeId: charge.id });
    } catch (error) {
        // Failure: publish compensation event
        await publishEvent("PaymentFailed", { orderId: order.orderId, reason: error.message });

        // Update order
        await dynamodb
            .update({
                TableName: "Orders",
                Key: { orderId: order.orderId },
                UpdateExpression: "SET #status = :status",
                ExpressionAttributeNames: { "#status": "status" },
                ExpressionAttributeValues: { ":status": "CANCELLED" },
            })
            .promise();
    }
}

// Inventory Service with compensation
async function reserveInventory(order) {
    try {
        // Try to reserve
        const reservation = await dynamodb
            .update({
                TableName: "Inventory",
                Key: { productId: order.items[0].productId },
                UpdateExpression: "SET reserved = reserved + :qty",
                ConditionExpression: "available >= :qty",
                ExpressionAttributeValues: {
                    ":qty": order.items[0].quantity,
                },
            })
            .promise();

        await publishEvent("InventoryReserved", { orderId: order.orderId });
    } catch (error) {
        // Out of stock: trigger payment refund
        await publishEvent("InventoryUnavailable", { orderId: order.orderId });

        // Compensate: trigger payment refund
        const order = await getOrder(order.orderId);
        await stripe.refunds.create({
            charge: order.chargeId,
        });
    }
}
```

**Component 4: Scaling & Performance**

| Aspect                     | Challenge                        | Solution                                              |
| -------------------------- | -------------------------------- | ----------------------------------------------------- |
| **100K orders/day**        | API throttling                   | API Gateway + Lambda autoscaling + SQS buffer         |
| **Inventory consistency**  | Concurrent updates (overselling) | DynamoDB ConditionExpression + CAS (compare-and-swap) |
| **Payment failures**       | Retry storms                     | Exponential backoff + DLQ + manual review             |
| **Search (100M products)** | Slow queries                     | OpenSearch indices + caching                          |
| **Multi-region**           | Latency + failover               | DynamoDB global tables + Route 53 failover            |

---

## 6. PRODUCTION INCIDENT & DEBUGGING ROUND

### Incident 1: Lambda Timeout During Peak Hours

**Scenario:** "Suddenly Lambda functions timing out (15-min limit reached) during evening peak (5-10 PM). Worked fine morning. What do you do?"

**L2 Debugging Approach:**

**Step 1: Gather Data (5 minutes)**

```
CloudWatch dashboard check:
├─ Duration: P99 went from 2s → 13s (getting close to 15s limit)
├─ Invocations: Normal (10K/min, expected)
├─ Errors: 2% starting at 5 PM (normal is 0.1%)
└─ DynamoDB: Throttles detected! (Red flag)

Hypothesis: DynamoDB bottleneck
```

**Step 2: Root Cause Analysis (10 minutes)**

```
Check DynamoDB metrics:
├─ Consumed RCU (Read Capacity Units):
│  ├─ Morning: 1000 RCU (plenty of room, limit is 40K)
│  ├─ Evening: 35000 RCU (99% of limit)
│  └─ Spike: Queries taking 10x longer (from 10ms → 100ms)
│
├─ Throttles: Yes, 500+ throttles/min starting at 5 PM
│
└─ Culprit: Unoptimized scan in one Lambda function

Code review found:
  SELECT * FROM Orders WHERE status = 'PENDING'
  └─ This is a full table SCAN (not using PK/SK), hitting 500M items!
  └─ Should be: Query with GSI (GlobalSecondaryIndex) on status field
```

**Step 3: Immediate Fix (3 minutes deployment)**

```javascript
// BEFORE: Scan (bad for large tables)
const result = await dynamodb
    .scan({
        TableName: "Orders",
        FilterExpression: "#status = :status",
        ExpressionAttributeValues: { ":status": "PENDING" },
    })
    .promise();

// AFTER: Query using GSI (good)
const result = await dynamodb
    .query({
        TableName: "Orders",
        IndexName: "StatusIndex",
        KeyConditionExpression: "#status = :status",
        ExpressionAttributeValues: { ":status": "PENDING" },
    })
    .promise();

// Deploy immediately (rollout 10% canary, then 100%)
// Result: Duration drops from 13s → 2s, errors go to 0.1%
```

**Step 4: Prevention (permanent fix)**

```
1. Create GSI on status field (if not exists):
   aws dynamodb update-table \
     --table-name Orders \
     --attribute-definitions AttributeName=status,AttributeType=S \
     --global-secondary-indexes IndexName=StatusIndex...

2. Code review: Audit for other full table scans
   ├─ Check all Lambda functions
   ├─ Review CloudWatch logs for slow queries
   └─ Set alarms: Query duration > 500ms → investigate

3. Monitoring: Alert on DynamoDB throttles
   ├─ Throttle count > 0 → page on-call
   ├─ Duration p99 > 1s → investigate
   └─ RCU consumption > 80% → scale capacity

4. Test: Load testing with peak traffic
   ├─ Simulate 100K concurrent requests
   ├─ Check DynamoDB capacity
   └─ Verify no timeouts
```

**Result:** Zero timeouts for 3+ months after fix

---

### Incident 2: Memory Leak in Node.js Lambda

**Scenario:** "Lambda function works fine first hour, then memory warning, then OOM after 5 hours. Why?"

**Investigation:**

````
Symptom progression:
Hour 0: 256MB (fine)
Hour 1: 384MB (alert at 80%)
Hour 2: OOM crash (Lambda terminated)

Step 1: Root cause (code review):
```javascript
const cache = {}; // Global object

exports.handler = async (event) => {
  // Each request adds to global cache, never cleaned
  const key = event.recordId;
  cache[key] = event.data; // Accumulates forever

  // After 10K requests:
  // cache size = millions of objects = OOM

  return { cached: Object.keys(cache).length };
};
````

Step 2: Fix:

```javascript
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 600 }); // 10-min auto-expire

exports.handler = async (event) => {
    const key = event.recordId;
    cache.set(key, event.data, 600); // Expires after 10 min

    return { cached: cache.keys().length };
};
```

Result: Memory stable at 256MB (no growth)

```

---

### Incident 3: OpenSearch Query Timeout

**Scenario:**
"User searching for products gets 'Query Timeout' error. Search worked yesterday. What changed?"

**Analysis:**

```

Step 1: Check OpenSearch health: ├─ Index size: 50GB (normal) ├─ Query latency: 1s (was 200ms) └─ Bulk indexing in progress: Yes! (new product catalog load)

Step 2: Root cause: The system is bulk-indexing 100K new products while users query ├─ Bulk indexing locks resources ├─ User queries starved for CPU ├─ Timeout after 5 seconds

Step 3: Fix options: Option A: Wait for bulk indexing to finish (not ideal) Option B: Schedule bulk indexing during off-peak (midnight) Option C: Use separate OpenSearch cluster for bulk operations

Step 4: Implement:

```javascript
// Separate queues for indexing
const bulkQueue = new PQueue({ concurrency: 1, interval: 10000, maxSize: 100 });
const searchQueue = new PQueue({ concurrency: 50 });

// Bulk indexing (off-peak):
bulkQueue.add(() => indexBatch(documents));

// User searches (always responsive):
searchQueue.add(() => userSearch(query));

// Or: Index to new cluster, switch alias when done
// Create new cluster: opensearch-new
// Index to opensearch-new (no impact on users searching opensearch)
// When complete: Point alias 'products' → opensearch-new
// Delete old cluster
```

Result: Search always responsive

```

---

## 7. MANAGERIAL ROUND PREPARATION

### Key Managerial Traits TCS Evaluates for L2

| Trait | What It Means | Your Example |
|-------|--------------|--------------|
| **Ownership** | Takes responsibility, doesn't blame | UTEC: Fixed OpenSearch bottleneck without being asked |
| **Leadership** | Mentors others, raises team bar | Mentored juniors on AWS best practices |
| **Communication** | Explains to technical and non-technical | Can present to clients, engineers, managers |
| **Problem-solving** | Handles unknowns pragmatically | Debugged production incidents independently |
| **Prioritization** | Balances speed vs quality vs technical debt | Met UTEC deadline while maintaining 99.9% uptime |
| **Collaboration** | Works across teams | Coordinated with QA, DevOps, frontend teams |
| **Client focus** | Understands business impact | Optimized for cost (60% reduction) while improving performance |

---

### Question Set 1: Leadership & Ownership

**Q: "Tell me about a time you had to make a critical decision affecting the team. What did you do?"**

**Strong L2 Answer (STAR format):**

"**Situation:** At UTEC, I discovered we had a significant technical debt (10% of our Lambda functions were using outdated logging patterns, making debugging hard).

**Task:** I could either fix it myself (6 days of work) or lead the team to do it (1 week to teach, 2 weeks with team effort). Deadline was tight.

**Action:**
1. **Assessed the trade-off:**
   - Option A (I fix): Quick, but team doesn't learn
   - Option B (teach team): Slower, but team upskills for future
   - Decision: Chose Option B because it's better long-term

2. **Implemented learning:**
   - Created tech doc on logging best practices
   - Paired with junior developers (1-on-1)
   - Did code reviews, explained patterns
   - Set up linting rules to prevent regression

3. **Managed timeline:**
   - Prioritized hotspots (auth, payment, search services)
   - Refactored others in parallel
   - Maintained deadline (completed in 1.5 weeks)

**Result:**
- Team learned best practices (reusable skill)
- Debugging improved (faster incident resolution)
- No production impact during refactoring (careful rollout)
- Junior developers gained confidence

**Reflection:** This taught me that investing in team capability is often better than individual heroics, even if it takes longer upfront."

**Weak L2 Answer:**
"I just fixed it myself because time was limited." (Misses leadership aspect)

**Follow-up Interviewer May Ask:**
- "How did you handle disagreement if someone didn't want to refactor?"
- "What if the deadline had been immovable?"
- "How did you measure if the team learned?"

---

**Q: "Tell me about a conflict with a team member. How did you resolve it?"**

**Strong L2 Answer:**

"**Situation:** At Vkonnect Health, a DevOps engineer wanted to implement a CI/CD change that I thought would increase deployment time (review: he was proceeding without architectural review).

**Task:** Disagree respectfully, find best solution for the team.

**Action:**
1. **Understood his perspective:**
   - Asked: 'What problem are you solving?'
   - Listened without interrupting
   - He wanted to reduce manual steps (legitimate goal)

2. **Explained my concern:**
   - Instead of: 'That won't work' (dismissive)
   - Tried: 'Your goal is great. I'm concerned about X because Y. Can we explore Z?'
   - Suggested: Let's test with a staging pipeline first

3. **Found middle ground:**
   - He implemented the change in staging (lower risk)
   - We monitored deployment times for 2 weeks
   - Data showed no regression (I was wrong)
   - We deployed to production with his solution
   - Team time savings: 30 min/day (significant)

**Result:**
- DevOps engineer felt heard and respected
- Solution was better than either of our original ideas
- Learned: Data beats opinions

**Reflection:** I was wrong to assume my idea was better. Asking questions first instead of dismissing is key to good collaboration."

**Mistakes to Avoid:**
- ❌ "I was right, they were wrong" (adversarial tone)
- ❌ "I didn't address it" (passive, not leadership)
- ❌ "I convinced them to do it my way" (manipulation, not collaboration)

---

## 8. HR ROUND MASTER PREPARATION

### Critical HR Questions & Strategic Answers

**Q1: "Tell me about yourself. Walk me through your career."**

**Strong 2-minute answer:**

"I'm Onkar Sawant, a Node.js backend engineer with 5+ years of experience building scalable systems at growing companies.

**Journey:**

Year 1-2 (Reapmind): Started as MERN developer, learned full-stack. Built admin panels, worked with AWS basics, **lesson learned: backend is my passion.**

Year 3-4 (Iprogrammer): Became senior Node.js developer at UTEC. Led architecture design for construction management system serving 110+ users. Optimized search using OpenSearch (30% latency reduction), maintained 99.9% uptime, mentored juniors. **Lesson: I enjoy architecture and mentoring.**

Year 5+ (Synechron + LTIMindtree): Took on backend architect role. Designed event-driven systems, optimized costs (60% reduction), handled P&G Oaly migration (seamless BigCommerce to Shopify data sync). **Lesson: I can drive impact through system design.**

**Why TCS?**
TCS is known for large-scale distributed systems and client relationships. I want to work on mission-critical systems at enterprise scale, and I'm excited by TCS's cloud-native transformation projects. I'm confident my experience with AWS, OpenSearch, and large teams makes me a good fit.

**My strengths:** Backend architecture, AWS expertise, ownership mindset, mentoring juniors.
**Growth areas:** Want to deepen Kubernetes knowledge (ECS experience, want EKS depth), and work on multi-region systems."

**Time: 2 minutes. Tone: Confident, specific, forward-looking.**

---

**Q2: "Why are you leaving [current company]?"**

**Strong answer (positive framing):**

"I've learned a lot at [current company], and I'm proud of what we shipped. However, I'm at a point where I want to:

1. Work on larger-scale systems (enterprise systems, not just startups)
2. Collaborate with different teams across projects
3. Develop leadership skills (TCS offers L2 role with mentoring expectations)

TCS aligns with these goals. The role offers exposure to diverse clients, larger systems, and a structured L2 path."

**Mistakes to avoid:**
- ❌ "My manager is bad"
- ❌ "I didn't learn anything"
- ❌ "The pay is too low" (save for salary negotiation)
- ❌ Complaining about company

---

**Q3: "What's your current CTC and expected CTC?"**

**Strategic answer:**

"My current CTC is 40 LPA (base + bonus + benefits).

For TCS, based on market research (Glassdoor, AmbitionBox) and my experience, I'm looking at 45-50 LPA range.

However, I'm open to discussion based on:
- Role clarity and responsibilities
- Project types and learning opportunities
- Team and growth prospects

I value meaningful work and growth over maximum salary."

**Why this works:**
- Shows you've researched market
- Gives range, not fixed number (room for negotiation)
- Shows you value more than just money
- Remains professional

**Typical TCS offer for your profile:** 42-48 LPA

---

**Q4: "What if we can only offer 40 LPA (current salary)? Would you accept?"**

**Graceful negotiation:**

"I appreciate the offer. Before I decide, let me understand:
- What's the promotion timeline? (E.g., L3 in 18 months)
- What projects will I work on?
- What's the learning budget?
- Any signing bonus available?

If the base is fixed at 40, can we explore:
- Higher bonus (15% → 20%)?
- Signing bonus (₹2-3 LPA to offset switching)?
- Stock options (if available)?
- Faster promotion track?

I'm genuinely interested in TCS. Let's find a mutually beneficial package."

**Why this works:**
- Doesn't reject outright
- Asks for context
- Negotiates creatively (not just salary)
- Remains collaborative

---

**Q5: "What are your long-term goals?"**

**Strong answer:**

"In 2 years: Become an expert in distributed systems and cloud architecture. Lead a team of 5-8 engineers. Contribute to open-source projects.

In 5 years: Architecture lead or manager. Influence system design decisions at company level. Mentor next generation of engineers.

How TCS fits:
- L2 role gives me leadership experience
- Exposure to diverse clients = architecture depth
- Structured mentorship program
- Clear L3/manager track"

**Mistakes:**
- ❌ "I want to be a manager" (if you're technical, this seems out of place)
- ❌ "I want to start my own company" (seems like you'll leave)
- ❌ Vague answers ("grow professionally")

---

## 9. SALARY NEGOTIATION STRATEGY

### TCS Backend Developer (L2) Market Research

**Salary Data (2024-2026):**

| Experience | Base | Bonus | Benefits | Total |
|------------|------|-------|----------|-------|
| 3-4 years | 28-32 | 12-15% | 2 LPA | 35-40 |
| 4-6 years (Your range) | 35-42 | 15-20% | 2-3 LPA | 42-50 |
| 6-8 years | 45-55 | 20-25% | 3-4 LPA | 55-65 |

**Your positioning:** 4-6 years (lower end due to startup background, but strong projects)
**Target range:** 43-48 LPA

**Negotiation Script:**

**If offered 40 LPA:**

"Thank you for the offer. I'm excited about the role. I did some market research, and for my experience level and background, market rate is 43-46. Can we explore:
- Base 42, bonus 18% (instead of 15%)?
- Or base 40, signing bonus ₹3 LPA?

Let's find something that works for both of us."

**If offered 42 LPA:**

"Great! This is close to expectations. Can we add one of:
- Signing bonus (₹1-2 LPA)?
- Extended PTO (25 days instead of 20)?
- Learning budget (₹1.5 LPA instead of 1)?
- Fast-track to promotion (L3 in 18 months)?

If not, I'm happy to proceed at 42 LPA for a strong team and growth opportunity."

**If offered 45 LPA:**

"Perfect! Thank you. I'm ready to sign."

---

## 10. MOCK INTERVIEW SIMULATION

### Full Mock L2 Technical Round (90 minutes)

**Interview begins:**

**Interviewer:** "Hi Onkar! How are you doing?"
**You:** "Great! Thanks for the opportunity. I'm excited to chat about backend systems and my experience at UTEC and other projects."

**Interviewer:** "Perfect! Let's start. Can you walk me through UTEC's architecture?"

**Your 10-min answer (following L2 pattern):**

[Refer to Section 2, Q1 — full architecture explanation]

**Interviewer:** "Good explanation. Now, if traffic doubled overnight to 20K RPS, what would break first and how'd you handle it?"

**Your L2 Answer:**

"Good question. Let me think about bottlenecks:

1. **API Gateway throttle:** 10K RPS limit
   - Fix: Increase limit (takes 5 min), notify AWS TAM for emergency increase

2. **Lambda concurrency:** Default 1000
   - Check current: `aws lambda get-account-settings`
   - Increase reserved concurrency if needed
   - Provision more concurrency if latency-critical

3. **DynamoDB:** On-demand billing scales automatically
   - But if costs spike, might need to revert
   - Monitor: ConsumedWriteCapacityUnits

4. **OpenSearch:** Might lag if indexing can't keep up
   - DynamoDB Streams → Lambda → OpenSearch
   - If lag > 5 seconds, scale OpenSearch (add nodes)

**Action plan (first 30 min):**
- Increase API Gateway limit (AWS support call)
- Scale OpenSearch (add 2 nodes)
- Monitor DynamoDB costs
- Prepare rollback if needed

**Results to track:**
- API Gateway throttle count (should be 0)
- Lambda duration (watch p99)
- DynamoDB throttles (should be 0)
- OpenSearch indexing lag (target < 1 sec)

**If costs spike unexpectedly:**
- Investigate: Is there a bug causing extra requests?
- Monitor: Check for unusual traffic patterns
- Limit: Implement rate limiting temporarily"

**Interviewer:** "Good. Now, system design question. Design an event-driven payment system handling 10K payments/min with 99.99% success rate."

[Refer to Section 5 — full system design answer]

**Interviewer:** "Last question. You're debugging a production issue: Lambda functions timeout (15-min max) during peak hours. What's your approach?"

[Refer to Section 6, Incident 1 — debugging methodology]

**End of technical round: 90 minutes complete.**

---

### Full Mock Managerial Round (60 minutes)

**Interviewer:** "Tell me about your leadership experience."

[Refer to Section 7 — ownership and leadership answers]

**Interviewer:** "How do you handle disagreement with your team?"

[Section 7 — conflict resolution answer]

**Interviewer:** "If you had to ship a critical feature in 2 weeks but the team wanted to spend time refactoring, what would you do?"

**Your L2 Answer:**

"Good scenario. Here's my approach:

1. **Understand both needs:**
   - Feature: Business value, revenue impact
   - Refactoring: Technical health, engineer productivity

2. **Ask the right questions:**
   - Which refactoring is blocking feature delivery?
   - How much time saved per sprint after refactoring?
   - What's the cost of NOT doing it?

3. **Find middle ground:**
   - Do critical path refactoring now (2 days)
   - Ship feature with workarounds if needed (10 days)
   - Plan full refactoring post-feature (following sprint)

4. **Communication:**
   - "I hear you on technical debt. Let's prioritize refactoring that unblocks feature delivery."
   - Don't dismiss the concern (shows lack of ownership)

5. **Track impact:**
   - Measure: Time saved per deployment
   - Verify: Fewer bugs after refactoring
   - Share results with team (validates decision)

**My mindset:** It's not refactoring vs feature — it's "what enables sustained, high-velocity delivery?"
Sometimes that's the feature first, sometimes refactoring first. Data helps decide."

**Interviewer:** "Do you prefer coding or managing? Where do you see yourself?"

**Your Answer:**

"I genuinely love both. Right now, I'm at a point where I think management is my next growth area. Here's why:

1. **Impact:** Managing 5 engineers = 5x my individual output
2. **Multiplier:** Helping team grow = long-term impact
3. **Not abandoning coding:** I'd still code 40% of my time (stay sharp)

But honestly, I'm flexible. If TCS needs expert backend architects more than managers, I'm happy staying technical. I care about impact, not title."

**Why this works:**
- Shows self-awareness
- Not abandoning technical skills
- Open to company needs
- Focused on impact, not status

---

## 11. 15-DAY INTENSIVE PREPARATION PLAN

### Week 1: Foundation (Days 1-7)

| Day | Focus | Time | Task |
|-----|-------|------|------|
| 1 | AWS Lambda & API Gateway | 3 hrs | Read sections 3.1, do cold start calculation |
| 2 | EventBridge & Kinesis | 3 hrs | Understand 100K RPS architecture decision |
| 3 | Node.js Event Loop | 2 hrs | Deep dive on blocking code, streams |
| 4 | DynamoDB Scaling | 2 hrs | Practice schema design, GSI optimization |
| 5 | System Design (E-commerce) | 3 hrs | Draw architecture, practice explaining |
| 6 | Production Debugging | 2 hrs | Study 3 incidents, practice root cause analysis |
| 7 | Soft Skills | 2 hrs | Practice STAR answers, mock technical Q |

**Total: 17 hours**

---

### Week 2: Depth & Practice (Days 8-14)

| Day | Focus | Time | Task |
|-----|-------|------|------|
| 8 | Project Deep Dive (UTEC) | 2 hrs | Memorize details, practice 10-min explanation |
| 9 | Project Deep Dive (P&G) | 2 hrs | Migration architecture, BigCommerce schema mapping |
| 10 | Advanced AWS (IAM, Security) | 2 hrs | Understand principle of least privilege |
| 11 | Managerial Scenarios | 2 hrs | Practice ownership, conflict resolution answers |
| 12 | Mock Technical Round | 1.5 hrs | Full 90-min simulation (timed) |
| 13 | Mock Managerial Round | 1 hrs | Full 60-min simulation |
| 14 | HR Round Questions | 2 hrs | Practice 10 HR Qs, record yourself |

**Total: 12.5 hours**

---

### Week 3: Final Polish (Days 15)

| Day | Focus | Time | Task |
|-----|-------|------|------|
| 15 | Cheat Sheet Review | 2 hrs | Rapid revision, practice speaking quickly |
| | Confidence Exercise | 1 hr | Self-talk, positive visualization |
| | Final Rest | Rest | Get sleep, prepare mentally |

**Total: 3 hours**

**Grand Total: ~32 hours over 15 days**

---

## 12. FINAL RAPID REVISION CHEAT SHEET

### High-Impact AWS Concepts (Review in 5 min)

**Lambda:**
- Cold start: 1-2s (mitigate: Provisioned Concurrency, bundle size)
- Timeout: 15 min max
- Memory: 128-10GB (CPU scales with memory)
- Concurrency: 1000 default

**DynamoDB:**
- PK determines throughput (use GSI for filtering)
- On-demand vs provisioned (on-demand = variable cost, provisioned = fixed cost)
- TTL: Auto-delete old items

**API Gateway:**
- Throttle: 10K RPS
- Caching: Enable for GET requests
- Auth: API key, IAM, Cognito

**OpenSearch:**
- Inverted indices (fast full-text search)
- Mapping: Define analyzer per field
- Replication: For high availability

---

### Strong Architecture Phrases (Sound Experienced)

✅ "We measured X to validate the decision"
✅ "The trade-off here is cost vs latency; we chose [X] because..."
✅ "We designed for eventual consistency, which is acceptable for..."
✅ "We implemented exponential backoff with DLQ for resilience"
✅ "This scales horizontally because we partitioned by user ID"
✅ "We monitor [metric] to catch regressions early"
✅ "If [assumption] changes, we'd need to reconsider this design"

❌ "I don't know" (instead: "I haven't worked with that, but I'd approach it by...")
❌ "It just works" (no depth)
❌ "Everybody uses Lambda" (no justification)

---

### Strong Managerial Phrases

✅ "I took ownership of this problem"
✅ "I listened to the team's concerns before deciding"
✅ "I learned from this mistake by..."
✅ "I mentored them by pairing on code"
✅ "We tracked this metric to validate if it worked"

❌ "It's not my problem"
❌ "I was right, they were wrong"
❌ "I don't have time for this"

---

### Strong HR Phrases

✅ "I'm excited about this opportunity because..."
✅ "I want to grow in [area], and TCS offers that"
✅ "My experience in [project] taught me..."
✅ "I value growth opportunities and team collaboration"

❌ "I'm just looking for a job"
❌ "The pay is too low"
❌ "My manager was bad"

---

### Common Traps & How to Avoid

| Trap | Question | Safe Answer |
|------|----------|------------|
| **Overconfidence** | "You know everything about AWS?" | "I have solid experience, but I'm always learning new aspects" |
| **Underselling** | "What's your biggest achievement?" | [Specific numbers, impact, learning] |
| **Vagueness** | "How would you scale this?" | [Specific: "First I'd measure...then..."] |
| **Blame-shifting** | "Why did that fail?" | "I take responsibility. Here's what I learned" |
| **Technical jargon** | Explaining to non-technical | Use analogies, avoid acronyms |

---

### Interview Day Checklist

**Day Before:**
- [ ] Sleep 7+ hours
- [ ] Review sections 1-4
- [ ] Do one mock interview
- [ ] Prepare 3 questions for interviewer

**Interview Day:**
- [ ] Arrive 10 minutes early (or join 5 min early if video)
- [ ] Dress professionally
- [ ] Have notepad + pen (take notes)
- [ ] Turn off phone notifications
- [ ] Smile (even on video, it's audible)
- [ ] Take a breath before speaking (think before rushing)

**During Interview:**
- [ ] Listen fully before answering
- [ ] Provide specific examples (not general)
- [ ] Show enthusiasm but not overconfidence
- [ ] Ask for clarification if unclear
- [ ] Admit unknowns gracefully

**After Interview:**
- [ ] Send thank-you email (mention something specific)
- [ ] Follow up if no contact within 3 days

---

## FINAL NOTES FOR L2 INTERVIEW SUCCESS

1. **You already have the technical skills.** L2 interviews evaluate your ability to think big, communicate clearly, and lead. Showcase those.

2. **Specificity beats generality.** Instead of "I optimized the system," say "I added OpenSearch caching, reducing query latency from 3.5s to 250ms (70% improvement), which improved user satisfaction."

3. **Data beats opinions.** When asked "should we use X?", answer "We measured Y metric before and after, and X resulted in Z% improvement, so yes."

4. **Mistakes are okay; hiding them isn't.** "I chose the wrong database initially, learned X, and migrated successfully" is better than pretending perfect decisions.

5. **TCS values client relationships.** Show you can explain technical concepts to non-technical stakeholders.

6. **Confidence isn't arrogance.** Confident: "I've built systems at scale." Arrogant: "I know everything."

---

**You've got this! 💪**

Last Updated: May 2026

---

*Good luck with your TCS L2 interview!*

```
