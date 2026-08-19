# Monotonic Stack

> Migrated from `01-JavaScript/03-pattern-based-must-know.md` §5 during `/prep-restructure` (2026-08-19) — pure DSA content misfiled under `01-JavaScript/`. Content unchanged from the source.
>
> **Known overlap, left as-is intentionally:** `08-DSA/04-stack-queue.md` already covers Daily Temperatures and Largest Rectangle in Histogram as part of its own monotonic-stack section — this migration surfaces that overlap rather than resolving it. Deciding which file stays canonical (or merging them) is a content judgment better suited to a future `/prep-curriculum dsa` pass than a mechanical restructure move; treat `04-stack-queue.md` as the more complete treatment (it also derives *why* the O(n) bound holds) until that pass happens.

**Pattern: Stack that maintains increasing or decreasing order.**

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
```

**Monotonic stack pattern:**
- "Next greater/smaller element"
- "Stock span"
- "Daily temperatures"
- "Largest rectangle in histogram"
- "Trapping rain water" (also two-pointer solution — see [`03-two-pointers.md`](./03-two-pointers.md))

## Related
[`04-stack-queue.md`](./04-stack-queue.md) (overlapping content — see note above) · [`05-sliding-window.md`](./05-sliding-window.md) (Sliding Window Maximum needs a monotonic *deque*, not a stack — the deque generalization is a distinct, still-unimplemented follow-up per `_meta/KNOWLEDGE_GRAPH.md` §1).

## Exercises
1. Solve LC 239 (Sliding Window Maximum) with an actual monotonic *deque* — this file's pattern list names it, no file in the repo currently implements it.
2. Prove the O(n) bound for `largestRectangleArea`: each index is pushed and popped at most once — write the argument in your own words.
3. Extend `nextGreaterElement` to a circular array (LC 503 — Next Greater Element II) by conceptually doubling the array without actually allocating it twice.
