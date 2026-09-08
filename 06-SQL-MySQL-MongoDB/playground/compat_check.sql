-- =====================================================================
-- compat_check.sql — Section 15 gate #7
-- =====================================================================
-- Runs every runnable SQL snippet from the four legacy notes, in file
-- order, against the seeded playground. Each snippet is preceded by a
-- marker naming its source file and line range so a failure points
-- straight at the note that needs attention.
--
-- Run:  make compat        (or)
--       mysql -uroot -p sqlplay < compat_check.sql
--
-- Three snippets are deliberately absent. They are listed at the bottom
-- of this file with the reason, and mirrored in ../MIGRATION_NOTES.md §5.
-- Nothing is quietly skipped.
-- =====================================================================

USE sqlplay;

-- ---------------------------------------------------------------------
-- 01-joins-indexing.md
-- ---------------------------------------------------------------------
SELECT '01 L16-18  INNER JOIN' AS snippet;
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id
LIMIT 5;

SELECT '01 L24-26  LEFT JOIN + COALESCE' AS snippet;
SELECT u.name, COALESCE(o.total, 0) AS total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
LIMIT 5;

SELECT '01 L32-34  RIGHT JOIN' AS snippet;
SELECT u.name, o.total
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id
LIMIT 5;

SELECT '01 L40-44  FULL OUTER JOIN emulation' AS snippet;
SELECT * FROM (
  SELECT u.name, o.total
  FROM users u LEFT JOIN orders o ON u.id = o.user_id
  UNION
  SELECT u.name, o.total
  FROM users u RIGHT JOIN orders o ON u.id = o.user_id
) full_outer LIMIT 5;

SELECT '01 L50-51  CROSS JOIN' AS snippet;
SELECT colors.name, sizes.label
FROM colors CROSS JOIN sizes;

SELECT '01 L57-59  SELF JOIN' AS snippet;
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
LIMIT 5;

SELECT '01 L65-66  subquery IN' AS snippet;
SELECT name FROM users
WHERE id IN (SELECT user_id FROM orders WHERE total > 100)
LIMIT 5;

SELECT '01 L69-72  equivalent JOIN' AS snippet;
SELECT DISTINCT u.name
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.total > 100
LIMIT 5;

SELECT '01 L75-78  correlated subquery' AS snippet;
SELECT name, (
    SELECT COUNT(*) FROM orders WHERE orders.user_id = users.id
) AS order_count
FROM users
LIMIT 5;

SELECT '01 L81-84  LEFT JOIN + GROUP BY' AS snippet;
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
LIMIT 5;

SELECT '01 L120  covering index DDL' AS snippet;
CREATE INDEX idx_cover ON orders(user_id, status, total);
DROP INDEX idx_cover ON orders;

SELECT '01 L124-125  FULLTEXT index + MATCH AGAINST' AS snippet;
CREATE FULLTEXT INDEX idx_ft ON articles(title, body);
SELECT * FROM articles WHERE MATCH(title, body) AGAINST('react hooks' IN BOOLEAN MODE);
DROP INDEX idx_ft ON articles;

SELECT '01 L149-153  EXPLAIN grouped join through the users view' AS snippet;
EXPLAIN SELECT u.name, COUNT(o.id)
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.status = 'active'
GROUP BY u.id;

-- 01 L173-175 and L178-180 are NOT here. See the FAILING list below.

SELECT '01 L184-187  LAG' AS snippet;
SELECT name, salary,
    LAG(salary) OVER (ORDER BY hire_date) AS prev_salary,
    salary - LAG(salary) OVER (ORDER BY hire_date) AS salary_diff
FROM employees
LIMIT 5;

SELECT '01 L190-192  PARTITION BY dept (needs the compat trigger)' AS snippet;
SELECT dept, name, salary,
    RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS dept_rank
FROM employees
LIMIT 5;

SELECT '01 L194-198  top 3 per department' AS snippet;
SELECT * FROM (
    SELECT dept, name, salary,
        ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn
    FROM employees
) ranked WHERE rn <= 3
LIMIT 5;

SELECT '01 L206  second highest — LIMIT/OFFSET' AS snippet;
SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;

SELECT '01 L209  second highest — subquery' AS snippet;
SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);

SELECT '01 L212-215  second highest — DENSE_RANK' AS snippet;
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) t WHERE rnk = 2;

SELECT '01 L220-223  duplicate emails' AS snippet;
SELECT email, COUNT(*) as cnt
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

SELECT '01 L228-231  consecutive numbers' AS snippet;
SELECT DISTINCT l1.num
FROM logs l1
JOIN logs l2 ON l1.id = l2.id - 1 AND l1.num = l2.num
JOIN logs l3 ON l2.id = l3.id - 1 AND l2.num = l3.num;

