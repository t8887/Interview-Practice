-- =====================================================================
-- sqlplay — MySQL interview playground schema
-- Target: MySQL 8.4 LTS (see ../COMPATIBILITY.md for 8.0 differences)
-- =====================================================================
-- Design rules enforced here (see ../README.md for the reasoning):
--   * InnoDB + utf8mb4 everywhere.
--   * PK on every table. FK on every relationship, with a deliberate
--     ON DELETE / ON UPDATE action chosen per relationship, not by default.
--   * DECIMAL(10,2) for money — never FLOAT.
--   * DATETIME for business events, TIMESTAMP for audit columns.
--   * Some columns are deliberately NULLable because NULL semantics are
--     the thing being taught (employees.manager_id, customers.phone,
--     shipments.delivered_at, orders.cancelled_at, payments.paid_at).
--   * ONE INDEX IS DELIBERATELY MISSING: orders(user_id, order_date).
--     Do not add it here. questions/07_advanced/QUERY_OPTIMIZATION.md
--     makes you add it and measure the difference yourself.
--
-- Section 3 at the bottom holds legacy-compatibility tables that exist
-- only so the SQL already written in ../01, ../02, ../04 and ../05 runs
-- unchanged. They are not part of the question bank's domain model.
-- Full mapping + evidence: ../MIGRATION_NOTES.md
-- =====================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 1;

CREATE DATABASE IF NOT EXISTS sqlplay
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE sqlplay;

-- =====================================================================
-- SECTION 1 — Core domain
-- =====================================================================

