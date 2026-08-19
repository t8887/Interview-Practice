# 20-Redis-OpenSearch/opensearch

**The single highest-stakes folder in this restructure.** `CLAUDE.md`'s flagship project-story metric — "OpenSearch migration 2s→200ms" — is stated with **at least 8 mutually inconsistent values across 6 files**, confirmed during `/prep-gaps` (`_meta/PRODUCT_COMPANY_READINESS.md` Resume-vs-Prep Mismatch §1). This isn't a depth gap so much as a *reliability* gap: the fact underneath the story isn't consistently known across the candidate's own material.

## Hard dependency

**Do not write `07-MY-migration.md` until the Phase 0 correctness pass (bug #1 in `_meta/MASTER_ROADMAP.md` §2) has reconciled every file to one canonical figure.** Writing this file before that lands would just create a ninth inconsistent number.

## Existing content to build on

`15-AWS-Services/analytics-search.md` — Advanced, correct on inverted indexes, index-refresh latency, over-sharding guidance. One claim (OpenSearch-vs-Elasticsearch shard-split/reindex divergence) is flagged `[VERIFY]`, not confirmed wrong — check against current AWS docs before stating it as fact either way.

## Planned files

`01-inverted-index.md`, `02-analyzers-mappings.md`, `03-query-dsl-filter-vs-query.md`, `04-scoring-bm25.md`, `05-aggregations.md`, `06-shards-sizing.md`, and:

- **`07-MY-migration.md`** — rewrite the UTEC story with full internals: the reconciled canonical figure, the actual index mapping, which analyzer, why latency dropped, shard count, what you'd do differently, the `_bulk` API (named as the missing mechanism — the actual thing your own MySQL→SQS→Lambda→OpenSearch CDC pipeline would use), and one worked custom-analyzer example. This single file is the de-risking artifact for the highest-scored resume mismatch in the whole gap analysis.

**Completion criteria:** a 10-minute recorded talk defending the migration with internals, using the reconciled number consistently throughout — not a new number, the *same* number, every time it's said.
