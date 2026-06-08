# 🏆 Classic Design Problems

> **Chief Architect Note:** These are not toy problems. Every one maps to real systems at scale. Your ability to reason through them under pressure is what separates senior engineers from the rest.

---

## 8.1 URL Shortener (bit.ly)

### Requirements

- Shorten long URLs: `GET /shorten?url=https://example.com/very/long/path` → returns `bit.ly/a1b2c3`
- Redirect: `GET /a1b2c3` → 301 redirect to original URL
- Analytics: Track click count per shortened URL
- Expiry: URLs can have expiration dates

### Key Design Decisions

**Short Code Generation:**
```javascript
// Option 1: Base62 encoding of auto-incremented ID
// ID: 1 → 'a'
// ID: 62 → '10' (1*62 + 0)
// ID: 3844 → '10a' (1*62^2 + 0*62 + 10)

function idToShortCode(id) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  while (id > 0) {
    code = chars[id % 62] + code;
    id = Math.floor(id / 62);
  }
  return code;
}

// Advantage: Sequentially generated IDs scale well (no hash collisions)
// Disadvantage: Predictable (user can guess next short code)

// Option 2: MD5 hash truncated to 7 chars
const hash = md5(originalUrl).substring(0, 7);
// Advantage: Not predictable
// Disadvantage: Collision risk (rare but possible)
```

**Database Schema:**
```sql
CREATE TABLE shortened_urls (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  original_url TEXT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NULL,
  click_count INT DEFAULT 0,
  INDEX idx_short_code (short_code),
  INDEX idx_user_id (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE url_clicks (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  short_code VARCHAR(10) NOT NULL,
  user_ip VARCHAR(45),
  user_agent TEXT,
  clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_short_code_date (short_code, clicked_at)
);
```

**Implementation:**
```javascript
// Shorten URL
app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  
  // Check if already shortened
  let row = await db.query(
    'SELECT short_code FROM shortened_urls WHERE original_url = ? AND user_id = ?',
    [originalUrl, req.user.id]
  );
  if (row) return res.json({ shortCode: row.short_code });
  
  // Generate short code from auto-incremented ID
  const result = await db.query(
    'INSERT INTO shortened_urls (original_url, user_id) VALUES (?, ?)',
    [originalUrl, req.user.id]
  );
  const shortCode = idToShortCode(result.insertId);
  
  // Update with short code
  await db.query('UPDATE shortened_urls SET short_code = ? WHERE id = ?', [shortCode, result.insertId]);
  
  res.json({ shortCode });
});

// Redirect
app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  
  // Check cache first
  let url = await redis.get(`url:${shortCode}`);
  if (!url) {
    // Cache miss: fetch from DB
    const row = await db.query('SELECT original_url, expires_at FROM shortened_urls WHERE short_code = ?', [shortCode]);
    
    if (!row || (row.expires_at && new Date() > row.expires_at)) {
      return res.status(404).json({ error: 'URL not found or expired' });
    }
    
    url = row.original_url;
    // Cache for 24 hours
    await redis.setex(`url:${shortCode}`, 86400, url);
  }
  
  // Increment click count asynchronously (write-back caching)
  redis.incr(`clicks:${shortCode}`);
  
  // 301 Permanent redirect (browser caches it)
  res.redirect(301, url);
});

// Analytics: flush click counts to DB every minute
setInterval(async () => {
  const keys = await redis.keys('clicks:*');
  for (const key of keys) {
    const shortCode = key.replace('clicks:', '');
    const count = await redis.get(key);
    await db.query('UPDATE shortened_urls SET click_count = click_count + ? WHERE short_code = ?', [count, shortCode]);
    await redis.del(key);
  }
}, 60000);
```

**Scalability:**
- ID generation: Distributed ID service (Snowflake) to avoid single DB bottleneck
- Click counting: Redis write-back (eventual consistency acceptable for analytics)
- Redirect: 99% reads → HTTP 301 (browser caches, no future requests to server)
- CDN: Cache redirect responses with 24h TTL

---

## 8.2 Design Twitter Feed

### Requirements

- Post: Create a tweet (max 280 chars), attach media
- Feed: Get 20 most recent tweets from followed users
- Like: Like a tweet, see like count
- Retweet: Share someone else's tweet
- Real-time: Other users see my tweet within seconds

### Architecture Decision: Fan-Out on Write

```
When user posts tweet:
  ├─ Store tweet in central database
  └─ Publish "tweet created" event
      ├─ For each follower: add tweet_id to their Redis feed list
      └─ This is called "fan-out": write once, read many times

When user loads feed:
  ├─ Query their Redis feed list
  ├─ Fetch tweet details from cache/DB
  └─ Return immediately (sub-100ms)

Tradeoff:
  ├─ Write is slower (fan-out to all followers)
  └─ Read is very fast (pre-computed feed)

Best for: Most users have moderate followers (<10M)
```

