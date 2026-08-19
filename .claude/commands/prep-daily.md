---
description: Serve today's plan, run the session, log everything
allowed-tools: Read, Write, Edit, Glob, Bash(date *)
---
1. Read `_meta/state.json`, `_meta/WEEKLY_PLANS.md` (current_week), `22-Revision/queue.md`, and TRACKING.md.
2. Ask ONE question: "Interview scheduled this week? (company/round or 'no')". If yes: first block = 45-min targeted revision from the matching 12-Company file + relevant *-mnc-frequently-asked.md — list the exact sections.
3. Then serve today's plan: 2 DSA problems from this week's pattern (pick from the anchor list, excluding solved ones in 16-DSA-Practice/LOG.md; 1 should be a due-redo if any) + the rail block + due revision items.
4. Run the DSA session properly: give me the problem, START A 25-MIN EXPECTATION, do NOT reveal approach; if I ask for help, give ONE graduated hint. After my attempt: review my solution for correctness/complexity/edge cases/code quality, THEN show optimal, then create the problem file in 16-DSA-Practice/<pattern>/ with the standard header (attempt time, hints, result, redo date) and append to LOG.md.
5. End of session: append the day's line to TRACKING.md, bump next_review dates on touched items, update state.json (problem_log_count). Under 10 minutes of overhead total — if I'm rushed, log first, chat later.
