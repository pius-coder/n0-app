## 14. TESTING MENTAL MODEL

Even if no tests are written yet, structure code so it's TESTABLE:

```
packages/*      → Pure functions, zero deps          → Unit testable
shared/utils/*  → Pure functions                     → Unit testable
shared/schemas  → Zod schemas                        → Unit testable
server/services → Business logic with injected deps  → Unit testable with mocks
server/actions  → Thin wrappers                      → Integration testable
app/api/*       → Thin wrappers                      → Integration testable
client/hooks    → React hooks                        → React Testing Library
client/components → React components                 → React Testing Library
```

---