**Celebrity Problem: User with 100M followers**

```
When @elonmusk tweets:
  ├─ Fan-out: write to 100M follower feeds
  ├─ Takes ~10 minutes to fan-out to Redis
  └─ During this time, not all followers see the tweet yet

Solution: Hybrid fan-out
  ├─ Regular users: pre-compute feed (fan-out on write)
  └─ Celebrities: don't pre-compute, fetch at read time + cache
      └─ When someone loads feed:
         ├─ Fetch pre-computed timeline from regular users
         ├─ Fetch recent tweets from followed celebrities (query at read time)
         └─ Merge + sort by timestamp
```

**Database Schema:**
```sql
CREATE TABLE tweets (
  id BIGINT PRIMARY KEY,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  like_count INT DEFAULT 0,
  retweet_count INT DEFAULT 0,
  INDEX idx_user_id_created (user_id, created_at DESC)
);

CREATE TABLE followers (
  follower_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (follower_id, user_id)
);

CREATE TABLE feed (
  user_id INT NOT NULL,
  tweet_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, created_at DESC),
  INDEX idx_user_created (user_id, created_at DESC)
);
```

**Redis Structure:**
```
feed:user:123 = [tweet_999, tweet_998, tweet_997, ...]  (Sorted Set, sorted by timestamp)
```

**Implementation:**
```javascript
// Post tweet
app.post('/tweets', async (req, res) => {
  const tweet = {
    id: generateId(),
    userId: req.user.id,
    content: req.body.content,
    createdAt: new Date()
  };
  
  await db.insert('tweets', tweet);
  
  // Fan-out: publish event
  await kafka.producer().send({
    topic: 'tweets.created',
    messages: [{ key: tweet.userId, value: JSON.stringify(tweet) }]
  });
  
  res.json(tweet);
});

// Fan-out consumer (scales horizontally)
async function fanOutTweet() {
  const consumer = kafka.consumer({ groupId: 'feed-fanout' });
  await consumer.subscribe({ topic: 'tweets.created' });
  
  await consumer.run({
    eachMessage: async ({ message }) => {
      const tweet = JSON.parse(message.value);
      
      // Get all followers of this user
      const followers = await db.query(
        'SELECT follower_id FROM followers WHERE user_id = ?',
        [tweet.userId]
      );
      
      // Add tweet to each follower's feed (in parallel)
      const promises = followers.map(({ followerId }) =>
        redis.zadd(`feed:${followerId}`, tweet.createdAt.getTime(), tweet.id)
      );
      
      await Promise.all(promises);
    }
  });
}

// Get feed
app.get('/feed', async (req, res) => {
  const userId = req.user.id;
  
  // Get tweet IDs from Redis feed (ordered by most recent)
  const tweetIds = await redis.zrevrange(`feed:${userId}`, 0, 19);  // 20 tweets
  
  // Fetch tweet details from cache or DB
  const tweets = await Promise.all(
    tweetIds.map(tweetId =>
      redis.get(`tweet:${tweetId}`)  // Try cache
        .then(cached => cached ? JSON.parse(cached) : null)
        .then(cached => cached || db.query('SELECT * FROM tweets WHERE id = ?', [tweetId]))
    )
  );
  
  res.json(tweets);
});
```

---

## 8.3 Design WhatsApp (Chat System)

### Requirements

- Send message: User A sends message to User B
- Delivery: Message delivered even if recipient offline
- Read receipts: Know when message was delivered and read
- Typing indicator: See when someone is typing
- Media: Send images, videos, documents

### Key Insight: WebSocket for Real-Time + Queue for Offline

```
Online scenario:
  User A (connected via WebSocket) → Sends message
    ├─ Message delivered to User B via WebSocket (instant)
    └─ Both see read receipt immediately

Offline scenario:
  User B is offline
    ├─ Message stored in SQS queue (durable)
    └─ When User B comes online, fetch queued messages
    └─ Both see message and read receipt
```

**Database Schema:**
```sql
CREATE TABLE messages (
  id BIGINT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  delivered_at TIMESTAMP NULL,
  read_at TIMESTAMP NULL,
  INDEX idx_conversation (sender_id, receiver_id, created_at DESC)
);

CREATE TABLE conversation (
  id BIGINT PRIMARY KEY,
  user_1_id INT NOT NULL,
  user_2_id INT NOT NULL,
  last_message_id BIGINT,
  created_at TIMESTAMP,
  UNIQUE KEY (user_1_id, user_2_id)
);

CREATE TABLE presence (
  user_id INT PRIMARY KEY,
  status VARCHAR(20),  -- 'online', 'offline', 'away'
  last_seen TIMESTAMP,
  device_type VARCHAR(20)  -- 'mobile', 'web', 'desktop'
);
```

