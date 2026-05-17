# 📨 Message Queues

> **Chief Architect Note:** Message queues are the nervous system of distributed systems. They decouple services, handle failures gracefully, and enable asynchronous processing at scale.

---

## 6.1 Kafka

### Architecture

**Distributed event streaming platform designed for high-throughput, durability, and replay.**

```
Topic: "orders.created"
  ├─ Partition 0: [msg1, msg2, msg3, ...]
  ├─ Partition 1: [msg4, msg5, msg6, ...]
  ├─ Partition 2: [msg7, msg8, msg9, ...]
  └─ Partition 3: [msg10, msg11, msg12, ...]

(Each partition is replicated across 3 brokers for fault tolerance)

Producers write to topic:
  └─ Kafka distributes messages across partitions (by key or round-robin)

Consumers read from topic:
  ├─ Consumer Group A (Inventory Service) reads all partitions
  ├─ Consumer Group B (Analytics) reads same partitions independently
  └─ Messages stay in Kafka for retention period (7 days, configurable)
```

### Key Concepts

**Broker:** A single Kafka server. Cluster has multiple brokers for fault tolerance.

**Topic:** Logical feed of messages (like a TV channel).

**Partition:** A single ordered queue. Topic has multiple partitions for parallel processing.

**Consumer Group:** Multiple consumers consuming same topic. Each partition assigned to one consumer in the group.

```
Topic: "orders.created" has 4 partitions

Consumer Group "inventory-service" has 2 consumers:
  ├─ Consumer A: reads partitions 0, 1
  └─ Consumer B: reads partitions 2, 3
  
Result: 4 partitions processed in parallel by 2 consumers
```

### Kafka Implementation

```javascript
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka-1:9092', 'kafka-2:9092', 'kafka-3:9092']  // 3 brokers
});

// Producer
const producer = kafka.producer();
await producer.connect();

app.post('/orders', async (req, res) => {
  const order = { id: generateId(), ...req.body };
  
  await db.insert('orders', order);
  
  // Publish to Kafka
  await producer.send({
    topic: 'orders.created',
    messages: [
      {
        key: order.userId,      // Partition by user_id (keep user's orders together)
        value: JSON.stringify(order),
        timestamp: Date.now()
      }
    ]
  });
  
  res.json(order);
});

// Consumer
const consumer = kafka.consumer({ groupId: 'inventory-service' });
await consumer.subscribe({ topic: 'orders.created' });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const order = JSON.parse(message.value);
    console.log(`[Partition ${partition}] Processing order ${order.id}`);
    
    // Process: decrease inventory
    for (const item of order.items) {
      await decrementInventory(item.productId, item.quantity);
    }
  }
});
```

### Kafka Advantages

- **Durability:** Messages persisted to disk for retention period (7-90 days)
- **Replay:** Can reprocess old messages (rewind consumer to earlier timestamp)
- **Parallel processing:** Multiple partitions processed in parallel
- **Fault tolerance:** Partition replicated across 3 brokers
- **Ordering per partition:** Messages in same partition stay ordered

### Kafka Disadvantages

- **Complexity:** Broker cluster, ZooKeeper coordination, partition management
- **Operational overhead:** Monitor brokers, manage replication, handle failures
- **Network:** Required in same datacenter (not ideal for multi-region)

---

## 6.2 RabbitMQ

### Architecture

**Traditional message broker. Each message processed by exactly one consumer, then deleted.**

```
Producer sends message to Exchange

Exchange (like a post office):
  ├─ Receives message from producer
  ├─ Routes to queue(s) based on routing rules
  └─ Deletes message once all consumers ACK

Queue (like a mailbox):
  ├─ Holds messages temporarily
  ├─ Consumed by one consumer (not shared)
  └─ Deleted after consumer ACKs

Consumer:
  ├─ Receives message from queue
  ├─ Processes (e.g., send email)
  └─ Sends ACK (acknowledgment) to confirm completion
```

### Message Routing

```
Exchange: "orders"
  ├─ Routing rule: "orders.*"
  ├─ Routes to Queue "inventory-queue"
  ├─ Routes to Queue "payment-queue"
  ├─ Routes to Queue "notification-queue"

Producer publishes: { routingKey: "orders.created", body: {...} }
  └─ Goes to ALL queues (fan-out behavior)

Each consumer (inventory, payment, notification):
  ├─ Pulls from their own queue
  ├─ Processes independently
  └─ Each queue deletes message after processing
```

### RabbitMQ Implementation

