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

