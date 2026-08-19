# PrepVerse — Product Requirements Document (PRD) v1.0
### Every feature, its exact requirements, and which tasks implement it. The "what & why" that the backlog's "how & when" hangs from.

> **The trio, and reading order:** this doc (features/requirements) → `07_PREPVERSE_ARCHITECTURE.md` (technical decisions) → `08_PREPVERSE_TASKS.md` (execution backlog). Requirements carry **FR-x.y** ids; tasks cite them; commits reference them. That's full traceability: any line of code answers "which requirement, which task, which decision."

---

## 0. How to use this document as a prompt

**For Claude Code (one-time):** during the boot sequence (doc 08 §3.6), this file is copied to `site/docs/REQUIREMENTS.md`. From then on, `/pv-task` sessions cite the FR ids their task implements, and any ambiguity in a task is resolved by reading its FRs here — *not* by inventing behavior. If a requirement seems wrong or conflicting, the session must stop and propose an FR edit, never silently deviate (same change-control rule as the ADRs).

**For you:** this is the checklist of "what done means" per feature. When you wonder mid-build "wait, what exactly should missions do?" — the answer is F7, in eleven lines, with the tasks that build it.

**Priorities:** **P0** = the product doesn't exist without it (M0–M2) · **P1** = the product's actual point (M3–M5) · **P2** = quiet-week luxuries (M6).
**MVP** = end of M2 (read your real notes beautifully on the phone). **v1** = end of M5 (the full learn-navigate-review loop). Everything else is bonus.

**Out of scope for v1 (rejections are requirements too):** accounts/auth · any server or database service · cross-device sync beyond manual export/import · a CMS/editor · native apps · 3D/WebGL · sound-on-by-default · analytics · anything that costs money (NFR-1).

---

## 1. Product definition

PrepVerse renders the `Interview-Practice` markdown corpus as an explorable, comic-book-styled knowledge universe on a static, ₹0-cost, mobile-first website for 1–10 known users (primarily Onkar, on a phone, in stolen moments). It exists to make revision *narrative and spatial* instead of linear, to make memory decay *visible*, and to make the act of building it *count as interview preparation* (graph algorithms, React internals, TypeScript, design systems).

---

## 2. Feature catalog

### F1 · Content pipeline & validation — P0 · the "backend"
**Story:** as the author, I push markdown and the site rebuilds itself, refusing to ship anything structurally broken or private.
- FR-1.1 Build ingests **only** folders in `site.allowlist.json` (include-list semantics; absence = invisible).
- FR-1.2 Frontmatter parses against the zod contract (arch §5.1); missing fields on legacy files are derived (id from path, domain from folder, status `draft`) — never crash on old notes.
- FR-1.3 Build **fails** on: duplicate ids, `prereqs`/`related` referencing unknown ids, or any cycle in prereq edges — the cycle path is printed.
- FR-1.4 Build **warns** (report, not failure) on: unresolved body links, missing hook/level/videos.
- FR-1.5 Emits `graph.json` (light nodes + edges + per-domain status counts), `nodes/{id}.json` (rendered HTML, extracted sections, denormalized neighbors), and `MIGRATION_REPORT.md`.
- FR-1.6 Markdown renders with GFM, shiki-highlighted code, and section extraction by the H2 contract: `Interview Questions`, `Exercises`, `My Real-World Usage`.
- FR-1.7 Both relative `.md` links and `[[wikilinks]]` resolve to `/n/{id}` hrefs.
- FR-1.8 Full pipeline completes < 60 s locally on the current corpus.
**Acceptance:** real-repo run produces valid artifacts + honest domain×status stats table; planted cycle/dup/unknown-id fixtures each kill the build with a clear message.
**Tasks:** M1-T01…T10 · **Arch:** §5, §6, ADR-03/06.

### F2 · Node reading experience (the story template) — P0
**Story:** as a learner, opening a note feels like opening a comic issue, not a wiki page — tension first, concept second, my own war stories third.
- FR-2.1 Route `/n/[id]` is fully static HTML (server component; content visible in view-source; no React Flow in its bundle).
- FR-2.2 Page renders, in order and only when present: ColdOpen (hook, display type, misprint effect) → NoteBody (prose styles, 1.7 line-height, highlighted code) → FieldNotes (project badge: utec/ey/olay/vkonnect) → BossQuestions → TrainingBlock → VideoTheater → Cliffhanger.
- FR-2.3 BossQuestions v1: tap-to-reveal answers; keyboard operable; sane with zero questions.
- FR-2.4 VideoTheater: thumbnail facade only until tap (lite-youtube, nocookie domain); honors `ts` timestamp; title from frontmatter — **never** the YouTube Data API.
- FR-2.5 Cliffhanger lists `neighbors.unlocks` with *their* hooks — the "next issue" teaser is generated, not authored.
- FR-2.6 Every canvas-dependent destination has a static alternative: constellation **list view** works with JS disabled.
**Acceptance:** read the real event-loop note end-to-end on the phone, play the Codevolution embed at its timestamp, tab through questions by keyboard.
**Tasks:** M2-T01…T07 · **Arch:** §7.1–7.2.

