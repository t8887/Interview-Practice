# Sliding Window — Deep Dive

## Core Concepts

### When to Use
- Contiguous subarray/substring problems
- "Find min/max/count of subarray of size K" or "smallest subarray with condition"
- Keywords: "contiguous", "subarray", "substring", "window"

### Two Types
1. **Fixed window** — window size K is given
2. **Variable/Dynamic window** — find min/max window satisfying a condition

## Key Patterns

### 1. Fixed Window: Max Sum Subarray of Size K
```javascript
function maxSubarraySum(nums, k) {
    let windowSum = 0, maxSum = -Infinity;
    
    for (let i = 0; i < nums.length; i++) {
        windowSum += nums[i];
        
        if (i >= k - 1) {
            maxSum = Math.max(maxSum, windowSum);
            windowSum -= nums[i - k + 1]; // shrink: remove leftmost
        }
    }
    return maxSum;
}
// Time: O(n), Space: O(1)
```

### 2. Variable Window: Longest Substring Without Repeating Characters
```javascript
function lengthOfLongestSubstring(s) {
    const charIndex = new Map();
    let maxLen = 0, left = 0;
    
    for (let right = 0; right < s.length; right++) {
        if (charIndex.has(s[right]) && charIndex.get(s[right]) >= left) {
            left = charIndex.get(s[right]) + 1;
        }
        charIndex.set(s[right], right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}
// Time: O(n), Space: O(min(n, alphabet))
// Key: when duplicate found, jump left to AFTER the previous occurrence
```

### 3. Minimum Window Substring
```javascript
function minWindow(s, t) {
    const need = new Map();
    for (const c of t) need.set(c, (need.get(c) || 0) + 1);
    
    let have = 0, required = need.size;
    let left = 0, minLen = Infinity, minStart = 0;
    const window = new Map();
    
    for (let right = 0; right < s.length; right++) {
        const c = s[right];
        window.set(c, (window.get(c) || 0) + 1);
        
        if (need.has(c) && window.get(c) === need.get(c)) {
            have++;
        }
        
        // Shrink window while valid
        while (have === required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            const leftChar = s[left];
            window.set(leftChar, window.get(leftChar) - 1);
            if (need.has(leftChar) && window.get(leftChar) < need.get(leftChar)) {
                have--;
            }
            left++;
        }
    }
    
    return minLen === Infinity ? '' : s.substring(minStart, minStart + minLen);
}
// Time: O(n), Space: O(n)
// Pattern: expand right until valid, then shrink left to find minimum
```

### 4. Longest Repeating Character Replacement
```javascript
function characterReplacement(s, k) {
    const count = {};
    let left = 0, maxFreq = 0, maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        count[s[right]] = (count[s[right]] || 0) + 1;
        maxFreq = Math.max(maxFreq, count[s[right]]);
        
        // Window size - max frequency = chars to replace
        // If more than k replacements needed, shrink
        if ((right - left + 1) - maxFreq > k) {
            count[s[left]]--;
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}
// Key insight: window_size - max_freq_in_window <= k means window is valid
// We don't need to decrease maxFreq — we only care about growing the answer
```

### 5. Permutation in String
```javascript
function checkInclusion(s1, s2) {
    if (s1.length > s2.length) return false;
    
    const s1Count = new Array(26).fill(0);
    const s2Count = new Array(26).fill(0);
    
    for (let i = 0; i < s1.length; i++) {
        s1Count[s1.charCodeAt(i) - 97]++;
        s2Count[s2.charCodeAt(i) - 97]++;
    }
    
    let matches = 0;
    for (let i = 0; i < 26; i++) {
        if (s1Count[i] === s2Count[i]) matches++;
    }
    
    for (let i = 0; i < s2.length - s1.length; i++) {
        if (matches === 26) return true;
        
        // Add right character
        const right = s2.charCodeAt(i + s1.length) - 97;
        s2Count[right]++;
        if (s2Count[right] === s1Count[right]) matches++;
        else if (s2Count[right] === s1Count[right] + 1) matches--;
        
        // Remove left character
        const left = s2.charCodeAt(i) - 97;
        s2Count[left]--;
        if (s2Count[left] === s1Count[left]) matches++;
        else if (s2Count[left] === s1Count[left] - 1) matches--;
    }
    
    return matches === 26;
}
// Time: O(n), Space: O(1) — fixed size arrays
```

### 6. Sliding Window Maximum (Monotonic Deque)
```javascript
function maxSlidingWindow(nums, k) {
    const deque = []; // stores indices, decreasing values
    const result = [];
    
    for (let i = 0; i < nums.length; i++) {
        // Remove elements outside window
        while (deque.length && deque[0] < i - k + 1) {
            deque.shift();
        }
        
        // Remove smaller elements — they'll never be the max
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        
        deque.push(i);
        
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    return result;
}
// Time: O(n), Space: O(k)
// Monotonic decreasing deque — front is always the max of current window
```

## Template: Variable Sliding Window
```javascript
function slidingWindowTemplate(s) {
    const window = new Map();
    let left = 0, result = 0;
    
    for (let right = 0; right < s.length; right++) {
        // 1. Expand: add s[right] to window
        window.set(s[right], (window.get(s[right]) || 0) + 1);
        
        // 2. Shrink: while window is invalid
        while (/* window invalid condition */) {
            // Remove s[left] from window
            window.set(s[left], window.get(s[left]) - 1);
            if (window.get(s[left]) === 0) window.delete(s[left]);
            left++;
        }
        
        // 3. Update result
        result = Math.max(result, right - left + 1);
    }
    return result;
}
```

## Problems to Solve

| # | Problem | Pattern | LeetCode |
|---|---------|---------|----------|
| 1 | Longest Substring Without Repeating | Variable window + Set | #3 |
| 2 | Minimum Window Substring | Variable window + freq | #76 |
| 3 | Sliding Window Maximum | Monotonic deque | #239 |
| 4 | Longest Repeating Character Replacement | Variable window | #424 |
| 5 | Permutation in String | Fixed window + freq match | #567 |
| 6 | Fruit Into Baskets | Variable window, max 2 types | #904 |

## Interview Talking Points
- "Sliding window converts O(n*k) brute force to O(n) by reusing computation"
- "For minimum window: I expand until valid, then shrink to find the minimum"
- "The monotonic deque maintains candidates in decreasing order — front is always the max"
- "I track 'matches' count instead of comparing full arrays each time — O(1) per step"
