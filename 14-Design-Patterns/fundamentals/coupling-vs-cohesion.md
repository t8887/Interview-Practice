Coupling vs Cohesion

Definition
- Coupling: degree of interdependence between modules. Lower is better.
- Cohesion: how closely related responsibilities within a module are. Higher is better.

Short table
| Aspect | Good | Bad |
|---|---|---|
| Coupling | Loose, via interfaces/events | Tight, direct imports across domains |
| Cohesion | Single responsibility and focused | God modules mixing unrelated logic |

Architecture use cases
- Event-driven microservices reduce coupling via async messages.
- BFF or API Gateway reduces coupling between frontend clients and internal services.

Practical techniques
- Use interfaces, DTOs, and versioned APIs to hide internal shape changes.
- Introduce service boundaries aligned with business capability.

Common interview question
- How would you split a monolith into services? Answer: analyze cohesion, split along business capabilities, minimize runtime coupling (sync calls), and introduce contracts.
