# Guardian India — Java Full Stack Developer | Interview Prep

> **Role:** Java Full Stack Developer, 5–8 yrs | Chennai / Gurgaon | Req ID R000109113
> **Candidate:** Onkar Sawant — Senior SWE (~6 yrs), Node.js/TS/React/AWS-serverless primary, currently EY (Risk.ai agentic AI platform)
> **Core thesis:** The JD says "Java Spring Boot **/ Node.js (Express)**" — you are a legitimate candidate on the Node path. Your job in this interview is to (a) be un-disqualifiable on Java/SQL/Kafka basics, (b) dominate on React/TS/AWS/event-driven/AI where you're genuinely senior.
> **Prep priority order:** Core Java → SQL → Kafka → Spring vocab → everything else.

---

## 1. Company Intelligence [HIGH]

**Business model.** Guardian Life Insurance Company of America — founded 1860, HQ New York, one of the largest US **mutual** life insurers (~29M customers). *Mutual* = owned by policyholders, not shareholders → profits return as policyholder dividends → long-horizon, stability-first decision making. Product lines: whole/term **life insurance**, **disability income** (a market leader), **dental & vision** (among the largest US dental insurers), supplemental health, absence management, and group **workplace benefits** sold via employers and brokers. Note the B2B2C shape: much of their tech serves employers, brokers, and HR platforms — not just end consumers.

**Why India GCCs.** Guardian India Operations Pvt Ltd has run GCCs in **Gurugram and Chennai for ~10 years, ~2,500 people**, covering technology services, operations, and business analytics. Leadership (Shiney Prasad) publicly frames it as a "**microcosm of Guardian**" — i.e., not a vendor back-office but a center that owns products and creates insurance IP. It's a 3x "Great Place to Work" certified org. **Use this:** ask about end-to-end product ownership in the GCC (Section 13) — it signals you did homework and want ownership, not tickets.

