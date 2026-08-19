---
topic: Networking Basics (HTTP/HTTPS, DNS, TCP/UDP, REST/WebSocket)
level: expert
status: solid
last_reviewed: 2026-08-19
next_review: 2026-08-20
---

# 📡 Networking Basics

> **Chief Architect Note:** Every system design conversation starts with understanding how data physically travels. This is where your system's latency, security, and reliability are determined.

---

## 1.1 HTTP / HTTPS

### Core Concept

HTTP is a **stateless, request-response protocol** over TCP. Client sends a request (method + URL + headers + body), server processes it, sends back a response (status + headers + body), and the connection is closed (or reused with HTTP Keep-Alive).

HTTPS is HTTP wrapped in **TLS encryption**. The connection handshake establishes a shared encryption key, then all data is encrypted before transmission.

### The HTTP Request/Response Cycle

```
Client                                           Server
  |                                               |
  |------- TCP SYN ------>                       |
  |<------ TCP SYN-ACK -----                      |
  |------- TCP ACK ------>                       |
  |   (Connection established)                   |
  |                                               |
  |------- TLS ClientHello -->                   |
  |<----- TLS ServerHello -----                   |
  |------- TLS ClientKeyExchange -->             |
  |   (TLS handshake complete, shared key)       |
  |                                               |
  |------- HTTP Request (encrypted) -->          |
  |<------ HTTP Response (encrypted) ----        |
  |                                               |
  |   (Keep-Alive: connection stays open)        |
```

### HTTP Methods & Semantics

| Method | Idempotent | Safe | Use Case |
|--------|-----------|------|----------|
| GET | ✅ | ✅ | Retrieve resource, no side effects |
| POST | ❌ | ❌ | Create resource, can have side effects |
| PUT | ✅ | ❌ | Full update of resource |
| PATCH | ❌ | ❌ | Partial update of resource |
| DELETE | ✅ | ❌ | Remove resource |
| HEAD | ✅ | ✅ | Like GET but no body (check if resource exists) |

**Enterprise Tip:** Proper HTTP method semantics matter for API reliability. A `GET` that mutates state is broken — proxies and CDNs may cache it, causing unexpected behavior.

### HTTP Status Codes (Grouped)

```
1xx Informational
  100 Continue — "Send request body now"
  
2xx Success
  200 OK — Request succeeded
  201 Created — New resource created (include Location header)
  204 No Content — Success but no response body
  
3xx Redirect
  301 Moved Permanently — Old URL will never come back (browser caches)
  302 Found — Temporary redirect (browser won't cache)
  304 Not Modified — Resource unchanged since If-Modified-Since (save bandwidth)
  
4xx Client Error
  400 Bad Request — Malformed request
  401 Unauthorized — Authentication needed
  403 Forbidden — Authenticated, but not authorized (lack permissions)
  404 Not Found — Resource doesn't exist
  409 Conflict — Request conflicts with current state (e.g., duplicate user email)
  429 Too Many Requests — Rate limited
  
5xx Server Error
  500 Internal Server Error — Unhandled exception
  502 Bad Gateway — Upstream server returned invalid response
  503 Service Unavailable — Server temporarily overloaded (try later)
  504 Gateway Timeout — Upstream server didn't respond in time
```

**Chief Architect Insight:** 
- Return `201 Created` + `Location` header when creating resources — clients can immediately fetch the new resource.
- Use `409 Conflict` for business logic violations (duplicate email), not `400`.
- For rate limiting, return `429` with `Retry-After` header — clients know to wait.

### HTTPS: The TLS Handshake Deep Dive

```javascript
// Client-side perspective (Node.js)
const https = require('https');

const options = {
  hostname: 'api.example.com',
  port: 443,
  path: '/data',
  method: 'GET',
  // TLS handshake happens here automatically
};

const req = https.request(options, (res) => {
  // res.socket.getProtocol() → 'TLSv1.3'
  // res.socket.getCipher() → { name: 'TLS_AES_256_GCM_SHA384', ... }
  console.log(`Using ${res.socket.getProtocol()}`);
});

req.end();
```

**TLS 1.3 vs 1.2:**
- TLS 1.2: Separate handshake (2 round trips) → encrypted application data
- TLS 1.3: Combined handshake (1 round trip) → encrypted application data immediately
- In 2026, TLS 1.3 is standard; anything else is a security audit finding.

### HTTP Keep-Alive & Pipelining

