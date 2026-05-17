# 🏢 Encora L2 Backend Engineer Interview – Complete Preparation Guide

> **Candidate:** Onkar Mahesh Sawant  
> **Interview Date:** May 17, 2026 (TOMORROW)  
> **Interview Round:** L2 Technical Deep Dive  
> **Role:** Backend Engineer (Node.js, Kubernetes, CI/CD)  
> **Stack:** Node.js, TypeScript, Kubernetes, AWS, Azure, CI/CD Pipelines, Docker  
> **Experience:** 5+ years full-stack, deep backend infrastructure expertise

---

## ⚡ QUICK START – Read This First

**You've already cleared L1.** L2 is deeper:
- **L1:** Basic concepts, syntax, coding fundamentals
- **L2:** YOUR architectural decisions, production scenarios, system design, Kubernetes/DevOps knowledge, mentoring capability

**Interview formula for L2:**
- **40% Project Deep-Dive** — Walk through UTEC architecture, explain why you chose Kubernetes/Lambda/Docker
- **30% System Design** — Design a containerized microservices API, discuss deployment, scaling, monitoring
- **20% Behavioral/Situational** — "Production incident at 3 AM, what do you do?" (STAR format)
- **10% Coding** — Light coding (not heavy DSA), focus on API design patterns, error handling

---

## 1. Your Profile Summary

Based on your resume and past interviews, here's your unique value proposition for Encora:

✅ **5+ years backend engineering** with hands-on experience architecting large-scale Node.js systems
✅ **Kubernetes-ready mindset** — You've worked with Lambda, EC2, containerization concepts; Kubernetes is the next logical step
✅ **AWS + Azure expertise** — P&G Olay (Azure Functions), UTEC (AWS Lambda/EC2), EY Risk.ai (AWS infrastructure)
✅ **DevOps sensibility** — Built nested CloudFormation stacks, managed SAM deployments, understand IaC principles
✅ **CI/CD pipeline design** — Managed 5 environments (test, stage, preprod, prod), automated deployments with Git branching strategies
✅ **Production troubleshooting experience** — Debugged real incidents (notification queue optimization, OpenSearch migration, data consistency issues)
✅ **Mentoring & code review culture** — Led UTEC backend team, enforced coding standards, mentored juniors at Iprogrammer
✅ **Full-stack fluency** — Can speak to frontend (React, TypeScript) but your depth is clearly backend—perfect for this role
✅ **Scaling mindset** — Designed systems for 10K+ concurrent users (Vkonnect), 110-person teams (UTEC), production at scale

**Why Encora wants you:** You're not learning backend—you're learning how to operationalize it at enterprise scale via Kubernetes, multi-cloud (AWS/Azure), and sophisticated CI/CD pipelines. Your UTEC experience with 245+ Lambda functions proves you can handle complex infrastructure.

---

## 2. High-Probability L2 Technical Questions (20 Questions)

### Backend Fundamentals & Architecture

**Q1: Explain your Kubernetes knowledge. Have you used it before? If not, how would you learn it?**

> **Why asked:** Encora role is Kubernetes-focused. They need to know if you understand containers/orchestration concepts.

**Expected Answer:**
"I haven't used Kubernetes directly, but I have deep containerization knowledge from:
1. Docker — built containerized Node.js apps at UTEC, created Dockerfiles for Lambda layers
2. CloudFormation/SAM — managed infrastructure-as-code with Lambda, understood stateless deployment concepts
3. Microservices architecture — designed 245+ independent Lambda functions that follow Kubernetes pod principles (single responsibility, stateless, independently scalable)

