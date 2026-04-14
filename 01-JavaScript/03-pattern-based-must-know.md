# Pattern-Based Must-Know Problems — Interview Cheat Codes

> If you recognize the pattern, you solve it in 5 minutes.
> If you don't, you waste 30 minutes deriving from scratch.
> MEMORIZE these templates.

---

## 1. Kadane's Algorithm (Maximum Subarray)

**Pattern: Track current sum, reset when it goes negative**

```javascript
// LeetCode 53 — Maximum Subarray
function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

// [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// currentSum: -2, 1, -2, 4, 3, 5, 6, 1, 5
// maxSum:     -2, 1,  1, 4, 4, 5, 6, 6, 6 → Answer: 6
// Subarray: [4, -1, 2, 1]

// Variant: Maximum Product Subarray (LeetCode 152)
function maxProduct(nums) {
    let maxSoFar = nums[0];
    let currentMax = nums[0];
    let currentMin = nums[0]; // track min because negative × negative = positive
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < 0) [currentMax, currentMin] = [currentMin, currentMax]; // swap
        
        currentMax = Math.max(nums[i], currentMax * nums[i]);
        currentMin = Math.min(nums[i], currentMin * nums[i]);
        maxSoFar = Math.max(maxSoFar, currentMax);
    }
    
    return maxSoFar;
}

// When to use Kadane's:
// - "Maximum/minimum subarray sum"
// - "Contiguous subarray with largest ___"
// - "Best time to buy/sell stock" (variant)
```

---

## 2. Floyd's Cycle Detection (Tortoise & Hare)

**Pattern: Slow pointer (1 step) + Fast pointer (2 steps)**

```javascript
// LeetCode 141 — Linked List Cycle
function hasCycle(head) {
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}

// LeetCode 142 — Find where cycle starts
function detectCycle(head) {
    let slow = head, fast = head;
    
    // Phase 1: Detect cycle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) break;
    }
    
    if (!fast || !fast.next) return null; // no cycle
    
    // Phase 2: Find entry point
    // Move one pointer to head, advance both by 1 → they meet at cycle start
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }
    return slow; // cycle start
}

// LeetCode 287 — Find Duplicate Number (array version of Floyd's)
function findDuplicate(nums) {
    let slow = nums[0], fast = nums[0];
    
    // Phase 1
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);
    
    // Phase 2
    slow = nums[0];
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
}

// LeetCode 202 — Happy Number (detect cycle in number sequence)
function isHappy(n) {
    function getNext(num) {
        let sum = 0;
        while (num > 0) {
            const digit = num % 10;
            sum += digit * digit;
            num = Math.floor(num / 10);
        }
        return sum;
    }
    
    let slow = n, fast = n;
    do {
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    } while (slow !== fast);
    
    return slow === 1;
}

// When to use Floyd's:
// - "Detect cycle in linked list"
// - "Find duplicate in array [1, n] with n+1 elements"
// - "Detect loop in sequence"
// - "Find start of cycle"
```

---

## 3. Binary Search Variants

**Pattern: 3 templates that solve 90% of binary search problems**

```javascript
// Template 1: Standard — find exact target
function binarySearch(nums, target) {
    let left = 0, right = nums.length - 1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// Template 2: Leftmost (first occurrence / lower bound)
function leftBound(nums, target) {
    let left = 0, right = nums.length;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left; // first position where nums[left] >= target
}

// Template 3: Rightmost (last occurrence / upper bound)
function rightBound(nums, target) {
    let left = 0, right = nums.length;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] <= target) left = mid + 1;
        else right = mid;
    }
    return left - 1; // last position where nums[left-1] <= target
}

// Binary Search on Answer Space (Min/Max optimization)
// "What's the minimum capacity to ship packages in D days?" (LC 1011)
function shipWithinDays(weights, days) {
    let left = Math.max(...weights);           // minimum possible
    let right = weights.reduce((a, b) => a + b); // maximum possible
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (canShip(weights, days, mid)) {
            right = mid;       // try smaller capacity
        } else {
            left = mid + 1;    // need more capacity
        }
    }
    return left;
}

function canShip(weights, days, capacity) {
    let daysNeeded = 1, currentLoad = 0;
    for (const w of weights) {
        if (currentLoad + w > capacity) {
            daysNeeded++;
            currentLoad = 0;
        }
        currentLoad += w;
    }
    return daysNeeded <= days;
}

// Rotated Sorted Array (LC 33)
function searchRotated(nums, target) {
    let left = 0, right = nums.length - 1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) return mid;
        
        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        // Right half is sorted
        else {
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}

// Binary search applies when:
// - "Sorted array" or "rotated sorted array"
// - "Find minimum/maximum that satisfies condition" (answer space)
// - "Koko eating bananas", "Split array largest sum", "Capacity to ship"
```

