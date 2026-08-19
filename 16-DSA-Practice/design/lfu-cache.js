// LC 460 — LFU Cache | Hard
//
// STATUS: reference implementation, NOT a logged timed-attempt.
// Migrated from 01-JavaScript/02-advanced-senior-level.md during /prep-restructure
// (2026-08-19) — already correct, hand-traced in _meta/REPOSITORY_ANALYSIS.md
// ("correctly tracks minFreq across insertions/evictions").
// Do your own 25-minute timed attempt first, THEN compare against this file.
//
// Attempt: (not yet logged) | Hints: n/a | Result: n/a
// Edge cases to test yourself against: capacity=0 (put is a no-op), tie in
// frequency (must evict least-RECENTLY-used among the tied-frequency keys),
// updating an existing key's value (must bump its frequency too).
// Redo: n/a until you've done a fresh timed attempt.

class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.minFreq = 0;
    this.keyToVal = new Map(); // key → value
    this.keyToFreq = new Map(); // key → frequency
    this.freqToKeys = new Map(); // frequency → Set of keys (insertion ordered)
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

// --- Test ---
const lfu = new LFUCache(2);
lfu.put(1, 'a'); // freq(1)=1
lfu.put(2, 'b'); // freq(2)=1
console.assert(lfu.get(1) === 'a', 'freq(1) becomes 2'); // freq(1)=2
lfu.put(3, 'c'); // evicts key 2 (freq=1, least recently used at freq=1)
console.assert(lfu.get(2) === -1, 'key 2 was evicted');

module.exports = { LFUCache };

// Exercises (from _meta/REPOSITORY_ANALYSIS.md):
// 1. Add a delete(key) method (currently only get/put exist).
// 2. Compare against ./lru-cache.js — explain in one sentence why LFU needs
//    3 maps where LRU needs only 1 (or 2, for the DLL version).
