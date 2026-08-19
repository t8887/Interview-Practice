---
topic: SOLID Principles
level: intermediate
status: draft
last_reviewed: 2026-08-19
next_review: 2026-08-20
---

SOLID Principles (concise architecture-first)

Definition
- SOLID is an acronym for five object-oriented design principles that improve maintainability, testability, and extensibility.

Principles table
| Letter | Name | Short Description | Architecture impact |
|---|---|---:|---|
| S | Single Responsibility Principle | A class/module should have one reason to change | Keeps services small and bounded in microservices
| O | Open/Closed Principle | Open for extension, closed for modification | Use stable interfaces and extension points (plugins, feature flags)
| L | Liskov Substitution Principle | Subtypes must be substitutable for supertypes | Avoid fragile inheritance; prefer composition
| I | Interface Segregation Principle | Small, specific interfaces | Reduces coupling between services/clients
| D | Dependency Inversion Principle | Depend on abstractions, not concretions | Enables DI containers, test doubles, and swapable implementations

When to apply (Architecture use cases)
- Microservices: SRP → one capability per service, smaller deploy surface.
- Libraries/SDKs: OCP → expose extension points via interfaces/events.
- Backend APIs: ISP → different clients get different interface subsets.

Backend example (concept)
- Use repository interfaces + DI to swap DB adapters (SQL, DynamoDB).

Frontend example (concept)
- Small presentational components (SRP), and container components handle orchestration.

Node.js example (concept)
- Use constructor injection and small modules instead of large singletons.

Advantages
- Improves testability and parallel development.

Disadvantages / Trade-offs
- Over-applying can lead to many tiny files and indirection.

Interview explanation
- Give concise examples: refactor a big class into two responsibilities; show how DI helps unit testing.

When NOT to use
- Tiny one-off scripts where over-design would slow progress.

Related patterns
- Dependency Injection, Repository, Adapter.

## Prerequisites
[`fundamentals/coupling-vs-cohesion.md`](./coupling-vs-cohesion.md), [`fundamentals/composition-vs-inheritance.md`](./composition-vs-inheritance.md) (LSP mention here should cross-link there — not yet linked).

## Related
[`creational/factory/README.md`](../creational/factory/README.md), [`creational/singleton/README.md`](../singleton/README.md) — both Expert-rated, both demonstrate DIP/SRP in real code; **use their 20-section structure as the template this file needs to reach the same depth.** `structural/`, `behavioral/` (❌ not yet created — "Related patterns" below points to Dependency Injection/Repository/Adapter pages that don't exist yet).

## Interview Questions (hardest first)
1. Write a TypeScript `User` class that violates SRP (handles persistence + email-sending + validation), then split it into 3 single-responsibility classes — live, not from memory.
2. Write the classic LSP violation (`Rectangle`/`Square` or `Bird`/`Penguin.fly()`) and explain why it violates LSP specifically, not just "bad design" generally.
3. Implement DIP: a `PaymentService` depending on a `PaymentGateway` interface, not a concrete `StripeGateway` — show how this enables swapping in a `MockGateway` for tests.
4. When does applying SOLID rigorously produce *worse* code (per this file's own "Disadvantages" row — "many tiny files and indirection")? Give a concrete example of over-application.
5. ISP: design two different client interfaces for the same backend service where one client needs 2 methods and another needs 8 — why is one fat interface worse than two focused ones here?

## Exercises
1. **This file's single highest-leverage fix (per `_meta/MASTER_ROADMAP.md` §11):** write a TypeScript `User` class that violates SRP (persistence + email + validation in one class), then split it into 3 classes — this file currently has zero code across all 5 principles for a topic that's one of the most reliably-asked "walk me through it" requests at this level.
2. Write the classic LSP violation (`Rectangle`/`Square` or `Bird`/`Penguin.fly()`) in TypeScript, then fix it via interface redesign or composition.
3. Implement DIP: a `PaymentService` depending on a `PaymentGateway` interface, and show how this enables swapping in a `MockGateway` for tests.

## My Real-World Usage
Dependency Inversion (interface + swappable concrete implementation) is the direct pattern behind the UTEC repository-layer abstraction (MySQL vs. DynamoDB adapters) and the EY Risk.ai agent's swappable LLM-provider design — both are ready-made anchors for the DIP exercise above once it's written.

## Common Mistakes
- Explaining SOLID entirely in prose without ever writing the violating-then-fixed code — this file's own current state, and the single most consequential gap flagged in this repo's `/prep-gaps` pass (`_meta/SKILL_GAP_ANALYSIS.md`: "zero code across all 5 principles... currently zero implementation evidence despite strong structure").
- Treating LSP as "just don't break inheritance" instead of the precise behavioral-substitutability contract it actually is.
- Applying DIP by adding an interface to literally everything, regardless of whether more than one implementation will ever exist — the over-application risk this file's own table names but doesn't demonstrate.
