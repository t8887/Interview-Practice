# Advanced / Senior Level — 20 LPA+ Filter Problems

> This is where senior engineers are separated from mid-level.
> If you can implement these cleanly in an interview, you're in the top bracket.

---

## 1. LRU Cache (Least Recently Used)

**LeetCode 146 — Medium (but asked as Hard in interviews)**

Design a data structure that follows LRU eviction: when the cache is full, remove the least recently used item.

```javascript
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // Map preserves insertion order
    }
    
    get(key) {
        if (!this.cache.has(key)) return -1;
        
        // Move to end (most recently used)
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }
    
    put(key, value) {
        // If key exists, delete first (to re-insert at end)
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        
        // If at capacity, evict least recently used (first item in Map)
        if (this.cache.size >= this.capacity) {
            const lruKey = this.cache.keys().next().value;
            this.cache.delete(lruKey);
        }
        
        this.cache.set(key, value);
    }
}

// Test
const cache = new LRUCache(2);
cache.put(1, 'a');  // cache: {1: 'a'}
cache.put(2, 'b');  // cache: {1: 'a', 2: 'b'}
cache.get(1);       // returns 'a', cache: {2: 'b', 1: 'a'}
cache.put(3, 'c');  // evicts key 2, cache: {1: 'a', 3: 'c'}
cache.get(2);       // returns -1 (evicted)
```

### LRU Cache — Doubly Linked List + HashMap (Classic Interview Version)
```javascript
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCacheClassic {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
        
        // Dummy head and tail
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    _remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    _addToFront(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }
    
    get(key) {
        if (!this.map.has(key)) return -1;
        const node = this.map.get(key);
        this._remove(node);
        this._addToFront(node); // move to most recent
        return node.value;
    }
    
    put(key, value) {
        if (this.map.has(key)) {
            this._remove(this.map.get(key));
        }
        
        const node = new Node(key, value);
        this._addToFront(node);
        this.map.set(key, node);
        
        if (this.map.size > this.capacity) {
            const lru = this.tail.prev; // least recently used
            this._remove(lru);
            this.map.delete(lru.key);
        }
    }
}
// Time: O(1) for both get and put
// Space: O(capacity)
```

---

## 2. LFU Cache (Least Frequently Used)

**LeetCode 460 — Hard**

When cache is full, evict the least frequently used. If tie, evict least recently used among them.

```javascript
class LFUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.minFreq = 0;
        this.keyToVal = new Map();    // key → value
        this.keyToFreq = new Map();   // key → frequency
        this.freqToKeys = new Map();  // frequency → Set of keys (insertion ordered)
    }
    
    _updateFreq(key) {
        const freq = this.keyToFreq.get(key);
        this.keyToFreq.set(key, freq + 1);
        
        // Remove from current frequency set
        this.freqToKeys.get(freq).delete(key);
        if (this.freqToKeys.get(freq).size === 0) {
            this.freqToKeys.delete(freq);
            if (this.minFreq === freq) this.minFreq++;
        }
        
        // Add to new frequency set
        if (!this.freqToKeys.has(freq + 1)) {
            this.freqToKeys.set(freq + 1, new Set());
        }
        this.freqToKeys.get(freq + 1).add(key);
    }
    
    get(key) {
        if (!this.keyToVal.has(key)) return -1;
        this._updateFreq(key);
        return this.keyToVal.get(key);
    }
    
    put(key, value) {
        if (this.capacity === 0) return;
        
        if (this.keyToVal.has(key)) {
            this.keyToVal.set(key, value);
            this._updateFreq(key);
            return;
        }
        
        // Evict if at capacity
        if (this.keyToVal.size >= this.capacity) {
            const minFreqKeys = this.freqToKeys.get(this.minFreq);
            const evictKey = minFreqKeys.values().next().value; // first = least recent
            minFreqKeys.delete(evictKey);
            if (minFreqKeys.size === 0) this.freqToKeys.delete(this.minFreq);
            this.keyToVal.delete(evictKey);
            this.keyToFreq.delete(evictKey);
        }
        
        // Insert new key
        this.keyToVal.set(key, value);
        this.keyToFreq.set(key, 1);
        if (!this.freqToKeys.has(1)) this.freqToKeys.set(1, new Set());
        this.freqToKeys.get(1).add(key);
        this.minFreq = 1;
    }
}

// Test
const lfu = new LFUCache(2);
lfu.put(1, 'a');    // freq(1)=1
lfu.put(2, 'b');    // freq(2)=1
lfu.get(1);         // freq(1)=2, returns 'a'
lfu.put(3, 'c');    // evicts key 2 (freq=1, least recently used at freq=1)
lfu.get(2);         // returns -1 (evicted)
```

---

## 3. Trie (Prefix Tree) Implementation

**LeetCode 208 — Medium**

```javascript
class TrieNode {
    constructor() {
        this.children = {};      // char → TrieNode
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }
    
    search(word) {
        const node = this._findNode(word);
        return node !== null && node.isEndOfWord;
    }
    
    startsWith(prefix) {
        return this._findNode(prefix) !== null;
    }
    
    _findNode(str) {
        let node = this.root;
        for (const char of str) {
            if (!node.children[char]) return null;
            node = node.children[char];
        }
        return node;
    }
    
    // Bonus: autocomplete (return all words with given prefix)
    autocomplete(prefix) {
        const node = this._findNode(prefix);
        if (!node) return [];
        
        const results = [];
        this._dfs(node, prefix, results);
        return results;
    }
    
    _dfs(node, current, results) {
        if (node.isEndOfWord) results.push(current);
        for (const [char, child] of Object.entries(node.children)) {
            this._dfs(child, current + char, results);
        }
    }
    
    // Bonus: Delete word
    delete(word) {
        this._deleteHelper(this.root, word, 0);
    }
    
    _deleteHelper(node, word, index) {
        if (index === word.length) {
            if (!node.isEndOfWord) return false;
            node.isEndOfWord = false;
            return Object.keys(node.children).length === 0;
        }
        
        const char = word[index];
        if (!node.children[char]) return false;
        
        const shouldDeleteChild = this._deleteHelper(node.children[char], word, index + 1);
        if (shouldDeleteChild) {
            delete node.children[char];
            return !node.isEndOfWord && Object.keys(node.children).length === 0;
        }
        return false;
    }
}

// Test
const trie = new Trie();
trie.insert('apple');
trie.insert('app');
trie.insert('application');
trie.insert('banana');

console.log(trie.search('apple'));        // true
console.log(trie.search('app'));          // true
console.log(trie.search('ap'));           // false
console.log(trie.startsWith('app'));      // true
console.log(trie.autocomplete('app'));    // ['app', 'apple', 'application']
```

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

| Problem | get/put | Space | Key Insight |
|---|---|---|---|
| LRU Cache | O(1) | O(n) | Doubly linked list + HashMap |
| LFU Cache | O(1) | O(n) | 3 Maps: key→val, key→freq, freq→keys |
| Trie | O(L) per op | O(N×L) | Children map at each node |
| Twitter Feed | O(n log n) | O(n) | Merge k sorted lists for scale |
| URL Shortener | O(1) | O(n) | Base62 encoding + counter |
| Rate Limiter | O(1) amortized | O(n) | Token bucket or sliding window |

## Practice Checklist
- [ ] LRU Cache (Map version + DLL version)
- [ ] LFU Cache
- [ ] Trie with insert, search, startsWith, autocomplete
- [ ] Design Twitter (basic + discuss scaling)
- [ ] URL Shortener (encode/decode)
- [ ] Rate Limiter (token bucket + sliding window)
