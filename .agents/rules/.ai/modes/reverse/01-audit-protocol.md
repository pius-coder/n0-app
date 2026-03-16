
# Reverse-Engineer Audit Protocol

## Phase 1: Structural Deconstruction

Read the entire HTML. Identify:

### A. Section Inventory
List every distinct visual section from top to bottom.
For each section note:
- Semantic role (hero, social proof, features, CTA, comparison, footer)
- Container width (full-bleed, max-width, narrow)
- Background treatment (color, gradient, image, transparent)
- Internal layout (centered text, 2-col, 3-col grid, asymmetric)

### B. Grid System
- What is the max container width?
- What breakpoints are used?
- What column patterns exist? (1-col mobile, 2-col tablet, 3-col desktop)
- What gap values are used between grid items?

### C. Nesting Depth
- How deep does the component nesting go?
- Where are the natural component boundaries?
- Which elements are repeated (cards, rows, badges)?

## Phase 2: Visual Token Extraction

### A. Typography Scale
Read every text element. Build a type scale:
| Level | HTML tag | Font size | Font weight | Color | Line height | Letter spacing | Usage |
|-------|---------|-----------|-------------|-------|-------------|----------------|-------|

### B. Color Palette
Extract every color used:
| Token name | Hex/class | Where used | Frequency |
|------------|-----------|------------|-----------|

### C. Spacing Scale
Identify the spacing rhythm:
| Token | Value (px/rem) | Where used |
|-------|----------------|------------|

### D. Border & Radius
| Element | Border | Radius | Shadow |
|---------|--------|--------|--------|

## Phase 3: Decorative Layer Analysis

### A. Decorative Elements
List every non-content visual element:
- Background blobs/gradients
- Floating badges/bubbles
- Glow effects
- Divider lines
- Decorative shapes
- Phone/device mockups
- Sprite sheets
- Animated elements

### B. For Each Decorative Element
- What CSS technique achieves this? (absolute positioning, pseudo-elements, keyframes, transforms)
- Can Tailwind handle it? Or does it need custom CSS?
- What are the exact values (positions, sizes, colors, timings)?

### C. Animation Inventory
| Element | Animation type | Duration | Easing | Trigger | Infinite? |
|---------|---------------|----------|--------|---------|-----------|

## Phase 4: Interaction Patterns

### A. Hover States
What changes on hover? (color, shadow, transform, opacity, border)

### B. Click/Toggle
Are there accordions, modals, tabs, expandable sections?

### C. Scroll Effects
Is there parallax, fade-in on scroll, sticky elements?

## Phase 5: Content Mapping

### A. Reference Content Inventory
List every piece of text content, its role, and where it appears.

### B. Content Translation
Map each reference content block to _n0 equivalent:
| Reference | _n0 Version | Data needed |
|-----------|-------------|-------------|