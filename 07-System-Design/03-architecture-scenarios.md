# System Design — Architecture Patterns & Interview Scenarios

## Common Architecture Patterns

### Monolith vs Microservices
```
Monolith:
┌──────────────────────────┐
│  Auth │ Orders │ Users   │  Single codebase, single deploy
│  Email│ Search │ Payment │  Simple to start, hard to scale parts independently
└──────────────────────────┘

Microservices:
┌──────┐  ┌───────┐  ┌───────┐
│ Auth │  │Orders │  │Search │   Independent deploy, own DB each
└──┬───┘  └──┬────┘  └──┬────┘   Complex operations, network overhead
   └────────┴─── API Gateway ──── Client
```

### Event-Driven Architecture
```
Order Service ──publishes──► "order.created" event
                                │
                    ┌───────────┼───────────┐
                    ▼           ▼           ▼
              Email Service  Inventory   Analytics
              (send confirm) (reserve)  (track)

Benefits: Loose coupling, easy to add new consumers
Challenges: Eventual consistency, debugging event chains
```

### CQRS (Command Query Responsibility Segregation)
```
Write (Command):  Client → API → Write DB (normalized, MySQL)
Read (Query):     Client → API → Read Store (denormalized, Elasticsearch/Redis)

Sync: Write DB → Event → Update Read Store

Use when: Read and write patterns are very different
Example: E-commerce — writes are simple order inserts,
         reads are complex searches with filters, facets, sorting
```

## System Design Interview Framework

### Step-by-Step (45 min)
```
1. Clarify Requirements (5 min)
   - Functional: What does the system do?
   - Non-functional: Scale, latency, consistency needs?
   - Constraints: Budget, team size, timeline?

2. Estimate Scale (5 min)
   - DAU, QPS (queries per second)
   - Data size (storage needs)
   - Read-heavy or write-heavy?

3. High-Level Design (10 min)
   - Core components and data flow
   - API design
   - Database choice

4. Deep Dive (15 min)
   - Database schema
   - Caching strategy
   - Scaling bottlenecks
   - Edge cases

5. Wrap Up (5 min)
   - Trade-offs made
   - What would change at 10x scale
   - Monitoring & alerting
```

## Scenario: Design a URL Shortener

### Requirements
- Shorten long URL → short URL (e.g., bit.ly/abc123)
- Redirect short URL → original URL
- Analytics (click count)
- Scale: 100M URLs, 10K writes/sec, 100K reads/sec

### API Design
```
POST /api/shorten    { url: "https://..." }  → { shortUrl: "https://short.ly/abc123" }
GET  /:code          → 302 Redirect to original URL
GET  /api/stats/:code → { clicks: 1234, created: "..." }
```

### Database
```sql
CREATE TABLE urls (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(7) UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    user_id INT,
    clicks BIGINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_code (code)
);
```

### Short Code Generation
```javascript
// Base62 encoding (0-9, a-z, A-Z)
function encode(num) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    while (num > 0) {
        result = chars[num % 62] + result;
        num = Math.floor(num / 62);
    }
    return result;
}
// 7 chars → 62^7 = 3.5 trillion unique codes

// Option 1: Auto-increment ID → Base62
const id = await insertUrl(originalUrl); // DB auto-increment
const code = encode(id);

// Option 2: Random + check collision
const code = crypto.randomBytes(5).toString('base62').slice(0, 7);
```

### Architecture
```
Client → CDN/Cache → Load Balancer → API Servers → Redis Cache → MySQL
                                                       ↑
                                                  Read: cache-aside
                                                  Write: write-through
```

### Scaling
```
- Redis cache for hot URLs (99% reads hit cache)
- Read replicas for MySQL
- Rate limit writes per user
- Analytics: async increment via queue (don't slow redirects)
- CDN for static assets
```

## Scenario: Design a Chat System

### Requirements
- 1:1 and group messaging
- Online/offline status
- Message history
- Scale: 10M DAU, 50K concurrent connections

