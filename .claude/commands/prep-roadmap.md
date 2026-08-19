---
description: Refresh MASTER_ROADMAP + weekly plans from latest gap analysis
allowed-tools: Read, Write, Edit, Glob
---
Read `_meta/{KNOWLEDGE_GRAPH,SKILL_GAP_ANALYSIS,PRODUCT_COMPANY_READINESS}.md` and `_meta/imported/03_MASTER_ROADMAP.md` + `04_WEEKLY_PLANS.md` if present (treat as baseline; refine, don't regenerate).

Write `_meta/MASTER_ROADMAP.md` and `_meta/WEEKLY_PLANS.md` (12-wk + 24-wk):
- Dependency-ordered phases 0–8; every phase lists: objective, prerequisites, EXISTING repo files (paths), files to CREATE (paths), study sequence, exercises, named coding problems, measurable completion criteria (behavioral tests like "3 unseen mediums, ≤25 min each, narrated", never "finish chapter").
- Weekly tables: Week | DSA (count + named anchors) | Rail | Files touched | Mock. Fridays = revision queue; Sundays = exit review.
- Priorities via P0–P3 with one-line justification each (frequency × gap × dependency × role relevance).
- Respect two constraints from my history: active interview pipeline gets the first hour of any day, and anti-over-systematization — tracker upkeep must stay under 10 min/day.
Update state (roadmap_done=true, current_week=1).
