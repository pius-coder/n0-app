# _n0 — AI Context Loader

Read the following architecture files before generating ANY code for this project.

## Required Reading (by task)

### 🆕 Creating a new feature
Read these files in order:
1. sections/01-project-overview.md
2. sections/02-folder-structure--dependency-rules.md
3. sections/03-how-to-create-a-feature.md
4. sections/04-component-splitting-rules.md
5. sections/05-naming-conventions.md
6. sections/06-file-templates.md
7. sections/07-dos-and-donts.md

### 🧩 Creating components
Read these files:
1. sections/04-component-splitting-rules.md
2. sections/05-naming-conventions.md
3. sections/12-component-patterns.md
4. sections/07-dos-and-donts.md

### ⚙️ Backend work (API, services, DB)
Read these files:
1. sections/02-folder-structure--dependency-rules.md
2. sections/06-file-templates.md
3. sections/09-type-safety-rules.md
4. sections/10-api-route-rules.md
5. sections/11-server-action-rules.md
6. sections/13-error-handling-patterns.md

### 🔗 Types & validation
Read these files:
1. sections/08-import-rules.md
2. sections/09-type-safety-rules.md

### ✅ Code review
Read this file:
1. sections/15-checklist-before-generating-code.md

## Project Aliases

```
@/client/*    → src/client/*     (browser-only code)
@/server/*    → src/server/*     (server-only code)
@/shared/*    → src/shared/*     (isomorphic code)
@/packages/*  → src/packages/*   (autonomous modules)
```

## Golden Rules

1. NEVER import @/server in "use client" components
2. NEVER import @/client in server services
3. NEVER put business logic in app/ files
4. ALWAYS start from types, end with components
5. ALWAYS use Result<T> in services
6. ALWAYS validate with Zod schemas
7. ALWAYS use success()/error() helpers in API routes
8. app/ pages are STUPID — they only import and assemble
