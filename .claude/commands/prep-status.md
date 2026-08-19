---
description: Print the progress dashboard — problems, streaks, mocks, curricula, next action
allowed-tools: Read, Glob, Grep
---
Read `_meta/state.json`, `16-DSA-Practice/LOG.md` (or wherever the DSA log lives), `21-Mock-Interviews/*`, and `_meta/WEEKLY_PLANS.md`.

Print a dashboard in chat (no file write needed):
- Problems solved by pattern vs. plan for the current week (counts, not lists).
- Unaided-medium streak (consecutive mocks/problems solved without a hint).
- Mock score trend (last 3 mocks per category, direction of movement).
- Curricula done vs. remaining (from curricula_done in state.json).
- Files linked vs. total (from linked_files in state.json, if tracked).
- Due-revision queue size (from 22-Revision/queue.md).
- Close with ONE line: the single highest-leverage next action, and the exact command to run for it.
