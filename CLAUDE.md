# Interview-Practice — Context for Claude

## Owner profile (use this in EVERY analysis and recommendation)
- Onkar Sawant, Senior Software Engineer, ~6 YOE, Pune. Stack: Node.js, TypeScript, React, AWS serverless (Lambda, API GW, SQS/SNS/EventBridge, DynamoDB, S3, CloudFormation, OpenSearch), MySQL/MongoDB, Redis, microservices, GenAI/agentic AI (LangGraph/LangChain, RAG, MCP).
- Project story anchors: (1) UTEC/UltraTech construction SaaS — OpenSearch migration 2s→200ms, notification engine, VAPT-hardened APIs; (2) EY Risk.ai agentic AI platform; (3) P&G Olay BigCommerce→Shopify GraphQL migration; (4) Vkonnect Health MERN + EC2→Lambda migration (245+ Lambdas story).
- Target: product companies (Google-tier bar), Senior/SDE-2 full-stack backend-lean, Node/TS/AWS. Active pipeline in parallel — never sacrifice this week's real interview for the roadmap.

## Hard rules for all prep commands
1. Evidence over assumption: cite actual file paths + line-level observations. Notes prove exposure, NOT ability — cap any skill score lacking solving/implementation evidence and mark it ⚠️ unverified.
2. Be brutally honest. No courtesy scores. No generic advice — every recommendation names a repo file to change or create.
3. Depth over coverage: it is better to finish one file's analysis properly than to skim five.
4. All command outputs go to `_meta/` (analysis) or the numbered content folders (curriculum). Never dump long results only into chat.
5. Always update `_meta/state.json` at the end of a command run.
6. Roadmap files 01–04 from the Claude.ai analysis (if present in `_meta/imported/`) are the baseline — refine them with local-repo evidence rather than regenerating from scratch.
7. All code examples: modern JavaScript or TypeScript. Complexity analysis mandatory on anything algorithmic.
8. Formatting: tables for comparisons, one H1 per file, linked-doc header (see `/prep-link`) on every content file.

## State file schema — `_meta/state.json`
{ "inventory_done": false, "files_analyzed": [], "files_pending": [], "gaps_done": false,
  "roadmap_done": false, "curricula_done": [], "restructure_done": false,
  "problem_log_count": 0, "current_week": null, "last_command": null, "updated": null }
