# Planning Workflow

## When to Plan
- New feature with 5+ files
- Feature touching multiple layers (shared + server + client)
- Ambiguous requirements needing decisions
- User explicitly says "plan"

## Protocol

### 1. UNDERSTAND
Restate the feature. Confirm scope.
Ask: What does the user see? What data is involved? What actions can they take?

### 2. DATA MODEL
Define every entity with fields, types, required/optional.
Identify relationships between entities.
Identify which existing types connect.

### 3. FILE MAP
List EVERY file that needs to be created or modified.
Use EXACT paths. Include barrel updates.
Follow creation order (shared → server → client → app).

### 4. FILE DETAILS
For each file, describe:
- What it exports (named exports)
- What it contains (types, functions, components)
- What it imports from (dependencies)
- Key logic or decisions

### 5. COMPONENT DECISIONS
For each component, state:
- Category (ui/common/features/layout)
- Reasoning for that category
- Props it accepts
- Whether it needs "use client"

### 6. API DESIGN
For each endpoint:
- Method + path
- Query params or body schema
- Response type
- Which service method it calls

### 7. EDGE CASES
List questions and unknowns.
Provide recommended decisions with reasoning.

### 8. ESTIMATE
Count files, estimate complexity, identify biggest risk.
