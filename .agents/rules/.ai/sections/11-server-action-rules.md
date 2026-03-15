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

