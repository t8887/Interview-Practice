# Backtracking

> Migrated from `01-JavaScript/03-pattern-based-must-know.md` §6 during `/prep-restructure` (2026-08-19) — pure DSA content misfiled under `01-JavaScript/`. Content unchanged from the source.

**Pattern: Choose → Explore → Un-choose.**

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
```

**Backtracking applies to:**
- Subsets / Combinations / Permutations
- N-Queens
- Sudoku Solver
- Word Search
- Palindrome Partitioning
- Generate Parentheses

## Related
[`08-graphs.md`](./08-graphs.md) (DFS is backtracking's graph-shaped cousin) · [`18-greedy.md`](./18-greedy.md) — backtracking is often the "exhaustive" fallback greedy is trying to avoid; a useful contrast once both files exist.

## Exercises
1. Solve N-Queens (LC 51) using this file's own template shape — named in the "applies to" list, not yet worked here.
2. Solve Palindrome Partitioning (LC 131), then explain in one sentence why it's a backtracking problem and not a DP-only one (hint: the two aren't mutually exclusive — memoize the palindrome-check sub-problem).
3. Rewrite `permute` to avoid the `slice()`-based array copying on every call (an easy-to-miss O(n) cost per recursive step) using a swap-based in-place approach instead.
