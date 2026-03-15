## 15. CHECKLIST BEFORE GENERATING CODE

Before writing ANY code, the AI MUST verify:

```
□ Am I putting this file in the correct folder? (check Section 2)
□ Am I following the dependency rules? (check import table)
□ Am I using the correct naming convention? (check Section 5)
□ Am I starting from types, not components? (check Section 3)
□ Does this component belong to ui/, common/, features/, or layout/?
□ Am I using "use client" only when necessary?
□ Am I using the Result pattern in services?
□ Am I validating input with Zod schemas?
□ Am I using success()/error() helpers in API routes?
□ Am I deriving types instead of duplicating?
□ Have I updated the barrel exports (index.ts)?
□ Have I updated ROUTES constant if adding new pages?
□ Am I following the file template for this type of file?
```

---

