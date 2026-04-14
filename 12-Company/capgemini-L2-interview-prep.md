# 🏢 Capgemini L2 Interview – Complete Preparation Guide

> **Candidate:** Onkar Mahesh Sawant  
> **Role:** Senior Software Engineer (Node.js / React / AWS)  
> **Experience:** 5+ years Full Stack  
> **Primary Stack:** Node.js, React.js, TypeScript, AWS, MySQL, MongoDB, Redis, OpenSearch  
> **Interview Type:** L2 — Deep Technical + Managerial + Scenario-Based

---

## TABLE OF CONTENTS

1. [L2 Interview Breakdown & Strategy](#1-l2-interview-breakdown--strategy)
2. [TODO Preparation Checklist](#2-todo-preparation-checklist)
3. [Self Introduction](#3-self-introduction)
4. [Resume & Project Defense (CRITICAL)](#4-resume--project-defense)
5. [Project Deep-Dive Cross-Questioning](#5-project-deep-dive-cross-questioning)
6. [Node.js – Deep Technical Q&A](#6-nodejs--deep-technical-qa)
7. [React.js – Technical Q&A](#7-reactjs--technical-qa)
8. [JavaScript – Tricky Output & Concepts](#8-javascript--tricky-output--concepts)
9. [TypeScript – Key Questions](#9-typescript--key-questions)
10. [AWS – Architecture & Cloud Q&A](#10-aws--architecture--cloud-qa)
11. [Database – MySQL, MongoDB, Redis, OpenSearch](#11-database--mysql-mongodb-redis-opensearch)
12. [System Design & Architecture](#12-system-design--architecture)
13. [Scenario-Based Problem Solving (MOST IMPORTANT)](#13-scenario-based-problem-solving)
14. [DSA / Coding Questions](#14-dsa--coding-questions)
15. [Behavioral & Managerial Questions](#15-behavioral--managerial-questions)
16. [Questions to Ask the Interviewer](#16-questions-to-ask-the-interviewer)
17. [Last 2 Days Revision Plan](#17-last-2-days-revision-plan)
18. [Quick Revision Cheatsheet](#18-quick-revision-cheatsheet)

---

## 1. L2 Interview Breakdown & Strategy

### What is Capgemini L2?

Based on Glassdoor (551+ SSE interviews, 2025-2026) and candidate experiences:

| Aspect | Details |
|--------|---------|
| **Difficulty** | 2.9/5 (Moderate) |
| **Experience** | 65% positive |
| **Avg Hiring Time** | 15 days |
| **Format** | 1 virtual/online round + 1 face-to-face |
| **Rounds** | Technical L1 → **Technical L2 (Deep)** → HR |

### L2 Round Characteristics (vs L1)

| L1 (Screening) | L2 (Your Round) |
|----------------|-----------------|
| Basic concepts, syntax | **WHY you chose something, trade-offs** |
| "What is X?" | **"You used X — what problems did you face?"** |
| Textbook answers OK | **Real-world project stories required** |
| 30-45 min | **60-90 min** |
| Junior/mid interviewer | **Senior architect/manager interviewer** |

### What L2 Panelists Evaluate (Glassdoor April 2026)

1. **Past project experience** — your specific role, decisions, impact (THIS IS #1)
2. **Real-time scenario handling** — "API latency spikes, what do you do?"
3. **Core skills** — REST APIs, database concepts, problem-solving
4. **Architecture thinking** — Why this tech? What trade-offs?
5. **Leadership signals** — mentoring, code reviews, ownership
6. **Communication** — can you explain complex things clearly?

### Common Rejection Reasons (from Glassdoor/Reddit)

- ❌ Shallow answers without project context ("I know Redis" vs "I used Redis for X because...")
- ❌ Can't explain WHY behind technology choices
- ❌ No clear ownership in projects (sounds like "I was just a team member")
- ❌ Poor system design thinking
- ❌ Can't handle cross-questioning ("But what if X fails?")
- ❌ Extra round added after HR if tech wasn't convincing enough

### Your Interview Strategy

1. **Lead with stories, not definitions** — Every answer should start with "In my project..."
2. **Own the numbers** — 50% faster, 30% reduction, 99.99% uptime
3. **Volunteer trade-offs** — "We chose X over Y because..."
4. **Have a debugging story ready** — They WILL ask "Tell me about a production issue"
5. **Be ready for "Why not?"** — Why not MongoDB? Why not serverless? Why not GraphQL?

---

## 2. TODO Preparation Checklist

### A. L2 Interview Strategy
- [ ] Practice self-introduction (90 seconds, out loud)
- [ ] Prepare elevator pitch for each project (30 seconds each)
- [ ] List your top 3 technical decisions and WHY
- [ ] Prepare 1 debugging/production-issue story

### B. Resume & Project Defense
- [ ] UTEC (Iprogrammer) — full architecture walkthrough
- [ ] P&G Olay (LTIMindtree) — BigCommerce→Shopify migration
- [ ] EY Risk.ai (LTIMindtree) — AI agent upgrade story
- [ ] Vkonnect Health (Reapmind) — EC2→Lambda migration
- [ ] Cross-questioning on each project (trade-offs, alternatives, failures)

### C. Core Technical Topics
- [ ] Node.js: Event loop, streams, cluster vs workers, memory leaks
- [ ] React: Hooks, re-render optimization, virtual DOM, custom hooks
- [ ] JavaScript: Closures, promises, event loop,  output prediction
- [ ] TypeScript: Generics, utility types, narrowing

### D. Scenario-Based Problem Solving
- [ ] API latency debugging
- [ ] Database slow query resolution
- [ ] Cache inconsistency handling
- [ ] Production service failure response
- [ ] Rate limiting implementation

### E. System Design & Architecture
- [ ] URL shortener design
- [ ] Real-time notification system
- [ ] UTEC system architecture (your project)
- [ ] Scaling from 1K → 1M users

### F. Coding / DSA
- [ ] Two Sum (HashMap)
- [ ] Debounce/Throttle polyfill
- [ ] Flatten array
- [ ] Promise.all polyfill

### G. Behavioral / Managerial
- [ ] "Tell me about yourself"
- [ ] "Why Capgemini?"
- [ ] "Conflict with team member"
- [ ] "Time you failed"
- [ ] "Why are you leaving?"

---

## 3. Self Introduction

> 90 seconds. Practice out loud.

"Good morning! I'm Onkar Sawant, a Senior Software Developer with over 5 years of experience building scalable backend systems, primarily with Node.js, React.js, TypeScript, and AWS.

Currently at **LTIMindtree**, I'm working on two key projects:

**P&G Olay** — where I designed Azure Functions for high-volume e-commerce data migration from BigCommerce to Shopify, achieving 50% faster processing and 40% reduction in API response times through parallel fetch optimizations.

**EY Risk.ai** — where I upgraded AI agents from GPT-4 to GPT-5.1, revamping the prompt infrastructure and improving agent response quality by 20%.

Before this, at **Iprogrammer Solutions**, I spent nearly 3 years leading backend development for **UTEC** — UltraTech's construction management platform. I architected the AWS infrastructure using Lambda, EC2, S3, and OpenSearch, improved search performance by 30%, and cut database latency by 25% with Redis optimization.

I'm passionate about building systems that scale, and I thrive in roles where I can take architectural ownership and mentor team members. I'm excited about Capgemini's enterprise-scale digital transformation projects and believe my backend-heavy, cloud-native experience would be a strong fit."

---

## 4. Resume & Project Defense (CRITICAL)

> **This is the #1 section Capgemini L2 evaluates.** Know every bullet point on your resume cold.

---

### PROJECT 1: UTEC by UltraTech (Iprogrammer Solutions, Dec 2021 – Sept 2024)

> **UTEC** is UltraTech Cement's digital home-building platform connecting IHBs (Individual Home Builders) with partners (architects, engineers, contractors, dealers/retailers). 110-person team, serving thousands of construction sites across India. I was the **Senior Node.js Developer** leading backend development for nearly 3 years.

---

#### Q: Walk me through the UTEC architecture.

> **Interview tip:** Start with a 30-second elevator pitch, then go deep only if they ask.

**A (Short version — use this first):** "UTEC is UltraTech Cement's digital home-building platform connecting Individual Home Builders with construction partners — architects, engineers, contractors, and dealers — across India. I led the backend as Senior Node.js Developer for nearly 3 years on a 110-person team. The architecture is fully serverless on AWS — 245+ Lambda functions organized as nested CloudFormation stacks, with MySQL, MongoDB, Redis, OpenSearch, and 10+ third-party integrations."

**A (Deep version — if they say "tell me more"):** "Here's what I actually built and managed:

**Two SAM Projects — clear separation of concerns:**
1. **`utec-microservices`** — The core API backend with **245+ Lambda functions** organized as **5 nested CloudFormation stacks**:
   - `PartnerProfilesStack` (~50 functions) — Partner profiles, store management, approval workflows
   - `UserProfilesStack` (~43 functions) — IHB profiles, home-building stages, favourites
   - `AdminPanelServiceStack` (~26 functions) — Admin panel CRUD, notification management
   - `V1CcpStack` (~39 functions) — Contact Center Platform / Knowlarity telephony
   - `UtecGeographyStack` (~7 functions) — Pincode/geography management
   - Plus ~80+ functions at root level (eKYC, QR engine, style quiz, search, WebSocket, etc.)

2. **`backend-lambdas`** — ~70+ Lambda functions for **background/event processing**: Cognito triggers (custom OTP auth), S3 thumbnail generation, watermarking, PDF generation, CleverTap sync, Athena reporting, SQS processing, payment webhooks.

3. **`service-notification-engine`** — A standalone SAM app I built: **17 Lambda functions** for multi-channel notifications (Push/SMS/Email/WhatsApp) with priority-based SQS routing.

**Tech Stack:**
- **API Layer:** Node.js REST APIs behind AWS API Gateway with Lambda REQUEST authorizer (JWT + Redis-cached permissions)
- **Databases:** MySQL (RDS + Read Replicas) via Sequelize ORM + raw `mysql2` for stored procedures | MongoDB/DocumentDB for notification logs and change history | Redis (ElastiCache cluster) for caching
- **Search:** Migrated from Apache Solr → AWS OpenSearch (4 indexes: ihb, expert, dealer, nspartner) with geo_point queries
- **Storage:** S3 with presigned URLs for secure uploads, CloudFront CDN for downloads
- **Infrastructure:** Nested CloudFormation stacks (to overcome 500-resource limit), environment-specific Lambda Layers for config, RDS Proxy, VPC with conditional provisioning
- **Integrations:** Knowlarity (telephony), Firebase FCM (push), mTalkz (SMS), AWS SES (email), Yellow.ai (WhatsApp), Spring Verify (eKYC), AuthBridge, PayU (payments), CleverTap (analytics), AWS Polly (text-to-speech)
- **Scale:** 110-person team, 5 environments (test, stage, preprod, prod, production)
- **SDLC:** Jira for task tracking, Git branching per environment, code reviews mandatory, SAM CLI for local testing (`sam local invoke`), CloudFormation deployments via `sam deploy` with `samconfig.toml` per environment"

---

#### Q: What were the MAJOR features YOU personally built at UTEC?

> **Interview tip:** Don't list all 9 features at once. Lead with your top 3 (Notification Engine, OpenSearch Migration, Nested Stacks), then say "I also built..." if time allows.

**A:** "The three biggest things I owned were: (1) a standalone multi-channel notification engine I built from scratch, (2) the full search infrastructure migration from Solr to AWS OpenSearch, and (3) the nested CloudFormation stack architecture that let us scale past 245 Lambda functions. Beyond that, I built the presigned URL service, led VAPT security fixes, authored 100+ stored procedures, built the call center module, eKYC verification, and several other features. Let me walk through the key ones:

---

### FEATURE 1: Notification Engine (service-notification-engine) — Built from Scratch

> This was a **greenfield project** I designed and built — a standalone multi-channel notification platform.

**Architecture:**
```
API Request (POST /sendNotifications)
    │
    ▼
sendNotificationV2 Lambda
    │ → Validates via Joi schema
    │ → Calls MySQL SP `sendNotification` → gets templates + user preferences + profile
    │ → Formats templates with $(variable) substitution
    │ → Determines active channels per user preferences
    │
    ▼
publishNotification() → SNS Topic (HIGH or LOW priority)
    │
    ├── HIGH Priority SNS → SQS (BatchSize=10, no delay)
    │     ├── Push (FCM) Lambda
    │     ├── SMS (mTalkz) Lambda
    │     ├── Email (SES) Lambda
    │     └── WhatsApp (Yellow.ai) Lambda
    │
    └── LOW Priority SNS → SQS (BatchSize=100, 45s batching window)
          ├── Push Lambda
          ├── SMS Lambda
          ├── Email Lambda
          └── WhatsApp Lambda
    │
    ▼
Each channel Lambda → SQS → createUsersNotificationLogs → MongoDB (delivery logs)
Push failures → SQS → markInvalidFcmDevices → deactivates tokens in MySQL
Email bounces → SNS → handleEmailBounce Lambda
```

**Key technical decisions:**
- **Priority-based routing** — OTPs/login go to HIGH priority (instant delivery, SQS batch=10). General notifications go LOW priority (batch=100, 45s window to reduce Lambda invocations and costs)
- **4 Firebase apps** — IHB, Partner, BuyerApp, SellerApp — initialized separately with `admin.initializeApp`, routed by platform
- **Template management** — Templates stored in MySQL, fetched via stored procedure. Variable substitution: `$(userName)`, `$(otp)`, etc.
- **WhatsApp via Yellow.ai** — Template-based messages with params, media attachments, scheduling
- **SMS via mTalkz** — Indian SMS gateway with unicode support, shortlinks, separate OTP API key
- **Email SES** — Source: `utec.care@utecbuild.com`, bounce handling via SNS topic
- **FCM token lifecycle** — Invalid tokens auto-deactivated, preventing wasted push calls
- **MongoDB for logs** — DocumentDB for delivery audit trail (separate from main MySQL DB)

**Cross-questioning prep:**
- *Why SNS → SQS and not direct invocation?* — Decoupling. If email Lambda fails, SMS still goes. SNS fan-out ensures all channels process independently. SQS provides retry with DLQ.
- *Why not direct SQS per channel?* — SNS fan-out eliminates the need for the controller to know about all queues. Adding a new channel = add a subscription, no code change.
- *Why MongoDB for logs instead of MySQL?* — Write-heavy, append-only, schema flexibility (different channels have different response fields). MongoDB handles document-level writes better for this pattern.
- *Cost concern?* — Actually analyzed DocumentDB I/O costs: $922.60/month for 4.19B I/Os. Identified `notification_queues` growing ~200K records/3-4 months. Optimized by reducing unnecessary reads.

---

### FEATURE 2: OpenSearch Migration (Solr → AWS OpenSearch)

> Migrated the entire search infrastructure from self-hosted Apache Solr to AWS-managed OpenSearch.

**What I migrated:**
- **4 OpenSearch indexes:** `ihb` (Individual Home Builders), `expert` (architects/engineers/contractors), `dealer` (dealer/retailers), `nspartner` (not-selected partners)
- **Service Request index** — Admin panel listing with 60+ fields, complex geographic hierarchy (zone→state→region→depot→district→taluka→city→county→pincode)
- **Content search** — Posts, events, articles with persona-based filtering

**Technical implementation:**
1. **Index mappings with geo_point** — Enabled proximity-based search ("Find contractors within 10km"):
```json
{
  "mappings": {
    "properties": {
      "location": { "type": "geo_point" },
      "name": { "type": "text", "analyzer": "custom_edge_ngram" },
      "profession": { "type": "keyword" }
    }
  }
}
```

2. **Custom edgeNGram analyzer** — For autocomplete/typeahead on partner names and locations:
   - Built `custom_edge_ngram` analyzer with shingle tokenizer for prefix matching
   - `service_availability_management` index with specialized analyzers

3. **Dual-index management** — When a partner changes profession (e.g., contractor → dealer), auto-delete from `expert` index and re-index into `dealer` index

4. **OpenSearch client with AWS IAM auth** — Used `@opensearch-project/opensearch` + `aws-opensearch-connector` for Sigv4 authentication

5. **Bulk data migration** — Wrote SQL extraction queries (60+ field joins) → batch curl uploads. 38+ batch files for preprod alone.

6. **Hybrid transition** — Maintained Solr `readSolr/createSolr/updateSolr` alongside new OpenSearch `search/search2/update/delete/suggest` during migration window

**Result:** 30% faster query times, managed service (no Solr server maintenance), geo_distance searches that weren't possible before.

**Cross-questioning prep:**
- *Why OpenSearch over Elasticsearch?* — AWS-managed, IAM-integrated, no cluster management overhead. Same API compatibility.
- *How did you handle zero-downtime migration?* — Dual writes to both Solr and OpenSearch during transition. Switched reads to OpenSearch once verified. Then decommissioned Solr.
- *What about the slow admin panel?* — Admin SR listing was doing MySQL queries with 60+ fields, multiple JOINs, LIKE conditions. Moving to OpenSearch with keyword fields and pre-indexed data made filtering instant.

---

### FEATURE 3: Nested CloudFormation Stacks Architecture

> CloudFormation has a **500 resource limit per stack**. With 245+ Lambda functions + API Gateway + roles + SQS queues, we'd blow past this. I designed the nested stack architecture.

**Architecture:**
```
template.yml (Root Stack)
├── PartnerProfilesStack  → partnerProfile-template.yml
├── UserProfilesStack     → userProfile-template.yml
├── AdminPanelServiceStack → adminPanelService-template.yml
├── V1CcpStack            → v1Ccp-template.yml
├── UtecGeographyStack     → utecGeography-template.yml
├── Shared Resources:
│   ├── UtecMicroApi (API Gateway)
│   ├── lambdaExecutionRole (shared IAM role)
│   ├── CommonCodeLayer (business logic)
│   ├── FileOperationLayer (Puppeteer/Chromium for PDFs)
│   ├── 5x environment-specific config Layers
│   ├── SQS Queues (favourites, backend requests, TFA)
│   └── Root-level Lambda functions (~80+)
```

**Key design decisions:**
- **Domain-based splitting** — Partner, User, Admin, CCP, Geography are logical domains → each gets its own stack
- **Shared API Gateway** — Root stack creates the API, nested stacks reference it via `!GetAtt UtecMicroApi.RootResourceId`
- **Shared Lambda Authorizer** — `AUTHFUNCTIONARN` parameter passed to all nested stacks
- **Environment-conditional resources** — VPC attachment, config layers, etc. toggle via CloudFormation Conditions: `IsVPCNeeded`, `CreateProdResources`, `CreatePreprodResources`
- **Lambda Layer strategy** — `CommonCodeLayer` (shared libs, DB utils) applied to ALL functions. `FileOperationLayer` (Puppeteer/Chromium, 1.6GB) only to PDF generation functions. Config layers are conditional per environment.

**Migration process (from single stack):**
- Created new nested stack with different stack name
- Updated `samconfig.toml` with new stack name and parameters
- Managed API Gateway domain remapping for main + images + websocket endpoints
- Manually cleaned up ~100+ old Lambda functions from preprod
- Zero-downtime: created new stack → validated → switched domain → deleted old

**Result:** Reduced deployment time by 40%, overcame 500-resource limit, enabled independent stack updates (deploy just partner changes without touching CCP).

---

### FEATURE 4: Presigned URL Service (S3 Secure Upload)

> Built a centralized secure file upload system used by 30+ endpoints across the platform.

**How it works:**
```
Client → Lambda (getPresignedURL) → Generates S3 PUT presigned URL (5-min expiry) → Client uploads directly to S3
```

**Key implementation details:**
- **Endpoint-based bucket routing** — Different endpoints upload to different S3 buckets:
  - Admin panel images → `UTEC_CONTAINER` bucket
  - User profile pics/posts → `USER_GEN_ASSETS` bucket
  - Auto-assignment data → `POLARIS` bucket
- **File extension whitelist** — Enforced per endpoint (prevents arbitrary file uploads — VAPT requirement)
- **3 access variants** — `index.js` (standard auth), `indexAuth.js` (admin auth with `getAdminId()` DB lookup), `indexNoAuth.js` (public endpoints)
- **Metadata tagging** — Each upload tagged with `isAdmin`, `platformSource`, `userId`, `platformId` for audit
- **Post-upload processing** — `move-s3-files` Lambda (SQS-triggered) moves files from `temp/` prefix to final location using `CopyObjectCommand`

**Cross-questioning prep:**
- *Why presigned URLs instead of uploading through your API?* — Avoids Lambda memory/timeout limits for large files. Client uploads directly to S3. Lambda just generates the secure URL.
- *Security?* — URL expires in 5 minutes. File extension whitelist. Content-Type validation. S3 bucket policies restrict public access.

---

### FEATURE 5: VAPT (Vulnerability Assessment & Penetration Testing)

> Conducted VAPT testing and fixed all reported vulnerabilities across the platform.

**What I implemented:**

1. **Input Sanitization Framework (Joi custom types):**
   - `htmlStrip()` — Removes ALL HTML tags using `sanitize-html` library (prevents XSS stored attacks)
   - `csvSanetize()` — Removes `()` and strips `= @ + -` prefixes from cell data (prevents CSV injection / DDE attacks)
   - `csvInjection()` — Regex-based CSV injection detection
   - `reqSanitize()` — Middleware that strips HTML from `body`, `queryStringParameters`, `pathParameters` using `(<([^>]+)>)` regex
   - `unescape()` — Lodash unescape for encoded entities
   - `sanetize()` — Strips `| & ; $ % @ " < > ( ) + ,` characters from inputs
   - Custom date validation, range validation, file extension validation

2. **Lambda Authorizer Security:**
   - JWT RS256 token validation
   - Redis-cached admin permissions with role-based access control
   - Origin whitelist validation (per-environment `originList.json`)
   - Module-level access checks (`module_id` permissions vs admin workgroup roles)

3. **Presigned URL hardening:**
   - File extension whitelist (no `.exe`, `.bat`, etc.)
   - Content-Type enforcement
   - 5-minute URL expiry

4. **eKYC data encryption:**
   - Aadhaar/PAN numbers arrive encrypted, decrypted server-side only
   - Fraud detection — specific document hashes blocklisted

**Business impact:** Passed VAPT audit, eliminated XSS, SQL injection, CSV injection, and unauthorized access vulnerabilities across 245+ API endpoints.

---

### FEATURE 6: Database Performance & Stored Procedures

> Authored 100+ MySQL stored procedures that form the core business logic layer. Also optimized slow queries and reduced database costs.

**Key stored procedures I built:**
- `getPartnerData` — Massive SP constructing complete partner profile as JSON (personal details, verification docs, store details/address/hours/images, products, services, expertise, projects, office address, languages, qualifications) — used by 10+ APIs
- `sendNotification` — Fetches notification templates + user preferences + profile for the notification engine
- `getUsersDeviceTokens` — Fetches FCM tokens for push notifications
- `postUserExpenses` — User construction expense tracking with bill attachments (CREATE/UPDATE/DELETE with dynamic SQL for bulk attachment insertion)
- `createServiceRequest` — Core SR creation flow
- `getInvoiceDetails`, `calculateRefund` — Financial operations
- `getSRDetailsOpenSearch` — Extracts SR data for OpenSearch indexing (60+ fields)
- `getChangeHistoryIdDataForMigration` — Uses `JSON_OBJECTAGG` for git-like change history documents

**Query optimization work:**
- **Slow query analysis** — Identified runtime distance calculations as bottleneck in partner listing, unnecessary table joins in SR count queries, missing index optimizations
- **Read/Write splitting** — Configured Sequelize with separate read replica instance for query-heavy operations (separate DB host, separate connection pool)
- **N+1 query elimination** — Dashboard queries rewritten with proper JOINs + composite indexes
- **DocumentDB cost optimization** — Analyzed $922.60/month (4.19B I/Os). Profiled read/write counts (619K reads, 214K writes). Identified high-I/O collections and optimized query patterns.

**Location data management:**
- Built `user_locations_table` — denormalized geography joining 8 tables (pincode→counties→cities→talukas→districts→depots→regions→states→zones) for flat location lookups
- Database triggers deployed across all environments for data consistency (`site_details`, `user_address_details`, `user_ekyc_details`, etc.)

---

### FEATURE 7: Contact Center Platform (CCP) — Knowlarity Integration

> Built 39 Lambda functions for the call center module integrating with Knowlarity telephony.

**What it does:**
- **Agent Management** — listing, status changes, profiles, activity logs
- **Call Configuration** — create/edit/delete/trigger call configs with working hours
- **Call Operations** — click-to-call, auto-assignment of next call, call masking (privacy), IVR callbacks
- **Call Logging** — disposition tracking, manual/auto call logs, downloadable reports
- **Upcoming/Ongoing Calls** — bulk upload call data (CSV), edit, delete, status management
- **WebSocket** — Real-time incoming call notifications for live call alerts on the admin panel

**How click-to-call works:**
```
Agent clicks "Call" on admin panel
    │
    ▼
Lambda → Knowlarity API (initiates call)
    │
    ▼
Knowlarity connects Agent → Customer with call masking (both see a Knowlarity number, not each other's real numbers)
    │
    ▼
Call ends → IVR callback hits our webhook Lambda → logs disposition + duration to MySQL
```

**Auto-assignment logic:** When an agent becomes free, the system finds the next unassigned call from the queue based on priority + geography + working hours configuration. If no agents are available, the call stays in queue.

**Cross-questioning prep:**
- *Why Knowlarity and not Twilio?* — Knowlarity is India-focused with local DID numbers, better compliance with TRAI regulations, and lower per-minute costs for Indian numbers.
- *How did you handle WebSocket at scale?* — AWS API Gateway WebSocket APIs with `$connect`/`$disconnect` routes. Connection IDs stored in DynamoDB. When an incoming call event hits our webhook, we broadcast to all connected admin agents via `postToConnection`.
- *What if Knowlarity API is down?* — Calls queue up in our system. We log failed attempts and retry. Agents see "Telephony service unavailable" status on the panel.

---

### FEATURE 8: eKYC Identity Verification

> Built 13 Lambda handlers for identity verification with multiple providers.

**Flow — Aadhaar verification (most common):**
```
User enters Aadhaar number (encrypted on client)
    │
    ▼
sendAadhaarOTP Lambda
    │ → Decrypt Aadhaar server-side
    │ → Check fraud blocklist (known fake document hashes)
    │ → Call Spring Verify API → OTP sent to user's Aadhaar-linked mobile
    │
    ▼
User enters OTP → verifyAadhaarOTP Lambda
    │ → Validates OTP with Spring Verify
    │ → On success: saves verification status + document images to S3
    │ → Updates partner profile as "KYC Verified"
```

**Other verifications:** PAN card, Voter ID, Driving License — all via Spring Verify API. AuthBridge as secondary provider (fallback if Spring Verify is down).

**Security measures:**
- Aadhaar/PAN numbers arrive **encrypted from client**, decrypted only server-side in Lambda (never logged or stored in plain text)
- **Fraud detection** — Known fake document hashes blocklisted. If a document hash matches blocklist, verification is rejected + admin alerted
- **Document images** — Moved to S3 with presigned URLs, never stored in database

**Cross-questioning prep:**
- *Why encrypt on client?* — UIDAI (Aadhaar authority) compliance requires Aadhaar numbers to never travel in plain text. We encrypt with RSA public key on client, decrypt with private key in Lambda environment variable (KMS-encrypted).
- *Why two providers?* — Spring Verify was our primary but had occasional downtime. AuthBridge as fallback ensured users weren't blocked during verification. We route to AuthBridge automatically if Spring Verify returns 5xx.
- *How do you handle rate limits?* — Both providers have API rate limits. We queue verification requests if we hit limits and process them with exponential backoff.

---

### FEATURE 9: Other Key Features I Built

> **Interview tip:** Mention these briefly — "I also built X, Y, Z" — and only go deep if the interviewer asks follow-up questions.

**Style Quiz (15+ Lambda functions):**
- Home design recommendation engine — users like/skip images, each image tagged with metatags (roof types, materials, entrance styles, window styles)
- System analyzes liked images → identifies dominant style preferences → generates personalized style recommendations
- MongoDB for storing quiz state (in-progress, completed), results stored as documents with tag frequency analysis
- PDF generation using `pdf-lib` + `handlebars` templates — user gets a downloadable style report
- Admin panel for managing quiz images, tags, and categories

**Dealer Payout / Credit Note Generation:**
- Financial module for dealer commission payouts with GST-compliant invoicing
- **Production fix:** Original code used looped `UpdateMany` on MongoDB claims collection — each payout was a separate DB round-trip. On large datasets (hundreds of dealers), the API timed out. Replaced with `bulkWrite` using `ordered: false` for parallel execution — single round-trip, fixed timeout.
- CSV credit note generation with proper GST fields (company code, HSN/SAC codes, cost centers)

**MongoDB Change History:**
- Built git-like version tracking for service requests — every field change logged as a MongoDB document with before/after values
- Complex SQL extraction using `JSON_OBJECTAGG` to structure change history from MySQL into MongoDB documents
- Admin can view full change timeline for any service request

**SLA Monitoring Dashboard:**
- Real-time SLA tracking — complex MySQL queries calculating SLA flags:
  - `Within SLA` — response/resolution within defined time
  - `Breaching Today` — approaching deadline (warning state)
  - `Breached` — past deadline (escalation needed)
- Filtered by geography (admin can only see their geo-zone), SR status, SR type, assigned workgroup
- Used date-difference calculations against SLA configuration tables

**AWS Polly Integration:**
- Text-to-speech for CMS content (articles, tips, guides) — users can listen instead of reading
- Used AWS Polly neural voice engine with Indian English locale ("Kajal" voice for natural pronunciation)
- Lambda converts text → MP3 → uploads to S3 → returns CloudFront URL for playback

**Dynamic QR Engine (10 Lambda functions):**
- Admin CRUD for QR codes, bulk upload via CSV, export/download, dynamic redirection link generation
- Each QR code maps to a configurable redirect URL — admins can change destination without reprinting QR

**SAM Stack Migration:**
- Migrated partner profile module from root stack to its own deployable nested stack
- Managed API Gateway domain remapping (main + images + websocket endpoints)
- Cleaned up ~100+ old Lambda functions from preprod after migration

**Generic Admin Table System (NodeTable):**
- Built a reusable server-side table framework — parameterized configurations define column mappings, search configs, filter types, value translations
- Any new admin panel table view could be configured via JSON instead of writing custom API logic
- Supports server-side sorting, filtering, pagination, and search across different admin views

**Geography Management (7 Lambda functions):**
- Admin CRUD for India's geographic hierarchy (zone→state→region→depot→district→taluka→city→county→pincode)
- SQS-driven pincode relocation — when a pincode is reassigned to a different district, all associated users and service requests update asynchronously via SQS queue
- Geography validation API used by partner registration flow

---

#### Q: Walk me through the UTEC architecture in terms of what YOU built.

> **Interview tip:** Use this table as your mental map. When they ask "What did you do?", pick 3-4 rows and go deep.

**A:** "I'll summarize my ownership across the platform:

| Area | What I Built / Owned | Scale |
|------|---------------------|-------|
| **Notification Engine** | Full multi-channel system (Push/SMS/Email/WhatsApp) with priority-based SQS routing | 17 Lambda functions, standalone SAM app |
| **OpenSearch Migration** | Replaced Solr with AWS OpenSearch for all search/listing features | 4 indexes, geo-point queries, 60+ field mappings |
| **Nested Stacks** | Designed the nested CloudFormation architecture to overcome 500-resource limit | 5 nested stacks, 245+ functions total |
| **Presigned URL Service** | Centralized secure S3 upload system | 30+ endpoints, 3 access variants |
| **VAPT Security** | Input sanitization framework, authorizer hardening, all vulnerability fixes | Platform-wide across 245+ APIs |
| **Stored Procedures** | Authored 100+ MySQL SPs forming the business logic layer | Core of the application |
| **CCP / Telephony** | Full call center module with Knowlarity — click-to-call, WebSocket alerts, auto-assignment | 39 Lambda functions |
| **eKYC** | Identity verification (Aadhaar, PAN, Voter ID) with dual providers + encryption | 13 Lambda handlers |
| **Style Quiz** | Home design recommendation engine with PDF report generation | 15+ Lambda functions |
| **SLA Dashboard** | Real-time SLA monitoring with geo-filtered views | Complex SQL + admin panel |
| **QR Engine** | Dynamic QR code management with configurable redirect URLs | 10 Lambda functions |
| **Database Optimization** | Read/write splitting, slow query fixes, DocumentDB cost analysis, denormalized geo tables | 25% latency reduction |
| **Mentoring** | Code reviews, security checklist creation, onboarding guides | 'Best Team' recognition |

---

#### Q: Why Node.js and not Java/Python for UTEC?
**A:** "Three reasons:
1. **I/O-heavy workload** — UTEC has 245+ Lambda functions heavily integrating with third-party services (Knowlarity telephony, Firebase FCM, mTalkz SMS, Yellow.ai WhatsApp, Spring Verify eKYC, PayU payments). Node.js's non-blocking I/O handles concurrent API calls efficiently.
2. **Real-time requirements** — WebSocket support for live incoming call notifications in the CCP module. Node.js async processing was natural for this.
3. **Shared language** — Frontend (React) and backend both in JavaScript. Shared validation schemas (Joi), shared utility patterns.
4. **Trade-off:** For CPU-heavy operations (watermarking, PDF generation with Puppeteer/Chromium), we used dedicated high-memory Lambdas (1.6GB) with separate layers."

#### Q: How did you handle scaling?
**A:** "Multi-pronged approach:
1. **Serverless auto-scaling** — 245+ Lambda functions scale independently based on request volume
2. **Database:** MySQL Read Replicas (separate Sequelize instance for reads) + connection pooling (max: 10 per pool via Sequelize, RDS Proxy for connection management)
3. **Caching:** Redis (ElastiCache cluster mode) — cache-aside for partner profiles, admin permissions, language preferences, search history
4. **Search:** OpenSearch offloaded complex text + geo queries from MySQL
5. **Async processing:** SQS queues for notifications, file moves, pincode relocation, backend requests, TFA updates
6. **Priority-based processing:** High-priority SQS (batch=10) for OTPs vs low-priority (batch=100, 45s window) for general notifications — reduces Lambda invocations by 10x for bulk"

#### Q: What were the biggest bottlenecks and how did you fix them?
**A:** "Five real bottlenecks from my actual work:

**1. Search was slow (3-5 seconds) — Solr on EC2:**
- Root cause: Apache Solr was deployed on EC2, required manual cluster management. MySQL LIKE queries as fallback were even worse.
- Fix: Full migration to AWS OpenSearch with proper index mappings, custom edgeNGram analyzers for autocomplete, geo_point for distance-based search
- Result: 30% faster queries, sub-300ms response times, managed service (no server maintenance)

**2. Admin panel SR listing unbearable:**
- Root cause: MySQL query joining 60+ fields across multiple tables with complex geography hierarchy filtering
- Fix: Created dedicated OpenSearch index with pre-indexed SR data. All keyword fields for instant filtering.
- Result: Admin panel listings went from seconds to milliseconds

**3. Dealer payout API timing out in production:**
- Root cause: Used looped `UpdateMany` on MongoDB claims collection — API timeout on large datasets
- Fix: Replaced with MongoDB `bulkWrite` with `ordered: false` for parallel execution
- Result: Fixed production timeout, credit note generation reliable

**4. DocumentDB costs spiraling — $922.60/month:**
- Root cause: 4.19 billion I/Os, `notification_queues` growing 200K records every 3-4 months
- Fix: Profiled read/write counts (619K reads, 214K writes), identified unnecessary reads in `processOfflineSMSRequests` (never invoked), optimized high-I/O collection queries
- Result: Significant cost reduction through targeted optimization

**5. Lambda cold starts in VPC-attached functions:**
- Root cause: eKYC and auth functions needed VPC access (for RDS), adding 3-5 seconds cold start
- Fix: Implemented RDS Proxy for connection management outside VPC boundary. Added provisioned concurrency for critical auth Lambda.
- Result: Cold start reduced from 5-8s to under 1s for critical paths"

#### Q: Any production issues? How did you debug?
**A:** "The most critical was the **dealer payout timeout** in production.

**Symptom:** Credit note generation API for dealers was timing out on large datasets (hundreds of dealer payouts).

**Root cause:** The `updateDealerPayoutDetailsBulk` function was using a loop with `UpdateMany` — each iteration was a separate MongoDB round-trip.

**Fix:** Replaced with `bulkWrite` using `ordered: false`:
```javascript
// ❌ Before: looped UpdateMany (N round trips)
for (const payout of payouts) {
  await collection.updateMany({ dealerId: payout.id }, { $set: payout.data });
}

// ✅ After: single bulkWrite (1 round trip)
const operations = payouts.map(p => ({
  updateMany: { filter: { dealerId: p.id }, update: { $set: p.data } }
}));
await collection.bulkWrite(operations, { ordered: false });
```

**Another issue — OpenSearch index corruption during migration:**
During Solr→OpenSearch migration, a batch upload failed midway leaving partial data. I wrote deletion utilities to batch-delete corrupted documents by user ID lists, then re-ran the bulk migration with proper error handling and checkpointing.

**Third issue — Lambda cold starts affecting eKYC verification:**
Users were experiencing 5-8 second delays on Aadhaar verification. Root cause: Lambda cold start + VPC attachment (required for RDS access) added ~3-5 seconds. Fix: Moved eKYC Lambda to use RDS Proxy (which sits outside VPC boundary), reducing cold start overhead. Also added provisioned concurrency for critical auth functions."

#### Q: How did you handle caching with Redis?
**A:** "We used Redis (ElastiCache in cluster mode) via `ioredis`:

**What we cached (actual patterns from the codebase):**
- **Admin permissions** — Lambda authorizer caches module access by email key in Redis. On every API call, auth checks Redis first before hitting MySQL.
- **Partner profiles** — `updatePartnerRedis` / `getPartnerFromDb` pattern. Partner profile JSON cached after DB fetch.
- **Language preferences** — User language settings cached to avoid DB lookups on every request.
- **View/like counts** — Social engagement metrics cached and flushed periodically.
- **Search history** — Recent search terms cached per user.

**Operations:** `get/set/delete/hmset/hgetall` with Promise wrappers over ioredis.

**Cache invalidation:** On profile update → invalidate specific Redis key. On permission change → immediate invalidation (no TTL-based staleness allowed for security data).

**Cross-questioning prep:**
- *What if Redis goes down?* — Graceful fallback. Cache layer wrapped in try-catch — if Redis is unavailable, we query MySQL directly. Performance degrades but service stays available. CloudWatch alarms on Redis cluster health alert us immediately.
- *Cache stampede problem?* — On a cache miss for popular keys (partner profile viewed by many users), multiple concurrent requests could all hit MySQL. We used Redis `SETNX` for distributed locking — only one request rebuilds cache, others wait briefly.
- *Why ElastiCache cluster mode?* — Data sharded across multiple nodes for higher throughput. Single-node Redis would've been a bottleneck with our concurrent Lambda invocations all reading/writing cache."

#### Q: How did you design the database?
**A:** "Multi-database architecture:

| Database | Purpose | Connection Strategy |
|----------|---------|-------------------|
| **MySQL Write (RDS)** | Primary transactional data | Sequelize ORM, pool max:10, operator aliases |
| **MySQL Read (Replica)** | Query-heavy operations | Separate Sequelize instance, separate host |
| **MySQL Raw** | Stored procedure calls | `mysql2` connection pool via `dbConnector.js` |
| **MongoDB (DocumentDB)** | Notification logs, change history, notification ID aliases | Mongoose with SSL/TLS |
| **Transit DB** | Data transit operations | Separate Sequelize instance |
| **UTCL DB** | UltraTech loyalty system | Separate connection |

**Core MySQL tables:** `user_details`, `partner_profession`, `site_details`, `service_requests`, `orders`, `user_fcm_token`, `user_notification`, `notification_type`, `budget_rates`, `home_stage_epic_details`, `user_locations_table`, `audit_logs`

**Key design decisions:**
1. **100+ stored procedures** for business logic — `getPartnerData`, `sendNotification`, `createServiceRequest`, `postUserExpenses`, etc.
2. **Denormalized `user_locations_table`** — joins 8 geography tables into flat lookup for fast geo-access filtering
3. **Database triggers** — deployed across all environments for data consistency (`site_details`, `user_address_details`, `user_ekyc_details`)
4. **Soft deletes** for audit compliance
5. **`EXPLAIN`-driven optimization** — eliminated full table scans, added composite indexes on `(project_id, status, created_at)`"

#### Q: How did you handle deployments across 5 environments?
**A:** "We had 5 environments — test, stage, preprod, prod, production — each with its own AWS account/configuration.

**Deployment flow:**
```
Developer → Git push to feature branch → Code review → Merge to environment branch
    │
    ▼
SAM CLI: sam build → sam deploy --config-env {environment}
    │
    ▼
samconfig.toml (per-environment config):
- Different stack names per env
- Different parameter overrides (DB host, Redis endpoint, API keys)
- Different S3 deployment buckets
    │
    ▼
CloudFormation creates/updates only changed resources
```

**Environment-specific Lambda Layers:** Each environment had its own config layer (DB credentials, API keys, feature flags). CloudFormation Conditions controlled which layers/resources got created: `IsVPCNeeded`, `CreateProdResources`, `CreatePreprodResources`.

**Key challenge:** With nested stacks, a deployment touching 5 nested stacks could take 15-20 minutes. We optimized by deploying only the changed nested stack when possible."

---

#### Q: How did you mentor junior developers and enforce code quality?
**A:** "On a 110-person team, code quality was critical:

1. **Mandatory code reviews** — Every PR required at least one senior review. I reviewed 5-10 PRs/day focused on: security (input validation, SQL injection), performance (N+1 queries, unnecessary DB calls), error handling patterns.
2. **Established coding standards** — Created Joi validation patterns, response formatting utilities, error handling middleware that the entire team followed.
3. **Knowledge sharing** — Documented architecture decisions, created onboarding guides for new developers joining specific modules.
4. **Pair programming** — For complex features (OpenSearch migration, notification engine), I paired with junior developers so they could learn the architecture firsthand.
5. **Code review checklist** — After the VAPT audit, created a security checklist: input sanitization, presigned URL validation, JWT token handling, etc.

**Impact:** Won 'Best Team' recognition on the 110-member UTEC project. Junior developers I mentored became self-sufficient within 2-3 months."

---

#### Q: What was your SDLC / development workflow at UTEC?
**A:** "Agile with 2-week sprints:

1. **Sprint planning** — Jira board, story points, capacity planning across 5 environments
2. **Development** — SAM CLI local testing (`sam local invoke`, `sam local start-api`), unit tests, integration tests against test environment
3. **Code review** — Mandatory PR reviews, security checklist for sensitive endpoints
4. **Testing** — Deploy to test → QA validates → promote to stage → UAT → preprod → prod
5. **Production deployment** — CloudFormation with nested stacks, only changed resources updated. Rollback capability via CloudFormation stack rollback.
6. **Monitoring** — CloudWatch for Lambda errors, API Gateway latency, RDS performance. Alerts on error thresholds.

**Key practice:** We used `samconfig.toml` with environment-specific configurations, so the same codebase deployed consistently across all 5 environments with different parameters."

---

#### Q: What would you improve if you rebuilt UTEC today?
**A:** "Five things based on what I learned:
1. **TypeScript everywhere** — We used plain JS; TypeScript would've caught type mismatches at compile time (e.g., the `getPartnerData` SP had issues with latitude/longitude as strings instead of numbers)
2. **Event-driven architecture** — Use EventBridge for inter-service communication. Currently we have direct API calls between services.
3. **Better observability** — Distributed tracing with X-Ray from the start. We only had CloudWatch logs.
4. **GraphQL for frontend** — Our REST API had over-fetching on the dashboard.
5. **OpenSearch from day 1** — We wasted months maintaining Solr on EC2 before migrating. Should've started with managed OpenSearch."

---

### PROJECT 2: P&G Olay – BigCommerce → Shopify Migration (LTIMindtree)

#### Q: Explain the migration architecture.
**A:** "We migrated P&G Olay's e-commerce data from BigCommerce to Shopify:

```
BigCommerce v2/v3 APIs → Azure Functions (Extraction + Transformation) → Shopify GraphQL Mutations
```

**Pipeline:**
1. **Extract:** Pull product catalogs, categories, variants, pricing from BigCommerce v2/v3 REST APIs
2. **Transform:** Map BigCommerce schemas to Shopify-compatible formats (different field names, nested structures, variant groupings)
3. **Load:** Push to Shopify using GraphQL `productCreate`, `productUpdate` mutations

**Scale:** Thousands of SKUs with hundreds of variants each."

#### Q: How did you achieve 50% faster processing?
**A:** "Two key optimizations:

1. **Batch operations:** Instead of processing products one-by-one, I batched them into groups of 50 for API calls. BigCommerce v3 supported pagination with `?limit=250`, so we fetched in larger chunks.

2. **Parallelism:** Used `Promise.allSettled()` to run multiple batch operations concurrently:
```javascript
const batches = chunkArray(products, 50);
const results = await Promise.allSettled(
  batches.map(batch => processAndUpload(batch))
);
// Handle individual failures without blocking others
```

3. **Connection reuse:** Used `keep-alive` HTTP agents to reuse TCP connections to Shopify's API, reducing handshake overhead."

#### Q: How did you ensure 100% data consistency?
**A:** "Multi-layer verification:
1. **Idempotency keys** — Each product had a unique migration key. Re-running the migration wouldn't create duplicates.
2. **Checksum validation** — After migration, compared source vs destination counts + sampled 10% of products for field-level comparison
3. **Distributed locking** — Azure Blob lease to prevent multiple Function instances from processing the same data range
4. **Reconciliation report** — Automated script that compared BigCommerce product count, variant count, and pricing with Shopify post-migration"

---

### PROJECT 3: EY Risk.ai – AI Agent Upgrade (LTIMindtree)

#### Q: What did upgrading from GPT-4 to GPT-5.1 involve?
**A:** "It was not just a model swap. The entire prompt infrastructure needed revamping:

1. **System prompts rewritten** — GPT-5.1 had different instruction-following behavior. Prompts that worked for GPT-4 were either too verbose or hallucinated with 5.1
2. **Prompt chaining restructured** — Broke monolithic prompts into smaller, focused chains with intermediate validation
3. **Token optimization** — GPT-5.1 had different context window characteristics. Optimized prompts to reduce token usage (cost optimization)
4. **Testing framework** — Built systematic A/B testing to compare GPT-4 vs GPT-5.1 outputs on 200+ audit scenarios
5. **Result:** 20% improvement in agent response quality measured by user satisfaction surveys and accuracy scoring"

---

### PROJECT 4: Vkonnect Health (Reapmind Innovations, Feb 2021 – Nov 2021)

> Healthcare platform providing an admin panel for managing doctors, users, notifications, and communication systems.

#### Q: Walk me through the Vkonnect Health architecture — before and after your changes.

**A:** "When I joined, Vkonnect was a monolith — both frontend (React) and backend (Node.js/Express) were deployed on the **same EC2 instance**. This caused coupling issues: a backend deployment would take the frontend down too, and scaling one meant scaling both.

**Before:**
```
Single EC2 Instance
├── React (Class Components, legacy code)
├── Express Backend (Monolithic)
├── MySQL + MongoDB
└── Manual deployments via SSH
```

**After my restructuring:**
```
Frontend (React)                    Backend (Node.js)
    │                                   │
AWS Amplify                        API Gateway + Lambda
(Auto-deploy on                    (Serverless Framework)
 git push to dev/stage)                 │
    │                              ┌────┼────┐
    │                              │    │    │
CloudFront CDN                  Layer: Layer: Layer:
                                DB    Utils  Services
                                   │
                              CloudFormation
                              (Nested Stacks)
                                   │
                            ┌──────┼──────┐
                         MySQL  MongoDB    S3
```

The separation meant frontend and backend had **independent CI/CD, independent scaling, and independent failure domains**."

---

#### Q: What did you do on the React/Frontend side?

**A:** "Four major changes:

**1. Class Components → Functional Components:**
The entire codebase was written in React class components with lifecycle methods (`componentDidMount`, `componentWillReceiveProps`, etc.). I migrated all components to functional components with hooks — `useState`, `useEffect`, `useContext`, `useMemo`. This wasn't just a syntax change — it simplified state management, reduced boilerplate by ~40%, and made the code easier to test and maintain.

**2. Destructured into Tree-Based Components:**
The old code had massive monolithic components — one file doing everything. I broke them down into a proper component tree:
```
AdminPanel/
├── Layout/
│   ├── Sidebar.jsx
│   └── Header.jsx
├── Users/
│   ├── UserList.jsx
│   ├── UserCard.jsx
│   ├── UserFilters.jsx
│   └── UserCSVDownload.jsx
└── Notifications/
    ├── NotificationPanel.jsx
    ├── NotificationForm.jsx
    ├── NotificationScheduler.jsx
    └── DesignationSelector.jsx
```
Each component had a single responsibility. Parent components handled data fetching, children handled display.

**3. Performance Optimization:**
- **`useMemo`** — Used for expensive computations like filtering/sorting large user lists on the admin panel. Without it, every re-render would re-sort the entire user list unnecessarily.
- **`useContext`** — Created global contexts for auth, roles, and app config so we didn't have to prop-drill through 8 levels of components.

```javascript
// Auth context example
const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);

  const login = async (credentials) => { /* ... */ };
  const logout = () => { /* ... */ };

  return (
    <AuthContext.Provider value={{ user, permissions, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Any nested component can access auth without prop drilling
function UserList() {
  const { permissions } = useContext(AuthContext);
  const canDelete = permissions.includes('user:delete');
  // ...
}
```

**4. Deployed Frontend on AWS Amplify:**
Previously both FE and BE were on the same EC2, so deploying backend would take the frontend down too. I moved the React app to **AWS Amplify** — it's self-managed, auto-builds on git push, serves via CloudFront CDN, and the admin team could manage it independently without touching the backend infrastructure."

---

#### Q: What did you do on the Node.js/Backend side?

**A:** "This was the biggest transformation — a full **EC2 Express → AWS Lambda (Serverless Framework)** migration.

**1. Database Performance Improvements:**
Before migrating, I first fixed the foundation:
- **Optimized schema structure** — Restructured tables, removed redundant data, added proper foreign keys and reduced redundant queries
- **Added indexing** — Composite indexes on frequently queried columns (e.g., `user_type, status, created_at`)
- **Connection reuse strategy** — The old code was opening a new DB connection per request and closing it. I implemented a **connection reuse pattern** — keep connections alive and reuse them across multiple requests. This is especially critical for Lambda where cold starts make connection creation expensive. Instead of paying the connection setup cost on every invocation, warm Lambda instances reused existing connections.

```javascript
// ❌ Before: New connection every request
app.get('/users', async (req, res) => {
  const conn = await mysql.createConnection(config);
  const result = await conn.query('SELECT * FROM users');
  conn.end(); // Connection wasted after one use
});

// ✅ After: Shared pool, connections reused
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  connectionLimit: 10,  // Reuse up to 10 connections
  waitForConnections: true
});

// In Lambda handler — pool persists across warm invocations
exports.handler = async (event) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE type = ?', [event.type]);
  return { statusCode: 200, body: JSON.stringify(rows) };
};
```

**2. EC2 Express → Serverless Framework (AWS Lambda):**
I chose the **Serverless Framework** specifically because:
- **Lightweight** — Easy to run locally with `serverless offline` for testing
- **Simple deployment** — One command `sls deploy` handles everything
- **CloudFormation native** — Each deploy generates a CloudFormation stack
- **Plugin ecosystem** — `serverless-offline`, `serverless-webpack`, etc.

During migration, I didn't just copy-paste Express routes into Lambda handlers. I **refactored the entire codebase** — removed a lot of dead/unnecessary code, stripped Express-specific middleware patterns, and restructured everything to align with the Lambda event-driven model. The codebase became significantly leaner and more modular.

**3. Lambda Layers Architecture:**
Instead of bundling everything into each Lambda function, I created **shared Lambda layers** to keep functions lightweight:

```
Lambda Function (handler code only, ~50KB each)
    │
    ├── Layer 1: Database Layer
    │   └── DB connection pool, query helpers, models
    │
    ├── Layer 2: Utils & Common Functions
    │   └── Validation, error handling, response formatters, auth middleware
    │
    └── Layer 3: Services Layer
        └── Business logic, third-party integrations, notification service
```

This meant each Lambda function's deployment package was tiny. When CloudFormation deployed, it only updated the **specific resource (function) that changed** — not the entire stack. So a code change in one API endpoint only redeployed that one Lambda function, not all 40+.

**4. CI/CD with Git + AWS CodeBuild/CodeDeploy:**
Introduced Git-based CI/CD for both frontend and backend:
- Push code to `dev` or `stage` branch → triggers AWS CodeBuild/CodeDeploy pipeline
- Backend: Code gets packed into a **dist zip**, and CloudFormation performs **partial updates** — only the changed resources get redeployed, not the entire stack. So if I changed one Lambda function, only that function and its related resources were updated.
- Frontend (Amplify): Auto-detected git push, built React app, deployed to CDN

This was a huge improvement — before, deployments were manual SSH-into-EC2-and-pull-code affairs. Now it was fully automated with minimal downtime."

---

#### Q: What was the biggest challenge during the migration?

**A:** "**CloudFormation's 200-resource limit.** This was a real blocker.

As we migrated more Express routes to Lambda functions, each function + its API Gateway endpoint + IAM role + log group counted as separate CloudFormation resources. We hit the **200-resource hard limit per stack** — CloudFormation simply refused to deploy.

At that time, **AWS had no official solution** for this. We were stuck — couldn't add more Lambda functions, couldn't split the stack manually without rewriting the entire architecture.

Then **Serverless Framework released a new feature: nested stacks support.** It automatically split our resources across multiple nested CloudFormation stacks under one parent stack. The beauty was — **we didn't have to change our codebase or architecture at all.** Just updated the Serverless Framework version and added the nested stacks plugin. CloudFormation now managed multiple child stacks under one parent, each staying under the 200-resource limit.

**Lesson learned:** Always plan for CloudFormation resource limits when going serverless. Today I'd structure nested stacks from day one."

---

#### Q: Tell me about the CSV Download feature — what was the challenge?

**A:** "This was a classic **EC2 → Lambda migration gotcha.**

**On EC2:** We had an API that fetched the entire user list from the database, processed it into a CSV, and streamed it back to the browser. This worked fine because EC2 has **no execution time limit** — even if it took 30-60 seconds to process 50K users, it just kept running.

**On Lambda:** AWS Lambda has a **30-second timeout for API Gateway-triggered functions** (synchronous invocation). The same CSV generation was timing out.

**My solution — Async processing with S3:**

```
Admin clicks "Download CSV"
    │
    ▼
Lambda checks S3 for pre-generated CSV file
    │
    ├── File exists & fresh → Return S3 presigned download URL instantly
    │
    └── File stale/missing → Return "Generating..." + trigger background refresh
    
Background process (CloudWatch cron job, runs once daily):
    │
    ▼
Check: Were 10+ new users added since last generation?
    ├── YES → Query DB, generate new CSV, upload to S3, update download link
    └── NO  → Skip (no point regenerating for minor changes)
```

Instead of generating the CSV on-demand (which timed out), I **pre-generated it**:
- A **daily cron job** (CloudWatch Events → Lambda) checked if 10+ new users had been added to the database
- If yes, it generated a fresh CSV, uploaded it to **S3**, and updated the download link
- When the admin clicked 'Download', they instantly got a **presigned S3 URL** — no waiting, no timeout

**Trade-off:** Data could be up to 24 hours stale. For an admin panel user list, this was perfectly acceptable. We also added a manual 'Refresh Now' button for urgent cases."

---

#### Q: Tell me about the Notification Panel.

**A:** "**Before:** Notifications (push + email) were sent manually — someone would open **Postman**, hit the notification API with a JSON payload, specify the recipients, and send. This was error-prone, not scalable, and only developers could do it.

**After — Configurable Notification Panel:**
I built a full admin UI where non-technical admins could configure and send notifications themselves:

```
Notification Panel (Admin UI)
├── Create Notification
│   ├── Title & Message (rich text editor)
│   ├── Type: Push / Email / Both
│   ├── Target Audience (configurable):
│   │   ├── By Designation: Orthopedics, Pharma, Physiotherapist, General
│   │   ├── By Location / City
│   │   └── All Users
│   ├── Schedule: Send Now / Schedule for Future (via EventBridge)
│   └── Preview & Send
│
├── Notification Management
│   ├── List all scheduled & sent notifications
│   ├── Edit upcoming scheduled notifications
│   ├── Delete/cancel scheduled notifications
│   └── Delivery status (sent/delivered/failed counts)
│
└── Notification History
    ├── Full log of past notifications
    └── Filters by date, type, audience
```

**Key design decisions:**
1. **Audience targeting by designation** — Admins could select doctor types like orthopedics, pharma doctors, physiotherapists. The system queried users by `designation` field and fanned out notifications.
2. **Scheduled notifications with AWS EventBridge** — Admins could schedule notifications for a future date/time. When they scheduled one, we created an **EventBridge rule** with a cron expression targeting a Lambda function. The rule triggered the Lambda at the scheduled time, which fetched the notification details from DB and sent it. Admins could also **list, edit, or delete** scheduled notifications — editing updated the EventBridge rule, deleting removed it.

```
Admin schedules notification for "April 20, 9:00 AM"
    │
    ▼
Lambda API → Save notification details to DB (status: 'scheduled')
           → Create EventBridge Rule: cron(0 9 20 4 ? 2026) → target: sendNotificationLambda
    │
    ▼
At 9:00 AM April 20 → EventBridge triggers Lambda
    │
    ▼
Lambda reads notification from DB → sends push (FCM) + email (SES)
           → updates status to 'sent' → records delivery stats
```

3. **Full CRUD for notifications** — All notifications were stored in the database with status tracking (`draft`, `scheduled`, `sent`, `failed`). Admins had full control to edit content/audience or cancel scheduled ones before they fired.
4. **Delivery via backend** — The React panel called our Lambda API, which handled the actual push (via Firebase Cloud Messaging) and email (via AWS SES) delivery.

**Impact:** Reduced notification sending from a 5-minute developer task to a 30-second admin task. Zero dependency on the development team for operational notifications. Scheduling feature meant admins could plan campaigns in advance."

---

#### Q: What was the overall impact of your work at Vkonnect?

**A:** "
| Metric | Impact |
|--------|--------|
| **Server uptime** | Achieved **99.99%** (up from ~97% on EC2 with manual scaling) |
| **Deployment time** | Reduced by **40%** with nested CloudFormation + CI/CD automation |
| **Frontend performance** | Improved load times with functional components + Amplify CDN |
| **Code quality** | Removed ~30% dead code during Lambda migration, modularized with layers |
| **Operational efficiency** | Notification sending: 5-min dev task → 30-sec admin task |
| **Infrastructure cost** | Reduced by moving to pay-per-execution Lambda + Amplify (no idle EC2) |
| **Development speed** | `serverless offline` for local testing, independent FE/BE deployments |
"

---

## 5. Project Deep-Dive Cross-Questioning

> **These are the "challenge" questions a real L2 interviewer will ask. Practice answering these under pressure.**

### Architecture Challenges

#### Q: You used Redis cache-aside. What happens if Redis goes down?
**A:** "The app falls back to direct MySQL queries. Our cache layer was designed as a **performance optimization, not a dependency**. Code pattern:
```javascript
async function getData(key) {
  try {
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached);
  } catch (err) {
    logger.warn('Redis unavailable, falling back to DB');
  }
  const data = await mysql.query(/*...*/);
  // Try to repopulate cache, but don't block on failure
  redis.set(key, JSON.stringify(data), 'EX', 300).catch(() => {});
  return data;
}
```
Performance degrades but service stays available. We also had CloudWatch alarms on Redis cluster health."

#### Q: You say 30% faster search with OpenSearch. How did you measure that?
**A:** "We ran identical search queries on both MySQL (LIKE-based) and OpenSearch for 2 weeks in production using shadow traffic. Measured P50 and P95 latency:
- MySQL P95: 3.2 seconds
- OpenSearch P95: 280ms
- That's ~91% improvement at P95. The 30% figure was the average across all query types including simple lookups where MySQL was already fast."

#### Q: What if your OpenSearch index gets out of sync with MySQL?
**A:** "We handled this with:
1. **Write-through:** On every MySQL write, an async event pushed the change to OpenSearch via SQS
2. **Nightly reconciliation job:** Compared MySQL record count with OpenSearch doc count, flagged mismatches
3. **Manual reindex trigger:** Admin API to force full reindex if drift detected
4. **Trade-off:** We accepted eventual consistency (few seconds delay) for search, since real-time accuracy wasn't critical for search results"

#### Q: You mention circuit breaker. Which library? How did you configure it?
**A:** "We used `opossum` (Node.js circuit breaker library):
```javascript
const CircuitBreaker = require('opossum');
const breaker = new CircuitBreaker(callExternalAPI, {
  timeout: 10000,       // 10s timeout
  errorThresholdPercentage: 50,  // Open after 50% failures
  resetTimeout: 30000    // Try again after 30s
});
breaker.fallback(() => getCachedResponse());
breaker.on('open', () => logger.warn('Circuit OPEN for supplier API'));
```
Configured per external service — stricter thresholds for critical services (payment), lenient for non-critical (analytics)."

### Scaling Challenges

#### Q: How would you scale UTEC from 1,000 to 1,000,000 concurrent users?
**A:** "Step-by-step:

**1K → 10K:** Vertical scaling + Redis caching + DB indexing optimization (where we actually were)

**10K → 100K:**
- Horizontal scaling: Multiple EC2 instances behind ELB with sticky sessions → switch to stateless JWT
- Database: Read replicas for report queries, connection pooling
- CDN for static assets (CloudFront)

**100K → 1M:**
- Microservices split: Decompose monolith into Project Service, User Service, Search Service, Notification Service
- Database sharding by `tenant_id` (multi-tenant SaaS model)
- Event-driven architecture: EventBridge + SQS for async communication
- Edge caching: API responses cached at CloudFront edge locations
- Rate limiting per tenant
- Move to Kubernetes (EKS) for container orchestration

**Cost optimization at scale:** Reserved instances for baseline, spot instances for batch processing, Lambda for spiky workloads"

#### Q: What about cost optimization on AWS specifically?
**A:** "Measures I implemented:
1. **Right-sizing:** CloudWatch CPU/memory metrics → downgraded t3.large to t3.medium (saved 30%)
2. **Reserved instances:** 1-year commitment for prod servers (40% savings)
3. **S3 lifecycle policies:** Moved old documents to S3 Infrequent Access after 90 days, Glacier after 1 year
4. **Lambda right-sizing:** Reduced memory allocation from 1024MB to 512MB after profiling (cut Lambda costs 50%)
5. **CloudWatch log retention:** Set to 30 days instead of indefinite
6. **Cost Explorer alerts:** Weekly budget alerts, anomaly detection"

---

## 6. Node.js – Deep Technical Q&A

### Q1: Explain the Node.js Event Loop with all phases.
**A:** 6 phases in order:

```
┌───────────────────────────┐
│         Timers             │  ← setTimeout, setInterval
├───────────────────────────┤
│     Pending Callbacks      │  ← deferred I/O callbacks
├───────────────────────────┤
│       Idle / Prepare       │  ← internal use only
├───────────────────────────┤
│          Poll              │  ← retrieve new I/O events
├───────────────────────────┤
│          Check             │  ← setImmediate()
├───────────────────────────┤
│     Close Callbacks        │  ← socket.on('close')
└───────────────────────────┘
```

Between EVERY phase: drain **microtask queue** — `process.nextTick()` first, then Promise callbacks.

```javascript
console.log('1');                          // sync
setImmediate(() => console.log('2'));       // check phase
setTimeout(() => console.log('3'), 0);     // timer phase
process.nextTick(() => console.log('4'));   // microtask (highest priority)
Promise.resolve().then(() => console.log('5')); // microtask
console.log('6');                          // sync

// Output: 1, 6, 4, 5, 3, 2
```

### Q2: Cluster module vs Worker Threads — when to use which?
**A:**

| Aspect | Cluster | Worker Threads |
|--------|---------|----------------|
| **What** | Fork child processes | Spawn threads in same process |
| **Memory** | Separate memory per process | SharedArrayBuffer possible |
| **Use case** | HTTP server scaling (multi-core) | CPU-heavy tasks (image processing, crypto) |
| **Communication** | IPC (Inter-Process Communication) | MessagePort |
| **Isolation** | Full isolation (crash-safe) | Shares some memory (less isolated) |

```javascript
// Cluster — scale HTTP server across CPUs
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) cluster.fork();
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died, respawning...`);
    cluster.fork(); // auto-restart crashed workers
  });
} else {
  app.listen(3000);
}

// Worker Threads — offload CPU work
const { Worker } = require('worker_threads');
function runHeavyTask(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./heavy-task.js', { workerData: data });
    worker.on('message', resolve);
    worker.on('error', reject);
  });
}
```

**In UTEC:** "We used Cluster with PM2 for HTTP scaling, and Worker Threads for generating PDF reports (CPU-intensive) without blocking the main event loop."

### Q3: How do you detect and fix memory leaks in Node.js?
**A:** "My real debugging process from UTEC:

**Detection:**
1. CloudWatch memory metric showing steady climb (no plateau)
2. `process.memoryUsage()` logged every 60s showing heapUsed growing

**Diagnosis:**
1. Enable `--inspect` flag: `node --inspect server.js`
2. Chrome DevTools → Memory tab → Take Heap Snapshot
3. Take 3 snapshots at 10-min intervals
4. Compare: Sort by Delta → Look for objects with count growing
5. Found: Event listener objects growing unbounded

**Common causes:**
- Unreleased event listeners (our case)
- Global variables accumulating data
- Closures holding references
- Unclosed database connections
- Forgotten timers (`setInterval` without `clearInterval`)

**Prevention:**
- `--max-old-space-size=2048` to set heap limit
- `process.on('warning', ...)` for max listeners warning
- Regular heap profiling in staging
- Code review checklist for listener cleanup"

### Q4: Explain Streams in depth. When did you use them?
**A:** 4 types: Readable, Writable, Duplex, Transform.

**Real use case at UTEC:** "Exporting 500K construction records to CSV. Loading all into memory would OOM the server."

```javascript
const { Transform } = require('stream');
const { pipeline } = require('stream/promises');

// Create a transform stream that converts DB rows to CSV lines
const toCSV = new Transform({
  objectMode: true,
  transform(row, encoding, callback) {
    const line = `${row.id},${row.name},${row.status}\n`;
    callback(null, line);
  }
});

// Stream pipeline: DB cursor → Transform → HTTP response
await pipeline(
  db.query('SELECT * FROM projects').stream(),
  toCSV,
  res // Express response is a writable stream
);
```

**Key benefit:** Memory stays constant (~50MB) regardless of data size. Without streams, 500K rows would need ~2GB memory.

**Backpressure:** If the writable stream can't keep up, the readable stream automatically pauses. `pipeline()` handles this + error propagation.

### Q5: Node.js performance tuning — what techniques have you used?
**A:** 
1. **Connection pooling:** MySQL pool with 10-50 connections (avoid connection creation overhead)
2. **Compression:** `compression` middleware for gzip responses (60% smaller payloads)
3. **Cluster mode:** PM2 with `max` instances (utilize all CPU cores)
4. **Caching:** Redis for repeated queries
5. **Async hooks for tracing:** Identified slow middleware using `async_hooks`
6. **Profiling:** `clinic.js` flame graphs to find hot functions
7. **Payload optimization:** Pagination, field selection (`?fields=id,name,status`)
8. **Queue heavy work:** Offload to SQS + Lambda instead of processing in request cycle

---

## 7. React.js – Technical Q&A

### Q1: React Hooks deep dive — explain the gotchas.
**A:**

**useState gotchas:**
```javascript
// ❌ Stale state in async
const [count, setCount] = useState(0);
const handleClick = () => {
  setCount(count + 1);  // Uses stale closure value
  setCount(count + 1);  // Still uses same stale value!
  // count will be 1, not 2
};

// ✅ Fix with functional update
const handleClick = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  // count will be 2
};
```

**useEffect gotchas:**
```javascript
// ❌ Missing dependency causes stale closure
useEffect(() => {
  const interval = setInterval(() => {
    console.log(count); // Always logs initial count
  }, 1000);
  return () => clearInterval(interval);
}, []); // Empty deps — count is stale!

// ✅ Fix: include count in deps OR use ref
useEffect(() => {
  const interval = setInterval(() => {
    setCount(prev => prev + 1); // Functional update doesn't need count in deps
  }, 1000);
  return () => clearInterval(interval);
}, []);
```

### Q2: useEffect lifecycle — when does cleanup run?
**A:**
```
Mount   → useEffect callback runs
Update  → cleanup of PREVIOUS effect runs → new effect runs
Unmount → cleanup runs

Timeline:
1. Component renders → DOM updated → browser paints → useEffect runs
2. State changes → re-render → DOM updated → cleanup previous → browser paints → new useEffect runs
3. Component unmounts → cleanup runs
```

**Key insight:** Effects run AFTER paint (async). Use `useLayoutEffect` to run BEFORE paint (sync, blocking).

### Q3: How do you prevent unnecessary re-renders?
**A:** 

```javascript
// 1. React.memo — skip re-render if props unchanged
const ExpensiveList = React.memo(({ items }) => {
  return items.map(item => <Item key={item.id} {...item} />);
});

// 2. useMemo — memoize expensive computation
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

// 3. useCallback — stable function reference
const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(item => item.id !== id));
}, []); // No deps because using functional update

// 4. State co-location — move state closer to where it's used
// Instead of global state for a modal's open/close, keep it in the modal component
```

**React DevTools Profiler:** I use this to identify which components re-render and why. Look for "Why did this render?" info.

### Q4: Context API vs Redux — real-world decision.
**A:** "At UTEC's React admin panel:
- **Context** for: Theme, user auth/permissions, locale — low-frequency updates
- **Redux** for: Project data, task lists, real-time notifications — high-frequency updates with many consumers

**Why Redux over Context for data?**
1. Context re-renders ALL consumers when value changes. With 50+ components consuming project data, this killed performance.
2. Redux selectors (`useSelector`) only re-render when THEIR slice changes
3. Redux DevTools for time-travel debugging was invaluable in a large app
4. Middleware (thunk/saga) for complex async flows"

---

## 8. JavaScript – Tricky Output & Concepts

### Output Prediction Questions

```javascript
// Q1: What's the output?
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Output: 3, 3, 3 (var is function-scoped, shares same i)

// Fix with let (block-scoped):
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Output: 0, 1, 2
```

```javascript
// Q2: What's the output?
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
Promise.resolve().then(() => setTimeout(() => console.log(4), 0));
Promise.resolve().then(() => console.log(5));
setTimeout(() => console.log(6), 0);
console.log(7);

// Output: 1, 7, 3, 5, 2, 6, 4
// Sync first → microtasks → macrotasks
```

```javascript
// Q3: What's the output?
const obj = {
  name: 'Onkar',
  greet: function() { return this.name; },
  greetArrow: () => this.name
};
console.log(obj.greet());      // 'Onkar' (this = obj)
console.log(obj.greetArrow()); // undefined (arrow fn, this = global/module)
```

```javascript
// Q4: What's the output?
console.log(typeof null);        // 'object' (JS bug, never fixed)
console.log(typeof undefined);   // 'undefined'
console.log(null == undefined);  // true (loose equality)
console.log(null === undefined); // false (strict)
console.log(NaN === NaN);        // false (NaN is not equal to itself)
console.log(Number.isNaN(NaN));  // true (correct way to check)
```

```javascript
// Q5: What's the output?
async function foo() {
  console.log('A');
  await Promise.resolve();
  console.log('B');
}
console.log('C');
foo();
console.log('D');

// Output: C, A, D, B
// 'C' sync → foo() starts → 'A' sync → await pauses → 'D' sync → 'B' microtask
```

### Closure Deep Dive

```javascript
// Classic closure interview question
function createFunctions() {
  const result = [];
  for (var i = 0; i < 3; i++) {
    result.push(function() { return i; });
  }
  return result;
}
const fns = createFunctions();
console.log(fns[0]()); // 3 (not 0!)
console.log(fns[1]()); // 3
console.log(fns[2]()); // 3

// Fix 1: Use let
// Fix 2: Use IIFE
// Fix 3: Use bind
```

### Promise.all Polyfill

```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) return reject(new TypeError('Expected array'));
    const results = [];
    let completed = 0;
    if (promises.length === 0) return resolve([]);

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(value => {
        results[index] = value;
        completed++;
        if (completed === promises.length) resolve(results);
      }).catch(reject); // First rejection rejects all
    });
  });
}
```

---

## 9. TypeScript – Key Questions

### Q1: Generics with constraints
```typescript
// Constrain T to objects with an 'id' property
function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

// Works
findById([{ id: 1, name: 'A' }], 1);
// Error: string doesn't have 'id'
// findById(['a', 'b'], 1);
```

### Q2: Discriminated Unions (real-world pattern)
```typescript
type ApiResponse<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }
  | { status: 'loading' };

function handleResponse(res: ApiResponse<User>) {
  switch (res.status) {
    case 'success': return res.data; // TS knows data exists
    case 'error': return res.error;  // TS knows error exists
    case 'loading': return null;
  }
}
```

### Q3: Mapped Types & Utility Types
```typescript
// Make all properties optional at one level deep
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// Real use: API update payload where only changed fields are sent
interface User { name: string; address: { city: string; zip: string } }
type UserUpdate = DeepPartial<User>;
// { name?: string; address?: { city?: string; zip?: string } }
```

---

## 10. AWS – Architecture & Cloud Q&A

### Q1: Explain your AWS architecture for UTEC end-to-end.
**A:**
```
Client (React)
    ↓
CloudFront (CDN for static assets)
    ↓
API Gateway (REST, rate limiting, auth)
    ↓
┌─────────────────────────────────┐
│   EC2 / Lambda (Node.js APIs)    │
│   - EC2: Long-running processes  │
│   - Lambda: Event-driven tasks   │
└─────────────────────────────────┘
    ↓
┌────────────────────┬────────────────────┬──────────────┐
│ RDS MySQL          │ ElastiCache Redis  │ OpenSearch    │
│ (Primary + Replica)│ (Caching, Sessions)│ (Full-text)  │
└────────────────────┴────────────────────┴──────────────┘
    ↓
S3 (Documents, assets)
    ↓
CloudWatch (Monitoring, Alerts)
    ↓
CloudFormation (IaC, nested stacks)
```

### Q2: Auto Scaling — how does it work?
**A:** "We configured Auto Scaling Groups:
- **Min:** 2 instances (HA)
- **Max:** 8 instances
- **Scale-out trigger:** Average CPU > 70% for 5 minutes → add 1 instance
- **Scale-in trigger:** Average CPU < 30% for 10 minutes → remove 1 instance
- **Cooldown:** 300 seconds to prevent flapping
- **Health checks:** ELB health check on `/health` endpoint every 30s

Also used **Target Tracking Scaling** for Lambda concurrency — set target at 70% utilization."

### Q3: S3 security best practices you implemented.
**A:**
1. **Bucket policy:** Deny public access globally
2. **Presigned URLs:** For temporary access to documents (15-min expiry)
3. **Server-side encryption:** AES-256 (SSE-S3) for all objects
4. **VPC endpoint:** S3 accessed from private subnet without internet
5. **CORS:** Restricted to our domain only
6. **Lifecycle rules:** Move to IA after 90 days, Glacier after 1 year

### Q4: Lambda cold start — how did you handle it?
**A:**
1. **Provisioned concurrency:** For critical APIs (user auth), kept 5 warm instances
2. **Small deployment packages:** Separate node_modules layer, tree-shake unused code
3. **SDK initialization outside handler:** Reuse DB connections across invocations
```javascript
// ✅ Outside handler — reused across warm invocations
const mysql = require('mysql2/promise');
const pool = mysql.createPool({ /* config */ });

exports.handler = async (event) => {
  // ✅ Reuses pool connection
  const [rows] = await pool.query('SELECT ...');
  return { statusCode: 200, body: JSON.stringify(rows) };
};
```

---

## 11. Database – MySQL, MongoDB, Redis, OpenSearch

### MySQL

#### Q: Explain indexing strategies you used.
**A:**
```sql
-- Composite index for common queries
CREATE INDEX idx_project_status_date ON tasks(project_id, status, created_at);

-- Covering index — query served entirely from index
CREATE INDEX idx_covering ON users(email) INCLUDE (name, role);

-- EXPLAIN analysis
EXPLAIN SELECT * FROM tasks WHERE project_id = 5 AND status = 'active'
ORDER BY created_at DESC LIMIT 20;
-- Should show: Using index, rows scanned: ~20 (not 100K)
```

**Leftmost prefix rule:** Index on `(A, B, C)` works for queries on `(A)`, `(A, B)`, `(A, B, C)` — NOT `(B, C)` alone.

#### Q: How do you handle deadlocks in MySQL?
**A:** 
1. **Detection:** `SHOW ENGINE INNODB STATUS` → latest deadlock info
2. **Prevention:**
   - Always access tables in same order across transactions
   - Keep transactions short
   - Use `SELECT ... FOR UPDATE` with `NOWAIT` or `SKIP LOCKED`
3. **Handling:** Application-level retry with exponential backoff on deadlock error (1213)

### MongoDB

#### Q: Aggregation pipeline vs Map-Reduce — why pipeline?
**A:** "Pipeline is faster (native C++), supports indexes, returns cursor. Map-Reduce is JavaScript-based and deprecated since MongoDB 5.0.

Real example — top 10 users by order value:
```javascript
db.orders.aggregate([
  { $match: { status: 'completed', date: { $gte: ISODate('2025-01-01') } } },
  { $group: { _id: '$userId', totalSpent: { $sum: '$amount' }, orderCount: { $sum: 1 } } },
  { $sort: { totalSpent: -1 } },
  { $limit: 10 },
  { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
  { $unwind: '$user' },
  { $project: { userName: '$user.name', totalSpent: 1, orderCount: 1 } }
]);
```"

#### Q: MongoDB sharding — when and how?
**A:** "Shard when single server can't handle write volume or data size exceeds disk.

**Shard key selection is critical:**
- Choose high-cardinality field (e.g., `userId`, `tenantId`)
- Avoid monotonically increasing keys (`_id`, timestamps) — causes hot spots
- Hashed shard key for even distribution

**Trade-off:** Cross-shard queries (scatter-gather) are slower. Design queries to target a single shard."

### Redis

#### Q: Redis eviction policies — which did you use and why?
**A:**
| Policy | Behavior | Use Case |
|--------|----------|----------|
| `noeviction` | Error on full memory | When data loss is unacceptable |
| `allkeys-lru` | Evict least recently used | **General caching (our choice)** |
| `volatile-lru` | LRU only on keys with TTL | Mix of permanent + cached data |
| `allkeys-random` | Random eviction | When all keys equally important |
| `volatile-ttl` | Evict keys closest to TTL expiry | Time-sensitive data |

"At UTEC, we used `allkeys-lru` because all our cached data could be regenerated from MySQL. No data loss risk."

#### Q: Redis data structures — beyond simple key-value?
**A:**
```
String  → Caching API responses, session tokens
Hash    → User profiles (HSET user:123 name "Onkar" role "admin")
List    → Recent activity feed (LPUSH + LTRIM for fixed-size)
Set     → Online users tracking (SADD, SMEMBERS)
Sorted Set → Leaderboard (ZADD + ZRANGE)
Stream  → Event streaming / message queue alternative
```

### OpenSearch

#### Q: How did you optimize OpenSearch query performance?
**A:**
1. **Index mappings:** Defined explicit types (`keyword` for exact match, `text` for full-text) instead of dynamic mapping
2. **Analyzers:** Custom analyzer with `edge_ngram` tokenizer for autocomplete
3. **Sharding:** 3 primary shards for parallel query execution
4. **Routing:** Queries routed to specific shard by `project_id` to avoid scatter-gather
5. **Caching:** OpenSearch query cache enabled for repeated queries
6. **Result:** Sub-300ms P95 for search queries across 10M+ documents

---

## 12. System Design & Architecture

### Q1: Design a system like UTEC from scratch for 1M users.

**A:**
```
                    ┌──────────────┐
                    │   CloudFront  │ (CDN, Static Assets)
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │  API Gateway  │ (Rate Limiting, Auth, Routing)
                    └──────┬───────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
   ┌─────▼─────┐    ┌─────▼─────┐    ┌─────▼─────┐
   │  Project    │    │   User     │    │  Search    │
   │  Service    │    │  Service   │    │  Service   │
   │  (ECS)     │    │  (ECS)     │    │  (Lambda)  │
   └─────┬─────┘    └─────┬─────┘    └─────┬─────┘
         │                 │                 │
         ├─────────────────┼─────────────────┤
         │                 │                 │
   ┌─────▼─────┐    ┌─────▼─────┐    ┌─────▼──────┐
   │  MySQL      │    │  Redis     │    │ OpenSearch  │
   │  (RDS,      │    │(ElastiCache│    │  (Search    │
   │   Sharded)  │    │  Cluster)  │    │   Cluster)  │
   └────────────┘    └────────────┘    └─────────────┘
         │
   ┌─────▼─────┐    ┌──────────────┐
   │  S3         │    │ SQS + Lambda │ (Async Processing)
   │ (Documents) │    │ (Notifications, Reports)
   └────────────┘    └──────────────┘
```

### Q2: How do you implement rate limiting?
**A:** "Sliding window counter in Redis:
```javascript
async function rateLimit(userId, limit = 100, windowSec = 60) {
  const key = `ratelimit:${userId}`;
  const now = Date.now();
  const windowStart = now - windowSec * 1000;

  const multi = redis.multi();
  multi.zremrangebyscore(key, 0, windowStart); // Remove old entries
  multi.zadd(key, now, `${now}`);              // Add current request
  multi.zcard(key);                             // Count requests in window
  multi.expire(key, windowSec);                 // Auto-cleanup

  const [, , count] = await multi.exec();
  return count <= limit; // true = allowed
}
```
**In API Gateway:** Also used AWS API Gateway built-in throttling (10K requests/sec burst, 5K sustained) as first line of defense."

### Q3: Design a real-time notification system.
**A:**
```
Event Trigger (API write)
    ↓
SNS Topic (fan-out)
    ↓
┌──────────────┬──────────────┬──────────────┐
│ SQS Queue    │ SQS Queue    │ SQS Queue    │
│ (Push Notif) │ (Email)      │ (WebSocket)  │
└──────┬───────┴──────┬───────┴──────┬───────┘
       ↓              ↓              ↓
  Lambda (FCM)   Lambda (SES)   API Gateway
                                WebSocket
                                    ↓
                              Connected Clients
```

**Delivery guarantee:** At-least-once via SQS + idempotency keys.
**Preferences:** User notification settings stored in DynamoDB.

---

## 13. Scenario-Based Problem Solving (MOST IMPORTANT)

### Scenario 1: API latency suddenly increases — what do you do?

**A:** "Structured debugging approach:

**Minute 0-5 (Triage):**
1. Check CloudWatch dashboard — is it all APIs or specific endpoints?
2. Check if latency spike correlates with traffic spike (DDoS? Marketing campaign?)
3. Check recent deployments — did someone push code in the last hour?

**Minute 5-15 (Diagnose):**
4. Check database: `SHOW PROCESSLIST` — are queries queued? Slow query log active?
5. Check Redis: `INFO stats` — cache hit ratio dropped? Memory full? Evictions spiking?
6. Check external APIs: Are third-party services responding slowly? (Circuit breaker state?)
7. Check CPU/memory: Is the server resource-constrained?

**Minute 15-30 (Fix):**
- If DB: Kill long-running queries, add missing index, scale read replicas
- If cache miss storm: Warm cache, increase TTL, add cache-aside fallback
- If code regression: Rollback deployment
- If traffic spike: Scale out (Auto Scaling should handle, but check if limits are hit)
- If external API: Enable circuit breaker, serve cached/stale data

**Post-incident:**
- Root cause analysis document
- Add monitoring for the specific failure mode
- Runbook update for on-call engineers"

### Scenario 2: Database becomes slow — how to debug?

**A:** "Step-by-step:

1. **`SHOW PROCESSLIST`** — identify long-running queries
2. **Slow query log** — enable if not already: `SET GLOBAL slow_query_log = 'ON'; SET GLOBAL long_query_time = 1;`
3. **`EXPLAIN`** the slow query:
   - `ALL` type = full table scan → needs index
   - `filesort` → needs composite index matching ORDER BY
   - `Using temporary` → query needs optimization
4. **Check connections:** `SHOW STATUS LIKE 'Threads_connected'` — are we maxing out the pool?
5. **Check locks:** `SELECT * FROM information_schema.innodb_locks` — deadlocks?
6. **Check replication lag:** If using read replicas, lag causes stale reads

**Quick fixes:**
- Add composite index
- Kill blocking queries
- Enable query cache (if MySQL < 8.0)
- Add caching layer (Redis)
- Vertical scale (temporary)

**Long-term:** Query refactoring, schema optimization, sharding"

### Scenario 3: Cache inconsistency — stale data being served.

**A:** "Diagnosis:
1. **Identify the pattern:** Is it all keys or specific ones?
2. **Check TTL:** Is TTL too long for this data type?
3. **Check invalidation:** Is the write path properly invalidating/updating cache?
4. **Race condition:** Are concurrent writes causing update→cache-set→older-write→cache-set?

**Solutions by severity:**
- **Quick:** Reduce TTL (5 min → 30 sec for volatile data)
- **Medium:** Implement write-through cache — update DB + cache atomically
- **Robust:** Use Redis `WATCH` for optimistic locking on critical keys
- **Nuclear:** Cache-aside with version numbers — `key:v2` instead of invalidation

**Pattern I use:**
```javascript
// Write path — update DB then invalidate cache
await db.query('UPDATE users SET name = ? WHERE id = ?', [name, id]);
await redis.del(`user:${id}`); // Next read will rebuild cache

// For critical data — write-through
await db.query('UPDATE users SET name = ? WHERE id = ?', [name, id]);
const updated = await db.query('SELECT * FROM users WHERE id = ?', [id]);
await redis.set(`user:${id}`, JSON.stringify(updated), 'EX', 300);
```"

### Scenario 4: Production Service Failure — how do you respond?

**A:** "**Incident Response Framework (what I follow):**

**P1: Service Down (complete outage)**
1. Acknowledge incident in Slack/PagerDuty
2. Check: Is it infrastructure (AWS status page) or application?
3. Check latest deployment — rollback if deployed in last 2 hours
4. Check logs for fatal errors (OOM, unhandled exception)
5. Restart service (quick mitigation while investigating)
6. Scale up if resource-constrained

**P2: Degraded Performance**
1. Identify affected component (DB, cache, external API)
2. Enable fallback/circuit breaker if external dependency
3. Scale horizontally if load-related
4. Disable non-critical features (feature flags)

**Communication:**
- Status page update within 10 minutes
- Stakeholder update every 30 minutes
- Post-incident review within 48 hours"

### Scenario 5: Rate limiting & throttling — design it.

**A:** "Three layers:

**Layer 1: API Gateway** — IP-based rate limiting (1000 req/min per IP)
**Layer 2: Application** — User-based rate limiting (Redis sliding window, 100 req/min per user)  
**Layer 3: Service** — Per-endpoint limiting (sensitive endpoints like `/login`: 5 attempts per 15 min)

**Response when limited:**
```json
HTTP 429 Too Many Requests
{
  "error": "Rate limit exceeded",
  "retryAfter": 30,
  "limit": 100,
  "remaining": 0,
  "resetAt": "2026-04-14T10:30:00Z"
}
Headers: Retry-After: 30, X-RateLimit-Limit: 100, X-RateLimit-Remaining: 0
```"

### Scenario 6: High traffic event — system getting 10x normal load.

**A:** "Proactive measures I implement:
1. **Pre-scale:** Manually increase ASG min from 2 → 6 instances before the event
2. **Enable CDN caching:** Cache API responses for read-heavy endpoints at CloudFront edge (TTL 60s)
3. **Database read replicas:** Add temporary replica, route read queries there
4. **Redis cluster:** Ensure cluster mode with enough shards for connection count
5. **Feature flags:** Disable non-critical features (analytics, recommendations)
6. **Queue non-critical operations:** Push email, notifications to SQS for processing later
7. **Circuit breakers active:** External APIs won't cascade failures to our system
8. **Load testing beforehand:** Use Artillery or k6 to simulate 10x load and find bottlenecks before the event"

---

## 14. DSA / Coding Questions

### Two Sum (HashMap approach)
```javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}
// Time: O(n), Space: O(n)
```

### Debounce Polyfill
```javascript
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

### Throttle Polyfill
```javascript
function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

### Flatten Nested Array
```javascript
function flatten(arr) {
  return arr.reduce((acc, item) =>
    acc.concat(Array.isArray(item) ? flatten(item) : item), []);
}
// Or: arr.flat(Infinity)
```

### Deep Clone Object
```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  const clone = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) clone[key] = deepClone(obj[key]);
  }
  return clone;
}
```

### Implement Promise.all
```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    if (promises.length === 0) return resolve([]);
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(value => {
        results[index] = value;
        completed++;
        if (completed === promises.length) resolve(results);
      }).catch(reject);
    });
  });
}
```

### Check if Anagram
```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (const char of s) count[char] = (count[char] || 0) + 1;
  for (const char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}
