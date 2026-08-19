# 17-CS-Fundamentals/database-internals

Materially less of a from-scratch build than the baseline `_meta/imported/03_MASTER_ROADMAP.md` assumed — B-Tree mechanics and deadlock reproduction already exist correctly elsewhere in the repo. The real, confirmed gap is narrower: **naming MVCC as the mechanism**, not describing the behavior it produces (which is already done correctly).

## Existing content to build on (don't re-derive)

- `07-System-Design/in-depth/03-databases.md` — correct B-Tree lookup walkthrough ("find bob@example.com in ~3 comparisons vs. scanning 10M rows").
- `06-SQL-MySQL-MongoDB/02-transactions-isolation.md` — a real, runnable deadlock example + fix (`transferFunds` with `Math.min`/`Math.max` lock ordering), and a correctly-hedged REPEATABLE READ / phantom-reads explanation.

## Planned files

- `01-btree-internals.md` — extend, don't duplicate, the walkthrough in `07-System-Design/in-depth/03-databases.md`.
- `02-mvcc-undo-logs.md` — the one genuinely new file: names and explains the mechanism InnoDB uses for REPEATABLE READ's snapshot-consistent reads, which `06-SQL-MySQL-MongoDB/02-transactions-isolation.md` correctly describes the *effects* of but never names.
- `03-deadlock-lab.md` — **reproduce one deadlock in MySQL yourself** (not just read the existing example) and write it up. This is the actual completion criterion, per `_meta/MASTER_ROADMAP.md` Phase 5 — "deadlock repro committed."
- `04-isolation-anomalies.md` — dirty/non-repeatable/phantom reads mapped to isolation levels, consolidating what's already scattered correctly across the two files above.

**Completion criteria:** deadlock repro committed as a real MySQL session transcript, not a hypothetical; explain MVCC/undo-logs connecting explicitly to why a plain `SELECT` inside REPEATABLE READ doesn't see other transactions' commits while `SELECT ... FOR UPDATE` does.
