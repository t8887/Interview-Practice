# PrepVerse — Task Backlog & Claude Code Operating Layer v1.0
### Every feature decomposed into executable tasks. One task per Claude Code session. Specs live on disk, not in prompts.

> Read `07_PREPVERSE_ARCHITECTURE.md` first — tasks reference its sections instead of repeating them (that's the token-efficiency trick).
> Estimates: **S** ≈ 30–45 min · **M** ≈ 1–1.5 h · **L** ≈ 2–3 h. `Learn:` tags map to your interview-prep gaps.
> A task is DONE only when its AC pass **and** the global Definition of Done (§2) passes.

---

## 1. Backlog

### M0 — Foundations (~1 evening + first weekend morning · goal: deployed hello-screen on your phone)

**M0-T01 · Repo privacy + workspace init** — Flip `Interview-Practice` to private (precondition for everything). Create `site/` with Next.js (App Router, TS strict), ESLint+Prettier, `output:'export'`, `images:{unoptimized:true}`, `distDir` default.
AC: `npm run dev` serves a placeholder; `npm run build` emits `out/index.html`; `tsc --noEmit` clean. Deps: —. Est: S.

**M0-T02 · tokens.css + base layout** — Create `app/tokens.css` with the exact palette/type/motion tokens from doc 06 §7 (`--ink --panel --web --spider --dimension --charge --venom`, radii, durations, `steps(12)` helper, reduced-motion block). Global styles: ink background, Inter body (Google Fonts for now), focus-visible ring in `--charge`.
AC: placeholder page renders ink-dark with correct text color in light & dark phone modes; focus ring visible on tab. Deps: T01. Est: S. Learn: design tokens.

**M0-T03 · Privacy rails** — Add `site.allowlist.json` + `privacy.rules.json` exactly per arch §5.4. Write `scripts/privacy-canary.ts` (walk `out/`, regex scan text files, print hits with 40-char context, exit 1) + npm script `canary`.
AC: seeding a fake `+91 88xxx` into a page makes `npm run build && npm run canary` fail; removing it passes. Deps: T01. Est: M. Learn: CI thinking, regex.

**M0-T04 · Claude Code contract** — Install `site/CLAUDE.md` and `.claude/commands/pv-*.md` from §3 of this doc verbatim; create `_meta/pv-state.json` `{ "current": "M0", "done": [], "notes": [] }`; copy docs 06/07/08 into `site/docs/`.
AC: `/pv-status` responds with backlog position. Deps: T01. Est: S.

**M0-T05 · Cloudflare Pages hookup** — Create CF Pages project from the private repo: root dir `site`, build `npm ci && npm run build && npm run canary`... (order: canary must run AFTER export — set build command `npm ci && npm run pipeline` where `pipeline` = `build-content || true`-less strict chain defined in package.json as `prebuild`+`build`+`canary` sequence via `npm-run-all -s`). Output dir `site/out`.
AC: push → auto-deploy → `*.pages.dev` opens on your phone; a canary-failing commit shows a failed deploy. Deps: T01, T03. Est: M.

**M0-T06 · Vitest wiring** — Add vitest + first trivial test (schema smoke). AC: `npm test` green in <5 s. Deps: T01. Est: S.

### M1 — Content pipeline, the "backend" (~1 weekend · goal: real repo data → JSON artifacts, validated)

**M1-T01 · Frontmatter schema** — Implement `lib/content/schema.ts` exactly per arch §5.1 (zod, defaults, DOMAINS). Export inferred types.
AC: unit tests cover valid, invalid-id, defaulting, xp-by-level. Deps: M0-T06. Est: S. Learn: zod, parse-don't-validate.

**M1-T02 · Walker + legacy-tolerant parser** — `lib/content/walk.ts`: allowlist walk, per-file gray-matter parse, derivations for missing id/domain/status (arch §5.1), `issues[]` accumulation, folder→domain map.
AC: running against the real repo yields N parsed nodes with 0 crashes; derived-id files listed in issues. Deps: T01. Est: M.

**M1-T03 · Link resolver** — `lib/content/links.ts`: relative-md + `[[wikilink]]` → id map; rewrite hrefs to `/n/{id}`; unresolved → warning objects.
AC: fixtures for both link styles + broken link; real-repo run reports (not throws) unresolved links. Deps: T02. Est: M. Learn: AST work.

**M1-T04 · Graph assembly + cycle detection** — `lib/graph/types.ts` + `cycle.ts` (DFS three-color, returns the cycle path) + duplicate/unknown-ref checks. **Write cycle.ts yourself before letting Claude Code review it — this is a logged DSA rep.**
AC: fixture with a planted A→B→C→A fails with the exact path printed; clean fixture passes; unknown prereq id fails. Deps: T02. Est: M. **Learn: graphs/DFS (gap-list item).**

**M1-T05 · Topological order** — `lib/graph/topo.ts` (Kahn's) per domain; deterministic tie-break (title asc). Same rule: implement first, review after.
AC: property test — every edge (u,v) has index(u) < index(v); stable across runs. Deps: T04. Est: M. **Learn: topo sort (gap-list item).**

**M1-T06 · Renderer + section extraction** — `lib/content/render.ts` + `sections.ts`: unified pipeline, shiki, extraction of Interview Questions / Exercises / My Real-World Usage per ADR-06 contract; sanitize.
AC: a fixture note produces `html` with highlighted code + populated `sections`; notes without those headings degrade gracefully. Deps: T03. Est: L.

**M1-T07 · Emitters + report** — `scripts/build-content.ts` orchestrating steps 1–7 of arch §6; emit `graph.json`, `nodes/*.json`, `MIGRATION_REPORT.md`, console stats table (domain × status).
AC: full real-repo run < 60 s; artifacts validate against the TS types; report lists real gaps. Deps: T04–T06. Est: M.

**M1-T08 · Wire prebuild + canary into one pipeline** — package.json: `prebuild` → content build; `postbuild` → canary. CF build command simplified to `npm ci && npm run build`.
AC: one command locally = content → next → canary; CF deploy green. Deps: T07, M0-T05. Est: S.

**M1-T09 · Frontmatter pilot migration (content task)** — Add full frontmatter to the ~10 Node.js-constellation files (ids, prereqs forming a real DAG, one `videos:` entry on the event-loop note with the Codevolution id, statuses honest per your prep reality).
AC: graph.json shows a connected nodejs constellation; MIGRATION_REPORT shrinks for that folder. Deps: T07. Est: M.

**M1-T10 · Algorithm test hardening** — Fixture library for graphs (chain, diamond, forest, cycle, self-loop) reused by cycle/topo/bfs tests.
AC: `npm test` covers all fixtures; mutation-check: breaking Kahn's queue order fails a test. Deps: T04, T05. Est: S. Learn: testing discipline.

### M2 — Read experience (~1 weekend · goal: study a real note beautifully on the phone)

**M2-T01 · Node route (server component)** — `app/n/[id]/page.tsx`: read `nodes/{id}.json` via fs at build, `generateStaticParams` from graph.json; prose styles for `NoteBody` (line-height 1.7, code blocks, tables).
AC: `/n/node-event-loop` renders full note; page bundle has no React Flow; view-source shows content (static HTML). Deps: M1-T07. Est: M. **Learn: RSC + generateStaticParams.**

**M2-T02 · Comic sections** — `ColdOpen` (Bangers display + misprint shadow), `FieldNotes` (project badge), `TrainingBlock`, `Cliffhanger` (reads `neighbors.unlocks` + their hooks).
AC: sections render when data exists, vanish cleanly when not; sentence-length hooks don't overflow on 360 px. Deps: T01. Est: M.

**M2-T03 · BossQuestions v1 (reveal only)** — Tap-to-reveal answer cards; no grading yet.
AC: keyboard operable; state resets per question; works with 0 questions. Deps: T01. Est: S.

**M2-T04 · VideoTheater** — lite-youtube facade (nocookie), `ts` deep-link, title from frontmatter; layout for 1–2 videos.
AC: thumbnail renders instantly; iframe loads only on tap; timestamp honored. Deps: T01. Est: S.

**M2-T05 · List fallback route** — `app/c/[domain]/list/page.tsx` server-rendered: nodes grouped by status with links; doubles as no-JS path.
AC: works with JS disabled; every node reachable. Deps: M1-T07. Est: S. Learn: progressive enhancement.

**M2-T06 · Shell** — `TopBar` (wordmark misprint, XpChip placeholder), `TabBar` with active states + safe-area padding.
AC: matches mock spacing on 360–430 px widths; 44 px targets. Deps: M0-T02. Est: M.

**M2-T07 · Budget check #1** — Lighthouse on `/n/*` (throttled): LCP < 2.5 s, JS ≤ 180 KB gz; fix offenders.
AC: numbers recorded in `_meta/pv-state.json` notes. Deps: T01–T06. Est: S. Learn: perf auditing.

### M3 — The map (~1–1.5 weekends · goal: mock parity, alive)

**M3-T01 · RF foundation** — `next/dynamic` React Flow wrapper; `lib/graph/layout.ts` dagre per domain (cached); fitView, pan/zoom, mobile gestures.
AC: nodejs constellation lays out with no overlaps; 60 fps pan on your Poco. Deps: M1-T09. Est: M.

**M3-T02 · NodeCard variants** — Custom RF node; **discriminated union** `type CardState = {k:'todo'}|{k:'draft'}|{k:'solid'}|{k:'mastered'}|{k:'due'}` with exhaustive switch → sketch/half-ink/ink/glow+pin/glitch-slot renderings per mock.
AC: Storybook-less gallery route `/dev/cards` (build-excluded) shows all five; exhaustiveness enforced by `never` check. Deps: T01. Est: L. **Learn: advanced TS (gap-list item).**

**M3-T03 · WebEdge + PortalEdge** — Custom bezier edge, crimson prereq vs dashed-cyan related, `stroke-dashoffset` draw-in on constellation mount; portal edge with glitch-ring endpoint that navigates cross-domain.
AC: draw-in respects motion setting; tapping a portal lands on the other constellation with target highlighted. Deps: T01. Est: M. Learn: SVG/bezier math.

**M3-T04 · GlitchLayer** — The two offset clones + stepped keyframes from the mock, applied when `state.k==='due'`; `motion:auto|on|off` from store; reduced-motion → static dashed cyan outline.
AC: due node visibly stutters; toggling the setting kills/restores it live. Deps: T02. Est: M.

**M3-T05 · ConstellationCanvas** — Compose T01–T04 + `SenseRing` on last-visited (store) + tap → `/n/[id]`.
AC: mock-parity screenshot (send it to Rutuja — the 😍 test); every node reachable by keyboard. Deps: T02–T04. Est: M.

**M3-T06 · UniverseCanvas** — ≤16 domain super-nodes with `ProgressRing` fed by graph.json status counts (**the honest map**); tap → constellation.
AC: DSA renders mostly sketch-state (truth), Node.js glows; counts match the build stats table. Deps: T01. Est: M.

**M3-T07 · Canvas perf pass** — Memoize custom nodes/edges, stable props, no inline handlers into RF; verify with React Profiler.
AC: interaction stays 60 fps with 25 nodes + 30 edges; commit notes what was memoized and why. Deps: T05, T06. Est: M. **Learn: memoization at scale (React gap).**

**M3-T08 · Empty/edge states** — Domain with 0 migrated files → "constellation not yet drawn" sketch state linking to list view; node with no prereqs; orphan nodes cluster.
AC: no crashes on any current real domain. Deps: T05, T06. Est: S.

**M3-T09 · Budget check #2** — Map routes: RF chunk lazy-loaded, ≤ 120 KB gz over base; fps + bundle recorded.
AC: numbers in state notes. Deps: T07. Est: S.

**M3-T10 · Camera system: smooth zoom, controls, dive** — Implement arch §7.5: min/max zoom clamps, pinch + double-tap (animated toward tap point), bottom-right controls cluster (`+`/`−`/fit/you-are-here, 44 px, comic-styled), animated `fitView` on mount, universe→constellation **dive illusion** (zoomTo into the super-node → navigate → mount tight → fit-view out). Add `--dur-camera`/`--dur-camera-fit` tokens; reduced-motion ⇒ durations 0 (cuts, not broken controls).
AC: pinch/double-tap/buttons all animate smoothly on the Poco; dive feels continuous both directions; motion:off makes every transition instant but functional; camera easing is fluid — `steps()` never applied to zoom. Deps: T05, T06. Est: M. **Learn: d3-zoom viewport math, animation ergonomics.**

**M3-T11 · Semantic zoom (LOD)** — `NodeCard` mini variant below zoom threshold (chip + title, no badges, glitch → static outline), full card above; **hysteresis 0.5/0.6** via viewport-zoom subscription so cards never flap at the boundary.
AC: pinching across the threshold holds 60 fps with 25 nodes; universe stays legible fully zoomed out; due-node glitch animates only in full-card mode. Deps: T02, T10. Est: M. **Learn: render optimization under continuous input (React gap).**

### M4 — Missions & progress (~1 weekend · goal: guided path end-to-end, XP persists)

**M4-T01 · Store** — Zustand + persist per arch §5.3; actions: `visit(id)`, `gradeQuiz(id, ok)`, `clearReview(id)`, `startMission(domain, targetId)`, `completeStep`, `setMotion`; xp-log cap 500; streak logic (Asia/Kolkata date-only).
AC: unit tests for streak rollover, xp cap, migrate stub v1→v1. Deps: M0-T06. Est: M. Learn: state design.

**M4-T02 · BFS ancestors + path builder** — `lib/graph/bfs.ts`: collect prereq-ancestors of target, order by domain topo, mark visited-vs-locked from store.
AC: property test — path contains every ancestor exactly once, respects topo; implemented by you first, reviewed after. Deps: M1-T05. Est: M. **Learn: BFS (gap-list item).**

**M4-T03 · Mission UI** — `/mission/[domain]`: pick target (or "full constellation"), `PathRibbon`, `SoftLockGate` (dim + "I know this — skip" marks visited), progress %, resume from store.
AC: complete a real 5-node nodejs path on the phone end-to-end; camera smooth-follows the active step (`setCenter`, ~500 ms per arch §7.5). Deps: T01, T02, M3-T05, M3-T10. Est: L.

**M4-T04 · XP, streak, toasts** — `XpChip` live, `XpToast` on awards, streak increments once/day on any study action; `BurstBadge` on mission completion.
AC: refresh-proof; no double-award on re-visit same day. Deps: T01. Est: M.

**M4-T05 · Hooks for the 10 pilot nodes (content task)** — Write real cold-open hooks anchored in UTEC/EY/Olay/Vkonnect incidents for the nodejs constellation.
AC: each ≤160 chars, lands as tension-not-summary; renders in ColdOpen + Cliffhanger. Deps: M1-T09. Est: M. Learn: storytelling (interview skill).

**M4-T06 · Visit tracking wiring** — `/n/[id]` mounts a tiny client island that calls `visit(id)` once; SenseRing + universe rings read it.
AC: navigating three notes updates map states without reload. Deps: T01, M3-T05. Est: S.

**M4-T07 · Milestone review** — Full DoD + budgets + a written note: "what I'd defend in an interview about this milestone" (3 bullets in state notes).
AC: note exists; all green. Deps: all M4. Est: S.

### M5 — Learning loop (~1 weekend · goal: the glitch means something)

**M5-T01 · BossQuestions v2 (graded)** — Self-grade ✓/✗ after reveal → `gradeQuiz`; per-node stats line ("3/5 lifetime"); input-validation on any typed variant.
AC: stats persist; keyboard flow clean. Deps: M4-T01, M2-T03. Est: M.

**M5-T02 · Review queue** — `/review`: nodes with `review < today` (graph.json) sorted oldest-due first, each with due-age and a "practice" flow = its Boss Questions.
AC: matches manual count from graph.json; empty state ("web is quiet") when none due. Deps: M4-T01. Est: M.

**M5-T03 · Glitch semantics + clear flow** — Due state feeds NodeCard `k:'due'` + TabBar badge; finishing a practice run calls `clearReview(id)` → node un-glitches **this session** and logs practice; canonical `next_review` untouched (ADR-04 — `/prep-revise` owns it). A small ℹ on the review page states this.
AC: due → practice → THWIP-back works; reload before repo update re-shows due (correct!). Deps: T01, T02, M3-T04. Est: M.

**M5-T04 · Settings** — Motion auto/on/off, Export progress (download JSON), Import (validated via zod, versioned), Danger: reset.
AC: export→wipe→import restores exactly; import of garbage rejected with message. Deps: M4-T01. Est: M. Learn: schema-validated IO.

**M5-T05 · Playwright smoke (pre-approved single e2e)** — boot static `out/`, visit note → answer question → check XP chip changed.
AC: runs headless in CI-able script. Deps: T01. Est: M.

**M5-T06 · The resume bullet** — Update your resume/portfolio with the doc-06 §10 bullet (only if now true); record the 90-second phone demo video.
AC: video exists; bullet committed to resume repo. Deps: all M5. Est: S. Learn: the payoff.

### M6 — Backlog (strictly quiet-week optional; order by joy)

M6-T01 Pagefind search (`/search`) · M6-T02 hand-written service worker + manifest (precache shell, cache-first nodes/*, network-first graph.json; **Learn: cache invalidation**) · M6-T03 self-host font subsets (perf + offline) · M6-T04 spider-sense related-hints on node pages · M6-T05 shareable constellation snapshot (SVG → PNG client-side) · M6-T06 curated PUBLIC portfolio subset (new smaller allowlist, separate Pages project, canary still on).

---

## 2. Global Definition of Done (every task)

1. `tsc --noEmit` clean · 2. `npm test` green · 3. `npm run build && npm run canary` green · 4. Checked on the actual phone (or 380 px viewport min) · 5. No console errors/warnings · 6. Tokens only — no stray hex outside `tokens.css` · 7. New `"use client"` files carry a one-line justification comment · 8. `_meta/pv-state.json` updated (task id → done, one-line note) · 9. Conventional commit (`feat(map): M3-T04 glitch layer`) · 10. **The Deal honored: today's 2 DSA problems were logged before this session.**

---

## 3. Claude Code operating layer (install at M0-T04)

Why this shape: specs live on disk (`docs/ARCHITECTURE.md`, `docs/TASKS.md`), state lives in `_meta/pv-state.json`, and each session loads **one task's spec + only the files that task names** — instead of re-explaining the whole vision per prompt. That's the entire token-efficiency strategy: context by reference, not repetition; resumability by state file, not chat memory.

### 3.1 `site/CLAUDE.md` (verbatim)

````markdown
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
````

### 3.2 `.claude/commands/pv-task.md` → `/pv-task M3-T04`

````markdown
---
description: Implement exactly one PrepVerse task by id, spec-first, DoD-gated
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(npm *), Bash(npx *), Bash(git *)
argument-hint: task id, e.g. M1-T04
---
Target task: $ARGUMENTS.
1. Read _meta/pv-state.json. If the task's Deps aren't all in done[], STOP and say
   which are missing.
2. Read ONLY: this task's block in docs/TASKS.md, the ARCHITECTURE.md sections it
   cites, and the files it names. Do not load the whole docs unless the task is
   ambiguous — ask one question instead.
3. If the task is tagged "Learn:" with a graph algorithm: ask me to paste/write my
   implementation first; your job is review, tests, edge cases — not authorship.
4. Implement with the smallest coherent diff. Design tokens only. Static-export
   constraints apply.
5. Verify: tsc --noEmit · npm test · npm run build · npm run canary · summarize
   any budget-relevant numbers.
6. Update _meta/pv-state.json (done + one-line note), print the AC checklist with
   pass/fail, propose the conventional commit message. Do not start another task.
````

### 3.3 `.claude/commands/pv-next.md` → `/pv-next`

````markdown
---
description: Pick the next unblocked task and brief it
allowed-tools: Read
---
Read _meta/pv-state.json + docs/TASKS.md. List the 1–3 next unblocked tasks in
milestone order with est + Learn tags. Recommend exactly one, with a 3-line brief:
goal, files, AC. Remind me of The Deal if state notes show no DSA log today.
Do not implement anything.
````

### 3.4 `.claude/commands/pv-review.md` → `/pv-review`

````markdown
---
description: Full health pass — types, tests, build, canary, budgets, drift
allowed-tools: Read, Glob, Grep, Bash(npm *), Bash(npx *)
---
Run tsc --noEmit, npm test, npm run build, npm run canary. Then audit: stray hex
outside tokens.css (grep), "use client" files missing reason comments, any
forbidden Next feature (middleware/ISR/actions), React Flow leaking into /n/*
bundles (check build output). Report: green/red per check, top 3 issues with file
paths, and whether the current milestone's exit criteria are met.
````

### 3.5 `.claude/commands/pv-ship.md` → `/pv-ship`

````markdown
---
description: Pre-deploy checklist + commit/push guidance
allowed-tools: Read, Bash(git *), Bash(npm *)
---
Confirm: working tree reviewed (git status/diff summary), /pv-review green,
canary green, phone-check noted in state. Then produce the conventional commit
message(s) and the push command. If anything is red, refuse and list fixes.
Never push with a failing canary under any circumstances.
````

### 3.6 Boot sequence (one paste, ~3 minutes)

1. Repo → **private** (still the true step zero).
2. In VS Code, open `Interview-Practice`, start Claude Code, paste this whole document, and say: *"Create `site/CLAUDE.md`, the four `.claude/commands/pv-*.md` files, and `_meta/pv-state.json` exactly as specified in §3; also copy docs 06/07/08/10 from my Downloads into `site/docs/` as BUILD_PLAN.md, ARCHITECTURE.md, TASKS.md, REQUIREMENTS.md."*
3. Run `/pv-next` → it will point at **M0-T01**.
4. From then on, the loop is: `/pv-next` → `/pv-task <id>` → commit → (weekends only, DSA-first, Deal enforced).

*End. The plan is complete — the next website hour belongs to M0-T01, and only after today's two problems are logged.*
