# PrepVerse — Claude Code contract

## What this is
Onkar's personal interview-prep universe: a static, ₹0-cost, mobile-first Next.js
site rendering ../ (the Interview-Practice markdown corpus) as an interactive
comic-book knowledge graph. 1–10 users. Learning-by-building is a first-class goal.

## Read before acting
- docs/REQUIREMENTS.md — features as numbered FRs. Tasks implement FRs; cite the
  relevant FR ids in your summary and commit body. Behavior beyond the cited FRs
  is scope drift: stop and propose an FR edit instead.
- docs/ARCHITECTURE.md — ADRs, schemas, pipeline, budgets. NEVER contradict an ADR;
  if a change requires it, STOP and propose an ADR edit instead of coding around it.
- docs/TASKS.md — the only source of work items. No invented tasks.
- _meta/pv-state.json — current milestone, done list. Update at end of every session.

## Hard rules
1. ₹0 forever: no service, dependency, or config that requires payment or an API key.
2. No servers: static export only. Forbidden: middleware, ISR, Server Actions,
   cookies()/headers(), request-reading route handlers (ADR-01 list).
3. Privacy: never read or reference ../10-Interview-Prep, ../11-AI-Risk-Assistant-Project,
   ../12-Company, ../13-Salary-Negotiation, ../21-Mock-Interviews, ../*.pdf, ../TRACKING.md.
   site.allowlist.json is include-only; the canary must pass before any commit is final.
4. The site READS ../ content; it writes ../ ONLY when a task explicitly says
   "content task" (frontmatter/hooks), and then only inside allowlisted folders.
5. Budgets (ARCHITECTURE §7.4) are acceptance criteria, not suggestions.
6. Design tokens only — a raw hex outside app/tokens.css is a defect.
7. Owner implements graph algorithms (cycle, topo, BFS) FIRST; Claude reviews,
   tests, and hardens — never pre-writes them. These are his DSA reps.
8. Small diffs: one task per session; if a task balloons, split it in docs/TASKS.md
   rather than freestyling.
9. TypeScript strict, no `any`; every "use client" gets a one-line reason comment.
10. Definition of Done = docs/TASKS.md §2. All ten points. Every time.

## Conventions
Components in components/<area>/Name.tsx + Name.module.css. Lib code pure &
unit-tested. Generated public/data/ is gitignored. Conventional commits with
task ids. State notes are one line, factual.
