---
description: Execute the cleanup — dedupe, moves, scaffolding, indexes (git-safe)
allowed-tools: Read, Write, Edit, Bash(git *), Bash(mkdir *), Glob
---
Execute the restructuring plan. SAFETY: work on a new branch `restructure`, use `git mv` (history-preserving), one logical change per commit, show me the plan as a checklist and get my confirmation BEFORE the first destructive step.

Plan (verify each against current repo state before acting; skip anything already done):
1. Delete duplicate `design-patterns/` (after `diff -rq` proves identical to `14-Design-Patterns/`).
2. Remove resume PDF + any file the privacy scan flagged from tracked files; add patterns to .gitignore. Remind me: if the repo was ever public, treat exposed numbers as seen.
3. Convert `07-System-Design/in-depth/01-system-design-interview-prep.md` into a pure linked index of files 01–08 (verify content is truly duplicated first).
4. Split `01-JavaScript/03-pattern-based-must-know.md` into 08-DSA pattern files (prefix-sum, monotonic-stack, backtracking, binary-search-variants); move LRU/LFU/Trie from `01-JavaScript/02` into `16-DSA-Practice/` as machine-coding exercises; leave cross-link stubs behind.
5. Extract RTL/testing content from `12-Company/citiustech-L1-*` into `04-React/08-testing.md`.
6. Create scaffolding: 16-DSA-Practice/{pattern folders,LOG.md} · 17-CS-Fundamentals/{os,networking,database-internals} · 18-LLD-Machine-Coding · 19-Distributed-Systems · 20-Redis-OpenSearch/{redis,opensearch} · 21-Mock-Interviews · 22-Revision — each with a README stating purpose + planned files (from the roadmap).
7. Fix `01-JavaScript` double-05 numbering. Rewrite TRACKING.md as the rolling weekly template. Update root README tree + correct the "75 problems" claim to reflect logged-solves count from state.json.
8. Retrofit linked-doc headers (Prerequisites/Related/Interview Qs/Exercises/status/next_review) onto existing files, 10 files per run — if more remain, say "run /prep-restructure again to continue linking" (track progress in state.json under "linked_files").
Update state (restructure_done when steps 1–7 complete). Show final tree.
