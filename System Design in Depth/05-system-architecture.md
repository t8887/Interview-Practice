# 🏛️ System Architecture

> **Chief Architect Note:** Architecture is the decisions that are hardest to change. Get this right, everything else flows. Get it wrong, you'll rewrite the entire system in 2 years.

---

## 5.1 Monolith vs Microservices

### Monolith

**Single deployable unit; all features in one codebase.**

```
Monolithic Order Management System:
├─ User Service (auth, profiles)
├─ Product Service (catalog, search)
├─ Order Service (create, list, cancel)
├─ Payment Service (process payments)
├─ Inventory Service (stock management)
├─ Notification Service (emails, SMS)
└─ Reporting Service (analytics, dashboards)

All features → One Node.js process → One database → One server

Deploy new version: Stop entire server, deploy new code, start server
Downtime: ~5 minutes (everyone affected)
```

**Advantages:**
- Simple to build and deploy (one `git push` → everything deployed)
- Shared libraries and utilities trivial
- Debugging: single process, full context
- No network latency between services
- Single transaction: one order could atomically debit account AND credit inventory

**Disadvantages:**
- **Scaling:** Can't scale individual services (must scale entire monolith)
- **Technology lock-in:** All services use same language/framework
- **Blast radius:** One bug brings down entire system
- **Team coordination:** All teams merge into same codebase
- **Deployment risk:** Every change risks entire system

### Microservices

**Each feature is an independently deployable service with its own database.**

```
Microservices Order Management System:

User Service (port 3001)
  ├─ Codebase: /services/user
  ├─ Database: users_db (PostgreSQL)
  └─ Deploy: Independent, separate CI/CD pipeline

Product Service (port 3002)
  ├─ Codebase: /services/product
  ├─ Database: products_db (MongoDB)
  └─ Deploy: Independent

Order Service (port 3003)
  ├─ Codebase: /services/order
  ├─ Database: orders_db (MySQL)
  └─ Deploy: Independent

... each service completely independent ...

API Gateway (port 80, 443)
  └─ Routes: /api/users/* → User Service
  └─ Routes: /api/products/* → Product Service
  └─ Routes: /api/orders/* → Order Service
```

**Advantages:**
- **Scaling:** Scale each service independently (5 order-service replicas, 2 user-service replicas)
- **Technology freedom:** User service can be Node.js, Product service can be Java
- **Fault isolation:** Product service crashes, doesn't affect orders
- **Deployment speed:** Each team deploys independently (no coordination)
- **Loose coupling:** Services communicate via APIs, independent evolution

**Disadvantages:**
- **Distributed system complexity:** Network failures, timeouts, retries
- **Data consistency:** Can't do ACID transactions across services
- **Operational overhead:** Monitor 10 services instead of 1
- **Debugging:** Request spans 5 services, logs scattered across 5 systems
- **Network latency:** Inter-service communication adds 10-50ms per hop

### Decision: When to Choose Each

```
Start with Monolith if:
  ✅ < 5 person team
  ✅ Product still evolving (features change weekly)
  ✅ < 1000 req/sec
  ✅ All features will stay together anyway

Migrate to Microservices when:
  ✅ Different teams own different services
  ✅ Different services have vastly different scaling needs
  ✅ Need to deploy at different cadences (product every hour, core every week)
  ✅ > 10,000 req/sec, need horizontal scaling
  ✅ Different services can use different tech stacks
```

**Chief Architect Anti-Pattern:** "Distributed monolith" — multiple services in monolithic architecture (all services call each other, shared database, all deployed together). Combines worst of both worlds.

---

## 5.2 API Gateway

### What It Does

API Gateway is a single entry point for all client requests. It sits between clients and backend services, handling cross-cutting concerns.

```
Client
  ↓ (HTTPS Request)
API Gateway (port 443)
  ├─ TLS Termination (decrypt HTTPS once)
  ├─ Authentication (verify JWT)
  ├─ Authorization (check permissions)
  ├─ Rate Limiting (throttle clients)
  ├─ Request routing (POST /api/orders → Order Service)
  ├─ Response aggregation (combine responses from 3 services)
  ├─ Request/response logging (audit trail)
  └─ Error handling (format error responses)
  ↓
Backend Services (internal, no TLS needed)
  ├─ User Service (port 3001, private network)
  ├─ Product Service (port 3002, private network)
  └─ Order Service (port 3003, private network)
  ↓
Databases (completely private)
```

### Authentication at API Gateway

