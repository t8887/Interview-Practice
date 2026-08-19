# 16-DSA-Practice

The solved-problem layer — distinct from `08-DSA/`'s pattern *notes*. Per `_meta/PRODUCT_COMPANY_READINESS.md`: DSA solving ability is capped at 2/5 specifically because, until this folder existed, one code file existed in the entire repository. Notes prove exposure; this folder is where ability gets proven.

## Method (per `_meta/MASTER_ROADMAP.md` Phase 2 — non-negotiable per problem)

1. Read the problem. 5 min silent thinking, write the approach in comments *before* code.
2. Attempt 25 min (easy: 15). Talk aloud from week 3 onward.
3. Stuck → 1 hint max → 10 more minutes → then study the optimal from the matching `08-DSA/` note.
4. Save as `<pattern>/<problem>.js` with this header:
   ```js
   // LC 239 Sliding Window Maximum | Hard | 2026-08-24
   // Attempt: 31 min | Hints: 1 (monotonic deque) | Result: solved-with-hint
   // Brute force: O(n·k) — check window max each slide
   // Optimal: monotonic decreasing deque, O(n)/O(k)
   // Edge cases: k=1, k=n, all-equal, strictly decreasing
   // Redo: D3 ✗→D7
   ```
5. Append one line to `LOG.md`.

## Current contents

- `design/` — LRU Cache, LFU Cache, Trie: **reference-solved** implementations migrated from `01-JavaScript/02-advanced-senior-level.md` during `/prep-restructure` (2026-08-19). These are explicitly *not* logged timed-attempts — each file says so in its header. Do your own timed attempt first, then use these as the "optimal" checkpoint.

## Planned pattern folders (created on first solve, not pre-scaffolded empty)

Per `_meta/MASTER_ROADMAP.md` Phase 2's sequence: `arrays-hashing/`, `two-pointers-sliding-window/`, `binary-search/`, `stack-queue-monotonic/`, `linked-list/`, `backtracking/`, `trees-bst/`, `heap-trie/`, `graphs/`, `intervals-greedy/`, `dp/`, `bit-manipulation/`. Counts and named anchor problems for each are in `_meta/WEEKLY_PLANS.md`.

## `LOG.md`

One line per solve. Powers `/prep-status`'s unaided-medium streak and `/prep-revise`'s D1/D3/D7/D21 due queue.
