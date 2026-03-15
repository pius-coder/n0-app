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

