---
topic: Factory Pattern
level: expert
status: solid
last_reviewed: 2026-08-19
next_review: 2026-08-20
---

Factory Pattern

1. Definition
- The Factory pattern provides an interface for creating objects but lets subclasses or functions decide which concrete class to instantiate. It abstracts the instantiation process.

2. Problem it solves
- Encapsulates object creation logic, decouples clients from concrete types, and centralizes construction configuration.

3. Real-world analogy
- A car factory assembly line that, given a model spec, produces the appropriate car variant without the buyer handling low-level assembly.

4. Architecture use cases
- Creating adapters for third-party providers (payments, storage) using a factory to select provider implementation at runtime.

5. Backend examples
- Selecting DB adapters (Postgres, MySQL, Dynamo) based on config; creating service clients per environment.

6. Frontend examples
- Component factory selecting UI widget implementations for different platforms.

7. Node.js examples
- Export a factory function that returns different repository implementations per test/production environment.

8. AWS/cloud examples
- Factory for selecting S3 clients vs local-dev file stores; choosing serializer for event payloads depending on topic.

9. Advantages
- Improves testability and modularity; centralizes creation logic; enables plugin-style extensibility.

10. Disadvantages
- Can add indirection; many small factories may complicate navigation.

11. Performance considerations
- Minimal overhead; avoid heavy logic in factories — prefer lightweight mapping and DI integration.

12. Common mistakes
- Encoding too much business logic in factories; using them as a god object.

13. Interview explanation
- Explain separation of concerns: client code depends on factory interface, not concretes; mention how DI can replace factories at scale.

14. Interview trick questions
- Q: How does factory differ from DI container? A: Factory is a focused object-creation abstraction; DI containers provide broader graph wiring and lifecycle management.

15. Real production use cases
- Payment gateway selector (Stripe/Adyen) behind a factory that constructs provider client with credentials+retry policies.

16. Related patterns
- Abstract Factory, Builder, Strategy (for behavior selection), Dependency Injection.

17. Anti-pattern comparison
- Factory vs Switch-on-type anti-pattern: prefer mapping/config-driven factories rather than long switch statements.

18. Folder-level diagram
```
creational/
└── factory/
		└── README.md  (factory docs + examples)
```

19. Sequence flow
- Client calls `Factory.create(options)` → Factory selects implementation → returns instance to client.

20. Code examples

JavaScript — simple provider factory
```javascript
// providers/s3Provider.js
class S3Provider { constructor(cfg){ this.cfg = cfg } put(){ /*...*/ } }
class LocalProvider { constructor(cfg){ this.cfg = cfg } put(){ /*...*/ } }

// providers/factory.js
function createStorageProvider(type, cfg){
	if (type === 's3') return new S3Provider(cfg);
	if (type === 'local') return new LocalProvider(cfg);
	throw new Error('unknown provider');
}

module.exports = { createStorageProvider };

// usage
const { createStorageProvider } = require('./providers/factory');
const store = createStorageProvider(process.env.STORE || 'local', { root: '/tmp' });
```

TypeScript — typed factory with registry
```typescript
type Storage = { put(key:string, buf:Buffer): Promise<void> };

class S3Storage implements Storage { constructor(private cfg:any){} async put(){}}
class LocalStorage implements Storage { constructor(private cfg:any){} async put(){}}

const registry: Record<string, (cfg:any)=>Storage> = {
	s3: cfg => new S3Storage(cfg),
	local: cfg => new LocalStorage(cfg),
};

export function createStorage(type: string, cfg: any): Storage {
	const factory = registry[type];
	if (!factory) throw new Error('Unknown storage');
	return factory(cfg);
}
```

Node.js + DI tip
- In Node apps, prefer wiring factories at bootstrap and inject instances into services, this keeps factories out of business logic and easy to mock.

When NOT to use
- For trivial object creation that doesn't change or when a DI container already manages lifecycles.

## Prerequisites
[`fundamentals/solid-principles.md`](../../fundamentals/solid-principles.md) (Dependency Inversion — factories are one of the standard mechanisms for depending on abstractions, not concretions).

## Related
[`creational/singleton/README.md`](../singleton/README.md) (this repo's other Expert-rated pattern page — same 20-section template, use both as the depth bar for every future pattern file). `structural/`, `behavioral/` (❌ not yet created — see `14-Design-Patterns/todo.md`).

## Interview Questions (hardest first)
1. Factory vs. DI container — what's the actual difference in scope? (This file's own trick question — give the model answer from memory, not by re-reading it.)
2. When does a factory become a god object? Where's the line between "centralizes creation logic" (good) and "encodes too much business logic" (this file's own named common mistake)?
3. Extend this file's typed TypeScript registry factory to support *async* factories (a provider that must authenticate before use) — how does that change the calling contract for every consumer?
4. Contrast Factory with Abstract Factory — this file names Abstract Factory as a related pattern but doesn't implement it (still ❌ in `14-Design-Patterns/creational/`). Sketch what an Abstract Factory version of the storage-provider example would look like.
5. How do you test code that depends on a factory-created instance, without hitting real infrastructure?

## Exercises
1. Implement an Abstract Factory (e.g., a themed UI-kit factory producing matching `Button`+`Checkbox` for light/dark themes) and explicitly contrast it with this file's simple Factory.
2. Add 2 more interview trick questions with model answers (god-object risk, testing factory-created instances) — this file currently has only one.
3. Extend the TypeScript registry factory to support async factories and discuss how that changes the calling contract.

## My Real-World Usage
The provider-selection factory pattern here (S3 vs. local storage, selected by `process.env.STORE`) is the same shape as choosing between a mock and a real payment gateway, S3 vs. Azure Blob (P&G Olay migration context), or DynamoDB vs. a local test double across the UTEC/Vkonnect stack.

## Common Mistakes
- Encoding business logic (not just object-selection logic) inside the factory function — the file's own named anti-pattern.
- Using a long `switch`/`if-else` chain on a type string instead of a config-driven registry map (this file's own "Anti-pattern comparison" section names this explicitly).
- Reaching for a full DI container when a 5-line factory function would do — over-engineering in the opposite direction from the god-object risk.

