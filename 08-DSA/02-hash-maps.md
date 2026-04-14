# Hash Maps — Deep Dive

## Core Concepts

### How Hash Maps Work
- **Hash function** converts key → index in internal array
- **Collision handling**: chaining (linked lists) or open addressing (probing)
- **Load factor** = n/capacity → when too high, rehash (resize + reinsert)
- **Average O(1)** for get/set/delete; O(n) worst case with bad hash function

### JavaScript Map vs Object
```javascript
// Object: keys must be strings/symbols
const obj = {};
obj[1] = 'a';       // key becomes "1" (string)
obj[{}] = 'b';      // key becomes "[object Object]"

// Map: any type as key, maintains insertion order
const map = new Map();
map.set(1, 'a');     // key is number 1
map.set({}, 'b');     // key is that specific object reference
map.size;             // 2
```

### When to Use What
| Feature | Object | Map | Set |
|---------|--------|-----|-----|
| Key types | string/symbol | any | N/A (values) |
| Order | insertion (modern) | insertion | insertion |
| Size | Object.keys().length | .size | .size |
| Iteration | for...in / Object.keys | for...of / forEach | for...of |
| Performance | Slower for frequent add/delete | Better for frequent add/delete | O(1) has/add/delete |

## Key Patterns

### 1. Two Sum Pattern (Complement Lookup)
```javascript
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}
// Time: O(n), Space: O(n)
```

### 2. Frequency Map Pattern
```javascript
function topKFrequent(nums, k) {
    const freq = new Map();
    for (const num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    
    // Bucket sort approach — O(n) instead of O(n log n)
    const buckets = Array.from({ length: nums.length + 1 }, () => []);
    for (const [num, count] of freq) {
        buckets[count].push(num);
    }
    
    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        result.push(...buckets[i]);
    }
    return result.slice(0, k);
}
```

### 3. Group By Pattern
```javascript
function groupAnagrams(strs) {
    const map = new Map();
    for (const str of strs) {
        const key = str.split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(str);
    }
    return [...map.values()];
}

// Optimal: use char frequency as key instead of sorting
function groupAnagramsOptimal(strs) {
    const map = new Map();
    for (const str of strs) {
        const count = new Array(26).fill(0);
        for (const c of str) count[c.charCodeAt(0) - 97]++;
        const key = count.join('#');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(str);
    }
    return [...map.values()];
}
```

### 4. Longest Consecutive Sequence
```javascript
function longestConsecutive(nums) {
    const set = new Set(nums);
    let maxLen = 0;
    
    for (const num of set) {
        // Only start counting from sequence start
        if (!set.has(num - 1)) {
            let current = num;
            let length = 1;
            while (set.has(current + 1)) {
                current++;
                length++;
            }
            maxLen = Math.max(maxLen, length);
        }
    }
    return maxLen;
}
// Time: O(n), Space: O(n)
// Key insight: only start counting from numbers that DON'T have num-1 in set
```

### 5. Subarray Sum Equals K (Prefix Sum + HashMap)
```javascript
function subarraySum(nums, k) {
    const prefixCount = new Map([[0, 1]]);
    let sum = 0, count = 0;
    
    for (const num of nums) {
        sum += num;
        if (prefixCount.has(sum - k)) {
            count += prefixCount.get(sum - k);
        }
        prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
    }
    return count;
}
// Key insight: if prefix[j] - prefix[i] = k, there's a subarray sum k
```

## Problems to Solve

| # | Problem | Key Insight | LeetCode |
|---|---------|-------------|----------|
| 1 | Two Sum | Complement lookup | #1 |
| 2 | Valid Anagram | Frequency counter | #242 |
| 3 | Group Anagrams | Sorted string as key | #49 |
| 4 | Top K Frequent Elements | Bucket sort with freq | #347 |
| 5 | Longest Consecutive Sequence | Set + only start from sequence head | #128 |
| 6 | Subarray Sum Equals K | Prefix sum + hashmap | #560 |
| 7 | Contains Duplicate II | Map with index tracking | #219 |
| 8 | Isomorphic Strings | Two-way mapping | #205 |

## Interview Talking Points
- "HashMap gives O(1) average lookup — perfect for finding complements/matches"
- "I'm using the frequency counter pattern to avoid O(n²) nested loops"
- "The key insight is using prefix sums stored in a hashmap — if sum[j] - sum[i] = k, we found a valid subarray"
- "I chose Set over Array for O(1) .has() instead of O(n) .includes()"
