---
description: Generate a targeted, link-first prep file for one company/role from a JD paste
allowed-tools: Read, Write, Glob, Grep
argument-hint: <company name> + paste of the job description
---
Generate a targeted prep file in `12-Company/` for: $ARGUMENTS.

Rule: link to existing topic files for anything already covered elsewhere in the repo — do NOT restate it. Only write net-new, company-specific content (their stack quirks, their known interview format/rounds, their likely bar, gaps between the JD and my current repo coverage). This stops the pattern of 19K-word, mostly-duplicated per-company files.

Structure:
1. Company/role snapshot — stack, round structure (from any known patterns for this company), seniority bar.
2. JD → repo coverage map: each JD requirement mapped to an existing file (link it) or flagged ❌ missing (name the file to create).
3. Company-specific content ONLY — anything that doesn't already live in a topic file.
4. Likely question set for this company, each linked to the repo file that answers it, not restated.
5. A 1-page night-before cram sheet at the end: the handful of things to re-read in the last hour, all as links.

Update state.json (note the company file was created, if you track a list) and last_command.
