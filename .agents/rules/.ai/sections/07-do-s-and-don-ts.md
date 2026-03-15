## 7. DO'S AND DON'TS

### ✅ DO

```
✅ Start from types, end with components
✅ Use Result<T> pattern for service returns (no try/catch in routes)
✅ Use Zod schemas for ALL input validation (same schema front + back)
✅ Derive types from Zod schemas when possible (z.infer<typeof schema>)
✅ Use barrel exports (index.ts) in every folder
✅ Keep app/ pages STUPID — import and assemble only
✅ Use "use client" ONLY where needed (events, hooks, state)
✅ Prefer Server Components by default
✅ Prefer Server Actions over API routes for mutations from UI
✅ Use API routes for GET requests from client hooks
✅ Use `satisfies` for type checking responses
✅ Handle ALL error cases
✅ Use the existing error classes (NotFoundError, ConflictError, etc.)
✅ Use success() and error() helpers for API responses
✅ Use cn() for conditional classNames
✅ Use CVA for component variants
✅ Forward refs on components wrapping native elements
✅ Add "use server" at the top of action files
✅ Keep one component per file
✅ Export types with `export type` (not just `export`)
```

### ❌ DON'T

```
❌ Don't put logic in app/ files (pages are assemblers only)
❌ Don't import @/server in "use client" components
❌ Don't import @/client in server services
❌ Don't use try/catch in API routes — use Result pattern
❌ Don't create types that duplicate Zod schemas (use z.infer)
❌ Don't use `any` — use `unknown` and narrow
❌ Don't use default exports for components (only for pages)
❌ Don't use `React.FC` — use plain function declarations
❌ Don't put multiple components in one file
❌ Don't use inline styles — use Tailwind
❌ Don't import from relative paths across boundaries (use @/ aliases)
❌ Don't create a hook that just wraps useState — that's not a hook
❌ Don't fetch data in layout components
❌ Don't use useEffect for data that can be server-fetched
❌ Don't create folders without index.ts barrel
❌ Don't use enums (use `as const` objects instead)
❌ Don't put environment variables directly — use env.helper.ts
❌ Don't console.log in production code — use @/packages/logger
❌ Don't mix feature components (numbers/ importing from orders/)
❌ Don't create a common/ component until it's used by 2+ features
```

---

