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

