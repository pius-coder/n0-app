# Review Severity Guide

## 🔴 CRITICAL — Block merge
- Server import in client component
- Business logic in app/ page
- Missing input validation
- `any` type
- Broken dependency tree
- Missing "use server" directive
- Security: exposed secrets, SQL injection vectors

## 🟠 HIGH — Must fix soon
- Wrong folder placement
- Missing barrel export
- Duplicated type (not derived)
- Missing Result<T> in service
- Component in wrong category
- Multiple components in one file

## 🟡 MEDIUM — Should improve
- Component > 80 lines
- Missing error handling
- Naming convention violation
- Missing props type
- "use client" on server-compatible component
- Inline fetch instead of hook

## 🟢 LOW — Nice to have
- Import order
- Missing JSDoc
- Could use cn() helper
- Extra whitespace
- Verbose conditional
