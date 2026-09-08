-- =====================================================================
-- reset.sql — return the playground to its exact seeded state
-- =====================================================================
-- Usage:  make reset          (preferred)
--         mysql -h127.0.0.1 -P3307 -uroot -p sqlplay < reset.sql
--
-- Why TRUNCATE-and-reload rather than DROP DATABASE: reloading only the
-- data keeps the schema objects, triggers, views and — importantly —
-- any index YOU added during the optimization labs. If you want a
-- genuinely virgin database including dropped indexes, use
-- `make reset-hard` (docker compose down -v && up).
--
-- Determinism contract: every value in seed.sql is a fixed literal, so
-- the MD5 checksums in expected/*.md are identical before and after a
-- reset. Verification gate #9 in VERIFICATION.md proves this by diffing
-- them. If a checksum moves after a reset, seed.sql has picked up a
-- non-deterministic value (RAND(), NOW(), or an unset DEFAULT
-- CURRENT_TIMESTAMP column) — that is a bug, not drift.
-- =====================================================================

USE sqlplay;

SET FOREIGN_KEY_CHECKS = 0;

-- Child-to-parent order is irrelevant with FK checks off, but the
-- listing is kept in dependency order so it doubles as documentation.
TRUNCATE TABLE order_items;
TRUNCATE TABLE payments;
TRUNCATE TABLE shipments;
TRUNCATE TABLE reviews;
TRUNCATE TABLE orders;
TRUNCATE TABLE inventory;
TRUNCATE TABLE product_suppliers;
TRUNCATE TABLE products;
TRUNCATE TABLE categories;
TRUNCATE TABLE suppliers;
TRUNCATE TABLE warehouses;
TRUNCATE TABLE customers;
TRUNCATE TABLE employees;
TRUNCATE TABLE departments;
TRUNCATE TABLE staging_customers;

-- Legacy-compat tables (schema.sql §3)
TRUNCATE TABLE logs;
TRUNCATE TABLE colors;
TRUNCATE TABLE sizes;
TRUNCATE TABLE accounts;
TRUNCATE TABLE admins;
TRUNCATE TABLE articles;
TRUNCATE TABLE transactions;

SET FOREIGN_KEY_CHECKS = 1;

-- TRUNCATE already resets AUTO_INCREMENT to 1 on InnoDB, which is what
-- keeps the seeded ids — and therefore the checksums — stable.
--
-- This file only empties. `make reset` pipes seed.sql in immediately
-- afterwards:
--     mysql ... < reset.sql && mysql ... < seed.sql
-- Kept as two steps on purpose — SOURCE would hard-code a path that is
-- different inside the container and on a host running the WSL/native
-- MySQL fallback described in ../COMPATIBILITY.md.
