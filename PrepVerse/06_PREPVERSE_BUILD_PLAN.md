# PrepVerse — Build Plan
### Your repo as an interactive Spider-Verse knowledge universe · study on the go · learn by building

> **Working title:** PrepVerse (rename freely — WebSlinger, StudyVerse, Multiverse-of-Madness-but-for-Node.js).
> **One-line vision:** Your `Interview-Practice` markdown files rendered as an explorable spider-web of knowledge — comic-book art direction, story-driven learning paths where prerequisites unlock like chapters, embedded videos, and spaced repetition visualized as dimensional glitching.
> **Twin goal:** the *product* teaches you your prep; the *build* teaches you graph algorithms, React internals, TypeScript, and design — all four are on your gap list.

---

## 0. The Deal (read this first, it protects your job search)

This project sits in permanent tension with Phase 2 of your roadmap (the DSA solving engine). It is a fantastic idea **and** a perfectly disguised over-systematization trap. So it runs under contract:

1. **Track C budget: max 6 hrs/week, weekend-biased.** It never touches the first DSA hour of any day.
2. **The dessert rule.** Website time is *earned* by the day's 2 logged problems. Miss the weekly problem quota → PrepVerse pauses that week. No exceptions, including "but I was almost done with the glitch animation."
3. **Every phase ships something usable in one weekend.** No phase may end with "it'll be great once X." If a phase can't demo on your phone, it was scoped wrong.
4. **Interview week = full pause.** Encora L2 scheduled? PrepVerse doesn't exist that week.
5. **The build must double-count.** Each phase below lists exactly which roadmap gap it trains (topological sort, BFS, React concurrent features, TS schemas...). If a task trains nothing from your gap list and isn't needed to ship, it goes to the backlog.

If you honor the contract, this becomes three things at once: your mobile study tool, deliberate practice for real gaps, and the best "tell me about a side project" answer you'll ever have.

---

## 1. Translating your vision into named, buildable concepts

| What you said | What it's called | How it ships |
|---|---|---|
| "awesome spider web of my md files" | Interactive **knowledge graph** of a digital garden | Graph canvas (`@xyflow/react`) reading a `graph.json` built from your repo |
| "read it like a story, it should have meaning" | **Narrative-first node pages** + guided paths | Every note opens with a *cold-open hook* (the real-world failure the concept solves), ends with a cliffhanger to the next node |
| "before rocket science, learn physics" | **Prerequisite ordering** — topological sort of the dependency graph | "Start Mission" generates the learning order automatically; unvisited prereqs soft-lock a node |
| "Riot Games × Into the Spider-Verse" | **Comic-book design system**: halftone, chromatic aberration, glitch, bold ink | CSS-only recipes below — no heavy libraries needed |
| "directly playable YouTube videos" | **Curated video layer** per node | `videos:` frontmatter field + lite embed (loads on tap — critical for mobile data) |
| "study on the go" | **Mobile-first PWA** | Bottom-tab nav, touch pan/zoom, installable, offline notes (Phase W5) |
| "apply the knowledge in real life" | **Field Notes** section per node | Auto-pulled from the "My Real-World Usage" header — every concept tied to UTEC / EY / Olay / Vkonnect |
| "remember properly" | **Spaced repetition, visualized** | Nodes past their `next_review` date *glitch* like Miles between dimensions — the signature feature |

The critical architecture insight: **you already built the data model.** The linked-doc header standard from `03_MASTER_ROADMAP.md` (topic, level, status, prerequisites, related, next_review) *is* the graph schema. The site is just a renderer for it. Every file `/prep-link` upgrades makes the website richer with zero extra work — and every hook you write for the website makes your interview storytelling better. One source of truth, two consumers.

---

## 2. Architecture in one picture

```
Interview-Practice repo  (source of truth — markdown + frontmatter, edited via VS Code/Obsidian)
        │
        │  build script (Node/TS — you write this)
        │  1. read site.allowlist.json  → only public-safe folders
        │  2. parse frontmatter (gray-matter) → nodes
        │  3. prereqs/related fields      → edges
        │  4. VALIDATE: unknown ids fail the build; cycle detection fails the build
        │  5. emit graph.json + per-node HTML (remark/rehype pipeline)
        ▼
Next.js static site  ──►  deployed on Vercel/Cloudflare Pages (free tier, builds from PRIVATE repo)
        │
        ├── Universe map (constellations = your numbered folders)
        ├── Node pages (comic-panel story layout, videos, quizzes)
        ├── Mission mode (topo-sorted guided paths)
        └── Review tab (glitching due nodes; progress in localStorage)
```

