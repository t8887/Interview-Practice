# Advanced / Senior Level — 20 LPA+ Filter Problems

> This is where senior engineers are separated from mid-level.
> If you can implement these cleanly in an interview, you're in the top bracket.

> **Restructure note (2026-08-19):** LRU Cache, LFU Cache, and Trie have moved to [`16-DSA-Practice/design/`](../16-DSA-Practice/design/) as reference-solved machine-coding exercises — per `_meta/INVENTORY.md`'s misfiled-content finding, these are DSA/data-structure problems, not JS-language content, and `16-DSA-Practice/` is the repo's dedicated solved-problem layer. Design Twitter, URL Shortener, and Rate Limiter stay here — they're closer to system-design-flavored JS coding than pure DSA. Content unchanged from the source; only location changed for the three moved problems.

---

## 1. LRU Cache → moved

Full content, unchanged: [`16-DSA-Practice/design/lru-cache.js`](../16-DSA-Practice/design/lru-cache.js) (both the quick Map-only version and the classic DLL+HashMap version).

---

## 2. LFU Cache → moved

Full content, unchanged: [`16-DSA-Practice/design/lfu-cache.js`](../16-DSA-Practice/design/lfu-cache.js).

---

## 3. Trie (Prefix Tree) → moved

Full content, unchanged: [`16-DSA-Practice/design/trie.js`](../16-DSA-Practice/design/trie.js) — includes `delete()`, which the theory-layer Trie in [`08-DSA/07-trees.md`](../08-DSA/07-trees.md) doesn't have.

---

## 4. Design Twitter

**LeetCode 355 — Medium**

```javascript
class Twitter {
    constructor() {
        this.tweets = [];        // { userId, tweetId, timestamp }
        this.following = new Map(); // userId → Set of userIds
        this.timestamp = 0;
    }
    
    postTweet(userId, tweetId) {
        this.tweets.push({ userId, tweetId, timestamp: this.timestamp++ });
    }
    
    getNewsFeed(userId) {
        // Get tweets from user + people they follow
        const followees = this.following.get(userId) || new Set();
        
        return this.tweets
            .filter(t => t.userId === userId || followees.has(t.userId))
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 10)
            .map(t => t.tweetId);
    }
    
    follow(followerId, followeeId) {
        if (!this.following.has(followerId)) {
            this.following.set(followerId, new Set());
        }
        this.following.get(followerId).add(followeeId);
    }
    
    unfollow(followerId, followeeId) {
        this.following.get(followerId)?.delete(followeeId);
    }
}

// Optimized version with max-heap for large scale is the system design follow-up
// In interview: start with this, then discuss optimizations:
// - Per-user tweet list + merge k sorted lists for feed
// - Fan-out on write (pre-compute feeds) for read-heavy
// - Fan-out on read for users with millions of followers
```

---

## 5. Design URL Shortener

```javascript
class URLShortener {
    constructor() {
        this.urlMap = new Map();      // shortCode → longUrl
        this.reverseMap = new Map();  // longUrl → shortCode (avoid duplicates)
        this.counter = 1;
        this.BASE = 'https://short.ly/';
        this.CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    
    _encode(num) {
        let result = '';
        while (num > 0) {
            result = this.CHARS[num % 62] + result;
            num = Math.floor(num / 62);
        }
        return result.padStart(6, '0');
    }
    
    shorten(longUrl) {
        if (this.reverseMap.has(longUrl)) {
            return this.BASE + this.reverseMap.get(longUrl);
        }
        
        const code = this._encode(this.counter++);
        this.urlMap.set(code, longUrl);
        this.reverseMap.set(longUrl, code);
        return this.BASE + code;
    }
    
    resolve(shortUrl) {
        const code = shortUrl.replace(this.BASE, '');
        return this.urlMap.get(code) || null;
    }
}

// Test
const shortener = new URLShortener();
const short = shortener.shorten('https://www.example.com/very/long/path?query=123');
console.log(short);                    // https://short.ly/000001
console.log(shortener.resolve(short)); // original URL
```

---

## 6. Design Rate Limiter

### Token Bucket
```javascript
class TokenBucket {
    constructor(capacity, refillRate) {
        this.capacity = capacity;       // max tokens
        this.tokens = capacity;         // current tokens
        this.refillRate = refillRate;   // tokens per second
        this.lastRefill = Date.now();
    }
    
    _refill() {
        const now = Date.now();
        const elapsed = (now - this.lastRefill) / 1000;
        this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillRate);
        this.lastRefill = now;
    }
    
    allowRequest() {
        this._refill();
        if (this.tokens >= 1) {
            this.tokens -= 1;
            return true;
        }
        return false;
    }
}

// Test
const limiter = new TokenBucket(10, 2); // 10 max, 2 tokens/sec
for (let i = 0; i < 15; i++) {
    console.log(`Request ${i}: ${limiter.allowRequest() ? 'ALLOWED' : 'DENIED'}`);
}
```

### Sliding Window Counter
```javascript
class SlidingWindowRateLimiter {
    constructor(maxRequests, windowMs) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
        this.clients = new Map(); // clientId → [timestamps]
    }
    
    allowRequest(clientId) {
        const now = Date.now();
        
        if (!this.clients.has(clientId)) {
            this.clients.set(clientId, []);
        }
        
        const timestamps = this.clients.get(clientId);
        
        // Remove expired timestamps
        while (timestamps.length > 0 && timestamps[0] <= now - this.windowMs) {
            timestamps.shift();
        }
        
        if (timestamps.length < this.maxRequests) {
            timestamps.push(now);
            return true;
        }
        
        return false;
    }
}

// 100 requests per minute
const rateLimiter = new SlidingWindowRateLimiter(100, 60 * 1000);

// Express middleware
function rateLimitMiddleware(req, res, next) {
    const clientId = req.ip;
    if (rateLimiter.allowRequest(clientId)) {
        next();
    } else {
        res.status(429).json({ error: 'Too many requests' });
    }
}
```

---

## Complexity Summary

| Problem | get/put | Space | Key Insight | Where |
|---|---|---|---|---|
| LRU Cache | O(1) | O(n) | Doubly linked list + HashMap | [`16-DSA-Practice/design/lru-cache.js`](../16-DSA-Practice/design/lru-cache.js) |
| LFU Cache | O(1) | O(n) | 3 Maps: key→val, key→freq, freq→keys | [`16-DSA-Practice/design/lfu-cache.js`](../16-DSA-Practice/design/lfu-cache.js) |
| Trie | O(L) per op | O(N×L) | Children map at each node | [`16-DSA-Practice/design/trie.js`](../16-DSA-Practice/design/trie.js) |
| Twitter Feed | O(n log n) | O(n) | Merge k sorted lists for scale | This file, §4 |
| URL Shortener | O(1) | O(n) | Base62 encoding + counter | This file, §5 |
| Rate Limiter | O(1) amortized | O(n) | Token bucket or sliding window | This file, §6 |

## Practice Checklist
- [ ] LRU Cache (Map version + DLL version) — now in `16-DSA-Practice/design/`
- [ ] LFU Cache — now in `16-DSA-Practice/design/`
- [ ] Trie with insert, search, startsWith, autocomplete, delete — now in `16-DSA-Practice/design/`
- [ ] Design Twitter (basic + discuss scaling)
- [ ] URL Shortener (encode/decode)
- [ ] Rate Limiter (token bucket + sliding window)
