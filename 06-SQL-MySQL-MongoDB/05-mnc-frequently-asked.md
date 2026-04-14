# SQL, MySQL & MongoDB — MNC & Product Company Frequently Asked Questions

> Sources: Glassdoor, AmbitionBox, GeeksforGeeks, InterviewBit, LeetCode Discuss
> Companies: Amazon, Google, Flipkart, Walmart, Razorpay, PhonePe, Paytm, Swiggy, CRED, PayPal

---

## JOINs (Most Frequently Asked)

### Q1: Explain all types of JOINs with examples.
> | JOIN Type | Returns |
> |-----------|---------|
> | **INNER JOIN** | Only matching rows from both tables |
> | **LEFT JOIN** | All rows from left + matched from right (NULL if no match) |
> | **RIGHT JOIN** | All rows from right + matched from left |
> | **FULL OUTER JOIN** | All rows from both (NULL where no match) |
> | **CROSS JOIN** | Cartesian product (every row × every row) |
> | **SELF JOIN** | Table joined with itself |
>
> ```sql
> -- Find employees with their managers (self join)
> SELECT e.name AS employee, m.name AS manager
> FROM employees e
> LEFT JOIN employees m ON e.manager_id = m.id;
> ```

### Q2: Write a query to find the second highest salary.
```sql
-- Method 1: Subquery
SELECT MAX(salary) FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Method 2: DENSE_RANK (handles duplicates)
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) ranked WHERE rnk = 2;

-- Method 3: LIMIT/OFFSET
SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;
```
> **Where asked:** Literally every backend/fullstack interview (Amazon, Flipkart, Walmart, PayPal)

