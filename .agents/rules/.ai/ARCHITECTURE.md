```markdown


# _n0 — Architecture Guide for AI Assistants

> This document is the SINGLE SOURCE OF TRUTH for code generation in the _n0 project.
> Every AI assistant MUST read and follow these rules before generating ANY code.

---

## TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Folder Structure & Dependency Rules](#2-folder-structure--dependency-rules)
3. [How to Create a Feature (Step by Step)](#3-how-to-create-a-feature)
4. [Component Splitting Rules](#4-component-splitting-rules)
5. [Naming Conventions](#5-naming-conventions)
6. [File Templates](#6-file-templates)
7. [Do's and Don'ts](#7-dos-and-donts)
8. [Import Rules](#8-import-rules)
9. [Type Safety Rules](#9-type-safety-rules)
10. [API Route Rules](#10-api-route-rules)
11. [Server Action Rules](#11-server-action-rules)
12. [Component Patterns](#12-component-patterns)
13. [Error Handling Patterns](#13-error-handling-patterns)
14. [Testing Mental Model](#14-testing-mental-model)
15. [Checklist Before Generating Code](#15-checklist-before-generating-code)

---

## 1. PROJECT OVERVIEW

**_n0** (pronounced "n-zero") is a phone number marketplace built with:

- **Next.js 16+** (App Router, Server Components, Server Actions)
- **TypeScript** (strict mode)
- **Tailwind CSS v4**
- **Zod** (validation)
- **Zustand** (client state)
- **CVA** (component variants)

### Architecture Philosophy

```
"Each file has ONE logical place. If you hesitate where to put it, the architecture is broken."
```

This is a MONOREPO-STYLE architecture inside a SINGLE Next.js project.
There is NO Turborepo, NO workspaces. Just well-organized folders.

---

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

## 3. HOW TO CREATE A FEATURE

When asked to create a new feature (e.g., "add a wishlist feature"), follow these steps IN ORDER:

### Step 1 — Define Types (shared/types/entities/)

```
QUESTION: What data does this feature manipulate?
CREATE:   src/shared/types/entities/{feature}.types.ts
```

```typescript
// src/shared/types/entities/wishlist.types.ts

export type WishlistItem = {
  id: string;
  userId: string;
  numberId: string;
  createdAt: Date;
};

// Derived types — NEVER duplicate, always derive
export type WishlistItemPreview = Pick<WishlistItem, "id" | "numberId">;
export type WishlistItemCreateInput = Pick<WishlistItem, "numberId">;
```

Then add to barrel:
```typescript
// src/shared/types/entities/index.ts
export type { WishlistItem, WishlistItemPreview, WishlistItemCreateInput } from "./wishlist.types";
```

### Step 2 — Define Validation Schemas (shared/schemas/)

```
QUESTION: What input does this feature accept? What needs validation?
CREATE:   src/shared/schemas/{feature}.schema.ts
```

```typescript
// src/shared/schemas/wishlist.schema.ts

import { z } from "zod";

export const addToWishlistSchema = z.object({
  numberId: z.string().min(1, "Number ID is required"),
});

export type AddToWishlistInput = z.infer<typeof addToWishlistSchema>;
```

Then add to barrel: `src/shared/schemas/index.ts`

### Step 3 — Define Enums/Constants if needed (shared/enums/ or shared/constants/)

```
QUESTION: Are there fixed values, statuses, or config for this feature?
CREATE:   src/shared/enums/{feature}.enum.ts (if status/state)
          src/shared/constants/{feature}.ts (if config/labels)
```

### Step 4 — Create DB Queries (server/db/queries/)

```
QUESTION: What database operations does this feature need?
CREATE:   src/server/db/queries/{feature}.queries.ts
```

```typescript
// src/server/db/queries/wishlist.queries.ts

import { db } from "@/server/db";

