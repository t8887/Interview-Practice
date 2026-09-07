/**
 * generate_seed.ts — emits seed.sql for the sqlplay playground.
 *
 * Run:  node generate_seed.ts > seed.sql
 *       (Node 22.18+ strips TypeScript types natively — no build step,
 *        no dependencies. Verified on Node v22.22.2.)
 *
 * ---------------------------------------------------------------------
 * DETERMINISM CONTRACT — read this before changing anything
 * ---------------------------------------------------------------------
 * Every value emitted here is a fixed literal computed from a fixed PRNG
 * seed. There is no RAND(), no NOW(), no date relative to "today", and
 * every DATETIME/TIMESTAMP column is written explicitly so that no
 * DEFAULT CURRENT_TIMESTAMP ever fires during seeding.
 *
 * That is what makes the MD5 checksums in expected/*.md stable across a
 * `make reset`. If you change SEED, or the order in which rows are
 * emitted, every checksum in expected/ becomes wrong and must be
 * regenerated (`make expected`).
 *
 * The calendar is fixed at 24 full months: 2024-01-01 .. 2025-12-31.
 * "Last month" therefore always means 2025-12, whatever today's date is.
 *
 * ---------------------------------------------------------------------
 * The data is not uniformly random. Specific shapes are placed on
 * purpose so the question bank has real answers — see PLAN below. A
 * question like "customers who never ordered" is worthless if the seed
 * happens to give every customer an order.
 * ---------------------------------------------------------------------
 */

// =====================================================================
// Deterministic PRNG — mulberry32. Same seed => same database, forever.
// =====================================================================
const SEED = 20260907;

