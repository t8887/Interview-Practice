---
description: Knowledge graph + gap analysis + honest 0–5 readiness matrix
allowed-tools: Read, Write, Glob, Grep
---
Precondition: `_meta/REPOSITORY_ANALYSIS.md` exists (else tell me to run /prep-analyze). Read it + INVENTORY.md + `_meta/imported/*` (Claude.ai baseline docs, if present).

Produce three files:
1. `_meta/KNOWLEDGE_GRAPH.md` — dependency chains for DSA, JS→Node, React, System Design/LLD/Distributed, DB, AWS. Annotate EVERY node with ✅(file exists, adequate) 🔧(exists, upgrade — name what's missing) 📦(misfiled — from→to) ❌(create — exact proposed path). Base it on what the files ACTUALLY contain per the analysis, not their titles.
2. `_meta/SKILL_GAP_ANALYSIS.md` — table: Domain | Current coverage (cite files) | Required level (Google-tier, SDE-2 backend-lean) | Gap size | Priority (freq × gap × dependency × role) | Action (file-level). Cover: all DSA patterns, OS, networking, DB internals, JS, TS, Node, React, MySQL/Mongo/Redis/OpenSearch, AWS, HLD, LLD, distributed systems, behavioral, mocks.
3. `_meta/PRODUCT_COMPANY_READINESS.md` — 0–5 matrix. RULES: a score of 3+ requires solving/implementation artifacts in the repo, not notes; anything notes-only caps at 2.5 with ⚠️ unverified; cite the evidence file for every score; include a "resume-vs-prep mismatch" section (claims in stories/resume that prep can't currently defend).
Update state (gaps_done=true). Chat summary: the 4 biggest gates, 5 lines max each.