export const WishlistQueries = {
  findByUser(userId: string) {
    return db.wishlistItem.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  add(userId: string, numberId: string) {
    return db.wishlistItem.create({
      data: { userId, numberId },
    });
  },

  remove(id: string, userId: string) {
    return db.wishlistItem.delete({
      where: { id, userId },
    });
  },

  exists(userId: string, numberId: string) {
    return db.wishlistItem.findFirst({
      where: { userId, numberId },
    });
  },
};
```

### Step 5 — Create Service (server/services/)

```
QUESTION: What is the business logic?
CREATE:   src/server/services/{feature}.service.ts
```

```typescript
// src/server/services/wishlist.service.ts

import { Ok, Err, type Result } from "@/packages/result";
import { WishlistQueries } from "@/server/db/queries/wishlist.queries";
import { ConflictError, NotFoundError } from "@/server/errors";
import type { WishlistItem } from "@/shared/types";

export const WishlistService = {
  async getByUser(userId: string): Promise<Result<WishlistItem[]>> {
    try {
      const items = await WishlistQueries.findByUser(userId);
      return Ok(items);
    } catch (e) {
      return Err(e as Error);
    }
  },

  async add(userId: string, numberId: string): Promise<Result<WishlistItem>> {
    const existing = await WishlistQueries.exists(userId, numberId);
    if (existing) {
      return Err(new ConflictError("Déjà dans la wishlist"));
    }

    try {
      const item = await WishlistQueries.add(userId, numberId);
      return Ok(item);
    } catch (e) {
      return Err(e as Error);
    }
  },

  async remove(id: string, userId: string): Promise<Result<void>> {
    try {
      await WishlistQueries.remove(id, userId);
      return Ok(undefined);
    } catch (e) {
      return Err(e as Error);
    }
  },
};
```

Then add to barrel: `src/server/services/index.ts`

### Step 6 — Create Server Actions (server/actions/)

```
QUESTION: What mutations can the user trigger from the UI?
CREATE:   src/server/actions/{feature}.actions.ts
```

```typescript
// src/server/actions/wishlist.actions.ts

"use server";

import { WishlistService } from "@/server/services";
import { addToWishlistSchema } from "@/shared/schemas";
// import { requireAuth } from "@/server/helpers/auth.helper";

export async function addToWishlist(formData: FormData) {
  // const user = await requireAuth();

  const parsed = addToWishlistSchema.safeParse({
    numberId: formData.get("numberId"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  // const result = await WishlistService.add(user.id, parsed.data.numberId);
  // if (!result.ok) return { error: result.error.message };
  // return { data: result.data };

  return { data: null }; // placeholder
}

export async function removeFromWishlist(id: string) {
  // const user = await requireAuth();
  // const result = await WishlistService.remove(id, user.id);
  // if (!result.ok) return { error: result.error.message };
  // return { data: null };

  return { data: null }; // placeholder
}
```

### Step 7 — Create API Routes if needed (app/api/)

```
QUESTION: Does this feature need REST endpoints (for external consumers or client-side fetching)?
CREATE:   app/api/{feature}/route.ts
```

```typescript
// app/api/wishlist/route.ts

import { WishlistService } from "@/server/services";
import { success, error } from "@/server/helpers";

export async function GET() {
  try {
    // const user = await requireAuth();
    // const result = await WishlistService.getByUser(user.id);
    // if (!result.ok) return error(result.error);
    // return success(result.data);

    return success([]); // placeholder
  } catch (e) {
    return error(e);
  }
}
```

### Step 8 — Create Client Hook if needed (client/hooks/features/)

```
QUESTION: Does the frontend need to fetch/manage this data reactively?
CREATE:   src/client/hooks/features/use-{feature}.ts
```

```typescript
// src/client/hooks/features/use-wishlist.ts

"use client";

import { useState, useEffect } from "react";
import type { WishlistItem, ApiResponse } from "@/shared/types";

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/wishlist")
      .then((res) => res.json() as Promise<ApiResponse<WishlistItem[]>>)
      .then((res) => {
        if (res.success) setItems(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}
```

### Step 9 — Create Store if needed (client/stores/)

```
QUESTION: Does this feature need client-side state shared across components?
CREATE:   src/client/stores/{feature}.store.ts
```

### Step 10 — Create Components (client/components/features/)

```
QUESTION: What UI does the user see/interact with?
CREATE:   src/client/components/features/{feature}/
```

See [Component Splitting Rules](#4-component-splitting-rules) for details.

### Step 11 — Create Pages (app/)

```
QUESTION: What routes does this feature need?
CREATE:   app/(group)/{feature}/page.tsx
```

### Step 12 — Update Constants

```
QUESTION: Do ROUTES or other constants need updating?
UPDATE:   src/shared/constants/routes.ts
```

### FEATURE CREATION ORDER (MANDATORY)

```
1.  shared/types          ← What is the data shape?
2.  shared/schemas        ← How do we validate it?
3.  shared/enums          ← Are there fixed statuses?
4.  shared/constants      ← Any config/routes to add?
5.  server/db/queries     ← How do we read/write DB?
6.  server/services       ← What is the business logic?
7.  server/actions        ← What mutations from UI?
8.  server/errors         ← Any custom errors needed?
9.  app/api/              ← REST endpoints needed?
10. client/hooks          ← Reactive data fetching?
11. client/stores         ← Shared client state?
12. client/components     ← What does the user see?
13. app/pages             ← What pages exist?
```

NEVER start from components. ALWAYS start from types.

---

## 4. COMPONENT SPLITTING RULES

### The 4 Component Categories

```
src/client/components/
├── ui/           → Design system primitives (Button, Input, Card...)
├── common/       → Shared across features (SearchBar, Pagination, StatusBadge...)
├── features/     → Feature-specific (NumberCard, OrderList, LoginForm...)
└── layout/       → Structural (Header, Sidebar, Footer...)
```

### Decision Tree: "Where does my component go?"

```
Is it a generic UI primitive with NO business logic?
  → YES → ui/
  → NO ↓

Is it used by 2+ features?
  → YES → common/
  → NO ↓

Is it part of the page structure (header, sidebar, footer)?
  → YES → layout/
  → NO ↓

It belongs to ONE feature only?
  → YES → features/{feature-name}/
```

### UI Components (ui/)

```
RULES:
- ZERO business logic
- ZERO data fetching
- ZERO imports from @/shared/types/entities
- ZERO imports from @/server
- Accept ONLY generic props (string, number, boolean, ReactNode, callbacks)
- MUST be reusable in ANY project (not specific to _n0)
- MUST use CVA for variants when applicable
- MUST forward refs when wrapping native elements
- MUST have a barrel index.ts
- Each component gets its OWN folder

EXAMPLES:
  ✅ <Button variant="primary" size="lg" loading={true}>
  ✅ <Input error="Required" placeholder="...">
  ✅ <Card>, <CardHeader>, <CardContent>
  ✅ <Badge variant="green">Active</Badge>
  ✅ <Modal>, <Skeleton>, <Toast>
  
  ❌ <Button onClick={purchaseNumber}>     ← business logic in UI
  ❌ <UserAvatar user={user}>              ← entity-specific
  ❌ <NumberBadge status="available">      ← feature-specific
```

**Folder structure for a UI component:**

```
src/client/components/ui/button/
├── button.tsx              # Component
├── button.variants.ts      # CVA variants (if applicable)
└── index.ts                # Barrel export
```

### Common Components (common/)

```
RULES:
- Reusable across 2+ features
- CAN import from @/shared (types, enums, constants)
- CAN import from ui/ components
- CANNOT import from features/ components
- CANNOT import from @/server
- CANNOT fetch data directly
- Accept data via props

EXAMPLES:
  ✅ <SearchBar onSearch={fn} placeholder="...">
  ✅ <Pagination page={1} total={50} onPageChange={fn}>
  ✅ <StatusBadge status="available">        ← uses shared enum
  ✅ <PriceTag amount={99}>                  ← uses shared formatter
  ✅ <EmptyState title="..." description="...">
  ✅ <ConfirmDialog onConfirm={fn} onCancel={fn}>
  ✅ <PhoneInput value="" onChange={fn}>
  
  ❌ <SearchBar> that internally calls fetch("/api/numbers")
  ❌ <NumberStatusBadge>    ← too specific, goes to features/numbers/
```

### Feature Components (features/)

```
RULES:
- Specific to ONE feature
- CAN import from ui/, common/, @/shared, @/packages
- CAN use hooks from client/hooks/features/
- CAN use stores from client/stores/
- CAN call server actions
- CANNOT import from @/server directly
- CANNOT import from other features/ (if shared → move to common/)
- Group by feature name

EXAMPLES:
  ✅ features/numbers/number-card.tsx
  ✅ features/numbers/number-grid.tsx
  ✅ features/numbers/number-filters.tsx
  ✅ features/orders/order-timeline.tsx
  ✅ features/auth/login-form.tsx
  ✅ features/checkout/checkout-summary.tsx
  
  ❌ features/numbers/button.tsx        ← generic, goes to ui/
  ❌ features/numbers/search-bar.tsx    ← used elsewhere, goes to common/
```

### Layout Components (layout/)

```
RULES:
- Structural components (Header, Sidebar, Footer)
- CAN import from ui/, common/, @/shared
- CAN contain navigation logic
- SHOULD be relatively stable (don't change often)

EXAMPLES:
  ✅ layout/header/header.tsx
  ✅ layout/header/nav-links.tsx
  ✅ layout/header/user-menu.tsx
  ✅ layout/sidebar/sidebar.tsx
  ✅ layout/sidebar/sidebar-item.tsx
  ✅ layout/footer/footer.tsx
```

### When to Split a Component

```
SPLIT when:
  ✅ Component > 80 lines of JSX
  ✅ Component has 2+ distinct visual sections
  ✅ A section is reused elsewhere
  ✅ Component has complex internal state for ONE section
  ✅ Component mixes "use client" interactive parts with static parts
  ✅ You can name the extracted piece clearly

DON'T SPLIT when:
  ❌ Component is < 40 lines
  ❌ The extracted piece would have no clear name
  ❌ The extracted piece would need 5+ props passed down
  ❌ Splitting only for "looking clean" with no real benefit
  ❌ The pieces are ALWAYS used together and NEVER separately
```

### Splitting Example

**BEFORE (too big):**

```typescript
// ❌ BAD — 150+ lines, mixed concerns
export function NumberDetail({ number }: { number: PhoneNumber }) {
  return (
    <div>
      {/* 40 lines of header with image, title, badges */}
      {/* 30 lines of pricing section */}
      {/* 40 lines of specifications table */}
      {/* 30 lines of purchase form with payment */}
      {/* 20 lines of similar numbers suggestions */}
    </div>
  );
}
```

**AFTER (well split):**

```typescript
// ✅ GOOD — Each piece is focused

// features/numbers/number-detail.tsx (orchestrator)
export function NumberDetail({ number }: { number: PhoneNumber }) {
  return (
    <div className="space-y-8">
      <NumberDetailHeader number={number} />
      <NumberDetailPricing price={number.price} category={number.category} />
      <NumberDetailSpecs number={number} />
      <NumberPurchaseForm numberId={number.id} price={number.price} />
    </div>
  );
}

// features/numbers/number-detail-header.tsx
export function NumberDetailHeader({ number }: { number: PhoneNumber }) { ... }

// features/numbers/number-detail-pricing.tsx
export function NumberDetailPricing({ price, category }: { ... }) { ... }

// features/numbers/number-detail-specs.tsx
export function NumberDetailSpecs({ number }: { number: PhoneNumber }) { ... }

// features/numbers/number-purchase-form.tsx ← "use client" only here
("use client")
export function NumberPurchaseForm({ numberId, price }: { ... }) { ... }
```

---

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

## 6. FILE TEMPLATES

### Type File Template

```typescript
// src/shared/types/entities/{feature}.types.ts

export type {Feature} = {
  id: string;
  // ... fields
  createdAt: Date;
  updatedAt: Date;
};

// Derived types
export type {Feature}Preview = Pick<{Feature}, "id" | ...>;
export type {Feature}CreateInput = Pick<{Feature}, ...>;
export type {Feature}UpdateInput = Partial<{Feature}CreateInput>;
```

### Schema File Template

```typescript
// src/shared/schemas/{feature}.schema.ts

import { z } from "zod";

// Atomic schemas first
export const {field}Schema = z.string().min(1);

// Composed schemas
export const create{Feature}Schema = z.object({
  // fields using atomic schemas
});

export const update{Feature}Schema = create{Feature}Schema.partial();

// Infer types from schemas
export type Create{Feature}Input = z.infer<typeof create{Feature}Schema>;
export type Update{Feature}Input = z.infer<typeof update{Feature}Schema>;
```

### Service File Template

```typescript
// src/server/services/{feature}.service.ts

import { Ok, Err, type Result } from "@/packages/result";
import { {Feature}Queries } from "@/server/db/queries/{feature}.queries";
import { NotFoundError } from "@/server/errors";
import type { {Feature} } from "@/shared/types";

export const {Feature}Service = {
  async getAll(): Promise<Result<{Feature}[]>> {
    try {
      const items = await {Feature}Queries.findAll();
      return Ok(items);
    } catch (e) {
      return Err(e as Error);
    }
  },

  async getById(id: string): Promise<Result<{Feature}>> {
    const item = await {Feature}Queries.findById(id);
    if (!item) return Err(new NotFoundError("{Feature}", id));
    return Ok(item);
  },
};
```

### API Route Template

```typescript
// app/api/{feature}/route.ts

import type { NextRequest } from "next/server";
import { {Feature}Service } from "@/server/services";
import { search{Feature}Schema } from "@/shared/schemas";
import { ValidationError } from "@/server/errors";
import { success, error } from "@/server/helpers";

export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams);
    const parsed = search{Feature}Schema.safeParse(params);

    if (!parsed.success) {
      return error(new ValidationError(parsed.error));
    }

    const result = await {Feature}Service.search(parsed.data);
    if (!result.ok) return error(result.error);

    return success(result.data);
  } catch (e) {
    return error(e);
  }
}
```

### Server Action Template

```typescript
// src/server/actions/{feature}.actions.ts

"use server";

import { {Feature}Service } from "@/server/services";
import { create{Feature}Schema } from "@/shared/schemas";

export async function create{Feature}(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parsed = create{Feature}Schema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const result = await {Feature}Service.create(parsed.data);

  if (!result.ok) {
    return { error: result.error.message };
  }

  return { data: result.data };
}
```

### Hook Template

```typescript
// src/client/hooks/features/use-{feature}.ts

"use client";

import { useState, useEffect } from "react";
import type { {Feature}, ApiResponse } from "@/shared/types";

export function use{Feature}() {
  const [items, setItems] = useState<{Feature}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/{feature}")
      .then((res) => res.json() as Promise<ApiResponse<{Feature}[]>>)
      .then((res) => {
        if (!res.success) throw new Error(res.error.message);
        setItems(res.data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading, error };
}
```

### Feature Component Template

```typescript
// src/client/components/features/{feature}/{feature}-card.tsx

import type { {Feature} } from "@/shared/types";
import { Card, CardContent } from "@/client/components/ui";

type {Feature}CardProps = {
  item: {Feature};
  onAction?: (id: string) => void;
};

export function {Feature}Card({ item, onAction }: {Feature}CardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        {/* content */}
      </CardContent>
    </Card>
  );
}
```

### Page Template

```typescript
// app/({group})/{feature}/page.tsx

// THIS FILE IS STUPID. It only imports and assembles.

import { {Feature}List } from "@/client/components/features/{feature}";

export const metadata = { title: "{Feature}" };

export default function {Feature}Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{Feature}</h1>
      <{Feature}List />
    </div>
  );
}
```

---

## 7. DO'S AND DON'TS

### ✅ DO

```
✅ Start from types, end with components
✅ Use Result<T> pattern for service returns (no try/catch in routes)
✅ Use Zod schemas for ALL input validation (same schema front + back)
✅ Derive types from Zod schemas when possible (z.infer<typeof schema>)
✅ Use barrel exports (index.ts) in every folder
✅ Keep app/ pages STUPID — import and assemble only
✅ Use "use client" ONLY where needed (events, hooks, state)
✅ Prefer Server Components by default
✅ Prefer Server Actions over API routes for mutations from UI
✅ Use API routes for GET requests from client hooks
✅ Use `satisfies` for type checking responses
✅ Handle ALL error cases
✅ Use the existing error classes (NotFoundError, ConflictError, etc.)
✅ Use success() and error() helpers for API responses
✅ Use cn() for conditional classNames
✅ Use CVA for component variants
✅ Forward refs on components wrapping native elements
✅ Add "use server" at the top of action files
✅ Keep one component per file
✅ Export types with `export type` (not just `export`)
```

### ❌ DON'T

```
❌ Don't put logic in app/ files (pages are assemblers only)
❌ Don't import @/server in "use client" components
❌ Don't import @/client in server services
❌ Don't use try/catch in API routes — use Result pattern
❌ Don't create types that duplicate Zod schemas (use z.infer)
❌ Don't use `any` — use `unknown` and narrow
❌ Don't use default exports for components (only for pages)
❌ Don't use `React.FC` — use plain function declarations
❌ Don't put multiple components in one file
❌ Don't use inline styles — use Tailwind
❌ Don't import from relative paths across boundaries (use @/ aliases)
❌ Don't create a hook that just wraps useState — that's not a hook
❌ Don't fetch data in layout components
❌ Don't use useEffect for data that can be server-fetched
❌ Don't create folders without index.ts barrel
❌ Don't use enums (use `as const` objects instead)
❌ Don't put environment variables directly — use env.helper.ts
❌ Don't console.log in production code — use @/packages/logger
❌ Don't mix feature components (numbers/ importing from orders/)
❌ Don't create a common/ component until it's used by 2+ features
```

---

## 8. IMPORT RULES

### Always use aliases

```typescript
// ✅ CORRECT
import { Button } from "@/client/components/ui";
import { NumberService } from "@/server/services";
import type { PhoneNumber } from "@/shared/types";
import { parsePhone } from "@/packages/phone";

// ❌ WRONG
import { Button } from "../../../client/components/ui/button";
import { NumberService } from "../../server/services/number.service";
```

### Import order (enforce in ESLint)

```typescript
// 1. External packages
import { z } from "zod";
import { NextResponse } from "next/server";

// 2. Internal packages
import { Ok, Err } from "@/packages/result";
import { parsePhone } from "@/packages/phone";

// 3. Shared
import type { PhoneNumber } from "@/shared/types";
import { createNumberSchema } from "@/shared/schemas";
import { ROUTES } from "@/shared/constants";

// 4. Server (only in server files)
import { NumberService } from "@/server/services";

// 5. Client (only in client files)
import { Button } from "@/client/components/ui";
import { useNumbers } from "@/client/hooks";

// 6. Relative (same folder only)
import { NumberCard } from "./number-card";
```

### Type imports

```typescript
// ✅ Always use `import type` for type-only imports
import type { PhoneNumber } from "@/shared/types";
import type { NextRequest } from "next/server";
import type { Result } from "@/packages/result";

// ❌ Don't mix value and type imports
import { PhoneNumber } from "@/shared/types"; // if it's only used as a type
```

---

## 9. TYPE SAFETY RULES

### Single Source of Truth

```
Types flow in ONE direction:

  Database Schema → shared/types → shared/schemas → everywhere

NEVER create a duplicate type. ALWAYS derive.
```

```typescript
// ✅ CORRECT — derive from base type
export type PhoneNumber = { id: string; value: string; price: number; ... };
export type NumberPreview = Pick<PhoneNumber, "id" | "value" | "price">;
export type NumberCreateInput = Pick<PhoneNumber, "value" | "price" | "category">;

// ✅ CORRECT — derive from Zod schema
export const createNumberSchema = z.object({ value: z.string(), price: z.number() });
export type CreateNumberInput = z.infer<typeof createNumberSchema>;

// ❌ WRONG — manual duplicate
export type CreateNumberInput = { value: string; price: number }; // duplicated!
```

### API Response Typing

```typescript
// ✅ CORRECT
export async function GET(): Promise<NextResponse<ApiResponse<PhoneNumber[]>>> {
  return NextResponse.json(
    { success: true, data: numbers } satisfies ApiResponse<PhoneNumber[]>
  );
}

// ❌ WRONG
export async function GET() {
  return NextResponse.json({ data: numbers }); // untyped response
}
```

### Props Typing

```typescript
// ✅ CORRECT — type defined next to component
type NumberCardProps = {
  number: PhoneNumber;
  onPurchase?: (id: string) => void;
};

export function NumberCard({ number, onPurchase }: NumberCardProps) {}

// ❌ WRONG — inline props
export function NumberCard({ number, onPurchase }: { number: any; onPurchase?: any }) {}

// ❌ WRONG — React.FC
const NumberCard: React.FC<NumberCardProps> = ({ number }) => {}
```

---

## 10. API ROUTE RULES

```
ANATOMY OF AN API ROUTE:

  1. Parse input (query params or body)
  2. Validate with Zod schema
  3. Call service
  4. Return with success() or error() helper

That's it. No business logic in routes.
```

```typescript
// ✅ CORRECT — thin route, delegates to service
export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams);
    const parsed = searchSchema.safeParse(params);
    if (!parsed.success) return error(new ValidationError(parsed.error));

    const result = await Service.search(parsed.data);
    if (!result.ok) return error(result.error);

    return success(result.data);
  } catch (e) {
    return error(e);
  }
}

