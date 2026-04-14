# System Design — Queues, Background Jobs, Scaling & Observability

## Message Queues

### Why Queues?
```
Without queue:  Client → Server → Heavy Task (email/PDF/resize) → Response (slow)
With queue:     Client → Server → Enqueue job → Response (fast)
                                  Worker → Process job async
```

### Bull Queue (Redis-backed, Node.js)
```javascript
const Queue = require('bull');

// Create queue
const emailQueue = new Queue('email', {
    redis: { host: '127.0.0.1', port: 6379 },
    defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 50,
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 }
    }
});

// Producer — add job
app.post('/api/orders', async (req, res) => {
    const order = await createOrder(req.body);
    
    // Enqueue async tasks
    await emailQueue.add('confirmation', {
        to: order.userEmail,
        orderId: order.id
    }, { priority: 1 });
    
    await emailQueue.add('invoice-pdf', {
        orderId: order.id
    }, { delay: 5000 }); // delay 5 seconds
    
    res.json({ order });
});

// Consumer — process jobs
emailQueue.process('confirmation', 5, async (job) => { // 5 concurrent
    const { to, orderId } = job.data;
    await sendEmail(to, `Order ${orderId} confirmed!`);
    return { sent: true };
});

emailQueue.process('invoice-pdf', 2, async (job) => {
    const { orderId } = job.data;
    const pdf = await generatePDF(orderId);
    await uploadToS3(pdf);
    return { uploaded: true };
});

// Events
emailQueue.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed:`, result);
});

emailQueue.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed:`, err.message);
    // Alert / notify
});

// Scheduled / recurring jobs
emailQueue.add('daily-digest', {}, {
    repeat: { cron: '0 9 * * *' } // Every day at 9 AM
});
```

### Queue Patterns
```
1. Work Queue:     One producer → multiple consumers (load balanced)
2. Pub/Sub:        One publisher → multiple subscribers (broadcast)
3. Priority Queue: High-priority jobs processed first
4. Dead Letter:    Failed jobs moved to separate queue for investigation
5. Delayed Queue:  Jobs processed after a specified delay
```

### AWS SQS (Serverless Queue)
```javascript
const { SQSClient, SendMessageCommand, ReceiveMessageCommand } = require('@aws-sdk/client-sqs');
const sqs = new SQSClient({ region: 'ap-south-1' });

// Send message
await sqs.send(new SendMessageCommand({
    QueueUrl: process.env.QUEUE_URL,
    MessageBody: JSON.stringify({ orderId: '123', action: 'process' }),
    MessageGroupId: 'orders',  // FIFO queue
    MessageAttributes: {
        Priority: { DataType: 'String', StringValue: 'high' }
    }
}));

// Lambda consumer (triggered by SQS)
exports.handler = async (event) => {
    for (const record of event.Records) {
        const body = JSON.parse(record.body);
        await processOrder(body.orderId);
    }
};
```

## Scaling Patterns

### Horizontal vs Vertical
```
Vertical:  Bigger machine (more CPU/RAM) — simple, has limits
Horizontal: More machines behind load balancer — complex, unlimited scale

Stateless services (API servers) → horizontal scale easily
Stateful services (DB, cache) → vertical first, then sharding/replication
```

### Load Balancing
```
                    ┌──── Server 1
Client → LB ──────├──── Server 2
 (Nginx/ALB)       └──── Server 3

Algorithms:
- Round Robin:     Cycle through servers
- Least Connections: Send to server with fewest active connections
- IP Hash:         Same client → same server (sticky sessions)
- Weighted:        More traffic to beefier servers
```

### Database Scaling
```
1. Read Replicas:
   Write → Primary
   Read  → Replica 1, Replica 2, Replica 3
   (Eventual consistency — reads may lag)

2. Sharding:
   User A-M → Shard 1
   User N-Z → Shard 2
   (Cross-shard queries are expensive)

3. Connection Pooling:
   App → Pool (10 connections) → DB
   (Reuse connections, avoid overhead)
```

### Microservices Communication
```
Synchronous:  HTTP/gRPC — Request/Response, simple
Asynchronous: Message Queue — Decoupled, resilient

Service A ──HTTP──► Service B    (sync, coupled)
Service A ──Queue──► Service B   (async, decoupled)

When to use:
Sync:  User-facing requests needing immediate response
Async: Background tasks, event-driven, eventual consistency OK
```

## Serverless (AWS Lambda)