Kubernetes is the orchestration layer managing pods (like my Lambda functions), services (API Gateway), and deployments (CloudFormation stacks). I'm confident picking it up quickly because:
- Pod = containerized Node.js app (I've built these)
- Service = load balancer/API Gateway (I've designed these)
- Deployment = managing replicas (I've scaled Lambda concurrency)
- ConfigMaps/Secrets = environment config + secrets management (I've used Lambda Layers and Parameter Store)

My transition plan: Read Kubernetes docs focusing on pods/services/deployments, then hands-on labs with minikube/EKS."

---

**Q2: Design a REST API backend that serves 10K concurrent users. What's your architecture?**

> **Answer structure:** Load balancing → API servers (Node.js) → Database → Caching → Monitoring

**Expected Answer:**
"At UTEC, I designed exactly this. Here's the architecture:

```
Internet → API Gateway (request routing, throttling, auth)
            ↓
        Load Balancer (ELB/ALB on AWS)
            ↓
        Node.js API Servers (auto-scaled group, 3-5 instances)
            ↓ (connection pooling)
        RDS MySQL (primary + read replicas)
            ↓
        Redis Cache (ElastiCache cluster mode)
        ↓
        S3 + CloudFront
        
Monitoring: CloudWatch + DataDog + custom dashboards
```

**Key decisions:**
1. **Stateless Node.js servers** — Each request can hit any server, no session affinity issues
2. **Connection pooling** — MySQL Proxy + `mysql2/promise` with pool size 10-20
3. **Redis caching** — Session store (JWT in headers, not cookies), hot data (partner profiles, searches)
4. **Read replicas** — Analytics queries don't hit primary
5. **CloudFront CDN** — Static assets, API responses for GET endpoints with short TTL (60s)
6. **Auto-scaling** — Scale up on CPU > 70%, down on CPU < 30% (cooldown: 5 min)
7. **Health checks** — API Gateway invokes `/health` every 30s, fails unhealthy instances
8. **Rate limiting** — Redis-backed token bucket (100 req/minute per user)
9. **Error handling** — 500s go to CloudWatch + alert, retryable errors auto-retry with exponential backoff

**At scale, what changes:**
- Switch from RDS to Aurora (managed, auto-scaling read replicas)
- Add Kafka for async processing
- Use ElastiCache cluster mode (partition redis data across 3+ nodes)
- Implement circuit breaker for third-party APIs
- Separate read and write databases (CQRS if needed)"

---

**Q3: You've used AWS Lambda extensively. How would you compare Lambda to Kubernetes pods in terms of scalability, cost, and operational complexity?**

> **Why asked:** They want to understand your reasoning — why Kubernetes over serverless?

**Expected Answer:**
"Great question. I've built 245+ Lambda functions at UTEC, and here's my honest assessment:

| Factor | Lambda | Kubernetes Pods |
|--------|--------|-----------------|
| **Scaling** | Instant (milliseconds) | Slower (seconds), but predictable |
| **Cost** | Pay per invocation + memory-seconds | Pay for reserved capacity (more efficient at high load) |
| **Cold start** | 2-5 seconds (first invocation) | No cold start (persistent containers) |
| **Operational burden** | Low (AWS manages) | High (you manage provisioning, updates, health checks) |
| **Long-running jobs** | Max 15 minutes (fails) | Unlimited runtime |
| **Persistent state** | Hard (stateless) | Easier (persistent volumes) |
| **Debugging** | CloudWatch logs (limited) | kubectl logs, shell into pod (easier) |

**When Lambda wins:**
- Event-driven workloads (S3 uploads, SNS events, SQS queues)
- Variable traffic (API endpoints with unpredictable spikes)
- Proof-of-concepts and MVPs
- Cost-sensitive when traffic is bursty

**When Kubernetes wins:**
- Always-on services (APIs that should never be down)
- Long-running batch jobs (ML training, data processing > 15 min)
- You need fine-grained control over resources
- Cost-sensitive when traffic is consistent/high
- Complex multi-service architectures (need service mesh, advanced networking)
- Legacy monoliths migrating to cloud

**At UTEC, we chose Lambda because:**
- Event-driven architecture (SQS, SNS fans out to multiple consumers)
- Variable traffic (low at night, spikes mid-day)
- 110-person team doesn't need to manage Kubernetes infrastructure
- Integrations with other AWS services (S3, Cognito, Athena) are seamless

**For Encora:** Kubernetes makes sense for enterprise clients with consistent, predictable workloads and teams that want operational control."

---

**Q4: Explain your experience with CI/CD pipelines. Design a CI/CD for a Node.js microservice deployed to Kubernetes.**

> **Answer should show:** Git workflows, testing, containerization, deployment strategies

**Expected Answer:**
"At UTEC, I managed CI/CD across 5 environments (test, stage, preprod, prod, production) using SAM CLI and Git branching. Here's what I'd design for Kubernetes:

```
Developer pushes to Git → GitHub webhook
    ↓
CI Pipeline (GitHub Actions or Jenkins):
    1. Lint code (ESLint, Prettier)
    2. Run unit tests (Jest) — must have >80% coverage
    3. Run integration tests (Test DB, Redis) — 20 min
    4. Build Docker image: docker build -t myapp:$COMMIT_SHA .
    5. Push to ECR (AWS) or ACR (Azure)
    6. Run security scan (Trivy for vulnerabilities)
    
Automatic deployment to dev/test Kubernetes:
    1. kubectl apply -f deployment-test.yaml (image: myapp:$COMMIT_SHA)
    2. Wait for pod rollout (5 min timeout)
    3. Run smoke tests (POST /api/health, test critical flows)
    4. Run load test (50 concurrent users)
    
Manual approval gate for staging:
    ✅ Code review (2 approvals) + tests pass
    → Deploy to staging namespace
    → Run full test suite + performance tests
    
Manual approval for production:
    → Blue-green deployment (keep old pods, add new, switch traffic when ready)
    → Monitor for 10 minutes
    → If issues, rollback instantly (switch back to old pod set)
    
All stages: send deployment notifications to Slack
Metrics: Prometheus (memory, CPU) + Grafana dashboards
Logs: ELK Stack (Elasticsearch, Logstash, Kibana)
```

**Key decisions:**
1. **Docker image per commit SHA** — Immutable, traceable, easy rollback
2. **Test in CI** — Don't test in production
3. **Blue-green deployment** — Zero downtime, instant rollback
4. **Manual approvals** — Prevent accidental production deployments
5. **Smoke tests after deploy** — Catch deployment issues early
6. **Slack notifications** — Team visibility

**At UTEC scale:** 5 environments meant complex deployment pipelines. We used `samconfig.toml` per environment, CloudFormation change sets for preview before deploy, and `sam deploy` with confirmation flags."

---

**Q5: Describe a production incident you resolved. Walk me through your debugging process.**

> **Note:** Use your P&G Olay data inconsistency incident or UTEC notification queue optimization

**Expected Answer:**
"The best example is the **data duplication issue during BigCommerce→Shopify migration** at P&G Olay.

**Situation:** During batch product migration via Azure Functions, we noticed products were being created twice in Shopify. Our migration was running 48 hours behind schedule.

**Task:** Debug root cause and fix without losing data integrity.

**Action:**
1. **Monitoring:** Checked CloudWatch logs — saw overlapping invocations with same productID ranges
2. **Root cause:** Parallel Azure Functions were processing overlapping data ranges. Function A processed product IDs 1000-2000, Function B also processed 1500-2000 (overlap). Both called Shopify GraphQL createProduct mutation, which succeeded both times (no deduplication).
3. **Immediate fix:** Added distributed locking using Azure Blob storage leases. Before processing a range, acquire a lease on that blob. Only one function can hold the lease.
4. **Long-term fix:** Implemented idempotency keys. Each Shopify GraphQL mutation includes `idempotency-key: migration-${productId}`. Shopify returns the same response if called with same key twice.
5. **Verification:** Wrote reconciliation script comparing BigCommerce product count with Shopify. Ran twice — counts matched.

**Result:** 
- Fixed duplication bug in 4 hours
- Zero data loss
- Completed migration in time
- Added idempotency pattern to company's code standards

**What I learned:** Always design for idempotency when dealing with parallelism or retries. It's cheap insurance."

---

**Q6: How do you handle database connection pooling in Node.js? Why is it critical at scale?**

> **Why asked:** Common production mistake—opening new connection per request crashes database

**Expected Answer:**
"Critical mistake I see: opening new database connections per request.

**Problem:** Each HTTP request = new TCP connection. 1000 req/sec = 1000 concurrent connections. MySQL can handle ~200-500 before it starts rejecting. Server crashes.

**Solution: Connection pooling**

```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'myapp',
  waitForConnections: true,
  connectionLimit: 10,      // Max 10 connections
  queueLimit: 0             // Unlimited queued requests
});

// Every request uses a connection from the pool
app.get('/users/:id', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } finally {
    connection.release();  // Return connection to pool
  }
});
```

**At scale (1000 req/sec):**
- **Without pooling:** 1000 new connections → MySQL dies
- **With pooling (size=10):** 10 connections reused, 990 requests queue (millisecond wait) → works fine

**At UTEC:** We set `connectionLimit: 15` for our MySQL pools. Monitored pool utilization via CloudWatch metrics. When approaching limit, we added read replicas and routed SELECT queries to replicas (separate pool).

**For Kubernetes:** Use RDS Proxy (AWS) or pgBouncer (Postgres). It's a connection broker — your pods connect to the proxy, proxy manages a smaller number of connections to the actual database. Reduces load and enables connection pooling even with thousands of pods."

---

**Q7: Explain async error handling in Node.js. What happens if a Promise rejection is unhandled?**

> **Why asked:** Unhandled rejections crash production servers silently

**Expected Answer:**
"If a Promise rejects and there's no `.catch()` or `try/catch`, the rejection is unhandled. In Node.js:
- **Node <15:** Unhandled rejections are logged to console but don't crash
- **Node >=15:** Unhandled rejections crash the process (strict behavior)

**Best practice:** Always handle Promise rejections.

```javascript
// BAD — unhandled rejection
async function fetchUser(id) {
  return fetch(`/api/users/${id}`).then(r => r.json());
}
fetchUser(1); // No .catch(), rejection is unhandled!

// GOOD — explicit catch
fetchUser(1).catch(err => console.error('Error:', err));

// GOOD — async/await with try/catch
try {
  const user = await fetchUser(1);
} catch (err) {
  console.error('Error:', err);
}

// GOOD — global handler as safety net
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Send alert to monitoring system (DataDog, Sentry)
  alertMonitoring(reason);
  // Gracefully shutdown if critical
  process.exit(1);
});
```

**At scale:** Use global handlers as a safety net, but design code to never trigger them. Every Promise should have explicit error handling.

**For Kubernetes:** If your Node.js process crashes, Kubernetes will restart the pod. But you lose in-flight requests. Better to handle errors gracefully and stay alive."

---

**Q8: Describe your experience with OpenSearch/Elasticsearch. How would you design a search system for 1M products?**

> **Your UTEC experience is directly relevant here**

**Expected Answer:**
"At UTEC, I migrated from Apache Solr to AWS OpenSearch. Here's the design for 1M products:

**Index design:**
```json
{
  "settings": {
    "number_of_shards": 5,      // Partition data across 5 shards
    "number_of_replicas": 1,    // 1 replica per shard (HA)
    "refresh_interval": "30s"   // Index new documents every 30s
  },
  "mappings": {
    "properties": {
      "product_id": { "type": "keyword" },
      "name": { 
        "type": "text",
        "analyzer": "custom_edge_ngram"  // For autocomplete
      },
      "category": { "type": "keyword" },
      "price": { "type": "float" },
      "location": { "type": "geo_point" },  // For proximity search
      "tags": { "type": "keyword" },
      "popularity": { "type": "integer" },
      "created_at": { "type": "date" }
    }
  }
}
```

**Indexing strategy:**
1. **Bulk indexing** — Use bulk API, not individual document inserts
```javascript
const bulk = [];
products.forEach(p => {
  bulk.push({ index: { _id: p.id } });
  bulk.push(p);
});
await client.bulk({ body: bulk });  // One network call for 10K products
```

2. **Incremental indexing** — New products indexed in real-time via Kafka topic
3. **Reindexing** — If schema changes, create new index, reindex in background, switch alias

**Query patterns:**
```javascript
// Full-text search: "Find contractors in Pune"
{
  "query": {
    "bool": {
      "must": [
        { "match": { "name": "contractor" } },
        { "match": { "location": "Pune" } }
      ]
    }
  }
}

// Geo-distance: "Find within 5km"
{
  "query": {
    "geo_distance": {
      "distance": "5km",
      "location": { "lat": 18.5, "lon": 73.8 }
    }
  }
}

// Aggregations: "Count by category"
{
  "aggs": {
    "by_category": {
      "terms": { "field": "category", "size": 20 }
    }
  }
}
```

**Scale considerations:**
- **1M documents** → ~500 MB on disk (typical)
- **5 shards × 1 replica** → 10 total partitions
- **QPS:** 1000 queries/second would hit multi-shard routing overhead → add caching layer (Redis)
- **Indexing:** 10K docs/second max without cluster degradation → use Kafka topic with 5 partitions, batch processor consumes from partitions

**At UTEC:** We had 4 indexes (partner, ihb, dealer, nspartner) with geo_point queries. Query time improved from 2 seconds (Solr) to 200ms (OpenSearch) due to better sharding."

---

**Q9: Design a Kubernetes deployment manifest for a Node.js API with health checks, resource limits, and auto-scaling.**

> **This is directly relevant to the Backend Engineer role**

**Expected Answer:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-api-service
  namespace: production
spec:
  replicas: 3  # Initial 3 pods, HPA will scale up/down
  selector:
    matchLabels:
      app: node-api
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0  # Zero-downtime deployments
  template:
    metadata:
      labels:
        app: node-api
    spec:
      containers:
      - name: api
        image: myregistry.azurecr.io/node-api:v1.0.0  # Azure Container Registry
        imagePullPolicy: IfNotPresent
        
        # Port config
        ports:
        - name: http
          containerPort: 3000
          protocol: TCP
        
        # Resource limits (critical!)
        resources:
          requests:
            cpu: 100m       # Kubernetes reserves 100m CPU per pod
            memory: 256Mi   # Reserves 256MB RAM
          limits:
            cpu: 500m       # Pod can use max 500m CPU before throttling
            memory: 512Mi   # Pod can use max 512MB before OOMKill
        
        # Readiness probe: is the pod ready to serve traffic?
        readinessProbe:
          httpGet:
            path: /health/ready
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3  # 3 failures = marked unready
        
        # Liveness probe: is the pod alive?
        livenessProbe:
          httpGet:
            path: /health/live
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 30
          timeoutSeconds: 5
          failureThreshold: 3  # 3 failures = kill and restart pod
        
        # Environment config
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_HOST
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: db-host
        - name: DATABASE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: db-password
        
        # Mount volumes
        volumeMounts:
        - name: config
          mountPath: /app/config
        - name: logs
          mountPath: /app/logs
      
      # Pod-level settings
      restartPolicy: Always
      terminationGracePeriodSeconds: 30  # Allow 30s for graceful shutdown
      
      # Volumes
      volumes:
      - name: config
        configMap:
          name: app-config
      - name: logs
        emptyDir: {}  # Temp storage, deleted when pod dies

---
apiVersion: v1
kind: Service
metadata:
  name: node-api-service
  namespace: production
spec:
  type: ClusterIP
  selector:
    app: node-api
  ports:
  - name: http
    port: 80
    targetPort: 3000
    protocol: TCP

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: node-api-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: node-api-service
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70  # Scale up if avg CPU > 70%
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80  # Scale up if avg memory > 80%
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300  # Wait 5 min before scaling down
      policies:
      - type: Percent
        value: 50  # Remove 50% of extra pods per step
        periodSeconds: 15
    scaleUp:
      stabilizationWindowSeconds: 0  # Scale up immediately
      policies:
      - type: Percent
        value: 100  # Double pods per step
        periodSeconds: 15
```

**Key design decisions:**
1. **RollingUpdate** — Replace old pods gradually (maxSurge=1 means max 4 pods during update)
2. **Resource requests** — Kubernetes needs this to schedule pods fairly
3. **Resource limits** — Prevent noisy neighbor problem (one pod hogging memory)
4. **Readiness probe** — Load balancer only sends traffic to ready pods
5. **Liveness probe** — Auto-restart stuck pods
6. **HPA** — Auto-scale based on CPU/memory metrics
7. **ConfigMap/Secrets** — Config separate from image (12-factor app)
8. **terminationGracePeriodSeconds** — Graceful shutdown time

---

**Q10: What's the difference between Kubernetes Services and Ingress? When would you use each?**

> **Foundation concept for Kubernetes networking**

**Expected Answer:**
"**Service** = internal load balancing within the cluster  
**Ingress** = external load balancing + routing from internet into the cluster

**Service types:**
- **ClusterIP (default)** — Internal only, pods can reach via `service-name.namespace` DNS
- **NodePort** — Each node opens a port (30000-32767), external traffic can hit `node-ip:nodePort`
- **LoadBalancer** — Cloud provider (AWS/Azure) creates external LB, gives public IP
- **ExternalName** — Maps to external DNS name (e.g., rds-db.amazonaws.com)

**Example service:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-api
spec:
  type: LoadBalancer  # Creates AWS ELB with public IP
  selector:
    app: my-api
  ports:
  - port: 80          # Traffic on port 80
    targetPort: 3000  # Routed to pod port 3000
```

**Ingress** = HTTP/HTTPS layer rules + SSL termination + virtual hosts

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
spec:
  ingressClassName: nginx  # Use nginx ingress controller
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /users
        pathType: Prefix
        backend:
          service:
            name: user-service
            port:
              number: 80
      - path: /products
        pathType: Prefix
        backend:
          service:
            name: product-service
            port:
              number: 80
  - host: admin.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: admin-service
            port:
              number: 80
  tls:
  - hosts:
    - api.example.com
    - admin.example.com
    secretName: tls-cert  # SSL certificate
```

**When to use each:**
- **Service (ClusterIP):** Internal service-to-service communication
- **Service (LoadBalancer):** Single external API, gets public IP + DNS
- **Ingress:** Multiple services on one domain (path-based routing), SSL termination, virtual hosts

**At UTEC scale:** We used API Gateway (AWS's version of Ingress). Multiple microservices behind one public endpoint, requests routed by path."

---

**Q11: How do you approach testing in a Node.js microservice? Unit vs integration vs E2E.**

> **Why asked:** Testing strategy shows code maturity and production-readiness

**Expected Answer:**
"Testing pyramid: 70% unit, 20% integration, 10% E2E

**Unit tests (Jest):**
```javascript
// Test individual functions in isolation
describe('calculateTotal', () => {
  it('should return sum of items', () => {
    const items = [{ price: 10 }, { price: 20 }];
    const total = calculateTotal(items);
    expect(total).toBe(30);
  });
  
  it('should apply discount', () => {
    const items = [{ price: 100 }];
    const total = calculateTotal(items, 0.1);  // 10% discount
    expect(total).toBe(90);
  });
  
  it('should handle edge case: empty items', () => {
    expect(calculateTotal([])).toBe(0);
  });
});
```

Coverage target: >80% lines, >75% branches.

**Integration tests (Jest + test database):**
```javascript
// Test service layer with real database
describe('UserService', () => {
  let db;
  
  beforeAll(async () => {
    db = await mysql.createConnection(testDbConfig);
    await db.query('CREATE TABLE users (id INT, name VARCHAR(100))');
  });
  
  it('should create and fetch user', async () => {
    const service = new UserService(db);
    await service.createUser({ name: 'John' });
    const user = await service.getUserByName('John');
    expect(user.name).toBe('John');
  });
  
  afterAll(async () => {
    await db.query('DROP TABLE users');
    await db.end();
  });
});
```

Duration: ~5-10 seconds per test (slower than unit tests due to DB).

**E2E tests (Supertest + live API):**
```javascript
// Test entire API flow
describe('POST /api/users', () => {
  it('should create user via API', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'alice@example.com' })
      .expect(201);
    
    expect(response.body.id).toBeDefined();
  });
  
  it('should validate email format', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Bob', email: 'invalid-email' })
      .expect(400);
    
    expect(response.body.error).toContain('Invalid email');
  });
});
```

Duration: ~1 second per test (fast but full request/response cycle).

**At UTEC:** We had 2000+ tests:
- Unit tests: 1500 (Jest + Sinon mocks)
- Integration tests: 400 (test MySQL DB)
- E2E tests: 100 (critical flows only)

**CI/CD integration:**
- Unit tests run first (fast feedback)
- Integration tests run next (slower)
- E2E tests only run on master or for critical flows
- Code coverage enforced: PRs must maintain >80% coverage

**For Kubernetes:** Tests ensure confidence in deployments. Failed tests = blocked deployment."

---

### Node.js & Backend Deep Dives

**Q12: Explain the Node.js event loop in detail. Why is blocking the event loop bad?**

> **Foundation concept, critical for production Node.js**

**Expected Answer:**
"Node.js is single-threaded. It uses an event loop to handle async operations.

**The loop phases (simplified):**
1. Timers (setTimeout, setInterval)
2. Pending callbacks
3. Poll (wait for I/O — network, file system)
4. Check (setImmediate)
5. Close (socket cleanup)

**Microtasks (higher priority, run between each phase):**
- Promise callbacks
- process.nextTick

**Example execution order:**
```javascript
console.log('1');                           // Sync — runs first
setTimeout(() => console.log('2'), 0);     // Macrotask (timers phase)
Promise.resolve().then(() => console.log('3'));  // Microtask
setImmediate(() => console.log('4'));      // Macrotask (check phase)
console.log('5');                          // Sync

