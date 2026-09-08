---
description: Implement exactly one PrepVerse task by id, spec-first, DoD-gated
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(npm *), Bash(npx *), Bash(git *)
argument-hint: task id, e.g. M1-T04
---
Target task: $ARGUMENTS.
1. Read prepverse/_meta/pv-state.json. If the task's Deps aren't all in done[], STOP and say
   which are missing.
2. Read ONLY: this task's block in prepverse/docs/TASKS.md, the prepverse/docs/ARCHITECTURE.md
   sections it cites, and the files it names. Do not load the whole docs unless the task is
   ambiguous — ask one question instead.
3. If the task is tagged "Learn:" with a graph algorithm: ask me to paste/write my
   implementation first; your job is review, tests, edge cases — not authorship.
4. Implement with the smallest coherent diff. Design tokens only. Static-export
   constraints apply.
5. Verify: tsc --noEmit · npm test · npm run build · npm run canary · summarize
   any budget-relevant numbers.
6. Update prepverse/_meta/pv-state.json (done + one-line note), print the AC checklist with
   pass/fail, propose the conventional commit message. Do not start another task.
