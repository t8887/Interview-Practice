# 17-CS-Fundamentals/networking

Unlike `os/`, this is a **light-touch extension**, not a from-scratch build. `07-System-Design/in-depth/01-networking-basics.md` is independently rated Expert on full read — "one of the best files in the entire repo" (`_meta/PRODUCT_COMPANY_READINESS.md`: 4/5) — with a real EY Risk.ai connection-pooling scenario and correct TLS 1.2-vs-1.3 mechanics.

## Plan

Don't duplicate that file here. Instead:
- Extend `07-System-Design/in-depth/01-networking-basics.md` directly with the one confirmed gap: HTTP/3 (QUIC) depth, to match the existing TLS 1.3 treatment.
- This folder stays a placeholder/pointer rather than a parallel set of files, unless a future `/prep-curriculum networking` pass decides the CS-fundamentals framing (OSI layers, socket-level detail) genuinely needs a separate home from the system-design framing already covered.

See `_meta/KNOWLEDGE_GRAPH.md` §5 and `_meta/SKILL_GAP_ANALYSIS.md`'s Networking row for the full evidence behind this call.