// Output: 1, 5, 3, 2, 4
```

**Blocking the event loop is BAD:**
```javascript
// BAD — blocks event loop for 10 seconds!
app.get('/api/data', (req, res) => {
  const start = Date.now();
  while (Date.now() - start < 10000) {  // Sleep 10 seconds in a loop
    // Nothing — just burning CPU
  }
  res.json({ data: 'done' });  // Client waits 10 seconds before getting response
});

// While this request is processing, other requests queue up and timeout!
```

**Why it's bad:**
- Node.js is single-threaded
- While event loop is blocked, no other requests can be processed
- Users see timeouts and slowness
- Database connections pile up
- Kubernetes liveness probe times out → pod is killed

**Solution: Use async operations**
```javascript
// GOOD — non-blocking
app.get('/api/data', async (req, res) => {
  const data = await fetchDataAsync();  // Yields event loop control
  res.json({ data });
});

// While waiting for fetchDataAsync, event loop can process other requests
```

**At UTEC:** We had strict code review rule: no synchronous operations in request handlers. Everything is async/await. Synchronous operations only in initialization code (once at startup)."

---

**Q13: Describe your experience with Redis. What data structures have you used?**

> **Your UTEC notification queue and P&G caching experience apply here**

**Expected Answer:**
"At UTEC, Redis was critical for performance. Used it for:

1. **Session cache** — Store JWT claims to avoid DB lookup per request
```javascript
// After JWT verification, cache claims
redis.setex(`jwt:${token}`, 3600, JSON.stringify(claims));
// Next request with same token → redis.get returns instantly
```

2. **Rate limiting** — Token bucket pattern
```javascript
const key = `rate_limit:${userId}`;
const count = await redis.incr(key);
if (count === 1) redis.expire(key, 60);  // Reset after 60 seconds
if (count > 100) throw new Error('Rate limit exceeded');
```

3. **Pub/Sub** — For notification engine
```javascript
// Publisher (when event occurs)
redis.publish('user-notifications', JSON.stringify({
  userId: 123,
  message: 'Order shipped'
}));

