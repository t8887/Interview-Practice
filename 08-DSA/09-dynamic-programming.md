# Dynamic Programming — Deep Dive

## Core Concepts
- **Overlapping subproblems** — same subproblems solved multiple times
- **Optimal substructure** — optimal solution built from optimal sub-solutions
- **Two approaches**: Top-down (memoization) vs Bottom-up (tabulation)
- **Key**: find the recurrence relation first, then implement

## Framework
1. Define the **state** — what variables describe a subproblem?
2. Find the **recurrence** — how does current state depend on previous states?
3. Define **base cases**
4. **Optimization** direction — are we minimizing or maximizing?
5. Consider **space optimization** — can we reduce from 2D to 1D?

## Key Patterns

### 1. Climbing Stairs (1D DP)
```javascript
function climbStairs(n) {
    if (n <= 2) return n;
    let prev2 = 1, prev1 = 2;
    for (let i = 3; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
// dp[i] = dp[i-1] + dp[i-2] — same as Fibonacci
// Space optimized from O(n) to O(1)
```

### 2. House Robber
```javascript
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    let prev2 = 0, prev1 = 0;
    for (const num of nums) {
        const curr = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
// At each house: max(skip this house, rob this house + best up to i-2)
// dp[i] = max(dp[i-1], dp[i-2] + nums[i])

// House Robber II (circular)
function robII(nums) {
    if (nums.length === 1) return nums[0];
    return Math.max(
        rob(nums.slice(1)),      // exclude first
        rob(nums.slice(0, -1))   // exclude last
    );
}
```

### 3. Coin Change
```javascript
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i && dp[i - coin] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}
// dp[i] = min coins to make amount i
// For each amount, try every coin and take the minimum
```

### 4. Longest Increasing Subsequence (LIS)
```javascript
// O(n²) DP
function lengthOfLIS(nums) {
    const dp = new Array(nums.length).fill(1);
    let maxLen = 1;
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }
    return maxLen;
}

// O(n log n) with patience sorting
function lengthOfLIS_optimal(nums) {
    const tails = []; // tails[i] = smallest tail of increasing subsequence of length i+1
    
    for (const num of nums) {
        let lo = 0, hi = tails.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (tails[mid] < num) lo = mid + 1;
            else hi = mid;
        }
        tails[lo] = num;
    }
    return tails.length;
}
```

### 5. Word Break
```javascript
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;
    
    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.length];
}
// dp[i] = can s[0..i-1] be segmented?
// dp[i] = true if dp[j] = true AND s[j..i-1] is in dict, for some j
```

### 6. Longest Common Subsequence (2D DP)
```javascript
function longestCommonSubsequence(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}
// If chars match: extend previous LCS
// If not: take best of excluding one char from either string
```

### 7. Unique Paths
```javascript
function uniquePaths(m, n) {
    const dp = new Array(n).fill(1);
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] += dp[j - 1]; // dp[j] = from above + from left
        }
    }
    return dp[n - 1];
}
// dp[i][j] = dp[i-1][j] + dp[i][j-1]
// Space optimized: reuse single row
```

### 8. Decode Ways
```javascript
function numDecodings(s) {
    if (s[0] === '0') return 0;
    
    let prev2 = 1, prev1 = 1;
    for (let i = 1; i < s.length; i++) {
        let curr = 0;
        if (s[i] !== '0') curr += prev1;          // single digit decode
        const two = Number(s.substring(i - 1, i + 1));
        if (two >= 10 && two <= 26) curr += prev2; // two digit decode
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
// At each position: can decode as 1 digit? can decode as 2 digits?
```

### 9. 0/1 Knapsack Pattern
```javascript
function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = new Array(capacity + 1).fill(0);
    
    for (let i = 0; i < n; i++) {
        // Traverse backwards to avoid using same item twice
        for (let w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    return dp[capacity];
}
// For unbounded knapsack: traverse forwards instead of backwards
```

### 10. Longest Palindromic Substring
```javascript
function longestPalindrome(s) {
    let start = 0, maxLen = 1;
    
    function expand(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            if (right - left + 1 > maxLen) {
                start = left;
                maxLen = right - left + 1;
            }
            left--;
            right++;
        }
    }
    
    for (let i = 0; i < s.length; i++) {
        expand(i, i);     // odd length
        expand(i, i + 1); // even length
    }
    return s.substring(start, start + maxLen);
}
// Expand around center: O(n²) time, O(1) space
```

## Problems to Solve

| # | Problem | Sub-pattern | LeetCode |
|---|---------|-------------|----------|
| 1 | Climbing Stairs | Fibonacci | #70 |
| 2 | House Robber | Linear DP | #198 |
| 3 | House Robber II | Circular | #213 |
| 4 | Coin Change | Unbounded knapsack | #322 |
| 5 | Longest Increasing Subsequence | LIS | #300 |
| 6 | Word Break | String DP | #139 |
| 7 | Longest Common Subsequence | 2D match | #1143 |
| 8 | Unique Paths | Grid DP | #62 |
| 9 | Decode Ways | String counting | #91 |
| 10 | Longest Palindromic Substring | Expand center / 2D DP | #5 |

## DP Identification Checklist
```
✓ "Find minimum/maximum/count" of something
✓ "How many ways" to reach a state
✓ Decision at each step (take or skip)
✓ Overlapping subproblems (same computation repeated)
✓ Keywords: "optimal", "minimum cost", "number of ways"
```
