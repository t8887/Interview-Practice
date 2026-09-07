---
topic: MySQL 8.4 LTS Compatibility
level: intermediate
status: solid
last_reviewed: 2026-09-07
next_review: 2026-09-08
---

# MySQL 8.4 LTS — What Changed, and What Bites You

The playground targets **MySQL 8.4 LTS**. MySQL 8.0 reached end of life on **2026-04-30**; 8.4 LTS and the 9.x innovation line are what remain supported. Every note in this folder that says "MySQL 8" was written against 8.0 defaults, and a few of those defaults no longer hold.

Everything in the tables below was checked by running it on **MySQL 8.4.11**, not read off a changelog. Commands and their real output are included so you can re-check after an upgrade.

---

## 1. The one that will actually break your app: `mysql_native_password` is gone

This is the top of the list because it breaks *connections*, before any of your SQL runs.

| | MySQL 8.0 | MySQL 8.4 |
|---|---|---|
| `mysql_native_password` | Built in, `ACTIVE` | **`DISABLED`** — must be explicitly enabled |
| Default plugin for new users | `caching_sha2_password` | `caching_sha2_password` |
| `default_authentication_plugin` variable | Exists (deprecated) | **Removed** — use `authentication_policy` |

Verified on 8.4.11:

```
mysql> SELECT PLUGIN_NAME, PLUGIN_STATUS FROM information_schema.PLUGINS
    -> WHERE PLUGIN_NAME LIKE '%password%';
+-----------------------+---------------+
| PLUGIN_NAME           | PLUGIN_STATUS |
+-----------------------+---------------+
| sha256_password       | ACTIVE        |
| caching_sha2_password | ACTIVE        |
| mysql_native_password | DISABLED      |
+-----------------------+---------------+

mysql> CREATE USER 'legacy'@'localhost' IDENTIFIED WITH mysql_native_password BY 'x';
ERROR 1524 (HY000): Plugin 'mysql_native_password' is not loaded

mysql> SHOW VARIABLES LIKE 'default_authentication_plugin';
(empty — the variable no longer exists in 8.4)
```

### What this means for the `mysql2` code in `playground/node/`

`mysql2` has supported `caching_sha2_password` since v2.x, so a current `mysql2` connects to 8.4 with no special configuration. You hit trouble when:

- you are pinned to `mysql2` **< 2.0** or an old `mysql` (non-2) driver → upgrade the driver; do not re-enable the old plugin;
- a connection string carries `authPlugins`/`insecureAuth` options copied from a 5.7-era config → delete them;
- you connect **without TLS** as a *brand-new* user whose password the server has not cached yet → `caching_sha2_password` needs either TLS or an RSA key exchange for the first auth. Locally, `ssl: { rejectUnauthorized: false }` or `allowPublicKeyRetrieval` on other drivers gets you moving; in production, use real TLS.

**Interview answer, one sentence:** *"8.4 disabled `mysql_native_password`, so anything still on the pre-2.0 driver or a 5.7-style connection config fails at authentication, not at query time — the fix is upgrading the client, not weakening the server."*

---

## 2. Other 8.0 → 8.4 changes that touch this folder

| Change | 8.0 | 8.4 | Where it matters here |
|---|---|---|---|
| `mysql_native_password` | active | disabled | §1 |
| `default_authentication_plugin` | deprecated variable | removed | §1 |
| Group Replication / `mysql_upgrade` legacy flags | present | several removed | not used here |
| `--skip-grant-tables` behaviour | same | same | password recovery still works |
| Default `sql_mode` | `ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION` | **identical** | every question in the bank is written to satisfy `ONLY_FULL_GROUP_BY` |
| InnoDB `REPEATABLE READ` + gap locks | same | same | `TRANSACTIONS.md` labs are valid on both |
| Window functions, CTEs, `JSON_TABLE`, `CHECK` constraints | 8.0+ | 8.0+ | the whole bank works on 8.0 too |

Verified `sql_mode` on 8.4.11:

```
mysql> SELECT @@sql_mode;
ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION
```

**Practical consequence:** apart from authentication, nothing in this playground depends on an 8.4-only feature. The question bank, the schema and every solution run unchanged on 8.0.x as well. That is deliberate — you will meet 8.0 in production for years yet.

---

## 3. Reserved words — the trap that is already in this folder

`RANK`, `DENSE_RANK`, `ROW_NUMBER`, `LAG`, `LEAD`, `NTILE`, `FIRST_VALUE`, `LAST_VALUE`, `OVER`, `WINDOW`, `RECURSIVE`, `GROUPS` and `CUME_DIST` all became **reserved words in MySQL 8.0.2** when window functions landed. Used bare as a column alias, each is a syntax error.

Four statements already in this folder hit exactly this and have never run:

| File | Line | Statement |
|---|---|---|
| `01-joins-indexing.md` | 174 | `ROW_NUMBER() OVER (...) AS rank` |
| `01-joins-indexing.md` | 179 | `RANK() OVER (...) AS rank` |
| `05-mnc-frequently-asked.md` | 249 | `RANK() OVER (...) as rank` |
| `05-mnc-frequently-asked.md` | 250 | `DENSE_RANK() OVER (...) as dense_rank` |

```
mysql> SELECT name, salary, RANK() OVER (ORDER BY salary DESC) AS rank FROM employees LIMIT 3;
ERROR 1064 (42000): You have an error in your SQL syntax ... near 'rank FROM employees LIMIT 3'
```

Fix: `` AS `rank` `` or rename to `rnk`. `01-joins-indexing.md` L213 already does it correctly. Details and the recommended edit: `MIGRATION_NOTES.md` §5a.

**This is worth internalising, not just fixing.** Writing `AS rank` in a shared editor during a live SQL round produces a syntax error in front of the interviewer.

---

## 4. Version-checking commands

```sql
SELECT VERSION();                          -- 8.4.11
SELECT @@sql_mode;
SHOW VARIABLES LIKE 'authentication_policy';
SELECT user, host, plugin FROM mysql.user; -- who is on which auth plugin
SELECT PLUGIN_NAME, PLUGIN_STATUS FROM information_schema.PLUGINS
WHERE PLUGIN_NAME LIKE '%password%';
```

---

## 5. If you cannot run Docker

The shipped runtime is `playground/docker-compose.yml` on the `mysql:8.4` image. This build's own verification was done on a **native MySQL 8.4.11 install inside WSL2 Ubuntu 24.04**, because Docker was not available on the machine at build time. Both are real MySQL 8.4 — the results transfer.

To reproduce the WSL route:

```bash
# Ubuntu 24.04 (noble) ships only 8.0.x, so add Oracle's repo for 8.4 LTS.
wget https://dev.mysql.com/get/mysql-apt-config_0.8.33-1_all.deb
sudo debconf-set-selections <<< 'mysql-apt-config mysql-apt-config/select-server select mysql-8.4-lts'
sudo DEBIAN_FRONTEND=noninteractive dpkg -i mysql-apt-config_0.8.33-1_all.deb

# The key shipped in that .deb expired 2025-10-22. Import the current one:
wget -qO- https://repo.mysql.com/RPM-GPG-KEY-mysql-2025 \
  | sudo gpg --dearmor > /usr/share/keyrings/mysql-apt-config.gpg

sudo apt-get update && sudo apt-get install -y mysql-community-server   # 8.4.11
sudo service mysql start
```

Then load the playground directly:

```bash
mysql -uroot -p < playground/schema.sql
mysql -uroot -p < playground/compat.sql
mysql -uroot -p < playground/seed.sql
```

The expired-key step is not optional — without it `apt-get update` fails with `EXPKEYSIG B7B3B788A8D3785C`.

---

## Related

- `MIGRATION_NOTES.md` — how the legacy notes map onto this schema
- `playground/VERIFICATION.md` — the actual command output behind every claim here
- `playground/node/` — `mysql2` against 8.4, where §1 stops being theoretical