### Q3: Find duplicate records in a table.
```sql
SELECT email, COUNT(*) as cnt
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

### Q4: What is the difference between WHERE and HAVING?
> | WHERE | HAVING |
> |-------|--------|
> | Filters rows **before** grouping | Filters groups **after** GROUP BY |
> | Cannot use aggregate functions | Can use aggregate functions |
> | `WHERE salary > 50000` | `HAVING COUNT(*) > 5` |

---

## Indexing

### Q5: What is an index? Types of indexes?
> **A:** Data structure (usually B-Tree) that speeds up data retrieval at cost of write performance and storage.
> | Index Type | Description |
> |-----------|-------------|
> | **Primary** | Auto on PRIMARY KEY, unique + not null |
> | **Unique** | Ensures no duplicates |
> | **Composite** | Multiple columns `(col1, col2)` |
> | **Covering** | Index includes all columns needed by query |
> | **Full-text** | For text search (`MATCH... AGAINST`) |
> | **Hash** | O(1) exact match (Memory engine) |

### Q6: What is the leftmost prefix rule for composite indexes?
> For index on `(a, b, c)`:
> - `WHERE a = 1` — ✅ uses index
> - `WHERE a = 1 AND b = 2` — ✅ uses index
> - `WHERE a = 1 AND b = 2 AND c = 3` — ✅ uses full index
> - `WHERE b = 2` — ❌ cannot use index
> - `WHERE a = 1 AND c = 3` — ✅ uses index on `a` only, scans for `c`
> **Rule:** Query must use leftmost column(s) of composite index.
> **Where asked:** Amazon, Walmart, Flipkart

### Q7: When should you NOT create an index?
> - Small tables (full scan is faster)
> - Columns with low cardinality (boolean, gender)
> - Columns rarely used in WHERE/JOIN/ORDER BY
> - Heavily written tables where read speed isn't critical
> - Over-indexing = slow writes + storage waste

---

## Transactions & Isolation

### Q8: What are ACID properties?
> | Property | Meaning |
> |----------|---------|
> | **Atomicity** | All or nothing — entire transaction succeeds or rolls back |
> | **Consistency** | DB moves from one valid state to another |
> | **Isolation** | Concurrent transactions don't interfere |
> | **Durability** | Committed data survives crashes (written to disk) |

### Q9: Explain transaction isolation levels and their problems.
> | Level | Dirty Read | Non-Repeatable Read | Phantom Read |
> |-------|-----------|---------------------|-------------|
> | READ UNCOMMITTED | Yes | Yes | Yes |
> | READ COMMITTED | No | Yes | Yes |
> | REPEATABLE READ | No | No | Yes |
> | SERIALIZABLE | No | No | No |
>
> - **Dirty Read:** Reading uncommitted data from another transaction
> - **Non-Repeatable Read:** Same query returns different values (row updated)
> - **Phantom Read:** Same query returns different row count (rows inserted/deleted)
> MySQL default: **REPEATABLE READ**. PostgreSQL default: **READ COMMITTED**.

### Q10: What is a deadlock? How to prevent it?
> **A:** Two transactions each hold a lock the other needs → both wait forever.
> **Prevention:**
> 1. Always lock tables/rows in the **same order**
> 2. Keep transactions **short**
> 3. Use `SELECT ... FOR UPDATE` explicitly
> 4. Set lock timeout (`innodb_lock_wait_timeout`)
> 5. Retry logic on deadlock detection

---

## EXPLAIN & Performance Tuning

### Q11: How do you read an EXPLAIN plan?
> ```sql
> EXPLAIN SELECT * FROM orders WHERE user_id = 5;
> ```
> Key columns:
> | Column | What to look for |
> |--------|-----------------|
> | **type** | `ALL` (bad, full scan) → `index` → `range` → `ref` → `eq_ref` → `const` (best) |
> | **key** | Which index is used (NULL = no index) |
> | **rows** | Estimated rows scanned (lower is better) |
> | **Extra** | `Using filesort` (bad), `Using temporary` (bad), `Using index` (good — covering index) |
> **Where asked:** Amazon, Walmart, Razorpay, PhonePe

### Q12: How do you optimize a slow query?
> 1. Run `EXPLAIN` — check if index is used
> 2. Add appropriate **indexes** (composite if multiple WHERE columns)
> 3. Avoid `SELECT *` — select only needed columns
> 4. Avoid functions on indexed columns (`WHERE YEAR(date)` = no index)
> 5. Use **pagination** (`LIMIT` + `OFFSET`, or cursor-based)
> 6. Denormalize for read-heavy workloads
> 7. Use **query cache** / **materialized views**
> 8. Check for **N+1 queries** in application code

### Q13: What is the N+1 query problem?
> **A:** Fetching parent + N children with N+1 separate queries instead of 1-2.
> ```
> 1 query: SELECT * FROM orders
> N queries: SELECT * FROM items WHERE order_id = ? (for each order)
> ```
> **Fix:** Use JOIN or `WHERE order_id IN (...)` or ORM eager loading (`include`/`populate`).

---

## MongoDB — Schema Design

### Q14: When to embed vs reference in MongoDB?
> | Embed (denormalize) | Reference (normalize) |
> |--------------------|----------------------|
> | 1:few relationship | 1:many or many:many |
> | Data always accessed together | Data accessed independently |
> | Document < 16MB | Large subdocuments |
> | Read-heavy | Write-heavy on subdocs |
>
> ```javascript
> // Embed: user with addresses
> { name: "John", addresses: [{ city: "Mumbai" }, { city: "Delhi" }] }
>
> // Reference: user with orders
> { name: "John", orderIds: [ObjectId("..."), ObjectId("...")] }
> ```
> **Rule of thumb:** "Data that is accessed together should be stored together."

### Q15: What are MongoDB indexes? How does compound index work?
> Same B-Tree concept as SQL. Types:
> - **Single field:** `db.users.createIndex({ email: 1 })`
> - **Compound:** `db.orders.createIndex({ userId: 1, createdAt: -1 })`
> - **Text:** `db.posts.createIndex({ content: "text" })`
> - **TTL:** Auto-delete docs after time `{ createdAt: 1 }, { expireAfterSeconds: 3600 }`
> Compound index follows **ESR rule**: **E**quality → **S**ort → **R**ange fields.

---

## MongoDB — Aggregation Pipeline

### Q16: Explain the aggregation pipeline with an example.
```javascript
db.orders.aggregate([
    { $match: { status: "completed" } },           // Filter (like WHERE)
    { $group: {                                     // Group (like GROUP BY)
        _id: "$userId",
        totalSpent: { $sum: "$amount" },
        orderCount: { $sum: 1 }
    }},
    { $sort: { totalSpent: -1 } },                  // Sort
    { $limit: 10 },                                  // Top 10
    { $lookup: {                                     // Join (like LEFT JOIN)
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user"
    }},
    { $unwind: "$user" },                            // Flatten array
    { $project: {                                    // Select fields
        userName: "$user.name",
        totalSpent: 1,
        orderCount: 1
    }}
]);
```
> **Where asked:** Amazon, Flipkart, Swiggy, PayPal

### Q17: What is `$lookup`? How is it different from SQL JOIN?
> - `$lookup` = left outer join in aggregation
> - Less performant than SQL JOINs (no query optimizer like RDBMS)
> - Joins happen at application/aggregation level
> - Avoid in hot paths — prefer embedding or application-level joins

---

## MongoDB vs SQL

### Q18: When to use MongoDB vs MySQL/PostgreSQL?
> | MongoDB | SQL (MySQL/PostgreSQL) |
> |---------|----------------------|
> | Flexible schema | Fixed schema |
> | Rapid iteration, prototyping | Data integrity critical |
> | Hierarchical/nested data | Relational data with JOINs |
> | Horizontal scaling (sharding) | Vertical scaling (+ read replicas) |
> | No transactions (pre-4.0) / multi-doc txns (4.0+) | Full ACID transactions |
> | Real-time analytics, IoT, CMS | Financial, e-commerce, ERP |

---

## Advanced SQL Questions

### Q19: What are window functions? Give examples.
```sql
-- Row number, rank, dense_rank
SELECT name, salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) as row_num,
    RANK() OVER (ORDER BY salary DESC) as rank,
    DENSE_RANK() OVER (ORDER BY salary DESC) as dense_rank
