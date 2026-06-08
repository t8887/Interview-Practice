Composition vs Inheritance

Definition
- Inheritance: reuse by extending parent behavior.
- Composition: reuse by combining small components at runtime.

When to prefer composition
- When you need flexible behavior changes at runtime.
- To avoid brittle base-class changes and Liskov violations.

Architecture use cases
- Plugin systems (composition) vs framework extension points (inheritance).

Node/JS tip
- Prefer small functions and higher-order components (HOCs) in React; prefer composition over inheritance.

Interview explanation
- Show a refactor from class hierarchy to component composition; explain API stability gains.
