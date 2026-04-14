# DSA — MNC & Product Company Frequently Asked Questions

> Sources: LeetCode Discuss, Glassdoor, GeeksforGeeks, AmbitionBox, Blind
> Companies: Google, Amazon, Microsoft, Flipkart, Atlassian, Uber, Razorpay, PhonePe, Swiggy, Walmart

---

## How DSA Rounds Work at Product Companies

> - **Round format:** 1-2 medium problems (45 min) or 1 hard (45 min)
> - **Judged on:** Approach, communication, optimal solution, edge cases, code quality
> - **Pattern:** Interviewer hints → you should pick up on them. Talk through your approach BEFORE coding.
> - **Companies with 2 DSA rounds:** Amazon, Google, Flipkart, Walmart
> - **Companies with 1 DSA round:** Atlassian, Razorpay, CRED (+ machine coding)

---

## Arrays & Strings (Most Frequent)

### Q1: Two Sum — return indices of two numbers that add up to target
> **Pattern:** Hash Map | **Time:** O(n) | **Space:** O(n)
> ```javascript
> function twoSum(nums, target) {
>     const map = new Map();
>     for (let i = 0; i < nums.length; i++) {
>         const complement = target - nums[i];
>         if (map.has(complement)) return [map.get(complement), i];
>         map.set(nums[i], i);
>     }
> }
> ```
> **Where asked:** Literally everywhere. Warm-up question.

### Q2: Best Time to Buy and Sell Stock
> **Pattern:** Kadane's variant / track min price | **Time:** O(n)
> ```javascript
> function maxProfit(prices) {
>     let minPrice = Infinity, maxProfit = 0;
>     for (const price of prices) {
>         minPrice = Math.min(minPrice, price);
>         maxProfit = Math.max(maxProfit, price - minPrice);
>     }
>     return maxProfit;
> }
> ```

### Q3: Maximum Subarray (Kadane's Algorithm)
> **Pattern:** Kadane's | **Time:** O(n)
> ```javascript
> function maxSubArray(nums) {
>     let maxSum = nums[0], currentSum = nums[0];
>     for (let i = 1; i < nums.length; i++) {
>         currentSum = Math.max(nums[i], currentSum + nums[i]);
>         maxSum = Math.max(maxSum, currentSum);
>     }
>     return maxSum;
> }
> ```
> **Where asked:** Amazon, Google, Flipkart

### Q4: Merge Intervals
> **Pattern:** Sort + merge | **Time:** O(n log n)
> ```javascript
> function merge(intervals) {
>     intervals.sort((a, b) => a[0] - b[0]);
>     const result = [intervals[0]];
>     for (let i = 1; i < intervals.length; i++) {
>         const last = result[result.length - 1];
>         if (intervals[i][0] <= last[1]) {
>             last[1] = Math.max(last[1], intervals[i][1]);
>         } else {
>             result.push(intervals[i]);
>         }
>     }
>     return result;
> }
> ```

---

## Two Pointers

### Q5: Container With Most Water
> **Pattern:** Two pointers (start/end) | **Time:** O(n)
> ```javascript
> function maxArea(height) {
>     let left = 0, right = height.length - 1, max = 0;
>     while (left < right) {
>         const area = Math.min(height[left], height[right]) * (right - left);
>         max = Math.max(max, area);
>         if (height[left] < height[right]) left++;
>         else right--;
>     }
>     return max;
> }
> ```

### Q6: 3Sum — find all triplets that sum to zero
> **Pattern:** Sort + Two pointers | **Time:** O(n^2)
> ```javascript
> function threeSum(nums) {
>     nums.sort((a, b) => a - b);
>     const result = [];
>     for (let i = 0; i < nums.length - 2; i++) {
>         if (i > 0 && nums[i] === nums[i - 1]) continue; // skip duplicates
>         let left = i + 1, right = nums.length - 1;
>         while (left < right) {
>             const sum = nums[i] + nums[left] + nums[right];
>             if (sum === 0) {
>                 result.push([nums[i], nums[left], nums[right]]);
>                 while (left < right && nums[left] === nums[left + 1]) left++;
>                 while (left < right && nums[right] === nums[right - 1]) right--;
>                 left++; right--;
>             } else if (sum < 0) left++;
>             else right--;
>         }
>     }
>     return result;
> }
> ```
> **Where asked:** Google, Amazon, Flipkart

---

## Sliding Window

