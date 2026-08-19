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