---

## 4. Prefix Sum

**Pattern: Precompute cumulative sums for O(1) range queries**

```javascript
// Build prefix sum
function buildPrefixSum(nums) {
    const prefix = [0]; // prefix[0] = 0 for convenience
    for (let i = 0; i < nums.length; i++) {
        prefix.push(prefix[i] + nums[i]);
    }
    return prefix;
}
// Sum of range [i, j] = prefix[j+1] - prefix[i]

// LeetCode 560 — Subarray Sum Equals K
function subarraySum(nums, k) {
    const prefixCount = new Map([[0, 1]]); // prefix sum → count
    let sum = 0, count = 0;
    
    for (const num of nums) {
        sum += num;
        // If (sum - k) was a prefix sum before, those subarrays sum to k
        if (prefixCount.has(sum - k)) {
            count += prefixCount.get(sum - k);
        }
        prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
    }
    
    return count;
}
// nums = [1, 2, 3], k = 3 → Answer: 2 ([1,2] and [3])

// LeetCode 238 — Product of Array Except Self
function productExceptSelf(nums) {
    const n = nums.length;
    const result = new Array(n);
    
    // Left product
    result[0] = 1;
    for (let i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    
    // Right product (multiply in place)
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return result;
}

// When to use prefix sum:
// - "Subarray sum equals K"
// - "Number of subarrays with sum ___"
// - "Range sum query"
// - "Product of array except self"
// - "Contiguous subarray" problems with sum constraints
```

---

## 5. Monotonic Stack

**Pattern: Stack that maintains increasing or decreasing order**

```javascript
// LeetCode 739 — Daily Temperatures
// "For each day, how many days until a warmer temperature?"
function dailyTemperatures(temperatures) {
    const n = temperatures.length;
    const result = new Array(n).fill(0);
    const stack = []; // indices, decreasing temp order
    
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const j = stack.pop();
            result[j] = i - j;
        }
        stack.push(i);
    }
    
    return result;
}
// [73, 74, 75, 71, 69, 72, 76, 73]
// [1,   1,  4,  2,  1,  1,  0,  0]

// LeetCode 84 — Largest Rectangle in Histogram
function largestRectangleArea(heights) {
    const stack = []; // indices, increasing height
    let maxArea = 0;
    
    for (let i = 0; i <= heights.length; i++) {
        const currentHeight = i === heights.length ? 0 : heights[i];
        
        while (stack.length > 0 && currentHeight < heights[stack[stack.length - 1]]) {
            const h = heights[stack.pop()];
            const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, h * w);
        }
        
        stack.push(i);
    }
    
    return maxArea;
}

// LeetCode 496 — Next Greater Element I
function nextGreaterElement(nums1, nums2) {
    const nextGreater = new Map();
    const stack = [];
    
    for (const num of nums2) {
        while (stack.length > 0 && num > stack[stack.length - 1]) {
            nextGreater.set(stack.pop(), num);
        }
        stack.push(num);
    }
    
    return nums1.map(n => nextGreater.get(n) ?? -1);
}

// Monotonic stack pattern:
// - "Next greater/smaller element"
// - "Stock span"
// - "Daily temperatures"
// - "Largest rectangle in histogram"
// - "Trapping rain water" (also two-pointer solution)
```

---

## 6. Backtracking Template

**Pattern: Choose → Explore → Un-choose**

