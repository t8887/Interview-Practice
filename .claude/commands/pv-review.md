---
description: Full health pass — types, tests, build, canary, budgets, drift
allowed-tools: Read, Glob, Grep, Bash(npm *), Bash(npx *)
---
Run tsc --noEmit, npm test, npm run build, npm run canary. Then audit: stray hex
outside tokens.css (grep), "use client" files missing reason comments, any
forbidden Next feature (middleware/ISR/actions), React Flow leaking into /n/*
bundles (check build output). Report: green/red per check, top 3 issues with file
paths, and whether the current milestone's exit criteria are met.
