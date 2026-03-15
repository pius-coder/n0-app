## 2. FOLDER STRUCTURE & DEPENDENCY RULES

### Structure

```
_n0/
├── app/                    # ⛔ ROUTING ONLY — No logic here
├── src/
│   ├── packages/           # 📦 Autonomous modules (0 internal deps)
│   ├── shared/             # 🔗 Isomorphic code (front + back)
│   ├── client/             # 🎨 Browser-only code
│   └── server/             # ⚙️ Server-only code
├── prisma/
├── public/
└── [configs]
```

### Dependency Tree (STRICT — NEVER VIOLATE)

```
                  ┌──────────┐
                  │ packages  │  ← ZERO internal imports
                  └────┬─────┘
                       │
                  ┌────▼─────┐
                  │  shared   │  ← imports: packages ONLY
                  └────┬─────┘
                       │
              ┌────────┴────────┐
              │                 │
         ┌────▼─────┐    ┌─────▼────┐
         │  client   │    │  server   │  ← imports: shared + packages
         └────┬─────┘    └─────┬────┘
              │                │
              └────────┬───────┘
                  ┌────▼─────┐
                  │   app/    │  ← imports: ALL (assembles everything)
                  └──────────┘
```

### Import Rules Table

| From ↓ \ To → | packages | shared | client | server | app |
|----------------|----------|--------|--------|--------|-----|
| **packages**   | ✅ self  | ❌     | ❌     | ❌     | ❌  |
| **shared**     | ✅       | ✅ self| ❌     | ❌     | ❌  |
| **client**     | ✅       | ✅     | ✅ self| ❌     | ❌  |
| **server**     | ✅       | ✅     | ❌     | ✅ self| ❌  |
| **app**        | ✅       | ✅     | ✅     | ✅     | ✅  |

### CRITICAL VIOLATIONS (will break the app)

```
❌ NEVER: import from "@/server/*" inside a "use client" component
❌ NEVER: import from "@/client/*" inside a server service
❌ NEVER: import from "@/shared/*" or "@/client/*" or "@/server/*" inside packages
❌ NEVER: put business logic in app/ files
❌ NEVER: put React components in server/
❌ NEVER: put database queries in client/
```

---