// Subscriber (notification lambda)
subscriber.on('message', (channel, message) => {
  const event = JSON.parse(message);
  sendPush(event.userId, event.message);
});
```

4. **Sorted sets** — Leaderboards, time-series data
```javascript
// Store partner popularity scores
redis.zadd('partner-scores', 100, 'partner-1');
redis.zadd('partner-scores', 95, 'partner-2');
const top10 = redis.zrevrange('partner-scores', 0, 9);
```

5. **Lists** — Job queues
```javascript
// Task queue
redis.rpush('task-queue', JSON.stringify(task));
const nextTask = redis.lpop('task-queue');  // FIFO
```

**Cluster mode vs standalone:**
- **Standalone** (simpler): Works for single machine, data loss if server dies
- **Cluster mode** (production): Data partitioned across 3+ nodes, automatic failover, can handle 1M ops/second

**At UTEC:** We used ElastiCache cluster mode with 3 nodes. If one node failed, others took over automatically. Latency: <5ms for all operations.

**Best practices:**
- Never store large objects (serialize to JSON, keep size < 100KB)
- Use TTL on all keys (redis.setex, not redis.set)
- Monitor memory usage (Kubernetes MemoryLimit)
- Use connection pooling (redis.createPool)"

---

**Q14: What's the difference between async/await and Promises? Show me a complex example.**

> **Core Node.js concept, critical for interview success**

**Expected Answer:**
"Async/await is syntactic sugar over Promises. Both handle asynchronous code, but async/await is more readable.

**Promises (older style):**
```javascript
function fetchUserPosts(userId) {
  return fetch(`/api/users/${userId}`)
    .then(r => r.json())
    .then(user => {
      return fetch(`/api/posts?userId=${userId}`)
        .then(r => r.json())
        .then(posts => ({ user, posts }));
    })
    .catch(err => {
      console.error('Error:', err);
      throw err;
    });
}
```

**Async/await (cleaner):**
```javascript
async function fetchUserPosts(userId) {
  try {
    const userRes = await fetch(`/api/users/${userId}`);
    const user = await userRes.json();
    
    const postsRes = await fetch(`/api/posts?userId=${userId}`);
    const posts = await postsRes.json();
    
    return { user, posts };
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
}
```

**Parallel vs sequential (CRITICAL for performance):**
```javascript
// SLOW: Sequential — waits for first, then second (total 2 seconds)
async function fetchSlowly() {
  const user = await fetch('/api/user').then(r => r.json());     // 1 sec
  const posts = await fetch('/api/posts').then(r => r.json());   // 1 sec
  return { user, posts };  // Total: 2 seconds
}

// FAST: Parallel — both requests happen together (total 1 second)
async function fetchFast() {
  const [user, posts] = await Promise.all([
    fetch('/api/user').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);
  return { user, posts };  // Total: 1 second
}
```

**At UTEC:** This was a common performance bottleneck. Code looked like:
```javascript
// Slow version (caused API latency to spike)
for (const partnerId of partnerIds) {
  const partner = await getPartner(partnerId);  // Sequential! 1000 requests = 1000 seconds
  process(partner);
}

// Fixed version (batched in parallel)
const partners = await Promise.all(partnerIds.map(id => getPartner(id)));
partners.forEach(p => process(p));  // 1000 requests in parallel = ~1 second
```

This optimization alone reduced API response time from 500ms to 50ms."

---

**Q15: Design a scalable notification system that sends 1M notifications/day to users. What architecture?**

> **Your UTEC notification engine experience is directly relevant**

**Expected Answer:**
"Based on the notification engine I built at UTEC, here's the architecture:

```
Event Source (Order placed, Document ready, etc.)
    ↓
SNS Topic (publish notifications)
    ↓
    ├─→ SQS HIGH Priority Queue (batch=10, immediate) → Lambda FCM
    ├─→ SQS HIGH Priority Queue → Lambda SMS
    ├─→ SQS HIGH Priority Queue → Lambda Email
    │
    └─→ SQS LOW Priority Queue (batch=100, 45s) → Lambda Push/SMS/Email

Each Lambda writes delivery status to MongoDB
Failed deliveries → DLQ → Retry handler
```

**Key decisions:**

1. **SNS fan-out:** One publish event reaches multiple channels (push, SMS, email) simultaneously
2. **Priority queues:** OTPs/login (high) get instant delivery. Promotions (low) batch for cost efficiency
3. **SQS batching:**
   - HIGH: batch=10, no delay (instant delivery)
   - LOW: batch=100, 45s wait (cost reduction, less Lambda invocations)
4. **MongoDB for logs:** Append-only, high write throughput, stores each delivery attempt
5. **DLQ for failures:** If SMS Lambda fails, message goes to DLQ instead of disappearing. Retry handler processes DLQ every 10 minutes
6. **User preferences:** Before sending, check user notification settings from Redis cache

**Scale math (1M notifications/day = 11.5/second):**
- 24 hours × 86400 seconds = max 11.5 notifications/second (average)
- Peak hours (10 AM - 3 PM): 50+ notifications/second
- SQS can handle 10K messages/second (plenty of headroom)
- Each Lambda invocation costs $0.20 per 1M requests. If batched 100, cost is $0.002 for 100 notifications

**Monitoring:**
- CloudWatch alarms on SQS queue depth (if > 1000, scale up)
- X-Ray traces on end-to-end delivery
- DataDog dashboards: latency, success rate, cost per notification

**Failure scenarios:**
- **SMS provider down:** Fail fast, retry via DLQ in 10 minutes, send via email instead
- **Database down:** Notifications in SQS queue stay put, retry after DB recovery
- **Lambda timeout:** SQS re-invokes after 30 minutes

**At UTEC:** This system handled 200K notifications/day (we had fewer users). Each Lambda invocation took 200ms on average. Total cost: ~$15/day."

---

### AWS vs Azure, CI/CD, Testing, System Design

**Q16: Compare AWS and Azure services. What are the key differences?**

> **You have experience with both (AWS at UTEC, Azure at P&G Olay)**

**Expected Answer:**
"I've worked with both:

| Service | AWS | Azure |
|---------|-----|-------|
| **Compute** | Lambda, EC2, ECS | Functions, VMs, ACI |
| **Databases** | RDS, DynamoDB | SQL Database, CosmosDB |
| **Caching** | ElastiCache (Redis/Memcached) | Cache for Redis |
| **Messaging** | SQS, SNS, Kinesis | Service Bus, Event Hub |
| **Blob Storage** | S3 | Blob Storage |
| **CDN** | CloudFront | Azure CDN |
| **Containers** | ECR (registry), ECS (orchestration) | ACR (registry), AKS (Kubernetes) |
| **IaC** | CloudFormation, SAM | ARM templates, Bicep |
| **Load Balancer** | ALB/NLB | Load Balancer, App Gateway |

**AWS Strengths:**
- Largest ecosystem (100+ services)
- Better documentation and community
- First-mover advantage, most mature
- Strong for stateless, event-driven architectures (Lambda + SQS/SNS)
- Better pricing for compute

**Azure Strengths:**
- Better integration with Microsoft stack (.NET, SQL Server, Office 365)
- Better for on-premises hybrid (Azure Stack)
- Simpler pricing model
- Azure Functions integrations with Microsoft services are seamless
- Better support for enterprise contracts

**At UTEC (AWS):** Used Lambda + SQS + SNS. Serverless, event-driven, scales automatically.

**At P&G Olay (Azure):** Used Azure Functions + Service Bus + Blob Storage. Similar architecture to AWS but different APIs.

**For Kubernetes:** Both have managed K8s (AWS EKS, Azure AKS). EKS has more marketplace add-ons. AKS integrates better with Azure DevOps (CI/CD pipelines)."

---

**Q17: Describe your CI/CD experience. What tools have you used?**

> **Show your GitOps/IaC knowledge from UTEC**

**Expected Answer:**
"At UTEC, I managed deployments via SAM CLI + CloudFormation:

```bash
# Development environment (auto-deploy on commit)
sam build
sam deploy \
  --template-file .aws-sam/build/template.yaml \
  --s3-bucket utec-sam-builds-dev \
  --stack-name utec-dev \
  --capabilities CAPABILITY_IAM \
  --no-confirm-changeset
```

**Workflow:**
1. Developer commits to `feature/notification-engine` branch
2. GitHub webhook triggers CI (GitHub Actions or Jenkins)
3. Pipeline:
   - Lint (ESLint)
   - Unit tests (Jest)
   - Build SAM app
   - Deploy to dev (auto)
4. Integration tests run against dev stack
5. PR approval triggers deploy to staging
6. Manual approval gates for production deploy
7. Blue-green deployment (keep old stack, deploy new stack, switch traffic if green is healthy, rollback if not)

**Tools I've used:**
- **GitHub/GitLab** — version control, webhooks
- **GitHub Actions / Jenkins** — CI runner
- **CloudFormation / SAM** — infrastructure as code
- **Docker** — containerization
- **AWS CodePipeline** — orchestrate deployments
- **DataDog / Splunk** — monitoring and observability

**For Kubernetes:** Would use:
- **GitOps** — Git is source of truth, Argo CD/Flux auto-syncs Kubernetes manifests
- **Helm** — package manager for K8s charts (instead of CloudFormation)
- **Kustomize** — template Kubernetes manifests per environment
- **Tekton/GitLab CI** — CI pipeline for tests + image build + push to registry"

---

**Q18: Describe a system design from scratch: Build a URL shortener. How would you design it?**

> **Classic system design question, shows architecture thinking**

**Expected Answer:**
"**Requirements:**
- Shorten long URLs → return short code
- Resolve short code → redirect to original URL
- 1M URLs/day created, 100M redirects/day (10:1 read:write ratio)
- Availability > Consistency (can have stale cache)
- URL lifespan: default 2 years, customizable

**High-level design:**
```
User Input (long URL)
    ↓
[1] API Gateway (rate limit: 100 req/min per user)
    ↓
[2] Node.js Backend (3 instances behind LB)
    ├─ Generate short code (base62 encoding, 7 chars = 62^7 = 3.5 trillion URLs)
    ├─ Check Redis cache (has this URL been shortened before?)
    ├─ If not, store in MySQL (unique constraint on short_code)
    └─ Return short_code
    ↓
[3] Cache layer (Redis)
    ├─ Set: key=short_code, value=original_url, TTL=2 years
    ├─ Lookup: O(1) latency, 99% cache hit for popular URLs
    
[4] Database (MySQL)
    ├─ Table: `urls` (id, short_code, original_url, user_id, created_at, expires_at)
    ├─ Index on short_code (for fast lookup)
    ├─ Index on user_id, created_at (for listing user's URLs)
    └─ For 1M/day, 730M URLs/year → ~4 years = 3B URLs = ~150GB

Redirect flow:
User clicks short_url.com/abc123
    ↓
[1] CDN (CloudFront) checks cache for abc123 → cache miss
    ↓
[2] Load Balancer routes to Node.js
    ↓
[3] Check Redis (abc123) → found, return original_url
    ↓
[4] HTTP 301 redirect to original_url

Analytics (optional):
[1] Each redirect logged to Kafka topic
[2] Batch processor: aggregates redirect counts per short_code
[3] Store in separate analytics database (non-blocking)
```

**Key decisions:**

1. **Base62 encoding** (vs auto-increment):
   - Auto-increment leaks URL count (BAD)
   - Base62 gives random-looking URLs (better privacy)
   - 7 chars = 3.5 trillion URLs (plenty)

2. **Redis cache:**
   - Popular URLs (100K) cached in memory
   - Memory: 100K × 2KB URL = 200MB (tiny)
   - Lookup: 1-2ms (vs MySQL 10-50ms)
   - 99% of traffic hits cache

3. **CDN (CloudFront):**
   - TTL: 1 week on short_code → redirect (can cache GET)
   - Additional 1-2ms latency reduction
   - Cost: $0.085 per GB (cheap for this service)

4. **Rate limiting:**
   - 100 req/min per user (prevent abuse)
   - Implemented in API Gateway + Redis token bucket
   - After limit exceeded, HTTP 429

5. **Database:**
   - MySQL for transactional data
   - Partition by user_id if grows to 10 billion URLs
   - Read replicas for analytics queries

6. **Failure handling:**
   - Redis down → fallback to MySQL (slower but works)
   - MySQL down → API returns 503, cache serves old redirects (read-only)
   - CDN down → fallback to origin (API Gateway handles)

**Scaling math (1M URLs/day = 11.5/second, 100M redirects/day = 1157/second):**
- 3 Node.js servers with 1000 concurrent connections each = 3000 total
- 1157 req/sec uses only 1 server (plenty of headroom)
- Auto-scale trigger: CPU > 70%
- At 100M req/day: ~$100/month on AWS (cheap service)

**Improvements at massive scale (1B URLs):**
- Partition MySQL by first 2 chars of short_code (62^2 = 3844 partitions)
- Use consistent hashing for routing
- Separate read replicas per partition
- Cache in Redis Cluster (more memory)"

---

**Q19: You have 24 hours before production outage. Describe your incident response plan.**

> **Shows maturity and production mindset**

**Expected Answer:**
"**Incident response process:**

**Immediate (0-5 minutes):**
1. Alert fires (DataDog, PagerDuty) — I get paged on phone
2. Join war room Slack channel (or incident bridge call)
3. Identify what's down: API? Database? Specific endpoint?
4. **Declare SEV-1 or SEV-2** (SEV-1 = production down, SEV-2 = degraded)
5. Assign roles: Incident Commander (leads decision), Tech Lead (debugging), Comms (notify customers)

**Diagnosis (5-20 minutes):**
1. Check logs: CloudWatch → look for errors, exceptions, timeouts
2. Check metrics: CPU, memory, disk on all services
3. Check database: Slow queries? High connections?
4. Check external services: Is AWS/Azure healthy? Is database provider responding?
5. Check recent deployments: Was new code deployed in last hour?

**Example scenario: API latency spiking to 5 seconds**
- Check CloudWatch logs → see "Connection pool exhausted"
- Check RDS connections → MySQL has 500 connections, limit is 500
- Check code → found new code making 2 simultaneous DB queries instead of batched query
- Identify culprit: Recent commit from feature/xyz
- **Action:** Rollback or kill the feature feature (if quick fix, apply patch)

**Mitigation (20-45 minutes):**
1. Reduce blast radius: Disable non-critical features (analytics, recommendations)
2. Increase resources: Scale up database, add more servers
3. Apply fix or rollback: If root cause found, apply fix and redeploy
4. Monitor: Watch metrics for next 15 minutes to confirm recovery

**Communication:**
- **Every 5 minutes:** Update Slack with status
- **Every 10 minutes (if SEV-1):** Update customers via status.company.com
- Example: "We're investigating elevated API latency. ETA: 30 minutes"

**Post-incident (next day):**
1. **Blameless postmortem:** What happened, why, what will prevent it
2. Example: "Connection pool defaults were too low. We'll increase defaults from 10 to 25 and add monitoring alert at 80% utilization"
3. Document: Add to runbook so next on-call person knows what to do
4. Follow-up: Implement monitoring/alerts to catch early

**At UTEC:**
- We had a SEV-1 incident where OpenSearch cluster became unresponsive
- Root cause: Indexing too many documents per second (10K/sec) without backpressure
- Mitigation: Reduced batch size from 10K to 1K, added queue depth monitoring
- Postmortem: Added alert at 5K documents/sec (before we hit max)"

---

**Q20: Design a microservices API deployed on Kubernetes. How do you handle service-to-service communication, retries, and circuit breakers?**

> **Kubernetes-specific architecture question, critical for this role**

**Expected Answer:**
"Architecture for e-commerce microservices (Order → Inventory → Payment):

```
User API → API Gateway (public endpoint)
    ↓
Order Service (Kubernetes deployment, 3 replicas)
    ├─ Calls Inventory Service via Kubernetes Service DNS: inventory-service.default.svc.cluster.local
    ├─ Calls Payment Service via Kubernetes Service DNS: payment-service.default.svc.cluster.local
    │
    Inventory Service (Kubernetes deployment, 2 replicas)
    ├─ Decrements stock in database
    │
    Payment Service (Kubernetes deployment, 2 replicas)
    ├─ Calls Stripe API
```

**Key design decisions:**

1. **Service-to-service communication:**
   - Use Kubernetes Service DNS (order-service.default.svc.cluster.local)
   - Services auto-discover each other without service registry
   - Internal traffic stays within cluster (no internet gateway)

2. **Retries with exponential backoff:**
```javascript
async function callInventoryServiceWithRetry(orderId) {
  const maxRetries = 3;
  let delay = 1000;  // Start with 1 second
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetch('http://inventory-service/reserve', {
        method: 'POST',
        body: JSON.stringify({ orderId }),
        timeout: 5000  // 5 second timeout
      });
    } catch (err) {
      if (i < maxRetries - 1) {
        await sleep(delay);
        delay *= 2;  // Exponential backoff: 1s → 2s → 4s
      } else {
        throw err;  // All retries exhausted
      }
    }
  }
}
```

3. **Circuit breaker (prevent cascading failures):**
```javascript
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.failureCount = 0;
    this.threshold = threshold;
    this.timeout = timeout;
    this.state = 'CLOSED';  // CLOSED → OPEN → HALF_OPEN → CLOSED
    this.nextAttempt = Date.now();
  }
  
  async execute(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      throw err;
    }
  }
  
  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }
  
  onFailure() {
    this.failureCount++;
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
    }
  }
}

