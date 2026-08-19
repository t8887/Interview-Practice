# Company Interview Prep — Index

> Additive only. Each folder has a `README.md` (self-quiz with collapsible answers) and a `questions.json` (machine-readable for HTML study tracker).

---

## Companies

| Company | Role Target | Domain | Questions | Files |
|---|---|---|---|---|
| [HealthSystems](./healthsystems/README.md) | Senior Full-Stack Engineer | Healthcare SaaS (ABDM, FHIR, EHR) | 45 | [README](./healthsystems/README.md) · [JSON](./healthsystems/questions.json) |
| [Setu](./setu-health/README.md) | SDE 2 / Senior Engineer | Fintech API Infrastructure (UPI, AA, BBPS, NACH) | 45 | [README](./setu-health/README.md) · [JSON](./setu-health/questions.json) |
| [TEKsystems → HSBC](./teksystems-hsbc/README.md) | Node.js Backend Developer / Architect | Banking (vendor: TEKsystems, client: HSBC) | 45 | [README](./teksystems-hsbc/README.md) · [JSON](./teksystems-hsbc/questions.json) · [Guide](./teksystems-hsbc-nodejs-backend.md) |
| [bolttech → Multivision](./bolttech-multivision-interview-prep.md) | Senior Software Engineer | Insurtech — AWS Connect + GenAI contact center (vendor: Multivision, client: bolttech) | — | [Guide](./bolttech-multivision-interview-prep.md) |
| [Guardian India](./guardian-india/guardian-prep.md) | Java Full Stack Developer (5–8 yrs, R000109113) | Life insurance GCC (Guardian Life US) — Java/Node, React, SQL, Kafka, AWS | 40 (recall bank, no JSON) | [Guide](./guardian-india/guardian-prep.md) |
| [Coforge](./coforge-tech-lead/coforge-prep.md) | Technical Lead — Node.js + React (client-facing delivery, team 4–8) | IT services — BFSI, insurance, travel (ex-NIIT Tech) — Node lead-depth, React, microservices, AWS serverless, AI differentiator | 50 (recall bank, no JSON) | [Guide](./coforge-tech-lead/coforge-prep.md) |
| [EY → HDFC Ergo](./EY-HDFC-Ergo-Apigee/interview-prep.md) | Backend (Node.js/NestJS) + Apigee Developer, 2–4 yrs (For HE Only) | General insurance (motor/health/travel) — vendor: EY, payroll: HDFC Ergo — Apigee, PostgreSQL, GCP | 32 (by round, no JSON) | [Guide](./EY-HDFC-Ergo-Apigee/interview-prep.md) |
| [Capgemini](./capgemini-L2-interview-prep.md) | L2 Engineer | Enterprise IT | — | [Guide](./capgemini-L2-interview-prep.md) |
| [CitiusTech](./citiustech-L1-interview-prep.md) | L1 Engineer | Healthcare IT | — | [Guide](./citiustech-L1-interview-prep.md) |
| [Deloitte](./deloitte-interview-prep.md) | Consultant | Cyber / Risk | — | [Guide](./deloitte-interview-prep.md) |
| [Encora](./encora-L2-backend-engineer.md) | L2 Backend Engineer | Node.js / Kubernetes | — | [Guide](./encora-L2-backend-engineer.md) |
| [Infosys](./infosys-L2-interview-prep.md) | L2 Engineer | Enterprise | — | [Guide](./infosys-L2-interview-prep.md) |
| [Persistent](./persistent-aws-backend-developer.md) | Backend Developer | AWS | — | [Guide](./persistent-aws-backend-developer.md) |
| [TCS](./tcs-L2-hr-preparation.md) | L2 HR Round | Enterprise | — | [Guide](./tcs-L2-hr-preparation.md) |

---

## Question Buckets (HealthSystems & Setu)

| Bucket | HealthSystems | Setu |
|---|---|---|
| Core JavaScript / TypeScript | 8 (hs-001 – hs-008) | 8 (setu-001 – setu-008) |
| Node.js Internals & Backend | 8 (hs-009 – hs-016) | 8 (setu-009 – setu-016) |
| System Design & Architecture | 5 (hs-017 – hs-021) | 5 (setu-017 – setu-021) |
| AWS / Cloud | 5 (hs-022 – hs-026) | 5 (setu-022 – setu-026) |
| React / React Native | 4 (hs-027 – hs-030) | 4 (setu-027 – setu-030) |
| Domain & Compliance | 5 (hs-031 – hs-035) Healthcare/ABDM/DPDP | 5 (setu-031 – setu-035) Fintech/RBI/NPCI |
| Company / Product-Specific | 5 (hs-036 – hs-040) | 5 (setu-036 – setu-040) |
| Behavioral / STAR | 5 (hs-041 – hs-045) | 5 (setu-041 – setu-045) |
| **Total** | **45** | **45** |

### Question Buckets (TEKsystems → HSBC)

> Node.js Backend / Architect, banking-framed. IDs `tek-001 – tek-045`.

| Bucket | Count | IDs |
|---|---|---|
| Core JavaScript / TypeScript | 6 | tek-001 – tek-006 |
| Node.js Internals & Backend | 8 | tek-007 – tek-014 |
| REST API & Express Design | 5 | tek-015 – tek-019 |
| Security & Auth | 5 | tek-020 – tek-024 |
| Databases & Caching | 6 | tek-025 – tek-030 |
| System Design & Architecture | 7 | tek-031 – tek-037 |
| DevOps / CI-CD / Containers | 3 | tek-038 – tek-040 |
| Behavioral / STAR (HSBC values) | 5 | tek-041 – tek-045 |
| **Total** | **45** | |

---

## How to use

1. **Self-quiz:** Open `README.md`, read the question, try to answer aloud, expand `<details>` to check.
2. **HTML tracker:** Feed `questions.json` into your study tracker. Schema: `{ id, company, category, difficulty, question, answer, tags }`.
3. **Add companies:** Create a new folder, add `README.md` + `questions.json`, add a row to this INDEX.