function mulberry32(a: number): () => number {
    return function () {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const rand = mulberry32(SEED);

/** Integer in [min, max] inclusive. */
const randInt = (min: number, max: number): number =>
    min + Math.floor(rand() * (max - min + 1));

/** Pick one element deterministically. */
const pick = <T>(arr: readonly T[]): T => arr[randInt(0, arr.length - 1)];

// =====================================================================
// SQL emission helpers
// =====================================================================
const out: string[] = [];
const emit = (s: string) => out.push(s);

/** Single-quote escaping. The seed contains no user input, but names
 *  like "O'Brien" are real and would otherwise break the file. */
const q = (s: string): string => `'${s.replace(/'/g, "''")}'`;
const qn = (s: string | null): string => (s === null ? 'NULL' : q(s));
const money = (n: number): string => n.toFixed(2);

/** Emit a multi-row INSERT in batches — one statement per 200 rows.
 *  Batching is not cosmetic: it is the technique
 *  ../04-explain-performance-tuning.md L91-93 recommends, applied. */
function insertRows(table: string, cols: string[], rows: string[][]): void {
    if (rows.length === 0) return;
    emit(`-- ${table}: ${rows.length} rows`);
    for (let i = 0; i < rows.length; i += 200) {
        const chunk = rows.slice(i, i + 200);
        emit(`INSERT INTO ${table} (${cols.join(', ')}) VALUES`);
        emit(chunk.map((r) => `  (${r.join(', ')})`).join(',\n') + ';');
    }
    emit('');
}

// =====================================================================
// Date helpers — all arithmetic in UTC to stay machine-independent.
// =====================================================================
const CAL_START = Date.UTC(2024, 0, 1); // 2024-01-01
const CAL_END = Date.UTC(2025, 11, 31); // 2025-12-31

const pad = (n: number): string => String(n).padStart(2, '0');

function fmtDate(ms: number): string {
    const d = new Date(ms);
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

function fmtDateTime(ms: number): string {
    const d = new Date(ms);
    return `${fmtDate(ms)} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
}

const DAY = 86400000;

/** A DATETIME inside a given month (1-based month), with a stable
 *  business-hours clock so ordering is never ambiguous. */
function dateTimeIn(year: number, month: number, day: number): number {
    return Date.UTC(year, month - 1, day, randInt(9, 20), randInt(0, 59), randInt(0, 59));
}

/** The 24 (year, month) pairs of the fixed calendar, in order. */
const MONTHS: Array<{ y: number; m: number }> = [];
for (let y = 2024; y <= 2025; y++) {
    for (let m = 1; m <= 12; m++) MONTHS.push({ y, m });
}

const daysInMonth = (y: number, m: number): number => new Date(Date.UTC(y, m, 0)).getUTCDate();

// =====================================================================
// PLAN — the shapes deliberately placed in the data.
// Question IDs that depend on each shape are named so that if you ever
// change the seed you know what breaks.
// =====================================================================
emit(`-- =====================================================================`);
emit(`-- seed.sql — GENERATED FILE. Do not hand-edit.`);
emit(`-- Source: generate_seed.ts   PRNG seed: ${SEED}`);
emit(`-- Regenerate: node generate_seed.ts > seed.sql   (then: make expected)`);
emit(`--`);
emit(`-- Calendar is fixed: orders span 2024-01-01 .. 2025-12-31 (24 months).`);
emit(`-- No RAND(), no NOW(), no relative dates. Every timestamp column is`);
emit(`-- written explicitly so no DEFAULT CURRENT_TIMESTAMP can fire and`);
emit(`-- make the expected/ checksums drift.`);
emit(`-- =====================================================================`);
emit('');
emit('USE sqlplay;');
emit('');
emit('SET FOREIGN_KEY_CHECKS = 0;');
emit('SET UNIQUE_CHECKS = 0;');
emit('');

// =====================================================================
// departments — 9. "Legal" is deliberately left with zero employees
// (empty-group / LEFT JOIN questions need one).
// =====================================================================
const DEPARTMENTS = [
    { id: 1, name: 'Engineering', location: 'Pune', budget: 48000000 },
    { id: 2, name: 'Sales', location: 'Mumbai', budget: 22000000 },
    { id: 3, name: 'Marketing', location: 'Bengaluru', budget: 15000000 },
    { id: 4, name: 'Human Resources', location: 'Pune', budget: 8000000 },
    { id: 5, name: 'Finance', location: 'Mumbai', budget: 12000000 },
    { id: 6, name: 'Operations', location: 'Hyderabad', budget: 18000000 },
    { id: 7, name: 'Customer Support', location: 'Pune', budget: 9500000 },
    { id: 8, name: 'Data & Analytics', location: 'Bengaluru', budget: 20000000 },
    { id: 9, name: 'Legal', location: 'Mumbai', budget: 6000000 }, // zero employees
];

insertRows(
    'departments',
    ['id', 'name', 'location', 'budget', 'created_at'],
    DEPARTMENTS.map((d) => [
        String(d.id),
        q(d.name),
        q(d.location),
        money(d.budget),
        q('2023-01-02 09:00:00'),
    ]),
);

// =====================================================================
// employees — 62 rows, 5 levels deep (4+ manager hops).
//
//   L1 CEO (1)  ->  L2 VP (4)  ->  L3 Director (8)  ->  L4 Manager (14)
//   ->  L5 IC (35)
//
// Deliberate shapes:
//   * emp 40 and 41 out-earn their manager  (out-earning-manager Qs)
//   * duplicate salaries inside dept 1 and dept 7  (tie / self-join Qs)
//   * dept 9 (Legal) has nobody                    (empty group Qs)
//   * dept 2 has an ODD headcount, dept 3 an EVEN one (median: both cases)
//   * employees.dept is NOT written here — the trigger in schema.sql
//     fills it from departments.name. That is the point of the trigger.
// =====================================================================
type Emp = {
    id: number;
    name: string;
    salary: number;
    dept: number;
    mgr: number | null;
    hire: string;
};

const FIRST = [
    'Onkar', 'Priya', 'Rahul', 'Sneha', 'Vikram', 'Ananya', 'Karthik', 'Meera',
    'Arjun', 'Divya', 'Rohan', 'Ishita', 'Siddharth', 'Nisha', 'Aditya', 'Pooja',
    'Manish', 'Kavya', 'Sanjay', 'Ritu', 'Harsh', 'Tanvi', 'Nikhil', 'Shreya',
    'Gaurav', 'Aarti', 'Varun', 'Neha', 'Akash', 'Sunita', 'Rajesh', 'Deepa',
    'Amit', 'Swati', 'Kunal', 'Preeti', 'Vishal', 'Anjali', 'Sameer', 'Lakshmi',
];
const LAST = [
    'Sawant', 'Deshpande', 'Iyer', 'Nair', 'Kulkarni', 'Reddy', 'Sharma', 'Patel',
    'Joshi', 'Menon', 'Bose', 'Chauhan', 'Rao', 'Gupta', 'Mehta', 'Pillai',
    'Bhat', 'Varma', 'Shetty', 'Kapoor',
];

const employees: Emp[] = [];
let empId = 1;
const usedNames = new Set<string>();

function empName(): string {
    for (;;) {
        const n = `${pick(FIRST)} ${pick(LAST)}`;
        if (!usedNames.has(n)) {
            usedNames.add(n);
            return n;
        }
    }
}

// L1 — CEO
employees.push({ id: empId++, name: 'Onkar Sawant', salary: 6500000, dept: 1, mgr: null, hire: '2018-04-02' });
usedNames.add('Onkar Sawant');

// L2 — 4 VPs reporting to the CEO
const vpDepts = [1, 2, 6, 8];
const vpIds: number[] = [];
for (const d of vpDepts) {
    const id = empId++;
    vpIds.push(id);
    employees.push({ id, name: empName(), salary: 4200000 + randInt(0, 6) * 50000, dept: d, mgr: 1, hire: `2019-0${randInt(1, 9)}-1${randInt(0, 5)}` });
}

// L3 — 8 Directors
const dirIds: number[] = [];
const dirDepts = [1, 1, 2, 3, 5, 6, 7, 8];
for (let i = 0; i < 8; i++) {
    const id = empId++;
    dirIds.push(id);
    employees.push({ id, name: empName(), salary: 2800000 + randInt(0, 8) * 40000, dept: dirDepts[i], mgr: vpIds[i % vpIds.length], hire: `2020-0${randInt(1, 9)}-0${randInt(1, 9)}` });
}

// L4 — 14 Managers
const mgrIds: number[] = [];
const mgrDepts = [1, 1, 1, 2, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8];
for (let i = 0; i < 14; i++) {
    const id = empId++;
    mgrIds.push(id);
    employees.push({ id, name: empName(), salary: 1800000 + randInt(0, 10) * 30000, dept: mgrDepts[i], mgr: dirIds[i % dirIds.length], hire: `2021-${pad(randInt(1, 12))}-${pad(randInt(1, 28))}` });
}

// L5 — 35 individual contributors (this is manager-hop level 5)
const icDepts = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // Engineering, biggest
    2, 2, 2, 2, 2,                       // Sales
    3, 3, 3,                             // Marketing
    4, 4,                                // HR
    5, 5, 5,                             // Finance
    6, 6, 6, 6,                          // Operations
    7, 7, 7,                             // Support
    8, 8, 8,                             // Data
];
for (let i = 0; i < icDepts.length; i++) {
    const id = empId++;
    const d = icDepts[i];
    // Report to a manager in the same department where one exists.
    const sameDeptMgrs = employees.filter((e) => mgrIds.includes(e.id) && e.dept === d);
    const mgr = sameDeptMgrs.length ? sameDeptMgrs[i % sameDeptMgrs.length].id : mgrIds[i % mgrIds.length];
    employees.push({ id, name: empName(), salary: 900000 + randInt(0, 14) * 40000, dept: d, mgr, hire: `2022-${pad(randInt(1, 12))}-${pad(randInt(1, 28))}` });
}

// --- Deliberate shape 1: two ICs out-earning their own manager --------
// Picked explicitly rather than hoped for.
const outEarners = [employees[39], employees[40]];
for (const e of outEarners) {
    const mgr = employees.find((m) => m.id === e.mgr)!;
    e.salary = mgr.salary + 150000; // strictly greater — no tie ambiguity
}

// --- Deliberate shape 2: duplicate salaries inside one department -----
// dept 1 (Engineering): three ICs on exactly the same salary.
const eng = employees.filter((e) => e.dept === 1 && e.id > 27);
eng[0].salary = 1450000;
eng[1].salary = 1450000;
eng[2].salary = 1450000;
// dept 7 (Customer Support): a clean pair, for same-salary-colleague Qs.
const sup = employees.filter((e) => e.dept === 7 && e.id > 27);
sup[0].salary = 1120000;
sup[1].salary = 1120000;

// --- Deliberate shape 3: median needs an odd and an even group --------
// Counts are asserted at the bottom of this file, not assumed.

insertRows(
    'employees',
    ['id', 'name', 'email', 'salary', 'dept_id', 'manager_id', 'hire_date', 'created_at'],
    employees.map((e) => [
        String(e.id),
        q(e.name),
        q(`${e.name.toLowerCase().replace(/[^a-z]/g, '.')}${e.id}@sqlplay.dev`),
        money(e.salary),
        String(e.dept),
        e.mgr === null ? 'NULL' : String(e.mgr),
        q(e.hire),
        q(`${e.hire} 09:30:00`),
    ]),
);

// =====================================================================
// categories — 16
// =====================================================================
const CATEGORY_NAMES = [
    'Laptops', 'Smartphones', 'Headphones', 'Monitors', 'Keyboards', 'Mice',
    'Storage', 'Networking', 'Cameras', 'Tablets', 'Printers', 'Smart Home',
    'Wearables', 'Gaming', 'Cables & Adapters', 'Power & Charging',
];
insertRows(
    'categories',
    ['id', 'name', 'created_at'],
    CATEGORY_NAMES.map((n, i) => [String(i + 1), q(n), q('2023-01-03 10:00:00')]),
);

// =====================================================================
// suppliers — 32, mixed Indian and international
// =====================================================================
const SUPPLIER_COUNTRIES = ['India', 'China', 'Taiwan', 'South Korea', 'USA', 'Germany', 'Japan', 'Singapore'];
const supplierRows: string[][] = [];
for (let i = 1; i <= 32; i++) {
    const country = SUPPLIER_COUNTRIES[(i - 1) % SUPPLIER_COUNTRIES.length];
    supplierRows.push([
        String(i),
        q(`Supplier ${String(i).padStart(2, '0')} ${country} Trading`),
        q(`contact${i}@supplier${i}.example`),
        q(country),
        q('2023-02-01 11:00:00'),
    ]);
}
insertRows('suppliers', ['id', 'name', 'contact_email', 'country', 'created_at'], supplierRows);

// =====================================================================
// warehouses — 6
// =====================================================================
const WAREHOUSES = [
    { id: 1, name: 'Pune Central', city: 'Pune', country: 'India' },
    { id: 2, name: 'Mumbai West', city: 'Mumbai', country: 'India' },
    { id: 3, name: 'Bengaluru South', city: 'Bengaluru', country: 'India' },
    { id: 4, name: 'Delhi North', city: 'New Delhi', country: 'India' },
    { id: 5, name: 'Singapore Hub', city: 'Singapore', country: 'Singapore' },
    { id: 6, name: 'Dubai Logistics', city: 'Dubai', country: 'UAE' },
];
insertRows(
    'warehouses',
    ['id', 'name', 'city', 'country', 'created_at'],
    WAREHOUSES.map((w) => [String(w.id), q(w.name), q(w.city), q(w.country), q('2023-02-10 12:00:00')]),
);

// =====================================================================
// products — 130
//   attributes is the JSON column (JSON_EXTRACT / ->> / JSON_TABLE labs)
//   price_with_tax is GENERATED — never inserted.
//   Products 121..130 are NEVER ORDERED (never-sold-product questions).
// =====================================================================
const COLORS = ['Black', 'Silver', 'White', 'Blue', 'Space Grey'];
const MATERIALS = ['aluminium', 'plastic', 'carbon-fibre', 'steel'];
const NEVER_ORDERED_FROM = 121; // ids 121..130

type Product = { id: number; name: string; cat: number; price: number };
const products: Product[] = [];
const productRows: string[][] = [];

for (let i = 1; i <= 130; i++) {
    const cat = ((i - 1) % 16) + 1;
    const basePrice = [1500, 2500, 4999, 8999, 14999, 24999, 44999, 79999, 129999][randInt(0, 8)];
    const price = basePrice + randInt(0, 40) * 25;
    const name = `${CATEGORY_NAMES[cat - 1].replace(/s$/, '')} Model ${String(i).padStart(3, '0')}`;
    products.push({ id: i, name, cat, price });

    const attrs = {
        color: COLORS[i % COLORS.length],
        weight_kg: Number((0.2 + (i % 40) * 0.11).toFixed(2)),
        material: MATERIALS[i % MATERIALS.length],
        warranty_months: [6, 12, 24, 36][i % 4],
        tags: [CATEGORY_NAMES[cat - 1].toLowerCase(), i % 3 === 0 ? 'bestseller' : 'standard'],
    };

    productRows.push([
        String(i),
        q(`SKU-${String(i).padStart(5, '0')}`),
        q(name),
        String(cat),
        money(price),
        q(JSON.stringify(attrs)),
        String(randInt(0, 500)), // stock — locking demos only
        '1',                     // version — optimistic-locking demo
        q('2023-03-01 09:00:00'),
    ]);
}
insertRows(
    'products',
    ['id', 'sku', 'name', 'category_id', 'price', 'attributes', 'stock', 'version', 'created_at'],
    productRows,
);

// =====================================================================
// product_suppliers — every product has 1-3 suppliers
// =====================================================================
const psRows: string[][] = [];
for (const p of products) {
    const n = randInt(1, 3);
    const used = new Set<number>();
    for (let k = 0; k < n; k++) {
        let s = randInt(1, 32);
        while (used.has(s)) s = (s % 32) + 1;
        used.add(s);
        psRows.push([
            String(p.id),
            String(s),
            money(Math.round(p.price * (0.55 + randInt(0, 20) / 100) * 100) / 100),
            String(randInt(2, 30)),
            q('2023-03-05 09:00:00'),
        ]);
    }
}
insertRows(
    'product_suppliers',
    ['product_id', 'supplier_id', 'cost_price', 'lead_days', 'created_at'],
    psRows,
);

// =====================================================================
// inventory — 430+ rows
//   * products 1..10  -> stocked in ALL 6 warehouses
//     ("products stocked in every warehouse" = relational division)
//   * products 11..20 -> exactly ONE warehouse
//   * some rows below reorder_level  ("warehouse shortages")
// =====================================================================
const invRows: string[][] = [];
for (const p of products) {
    let whs: number[];
    if (p.id <= 10) {
        whs = [1, 2, 3, 4, 5, 6];                    // in every warehouse
    } else if (p.id <= 20) {
        whs = [((p.id - 11) % 6) + 1];               // exactly one
    } else {
        const n = randInt(2, 4);
        const all = [1, 2, 3, 4, 5, 6];
        whs = [];
        for (let k = 0; k < n; k++) whs.push(all.splice(randInt(0, all.length - 1), 1)[0]);
        whs.sort((a, b) => a - b);
    }
    for (const w of whs) {
        // ~1 in 7 rows is deliberately below its reorder level.
        const reorder = [10, 15, 20, 25][randInt(0, 3)];
        const qty = randInt(0, 6) === 0 ? randInt(0, reorder - 1) : randInt(reorder, 400);
        invRows.push([String(p.id), String(w), String(qty), String(reorder), q('2025-12-31 23:00:00')]);
    }
}
insertRows(
    'inventory',
    ['product_id', 'warehouse_id', 'quantity', 'reorder_level', 'updated_at'],
    invRows,
);

// =====================================================================
// customers — 130, Indian + international, deliberate order-behaviour
// segments (the segment drives order generation further down).
// =====================================================================
const INDIAN_CITIES = ['Pune', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'New Delhi', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Kochi', 'Nagpur', 'Indore'];
const INTL_CITIES: Array<[string, string]> = [
    ['Singapore', 'Singapore'], ['Dubai', 'UAE'], ['London', 'UK'], ['New York', 'USA'],
    ['Toronto', 'Canada'], ['Berlin', 'Germany'], ['Sydney', 'Australia'], ['Tokyo', 'Japan'],
];

type Segment =
    | 'whale'          // many orders, spread across the whole calendar
    | 'every_month'    // an order in every month of 2024
    | 'regular'
    | 'single'         // exactly one order
    | 'none'           // never ordered
    | 'churn_m3'       // stops after 2024-03
    | 'gap90'          // a >90-day hole in the middle
    | 'streak';        // consecutive-day orders

type Cust = { id: number; name: string; segment: Segment; signup: string };
const customers: Cust[] = [];
const customerRows: string[][] = [];

function segmentFor(i: number): Segment {
    if (i <= 10) return 'whale';
    if (i <= 12) return 'every_month';
    if (i <= 30) return 'regular';
    if (i <= 40) return 'single';
    if (i <= 52) return 'none';
    if (i <= 62) return 'churn_m3';
    if (i <= 68) return 'gap90';
    if (i <= 74) return 'streak';
    return 'regular';
}

for (let i = 1; i <= 130; i++) {
    const segment = segmentFor(i);
    const intl = i % 7 === 0;
    const [city, country] = intl
        ? INTL_CITIES[i % INTL_CITIES.length]
        : [INDIAN_CITIES[i % INDIAN_CITIES.length], 'India'];
    const name = `${FIRST[i % FIRST.length]} ${LAST[(i * 3) % LAST.length]}`;
    // Signup always precedes the order calendar so cohort maths is clean.
    const signup = fmtDate(Date.UTC(2023, randInt(0, 11), randInt(1, 28)));
    customers.push({ id: i, name, segment, signup });

    // phone deliberately NULL for ~1 in 5 — NULL-handling questions.
    const phone = i % 5 === 0 ? null : `+91-98${String(10000000 + i * 137).slice(0, 8)}`;
    const status = segment === 'none' && i % 3 === 0 ? 'inactive' : 'active';

    customerRows.push([
        String(i),
        q(name),
        q(`${name.toLowerCase().replace(/[^a-z]/g, '.')}${i}@example.com`),
        qn(phone),
        q(city),
        q(country),
        q(status),
        q(signup),
        q(`${signup} 08:00:00`),
    ]);
}
insertRows(
    'customers',
    ['id', 'name', 'email', 'phone', 'city', 'country', 'status', 'signup_date', 'created_at'],
    customerRows,
);

// =====================================================================
// orders + order_items + payments + shipments
//
// Order dates come from each customer's segment, never from a uniform
// random draw — that is what makes retention/cohort/gaps-and-islands
// questions have non-trivial answers.
//
// orders.total is computed from its own line items, so
// SUM(order_items.line_total) and orders.total always agree. A seed that
// lets them disagree makes half the revenue questions unanswerable.
// =====================================================================
type OrderRow = { id: number; cust: number; ms: number; status: string; total: number };
const orders: OrderRow[] = [];
const itemRows: string[][] = [];
const ORDER_STATUSES = ['pending', 'paid', 'shipped', 'delivered', 'cancelled', 'returned'] as const;

let orderId = 1;

/** Build one order: 1-4 line items drawn from products 1..120 only
 *  (121..130 must stay never-ordered). */
function addOrder(cust: number, ms: number, statusOverride?: string): void {
    const id = orderId++;
    const nItems = randInt(1, 4);
    const used = new Set<number>();
    let total = 0;

    for (let k = 0; k < nItems; k++) {
        let pid = randInt(1, NEVER_ORDERED_FROM - 1);
        while (used.has(pid)) pid = (pid % (NEVER_ORDERED_FROM - 1)) + 1;
        used.add(pid);
        const prod = products[pid - 1];
        const qty = randInt(1, 3);
        // Sale price wobbles a little around list price — realistic, and
        // it stops "unit_price = products.price" from being assumable.
        const unit = Math.round(prod.price * (0.9 + randInt(0, 20) / 100) * 100) / 100;
        total += qty * unit;
        itemRows.push([String(id), String(pid), String(qty), money(unit)]);
    }

    // Weighted status mix; every one of the six appears (asserted below).
    const status =
        statusOverride ??
        (() => {
            const r = randInt(1, 100);
            if (r <= 55) return 'delivered';
            if (r <= 70) return 'shipped';
            if (r <= 82) return 'paid';
            if (r <= 90) return 'pending';
            if (r <= 96) return 'cancelled';
            return 'returned';
        })();

    orders.push({ id, cust, ms, status, total: Math.round(total * 100) / 100 });
}

for (const c of customers) {
    switch (c.segment) {
        case 'whale': {
            // 14-20 orders spread across all 24 months.
            const n = randInt(14, 20);
            for (let k = 0; k < n; k++) {
                const mo = MONTHS[randInt(0, MONTHS.length - 1)];
                addOrder(c.id, dateTimeIn(mo.y, mo.m, randInt(1, daysInMonth(mo.y, mo.m))));
            }
            break;
        }
        case 'every_month': {
            // Exactly one order in each month of 2024 — the
            // "ordered in every month of a year" answer set.
            for (let m = 1; m <= 12; m++) {
                addOrder(c.id, dateTimeIn(2024, m, randInt(2, 27)));
            }
            break;
        }
        case 'single': {
            const mo = MONTHS[randInt(0, MONTHS.length - 1)];
            addOrder(c.id, dateTimeIn(mo.y, mo.m, randInt(1, 28)));
            break;
        }
        case 'none':
            break; // the point of this segment
        case 'churn_m3': {
            // Active Jan-Mar 2024, then silent forever.
            for (let m = 1; m <= 3; m++) {
                const n = randInt(1, 2);
                for (let k = 0; k < n; k++) addOrder(c.id, dateTimeIn(2024, m, randInt(1, 28)));
            }
            break;
        }
        case 'gap90': {
            // Orders early, then a hole well over 90 days, then a return.
            addOrder(c.id, dateTimeIn(2024, 2, randInt(1, 20)));
            addOrder(c.id, dateTimeIn(2024, 3, randInt(1, 20)));
            addOrder(c.id, dateTimeIn(2024, 9, randInt(1, 20)));  // ~6 month hole
            addOrder(c.id, dateTimeIn(2025, 6, randInt(1, 20)));  // ~9 month hole
            break;
        }
        case 'streak': {
            // A run of consecutive calendar days — gaps-and-islands needs
            // real islands, not coincidences.
            const startDay = Date.UTC(2025, 4, randInt(3, 12)); // May 2025
            const runLen = randInt(4, 7);
            for (let d = 0; d < runLen; d++) {
                const ms = startDay + d * DAY;
                const dt = new Date(ms);
                addOrder(c.id, dateTimeIn(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate()));
            }
            // A second, shorter island later the same year.
            const startDay2 = Date.UTC(2025, 8, randInt(5, 15));
            for (let d = 0; d < 3; d++) {
                const dt = new Date(startDay2 + d * DAY);
                addOrder(c.id, dateTimeIn(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate()));
            }
            break;
        }
        case 'regular':
        default: {
            const n = randInt(2, 7);
            for (let k = 0; k < n; k++) {
                const mo = MONTHS[randInt(0, MONTHS.length - 1)];
                addOrder(c.id, dateTimeIn(mo.y, mo.m, randInt(1, daysInMonth(mo.y, mo.m))));
            }
            break;
        }
    }
}

// --- Deliberate shape: three consecutive months of declining sales ----
// Product 7 gets a clean 2025-09 > 2025-10 > 2025-11 quantity slide,
// placed on customer 1 (a whale, so the extra orders look natural).
{
    const decliningQty = [12, 8, 5];
    const declMonths = [9, 10, 11];
    for (let i = 0; i < 3; i++) {
        const id = orderId++;
        const unit = 4999.0;
        itemRows.push([String(id), '7', String(decliningQty[i]), money(unit)]);
        orders.push({
            id,
            cust: 1,
            ms: dateTimeIn(2025, declMonths[i], 15),
            status: 'delivered',
            total: Math.round(decliningQty[i] * unit * 100) / 100,
        });
    }
}

// --- Guarantee every order status appears at least once ---------------
// Cheap insurance: force the first six orders to cover all six values.
for (let i = 0; i < ORDER_STATUSES.length; i++) {
    orders[i].status = ORDER_STATUSES[i];
}

orders.sort((a, b) => a.id - b.id);

insertRows(
    'orders',
    ['id', 'user_id', 'order_date', 'status', 'total', 'cancelled_at', 'created_at'],
    orders.map((o) => [
        String(o.id),
        String(o.cust),
        q(fmtDateTime(o.ms)),
        q(o.status),
        money(o.total),
        // cancelled_at is set only for cancelled orders — the NULL is
        // meaningful, not missing data.
        o.status === 'cancelled' ? q(fmtDateTime(o.ms + 2 * DAY)) : 'NULL',
        q(fmtDateTime(o.ms)), // audit column seeded = business date
    ]),
);

insertRows('order_items', ['order_id', 'product_id', 'quantity', 'unit_price'], itemRows);

// =====================================================================
// payments — one per non-pending order; all six methods appear
// =====================================================================
const METHODS = ['credit_card', 'debit_card', 'upi', 'net_banking', 'wallet', 'cod'] as const;
const paymentRows: string[][] = [];
let paymentId = 1;
for (const o of orders) {
    if (o.status === 'pending') continue;
    const method = METHODS[o.id % METHODS.length];
    const status =
        o.status === 'returned' ? 'refunded' : o.status === 'cancelled' ? 'failed' : 'success';
    const paidAt = status === 'success' ? q(fmtDateTime(o.ms + 3600000)) : 'NULL';
    paymentRows.push([
        String(paymentId++),
        String(o.id),
        money(o.total),
        q(method),
        q(status),
        paidAt,
        q(fmtDateTime(o.ms)),
    ]);
}
// A handful of pending payments so the 'pending' enum value exists too.
for (let i = 0; i < 8; i++) {
    const o = orders[i * 17];
    if (!o) continue;
    paymentRows.push([
        String(paymentId++),
        String(o.id),
        money(Math.round(o.total * 0.5 * 100) / 100),
        q(METHODS[i % METHODS.length]),
        q('pending'),
        'NULL',
        q(fmtDateTime(o.ms + DAY)),
    ]);
}
insertRows(
    'payments',
    ['id', 'order_id', 'amount', 'method', 'status', 'paid_at', 'created_at'],
    paymentRows,
);

// =====================================================================
// shipments — 1:1 with orders that got past 'paid'. delivered_at stays
// NULL unless the shipment actually landed.
// =====================================================================
const shipmentRows: string[][] = [];
let shipmentId = 1;
for (const o of orders) {
    if (o.status === 'pending' || o.status === 'cancelled') continue;
    const wh = ((o.id % 6) + 1);
    let status: string;
    if (o.status === 'delivered') status = 'delivered';
    else if (o.status === 'returned') status = 'returned';
    else if (o.status === 'shipped') status = (o.id % 2 === 0 ? 'shipped' : 'in_transit');
    else status = 'preparing';

    const shippedAt = status === 'preparing' ? 'NULL' : q(fmtDateTime(o.ms + 2 * DAY));
    const deliveredAt =
        status === 'delivered' || status === 'returned' ? q(fmtDateTime(o.ms + 5 * DAY)) : 'NULL';

    shipmentRows.push([
        String(shipmentId++),
        String(o.id),
        String(wh),
        q(status),
        shippedAt,
        deliveredAt,
        q(fmtDateTime(o.ms + DAY)),
    ]);
}
insertRows(
    'shipments',
    ['id', 'order_id', 'warehouse_id', 'status', 'shipped_at', 'delivered_at', 'created_at'],
    shipmentRows,
);

// =====================================================================
// reviews — 380+
//   * products 1..5    : many reviews each
//   * products 100..130: zero reviews
//   UNIQUE(product_id, customer_id) is respected by construction.
// =====================================================================
const reviewRows: string[][] = [];
let reviewId = 1;
const reviewPairs = new Set<string>();

function addReview(pid: number, cid: number, rating: number, dayOffset: number): void {
    const key = `${pid}:${cid}`;
    if (reviewPairs.has(key)) return;
    reviewPairs.add(key);
    const ms = CAL_START + dayOffset * DAY;
    if (ms > CAL_END) return;
    reviewRows.push([
        String(reviewId++),
        String(pid),
        String(cid),
        String(rating),
        rating >= 4 ? q('Works as described. Would buy again.') : rating === 3 ? q('Average. Does the job.') : q('Disappointing build quality.'),
        q(fmtDate(ms)),
        q(`${fmtDate(ms)} 12:00:00`),
    ]);
}

// Heavily-reviewed products 1..5 (30-45 reviews each).
// Note: addReview is a no-op on a repeated (product, customer) pair —
// UNIQUE(product_id, customer_id) is respected by construction — so the
// realised count is lower than the requested count. The assertions at
// the bottom of this file check the realised number, not the intent.
for (let pid = 1; pid <= 5; pid++) {
    const n = randInt(30, 45);
    for (let k = 0; k < n; k++) {
        addReview(pid, randInt(1, 100), randInt(1, 5), randInt(30, 700));
    }
}
// Ordinary spread over products 6..99 — leaves 100..130 with none.
for (let pid = 6; pid <= 99; pid++) {
    const n = randInt(1, 5);
    for (let k = 0; k < n; k++) {
        addReview(pid, randInt(1, 120), randInt(2, 5), randInt(60, 720));
    }
}
insertRows(
    'reviews',
    ['id', 'product_id', 'customer_id', 'rating', 'comment', 'review_date', 'created_at'],
    reviewRows,
);

// =====================================================================
// staging_customers — a dirty import.
// 40 clean rows + deliberate duplicates: exact repeats, case-varied
// emails, and one triple. Detection AND removal both need to be possible.
// =====================================================================
const stagingRows: string[][] = [];
let stagingId = 1;
function addStaging(name: string, email: string, phone: string | null, city: string, source: string, loaded: string): void {
    stagingRows.push([String(stagingId++), q(name), q(email), qn(phone), q(city), q(source), q(loaded)]);
}
for (let i = 1; i <= 40; i++) {
    const c = customers[i - 1];
    addStaging(c.name, `${c.name.toLowerCase().replace(/[^a-z]/g, '.')}${i}@example.com`, `+91-98${String(10000000 + i * 137).slice(0, 8)}`, INDIAN_CITIES[i % INDIAN_CITIES.length], 'crm_export', '2025-11-01 06:00:00');
}
// Exact duplicates of rows 1..8 (loaded again by a re-run import).
for (let i = 1; i <= 8; i++) {
    const c = customers[i - 1];
    addStaging(c.name, `${c.name.toLowerCase().replace(/[^a-z]/g, '.')}${i}@example.com`, `+91-98${String(10000000 + i * 137).slice(0, 8)}`, INDIAN_CITIES[i % INDIAN_CITIES.length], 'crm_export_retry', '2025-11-02 06:00:00');
}
// A triple — the same email three times total (rows 1, 41, 49).
{
    const c = customers[0];
    addStaging(c.name, `${c.name.toLowerCase().replace(/[^a-z]/g, '.')}1@example.com`, null, 'Pune', 'manual_entry', '2025-11-03 06:00:00');
}
// Case-varied email duplicates — a trap: utf8mb4_0900_ai_ci is
// case-insensitive, so GROUP BY email already collapses these.
for (let i = 9; i <= 12; i++) {
    const c = customers[i - 1];
    addStaging(c.name.toUpperCase(), `${c.name.toUpperCase().replace(/[^A-Z]/g, '.')}${i}@EXAMPLE.COM`, null, 'Mumbai', 'partner_feed', '2025-11-04 06:00:00');
}
insertRows(
    'staging_customers',
    ['id', 'name', 'email', 'phone', 'city', 'source', 'loaded_at'],
    stagingRows,
);

// =====================================================================
// SECTION 3 — legacy-compat tables (schema.sql §3)
// Seeded so the snippets in ../01, ../02, ../04, ../05 return real rows
// rather than empty sets.
// =====================================================================

// logs — ../01 L226-232 wants 3 consecutive ids sharing a num.
// Runs of 1s at ids 4,5,6 and 7s at ids 12,13,14,15 make the answer {1,7}.
const LOG_NUMS = [3, 5, 1, 1, 1, 2, 4, 4, 9, 8, 7, 7, 7, 7, 6, 2, 2, 5, 5, 3];
insertRows(
    'logs',
    ['id', 'num', 'msg'],
    LOG_NUMS.map((n, i) => [String(i + 1), String(n), 'NULL']),
);

insertRows(
    'colors',
    ['id', 'name'],
    ['Black', 'White', 'Red', 'Blue', 'Green'].map((c, i) => [String(i + 1), q(c)]),
);
insertRows(
    'sizes',
    ['id', 'label'],
    ['S', 'M', 'L', 'XL'].map((s, i) => [String(i + 1), q(s)]),
);

// accounts — ../02 L15-19, L110-123 and the real deadlock lab in
// ../../17-CS-Fundamentals/database-internals/03-deadlock-lab.md.
insertRows(
    'accounts',
    ['id', 'owner_name', 'balance', 'updated_at'],
    [
        ['1', q('Asha Kulkarni'), money(50000), q('2025-12-01 10:00:00')],
        ['2', q('Bharat Mehta'), money(38000), q('2025-12-01 10:00:00')],
        ['3', q('Chetan Rao'), money(125000), q('2025-12-01 10:00:00')],
        ['4', q('Divya Nair'), money(7600), q('2025-12-01 10:00:00')],
        ['5', q('Eshan Gupta'), money(940000), q('2025-12-01 10:00:00')],
    ],
);

// admins — ../04 L89 UNION ALL demo.
insertRows(
    'admins',
    ['id', 'name', 'email'],
    [
        ['1', q('Root Admin'), q('root@sqlplay.dev')],
        ['2', q('Ops Admin'), q('ops@sqlplay.dev')],
        ['3', q('Billing Admin'), q('billing@sqlplay.dev')],
    ],
);

// articles — ../01 L123-125 FULLTEXT demo. Two rows must match
// AGAINST('react hooks') once you create the index yourself.
insertRows(
    'articles',
    ['id', 'title', 'body'],
    [
        ['1', q('Understanding React Hooks'), q('React hooks let you use state and other React features without writing a class. useEffect and useState are the two you will reach for first.')],
        ['2', q('Advanced React Patterns'), q('Custom hooks compose behaviour. This article covers hooks, context and render props in depth.')],
        ['3', q('Node.js Streams in Practice'), q('Backpressure, pipelines and transform streams for large file processing.')],
        ['4', q('MySQL Index Internals'), q('B+ tree pages, leftmost prefix rules and covering indexes explained with EXPLAIN output.')],
        ['5', q('TypeScript Generics'), q('Constraints, conditional types and inference in real codebases.')],
    ],
);

// transactions — ../05 L253-256 running-total demo.
{
    const txRows: string[][] = [];
    const amounts = [1200, 850, 2300, 500, 1750, 900, 3100, 640, 2050, 1180, 770, 1990];
    for (let i = 0; i < amounts.length; i++) {
        txRows.push([String(i + 1), q(fmtDate(Date.UTC(2025, i, 15))), money(amounts[i])]);
    }
    insertRows('transactions', ['id', '`date`', 'amount'], txRows);
}

emit('SET FOREIGN_KEY_CHECKS = 1;');
emit('SET UNIQUE_CHECKS = 1;');
emit('');

// =====================================================================
// Self-assertions — fail loudly at generation time rather than shipping
// a seed that silently breaks a whole question category.
// =====================================================================
const problems: string[] = [];
const assert = (cond: boolean, msg: string) => { if (!cond) problems.push(msg); };

const orderCountByCust = new Map<number, number>();
for (const o of orders) orderCountByCust.set(o.cust, (orderCountByCust.get(o.cust) ?? 0) + 1);

assert(DEPARTMENTS.length >= 8, 'departments < 8');
assert(employees.length >= 60, `employees ${employees.length} < 60`);
assert(CATEGORY_NAMES.length >= 15, 'categories < 15');
assert(supplierRows.length >= 30, 'suppliers < 30');
assert(WAREHOUSES.length >= 6, 'warehouses < 6');
assert(products.length >= 120, `products ${products.length} < 120`);
assert(customers.length >= 120, `customers ${customers.length} < 120`);
assert(orders.length >= 600, `orders ${orders.length} < 600`);
assert(itemRows.length >= 1500, `order_items ${itemRows.length} < 1500`);
assert(paymentRows.length >= 600, `payments ${paymentRows.length} < 600`);
assert(shipmentRows.length >= 500, `shipments ${shipmentRows.length} < 500`);
assert(reviewRows.length >= 350, `reviews ${reviewRows.length} < 350`);
assert(invRows.length >= 400, `inventory ${invRows.length} < 400`);

// Shape assertions — these are what the question bank actually needs.
assert(
    customers.some((c) => (orderCountByCust.get(c.id) ?? 0) === 0),
    'no customer with zero orders (never-ordered questions would return empty)',
);
assert(
    customers.some((c) => (orderCountByCust.get(c.id) ?? 0) === 1),
    'no customer with exactly one order',
);
assert(
    customers.some((c) => (orderCountByCust.get(c.id) ?? 0) >= 12),
    'no high-volume customer',
);
assert(
    new Set(orders.map((o) => o.status)).size === 6,
    'not all six order statuses present',
);
assert(
    new Set(paymentRows.map((r) => r[3])).size === 6,
    'not all six payment methods present',
);
assert(
    new Set(shipmentRows.map((r) => r[3])).size === 5,
    'not all five shipment statuses present',
);
assert(
    !itemRows.some((r) => Number(r[1]) >= NEVER_ORDERED_FROM),
    'a product that must never be ordered appears in order_items',
);
assert(
    employees.filter((e) => e.dept === 9).length === 0,
    'dept 9 (Legal) should have zero employees',
);
assert(
    employees.some((e) => {
        const m = employees.find((x) => x.id === e.mgr);
        return m ? e.salary > m.salary : false;
    }),
    'no employee out-earns their manager',
);
// Median needs both parities.
const deptCounts = new Map<number, number>();
for (const e of employees) deptCounts.set(e.dept, (deptCounts.get(e.dept) ?? 0) + 1);
assert([...deptCounts.values()].some((n) => n % 2 === 1), 'no odd-sized department (median odd case)');
assert([...deptCounts.values()].some((n) => n % 2 === 0), 'no even-sized department (median even case)');
// Hierarchy depth.
function depthOf(id: number): number {
    let d = 1;
    let cur = employees.find((e) => e.id === id);
    while (cur && cur.mgr !== null) {
        cur = employees.find((e) => e.id === cur!.mgr);
        d++;
        if (d > 20) break; // cycle guard
    }
    return d;
}
assert(Math.max(...employees.map((e) => depthOf(e.id))) >= 5, 'manager chain shallower than 5 levels');

if (problems.length) {
    console.error('SEED GENERATION FAILED:');
    for (const p of problems) console.error('  - ' + p);
    process.exit(1);
}

// Row-count summary goes to stderr so it does not pollute seed.sql.
console.error('seed.sql generated. Row counts:');
console.error(`  departments        ${DEPARTMENTS.length}`);
console.error(`  employees          ${employees.length}`);
console.error(`  categories         ${CATEGORY_NAMES.length}`);
console.error(`  suppliers          ${supplierRows.length}`);
console.error(`  warehouses         ${WAREHOUSES.length}`);
console.error(`  products           ${products.length}`);
console.error(`  product_suppliers  ${psRows.length}`);
console.error(`  inventory          ${invRows.length}`);
console.error(`  customers          ${customers.length}`);
console.error(`  orders             ${orders.length}`);
console.error(`  order_items        ${itemRows.length}`);
console.error(`  payments           ${paymentRows.length}`);
console.error(`  shipments          ${shipmentRows.length}`);
console.error(`  reviews            ${reviewRows.length}`);
console.error(`  staging_customers  ${stagingRows.length}`);

process.stdout.write(out.join('\n') + '\n');
