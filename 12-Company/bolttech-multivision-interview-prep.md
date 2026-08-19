# bolttech (via Multivision) — Senior Software Engineer · Interview Prep

**Candidate:** Onkar "Tyson" Sawant · Sr. Software Engineer (Node.js / React / AWS serverless) · Pune
**Role:** Senior Software Engineer — omni-channel Customer Contact Center platform + AI-powered services
**End client:** bolttech (insurtech, HQ Singapore) · **Vendor:** Multivision (IT staff-aug / consulting)
**Prepared:** 2026-07-01 · Research cited inline; anything I couldn't confirm is marked *(unverified)*.

> **The one thing to internalize before anything else:** bolttech has *publicly announced* that its contact center runs on **Amazon Connect + Amazon Lex**, and its GenAI platform ("**bolttech GenAI Factory**") is built on **Amazon Bedrock** (with Amazon Nova + Amazon Q Developer). This JD is describing that exact system. You are not guessing at their stack — they told the world. Anchor everything to it. [[Sources §13]]

---

## 1. Snapshot / TL;DR

- **What the role really is:** Build and operate bolttech's **AI-powered omni-channel contact center** — Amazon Connect flows + Lex bots for deflection, Transcribe/Polly for voice, and **Bedrock-based GenAI** layered on top for agent-assist and self-service. Node.js backend + React front end, event-driven and multi-tenant across ~37 markets. It is a *platform* engineering role, not a feature-factory role.
- **Why it exists now:** bolttech launched its **GenAI Factory on AWS in May 2025** and is scaling "**Agentic AI across sales, service and claims**." They are moving from pilot (speech-to-speech, first in Korean) to global rollout. They need senior hands who can ship POC→MVP fast on Connect + Bedrock and support it in production. ([AWS/bolttech press release](https://press.aboutamazon.com/sg/aws/2025/5/bolttech-powers-generative-ai-driven-hyper-personalized-customer-services-on-aws))
- **My fit in one line:** *Senior Node.js + React + AWS-serverless engineer who has already shipped a production LLM/agentic platform (EY Risk.ai, GPT-4→GPT-5.1 prompt re-architecture) and scaled a 6M-user serverless platform (UTEC), and who has worked directly in the device-protection/contact-center domain (Asurion Japan).*
- **Top 3 risks (be honest):**
  1. **No hands-on AWS Connect / Lex / Polly / Transcribe / Kinesis / AppSync.** This is the core of the JD. Must convert "never touched" → "understand the architecture cold and can be productive in week one."
  2. **DynamoDB + Terraform + Bitbucket Pipelines** are on my resume-adjacent but not deep (I lean **MongoDB / MySQL** for data and **CloudFormation / Serverless Framework** for IaC). Named gaps I'll get asked to defend.
  3. **Staff-aug framing** — I'm being fronted by Multivision into bolttech's bar. The bolttech engineers decide, and they'll probe depth, not just keyword coverage.
- **The 3 things to nail:**
  1. **A crisp AWS Connect contact-center architecture** end to end (voice+chat → Lex → Lambda fulfillment → Bedrock agent-assist → Contact Lens → CTR analytics). If I can whiteboard this, I've won the round.
  2. **GenAI depth that sounds production, not hobby:** tokens/context/completions, RAG, tool-calling/agentic loops, guardrails, latency & cost — mapped to Bedrock and to my EY Risk.ai story.
  3. **Multi-tenant + security for insurance data** (PII in call recordings/transcripts, tenant isolation, least-privilege) — anchor to VAPT/OWASP.

---

## 2. Company Deep-Dive — bolttech

### Business model
- **B2B2C embedded insurance + an insurance exchange.** bolttech runs a technology-powered **insurance exchange** that connects **insurers ↔ distributors ↔ customers**. Distributors (telcos, retailers, banks, OEMs) embed bolttech's insurance products into their own customer journeys ("embedded insurance"); bolttech is the API/tech layer and marketplace in the middle. ([Crunchbase](https://www.crunchbase.com/organization/bolttech), [TechCrunch](https://techcrunch.com/2025/06/04/singapore-based-insurtech-bolttech-closes-147m-series-c-at-a-2-1b-valuation/))
- **Two revenue engines:** (1) the **exchange** (quote/bind/manage across 230+ insurers, 700+ distribution partners, ~US$50B quoted premiums/yr); (2) **device & appliance protection** (their heritage — phone/device insurance, warranties, trade-in), plus travel, home contents, cyber, motor.

### Scale, funding, ownership
| Fact | Value | Source |
|---|---|---|
| HQ / founded | Singapore / 2020 | TechCrunch |
| Markets | ~**37** (press release) across 4 continents | AWS press release |
| Valuation | **~US$2.1B** (unicorn) | Finovate / TechCrunch |
| Total raised | **~US$670M** across 6 rounds; latest **US$147M Series C, Jun 2025** | Crunchbase / TechCrunch |
| Quoted premiums | ~**US$50B/yr** | Tracxn/press |
| Partners | **230+ insurers, 700+ distributors** | press |
| Backers | Tokio Marine, MetLife, Mitsubishi (MUFG), etc. *(unverified exact cap table)* | Crunchbase |

### Recent moves (verify latest with recruiter)
- **Acquired mTek** (Kenya digital insurance platform), **Dec 2025** — Africa expansion. ([search result](https://www.lifeinsuranceinternational.com/))
- **CPP India / OneAssist** deal — India device-protection/assistance footprint. *(seed context; verify)*
- **Sumitomo JV** — device distribution in SEA. **ING partnership** (live in Netherlands, Italy, Poland, Belgium). **BYD Europe** partnership (motor/EV). *(verify current status)*

### How a contact center + GenAI fits their claims / service / sales flows
This is the heart of the interview. bolttech has framed agentic AI around three verbs — memorize them:
- **Prediction** — risk assessment, personalized products, usage-based premiums.
- **Prevention** — early-warning (cyber threats, natural disasters).
- **Recovery** — **chatbots + virtual assistants for expedited claims and post-incident support.** ← *This is the contact center. This role lives here.*

Concretely, the **GenAI Factory** (Bedrock) sits on top of the **Amazon Connect + Lex** contact center to deliver:
- **Speech-to-speech, multi-language** natural conversations (piloted in **Korean**), near-instant responses to policy questions in the customer's native language.
- **Automated routine claims processing** (e.g., device-protection claims triage) so human agents handle high-value cases.
- An **enterprise-wide innovation engine** — internal teams build their own GenAI apps on it. ([AWS press release](https://press.aboutamazon.com/sg/aws/2025/5/bolttech-powers-generative-ai-driven-hyper-personalized-customer-services-on-aws))

### Tech culture
- **API-first, cloud-native, AWS-heavy.** Public AWS case study; also uses **Amazon Q Developer** internally (cut code-documentation time >50%, effective in **JavaScript & Python** — mirrors the stack). Fast-paced, multi-market, speed-to-market on embedded products. Glassdoor ~3.8/5, interview difficulty ~2.9/5, ~48% positive interview experience (small sample — treat as directional). ([Glassdoor](https://www.glassdoor.co.in/Overview/Working-at-bolttech-EI_IE4395768.11,19.htm))

### 3 talking points that show I get their business
1. **"Speed-to-market is the product."** In embedded insurance, the distributor's integration window is short — whoever ships the clean API + quote flow fastest wins the shelf space. My P&G Olay migration and UTEC delivery show I ship fast without breaking data integrity. *(ties to JD's "POCs/MVPs, speed-to-market, Lean.")*
2. **"Multi-market = multi-tenant is a first-class constraint, not an afterthought."** 37 markets means data residency, per-partner isolation, per-market language and compliance. I'd design tenant isolation and PII handling for call transcripts up front. *(ties to "multi-tenant enterprise-ready, secure.")*
3. **"Device-protection claims are the ideal agentic-AI wedge."** High volume, structured, repetitive — perfect for Lex deflection + Bedrock triage, keeping humans for exceptions. That's exactly bolttech's stated "Recovery" pillar, and it's the domain I touched on the **Asurion Japan** project (device protection / contact center). *(ties directly to their strategy + my background.)*

---

## 3. The Vendor — Multivision (how to work the process)

**Who they are:** IT **staff-augmentation / consulting**. Note there are *several* "Multivision" entities — a **US-based Multivision Inc.** (est. 1998, Naperville IL + Chennai India, Fortune-100 clients, on-site/offshore) and a **Multivision Consulting** entity (the LinkedIn you shared, `linkedin.com/company/multivisionconsulting`, ~38k followers, IT/Telecom consulting, also shows Portugal/Lisbon activity). **Confirm with the recruiter which legal entity is contracting you and in which country you'd be payrolled** — this changes your contract, tax, and who "employs" you. ([Multivision Inc](http://www.multivision-inc.com/), [Multivision Consulting LinkedIn](https://in.linkedin.com/company/multivisionconsulting))

**Their role vs bolttech's:**
- **Multivision** = sourcing, screening, contract, payroll, rate negotiation, reference checks. Their screen is usually a **basic algorithmic/reasoning + fit filter** to make sure they don't waste the client's time.
- **bolttech** = the real technical bar. bolttech engineers run the deciding rounds. **Do not treat the Multivision screen as the hard part — it's the gate, not the bar.**

**What their screen tests:** JD keyword coverage (Node.js, React, AWS Connect, GenAI), communication/English, availability, notice period, rate expectation, and that your resume claims survive a light poke. Reviews describe their process as "a phone screen + an interview to assess basic algorithmic and reasoning skills." ([Indeed reviews](https://www.indeed.com/cmp/Multivision/reviews))

**Keep the recruiter as an ally:**
- They get paid when you get placed — your interests are ~aligned. Feed them a **tight 3-line pitch** they can forward to bolttech (use my 30-sec pitch in §5).
- Ask them to **coach you on the loop** — recruiters usually know the exact rounds, interviewers, and what sank past candidates. Ask directly.
- After each round, **debrief them fast** ("here's what went well, here's what they pushed on") so they can advocate.

**Questions to ask Multivision up front (before investing prep):**
1. **Which entity employs me, and where am I payrolled** (India? contract type?) — perm, contract, or C2H?
2. **Rate/comp** — is this a fixed monthly rate or CTC? Is the rate negotiable on the bill rate, and what's their margin band? *(ask tactfully — see §12)*
3. **Contract length + renewal/backfill terms** — any lock-in, notice, or penalty clause? (Reviews mention "2-year one-sided contract" concerns — verify.)
4. **Exact interview loop** — how many rounds, who from bolttech, take-home or live coding, timeline to offer?
5. **Which bolttech team / manager, which market/product, remote or hybrid, and time-zone expectations** (SG/Korea vs India hours)?
6. **Who do I report to day-to-day** — a bolttech lead or a Multivision account manager?

**Staff-aug watch-outs:** rate opacity (they keep a margin — fine, but know it), lock-in clauses, "bench" risk if the project slips, and unclear conversion-to-perm path. Covered in detail in §12.

---

## 4. Likely Interview Process (stage by stage) — *estimate; confirm exact rounds with recruiter*

| Stage | Who | What it tests | How "good" looks | Prep focus |
|---|---|---|---|---|
| **0. Recruiter screen** | Multivision | Fit, comms, availability, rate, resume sanity | Clean 3-line pitch, confident on Node/React/AWS/GenAI, no rate wobble | §5 pitch, §3 questions |
| **1. Online/technical test or take-home** *(may or may not exist)* | Multivision or a platform (HackerRank/Codility) | JS/TS problem-solving, maybe a small API task | Correct + clean + tested; explain trade-offs | §8 coding |
| **2. bolttech Technical Round 1** | bolttech senior engineer | **Node.js + AWS core + live coding**; probe real depth | Event loop / async cold; SQS vs SNS vs EventBridge; write clean async code out loud | §6 Node/AWS, §8 |
| **3. bolttech Technical Round 2 / System Design** | bolttech senior/staff eng or architect | **AWS Connect contact-center design + GenAI integration + multi-tenancy** | Whiteboard the Connect+Lex+Bedrock flow; reason about scale, PII, cost | §6 Connect/AI, §7 design |
| **4. Manager / Architect + Behavioral** | Hiring manager / tech lead | Ownership, speed-to-market, stakeholder mgmt, prod support mindset, culture | STAR stories, "fast-paced international" fit, incident ownership | §9 STAR, §10 questions |
| **5. HR / Offer** | Multivision (+ maybe bolttech HR) | Comp, start date, contract | Know your number; negotiate the bill rate | §3, §12 |

**Where the loop compresses:** vendor-fronted loops often merge 2+3 into one long round, or drop the take-home. For a senior contract role they may also **skip LeetCode-hard** and go straight to **applied system design + "walk me through your hardest production problem."** Don't over-index on hard algorithms; over-index on **applied AWS + GenAI + design**. Confirm the real shape with the recruiter so you prep the right thing.

---

## 5. Role Analysis + Fit Scorecard

**Legend:** Strong = clear evidence · Medium = adjacent/partial, spin it · Gap = must study, be honest.

| JD Requirement | My evidence | Strength | How to close / spin |
|---|---|---|---|
| **Hands-on Node.js** | UTEC backend lead (Node.js at scale), EY Risk.ai Node, Vkonnect, P&G | **Strong** | Lead with internals depth (event loop, streams, async). |
| **Hands-on React** | Vkonnect admin panel (legacy→hooks), EY Risk.ai UI, Asurion (React) | **Strong** | Show hooks/reconciliation/perf, not just JSX. |
| **Solid AWS services/architecture** | Lambda, API GW, S3, SQS/SNS, EC2, VPC, IAM, KMS, CloudFormation, OpenSearch, Athena; nested CFN stacks (-40% deploy) | **Strong** | Anchor to nested-stack + serverless design achievements. |
| **AWS Connect** | — | **Gap** | Study contact flows, queues, CCP, Streams API, Contact Lens, CTR. Say: "I understand the flow model + Lambda integration; I can be productive week one." |
| **Lambda, S3, SQS, SNS, API Gateway, EC2** | All on resume/AWS skills | **Strong** | Easy win — go deep on SQS vs SNS vs EventBridge. |
| **AppSync** | — (I've done API Gateway REST) | **Gap** | Learn GraphQL + real-time **subscriptions** for live agent UI; map to AppSync. |
| **Kinesis** | — (I've used SQS/SNS + OpenSearch pipelines) | **Gap** | Data Streams vs Firehose; real-time transcript/analytics pipeline. |
| **Lex / Polly / Transcribe** | — | **Gap** | Lex intents/slots/fulfillment; Polly SSML/neural; Transcribe streaming + PII redaction. |
| **NoSQL: MongoDB** | Vkonnect (MongoDB), MERN | **Strong** | Schema design, aggregation, indexes. |
| **NoSQL: DynamoDB** | Resume shows MongoDB/MySQL — **not DynamoDB** | **Medium/Gap** | Be honest: "Deep on MongoDB; I know DynamoDB single-table design, PK/SK, GSIs, streams conceptually and can ramp fast." Learn single-table cold. |
| **CI/CD: CloudFormation** | Nested CFN stacks (-40% deploy time), Serverless Framework, AWS Amplify | **Strong** | This is a differentiator — most React devs can't do CFN depth. |
| **CI/CD: Bitbucket Pipelines** | GitLab CI/CD, AWS Amplify, Serverless Framework | **Medium** | "Pipeline concepts transfer 1:1 — YAML stages, envs, artifacts. I've done GitLab; Bitbucket is the same shape." |
| **IaC: Terraform** | I lean **CloudFormation** | **Gap** | Learn state/backends, plan/apply, modules, drift. Defend CFN depth *and* show TF awareness. |
| **Linux admin/troubleshooting** | Prod support on UTEC/Vkonnect (99.99% uptime), EC2 ops | **Medium/Strong** | Prep processes/signals, logs, netstat/curl, FDs, end-to-end debug. |
| **Git** | All roles | **Strong** | Trivial. |
| **Agile + Lean** | Team delivery, 110-member UTEC, sprint work | **Strong** | Tie to "speed-to-market POC/MVP." |
| **Testing: Jest** | Node testing on projects | **Medium** | Unit/mocks/coverage; testing async Lambdas. |
| **Testing: Playwright / Cypress** | Not on resume | **Gap** | Learn e2e basics, selectors, flakiness handling. |
| **Communication / stakeholder mgmt** | Mentored juniors, cross-functional, client-facing (P&G, EY) | **Strong** | STAR: stakeholder conflict story. |
| **GenAI: context/tokens/completions** | **EY Risk.ai — GPT-4→GPT-5.1 prompt re-architecture, +20% quality** | **Strong** | Your single best differentiator. Go deep. |
| **Prior GenAI project/POC (advantage)** | EY Risk.ai (production agentic AI) | **Strong** | Frame as production, not POC. |
| **AWS cert (plus)** | SAA-C03 **in progress** | **Medium** | Say "targeting SAA-C03, exam scheduled" — shows initiative. |
| **WebRTC (plus)** | — | **Gap** | High-level only: browser softphone, media path, ICE/STUN/TURN. |

**Blunt fit: ~72%.** Rock-solid on the *foundation* (Node/React/AWS-serverless/GenAI/security) which is ~60% of the job and the hard-to-fake part. The gap is the **Connect-specific AWS service belt** (Connect/Lex/Polly/Transcribe/Kinesis/AppSync) + Terraform — all *learnable in a week to interview-competent*, and bolttech knows most candidates won't have prod Connect experience. Your GenAI production experience + serverless-at-scale + device-protection domain adjacency (Asurion) is a rarer combination than Connect button-clicking.

**30-second pitch (memorize):**
> "I'm a senior Node.js and React engineer who builds on AWS serverless. Two things make me a fit here: I've shipped a **production agentic-AI platform** — at EY I re-architected the prompt infrastructure to move our audit AI agents from GPT-4 to GPT-5.1 and lifted response quality 20% — so I speak tokens, context, and completions from real work, not slides. And I've run **serverless at scale** — I led the Node.js backend for UTEC, a 6M-user platform, with nested CloudFormation, OpenSearch, and VAPT-hardened security. I've also worked in the **device-protection / contact-center domain** on the Asurion project. I haven't run Amazon Connect in production yet, but I understand the Connect + Lex + Bedrock architecture bolttech has publicly built, and I ramp fast — that's my track record."

---

## 6. Technical Question Bank

> Model answers are compressed to what you'd *say*. **[anchor: X]** = tell that project's story.

### A. Node.js internals

1. **Explain the event loop phases.** libuv loop phases in order: **timers** (setTimeout/setInterval) → **pending callbacks** → **idle/prepare** → **poll** (I/O, retrieves new events) → **check** (setImmediate) → **close callbacks**. Between *every* phase the **microtask queue** drains (Promises + `process.nextTick`, nextTick first).
2. **Micro vs macro tasks.** Macrotasks = timers, I/O, setImmediate. Microtasks = resolved Promises, `queueMicrotask`, `process.nextTick`. Microtasks run to exhaustion after each macrotask/phase — a `nextTick` loop can **starve** the loop.
3. **Is Node single-threaded?** JS execution is single-threaded; **libuv has a thread pool** (default 4, `UV_THREADPOOL_SIZE`) for fs, DNS, crypto, zlib. Network I/O uses the OS async primitives, not the pool.
4. **`async/await` pitfalls.** Sequential `await` in a loop kills throughput — use `Promise.all` for independent work; unhandled rejections; forgetting `await` (floating promise); `await` inside `try` swallowing errors; mixing callbacks + promises.
5. **Streams & backpressure.** Streams process data in chunks without buffering it all. **Backpressure** = when `writable.write()` returns `false`, stop and wait for `'drain'`; `pipe()`/`pipeline()` handle it automatically. Critical for large file/S3/Transcribe audio flows. **[anchor: P&G Olay — high-volume batch migration]**
6. **`cluster` vs `worker_threads`.** `cluster` forks **processes** sharing a port (scale across cores for I/O-bound HTTP) — no shared memory. `worker_threads` = **threads** with `SharedArrayBuffer` for **CPU-bound** work (parsing, crypto, image). Lambda: neither usually — scale via concurrency.
7. **Detect a memory leak.** Symptoms: RSS climbs, GC can't reclaim. Tools: `--inspect` + Chrome DevTools heap snapshots (compare, look for retained objects), `process.memoryUsage()`, `clinic.js`, `--max-old-space-size`. Common causes: unbounded caches/Maps, event-listener accumulation, closures holding refs, global arrays.
8. **Error handling best practice.** Distinguish **operational** (retry/handle) vs **programmer** (crash + restart) errors. `async` errors → `try/catch` or `.catch`; sync in callbacks → error-first; process-level `uncaughtException`/`unhandledRejection` as last resort logging, then exit. In Lambda: let it throw so the platform records the failure/DLQ.
9. **EventEmitter — memory-leak warning?** Default max 10 listeners per event → `MaxListenersExceededWarning`. Fix the leak (usually re-adding in a loop) rather than bumping the limit blindly.
10. **Node perf tuning.** Keep the event loop unblocked (offload CPU), use streaming, connection pooling/keep-alive, avoid sync APIs (`fs.readFileSync`) in request paths, cache hot data (Redis), and measure with `--prof`/clinic. **[anchor: UTEC — 25% latency cut via MySQL+Redis, async processing]**

### B. React

1. **Rules of hooks.** Only call at top level, only in components/custom hooks — React tracks hooks by **call order**, so conditionals/loops break the mapping.
2. **Reconciliation / virtual DOM.** React diffs the new element tree vs old; same type → update props, different type → replace subtree. **Keys** let it match list items across renders — never use array index for dynamic lists.
3. **`memo` vs `useMemo` vs `useCallback`.** `React.memo` = memoize a *component* (skip re-render if props shallow-equal). `useMemo` = memoize a *value*. `useCallback` = memoize a *function ref* (so memoized children don't re-render). Don't sprinkle blindly — they cost memory + comparison.
4. **`useEffect` gotchas.** Missing deps → stale closures; wrong deps → infinite loops; cleanup for subscriptions/timers; effects run **after** paint — use `useLayoutEffect` for sync DOM measurement.
5. **Controlled vs uncontrolled.** Controlled = value in React state (single source of truth, validate on change). Uncontrolled = DOM holds value, read via ref (simpler, less re-render). **[anchor: Vkonnect admin panel]**
6. **State management choices.** Local `useState` → lift up → Context (low-frequency global like auth/theme; re-renders all consumers) → Redux/Zustand/Jotai for complex/high-frequency. Server state → React Query/SWR (cache, dedupe, refetch) — don't jam server data into Redux.
7. **Performance.** Memoization, list **virtualization** (react-window), code-splitting (`lazy`/`Suspense`), avoid inline object/array props, `key` correctness, move state down to shrink re-render scope.
8. **SSR vs CSR (and hydration).** SSR = HTML on server → faster first paint + SEO; CSR = render in browser. Hydration attaches listeners to server HTML; mismatch = bugs. Relevant if bolttech agent UI needs SEO/first-paint (probably CSR SPA for an internal agent desktop).
9. **Error boundaries.** Class component with `getDerivedStateFromError`/`componentDidCatch` (or `react-error-boundary`) to catch render errors in a subtree and show fallback — don't let one widget crash the agent console.
10. **Reconnecting live data (agent UI).** WebSocket/**AppSync subscriptions** feed live transcript/sentiment; keep it out of heavy re-render paths, batch updates, and use a store, not prop-drilling.

### C. AWS core

1. **Lambda cold starts — cause + fixes.** Cold start = init of a new execution env (download code, start runtime, run init code). Reduce: smaller package, keep deps lean, **provisioned concurrency** (pre-warmed) or **SnapStart**, avoid VPC-attached unless needed (ENI setup — much better now with Hyperplane), put SDK clients + connections in init scope for reuse.
2. **Reserved vs provisioned concurrency.** **Reserved** = caps/guarantees how many concurrent executions a function can use (protects the rest of the account). **Provisioned** = keeps N environments warm (kills cold starts, costs money). Account default ~1,000 concurrent (soft limit).
3. **API Gateway REST vs HTTP API.** HTTP API = cheaper, lower latency, JWT authorizers, fewer features. REST API = API keys, usage plans, request/response transforms, WAF, private endpoints, fine-grained. Pick HTTP unless you need REST-only features.
4. **API Gateway authorizers.** IAM (SigV4), Cognito user pools, or **Lambda authorizer** (custom token/request auth, cache the policy by TTL). Throttling via usage plans + account/route limits.
5. **SQS vs SNS vs EventBridge — the classic.**
   - **SQS** = queue, **pull**, one consumer group, decouple + buffer + retry + DLQ. Standard (at-least-once, best-effort order) vs FIFO (exactly-once, ordered, lower TPS).
   - **SNS** = pub/sub **fan-out**, push to many subscribers (SQS, Lambda, HTTP, SMS/email).
   - **EventBridge** = event **bus** with **content-based routing rules**, schema registry, SaaS/partner sources, scheduler, archive/replay. Slightly higher latency; best for decoupled event-driven + filtering.
   - Rule of thumb: buffer/work-queue → SQS; broadcast → SNS (or SNS→SQS fan-out); route by event content / integrate many services → EventBridge. **[anchor: UTEC async processing; AWS skills SNS/SQS]**
6. **S3 essentials.** Durability 11 nines; storage classes (Standard/IA/Glacier); **event notifications** → Lambda/SQS/SNS; presigned URLs; **encryption** SSE-S3/SSE-KMS; versioning; lifecycle. For call recordings → S3 + KMS + lifecycle to Glacier + strict bucket policy.
7. **IAM roles vs users; least privilege.** Roles = temporary creds assumed by services/principals (Lambda execution role, cross-account). Never long-lived keys in code. Scope policies to specific ARNs + conditions. **[anchor: VAPT/OWASP — least-privilege mindset]**
8. **VPC basics for serverless.** Lambda in VPC to reach private RDS/ElastiCache; needs subnets + SG + (NAT or VPC endpoints for AWS API access). **VPC endpoints** (Gateway for S3/DynamoDB, Interface for others) keep traffic off the internet — matters for PII.
9. **Cost/perf trade-offs.** Right-size Lambda memory (CPU scales with it — sometimes more memory = cheaper via faster runs), pick HTTP API over REST, on-demand vs provisioned DB, S3 lifecycle, Graviton (arm64) for cheaper compute. **[anchor: nested CFN + Cost Explorer awareness]**
10. **How would you make a Lambda idempotent?** Dedup key (message ID / idempotency token) stored in DynamoDB/Redis with conditional put; safe because SQS/SNS are at-least-once. Essential for claims/payment flows.

### D. AWS Connect + contact center *(STUDY HARD — core of the JD)*

1. **What is Amazon Connect?** Cloud contact center as a service — telephony (inbound/outbound voice), chat, task, omni-channel routing, IVR, with pay-per-use and deep AWS integration. No servers to run. bolttech runs their contact center on it.
2. **Contact flow (now "flow").** A **visual state machine** that controls an interaction: play prompt, get input, invoke Lex, invoke Lambda, set attributes, check hours/queue, transfer, disconnect. It's the IVR + routing logic. You build them in the flow designer or as JSON.
3. **Queues vs routing profiles.** **Queue** = where contacts wait for an agent (per skill/line of business). **Routing profile** = assigned to an **agent**, defines which queues + channels + priority they serve. Together they implement skills-based routing.
4. **Invoking Lambda from a flow.** "Invoke AWS Lambda function" block → passes contact attributes + custom params, gets back a flat key/value map (string) you store as **contact attributes** and branch on. Used for CRM lookups, policy checks, claim status, auth. **This is where my Node.js lives.** [anchor: Node.js APIs]
5. **Contact attributes.** Key/value data on a contact (system, user-defined, external from Lambda/Lex). Flow logic and agent screen-pop read them; they land in the CTR.
6. **Contact Lens.** Connect's ML analytics: **real-time + post-call transcription, sentiment, keyword/issue detection, categorization, redaction, and (with Amazon Q) generative summaries/agent-assist.** Enable it to power real-time recommendations. ([AWS docs](https://docs.aws.amazon.com/connect/latest/adminguide/amazon-q-connect.html))
7. **CTR (Contact Trace Record).** The metadata record for every contact (timestamps, queue, agent, disposition, attributes). Streamed via **Kinesis** to S3/Redshift/OpenSearch for analytics & dashboards. **This is the Kinesis hook in the JD.**
8. **CCP / Agent Workspace + Streams API.** CCP = the softphone UI agents use. **Amazon Connect Streams (streams.js)** embeds/controls the CCP in a custom web app — subscribe to contact/agent events, do screen-pops, build a custom agent desktop (React!). **[anchor: React]**
9. **Quick connects.** Pre-defined transfer destinations (to a queue, agent, or external number) surfaced to agents/flows.
10. **Hours of operation + holidays.** Configured per queue; flows branch on "check hours" to route to voicemail/callback/after-hours message.
11. **Chat vs voice — what differs in design.** Voice = real-time media, telephony, DTMF, Transcribe/Polly. Chat = async-ish text, persistent context, easier to bot-deflect with Lex, can span sessions. Omni-channel routing unifies agent occupancy across both.
12. **Escalation design (bot → human).** Lex handles intent; on low confidence / negative sentiment / explicit "agent" / high-value claim, set an attribute and **route to a queue** with context attached (transcript + attributes) so the human doesn't start cold. Design for graceful handoff, not dead-ends.
13. **Amazon Q in Connect (agent assist).** LLM evolution of Wisdom — detects intent live via Contact Lens and pushes **real-time recommended responses/actions + knowledge-base answers** to agents; also powers self-service bots. Requires Contact Lens enabled for voice. This is bolttech's "agent assist" layer.

### E. AWS AI voice + real-time *(STUDY HARD)*

**Lex**
1. **Core concepts.** **Bot → intents → utterances → slots (+ slot types) → fulfillment.** Intent = what the user wants ("FileClaim"); slots = params ("deviceType", "policyId"); fulfillment = **Lambda** that does the work.
2. **Fulfillment via Lambda.** Lex calls a Lambda (dialog + fulfillment hooks); Lambda validates slots, calls backend/Bedrock, returns `dialogAction`/messages. **My Node.js again.**
3. **Session attributes vs slots.** Slots = per-intent params; **session attributes** = data persisted across intents in a conversation (auth state, tenant, context). Request/session attributes carry context to fulfillment.
4. **Lex + Connect.** "Get customer input" block → Lex bot for natural-language IVR/deflection; Lex returns intent → flow branches. Lex V2 supports streaming, multiple languages.

**Polly**
5. **What/why.** Text-to-speech; **neural voices (NTTS)** for natural prosody; supports **SSML** (`<break>`, `<prosody>`, `<say-as>`, `<phoneme>`) to control pauses/emphasis/pronunciation; **lexicons** for domain terms; Speech Marks for lip-sync/highlighting. Used for dynamic IVR prompts / bot voice.

**Transcribe**
6. **Batch vs streaming.** **Streaming** (WebSocket/HTTP2) for real-time call transcription; batch for recordings. **Transcribe Call Analytics** adds sentiment, categories, and turn-by-turn.
7. **Custom vocabulary / language models.** Improve accuracy on domain terms (product names, "IMEI", policy jargon) via custom vocab / custom language models.
8. **PII redaction.** Transcribe can **automatically redact PII** (card, SSN-equivalents) in transcripts — critical for insurance call data + compliance. **[anchor: VAPT/OWASP, PII handling]**

**Kinesis**
9. **Data Streams vs Firehose.** **Data Streams** = low-latency, ordered, shard-based, you write consumers (retain up to 365 days, replay) — for real-time processing (live transcript/sentiment). **Firehose** = fully managed **delivery** to S3/Redshift/OpenSearch/Splunk with buffering + transform (Lambda) — for near-real-time ETL/analytics. Connect streams **CTRs + Contact Lens + audio** via Kinesis.
10. **Shards + hot partitions.** Throughput = shards × (1MB/s in, 2MB/s out). Partition key spreads records; a skewed key = hot shard. Use **enhanced fan-out** for multiple low-latency consumers.

**AppSync**
11. **What/why.** Managed **GraphQL** — single endpoint, resolvers to DynamoDB/Lambda/HTTP/RDS, fine-grained auth (Cognito/IAM/API key/OIDC). Clients ask for exactly the fields they need.
12. **Subscriptions (the key feature here).** Real-time **GraphQL subscriptions** over WebSocket push updates to clients — perfect for a **live agent dashboard** (transcript, sentiment, next-best-action updating in real time). Backed by a mutation triggering the subscription.

**WebRTC** *(plus)*
13. **High-level.** Browser-native real-time audio/video/data — no plugin. Peer connection negotiated via **SDP** offer/answer + **ICE** candidates; **STUN** discovers your public IP (NAT traversal), **TURN** relays media when P2P fails (symmetric NAT). Amazon Connect's **in-browser softphone uses WebRTC** for the agent's voice path — that's why it's in the JD. You don't need to implement it; you need to explain the media path and why TURN exists.

### F. Databases

**MongoDB** — strong for me
1. **Schema/data modeling.** Model to your access patterns; **embed** for 1:few + read-together, **reference** for 1:many/many:many + independent growth. Watch the 16MB doc limit + unbounded arrays. **[anchor: Vkonnect MongoDB]**
2. **Indexes.** Single/compound (ESR rule: Equality, Sort, Range), multikey (arrays), text, TTL (expire sessions/tokens), partial. `explain()` to check `IXSCAN` vs `COLLSCAN`.
3. **Aggregation pipeline.** `$match`→`$group`→`$sort`→`$lookup` etc.; push `$match`/`$project` early to shrink the working set. Great for reporting.
4. **Sharding.** Horizontal scale by shard key (hashed vs ranged); bad key = hotspots/jumbo chunks. Config servers + mongos router.
5. **Transactions.** Multi-doc ACID transactions on replica sets/sharded clusters — but they cost; prefer single-doc atomicity where possible.

**DynamoDB** — my honest gap, learn cold
6. **Partition + sort key.** PK (hash) decides partition; PK+SK = composite primary key enabling 1:many within a partition. Queries need the PK; **Scan is a last resort.**
7. **Single-table design.** Model *all* entities in one table using overloaded PK/SK + item collections + GSIs to serve every access pattern with `Query` — trades modeling effort for scale + cost + single round-trip. Know **when NOT to** (analytics/flexible queries).
8. **GSI vs LSI.** **GSI** = different PK+SK, eventually consistent, own capacity, add anytime — the main tool. **LSI** = same PK different SK, strongly consistent, must create at table creation, shares capacity.
9. **DynamoDB Streams.** Change data capture → Lambda (fan-out, aggregations, replication, event-driven). Like a per-item event log.
10. **On-demand vs provisioned.** On-demand = pay-per-request, auto-scale, spiky/unknown traffic. Provisioned (+ auto-scaling) = cheaper for steady predictable load; reserved capacity for commitment.
11. **Hot partitions.** Skewed PK or hot key throttles even with capacity. Fix: high-cardinality/composite keys, **write sharding** (suffix), or adaptive capacity (helps but not magic).
12. **Honest framing if asked:** *"I've done my NoSQL modeling in MongoDB in production; I understand DynamoDB's single-table/PK-SK/GSI model and streams, and I'd lean on that to ramp quickly — but I'll be straight that my hands-on depth is MongoDB."*

### G. IaC & CI/CD

1. **CloudFormation — my strength.** Declarative AWS-native templates; **nested stacks** for modular reuse, change sets, drift detection, StackSets for multi-account/region. **[anchor: nested CFN stacks, -40% deploy time]**
2. **Terraform — my gap, know these:** multi-cloud, HCL, **state file** (source of truth — store remote in S3 + **DynamoDB lock table**), `plan`/`apply`, **modules**, workspaces, `import` for existing resources, providers. **Drift** = real infra differs from state.
3. **CFN vs Terraform, defend both.** CFN = AWS-native, no state to manage (AWS holds it), tight service coverage/day-1 support, rollback built-in. TF = multi-cloud, richer module ecosystem, explicit plan, but **you own state + locking**. "I'm deep in CFN; the concepts port directly to TF and I'd be productive quickly."
4. **Bitbucket Pipelines.** `bitbucket-pipelines.yml`: **pipelines → steps → scripts**, Docker images per step, **caches + artifacts**, **deployment environments** (test/stage/prod with gating), variables/secrets, parallel steps. Same mental model as GitLab CI (which I've used).
5. **Blue/green vs canary.** Blue/green = two full envs, flip traffic, instant rollback. Canary = shift a small % first, watch metrics, ramp. Lambda: aliases + weighted routing + CodeDeploy. Connect/contact flows: version + staged rollout.
6. **Pipeline for serverless.** Lint/test (Jest) → build → `sam`/Serverless/CFN deploy to stage → integration tests → promote to prod (manual gate) → smoke test. **[anchor: Serverless Framework, AWS Amplify CI/CD]**

### H. Linux & troubleshooting

1. **Processes & signals.** `ps aux`, `pgrep`; signals: SIGTERM (graceful, trap it to drain), SIGKILL (-9, unclean), SIGHUP (reload). Node should trap SIGTERM to close servers/connections.
2. **Logs.** `journalctl -u svc`, `/var/log/`, `tail -f`, `grep`; centralize to CloudWatch. First move on an incident: **logs + metrics timeline**.
3. **top/htop/ps.** CPU vs load average vs memory; identify a runaway PID; `nice`/`renice`. High load + low CPU = I/O wait.
4. **Networking.** `curl -v` (test endpoint + TLS + latency), `dig`/`nslookup` (DNS), `ss -tulpn`/`netstat` (what's listening/connected), `traceroute`, `ping`. Check SG/NACL/route before blaming the app.
5. **File descriptors.** `ulimit -n`, `lsof -p PID`; "EMFILE: too many open files" = leaked sockets/handles — common Node prod bug.
6. **Debug a slow/failing prod service end-to-end.** (1) Scope: what changed, blast radius, error rate/latency graphs. (2) Layer down: LB → app logs → dependency (DB/queue/3rd-party) → infra (CPU/mem/FD/network). (3) Reproduce, form hypothesis, verify with metrics not vibes. (4) Mitigate (rollback/scale/feature-flag) then root-cause. **[anchor: UTEC prod support / Vkonnect 99.99% uptime]**

### I. Testing

1. **Test pyramid.** Many **unit**, fewer **integration**, few **e2e**. Push logic to unit; keep e2e for critical journeys (claim submission, agent login).
2. **Jest.** Unit + mocks (`jest.mock`, `jest.fn`), spies, coverage, snapshot (use sparingly), `beforeEach` isolation. Mock AWS SDK (aws-sdk-client-mock) for Lambda handlers.
3. **Testing async / Lambdas.** Test the handler as a pure function (inject deps), mock SDK/DB, assert on returned payload + side-effect calls; use fake timers for debounce/retry. Integration test against **LocalStack** for SQS/DynamoDB/S3.
4. **Playwright vs Cypress.** Playwright = multi-browser, multi-tab, parallel, auto-wait, great for cross-browser; Cypress = DX, time-travel debugging, runs in-browser (weaker on multi-tab/cross-origin, improving). Both do e2e for the agent web app.
5. **Flakiness.** Root causes: timing/races, hard sleeps, shared state, network. Fix with **auto-waiting on conditions** (not `sleep`), test isolation, stable **data-testid** selectors, retries only as a bandage. **[anchor: UTEC quality team]**

### J. Generative AI *(your differentiator — go deep)*

1. **Tokens & context window.** Text → tokens (~¾ word). Context window = max tokens (prompt + completion) the model sees. **Context management** = fitting system + history + RAG chunks + user turn within budget; summarize/trim/rank when it overflows. **[anchor: EY Risk.ai — context management, GPT-4→GPT-5.1]**
2. **Completions & decoding params.** Completion = generated tokens. **Temperature** (randomness), **top-p** (nucleus sampling), **max tokens**, **stop sequences**, frequency/presence penalties. Low temp for extraction/claims logic, higher for creative.
3. **Prompt engineering that matters.** System role, few-shot examples, explicit output schema (JSON), delimiters, chain-of-thought / step decomposition, and **constrain the task**. My 20% quality lift at EY was **system-level prompt tuning + testing.**
4. **RAG.** Retrieval-Augmented Generation: embed docs → vector store → retrieve top-k relevant chunks → stuff into context → ground the answer. Cuts hallucination, keeps answers current without retraining. bolttech's policy-question bot is a RAG use case (policy docs per market/tenant).
5. **Embeddings.** Vector representation of text; cosine similarity for semantic search/retrieval. Store in OpenSearch (k-NN — I've used OpenSearch!), pgvector, or Bedrock Knowledge Bases. **[anchor: OpenSearch experience → vector search]**
6. **Function/tool calling & agentic patterns.** Model returns a structured call ("getPolicy(id)"), your code executes it, feeds the result back → the **agent loop** (plan → act → observe → repeat) until done. This *is* "agentic AI." bolttech automates claims this way. **[anchor: EY Risk.ai agentic AI]**
7. **Hallucination & guardrails.** Ground with RAG, ask for citations, constrain output schema, validate/verify tool outputs, **Bedrock Guardrails** (block topics, PII filter, toxicity), confidence thresholds + human handoff. Never let the bot invent policy terms.
8. **Latency & cost control.** Smaller/cheaper models for routing/classification, big model only when needed (model cascade), **streaming** responses, prompt **caching**, cap max tokens, batch embeddings, semantic cache for repeated questions.
9. **Evals.** You can't improve what you don't measure: golden test sets, LLM-as-judge, regression suites on prompts, track quality + latency + cost per change. My EY work was fundamentally **prompt regression testing.**
10. **Map to AWS / Bedrock (their stack).** **Bedrock** = managed access to foundation models (Anthropic Claude, **Amazon Nova**, etc.) + **Knowledge Bases** (managed RAG), **Agents** (managed tool-calling/orchestration), **Guardrails**. bolttech's GenAI Factory is Bedrock-based; for the contact center it pairs with **Amazon Q in Connect** for agent-assist. Say "I'd implement the agent loop with Bedrock Agents + Knowledge Bases and guard it with Bedrock Guardrails." **[anchor: EY Risk.ai — same patterns, different model provider]**
11. **Speech-to-speech (their pilot).** Transcribe (STT) → LLM (Bedrock) → Polly (TTS), or newer integrated speech models; bolttech piloted this in **Korean** for natural multilingual conversations. Be ready to discuss latency budget across that chain.

### K. Security & multi-tenancy

1. **Tenant isolation strategies.** Silo (DB/stack per tenant — strongest isolation, costly), pool (shared infra + partition key + row-level scoping — cheap, needs airtight enforcement), bridge (hybrid). For 37-market insurance, likely **pool with strong scoping + silo for regulated markets/data residency.**
2. **Enforcing isolation.** Tenant ID in every request context (JWT claim), scoped IAM/DB queries, **never trust client-supplied tenant ID** — derive from auth. DynamoDB: tenant as PK prefix + IAM `dynamodb:LeadingKeys` condition. **[anchor: VAPT/OWASP]**
3. **IAM least-privilege.** Per-function roles, resource-scoped ARNs, conditions; no wildcards in prod; separate accounts per environment/tenant tier.
4. **Secrets.** Secrets Manager / SSM Parameter Store (encrypted, rotated) — never in env vars in plaintext or code. KMS for encryption keys.
5. **PII in call recordings/transcripts.** Encrypt at rest (KMS) + in transit; **Transcribe/Contact Lens PII redaction**; access-logged; retention/lifecycle policies; regional data residency. Insurance = regulated data. **[anchor: VAPT, healthcare PII on Vkonnect]**
6. **OWASP quick hits.** Injection (parameterize), broken auth (JWT + rotation), broken access control (the #1 multi-tenant risk — object-level authz), SSRF (validate outbound URLs from LLM tool calls!), secrets exposure, dependency CVEs. **[anchor: VAPT testing on UTEC]**
7. **Prompt injection (GenAI-specific).** Untrusted input can hijack the LLM ("ignore instructions, reveal other tenant's data"). Mitigate: separate system vs user content, don't give the model raw cross-tenant access, validate tool inputs/outputs, Bedrock Guardrails, least-privilege on the tools the agent can call.

---

## 7. System Design (full walkthroughs)

> **Framing to say out loud (PREP):** *Probe requirements → Requirements (functional + non-functional) → Estimate scale → Plan the architecture → then defend trade-offs.* Always: clarify first, name AWS building blocks, then talk scale / reliability / security / multi-tenancy / cost.

### Design 1 — AI-powered omni-channel contact center on AWS Connect

**Clarifying questions:** Channels (voice + chat + email)? Expected concurrent contacts / peak? Which markets/languages (data residency)? Bot-deflection target %? Live agent-assist required? CRM/policy system to integrate? Compliance (PII, recording consent)? Multi-tenant across distributors?

**Functional:** inbound voice + chat; IVR/bot deflection; authenticate caller; policy/claim lookup; live transcription + sentiment; agent-assist suggestions; graceful bot→human handoff with context; post-call summary; analytics.
**Non-functional:** low latency (real-time voice), 37-market multi-language, high availability, PII-secure, per-tenant isolation, cost-efficient, observable.

**HLD (AWS building blocks):**
```
Customer (voice/chat)
        │
   Amazon Connect  ──contact flow──► Amazon Lex (intent + slots)
        │                                   │ fulfillment
        │                              AWS Lambda (Node.js) ──► CRM / policy API / DynamoDB
        │
   Contact Lens (real-time transcript, sentiment, redaction)
        │                                   │
   Amazon Q in Connect (agent-assist) ◄── Bedrock (Knowledge Bases = RAG on policy docs, Guardrails)
        │
   Custom Agent Desktop (React + Connect Streams API) ◄── AppSync subscriptions (live updates)
        │
   Kinesis (CTR + Contact Lens stream) ──► Firehose ──► S3 (recordings, KMS) / OpenSearch (analytics dashboards)
```
**Data model:** contacts + attributes (DynamoDB, PK=tenant#contactId), customer/policy (existing CRM), knowledge base (S3 → Bedrock KB vectors), CTR analytics (S3/OpenSearch).
**Scale/reliability:** Connect + Lambda + Bedrock all serverless/auto-scaling; Lambda reserved concurrency for critical fulfillment; DLQs on async; multi-AZ by default; provisioned concurrency on the hot fulfillment path to kill cold starts on voice.
**Security/multi-tenancy:** tenant ID from Connect attributes → carried through Lambda → scoped DB access; Transcribe/Contact Lens **PII redaction**; KMS on recordings; per-market Bedrock KB; least-privilege roles; recording-consent flow per market.
**Trade-offs:** Lex-only deflection (cheap, rigid) vs Bedrock-agent deflection (flexible, costlier, latency) → **hybrid**: Lex for structured intents, Bedrock for open questions. Silo vs pool tenancy → pool + strong scoping, silo for regulated markets. **[anchor: EY Risk.ai for the Bedrock/agent layer; UTEC for serverless scale; VAPT for PII]**

### Design 2 — Real-time call-transcription + sentiment/insight pipeline

**Clarify:** real-time vs post-call? retention? who consumes (live agent dashboard vs QA analytics)? languages? PII rules?

**HLD:**
```
Connect voice ──► Contact Lens / Transcribe streaming (STT + sentiment + PII redaction)
        │
   Kinesis Data Streams (real-time, ordered, sharded by contactId)
        │                                   │
   Lambda (enrich: sentiment scoring, next-best-action via Bedrock)     Kinesis Firehose
        │                                                                    │
   AppSync mutation ──► GraphQL subscription ──► React agent dashboard      S3 (raw, KMS) ─► Athena/OpenSearch (QA analytics)
```
**Why these blocks:** **Data Streams** = low-latency ordered per-call feed with replay; **Firehose** = managed batch delivery to S3/OpenSearch for analytics; **AppSync subscriptions** = the live push to the agent UI; **Bedrock** = insight/next-best-action.
**Scale/reliability:** shard by contactId (spread hot calls), enhanced fan-out for multiple consumers, DLQ + replay from stream, idempotent Lambda.
**Security:** PII redaction at Transcribe, KMS on S3, tenant scoping on the subscription auth (Cognito/IAM), field-level authz in AppSync.
**Trade-offs:** Data Streams (control + latency, you manage shards) vs Firehose-only (simpler, higher latency — no good for live dashboard). Use **both**. **[anchor: OpenSearch + Athena from UTEC; React for the dashboard]**

### Design 3 — Multi-tenant claims / notification service for embedded-insurance partners

**Clarify:** how many partners/tenants? notification channels (email/SMS/push/webhook)? throughput + burst? ordering/exactly-once needs? per-tenant rate limits? isolation level per partner?

**HLD (event-driven serverless):**
```
Partner event (claim filed / status change)
        │
   API Gateway (per-tenant API key + throttle) ──► Lambda (validate, tenant-scope)
        │
   EventBridge bus (rules route by eventType + tenant) 
        │                    │                         │
   SQS (claims queue)   SNS (fan-out notifications)   DynamoDB (claim state, PK=tenant#claimId, Streams)
        │                    │
   Lambda workers      SES / SNS-SMS / partner webhook (with retry + DLQ)
```
**Data model:** DynamoDB single-table, PK = `TENANT#<id>`, SK = `CLAIM#<id>` / `NOTIF#<ts>`; GSI on status for "all open claims per tenant"; **Streams** → downstream analytics/notifications.
**Scale/reliability:** SQS buffers spikes + retry + DLQ; EventBridge decouples + filters; idempotency table for exactly-once effects; per-tenant reserved concurrency to prevent a noisy tenant starving others.
**Security/multi-tenancy:** tenant derived from API key/JWT (never client body); DynamoDB `LeadingKeys` IAM condition; per-tenant DLQ + alerting; encrypt PII (claim data) with KMS.
**Trade-offs:** SNS fan-out (simple broadcast) vs EventBridge (content routing + schema + replay) → EventBridge as the backbone, SNS for pure notification fan-out. Pool tenancy (cost) vs silo (isolation) → pool + hard scoping, escalate to silo for large/regulated partners. **[anchor: UTEC async processing + SNS/SQS; nested CFN for per-tenant stacks]**

---

## 8. Coding Round

**Likely format:** JS/TS + Node. Medium difficulty — arrays/strings/hashmaps + **practical async/API tasks**, possibly a small Lambda-style handler or a data-transformation problem (your P&G migration is literally this). Less likely to be LeetCode-hard for a senior contract role; more likely "write clean, correct, tested code and explain trade-offs."

| # | Problem | Approach / key points |
|---|---|---|
| 1 | **Two-sum / group anagrams / first non-repeating char** | HashMap for O(n); state you're trading space for time. |
| 2 | **`Promise.all` with concurrency limit (pool of N)** | Worker-pool: array of N runners pulling from a shared index; or `p-limit` pattern. Explain why unbounded `Promise.all` on 10k items kills memory / rate limits. **[anchor: P&G parallel fetch optimization]** |
| 3 | **Retry with exponential backoff + jitter** | `for` loop with `attempt`, `await sleep(base * 2**i + random)`, cap retries, rethrow last error; only retry idempotent/transient failures. |
| 4 | **Debounce & throttle** | Debounce = fire after quiet period (`clearTimeout`/`setTimeout`); throttle = at most once per interval (timestamp gate). Know the difference cold — classic question. |
| 5 | **Deep clone (handle nested + circular)** | Recursion + `WeakMap` for cycles; or `structuredClone` and explain when it fails (functions, DOM). |
| 6 | **Rate limiter (token bucket / sliding window)** | Token bucket: refill rate + capacity; sliding window log/counter. Frame it as API Gateway / per-tenant throttling. |
| 7 | **Small Lambda-style handler** | `async (event) => {}`: parse/validate input, call a mocked service, return `{statusCode, body}`; handle errors → proper status; make it idempotent. Talk about testing it (inject deps, mock SDK). |
| 8 | **DynamoDB access-pattern design** | Given "get all open claims for a tenant, get a claim by id, list notifications by time" → single-table: PK=`TENANT#id`, SK=`CLAIM#id`/`NOTIF#ts`, GSI on status. Explain why not Scan. |
| 9 *(bonus)* | **Flatten/transform nested API payload** (BigCommerce→Shopify shape) | Recursion + mapping; streaming for large sets. **[anchor: P&G data-mapping logic]** |

**Interview behavior:** narrate approach → clarify constraints/edge cases → code → walk a test case → state complexity → mention how you'd test it. Write TypeScript if allowed; use meaningful names.

---

## 9. Behavioral / STAR

> Tight STAR, mapped to bolttech's stated values: **speed-to-market, Agile/Lean, fast-paced international, results-oriented, continuous learning, stakeholder management.** Numbers are from your resume/profile — keep them consistent.

**1. Ship an MVP fast (speed-to-market)** — *P&G Olay migration*
**S:** P&G needed a BigCommerce→Shopify storefront migration on a tight window. **T:** Build reliable high-volume data migration fast without data loss. **A:** Designed Azure Functions with **batch + parallelism**, implemented BigCommerce v2/v3 + Shopify GraphQL, wrote schema-mapping logic. **R:** **50% faster processing, 100% data consistency, -40% API response time** — shipped on time. *→ "That's the speed-to-market + integration discipline embedded insurance needs."*

**2. Production incident I resolved (prod support / ownership)** — *Vkonnect / UTEC*
**S:** Main product uptime was at risk under load. **T:** Get to and hold **99.99% uptime**. **A:** Migrated EC2→Lambda for elasticity, optimized MongoDB/MySQL queries, added monitoring, tuned async processing. **R:** 99.99% uptime, higher CSAT. *→ Frame the debugging method from §6H: logs→layers→hypothesis→mitigate→root-cause.*

**3. GenAI / agentic build (the flagship)** — *EY Risk.ai* **[anchor]**
**S:** EY's internal-audit AI agents ran on GPT-4 and needed better quality + a model upgrade. **T:** Move agents GPT-4→GPT-5.1 and lift response quality without regressions. **A:** **Re-architected the prompt infrastructure** (system-level prompt tuning, context management, structured testing), updated the React/Node UI to user stories. **R:** **+20% agent response quality.** *→ "This is exactly bolttech's GenAI-Factory problem: prompt/context engineering + evals on an agentic system. Same patterns, Bedrock instead of OpenAI."*

**4. Scaling under load** — *UTEC (6M+ users)* **[anchor]**
**S:** UTEC is a large-scale construction/dealer platform (6M+ users, 110-member program). **T:** Keep it fast + scalable. **A:** Architected serverless (Lambda/EC2/S3/OpenSearch), **nested CloudFormation** stacks, OpenSearch for search, Redis caching. **R:** **-30% query time, -25% latency, -40% deploy time.** *→ Multi-market platform scale credibility.*

**5. Security win** — *UTEC VAPT* **[anchor]**
**S:** UTEC handled sensitive dealer/business data. **T:** Harden the backend. **A:** Conducted **VAPT**, implemented security protocols (least-privilege IAM, input validation, secrets handling) against OWASP risks. **R:** Secure, reliable backend passing audit. *→ "For insurance PII in call transcripts this mindset is table-stakes — redaction, KMS, tenant isolation."*

**6. Cross-functional / stakeholder conflict** — *P&G / EY client work*
**S:** Client (P&G/EY) requirements shifted mid-sprint; eng and product disagreed on scope vs deadline. **T:** Deliver value without blowing the timeline. **A:** Facilitated a scope conversation, proposed a phased MVP-first cut, aligned product + eng on the smallest shippable increment, communicated trade-offs clearly. **R:** Shipped on time, deferred nice-to-haves. *→ "Stakeholder management + Lean prioritization."* (Pick the real instance and tell it concretely.)

**7. Adapting to new tech quickly (continuous learning)** — *Asurion Japan / GPT-5.1*
**S:** Joined the **Asurion Japan** project (device protection / contact-center domain) needing to ramp fast; separately had to master GPT-5.1's new prompt behavior. **T:** Become productive quickly. **A:** Self-directed learning + workshops, paired with the team on workflows, applied it immediately. **R:** Contributing within the ramp window. *→ "This is exactly how I'll close the Amazon Connect gap — I ramp fast and I've been in your device-protection domain already."*

**8. Mentorship / quality culture** — *UTEC*
**S:** 110-member UTEC program, quality bar under pressure. **A:** Mentored juniors, enforced standards via **code reviews**, was on the Quality team (Best Team recognition). **R:** Fewer defects, higher-quality deliverables. *→ Senior signal: I lift the team, not just my tickets.*

---

## 10. Questions I Should Ask (per stage)

**To the recruiter (Multivision):**
- Which bolttech team, market, and product does this support — device protection, exchange, or a new market? Remote/hybrid, and which time zone?
- Contract vs C2H vs perm, length, and the conversion path? Who employs and payrolls me?
- Exact interview loop, interviewers, and timeline to offer?
- Is there flexibility on the bill rate, and what's expected on notice period?

**To the technical panel (bolttech engineers):**
- Where are you on the GenAI Factory rollout — still Connect + Lex + Bedrock, and how far past the Korean speech-to-speech pilot? Which markets are live?
- How is **agent-assist** implemented today — Amazon Q in Connect, or custom Bedrock Agents on top of Contact Lens?
- What's your **multi-tenant model** across 37 markets — pooled with scoping, or siloed for regulated markets? How do you handle data residency + PII in transcripts?
- Terraform for everything, or CloudFormation anywhere? What's the CI/CD path (Bitbucket Pipelines → which environments)?
- What does the custom **agent desktop** look like — Connect Streams API + React, AppSync for live data?

**To the manager / architect:**
- What does "senior" own here — a slice of the platform end-to-end, or feature delivery within someone else's architecture?
- What's the biggest reliability/latency challenge on real-time voice + GenAI today?
- How do you balance **speed-to-market POCs** against production hardening — what's the bar to promote a POC?
- What would make someone a standout in the first 90 days on this team?
- How does an embedded contractor influence architecture decisions vs execute them?

---

## 11. 7-Day Prep Plan + Gap-Closing

> Weighted to gaps: **AWS Connect, Lex/Polly/Transcribe, Kinesis, AppSync, WebRTC, Terraform.** For each gap: skim one good source, then be able to say **the one confident sentence.**

| Day | Focus | Do | The one thing to say confidently |
|---|---|---|---|
| **1** | **AWS Connect core** | Skim AWS Connect Admin Guide (flows, queues, routing profiles, CCP, CTR) + one "Connect architecture" blog. Watch a 20-min flow-designer demo. | *"A contact flow is a visual state machine that can invoke Lex and Lambda, set attributes, and route to queues; CTRs stream out via Kinesis for analytics."* |
| **2** | **Contact Lens + Amazon Q in Connect + Lex** | AWS docs: [Amazon Q in Connect](https://docs.aws.amazon.com/connect/latest/adminguide/amazon-q-connect.html); Lex intents/slots/fulfillment. | *"Contact Lens gives real-time transcript + sentiment; Amazon Q in Connect uses it to push agent-assist recommendations. Lex handles NLU with intents/slots and Lambda fulfillment."* |
| **3** | **Polly + Transcribe + Kinesis** | Skim Polly SSML/neural, Transcribe streaming + PII redaction, Kinesis Data Streams vs Firehose. | *"Transcribe streams STT with PII redaction; Polly does neural TTS with SSML; Kinesis Data Streams for low-latency real-time, Firehose for managed delivery to S3/OpenSearch."* |
| **4** | **AppSync + WebRTC + bolttech GenAI Factory** | AppSync GraphQL subscriptions tutorial; WebRTC ICE/STUN/TURN overview; re-read the [bolttech AWS press release](https://press.aboutamazon.com/sg/aws/2025/5/bolttech-powers-generative-ai-driven-hyper-personalized-customer-services-on-aws). | *"AppSync subscriptions push live transcript/sentiment to a React agent dashboard; Connect's browser softphone uses WebRTC (STUN for NAT, TURN to relay)."* |
| **5** | **Bedrock GenAI + map EY story** | Skim Bedrock: Knowledge Bases (RAG), Agents (tool-calling), Guardrails. Rehearse EY Risk.ai as a Bedrock story. | *"I'd build the claims agent with Bedrock Agents + Knowledge Bases for RAG and Bedrock Guardrails for PII/safety — same prompt/context/eval patterns I ran at EY, just on Bedrock."* |
| **6** | **Terraform + DynamoDB + Bitbucket** | Terraform: state/remote backend + lock table, plan/apply, modules. DynamoDB single-table drills. Bitbucket Pipelines YAML. | *"I'm deep in CloudFormation (nested stacks); Terraform's model — remote state in S3 + DynamoDB lock, plan/apply, modules — maps directly and I ramp fast."* |
| **7** | **System design + coding + STAR rehearsal** | Whiteboard all 3 designs in §7 out loud (timed). Do 4 coding problems from §8. Say all 8 STAR stories tight. | *"I can whiteboard the Connect + Lex + Bedrock + Kinesis + AppSync contact center end to end and defend the trade-offs."* |

**Daily discipline:** each day, re-read the relevant §6 subsection and speak the answers aloud — recognition ≠ recall under interview pressure.

---

## 12. Red Flags / Watch-Outs

**Staff-aug specifics:**
- **Rate transparency:** Multivision keeps a margin between what bolttech pays and what you get — normal, but **know your net and the contract term before agreeing.** Ask whether the rate is negotiable on the bill rate.
- **Which entity + one-sided contracts:** confirm the exact legal entity (US Multivision Inc. vs Multivision Consulting) and country of payroll. Reviews flag a *"2-year one-sided contract"* — **read lock-in, notice, and any penalty/bond clause carefully.** ([Indeed reviews](https://www.indeed.com/cmp/Multivision/reviews))
- **Who I actually report to:** day-to-day should be a **bolttech** lead. If it's ambiguous, career growth + advocacy suffer.
- **Backfill / bench risk:** embedded-insurance projects can slip; ask what happens if the bolttech project pauses — do you get benched, redeployed, or released?
- **Conversion path:** if you'd want to go perm at bolttech eventually, ask about the C2H terms and any no-poach/buyout clause.

**Interview watch-outs:**
- **Don't fake Connect experience.** bolttech engineers will smell it. Say "architecture yes, production hands-on not yet, ramp fast" — confidence + honesty beats bluffing.
- **Resume vs profile drift:** your resume shows **MongoDB/MySQL (not DynamoDB)** and **CloudFormation (not Terraform)**, and lists **Azure Functions for P&G**. If your talking points claim DynamoDB/Terraform depth, they may probe — keep claims consistent with what you can defend. Prefer "adjacent + ramping" over overclaiming.
- **GenAI is your edge — don't undersell it.** Many candidates will have Connect but not real production LLM/agentic experience. Lead with EY Risk.ai.
- **Time-zone / international:** JD stresses "fast-paced international." Confirm working hours (SG/Korea overlap) so it's not a surprise.

---

## 13. Sources

**Company — bolttech**
- AWS/bolttech press release — GenAI Factory on Bedrock + Connect + Lex + Nova, speech-to-speech Korean pilot, agentic AI: https://press.aboutamazon.com/sg/aws/2025/5/bolttech-powers-generative-ai-driven-hyper-personalized-customer-services-on-aws
- bolttech news (same announcement): https://bolttech.io/news/bolttech-powers-generative-ai-driven-hyper-personalized-customer-serviceson-aws/
- TechCrunch — $147M Series C, $2.1B valuation, embedded insurance: https://techcrunch.com/2025/06/04/singapore-based-insurtech-bolttech-closes-147m-series-c-at-a-2-1b-valuation/
- Finovate — $147M raise at $2.1B: https://finovate.com/insuretech-company-bolttech-raises-147-million-at-a-2-1-billion-valuation/
- Crunchbase — funding total/rounds: https://www.crunchbase.com/organization/bolttech
- Tracxn — company profile/financials: https://tracxn.com/d/companies/bolttech
- Life Insurance International — AWS GenAI + mTek/ING context: https://www.lifeinsuranceinternational.com/news/bolttech-integrates-aws-gen-ai/
- Glassdoor — interview/employee signal: https://www.glassdoor.co.in/Overview/Working-at-bolttech-EI_IE4395768.11,19.htm
- Careers: https://bolttech.io/careers/

**Vendor — Multivision**
- Multivision Consulting (LinkedIn you shared): https://in.linkedin.com/company/multivisionconsulting
- Multivision Inc. (US, est. 1998, staff-aug/offshore): http://www.multivision-inc.com/
- Multivision India jobs portal: http://www.multivisionjobs.in/
- Indeed reviews (process + contract concerns): https://www.indeed.com/cmp/Multivision/reviews
- Glassdoor reviews: https://www.glassdoor.co.in/Reviews/Multivision-Reviews-E422854.htm

**Technical — AWS Connect + GenAI contact center**
- Amazon Q in Connect (agent-assist, Contact Lens dependency): https://docs.aws.amazon.com/connect/latest/adminguide/amazon-q-connect.html
- New generative AI features in Amazon Connect (incl. Amazon Q): https://aws.amazon.com/blogs/aws/new-generative-ai-features-in-amazon-connect-including-amazon-q-facilitate-improved-contact-center-service/
- Increasing agent productivity with GenAI in Amazon Connect: https://aws.amazon.com/blogs/contact-center/increasing-agent-productivity-with-generative-ai-in-amazon-connect/
- Well-Architected Generative AI Lens — Autonomous call center: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/autonomous-call-center.html
- Amazon Connect 2025 AI/omnichannel overview: https://www.cmswire.com/contact-center/amazon-connects-new-era-ai-omnichannel-support-and-enhanced-security/

**Notes:** Market count varies by source (37 in the AWS press release, ~35–39 elsewhere) — use **~37**. Exact bolttech India office location for this role, and which Multivision legal entity contracts you, are **unverified** — confirm both with the recruiter.

---

*End of prep file. Run the §11 plan, rehearse §6/§7/§9 out loud, and confirm the loop + entity + rate with Multivision before round 1.*