No backend. No database. No CMS. No auth service. The repo is the CMS; git is the database; the site is a build artifact. This is what makes it finishable.

### Day-zero version (do this TODAY, 30 minutes, zero code)

Open the repo as an **Obsidian** vault: install Obsidian (desktop + Android), open the `Interview-Practice` folder as a vault, and you instantly get a spider-web graph view, backlinks, search, and mobile study — for free, before writing a line of code. In Settings → Files & Links → *Excluded files*, exclude `12-Company/`, `13-Salary-Negotiation/`, and the resume PDF from graph/search noise.

**Why this matters beyond convenience:** it's your product-validation step. Use it for one week. If graph-based wandering genuinely helps you study, the build is justified. If you find you never open the graph and just read files linearly — you've saved yourself 30 hours, and PrepVerse becomes a small portfolio demo instead of your daily tool. Also note **Quartz** (quartz.jzhao.xyz, now v5): a free static-site generator built exactly for Obsidian-style vaults, with graph view, wikilinks, and full-text search out of the box. It's the "I want a website this week with zero custom code" fallback — but it won't be Spider-Verse, and it teaches you nothing. Know it exists; build custom anyway *because the build is the point.*

---

## 3. Tech stack (decided, with reasons — stop re-deciding later)

| Layer | Choice | Why (for you specifically) |
|---|---|---|
| Framework | **Next.js (App Router, static export)** | You know React; RSC + Suspense + `useTransition` are literally Phase 4 gaps in your roadmap — this is where you learn them for real. Static export keeps hosting free and simple. |
| Language | **TypeScript, strict** | Typed frontmatter schemas + discriminated unions for node states = applied version of your TS katas. |
| Graph canvas | **`@xyflow/react` (React Flow v12)** | Nodes are real React components (so comic-card nodes with buttons/badges just work), pan/zoom/selection built in, d3-zoom under the hood. Layout via **dagre or ELK** per constellation. DOM-based, comfortably handles your ~100–150 nodes; don't hand it thousands. |
| Layout math | dagre/ELK for hierarchy; optional **d3-force** for the ambient "web sway" | This is where the physics lives — see §10. |
| Content pipeline | **gray-matter + remark/rehype** (unified) | Boring, stable, no framework lock-in. Avoid heavyweight content frameworks; a 100-line build script you fully understand beats a dependency you don't. |
| Animation | **CSS first** (keyframes, `steps()`, transforms); Motion/Framer Motion *only* for the 2–3 orchestrated moments | Spider-Verse's look is achievable in pure CSS; a motion library everywhere is how projects die at 60% done. |
| Video | **lite-youtube-embed** (or the React port) | Renders a thumbnail facade; the real iframe loads on tap. Full YouTube iframes eagerly loaded would murder mobile performance and data. Embed only — never download/rehost videos. |
| Search | **Pagefind or Fuse.js** (Phase W5) | Static, client-side, free. |
| State/progress | **localStorage** (XP, visited, quiz results) | Per-device is fine for v1. Cross-device sync is a backlog item, not a blocker. |
| Hosting | **Vercel or Cloudflare Pages, building from the private GitHub repo** | Both free tiers build from private repos. GitHub Pages is the wrong tool here (free Pages on private repos requires a paid plan — verify current terms if you go that route). |

