## QUICK REFERENCE CARD

```
┌─────────────────────────────────────────────────────────────────┐
│  "Where does this file go?"                                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  TypeScript type?              → shared/types/entities/          │
│  Zod schema?                   → shared/schemas/                 │
│  Enum/const object?            → shared/enums/                   │
│  App-wide constant?            → shared/constants/               │
│  Pure utility function?        → shared/utils/{category}/        │
│                                                                  │
│  DB query?                     → server/db/queries/              │
│  Business logic?               → server/services/                │
│  External API integration?     → server/adapters/{name}/         │
│  Server action?                → server/actions/                 │
│  Custom error class?           → server/errors/                  │
│  Server helper function?       → server/helpers/                 │
│                                                                  │
│  Design system primitive?      → client/components/ui/           │
│  Cross-feature component?      → client/components/common/       │
│  Feature-specific component?   → client/components/features/     │
│  Header/Sidebar/Footer?        → client/components/layout/       │
│  Custom React hook?            → client/hooks/{common|features}/ │
│  Context provider?             → client/providers/               │
│  Client state (Zustand)?       → client/stores/                  │
│  Client-only utility?          → client/lib/                     │
│                                                                  │
│  Autonomous reusable module?   → packages/{name}/                │
│                                                                  │
│  Page component?               → app/({group})/{route}/page.tsx  │
│  API endpoint?                 → app/api/{resource}/route.ts     │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

*Last updated: 2025-01-XX*
*Architecture version: 1.0.0*
*Next.js version: 16.1.6*
```
