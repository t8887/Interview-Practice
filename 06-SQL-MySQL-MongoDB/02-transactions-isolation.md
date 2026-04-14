# SQL — Transactions, Isolation Levels & Locking

## ACID Properties
| Property | Meaning | Example |
|---|---|---|
| **Atomicity** | All or nothing | Transfer: debit + credit both succeed or both rollback |
| **Consistency** | DB moves from one valid state to another | Foreign keys, constraints always satisfied after transaction |
| **Isolation** | Concurrent transactions don't interfere | Two transfers on same account don't lose money |
| **Durability** | Committed data survives crashes | Written to disk / WAL before confirming |

## Transaction Basics
```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;

-- Check business rule
SELECT balance FROM accounts WHERE id = 1;
-- If balance < 0, rollback
ROLLBACK;
-- Otherwise
COMMIT;
```

### Savepoints
```sql
START TRANSACTION;

INSERT INTO orders (user_id, total) VALUES (1, 100);
SAVEPOINT after_order;

INSERT INTO order_items (order_id, product_id) VALUES (LAST_INSERT_ID(), 999);
-- If item doesn't exist:
ROLLBACK TO after_order;

-- Order still exists, can try different item
INSERT INTO order_items (order_id, product_id) VALUES (LAST_INSERT_ID(), 100);
COMMIT;
```

## Isolation Levels (MySQL InnoDB)

### Read Phenomena
```
Dirty Read:        Reading uncommitted data from another transaction
Non-Repeatable Read: Same query returns different values (row updated between reads)
Phantom Read:      Same query returns different set of rows (rows added/deleted)
```

| Level | Dirty Read | Non-Repeatable | Phantom |
|---|---|---|---|
| READ UNCOMMITTED | Possible | Possible | Possible |
| READ COMMITTED | ❌ | Possible | Possible |
| REPEATABLE READ (MySQL default) | ❌ | ❌ | Possible* |
| SERIALIZABLE | ❌ | ❌ | ❌ |

*InnoDB's REPEATABLE READ prevents phantoms via gap locking in most cases.

### Setting Isolation Level
```sql
-- Session level
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Global
SET GLOBAL TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Check current
SELECT @@transaction_isolation;
```

## Locking in MySQL

### Row-Level Locks
```sql
-- Shared lock (SELECT ... FOR SHARE) — others can read, can't write
SELECT * FROM products WHERE id = 1 FOR SHARE;

-- Exclusive lock (SELECT ... FOR UPDATE) — others can't read or write
SELECT * FROM products WHERE id = 1 FOR UPDATE;
-- Now update safely
UPDATE products SET stock = stock - 1 WHERE id = 1;
COMMIT;
```

### Optimistic vs Pessimistic Locking

```sql
-- PESSIMISTIC: Lock the row first, then update
START TRANSACTION;
SELECT stock FROM products WHERE id = 1 FOR UPDATE;  -- Lock
UPDATE products SET stock = stock - 1 WHERE id = 1;
COMMIT;

-- OPTIMISTIC: No lock, detect conflicts via version column
-- Step 1: Read with version
SELECT stock, version FROM products WHERE id = 1;
-- stock=10, version=5

-- Step 2: Update only if version unchanged
UPDATE products SET stock = 9, version = 6
WHERE id = 1 AND version = 5;

-- If affected_rows = 0, someone else updated → retry
```

### Deadlock Example & Prevention
```sql
-- Transaction 1:
UPDATE accounts SET balance = balance - 100 WHERE id = 1; -- Locks row 1
UPDATE accounts SET balance = balance + 100 WHERE id = 2; -- Waits for row 2

-- Transaction 2 (simultaneously):
UPDATE accounts SET balance = balance - 50 WHERE id = 2;  -- Locks row 2
UPDATE accounts SET balance = balance + 50 WHERE id = 1;  -- Waits for row 1
-- DEADLOCK! MySQL detects and rolls back one transaction.

-- Prevention: Always access rows in the same order (e.g., by ascending ID)
START TRANSACTION;
SELECT * FROM accounts WHERE id IN (1, 2) ORDER BY id FOR UPDATE;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

## Node.js Transaction Pattern
```javascript
const mysql = require('mysql2/promise');

async function transferFunds(fromId, toId, amount) {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        
        // Lock both rows in consistent order
        const [rows] = await conn.query(
            'SELECT id, balance FROM accounts WHERE id IN (?, ?) ORDER BY id FOR UPDATE',
            [Math.min(fromId, toId), Math.max(fromId, toId)]
        );
        
        const from = rows.find(r => r.id === fromId);
        if (from.balance < amount) {
            throw new Error('Insufficient funds');
        }
        
        await conn.query('UPDATE accounts SET balance = balance - ? WHERE id = ?', [amount, fromId]);
        await conn.query('UPDATE accounts SET balance = balance + ? WHERE id = ?', [amount, toId]);
        
        await conn.commit();
        return { success: true };
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
}
```

## Normalization Quick Reference

| Normal Form | Rule | Example Fix |
|---|---|---|
| 1NF | No repeating groups, atomic values | `skills: "JS,TS"` → separate skills table |
| 2NF | 1NF + no partial dependency on composite key | Remove cols depending on part of composite PK |
| 3NF | 2NF + no transitive dependency | `zip → city` in users table → separate cities table |
| BCNF | Every determinant is a candidate key | Rare edge cases of 3NF violations |

### When to Denormalize
- Read-heavy dashboards / reports (pre-computed aggregates)
- High-traffic queries joining many tables
- Caching layer (materialized view, summary table)
- Document store patterns in relational DB

## Interview Questions

**Q: Explain ACID with a real-world example.**
> Bank transfer: Debit $500 from A, credit $500 to B. Atomicity — both happen or neither. Consistency — total money unchanged. Isolation — concurrent transfer on A doesn't cause race condition. Durability — committed transfer survives server crash.

**Q: READ COMMITTED vs REPEATABLE READ?**
> READ COMMITTED sees latest committed data on each query (non-repeatable reads possible). REPEATABLE READ sees a snapshot from the transaction start (consistent reads throughout). MySQL defaults to REPEATABLE READ.

**Q: How do you prevent lost updates?**
> Pessimistic locking (SELECT FOR UPDATE) or optimistic locking (version column). Pessimistic is safer but reduces concurrency. Optimistic is better for low-contention scenarios.

**Q: What is a deadlock and how to avoid it?**
> Two transactions each holding a lock the other needs. Avoid by: (1) accessing rows in consistent order, (2) keeping transactions short, (3) using lower isolation levels when safe, (4) indexing to reduce lock scope.
