# Common Review Findings

## Most Common Violations (check these first)

1. **Forgot barrel export** — Created file but didn't update index.ts
2. **Logic in page** — useState/fetch in app/ page instead of component
3. **Wrong component folder** — Feature component in common/ or ui/
4. **Missing Zod validation** — Direct use of req.body without validation
5. **Service throws instead of Result** — try/catch instead of Ok/Err
6. **"use client" overuse** — Added to component that only renders props
7. **Type duplication** — Created new type instead of Pick/Partial
8. **Import violation** — @/server imported in client component
9. **Missing error handling** — API route without try/catch wrapper
10. **Default export** — Used on non-page file

## Fix Templates

### Wrong: Logic in page
```typescript
// ❌ app/(dashboard)/numbers/page.tsx
"use client";
export default function Page() {
  const [numbers, setNumbers] = useState([]);
  useEffect(() => { fetch("/api/numbers")... }, []);
}

// ✅ Split: server component page + client component
// app/(dashboard)/numbers/page.tsx
export default async function Page() {
  return <NumberGrid />;
}
// src/client/components/features/numbers/number-grid.tsx
"use client";
export function NumberGrid() { /* state + fetch here */ }
```

### Wrong: Service throws
```typescript
// ❌
async getById(id: string) {
  const item = await db.find(id);
  if (!item) throw new Error("Not found"); // BAD
}

// ✅
async getById(id: string): Promise<Result<Item>> {
  const item = await db.find(id);
  if (!item) return Err(new NotFoundError("Item", id));
  return Ok(item);
}
```
