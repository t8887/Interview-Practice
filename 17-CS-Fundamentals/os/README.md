# 17-CS-Fundamentals/os

Confirmed absolute-zero coverage during `/prep-analyze` and `/prep-gaps` — no file anywhere in the repo touches processes, threads, scheduling, or memory paging (`_meta/PRODUCT_COMPANY_READINESS.md`: 0.5/5, "no file, no folder, zero references"). P0 per `_meta/SKILL_GAP_ANALYSIS.md`.

## Planned files (per `_meta/MASTER_ROADMAP.md` Phase 1 & `_meta/WEEKLY_PLANS.md`)

- `01-processes-threads.md` — must include a "how does this show up in Node?" section: thread pool, `worker_threads`, why `fork()` ≠ `cluster.fork()`. First file to write (Phase 1, Week 1).
- `02-scheduling-concurrency.md` — map directly to `03-NodeJS/01-event-loop.md`'s cooperative-scheduling model (event loop = single-threaded cooperative scheduler; OS scheduler = preemptive).
- `03-memory-paging.md`
- `04-deadlocks-filesystems.md` — cross-link to the MySQL deadlock reproduction planned in `17-CS-Fundamentals/database-internals/` (same underlying concept, different layer).

**Completion criteria (from the roadmap, not "read the chapter"):** explain process vs. thread vs. Node worker in 2 minutes aloud, recorded.