// ❌ WRONG — business logic in route
export async function GET(req: NextRequest) {
  const numbers = await db.number.findMany({ where: { status: "available" } });
  const filtered = numbers.filter(n => n.price > 10);
  const sorted = filtered.sort((a, b) => b.price - a.price);
  return NextResponse.json(sorted);
}
```

---

## 11. SERVER ACTION RULES

```
Use Server Actions for:
  ✅ Form submissions
  ✅ Mutations triggered by user interaction
  ✅ When you want automatic revalidation

Use API Routes for:
  ✅ GET requests from client hooks
  ✅ Webhooks from external services
  ✅ Endpoints consumed by external apps/mobile
```

```typescript
// ✅ CORRECT server action
"use server";

import { revalidatePath } from "next/cache";
import { Service } from "@/server/services";
import { schema } from "@/shared/schemas";

export async function createThing(formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const result = await Service.create(parsed.data);

  if (!result.ok) {
    return { error: result.error.message };
  }

  revalidatePath("/things");
  return { data: result.data };
}
```

---

## 12. COMPONENT PATTERNS

### Server vs Client Component Decision

```
DEFAULT: Server Component (no directive needed)

Add "use client" ONLY when you need:
  - useState / useReducer
  - useEffect / useLayoutEffect
  - Event handlers (onClick, onChange, onSubmit)
  - Browser APIs (window, document, localStorage)
  - Custom hooks that use the above
  - Context providers (createContext, useContext)
  - Third-party client libraries

