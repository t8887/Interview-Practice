// LC 146 — LRU Cache | Medium (asked as Hard in interviews)
//
// STATUS: reference implementation, NOT a logged timed-attempt.
// Migrated from 01-JavaScript/02-advanced-senior-level.md during /prep-restructure
// (2026-08-19) — already correct, hand-traced in _meta/REPOSITORY_ANALYSIS.md.
// Per _meta/MASTER_ROADMAP.md Phase 2's method: do your OWN 25-minute timed
// attempt first, narrating out loud, THEN compare against this file as the
// "optimal" checkpoint. Overwrite the attempt-log block below with your real
// numbers once you've done that — don't skip the attempt.
//
// Attempt: (not yet logged) | Hints: n/a | Result: n/a
// Edge cases to test yourself against: capacity=1, get on empty cache,
// put on an existing key (must NOT count as a new entry for eviction),
// repeated get on the same key (must not evict it).
// Redo: n/a until you've done a fresh timed attempt.

// --- Version 1: Map-only (fast to write under pressure; Map preserves insertion order) ---
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // Map preserves insertion order
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    // Move to end (most recently used) — READ the value BEFORE deleting.
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

// --- Version 2: Doubly Linked List + HashMap (the "now prove it's O(1)" answer) ---
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
// Time: O(1) for both get and put. Space: O(capacity).

// --- Tests ---
const cache = new LRUCache(2);
cache.put(1, 'a'); // cache: {1: 'a'}
cache.put(2, 'b'); // cache: {1: 'a', 2: 'b'}
console.assert(cache.get(1) === 'a', 'get(1) should return a');
cache.put(3, 'c'); // evicts key 2
console.assert(cache.get(2) === -1, 'get(2) should return -1 (evicted)');

module.exports = { LRUCache, LRUCacheClassic };

// Related: 08-DSA/06-linked-list.md (the canonical DSA-folder home for this
// exact DLL+HashMap implementation — confirmed identical logic during
// /prep-analyze). NOT the same as the separate, confirmed-buggy O(n) LRU in
// 07-System-Design/in-depth/04-caching.md (fixed during Phase 0, see
// _meta/MASTER_ROADMAP.md bug #9) or the get()-deletes-before-reading bug in
// 12-Company/persistent-aws-backend-developer.md (bug #10, also fixed).
//
// Exercises (from _meta/REPOSITORY_ANALYSIS.md):
// 1. Add TTL-based expiry (evict on capacity AND age).
// 2. Extend into an LFU Cache (see ./lfu-cache.js in this same folder).
