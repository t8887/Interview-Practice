# System Design — Authentication, Caching & API Design

## Authentication & Authorization

### JWT Flow
```
Client                    Server                    DB
  │                         │                        │
  ├── POST /login ──────────►│                        │
  │   {email, password}     ├── Verify password ─────►│
  │                         │◄── User row ───────────┤
  │                         │                        │
  │◄── { accessToken,      │ Sign JWT with secret    │
  │      refreshToken } ───┤                        │
  │                         │                        │
  ├── GET /api/data ────────►│                        │
  │   Authorization:        ├── Verify JWT (no DB!)  │
  │   Bearer <accessToken>  │                        │
  │◄── { data } ───────────┤                        │
```

### JWT Structure
```javascript
// Header.Payload.Signature
// eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMjMifQ.signature

// Payload (claims)
{
    userId: "123",
    role: "admin",
    iat: 1700000000,        // issued at
    exp: 1700003600         // expires (1 hour)
}
```

### Implementation (Node.js + Express)
```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// --- Login ---
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const accessToken = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
    
    const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
    
    // Store refresh token hash in DB (for revocation)
    await db.query('UPDATE users SET refresh_token = ? WHERE id = ?',
        [await bcrypt.hash(refreshToken, 10), user.id]);
    
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,  // JS can't access
        secure: true,    // HTTPS only
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    res.json({ accessToken });
});

// --- Auth Middleware ---
function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        return res.status(403).json({ error: 'Invalid token' });
    }
}

// --- Role Authorization ---
function authorize(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
}

// Usage
app.get('/api/admin/users', authenticate, authorize('admin'), getUsers);

// --- Refresh Token Flow ---
app.post('/api/refresh', async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });
    
    try {
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await db.query('SELECT * FROM users WHERE id = ?', [payload.userId]);
        
        if (!user || !(await bcrypt.compare(refreshToken, user.refresh_token))) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }
        
        const newAccessToken = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );
        
        res.json({ accessToken: newAccessToken });
    } catch {
        return res.status(403).json({ error: 'Invalid refresh token' });
    }
});
```

## Caching Strategies (Redis)

### Cache-Aside (Lazy Loading)
```
Read: Cache? → Hit → Return
              → Miss → DB → Store in Cache → Return
Write: DB → Invalidate Cache
```

### Write-Through
```
Write: Cache → DB (synchronous)
Read:  Always from cache
```

### Write-Behind (Write-Back)
```
Write: Cache → Return (async write to DB later)
Risk:  Data loss if cache crashes before DB write
```

### Redis Patterns
```javascript
const Redis = require('ioredis');
const redis = new Redis({ host: 'localhost', port: 6379 });

// 1. String cache with TTL
await redis.setex('user:123', 3600, JSON.stringify(user));
const cached = JSON.parse(await redis.get('user:123'));

// 2. Rate limiting (sliding window)
async function rateLimit(userId, max = 100, windowSec = 60) {
    const key = `ratelimit:${userId}`;
    const now = Date.now();
    
    await redis.multi()
        .zremrangebyscore(key, 0, now - windowSec * 1000)
        .zadd(key, now, `${now}`)
        .expire(key, windowSec)
        .exec();
    
    const count = await redis.zcard(key);
    return count <= max;
}

// 3. Session store
app.use(session({
    store: new RedisStore({ client: redis }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, maxAge: 86400000 }
}));

// 4. Pub/Sub for real-time
// Publisher
redis.publish('notifications', JSON.stringify({ userId: '123', msg: 'New order' }));
// Subscriber
const sub = new Redis();
sub.subscribe('notifications');
sub.on('message', (channel, message) => {
    console.log(channel, JSON.parse(message));
});

// 5. Distributed lock (Redlock)
const lock = await redis.set('lock:resource', 'owner-id', 'NX', 'EX', 30);
if (lock) {
    try { /* critical section */ }
    finally { await redis.del('lock:resource'); }
}
```

### Cache Invalidation Strategies
```
1. TTL-based:   Set expiry, stale data acceptable for short time
2. Event-based: On write, delete/update cache key
3. Version key: Embed version in cache key → bump version to invalidate all
4. Tag-based:   Tag related keys, flush by tag (e.g., all product keys)
```

## API Design Best Practices

### RESTful Conventions
```
GET    /api/v1/products          List products (paginated)
GET    /api/v1/products/:id      Get single product
POST   /api/v1/products          Create product
PUT    /api/v1/products/:id      Full update
PATCH  /api/v1/products/:id      Partial update
DELETE /api/v1/products/:id      Delete

// Nested resources
GET    /api/v1/users/:id/orders         User's orders
POST   /api/v1/users/:id/orders         Create order for user

// Filtering, sorting, pagination
GET    /api/v1/products?category=electronics&sort=-price&page=2&limit=20
```

### Pagination Patterns
```javascript
// Offset-based (simple but slow for large offsets)
app.get('/api/products', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const offset = (page - 1) * limit;
    
    const [products] = await db.query(
        'SELECT * FROM products ORDER BY id LIMIT ? OFFSET ?', [limit, offset]
    );
    const [[{ total }]] = await db.query('SELECT COUNT(*) as total FROM products');
    
    res.json({
        data: products,
        meta: { page, limit, total, totalPages: Math.ceil(total / limit) }
    });
});

// Cursor-based (fast, consistent for real-time feeds)
app.get('/api/products', async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const cursor = req.query.cursor; // last seen ID
    
    let query = 'SELECT * FROM products';
    const params = [];
    if (cursor) {
        query += ' WHERE id > ?';
        params.push(cursor);
    }
    query += ' ORDER BY id LIMIT ?';
    params.push(limit + 1); // fetch one extra to check hasMore
    
    const [products] = await db.query(query, params);
    const hasMore = products.length > limit;
    if (hasMore) products.pop();
    
    res.json({
        data: products,
        meta: {
            nextCursor: hasMore ? products[products.length - 1].id : null,
            hasMore
        }
    });
});
```

### Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    message: { error: 'Too many requests, try again later' }
});

// Granular limiters
const loginLimiter = rateLimit({ windowMs: 60000, max: 5 }); // 5 attempts/min
app.post('/api/login', loginLimiter, loginHandler);

// API key limiter (different tiers)
const apiLimiter = (req, res, next) => {
    const tier = req.apiKey?.tier || 'free';
    const limits = { free: 100, pro: 1000, enterprise: 10000 };
    // ... check Redis counter against tier limit
};
```

## Interview Questions

**Q: JWT vs Session-based auth — tradeoffs?**
> JWT: Stateless, scalable (no central session store), works with microservices. Downsides: can't revoke until expiry (use short TTL + refresh tokens), token size grows with claims. Sessions: Simple revocation (delete from store), smaller cookie. Downsides: requires shared session store (Redis) for multiple servers.

**Q: How would you design a rate limiter?**
> Token bucket or sliding window algorithm in Redis. Per-user key with request timestamps in a sorted set. On each request: remove old entries, count current window, allow/deny. For distributed systems, use Redis to share state across server instances.

**Q: Offset vs Cursor pagination?**
> Offset: Simple, allows jumping to page N, but slow at large offsets (DB scans and discards rows) and inconsistent with real-time data. Cursor: Fast at any position (uses indexed WHERE), consistent ordering, but no page jumping. Use cursor for APIs/feeds, offset for admin dashboards.

**Q: How do you handle cache invalidation?**
> TTL for acceptable staleness. Event-driven invalidation on writes (delete/update cache key). For complex relationships, use cache tags. The hardest case is distributed caches — use pub/sub to broadcast invalidation across instances.
