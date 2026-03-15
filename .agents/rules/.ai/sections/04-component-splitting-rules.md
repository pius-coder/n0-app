## 4. COMPONENT SPLITTING RULES

### The 4 Component Categories

```
src/client/components/
├── ui/           → Design system primitives (Button, Input, Card...)
├── common/       → Shared across features (SearchBar, Pagination, StatusBadge...)
├── features/     → Feature-specific (NumberCard, OrderList, LoginForm...)
└── layout/       → Structural (Header, Sidebar, Footer...)
```

### Decision Tree: "Where does my component go?"

```
Is it a generic UI primitive with NO business logic?
  → YES → ui/
  → NO ↓

Is it used by 2+ features?
  → YES → common/
  → NO ↓

Is it part of the page structure (header, sidebar, footer)?
  → YES → layout/
  → NO ↓

It belongs to ONE feature only?
  → YES → features/{feature-name}/
```

### UI Components (ui/)

```
RULES:
- ZERO business logic
- ZERO data fetching
- ZERO imports from @/shared/types/entities
- ZERO imports from @/server
- Accept ONLY generic props (string, number, boolean, ReactNode, callbacks)
- MUST be reusable in ANY project (not specific to _n0)
- MUST use CVA for variants when applicable
- MUST forward refs when wrapping native elements
- MUST have a barrel index.ts
- Each component gets its OWN folder

EXAMPLES:
  ✅ <Button variant="primary" size="lg" loading={true}>
  ✅ <Input error="Required" placeholder="...">
  ✅ <Card>, <CardHeader>, <CardContent>
  ✅ <Badge variant="green">Active</Badge>
  ✅ <Modal>, <Skeleton>, <Toast>
  
  ❌ <Button onClick={purchaseNumber}>     ← business logic in UI
  ❌ <UserAvatar user={user}>              ← entity-specific
  ❌ <NumberBadge status="available">      ← feature-specific
```

**Folder structure for a UI component:**

```
src/client/components/ui/button/
├── button.tsx              # Component
├── button.variants.ts      # CVA variants (if applicable)
└── index.ts                # Barrel export
```

### Common Components (common/)

```
RULES:
- Reusable across 2+ features
- CAN import from @/shared (types, enums, constants)
- CAN import from ui/ components
- CANNOT import from features/ components
- CANNOT import from @/server
- CANNOT fetch data directly
- Accept data via props

EXAMPLES:
  ✅ <SearchBar onSearch={fn} placeholder="...">
  ✅ <Pagination page={1} total={50} onPageChange={fn}>
  ✅ <StatusBadge status="available">        ← uses shared enum
  ✅ <PriceTag amount={99}>                  ← uses shared formatter
  ✅ <EmptyState title="..." description="...">
  ✅ <ConfirmDialog onConfirm={fn} onCancel={fn}>
  ✅ <PhoneInput value="" onChange={fn}>
  
  ❌ <SearchBar> that internally calls fetch("/api/numbers")
  ❌ <NumberStatusBadge>    ← too specific, goes to features/numbers/
```

### Feature Components (features/)

```
RULES:
- Specific to ONE feature
- CAN import from ui/, common/, @/shared, @/packages
- CAN use hooks from client/hooks/features/
- CAN use stores from client/stores/
- CAN call server actions
- CANNOT import from @/server directly
- CANNOT import from other features/ (if shared → move to common/)
- Group by feature name

EXAMPLES:
  ✅ features/numbers/number-card.tsx
  ✅ features/numbers/number-grid.tsx
  ✅ features/numbers/number-filters.tsx
  ✅ features/orders/order-timeline.tsx
  ✅ features/auth/login-form.tsx
  ✅ features/checkout/checkout-summary.tsx
  
  ❌ features/numbers/button.tsx        ← generic, goes to ui/
  ❌ features/numbers/search-bar.tsx    ← used elsewhere, goes to common/
```

### Layout Components (layout/)

```
RULES:
- Structural components (Header, Sidebar, Footer)
- CAN import from ui/, common/, @/shared
- CAN contain navigation logic
- SHOULD be relatively stable (don't change often)

EXAMPLES:
  ✅ layout/header/header.tsx
  ✅ layout/header/nav-links.tsx
  ✅ layout/header/user-menu.tsx
  ✅ layout/sidebar/sidebar.tsx
  ✅ layout/sidebar/sidebar-item.tsx
  ✅ layout/footer/footer.tsx
```

### When to Split a Component

```
SPLIT when:
  ✅ Component > 80 lines of JSX
  ✅ Component has 2+ distinct visual sections
  ✅ A section is reused elsewhere
  ✅ Component has complex internal state for ONE section
  ✅ Component mixes "use client" interactive parts with static parts
  ✅ You can name the extracted piece clearly

DON'T SPLIT when:
  ❌ Component is < 40 lines
  ❌ The extracted piece would have no clear name
  ❌ The extracted piece would need 5+ props passed down
  ❌ Splitting only for "looking clean" with no real benefit
  ❌ The pieces are ALWAYS used together and NEVER separately
```

### Splitting Example

**BEFORE (too big):**

```typescript
// ❌ BAD — 150+ lines, mixed concerns
export function NumberDetail({ number }: { number: PhoneNumber }) {
  return (
    <div>
      {/* 40 lines of header with image, title, badges */}
      {/* 30 lines of pricing section */}
      {/* 40 lines of specifications table */}
      {/* 30 lines of purchase form with payment */}
      {/* 20 lines of similar numbers suggestions */}
    </div>
  );
}
```

**AFTER (well split):**

```typescript
// ✅ GOOD — Each piece is focused

// features/numbers/number-detail.tsx (orchestrator)
export function NumberDetail({ number }: { number: PhoneNumber }) {
  return (
    <div className="space-y-8">
      <NumberDetailHeader number={number} />
      <NumberDetailPricing price={number.price} category={number.category} />
      <NumberDetailSpecs number={number} />
      <NumberPurchaseForm numberId={number.id} price={number.price} />
    </div>
  );
}

// features/numbers/number-detail-header.tsx
export function NumberDetailHeader({ number }: { number: PhoneNumber }) { ... }

// features/numbers/number-detail-pricing.tsx
export function NumberDetailPricing({ price, category }: { ... }) { ... }

// features/numbers/number-detail-specs.tsx
export function NumberDetailSpecs({ number }: { number: PhoneNumber }) { ... }

// features/numbers/number-purchase-form.tsx ← "use client" only here
("use client")
export function NumberPurchaseForm({ numberId, price }: { ... }) { ... }
```

---

