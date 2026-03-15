# Code Checklist — Run Before Submitting

## Files
- [ ] Every file in correct folder
- [ ] Every file has correct suffix (.types.ts, .schema.ts, etc.)
- [ ] Every file uses kebab-case naming
- [ ] Every folder has updated index.ts barrel

## Architecture
- [ ] No client → server imports
- [ ] No server → client imports
- [ ] No shared → client/server imports
- [ ] No business logic in app/ pages
- [ ] Creation order followed

## Types
- [ ] Types derived (Pick/Partial/z.infer), never duplicated
- [ ] No `any` anywhere
- [ ] Props type defined above each component

## Server
- [ ] Services return Result<T>
- [ ] API routes use success()/error()
- [ ] Server actions have "use server"
- [ ] All input validated with Zod

## Client
- [ ] "use client" only where needed
- [ ] Components in correct category
- [ ] One component per file
- [ ] Named exports only

## Completeness
- [ ] ALL code is complete (no placeholders)
- [ ] ALL barrels updated
- [ ] ROUTES constant updated (if new pages)
