# 18-LLD-Machine-Coding

Zero machine-coding LLD problems exist anywhere in the repo today — confirmed during `/prep-analyze` and `/prep-gaps`. The standard dedicated round at this YOE (Flipkart/Swiggy/Razorpay/Atlassian-tier product companies). `_meta/PRODUCT_COMPANY_READINESS.md`: LLD scores 2/5, capped because the two genuinely Expert-level files that exist (`14-Design-Patterns/creational/factory/README.md`, `.../singleton/README.md`) are theory pages, not machine-coding solutions.

## Sequencing — SOLID-first, not machine-coding-first

Per `_meta/MASTER_ROADMAP.md` §11's priority table: fix `14-Design-Patterns/fundamentals/solid-principles.md`'s zero-code problem *before* starting here. It's the cheapest, highest-frequency LLD fix in the repo and several machine-coding problems below (Parking Lot's payment-strategy Strategy pattern, Splitwise's settlement-algorithm) directly exercise SOLID principles that file currently can't demonstrate in code.

## Planned problems (one per week, per `_meta/WEEKLY_PLANS.md`)

| Problem | Week (Plan A) | Notes |
|---|---|---|
| `parking-lot/` | Week 8 | First — smallest scope, good template for the rest |
| `bookmyshow/` | Week 10 | |
| `rate-limiter-class/` | — | Contrast with the *system*-design rate limiters already in `07-System-Design/01-auth-caching-api.md` — this is the OO class-design version, not the distributed-systems version |
| `splitwise/` | Plan B, weeks 21–22 | |
| `elevator/` | Plan B, weeks 21–22 | |

Each solution = requirements doc, class diagram, working TypeScript, and one answered extension question — matching the depth bar `14-Design-Patterns/creational/factory/README.md` already sets for the rest of the repo.