### F3 · Universe map — P1
**Story:** as a learner, one glance at the sky tells me the true state of my preparation.
- FR-3.1 `/` renders ≤16 domain super-nodes with name + ProgressRing fed **only** by real `graph.json` status counts (the honest map: no cosmetic inflation, ever).
- FR-3.2 Tapping a domain navigates to its constellation via the dive transition (F5).
- FR-3.3 Domains with zero migrated frontmatter render in "not yet drawn" sketch state, linking to their list view.
**Acceptance:** DSA looks mostly sketch (truth), Node.js glows; ring numbers equal the build stats table exactly.
**Tasks:** M3-T06, M3-T08 · **Arch:** §7.2.

### F4 · Constellation map — P1
**Story:** as a learner, each domain is a readable web of nodes whose look tells me their state without labels.
- FR-4.1 ≤25 nodes per view, dagre-laid-out, no overlaps; pan/zoom gestures native to touch.
- FR-4.2 NodeCard renders by status via exhaustive discriminated union: `todo` sketch-outline · `draft` half-ink · `solid` full ink · `mastered` glow + gold pin · `due` glitch (F6).
- FR-4.3 Edges: prereq = solid crimson bezier with draw-in animation on mount; related = dashed cyan; cross-domain = PortalEdge with glitch-ring that jumps constellations and highlights the target.
- FR-4.4 SenseRing pulses on the last-visited node ("you are here").
- FR-4.5 Tap card → `/n/[id]`. Full keyboard reachability; aria-labels carry title + status.
**Acceptance:** side-by-side parity with the approved mock; 60 fps pan on the Poco; the Rutuja 😍 test.
**Tasks:** M3-T01…T05, T07, T08 · **Arch:** §7.2, ADR-05/07.

### F5 · Camera & zoom system — P1
**Story:** as a learner, moving through the universe feels like the film's camera — fluid glides between stepped, hand-drawn effects.
- FR-5.1 Pinch and wheel zoom, clamped 0.35–1.75; pan on drag.
- FR-5.2 Double-tap zooms one stop toward the tap point, animated (`--dur-camera` = 480 ms).
- FR-5.3 Controls cluster bottom-right (44 px targets, comic-styled): `+` / `−` / fit-view / "you are here" recenter — every action animated.
- FR-5.4 Canvas mount runs animated `fitView` (600 ms): the constellation settles into frame.
- FR-5.5 Universe→constellation **dive illusion**: zoom into the tapped super-node, navigate, mount tight, fit-view out — continuous both directions.
- FR-5.6 **Semantic zoom:** below zoom 0.5 cards render mini (chip + title, glitch reduced to static outline); above 0.6, full cards — hysteresis so nothing flaps at the boundary.
- FR-5.7 Mission mode camera-follows the active step (`setCenter`, ~500 ms).
- FR-5.8 `steps()` easing is **never** applied to camera motion; reduced-motion/motion-off collapses all camera durations to 0 while controls keep working.
**Acceptance:** pinching across the LOD threshold holds 60 fps with 25 nodes; dive feels continuous; motion:off = instant cuts, nothing broken.
**Tasks:** M3-T10, M3-T11 (+ M4-T03 follow) · **Arch:** §7.5.

### F6 · Review glitch (the signature) — P1
**Story:** as a learner, decaying memory is *visible*: nodes past review stutter between dimensions until I re-earn them.
- FR-6.1 A node whose `next_review` < today enters `due` state: RGB-split clone glitch on stepped keyframes (full-card LOD only).
- FR-6.2 Reduced-motion replaces animation with a static dashed cyan outline — due state stays *legible*, not just quieter.
- FR-6.3 TabBar's Review tab shows the due count badge.
- FR-6.4 The site **reads** `next_review` but never writes it: clearing a review (F9) un-glitches for the session and logs practice; canonical scheduling stays with `/prep-revise` in the repo. The review page states this in one line.
**Acceptance:** a genuinely-due node glitches; clearing it snaps it back with the THWIP moment; reload before the repo updates shows it due again — correctly.
**Tasks:** M3-T04, M5-T02, M5-T03 · **Arch:** ADR-04, §7.2.

