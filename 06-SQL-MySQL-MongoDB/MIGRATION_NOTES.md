---
topic: SQL Playground — Migration & Compatibility Mapping
level: intermediate
status: solid
last_reviewed: 2026-09-07
next_review: 2026-09-08
---

# SQL Playground — Migration Notes

How the five notes that already lived in `06-SQL-MySQL-MongoDB/` map onto the runnable database in `playground/`, and every decision that mapping forced.

**The rule this file exists to honour:** files `01`, `02`, `03`, `04` and `05` are not rewritten. Each of `01`, `02`, `04`, `05` gains exactly one pointer line and nothing else. `03-mongodb-schema-aggregation.md` is untouched entirely — this build is MySQL-only.

Everything below was verified by execution against **MySQL 8.4.11 LTS**, not by reading. Where something fails, it says so.

---

## 1. What was already there

| File | Lines | Left alone? |
|---|---|---|
| `01-joins-indexing.md` | 251 | Yes + 1 pointer line |
| `02-transactions-isolation.md` | 187 | Yes + 1 pointer line |
| `03-mongodb-schema-aggregation.md` | 308 | Yes — completely untouched |
| `04-explain-performance-tuning.md` | 204 | Yes + 1 pointer line |
| `05-mnc-frequently-asked.md` | 311 | Yes + 1 pointer line |

All five are listed in `_meta/state.json → files_analyzed`. None were deleted, renamed, renumbered or rewritten.

---

## 2. The core mapping: legacy name → real object

The task brief supplied a mapping table. I re-derived it from the files rather than trusting it, and **it was incomplete** — see §4. The verified full mapping:

| Legacy name used in the notes | Real object in `sqlplay` | Mechanism |
|---|---|---|
| `users` | `customers` | **VIEW** (`compat.sql`) |
| `orders` | `orders` | Real table — column named `user_id`, not `customer_id`, on purpose |
| `employees` | `employees` | Real table + trigger-maintained `dept` column (§3) |
| `departments` | `departments` | Real table, direct |
| `logs` | `logs` | Real table — carries both `num` and `msg` (§4) |
| `colors`, `sizes` | `colors`, `sizes` | Real tables, direct |
| `accounts` | `accounts` | Real table (§4 — **missing from the brief's table**) |
| `admins` | `admins` | Real table (§4 — missing from the brief's table) |
| `articles` | `articles` | Real table, FULLTEXT index deliberately *not* pre-created (§4) |
| `transactions` | `transactions` | Real table (§4 — missing from the brief's table) |

### Why `orders.user_id` and not `orders.customer_id`

`01-joins-indexing.md` L17-18, L25-26, L33-34, L41-44, L66, L71, L76, L83, L151 and `04-explain-performance-tuning.md` L7, L52, L63, L80, L82 all join on `o.user_id`. `orders` cannot be a view — four foreign keys (`order_items`, `payments`, `shipments`) point at it — so the column had to be named `user_id` in the base table. The brief's own instruction was to make real tables canonical and use views only for name mismatches; this is that rule applied.

---

## 3. `employees.dept` — where I deviated from the brief, and why

**The brief said:** add "an `employees` view exposing `dept` as the denormalized department name".

**That is not implementable as written.** `employees` is already the canonical base table: `seed.sql` inserts into it, it carries a self-referencing `manager_id` FK four levels deep, a FK to `departments`, and three indexes. MySQL cannot have a base table and a view of the same name in one schema. Renaming the physical table (say to `staff`) so `employees` could be a view would break `INSERT` (a joined view is not insertable), and would make the README's ER diagram disagree with the brief's own Section 5 table list.

**What I did instead:** `employees.dept` is a real `VARCHAR(100)` column kept in sync with `departments.name` by two triggers (`trg_employees_dept_bi`, `trg_employees_dept_bu` in `schema.sql` §2). `dept_id` remains the canonical, normalized FK.

**Why this is better than a cosmetic rename:** Section 12 of the brief separately requires a runnable `TRIGGER` example, and the folder had none. This is one — a denormalization-sync trigger, which is exactly the shape of trigger a backend engineer actually writes and gets asked about.

**The one snippet this exists for:** `01-joins-indexing.md` L189-192.

```sql
SELECT dept, name, salary,
    RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS dept_rank
FROM employees;
```

Verified working on 8.4.11 — returns `Engineering | Onkar Sawant | 6500000.00 | 1` and so on.

**Cost you should know about:** `dept` is denormalized, so it can drift if you ever bulk-load with triggers disabled. `dept_id` is the source of truth. Never write to `dept` by hand.

---

## 4. What the brief's compat table missed

Per `CLAUDE.md` rule 1, I grepped all four files for `FROM|JOIN|INTO|UPDATE|TABLE` rather than trusting the supplied table. Six additional requirements surfaced:

| Found at | Missing from brief | Resolution |
|---|---|---|
| `02` L15-19, L110-123, L120-122, L137-147 | table `accounts` (`id`, `balance`) | Real table, 5 rows. Doubles as the subject of the real deadlock lab. |
| `02` L77-102 | `products.stock`, `products.version` | Added both columns to `products`. Documented as locking-demo-only; per-warehouse stock lives in `inventory`. |
| `04` L92 | `logs.msg` | `logs` carries `id`, `num` **and** `msg`, all independently NULLable, so `01`'s `(id, num)` query and `04`'s `(msg)` insert coexist. |
| `04` L89 | table `admins` | Real table, 3 rows. |
| `01` L124-125 | table `articles` + FULLTEXT | Real table, 5 rows, **index not pre-created** so L124's `CREATE FULLTEXT INDEX` succeeds when you run it. Two rows match `AGAINST('react hooks')`. |
| `05` L253-256 | table `transactions` (`date`, `amount`) | Real table, 12 rows, one per month of 2025. |
| `04` L52 | `orders.created_at` | `orders` has both `order_date` (business event, `DATETIME`) and `created_at` (audit, `TIMESTAMP`). Seeded equal, so `ORDER BY created_at DESC` is meaningful. |

---

## 5. Things that do not run — stated plainly

`verify.sh` reports these; it does not hide them behind a green tick.

### 5a. Four statements in the notes are broken and always were

| File | Line | Statement | Error on MySQL 8.4.11 |
|---|---|---|---|
| `01-joins-indexing.md` | 174 | `ROW_NUMBER() OVER (...) AS rank` | `ERROR 1064 (42000)` |
| `01-joins-indexing.md` | 179 | `RANK() OVER (...) AS rank` | `ERROR 1064 (42000)` |
| `05-mnc-frequently-asked.md` | 249 | `RANK() OVER (...) as rank` | `ERROR 1064 (42000)` |
| `05-mnc-frequently-asked.md` | 250 | `DENSE_RANK() OVER (...) as dense_rank` | `ERROR 1064 (42000)` |

`RANK` and `DENSE_RANK` became **reserved words in MySQL 8.0.2**. Used bare as a column alias they are a syntax error on every MySQL 8.x, 8.4 included. This is not a playground limitation — these four statements have never been executed by anyone.

**Recommended fix (needs your call, since only one pointer line per file is permitted):** backtick the aliases in `01-joins-indexing.md` L174/L179 and `05-mnc-frequently-asked.md` L249/L250 — `` AS `rank` `` — or rename them to `rnk`, which is what `01-joins-indexing.md` L213 already does correctly. Two-minute edit, four lines, and it removes a live wrong answer from the repo: pasting L174 into an interviewer's shared editor produces a syntax error.

`playground/compat_check.sql` runs the `05` block in corrected form so the query *shape* is still covered, and labels it as corrected.

### 5b. Three statements are schema-defining and are deliberately not run

| File | Line | Statement | Why not |
|---|---|---|---|
| `01` | 103-107 | `CREATE TABLE users (id, email)` | `users` is the compat view. Re-creating it as a 2-column table breaks every other snippet in all four files. |
| `01` | 110 | `CREATE UNIQUE INDEX idx_email ON users(email)` | You cannot index a view. The real equivalent is `uq_customers_email`. |
| `01` | 113 | `CREATE INDEX idx_name_age ON users(last_name, first_name, age)` | `last_name`/`first_name`/`age` do not exist in this domain and never did — it is a column-ordering illustration, not a claim about this schema. |

### 5c. Two are prose, not SQL

- `04` L99 `FROM huge_table` — a stand-in noun inside a general tip.
- `05` L156 `SELECT * FROM items WHERE order_id = ?` — pseudo-code in a prose block explaining N+1: no semicolon, a `?` placeholder, and a "(for each order)" annotation.

---

## 6. Schema concessions made purely for compatibility

Two defaults exist only so legacy snippets run. Both are flagged in `schema.sql`:

| Column | Concession | Forced by |
|---|---|---|
| `orders.order_date` | `DEFAULT CURRENT_TIMESTAMP` | `02` L30 inserts `(user_id, total)` only. Without a default: `ERROR 1364 Field 'order_date' doesn't have a default value`. |
| `order_items.quantity` / `unit_price` | `DEFAULT 1` / `DEFAULT 0.00` | `02` L33, L38 insert `(order_id, product_id)` only. Same error otherwise. |

**`unit_price DEFAULT 0.00` would be wrong in a production schema** — a silently-free line item is a revenue bug. It is here because the savepoint lesson at `02` L28-39 cannot otherwise reach the savepoint. If you are asked about defaults in an interview, this is a good honest example of a compatibility concession you would not ship.

Neither default ever fires during seeding: `generate_seed.ts` writes every column explicitly, which is what keeps the `expected/` checksums stable across a reset.

---

## 7. Verification status

| Gate | Result |
|---|---|
| `schema.sql` loads | 0 errors, 0 warnings on 8.4.11 |
| `compat.sql` loads | 0 errors, 0 warnings |
| `seed.sql` loads | 0 errors, **0.46s** |
| Legacy snippets executed | **53 / 53 pass**, 0 stderr output |
| Snippets excluded | 4 broken (§5a), 3 schema-defining (§5b), 2 prose (§5c) |

Full command output: `playground/VERIFICATION.md`.

---

## Related

- `playground/schema.sql` — the DDL, with every decision commented at its line
- `playground/compat.sql` — the `users` view
- `playground/compat_check.sql` — the runnable gate behind §7
- `COMPATIBILITY.md` — MySQL 8.4 vs 8.0 differences
- `_CURRICULUM.md` — concept → existing note → playground question map