```
Without Keep-Alive (HTTP 1.0 style):
Request 1 → Response 1 → Connection close
Request 2 → New TCP connection → Response 2 → Connection close
(2 TCP handshakes, 2 TLS handshakes)

With Keep-Alive (HTTP 1.1 default):
Request 1 → Response 1 ⎬
Request 2 → Response 2 ⎭ Same TCP connection (1 TLS handshake)

With HTTP/2 Multiplexing:
Request 1 ⎬
Request 2 ⎭ Simultaneously on same TCP connection
Request 3 ⎭ (single TLS handshake, interleaved responses)
```

**Interview Tip:** "For an API-heavy system, HTTP Keep-Alive is crucial — it reduces latency from 200ms down to 20ms by reusing connections. Configure your load balancer and client libraries to keep connections alive."

### Real-World Scenario: EY Risk.ai Document Fetching

Your EY Risk.ai system needs to fetch risk documents from external APIs (Bloomberg, Reuters). Each document fetch is a separate HTTPS request.

**Problem:** Old code made 1000 requests sequentially, each opening a new TCP/TLS connection. Total time: ~3 minutes.

**Solution:** Use HTTP Keep-Alive + connection pooling:

```javascript
const https = require('https');

// Create a persistent agent that reuses connections
const agent = new https.Agent({
  keepAlive: true,           // Reuse TCP connections
  maxSockets: 32,            // Max parallel connections per host
  maxFreeSockets: 10,        // Keep 10 idle connections open
  timeout: 30000,            // Socket timeout
  keepAliveMsecs: 1000       // Send Keep-Alive probe every 1s
});

async function fetchDocuments(urls) {
  const promises = urls.map(url => 
    https.get(url, { agent }, res => handleResponse(res))
  );
  return Promise.all(promises);
}

// Now 1000 requests use ~32 connections total (reused), not 1000 separate ones
// Time: ~3 seconds instead of 3 minutes
```

### Common Interview Follow-ups

**Q: Why return 201 with Location header instead of just 200?**
A: The client gets the resource's URL immediately. In distributed systems, the new resource might not be visible in all replicas yet (replication lag). The Location header lets the client fetch from the exact place where it was created.

**Q: What's the difference between 401 and 403?**
A: 401 means "prove who you are" (missing/invalid credentials). 403 means "I know who you are, but you don't have permission" (insufficient authorization/role). Frontend should redirect 401 to login page, but redirect 403 to "Access Denied" page.

**Q: Is HTTP/2 always faster than HTTP/1.1?**
A: HTTP/2 multiplexing is faster for many concurrent requests. But if you're making sequential requests with large response bodies, HTTP/1.1 Keep-Alive might be simpler and comparable. HTTP/3 (QUIC) is even better — built on UDP, faster handshake.

---

## 1.2 DNS (Domain Name System)

### Core Concept

DNS translates `example.com` (domain name) to `93.184.216.34` (IP address). Without it, you'd need to remember IP addresses for every website.

### DNS Hierarchy & Lookup Flow

```
User types: example.com in browser
              ↓
1. Browser checks local cache (memory)
              ↓
2. Browser sends query to Recursive Resolver (ISP or 8.8.8.8)
              ↓
3. Resolver checks its cache, then queries Root Nameserver
   "Where is example.com?"
              ↓
4. Root Nameserver responds: "Ask the .com TLD server"
              ↓
5. Resolver queries .com TLD Nameserver
   "Where is example.com?"
              ↓
6. TLD responds: "Ask ns1.example.com (authoritative)"
              ↓
7. Resolver queries ns1.example.com (Authoritative Nameserver)
   "What's the IP for example.com?"
              ↓
8. Authoritative Nameserver responds: 93.184.216.34
              ↓
9. Resolver caches result (TTL = 3600s) and returns to browser
              ↓
10. Browser caches result (TTL = varies) and connects to 93.184.216.34
```

**Latency Breakdown (typical):**
- Local cache hit: 0ms
- ISP recursive resolver: 5–20ms
- Full lookup (cache miss): 100–500ms

### DNS Record Types

| Record | Purpose | Example |
|--------|---------|---------|
| A | IPv4 address | `example.com` → `93.184.216.34` |
| AAAA | IPv6 address | `example.com` → `2606:2800:220:1:248:...` |
| CNAME | Alias to another domain | `www.example.com` → `example.com` |
| MX | Mail server for domain | `example.com` → `mail.example.com` (priority 10) |
| TXT | Arbitrary text (SPF, DKIM, verification) | `example.com` → `"v=spf1 include:..."` |
| NS | Nameserver for domain | `example.com` → `ns1.example.com` |

