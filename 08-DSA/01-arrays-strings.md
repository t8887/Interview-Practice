# Arrays & Strings — Deep Dive

## Core Concepts

### Arrays
- **Contiguous memory** — elements stored next to each other in memory
- **O(1) access by index** — direct memory address calculation
- **O(n) insert/delete** — shifting elements required
- **Dynamic arrays** (JS arrays) — auto-resize with amortized O(1) push

### Strings in JavaScript
- **Immutable** — every operation creates a new string
- **UTF-16 encoded** — each char is 2 bytes, surrogate pairs for emoji/unicode
- **String concatenation** in loops is O(n²) — use array.join() instead

## Key Patterns

### 1. Frequency Counter
Use a hash map to count occurrences. Avoids nested loops.
```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const freq = {};
    for (const c of s) freq[c] = (freq[c] || 0) + 1;
    for (const c of t) {
        if (!freq[c]) return false;
        freq[c]--;
    }
    return true;
}
```

### 2. Prefix Sum
Precompute cumulative sums for range queries in O(1).
```javascript
function prefixSum(nums) {
    const prefix = [0];
    for (let i = 0; i < nums.length; i++) {
        prefix.push(prefix[i] + nums[i]);
    }
    // Sum of range [l, r] = prefix[r+1] - prefix[l]
    return prefix;
}

// Example: rangeSum(1, 3) for [1, 2, 3, 4, 5]
// prefix = [0, 1, 3, 6, 10, 15]
// sum(1,3) = prefix[4] - prefix[1] = 10 - 1 = 9
```

### 3. In-place Modification
Modify array without extra space using pointer/swap techniques.
```javascript
// Remove duplicates in-place from sorted array
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;
    let slow = 0;
    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    return slow + 1;
}
```

### 4. Kadane's Algorithm (Maximum Subarray)
```javascript
function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}
// Time: O(n), Space: O(1)
```

### 5. Sorting Tricks
```javascript
// Sort by custom criteria
arr.sort((a, b) => a - b); // ascending numeric
arr.sort((a, b) => b - a); // descending numeric

// Sort strings by length, then alphabetically
arr.sort((a, b) => a.length - b.length || a.localeCompare(b));
```

## Problems to Solve

### Easy (Start Here)
| # | Problem | Key Insight | LeetCode |
|---|---------|-------------|----------|
| 1 | Two Sum | HashMap lookup for complement | #1 |
| 2 | Best Time to Buy/Sell Stock | Track min price, max profit | #121 |
| 3 | Contains Duplicate | Set/HashMap for O(1) lookup | #217 |
| 4 | Valid Anagram | Frequency counter | #242 |
| 5 | Merge Sorted Array | Three pointers from end | #88 |

### Medium (Core)
| # | Problem | Key Insight | LeetCode |
|---|---------|-------------|----------|
| 6 | Product of Array Except Self | Prefix & suffix products | #238 |
| 7 | Maximum Subarray | Kadane's algorithm | #53 |
| 8 | Maximum Product Subarray | Track min & max (neg * neg) | #152 |
| 9 | Encode and Decode Strings | Length-prefix encoding | #271 |
| 10 | Longest Palindromic Substring | Expand from center | #5 |

## Code Template: Array Problems
```javascript
// Template for most array problems
function solve(nums) {
    // 1. Edge cases
    if (!nums || nums.length === 0) return /* base case */;
    
    // 2. Initialize data structures
    const map = new Map();
    let result = /* initial value */;
    
    // 3. Single pass or two passes
    for (let i = 0; i < nums.length; i++) {
        // Process current element
        // Update result
        // Update data structure
    }
    
    return result;
}
```

## Interview Talking Points
- "I chose an array because the data is ordered/indexed and we need O(1) access"
- "Using a hash map here trades O(n) space for O(n²) → O(n) time"
- "Kadane's works because at each position we decide: extend current subarray or start new"
- "Prefix sums let us answer any range query in O(1) after O(n) preprocessing"

## Complexity Cheat Sheet
| Operation | Array | String |
|-----------|-------|--------|
| Access | O(1) | O(1) |
| Search | O(n) | O(n) |
| Insert (end) | O(1) amortized | O(n) — new string |
| Insert (middle) | O(n) | O(n) |
| Concatenation | O(n) | O(n+m) |
| Slice | O(k) | O(k) |