```

### Merge Two Sorted Arrays
```javascript
function mergeSorted(a, b) {
  const result = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) result.push(a[i++]);
    else result.push(b[j++]);
  }
  return result.concat(a.slice(i), b.slice(j));
}
```

---

## 15. Behavioral & Managerial Questions

### Q1: Why Capgemini?
**A:** "Capgemini is a global leader in digital transformation with operations across 50+ countries. What attracts me is:
1. **Scale** — Capgemini works on large enterprise projects that match my experience with scaling systems like UTEC
2. **Technology diversity** — Multi-cloud, multi-stack projects where I can grow
3. **Innovation focus** — Capgemini's emphasis on AI and cloud-native aligns with my recent work on AI agents at EY Risk.ai
4. **Career growth** — Path from Senior Engineer to Technical Architect/Lead is well-defined
5. **Location** — Pune presence is ideal for me"

### Q2: Tell me about a conflict with a team member.
**A:** *(Use STAR format)*

"**Situation:** At UTEC, a senior developer disagreed with my decision to use OpenSearch for search, arguing MySQL full-text index was sufficient.

**Task:** We needed sub-second search across millions of records with faceted filtering.

**Action:** Instead of pulling rank, I proposed a 3-day POC. We implemented both approaches and benchmarked with production-like data.

**Result:** OpenSearch was 10x faster at P95 latency and supported features MySQL FTS couldn't (fuzzy matching, analyzers, aggregations). The developer appreciated the data-driven approach and became an advocate for OpenSearch. We documented the decision in an ADR (Architecture Decision Record)."

### Q3: Tell me about a time you failed.
**A:** "**Situation:** During UTEC's third-party logistics API integration, I estimated 2 weeks.

**What went wrong:** The API documentation was outdated, had undocumented rate limits (50 req/min, not the 1000/min stated), and returned inconsistent error codes.

**Impact:** Missed deadline by 8 days. The delayed integration blocked the QA team.

**What I learned:**
1. Always do a **spike/POC** before estimating third-party integrations
2. Add **50% buffer** for external API work
3. Contact the API provider early to verify docs
4. I now create a **risk register** for every sprint with mitigation plans"

### Q4: How do you handle pressure/tight deadlines?
**A:** "Real example from P&G Olay migration:

We had a hard deadline to migrate 10,000 products before Black Friday. Three weeks before, we were at 40%.

**What I did:**
1. **Broke work into parallel streams** — assigned batch ranges to 3 developers
2. **Cut scope** — migrated core product data first, deferred images/reviews to phase 2
3. **Automated testing** — built reconciliation script that ran nightly to catch issues early
4. **Daily standups** — 15-min syncs to unblock anyone immediately

**Result:** Completed migration 2 days early. Zero data inconsistencies. Client was thrilled."

### Q5: Where do you see yourself in 5 years?
**A:** "Growing into a **Technical Architect** role where I:
1. Design system architectures for enterprise-scale projects
2. Make technology decisions across teams
3. Mentor senior developers into technical leads
4. Stay hands-on with code (at least 30% of my time)
5. Contribute to Capgemini's technical excellence and knowledge sharing initiatives"

### Q6: Why are you looking to leave LTIMindtree?
**A:** "I've had great experiences at LTIMindtree, working on diverse projects like P&G and EY Risk.ai. I'm looking for:
1. Larger-scale systems with greater architectural ownership
2. More exposure to cloud-native and microservices architecture
3. A clear growth path into architecture/lead roles
Capgemini's project scale and global exposure aligns with these goals."

### Q7: What is your expected CTC? How do you justify it?
**A:** "Based on my 5+ years of experience, strong AWS/Node.js expertise, and proven impact (50% faster processing, 30% search improvements), I'm targeting [X LPA]. I bring:
- Backend architecture experience at scale (110-member project)
- Cloud-native expertise (Lambda, EC2, S3, OpenSearch, Redis)
- AI/ML integration experience (EY Risk.ai)
- Proven mentoring ability and team leadership"

---

## 16. Questions to Ask the Interviewer

1. "What is the tech stack and project type I'd be working on?"
2. "How is the team structured? How many developers, and what does the development lifecycle look like?"
3. "What does the growth path look like for a Senior Software Engineer at Capgemini?"
4. "Are there opportunities for cloud certifications or technical training?"
5. "What's the onboarding process for experienced hires?"
6. "How does Capgemini handle on-call and production support?"

---

## 17. Last 2 Days Revision Plan

### Day -2 (Focus Day)

| Time | Topic | Duration |
|------|-------|----------|
| Morning | Self-intro + Resume project stories (Sections 3-4) | 1.5 hrs |
| Late Morning | Project cross-questioning (Section 5) — say answers out loud | 1 hr |
| Afternoon | Node.js + JavaScript tricky questions (Sections 6, 8) | 1.5 hrs |
| Evening | Scenario-based problem solving (Section 13) | 1 hr |
| Night | System design — draw UTEC architecture on paper (Section 12) | 45 min |

### Day -1 (Polish Day)

| Time | Topic | Duration |
|------|-------|----------|
| Morning | React + TypeScript + AWS questions (Sections 7, 9, 10) | 1 hr |
| Late Morning | Database Q&A (Section 11) | 30 min |
| Afternoon | Behavioral Q&A — practice STAR format (Section 15) | 30 min |
| Evening | Quick revision cheatsheet (Section 18) — screenshot on phone | 20 min |
| Night | **SLEEP EARLY** — rested mind > cramming | - |

### What to SKIP (low ROI for L2):
- ❌ Deep DSA (linked lists, trees, graphs) — unlikely in L2
- ❌ CSS/HTML questions
- ❌ Theoretical OOP definitions (they want practical stories)
- ❌ Memorizing exact API syntax

### What to FOCUS (high ROI):
- ✅ Project stories with numbers
- ✅ "Why" behind every technology choice
- ✅ Debugging/production-issue stories
- ✅ Scenario-based problem solving
- ✅ Trade-offs and alternatives

---

## 18. Quick Revision Cheatsheet

### Impact Numbers (Memorize These)
| Metric | Value | Context |
|--------|-------|---------|
| Processing speed | **50% faster** | BigCommerce→Shopify batch operations |
| API response time | **40% reduction** | Parallel fetch + pagination |
| Search queries | **30% faster** | OpenSearch at UTEC |
| DB latency | **25% reduced** | MySQL + Redis at UTEC |
| Agent quality | **20% improved** | EY Risk.ai GPT upgrade |
| Customer satisfaction | **20% increase** | Third-party API integrations |
| Server uptime | **99.99%** | Vkonnect Health |
| Deployment time | **40% reduced** | Nested CloudFormation stacks |
| Data consistency | **100%** | BigCommerce→Shopify migration |

### Node.js One-Liners
| Concept | Answer |
|---------|--------|
| Event Loop | 6 phases: Timers→Pending→Poll→Check→Close. Microtasks between each. |
| Streams | Process chunks without loading all in memory. 4 types: R/W/D/T |
| Cluster vs Worker | Cluster = multi-process (HTTP scaling). Workers = threads (CPU tasks) |
| Memory Leak | Heap snapshot → compare deltas → find growing objects |
| process.nextTick vs setImmediate | nextTick: before event loop continues. setImmediate: check phase |

### React One-Liners
| Concept | Answer |
|---------|--------|
| Virtual DOM | JS tree diffed against previous tree → minimal DOM updates |
| useMemo | Memoize computed values. Recompute when deps change. |
| useCallback | Memoize function references. Prevents child re-renders. |
| useEffect cleanup | Runs on unmount AND before re-running effect on dep change |
| React.memo | HOC that skips re-render when props are shallowly equal |

### AWS One-Liners
| Service | Purpose |
|---------|---------|
| Lambda | Serverless functions, event-driven, auto-scale, pay-per-execution |
| EC2 | Virtual servers, full control, long-running processes |
| S3 | Object storage, presigned URLs, lifecycle policies |
| API Gateway | REST/WebSocket front door, rate limiting, auth |
| ElastiCache | Managed Redis/Memcached, caching, sessions |
| RDS | Managed MySQL/Postgres, read replicas, automated backups |
| OpenSearch | Full-text search, log analytics, custom analyzers |
| SQS/SNS | Message queue (point-to-point) / Pub-sub (fan-out) |
| CloudFormation | IaC, nested stacks, reproducible infrastructure |
| CloudWatch | Monitoring, alerts, log aggregation, custom metrics |

### Database One-Liners
| Concept | Answer |
|---------|--------|
| Composite Index | Multi-column index. Leftmost prefix rule applies. |
| EXPLAIN | Shows query execution plan. Look for full scans, filesort. |
| N+1 Problem | Fetching parent then looping for children. Fix: JOIN or batch. |
| Redis LRU | `allkeys-lru` — evict least recently used when memory full |
| MongoDB Sharding | Distribute data across servers. Choose high-cardinality shard key. |

### Scenario Response Framework
```
1. TRIAGE (0-5 min)  → What's affected? How severe? Recent changes?
2. DIAGNOSE (5-15 min) → Logs, metrics, DB state, external deps
3. MITIGATE (15-30 min) → Quick fix: rollback/cache/scale/circuit-break
4. ROOT CAUSE (post-incident) → Why did it happen? What prevent recurrence?
```

---

**You've got this, Onkar. Lead with project stories, own your numbers, and show you think like a senior engineer — not just code like one. 🚀**