KEEP AS SERVER COMPONENT when:
  - Just rendering data
  - Fetching data from DB/service
  - Using async/await
  - No interactivity needed
```

### Composition Pattern (Server + Client)

```typescript
// ✅ CORRECT — Server component fetches, passes to client component

// app/(dashboard)/numbers/page.tsx (SERVER)
import { NumberService } from "@/server/services";
import { NumberGrid } from "@/client/components/features/numbers";

export default async function NumbersPage() {
  const result = await NumberService.search({ page: 1, pageSize: 20 });
  const numbers = result.ok ? result.data : [];

  return <NumberGrid numbers={numbers} />;
}

// src/client/components/features/numbers/number-grid.tsx (CLIENT)
"use client";

export function NumberGrid({ numbers }: { numbers: PhoneNumber[] }) {
  // Can use useState, onClick, etc. here
  return (
    <div className="grid grid-cols-3 gap-4">
      {numbers.map((n) => <NumberCard key={n.id} number={n} />)}
    </div>
  );
}
```

### Props Drilling vs Composition

```typescript
// ❌ BAD — drilling props 4 levels deep
<Dashboard user={user}>
  <Sidebar user={user}>
    <SidebarHeader user={user}>
      <UserAvatar user={user} />

// ✅ GOOD — composition with children
<Dashboard>
  <Sidebar header={<UserAvatar user={user} />}>
    <SidebarContent />
  </Sidebar>
