# Copilot Instructions for _n0

This project follows a strict architecture. Read `.ai/CONTEXT.md` for the full guide.

## Key Rules

- **Imports**: Use `@/client/*`, `@/server/*`, `@/shared/*`, `@/packages/*` aliases
- **client/ NEVER imports server/**, and vice versa
- **app/ pages are assemblers only** — no business logic
- **Services return `Result<T>`** using Ok/Err pattern from `@/packages/result`
- **API routes use `success()`/`error()` helpers** from `@/server/helpers`
- **Validate with Zod schemas** from `@/shared/schemas`
- **Types are in `@/shared/types`** — never duplicate, always derive with Pick/Partial/z.infer
- **Components go in**: `ui/` (primitives), `common/` (cross-feature), `features/` (specific), `layout/` (structural)
- **Files use kebab-case** with mandatory suffixes: `.types.ts`, `.schema.ts`, `.service.ts`, etc.
- **"use client" only when needed** — prefer Server Components by default
- **Feature creation order**: types → schemas → services → actions → hooks → components → pages

See `.ai/sections/` for detailed per-topic documentation.