-- ---------------------------------------------------------------------
-- departments
-- ---------------------------------------------------------------------
CREATE TABLE departments (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  name        VARCHAR(100)    NOT NULL,
  location    VARCHAR(100)    NOT NULL,
  budget      DECIMAL(12,2)   NOT NULL,
  created_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_departments_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- employees
--   manager_id is a NULLable self-FK. The seed builds a chain at least
--   4 levels deep so recursive CTEs have real work to do.
--   `dept` is a denormalized copy of departments.name kept in sync by
--   the triggers below. It exists because ../01-joins-indexing.md L189-192
--   does `PARTITION BY dept` directly on employees. dept_id is canonical;
--   never write to `dept` by hand. See ../MIGRATION_NOTES.md §3.
-- ---------------------------------------------------------------------
CREATE TABLE employees (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  name        VARCHAR(100)    NOT NULL,
  email       VARCHAR(150)    NOT NULL,
  salary      DECIMAL(10,2)   NOT NULL,
  dept_id     INT UNSIGNED    NOT NULL,
  dept        VARCHAR(100)    NOT NULL DEFAULT '',
  manager_id  INT UNSIGNED    NULL,
  hire_date   DATE            NOT NULL,
  created_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_employees_email (email),
  -- FK index, needed by InnoDB anyway; also the driver for dept rollups.
  KEY idx_employees_dept (dept_id),
  KEY idx_employees_manager (manager_id),
  -- COMPOSITE #1 — the leftmost-prefix demo extended from
  -- ../01-joins-indexing.md L128-140. (dept_id) and (dept_id, salary)
  -- are usable prefixes; (salary) alone is not.
  KEY idx_employees_dept_salary (dept_id, salary),
  -- RESTRICT: a department with staff must not vanish; reassign first.
  CONSTRAINT fk_employees_dept FOREIGN KEY (dept_id)
    REFERENCES departments (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  -- SET NULL: deleting a manager must orphan their reports, never
  -- cascade-delete a subtree of people.
  CONSTRAINT fk_employees_manager FOREIGN KEY (manager_id)
    REFERENCES employees (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- customers
-- ---------------------------------------------------------------------
CREATE TABLE customers (
  id           INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  name         VARCHAR(100)   NOT NULL,
  email        VARCHAR(150)   NOT NULL,
  phone        VARCHAR(20)    NULL,          -- deliberately NULLable
  city         VARCHAR(100)   NOT NULL,
  country      VARCHAR(60)    NOT NULL,
  status       ENUM('active','inactive','blocked') NOT NULL DEFAULT 'active',
  signup_date  DATE           NOT NULL,
  created_at   TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_customers_email (email),
  KEY idx_customers_status (status),
  -- COMPOSITE #2 — leftmost prefix again: (country) and (country, city)
  -- hit the index; a bare WHERE city = 'Pune' cannot.
  KEY idx_customers_country_city (country, city)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- categories
-- ---------------------------------------------------------------------
CREATE TABLE categories (
  id          INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  name        VARCHAR(100)   NOT NULL,
  created_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categories_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- suppliers
-- ---------------------------------------------------------------------
CREATE TABLE suppliers (
  id             INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  name           VARCHAR(150)  NOT NULL,
  contact_email  VARCHAR(150)  NOT NULL,
  country        VARCHAR(60)   NOT NULL,
  created_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_suppliers_email (contact_email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- products
--   attributes  — the JSON column (JSON_EXTRACT / ->> / JSON_TABLE labs)
--   price_with_tax — STORED generated column (18% GST)
--   stock, version — used only by the locking demos in
--                    ../02-transactions-isolation.md L77-105.
--                    Per-warehouse stock lives in `inventory`.
-- ---------------------------------------------------------------------
CREATE TABLE products (
  id             INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  sku            VARCHAR(30)    NOT NULL,
  name           VARCHAR(150)   NOT NULL,
  category_id    INT UNSIGNED   NOT NULL,
  price          DECIMAL(10,2)  NOT NULL,
  attributes     JSON           NULL,
  price_with_tax DECIMAL(10,2)  AS (ROUND(price * 1.18, 2)) STORED,
  stock          INT            NOT NULL DEFAULT 0,
  version        INT            NOT NULL DEFAULT 1,
  created_at     TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_products_sku (sku),
  KEY idx_products_category (category_id),
  KEY idx_products_category_price (category_id, price),
  -- RESTRICT: don't let a category disappear under live products.
  CONSTRAINT fk_products_category FOREIGN KEY (category_id)
    REFERENCES categories (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- product_suppliers  (M:N junction, natural composite PK)
-- ---------------------------------------------------------------------
CREATE TABLE product_suppliers (
  product_id   INT UNSIGNED   NOT NULL,
  supplier_id  INT UNSIGNED   NOT NULL,
  cost_price   DECIMAL(10,2)  NOT NULL,
  lead_days    INT            NOT NULL,
  created_at   TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (product_id, supplier_id),
  KEY idx_prodsup_supplier (supplier_id),
  -- CASCADE: a link row has no meaning without both sides.
  CONSTRAINT fk_prodsup_product FOREIGN KEY (product_id)
    REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_prodsup_supplier FOREIGN KEY (supplier_id)
    REFERENCES suppliers (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- warehouses
-- ---------------------------------------------------------------------
CREATE TABLE warehouses (
  id          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  name        VARCHAR(100)  NOT NULL,
  city        VARCHAR(100)  NOT NULL,
  country     VARCHAR(60)   NOT NULL,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_warehouses_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- inventory  (one row per product per warehouse)
-- ---------------------------------------------------------------------
CREATE TABLE inventory (
  product_id    INT UNSIGNED  NOT NULL,
  warehouse_id  INT UNSIGNED  NOT NULL,
  quantity      INT           NOT NULL DEFAULT 0,
  reorder_level INT           NOT NULL DEFAULT 10,
  updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
                              ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (product_id, warehouse_id),   -- satisfies UNIQUE(product, warehouse)
  KEY idx_inventory_warehouse (warehouse_id),
  CONSTRAINT fk_inventory_product FOREIGN KEY (product_id)
    REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_inventory_warehouse FOREIGN KEY (warehouse_id)
    REFERENCES warehouses (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT ck_inventory_qty CHECK (quantity >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- orders
--   NOTE THE COLUMN NAME: user_id, not customer_id. The SQL already
--   written in ../01 L17-35 and ../04 L52 joins on orders.user_id, and
--   those files are not being edited. See ../MIGRATION_NOTES.md §2.
--   order_date  = business event (DATETIME)
--   created_at  = audit column (TIMESTAMP); seeded equal to order_date
--                 so ../04-explain-performance-tuning.md L52's
--                 "ORDER BY created_at DESC" is meaningful.
--   NO INDEX ON (user_id, order_date) — that is the exercise.
-- ---------------------------------------------------------------------
CREATE TABLE orders (
  id            INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  user_id       INT UNSIGNED   NOT NULL,
  -- DEFAULT CURRENT_TIMESTAMP is a compat concession, not decoration:
  -- ../02-transactions-isolation.md L30 does
  --   INSERT INTO orders (user_id, total) VALUES (1, 100);
  -- which fails with "Field 'order_date' doesn't have a default value"
  -- without it. seed.sql always writes this column explicitly, so the
  -- default never fires during seeding and the checksums stay stable.
  order_date    DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status        ENUM('pending','paid','shipped','delivered','cancelled','returned')
                               NOT NULL DEFAULT 'pending',
  total         DECIMAL(10,2)  NOT NULL,
  cancelled_at  DATETIME       NULL,        -- deliberately NULLable
  created_at    TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_orders_user (user_id),            -- FK index only
  KEY idx_orders_date (order_date),
  KEY idx_orders_status (status),
  -- RESTRICT: order history outlives the customer record; soft-delete
  -- customers instead of hard-deleting them.
  CONSTRAINT fk_orders_user FOREIGN KEY (user_id)
    REFERENCES customers (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT ck_orders_total CHECK (total >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- order_items
--   Composite PK (order_id, product_id) IS the UNIQUE constraint the
--   domain demands: the same product twice on one order is a quantity
--   bump, not a second line.
--   line_total — the generated-column teaching example.
-- ---------------------------------------------------------------------
CREATE TABLE order_items (
  order_id    INT UNSIGNED   NOT NULL,
  product_id  INT UNSIGNED   NOT NULL,
  -- Defaults are another compat concession:
  -- ../02-transactions-isolation.md L33 and L38 insert only
  -- (order_id, product_id). Without defaults both statements die on
  -- "Field 'quantity' doesn't have a default value" before the savepoint
  -- lesson they exist to teach can even run. A 0.00 default unit_price
  -- would be wrong in a real system — flagged in ../MIGRATION_NOTES.md §5.
  quantity    INT            NOT NULL DEFAULT 1,
  unit_price  DECIMAL(10,2)  NOT NULL DEFAULT 0.00,
  line_total  DECIMAL(12,2)  AS (quantity * unit_price) STORED,
  PRIMARY KEY (order_id, product_id),
  KEY idx_order_items_product (product_id),
  -- CASCADE: line items are parts of the order, not independent facts.
  CONSTRAINT fk_items_order FOREIGN KEY (order_id)
    REFERENCES orders (id) ON DELETE CASCADE ON UPDATE CASCADE,
  -- RESTRICT: a product that has ever been sold cannot be deleted —
  -- that would rewrite sales history.
  CONSTRAINT fk_items_product FOREIGN KEY (product_id)
    REFERENCES products (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT ck_items_qty CHECK (quantity > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- payments
-- ---------------------------------------------------------------------
CREATE TABLE payments (
  id          INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  order_id    INT UNSIGNED   NOT NULL,
  amount      DECIMAL(10,2)  NOT NULL,
  method      ENUM('credit_card','debit_card','upi','net_banking','wallet','cod')
                             NOT NULL,
  status      ENUM('pending','success','failed','refunded') NOT NULL,
  paid_at     DATETIME       NULL,          -- NULL until it actually settles
  created_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_payments_order (order_id),
  KEY idx_payments_status (status),
  CONSTRAINT fk_payments_order FOREIGN KEY (order_id)
    REFERENCES orders (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- shipments  (1:1 with orders — enforced by UNIQUE on order_id)
-- ---------------------------------------------------------------------
CREATE TABLE shipments (
  id            INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  order_id      INT UNSIGNED  NOT NULL,
  warehouse_id  INT UNSIGNED  NOT NULL,
  status        ENUM('preparing','shipped','in_transit','delivered','returned')
                              NOT NULL,
  shipped_at    DATETIME      NULL,
  delivered_at  DATETIME      NULL,         -- deliberately NULLable
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_shipments_order (order_id),
  KEY idx_shipments_warehouse (warehouse_id),
  KEY idx_shipments_status (status),
  CONSTRAINT fk_shipments_order FOREIGN KEY (order_id)
    REFERENCES orders (id) ON DELETE CASCADE ON UPDATE CASCADE,
  -- RESTRICT: a warehouse with shipment history stays on the books.
  CONSTRAINT fk_shipments_warehouse FOREIGN KEY (warehouse_id)
    REFERENCES warehouses (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- reviews  (one review per customer per product)
-- ---------------------------------------------------------------------
CREATE TABLE reviews (
  id           INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  product_id   INT UNSIGNED  NOT NULL,
  customer_id  INT UNSIGNED  NOT NULL,
  rating       TINYINT       NOT NULL,
  comment      VARCHAR(500)  NULL,
  review_date  DATE          NOT NULL,
  created_at   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_reviews_product_customer (product_id, customer_id),
  KEY idx_reviews_customer (customer_id),
  KEY idx_reviews_rating (rating),
  CONSTRAINT fk_reviews_product FOREIGN KEY (product_id)
    REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_reviews_customer FOREIGN KEY (customer_id)
    REFERENCES customers (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT ck_reviews_rating CHECK (rating BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------
-- staging_customers — a deliberately dirty import table.
-- No UNIQUE on email, no FKs: that is the point. Duplicates live here
-- for the detect-and-remove questions.
-- ---------------------------------------------------------------------
CREATE TABLE staging_customers (
  id         INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(150)  NOT NULL,
  phone      VARCHAR(20)   NULL,
  city       VARCHAR(100)  NOT NULL,
  source     VARCHAR(40)   NOT NULL,
  loaded_at  DATETIME      NOT NULL,
  PRIMARY KEY (id),
  KEY idx_staging_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================================
-- SECTION 2 — Views, generated columns, triggers
-- (concept-checklist items that none of ../01-../05 cover)
-- =====================================================================

-- The taught VIEW. `users` in compat.sql is a compatibility shim;
-- this one is a normal reporting view.
CREATE OR REPLACE VIEW department_summary AS
SELECT
    d.id                      AS dept_id,
    d.name                    AS department_name,
    COUNT(e.id)               AS headcount,
    COALESCE(AVG(e.salary),0) AS avg_salary,
    COALESCE(MAX(e.salary),0) AS max_salary,
    COALESCE(SUM(e.salary),0) AS total_salary_cost
FROM departments d
LEFT JOIN employees e ON e.dept_id = d.id
GROUP BY d.id, d.name;

-- Triggers that keep the denormalized employees.dept in sync with
-- departments.name. This is both the compat mechanism for
-- ../01-joins-indexing.md L189-192 and the runnable TRIGGER example
-- asked for in questions/07_advanced/.
DELIMITER $$

CREATE TRIGGER trg_employees_dept_bi
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    DECLARE v_name VARCHAR(100);
    SELECT name INTO v_name FROM departments WHERE id = NEW.dept_id;
    SET NEW.dept = COALESCE(v_name, '');
END$$

CREATE TRIGGER trg_employees_dept_bu
BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
    DECLARE v_name VARCHAR(100);
    IF NEW.dept_id <> OLD.dept_id OR NEW.dept <> OLD.dept THEN
        SELECT name INTO v_name FROM departments WHERE id = NEW.dept_id;
        SET NEW.dept = COALESCE(v_name, '');
    END IF;
END$$

DELIMITER ;

-- =====================================================================
-- SECTION 3 — Legacy-compatibility tables
-- These exist ONLY so the SQL in ../01, ../02, ../04 and ../05 runs
-- unchanged. Every one of them is justified with a file:line citation
-- in ../MIGRATION_NOTES.md §4. They are not part of the question bank.
-- =====================================================================

-- ../01-joins-indexing.md L226-232 (consecutive numbers) needs (id, num).
-- ../04-explain-performance-tuning.md L92 (batch INSERT) needs (msg).
-- Both live here; `num` and `msg` are independently NULLable so each
-- snippet inserts only what it names.
CREATE TABLE logs (
  id   INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  num  INT           NULL,
  msg  VARCHAR(255)  NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ../01-joins-indexing.md L47-52 — CROSS JOIN demo.
CREATE TABLE colors (
  id    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  name  VARCHAR(50)   NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_colors_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE sizes (
  id     INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  label  VARCHAR(20)   NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_sizes_label (label)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ../02-transactions-isolation.md L15-19, L110-123, L137-147 — the
-- transfer/deadlock examples. This table is also the subject of the real
-- deadlock reproduction in ../../17-CS-Fundamentals/database-internals/
-- 03-deadlock-lab.md, so it is not purely decorative.
CREATE TABLE accounts (
  id          INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  owner_name  VARCHAR(100)   NOT NULL,
  balance     DECIMAL(12,2)  NOT NULL,
  updated_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP
                             ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT ck_accounts_balance CHECK (balance >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ../04-explain-performance-tuning.md L89 — UNION ALL demo.
CREATE TABLE admins (
  id     INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  name   VARCHAR(100)  NOT NULL,
  email  VARCHAR(150)  NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admins_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ../01-joins-indexing.md L123-125 — FULLTEXT demo.
-- Created WITHOUT the fulltext index on purpose: L124's
-- "CREATE FULLTEXT INDEX idx_ft ON articles(title, body);" is meant to
-- be run by you, and it fails if the index already exists.
CREATE TABLE articles (
  id     INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  title  VARCHAR(200)  NOT NULL,
  body   TEXT          NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ../05-mnc-frequently-asked.md L253-256 — running-total demo.
-- `date` is a reserved-ish word but legal as a column name; the snippet
-- uses it unquoted, so it stays as-is.
CREATE TABLE transactions (
  id      INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  `date`  DATE           NOT NULL,
  amount  DECIMAL(10,2)  NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
