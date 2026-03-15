# Review Checklist — Complete Audit

## Layer 1 — Architecture (🔴 if violated)
- [ ] Every file in its correct folder per placement rules
- [ ] Dependency tree: no cross-boundary imports
- [ ] Feature creation order respected
- [ ] app/ pages contain ZERO logic

## Layer 2 — Type Safety (🔴 if violated)
- [ ] Types in shared/types/entities/
- [ ] No `any` type anywhere
- [ ] Types derived, never duplicated
- [ ] API responses typed with ApiResponse<T>
- [ ] Zod schemas in shared/schemas/
- [ ] Schema types inferred with z.infer

## Layer 3 — Server Patterns (🟠 if violated)
- [ ] Services return Result<T>
- [ ] Services in server/services/
- [ ] Queries in server/db/queries/
- [ ] API routes: validate → service → respond (thin)
- [ ] API routes use success()/error()
- [ ] Server actions have "use server"
- [ ] Custom errors extend AppError

## Layer 4 — Client Patterns (🟠 if violated)
- [ ] Components in correct category (ui/common/features/layout)
- [ ] "use client" only where needed
- [ ] No @/server imports in client
- [ ] One component per file
- [ ] Hooks in client/hooks/

## Layer 5 — Conventions (🟡 if violated)
- [ ] Files: kebab-case with correct suffixes
- [ ] Components: PascalCase
- [ ] Constants: UPPER_CASE
- [ ] Named exports (default only for pages)
- [ ] Barrel exports present and current

## Layer 6 — Quality (🟢 if violated)
- [ ] Components < 80 lines JSX
- [ ] No console.log
- [ ] Import order: external → packages → shared → server/client → relative
- [ ] No inline styles