### Architecture
```
Client ──WebSocket──► WS Server ──Redis Pub/Sub──► Other WS Servers
                         │
                    Message Queue
                         │
                    Message Store (MongoDB / Cassandra)
```

### Key Decisions
```
1. Transport:    WebSocket for real-time (fallback: SSE, long-polling)
2. Message Store: MongoDB (flexible schema, good for chat)
3. Online Status: Redis SET + TTL (heartbeat every 30s)
4. Group Chat:   Fan-out on write (small groups) or fan-out on read (large channels)
5. Message Ordering: Snowflake IDs (timestamp + machine + sequence)
```

### Schema (MongoDB)
```javascript
// Messages collection
{
    _id: ObjectId(),
    conversationId: "conv_123",
    senderId: "user_456",
    content: "Hey, how's it going?",
    type: "text",  // text, image, file
    createdAt: ISODate(),
    readBy: ["user_789"]
}

// Conversations collection
{
    _id: "conv_123",
    type: "group",  // "direct" or "group"
    participants: ["user_456", "user_789", "user_012"],
    lastMessage: { content: "Hey...", senderId: "user_456", at: ISODate() },
    updatedAt: ISODate()
}

// Indexes
db.messages.createIndex({ conversationId: 1, createdAt: -1 });
db.conversations.createIndex({ participants: 1, updatedAt: -1 });
```

## Scenario: Design a Search System (OpenSearch/Elasticsearch)

### Architecture (relevant to your UTEC experience)
```
Write Path:
App → DB (MySQL) → Change Data Capture → Queue → Elasticsearch Indexer

Read Path:
Client → API → Elasticsearch → Return results (with highlights, facets)
```

### Elasticsearch Index Design
```json
{
    "mappings": {
        "properties": {
            "title":       { "type": "text", "analyzer": "standard" },
            "description": { "type": "text", "analyzer": "standard" },
            "category":    { "type": "keyword" },
            "price":       { "type": "float" },
            "tags":        { "type": "keyword" },
            "createdAt":   { "type": "date" }
        }
    }
}
```

### Search Query (Node.js)
```javascript
const results = await esClient.search({
    index: 'products',
    body: {
        query: {
            bool: {
                must: [
                    { multi_match: {
                        query: searchTerm,
                        fields: ['title^3', 'description', 'tags^2'], // boost title 3x
                        fuzziness: 'AUTO'
                    }}
                ],
                filter: [
                    { term: { category: 'electronics' } },
                    { range: { price: { gte: 100, lte: 1000 } } }
                ]
            }
        },
        highlight: {
            fields: { title: {}, description: {} }
        },
        aggs: {
            categories: { terms: { field: 'category' } },
            price_ranges: {
                range: { field: 'price', ranges: [
                    { to: 100 }, { from: 100, to: 500 }, { from: 500 }
                ]}
            }
        },
        from: 0,
        size: 20
    }
});
```

## Interview Questions

**Q: How would you design a system that handles 100K requests/sec?**
> Load balancer → multiple stateless API servers → Redis cache (reduce DB hits) → read replicas for DB → async processing via queues for non-critical tasks → CDN for static content. Key: identify bottleneck (usually DB), cache aggressively, scale horizontally.

**Q: How do you ensure data consistency across microservices?**
> Saga pattern: each service performs its transaction and publishes an event. If one fails, compensating transactions undo previous steps. Or use outbox pattern: write event to outbox table (same transaction as business data), separate process publishes events. Avoid distributed transactions (2PC) — slow and fragile.

**Q: Explain eventual consistency with an example.**
> After posting on social media, your post appears immediately to you (read-your-own-writes consistency) but may take seconds to appear in followers' feeds (eventual consistency). The system prioritizes availability over immediate consistency. Eventually (within seconds), all replicas converge.

**Q: Design the backend for a dashboard showing real-time analytics.**
> Ingestion: events → Kafka/Kinesis → process (aggregate) → store pre-computed metrics in Redis/TimescaleDB. Display: WebSocket connection for live updates, REST API for historical data. Pre-aggregate by minute/hour/day to avoid expensive queries. Use materialized views for complex dashboards.
