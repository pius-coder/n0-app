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

