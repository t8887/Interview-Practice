---
description: Pre-deploy checklist + commit/push guidance
allowed-tools: Read, Bash(git *), Bash(npm *)
---
Confirm: working tree reviewed (git status/diff summary), /pv-review green,
canary green, phone-check noted in state. Then produce the conventional commit
message(s) and the push command. If anything is red, refuse and list fixes.
Never push with a failing canary under any circumstances.
