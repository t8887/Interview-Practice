# 19-Distributed-Systems

**This is a consolidation-and-fix pass, not a from-scratch build.** `_meta/SKILL_GAP_ANALYSIS.md`'s biggest correction to the baseline: real, implementation-grade distributed-systems content already exists, correctly, scattered across `12-Company/` files — it just isn't organized as "the distributed systems chapter," and the two System-Design reference implementations that should anchor this domain have confirmed bugs.

## Existing content to extract (don't re-derive)

- **Saga + outbox pattern:** `12-Company/teksystems-hsbc/teksystems-hsbc-nodejs-backend.md` Q32 has a complete, correct design for money transfer — double-entry ledger, per-request idempotency keys, sagas with compensating transactions, outbox pattern, explicit CP-under-CAP reasoning for the money path.
- **Idempotency:** `12-Company/recro-cheq-nodejs-prep.md` §5.2 (client key → atomic server claim → PSP key, end-to-end), echoed correctly in `setu-health/README.md` and `healthsystems/README.md`.
- **CAP/PACELC:** `07-System-Design/in-depth/07-reliability-and-availability.md`'s CP/AP decision matrix, including a genuinely sophisticated "Hybrid" row (Inventory: AP reads + CP writes).

## Bugs to fix before reuse (already handled in Phase 0 — confirm before building on top)

- `07-System-Design/01-auth-caching-api.md`'s distributed lock (unconditional `finally` delete — Redlock-unsafe).
- `07-System-Design/in-depth/07-reliability-and-availability.md`'s `ConsistentHash` (linear scan + broken `removeServer()`).

## Planned files

1. `01-cap-pacelc.md` — extracted from `in-depth/07`'s existing matrix.
2. `02-consistency-models.md`
3. `03-idempotency.md` — anchored explicitly to **your own SQS consumers**, extracted from `recro-cheq`/`setu-health`/`healthsystems`.
4. `04-delivery-semantics-exactly-once-myth.md` — the existing correct one-liner in `07-System-Design/04-mnc-frequently-asked.md` Q11 ("true exactly-once is nearly impossible, use at-least-once + idempotency") expanded to a full treatment.
5. `05-outbox-saga.md` — extracted from `teksystems-hsbc-nodejs-backend.md` Q32, **anchored to your own EventBridge flows**.
6. `06-distributed-locks.md` — the corrected Redlock (multi-node, quorum-based), replacing the buggy single-node version.
7. `07-clocks-ordering.md` — fully absent anywhere in the repo; write from scratch (logical clocks, vector clocks, NTP drift).

**Completion criteria:** narrate the outbox pattern using your own Lambda architecture as the example, without notes.
