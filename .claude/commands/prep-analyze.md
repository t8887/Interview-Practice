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
