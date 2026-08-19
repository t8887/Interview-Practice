# Claude Code Prompt System — Interview-Prep Operating System

## Why not the one big prompt?

The mega-prompt you drafted (12 phases, 20 deliverables, one shot) has the right *content* but the wrong *shape*. In a single run, the model must compress 12 phases into one context window → every phase gets shallow, generic output — exactly what your rule #5 forbids. And if it dies at phase 7, you restart from zero.

**The fix: phased, stateful commands.** Each phase is its own slash command that (a) reads the previous phases' *output files*, not chat memory, (b) writes its results to disk, (c) updates a state file so everything is resumable, and (d) is small enough to be done *deeply*. Your 12 phases and 20 documents are all here — just decomposed so each one gets full attention.

Bonus: run this against your **local** repo, which is ~10 weeks fresher than GitHub (your Guardian/Coforge/HDFC/Metron/Coffeee/Recro/bolttech files aren't committed).

---

## Setup (3 minutes)

Custom slash commands in Claude Code are just Markdown files: anything saved as `.claude/commands/<name>.md` in your repo becomes `/name`, the file body is the prompt, and `$ARGUMENTS` injects whatever you type after the command. Optional YAML frontmatter can add a description and pre-approve tools. (Docs: https://docs.claude.com/en/docs/claude-code/overview → slash commands.)

```bash
cd ~/path/to/Interview-Practice
mkdir -p .claude/commands _meta
# then save each block below into the path shown above it
```

Fastest way: open Claude Code in the repo, paste this whole document, and say: *"Create every file exactly as specified in the fenced blocks, at the paths given."*

---

## File 1 of 12 — `CLAUDE.md` (repo root — loaded automatically every session)

````markdown
# Interview-Practice — Context for Claude

## Owner profile (use this in EVERY analysis and recommendation)
- Onkar Sawant, Senior Software Engineer, ~6 YOE, Pune. Stack: Node.js, TypeScript, React, AWS serverless (Lambda, API GW, SQS/SNS/EventBridge, DynamoDB, S3, CloudFormation, OpenSearch), MySQL/MongoDB, Redis, microservices, GenAI/agentic AI (LangGraph/LangChain, RAG, MCP).
- Project story anchors: (1) UTEC/UltraTech construction SaaS — OpenSearch migration 2s→200ms, notification engine, VAPT-hardened APIs; (2) EY Risk.ai agentic AI platform; (3) P&G Olay BigCommerce→Shopify GraphQL migration; (4) Vkonnect Health MERN + EC2→Lambda migration (245+ Lambdas story).
- Target: product companies (Google-tier bar), Senior/SDE-2 full-stack backend-lean, Node/TS/AWS. Active pipeline in parallel — never sacrifice this week's real interview for the roadmap.

## Hard rules for all prep commands
1. Evidence over assumption: cite actual file paths + line-level observations. Notes prove exposure, NOT ability — cap any skill score lacking solving/implementation evidence and mark it ⚠️ unverified.
2. Be brutally honest. No courtesy scores. No generic advice — every recommendation names a repo file to change or create.
3. Depth over coverage: it is better to finish one file's analysis properly than to skim five.
4. All command outputs go to `_meta/` (analysis) or the numbered content folders (curriculum). Never dump long results only into chat.
5. Always update `_meta/state.json` at the end of a command run.
6. Roadmap files 01–04 from the Claude.ai analysis (if present in `_meta/imported/`) are the baseline — refine them with local-repo evidence rather than regenerating from scratch.
7. All code examples: modern JavaScript or TypeScript. Complexity analysis mandatory on anything algorithmic.
8. Formatting: tables for comparisons, one H1 per file, linked-doc header (see `/prep-link`) on every content file.

## State file schema — `_meta/state.json`
{ "inventory_done": false, "files_analyzed": [], "files_pending": [], "gaps_done": false,
  "roadmap_done": false, "curricula_done": [], "restructure_done": false,
  "problem_log_count": 0, "current_week": null, "last_command": null, "updated": null }
````

---

## File 2 — `.claude/commands/prep-inventory.md` → `/prep-inventory`  *(your Phase 1)*

````markdown
---
description: Full repository inventory → _meta/INVENTORY.md + initialize state
allowed-tools: Read, Glob, Grep, Bash(find *), Bash(wc *), Bash(git log *), Bash(diff *), Write
---
You are auditing this interview-prep repository. Produce a COMPLETE inventory. Do not analyze content quality yet (that is /prep-analyze) — this pass is structural.

Steps:
1. Recursively list every file (skip .git). For each: path, type, word count (md) or line count (code).
2. Build the repository tree with per-folder: file count, total words, one-line purpose.
3. Detect mechanically: byte-identical duplicate files/folders (diff -rq), empty files (<30 words), files sharing number prefixes, TODO/FIXME/WIP markers with locations, files not referenced by any README, folders present locally but absent from README's structure diagram, git-status uncommitted files.
4. Flag misfiled content: DSA patterns outside 08-DSA, testing content inside 12-Company, system-design content inside 01-JavaScript, etc. — list each with source path and proposed destination.
5. Privacy scan: grep for phone numbers, salary figures (LPA/₹), candidate IDs, personal PDFs. List every hit with path:line. (Do not print the sensitive values themselves — paths and a label are enough.)

Write `_meta/INVENTORY.md` with sections: Tree · Stats table · Duplicates · Misfiled · Markers · Privacy flags · Uncommitted-vs-GitHub delta.
Then initialize `_meta/state.json`: set inventory_done=true, files_pending=[every meaningful .md path], files_analyzed=[], last_command="prep-inventory", updated=now.
Finish with a 10-line summary in chat: counts, top 5 structural problems, next command to run.
````

---

## File 3 — `.claude/commands/prep-analyze.md` → `/prep-analyze 8`  *(your Phase 2 — batched & resumable)*

````markdown
---
description: Deep file-by-file analysis in batches; append to _meta/REPOSITORY_ANALYSIS.md
allowed-tools: Read, Grep, Glob, Write, Edit
argument-hint: [batch size, default 8]
---
Deep-analyze the next $ARGUMENTS files (default 8) from files_pending in `_meta/state.json`. Batching is mandatory — depth per file beats coverage per run. Order: 08-DSA first, then 14-Design-Patterns, 07-System-Design, 03-NodeJS, 02-TypeScript, 06-SQL, 04-React, then the rest; 12-Company files last and analyzed only for reusable-content extraction.

For EACH file, READ IT FULLY, then append to `_meta/REPOSITORY_ANALYSIS.md`:

### `path/to/file`
- Purpose · Topics covered (exhaustive list)
- Depth: Beginner/Intermediate/Advanced/Expert — justify with specifics ("presents final O(n) solutions but derives none", "covers X but the Y section is 3 bullet points")
- Correctness: flag anything technically wrong or outdated, quoting the offending line
- Interview importance: Low/Med/High/Critical for Onkar's target role
- Missing knowledge: what a Google-tier interviewer would ask that this file cannot answer
- Overlaps/dependencies: name the exact sibling files
- Verdict: Keep / Improve / Merge(with X) / Split(into X,Y) / Move(to X) / Delete — one verdict, one sentence why
- Priority: P0–P3
- 2–3 concrete exercises derived from THIS file's content (e.g., "re-implement the LFU from memory, add TTL support")

After the batch: move analyzed paths from files_pending → files_analyzed in state.json, update `updated`, and report in chat: N analyzed, M remaining, standout finding of the batch. If files_pending is empty, write a FINAL SYNTHESIS section (top 10 findings across all files) and say "analysis complete — run /prep-gaps".
````

---

## File 4 — `.claude/commands/prep-gaps.md` → `/prep-gaps`  *(your Phases 3–5)*

````markdown
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
````

---

## File 5 — `.claude/commands/prep-roadmap.md` → `/prep-roadmap`  *(your Phases 6–7 + 12)*

````markdown
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
````

---

## File 6 — `.claude/commands/prep-curriculum.md` → `/prep-curriculum dsa`  *(your Phases 8–9 + deliverables 7–17, one at a time)*

````markdown
---
description: Generate ONE deep curriculum/mastery doc per run
allowed-tools: Read, Write, Glob, Grep
argument-hint: dsa | javascript | typescript | nodejs | react | databases | redis-opensearch | aws | system-design | lld | distributed | cs-fundamentals | question-bank | revision-system
---
Generate the curriculum for: $ARGUMENTS — ONE topic per run, at full depth. Read the gap analysis + the topic's existing repo files first; the curriculum must BUILD ON them (link every existing file, mark 🔧 upgrades) — never duplicate what a file already does well.

Output location: the topic's folder, as `_CURRICULUM.md` (e.g. `08-DSA/_CURRICULUM.md`); question-bank/revision-system → `_meta/`.

Topic contracts:
- dsa: for EVERY pattern — identification cues, brute→optimized derivation, complexity, common mistakes, edge cases, a reusable modern-JS template, easy/medium/hard problem ladder (named), follow-ups, revision schedule. Map each pattern to its existing 08-DSA note or mark ❌.
- javascript/typescript/nodejs/react: topic tree with prerequisites; per topic: what the existing file covers vs misses (cite), 5–10 hardest interview Qs with model answers, ≥1 implementation exercise, links.
- databases / redis-opensearch: internals-first; every concept ends with a hands-on lab (e.g., reproduce a deadlock; build an inverted index in 50 lines of JS; benchmark a covering index). redis-opensearch MUST include a section templated on MY UTEC OpenSearch migration for interview defense.
- system-design: the 20-step framework instantiated for each remaining design (payment, news feed, crawler, file storage, logging/analytics, food delivery) at 4 difficulty levels + a 5-minute capacity-estimation drill sheet.
- lld: complete 14-Design-Patterns per its own todo.md (each pattern ≥ the depth of the existing factory README, TS examples) + 6 machine-coding problems with requirements→class design→working TS→extension question.
- distributed: 7 files (CAP/PACELC, consistency, idempotency, delivery semantics, outbox/saga, locks, clocks) — each MUST anchor to one of my real AWS flows.
- cs-fundamentals: OS + networking + DB-internals files; every OS/networking concept ends with "how this shows up in Node.js/AWS".
- question-bank: consolidate every `*-mnc-frequently-asked.md` + analysis findings into `_meta/INTERVIEW_QUESTION_BANK.md`, deduplicated, tagged by topic/difficulty/frequency, answers linked to repo files rather than restated.
- revision-system: write `_meta/REVISION_SYSTEM.md` + create `22-Revision/queue.md` seeded from all files' `next_review` headers.
Append "$ARGUMENTS" to curricula_done in state. Suggest the next topic by priority.
````

---

## File 7 — `.claude/commands/prep-restructure.md` → `/prep-restructure`  *(your Phases 10–11, executed)*

````markdown
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
````

---

## File 8 — `.claude/commands/prep-daily.md` → `/prep-daily`  *(the operating system)*

````markdown
---
description: Serve today's plan, run the session, log everything
allowed-tools: Read, Write, Edit, Glob, Bash(date *)
---
1. Read `_meta/state.json`, `_meta/WEEKLY_PLANS.md` (current_week), `22-Revision/queue.md`, and TRACKING.md.
2. Ask ONE question: "Interview scheduled this week? (company/round or 'no')". If yes: first block = 45-min targeted revision from the matching 12-Company file + relevant *-mnc-frequently-asked.md — list the exact sections.
3. Then serve today's plan: 2 DSA problems from this week's pattern (pick from the anchor list, excluding solved ones in 16-DSA-Practice/LOG.md; 1 should be a due-redo if any) + the rail block + due revision items.
4. Run the DSA session properly: give me the problem, START A 25-MIN EXPECTATION, do NOT reveal approach; if I ask for help, give ONE graduated hint. After my attempt: review my solution for correctness/complexity/edge cases/code quality, THEN show optimal, then create the problem file in 16-DSA-Practice/<pattern>/ with the standard header (attempt time, hints, result, redo date) and append to LOG.md.
5. End of session: append the day's line to TRACKING.md, bump next_review dates on touched items, update state.json (problem_log_count). Under 10 minutes of overhead total — if I'm rushed, log first, chat later.
````

---

## File 9 — `.claude/commands/prep-revise.md` → `/prep-revise`

````markdown
---
description: Spaced-repetition session over everything due (D1/D3/D7/D21)
allowed-tools: Read, Write, Edit, Glob, Grep
---
Scan next_review dates in file headers + 22-Revision/queue.md + LOG.md redo dates. For each due item, QUIZ me actively — never summarize at me:
- DSA problem due → give me just the problem name, I re-solve from scratch (15-min cap), you verify.
- Concept note due → ask me its 3 hardest interview questions (from the file's own Interview Questions section); I answer from memory; you grade against the file and show what I missed.
Clean recall → advance D1→D3→D7→D21→mastered. Any miss → back to D1. Rewrite queue.md, update headers. Report: X cleared, Y demoted, current mastered count.
````

---

## File 10 — `.claude/commands/prep-mock.md` → `/prep-mock dsa | design | behavioral | node | lld`

````markdown
---
description: Full mock interview with rubric scoring → 21-Mock-Interviews/
allowed-tools: Read, Write, Glob
argument-hint: dsa | design | behavioral | node | lld
---
Run a realistic $ARGUMENTS mock. You are a senior interviewer at a top product company: professional, probing, never teaching mid-interview, never confirming correctness until the end.
- dsa: 1 unseen medium NOT in my LOG.md, 35 min. Expect me to clarify, state brute force, derive optimal, code, dry-run, give complexity. Interject only as a real interviewer would ("what if the input is sorted?").
- design: pick from roadmap's remaining list or a variant of one I've done, 45 min, follow the requirements→estimation→API→data→architecture→deep-dive→trade-offs arc; push on numbers and failure modes.
- behavioral: 5 questions targeting my weakest story areas (conflict, failure, ambiguity) based on 10-Interview-Prep/; follow up like a bar-raiser ("what was YOUR specific contribution?").
- node/lld: deep-dive drill from my resume claims — event loop, streams, the OpenSearch migration, or a machine-coding problem.
Afterwards: score communication / problem-solving / correctness / complexity+trade-offs / edge cases, each 1–4 with one evidence sentence; 3 prioritized improvements; write the full log to 21-Mock-Interviews/YYYY-MM-DD-$ARGUMENTS.md and update state.
````

---

## Files 11–12 — optional helpers

**`.claude/commands/prep-company.md`** → `/prep-company <name + JD paste>`: generate a targeted prep file in `12-Company/` that (rule) *links* to existing topic files for anything already covered and only writes net-new company-specific content — stops the 19K-word-per-company duplication pattern. Ends with a 1-page night-before cram sheet.

**`.claude/commands/prep-status.md`** → `/prep-status`: read state.json + LOG.md + mock logs → print the dashboard: problems by pattern vs plan, unaided-medium streak, mock-score trend, curricula done, files linked, due-queue size, and the single highest-leverage next action.

---

## Run Order

| When | Command | Output |
|---|---|---|
| Day 1 | copy the 4 Claude.ai docs into `_meta/imported/` → `/prep-inventory` | INVENTORY.md, state.json |
| Days 1–3 (few runs) | `/prep-analyze 8` until pending=0 | REPOSITORY_ANALYSIS.md (true file-by-file, local + fresh) |
| Day 3 | `/prep-gaps` → `/prep-roadmap` | graph, gaps, readiness, refreshed roadmap+plans |
| Day 3–4 | `/prep-restructure` (repeat for link batches) | clean repo, scaffolding, linked docs |
| Week 1+ | `/prep-curriculum dsa` → then one topic every few days by priority | the mastery docs (your deliverables 7–17) |
| Every day | `/prep-daily` · Fridays `/prep-revise` · Weekly `/prep-mock …` · Anytime `/prep-status` | the actual preparation |

Commit `_meta/` outputs — they're your progress record. Total setup cost: one paste. Total daily overhead: <10 minutes. Everything else is solving problems, which is the point.
