# PrepVerse — Architecture Specification v1.0
### The technical source of truth. Claude Code reads this; humans argue with this; nobody re-decides silently.

> **Scope:** personal learning site, 1–10 users, ₹0/month hard budget, mobile-first.
> **Companions:** `06_PREPVERSE_BUILD_PLAN.md` (vision/design), `08_PREPVERSE_TASKS.md` (execution backlog + Claude Code setup).
> **Rule zero:** any change that contradicts an ADR below requires editing this file first, in its own commit, with a one-line justification. This is what keeps 50 Claude Code sessions coherent.

---

## 1. System context

```
┌─ AUTHOR (you) ────────────────┐        ┌─ READER (you + ≤9 friends) ─┐
│ VS Code / Obsidian / Claude   │        │ Phone browser (PWA later)    │
│ Code editing markdown +       │        │ Reads static site            │
│ frontmatter in the repo       │        │ Progress → localStorage      │
└──────────────┬────────────────┘        └──────────────▲──────────────┘
               │ git push                                │ HTTPS (CDN)
               ▼                                         │
   GitHub private repo: Interview-Practice               │
   ├── 01-JavaScript/ … 20-Redis-OpenSearch/  (content)  │
   └── site/                                  (this app) │
               │ webhook                                 │
               ▼                                         │
   Cloudflare Pages FREE build ──► build-content.ts ──► next build ──► privacy canary ──► deploy
   (500 builds/mo, 20-min timeout)      │
                                        └─ FAILS the deploy on: schema errors, unknown ids,
                                           prereq cycles, or any privacy-rule regex hit in dist/
```

There is **no runtime server, no database service, no auth, no third-party API with a key**. Everything dynamic happens either at build time (Node scripts) or in the browser (localStorage). This is a deliberate architecture, not a limitation — see ADR-02/03.

---

## 2. Cost budget (verified against current free tiers)

| Item | Provider / choice | Free-tier facts | Monthly cost |
|---|---|---|---|
| Code + content hosting | GitHub private repo | Unlimited private repos | ₹0 |
| Site hosting + CI | **Cloudflare Pages Free** | 500 builds/month, 20-min build timeout, up to 20,000 files/site, bandwidth & requests unlimited under fair use, builds directly from private GitHub repos, free `*.pages.dev` subdomain, free SSL | ₹0 |
| Alternative host | Vercel Hobby | Also fine (non-commercial personal use; ~100 GB/mo bandwidth — plenty). Pick ONE host; default = Cloudflare for unlimited bandwidth | ₹0 |
| Rejected host | GitHub Pages | Free Pages requires a **public** repo → conflicts with privacy. Rejected. | — |
| Fonts | Google Fonts → self-hosted woff2 subsets in M6 | Free either way; self-host needed for offline PWA | ₹0 |
| Video | YouTube embeds via lite-youtube facade (`youtube-nocookie.com`) | No API key, no quota. Metadata (title) stored manually in frontmatter — **never** use YouTube Data API (needs key/quota) | ₹0 |
| Search | Pagefind (OSS, build-time index) | ₹0 |
| All libraries | Next.js, @xyflow/react, dagre, zustand, zod, unified/remark/rehype, shiki, gray-matter, vitest — all MIT/OSS | ₹0 |
| Analytics / error tracking | **None.** It's your own site. | ₹0 |
| Domain | `prepverse.pages.dev` style subdomain | Custom domain = optional, out of scope (would cost money) | ₹0 |
| **Total** | | | **₹0** |

Budget math: ~10–20 pushes/week ≪ 500 builds/month; ~150 content pages + assets ≪ 20,000 files; a content+Next build of this size runs in 2–5 min ≪ 20-min timeout. Nothing in this document may introduce a service that asks for a card. If a task seems to need one, the task is wrong.

---

## 3. Architecture Decision Records

Format: options considered → decision → consequences. **Claude Code: do not re-litigate these; implement them.**