### DNS Load Balancing & Geo-Routing (AWS Route 53)

Instead of returning a single IP, Route 53 can return different IPs based on:

1. **Round-robin:** Rotate through multiple IPs
   ```
   example.com → 1.1.1.1
   example.com → 2.2.2.2
   example.com → 3.3.3.3
   example.com → 1.1.1.1 (cycle repeats)
   ```

2. **Latency-based routing:** Return the IP of the server closest to the user
   ```
   User in Singapore → example.com → Singapore data center IP
   User in New York → example.com → Virginia data center IP
   ```

3. **Failover routing:** If primary server is unhealthy, return secondary IP
   ```
   Health check on 1.1.1.1 → FAIL
   example.com → 2.2.2.2 (secondary)
   ```

4. **Weighted routing:** A/B testing — 90% traffic to v1, 10% to v2
   ```
   example.com (90%) → 1.1.1.1 (new version)
   example.com (10%) → 2.2.2.2 (canary)
   ```

### DNS in Enterprise Architectures

**For Deloitte Client Scenario (Financial Services):**

```
DNS Entry: api.financial-client.com (TTL = 60s for quick failover)
  ├─ Route 53 health checks every 30s on both endpoints
  ├─ Primary: us-east-1.api.internal (production)
  └─ Secondary: us-west-2.api.backup (warm standby)
  
If primary fails:
  - Route 53 detects failure in ~30s
  - Switches all traffic to secondary
  - Client DNS cache expires in 60s, refetches → gets secondary IP
```

### Node.js DNS Resolution

```javascript
const dns = require('dns').promises;

// Simple lookup
const address = await dns.resolve4('example.com');
console.log(address); // ['93.184.216.34']

// All record types
const records = await dns.resolveSoa('example.com');
console.log(records); // { nsname: 'ns1.example.com', ... }

// Reverse lookup (IP → domain)
const hostname = await dns.reverse('93.184.216.34');
console.log(hostname); // ['example.com']
```

### TTL (Time To Live): The Critical Parameter

**Too Short TTL (10s):**
- ✅ DNS changes propagate immediately
- ❌ DNS servers hammered with queries
- ❌ Every client lookup hits authoritative server
- ❌ Failover is fast (30–60s)
- **Use case:** During deployments/failovers

**Too Long TTL (86400s = 1 day):**
- ✅ DNS servers relaxed
- ✅ Fewer queries overall
- ❌ Changes take 24 hours to propagate
- ❌ Failover slow (client still connects to old IP)
- **Use case:** Static, rarely-changing addresses

**Standard Best Practice:** TTL = 300s (5 minutes)
- Changes propagate in ~10 minutes
- Reasonable load on DNS servers
- Failover in ~5–10 minutes

**Chief Architect Insight:** For critical services, Route 53 health checks can detect failures in 30s with a TTL of 60s — you get sub-minute failover. For non-critical services, TTL = 3600s to reduce operational overhead.

### Common Interview Follow-ups

**Q: Why not use DNS for load balancing instead of a load balancer?**
A: DNS round-robin doesn't work well because:
  1. Clients cache DNS results (may not round-robin evenly)
  2. No real-time health checks (failed server still gets traffic)
  3. Geolocation-based routing adds latency (DNS lookup → returned IP may not be truly closest)
  
Use DNS for geographic routing (failover between regions), but use an L7 load balancer (ALB, NGINX) for server-level load balancing.

**Q: Can a CDN change its IP address and break my DNS cache?**
A: Yes. CDNs often have geo-routed DNS — `cdn.example.com` may resolve to different IPs from different locations. That's why CDNs provide a CNAME, not an IP. You point your DNS to the CDN's CNAME, and the CDN's DNS handles the geo-routing.

---

## 1.3 TCP vs UDP

### TCP (Transmission Control Protocol)

**Characteristics:**
- **Connection-oriented:** Establish connection (3-way handshake) before data transfer
- **Guaranteed delivery:** Retransmit lost packets
- **Ordered delivery:** Packets arrive in the order sent
- **Flow control:** Sender doesn't overwhelm receiver
- **Error detection:** Checksums detect corruption