**Cassandra for Messages (append-heavy):**
```
Partition key: conversation_id
Clustering key: created_at DESC

Result: All messages for a conversation stored together, ordered by time
```

**Implementation:**
```javascript
// WebSocket connection
const wss = new WebSocket.Server({ noServer: true });
const connectedUsers = new Map();  // userId → [socket1, socket2, ...]

app.get('/ws', (req, res) => {
  const userId = req.user.id;
  
  server.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
    // Track this connection
    if (!connectedUsers.has(userId)) {
      connectedUsers.set(userId, []);
    }
    connectedUsers.get(userId).push(ws);
    
    // Update presence
    redis.set(`presence:${userId}`, JSON.stringify({
      status: 'online',
      lastSeen: new Date(),
      devices: connectedUsers.get(userId).length
    }));
    
    // Handle incoming message
    ws.on('message', async (raw) => {
      const { type, recipientId, content } = JSON.parse(raw);
      
      if (type === 'message') {
        const message = {
          id: generateId(),
          senderId: userId,
          recipientId: recipientId,
          content: content,
          createdAt: new Date()
        };
        
        // Save to database
        await db.insert('messages', message);
        
        // Try to deliver online
        const recipientSockets = connectedUsers.get(recipientId) || [];
        if (recipientSockets.length > 0) {
          // Recipient is online: send via WebSocket
          recipientSockets.forEach(socket =>
            socket.send(JSON.stringify({
              type: 'message',
              ...message,
              deliveredAt: new Date()
            }))
          );
          
          // Mark delivered
          await db.query('UPDATE messages SET delivered_at = NOW() WHERE id = ?', [message.id]);
        } else {
          // Recipient offline: queue in SQS for later delivery
          await sqs.sendMessage({
            QueueUrl: `https://sqs.us-east-1.amazonaws.com/123/user-${recipientId}`,
            MessageBody: JSON.stringify(message)
          });
        }
      }
    });
  });
});

// Fetch pending messages when user comes online
app.post('/messages/pending', async (req, res) => {
  const userId = req.user.id;
  
  // Get messages from queue
  const messages = await sqs.receiveMessage({
    QueueUrl: `https://sqs.us-east-1.amazonaws.com/123/user-${userId}`,
    MaxNumberOfMessages: 10
  });
  
  const pendingMessages = messages.Messages.map(msg => JSON.parse(msg.Body));
  
  res.json(pendingMessages);
});
```

---

## 8.4 Design YouTube

### Requirements

- Upload: User uploads video
- Encoding: Convert to multiple resolutions
- Streaming: User watches video with adaptive bitrate
- Search: Full-text search for videos
- Recommendations: Personalized recommendations

### Key Decision: Encode Multiple Resolutions

```
User uploads 4K video (50GB raw)
  ├─ Encode to 4K (HEVC) → 5GB
  ├─ Encode to 1080p (H.264) → 2GB
  ├─ Encode to 720p → 1GB
  ├─ Encode to 480p → 500MB
  └─ Encode to 360p → 200MB

User watches from phone:
  ├─ Phone detects network: 4G LTE (5 Mbps)
  ├─ Requests 360p video (500 kbps)
  ├─ Video plays smoothly
  
User watches from desktop:
  ├─ Desktop detects network: Fiber (100 Mbps)
  ├─ Requests 1080p video (5 Mbps)
  ├─ Video plays smoothly

Adaptive bitrate: Client switches resolution based on network quality
```

**Architecture:**
```
Upload → S3 Raw Bucket
  ↓ (trigger Lambda)
Encoding Service (auto-scaled by queue depth)
  ├─ Worker 1: Encodes 4K
  ├─ Worker 2: Encodes 1080p
  ├─ Worker 3: Encodes 720p
  └─ ... (up to 100 workers)
  ↓ (output)
S3 Encoded Bucket (organized by video_id/resolution/)
  ↓ (cache on CDN)
CloudFront (edge locations globally)
  ↓ (HLS playlist)
Player (dynamically selects resolution)
```

**HLS (HTTP Live Streaming):**
```
master.m3u8 (playlist file):
  #EXTM3U
  #EXT-X-STREAM-INF:BANDWIDTH=500000
  stream-360p.m3u8
  #EXT-X-STREAM-INF:BANDWIDTH=2000000
  stream-720p.m3u8
  #EXT-X-STREAM-INF:BANDWIDTH=5000000
  stream-1080p.m3u8

stream-360p.m3u8 (segment list):
  #EXTM3U
  #EXT-X-TARGETDURATION:10
  segment1.ts  (10 second video chunk)
  segment2.ts
  segment3.ts
  ...

