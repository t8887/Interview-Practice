# Prefix Sum

> Migrated from `01-JavaScript/03-pattern-based-must-know.md` §4 during `/prep-restructure` (2026-08-19) — pure DSA content that was misfiled under `01-JavaScript/`, per `_meta/INVENTORY.md`'s Misfiled section. Content unchanged from the source; only the location and surrounding cross-links are new.

**Pattern: Precompute cumulative sums for O(1) range queries.**

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
```

**When to use prefix sum:**
- "Subarray sum equals K"
- "Number of subarrays with sum ___"
- "Range sum query"
- "Product of array except self"
- "Contiguous subarray" problems with sum constraints

## Related
[`01-arrays-strings.md`](./01-arrays-strings.md) (static range queries) · [`19-bit-manipulation.md`](./19-bit-manipulation.md) — Fenwick Tree (dynamic prefix sums, per `_meta/KNOWLEDGE_GRAPH.md` §1's still-open Heap/Fenwick gap) is the harder follow-up to this pattern once ranges need updates, not just queries.

## Exercises
1. Extend `subarraySum` to return the actual subarray indices for one valid answer, not just the count (per `_meta/REPOSITORY_ANALYSIS.md`'s original exercise for this content).
2. Implement a 2D prefix sum (range-sum query in a matrix) — a natural harder follow-up not covered here.
3. Explain why `prefixCount` is seeded with `[0, 1]` and construct a test case where omitting that seed produces a wrong answer.