**Explicitly rejected:** Three.js/WebGL universe (gorgeous, 3× the effort, worse on mobile — 2D done well beats 3D done halfway) · NestJS backend + MongoDB (you'll be tempted; there is no server-side problem here) · a custom markdown editor (Obsidian/VS Code already won) · native app (PWA covers "on the go").

---

## 4. Privacy & data architecture — the non-negotiable part

Your site's URL will be effectively public even if unlisted. Therefore the build script **allowlists**, never blocklists:

```json
// site.allowlist.json  — if a folder isn't here, it does not exist to the site
{
  "include": [
    "01-JavaScript", "02-TypeScript", "03-NodeJS", "04-React", "05-Redux",
    "06-SQL-MySQL-MongoDB", "07-System-Design", "08-DSA", "09-Agentic-AI",
    "14-Design-Patterns", "15-AWS-Services",
    "16-DSA-Practice", "17-CS-Fundamentals", "18-LLD-Machine-Coding",
    "19-Distributed-Systems", "20-Redis-OpenSearch"
  ],
  "never": [
    "12-Company", "13-Salary-Negotiation", "10-Interview-Prep",
    "11-AI-Risk-Assistant-Project", "21-Mock-Interviews", "TRACKING.md", "*.pdf"
  ]
}
```

Reasons for the `never` list: `12`/`13` are the files that were already leaking your CTC and pipeline; `10` holds STAR stories naming real companies and conflicts; `11` is EY client-project material (treat client details as confidential — sanitize heavily before any of it ever goes public); mock logs are your unvarnished weaknesses. If you later want a public portfolio version, you curate a *subset in*, never filter secrets *out*.

**Frontmatter schema** — extends the linked-doc standard (backward-compatible with all `/prep-*` commands):

```yaml
---
id: node-event-loop            # unique, stable, kebab-case
title: "The Event Loop"
domain: nodejs                  # → constellation
level: advanced                 # beginner|intermediate|advanced|expert
status: solid                   # todo|draft|solid|mastered  → visual state
next_review: 2026-08-31         # → glitch state when past due
prereqs: [js-promises, js-execution-context]
related: [node-streams, aws-lambda-cold-starts]
hook: "Why did one slow crypto call freeze every user of your API at once?"
project: utec                   # utec|ey|olay|vkonnect → Field Notes badge
videos:
  - title: "Codevolution — Event Loop visualized"
    yt: "L18RHG2DwwA"           # video id only; player deep-links via t= for timestamps
    ts: 0
xp: 30
---
```

**graph.json** the build emits:

```json
{
  "nodes": [{ "id": "node-event-loop", "title": "The Event Loop", "domain": "nodejs",
              "level": "advanced", "status": "solid", "review": "2026-08-31", "xp": 30 }],
  "edges": [{ "from": "js-promises", "to": "node-event-loop", "type": "prereq" },
            { "from": "node-event-loop", "to": "node-streams", "type": "related" }]
}
```

**Build-time validation (fail loudly):** every `prereqs`/`related` id must exist; the prereq graph must be acyclic — you implement **cycle detection with DFS coloring** yourself and print the offending cycle path. Congratulations: that's a real graph interview problem, running in production, in your project. Same for the path generator (**topological sort**, Kahn's or DFS) in Phase W3.

---

## 5. Information architecture

```
Universe map  ─ tap ─►  Constellation  ─ tap ─►  Node page  ─ "Start Mission" ─►  Guided path
(all domains as         (one domain's web,       (the story panel)               (topo-sorted
 galaxy clusters,        laid out, readable)                                      sequence)
 zoomed out)
Bottom tabs (mobile):  🕸 Map   ·   🎯 Mission   ·   ⚡ Review   ·   🔍 Search
```

**Constellations map to your real folders** — and here's the honest part: their initial visual state comes from your actual readiness analysis. Node.js glows (your event-loop file is genuinely excellent). The DSA constellation renders mostly as grayscale sketch outlines, because that's what the gap analysis found. **The map doesn't flatter you — it *is* your readiness matrix**, and watching it ink itself in over 12 weeks is the core motivation loop. Nothing motivates like an honest map filling with color.