```javascript
const amqp = require('amqplib');

async function startRabbitMQ() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  
  // Declare exchange
  await channel.assertExchange('orders', 'topic', { durable: true });
  
  // Declare queues and bindings
  const inventoryQueue = await channel.assertQueue('inventory-queue', { durable: true });
  const paymentQueue = await channel.assertQueue('payment-queue', { durable: true });
  
  // Route messages
  await channel.bindQueue(inventoryQueue.queue, 'orders', 'orders.created');
  await channel.bindQueue(paymentQueue.queue, 'orders', 'orders.created');
  
  // Producer
  app.post('/orders', (req, res) => {
    const order = { id: generateId(), ...req.body };
    
    channel.publish(
      'orders',
      'orders.created',
      Buffer.from(JSON.stringify(order))
    );
    
    res.json(order);
  });
  
  // Inventory consumer
  channel.consume(inventoryQueue.queue, async (msg) => {
    const order = JSON.parse(msg.content.toString());
    console.log(`Inventory: Processing order ${order.id}`);
    
    for (const item of order.items) {
      await decrementInventory(item.productId, item.quantity);
    }
    
    channel.ack(msg);  // Confirm message processed
  });
  
  // Payment consumer (independent)
  channel.consume(paymentQueue.queue, async (msg) => {
    const order = JSON.parse(msg.content.toString());
    console.log(`Payment: Processing order ${order.id}`);
    
    await processPayment(order.userId, order.total);
    channel.ack(msg);  // Confirm message processed
  });
}
```

### RabbitMQ vs Kafka

| Aspect | RabbitMQ | Kafka |
|--------|----------|-------|
| **Message Model** | Queue (consumed = deleted) | Topic (retained) |
| **Use Case** | Task queues, jobs | Event streaming, replay |
| **Throughput** | 10K-50K msg/sec | 1M+ msg/sec |
| **Replay** | ❌ Can't replay old messages | ✅ Can replay 7-90 days |
| **Ordering** | Per consumer | Per partition |
| **Acknowledgment** | Explicit ACK required | Optional |
| **Complexity** | Lower | Higher |

---

## 6.3 Pub/Sub Pattern

### Redis Pub/Sub

**Simple publish-subscribe, no persistence.**

```javascript
const redis = require('redis');
const publisher = redis.createClient();
const subscriber = redis.createClient();

// Subscriber
subscriber.subscribe('chat:room1', (message) => {
  console.log(`New message: ${message}`);
});

// Publisher
app.post('/chat', (req, res) => {
  const message = req.body.message;
  publisher.publish('chat:room1', message);
  res.json({ sent: true });
});
```

**Characteristics:**
- Messages NOT persisted — if subscriber is offline, message is lost
- Fire-and-forget — publisher doesn't know if anyone subscribed
- Multiple subscribers all receive same message simultaneously
- Sub-millisecond latency
- **Use case:** Real-time notifications, live dashboards, chat

### SNS (AWS Simple Notification Service)

**Managed Pub/Sub with multiple subscriber types.**

```
SNS Topic: "orders.created"
  ├─ Subscribe: Lambda function (auto-scale inventory)
  ├─ Subscribe: SQS queue (store event in data warehouse)
  └─ Subscribe: Email (notify admin of orders > $10K)

Publisher publishes once:
  └─ All 3 subscribers receive notification
```

### Pub/Sub at Scale

**Problem:** Millions of users subscribe to notifications. One notification published to 10M users simultaneously.

**Solution: Kafka + Pub/Sub hybrid**

```
Kafka Topic: "user.notifications"
  ├─ Partition 0-99 (100 partitions)
  └─ Contains all user notifications
  
Consumer Group "notification-workers" has 100 consumers:
  ├─ Worker 0: handles partition 0 → pushes to users in partition 0
  ├─ Worker 1: handles partition 1 → pushes to users in partition 1
  └─ ... (100 workers in parallel)
  
Result: 10M users notified in ~10-30 seconds (parallel processing)
```

---

## 6.4 Dead Letter Queue (DLQ)

### What It Does

When a message cannot be processed (poison message, malformed, external service down), it's automatically moved to a Dead Letter Queue for inspection and retry.

```
Normal Queue: "payment-processing"
  ├─ Consumer processes message
  ├─ If error after 3 retries: MOVE to DLQ
  └─ Continue with next message

DLQ: "payment-processing-dlq"
  ├─ Contains failed messages
  ├─ Engineers inspect, fix, requeue
  └─ Alerts on growth (indicates a problem)
```

### DLQ Implementation

