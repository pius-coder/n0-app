# Code Templates — Quick Reference

## Type
```typescript
export type {Name} = {
  id: string;
  // fields
  createdAt: Date;
  updatedAt: Date;
};
export type {Name}Preview = Pick<{Name}, "id" | ...>;
export type {Name}CreateInput = Pick<{Name}, ...>;
export type {Name}UpdateInput = Partial<{Name}CreateInput>;
```

## Schema
```typescript
import { z } from "zod";
export const create{Name}Schema = z.object({ ... });
export const update{Name}Schema = create{Name}Schema.partial();
export type Create{Name}Input = z.infer<typeof create{Name}Schema>;
```

## Service
```typescript
import { Ok, Err, type Result } from "@/packages/result";
export const {Name}Service = {
  async getAll(): Promise<Result<{Name}[]>> {
    try { return Ok(await Queries.findAll()); }
    catch (e) { return Err(e as Error); }
  },
};
```

## API Route
```typescript
import { success, error } from "@/server/helpers";
export async function GET(req: NextRequest) {
  try {
    const result = await Service.getAll();
    if (!result.ok) return error(result.error);
    return success(result.data);
  } catch (e) { return error(e); }
}
```

## Server Action
```typescript
"use server";
export async function create{Name}(formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
  const result = await Service.create(parsed.data);
  if (!result.ok) return { error: result.error.message };
  return { data: result.data };
}
```

## Hook
```typescript
"use client";
export function use{Name}() {
  const [items, setItems] = useState<{Name}[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetch("/api/...").then(...); }, []);
  return { items, loading };
}
```

## Feature Component
```typescript
import type { {Name} } from "@/shared/types";
import { Card, CardContent } from "@/client/components/ui";
type {Name}CardProps = { item: {Name}; onAction?: (id: string) => void };
export function {Name}Card({ item, onAction }: {Name}CardProps) {
  return <Card>...</Card>;
}
```

## Page
```typescript
import { {Name}List } from "@/client/components/features/{name}";
export const metadata = { title: "{Name}" };
export default function {Name}Page() {
  return <div className="space-y-6"><h1>...</h1><{Name}List /></div>;
}
```