### F7 · Mission mode (guided paths) — P1
**Story:** as a learner, I pick a target ("rocket science") and the system walks me through its physics first, in the right order, without imprisoning me.
- FR-7.1 `/mission/[domain]`: choose a target node or "full constellation".
- FR-7.2 Path = target's prereq ancestors (BFS) ordered by the domain's topological order; deterministic across runs.
- FR-7.3 PathRibbon shows ordered steps, current highlighted, progress %; state resumes from the store.
- FR-7.4 Unvisited prereqs are **soft-locked**: dimmed with an always-available "I know this — skip" that marks them visited. No hard locks anywhere.
- FR-7.5 Completing a mission awards XP and a BurstBadge moment.
**Acceptance:** a real 5-node Node.js path completes end-to-end on the phone with camera-follow; skip works; refresh resumes mid-mission.
**Tasks:** M4-T02, T03 (+ M1-T05 build-side order) · **Arch:** ADR-05/12, §7.2.

### F8 · Progress, XP & streaks — P1
**Story:** as a learner, honest numbers accumulate from real study actions and survive refreshes — never from farming.
- FR-8.1 Zustand store persisted to localStorage under a versioned envelope with mandatory `migrate` from v2 on (arch §5.3).
- FR-8.2 XP awards: first visit (node's xp by level), quiz correct, review cleared, mission complete; xp log capped at 500 entries; no double-award for repeat visits same day.
- FR-8.3 Streak increments at most once per day (Asia/Kolkata, date-only) on any study action; `best` tracked.
- FR-8.4 XpChip is live everywhere; XpToast on awards.
- FR-8.5 Visiting `/n/[id]` records `visit(id)` exactly once per mount; SenseRing and universe rings react without reload.
**Acceptance:** unit tests pass for streak rollover, award idempotency, log cap; wipe→import restores identical state.
**Tasks:** M4-T01, T04, T06 · **Arch:** §5.3, ADR-04/08.

### F9 · Learning loop (graded questions + review queue) — P1
**Story:** as a learner, the site quizzes me from my own notes and queues what's decaying.
- FR-9.1 BossQuestions v2: after reveal, self-grade ✓/✗ → `gradeQuiz`; per-node lifetime stats line.
- FR-9.2 `/review` lists due nodes oldest-first with due-age; "practice" opens that node's questions; empty state: "the web is quiet."
- FR-9.3 Finishing a practice run calls `clearReview` (session-local, per FR-6.4).
**Acceptance:** stats persist; queue count matches a manual graph.json check; the glitch-clear-THWIP loop *feels* right.
**Tasks:** M5-T01…T03 · **Arch:** §5.3.

### F10 · Settings & data portability — P1
**Story:** as the only user, I control motion, and my progress is mine to carry.
- FR-10.1 Motion: auto (respect OS) / on / off — governs glitch and camera (F5.8, F6.2).
- FR-10.2 Export downloads the full store as JSON; Import validates via zod against the versioned schema, rejecting garbage with a clear message. (This is the ₹0 cross-device sync; v2: commit the file.)
- FR-10.3 Reset ("burn this universe") with confirm.
**Acceptance:** export→wipe→import round-trips exactly; junk import rejected.
**Tasks:** M5-T04 · **Arch:** §5.3.

### F11 · Privacy system — P0 · cross-cutting, non-negotiable
**Story:** as someone whose repo already leaked once, nothing personal can *possibly* reach the published site.
- FR-11.1 Allowlist-only ingestion (FR-1.1); the never-list folders are hard-excluded in the Claude Code contract itself.
- FR-11.2 **Privacy canary** scans every text file in the final `out/` against `privacy.rules.json` (phone, email, ₹, LPA, CTC, Candidate ID); any hit prints context and exits 1 — the deploy dies.
- FR-11.3 Migrated/salvaged content carries zero company/person identifiers (enforced upstream by `/prep-salvage`), so allowlisted folders stay clean by construction.
- FR-11.4 Third-party surface = YouTube iframe (tap-only, nocookie) + Google Fonts (until self-host). Nothing else, ever, without an ADR edit.
**Acceptance:** seeding a fake phone number anywhere in output kills the build; removing it revives it.
**Tasks:** M0-T03, M1-T08 · **Arch:** §8, ADR-09.

### F12 · Shell, navigation & accessibility floor — P0
- FR-12.1 TabBar: Map · Mission · Review (badge) · Search; active states; safe-area padding; 44 px targets.
- FR-12.2 TopBar: wordmark with misprint effect + live XpChip.
- FR-12.3 A11y floor everywhere: visible `--charge` focus ring, WCAG-AA contrast on tokens, aria-labels on canvas nodes, list-view fallback per canvas, `prefers-reduced-motion` honored globally.
**Tasks:** M2-T05, T06 · **Arch:** §7.4.

### F13 · Search — P2 · FR-13.1 Pagefind static index over published notes; results deep-link to `/n/[id]`; zero server. **Tasks:** M6-T01.

### F14 · Offline / PWA — P2 · FR-14.1 Hand-written service worker: precache shell, cache-first `nodes/*.json` + fonts, network-first `graph.json`; installable manifest; self-hosted font subsets. Study on the bus with no signal. **Tasks:** M6-T02, T03.

### F15 · Design system — P0 · cross-cutting
- FR-15.1 All color/spacing/motion from `tokens.css` (doc 06 §7 palette verbatim); stray hex outside it is a defect.
- FR-15.2 Type roles: Bangers display-only, Inter body, JetBrains Mono code — never display type at paragraph length.
- FR-15.3 Motion grammar: effects stepped (`steps()`), camera fluid, and the total micro-interaction budget is the doc-06 list (edge draw-in, THWIP burst, gold pin, one completion splash) — additions require a design-section edit first.
**Tasks:** M0-T02, woven through M2/M3 · **Arch:** ADR-07.

---

## 3. Non-functional requirements

| ID | Requirement | Verified by |
|---|---|---|
| NFR-1 | **₹0/month forever**: no paid service, key, or card anywhere | Cost table arch §2; CLAUDE.md rule 1 |
| NFR-2 | Node pages ≤ 180 KB gz JS; React Flow only on canvas routes | Budget checks M2-T07, M3-T09 |
| NFR-3 | LCP < 2.5 s mid-Android/Fast-4G; 60 fps canvas at 25 nodes incl. pinch across LOD | Lighthouse + profiler in DoD |
| NFR-4 | A11y floor (FR-12.3) on every screen | DoD item, review command |
| NFR-5 | TS strict, no `any`; zod is the single schema source | `tsc`, tests |
| NFR-6 | Data honesty: every visual state derives from real content/store data | FR-3.1, FR-8.2 |
| NFR-7 | Privacy fail-closed: canary gates every deploy | FR-11.2 |
| NFR-8 | Host-portable static output (`out/` runs anywhere) | ADR-01/09 |

---

## 4. Traceability matrix (feature → tasks → architecture)

| Feature | P | Tasks | Arch anchors |
|---|---|---|---|
| F1 Pipeline | P0 | M1-T01…T10 | §5, §6, ADR-03/06 |
| F2 Node experience | P0 | M2-T01…T07 | §7.1–7.2 |
| F3 Universe | P1 | M3-T06, T08 | §7.2 |
| F4 Constellation | P1 | M3-T01…T05, T07, T08 | §7.2, ADR-05 |
| F5 Camera/zoom | P1 | M3-T10, T11; M4-T03 | §7.5 |
| F6 Glitch/review visual | P1 | M3-T04; M5-T02, T03 | ADR-04 |
| F7 Missions | P1 | M4-T02, T03; M1-T05 | ADR-05/12 |
| F8 Progress/XP | P1 | M4-T01, T04, T06 | §5.3 |
| F9 Learning loop | P1 | M5-T01…T03 | §5.3 |
| F10 Settings/portability | P1 | M5-T04 | §5.3 |
| F11 Privacy | P0 | M0-T03; M1-T08 | §8 |
| F12 Shell/a11y | P0 | M2-T05, T06 | §7.4 |
| F13 Search | P2 | M6-T01 | ADR-10 |
| F14 Offline/PWA | P2 | M6-T02, T03 | ADR-11 |
| F15 Design system | P0 | M0-T02 + M2/M3 | ADR-07 |

Coverage check: every M0–M5 task serves at least one FR; every P0/P1 FR has at least one task. (M5-T05 smoke test and M5-T06 resume bullet serve the *process*, not a feature — intentional.)

---

## 5. Change control

An FR is a promise. Changing behavior = edit this file first (own commit, one-line justification), then the task, then the code — identical to ADR rule zero. Claude Code sessions that find themselves "improving" behavior beyond the cited FRs must stop and propose the edit instead. Scope grows by decision, never by drift.

*End of PRD. Humans read 10 → 07 → 08; Claude Code loads all three by reference and works one task at a time.*