Player logic:
  ├─ Fetch master.m3u8 (which resolutions available)
  ├─ Measure network speed (request first segment)
  ├─ Select appropriate resolution (bandwidth)
  ├─ Download segments in parallel (buffer 20 seconds)
  ├─ If network drops, switch to lower resolution
  └─ Play smoothly from buffer
```

---

## 8.5 Design Uber (Ride-Sharing)

### Requirements

- Request ride: User requests ride from A to B
- Matching: Find nearby driver
- Tracking: Real-time location updates
- Payment: Process payment after ride
- Rating: Users rate each other

### Key Decision: Redis GeoHash for Location

```
Redis GeoHash stores driver locations as (latitude, longitude) on a sorted set:

GEOADD drivers 13.361389 38.115556 "driver:123"  (Sicily)
GEOADD drivers 15.087269 37.502669 "driver:456"  (Sicily nearby)
GEOADD drivers 12.496366 37.211267 "driver:789"  (Sicily further)

User requests ride from location (13.5, 38.5):
  GEORADIUS drivers 13.5 38.5 50 km
  → Returns: ["driver:123", "driver:456"]  (within 50km radius)
  → Select closest: "driver:123"
  → Assign ride to driver:123

Driver accepts, starts moving:
  GEOADD drivers 13.362 38.115 "driver:123"  (update location every 5s)

Rider track driver:
  GEOPOS drivers driver:123  → [13.362, 38.115]
```

**Architecture:**
```
Rider App → API Gateway → Matching Service
                            ├─ Query Redis GeoHash for nearby drivers
                            ├─ Calculate ETA (using map API)
                            └─ Assign ride to closest available driver

Driver App → API Gateway → Location Service
                            ├─ Receives GPS every 5 seconds
                            ├─ Updates Redis GeoHash
                            └─ Publishes location to Kafka stream

Real-time Updates → WebSocket → Rider App (tracks driver)
                                Driver App (sees pickup location)
```

---

## 8.6 & 8.7 & 8.8: Other Classic Problems

*Due to space, I'm providing the architecture snippets:*

### 8.6 Design Distributed Rate Limiter

```javascript
// Token Bucket in Redis (handles distributed scenarios)
async function isAllowed(clientId, limit, windowSeconds) {
  const key = `rate:${clientId}`;
  const now = Math.floor(Date.now() / 1000);
  const window = Math.floor(now / windowSeconds);
  
  // Use Lua script for atomic operation
  const script = `
    local key = KEYS[1]
    local limit = tonumber(ARGV[1])
    local window = tonumber(ARGV[2])
    
    local current = redis.call('HGET', key, 'count')
    local lastWindow = redis.call('HGET', key, 'window')
    
    if lastWindow ~= window then
      redis.call('HSET', key, 'count', 1)
      redis.call('HSET', key, 'window', window)
      redis.call('EXPIRE', key, window + 1)
      return 1
    end
    
    if tonumber(current) < limit then
      redis.call('HINCRBY', key, 'count', 1)
      return 1
    end
    return 0
  `;
  
  const allowed = await redis.eval(script, 1, key, limit, window);
  return allowed === 1;
}
```

### 8.7 Design Notification System

```
Notification Service (API) → Message Queue (Kafka)
  ├─ Email Worker → SendGrid API
  ├─ SMS Worker → Twilio API
  ├─ Push Worker → FCM/APNs
  └─ In-App Worker → WebSocket

Deduplication: Idempotency Key in Redis
  If same event triggered twice:
    ├─ First: Send notification, store idempotency_key in Redis
    └─ Second: Check cache, notification already sent
```

### 8.8 Design Search Autocomplete

```
Offline trie building:
  ├─ Analyze query logs (daily)
  ├─ Build trie with top-10 completions per prefix
  └─ Push to all autocomplete service instances

Online query:
  ├─ Check Redis cache (hot prefixes)
  ├─ If hit: return suggestions <100ms
  ├─ If miss: query in-memory trie
  └─ Update cache TTL
```

---

## ✅ Quick Revision Checklist — Classic Design Problems

- [ ] Can I design a URL shortener with ID generation, caching, and analytics?
- [ ] Can I describe fan-out architecture and the celebrity problem for Twitter feed?
- [ ] Can I explain WebSocket + queue architecture for WhatsApp offline delivery?
- [ ] Can I explain HLS and adaptive bitrate streaming for YouTube?
- [ ] Can I design Uber with Redis GeoHash for real-time location matching?
- [ ] Can I explain the architecture for a distributed rate limiter?
- [ ] Can I design a notification system with channel workers and deduplication?
- [ ] Can I describe Trie + Redis cache for autocomplete at scale?