```javascript
// TEMPLATE
function backtrack(result, current, choices, startIndex) {
    // Base case: valid solution found
    if (isComplete(current)) {
        result.push([...current]); // clone!
        return;
    }
    
    for (let i = startIndex; i < choices.length; i++) {
        // Skip duplicates (if needed)
        if (i > startIndex && choices[i] === choices[i - 1]) continue;
        
        // Choose
        current.push(choices[i]);
        
        // Explore
        backtrack(result, current, choices, i + 1); // i+1 for combinations, i for reuse
        
        // Un-choose (backtrack)
        current.pop();
    }
}

// LeetCode 78 — Subsets
function subsets(nums) {
    const result = [];
    
    function bt(start, current) {
        result.push([...current]);
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            bt(i + 1, current);
            current.pop();
        }
    }
    
    bt(0, []);
    return result;
}
// [1,2,3] → [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]

// LeetCode 46 — Permutations
function permute(nums) {
    const result = [];
    
    function bt(current, remaining) {
        if (remaining.length === 0) {
            result.push([...current]);
            return;
        }
        for (let i = 0; i < remaining.length; i++) {
            current.push(remaining[i]);
            bt(current, [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
            current.pop();
        }
    }
    
    bt([], nums);
    return result;
}

// LeetCode 39 — Combination Sum
function combinationSum(candidates, target) {
    const result = [];
    
    function bt(start, current, remaining) {
        if (remaining === 0) {
            result.push([...current]);
            return;
        }
        if (remaining < 0) return;
        
        for (let i = start; i < candidates.length; i++) {
            current.push(candidates[i]);
            bt(i, current, remaining - candidates[i]); // i, not i+1 (can reuse)
            current.pop();
        }
    }
    
    bt(0, [], target);
    return result;
}

// LeetCode 79 — Word Search
function exist(board, word) {
    const rows = board.length, cols = board[0].length;
    
    function bt(r, c, idx) {
        if (idx === word.length) return true;
        if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
        if (board[r][c] !== word[idx]) return false;
        
        const temp = board[r][c];
        board[r][c] = '#'; // mark visited
        
        const found = bt(r + 1, c, idx + 1) || bt(r - 1, c, idx + 1) ||
                       bt(r, c + 1, idx + 1) || bt(r, c - 1, idx + 1);
        
        board[r][c] = temp; // un-mark
        return found;
    }
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (bt(r, c, 0)) return true;
        }
    }
    return false;
}

// Backtracking applies to:
// - Subsets / Combinations / Permutations
// - N-Queens
// - Sudoku Solver
// - Word Search
// - Palindrome Partitioning
// - Generate Parentheses
```

---

## Pattern Recognition Cheat Sheet

| If the problem says... | Think... |
|---|---|
| "Maximum/minimum subarray" | **Kadane's Algorithm** |
| "Detect cycle" | **Floyd's Tortoise & Hare** |
| "Sorted array" or "find min/max of" | **Binary Search** |
| "Subarray sum equals K" | **Prefix Sum + HashMap** |
| "Next greater/smaller element" | **Monotonic Stack** |
| "All combinations / permutations" | **Backtracking** |
| "K-th largest/smallest" | **Heap / QuickSelect** |
| "Shortest path unweighted" | **BFS** |
| "Connected components" | **DFS / Union-Find** |
| "Overlapping subproblems" | **Dynamic Programming** |
| "Sliding window max/min" | **Monotonic Deque** |
| "Two sorted arrays merge" | **Two Pointers** |
| "String matching / prefix" | **Trie** |
| "Topological order / dependencies" | **Topological Sort (Kahn's)** |
| "Stream of data, find median" | **Two Heaps** |

## Practice Checklist
- [ ] Kadane's — Maximum Subarray (LC 53)
- [ ] Kadane's — Maximum Product Subarray (LC 152)
- [ ] Floyd's — Linked List Cycle II (LC 142)
- [ ] Floyd's — Find Duplicate Number (LC 287)
- [ ] Binary Search — Search in Rotated Sorted Array (LC 33)
- [ ] Binary Search — Capacity to Ship (LC 1011)
- [ ] Prefix Sum — Subarray Sum Equals K (LC 560)
- [ ] Prefix Sum — Product Except Self (LC 238)
- [ ] Monotonic Stack — Daily Temperatures (LC 739)
- [ ] Monotonic Stack — Largest Rectangle (LC 84)
- [ ] Backtracking — Subsets (LC 78)
- [ ] Backtracking — Permutations (LC 46)
- [ ] Backtracking — Combination Sum (LC 39)
- [ ] Backtracking — Word Search (LC 79)