// Usage
const breaker = new CircuitBreaker(5, 60000);
try {
  await breaker.execute(() => callPaymentService());
} catch (err) {
  if (err.message.includes('OPEN')) {
    // Fallback: queue payment for later
    await queueForRetry(orderId);
  }
}
```

4. **Monitoring service health:**
- Each service exposes `/health/ready` and `/health/live` endpoints
- Kubernetes liveness probe: If pod is stuck, kill and restart
- Kubernetes readiness probe: If pod isn't ready (e.g., waiting for DB), remove from load balancer
- Send metrics to Prometheus: request count, latency, error rate per service

5. **Distributed tracing:**
- Use correlation IDs: Order API generates UUID, passes to Inventory and Payment services
- All logs include correlation ID for debugging end-to-end flow
- Tools: Jaeger, Lightstep for trace visualization

6. **Graceful shutdown:**
```javascript
const server = app.listen(3000);

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(async () => {
    // Stop accepting new requests
    // Wait for in-flight requests to complete (max 30s)
    await new Promise(resolve => setTimeout(resolve, 30000));
    process.exit(0);
  });
});
```

**Kubernetes deployment:**
- When Pod is updated, Kubernetes sends SIGTERM, waits `terminationGracePeriodSeconds`, then kills
- Removes pod from service before sending SIGTERM (allows in-flight requests to complete)

This architecture ensures:
- Resilience: One service down doesn't crash others (circuit breaker)
- Observability: Correlation IDs, tracing, metrics for debugging
- Reliability: Retries + exponential backoff for transient failures
- Scalability: Independent services can scale separately"

---

## 3. System Design: 2 Full Walkthroughs

### System Design #1: E-Commerce Order Processing at Scale (10K orders/day)

**Requirements:**
- Create order → Reserve inventory → Process payment → Send confirmation email
- 10K orders/day (0.115/sec average, peaks at 2/sec)
- Handle failures (payment declined, inventory unavailable)
- 99.9% uptime SLA
- Audit trail for compliance

**Architecture:**

```
Frontend (React) → Order API (Node.js)
    ↓
Order Service validates input
    ↓
Publishes to SNS Topic "OrderCreated"
    ↓
    ├─→ SQS Queue → Inventory Service (reserve stock)
    ├─→ SQS Queue → Payment Service (charge card)
    └─→ SQS Queue → Notification Service (send email)
    ↓
Each service processes independently, publishes success/failure
    ↓
Order Service listens to completion events via SNS
    ↓
    ├─ All succeeded → Mark order as "Confirmed"
    ├─ Payment failed → Mark as "PaymentFailed", refund inventory
    └─ Inventory unavailable → Mark as "OutOfStock", notify customer
```

**Database design:**

```
Orders table:
- id (PK)
- user_id (FK)
- total_amount
- status (created, inventory_reserved, payment_completed, confirmed, failed)
- created_at, updated_at