### ADR-01 · Rendering framework
- **A. Next.js App Router with `output: 'export'`** — full static HTML per route; Server Components render at build; he learns RSC/Suspense/`useTransition` (roadmap Phase-4 gaps); biggest ecosystem.
- B. Astro + React islands — best raw content-site performance, less JS shipped; but doesn't train the React gaps and adds a new mental model.
- C. Vite SPA — simplest; loses per-route static HTML, everything client-rendered.
- **Decision: A.** The learning payload breaks the tie.
- **Consequences — static-export constraint list (memorize):**
  - ✅ Allowed: Server Components (build-time), `generateStaticParams` for all dynamic routes, static Route Handlers (build-time GET), client components for anything interactive.
  - ❌ Forbidden: middleware, ISR/revalidate, `cookies()`/`headers()`/`draftMode`, Server Actions, API routes that read requests, default `next/image` optimization → set `images: { unoptimized: true }` (the site is nearly raster-free by design).
  - Any PR introducing a ❌ item must instead solve the problem at build time or in the client.

### ADR-02 · "Backend"
- **A. Build-time Node/TS scripts only** — all computation moves to the build; runtime is static files + browser.
- B. Supabase/Firebase free tier for auth + progress sync — rejected for v1: adds accounts, network dependency, free-tier idling/limits; zero value at n=1 writer.
- C. "GitHub as backend" — progress exported as JSON, committed manually. Accepted as the **v2 sync path** (see §6 store), still ₹0.
- **Decision: A now, C later. The word `server` appearing in any task is a scope alarm.**

### ADR-03 · Database
- **A. Markdown + frontmatter = write model; generated JSON = read models.** CQRS-flavored: humans/Claude Code write files in git; the build derives `graph.json`, `nodes/*.json`, search index. Git is the transaction log, PRs are migrations, `zod` is the schema enforcement.
- B. SQLite-in-browser (sql.js) — machinery without a query problem to solve. Rejected.
- C. Hosted DB — rejected (ADR-02).
- **Decision: A.** Consequence: the frontmatter contract (§5) is THE schema; breaking it = breaking prod.