```javascript
// RabbitMQ with DLQ
const channel = await connection.createChannel();

// Declare DLQ
const dlq = await channel.assertQueue('payment-dlq');

// Declare normal queue with DLQ routing
const queue = await channel.assertQueue('payment-processing', {
  arguments: {
    'x-dead-letter-exchange': '',  // Route to DLQ on failure
    'x-dead-letter-routing-key': 'payment-dlq'
  }
});

// Consumer
let retries = 0;
channel.consume(queue.queue, async (msg) => {
  try {
    const payment = JSON.parse(msg.content.toString());
    await processPayment(payment);
    channel.ack(msg);  // Success: remove from queue
    retries = 0;
  } catch (error) {
    retries++;
    if (retries > 3) {
      // Too many failures: NACK (reject)
      // Message automatically moves to DLQ
      channel.nack(msg, false, false);
    } else {
      // Retry: requeue the message
      channel.nack(msg, false, true);
    }
  }
});

// Monitor DLQ
setInterval(async () => {
  const msgCount = await channel.checkQueue('payment-dlq');
  if (msgCount.messageCount > 0) {
    alertOps(`DLQ payment-dlq has ${msgCount.messageCount} messages!`);
  }
}, 60000);
```

### DLQ Best Practices

1. **Monitor DLQ growth** — Alerts when DLQ has messages (indicates consumer bug)
2. **Auto-retry with backoff** — Exponential backoff (wait 1s, 10s, 100s before next retry)
3. **Idempotent consumers** — If message requeued, processing same message twice should be safe
4. **Manual inspection** — Dashboard to view DLQ messages, debug, and requeue

---

## 6.5 Deloitte Client Example: Document Processing Pipeline

**Scenario:** Risk team uploads documents. System needs to:
1. Store document in S3
2. Extract text
3. Classify document
4. Send notifications

Using Kafka + DLQ:

```javascript
const kafka = new Kafka({
  clientId: 'document-processor',
  brokers: ['kafka1:9092', 'kafka2:9092', 'kafka3:9092']
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'document-service' });

// Upload document → publish event
app.post('/documents', async (req, res) => {
  const doc = {
    id: generateId(),
    name: req.body.name,
    uploadedBy: req.user.id,
    uploadedAt: new Date(),
    url: null  // Will be set after upload
  };
  
  // 1. Upload file to S3
  doc.url = await s3.upload(req.file.buffer, `documents/${doc.id}`);
  
  // 2. Save to database
  await db.insert('documents', doc);
  
  // 3. Publish event
  await producer.send({
    topic: 'documents.uploaded',
    messages: [{
      key: doc.id,
      value: JSON.stringify(doc)
    }]
  });
  
  res.json(doc);
});

// Document processing consumer (can be scaled)
await consumer.subscribe({ topic: 'documents.uploaded' });

await consumer.run({
  eachMessage: async ({ message }) => {
    const doc = JSON.parse(message.value);
    
    try {
      // Extract text from document
      const text = await extractTextFromS3(doc.url);
      
      // Classify document
      const classification = await classifyWithAI(text);
      
      // Update database
      await db.query(
        'UPDATE documents SET classification = ?, extracted_text = ?, status = "processed" WHERE id = ?',
        [classification, text, doc.id]
      );
      
      console.log(`Document ${doc.id} processed: ${classification}`);
      
    } catch (error) {
      console.error(`Failed to process ${doc.id}:`, error);
      // Message will be retried (Kafka semantics)
      // After max retries, moved to DLQ
      throw error;
    }
  }
});

// DLQ consumer: handle failed messages
const dlqConsumer = kafka.consumer({ groupId: 'document-dlq-handler' });
await dlqConsumer.subscribe({ topic: 'documents.uploaded-dlq' });

await dlqConsumer.run({
  eachMessage: async ({ message }) => {
    const doc = JSON.parse(message.value);
    console.error(`DLQ: Document ${doc.id} failed processing`);
    
    // Alert team
    await sendAlert(`Document ${doc.id} failed: manual review needed`);
    
    // Update document status
    await db.query(
      'UPDATE documents SET status = "failed" WHERE id = ?',
      [doc.id]
    );
  }
});
```

---

## ✅ Quick Revision Checklist — Message Queues

- [ ] Can I explain the difference between Kafka (topic) and RabbitMQ (queue)?
- [ ] Do I know when to use Kafka vs RabbitMQ?
- [ ] Can I explain how Kafka partitions enable parallel processing?
- [ ] Do I understand Dead Letter Queue and when to use it?
- [ ] Can I explain consumer groups and how they partition work?
- [ ] Do I know the difference between Redis Pub/Sub and Kafka?
- [ ] Can I explain idempotency and why it matters for retries?
- [ ] Do I know how to monitor message queue health (lag, DLQ growth)?