### Q7: Longest Substring Without Repeating Characters
> **Pattern:** Sliding window + Set/Map | **Time:** O(n)
> ```javascript
> function lengthOfLongestSubstring(s) {
>     const map = new Map();
>     let maxLen = 0, left = 0;
>     for (let right = 0; right < s.length; right++) {
>         if (map.has(s[right]) && map.get(s[right]) >= left) {
>             left = map.get(s[right]) + 1;
>         }
>         map.set(s[right], right);
>         maxLen = Math.max(maxLen, right - left + 1);
>     }
>     return maxLen;
> }
> ```
> **Where asked:** Amazon, Flipkart, Swiggy, PhonePe

### Q8: Minimum Window Substring
> **Pattern:** Sliding window + frequency map | **Time:** O(n) | **Difficulty:** Hard
> Key idea: Expand right to include all chars, shrink left to minimize window.
> **Where asked:** Google, Amazon (hard round)

---

## Stack & Queue

### Q9: Valid Parentheses
> **Pattern:** Stack | **Time:** O(n)
> ```javascript
> function isValid(s) {
>     const stack = [];
>     const map = { ')': '(', ']': '[', '}': '{' };
>     for (const char of s) {
>         if (map[char]) {
>             if (stack.pop() !== map[char]) return false;
>         } else {
>             stack.push(char);
>         }
>     }
>     return stack.length === 0;
> }
> ```

### Q10: Next Greater Element
> **Pattern:** Monotonic stack | **Time:** O(n)
> ```javascript
> function nextGreaterElements(nums) {
>     const result = new Array(nums.length).fill(-1);
>     const stack = []; // stores indices
>     for (let i = 0; i < nums.length; i++) {
>         while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
>             result[stack.pop()] = nums[i];
>         }
>         stack.push(i);
>     }
>     return result;
> }
> ```
> **Where asked:** Amazon, Flipkart, Razorpay

---

## Linked List

### Q11: Detect cycle in a linked list
> **Pattern:** Floyd's (fast & slow pointers) | **Time:** O(n) | **Space:** O(1)
> ```javascript
> function hasCycle(head) {
>     let slow = head, fast = head;
>     while (fast && fast.next) {
>         slow = slow.next;
>         fast = fast.next.next;
>         if (slow === fast) return true;
>     }
>     return false;
> }
> ```

### Q12: Reverse a linked list
> **Pattern:** Iterative pointer swap | **Time:** O(n)
> ```javascript
> function reverseList(head) {
>     let prev = null, curr = head;
>     while (curr) {
>         const next = curr.next;
>         curr.next = prev;
>         prev = curr;
>         curr = next;
>     }
>     return prev;
> }
> ```
> **Where asked:** Every company. Expected to write in < 2 minutes.

### Q13: Merge Two Sorted Lists
> **Pattern:** Two pointers / recursion | **Time:** O(n + m)
> **Where asked:** Amazon, Walmart, PhonePe

---

## Trees (Very Frequently Asked)

### Q14: BFS (Level Order Traversal)
> **Pattern:** Queue-based BFS | **Time:** O(n)
> ```javascript
> function levelOrder(root) {
>     if (!root) return [];
>     const result = [], queue = [root];
>     while (queue.length) {
>         const level = [], size = queue.length;
>         for (let i = 0; i < size; i++) {
>             const node = queue.shift();
>             level.push(node.val);
>             if (node.left) queue.push(node.left);
>             if (node.right) queue.push(node.right);
>         }
>         result.push(level);
>     }
>     return result;
> }
> ```

### Q15: Lowest Common Ancestor (LCA) of BST
> **Pattern:** BST property | **Time:** O(h)
> ```javascript
> function lowestCommonAncestor(root, p, q) {
>     while (root) {
>         if (p.val < root.val && q.val < root.val) root = root.left;
>         else if (p.val > root.val && q.val > root.val) root = root.right;
>         else return root;
>     }
> }
> ```

### Q16: Validate Binary Search Tree
> **Pattern:** Inorder traversal or min/max range | **Time:** O(n)
> ```javascript
> function isValidBST(root, min = -Infinity, max = Infinity) {
>     if (!root) return true;
>     if (root.val <= min || root.val >= max) return false;
>     return isValidBST(root.left, min, root.val) &&
>            isValidBST(root.right, root.val, max);
> }
> ```
> **Where asked:** Google, Amazon, Flipkart

---

## Graphs