FROM employees;

-- Running total
SELECT date, amount,
    SUM(amount) OVER (ORDER BY date) as running_total
FROM transactions;

-- Department-wise top salary
SELECT * FROM (
    SELECT *, RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) as rnk
    FROM employees
) ranked WHERE rnk = 1;
```
> **Where asked:** Every SQL round (Amazon, Walmart, Google, PayPal)

### Q20: What is normalization? Explain normal forms.
> | Form | Rule |
> |------|------|
> | **1NF** | No repeating groups, atomic values |
> | **2NF** | 1NF + no partial dependencies (all non-key cols depend on full PK) |
> | **3NF** | 2NF + no transitive dependencies (non-key cols don't depend on other non-key cols) |
> | **BCNF** | Every determinant is a candidate key |
> **In practice:** Most applications normalize to 3NF, then selectively denormalize for performance.

### Q21: Write a query: Find employees who earn more than their department average.
```sql
SELECT e.name, e.salary, e.dept_id
FROM employees e
WHERE e.salary > (
    SELECT AVG(salary)
    FROM employees
    WHERE dept_id = e.dept_id
);

-- Or with window function:
SELECT * FROM (
    SELECT *, AVG(salary) OVER (PARTITION BY dept_id) as dept_avg
    FROM employees
) t WHERE salary > dept_avg;
```

### Q22: Difference between DELETE, TRUNCATE, and DROP?
> | Command | Effect | Rollback? | Speed |
> |---------|--------|-----------|-------|
> | DELETE | Removes rows (can use WHERE) | Yes | Slow (row-by-row) |
> | TRUNCATE | Removes all rows, resets auto-increment | No (DDL) | Fast |
> | DROP | Removes entire table (structure + data) | No | Instant |

---

## Quick Fire

### Q23: What is a stored procedure vs a function?
> - Procedure: can have side effects, no return requirement, called with `CALL`
> - Function: must return a value, can use in SELECT, no side effects

### Q24: What is connection pooling?
> **A:** Reuse a pool of DB connections instead of creating/destroying per request. Libraries: `mysql2` pool, `pg-pool`, Mongoose built-in pooling. Typical pool size: 10-20 connections.

### Q25: What is sharding in MongoDB?
> **A:** Distributing data across multiple servers (shards) based on a **shard key**. Types: range-based, hash-based. Enables horizontal scaling for massive datasets. Choose shard key carefully — bad shard key = hot spots.
