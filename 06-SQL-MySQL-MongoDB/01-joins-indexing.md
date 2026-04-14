# SQL — Joins, Indexing & Query Fundamentals

## JOIN Types (Visual + SQL)
```
INNER JOIN       LEFT JOIN        RIGHT JOIN       FULL OUTER JOIN
  ┌───┐            ┌───┐           ┌───┐            ┌───┐
  │ A ███ B │      ███ A │ B │     │ A │ B ███      ███ A │ B ███
  └───┘            └───┘           └───┘            └───┘
  Only matching    All A +         All B +          All A + All B
                   matching B      matching A
```

### INNER JOIN
```sql
-- Only rows with matching values in both tables
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
```

### LEFT JOIN
```sql
-- All users, even without orders (NULL for missing)
SELECT u.name, COALESCE(o.total, 0) AS total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
```

### RIGHT JOIN
```sql
-- All orders, even without matching user
SELECT u.name, o.total
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;
```

### FULL OUTER JOIN (MySQL workaround)
```sql
-- MySQL doesn't support FULL OUTER JOIN natively
SELECT u.name, o.total
FROM users u LEFT JOIN orders o ON u.id = o.user_id
UNION
SELECT u.name, o.total
FROM users u RIGHT JOIN orders o ON u.id = o.user_id;
```

### CROSS JOIN
```sql
-- Cartesian product: every row of A paired with every row of B
SELECT colors.name, sizes.label
FROM colors CROSS JOIN sizes;
```

### Self JOIN
```sql
-- Employee and their manager
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
```

## Subqueries vs JOINs
```sql
-- Subquery (works but slower for large datasets)
SELECT name FROM users
WHERE id IN (SELECT user_id FROM orders WHERE total > 100);

-- Equivalent JOIN (usually faster — optimizer can use indexes)
SELECT DISTINCT u.name
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.total > 100;

-- Correlated subquery (runs once per outer row — can be slow)
SELECT name, (
    SELECT COUNT(*) FROM orders WHERE orders.user_id = users.id
) AS order_count
FROM users;

-- Better alternative
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;
```

## Indexing Deep Dive

### How B-Tree Indexes Work
```
                    [50]
                   /    \
               [20,35]  [70,90]
              / |  \    / |  \
           [10][25][40][60][80][95]  ← Leaf nodes (sorted, linked)

Lookup: O(log n) — follow tree from root to leaf
Range scan: Find start in tree, then follow leaf pointers
```

### Index Types in MySQL
```sql
-- Primary Key (clustered — data physically ordered by this)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255)
);

-- Unique Index
CREATE UNIQUE INDEX idx_email ON users(email);

-- Composite Index (column order matters!)
CREATE INDEX idx_name_age ON users(last_name, first_name, age);
-- ✅ WHERE last_name = 'Sawant'
-- ✅ WHERE last_name = 'Sawant' AND first_name = 'Onkar'
-- ❌ WHERE first_name = 'Onkar' (leftmost prefix rule violated)
-- ❌ WHERE age = 30 (skipped first columns)

-- Covering Index (all columns in query are in index → no table lookup)
CREATE INDEX idx_cover ON orders(user_id, status, total);
-- SELECT status, total FROM orders WHERE user_id = 5; → index-only scan

-- Full-text Index
CREATE FULLTEXT INDEX idx_ft ON articles(title, body);
SELECT * FROM articles WHERE MATCH(title, body) AGAINST('react hooks' IN BOOLEAN MODE);
```

### Leftmost Prefix Rule
```
Index: (a, b, c)

✅ WHERE a = 1
✅ WHERE a = 1 AND b = 2
✅ WHERE a = 1 AND b = 2 AND c = 3
✅ WHERE a = 1 ORDER BY b
❌ WHERE b = 2                    (a skipped)
❌ WHERE b = 2 AND c = 3          (a skipped)
❌ WHERE a = 1 AND c = 3          (b skipped — c can't use index)
```

### When NOT to Index
- Small tables (full scan is faster)
- Columns with low cardinality (e.g., boolean, status with 3 values)
- Tables with heavy writes and few reads (index maintenance overhead)
- Columns rarely used in WHERE/JOIN/ORDER BY

## EXPLAIN — Reading Query Plans
```sql
EXPLAIN SELECT u.name, COUNT(o.id)
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.status = 'active'
GROUP BY u.id;

-- Key columns:
-- type:     ALL (full scan) < index < range < ref < eq_ref < const
-- key:      Which index is used (NULL = no index)
-- rows:     Estimated rows scanned
-- Extra:    "Using index" (covering), "Using filesort" (slow sort), "Using temporary" (temp table)
```

### Optimization Red Flags
```
type = ALL           → Missing index, full table scan
Extra: Using filesort → ORDER BY not covered by index
Extra: Using temporary → GROUP BY/DISTINCT needs temp table
rows > 10000         → Consider adding index or restructuring query
```

## Window Functions
```sql
-- ROW_NUMBER — unique sequential number
SELECT name, salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank
FROM employees;

-- RANK — same rank for ties, gaps after
SELECT name, salary,
    RANK() OVER (ORDER BY salary DESC) AS rank
FROM employees;

-- DENSE_RANK — same rank for ties, no gaps
-- LAG / LEAD — previous/next row value
SELECT name, salary,
    LAG(salary) OVER (ORDER BY hire_date) AS prev_salary,
    salary - LAG(salary) OVER (ORDER BY hire_date) AS salary_diff
FROM employees;

-- Partition by department
SELECT dept, name, salary,
    RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS dept_rank
FROM employees;
-- Get top 3 per department:
SELECT * FROM (
    SELECT dept, name, salary,
        ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn
    FROM employees
) ranked WHERE rn <= 3;
```

## Common Interview SQL Problems

### 1. Second Highest Salary
```sql
-- Method 1: LIMIT/OFFSET
SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;

-- Method 2: Subquery
SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);

-- Method 3: DENSE_RANK (handles ties)
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) t WHERE rnk = 2;
```

### 2. Duplicate Emails
```sql
SELECT email, COUNT(*) as cnt
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

### 3. Consecutive Numbers
```sql
SELECT DISTINCT l1.num
FROM logs l1
JOIN logs l2 ON l1.id = l2.id - 1 AND l1.num = l2.num
JOIN logs l3 ON l2.id = l3.id - 1 AND l2.num = l3.num;
```

### 4. Department Top Earner
```sql
SELECT d.name AS department, e.name AS employee, e.salary
FROM employees e
JOIN departments d ON e.dept_id = d.id
WHERE (e.dept_id, e.salary) IN (
    SELECT dept_id, MAX(salary)
    FROM employees
    GROUP BY dept_id
);
```

## Practice Problems
1. Write a query to find customers who ordered every product
2. Find running total of sales per month
3. Pivot table: show sales by quarter as columns
4. Find gaps in a sequence of IDs
5. Self-join: find pairs of employees in the same department earning equal salary
