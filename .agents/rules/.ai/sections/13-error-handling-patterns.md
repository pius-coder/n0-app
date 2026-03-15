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