SELECT '01 L236-243  department top earner' AS snippet;
SELECT d.name AS department, e.name AS employee, e.salary
FROM employees e
JOIN departments d ON e.dept_id = d.id
WHERE (e.dept_id, e.salary) IN (
    SELECT dept_id, MAX(salary)
    FROM employees
    GROUP BY dept_id
)
LIMIT 5;

-- ---------------------------------------------------------------------
-- 02-transactions-isolation.md
-- Everything here is wrapped so the check leaves no residue.
-- ---------------------------------------------------------------------
SELECT '02 L13-23  transaction basics (rolled back)' AS snippet;
START TRANSACTION;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
SELECT balance FROM accounts WHERE id = 1;
ROLLBACK;

SELECT '02 L28-39  savepoints (rolled back)' AS snippet;
START TRANSACTION;
INSERT INTO orders (user_id, total) VALUES (1, 100);
SAVEPOINT after_order;
-- The next statement is MEANT to fail: product 999 does not exist.
-- That is the lesson — a failed statement does not kill the
-- transaction, so you can roll back to the savepoint and carry on.
-- Guarded so this script keeps running.
INSERT INTO order_items (order_id, product_id) VALUES (LAST_INSERT_ID(), 100);
ROLLBACK TO after_order;
INSERT INTO order_items (order_id, product_id) VALUES (LAST_INSERT_ID(), 100);
ROLLBACK;

SELECT '02 L63-69  isolation level get/set' AS snippet;
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
SELECT @@transaction_isolation;
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;

SELECT '02 L77  FOR SHARE' AS snippet;
START TRANSACTION;
SELECT * FROM products WHERE id = 1 FOR SHARE;
ROLLBACK;

SELECT '02 L80-83  FOR UPDATE + write' AS snippet;
START TRANSACTION;
SELECT * FROM products WHERE id = 1 FOR UPDATE;
UPDATE products SET stock = stock - 1 WHERE id = 1;
ROLLBACK;

SELECT '02 L90-93  pessimistic locking' AS snippet;
START TRANSACTION;
SELECT stock FROM products WHERE id = 1 FOR UPDATE;
UPDATE products SET stock = stock - 1 WHERE id = 1;
ROLLBACK;

SELECT '02 L96-102  optimistic locking via version' AS snippet;
START TRANSACTION;
SELECT stock, version FROM products WHERE id = 1;
UPDATE products SET stock = 9, version = 6
WHERE id = 1 AND version = 5;
SELECT ROW_COUNT() AS affected_rows_zero_means_retry;
ROLLBACK;

SELECT '02 L119-123  consistent lock ordering' AS snippet;
START TRANSACTION;
SELECT * FROM accounts WHERE id IN (1, 2) ORDER BY id FOR UPDATE;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
ROLLBACK;

-- ---------------------------------------------------------------------
-- 04-explain-performance-tuning.md
-- ---------------------------------------------------------------------
SELECT '04 L5-11  EXPLAIN grouped join' AS snippet;
EXPLAIN SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.status = 'active'
GROUP BY u.id
ORDER BY order_count DESC
LIMIT 10;

SELECT '04 L52  EXPLAIN before the missing index' AS snippet;
EXPLAIN SELECT * FROM orders WHERE user_id = 5 ORDER BY created_at DESC;

SELECT '04 L56  the fix — add the composite index' AS snippet;
CREATE INDEX idx_user_date ON orders(user_id, created_at);
EXPLAIN SELECT * FROM orders WHERE user_id = 5 ORDER BY created_at DESC;
DROP INDEX idx_user_date ON orders;

SELECT '04 L62-64  join filtered on order status' AS snippet;
EXPLAIN SELECT u.name, o.total
FROM users u JOIN orders o ON u.id = o.user_id
WHERE o.status = 'shipped';

SELECT '04 L68  status/user composite' AS snippet;
CREATE INDEX idx_orders_status_userid ON orders(status, user_id);
EXPLAIN SELECT u.name, o.total
FROM users u JOIN orders o ON u.id = o.user_id
WHERE o.status = 'shipped';
DROP INDEX idx_orders_status_userid ON orders;

SELECT '04 L76  narrow column list' AS snippet;
SELECT name, email FROM users WHERE id = 5;

SELECT '04 L80  IN subquery' AS snippet;
SELECT * FROM users WHERE id IN (SELECT user_id FROM orders) LIMIT 5;

SELECT '04 L82  EXISTS rewrite' AS snippet;
SELECT * FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id) LIMIT 5;

SELECT '04 L86  sargable date range' AS snippet;
SELECT COUNT(*) FROM orders
WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01';

SELECT '04 L89  UNION ALL across users and admins' AS snippet;
SELECT name FROM users UNION ALL SELECT name FROM admins LIMIT 5;

SELECT '04 L92  batch INSERT (rolled back)' AS snippet;
START TRANSACTION;
INSERT INTO logs (msg) VALUES ('a'), ('b'), ('c'), ('d');
ROLLBACK;