### Q17: Number of Islands (DFS/BFS on grid)
> **Pattern:** DFS flood fill | **Time:** O(m * n)
> ```javascript
> function numIslands(grid) {
>     let count = 0;
>     for (let i = 0; i < grid.length; i++) {
>         for (let j = 0; j < grid[0].length; j++) {
>             if (grid[i][j] === '1') {
>                 count++;
>                 dfs(grid, i, j);
>             }
>         }
>     }
>     return count;
> }
> function dfs(grid, i, j) {
>     if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] !== '1') return;
>     grid[i][j] = '0'; // mark visited
>     dfs(grid, i + 1, j); dfs(grid, i - 1, j);
>     dfs(grid, i, j + 1); dfs(grid, i, j - 1);
> }
> ```
> **Where asked:** Amazon, Google, Flipkart, Walmart

### Q18: Course Schedule (Topological Sort / Cycle Detection)
> **Pattern:** Topological sort (BFS Kahn's or DFS) | **Time:** O(V + E)
> Check if cycle exists in directed graph. If yes → can't finish all courses.
> **Where asked:** Google, Amazon, Atlassian

---

## Dynamic Programming

### Q19: Climbing Stairs
> **Pattern:** Fibonacci variant / DP | **Time:** O(n) | **Space:** O(1)
> ```javascript
> function climbStairs(n) {
>     let a = 1, b = 1;
>     for (let i = 2; i <= n; i++) {
>         [a, b] = [b, a + b];
>     }
>     return b;
> }
> ```

### Q20: Coin Change (Minimum coins)
> **Pattern:** Bottom-up DP | **Time:** O(n * amount)
> ```javascript
> function coinChange(coins, amount) {
>     const dp = new Array(amount + 1).fill(Infinity);
>     dp[0] = 0;
>     for (let i = 1; i <= amount; i++) {
>         for (const coin of coins) {
>             if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
>         }
>     }
>     return dp[amount] === Infinity ? -1 : dp[amount];
> }
> ```
> **Where asked:** Amazon, Google, Flipkart

### Q21: Longest Common Subsequence
> **Pattern:** 2D DP | **Time:** O(m * n)
> Classic string DP. Build table where `dp[i][j]` = LCS of `s1[0..i-1]` and `s2[0..j-1]`.
> **Where asked:** Amazon, Microsoft

---

## Binary Search

### Q22: Search in Rotated Sorted Array
> **Pattern:** Modified binary search | **Time:** O(log n)
> ```javascript
> function search(nums, target) {
>     let left = 0, right = nums.length - 1;
>     while (left <= right) {
>         const mid = Math.floor((left + right) / 2);
>         if (nums[mid] === target) return mid;
>         if (nums[left] <= nums[mid]) { // left half sorted
>             if (target >= nums[left] && target < nums[mid]) right = mid - 1;
>             else left = mid + 1;
>         } else { // right half sorted
>             if (target > nums[mid] && target <= nums[right]) left = mid + 1;
>             else right = mid - 1;
>         }
>     }
>     return -1;
> }
> ```
> **Where asked:** Amazon, Flipkart, Google

---

## Pattern Recognition Cheat Sheet

> | If you see... | Think... |
> |--------------|----------|
> | Sorted array | Binary search |
> | Pair/triplet sum | Two pointers / Hash map |
> | Subarray/substring | Sliding window |
> | Tree/graph traversal | BFS / DFS |
> | "All permutations/combinations" | Backtracking |
> | "Minimum/maximum" of something | DP or Greedy |
> | "Top K" / "Kth element" | Heap |
> | "Next greater/smaller" | Monotonic stack |
> | "Cycle detection" | Floyd's / graph coloring |
> | "Level by level" | BFS with queue |
> | "Connected components" | Union-Find or DFS |
> | Matrix traversal | DFS/BFS on grid |
> | "Is valid sequence of brackets" | Stack |
> | "Intervals" | Sort + merge/greedy |

---

## Complexity Quick Reference

> | Structure/Algorithm | Time | Space |
> |---------------------|------|-------|
> | Hash Map lookup | O(1) avg | O(n) |
> | Binary Search | O(log n) | O(1) |
> | BFS/DFS on graph | O(V + E) | O(V) |
> | Sorting (merge/quick) | O(n log n) | O(n) / O(log n) |
> | Heap push/pop | O(log n) | O(n) |
> | DP (1D) | O(n) | O(n) or O(1) |
> | DP (2D) | O(m * n) | O(m * n) |