```javascript
// API Gateway middleware
async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach user to request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Backend service doesn't need to verify JWT — it trusts the gateway
app.get('/api/users/me', authMiddleware, (req, res) => {
  // req.user is guaranteed valid (verified at gateway)
  res.json(req.user);
});
```

**Benefit:** All services use the same authentication (DRY — don't repeat yourself). If token format changes, only update gateway.

### Rate Limiting at API Gateway

```javascript
const RedisStore = require('rate-limit-redis');
const redis = require('redis');
const rateLimit = require('express-rate-limit');

const client = redis.createClient();

const limiter = rateLimit({
  store: new RedisStore({
    client: client,
    prefix: 'rl:'  // rate-limit prefix
  }),
  windowMs: 60 * 1000,  // 1 minute window
  max: 100,              // 100 requests per minute
  keyGenerator: (req) => req.user?.id || req.ip,  // Per-user limit
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests',
      retryAfter: 60
    });
  }
});

app.use('/api/', limiter);
```

### Request Routing at API Gateway

```javascript
const express = require('express');
const httpProxy = require('express-http-proxy');

const app = express();

// Route by path
app.use('/api/users', httpProxy('http://user-service:3001'));
app.use('/api/products', httpProxy('http://product-service:3002'));
app.use('/api/orders', httpProxy('http://order-service:3003'));

// Route by hostname
app.use(vhost('api.example.com', httpProxy('http://api-service:3001')));
app.use(vhost('admin.example.com', httpProxy('http://admin-service:3002')));

// Route by header
app.use((req, res, next) => {
  if (req.headers['x-api-version'] === 'v2') {
    return httpProxy('http://api-service-v2:3001')(req, res, next);
  }
  httpProxy('http://api-service-v1:3001')(req, res, next);
});

app.listen(80);
```

### API Gateway at Scale

```
Clients (millions)
  ↓
Load Balancer (ALB)
  ├─ API Gateway Instance 1
  ├─ API Gateway Instance 2
  ├─ API Gateway Instance 3
  └─ API Gateway Instance N (horizontally scaled)
  ↓ (pool of connections)
Backend Services
```

**Each gateway instance:**
- No application state (stateless)
- Handles ~10K concurrent connections
- N instances handle N × 10K = total capacity

---

## 5.3 Event-Driven Architecture

### Pub/Sub Pattern

**Services publish events; other services subscribe and react independently.**

```
Order Service publishes event:
  ├─ Event: "OrderCreated"
  ├─ Data: { orderId: 123, userId: 456, items: [...], total: 999.99 }
  └─ Timestamp: 2026-05-08T10:30:00Z

Redis Pub/Sub Channel: "orders:created"
  
Subscribers react independently:
  ├─ Inventory Service: Decrease stock by item quantities
  ├─ Payment Service: Process payment
  ├─ Notification Service: Send "order confirmed" email
  ├─ Analytics Service: Log event for reporting
  └─ Logistics Service: Create shipment
  
No synchronous coupling — if Notification Service crashes, order still gets created
```

### Event-Driven with Kafka

```javascript
// Order Service (producer)
const kafka = require('kafkajs').Kafka;
const producer = kafka.producer();

app.post('/orders', async (req, res) => {
  const order = {
    id: generateId(),
    userId: req.user.id,
    items: req.body.items,
    total: calculateTotal(req.body.items),
    createdAt: new Date()
  };
  
  // 1. Save order to database
  await db.insert('orders', order);
  
  // 2. Publish event to Kafka
  await producer.send({
    topic: 'orders.created',
    messages: [
      {
        key: order.id,
        value: JSON.stringify(order),
        timestamp: Date.now()
      }
    ]
  });
  
  // 3. Return immediately to client
  res.json(order);
});

// Inventory Service (consumer)
const consumer = kafka.consumer({ groupId: 'inventory-service' });

async function startInventoryWorker() {
  await consumer.subscribe({ topic: 'orders.created' });
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const order = JSON.parse(message.value);
      
      // Process items: decrease stock
      for (const item of order.items) {
        await db.query(
          'UPDATE products SET stock = stock - ? WHERE id = ?',
          [item.quantity, item.productId]
        );
      }
      
      console.log(`Inventory updated for order ${order.id}`);
    }
  });
}

startInventoryWorker();

// Payment Service (another consumer)
async function startPaymentWorker() {
  await consumer.subscribe({ topic: 'orders.created' });
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const order = JSON.parse(message.value);
      
      // Process payment
      const payment = await stripe.charges.create({
        amount: order.total,
        currency: 'usd',
        customer: order.userId
      });
      
      console.log(`Payment processed for order ${order.id}: ${payment.id}`);
    }
  });
}

startPaymentWorker();
```

**Key Benefit:** Decoupling — Order Service doesn't know or care about Inventory, Payment, Notification. They're all independent.

### Eventual Consistency

```
T=0: User places order, Order Service saves and publishes "OrderCreated"
T=1: Inventory Service decreases stock
T=2: Payment Service processes payment
T=3: Notification Service sends email
T=5: Reporting Service logs analytics

Brief window (0-5 seconds) where:
  ├─ Order is created ✅
  ├─ But payment might not be processed yet ⏳
  └─ User might see "order pending" → "order confirmed"

This is eventual consistency: all systems eventually converge to same state
```

---

## 5.4 CQRS (Command Query Responsibility Segregation)

### Traditional Approach

```
Single database for everything:
  Write: INSERT, UPDATE, DELETE
  Read: SELECT with complex JOINs, GROUP BYs

Problem:
  ├─ Write-optimized schema doesn't match read-optimized queries
  ├─ Complex query required denormalization workarounds
  └─ Reporting requires expensive table scans
```

### CQRS Approach

```
Split read and write models:

Write Model (Command):
  ├─ Normalized database (MySQL)
  ├─ Fast INSERTs/UPDATEs
  ├─ ACID transactions
  └─ Single source of truth

                    Event Stream
                   (Kafka topic)
                         ↓
                 
Read Model (Query):
  ├─ Denormalized Elasticsearch
  ├─ Pre-aggregated summaries
  ├─ Optimized for read queries
  └─ Rebuilt from event stream
```

### CQRS Example: E-Commerce Analytics

```javascript
// WRITE MODEL: Normalized
app.post('/orders', async (req, res) => {
  const order = {
    id: generateId(),
    userId: req.user.id,
    items: req.body.items,
    total: calculateTotal(req.body.items),
    status: 'pending',
    createdAt: new Date()
  };
  
  // Write to normalized database
  await db.insert('orders', order);
  
  // Publish event
  await kafka.producer().send({
    topic: 'orders.created',
    messages: [{ value: JSON.stringify(order) }]
  });
  
  res.json(order);
});

// READ MODEL: Denormalized (Elasticsearch)
// Consumer updates read model from event stream
async function buildReadModel() {
  const consumer = kafka.consumer({ groupId: 'analytics-builder' });
  
  await consumer.subscribe({ topic: 'orders.created' });
  
  await consumer.run({
    eachMessage: async ({ message }) => {
      const order = JSON.parse(message.value);
      
      // Write to Elasticsearch (denormalized for reporting)
      await elasticsearch.index({
        index: 'orders-analytics',
        body: {
          orderId: order.id,
          userId: order.userId,
          totalAmount: order.total,
          itemCount: order.items.length,
          createdDate: order.createdAt.split('T')[0],
          createdWeek: getWeekOf(order.createdAt),
          createdMonth: getMonthOf(order.createdAt),
          status: order.status
        }
      });
    }
  });
}

// Query read model (fast!)
app.get('/analytics/orders/by-date', async (req, res) => {
  // No complex JOIN, no GROUP BY
  // Just query the pre-aggregated Elasticsearch index
  const results = await elasticsearch.search({
    index: 'orders-analytics',
    body: {
      aggs: {
        by_date: {
          terms: { field: 'createdDate' },
          aggs: {
            total_revenue: { sum: { field: 'totalAmount' } },
            avg_order: { avg: { field: 'totalAmount' } }
          }
        }
      }
    }
  });
  
  res.json(results);
});
```

**Result:**
- Write: Fast INSERT to normalized MySQL
- Read: Instant aggregated query from Elasticsearch (no CPU-intensive JOIN)
- Analytics run at sub-second latency even with billions of orders

---

## ✅ Quick Revision Checklist — System Architecture

- [ ] Can I explain three reasons to choose microservices over a monolith?
- [ ] Do I know what "distributed monolith" means and why it's bad?
- [ ] Can I describe five responsibilities of an API Gateway?
- [ ] Do I know how event-driven architecture reduces coupling?
- [ ] Can I explain eventual consistency and why it's acceptable for some services?
- [ ] Do I understand CQRS and when it's worth the added complexity?
- [ ] Can I draw the event flow for a multi-service order system?
- [ ] Do I know how to handle authentication in a microservices setup?

