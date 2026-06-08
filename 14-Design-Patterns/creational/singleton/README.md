
Singleton Pattern

1. Definition
- The Singleton ensures a class has only one instance and provides a global access point to it.

2. Problem it solves
- Controls shared state/resources (configuration, connection pools, logging) and ensures single initialization.

3. Real-world analogy
- A single system-wide configuration safe-deposit box accessed by different modules.

4. Architecture use cases
- Shared caches, metrics/logging instances, process-wide config, connection pools (but prefer DI for testability).

5. Backend examples
- Application-wide logger, DB connection manager in small apps, feature-flag manager.

6. Frontend examples
- Single event bus, global theme manager (but prefer context/providers in React over classic singletons).

7. Node.js examples
- Module-level singleton via `module.exports` caching (common pattern); care for hot-reload and test isolation.

8. AWS/cloud examples
- Single instance in a serverless environment is unsafe — avoid relying on singletons across Lambda invocations; use managed services (RDS Proxy, ElastiCache) instead.

9. Advantages
- Simple to implement and use; guarantees single instance; useful for cross-cutting concerns.

10. Disadvantages
- Global state introduces hidden coupling and testability issues; can become a god object.

11. Performance considerations
- Instantiation cost minimal; watch for contention if singleton guards shared resources (mutex, locks).

12. Common mistakes
- Overusing singleton for mutable state, hiding dependencies, assuming single-process deployment (not valid in multi-node apps).

13. Interview explanation
- State when it's OK (process-local, stateless single instance like logger), when to prefer DI (testability), how to handle multi-instance environments.

14. Interview trick questions
- Q: Is Singleton safe in Lambda? A: No — Lambda may run multiple cold starts with separate processes; prefer external singletons (managed services) or per-invocation initialization.

15. Real production use cases
- Centralized metrics/logging agent (but often backed by local aggregator), process-level caches for expensive computations (with eviction strategies).

16. Related patterns
- Dependency Injection, Registry, Module Pattern, Factory (for controlled creation).

17. Anti-pattern comparison
- Singleton vs Global mutable variables — Singleton wraps state with controlled access; still a global. Prefer explicit injection.

18. Folder-level diagram (markdown)

```
study/design-patterns/
└── creational/
		└── singleton/
				└── README.md  (this file)
```

19. Sequence flow explanation
- On first request, create the instance; subsequent requests return cached instance. In Node.js this often leverages module caching.

20. Code examples

JavaScript (browser / generic JS) — simple class singleton
```javascript
// Logger.js
class Logger {
	constructor() {
		if (Logger._instance) return Logger._instance;
		this.buffer = [];
		Logger._instance = this;
	}
	info(msg) { this.buffer.push({ level: 'info', msg, t: Date.now() }); }
	flush() { /* send to backend */ this.buffer.length = 0 }
}

export default Logger;

// usage
import Logger from './Logger.js';
const l1 = new Logger();
const l2 = new Logger();
console.log(l1 === l2); // true
```

TypeScript — typed singleton with lazy init
```typescript
// src/singleton/Config.ts
export class Config {
	private static instance: Config | null = null;
	private constructor(public readonly env: string) {}
	static getInstance(): Config {
		if (!Config.instance) Config.instance = new Config(process.env.NODE_ENV || 'development');
		return Config.instance;
	}
}

// usage
const cfg = Config.getInstance();
```

Node.js (module-cache pattern) — preferred for small services; easier to mock by requiring a factory in tests
```javascript
// src/logger.js
class Logger {
	constructor() { this.level = process.env.LOG_LEVEL || 'info' }
	info(msg) { console.log('[INFO]', msg) }
}

module.exports = new Logger(); // module caching makes this a singleton per-process

// usage
const logger = require('./logger');
logger.info('started');
```

Notes on Node.js testing
- Prefer exporting a factory or class in libraries and create singletons at the application entry point to allow test isolation.

When NOT to use this pattern
- Cross-process shared state, or when you need per-request isolation (use DI or request-scoped services).

Scaling concerns
- Singletons do not naturally scale across multiple processes or nodes; design for statelessness or use external services for shared state.

