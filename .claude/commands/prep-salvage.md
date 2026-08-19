---
description: Salvage reusable knowledge from a sensitive folder, sanitize identities, verify, then delete the folder
argument-hint: folder name, e.g. 12-Company
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(git *), Bash(mkdir *), Bash(wc *)
---

Target folder: $ARGUMENTS. You are performing a SALVAGE-SANITIZE-DELETE migration.
Data loss of technical knowledge is failure; leakage of identity is failure;
deleting before verification is failure. Work in small, checkpointed steps.

# State & safety
- State file: _meta/salvage-state.json
  { "folder": "...", "phase": "plan|execute|verify|delete|complete",
    "processed": [], "pending": [], "created_or_modified": [], "log": [] }
- All work happens on branch `salvage/<folder>` (create from current branch if absent).
- NEVER modify files outside: the target folder (read-only until deletion),
  destination topic folders (append/merge only), 10-Interview-Prep (behavioral
  routing only), and _meta/.
- The salvage log (_meta/salvage-log-<folder>.md) records source→destination
  provenance. Provenance NEVER goes into migrated files themselves — migrated
  content must carry zero trace of which company it came from.

# The strip list (build it, then apply it everywhere)
Seed identifiers — always strip:
  Onkar's phone (+91 8805529687 in any spacing), onkarsawant87@gmail.com,
  "Candidate ID" + any adjacent number, any ₹ figure, any "N LPA"/"CTC" figure,
  recruiter/interviewer person names, application/portal IDs and links
  (DoSelect, HackerRank invites, Zoom/Teams links), interview dates & rounds
  tied to his pipeline, home locality names.
Company names — strip and genericize: derive the list from the folder's own
  filenames and headings, PLUS this known set: Infosys, CitiusTech, HCLTech,
  Deloitte, Encora, Coforge, TCS, Buzzworks, HSBC, TEKsystems, Metron,
  Coffeee.io, Guardian, bolttech, Multivision, HDFC Ergo, Recro, EY (and any
  EY client names), eHealthSystem, Setu, HealthSystems.
Genericization rules: "Infosys L2 round" → "a large IT-services L2 round";
  "design X for HSBC" → keep the design problem, drop the bank; if the company
  context adds nothing technical, drop the framing entirely. When a question's
  only value IS the company (logistics, culture research, "about the panel"),
  it is DROP-class content.

# Content classification (apply per section/block of every file)
KEEP-MIGRATE (the gold): technical Q&A with answers; coding challenges +
  solutions; system-design scenarios (genericized); concept explanations;
  debugging walkthroughs; genuinely reusable checklists.
ROUTE-PRIVATE: behavioral/STAR content and personal gap analyses → append to
  10-Interview-Prep/salvaged-behavioral.md (private folder, allowlist-excluded).
DROP (log a one-line summary, do not migrate): company research/logistics,
  panel details, salary/negotiation snippets, pipeline status, JD text,
  anything that is only meaningful with the company name attached.

# Destination mapping
javascript→01-JavaScript, typescript→02-TypeScript, node→03-NodeJS,
react/RTL/testing→04-React, redux→05-Redux, SQL/Mongo→06-SQL-MySQL-MongoDB,
system design→07-System-Design, DSA→08-DSA, GenAI/agents/RAG→09-Agentic-AI,
patterns/LLD→14-Design-Patterns (or 18-LLD-Machine-Coding if it exists),
AWS→15-AWS-Services, OS/networking/DB-internals→17-CS-Fundamentals (if exists),
Redis/OpenSearch→20-Redis-OpenSearch (if exists).
Within a destination: if a note on that subtopic exists, MERGE — append new Q&A
under its `## Interview Questions` H2 (create the H2 if missing), dedupe first
(grep for near-identical questions; keep the better answer; log every merge/skip
decision). If no suitable note exists, create
`<dest>/interview-questions-<subtopic>.md` with a minimal valid frontmatter
block (id, title, domain, level, status: draft) matching the PrepVerse schema.

# PHASES (strict order, checkpoint between each)

PHASE plan (read-only):
1. Inventory the target folder: files, word counts.
2. For each file produce a salvage map: per-section classification + destination.
3. Write _meta/salvage-plan-<folder>.md with the full map + the derived strip
   list + estimated counts (Q&A to migrate, blocks to drop, behavioral to route).
4. Set state phase=plan, pending=[all files]. STOP. Tell me to review the plan
   and reply "approve plan" to continue.

PHASE execute (only after my explicit "approve plan"; batch = 4 files/run):
5. For each file in the batch: apply classification → sanitize → dedupe →
   migrate/route/drop → update salvage log and state (processed, created_or_modified).
6. After the batch: report files done/remaining. If pending remains, STOP and
   tell me to re-run /prep-salvage to continue. Never exceed the batch size.

PHASE verify (auto-runs when pending is empty):
7. Grep ALL created_or_modified files (and 10-Interview-Prep/salvaged-behavioral.md)
   for every strip-list pattern, including every company name. Zero hits required.
   Any hit: fix it, re-grep, and list what was fixed.
8. Sanity: counts in salvage log ≈ plan estimates; no file outside the permitted
   write set was touched (git status must confirm). Write the final report to
   _meta/salvage-report-<folder>.md. STOP. Tell me to review and reply
   "approve delete" to continue.

PHASE delete (only after my explicit "approve delete"):
9. git rm -r <folder>; commit "chore(salvage): remove <folder> after migration";
   run the verify grep once more across the whole repo working tree (excluding
   _meta/ and .git/) for the personal-identifier subset (phone, email,
   Candidate ID, ₹, LPA, CTC) and report any remaining hits OUTSIDE the folders
   I have not yet salvaged (e.g. 13-Salary-Negotiation, TRACKING.md, the resume
   PDF) so I know what is still pending.
10. Print merge instructions (do NOT auto-merge): review the branch diff, then
    merge salvage/<folder> into main. Set phase=complete.

# Hard rules
- One phase per invocation maximum; destructive steps only after the exact
  approval phrases above.
- If a section is ambiguous between KEEP and DROP, prefer KEEP + aggressive
  sanitization, and flag it in the report for my review.
- Never summarize-to-shrink the technical answers; migrate them intact.
- If anything unexpected appears (merge conflicts, files changed since plan),
  STOP and describe rather than improvise.