**Overhead:**
- Initial handshake: ~1 round trip (RTT)
- Acknowledgments for each packet
- Retransmission on loss (increases latency)

**Use Cases:**
- **HTTP/HTTPS** — web APIs, web services
- **SSH** — secure remote command execution
- **Email** (SMTP, IMAP) — need guaranteed delivery
- **Database connections** — MySQL, PostgreSQL
- **File transfers** (FTP, SCP) — can't afford data loss

### UDP (User Datagram Protocol)

**Characteristics:**
- **Connectionless:** No handshake, just send packets
- **Best-effort delivery:** Packets may be lost (no retransmission)
- **Unordered delivery:** Packets may arrive out of order
- **No flow control:** Sender can overwhelm receiver (your problem)
- **Minimal overhead:** Small header, fast processing

**Use Cases:**
- **DNS queries** — simple query-response, can retry
- **Video streaming** — dropped frame is better than buffering
- **Online gaming** — latency matters more than perfection
- **VoIP** — dropped audio packet is acceptable
- **IoT sensors** — high volume, low criticality (1% loss OK)
- **Multicast/Broadcast** — send to many recipients simultaneously

### Head-of-Line Blocking Problem

**TCP:** If packet 1 is lost and packet 2 arrives, TCP buffers packet 2 and waits for packet 1 to be retransmitted. Application can't process packet 2 until packet 1 arrives — **head-of-line blocking.**

```
Sender: 1 ──→ X (lost)
        2 ──→ Receiver (arrived, but buffered)
        3 ──→ Receiver (arrived, but buffered)
        
Receiver: Still waiting for packet 1. Packets 2, 3 are useless until 1 arrives.
```

**UDP:** If packet 1 is lost, packets 2 and 3 are immediately available to the application.

```
Sender: 1 ──→ X (lost)
        2 ──→ Receiver (immediately available)
        3 ──→ Receiver (immediately available)
```

### TCP MSS (Maximum Segment Size) & Fragmentation

```javascript
// TCP tries to fit data into one network frame (MTU = 1500 bytes typically)
// TCP/IP headers = 40 bytes
// Available for application data (MSS) = 1500 - 40 = 1460 bytes

// If you send 5000 bytes, TCP automatically segments:
// Segment 1: 1460 bytes
// Segment 2: 1460 bytes
// Segment 3: 2080 bytes

// Each segment requires a round-trip acknowledge (RTT)
// Large data = multiple segments = multiple RTTs
```

**Chief Architect Tip:** Bandwidth ≠ throughput. You have 1 Gbps bandwidth, but if latency is 100ms, actual throughput for a single connection is limited by TCP window size and RTT. This is why HTTP/2 multiplexing helps — multiple concurrent requests amortize the RTT overhead.

### Video Streaming: Why UDP + Custom Protocol Works Better

**DASH (Dynamic Adaptive Streaming over HTTP)** uses TCP/HTTP, but here's the trick:

```
Instead of one continuous video stream:
  ├─ 10-second segment 1 (video1.ts) → 500KB → 1 HTTP request
  ├─ 10-second segment 2 (video2.ts) → 500KB → 1 HTTP request
  ├─ 10-second segment 3 (video3.ts) → 500KB → 1 HTTP request
  
Client can switch resolution mid-stream:
  ├─ If bandwidth drops, request lower resolution segment
  ├─ User buffers 20 seconds ahead
  ├─ If one segment is delayed, next segment loads in parallel
```

This avoids head-of-line blocking because each segment is an independent HTTP request, not part of one TCP stream.

### Common Interview Follow-ups

**Q: Why is UDP used for online gaming, not TCP?**
A: In a competitive FPS game, if your shot packet is lost:
  - TCP: Retransmit → 200ms latency → your shot is late
  - UDP: Skip it → next packet immediately → opponent sees your position now
  
Latency matters more than perfection. Plus, the next packet often includes updated position, making the lost packet obsolete anyway.

**Q: Can you build a reliable protocol on top of UDP?**
A: Yes — QUIC (used in HTTP/3) does exactly this: UDP base + custom retransmission + ordered delivery. Same reliability as TCP, but without the head-of-line blocking.

---

## 1.4 REST vs WebSocket

### REST (Representation State Transfer)

**HTTP-based, Request-Response, Stateless:**