**"Inspire well-being" → engineering culture.** Their purpose statement is "inspire well-being" (customers, colleagues, communities). For engineering that translates to: reliability as a moral obligation (a claim is paid at the worst moment of someone's life), data privacy discipline (PHI/PII — dental/disability are health-adjacent), accessibility, and maintainable systems over move-fast-break-things. Interview line: *"In insurance, boring reliability is a feature — I learned that operating a 6M-user platform where downtime had real-world consequences."*

**3 smart insurance-tech talking points:**
1. **Policy admin modernization** — insurers run decades-old policy administration systems (PAS); the industry play is strangler-pattern migration to API-first microservices on cloud. → *Your hook: Vkonnect EC2→Lambda migration and UTEC CloudFormation IaC = you've done incremental legacy-to-cloud safely.*
2. **Claims automation** — dental/disability claims are high-volume and rules-heavy → straight-through processing, document extraction (OCR/IDP), AI fraud flagging. → *Your hook: EY Risk.ai agentic pipelines are the exact skillset for claims-document intelligence.*
3. **Digital-first group benefits** — enrollment APIs, broker/employer portals, integrations with HR platforms → event-driven integration at scale (Kafka/SQS territory). → *Your hook: UTEC's SNS→SQS fanout patterns for 6M users.*

---

## 2. Fit-Gap Matrix [HIGH]

| JD Requirement | Level | Bridge strategy | Proof story |
|---|---|---|---|
| React, TypeScript, HTML/CSS | **Strong** | Sharpen to senior depth (Sec 8) | UTEC dashboards, P&G Olay storefront |
| Node.js / Express backend | **Strong** | Lead with it — JD explicitly allows it | All four projects |
| Java Spring Boot | **Gap** | Survival fluency (Sec 4–5) + honest "conversant, fast ramp" framing (Sec 3) | Copilot-accelerated ramp story |
| Core Java | **Gap** | Crash module (Sec 4) — this is the make-or-break screen | — |
| Microservices architecture | **Strong** | Reframe serverless as microservices (it is) | UTEC: independent Lambdas per domain, API GW, queues |
| REST API design | **Strong** | Prep versioning/idempotency/pagination answers | UTEC public APIs, VAPT-hardened |
| MySQL + PostgreSQL, PL/SQL, query optimization | **Gap→Partial** | SQL deep dive (Sec 6) — you know data modeling, just NoSQL-flavored | MongoDB aggregation pipelines ≈ transferable thinking |
| Kafka | **Gap** | Learn via SQS/SNS contrast (Sec 7) — concepts transfer 70% | UTEC SQS/SNS event-driven design |
| SNS/SQS event-driven | **Strong** | Your home turf — steer Kafka questions here | UTEC fanout, DLQs, idempotent consumers |
| CI/CD: Jenkins, Maven/Gradle | **Partial** | Concepts identical to GitHub Actions/npm; learn vocab (Sec 9) | Pipelines at iProgrammer/EY |
| JUnit/Mockito | **Partial** | Direct Jest mapping (Sec 9) — same patterns, new syntax | Jest suites on UTEC/Risk.ai |
| Redis caching | **Partial** | Know cache-aside, TTL, eviction, invalidation (Sec 9.6) | API caching layers you've built |
| AWS (ECS, EKS, EC2, S3, RDS, Lambda) | **Strong** (Lambda/S3/EC2) / **Partial** (ECS/EKS/RDS) | Decision framework + RDS-from-DynamoDB notes (Sec 9) | UTEC serverless, Vkonnect migration |
| Amazon QuickSight (preferred) | Gap (low stakes) | One honest line: "haven't used it; I've built dashboards on CloudWatch + custom React" | — |
| GitHub Copilot / AI tools | **Strong++** | Your differentiator — weaponize (Sec 10) | EY Risk.ai, GPT-4→5.1 re-architecture |
| Auth, logging, error handling, perf tuning | **Strong** | Have concrete numbers ready | VAPT remediation, JWT/OAuth middleware |
| Prod support & debugging | **Strong** | Prep one incident STAR cold (Sec 11 Q3) | UTEC 6M-user incidents |

**Honest read:** You clear ~70% of this JD at senior level. The interview risk is concentrated in a 30-minute Core Java + SQL screen. Everything in this file is weighted accordingly.

---

## 3. Positioning Strategy — "The Node.js Play" [HIGH]

**The frame (memorize the sentence):**
> *"I'm a full-stack engineer — React/TypeScript on the front, Node.js and Java-conversant on the back — with deep AWS and event-driven architecture experience, and I've spent the last year building production agentic-AI systems."*

Never say "I don't know Java." Never say "I'm a MERN developer" (sounds mid-level and stack-locked). You are a **backend/full-stack engineer whose primary runtime is Node** — runtimes are tools, architecture is the skill.

**60-second "Tell me about yourself" (tailored to Guardian):**
> "I'm a senior full-stack engineer with about six years across product companies and consulting — currently at EY, where I work on Risk.ai, an agentic AI platform. I recently led its prompt re-architecture from GPT-4 to GPT-5.1 and measured roughly a 20% response-quality improvement through systematic evals.
> Before that, I built and operated UTEC — UltraTech's construction SaaS serving about 6 million users — fully serverless on AWS: Lambda, API Gateway, DynamoDB, SQS/SNS fanout, all provisioned through CloudFormation, and I took it through VAPT security hardening. I've also done an e-commerce replatform for P&G's Olay brand — BigCommerce to Shopify with GraphQL — and migrated a telemedicine platform from EC2 to Lambda.
> My frontend is React and TypeScript throughout; my backend depth is Node and Express with working Java fluency. What draws me to Guardian is the GCC's end-to-end product ownership — I want to apply event-driven and AI experience to insurance-scale systems like claims and policy administration, in a domain where reliability genuinely matters."

**"How comfortable are you with Java/Spring Boot?" — the answer (no lying, no self-disqualification):**
> "I'm transparent about this: my production backend mileage is Node and TypeScript — Java is a language I read and can work in, not the one I've shipped the most with. Two things make me confident about the ramp. First, everything that makes backend engineering hard — API design, data modeling, event-driven patterns, transactions, testing discipline, prod debugging — I've done at scale, and that transfers completely; Spring's controller–service–repository layering is the same architecture I build in Express. Second, I ramp fast on syntax deliberately: I've already mapped Streams to array methods, CompletableFuture to Promises, JPA to the ORMs I've used — and I use Copilot to compress exactly this kind of language transition. I noticed the JD itself lists Node/Express as an accepted backend, so I'd expect to contribute in Node from day one while getting productive in the Java services within the first couple of months."

**Rules of engagement:**
- **Bridge, don't dodge.** Every Java question you half-know → answer the concept correctly, then anchor: *"...in Node I've implemented that as ___ in production."*
- **Volunteer the mapping.** Saying "CompletableFuture is Java's Promise — thenApply is .then, thenCompose is the flatMap version" *proves* learning velocity better than claiming it.
- **If asked to code Java live:** narrate architecture first, write pseudocode-ish Java, say "syntax I'd verify with the compiler — the logic is X." Interviewers at 5–8 yr level grade design > syntax.
- **Steer to your ground:** Kafka question → answer Kafka, then contrast with your SQS/SNS production design. SQL question → answer SQL, then mention DynamoDB access-pattern modeling as added perspective.

---

## 4. Core Java Crash Module [HIGH — biggest gap, study first]

### 4.1 The one mental-model shift
**Node:** single-threaded event loop; never block; concurrency via async I/O.
**Java:** thread-per-request (Tomcat pool, ~200 threads default); blocking is normal; concurrency via threads. Java 21's **virtual threads** are Java's answer to Node-style scalability (cheap threads, millions of them). Say this contrast out loud in the interview — it's a senior-level observation.

### 4.2 JS/TS → Java translation table

| You know (JS/TS) | Java equivalent | Gotcha |
|---|---|---|
| `const arr = []` | `List<String> list = new ArrayList<>();` | Program to the interface (`List`), instantiate the class |
| `new Map()` | `Map<String,Integer> m = new HashMap<>();` | Keys need correct `equals()`/`hashCode()` |
| `new Set()` | `Set<String> s = new HashSet<>();` | Same hashing rules |
| Plain object `{}` | POJO with getters/setters, or `record User(String name, int age) {}` (Java 16+) | Records = immutable data classes, mention them (modern) |
| `map/filter/reduce` | Streams API | Streams are **lazy** until a terminal op (`collect`, `count`, `forEach`) |
| `Promise` | `CompletableFuture` | `thenApply`≈`.then`, `thenCompose`≈flat-mapping `.then`, `exceptionally`≈`.catch`, `allOf`≈`Promise.all` |
| `async/await` | Blocking call on a pool thread, or `.join()` on a future; virtual threads (21+) | No `await` keyword; blocking a platform thread is the classic scaling limit |
| `setTimeout`/event loop | `ExecutorService`, `ScheduledExecutorService` | You *choose* the thread pool; pools are bounded |
| `throw new Error()` | Unchecked (`RuntimeException`) **or checked** (`IOException` — must declare/handle) | Checked exceptions don't exist in JS — classic question |
| TS `interface` (structural) | Java `interface` (**nominal** — must declare `implements`) | Java 8+: interfaces can have `default` methods |
| TS generics `<T>` | Java generics `<T>`, bounded: `<T extends Comparable<T>>` | **Type erasure**: generics vanish at runtime (like TS!) — great parallel to state |
| `undefined`/`null` + `?.` | Only `null`; `Optional<T>` for return types | `NullPointerException` is Java's billion-dollar bug; `Optional.map/orElse` reads like promise chaining |
| `npm` / `package.json` | Maven `pom.xml` / Gradle `build.gradle` | See Sec 9 |

### 4.3 Streams ↔ array methods (be able to write this cold)

```java
// Java — filter adults, get names, sort
List<String> names = users.stream()
    .filter(u -> u.getAge() >= 18)          // .filter(u => u.age >= 18)
    .map(User::getName)                     // .map(u => u.name)  — "::" is a method reference
    .sorted()
    .collect(Collectors.toList());          // terminal op — nothing runs before this (lazy)

int total = claims.stream()
    .mapToInt(Claim::getAmount)
    .sum();                                 // .reduce((a,c) => a + c.amount, 0)

Map<String, List<Policy>> byType = policies.stream()
    .collect(Collectors.groupingBy(Policy::getType));  // like lodash groupBy
```

### 4.4 CompletableFuture ↔ Promise (be able to *read* this cold)

```java
CompletableFuture.supplyAsync(() -> fetchUser(id))     // new Promise / async fn start
    .thenApply(user -> enrich(user))                   // .then(u => enrich(u))       — sync transform
    .thenCompose(user -> fetchPolicyAsync(user))       // .then(u => fetchPolicy(u))  — returns another future (flatMap)
    .exceptionally(ex -> fallbackUser())               // .catch(err => fallback)
    .thenAccept(result -> log(result));                // .then with no return

CompletableFuture.allOf(f1, f2, f3).join();            // await Promise.all([...])
```

### 4.5 The 15 most-asked Core Java questions (survival answers)

**Q1. JDK vs JRE vs JVM?** [HIGH]
JVM executes bytecode (per-OS implementation); JRE = JVM + core libraries (run apps); JDK = JRE + compiler/tools (build apps). Analogy: JVM≈Node runtime, JDK≈Node + npm + toolchain.

**Q2. `==` vs `.equals()`?** [HIGH]
`==` compares references (memory identity) for objects; `.equals()` compares logical value (if overridden). Strings: always `.equals()`. Trap: `Integer` caches −128..127, so `==` "works" for small ints then breaks. JS analogy: `==` is like comparing object references; there's no operator overloading.

**Q3. Why is String immutable? What's the string pool?**
Immutability → safe to share/cache/use as HashMap keys and thread-safe. JVM interns literals in a **string pool** so `"a" == "a"` may be true — but never rely on it. Concatenation in a loop creates garbage → use `StringBuilder`.

**Q4. String vs StringBuilder vs StringBuffer?**
String immutable; StringBuilder mutable and fast (use it); StringBuffer = synchronized legacy version (thread-safe, slower, rarely needed).

**Q5. ArrayList vs LinkedList?**
ArrayList = dynamic array: O(1) index access, O(n) middle insert; LinkedList = doubly-linked: O(1) insert at ends, O(n) access. Real answer interviewers like: *"ArrayList in practice ~always — cache locality wins."*

**Q6. How does HashMap work internally?** [HIGH — near-guaranteed]
`hashCode()` → bucket index; collisions chain in a linked list; since Java 8 a bucket **treeifies to a red-black tree** past 8 entries (O(n)→O(log n)); resizes at load factor 0.75. Keys must implement `equals()` + `hashCode()` consistently.

**Q7. HashMap vs Hashtable vs ConcurrentHashMap?**
HashMap: not thread-safe, allows one null key. Hashtable: legacy, fully synchronized — don't use. ConcurrentHashMap: thread-safe via fine-grained locking (per-bin), no null keys — the production choice for shared maps.

**Q8. equals()/hashCode() contract?**
If `a.equals(b)` then hashCodes must match (reverse not required). Break it → HashMap lookups silently fail. Override both together (IDE/Lombok/records do it for you).

**Q9. Checked vs unchecked exceptions?** [HIGH — JS has no equivalent]
Checked (`IOException`, `SQLException`): compiler forces `try/catch` or `throws` declaration — for recoverable conditions. Unchecked (`RuntimeException`: NPE, `IllegalArgumentException`): programming errors, no forced handling. Modern Java (and Spring) leans unchecked. JS/TS has only unchecked — say that mapping.

**Q10. final vs finally vs finalize?**
`final`: constant variable / non-overridable method / non-extendable class (≈`const` + more). `finally`: always-runs block after try/catch (same as JS). `finalize()`: deprecated GC hook — just say "deprecated, never use."

**Q11. Abstract class vs interface?**
Interface = contract, multiple allowed per class, can carry `default` methods since Java 8; abstract class = shared state + partial implementation, single inheritance. Rule: interface for capability ("Comparable"), abstract class for shared skeleton code.

**Q12. Java 8+ features you'd actually use?** [HIGH]
Lambdas + method references, Streams, `Optional`, interface default methods, `CompletableFuture` (8); `var` (10); records + switch expressions (14–16); sealed classes (17); **virtual threads** (21). Naming 17/21 features signals you're current, not textbook-stale.

**Q13. What is Optional and why?**
A container that may hold a value — makes "might be absent" explicit in return types instead of null. `userRepo.findByEmail(e).map(User::getName).orElse("guest")` — chains like promises. Don't use for fields/params.

**Q14. Runnable vs Callable? ExecutorService?**
Runnable: `run()`, no return, no checked exceptions. Callable: `call()` returns `V`, can throw. You submit either to an `ExecutorService` (bounded thread pool) and get a `Future` back. Analogy: ExecutorService ≈ a worker pool you size explicitly, vs Node's implicit event loop + libuv pool.

**Q15. Garbage collection — what do you know?**
Heap is generational (young/old); most objects die young; G1 is the default collector — pauses target, no manual `free`. Tuning = heap sizing + picking collector; you'd profile before touching flags. Survival depth is fine here.

→ **Your story hook (for the whole module):** *"I ramped from JS to TypeScript, REST to GraphQL, and EC2 to serverless on the job — language transitions are a practiced skill for me, and I use Copilot to compress them further."*

---

## 5. Spring Boot Vocabulary Module [HIGH]

Goal: hold a 10-minute conversation without faking depth. Every row maps to something you've built.

| Spring concept | Your Express equivalent | Interview one-liner |
|---|---|---|
| `@SpringBootApplication` | `index.js` bootstrap | Entry point; triggers auto-configuration + component scanning |
| `@RestController` + `@GetMapping("/policies/{id}")` | `router.get('/policies/:id', handler)` | Annotation-driven routing; returns JSON by default |
| `@PathVariable` / `@RequestParam` / `@RequestBody` | `req.params` / `req.query` / `req.body` | Direct 1:1 mapping |
| IoC container + DI, `@Autowired` | Manual `require`/imports (or NestJS providers) | "Spring instantiates and wires beans for me; I'd use **constructor injection** — it's testable and explicit" |
| `@Service` / `@Repository` / `@Component` | Your controller→service→dao folder layering | Stereotype annotations marking layers for component scan; `@Repository` also translates DB exceptions |
| `application.properties` / `application.yml` + profiles (`dev`, `prod`) | `.env` + config per `NODE_ENV` | Externalized config; profiles switch config sets per environment |
| Spring Data JPA: `interface PolicyRepo extends JpaRepository<Policy, Long>` | Mongoose model / Sequelize model | Declare an interface, Spring generates the implementation; `findByCustomerIdAndStatus(...)` is auto-derived from the method name |
| `@Entity`, `@Id`, `@OneToMany` | Mongoose schema / Sequelize model defs | JPA = the ORM **spec**; **Hibernate** = the default implementation (like Sequelize being one ORM among many) |
| `@Transactional` | Mongoose sessions / Sequelize `t` | Declarative transactions — wraps the method in begin/commit/rollback |
| Spring Security filter chain | Express middleware chain with `jwt.verify` | "Ordered filters intercept requests pre-controller — same as my JWT auth middleware; I'd write a `OncePerRequestFilter` that validates the token and sets the SecurityContext" |
| `@ControllerAdvice` + `@ExceptionHandler` | Central Express error middleware `(err, req, res, next)` | Global exception → HTTP status mapping in one place |
| Actuator (`/actuator/health`, `/metrics`) | Your custom `/health` endpoint | Production endpoints out of the box — health, metrics, info |
| Embedded Tomcat, `java -jar app.jar` | `node server.js` | Self-contained deployable; no external app server — same 12-factor shape |
| Auto-configuration / starters (`spring-boot-starter-web`) | Express + body-parser + etc. preassembled | "Starters pull a curated dependency set; auto-config wires beans based on what's on the classpath" |

**Two survival snippets to recognize/say:**

```java
@RestController
@RequestMapping("/api/claims")
public class ClaimController {
    private final ClaimService service;          // constructor injection — no field @Autowired
    public ClaimController(ClaimService service) { this.service = service; }

    @GetMapping("/{id}")
    public ResponseEntity<ClaimDto> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }
}
```

```java
public interface ClaimRepository extends JpaRepository<Claim, Long> {
    List<Claim> findByPolicyIdAndStatus(Long policyId, ClaimStatus status); // impl auto-generated
    @Query("SELECT c FROM Claim c WHERE c.amount > :min")                   // JPQL when derivation isn't enough
    List<Claim> findLargeClaims(@Param("min") BigDecimal min);
}
```

**If asked "explain DI/IoC":** *"Inversion of control — the framework constructs objects and injects dependencies instead of code `new`-ing them; that decouples layers and makes unit testing trivial because I inject mocks. In Node I've done the same manually and with DI containers; Spring just makes it first-class."*

→ **Your story hook:** every Spring layer maps to the controller/service/repository structure you enforced on UTEC's Lambda codebase — say that mapping explicitly.

---

## 6. SQL Deep Dive (MySQL/PostgreSQL) [HIGH]

You're NoSQL-heavy — expect them to probe here. Own it: *"My recent depth is DynamoDB/Mongo access-pattern modeling, but I'm solid on relational fundamentals — and honestly, single-table DynamoDB design forces you to understand your query patterns better than most SQL developers do."*

### 6.1 Joins (know cold)

| Join | Returns | Insurance example |
|---|---|---|
| `INNER JOIN` | Only matching rows both sides | Customers who *have* policies |
| `LEFT JOIN` | All left + matched right (NULLs where no match) | All customers, policies if any |
| `LEFT JOIN ... WHERE right.id IS NULL` | Left rows with **no** match — the anti-join | Customers with **no** policy (classic interview question) |
| `FULL OUTER JOIN` | Everything from both (Postgres yes; MySQL: emulate with UNION) | Reconciliation reports |
| `CROSS JOIN` | Cartesian product | Rarely deliberate |

### 6.2 Indexes [HIGH]
- **B-tree** (default): sorted tree → O(log n) lookups, range scans, ORDER BY. Works for `=`, `<`, `>`, `BETWEEN`, prefix `LIKE 'abc%'` (not `'%abc'`).
- **Composite index** `(customer_id, status, created_at)`: usable **left-to-right only** (leftmost-prefix rule) — serves queries on `customer_id`, or `customer_id+status`, but *not* `status` alone. Order columns: equality filters first, then range/sort.
- **Covering index**: index contains every column the query needs → engine never touches the table ("Using index" in MySQL EXPLAIN; Index Only Scan in Postgres).
- **When indexes hurt:** every write updates every index; low-cardinality columns (e.g., `status` with 3 values) alone are near-useless; functions on the indexed column (`WHERE YEAR(created_at)=...`) kill index use — rewrite as a range.
- DynamoDB bridge: composite index ≈ GSI with partition+sort key. Say it.

### 6.3 EXPLAIN — what you look for
- **MySQL:** `type=ALL` = full table scan (bad on big tables); want `ref`/`range`/`const`; check `rows` estimate; `Extra: Using filesort / Using temporary` = sort/group not served by an index.
- **Postgres:** `EXPLAIN ANALYZE` → `Seq Scan` vs `Index Scan`/`Index Only Scan`; compare estimated vs actual rows (bad estimates → stale statistics → `ANALYZE`).
- Your scripted answer to "how do you optimize a slow query": *"Reproduce → EXPLAIN → look for scans and misestimates → fix with the right index / rewrite non-sargable predicates / reduce selected columns → re-measure. If the query is fine, look at N+1 patterns at the app layer and caching."*

### 6.4 Normalization vs denormalization
1NF atomic values → 2NF no partial dependency on composite key → 3NF no transitive dependencies (non-key depends only on the key). Normalize for write-heavy OLTP integrity; denormalize deliberately for read paths (reporting tables, caches). → *Your hook: "DynamoDB single-table design is denormalization taken to its logical end — I've lived both extremes, so I appreciate why Guardian's system-of-record data stays normalized."*

### 6.5 Transactions, ACID, isolation levels [HIGH]
ACID: Atomicity (all-or-nothing), Consistency (constraints hold), Isolation (concurrent txns don't interfere), Durability (committed survives crash).

| Isolation level | Prevents | Anomaly still possible |
|---|---|---|
| READ UNCOMMITTED | — | Dirty reads (see uncommitted data) |
| READ COMMITTED (**Postgres default**) | Dirty reads | Non-repeatable reads (row changes between two reads) |
| REPEATABLE READ (**MySQL/InnoDB default**) | + non-repeatable reads | Phantoms (new rows appear) — InnoDB largely prevents via gap locks |
| SERIALIZABLE | Everything | Lowest concurrency; retry on serialization failures |

Knowing the **two different defaults** is a senior-signal one-liner.

```sql
START TRANSACTION;
UPDATE policies SET status = 'CLAIM_PAID' WHERE id = 42;
INSERT INTO payments (policy_id, amount, paid_at) VALUES (42, 50000, NOW());
COMMIT;  -- both or neither: that's atomicity
```

### 6.6 PL/SQL / stored procedure basics (recognition level)
```sql
DELIMITER //
CREATE PROCEDURE settle_claim(IN p_claim_id INT, IN p_amount DECIMAL(12,2))
BEGIN
  DECLARE v_policy_id INT;
  SELECT policy_id INTO v_policy_id FROM claims WHERE id = p_claim_id;
  UPDATE claims SET status = 'SETTLED', settled_at = NOW() WHERE id = p_claim_id;
  INSERT INTO payments (policy_id, amount, paid_at) VALUES (v_policy_id, p_amount, NOW());
END //
```
Vocabulary: procedures (no return, side effects) vs functions (return a value, usable in SELECT); **triggers** (auto-run on INSERT/UPDATE — audit trails, common in insurance); **cursors** (row-by-row iteration — say "I'd prefer set-based operations; cursors as last resort"). Honest framing: *"I can read and modify PL/SQL; I haven't authored large packages."*

### 6.7 Connection pooling [HIGH — your crossover strength]
Java: **HikariCP** (Spring Boot default). Node: `pg-pool` / `mysql2` pools. The trap you *know* from experience: **Lambda + RDS = connection storm** (every concurrent invocation opens connections) → **RDS Proxy** multiplexes them. → *Your hook: "I hit exactly this designing serverless against stateful datastores — it's why I default to RDS Proxy or connection-limited pool sizing per instance."*

### 6.8 Ten practical exercises (schema below — write answers by hand on Day 3)

```sql
customers(id, name, email, state, created_at)
policies(id, customer_id, product_type, status, premium_amount, start_date, end_date)
claims(id, policy_id, claim_type, amount, status, filed_at, settled_at)
payments(id, policy_id, amount, paid_at)
```

**1. Active policies with customer names (INNER JOIN):**
```sql
SELECT c.name, p.product_type, p.premium_amount
FROM policies p JOIN customers c ON c.id = p.customer_id
WHERE p.status = 'ACTIVE';
```

**2. Customers with no policies (anti-join):**
```sql
SELECT c.* FROM customers c
LEFT JOIN policies p ON p.customer_id = c.id
WHERE p.id IS NULL;
```

**3. Total premium per customer, only totals > 50,000 (GROUP BY + HAVING):**
```sql
SELECT c.id, c.name, SUM(p.premium_amount) AS total_premium
FROM customers c JOIN policies p ON p.customer_id = c.id
GROUP BY c.id, c.name
HAVING SUM(p.premium_amount) > 50000;
```

**4. Second-highest premium (both classic forms):**
```sql
SELECT MAX(premium_amount) FROM policies
WHERE premium_amount < (SELECT MAX(premium_amount) FROM policies);
-- or: SELECT DISTINCT premium_amount FROM policies ORDER BY premium_amount DESC LIMIT 1 OFFSET 1;
```

**5. Latest claim per policy (window function — memorize this pattern):**
```sql
SELECT * FROM (
  SELECT cl.*, ROW_NUMBER() OVER (PARTITION BY policy_id ORDER BY filed_at DESC) AS rn
  FROM claims cl
) t WHERE rn = 1;
```

**6. Monthly claim totals for 2025:**
```sql
-- Postgres
SELECT DATE_TRUNC('month', filed_at) AS mth, COUNT(*), SUM(amount)
FROM claims WHERE filed_at >= '2025-01-01' AND filed_at < '2026-01-01'
GROUP BY 1 ORDER BY 1;
-- MySQL: DATE_FORMAT(filed_at, '%Y-%m')
```

**7. Running total of payments per policy (window SUM):**
```sql
SELECT policy_id, paid_at, amount,
       SUM(amount) OVER (PARTITION BY policy_id ORDER BY paid_at) AS running_total
FROM payments;
```

**8. Duplicate customer emails:**
```sql
SELECT email, COUNT(*) FROM customers
GROUP BY email HAVING COUNT(*) > 1;
```

**9. Customers whose total claims exceed total premiums (CTEs):**
```sql
WITH prem AS (SELECT customer_id, SUM(premium_amount) tot FROM policies GROUP BY customer_id),
     clm  AS (SELECT p.customer_id, SUM(cl.amount) tot
              FROM claims cl JOIN policies p ON p.id = cl.policy_id GROUP BY p.customer_id)
SELECT c.name, clm.tot AS claims_total, prem.tot AS premium_total
FROM clm JOIN prem ON prem.customer_id = clm.customer_id
JOIN customers c ON c.id = clm.customer_id
WHERE clm.tot > prem.tot;
```

**10. Upsert a payment record:**
```sql
-- Postgres
INSERT INTO payments (id, policy_id, amount, paid_at) VALUES (1, 42, 5000, NOW())
ON CONFLICT (id) DO UPDATE SET amount = EXCLUDED.amount, paid_at = EXCLUDED.paid_at;
-- MySQL: ... ON DUPLICATE KEY UPDATE amount = VALUES(amount);
```

**Bonus index question they may ask:** "Query filters on `policies(customer_id, status)` and sorts by `start_date` — what index?" → `(customer_id, status, start_date)`: equality columns first, sort column last, and it may become covering if you add selected columns.

---

## 7. Event-Driven & Microservices [HIGH]

### 7.1 Kafka, learned through SQS/SNS (your home turf)

| Concept | Kafka | SQS/SNS (what you've shipped) |
|---|---|---|
| Core model | Distributed, **durable append-only log**; consumers read, nothing is deleted on read | Queue: message consumed → deleted |
| Retention / replay | Messages kept for retention period (e.g., 7 days) → **replayable**; new consumers can re-read history | No replay once deleted (14-day max retention pre-delete) |
| Unit of parallelism | **Partition** — topic is split into partitions; ordering guaranteed **within** a partition only | SQS standard: best-effort order; FIFO queue: order per `MessageGroupId` (≈ a partition key!) |
| Routing to partition | Message **key** → hash → partition (same key = same partition = ordered) | FIFO `MessageGroupId` — same mental model |
| Consumers | **Consumer group**: partitions divided among group members; max useful consumers = partition count; add a member → **rebalance** | Competing consumers on one queue; scale freely |
| Progress tracking | **Offset** per partition per group; consumer **commits** offsets | Visibility timeout + explicit delete ≈ commit |
| Fanout | Multiple consumer *groups* independently read the same topic | SNS topic → multiple SQS queues (you built exactly this) |
| Delivery semantics | At-least-once default; commit-before-process = at-most-once; idempotent producer + transactions ≈ exactly-once within Kafka | At-least-once; consumers must be idempotent (you've done this) |
| Failure handling | Dead-letter **topic** (app/framework-level) | DLQ + redrive policy (built-in) |
| When to choose | High throughput streams, replay, multiple independent readers, event sourcing | Simple decoupling, task queues, AWS-native, zero ops |

**Offset-management nuance worth saying:** auto-commit can lose or double-process messages on crash; production consumers commit **after** processing (at-least-once) and rely on **idempotency** downstream — *exactly what you did with SQS visibility timeouts and idempotent handlers on UTEC.*

### 7.2 Microservices patterns — one-liners + your receipts

| Pattern | One-liner | Your receipt |
|---|---|---|
| API Gateway | Single entry: routing, authN, rate limiting, request shaping | AWS API Gateway in front of UTEC's Lambdas — throttling + JWT authorizers |
| Service discovery | Services find each other dynamically (Eureka, K8s DNS, Cloud Map) | Implicit in serverless (managed endpoints) — know Eureka/K8s DNS by name |
| Circuit breaker | Stop calling a failing dependency; fail fast; half-open probes recovery (Resilience4j in Java, `opossum` in Node) | Timeout/retry/backoff policies on UTEC third-party calls |
| Saga | Distributed transaction as a sequence of local txns + **compensating actions**; choreography (events) vs orchestration (coordinator, e.g., Step Functions) | Frame any multi-step UTEC flow (order→provision→notify) as choreographed saga |
| Database-per-service | Each service owns its data; no shared DB; share via events/APIs | UTEC domain Lambdas each owning DynamoDB tables |
| Fanout | One event, many independent consumers | SNS→SQS fanout — your literal production pattern |
| Outbox pattern | Write event to an outbox table in the same DB txn as your data change; a relay publishes it — fixes dual-write inconsistency | Senior-signal answer when asked "how do you keep DB and Kafka consistent?" |
| Idempotency | Consumers must survive duplicate delivery (idempotency keys, conditional writes) | DynamoDB conditional writes / dedupe on UTEC |

### 7.3 Ten likely questions with answers

**Q1. What's a Kafka partition and why does it matter?** [HIGH]
The unit of parallelism and ordering: a topic splits into partitions; each is an ordered log consumed by one consumer per group. More partitions = more throughput, but ordering only holds within a partition. → *Hook: "Same model as SQS FIFO MessageGroupId, which I've used to serialize per-user events."*

**Q2. How does a consumer group work?**
Consumers sharing a `group.id` split partitions among themselves; each partition → exactly one consumer in the group. Adding/removing consumers triggers a **rebalance** (brief pause). Two *different* groups each get every message — that's fanout.

**Q3. At-least-once vs exactly-once — what do you actually do?**
Default is at-least-once (commit after processing). True exactly-once end-to-end is a myth across system boundaries — you make **consumers idempotent** (keys, upserts, conditional writes). → *Hook: your idempotent SQS consumers.*

**Q4. Consumer is slow / lag is growing — what do you do?**
Measure lag (per partition), then: scale consumers up to partition count → optimize handler (batch, async I/O, remove N+1 DB calls) → if still hot, increase partitions (careful: changes key→partition mapping) → consider backpressure or tiering slow work to a separate topic/queue. → *Hook: SQS backlog triage on UTEC — same playbook.*

**Q5. Kafka vs SQS/SNS — when each?**
Kafka: replay, multiple independent readers, stream processing, very high throughput, event sourcing. SQS/SNS: simple decoupling, task queues, AWS-native, near-zero ops. *"I'd pick per use case — I've run SQS/SNS in production and would ramp on Kafka's ops model (partitions, rebalancing, retention tuning) quickly since the concepts map directly."*

**Q6. Circuit breaker — why and how?**
Prevents cascade failure: after N failures the breaker opens and calls fail fast (or serve fallback); half-open state probes recovery. Java: Resilience4j annotations. Distinguish from retry: retry handles transient blips, breaker handles sustained failure — use both with backoff + jitter.

**Q7. Saga vs two-phase commit?**
2PC needs a coordinator lock across services — fragile, blocks, doesn't fit heterogeneous stores. Saga = local transactions + compensations (cancel/refund). Choreography for simple flows, orchestration (Step Functions / Camunda) when you need visibility into flow state. → *Hook: "In insurance, a claim payout spanning claims, payment, and ledger services is a textbook orchestrated saga."*

**Q8. Database-per-service — how do services share data then?**
They don't share tables. Options: sync API calls (coupling), **events** to build local read models (eventual consistency), CQRS for read-side aggregation. Mention the **outbox pattern** to publish reliably. → *Hook: UTEC events propagating user changes across domains.*

**Q9. How do you version REST APIs / handle breaking changes?**
Additive changes freely; breaking changes → new version (URI `/v2` or header), deprecation window, consumer-driven contract awareness. Idempotency keys on POSTs that create money-adjacent resources. → *Hook: UTEC public APIs consumed by mobile + partners.*

**Q10. How would you design a claims-intake pipeline?** (design question bait — have this ready)
API Gateway → intake service validates + persists (outbox) → event to `claims.filed` → parallel consumers: adjudication rules engine, document-extraction (AI/OCR), fraud scoring → results aggregate → status events drive notifications. Idempotent consumers, DLQs, audit log (regulatory). → *Hook: "This is structurally the SNS→SQS fanout I ran for 6M users, plus the document-AI work from Risk.ai."*

---

## 8. React + TypeScript — sharpen to senior [MED-HIGH]

Your strength. Answers below are the senior version — tradeoffs, not definitions.

**Q1. What actually causes re-renders, and how do you prevent wasted ones?**
State change re-renders the component **and its entire subtree** — props are irrelevant to whether a child re-renders (unless memoized). Fixes: `React.memo` on the child + **stable references** for props (`useMemo`/`useCallback`), state colocation (move state down), or lift content out via `children`. Senior point: memoization without stable refs is a no-op; and don't memo everything — measure with Profiler first.

**Q2. useMemo vs useCallback vs React.memo?**
`useMemo` caches a computed value; `useCallback` caches a function identity (= `useMemo(() => fn, deps)`); `React.memo` skips re-render when props are shallow-equal. They work as a *system*: memo on the child is defeated by a fresh callback prop each render.

**Q3. Rendering a 10k-row table?**
Virtualize — render only the viewport window (`react-window` / `@tanstack/virtual`), stable row heights or dynamic measurement, plus server-side pagination for the data itself. → *Hook: UTEC dashboards over large datasets.*

**Q4. State management — your decision framework?**
Local state → lift to nearest common parent → Context only for low-frequency global data (theme, auth) since every consumer re-renders → Zustand/Redux Toolkit for genuinely complex client state → **server state belongs in React Query/SWR** (caching, revalidation, dedupe), which eliminates most "global state" anyway. Senior point: most apps over-adopt Redux for what is actually server cache.

**Q5. TypeScript generics you actually write?**
```ts
function useFetch<T>(url: string): { data: T | null; error: Error | null } { ... }
type ApiResponse<T> = { data: T; meta: { requestId: string } };
```
Utility types in daily use: `Partial<T>` (patch payloads), `Pick`/`Omit` (DTO shaping), `Record<K,V>`, `ReturnType<typeof fn>`. Plus **discriminated unions** for state machines: `{status:'loading'} | {status:'success'; data:T} | {status:'error'; err:E}` — compiler forces exhaustive handling.

**Q6. SSR vs CSR — when does SSR matter?**
CSR: fast subsequent nav, poor first paint/SEO. SSR (Next.js): HTML on first byte → better LCP + SEO, then **hydration** attaches interactivity; mention RSC/streaming as current direction. Decision: marketing/e-commerce/SEO pages → SSR/SSG; authed dashboards → CSR is fine. → *Hook: Olay storefront = SEO-critical, exactly why the Shopify architecture mattered.*

**Q7. Error boundaries — scope and blind spots?**
Class components with `componentDidCatch`/`getDerivedStateFromError`; wrap route/widget subtrees to fail partially, not whole-app. **They don't catch**: event handlers, async/promise rejections, SSR errors — those need try/catch + `window.onerror`/`unhandledrejection` reporting (Sentry).

**Q8. Testing philosophy with RTL?**
Test behavior a user sees, not implementation: query by role/label, `userEvent` over `fireEvent`, mock the network boundary with **MSW** rather than mocking fetch internals. Snapshot tests sparingly (they rot). → *Hook: Jest+RTL suites on UTEC frontends.*

**Q9. Why do keys matter / index-as-key bug?**
Keys let reconciliation match elements across renders. Index-as-key + insert/delete/reorder → React reuses the wrong DOM/state (classic: input text jumping rows). Use stable IDs.

**Q10. Bundle performance levers?**
Route-level code splitting (`React.lazy` + `Suspense`), analyze with source-map-explorer, tree-shakeable imports (`lodash-es`, per-icon imports), font/image optimization, prefetch on hover. Tie to Core Web Vitals (LCP/INP) — business framing, not just tech.

---

## 9. CI/CD, Testing & AWS [MED]

### 9.1 Jenkins ↔ what you know

| Jenkins | GitHub Actions / Bitbucket (yours) |
|---|---|
| `Jenkinsfile` (declarative pipeline, Groovy) | workflow YAML |
| `pipeline { stages { stage { steps } } }` | jobs → steps |
| `agent any` / labeled agents | `runs-on:` runners |
| Shared libraries | Reusable workflows / composite actions |
| Credentials store | Secrets |
| Webhooks/poll SCM triggers | `on: push/pull_request` |
| Blue Ocean / stage view | Actions UI |

```groovy
pipeline {
  agent any
  stages {
    stage('Build') { steps { sh 'mvn -B clean package -DskipTests' } }
    stage('Test')  {
      steps { sh 'mvn test' }
      post { always { junit 'target/surefire-reports/*.xml' } }
    }
    stage('Deploy'){ when { branch 'main' } steps { sh './deploy.sh' } }
  }
}
```
Interview line: *"I've built pipelines in GitHub Actions and Bitbucket Pipelines — build/test/quality-gate/deploy with environment promotion; Jenkins is the same DAG with Groovy syntax and self-hosted agents."*

### 9.2 Maven/Gradle ↔ npm mental model

| npm world | Maven | Gradle |
|---|---|---|
| `package.json` | `pom.xml` (XML, rigid lifecycle) | `build.gradle` (Groovy/Kotlin DSL — feels like modern JS tooling) |
| `npm ci && npm run build` | `mvn clean install` | `gradle build` |
| `node_modules` + npm cache | `~/.m2` local repo (shared, not per-project) | Gradle cache + **incremental builds** (faster) |
| scripts | lifecycle phases: `validate→compile→test→package→install→deploy` | tasks (arbitrary DAG) |
| devDependencies | `<scope>test</scope>` | `testImplementation` |
| npm registry | Maven Central / Nexus / Artifactory | same |

One-liner: *"Maven = convention-heavy and declarative; Gradle = scriptable and incremental. Coming from npm, Gradle feels native; Maven's lifecycle phases are like fixed, well-known npm scripts."*

### 9.3 JUnit/Mockito ↔ Jest (direct dictionary)

| Jest (yours) | JUnit 5 / Mockito |
|---|---|
| `describe` / `it` | `@Nested` class / `@Test` method |
| `beforeEach` / `afterAll` | `@BeforeEach` / `@AfterAll` |
| `expect(x).toBe(y)` | `assertEquals(y, x)` (expected first!) |
| `expect(fn).toThrow()` | `assertThrows(Ex.class, () -> ...)` |
| `jest.mock('./svc')` | `@Mock` + `@InjectMocks` (`@ExtendWith(MockitoExtension.class)`) |
| `svc.get.mockResolvedValue(user)` | `when(repo.findById(1L)).thenReturn(Optional.of(user));` |
| `expect(svc.get).toHaveBeenCalledWith(1)` | `verify(repo).findById(1L);` |
| `supertest` against Express app | `@SpringBootTest` + `MockMvc` |

```java
@ExtendWith(MockitoExtension.class)
class ClaimServiceTest {
  @Mock ClaimRepository repo;
  @InjectMocks ClaimService service;

  @Test
  void settlesClaim() {
    when(repo.findById(1L)).thenReturn(Optional.of(new Claim(1L, PENDING)));
    service.settle(1L);
    verify(repo).save(argThat(c -> c.getStatus() == SETTLED));
  }
}
```
Interview line: *"Arrange-act-assert with mocked collaborators — identical discipline to my Jest suites; `when/thenReturn` is `mockResolvedValue`, `verify` is `toHaveBeenCalledWith`."*

### 9.4 ECS vs EKS vs Lambda vs EC2 — decision framework [HIGH for you]

| Choose | When | Say |
|---|---|---|
| **Lambda** | Spiky/event-driven, <15 min tasks, per-request billing, minimal ops | "My default for event-driven — proven at 6M users" |
| **ECS (Fargate)** | Long-running services, steady traffic, containers without K8s complexity | "The pragmatic middle — containers, AWS-native, no cluster to babysit" |
| **EKS** | Org standardized on Kubernetes, needs its ecosystem (Helm, operators, service mesh) and portability; has a platform team | "K8s is powerful but is an ops investment — justified at org scale, not per-team" |
| **EC2** | Legacy lift, special hardware/licensing, full control | "Last resort for new builds" |

The framework sentence: *"Traffic shape + ops maturity decide it: spiky/event-driven → Lambda; steady containerized services → ECS Fargate; org-wide K8s platform → EKS."*

### 9.5 RDS — what to know coming from DynamoDB
- **Scaling is different:** vertical (instance size) + **read replicas** (async, read scale) — no infinite horizontal magic; writes bottleneck on the primary.
- **Multi-AZ** = synchronous standby for **HA/failover** (not read scale). Read replicas = **read scale** (not HA). They're different — interviewers test this.
- **Aurora**: MySQL/Postgres-compatible, storage decoupled from compute, 6-way replicated, faster failover, Serverless v2 for variable load.
- **Lambda + RDS = connection storm → RDS Proxy** (your best crossover talking point — you know *why* from DynamoDB-land where connections don't exist).
- Ops vocabulary: parameter groups (config), automated backups + PITR, slow query log, **Performance Insights** for wait-event analysis.

### 9.6 Redis caching essentials [MED — it's in the JD]
- **Cache-aside** (what you'll describe): read → miss → load DB → `SET key val EX 300` → return. Write → update DB → **invalidate** key (delete beats update — avoids races).
- TTL everything; add **jitter** to prevent synchronized expiry stampedes; for hot keys consider a lock or serve-stale-while-revalidate.
- Eviction policy: `allkeys-lru` typical for pure cache.
- Beyond cache: session store, **rate limiting** (INCR+EXPIRE), distributed locks (careful), pub/sub, leaderboards (sorted sets).
- AWS flavor: ElastiCache (Redis) — cluster mode shards by key slot.
→ *Hook: caching layers you added in front of hot read APIs on UTEC; and "cache invalidation is one of the two hard problems" lands well when followed by the delete-on-write rule.*

---

## 10. The AI Differentiator [HIGH — your unfair advantage]

The JD explicitly asks for "leveraging AI productivity tools (GitHub Copilot etc.)." Most Java candidates will say "I use Copilot for autocomplete." You will say three things they cannot:

**Talking point 1 — "I treat prompts like code."**
> "On EY Risk.ai I owned the migration of an agentic platform from GPT-4 to GPT-5.1. That meant re-architecting the prompt and tool-calling layer — versioned prompts, a regression eval suite, measured outcomes. We landed ~20% response-quality improvement, and the discipline was the point: prompts got code review, tests, and rollback plans like any production artifact."
*Why it lands:* insurers adopting GenAI are terrified of ungoverned AI. You demonstrate **governed** AI engineering — evals, audit, reproducibility.

**Talking point 2 — "Copilot is my language-ramp accelerator — with verification."**
> "Concretely, for this role: I use Copilot to compress the JS→Java transition — generate the idiomatic Spring version of a pattern I know cold in Express, then verify it with unit tests and by reading the generated code critically. AI shifts my effort from syntax recall to design judgment, which is where senior engineers should spend time anyway."
*Why it lands:* it converts your biggest gap (Java) into evidence of your biggest strength (AI-native workflow). It also answers the Java question *for* them.

**Talking point 3 — "I know where agentic AI fits insurance — and where it must not."**
> "The obvious wins here are claims-document intelligence — extraction from death certificates, medical records, dental claims — RAG assistants over policy language for service teams, and underwriting triage. The engineering that matters is the guardrails: human-in-the-loop for adjudication decisions, full audit trails, PII redaction before model calls. That governance layer is exactly what I built patterns for on Risk.ai."
*Why it lands:* you're not pitching AI hype; you're pitching **compliant** AI in a regulated domain — the only kind Guardian can ship.

**Delivery:** don't dump all three at once. Seed #2 when Java comes up, #1 when they ask about EY, #3 when they ask "questions for us?" or "where do you see AI going."

---

## 11. Behavioral Round — STAR bank [HIGH]

Your four assets: **UTEC/UltraTech** (scale+ops), **EY Risk.ai** (AI+influence), **P&G Olay** (migration+deadline), **Vkonnect** (migration+scrappy). Keep every answer ≤ 2 minutes; end on the Result with a number.

**Q1. Conflict with a teammate.** → *Olay*
- **S:** BigCommerce→Shopify GraphQL migration; a senior teammate pushed a big-bang cutover to hit the marketing date.
- **T:** I believed big-bang risked the brand's revenue weekend; I had to change the plan without a standoff.
- **A:** Built a one-page risk comparison (rollback time, blast radius), proposed phased cutover by traffic slice with feature flags, and volunteered to own the extra routing work so the timeline held.
- **R:** We shipped phased, caught a checkout pricing bug on the 10% slice with zero customer-visible impact, and hit the launch date. Lesson: turn opinion conflicts into artifact conflicts — documents argue better than people.

**Q2. A failure.** → *Vkonnect*
- **S:** Migrating the telemedicine backend EC2→Lambda, I moved a chatty service first.
- **T/A:** Under load, concurrent Lambdas stormed MongoDB with connections — degraded consultations in production. I rolled back, then re-sequenced the migration: connection pooling strategy per invocation, caching connections across warm invocations, and load tests as a gate before each service moved.
- **R:** Remaining migration shipped without incident and cut infra cost meaningfully. Lesson I state: *"serverless changes your relationship with stateful dependencies — I now design the data-connection story before the compute story."* (Bridges beautifully to RDS Proxy talk.)

**Q3. Production incident.** [near-guaranteed — JD lists prod support] → *UTEC*
- **S:** Peak usage window at 6M-user scale; API latency spiking, SQS consumer backlog climbing.
- **T:** Restore SLA fast, then root-cause.
- **A:** Triage order: CloudWatch dashboards → isolated the slow downstream call → raised consumer concurrency within safe limits + enabled the degraded-mode fallback; post-incident, added DLQ alerting, idempotent retry, and a runbook.
- **R:** Recovery in under an hour, recurrence eliminated; the runbook became the team's incident template. Lesson: stabilize first, root-cause second, and every incident must leave the system more observable than before.

**Q4. Tight deadline.** → *UTEC VAPT*
- **S:** VAPT report landed with a fixed compliance window before a major release.
- **T:** Remediate criticals without freezing feature work.
- **A:** Triaged findings by exploitability, batched fixes by subsystem (authZ checks, input validation, headers, secrets handling), parallelized across the team with a shared checklist, automated regression checks into CI.
- **R:** Cleared all criticals inside the window; release shipped on time; several fixes became permanent lint/CI rules. Lesson: deadlines are triage problems, not heroics problems.

**Q5. Mentoring.** → *EY / iProgrammer*
- **S:** Two juniors at EY writing one-shot mega-prompts and pushing unreviewed AI-generated code.
- **T/A:** Ran weekly pairing on decomposition + eval-driven prompt iteration; instituted "AI code gets stricter review, not looser"; gave them ownership of one eval suite each.
- **R:** Their modules' defect rate dropped noticeably and one now runs prompt reviews independently. Lesson: mentoring works by transferring judgment via ownership, not by reviewing harder.

**Q6. Disagreement with manager.** → *EY Risk.ai*
- **S:** GPT-5.1 arrived; my manager wanted minimal prompt patches to ship fast; I believed the platform needed re-architecture of the prompt/tool layer.
- **T/A:** Rather than argue, I time-boxed a two-day spike: ran our eval suite against patched vs re-architected on a critical workflow and presented the numbers side by side with a phased plan that de-risked the schedule.
- **R:** Manager green-lit the phased re-architecture; final result was the ~20% quality lift. Lesson: disagree with data and a de-risked plan, then commit fully either way.

**Q7. Why insurance / why Guardian?**
> "Three honest reasons. One: I've built for healthcare (Vkonnect telemedicine) and risk (EY Risk.ai) — insurance sits exactly at that intersection, and I want domain depth, not another domain-agnostic project. Two: Guardian India isn't a vendor arrangement — it's a 10-year-old GCC of ~2,500 people that leadership describes as a microcosm of the company, which means real product ownership. Three: a 160-year-old mutual investing in claims automation and AI is the rare place where the modernization work is both hard and consequential — systems where a bug isn't a broken cart, it's someone's disability check."

**Q8. Why leaving EY?**
> "EY has been excellent — Risk.ai gave me frontier AI-platform experience. What consulting can't give me is long ownership: projects rotate, and I hand off systems I'd rather operate and evolve for years. I'm optimizing for product ownership in a domain that matters, with the scale and engineering investment of a GCC like Guardian's. I'm not running from anything — I'm choosing depth over breadth for this next phase."
*(Never mention compensation, bench fear, or manager issues.)*

**Synechron short-tenure framing (Dec 2024–Mar 2025) — only if asked:**
> "Short and deliberate. I joined Synechron for a specific kind of engineering work; within the first weeks the actual project reality didn't match — and I've learned that staying somewhere wrong out of optics helps no one. When the EY Risk.ai opportunity came — production agentic AI, exactly where I wanted to grow — I made a fast, honest call. It's the only short stint in six years, and the EY work since speaks for the decision."
Rules: ≤ 30 seconds, zero badmouthing, no defensiveness, pivot immediately to EY impact. A confident non-apology reads as decisiveness; an over-explanation reads as a red flag.

---

## 12. Insurance Domain Primer [MED — 30-min read, high conversation ROI]

### 12.1 Core glossary

| Term | Plain meaning | Tech relevance |
|---|---|---|
| **Premium** | What the customer pays (monthly/annual) for coverage | Billing systems, payment processing, dunning (failed-payment retries) |
| **Underwriting** | Risk assessment before issuing a policy — health, age, occupation → accept/rate/decline | Rules engines + ML risk models; "accelerated underwriting" = skip medical exams using data — big AI surface |
| **Policy admin (PAS)** | System of record for the policy lifecycle: issue → changes (endorsements) → renewals → lapse/surrender | The legacy-modernization epicenter; strangler-pattern migrations |
| **Claims lifecycle** | FNOL (first notice of loss) → validation → **adjudication** (decide payable per policy terms) → investigation if flagged → settlement/payout | Workflow engines, straight-through processing (STP), document AI, fraud models |
| **Rider** | Optional add-on to a policy (e.g., waiver of premium, accidental death benefit) | Product-configuration complexity — why policy data models are gnarly |
| **Beneficiary** | Who receives the death benefit | Identity verification, payout workflows |
| **Term vs whole life** | Term = pure coverage for N years; whole = lifelong + builds **cash value** (Guardian's mutual dividends feed this) | Different calc engines; whole life has actuarial cash-value computations |
| **Group benefits** | Employer-sponsored coverage (Guardian's big segment: dental, vision, disability, absence) | Enrollment APIs, eligibility files from HR systems, EDI feeds — integration-heavy |
| **Contestability period** | ~2 years post-issue when insurer can investigate claims for misrepresentation | Why claims workflows branch on policy age |
| **Lapse / surrender** | Policy dies from non-payment / customer cashes out | Retention analytics, dunning automation |
| **Reinsurance** | Insurance for insurers — ceding part of the risk (treaty = portfolio-wide, facultative = per-policy) | Data feeds and reporting to reinsurers |
| **In-force** | Active policy book | "In-force systems" = the live book that modernization must not break |

### 12.2 US regulatory context (Guardian is US-focused, NY-domiciled)
- Insurance is regulated **state-by-state** (50 departments of insurance), not by one federal agency; the **NAIC** publishes model laws states adopt.
- **NYDFS 23 NYCRR 500** — New York's cybersecurity regulation. Guardian is NY-domiciled → this is why security (VAPT-style), access control, and audit logging are first-class engineering requirements. → *Your VAPT story is directly relevant — say so.*
- **HIPAA** touches dental/health-adjacent lines → PHI handling, encryption, minimum-necessary access.
- Solvency oversight (risk-based capital) and market-conduct exams → immutable audit trails, data lineage, reporting accuracy matter more than in typical SaaS.
- Practical engineering takeaway to voice: *"In insurance, auditability is a functional requirement — every automated decision needs an explainable trail. That shaped how I built guardrails on Risk.ai."*

### 12.3 How tech maps to the domain (your conversation cheat-sheet)

| Domain area | Systems | Where you fit |
|---|---|---|
| Underwriting | Rules engines, ML risk scoring, accelerated UW | Risk.ai-style model orchestration + evals |
| Policy admin | Legacy PAS → cloud microservices | Strangler migrations (Vkonnect), IaC (CloudFormation), event-driven sync |
| Claims | Intake, adjudication workflow, STP, fraud detection | Your Sec 7 Q10 pipeline design; document AI |
| Distribution | Broker/employer portals, enrollment APIs, EDI eligibility feeds | React/TS portals, API design, SQS/Kafka integrations |
| Servicing | Call-center tools, self-service portals, RAG assistants over policy docs | Full-stack + GenAI with guardrails |
| Compliance | Audit trails, PII protection, access control | VAPT hardening, authZ design |

---

## 13. Questions to Ask the Interviewer [HIGH — memorize 4, keep 2 spare]

1. **Ownership:** "Guardian India leadership describes the GCC as a microcosm of Guardian. For this team specifically — do you own services end-to-end, including production and roadmap, or share ownership with US counterparts?"
2. **Stack reality:** "The JD lists both Spring Boot and Node/Express. What's the actual split on this team today, and is the direction converging on one?" *(Directly informs your Node play — and shows you read the JD closely.)*
3. **Domain surface:** "Which part of the value chain does this team sit in — policy admin, claims, group-benefits digital experience? And what's the biggest modernization bet on it right now?"
4. **AI roadmap:** "Beyond Copilot, how is Guardian approaching GenAI in engineering and in product — is there an internal platform, eval/governance process, or pilot areas like claims document intelligence?" *(Sets up your Sec 10 material.)*
5. **Prod support model:** "How does on-call work — follow-the-sun with US teams, rotation depth, and how much of the team's time goes to prod support versus build?"
6. **Event-driven maturity:** "Is Kafka adoption here greenfield event streaming, or replacing batch/file-based integrations? What's been the hardest part operationally?"

---

## 14. 7-Day Study Plan (2–3 hrs/day alongside EY)

| Day | Focus (priority order) | Output |
|---|---|---|
| **1** | Sec 4 Core Java: mental model, translation table, Q1–Q8. Write the Streams snippet from memory 3× | Can answer HashMap/equals/==/String cold |
| **2** | Sec 4 Q9–Q15 + Sec 5 Spring vocab. Read both Spring snippets aloud until fluent | Can explain DI, JPA repo, @Transactional in Express terms |
| **3** | Sec 6 SQL: joins→indexes→isolation, then **hand-write all 10 exercises** before checking answers | 8/10 exercises correct unaided |
| **4** | Sec 7 Kafka & microservices + Sec 9.6 Redis. Rehearse claims-pipeline design (Q10) aloud | 2-min Kafka-vs-SQS answer + saga/outbox one-liners |
| **5** | Sec 9 CI/CD, Maven/Gradle, JUnit/Mockito, ECS/EKS/Lambda, RDS. Skim Sec 8 React (your strength — verify, don't study) | Jenkinsfile + Mockito snippets readable cold |
| **6** | Sec 3 positioning + Sec 11 behavioral + Sec 1/12 domain. **Record yourself**: 60-sec intro + Java-comfort answer + Synechron framing; listen back twice | All 8 STARs at ≤2 min each |
| **7** | Sec 15 full question bank aloud, closed-book. Re-drill every miss. One full mock (friend, or self-record answering 1–20) | ≥32/40 answered confidently |

**Daily flashcards (self-test at day's end, answers all in this file):**

- **Day 1:** JDK vs JVM? `==` vs equals? Why String immutable? HashMap internals? Treeify threshold? Load factor? ArrayList vs LinkedList — real answer? equals/hashCode contract? Integer cache trap? What's a record?
- **Day 2:** Checked vs unchecked? final/finally/finalize? Runnable vs Callable? Virtual threads — what/why? `@Autowired` vs constructor injection — which and why? What is a JPA derived query? Hibernate vs JPA? `@ControllerAdvice` = which Express pattern? What are Spring profiles? What does auto-configuration do?
- **Day 3:** Anti-join SQL for "customers with no policies"? Leftmost-prefix rule? Covering index? `type=ALL` in EXPLAIN means? MySQL vs Postgres default isolation? Which anomaly does READ COMMITTED allow? Window function for latest-claim-per-policy? Upsert syntax in Postgres? Why do functions on indexed columns kill index use? Lambda+RDS problem and fix?
- **Day 4:** Kafka partition = which SQS concept? Max useful consumers per group? What triggers rebalance? Offset commit timing → which delivery semantics? Kafka replay vs SQS? Outbox pattern solves what? Saga vs 2PC? Circuit breaker states? Consumer lag playbook — first two steps? Cache invalidation rule (delete vs update)?
- **Day 5:** Jenkins stage ↔ Actions concept? Maven lifecycle phases (any 4)? `<scope>test</scope>` ↔ npm? `when/thenReturn` ↔ Jest? `verify()` ↔ Jest? assertEquals argument order? ECS vs EKS one-liner? Multi-AZ vs read replica? Aurora — two differentiators? RDS Proxy — why?
- **Day 6:** 60-sec intro — deliver it. Java-comfort answer — deliver it. Synechron answer in ≤30 sec. Why Guardian — three reasons? Prod-incident STAR result line? Failure STAR lesson line? Contestability period? NYDFS 23 NYCRR 500 — what/why relevant? FNOL→? (claims stages) Group benefits — why integration-heavy?
- **Day 7:** Your 3 AI talking points — 30 sec each. Claims-pipeline design — 2 min. Re-render causes + fix system? Discriminated union — insurance example? SSR vs CSR decision? Kafka-vs-SQS 2-min answer? Second-highest premium — two ways? DI in one sentence? Two questions you'll ask the interviewer? Weakest flashcard from Days 1–6 — redo it.

---

## 15. Active Recall Question Bank — 40 rapid-fire (no answers; ordered by likelihood)

1. Tell me about yourself. *(60-sec Guardian version)*
2. How comfortable are you with Java and Spring Boot?
3. How does HashMap work internally?
4. `==` vs `.equals()` — and the Integer trap?
5. Why is String immutable, and what's the string pool?
6. Explain dependency injection and how Spring's IoC container works.
7. Checked vs unchecked exceptions — and what does JS have?
8. Write/describe a Stream pipeline: filter, map, collect.
9. `@RestController`, `@Service`, `@Repository` — what does each do?
10. What is Spring Data JPA and how do derived queries work?
11. Walk me through a production incident you handled end-to-end.
12. Find customers with no policies — write the SQL.
13. Composite index `(a, b, c)` — which queries can use it?
14. How do you optimize a slow SQL query, step by step?
15. Explain ACID and the four isolation levels — MySQL vs Postgres defaults?
16. Kafka topic, partition, consumer group — explain the model.
17. How is Kafka different from SQS/SNS, and when would you pick each?
18. How do you guarantee ordering in Kafka? In SQS?
19. At-least-once delivery — how do you make consumers safe?
20. What's the outbox pattern and what problem does it solve?
21. Explain the saga pattern with an insurance example.
22. Circuit breaker — states and why it beats plain retries?
23. Design a claims-intake pipeline. *(2-min architecture answer)*
24. What causes React re-renders and how do you eliminate wasted ones?
25. useMemo vs useCallback vs React.memo — how do they work together?
26. How do you type a generic custom hook in TypeScript?
27. Discriminated unions — example and why they beat boolean flags?
28. SSR vs CSR — how do you decide?
29. What don't error boundaries catch?
30. `CompletableFuture` — map its methods to Promise methods.
31. Java thread-per-request vs Node event loop — compare; what are virtual threads?
32. `when/thenReturn`, `verify`, `@InjectMocks` — map each to Jest.
33. Maven lifecycle vs npm scripts — compare; Maven vs Gradle?
34. Describe a Jenkins declarative pipeline's structure.
35. ECS vs EKS vs Lambda — your decision framework?
36. Multi-AZ vs read replicas; why RDS Proxy with Lambda?
37. Cache-aside with Redis — walk through reads, writes, and invalidation.
38. Tell me about a time you disagreed with your manager.
39. Why insurance, why Guardian, why leave EY? *(+ Synechron, ≤30 sec, if probed)*
40. How do you use AI tools in your engineering workflow? *(deliver all three Sec 10 points)*

---

*Built 2026-07-16 for Guardian India R000109113. Sources for company facts: [Guardian — Campuses in India](https://www.guardianlife.com/about-guardian/where-we-work/india), [YourStory — India GCC is a microcosm of Guardian Life (Shiney Prasad, Mar 2025)](https://yourstory.com/enterprise-story/2025/03/india-gcc-microcosm-guardian-life-insurance-shiney-prasad), [Guardian India — Great Place to Work](https://www.greatplacetowork.in/great/company/guardian-india-operations-pvt-ltd/).*