</Dashboard>

// ✅ GOOD — if 3+ components need it, use a store or context
const user = useAuthStore((s) => s.user);
```

---

## 13. ERROR HANDLING PATTERNS

### In Services (use Result pattern)

```typescript
// ✅ CORRECT
async function purchase(id: string): Promise<Result<PhoneNumber>> {
  const number = await Queries.findById(id);
  if (!number) return Err(new NotFoundError("Number", id));
  if (number.status !== "available") return Err(new ConflictError("Not available"));

  const updated = await Queries.update(id, { status: "sold" });
  return Ok(updated);
}
```

### In API Routes (use error helper)

```typescript
// ✅ CORRECT
export async function GET() {
  try {
    const result = await Service.getAll();
    if (!result.ok) return error(result.error); // handles AppError subtypes
    return success(result.data);
  } catch (e) {
    return error(e); // catches unexpected errors → 500
  }
}
```

### In Server Actions (return error object)

```typescript
// ✅ CORRECT
export async function doThing(formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const result = await Service.doThing(parsed.data);
  if (!result.ok) return { error: result.error.message };

  return { data: result.data };
}
```

### In Client Components (handle action results)

```typescript
// ✅ CORRECT
"use client";

function MyForm() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await doThing(formData);

    if ("error" in result && result.error) {
      setError(typeof result.error === "string" ? result.error : "Validation error");
      return;
    }

    // Success
    setError(null);
  }

  return (
    <form action={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      {/* fields */}
    </form>
  );
}
```

---

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

## 15. CHECKLIST BEFORE GENERATING CODE

Before writing ANY code, the AI MUST verify:

```
□ Am I putting this file in the correct folder? (check Section 2)
□ Am I following the dependency rules? (check import table)
□ Am I using the correct naming convention? (check Section 5)
□ Am I starting from types, not components? (check Section 3)
□ Does this component belong to ui/, common/, features/, or layout/?
□ Am I using "use client" only when necessary?
□ Am I using the Result pattern in services?
□ Am I validating input with Zod schemas?
□ Am I using success()/error() helpers in API routes?
□ Am I deriving types instead of duplicating?
□ Have I updated the barrel exports (index.ts)?
□ Have I updated ROUTES constant if adding new pages?
□ Am I following the file template for this type of file?
```

---

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