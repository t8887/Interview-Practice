# 20-Redis-OpenSearch/redis

**Extraction, not authorship.** The baseline `_meta/imported/02_SKILL_GAP_AND_READINESS.md` scored Redis 1.5/5 "near-absent" and planned writing 6 files from research. A full local read found genuinely Expert-level, implementation-grade Redis content already exists — buried in `12-Company/recro-cheq-nodejs-prep.md` §6C (Q15–Q20), not in a canonical topic file. Revised score: 3/5, capped only because the content is organizationally stranded, not because it's thin (`_meta/PRODUCT_COMPANY_READINESS.md`).

## Source (promote this, don't re-derive it)

`12-Company/recro-cheq-nodejs-prep.md` §6C, specifically:
- Q15 — which data structures for which use case (string/hash/list/set/sorted-set), with real production examples.
- Q16 — cache-aside vs. read-through/write-through vs. write-behind, with the correct "never write-behind for money" call.
- Q17 — TTL/eviction, including the genuinely good insight that **cache and state (locks, idempotency keys) belong on separate Redis instances with different `maxmemory-policy`** (`allkeys-lru` vs. `noeviction`) — mixing them silently evicts your locks under memory pressure.
- Q18 — cache invalidation and the stampede problem, with 4 real mitigation strategies.
- Q19 — pub/sub vs. Streams vs. a real queue, with the correct "money events never ride Redis pub/sub" rule.
- Q20 — a distributed lock with atomic Lua check-and-delete, plus an honest Redlock/Kleppmann critique.

## Also fix while extracting

`07-System-Design/in-depth/04-caching.md`'s hand-rolled `LRUCache` is confirmed **O(n)** (array `indexOf`+`splice`), contradicting the correct O(1) version in `08-DSA/06-linked-list.md` / `16-DSA-Practice/design/lru-cache.js` — fixed in Phase 0, cross-link once this folder exists.

## Planned files

`01-data-structures-use-cases.md`, `02-caching-patterns.md` (links to the now-fixed `in-depth/04`), `03-eviction-ttl.md`, `04-distributed-locks.md`, `05-pubsub-vs-streams.md`, `06-stampede-hotkeys.md`.
