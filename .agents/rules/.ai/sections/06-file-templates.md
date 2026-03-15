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