```
Client: GET /api/users/123
Server: 200 OK { "id": 123, "name": "John", "email": "john@example.com" }
Connection closes.

Client: GET /api/users/123
Server: 200 OK { same response } (Server doesn't remember previous request)
```

**Advantages:**
- Stateless — trivial to scale horizontally
- Cacheable — HTTP caches (CDN, browser) work naturally
- Bookmarkable — can share URLs
- RESTful semantics clear (GET = read, POST = create, etc.)

**Disadvantages:**
- Polling required for real-time data
  ```
  Client polls every 1 second:
    GET /api/notifications/count → 0
    GET /api/notifications/count → 0
    GET /api/notifications/count → 0
    GET /api/notifications/count → 1 (notification arrived!)
  ```
- Latency — each request has HTTP overhead
- Overhead — headers repeated for every request

### WebSocket

**Persistent, Full-Duplex, Bidirectional:**

```
Client connects: GET /ws (HTTP Upgrade header)
Server accepts: 101 Switching Protocols

Now both client and server can send messages anytime:
  Client → Server: { "type": "chat", "message": "Hello" }
  Server → Client: { "type": "notification", "message": "User joined" }
  Server → Client: { "type": "notification", "message": "New message: Hi there!" }
  Client → Server: { "type": "chat", "message": "Got it" }
```

**Advantages:**
- True real-time bidirectional communication
- No polling overhead — server pushes immediately
- Lower latency — no request-response cycle
- Bandwidth efficient — minimal headers after handshake

**Disadvantages:**
- Stateful connection — server must remember each connection
- Doesn't scale horizontally without shared state (Redis)
- Can't be cached (persistent connection)
- Requires sticky sessions or pub/sub layer

### WebSocket Architecture at Scale

**Problem:** Single server with 1000 WebSocket connections. How does a new instance handle messages?

```
Server A: Handles clients 1-500
Server B: Handles clients 501-1000

Client 501 sends message to Server B, intends for Client 250 (on Server A).
Server B doesn't have Client 250's connection — message lost!
```

**Solution:** Redis Pub/Sub as a broker:

```
Server A: Client 250 connected
  └─ Subscribed to Redis channel "user:250:messages"

Server B: Client 501 sends message "Hello 250"
  └─ Publishes to Redis channel "user:250:messages"

Redis: Broadcasts message to all subscribers of "user:250:messages"
  └─ Server A receives it
  └─ Server A finds Client 250 connection
  └─ Server A sends message to Client 250

Result: Stateless architecture despite WebSocket's stateful nature
```

### Node.js WebSocket Implementation

```javascript
const WebSocket = require('ws');
const express = require('express');
const redis = require('redis');

const app = express();
const wss = new WebSocket.Server({ noServer: true });
const redisClient = redis.createClient();
const redisSubscriber = redisClient.duplicate();

// Handle HTTP upgrade to WebSocket
app.get('/ws', (req, res) => {
  const userId = req.query.user_id; // From JWT token in real app
  
  server.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
    handleWebSocket(ws, userId);
  });
});

function handleWebSocket(ws, userId) {
  console.log(`User ${userId} connected`);
  
  // Subscribe to this user's channel
  redisSubscriber.subscribe(`user:${userId}:messages`, (message) => {
    ws.send(JSON.stringify({
      type: 'message',
      data: JSON.parse(message)
    }));
  });
  
  // Handle incoming messages from client
  ws.on('message', (raw) => {
    const { type, targetUserId, text } = JSON.parse(raw);
    
    if (type === 'chat') {
      // Publish to recipient's Redis channel
      redisClient.publish(
        `user:${targetUserId}:messages`,
        JSON.stringify({ from: userId, text, timestamp: Date.now() })
      );
    }
  });
  
  ws.on('close', () => {
    console.log(`User ${userId} disconnected`);
    redisSubscriber.unsubscribe(`user:${userId}:messages`);
  });
}

server.listen(3000);
```

**Key Points:**
1. Each server subscribes to Redis channels for its connected clients
2. When a message is published to a channel, all subscribed servers receive it
3. Each server then routes the message to its local client connections
4. This scales to thousands of concurrent users across multiple servers

### REST vs WebSocket Decision Tree

```
Do you need real-time bidirectional communication?
  ├─ NO → Use REST (simplest, scales well)
  └─ YES → Is latency < 100ms critical?
      ├─ NO (notifications, email, background jobs) → Use polling + REST (or webhooks)
      └─ YES (chat, collaborative editing, live streaming) → Use WebSocket + Redis

Do you have many concurrent connections?
  ├─ < 1000 → Single WebSocket server is fine
  └─ > 1000 → Need Redis Pub/Sub or Kafka for distribution
```