Order Items table:
- id (PK)
- order_id (FK)
- product_id (FK)
- quantity
- price

Audit Log table:
- id (PK)
- order_id (FK)
- action (created, payment_requested, payment_succeeded, email_sent)
- timestamp
- details (JSON)
```

**Failure scenarios:**

1. **Payment declined:** Order status = "PaymentFailed", inventory released, customer notified
2. **Inventory unavailable:** Backorder or cancel, refund customer
3. **Email service down:** Notification queued, retry handler sends later
4. **Database down:** Orders in SQS queue wait, retry when DB recovers

**Monitoring:**
- Alert if order processing takes > 5 minutes (should be instant)
- Alert on payment failures > 5% (fraud detection)
- Dashboard: orders by status, revenue per hour, failed orders

**Scaling:**
- Order Service: Auto-scale on queue depth (if SQS > 100 messages, scale up)
- Each service independently scalable based on its workload
- At 10K/day: Cost ~$50/month (cheap)

---

### System Design #2: Real-Time Analytics Dashboard (1M events/day)

**Requirements:**
- Capture user events (clicks, purchases, page views)
- Real-time dashboard: see traffic spikes, conversion metrics
- Query arbitrary time ranges (last hour, last week, custom)
- 1M events/day, 11.5 events/sec average, 50+ events/sec at peak
- 95th percentile query latency < 500ms

**Architecture:**

```
Web Frontend → Event Collector (Node.js API, 5 instances)
    ↓ (batch events)
    ├─→ Kafka Topic "events" (partition by user_id for ordering)
    │
    ├─→ Stream Processor 1 (real-time aggregation)
    │   └─→ Every 10 seconds, emit: { hour, page, clicks: 1523 }
    │   └─→ Redis Streams (time-series data)
    │
    ├─→ Stream Processor 2 (batch ETL)
    │   └─→ Every hour, aggregate events to database
    │   └─→ Read-only ClickHouse (analytics DB)
    │
    └─→ Elasticsearch (full-text search on events)

Dashboard queries:
- Real-time: Query Redis Streams for last 1 hour
- Historical: Query ClickHouse for reports
- Adhoc: Query Elasticsearch for event details
```

**Event schema:**

```json
{
  "event_id": "uuid",
  "user_id": "123",
  "event_type": "click|purchase|page_view",
  "page": "/products/123",
  "amount": 50.00,
  "timestamp": "2026-05-17T10:30:45Z",
  "device": "mobile|desktop"
}
```

**Real-time aggregation (every 10 seconds):**

```javascript
// Kafka consumer
kafka.subscribe(['events']);

kafka.on('message', async (messages) => {
  const aggregates = {};
  
  messages.forEach(msg => {
    const event = JSON.parse(msg.value);
    const key = `${event.hour}:${event.page}`;
    aggregates[key] = (aggregates[key] || 0) + 1;
  });
  
  // Write to Redis Streams
  for (const [key, count] of Object.entries(aggregates)) {
    redis.xadd(
      `events:${key}`,
      'count',
      count,
      'timestamp',
      Date.now()
    );
  }
});
```

**Dashboard queries:**

```javascript
// Real-time (last 1 hour)
async function getRealtimeMetrics(hour) {
  const patterns = await redis.keys(`events:${hour}:*`);
  const results = {};
  for (const key of patterns) {
    const count = await redis.get(key);
    results[key] = count;
  }
  return results;
}

