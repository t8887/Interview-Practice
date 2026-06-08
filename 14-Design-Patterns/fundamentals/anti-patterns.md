Common Anti-Patterns (practical, interview-focused)

- God Object / God Service: large classes/services that centralize unrelated responsibilities. Symptoms: slow deploys, poor testability.
- Big Ball of Mud: no clear architecture; incremental technical debt. Fix: introduce modular boundaries and vertical slices.
- Premature Optimization: optimizing before measuring. Fix: measure, profile, then optimize.
- Spaghetti Dependencies: cyclic imports and runtime coupling. Fix: decouple via interfaces/events.

Interview angle
- Be ready to name anti-patterns you've removed and the concrete steps taken (metrics, refactor plan).