### ADR-04 · Runtime persistence (client)
- **A. `localStorage` via Zustand `persist`, versioned envelope + `migrate`** — sufficient for progress/XP/settings at this scale.
- B. IndexedDB (via `idb`) — adopt **only** when quiz-history rows exceed ~500 or writes exceed 1/sec (they won't soon). Documented upgrade path, same store interface.
- **Decision: A, with B as a pre-approved upgrade.** Site **reads** `next_review` from content but **never writes** content — `/prep-revise` in Claude Code remains the single writer of canonical spaced-rep dates (one source of truth; site reviews are extra practice logged client-side only).

### ADR-05 · Graph canvas
- **A. `@xyflow/react` (React Flow v12)** — nodes are real React components (comic cards with buttons "just work"), pan/zoom/selection built in (d3-zoom), custom edges supported. DOM-based: right choice at ≤ ~150 nodes, and we render ≤ ~25 per view by design.
- B. Sigma.js / graphology (WebGL) — thousands of nodes, but nodes become sprites; the comic-card design dies. Rejected.
- C. Raw D3 + SVG — maximal control, maximal code. Rejected.
- D. Cytoscape.js — stylesheet model fights bespoke design. Rejected.
- **Decision: A.** Layout: **dagre** (rank-based, perfect for prerequisite DAGs) per constellation; ELK is the pre-approved swap if edge routing gets ugly; optional `d3-force` for ambient sway on the universe view only. React Flow bundles load **only** on canvas routes via `next/dynamic`.

### ADR-06 · Content pipeline
- **A. `gray-matter` + unified (`remark-parse → remark-gfm → custom plugins → rehype → stringify`) + `shiki` build-time syntax highlighting**, driven by a hand-written `build-content.ts`.
- B. Contentlayer — maintenance-risk dependency. Rejected.
- C. MDX everywhere — we don't need JSX inside notes; we need *section extraction*, solved by heading conventions. Rejected.
- **Decision: A.** Section extraction contract: within each note, the H2 headings `Interview Questions`, `Exercises`, `My Real-World Usage` (and Q/A as H3-or-bold pairs under the first) are parsed into structured fields; everything else is body. Links: resolve BOTH relative `.md` paths and `[[wikilinks]]` to node ids via a path→id map; unresolved links are build **warnings** listed in the report (not errors — his corpus predates the site).

### ADR-07 · Styling
- **A. Hand-rolled `tokens.css` (CSS custom properties) + CSS Modules per component**; Framer Motion imported for at most 2–3 orchestrated sequences (mission-path draw, constellation open).
- B. Tailwind — fine tool, but utility classes fight bespoke comic effects (halftone patterns, glitch keyframes, stepped easing), and hand-rolling trains the design-system skill.
- **Decision: A.** All colors/spacing/motion come from `tokens.css` (§7); hex values outside it are lint-hunted.

### ADR-08 · Client state
- **A. Zustand + `persist` middleware** — tiny, no boilerplate, selector-based renders; gives him the modern counterpoint to Redux he already knows (interview talking point).
- B. Redux Toolkit — he knows it; heavier than needed. C. Context+useReducer — prop-drilling risk in canvases.
- **Decision: A.** One store, sliced: `progress`, `xp`, `streak`, `missions`, `settings`.

### ADR-09 · Repo topology & deployment
- **A. Monorepo: `site/` folder inside `Interview-Practice`** — content read via `../` at build; atomic commits touch note + site together; one webhook; zero sync machinery. Cloudflare Pages: root dir `site`, build `npm run build`, output `site/out`.
- B. Two repos + a GitHub Action that rsyncs allowlisted content into the site repo — cleaner isolation, more moving parts. Pre-approved v2 if the repo gets heavy.
- C. Git submodule — private-submodule auth on CI is fiddly. Rejected.
- **Decision: A**, protected by the **privacy canary** (§8) because the build machine can see private folders even though the output must not.

### ADR-10 · Search — **Pagefind** (build-time static index, lazy WASM UI, scales past this corpus) over Fuse.js (would ship the full text index up front). M6.

### ADR-11 · Offline/PWA — **hand-written service worker** (precache shell; cache-first for `nodes/*.json` and fonts; network-first for `graph.json`) because writing cache-invalidation by hand is the learning goal; Serwist is the pre-approved escape hatch if it turns tedious. M6.

### ADR-12 · Validation & testing — **zod is the single schema source** (`contentSchema.ts` exports both the runtime validator and inferred TS types — parse, don't validate). **Vitest** for unit tests; the graph algorithms (cycle detection, topo sort, BFS ancestors) are the primary test targets with fixture graphs, because they're also his interview practice. One Playwright smoke test is pre-approved at M5, not before.

---

## 4. Repository layout (target state)

```
Interview-Practice/
├── 01-JavaScript/ … 20-Redis-OpenSearch/     # content (write model) — unchanged
├── .claude/commands/prep-*.md                # existing prep system — untouched
├── site/                                     # THE APP (everything below is new)
│   ├── CLAUDE.md                             # Claude Code contract for this folder (doc 08 §3)
│   ├── .claude/commands/pv-*.md              # pv task-runner commands (doc 08 §3)
│   ├── docs/ARCHITECTURE.md                  # = this file, copied in
│   ├── docs/TASKS.md                         # = doc 08 backlog, copied in
│   ├── _meta/pv-state.json                   # task progress state
│   ├── site.allowlist.json                   # THE privacy gate (include-list)
│   ├── privacy.rules.json                    # canary regexes
│   ├── next.config.mjs                       # output:'export', images unoptimized
│   ├── package.json  tsconfig.json  vitest.config.ts
│   ├── scripts/
│   │   ├── build-content.ts                  # pipeline entry (§6)
│   │   └── privacy-canary.ts                 # post-build dist scanner (§8)
│   ├── lib/
│   │   ├── content/ (schema.ts walk.ts links.ts render.ts sections.ts)
│   │   ├── graph/   (types.ts cycle.ts topo.ts bfs.ts layout.ts)   # isomorphic: build + client
│   │   └── store/   (store.ts migrate.ts types.ts)
│   ├── app/
│   │   ├── layout.tsx  globals.css  tokens.css
│   │   ├── page.tsx                          # universe map
│   │   ├── c/[domain]/page.tsx               # constellation (+ /list fallback)
│   │   ├── n/[id]/page.tsx                   # node (server component, static)
│   │   ├── mission/[domain]/page.tsx
│   │   ├── review/page.tsx  search/page.tsx  settings/page.tsx
│   ├── components/
│   │   ├── shell/  (TabBar TopBar XpChip)
│   │   ├── map/    (UniverseCanvas ConstellationCanvas NodeCard WebEdge PortalEdge GlitchLayer SenseRing ListView)
│   │   ├── node/   (ColdOpen NoteBody FieldNotes BossQuestions TrainingBlock VideoTheater Cliffhanger)
│   │   ├── mission/(PathRibbon SoftLockGate)
│   │   ├── review/ (ReviewQueue)
│   │   └── ui/     (BurstBadge XpToast ProgressRing)
│   └── public/data/                          # generated — gitignored
│       ├── graph.json  nodes/{id}.json  reports/MIGRATION_REPORT.md
```

---

## 5. Data schemas (the contract)

### 5.1 Frontmatter (write model) — `lib/content/schema.ts`

```ts
import { z } from "zod";

export const DOMAINS = ["javascript","typescript","nodejs","react","redux",
  "databases","system-design","dsa","agentic-ai","design-patterns","aws",
  "dsa-practice","cs-fundamentals","lld","distributed","redis-opensearch"] as const;

export const Frontmatter = z.object({
  id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  title: z.string().min(1).max(80),
  domain: z.enum(DOMAINS),
  level: z.enum(["beginner","intermediate","advanced","expert"]),
  status: z.enum(["todo","draft","solid","mastered"]).default("draft"),
  next_review: z.string().date().optional(),
  prereqs: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  hook: z.string().max(160).optional(),
  project: z.enum(["utec","ey","olay","vkonnect"]).optional(),
  videos: z.array(z.object({
    title: z.string(), yt: z.string().length(11), ts: z.number().int().min(0).default(0),
  })).default([]),
  xp: z.number().int().positive().optional(),   // default by level: 10/20/30/50
  tags: z.array(z.string()).default([]),
});
export type Frontmatter = z.infer<typeof Frontmatter>;
```

**Legacy tolerance (critical):** most of the ~100 existing files have partial or no frontmatter. The parser must not hard-fail them: derive `id` from the file path (slugified), `domain` from the folder map, default `status:"draft"`, and record every derivation/miss in `MIGRATION_REPORT.md`. **Errors** (fail build): duplicate ids · `prereqs`/`related` pointing at unknown ids · prereq cycles. **Warnings** (report only): missing hook/videos/level, unresolved body links.

Folder→domain map: `01→javascript 02→typescript 03→nodejs 04→react 05→redux 06→databases 07→system-design 08→dsa 09→agentic-ai 14→design-patterns 15→aws 16→dsa-practice 17→cs-fundamentals 18→lld 19→distributed 20→redis-opensearch`.

### 5.2 Read models (generated)

```ts
// public/data/graph.json — small; fetched once by canvases, imported at build by pages
type GraphDoc = {
  version: 1; generatedAt: string;
  domains: { id: string; name: string; folder: string;
             counts: Record<"todo"|"draft"|"solid"|"mastered", number> }[];
  nodes: { id: string; title: string; domain: string; level: string; status: string;
           review?: string; xp: number; hasHook: boolean; videoCount: number }[];
  edges: { from: string; to: string; type: "prereq"|"related" }[];
};

// public/data/nodes/{id}.json — one per node; consumed by the node page at build
type NodeDetail = {
  meta: Frontmatter;
  html: string;                       // sanitized rendered body (shiki-highlighted)
  sections: { hookHtml?: string; fieldNotesHtml?: string;
              questions: { qHtml: string; aHtml: string }[]; exercisesHtml?: string };
  neighbors: { prereqs: NodeRef[]; unlocks: NodeRef[]; related: NodeRef[] }; // denormalized
};
type NodeRef = { id: string; title: string; status: string; hook?: string };
```

### 5.3 Client store — `lib/store/types.ts` (Zustand persist key `pv-store`)

```ts
type PvStore = {
  v: 1;                                        // bump + migrate() on any breaking change
  progress: Record<string, { state: "unseen"|"visited"|"cleared";
    visitedAt?: string; clearedAt?: string;
    quiz: { attempts: number; correct: number; lastAt?: string } }>;
  xp: { total: number; log: { nodeId: string; delta: number; at: string;
        reason: "visit"|"quiz"|"review"|"mission" }[] };            // log capped at 500 entries
  streak: { current: number; best: number; lastActiveDate: string }; // date-only, Asia/Kolkata
  missions: Record<string, { targetId?: string; startedAt?: string; completedIds: string[] }>;
  settings: { motion: "auto"|"on"|"off"; sound: false; };
};
```
Rules: every write goes through store actions (no ad-hoc `setItem`); `migrate(old, v)` is mandatory from v2 on; **Settings page has Export/Import JSON** — the manual, free, cross-device sync (v2: commit that file to the repo).

### 5.4 `site.allowlist.json` & `privacy.rules.json`

```json
{ "include": ["01-JavaScript","02-TypeScript","03-NodeJS","04-React","05-Redux",
  "06-SQL-MySQL-MongoDB","07-System-Design","08-DSA","09-Agentic-AI",
  "14-Design-Patterns","15-AWS-Services","16-DSA-Practice","17-CS-Fundamentals",
  "18-LLD-Machine-Coding","19-Distributed-Systems","20-Redis-OpenSearch"] }
```
Not listed ⇒ invisible to the build. `10-Interview-Prep`, `11-AI-Risk-Assistant-Project` (EY client material), `12-Company`, `13-Salary-Negotiation`, `21-Mock-Interviews`, `TRACKING.md`, `*.pdf` must never be added without editing this ADR.

```json
{ "forbid": [
  "\\+91[\\s-]?\\d{5}",            "\\b\\d{1,2}(\\.\\d)?\\s?LPA\\b",
  "₹\\s?\\d",                      "[Cc]andidate\\s?ID",
  "onkarsawant87@gmail\\.com",     "\\bCTC\\b",
  "8805529687" ] }
```

---

## 6. Build pipeline spec — `scripts/build-content.ts`

Runs as npm `prebuild` (so `next build` is always fresh). Steps, in order; each step logs a one-line summary:

1. **Load** `site.allowlist.json`; walk included folders; collect `**/*.md` (skip `_CURRICULUM.md`? no — include; skip `README.md` per folder → treated as domain intro, stored on the domain object).
2. **Parse** each file: gray-matter → `Frontmatter.safeParse` with legacy-tolerance derivations (§5.1). Accumulate `issues[]`.
3. **Resolve links** in bodies: relative `.md` + `[[wikilink]]` → node ids via path map; unresolved → warning.
4. **Assemble graph**; **validate**: duplicate ids → ERROR; unknown `prereqs/related` → ERROR; **cycle detection over prereq edges (DFS three-color, print the cycle path)** → ERROR. *(You implement `lib/graph/cycle.ts` — it's shared with nothing yet but tested hard.)*
5. **Compute** per-domain **topological order** (`lib/graph/topo.ts`, Kahn's) — stored on the domain object; used as the default mission order.
6. **Render** bodies: remark/rehype pipeline, shiki highlighting, section extraction (§ADR-06), sanitize output HTML.
7. **Emit** `public/data/graph.json`, `public/data/nodes/*.json`, `public/data/reports/MIGRATION_REPORT.md` (files missing frontmatter fields, unresolved links, derived ids), plus a console stats block: nodes by domain × status — *this table is the honest map*.
8. `next build` (static export → `out/`).
9. **Privacy canary** `scripts/privacy-canary.ts`: scan every text file in `out/` against `privacy.rules.json`; any hit → print file+match context, **exit 1** (deploy dies). Also runnable standalone: `npm run canary`.

Failure policy: steps 4 and 9 fail the build; everything else degrades to warnings in the report. Target: full pipeline < 60 s locally, < 5 min on CF (limit: 20 min — huge headroom).

---

## 7. Frontend architecture

### 7.1 Routes

| Route | Type | Data source | Notes |
|---|---|---|---|
| `/` | client canvas island in static shell | `graph.json` (fetch once, module-cached) | Universe: ≤16 domain super-nodes, honest status fills |
| `/c/[domain]` | client canvas | `graph.json` filtered | Constellation: ≤25 nodes, dagre layout, portal edges |
| `/c/[domain]/list` | **server component** | graph at build | Plain list — a11y/no-JS fallback, also fast-path reading |
| `/n/[id]` | **server component** | `nodes/{id}.json` read via `fs` at build | Full comic template; only quiz + video are client islands |
| `/mission/[domain]` | client | graph.json + store | Topo path, soft locks, skip |
| `/review` | client | graph.json (review dates) + store | Due list = glitch queue |
| `/search` | client | Pagefind (M6) | Until M6: link to list views |
| `/settings` | client | store | Motion toggle, export/import progress |

All `[param]` routes enumerate via `generateStaticParams` from `graph.json`. React Flow loads via `next/dynamic({ ssr:false })` on the three canvas routes only.

### 7.2 Component responsibilities (one line each — Claude Code: build exactly these, invent none)

Shell: `TopBar` (wordmark misprint + XpChip) · `TabBar` (Map/Mission/Review/Search; Review shows due-count badge) ·
Map: `UniverseCanvas` (RF instance, domain nodes) · `ConstellationCanvas` (RF instance, node cards + edges) · `NodeCard` (custom RF node; renders by `status` discriminated union: todo=sketch, draft=half-ink, solid=ink, mastered=glow+pin, due=glitch) · `WebEdge` (bezier, crimson, dash-draw-in on mount) · `PortalEdge` (cyan dashed + glitch ring; tap = cross-domain jump) · `GlitchLayer` (the two offset clones + stepped keyframes; honors motion setting) · `SenseRing` (pulsing "you are here" on last-visited) · `ListView` ·
Node page: `ColdOpen` (hook, display type) · `NoteBody` (rendered html, prose styles) · `FieldNotes` (project badge) · `BossQuestions` (tap-to-reveal; self-grade ✓/✗ → store.quiz) · `TrainingBlock` · `VideoTheater` (lite-youtube facade, nocookie, timestamp deep-links) · `Cliffhanger` (next unlocks + their hooks) ·
Mission: `PathRibbon` (ordered steps, current highlighted) · `SoftLockGate` (dimmed + "I know this — skip") ·
Review: `ReviewQueue` ·
UI: `BurstBadge` ("Review due!" comic burst) · `XpToast` ("+30") · `ProgressRing` (domain % on universe nodes).

### 7.3 State boundaries
Server components own everything static (note HTML, neighbor lists). Client islands own: canvases, quiz, store-driven chrome (XpChip, badges). The store is the only client mutable state; canvas layout results are memoized per domain. Document each `"use client"` with a one-line reason — that discipline *is* the RSC lesson.

### 7.4 Budgets & quality floor (checked in every milestone's DoD)
- JS on `/n/[id]`: ≤ 180 KB gzipped (React Flow must not appear in its bundle).
- LCP < 2.5 s on a mid-range Android over Fast-4G throttling; canvas 60 fps at 25 nodes (memoized custom nodes; no inline object/function props into RF).
- Fonts: 2 families, subset, ≤ 60 KB total (M6 self-host).
- A11y: visible focus ring (`--charge`), 44 px tap targets, list fallback for every canvas, `prefers-reduced-motion` ⇒ glitch becomes static dashed outline (already specced), aria-labels on canvas nodes.
- Zero console errors; TypeScript `strict`; no `any` outside `*.d.ts`.

### 7.5 Camera & zoom system (universe + constellation canvases)

Zero new dependencies: React Flow's viewport API (`useReactFlow()` → `zoomIn/zoomOut/zoomTo/fitView/setCenter`, all accepting `{ duration }`) drives d3-zoom's interpolated transitions — smooth by construction, ₹0 by construction. Design intent: **effects are stepped (comic frames), the camera is fluid (the film's camera moves).** Never apply `steps()` easing to zoom.

| Interaction | Behavior |
|---|---|
| Pinch (mobile) / wheel+trackpad | Continuous zoom, clamped `minZoom 0.35` – `maxZoom 1.75`; pan on drag |
| Double-tap | Zoom in one stop toward the tap point, animated (`--dur-camera`) |
| Controls cluster (bottom-right, 44 px, comic-styled) | `+` / `−` (one stop, animated) · `⌖` fit-view · spider-glyph "you are here" → `setCenter` on last-visited node |
| Canvas mount | Animated `fitView({ duration: 600 })` after layout resolves — the constellation "settles into frame" |
| Domain dive (universe → constellation) | Tap super-node → `zoomTo` into it (~450 ms) → navigate; constellation mounts slightly tight then fit-views out — a cheap shared-element illusion, no extra machinery |
| Mission camera-follow | Advancing a `PathRibbon` step smooth-centers the active node (`setCenter`, ~500 ms) |

**Semantic zoom (LOD):** subscribe to viewport zoom (`useStore(s => s.transform[2])`); below the threshold `NodeCard` renders a **mini variant** (status-colored chip + title, no badges/pins, glitch reduced to a static outline), above it the full comic card. Threshold with **hysteresis** (mini < 0.5, full > 0.6) so cards don't flap at the boundary. This is both a design feature (universe legibility) and the performance strategy that keeps pinch at 60 fps.

**Motion tokens:** add `--dur-camera: 480ms` and `--dur-camera-fit: 600ms` to `tokens.css`; under `prefers-reduced-motion` (or motion:off) all camera durations collapse to 0 — controls still function, transitions become cuts.

---

## 8. Security & privacy model

**Threat #1 (the real one): accidental publication of private content.** Controls, in depth: (1) allowlist-only ingestion — privacy by construction; (2) `never` folders enumerated in ADR text so Claude Code refuses edits; (3) **privacy canary scans the final `out/`** — catches leaks via *any* path (a pasted salary line inside an allowed note, a bad link resolver, a future refactor); deploy fails closed; (4) repo private (separate, already-known issue: it is still public — flip it before the first site commit).
**Threat #2: third-party scripts.** Only YouTube's iframe (on tap, nocookie domain) and Google Fonts (until M6 self-host). No analytics, no CDNs beyond these, no trackers — enforced by convention + canary-adjacent grep for `<script src` in CI if ever needed.
**Threat #3: future public portfolio version.** Rule: curate a subset **in** (new, smaller allowlist), never filter secrets **out**.

---

## 9. Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| Scope creep eats DSA hours | **High** | The Deal (doc 06 §0): 6 h/wk cap, dessert rule, interview-week pause; ADR lock stops re-architecture loops |
| Frontmatter migration drags | High | Legacy tolerance + MIGRATION_REPORT; migrate files lazily (the day you study them), never as a big-bang task |
| Canvas perf on phone | Medium | ≤25 nodes/view, memoized cards, dynamic import, dagre precomputed per domain |
| Glitch harms accessibility/battery | Medium | motion setting (auto/on/off), reduced-motion static fallback, animation only on due nodes |
| Free-tier change | Low | Static `out/` is host-portable in minutes (Vercel/Netlify/any static host) |
| Motivation dip mid-build | Medium | Every milestone ships to the phone; "stop here is fine" markers at M2, M4 |

---

## 10. Glossary (so prompts stay short)
**Node** = one markdown note. **Constellation** = one domain's subgraph. **Universe** = domain-level overview. **Mission** = topo-ordered path to a target node. **Due** = `next_review` < today. **Canary** = post-build privacy scan. **Read model** = generated JSON. **The Deal** = doc 06 §0 time contract.

*End of architecture. Execution backlog + Claude Code operating layer → `08_PREPVERSE_TASKS.md`.*