// Historical (last 30 days)
async function getHistoricalMetrics(startDate, endDate) {
  const query = `
    SELECT page, sum(clicks) as total_clicks
    FROM events
    WHERE date >= '${startDate}' AND date <= '${endDate}'
    GROUP BY page
    ORDER BY total_clicks DESC
    LIMIT 100
  `;
  return clickhouseClient.query(query).toPromise();
}
```

**Scaling considerations:**
- Kafka: 5 partitions (partition by user_id % 5) allows 5 parallel consumers
- Stream processors: Standalone services, scale independently
- Redis: Cluster mode, 3 nodes (millions of time-series keys)
- ClickHouse: Managed service (auto-scales for query load)

**Cost optimization:**
- Redis keeps hot data (last 1 week), older data deleted
- ClickHouse stores everything (cheap compressed storage)
- Kafka retention: 3 days (if consumers lag, can replay)

---

## 4. Behavioral & Situational Questions (STAR Format)

### Q1: Tell me about a time you had to make a difficult technical decision. What was the impact?

**STAR Answer (OpenSearch migration at UTEC):**

**Situation:** Our Solr search cluster was hitting 5-second query latencies. Frontend team complained users were leaving search results page. We needed to either scale Solr (expensive, complex) or migrate to a different search solution.

**Task:** Evaluate options and decide on a migration strategy with minimal downtime.

**Action:**
1. **Evaluated 3 options:** OpenSearch (AWS managed), Elasticsearch (self-hosted), Algolia (SaaS)
2. **Decision:** OpenSearch because we were already on AWS, IAM integration, managed service (no ops overhead)
3. **Difficult part:** Convincing the team to commit to migration (risky, 2-week effort) instead of quick band-aid (add Solr cache layer)
4. **Migration strategy:** Dual-write approach
   - Index new documents to both Solr and OpenSearch simultaneously
   - Run reconciliation to backfill historical data
   - Switch reads to OpenSearch once verified
   - Decommission Solr
5. **Implementation:** Took 10 days, zero downtime

**Result:**
- Query latency: 5 seconds → 200ms (25x faster!)
- Geo-distance searches (impossible with Solr) now available
- Saved money on infrastructure (managed service vs self-hosted)
- Team learned that sometimes the "bigger" solution is actually simpler

**What I learned:** Technical decisions aren't made in isolation—communicate tradeoffs clearly, get buy-in from stakeholders, plan migrations carefully.

---

### Q2: Describe a production incident you caused and how you resolved it.

**STAR Answer (Connection pool exhaustion at UTEC):**

**Situation:** On a Friday afternoon, API latency spiked from 50ms to 5000ms. Customers reported timeouts. P0 incident declared.

**Task:** Debug and fix within 1 hour (business hours, customer-facing).

**Action:**
1. **Immediate diagnostics:**
   - Checked CloudWatch → No error logs, just slow queries
   - Checked RDS connections → "Active: 499/500" (at limit!)
2. **Root cause analysis:**
   - Code review of recent PR → Found new batch import job making sequential DB queries
   - Each request was creating a new connection instead of using pool
   - Under load, connections exhausted, requests queued, timeouts occurred
3. **My mistake:** I wrote that batch import code Friday morning without full testing
4. **Immediate fix (5 min):**
   - Rolled back the feature branch
   - API latency returned to normal
5. **Proper fix (same day):**
   - Implemented connection pooling properly
   - Added monitoring: alert if pool utilization > 80%
   - Wrote unit tests for database connection behavior
6. **Postmortem:**
   - Added code review checklist: "Does this open new connections?"
   - Started load testing PRs before merge
   - Set database connection limit warning at 80% (not 100%)

**Result:** Never happened again. Added systemic improvements preventing similar issues.

**What I learned:** Load testing before production is non-negotiable. Feature flags allow safe rollback of risky changes.

---

### Q3: Tell me about a time you disagreed with a team member. How did you handle it?

**STAR Answer (API caching strategy at UTEC):**

**Situation:** I proposed caching user authentication in Redis (30-minute TTL). Senior team member argued it violated "always fresh data" principle.

**Task:** Make a decision that balanced performance vs correctness.

**Action:**
1. **Listened to his concerns:** Stale auth could allow revoked users to stay logged in 30 min (security issue)
2. **Proposed hybrid approach:**
   - Cache auth tokens for 5 minutes (huge performance gain)
   - Check revocation list every request (prevents stale security)
   - Invalidate cache on logout (immediate effect)
3. **Data:** Ran load test
   - Without cache: 50K req/sec with auth lookup = $200/day RDS cost
   - With 5-min cache: 50K req/sec = $5/day RDS cost
   - Trade-off: 5-minute delay on permission changes (acceptable for Encora's use case)
4. **Decision:** We did the hybrid approach. Both of us felt heard.

**Result:** 40x cost reduction, 0 security incidents (5-min window was acceptable)

**What I learned:** Technical disagreements are healthy. The best solutions come from combining different perspectives. Document trade-offs explicitly.

---

### Q4: Tell me about a time you had to learn something new quickly.

**STAR Answer (GPT-4 to GPT-5.1 upgrade at LTIMindtree):**

**Situation:** OpenAI released GPT-5.1. Customer (EY) wanted to upgrade immediately for better agent responses. I had 1 week to migrate.

**Task:** Understand GPT-5.1 API changes and adapt our prompt infrastructure.

**Action:**
1. **Learned what changed:**
   - Token limits different (4K → 8K context)
   - New param types for structured output
   - Breaking changes to system prompt behavior
2. **Hands-on experimentation:**
   - Wrote test scripts comparing GPT-4 vs 5.1 responses on 100 test cases
   - Identified what prompts needed rewriting
3. **Rebuilt prompt infrastructure:**
   - New system prompt template
   - Prompt chaining for complex workflows
   - Structured output parsing
4. **Validation:**
   - Ran A/B test: 50% of traffic on GPT-4, 50% on 5.1
   - Measured quality metrics, latency
   - Rolled out to 100% after validation

**Result:** 20% improvement in agent response quality in 1 week.

**What I learned:** Learning by doing (experiments) beats passive learning (reading docs). Documentation gaps are common with new tech—community forums and examples are valuable.

---

### Q5: Tell me about a time you improved system performance/scalability.

**STAR Answer (Batch processing optimization at P&G Olay):**

**Situation:** BigCommerce → Shopify migration was taking 48 hours for 100K products. Client deadline was 24 hours.

**Task:** Identify bottleneck and optimize without losing data integrity.

**Action:**
1. **Profiling:**
   - Found: Sequential API calls (1 product = 1 API call)
   - 100K products × 500ms per call = 50K seconds = 13 hours! (sequentially)
2. **Optimization:**
   - Changed to parallel processing: `Promise.all()` for 10 concurrent calls
   - Implemented idempotency keys (safe to retry failed calls)
   - Added retry logic with exponential backoff
3. **Implementation:**
   - Node.js + Azure Functions batch processor
   - Wrote simple: fetch 100 products, process 10 in parallel, write to Shopify
4. **Results:**
   - 100K products: 13 hours (sequential) → 2 hours (parallel)
   - Added batching: 2 hours → 45 minutes
   - Migration completed in 1 hour (plenty of headroom)

**Result:** Delivered on time, zero data loss, client very happy.

**What I learned:** Profile before optimizing. 90% of time is often spent in one place—fix that first.

---

### Q6: Describe your experience mentoring junior developers.

**STAR Answer (UTEC mentorship):**

**Situation:** At UTEC, I was assigned 3 junior developers to mentor. They were struggling with code quality, async patterns, testing.

**Task:** Improve their skills while delivering features on time.

**Action:**
1. **Structured code reviews:**
   - Reviewed every PR, left detailed comments explaining not just "what" but "why"
   - Example: "Use Promise.all() instead of sequential await. This reduces latency from 3s to 1s because requests happen in parallel"
2. **Pairing sessions:**
   - Spent 2 hours/week pair programming on complex features
   - Explained system design decisions, trade-offs
3. **Knowledge sessions:**
   - Monthly tech talks on: Node.js event loop, testing strategies, AWS best practices
   - Recorded sessions for team reference
4. **Clear expectations:**
   - "By end of Q2, you should own 2-3 features end-to-end"
   - Provided growth path: Junior → Mid → Senior

**Result:**
- All 3 juniors improved significantly
- Within 6 months, they were independently shipping features
- Team code quality improved (fewer bugs)
- One junior promoted to mid-level

**What I learned:** Mentoring multiplies your impact. Teach people to think, not just code. Recognition and clear growth paths matter.

---

### Q7: Tell me about a time you failed. What did you learn?

**STAR Answer (Notification queue backpressure at UTEC):**

**Situation:** Notification service was queuing 200K+ notifications/day. During a promotion event, the queue grew unbounded. System crashed.

**Task:** Prevent queue exhaustion and notifications from disappearing.

**Action (what I got wrong initially):**
1. **Naive solution:** "Just scale up the server." Added more Lambdas, more SQS capacity. Worked temporarily but masked root cause.
2. **Real root cause (later discovered):** Notification endpoints were slow (email provider was having issues). Notifications queued faster than they could be delivered.
3. **Proper fix:**
   - Implemented backpressure: If SQS queue depth > 50K, start dropping low-priority notifications
   - Added monitoring: Alert when queue depth exceeds 10K
   - Implemented circuit breaker: If email provider is slow, retry with exponential backoff instead of pounding it
4. **Design principle:** Graceful degradation > system crash. It's better to drop a few promotional emails than crash the entire notification system

**Result:** System became resilient. Never crashed again.

**What I learned:** Symptoms vs root causes. Scaling is not always the answer. Understand your bottleneck before throwing resources at it. Design for failure.

---

### Q8: Tell me about a time you had to balance technical debt vs feature delivery.

**STAR Answer (Testing infrastructure at Iprogrammer/UTEC):**

**Situation:** Sprint deadline for new partner onboarding feature. QA team said "we need comprehensive tests." Dev team said "tests slow us down, let's just ship and fix bugs later."

**Task:** Navigate the test vs speed dilemma.

**Action:**
1. **Data gathering:**
   - Measured cost of bugs in production: 1 production bug = 4 hours debugging + customer impact + reputation damage
   - Measured test overhead: Good unit tests add 20% overhead (1 day feature = 1.2 days with tests)
   - Test payoff: After 5 bug escapes prevented, tests have positive ROI
2. **Compromise (middle path):**
   - Critical paths: 100% test coverage required (partner onboarding, payment processing)
   - Normal features: 70% coverage required (good enough)
   - Polish features: No test requirements (speed over perfection)
3. **Implemented testing culture:**
   - Pair new engineers with seniors to write tests together (faster learning)
   - Automated test runs on every PR (fast feedback)
   - Celebrated first 100% coverage milestone
4. **Results:**
   - Featured delivered on time AND with high quality
   - Team's attitude shifted: tests seen as "confidence" not "overhead"
   - Production bugs dropped 60%

**Result:** Team became believers in testing. Technical debt dropped. Velocity actually increased (less firefighting).

**What I learned:** False dichotomy between speed and quality. Good practices enable speed. Changing mindsets takes examples and data, not lectures.

---

### Q9: Describe a time you took initiative beyond your job description.

**STAR Answer (Security audit at UTEC):**

**Situation:** Company was preparing for client audits. Security was not mandated in my job description, but I volunteered to lead VAPT (Vulnerability Assessment & Penetration Testing).

**Task:** Identify and fix security vulnerabilities before audit.

**Action:**
1. **Scoped vulnerabilities:**
   - Ran automated scanning: ZAP, Snyk, AWS Security Hub
   - Manual testing: SQL injection, XSS, CSRF, auth bypass
2. **Top findings:**
   - SQL injection in old search endpoint (fixed with parameterized queries)
   - JWT tokens stored in localStorage (moved to httpOnly cookie)
   - Hardcoded AWS credentials in code (moved to Secrets Manager)
3. **Fixed all critical/high severity issues**
   - Assigned to team members, provided guidance
   - Ensured fixes were tested before merging
4. **Documentation:**
   - Created security checklist for code reviews
   - Trained team on OWASP top 10

**Result:** Passed client security audit with flying colors. Company appreciated proactive initiative.

**What I learned:** Going beyond job description shows leadership. Security expertise becomes valuable across org. Initiated improvements that stuck.

---

### Q10: Tell me about your biggest technical achievement.

**STAR Answer (245 Lambda functions architecture at UTEC):**

**Situation:** UTEC backend was monolith in Node.js. As we scaled (110 people, 10 concurrent teams), deploys became slow and risky. One team's bug could crash the entire app.

**Task:** Break monolith into microservices without disrupting feature development.

**Action:**
1. **Proposed Lambda + nested CloudFormation approach:**
   - Each team owns a CloudFormation stack (e.g., PartnerProfilesStack, UserProfilesStack)
   - Each stack has 40-50 Lambda functions (one per API endpoint)
   - Nested stacks allow 5 independent stacks (overcame CloudFormation 500-resource limit)
2. **Implementation (3-month effort):**
   - Incrementally refactored monolith into Lambda functions
   - Set up SAM local testing, local DynamoDB for dev
   - Trained 20+ developers on Lambda, CloudFormation, serverless best practices
3. **DevOps enablement:**
   - Created automated CI/CD: `git push feature/xyz` → auto-deploy to dev
   - Blue-green deployments for zero-downtime updates
   - Monitoring + alerting dashboard (CloudWatch + DataDog)
4. **Impact:**
   - Deployment time: 30 min (monolith) → 2 min (Lambda)
   - Blast radius: Entire app at risk → One function at risk
   - Scalability: Vertical limits → Horizontal (each function scales independently)
   - Team velocity: 5 teams shipping in parallel without conflicts

**Result:**
- Handled 245+ Lambda functions (among largest at the company)
- Enabled 20+ engineers to ship independently
- 10x faster deployments
- Zero prod incidents from deployments in 3 years

**What I learned:** Architectural decisions compound over time. Good structure enables teams to move faster. Communication and training are 50% of the work; code is 50%.

---

## 5. Questions to Ask the Interviewer (Smart Encora-Specific)

Ask 3-4 of these (not all 8):

**Q1: I see Encora is now part of Coforge (post-merger May 2026). How is this affecting the Backend Engineer role? Are there any integration initiatives or tech stack consolidation happening?**
- Shows awareness of recent news
- Lets you understand post-merger direction
- Demonstrates long-term thinking

**Q2: For the Kubernetes deployments you mentioned, are you using a managed service (EKS, AKS) or self-hosted clusters? What's your experience been with scaling and security?**
- Shows you understand K8s operational complexity
- Lets you gauge their maturity level
- Helps you prepare for what you'll actually be doing

**Q3: What's your observability stack? How do you monitor Kubernetes cluster health, application metrics, and logs?**
- Shows you care about production readiness
- Tells you what tools you'll be using (Prometheus, Datadog, Grafana, ELK?)
- Important for incident response

**Q4: Tell me about your incident response process. What's the average time to detect and resolve production issues?**
- Shows you care about reliability
- Tells you about their incident culture
- Lets you understand on-call expectations

**Q5: How do you approach testing in a microservices/Kubernetes environment? What's your CI/CD testing strategy?**
- Directly relevant to the role
- Shows your testing mindset
- Lets you gauge code quality expectations

**Q6: What's the team structure for the Backend Engineering group? Who would I be reporting to, and what does career growth look like from this level?**
- Shows interest in growth and mentorship
- Helps understand team dynamics
- Lets you know if there's a Tech Lead track

**Q7: What's the biggest technical challenge your team is facing right now? What would you want the new hire to tackle in the first 3 months?**
- Shows you're thinking about impact
- Lets you assess role fit
- Tells you what the real priorities are (not just the job description)

**Q8: What's the tech culture like at Encora post-Coforge merger? Are there other offices/teams in India? How is the collaboration across regions?**
- Relevant given the merger
- Shows interest in company culture
- Lets you understand remote/collab setup

---

## 6. Red Flags to Avoid

Based on your profile and past interviews, watch out for these mistakes:

### ❌ Mistake 1: Talking about your stack depth without connecting to their role

**Wrong:** "I know Node.js, React, AWS, Docker, Kubernetes..."
**Right:** "I've built large-scale Node.js systems on AWS. Your Kubernetes focus is exciting because it's the natural evolution of my containerization experience—I've used Lambda (stateless, isolated) and now I'm ready for cluster orchestration with Kubernetes."

---

### ❌ Mistake 2: Overstating Kubernetes knowledge when you haven't used it

**Wrong:** "I have deep Kubernetes experience..." (then stumble on details)
**Right:** "I haven't used Kubernetes in production yet, but my Lambda architecture (245+ stateless functions, auto-scaling, health checks) is structurally similar to Kubernetes pods. I understand the principles and I'm excited to apply them to Kubernetes."

---

### ❌ Mistake 3: Getting lost in system design without prioritizing trade-offs

**Wrong:** Design everything perfectly (over-engineered)
**Right:** "For MVP, I'd use MySQL + Node.js + Redis (simple, proven). As we scale to 1M users, I'd add Kubernetes, Kafka, etc. At each stage, I'd measure bottlenecks before over-optimizing."

---

### ❌ Mistake 4: Defensive when cross-questioned on your decisions

**Wrong:** Interviewer: "Why not GraphQL?" You: "GraphQL is worse than REST."
**Right:** "REST was simpler for our use case (stateless, straightforward CRUD). For future work, GraphQL could reduce over-fetching on complex nested queries. Trade-off: GraphQL's learning curve. We chose REST for team velocity."

---

### ❌ Mistake 5: Claiming you built something you didn't own

**Wrong:** "I architected UTEC's entire backend..." (but you were one of 20 engineers)
**Right:** "I led the notification engine (17 Lambda functions) and co-designed the overall Lambda structure with the team. The OpenSearch migration and nested CloudFormation were my initiatives."

---

### ❌ Mistake 6: Not connecting past experience to this role

**Wrong:** Talk about React deeply (you're interviewing for Backend Engineer)
**Right:** "I know React from working with frontend teams at UTEC, but my strength is backend. Your focus on Node.js microservices + Kubernetes is perfect for my depth."

---

### ❌ Mistake 7: Being too cautious/humble about incident handling

**Wrong:** "I've never been on-call, so I don't have much incident experience"
**Right:** "I've debugged production issues (connection pool exhaustion, OpenSearch latency, data consistency). My approach: identify immediately, communicate clearly, fix root cause, postmortem to prevent recurrence."

---

### ❌ Mistake 8: Saying "I don't know" without follow-up thinking

**Wrong:** Q: "How would you debug high memory usage in a Kubernetes pod?" A: "I don't know."
**Right:** "I haven't debugged Kubernetes specifically, but I'd: (1) check logs, (2) look at memory usage metrics over time, (3) profile the application (heap dump?), (4) check for memory leaks (circular references). How would you approach it?"

---

### ❌ Mistake 9: Overselling or underselling experience with AWS vs Azure

**Wrong:** "AWS is better than Azure in every way"
**Right:** "I prefer AWS for its ecosystem breadth, but I respect Azure's Microsoft integrations. I'm comfortable with both and can pick the right tool per client."

---

### ❌ Mistake 10: Not asking questions at the end

**Wrong:** Interview ends, you have no questions
**Right:** Ask 2-3 smart questions (from Section 5). Shows interest and critical thinking.

---

## 7. Last-Night Revision Checklist (30 Points)

Spend 30 minutes skimming these tonight:

**Node.js & JavaScript (5 min)**
- [ ] Event loop phases (timers, pending, poll, check, close)
- [ ] Difference between Promise.all() and Promise.allSettled()
- [ ] What is async/await? How does it compare to .then()?
- [ ] Explain closures with a real example (e.g., middleware)
- [ ] What happens if event loop is blocked?

**Kubernetes (5 min)**
- [ ] Pods = containerized apps, Services = networking, Deployments = replicas
- [ ] ConfigMaps = config, Secrets = passwords
- [ ] HPA = auto-scaling based on CPU/memory
- [ ] Readiness probe vs Liveness probe (when to use each)
- [ ] What's a ClusterIP vs LoadBalancer vs Ingress?

**Backend Architecture (5 min)**
- [ ] Connection pooling (why it matters, impact at scale)
- [ ] REST API best practices (status codes, error handling)
- [ ] How to design for 10K concurrent users
- [ ] Caching strategies (Redis, TTL, cache invalidation)
- [ ] Circuit breaker pattern (when to use)

**System Design (5 min)**
- [ ] Scaling: Load balancer → API servers → Database → Cache
- [ ] Trade-offs: Consistency vs Availability (CAP theorem basics)
- [ ] Async processing: SQS/Kafka for decoupling
- [ ] Monitoring: Metrics, logs, traces
- [ ] Failure scenarios (DB down, service timeout, network partition)

**AWS & Azure (5 min)**
- [ ] Key services: Lambda, EC2, RDS, S3, API Gateway (AWS); Functions, VMs, SQL DB, Blob (Azure)
- [ ] When to use Lambda vs EC2 (stateless vs long-running)
- [ ] CloudFormation basics (IaC)
- [ ] VPC, security groups, IAM (access control)
- [ ] Cost optimization (monitoring, reserved instances)

**CI/CD & DevOps (3 min)**
- [ ] Pipeline stages: Lint → Test → Build → Deploy
- [ ] Blue-green deployment (zero downtime)
- [ ] Environment management (dev, staging, prod)
- [ ] Docker: containerization principles
- [ ] Infrastructure as Code (CloudFormation, Helm for K8s)

**Testing (2 min)**
- [ ] Unit vs Integration vs E2E
- [ ] Coverage targets (70-80%)
- [ ] Test pyramid: many unit tests, fewer integration, few E2E
- [ ] Jest, Supertest for Node.js

---

## 8. Morning-of Confidence Brief

**Read this when you wake up tomorrow:**

---

You're ready. You've architected systems for 5+ years. You've solved real production problems. You've mentored teams. UTEC's 245 Lambda functions prove you can handle complexity. This interview is just a conversation about what you've already built.

**Remember:**
- **You're not learning from scratch.** Kubernetes is containerization + orchestration—you understand both already.
- **Your superpower is connecting theory to practice.** Don't just describe what something is—explain why you'd use it and what problems it solves.
- **They'll cross-question you.** That's good. It means they're engaged. Show your thinking out loud. "That's a good point, I hadn't considered that—here's how I'd adjust..."
- **You've debugged production incidents.** You know how systems fail and how to fix them. That's worth millions.

**In the interview:**
1. **Start with your UTEC architecture** — it's your strongest project for Kubernetes/backend relevance
2. **Connect each question back to real scenarios** — "We faced this at UTEC when..."
3. **Be confident but not arrogant** — "I haven't used Kubernetes, but here's how I'd approach it..." is strong
4. **Ask smart questions** — shows you're thinking about long-term fit
5. **Smile, make eye contact, speak clearly** — confidence comes through in communication

**The formula that works:**
- **Understand** the question fully (ask clarifying questions if unclear)
- **Explain your approach** (not the answer, the process)
- **Show real examples** (from UTEC, P&G, Vkonnect, Iprogrammer)
- **Discuss trade-offs** (speed vs reliability, cost vs complexity)
- **Wrap with impact** (metrics, team outcomes, what you learned)

**You've got 5 years of evidence. Use it. Don't second-guess yourself.**

Now go get some sleep. You've prepared well. Tomorrow, just be yourself.

---

**Good luck! 🚀**

Your interviewer will see:
- ✅ Deep backend expertise (245 Lambda functions, notification engine, search optimization)
- ✅ Production maturity (incident response, debugging, monitoring)
- ✅ Architectural thinking (trade-offs, scaling, resilience)
- ✅ Leadership mindset (mentoring, code quality, system improvement)

They'll want to hire you. Now just don't second-guess yourself in the interview.

---

## Quick Reference: Encora Role Keyword Mapping

| Topic | Your Experience | Encora Role |
|-------|-----------------|-------------|
| Node.js REST APIs | EY Risk.ai, P&G Olay, UTEC (245+ Lambda) | ✅ Direct match |
| Kubernetes | Lambda (stateless, replicas, health checks) | ✅ Easy transition |
| AWS | UTEC, EY Risk.ai | ✅ Strong |
| Azure | P&G Olay (Azure Functions) | ✅ Comparative knowledge |
| CI/CD Pipelines | UTEC (5 envs, SAM, CloudFormation) | ✅ Exact experience |
| Monitoring | CloudWatch, DataDog at UTEC | ✅ Production-ready |
| System Design | Notification engine, OpenSearch, scaling | ✅ Strong |
| Incident Response | Multiple production incidents debugged | ✅ Maturity |
| Mentoring | Led junior developers at UTEC, Iprogrammer | ✅ Leadership |

**You're positioned perfectly for this role. The interview is just confirming what you already know.** 

---

**Final Reminder:** You cleared L1. L2 is not "harder"—it's just "deeper." They're not looking for perfect. They're looking for:
1. Real problems you've solved (you have stories)
2. How you think about architecture (you understand trade-offs)
3. Can you handle production systems (you've debugged incidents)
4. Are you someone they want to work with (you're professional and thoughtful)

You check all these boxes. Now go prove it tomorrow! 💪</output>
