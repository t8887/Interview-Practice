# =====================================================================
# sqlplay — MySQL 8.4 interview playground
# =====================================================================
#   make up          start a seeded MySQL 8.4, ready to query
#   make shell       drop into the mysql CLI
#   make reset       back to the exact seeded state (< 10s)
#   make reset-hard  destroy the volume and rebuild from scratch
#   make down        stop
#   make session-a   shell #1 for the two-session locking labs
#   make session-b   shell #2 for the two-session locking labs
#   make compat      run every SQL snippet from ../01,02,04,05
#   make verify      full verification suite -> VERIFICATION.md
#   make seed        regenerate seed.sql from generate_seed.ts
#   make expected    regenerate expected/ snapshots from solutions/
# =====================================================================

DC        := docker compose
SVC       := mysql
DB        := sqlplay
MYSQL_PWD ?= sqlplay
# Inside the container. Port 3307 is the host-side mapping.
MYSQL     := $(DC) exec -T $(SVC) mysql -uroot -p$(MYSQL_PWD) $(DB)
MYSQLi    := $(DC) exec $(SVC) mysql -uroot -p$(MYSQL_PWD) $(DB)

.PHONY: up down reset reset-hard shell session-a session-b compat verify seed expected logs ps wait

up:
	@test -f .env || cp .env.example .env
	$(DC) up -d
	@$(MAKE) --no-print-directory wait
	@echo "sqlplay is up on 127.0.0.1:3307  (db: $(DB))"
	@$(MYSQL) -e "SELECT COUNT(*) AS orders_seeded FROM orders;"

wait:
	@echo -n "waiting for mysql to become healthy"
	@for i in $$(seq 1 60); do \
		if $(DC) exec -T $(SVC) mysqladmin ping -h127.0.0.1 -uroot -p$(MYSQL_PWD) >/dev/null 2>&1; then \
			echo " ok"; exit 0; fi; \
		echo -n "."; sleep 2; \
	done; \
	echo " TIMEOUT"; $(DC) logs --tail=40 $(SVC); exit 1

down:
	$(DC) down

# Data-only reset: keeps schema objects AND any index you added during
# the optimization labs. This is the one you want 95% of the time.
reset:
	@START=$$(date +%s); \
	$(MYSQL) < reset.sql && $(MYSQL) < seed.sql; \
	END=$$(date +%s); \
	echo "reset complete in $$((END-START))s"
	@$(MYSQL) -e "SELECT COUNT(*) AS orders FROM orders;"

# Nuclear option: drops the volume, re-runs schema + compat + seed.
# Use this if you have dropped a table or want the indexes back to
# their shipped state (including the deliberately-missing one).
reset-hard:
	$(DC) down -v
	$(DC) up -d
	@$(MAKE) --no-print-directory wait
	@echo "rebuilt from scratch"

shell:
	$(MYSQLi)

# --- Two-session labs (TRANSACTIONS.md) ------------------------------
# Run these in two separate terminals. Each is its own connection, so
# each has its own transaction — which is the entire point.
session-a:
	@echo "=== SESSION A === (run 'make session-b' in another terminal)"
	$(MYSQLi) --prompt='A> '

session-b:
	@echo "=== SESSION B ==="
	$(MYSQLi) --prompt='B> '

# --- Gates -----------------------------------------------------------
compat:
	@echo "running every SQL snippet from ../01, ../02, ../04, ../05 ..."
	@$(MYSQL) < compat_check.sql > /tmp/compat_out.txt 2>/tmp/compat_err.txt; \
	if [ -s /tmp/compat_err.txt ]; then \
		echo "FAIL — errors:"; cat /tmp/compat_err.txt; exit 1; \
	else \
		echo "PASS — $$(grep -c '^snippet$$' /tmp/compat_out.txt) snippets, 0 errors"; \
	fi

verify:
	./verify.sh

# --- Generation ------------------------------------------------------
# Node 22.18+ strips TypeScript types natively — no build step.
seed:
	node generate_seed.ts > seed.sql
	@echo "seed.sql regenerated — run 'make reset' then 'make expected'"

expected:
	./generate_expected.sh

logs:
	$(DC) logs -f $(SVC)

ps:
	$(DC) ps