### Common Interview Follow-ups

**Q: Can you use WebSocket for a REST API?**
A: Technically yes, but you're fighting the protocol. WebSocket is bidirectional and stateful; REST is unidirectional and stateless. Use WebSocket for features that need bidirectional communication (chat, live updates), and REST for everything else.

**Q: How do you handle WebSocket reconnection?**
A: Client includes a session ID in WebSocket handshake. On reconnect, client sends the session ID. Server replays undelivered messages from that session from a message queue (Redis list or Kafka topic) since the disconnect.

**Q: What happens if a client sends a WebSocket message while offline?**
A: WebSocket doesn't send — connection is closed. The message is lost locally. For durability, client should use a local queue (IndexedDB in browser, SQLite on mobile) and retry on reconnect.

---

## ✅ Quick Revision Checklist — Networking Basics

- [ ] Can I explain the full HTTP request/response cycle, including TCP and TLS handshakes?
- [ ] Do I know the difference between 301 and 302 redirects and when each is appropriate?
- [ ] Can I explain the DNS lookup flow from browser to authoritative nameserver?
- [ ] Do I know when to use TCP vs UDP and can I give specific use cases?
- [ ] Can I explain WebSocket architecture and why Redis Pub/Sub is needed at scale?
- [ ] Do I understand head-of-line blocking and why it matters for video streaming?
- [ ] Can I explain HTTP Keep-Alive and how it improves performance?
- [ ] Do I know the difference between connection-oriented (TCP) and connectionless (UDP)?

## Prerequisites
None — foundational. Read before `02-scalability.md` (load balancers assume you know L4 vs L7).

## Related
[`07-System-Design/01-system-design-interview-prep.md`](./01-system-design-interview-prep.md) (this file's full technical depth vs. that file's one-line analogies for the same topics — read together as a warm-up + deep-dive pair). `17-CS-Fundamentals/networking/` (a light-touch pointer folder, not a duplicate — see its README for why this file already covers most of what that folder would otherwise re-derive).

## Interview Questions (hardest first)
1. Explain why QUIC (HTTP/3) avoids TCP's head-of-line blocking even though it still uses TLS — connect it explicitly to this file's own head-of-line-blocking section.
2. Walk through the EY Risk.ai connection-pooling scenario end-to-end: what was the before/after number, and what specifically in `https.Agent` configuration caused the change?
3. TLS 1.2 vs. 1.3 — why is 1.3 a 1-RTT handshake instead of 2-RTT, and what got removed to make that possible?
4. Design the WebSocket architecture for a chat app with 3 backend server instances — why does a single WebSocket connection being stateful require either sticky sessions or a Redis Pub/Sub layer?
5. `dns.resolveSoa()` returns only SOA records — name the correct method for MX and TXT records (this file's own code comment gets this wrong; know the fix).

## Exercises
1. Fix the misleading `dns.resolveSoa()` comment (claims "all record types," returns only SOA) and add a correct `dns.resolveMx()`/`dns.resolveTxt()` example.
2. Extend the EY Risk.ai `https.Agent` example with a companion benchmark: instrument `maxSockets` at 8, 32, and 128 and explain the throughput/queuing trade-off observed at each.
3. Add an HTTP/3 (QUIC) subsection matching the depth already given to TLS 1.3 — currently the one confirmed gap in an otherwise Expert-rated file.

## My Real-World Usage
This file's EY Risk.ai connection-pooling scenario (3 min → 3 sec, real numbers, real `https.Agent` code) IS a real-world usage section already embedded in the file itself — one of the only files in the repo that does this unprompted.

## Common Mistakes
- Treating HTTPS as "HTTP is now secure" without understanding the TLS handshake actually adds round-trips (1 for TLS 1.3, 2 for TLS 1.2) — a real latency cost, not a free security upgrade.
- Assuming WebSocket "just works" across multiple backend servers without sticky sessions or a shared Pub/Sub layer.
- Confusing `dns.lookup()` (uses the libuv thread pool, OS resolver) with `dns.resolve()` (uses c-ares, doesn't touch the thread pool) — same gotcha flagged in `03-NodeJS/01-event-loop.md`.

