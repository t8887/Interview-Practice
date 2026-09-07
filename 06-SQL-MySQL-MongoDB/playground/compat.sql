-- =====================================================================
-- compat.sql — legacy-note compatibility layer
-- =====================================================================
-- Purpose: make every runnable SQL snippet already written in
--   ../01-joins-indexing.md
--   ../02-transactions-isolation.md
--   ../04-explain-performance-tuning.md
--   ../05-mnc-frequently-asked.md
-- execute against this playground WITHOUT editing those four files.
--
-- Runs after schema.sql, before seed.sql.
--
-- Three mechanisms are in play. Only the first one lives in this file;
-- the other two are in schema.sql because they cannot be views. The
-- full evidence table with file:line citations is in
-- ../MIGRATION_NOTES.md.
--
--   1. VIEW           users -> customers                  (this file)
--   2. REAL COLUMNS   orders.user_id / orders.total /
--                     orders.created_at, logs.msg,
--                     products.stock, products.version     (schema.sql §1/§3)
--   3. TRIGGER        employees.dept kept in sync with
--                     departments.name                     (schema.sql §2)
--
-- Why employees has no compat *view*: `employees` is already the real,
-- canonical table — seed.sql inserts into it, four foreign keys and the
-- self-referencing manager hierarchy point at it. MySQL cannot have a
-- view and a base table with the same name, so `dept` is a real
-- trigger-maintained column instead. Documented in MIGRATION_NOTES.md §3.
-- =====================================================================

USE sqlplay;

-- ---------------------------------------------------------------------
-- users -> customers
--
-- Consumed by (all four files reference `users`, never `customers`):
--   ../01-joins-indexing.md  L16-18, L24-26, L32-34, L40-44, L65-66,
--                            L69-72, L75-78, L81-84, L149-153, L220-223
--   ../04-explain-performance-tuning.md L5-11, L62-64, L76, L80, L82, L89
--   ../05-mnc-frequently-asked.md L45-49
--
-- ALGORITHM=MERGE matters: it lets the optimizer expand the view into
-- the outer query, so (a) indexes on customers are still usable and
-- (b) ONLY_FULL_GROUP_BY's functional-dependency detection still sees
-- customers.id as a primary key. `GROUP BY u.id` while selecting
-- u.name — which ../01 L149-153 and ../04 L5-11 both do — fails under
-- ALGORITHM=TEMPTABLE and works under MERGE.
--
-- `status` is included because ../01 L152 and ../04 L8 filter on
-- u.status = 'active'.
-- ---------------------------------------------------------------------
CREATE OR REPLACE ALGORITHM = MERGE VIEW users AS
SELECT
    c.id,
    c.name,
    c.email,
    c.phone,
    c.city,
    c.country,
    c.status,
    c.signup_date,
    c.created_at
FROM customers c;

-- ---------------------------------------------------------------------
-- Sanity checks — these are the exact shapes the legacy files use.
-- If either returns 0 rows after seeding, the compat layer is broken.
-- ---------------------------------------------------------------------
-- SELECT u.name, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id LIMIT 5;
-- SELECT dept, name, salary, RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS dept_rank FROM employees LIMIT 5;
