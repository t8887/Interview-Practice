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
