## 5. NAMING CONVENTIONS

### Files

```
RULE: kebab-case for ALL files

✅ number-card.tsx
✅ number.service.ts
✅ number.types.ts
✅ number.schema.ts
✅ number.queries.ts
✅ use-numbers.ts
✅ cart.store.ts
✅ base.error.ts
✅ api-response.helper.ts
✅ button.variants.ts

❌ NumberCard.tsx
❌ numberService.ts
❌ useNumbers.ts
```

### Exports

```
RULE: PascalCase for components, camelCase for functions/objects, UPPER_CASE for constants

Components:     export function NumberCard() {}
                export const Button = forwardRef(...)

Hooks:          export function useNumbers() {}
                export function useDebounce() {}

Services:       export const NumberService = { ... }
Queries:        export const NumberQueries = { ... }
Adapters:       export const StripeAdapter = { ... }

Stores:         export const useCartStore = create(...)

Types:          export type PhoneNumber = { ... }
                export type NumberCategory = "gold" | "silver"

Enums:          export const NumberStatus = { ... } as const

Constants:      export const ROUTES = { ... }
                export const APP_CONFIG = { ... }
                export const PAGINATION = { ... }

Schemas:        export const createNumberSchema = z.object(...)
                export const phoneValueSchema = z.string()

Errors:         export class NotFoundError extends AppError {}

Helpers:        export function success<T>(data: T) {}
                export function formatPrice(amount: number) {}
```

### Folder Naming

```
RULE: kebab-case, singular for single-concept folders, plural for collections

✅ src/client/components/ui/button/       ← singular (one component type)
✅ src/client/components/features/numbers/ ← plural (feature covers many)
✅ src/client/hooks/common/                ← describes what's inside
✅ src/server/services/                    ← plural (collection of services)
✅ src/shared/types/entities/              ← plural (collection of entity types)
```

### Suffixes

```
MANDATORY suffixes by folder:

types/        → .types.ts
schemas/      → .schema.ts
enums/        → .enum.ts
services/     → .service.ts
queries/      → .queries.ts
adapters/     → .adapter.ts
actions/      → .actions.ts
errors/       → .error.ts
helpers/      → .helper.ts
hooks/        → use-{name}.ts
stores/       → .store.ts
variants      → .variants.ts
```

---

