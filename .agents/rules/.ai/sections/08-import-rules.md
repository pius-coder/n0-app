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

