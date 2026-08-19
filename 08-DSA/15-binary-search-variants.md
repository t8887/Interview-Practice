# Binary Search Variants

> Migrated from `01-JavaScript/03-pattern-based-must-know.md` §3 during `/prep-restructure` (2026-08-19) — pure DSA content misfiled under `01-JavaScript/`. Content unchanged from the source.
>
> **Known overlap, left as-is intentionally:** `08-DSA/10-binary-search.md` already covers rotated-sorted-array search and binary-search-on-answer-space (via Koko Eating Bananas) at Advanced/Expert depth, including a correct Median-of-Two-Sorted-Arrays implementation this file doesn't have. This migration surfaces the overlap (different worked example — Ship Within Days here vs. Koko there, same underlying technique) rather than resolving it; treat `10-binary-search.md` as canonical for depth, this file as the compact 3-template reference.

**Pattern: 3 templates that solve 90% of binary search problems.**

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
```

**Binary search applies when:**
- "Sorted array" or "rotated sorted array"
- "Find minimum/maximum that satisfies condition" (answer space)
- "Koko eating bananas", "Split array largest sum", "Capacity to ship"

## Related
[`10-binary-search.md`](./10-binary-search.md) — canonical, deeper treatment (Median of Two Sorted Arrays, JS-specific overflow-caveat correction, find-minimum-in-rotated variant). Read that file for the generalized Binary-Search-on-Answer template `_meta/KNOWLEDGE_GRAPH.md` flags as still missing.

## Exercises
1. Generalize "Binary Search on Answer" (`shipWithinDays`'s shape) into a reusable `search(predicate, lo, hi)` helper and re-solve both this file's Ship-Within-Days and `10-binary-search.md`'s Koko problem with it.
2. Hand-trace `leftBound` and `rightBound` on `[1,2,2,2,3]` searching for `2` — confirm they return the first and last index respectively.
3. Modify `searchRotated` to handle duplicates (LC 81 — Search in Rotated Sorted Array II) and explain why duplicates break the O(log n) guarantee in the worst case.
