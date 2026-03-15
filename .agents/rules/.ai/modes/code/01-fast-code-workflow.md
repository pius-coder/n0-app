# Fast Code Workflow

## Trigger
User describes a feature or says "code {feature}".

## Protocol

### Phase 1 — SCAN (5 seconds)
Read the request. Identify:
- What entities are involved?
- What operations (CRUD)?
- What UI is needed?
- What pages/routes?

### Phase 2 — MAP (10 seconds)
List ALL files with exact paths. Group by layer:
- Shared (types, schemas, enums, constants)
- Server (queries, services, actions, API routes)
- Client (hooks, stores, components)
- App (pages)
- Barrels (index.ts updates)

### Phase 3 — BUILD (bulk of time)
Write COMPLETE code for each file. Follow creation order.
Never skip a file. Never leave placeholders.

Rules during BUILD:
- Types: derive with Pick/Partial/z.infer
- Schemas: atomic schemas first, compose into object schemas
- Services: every method returns Promise<Result<T>>
- Actions: "use server", validate with Zod, call service
- API routes: thin — parse → validate → service → respond
- Hooks: "use client", fetch + state management
- Components: one per file, props type above, correct category
- Pages: STUPID — import components, render, metadata only

### Phase 4 — WIRE
List all barrel exports that need updating.
Write the updated index.ts files.

### Phase 5 — DONE
One-line summary of what was built.

## Speed Tips
- Don't explain unless asked
- Don't ask permission — just build
- If ambiguous, decide and state in one line
- Batch related files (all shared → all server → all client)