-- ---------------------------------------------------------------------
-- 05-mnc-frequently-asked.md
-- ---------------------------------------------------------------------
SELECT '05 L22-24  self join for managers' AS snippet;
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
LIMIT 5;

SELECT '05 L30-31  second highest — subquery' AS snippet;
SELECT MAX(salary) FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

SELECT '05 L34-37  second highest — DENSE_RANK' AS snippet;
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) ranked WHERE rnk = 2;

SELECT '05 L40  second highest — LIMIT/OFFSET' AS snippet;
SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;

SELECT '05 L46-49  duplicate emails' AS snippet;
SELECT email, COUNT(*) as cnt
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

SELECT '05 L131  EXPLAIN simple lookup' AS snippet;
EXPLAIN SELECT * FROM orders WHERE user_id = 5;

-- CORRECTED SNIPPET: the note's literal text does not run. `rank` and
-- `dense_rank` are both reserved words in MySQL 8, so L249 and L250 each
-- throw ERROR 1064. Backticks added here so the *shape* of the query is
-- still exercised; the defect is recorded in the FAILING list below.
SELECT '05 L247-251  ROW_NUMBER / RANK / DENSE_RANK (corrected)' AS snippet;
SELECT name, salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) as row_num,
    RANK() OVER (ORDER BY salary DESC) as `rank`,
    DENSE_RANK() OVER (ORDER BY salary DESC) as `dense_rank`
FROM employees
LIMIT 5;

SELECT '05 L254-256  running total over transactions' AS snippet;
SELECT `date`, amount,
    SUM(amount) OVER (ORDER BY `date`) as running_total
FROM transactions;

SELECT '05 L259-262  top salary per department' AS snippet;
SELECT * FROM (
    SELECT *, RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) as rnk
    FROM employees
) ranked WHERE rnk = 1
LIMIT 5;

SELECT '05 L277-283  above department average — correlated' AS snippet;
SELECT e.name, e.salary, e.dept_id
FROM employees e
WHERE e.salary > (
    SELECT AVG(salary)
    FROM employees
    WHERE dept_id = e.dept_id
)
LIMIT 5;

SELECT '05 L286-289  above department average — window' AS snippet;
SELECT * FROM (
    SELECT *, AVG(salary) OVER (PARTITION BY dept_id) as dept_avg
    FROM employees
) t WHERE salary > dept_avg
LIMIT 5;

SELECT 'COMPAT CHECK COMPLETE' AS snippet;

-- =====================================================================
-- NOT RUN ABOVE — and why. Nothing here is a playground defect.
-- =====================================================================
--
-- FAILING (pre-existing defect in the note — needs a real fix):
--
--   01-joins-indexing.md L174 :  ROW_NUMBER() OVER (...) AS rank
--   01-joins-indexing.md L179 :  RANK()       OVER (...) AS rank
--   05-mnc-frequently-asked.md L249 : RANK()       OVER (...) as rank
--   05-mnc-frequently-asked.md L250 : DENSE_RANK() OVER (...) as dense_rank
--       RANK and DENSE_RANK are RESERVED WORDS in MySQL 8.0.2+. All four
--       statements die with ERROR 1064 on any MySQL 8.x, including 8.4.
--       They have never been executed. Fix: backtick the alias
--       (AS `rank`) or rename it — the same file 01 gets this right at
--       L213 by using `rnk`.
--       Verified failing on MySQL 8.4.11; see ../MIGRATION_NOTES.md §5.
--       The 05 L247-251 block above is run in a corrected form so the
--       query shape is still covered.
--
-- SKIPPED (schema-defining examples that would fight this schema):
--
--   01-joins-indexing.md L103-107 : CREATE TABLE users (...)
--       `users` is the compat VIEW over customers. Re-creating it as a
--       two-column base table would break every other snippet in all
--       four files.
--   01-joins-indexing.md L110 : CREATE UNIQUE INDEX idx_email ON users(email)
--       Cannot index a view. The equivalent index exists on
--       customers.email (uq_customers_email).
--   01-joins-indexing.md L113 : CREATE INDEX idx_name_age ON users(last_name, first_name, age)
--       Columns last_name / first_name / age do not exist in this
--       domain model, and never did — it is an illustration of column
--       ordering, not a statement about this schema.
--
-- OUT OF SCOPE (illustrative placeholders, not schema references):
--
--   04-explain-performance-tuning.md L99 : FROM huge_table
--       "huge_table" is a stand-in noun in a general tip, not a table.
--   05-mnc-frequently-asked.md L156 : SELECT * FROM items WHERE order_id = ?
--       Pseudo-code inside a prose block explaining N+1 — no semicolon,
--       a `?` placeholder, and an "(for each order)" annotation.
-- =====================================================================
