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
