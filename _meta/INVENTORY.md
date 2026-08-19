# Repository Inventory

Structural audit only — no content-quality judgments here (that's `/prep-analyze`). Generated 2026-08-19.

## Tree

```
Interview-Practice/
├── 01-JavaScript/              8 files · 19,890w  Closures, promises, polyfills, patterns, puzzles+answers, MNC Qs
│   └── Practice/                2 code files       Scratch JS (1.js, debounce-throttle.js)
├── 02-TypeScript/               7 files ·  5,525w  Generics, utility types, narrowing, interfaces, async, MNC Qs
│   └── Practice/                1 code file        Test.ts scratch
├── 03-NodeJS/                   6 files ·  7,291w  Event loop, async patterns, streams, errors, Express, MNC Qs
├── 04-React/                    6 files ·  7,140w  Hooks, rendering, memoization, state mgmt, patterns, MNC Qs
├── 05-Redux/                    3 files ·  3,401w  RTK fundamentals, RTK Query, MNC Qs
├── 06-SQL-MySQL-MongoDB/        5 files ·  6,599w  Joins/indexing, transactions, Mongo, EXPLAIN tuning, MNC Qs
├── 07-System-Design/           13 files · 30,221w  Core 4 files + in-depth/ 8-file HLD series — largest, strongest section
├── 08-DSA/                     11 files · 11,449w  10 patterns + MNC Qs — thinner than it looks (see Misfiled)
├── 09-Agentic-AI/               3 files ·  4,317w  Agents/tools/RAG, frameworks, MNC Qs
├── 10-Interview-Prep/           1 file  ·  1,480w  Behavioral stories
├── 11-AI-Risk-Assistant-Project/1 file  ·  1,443w  README only, no code — EY project writeup
├── 12-Company/                 23 files · 205,381w Per-company prep — 37%+ of the entire repo's word count
├── 13-Salary-Negotiation/       1 file  ·  5,833w  Negotiation playbook
├── 14-Design-Patterns/          9 files ·  2,196w  SOLID/DRY/KISS/YAGNI, factory, singleton — early-stage (see todo.md)
├── 15-AWS-Services/            10 files ·  9,419w  9 service-area notes + cheatsheet
├── design-patterns/             9 files ·  2,196w  🔴 BYTE-IDENTICAL duplicate of 14-Design-Patterns/
├── _meta/                       6 files · 11,144w+ Prep-system outputs; imported/ = baseline analysis (01–05)
├── .claude/commands/            11 files·  2,253w  The 11 /prep-* slash commands
├── CLAUDE.md, README.md, TRACKING.md              Root context/hub/tracker
└── OnkarSawant-FullStack-Developer-5+Years.pdf     🔴 Resume PDF, tracked in git
```

## Stats table

| Folder | Files | Words | Notes |
|---|---|---|---|
| 12-Company | 23 | 205,381 | By far the largest folder; per-file size ranges 5,835w (infosys) → 22,819w (recro-cheq) |
| 07-System-Design | 13 | 30,221 | Includes the 8-file `in-depth/` HLD series (4,885 lines) |
| 01-JavaScript | 8 | 19,890 | `05-answers.md` (6,541w) + `05-tricky-output-puzzles.md` (5,407w) are two-thirds of this folder alone |
| 08-DSA | 11 | 11,449 | Pattern notes only — no solved-problem log exists yet (16-DSA-Practice/ not created) |
| _meta | 6 | 11,144+ | `imported/01_REPOSITORY_ANALYSIS.md` (3,112w) is the largest baseline doc |
| 15-AWS-Services | 10 | 9,419 | |
| 03-NodeJS | 6 | 7,291 | Flagship domain per baseline analysis — importance Critical |
| 04-React | 6 | 7,140 | |
| 06-SQL-MySQL-MongoDB | 5 | 6,599 | |
| 13-Salary-Negotiation | 1 | 5,833 | 🔴 Tracked in git — see Privacy flags |
| 02-TypeScript | 7 | 5,525 | |
| 09-Agentic-AI | 3 | 4,317 | |
| 05-Redux | 3 | 3,401 | |
| design-patterns | 9 | 2,196 | 🔴 Exact duplicate of 14-Design-Patterns — delete |
| 14-Design-Patterns | 9 | 2,196 | Still has an open `todo.md` |
| 11-AI-Risk-Assistant-Project | 1 | 1,443 | README-only, no code |
| 10-Interview-Prep | 1 | 1,480 | Single behavioral-stories file |

No empty or near-empty (<30 words) markdown files found.

## Duplicates

| # | Items | Evidence | Action |
|---|---|---|---|
| 1 | `design-patterns/` ≡ `14-Design-Patterns/` | `diff -rq` → **identical**, all 9 file pairs byte-for-byte, confirmed by matching word counts | Delete `design-patterns/` (root copy) |
| 2 | `07-System-Design/in-depth/01-system-design-interview-prep.md` (6,980w / 704 lines) vs. `in-depth/` files 01–08 | Same topic ground as the other 8 in-depth files combined (4,885 lines across them); not re-diffed line-by-line here — confirm scope in `/prep-analyze` before converting | Likely convert to a linked index (verify first) |
| 3 | `01-JavaScript/02-advanced-senior-level.md` (LRU Cache, ~line 8+) vs. System-Design "classic problems" (LRU/Trie/URL-shortener territory) | Grep confirms LRU Cache section in `01-JavaScript/02` | Move to `16-DSA-Practice/` as machine-coding exercise |
| 4 | `12-Company/{healthsystems,setu-health,teksystems-hsbc}/questions.json` — all exactly 407 lines | Diffed pairwise: **all three differ** (per-company content, not a duplicate) — flagged only because the identical line count looked suspicious | No action; false alarm, same template different content |

## Misfiled content

| Content | Currently in | Should be in | Evidence |
|---|---|---|---|
| Kadane's, Floyd's cycle, binary-search variants, prefix sum, monotonic stack, backtracking template | `01-JavaScript/03-pattern-based-must-know.md` (2,260w) | `08-DSA/` (split into pattern files) | Pure DSA content — this is why 08-DSA "looks thinner than it is" per baseline analysis |
| LRU Cache (doubly-linked-list + hashmap) | `01-JavaScript/02-advanced-senior-level.md` | `16-DSA-Practice/` (machine-coding exercise) | Confirmed via grep — LRU section present |
| React Testing Library / Jest examples (`render`, `screen`, `fireEvent`, `@testing-library/react`) | `12-Company/citiustech-L1-interview-prep.md` (lines ~886–930+) | `04-React/08-testing.md` (new file) | Confirmed via grep |
| Company-specific negotiation numbers | `13-Salary-Negotiation/salary-negotiation-mastery.md` | Stays, but should not be git-tracked (see Privacy) | — |

## Markers (TODO/FIXME/WIP)

Only one actionable code marker found; everything else below was a false positive from the word "todo" appearing as a variable name (React/Redux Todo-list examples) or as a literal filename (`todo.md`):

- `12-Company/recro-cheq-nodejs-prep.md:2615` — `// TODO zod-validate enum` (real, actionable)
- `14-Design-Patterns/todo.md` and `design-patterns/todo.md` — study-order checklists, not markers (duplicate pair, see above)
- `12-Company/capgemini-L2-interview-prep.md:14,87` — "TODO Preparation Checklist" is a section title, not a marker

## Privacy flags

Paths and labels only — values themselves are not reproduced here.

| Path | Flag | Tracked in git? |
|---|---|---|
| `OnkarSawant-FullStack-Developer-5+Years.pdf` | Resume PDF at repo root | 🔴 **Yes** — `git ls-files` confirms it's tracked |
| `13-Salary-Negotiation/salary-negotiation-mastery.md` | Personal negotiation playbook/figures | 🔴 **Yes** (not in untracked list) |
| `12-Company/recro-cheq-nodejs-prep.md:1557` | Phone-number-shaped pattern | Yes (file is untracked, but staged for commit eventually) |
| `12-Company/infosys-L2-interview-prep.md:4,39` | "candidate/applicant ID"-shaped text | Yes (untracked) |
| ~15 files across `06-SQL-MySQL-MongoDB/`, `12-Company/*` | ₹ / LPA / "salary" token hits | Mixed — mostly false positives (SQL salary-column examples in `06-SQL-MySQL-MongoDB/01,05`); the `12-Company/*` hits need a manual look |
| 21 files repo-wide | Email-address-shaped strings | Mostly placeholder/example addresses in code snippets (`user@example.com`-style) — spot-check `12-Company/*` hits specifically |

**Note:** `.gitignore` currently only excludes OS/editor/Node/`*.log` files — nothing scrubs PDFs or the salary-negotiation file. If this repo was ever pushed public before today, treat every one of the above as already exposed.

## Uncommitted-vs-GitHub delta

Last commit: `02987bf` — 2026-06-08 ("added-redme-file"). Everything below is local-only, ~10.5 weeks of drift:

```
 M 01-JavaScript/Practice/1.js
?? .claude/                                    (new — the 12 /prep-* command files + CLAUDE.md)
?? 01-JavaScript/Practice/debounce-throttle.js
?? 02-TypeScript/Practice/
?? 12-Company/EY-HDFC-Ergo-Apigee/
?? 12-Company/HCLTech_MERN_Interview_Prep.md
?? 12-Company/INDEX.md
?? 12-Company/bolttech-multivision-interview-prep.md
?? 12-Company/coforge-tech-lead/
?? 12-Company/guardian-india/
?? 12-Company/healthsystems/
?? 12-Company/metron-security-doselect-prep.md
?? 12-Company/recro-cheq-nodejs-prep.md
?? 12-Company/setu-health/
?? 12-Company/teksystems-hsbc/
?? CLAUDE.md
?? _meta/
```

That's **9 of 23** `12-Company` files/folders (EY-HDFC-Ergo-Apigee, HCLTech, INDEX, bolttech, coforge-tech-lead, guardian-india, healthsystems, metron-security, recro-cheq, setu-health, teksystems-hsbc — 11 entries, ~10 companies) that exist only locally. GitHub's copy of this repo is materially out of date for the company-prep folder specifically — the part with the fastest natural churn (active pipeline).

## Other structural findings

- **Number-prefix collision:** `01-JavaScript/` has two files prefixed `05-` (`05-answers.md`, `05-tricky-output-puzzles.md`). Needs renumbering.
- **`12-Company/INDEX.md` is stale:** references 15 files/paths but 4 real files aren't listed at all (`HCLTech_MERN_Interview_Prep.md`, `deloitte-cyber-1hour-cram.md`, `metron-security-doselect-prep.md`, `recro-cheq-nodejs-prep.md`), and one listed path is wrong (`teksystems-hsbc-nodejs-backend.md` should be `teksystems-hsbc/teksystems-hsbc-nodejs-backend.md`).
- **README.md structure diagram is accurate** — all 15 numbered top-level folders it lists exist and match; it does not (and should not) mention `design-patterns/` or the not-yet-created 16–22 scaffolding folders.
- **`08-DSA/` "75 problems" claim** (README.md, TRACKING.md): no `16-DSA-Practice/LOG.md` exists yet to substantiate this — it describes topics *listed* in notes, not problems *solved*. Flagged for correction once a real solve-log exists.
- **`TRACKING.md`** (4,034w): per baseline analysis, describes a 30-day sprint that has since expired and references folder names that have since been renumbered. Candidate for the `/prep-restructure` rewrite into a rolling weekly template.
- **`11-AI-Risk-Assistant-Project/`** is README-only — no code artifact backing the EY Risk.ai story anchor named in `CLAUDE.md`.

---

**Stats:** 100 markdown content files queued for analysis · 3 code scratch files · 3 company `questions.json` files · 1 tracked PDF · 2 folders are exact duplicates of each other.

**Top 5 structural problems:**
1. `design-patterns/` is a byte-identical duplicate of `14-Design-Patterns/` — pure dead weight.
2. Resume PDF and the salary-negotiation file are tracked in git with no `.gitignore` protection.
3. `12-Company/` (205K words, 23 files) is 37%+ of the repo and 9 of those entries only exist locally — GitHub is stale specifically where churn is highest.
4. Real DSA content (patterns, LRU cache) is misfiled under `01-JavaScript/`, making `08-DSA/` look thinner than it is.
5. `12-Company/INDEX.md` and the "75 problems" claim are both out of sync with what actually exists in the repo.

**Next command:** `/prep-analyze 8` (starts with `08-DSA/`, 11 files queued first).