**Do not render all ~120 nodes in one force-directed hairball.** One giant hairball is the classic knowledge-graph mistake: unreadable, slow on mobile, pedagogically useless (Obsidian's own graph proves this at scale). Universe view shows ~13 constellation super-nodes; tapping one loads only that domain's 8–20 nodes with a proper layout. Cross-domain edges (e.g., `node-event-loop → aws-lambda-cold-starts`) render as portal edges — a small glitch-ring you tap to jump universes. On-theme *and* a performance feature.

---

## 6. The story engine (this is what makes it "not just reading")

**Node page anatomy — every note renders through this comic template:**

1. **COLD OPEN** (the hook) — a real failure, ideally yours: *"UTEC search took 2 seconds. Sales demos were dying in the silence. Here's what was actually happening inside MySQL..."* One or two panels, big type.
2. **THE CONCEPT** — your existing markdown body, restyled into panels. No rewriting.
3. **FIELD NOTES** — the "My Real-World Usage" section, badged with the project (UTEC/EY/Olay/Vkonnect). This is your interview story, rehearsed every time you study.
4. **BOSS QUESTIONS** — the file's Interview Questions section as tap-to-reveal cards. (Phase W4 turns these into scored quizzes.)
5. **TRAINING** — the Exercises section: "now go implement it."
6. **THE THEATER** — curated videos, tap to play, timestamp deep-links.
7. **CLIFFHANGER** — "Next issue: *what happens when the event loop meets 10,000 open sockets?* → Streams & Backpressure." Auto-generated from the graph's outgoing edges + the target's `hook`.

**Why hooks work:** problem-first sequencing (assignment before explanation, tension before resolution) is one of the most robust findings in learning science — the story isn't decoration, it's the encoding mechanism. Which is exactly what you intuited with the rocket-science example.

**Hook debt is allowed.** Write hooks for **10 pilot nodes only** (the Node.js constellation). Every other node falls back to its first paragraph until *the day you study it* — that day, writing its hook *is* part of studying it. Trying to storify 120 nodes upfront is procrastination cosplaying as content strategy.

**Mission mode ("rocket science needs physics"):** pick any target node → BFS back through `prereqs` → topological sort → an ordered path renders as a web-swing route on the map. Prereq nodes you haven't visited show as **soft-locked** (dimmed, with "I already know this — skip" always available). Hard locks punish experts; soft locks guide beginners. You're both, depending on the constellation.

---

## 7. Design system — Spider-Verse × Riot, in tokens

Design direction is pinned by your brief, so execute it precisely — the risk to avoid isn't blandness, it's *incoherent maximalism*. Spend the boldness in one place (see the signature), keep everything else disciplined.

**Palette (dark, ink-first, Miles Morales energy):**

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0B0B16` | Background — deep ink navy, not pure black |
| `--panel` | `#141426` | Cards/panels |
| `--web` | `#E9E4D8` | Primary text + web-line strokes (warm paper white) |
| `--spider` | `#E62429` | Primary accent — Spider crimson (prereq edges, CTAs) |
| `--dimension` | `#00E5FF` | Electric cyan — related edges, links, glitch channel A |
| `--charge` | `#FFE800` | Graffiti yellow — XP, streaks, "you are here" |
| `--venom` | `#B14CFF` | Purple — advanced/expert badges, glitch channel B |

**Type (three roles, used with restraint):**
- Display: **Bangers** (Google Fonts) — headers, hooks, onomatopoeia only. Never body text; comic display fonts at paragraph length are unreadable.
- Body: **Inter** — generous line-height (1.7); you'll read this on a phone in traffic on the way to Rutuja's.
- Code/data: **JetBrains Mono** — code blocks, stats, complexity badges.

**Node visual states (the map speaks without labels):**

| `status` / condition | Look |
|---|---|
| missing / `todo` | Grayscale pencil-sketch outline, low opacity — "not yet drawn into existence" |
| `draft` | Half-inked: outline solid, fill 40% |
| `solid` | Full color, clean ink |
| `mastered` | Subtle glow + gold web-anchor pin |
| **past `next_review`** | **GLITCHING** (the signature — below) |
| current position | Pulsing spider-sense ring in `--charge` |

**The signature element — memory decay as dimensional glitch.** In Spider-Verse, Miles glitches when he's in the wrong universe; in your head, a memory glitches when it's decaying. Same visual, same meaning. A node past its `next_review` date stutters with RGB-split displacement until you clear its review — then it snaps back into full ink with a satisfying *THWIP*. This one idea carries the whole aesthetic; everything else stays quiet so it can.

**CSS recipes (no libraries needed):**

```css
/* Halftone (Ben-Day dots) — overlay on panels & hero areas */
.halftone::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background-image: radial-gradient(circle, rgb(233 228 216 / .07) 1px, transparent 1.6px);
  background-size: 7px 7px;
}

/* Chromatic aberration (CMYK misregistration) — headers, hover states */
.misprint { text-shadow: 2px 0 0 var(--dimension), -2px 0 0 var(--spider); }

/* The glitch — review-due nodes */
@keyframes glitch {
  0%, 86%, 100% { transform: none; clip-path: none; filter: none; }
  88% { transform: translate(-2px, 1px); clip-path: inset(12% 0 58% 0);
        filter: drop-shadow(2px 0 var(--dimension)) drop-shadow(-2px 0 var(--venom)); }
  92% { transform: translate(2px, -1px); clip-path: inset(60% 0 8% 0); }
  95% { transform: translate(-1px, 0);  clip-path: inset(30% 0 30% 0); }
}
.node--due { animation: glitch 3.2s steps(1, end) infinite; }

/* "Animated on twos" — Spider-Verse's hand-drawn frame feel for any motion */
.frame-stepped { animation-timing-function: steps(12); }

/* Non-negotiable */
@media (prefers-reduced-motion: reduce) {
  .node--due { animation: none; outline: 2px dashed var(--dimension); } /* still signals due */
  * { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
```

**Micro-interactions (pick these, skip the rest):** edges draw in like web-shots (SVG `stroke-dashoffset` animation) when a constellation opens · correct quiz answer stamps a **THWIP!** burst in Bangers · mastering a node pins it with a gold web anchor · constellation-complete gets one full-screen halftone splash. That's the whole motion budget. Every additional scattered effect makes it look more AI-generated, not more Spider-Verse.

**Riot's contribution** is not visual — it's *progression design*: XP per node, streak counter, constellation completion percentages, rank names if you want them (Rookie → Web-Head → Spider-Sense → Multiverse-Class). Keep numbers honest: XP mirrors `status` changes and cleared reviews, which are driven by real study in `/prep-daily` — the site never becomes a place to farm fake progress.

**Accessibility floor (quality without announcing it):** WCAG-AA contrast on `--web`/`--ink` (comfortably passes), visible keyboard focus rings in `--charge`, reduced-motion handled above, tap targets ≥ 44px, and the graph always has a plain **list-view fallback** — which is also your no-JS/SEO view.

---

## 8. Phased build plan (each phase = one weekend, shippable, mapped to your gaps)

### W0 — TODAY (30–60 min, zero code)
Obsidian vault + mobile app + excluded files → instant graph study tool. Create `site.allowlist.json` in the repo. Add `hook`, `videos`, `xp` to the frontmatter template in `CLAUDE.md` so `/prep-link` starts adding them.
**Validation gate:** use Obsidian graph for one week of real study before W1. *Trains: nothing — that's the point. It's free.*

### W1 — The vertical slice (6–8 hrs)
Next.js + TS init → build script (allowlist → gray-matter → validate ids → `graph.json`) → React Flow canvas for **the Node.js constellation only** (dagre layout) → tap node → rendered markdown page → one working video embed (Codevolution event loop) → deployed to Vercel from the private repo.
**Definition of done:** on your phone, open the URL, tap "The Event Loop," read your own note, play the video. Ugly is fine. Deployed beats beautiful.
*Trains: TS schema modeling, unified/remark pipeline, Next.js App Router + static export.*

### W2 — Make it Spider-Verse (4–6 hrs)
Design tokens → comic node card component (status states) → halftone + misprint classes → web-line custom edges with draw-in → universe map with 13 constellation super-nodes → mobile bottom tabs → list-view fallback.
**DoD:** a screenshot you'd proudly post. Send it to Rutuja; if the reaction is "😍" not "ok nice," W2 passed.
*Trains: design systems, CSS architecture, custom React Flow nodes/edges, responsive layout.*

### W3 — Story & Missions (4–6 hrs)
You implement: **cycle detection** (build-time) + **topological sort** + **BFS ancestor collection** for path generation → Mission mode UI (web-swing route, soft locks, skip) → localStorage progress + XP → cold-open hooks written for the 10 Node.js pilot nodes → cliffhanger footers from graph edges.
**DoD:** complete a 5-node guided path end-to-end on your phone, XP persists after refresh.
*Trains: THE graph algorithms from your DSA gap list — implemented for a real user (you), which is how they stick.*

### W4 — The learning loop (4–6 hrs)
Quiz component parsing Boss Questions (tap-to-reveal → self-graded, or MCQ where the file provides options) → **glitch state** wired to `next_review` → Review tab listing all glitching nodes → clearing a review snaps the node back + logs to localStorage.
**Rule that prevents a mess:** the site *reads* `next_review` but never writes it — `/prep-revise` in Claude Code stays the single writer of truth. Site reviews are extra reps, not the canonical schedule. Two spaced-rep systems fighting over dates is a bug factory.
**DoD:** something glitches, you clear it, it THWIPs back. You feel it.
*Trains: state machines (discriminated unions!), date logic, component composition; `useTransition` for filtering the map is your Phase-4 React rep.*

### W5+ — Backlog (only in quiet pipeline weeks, strictly optional)
Pagefind search · PWA + offline note caching (service workers = cache-invalidation, a distributed-systems appetizer) · spider-sense "related node" hints · shareable constellation cards · sound design (off by default, always) · a curated **public portfolio subset** with a proper landing page · cross-device progress via a committed `progress.json`.

---

## 9. What NOT to do (the anti-plan — equal weight to the plan)

1. **Don't build a CMS or editor.** Markdown in git, edited in VS Code/Obsidian, is the editor. Forever.
2. **Don't render one giant hairball.** Constellations or nothing.
3. **Don't pipe the whole repo to the site.** Allowlist-only. `12-Company`, `13-Salary`, STAR stories, EY project detail, mock logs: never.
4. **Don't hand-position 120 nodes.** Layout algorithms position; you may pin a hero node or two per constellation, max.
5. **Don't add a backend.** No NestJS, no Mongo, no auth. The moment you type `nest new`, close the laptop.
6. **Don't gold-plate before the pipeline works.** W1 ships ugly. Beauty is W2's job.
7. **Don't write "website content."** The site renders repo files; content gaps are fixed by `/prep-curriculum`, not by writing copy for the site.
8. **Don't hard-lock prerequisites.** Soft locks + skip. You're senior; the site is a guide, not a warden.
9. **Don't let it eat DSA hours.** Dessert rule. The website is the reward for the reps, never the substitute.
10. **Don't build a second spaced-rep source of truth.** Site reads `next_review`; `/prep-revise` writes it.
11. **Don't eager-load YouTube iframes** (facade pattern) and **don't download/rehost videos** (performance and copyright, respectively).
12. **Don't chase cross-device sync, accounts, or multiplayer in v1.** localStorage. Ship.
13. **Don't storify everything upfront.** 10 pilot hooks; the rest are written the day each node gets studied.
14. **Don't 3D it.** The Spider-Verse look is a *print* aesthetic — flat ink, halftone, misregistration. WebGL adds weeks and subtracts frame rate on your phone.

---

## 10. The learning-while-building map (your "improve myself too" requirement, made explicit)

| You build | You actually learn | Roadmap link |
|---|---|---|
| Build-time cycle detection | DFS, graph coloring, why cycles break topo sort | 08-DSA graphs ❌ → ✅ |
| Mission path generator | Topological sort (Kahn's + DFS variants), BFS | The exact graph gaps in your matrix |
| Optional "web sway" on the map | **d3-force**: spring force (Hooke, F = −kx), many-body repulsion (Coulomb-style), velocity Verlet integration — the "maths behind it" you asked for | Your physics/maths wish, applied |
| Web-line edges | Cubic Bézier curves, SVG path math, dash-offset animation | Genuinely useful canvas/SVG skill |
| Node cards + states | TS discriminated unions, exhaustive switches, typed schemas | 02-TypeScript katas, for real |
| Map filtering, constellation loads | `useTransition`, `Suspense`, memoization at 100+ components, why Fiber schedules the way it does | Phase 4 React gaps |
| Build script + static export | Content pipelines, caching, build-vs-runtime thinking | System-design instinct |
| PWA offline (W5) | Service workers, cache invalidation strategies | Distributed-systems-lite |
| The whole thing | Design systems, storytelling, scope discipline | Interview communication + the portfolio story |

**The portfolio payoff (write this bullet only when it's true, ~W4):**
*"Built PrepVerse — an interactive knowledge-graph learning platform rendering 100+ interlinked markdown notes as an explorable comic-book universe; implemented topological-sort learning paths, DFS cycle validation at build time, and a spaced-repetition layer; Next.js static export, React Flow, strict TypeScript; 60fps on mobile."*
Then record a 90-second phone demo. For "tell me about a side project," a senior candidate demoing graph algorithms inside a product he designed, built, and actually uses daily is a different league from "I made a todo app with auth."

---

## 11. Success metrics (review at each Sunday exit review)

- **The only metric that matters:** weekly DSA problem quota still met every single week PrepVerse was worked on. If this ever fails, see rule 2.
- By end of W1: site opens on your phone with your real content. By W3: you've studied on it (not just built it) ≥3 sessions/week. By W4: one full review session cleared via glitch → THWIP.
- Map honesty check: constellation colors still driven only by real `status`/review data — no cosmetic promotions.
- By W4: portfolio bullet is true; demo video recorded.

## 12. Kickoff checklist (in order)

- [ ] Repo → **private** (still public as of today — this precedes everything)
- [ ] Obsidian vault + mobile app; excluded-files set (30 min)
- [ ] `site.allowlist.json` committed; frontmatter template in `CLAUDE.md` extended with `hook`/`videos`/`xp`
- [ ] One week of Obsidian-based study → validation gate passed?
- [ ] W1 weekend scheduled on a week with no interviews
- [ ] First build session: repo scaffold + build script + one rendered node

---

*Companion docs: `03_MASTER_ROADMAP.md` (the graph data this site renders) · `04_WEEKLY_PLANS.md` (the hours this must not steal) · `05_CLAUDE_CODE_PROMPT_SYSTEM.md` (the commands that keep enriching the content the site displays).*
