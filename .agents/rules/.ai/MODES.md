# _n0 — AI Agent Modes

## Available Modes

| Mode | Trigger | Agent | Purpose |
|------|---------|-------|---------|
| **Always On** | `always_on` | n0-architect | Base architecture rules |
| **Code** | `code` | n0-coder | Fast feature implementation |
| **Review** | `review` | n0-reviewer | Code review & audit |
| **Plan** | `plan` | n0-planner | Feature planning & blueprint |

## Mode Files

```
.agents/rules/
├── project-guidelines.md              ← always_on
├── code.md                            ← trigger: code
├── review.md                          ← trigger: review
├── plan.md                            ← trigger: plan
└── .ai/
    ├── ARCHITECTURE.md                ← full guide
    ├── CONTEXT.md                     ← quick reference
    ├── INDEX.md                       ← table of contents
    ├── MODES.md                       ← this file
    ├── sections/                      ← architecture sections
    │   ├── 00 → 15, 99
    │   └── ...
    └── modes/                         ← mode-specific docs
        ├── code/
        │   ├── 01-fast-code-workflow.md
        │   ├── 02-code-templates.md
        │   └── 03-code-checklist.md
        ├── review/
        │   ├── 01-review-checklist.md
        │   ├── 02-review-severity.md
        │   └── 03-review-patterns.md
        └── plan/
            ├── 01-plan-workflow.md
            ├── 02-plan-templates.md
            └── 03-plan-checklist.md
```

## Usage with Antigravity

```
User: "code a wishlist feature"
→ Activates: project-guidelines.md (always_on) + code.md (trigger: code)
→ Agent reads: CONTEXT.md + modes/code/01-fast-code-workflow.md
→ Agent executes: SCAN → MAP → BUILD → WIRE → DONE

User: "review this code"
→ Activates: project-guidelines.md (always_on) + review.md (trigger: review)
→ Agent reads: CONTEXT.md + modes/review/01-review-checklist.md
→ Agent executes: SCAN → CHECK → GRADE → REPORT → FIX

User: "plan a notification system"
→ Activates: project-guidelines.md (always_on) + plan.md (trigger: plan)
→ Agent reads: CONTEXT.md + modes/plan/01-plan-workflow.md
→ Agent executes: UNDERSTAND → DECOMPOSE → MAP → SEQUENCE → DETAIL → RISKS → ESTIMATE
```
