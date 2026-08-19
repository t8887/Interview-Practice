# Tracker

> **Rewritten 2026-08-19** — this used to be a fixed 30-day sprint dated from March 24, 2026, which had expired, plus it referenced a folder name (`11-JS-Puzzles`) that no longer exists and marked TypeScript "Not Started" despite 6 Advanced/Expert-rated files existing (`_meta/PRODUCT_COMPANY_READINESS.md`). Replaced with the rolling weekly template from `_meta/MASTER_ROADMAP.md` §13. See `_meta/MASTER_ROADMAP.md` for the full phase plan and `_meta/WEEKLY_PLANS.md` for the week-by-week table this tracker logs progress against.

**Two constraints, from your own history — don't relitigate these:**
1. **Don't over-systematize.** If this file takes more than 10 minutes a day, simplify it, don't perfect it. The old 30-day sprint died partly from tracking overhead.
2. **Notes are the comfort zone; solving is the goal.** No note-writing until the day's DSA problems are logged (once Phase 2 starts).

---

## This week

```markdown
# Week of 2026-08-19 · Phase 0 — Repository Cleanup, Safety & Correctness Debt
Mon | restructure branch created, 15-bug correctness pass in progress ✅ | —
Tue | ____ | ____
Wed | ____ | ____
Thu | ____ | ____
Fri | Revision queue cleared (n/a — Phase 0 week, no solves yet) | ____
Sat | ____ | ____

## Weekly exit review (Sun, 20 min)
Problems: 0/0 (Phase 0 week, not a DSA week) · Bugs fixed: __/15 · Mocks: 0 (starts wk4)
Due reviews cleared: n/a · Biggest struggle: ____
Next week adjustment: ____
```

## Daily template (copy this block each day; `/prep-daily` can fill it)

```markdown
## YYYY-MM-DD · Phase _ wk_ · Energy: __/5
□ [Track A, if interview this week] 45 min targeted revision: ____
□ Phase 0 item / DSA #1 / DSA #2 (whichever phase is active): ____ → logged
□ Rail block (60–90m): ____
□ Revision queue (D1/D3/D7/D21 due today): __ items → cleared
□ 1 line appended below
Struggled with: ____ → added to redo queue
```

## Log (append one line per day, oldest at bottom is fine — this is a log, not a dashboard)

```
2026-08-19 | Phase 0 started | restructure branch, 15-bug pass underway
```

---

## Where the real state lives

This file is a daily log, not the source of truth for phase/gap/skill status — those live in:

- `_meta/state.json` — machine-readable current phase, files analyzed, `problem_log_count`, `linked_files`.
- `_meta/MASTER_ROADMAP.md` — the 9-phase plan (0–8), completion criteria, priorities.
- `_meta/WEEKLY_PLANS.md` — the 12-week and 24-week execution tables.
- `_meta/PRODUCT_COMPANY_READINESS.md` — the current 0–5 skill scores, evidence-cited.
- `16-DSA-Practice/LOG.md` — the actual problem-solve log (this file just points here; don't duplicate entries).
- `21-Mock-Interviews/` — mock logs, once `/prep-mock` starts running (week 4+).

Run `/prep-status` for a rolled-up dashboard instead of reading all of the above by hand.
