# Pattern-Based Must-Know Problems — Interview Cheat Codes

> **Restructure note (2026-08-19):** This file was flagged in `_meta/INVENTORY.md` as pure DSA content misfiled under `01-JavaScript/` — it's why `08-DSA/` looked thinner than it actually was. The Binary Search Variants, Prefix Sum, Monotonic Stack, and Backtracking sections have moved to their own canonical `08-DSA/` files (links below); this file keeps Kadane's and Floyd's Cycle Detection (their canonical homes — `08-DSA/01-arrays-strings.md` and `08-DSA/06-linked-list.md` respectively — already cover the same techniques on different problems, so nothing new was gained by moving these two specifically), plus the Pattern Recognition Cheat Sheet and Practice Checklist, which are this file's most reused assets.

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

## 3. Binary Search Variants → moved

Full content, unchanged: [`08-DSA/15-binary-search-variants.md`](../08-DSA/15-binary-search-variants.md) (3 templates, answer-space search, rotated-array search).

---

## 4. Prefix Sum → moved

Full content, unchanged: [`08-DSA/12-prefix-sum.md`](../08-DSA/12-prefix-sum.md) (Subarray Sum Equals K, Product of Array Except Self).

---

## 5. Monotonic Stack → moved

Full content, unchanged: [`08-DSA/13-monotonic-stack.md`](../08-DSA/13-monotonic-stack.md) (Daily Temperatures, Largest Rectangle in Histogram, Next Greater Element).

---

## 6. Backtracking Template → moved

Full content, unchanged: [`08-DSA/14-backtracking.md`](../08-DSA/14-backtracking.md) (Subsets, Permutations, Combination Sum, Word Search).

---

## Pattern Recognition Cheat Sheet

| If the problem says... | Think... | Where |
|---|---|---|
| "Maximum/minimum subarray" | **Kadane's Algorithm** | This file, §1 |
| "Detect cycle" | **Floyd's Tortoise & Hare** | This file, §2 |
| "Sorted array" or "find min/max of" | **Binary Search** | [`08-DSA/10-binary-search.md`](../08-DSA/10-binary-search.md) + [`08-DSA/15-binary-search-variants.md`](../08-DSA/15-binary-search-variants.md) |
| "Subarray sum equals K" | **Prefix Sum + HashMap** | [`08-DSA/12-prefix-sum.md`](../08-DSA/12-prefix-sum.md) |
| "Next greater/smaller element" | **Monotonic Stack** | [`08-DSA/13-monotonic-stack.md`](../08-DSA/13-monotonic-stack.md) |
| "All combinations / permutations" | **Backtracking** | [`08-DSA/14-backtracking.md`](../08-DSA/14-backtracking.md) |
| "K-th largest/smallest" | **Heap / QuickSelect** | `08-DSA/16-heap-priority-queue.md` — ❌ not yet created, see `_meta/MASTER_ROADMAP.md` |
| "Shortest path unweighted" | **BFS** | [`08-DSA/08-graphs.md`](../08-DSA/08-graphs.md) |
| "Connected components" | **DFS / Union-Find** | [`08-DSA/08-graphs.md`](../08-DSA/08-graphs.md) |
| "Overlapping subproblems" | **Dynamic Programming** | [`08-DSA/09-dynamic-programming.md`](../08-DSA/09-dynamic-programming.md) |
| "Sliding window max/min" | **Monotonic Deque** | [`08-DSA/05-sliding-window.md`](../08-DSA/05-sliding-window.md) (deque implementation still a named gap — see `_meta/KNOWLEDGE_GRAPH.md`) |
| "Two sorted arrays merge" | **Two Pointers** | [`08-DSA/03-two-pointers.md`](../08-DSA/03-two-pointers.md) |
| "String matching / prefix" | **Trie** | [`08-DSA/07-trees.md`](../08-DSA/07-trees.md) (bonus Trie implementation) |
| "Topological order / dependencies" | **Topological Sort (Kahn's)** | [`08-DSA/08-graphs.md`](../08-DSA/08-graphs.md) |
| "Stream of data, find median" | **Two Heaps** | `08-DSA/16-heap-priority-queue.md` — ❌ not yet created |

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

> None of the above are logged as solved yet — `_meta/state.json.problem_log_count` is 0. This checklist is the *recognize-the-pattern* layer; solving each one under time pressure and logging it in `16-DSA-Practice/` is the actual work `_meta/MASTER_ROADMAP.md` Phase 2 is built around.
