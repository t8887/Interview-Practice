# 📈 Scalability

> **Chief Architect Note:** Scalability is not about handling more users — it's about doing it without changing your architecture fundamentally. A bad scalable design breaks your monolith into microservices chaos.

---

## 2.1 Horizontal vs Vertical Scaling

### Vertical Scaling (Scale Up)

Add more power to a single machine: bigger CPU, more RAM, faster disk.

**Machine Progression:**
```
t1.micro (AWS)    → 1 vCPU, 1GB RAM    → 10 req/sec
t2.medium        → 2 vCPU, 4GB RAM    → 40 req/sec
c5.2xlarge       → 8 vCPU, 16GB RAM   → 160 req/sec
c5.9xlarge       → 36 vCPU, 72GB RAM  → 720 req/sec
```

**Advantages:**
- Simple — no distributed system complexity
- Shared state is trivial (everything's in one process memory)
- No network latency between services
- Debugging is straightforward

**Disadvantages:**
- **Hard ceiling** — the biggest machine has limits (~1TB RAM, ~96 CPUs today)
- **Single point of failure** — one machine down = entire service down
- **Expensive per unit** — diminishing returns ($10K → $50K for 5x power)
- **Downtime to upgrade** — restart the one machine, lose all traffic

**Real Cost:** A c5.9xlarge costs ~$3/hour on AWS. A small cluster of t3.medium instances costs ~$0.05/hour each × 10 = $0.50/hour total, with 10× redundancy.

### Horizontal Scaling (Scale Out)

Add more machines and distribute load across them.

**Capacity Growth:**
```
10 small servers × 50 req/sec each = 500 req/sec
100 small servers × 50 req/sec each = 5,000 req/sec
1000 small servers × 50 req/sec each = 50,000 req/sec
(No ceiling, just keep adding servers)
```

**Advantages:**
- **No ceiling** — add servers until your budget runs out
- **Fault isolation** — one server fails, others handle traffic
- **Cost efficient** — cheap commodity hardware, easy to add/remove
- **Zero downtime** — deploy new version to new servers, switch traffic, old servers offline

**Disadvantages:**
- **Complexity** — distributed system problems (network latency, eventual consistency, debugging)
- **Shared state** — can't store session data in process memory; need Redis/cache
- **Network overhead** — data travels between servers (TCP handshakes, serialization)
- **Operational burden** — need orchestration (Kubernetes), monitoring, logging

### Stateless vs Stateful Design

**Stateful Service (Session in Memory):**

```javascript
// ❌ BAD: Session stored in process memory
app.get('/login', (req, res) => {
  const user = await authenticateUser(req.body.email, req.body.password);
  req.session.userId = user.id;  // ← Stored in Node process memory
  req.session.roles = user.roles;
  res.send('Logged in');
});

app.get('/profile', (req, res) => {
  const userId = req.session.userId;  // ← Only exists if user hits same server
  // ...
});
```

**Problem:** If you have 2 servers and user logs in to server A, then hits server B, session is lost. Load balancer must use "sticky sessions" (always route user to same server), which defeats horizontal scaling.

**Stateless Service (Session in Redis):**

```javascript
// ✅ GOOD: Session stored in Redis (external)
app.get('/login', (req, res) => {
  const user = await authenticateUser(req.body.email, req.body.password);
  const sessionId = generateId();
  
  await redisClient.setex(
    `session:${sessionId}`,
    3600,  // 1 hour TTL
    JSON.stringify({ userId: user.id, roles: user.roles })
  );
  
  res.cookie('sessionId', sessionId);
  res.send('Logged in');
});

app.get('/profile', (req, res) => {
  const sessionId = req.cookies.sessionId;
  const session = await redisClient.get(`session:${sessionId}`);
  
  // ← Now works on ANY server; session is in Redis
  const userId = JSON.parse(session).userId;
  // ...
});
```

**Result:** Any server can handle any user request — true horizontal scalability.

### The Scaling Equation

```
System Capacity = (Requests per Server) × (Number of Servers)

If stateless: Linear growth
  100 req/sec × 1 server = 100 req/sec
  100 req/sec × 100 servers = 10,000 req/sec ✅

If stateful with sticky sessions: Sublinear (requests cluster on a few servers)
  100 req/sec × 1 server = 100 req/sec
  100 req/sec × 100 servers = ~500 req/sec (heavy users always hit same server) ❌
```

### Chief Architect Decision: When to Vertically Scale

Use vertical scaling **only in these cases:**
1. **Initial MVP** — simpler, proven to work
2. **Complex state** — data structure too large to distribute (huge ML model in memory)
3. **Extreme latency sensitivity** — remove network round-trips
4. **Licensing costs** — some enterprise software is licensed per core, not per instance

For 99% of systems, **start with horizontal design from day one**, even if day one is one server. It's easier to scale out from the beginning than retrofit later.

---

## 2.2 Load Balancers

### What a Load Balancer Does

```
                         Load Balancer
                              ↓
                    (Round-robin, Least Conn, IP Hash)
                         ↙     ↓     ↘
                        /      |      \
                    Server 1  Server 2  Server 3
                      ↙        ↓         ↘
                    10%        70%        20%
                  (healthy)  (healthy)   (degraded - higher latency)
```

**Core Functions:**
1. **Request routing** — distribute incoming traffic across backend servers
2. **Health checking** — detect failed servers, stop sending traffic to them
3. **Session persistence** — optionally route user to same server (sticky sessions)
4. **SSL termination** — decrypt HTTPS once at load balancer, reduce CPU on backends
5. **Request enrichment** — add headers (X-Forwarded-For, X-Forwarded-Proto)

### Layer 4 vs Layer 7

**Layer 4 (TCP/UDP Level) — LB works at network level:**

```
Packet: Source IP:Port → Destination IP:Port
LB does: destination IP:Port rewriting (NAT — Network Address Translation)

Client → LB (1.1.1.1:80) → LB rewrites → Backend (10.0.0.1:8080)
Response: Backend (10.0.0.1:8080) → LB → LB rewrites → Client (1.1.1.1:80)

LB cannot inspect: HTTP headers, request body, URL path
LB is fast: No deserialization, sub-microsecond latency
```

**Layer 7 (Application Level) — LB understands HTTP:**

```
LB can inspect: HTTP method, headers, URL path, request body
LB can route: GET /api/v1/* → server group A, POST /api/v2/* → server group B
LB can add/modify: Add authentication, compress response, rewrite URL
LB is slower: Must deserialize HTTP, 1-10ms latency
```

**Decision:**
- **Layer 4:** Ultra-high throughput (millions of req/sec), low latency sensitive, gaming, financial
- **Layer 7:** Standard web apps, API gateways, microservices, need routing intelligence

### Load Balancing Algorithms

| Algorithm | How It Works | Best For | Pitfall |
|-----------|------------|----------|---------|
| **Round-Robin** | Rotate through servers (1 → 2 → 3 → 1) | Uniform load | Doesn't account for server health/capacity |
| **Least Connections** | Route to server with fewest active connections | Long-lived connections (WebSocket) | Doesn't account for request cost (some are heavier) |
| **IP Hash** | hash(client_ip) % num_servers | Sticky sessions without cookie | Hot servers if many requests from same IP (data center) |
| **Weighted Round-Robin** | Server A gets 50%, B gets 30%, C gets 20% | Gradual rollout of new version | Requires manual weight tuning |
| **Least Response Time** | Route to server with lowest latency | Detecting degraded servers | Requires latency measurement overhead |
| **Consistent Hash** | Virtual ring; minimal remapping on server add/remove | Cache-aware load balancing | More complex to implement |

### Health Checks & Failover

```javascript
// LB checks each backend every 5 seconds
setInterval(async () => {
  for (const server of backendServers) {
    try {
      const response = await http.get(`http://${server.ip}:${server.port}/health`, {
        timeout: 2000
      });
      
      if (response.statusCode === 200) {
        server.healthy = true;
        server.consecutiveFailures = 0;
      } else {
        server.consecutiveFailures++;
      }
    } catch (error) {
      server.consecutiveFailures++;
    }
    
    // Mark unhealthy after 3 consecutive failures
    if (server.consecutiveFailures >= 3) {
      server.healthy = false;
      console.log(`Server ${server.ip} marked UNHEALTHY`);
    }
  }
  
  // Only route traffic to healthy servers
  healthyServers = backendServers.filter(s => s.healthy);
}, 5000);
```

**Health Check Best Practices:**
- Endpoint should be lightweight (no DB queries)
- Include dependency checks (can reach database? Can reach cache?)
- Return JSON with status, not just HTTP 200

### AWS ELB (Elastic Load Balancer) in Detail

**Network Load Balancer (NLB) — Layer 4:**
- Millions of requests per second
- Ultra-high performance (microseconds)
- Use for: Gaming, IoT, extreme throughput
- Pricing: Per LCU (Load Capacity Unit) × hours

**Application Load Balancer (ALB) — Layer 7:**
- Path-based routing: `/api/*` → API servers, `/images/*` → image servers
- Hostname-based routing: `api.example.com` → API servers, `dashboard.example.com` → dashboard servers
- Header-based routing: `X-Custom-Header: premium` → premium server pool
- Use for: Web apps, microservices, REST APIs
- Pricing: Per LCU × hours

**Classic Load Balancer (CLB) — Legacy, avoid**

### Chief Architect Pattern: Multi-Region Load Balancing

```
Global Users
    ↓
Route 53 (DNS)
    ├─ Latency-based routing
    ├─ User in Singapore → 1.1.1.1 (Singapore region ALB)
    └─ User in Frankfurt → 2.2.2.2 (Frankfurt region ALB)

Singapore ALB
    ├─ Server 1
    ├─ Server 2
    └─ Server 3

Frankfurt ALB
    ├─ Server 1
    ├─ Server 2
    └─ Server 3

Result: Users served from nearest region, sub-100ms latency
```

---

## 2.3 CDN (Content Delivery Network)

### How a CDN Works

```
Without CDN:
User in Tokyo → Request → AWS Virginia → Response (150ms latency)
User in London → Request → AWS Virginia → Response (120ms latency)

With CDN:
User in Tokyo → Request → CDN Tokyo Edge → Cache HIT → 10ms latency
User in London → Request → CDN London Edge → Cache HIT → 5ms latency

(If cache miss, CDN Tokyo fetches from origin Virginia, caches it)
```

### Static vs Dynamic Content

**CDN caches STATIC content:**
- Images, CSS, JavaScript, videos
- HTML pages (if not personalized)
- Headers: `Cache-Control: public, max-age=31536000` (1 year)
- Cache key: URL only

**CDN does NOT cache DYNAMIC content:**
- Personalized dashboards, user-specific data
- Real-time data, stock prices
- Large HTML pages with headers: `Cache-Control: private, no-cache`
- Cache key: URL + Cookie + Authorization header

### CDN Cache Behavior & Invalidation

**Scenario:** You deploy a new version of `app.js` (v2), but CDN is still serving v1.

**Solution 1: Version in URL**
```
Cloudfront host files as:
  app-v1.js (Cache-Control: max-age=1 year) — stays forever
  app-v2.js (Cache-Control: max-age=1 year) — new file
HTML points to app-v2.js
When you deploy: Upload new filename, update HTML
→ No cache invalidation needed, old content stays cached but unused
```

**Solution 2: Short TTL**
```
app.js (Cache-Control: max-age=3600) — 1 hour
Deploy new version: CDN serves old version for up to 1 hour
After 1 hour: Users fetch new version
→ Simple but users may see old version briefly
```

**Solution 3: Explicit Invalidation**
```
app.js (Cache-Control: max-age=1 year)
Deploy: Upload new version, call CloudFront invalidation API
CloudFront immediately purges cache for /app.js
→ All users immediately get new version
→ But invalidation API has costs and quota limits
```

**Best Practice:** Version in URL (Solution 1) + short TTL on HTML (5 minutes).

### CDN for Interactive Content (Edge Computing)

Modern CDNs do more than cache — they run code at the edge:

```javascript
// Cloudflare Workers — runs at every Cloudflare edge location globally
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Geo-blocking: Block traffic from certain countries
  const country = request.headers.get('cf-ipcountry');
  if (['CN', 'RU'].includes(country)) {
    return new Response('Access denied', { status: 403 });
  }
  
  // A/B testing: Route 10% to new version
  if (Math.random() < 0.1) {
    return fetch(request.url.replace('api.example.com', 'api-canary.example.com'));
  }
  
  // Security: Add CORS headers
  const response = await fetch(request);
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}
```

**Use Cases:**
- Geo-blocking, rate limiting at edge (stop attack traffic before it reaches origin)
- Dynamic content transformation (resize images, minify JS)
- A/B testing, feature flags
- Authentication (verify JWT at edge)

### CDN Architecture at Scale (EY Risk.ai Example)

**Deloitte client wants to deliver regulatory documents globally, 50GB total data:**

```
Origin (AWS us-east-1):
  └─ S3 bucket with documents
  └─ CloudFront distribution
      ├─ Edge location: Los Angeles
      ├─ Edge location: London
      ├─ Edge location: Singapore
      ├─ Edge location: Sydney
      └─ Regional cache (Tokyo) — if all edge caches miss

User in Tokyo:
  1. Requests document → Closest edge = Singapore edge
  2. Singapore edge doesn't have it → Fetch from regional cache
  3. Regional cache doesn't have it → Fetch from origin (us-east-1)
  4. Document cached at Singapore edge for 24 hours
  5. Next Tokyo user gets it immediately from Singapore (cache hit)
```

**Cache Hit Ratio:** ~90–95% for static content (documents, images)
**First-byte latency:** <100ms from any region

---

## 2.4 Auto Scaling

### Scaling Metrics & Alarms

**Common Metrics:**

| Metric | Trigger Scale-Out | Trigger Scale-In |
|--------|-------------------|------------------|
| CPU Utilization | > 70% | < 30% |
| Memory Usage | > 80% | < 40% |
| Network In/Out | > 1 Gbps | < 100 Mbps |
| Request Count | > 10K req/min | < 1K req/min |
| Queue Depth | > 1000 messages | < 100 messages |
| Custom (App-specific) | P99 latency > 500ms | P99 latency < 100ms |

### Auto Scaling Policies

**Target Tracking Scaling:**
```
AWS Auto Scaling targets: Keep CPU at 70%
  ├─ Current CPU: 40% → Scale in (fewer instances needed)
  ├─ Current CPU: 70% → Keep current count
  └─ Current CPU: 85% → Scale out (add instances)
```

**Step Scaling:**
```
Rules:
  - If CPU > 80% for 2 minutes: Add 4 instances
  - If CPU > 70% for 5 minutes: Add 2 instances
  - If CPU > 50% for 5 minutes: Add 1 instance
  - If CPU < 30% for 10 minutes: Remove 1 instance

More granular, but requires tuning
```

**Scheduled Scaling:**
```
Weekday 9 AM: Scale to 100 instances (peak business hours)
Weekday 6 PM: Scale to 20 instances
Weekend: Scale to 5 instances (minimal traffic)

Pre-emptive, no lag waiting for CPU to spike
```

### Auto Scaling Implementation (Node.js on AWS)

```javascript
const autoscaling = new AWS.AutoScaling();

// Create Auto Scaling Group
const params = {
  AutoScalingGroupName: 'api-servers',
  MinSize: 5,                      // Always keep at least 5
  MaxSize: 50,                     // Never exceed 50
  DesiredCapacity: 10,             // Start with 10
  AvailabilityZones: ['us-east-1a', 'us-east-1b'], // Spread across AZs
  LaunchTemplate: {
    LaunchTemplateId: 'lt-0123456789abcdef0',
    Version: '$Latest'              // Always use latest version
  },
  HealthCheckType: 'ELB',           // Trust ELB health checks
  HealthCheckGracePeriod: 300       // Wait 5 min before health check
};

autoscaling.createAutoScalingGroup(params);

// Create Target Tracking Policy (keep CPU at 70%)
const policyParams = {
  AutoScalingGroupName: 'api-servers',
  PolicyName: 'cpu-target-tracking',
  PolicyType: 'TargetTrackingScaling',
  TargetTrackingConfiguration: {
    TargetValue: 70.0,              // Target CPU %
    PredefinedMetricSpecification: {
      PredefinedMetricType: 'ASGAverageCPUUtilization'
    },
    ScaleOutCooldown: 60,            // Wait 1 min before next scale-out
    ScaleInCooldown: 300             // Wait 5 min before scale-in
  }
};

autoscaling.putScalingPolicy(policyParams);

// Result: Auto Scaling Group automatically adjusts instance count
// CPU spikes to 85% → add instances within 1 minute
// CPU drops to 30% → remove instances (but wait 5 minutes)
```

### Cooldown Periods: The Critical Parameter

**Scenario:** Traffic spike to 10,000 req/sec, CPU jumps to 90%.

**Without Cooldown:**
```
T=0: CPU 90% → Add 5 instances
T=1: CPU 85% (instances still starting) → Add 5 more
T=2: CPU 80% (instances still starting) → Add 5 more
T=3: CPU 75% (instances finally online) → Add 5 more
T=4: CPU 88% (all new instances finally routing traffic) → Add 5 more

Result: Add 25 instances for a spike that needed 10 → waste & cost 🔴
```

**With 60s Cooldown:**
```
T=0: CPU 90% → Add 5 instances, start 60s cooldown
T=30: CPU 85% → Still in cooldown, don't scale
T=60: Cooldown ends, CPU 75% (new instances helping) → No scale
Result: Add 5 instances, perfect match 🟢
```

**Chief Architect Tip:** ScaleInCooldown > ScaleOutCooldown. Scale out fast on traffic spike, scale in slowly. Fast scale-in can cause thrashing (scale in → CPU up → scale out → CPU down → repeat).

### Predictive Scaling (Machine Learning)

AWS uses ML to predict scale needs:

```
Historical patterns:
  ├─ Every Monday 9 AM, traffic 3x
  ├─ Every Friday 5 PM, traffic 2x
  ├─ Holiday season, traffic 5x
  └─ Black Friday, traffic 10x

ML model predicts: Next Monday 9 AM will have 3x traffic
→ Proactively scale 5 minutes before 9 AM
→ No lag, users don't experience slow response times
```

---

## ✅ Quick Revision Checklist — Scalability

- [ ] Can I explain why horizontal scaling needs stateless design (no session in memory)?
- [ ] Do I know the difference between Layer 4 and Layer 7 load balancers?
- [ ] Can I explain health checks and why they're critical for failover?
- [ ] Do I know three methods to handle cache invalidation in a CDN?
- [ ] Can I explain why cooldown periods matter for auto scaling?
- [ ] Can I describe a multi-region load balancing architecture (Route 53 + ALB)?
- [ ] Do I understand the difference between target tracking and step scaling?
- [ ] Can I explain why vertical scaling hits a ceiling but horizontal doesn't?