### Lambda + API Gateway
```javascript
// handler.js
exports.getUser = async (event) => {
    const userId = event.pathParameters.id;
    const user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
};

// serverless.yml
// functions:
//   getUser:
//     handler: handler.getUser
//     events:
//       - http:
//           path: /users/{id}
//           method: get
```

### Lambda Best Practices
```
1. Cold Start Mitigation:
   - Keep functions small
   - Use provisioned concurrency for critical paths
   - Initialize DB connections outside handler (reuse across invocations)

2. Connection Management:
   const pool = mysql.createPool({ ... }); // Outside handler — reused
   exports.handler = async (event) => {
       const [rows] = await pool.query(...);
       return { statusCode: 200, body: JSON.stringify(rows) };
   };

3. Timeout & Memory:
   - Set timeout based on expected execution (max 15 min)
   - More memory = more CPU (proportional)
   - 256MB-512MB is sweet spot for most API functions

4. Error Handling:
   - Use DLQ (Dead Letter Queue) for failed async invocations
   - Enable X-Ray tracing for debugging
```

## Observability

### Three Pillars
```
Logs:    What happened (structured JSON logs)
Metrics: How much/many (request count, latency, error rate)
Traces:  Request flow across services (distributed tracing)
```

### Structured Logging (Node.js)
```javascript
const pino = require('pino');
const logger = pino({ level: 'info' });

// Middleware — log every request
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        logger.info({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: Date.now() - start,
            userId: req.user?.id,
            requestId: req.headers['x-request-id']
        });
    });
    next();
});

// Correlation ID — trace request across services
app.use((req, res, next) => {
    req.requestId = req.headers['x-request-id'] || crypto.randomUUID();
    res.setHeader('x-request-id', req.requestId);
    next();
});
```

### Health Check Endpoint
```javascript
app.get('/health', async (req, res) => {
    const checks = {};
    
    try {
        await db.query('SELECT 1');
        checks.database = 'ok';
    } catch { checks.database = 'error'; }
    
    try {
        await redis.ping();
        checks.redis = 'ok';
    } catch { checks.redis = 'error'; }
    
    const allHealthy = Object.values(checks).every(v => v === 'ok');
    res.status(allHealthy ? 200 : 503).json({
        status: allHealthy ? 'healthy' : 'degraded',
        checks,
        uptime: process.uptime()
    });
});
```

### Graceful Shutdown
```javascript
process.on('SIGTERM', async () => {
    logger.info('SIGTERM received — shutting down gracefully');
    
    // Stop accepting new requests
    server.close();
    
    // Finish in-flight requests (timeout 30s)
    setTimeout(() => process.exit(1), 30000);
    
    // Close connections
    await pool.end();       // MySQL
    await redis.quit();     // Redis
    await mongoose.disconnect(); // MongoDB
    
    process.exit(0);
});
```

## Interview Questions

**Q: Design a notification system.**
> API enqueues notification to a queue (SQS/Bull). Workers process by channel: email (SES/SendGrid), push (FCM), SMS (Twilio). Each channel is a separate consumer. Failed notifications retry with exponential backoff. Store notification state in DB for user history. Rate limit per user to prevent spam.

**Q: How would you handle 10,000 concurrent API requests?**
> Horizontal scaling: multiple server instances behind a load balancer (ALB/Nginx). Stateless servers with Redis for shared state (sessions/cache). Read replicas for DB reads. Cache frequently accessed data. Queue heavy background tasks. Use connection pooling for all external services.

**Q: Explain the CAP theorem.**
> Distributed systems can guarantee at most 2 of: Consistency (all nodes see same data), Availability (every request gets a response), Partition tolerance (system works despite network splits). In practice, partitions happen, so you choose CP (consistent, reject during partition — e.g., MySQL) or AP (available, eventually consistent — e.g., DynamoDB).

**Q: How do you monitor a production Node.js app?**
> Structured logging (Pino/Winston) → CloudWatch/ELK. Metrics (response time, error rate, memory) → Prometheus/Grafana or CloudWatch. APM for traces (Datadog/New Relic/X-Ray). Health check endpoint for load balancer. Alerts on error rate spike, latency p99, memory usage.

**Q: When to use serverless vs containers?**
> Serverless (Lambda): variable traffic, event-driven, short tasks (<15 min), pay-per-use, quick prototyping. Containers (ECS/EKS): steady traffic, long-running processes, need full control, complex networking, GPU workloads.
