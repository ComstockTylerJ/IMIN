# Design System v2.1
**Stack:** React · shadcn/ui · Tailwind CSS · OKLCH design tokens
**Status:** v2.1 | June 2026 | Light + Dark mode | shadcn/ui token convention

---

## 1. System Overview

### Purpose

A single source of truth for all UI decisions. Every token, component, and pattern in this document is the final answer — not a suggestion. Claude and engineers reference this before generating or writing any interface code.

### Framework

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | React | Component architecture |
| Component library | shadcn/ui | Unstyled, composable primitives |
| Styling | Tailwind CSS v4 | Utility-first, token-aware |
| Token format | OKLCH | Perceptually uniform, wide-gamut ready |
| Dark mode | `.dark` class on `<html>` | Matches Tailwind `darkMode: "class"` |
| Global CSS | `globals.css` | All CSS custom properties defined here |

### Architecture

```
globals.css (OKLCH tokens)
    ↓
tailwind.config.ts (maps tokens to Tailwind classes)
    ↓
shadcn/ui primitives (use Tailwind classes: bg-primary, text-foreground, etc.)
    ↓
IMIN components (compose shadcn primitives + custom patterns)
    ↓
Pages / layouts
```

### Token naming convention

shadcn/ui names govern. IMIN extends with `--success`, `--warning`, `--info`, and chart tokens where shadcn has no equivalent. Backward-compat aliases (`--color-primary`, `--surface-base`, etc.) exist during migration but will be removed in v3.

### Naming Conventions

Component class names use BEM: `.block__element--modifier`. Token names use kebab-case. CSS custom properties use `--kebab-case`. Tailwind classes use the shadcn mapping: `bg-primary`, `text-primary-foreground`, `border-border`, etc.


---

### 1.4 Design Principles

Seven principles that govern decisions the system doesn't explicitly answer. When a choice isn't covered by a rule, apply the nearest principle.

1. **Clarity over density.** Show less when in doubt. Every additional element competes for attention. The user's cognitive load is the real constraint.
2. **Consistency over novelty.** Use an existing pattern before inventing a new one. A familiar interaction is faster than a clever one.
3. **Accessibility by default.** WCAG AA is a floor, not a goal. Build for keyboard, screen reader, and high contrast from the start — retrofitting is always harder.
4. **One obvious action per context.** Every view has one primary action. If two actions feel equally important, one of them isn't the primary yet.
5. **Progressive disclosure.** Show what's needed now. Reveal complexity on demand. Never make the simple case harder to serve the advanced case.
6. **Every action has feedback.** The system always responds — loading, success, or error. Silent failures are not acceptable.
7. **Prevent errors before recovering from them.** Constrain inputs, confirm destructive actions, validate inline. Recovery is always more expensive than prevention.

---

## 2. Design Tokens

### 2.1 Colors

#### Base tokens

#### SCSS Variables
```scss
// Brand
$color-primary:        #1D3557;
$color-primary-hover:  #162840;
$color-primary-active: #0f1e30;
$color-accent:         #0073E6;
$color-accent-hover:   #005DC0;
$color-accent-subtle:  #EBF4FF;

// Semantic
$color-success:        #16A34A;
$color-success-subtle: #F0FDF4;
$color-info:           #0EA5E9;
$color-info-subtle:    #F0F9FF;
$color-warning:        #EABA1C;
$color-warning-subtle: #FFFBEB;
$color-danger:         #DC2626;
$color-danger-subtle:  #FEF2F2;
$color-disabled:       #CBD5E1;

// Text
$text-primary:   #24272D;
$text-secondary: #475569;
$text-tertiary:  #64748B;  // corrected v2.1 — was #94A3B8 (2.48:1, WCAG fail)
$text-inverse:   #FFFFFF;
$text-accent:    #0073E6;
$text-danger:    #DC2626;
$text-success:   #16A34A;
$text-warning:   #92600A;

// Neutral Scale
$neutral-0:   #FFFFFF;   $neutral-50:  #F8FAFC;  $neutral-100: #F1F5F9;
$neutral-200: #E2E8F0;   $neutral-300: #CBD5E1;  $neutral-400: #94A3B8;
$neutral-500: #64748B;   $neutral-600: #475569;  $neutral-700: #334155;
$neutral-800: #1E293B;   $neutral-900: #0F172A;  $neutral-950: #020617;

// Surface & Border
$surface-page:    #F8FAFC;
$surface-base:    #FFFFFF;
$surface-subtle:  #F1F5F9;
$border-default:  #E2E8F0;
$border-strong:   #CBD5E1;
```

#### globals.css — shadcn/ui OKLCH token convention

This is the authoritative token file. All values use OKLCH. Source hex values are kept as comments for design tool reference.

```css
:root {
  /* ── shadcn/ui Core Tokens ───────────────────────────────── */
  --background:             oklch(0.984 0.004 248.6);  /* #F8FAFC */
  --foreground:             oklch(0.272 0.012 264.4);  /* #24272D */

  --card:                   oklch(1.000 0.000 271.2);  /* #FFFFFF */
  --card-foreground:        oklch(0.272 0.012 264.4);

  --popover:                oklch(1.000 0.000 271.2);
  --popover-foreground:     oklch(0.272 0.012 264.4);

  --primary:                oklch(0.328 0.068 257.3);  /* #1D3557 */
  --primary-foreground:     oklch(1.000 0.000 271.2);  /* #FFFFFF */

  --secondary:              oklch(0.968 0.007 248.3);  /* #F1F5F9 */
  --secondary-foreground:   oklch(0.446 0.037 257.3);  /* #475569 */

  --muted:                  oklch(0.968 0.007 248.3);
  --muted-foreground:       oklch(0.554 0.041 257.4);  /* #64748B */

  --accent:                 oklch(0.569 0.195 256.1);  /* #0073E6 */
  --accent-foreground:      oklch(1.000 0.000 271.2);

  --destructive:            oklch(0.577 0.215 27.3);   /* #DC2626 */
  --destructive-foreground: oklch(1.000 0.000 271.2);

  --border:                 oklch(0.929 0.013 255.6);  /* #E2E8F0 */
  --input:                  oklch(0.929 0.013 255.6);
  --ring:                   oklch(0.569 0.195 256.1);  /* #0073E6 — focus rings */
  --radius:                 0.5rem;

  /* ── IMIN Extensions (no shadcn equivalent) ─────────────── */
  --success:                oklch(0.627 0.170 149.2);  /* #16A34A */
  --success-foreground:     oklch(1.000 0.000 271.2);
  --warning:                oklch(0.809 0.160 89.2);   /* #EABA1C */
  --warning-foreground:     oklch(0.328 0.068 257.3);  /* dark text for contrast */
  --info:                   oklch(0.685 0.148 237.3);  /* #0EA5E9 */
  --info-foreground:        oklch(1.000 0.000 271.2);

  /* Subtle fills — callouts, row highlights, badge backgrounds */
  --accent-subtle:          oklch(0.964 0.017 250);    /* #EBF4FF (corrected) */
  --success-subtle:         oklch(0.971 0.029 149.2);  /* #F0FDF4 */
  --warning-subtle:         oklch(0.987 0.030 89.2);   /* #FFFBEB */
  --destructive-subtle:     oklch(0.981 0.025 27.3);   /* #FEF2F2 */
  --info-subtle:            oklch(0.971 0.030 237.3);  /* #F0F9FF */

  /* Chart tokens — distinct categorical palette. Per §11.1 these never reuse
     brand/semantic colors; a series in --accent would read as interactive. */
  --chart-1: #3B82F6;  /* blue — distinct from --accent (#0073E6) */
  --chart-2: #10B981;  /* emerald */
  --chart-3: #F59E0B;  /* amber   */
  --chart-4: #EF4444;  /* red     */
  --chart-5: #8B5CF6;  /* purple  */

  /* Neutral scale — exposed as runtime CSS vars so components that need a raw
     neutral (tooltip surface, dividers) can use var(--neutral-*). Absolute. */
  --neutral-0:#FFFFFF; --neutral-50:#F8FAFC; --neutral-100:#F1F5F9; --neutral-200:#E2E8F0;
  --neutral-300:#CBD5E1; --neutral-400:#94A3B8; --neutral-500:#64748B; --neutral-600:#475569;
  --neutral-700:#334155; --neutral-800:#1E293B; --neutral-900:#0F172A; --neutral-950:#020617;
}

/* Dark mode — .dark class on <html>
   Matches Tailwind darkMode: "class" and shadcn/ui convention */
.dark {
  --background:             oklch(0.180 0.032 266.6);  /* #0B1120 */
  --foreground:             oklch(0.968 0.007 248.3);  /* #F1F5F9 */

  --card:                   oklch(0.279 0.037 260.0);  /* #1E293B */
  --card-foreground:        oklch(0.968 0.007 248.3);

  --popover:                oklch(0.279 0.037 260.0);
  --popover-foreground:     oklch(0.968 0.007 248.3);

  --primary:                oklch(0.809 0.096 251.8);  /* #93C5FD — 8.11:1 AAA */
  --primary-foreground:     oklch(0.208 0.040 265.8);  /* #0F172A — dark text  */

  --secondary:              oklch(0.334 0.044 257.9);  /* #28374D */
  --secondary-foreground:   oklch(0.711 0.035 256.8);  /* #94A3B8 */

  --muted:                  oklch(0.308 0.040 260.4);  /* #243044 */
  --muted-foreground:       oklch(0.554 0.041 257.4);

  --accent:                 oklch(0.714 0.143 254.6);  /* #60A5FA — 5.75:1 AA */
  --accent-foreground:      oklch(0.208 0.040 265.8);

  --destructive:            oklch(0.637 0.208 25.3);   /* #EF4444 */
  --destructive-foreground: oklch(1.000 0.000 271.2);

  --border:                 oklch(0.372 0.039 257.3);  /* #334155 */
  --input:                  oklch(0.372 0.039 257.3);
  --ring:                   oklch(0.714 0.143 254.6);  /* #60A5FA */

  /* IMIN extensions — dark */
  --success:            oklch(0.627 0.170 149.2);
  --success-foreground: oklch(1.000 0.000 271.2);
  --warning:            oklch(0.809 0.160 89.2);
  --warning-foreground: oklch(0.208 0.040 265.8);
  --info:               oklch(0.685 0.148 237.3);
  --info-foreground:    oklch(0.208 0.040 265.8);

  /* Subtle fills — low-opacity tints on dark surfaces */
  --accent-subtle:      rgba(0, 115, 230, 0.18);
  --success-subtle:     rgba(16, 185, 129, 0.14);
  --warning-subtle:     rgba(234, 186, 28, 0.14);
  --destructive-subtle: rgba(220, 38, 38, 0.14);
  --info-subtle:        rgba(14, 165, 233, 0.14);
}
```

**Tailwind config mapping** (`tailwind.config.ts`):

```ts
theme: {
  extend: {
    colors: {
      background:  'oklch(var(--background) / <alpha-value>)',
      foreground:  'oklch(var(--foreground) / <alpha-value>)',
      primary: {
        DEFAULT:    'oklch(var(--primary) / <alpha-value>)',
        foreground: 'oklch(var(--primary-foreground) / <alpha-value>)',
      },
      secondary: {
        DEFAULT:    'oklch(var(--secondary) / <alpha-value>)',
        foreground: 'oklch(var(--secondary-foreground) / <alpha-value>)',
      },
      muted: {
        DEFAULT:    'oklch(var(--muted) / <alpha-value>)',
        foreground: 'oklch(var(--muted-foreground) / <alpha-value>)',
      },
      accent: {
        DEFAULT:    'oklch(var(--accent) / <alpha-value>)',
        foreground: 'oklch(var(--accent-foreground) / <alpha-value>)',
      },
      destructive: {
        DEFAULT:    'oklch(var(--destructive) / <alpha-value>)',
        foreground: 'oklch(var(--destructive-foreground) / <alpha-value>)',
      },
      border:  'oklch(var(--border) / <alpha-value>)',
      input:   'oklch(var(--input) / <alpha-value>)',
      ring:    'oklch(var(--ring) / <alpha-value>)',
      card: {
        DEFAULT:    'oklch(var(--card) / <alpha-value>)',
        foreground: 'oklch(var(--card-foreground) / <alpha-value>)',
      },
      // IMIN extensions
      success: {
        DEFAULT:    'oklch(var(--success) / <alpha-value>)',
        foreground: 'oklch(var(--success-foreground) / <alpha-value>)',
      },
      warning: {
        DEFAULT:    'oklch(var(--warning) / <alpha-value>)',
        foreground: 'oklch(var(--warning-foreground) / <alpha-value>)',
      },
      info: {
        DEFAULT:    'oklch(var(--info) / <alpha-value>)',
        foreground: 'oklch(var(--info-foreground) / <alpha-value>)',
      },
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
  },
},
```

**Claude Rule:** Never use hex values in component code. Always reference a token — either the shadcn name via Tailwind class (`bg-primary`, `text-muted-foreground`) or via CSS custom property (`var(--primary)`, `var(--border)`).

---

#### Semantic alias token layer

A three-tier token architecture. Changing a base token propagates everywhere. Changing an alias token affects only that semantic role — enabling independent theming of buttons, navigation, and focus states without touching the base palette.

| Alias token | Maps to | Used by |
|-------------|---------|---------|
| `--action-primary-bg` | `--color-primary` | Primary buttons |
| `--action-primary-text` | `#ffffff` | Primary button labels |
| `--action-danger-bg` | `--color-danger` | Danger buttons |
| `--interactive-default` | `--color-accent` | Link text, icon buttons |
| `--interactive-focus` | `--color-accent` | Focus rings (all components) |
| `--interactive-selected-bg` | `--color-accent-subtle` | Selected rows, active pills |
| `--interactive-selected-text` | `--color-accent` | Selected item labels |
| `--nav-active-indicator` | `--color-accent` | Nav item left border / underline |
| `--nav-active-bg` | `--color-accent-subtle` | Nav item active background |
| `--nav-active-text` | `--color-accent` | Nav item active text |
| `--form-focus-ring` | `--color-accent` | Input/select focus outline |
| `--form-error` | `--color-danger` | Error state color |
| `--form-success` | `--color-success` | Success state color |
| `--form-label-color` | `--text-primary` | Form label text (14px) |
| `--surface-overlay` | `rgba(15,23,42,.5)` | Modal / drawer scrim |

**Claude Rules for alias tokens:**
- Always use alias tokens in component CSS — never raw base tokens for role-specific properties
- Example: focus rings always use `var(--form-focus-ring)` not `var(--color-accent)` directly
- This makes it possible to change focus ring colour system-wide in one line

---

### 2.2 Typography

**Font:** Inter (Google Fonts) · Weights 100–900
**Mono:** JetBrains Mono

```scss
$font-sans: 'Inter', system-ui, -apple-system, sans-serif;
$font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

#### Semantic Type Roles *(use in all new code)*

Six roles covering every text context in the product. Engineers reference what the text **is**, not what size it happens to be.

| Role | Class | Size | Weight | Line-height | Use |
|------|-------|------|--------|-------------|-----|
| Display | `.t-display` | 28px | 700 | 1.2 | Page H1 titles |
| Title | `.t-title` | 20px | 600 | 1.3 | Sections, panels, card headings |
| Body | `.t-body` | 14px | 400 | 1.6 | Default prose, **form labels** |
| Body Small | `.t-body-small` | 13px | 400 | 1.5 | Tables, supporting copy |
| Label | `.t-label` | 12px | 500 | 1.4 | Badges, metadata, timestamps |
| Caption | `.t-caption` | 11px | 400 | 1.4 | Helper text, footnotes |

**Form label rule:** Form labels always use `.t-body` (14px) — never `.t-label` (12px). Enterprise users spend their working lives in forms. 14px labels improve scannability and pass WCAG 1.4.4 at 200% zoom.

**Claude Rules for Typography:**
- New page-level markup always uses semantic role classes (`.t-*`)
- Size utilities (`.text-xl`, `.text-base`, etc.) are implementation internals — do not use in new page code
- Never go below `.t-caption` (11px) for any readable text — decorative use only below this size
- Letter-spacing for uppercase labels: add `.tracking-wide` alongside `.t-label`

#### Size utilities *(internal / legacy — do not use in new page markup)*

| Class | Size | Weight | Use |
|-------|------|--------|-----|
| `.text-hero`  | 58px | 800 | Hero headings only |
| `.text-4xl`   | 40px | 700 | Display headings |
| `.text-3xl`   | 32px | 700 | Page H1 |
| `.text-2xl`   | 24px | 600 | Section H2 |
| `.text-xl`    | 20px | 600 | Section H3 |
| `.text-lg`    | 16px | 400 | Body large |
| `.text-md`    | 15px | 400 | Body default |
| `.text-base`  | 14px | 400 | Body compact |
| `.text-sm`    | 13px | 400 | Supporting text |
| `.text-xs`    | 12px | 400 | Meta, captions |
| `.text-label` | 11px | 600 | Uppercase labels |
| `.text-mono`  | 13px | 400 | Code, tokens |

---

### 2.3 Spacing

**System:** 8-point grid. All values are multiples of 4px.

```scss
$spacing: (0: 0, 1: 4px, 2: 8px, 3: 12px, 4: 16px,
           6: 24px, 8: 32px, 10: 40px, 12: 48px,
           14: 56px, 16: 64px, 18: 72px, 20: 80px, 24: 96px);
```

Utility classes auto-generated: `.p-{n}`, `.px-{n}`, `.py-{n}`, `.pt-{n}`, `.pr-{n}`, `.pb-{n}`, `.pl-{n}`, `.m-{n}`, `.mx-{n}`, `.my-{n}`, `.mt-{n}`, `.mr-{n}`, `.mb-{n}`, `.ml-{n}`, `.gap-{n}`

**Claude Rule:** All padding, margin, and gap values must use spacing utilities. Never write `padding: 15px` or `margin: 20px`.

---

### 2.4 Border Radius

| SCSS Variable | Value | Class | Use |
|---------------|-------|-------|-----|
| `$radius-sm`  | 4px   | `.rounded-sm`  | Badges, sm buttons |
| `$radius-md`  | 6px   | `.rounded-md`  | Buttons, inputs |
| `$radius-lg`  | 9px   | `.rounded-lg`  | Avatars, logos |
| `$radius-xl`  | 12px  | `.rounded-xl`  | Cards, modals |
| `$radius-pill`| 9999px| `.rounded-full`| Chips, toggles |

---

### 2.5 Elevation

| SCSS Variable | Value | Class | Use |
|---------------|-------|-------|-----|
| `$shadow-sm`  | `0 1px 2px rgba(15,23,42,.06)` | `.shadow-sm` | Cards, inputs default |
| `$shadow-md`  | `0 4px 12px rgba(15,23,42,.10)` | `.shadow-md` | Hover, dropdowns |
| `$shadow-lg`  | `0 12px 24px rgba(15,23,42,.14)` | `.shadow-lg` | Modals, drawers |

---

### 2.6 Motion

```scss
$duration-fast: 120ms;
$duration-base: 180ms;
$duration-slow: 240ms;
$ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
```

**Permitted:** `opacity`, `box-shadow`, `border-color`, `background-color`, `transform: translateY/translateX`
**Never:** bounce, elastic, parallax, decorative animation

```scss
// Required in all stylesheets:
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: 0.01ms !important; }
}
```

---

### 2.7 Formatting Conventions

> **For Claude and engineers:** These are not suggestions. Inconsistent formatting within a single screen is a bug. Apply these rules to every value rendered in the UI.

#### Numbers

| Value type | Correct | Never |
|------------|---------|-------|
| Integer | 1,284 | 1284 · 1.284 |
| Currency (table cell) | $48,291 | $48.3K · $48k · 48,291 |
| Currency (KPI/summary) | $48.3K (above $10K only) | $48291 · 48.3k |
| Currency (above 1M) | $1.2M | $1,200,000 in a KPI |
| Percentage | 12.4% | 12.40% · 12% (when decimal matters) · .124 |
| Large integers | 1,284,000 | 1.28M (below 1B in tables) |
| Zero | 0 | 0.0 · — · blank |

**Claude Rule:** Currency in data tables is always full precision with commas. Abbreviations are only acceptable in KPI stat cards and above $10,000. Never mix abbreviated and full precision in the same table.

#### Dates and Times

| Context | Format | Example |
|---------|--------|---------|
| Within last 60 minutes | X min ago | 14 min ago |
| Within last 24 hours | Xh ago | 3h ago |
| Same calendar year | Mon D | Jun 12 |
| Prior calendar year | Mon D, YYYY | Jun 12, 2025 |
| Full precision needed | Mon D, YYYY at H:MM AM/PM | Jun 12, 2025 at 2:34 PM |
| Date input fields | YYYY-MM-DD placeholder | 2026-06-12 |
| Date ranges | Mon D – Mon D, YYYY | Jun 1 – Jun 12, 2026 |

**Claude Rule:** Never mix relative ("3h ago") and absolute ("Jun 12") date formats within the same list, table, or card group. Choose one format per context and apply it to every item.

#### Empty and Null Values

| Context | Display | Never use |
|---------|---------|-----------|
| Table cell — no data | — (em dash, `&mdash;`) | blank · N/A · null · — · undefined |
| Table cell — zero value | 0 | — · blank |
| Optional field not completed | — | blank · N/A |
| Value is unknown/unavailable | — | ? · unknown · N/A · TBD |
| Field the user hasn't filled yet | (placeholder text) | — |

**Claude Rule:** Every empty table cell renders an em dash (—). A blank cell is always a rendering error, not a design decision. Zero and null are different — zero displays as `0`, null displays as `—`.

#### Text Truncation

| Context | Rule |
|---------|------|
| Table name/title column | Truncate with ellipsis at column edge. Full value in `title` attribute tooltip. |
| Badge or chip label | Never truncate. Shorten the label text itself instead. |
| Page title (`<h1>`) | Never truncate under any circumstances. |
| Breadcrumb | Truncate middle segments only. First and last segment always visible. |
| Sidebar nav item | Truncate at 180px. Full label in tooltip. |
| Card title | Two-line clamp maximum. Never single-line truncate. |
| Stat card value | Never truncate a number. Abbreviate it (see Numbers above). |

**Claude Rule:** Truncation in a table cell always requires a `title` attribute containing the full untruncated value. This is both an accessibility requirement and a usability requirement.

---

## 3. Utility Class System

> Generated from token maps in `_design-system.scss`. Use these to compose layouts.

### Layout
```
.flex           display: flex
.flex-col       flex-direction: column
.flex-row       flex-direction: row
.flex-wrap      flex-wrap: wrap
.flex-1         flex: 1 1 0%
.flex-none      flex: none
.flex-shrink-0  flex-shrink: 0
.items-start    align-items: flex-start
.items-center   align-items: center
.items-end      align-items: flex-end
.items-baseline align-items: baseline
.items-stretch  align-items: stretch
.justify-start  justify-content: flex-start
.justify-center justify-content: center
.justify-end    justify-content: flex-end
.justify-between justify-content: space-between
.justify-around  justify-content: space-around
.grid            display: grid
.grid-cols-1 … .grid-cols-12   grid-template-columns: repeat(N, 1fr)
.col-span-1 … .col-span-12
.block           display: block
.inline-block    display: inline-block
.inline          display: inline
.hidden          display: none
.w-full          width: 100%
.w-auto          width: auto
.h-full          height: 100%
.h-screen        height: 100vh
.min-w-0         min-width: 0
.min-h-0         min-height: 0
.overflow-hidden overflow: hidden
.overflow-auto   overflow: auto
.overflow-x-auto overflow-x: auto
.truncate        overflow: hidden; text-overflow: ellipsis; white-space: nowrap
.relative        position: relative
.absolute        position: absolute
.fixed           position: fixed
.sticky          position: sticky
.inset-0         inset: 0
.top-0 .right-0 .bottom-0 .left-0
.z-0 .z-10 .z-20 .z-50 .z-100 .z-modal(1000) .z-overlay(999)
```

### Typography
```
.font-thin(100) .font-light(300) .font-normal(400) .font-medium(500)
.font-semibold(600) .font-bold(700) .font-extrabold(800)
.leading-tight(1.1) .leading-snug(1.3) .leading-normal(1.5)
.leading-relaxed(1.6) .leading-loose(1.7)
.tracking-tight(-0.025em) .tracking-normal(0) .tracking-wide(0.05em)
.tracking-wider(0.07em) .tracking-widest(0.1em)
.uppercase .lowercase .capitalize .normal-case
.text-left .text-center .text-right
.whitespace-nowrap .break-words
.italic .not-italic
.underline .no-underline
```

### Colors
```
.text-primary .text-secondary .text-tertiary .text-inverse
.text-accent .text-success .text-warning .text-danger
.bg-white .bg-surface .bg-subtle
.bg-accent-subtle .bg-success-subtle .bg-warning-subtle
.bg-danger-subtle .bg-info-subtle
.bg-primary(#1D3557) .bg-accent(#0073E6)
.border-default .border-strong .border-accent .border-danger .border-success
```

### Spacing Reference (`.p-*`, `.m-*`, `.gap-*`)
`1=4px · 2=8px · 3=12px · 4=16px · 6=24px · 8=32px · 10=40px · 12=48px · 16=64px · 24=96px`

---

## 4. Component Reference

### 4.0 Component State Reference

Every interactive component must implement the states relevant to it. This table defines which states apply to each component and what they look like.

#### Universal state definitions

| State | Trigger | Visual treatment |
|-------|---------|-----------------|
| **Default** | Initial render | Base styles — no modifier |
| **Hover** | Mouse over | Subtle background shift — `surface-subtle` or `border-strong` |
| **Focus** | Keyboard focus | 2px `$color-accent` outline, 2px offset — never removed |
| **Active / Pressed** | Mouse down or touch | Darker background — same hue, 10–15% darker |
| **Selected** | User chose this item | Accent fill, check indicator, or `aria-selected="true"` |
| **Disabled** | `disabled` attr or `[aria-disabled]` | 40% opacity, `cursor: not-allowed`, no hover/focus styles |
| **Read-only** | `readonly` attr | No border, no hover, `cursor: default` — visually inert but still focusable |
| **Loading** | Async operation in progress | Spinner or skeleton, `aria-busy="true"` on container |
| **Error** | Validation failure | `$color-danger` border and icon, error message below |
| **Success** | Validation pass | `$color-success` border and icon — use sparingly |

#### State applicability matrix

✓ = required  ·  — = not applicable  ·  ○ = optional

| Component | Default | Hover | Focus | Active | Selected | Disabled | Read-only | Loading | Error | Success |
|-----------|:-------:|:-----:|:-----:|:------:|:--------:|:--------:|:---------:|:-------:|:-----:|:-------:|
| Button | ✓ | ✓ | ✓ | ✓ | — | ✓ | — | ✓ | — | — |
| Text input | ✓ | ✓ | ✓ | — | — | ✓ | ✓ | ○ | ✓ | ✓ |
| Select | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ | — |
| Checkbox | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ | — |
| Radio | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ | — |
| Toggle / Switch | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — | — |
| Data table row | ✓ | ✓ | ✓ | — | ✓ | — | — | — | — | — |
| Nav item | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — | — | — |
| Card (interactive) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ | — | — |
| Dropdown item | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — | — |
| Tab item | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — | — |
| Badge | ✓ | — | — | — | — | — | — | — | — | — |
| Collection card | ✓ | ✓ | ✓ | ✓ | — | — | — | ✓ | — | — |

**Claude Rules for States:**
- Disabled elements must use `disabled` attribute or `aria-disabled="true"` — never fake disabled with CSS only
- Focus style must always be visible — `outline: none` without a replacement is a hard rule violation
- Error state always pairs color with an icon and text — never color alone
- Loading state requires `aria-busy="true"` on the loading container
- Read-only inputs remain focusable — they are not disabled

---

### 4.1 Buttons

**Class pattern:** `.btn .btn--[variant] .btn--[size]`

#### Variants
| Class | Background | Text | Use |
|-------|-----------|------|-----|
| `.btn--primary`   | `$color-primary` (#1D3557) | white | Main CTA — one per section |
| `.btn--secondary` | white | `$text-primary` | Secondary action |
| `.btn--outline`   | transparent | `$color-primary` | Tertiary |
| `.btn--ghost`     | transparent | `$text-secondary` | Toolbar, low-priority |
| `.btn--danger`    | `$color-danger` | white | Destructive actions only |
| `.btn--link`      | transparent | `$color-accent` | Inline navigation |

#### Sizes
| Class | Height | Radius | Font |
|-------|--------|--------|------|
| `.btn--sm` | 28px | 4px | 12px |
| `.btn`     | 36px | 6px | 14px |
| `.btn--lg` | 42px | 6px | 14px |

#### HTML Pattern
```jsx
{/* Default primary */}
<button type="button" className="btn btn--primary">Save changes</button>

{/* Small with icon */}
<button type="button" className="btn btn--secondary btn--sm">
  <svg aria-hidden="true">...</svg>
  Export
</button>

{/* Icon-only ghost */}
<button type="button" className="btn btn--ghost btn--icon" aria-label="More options">
  <svg aria-hidden="true">...</svg>
</button>

{/* Loading */}
<button type="button" className="btn btn--primary is-loading" aria-busy="true">
  <span className="btn__spinner" aria-hidden="true"></span>
  Saving…
</button>
```

**Claude Rules for Buttons:**
- `$color-accent` is NEVER a button background — only `$color-primary` or white
- Only one `.btn--primary` per visible screen section
- Always `type="button"` unless inside a `<form>` for submission
- Disabled via `disabled` attribute — never just `pointer-events: none`
- Loading state uses `.is-loading` class + `aria-busy="true"`

---

### 4.2 Badges

**Class pattern:** `.badge .badge--[variant] (.badge--pill)`

```jsx
<span className="badge badge--success">Active</span>
<span className="badge badge--pill badge--warning">Pending</span>
<span className="badge badge--danger">Error</span>
```

| Class | Background | Text |
|-------|-----------|------|
| `.badge--neutral` | `$neutral-100` | `$neutral-700` |
| `.badge--primary` | `$color-accent-subtle` | `$color-accent` |
| `.badge--success` | `$color-success-subtle` | `$color-success` |
| `.badge--info`    | `$color-info-subtle` | `$color-info` |
| `.badge--warning` | `$color-warning-subtle` | `$text-warning` |
| `.badge--danger`  | `$color-danger-subtle` | `$color-danger` |

---

### 4.2a Avatars

**Two color states only.** Color is not used to distinguish between different people — it is used to distinguish the current authenticated user from everyone else.

| State | Class | Background | Text | When |
|-------|-------|-----------|------|------|
| Other users | `.avatar` (default) | `$neutral-200` (#E2E8F0) | `$neutral-700` (#334155) | Any user that is not the current user |
| Current user | `.avatar--current` | `$color-accent` (#0073E6) | white | The authenticated user — their own avatar only |

```jsx
{/* Current authenticated user */}
<div className="avatar avatar--current">JD</div>

{/* Any other user */}
<div className="avatar">MC</div>

{/* Avatar group — current user gets --current, others stay default */}
<div className="avatar-group">
  <div className="avatar avatar--current">JD</div>
  <div className="avatar">MC</div>
  <div className="avatar">SW</div>
  <div className="avatar">+3</div>
</div>
```

**Sizes:** `avatar--sm` (24px) · default (32px) · `avatar--lg` (40px) · `avatar--xl` (56px)

**Claude Rules for Avatars:**
- Never use inline `style="background:..."` on an avatar
- Never vary colors between different "other" users — everyone except the current user is gray
- `.avatar--current` is for the authenticated user only — never apply it to other people's avatars
- Avatar groups always show `.avatar--current` first if the current user is in the group

---

### 4.3 Forms

#### Field Pattern
```jsx
<div className="field">
  <label className="field__label" htmlFor="id">Label <span className="field__required">*</span></label>
  <input className="input" type="text" id="id" placeholder="Placeholder" />
  <span className="field__hint">Helper text</span>
</div>

{/* Error state */}
<div className="field field--error">
  <label className="field__label" htmlFor="id-err">Email</label>
  <input className="input input--error" type="email" id="id-err"
         aria-invalid="true" aria-describedby="id-err-msg" />
  <span className="field__error" id="id-err-msg" role="alert">
    Enter a valid email address
  </span>
</div>
```

#### Input Heights (aligned to buttons)
| Class | Height |
|-------|--------|
| `.input--sm` | 28px |
| `.input` | 36px |
| `.input--lg` | 42px |

#### Controls
```jsx
{/* Select */}
<div className="select-wrap">
  <select className="select">...</select>
</div>

{/* Checkbox */}
<label className="checkbox-wrap">
  <input type="checkbox" className="checkbox" />
  <span className="checkbox__label">Option label</span>
</label>

{/* Radio */}
<label className="radio-wrap">
  <input type="radio" className="radio" name="group" />
  <span className="radio__label">Option label</span>
</label>

{/* Switch */}
<label className="switch-wrap">
  <div className="switch">
    <input type="checkbox" />
    <div className="switch__track"></div>
    <div className="switch__thumb"></div>
  </div>
  <span className="switch__label">Enable notifications</span>
</label>
```

**Claude Rules for Forms:**
- Labels always ABOVE controls — never inline or placeholder-as-label
- Error messages always below field with `role="alert"`
- All inputs require visible `<label>` with matching `for`/`id`
- Use `aria-describedby` to link hint/error text to input

#### Validation Timing Rules

These rules are mandatory. Two engineers implementing the same form must produce identical validation behaviour.

| Trigger | Action | Rationale |
|---------|--------|-----------|
| User types in field | No validation | Premature errors during input are hostile |
| User leaves field (blur) | Validate that field only | First opportunity to check without interrupting |
| User corrects a field that had an error | Clear error on next `input` event | Immediate positive feedback on correction |
| User submits form | Validate all fields simultaneously | One complete pass, all errors visible at once |
| 3+ fields fail on submit | Show form-level error summary above submit button | Helps user locate all errors before scrolling |
| Async check (username taken, email exists) | Fire on blur, 300ms debounce | Avoids hammering the server on every keystroke |

**The single most important rule:** Never validate on `change` or `input` for text fields. Always validate on `blur`. This is the rule most frequently violated by AI-generated forms and the one that most damages trust with professional users.

```jsx
{/* Correct: error shown after blur, cleared after correction */}
<div className={`field ${emailError ? 'field--error' : ''}`}>
  <label className="field__label" htmlFor="email">Email *</label>
  <input
    className="input"
    type="email"
    id="email"
    onBlur={validateEmail}
    onInput={clearEmailError}
    aria-invalid={emailError ? 'true' : undefined}
    aria-describedby="email-error"
  />
  {emailError && (
    <span className="field__error" id="email-error" role="alert">
      {emailError}
    </span>
  )}
</div>

{/* Form-level summary (appears on submit when 3+ errors) */}
{submitErrors.length >= 3 && (
  <div className="callout callout--danger" role="alert">
    <svg className="callout__icon" aria-hidden="true"><use href="#icon-alert-circle" /></svg>
    <div className="callout__body">
      <strong className="callout__title">{submitErrors.length} errors need your attention</strong>
      <ul style={{ margin: '6px 0 0', paddingLeft: 16, fontSize: 13 }}>
        {submitErrors.map((err) => (
          <li key={err.label}>{err.label}: {err.message}</li>
        ))}
      </ul>
    </div>
  </div>
)}
```

---

### 4.4 Cards

```jsx
{/* Standard card */}
<div className="card">
  <div className="card__header">
    <div className="card__logo">...</div>
    <div>
      <div className="card__title">Card Title</div>
      <div className="card__subtitle">Supporting text</div>
    </div>
  </div>
  <div className="card__body">Content</div>
  <div className="card__footer">
    <span className="card__meta">Meta info</span>
    <span className="badge badge--success">Active</span>
  </div>
</div>

{/* Clickable card */}
<div className="card card--clickable" tabIndex="0" role="article">...</div>

{/* Card grid */}
<div className="card-grid">
  <div className="card">...</div>
</div>
```

```scss
// Card grid uses:
grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
gap: 16px;
// Card: padding 17px 18px 16px · min-height 168px · radius 12px
// Logo: 38×38px · radius 9px
// Hover (clickable): translateY(-2px) · shadow-md · border-strong
```

---

### 4.5 Data Table 

The primary data display component. Used for all list/tabular data.

```jsx
<div className="data-table-wrap">
  {/* Optional header */}
  <div className="data-table-head">
    <h3 className="data-table-head__title">Users</h3>
    <div className="data-table-head__actions">
      <button className="btn btn--secondary btn--sm">Export</button>
      <button className="btn btn--primary btn--sm">+ Add user</button>
    </div>
  </div>

  {/* Scrollable table */}
  <div className="table-scroll">
    <table className="data-table">
      <thead>
        <tr>
          <th className="col-check">
            <input type="checkbox" aria-label="Select all" />
          </th>
          <th className="col-sortable" aria-sort="ascending">
            Name
            <svg className="sort-icon" aria-hidden="true">...</svg>
          </th>
          <th>Status</th>
          <th>Role</th>
          <th className="col-num">Revenue</th>
          <th className="col-date">Joined</th>
          <th className="col-action"><span className="sr-only">Actions</span></th>
        </tr>
      </thead>
      <tbody>
        <tr className="row--selected">
          <td><input type="checkbox" defaultChecked /></td>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">JD</div>
              <div>
                <div className="font-medium text-base">Jane Doe</div>
                <div className="text-xs text-secondary">jane@example.com</div>
              </div>
            </div>
          </td>
          <td><span className="badge badge--success">Active</span></td>
          <td className="text-secondary text-sm">Admin</td>
          <td className="col-num font-medium">$12,840</td>
          <td className="col-date text-secondary text-sm">Jan 12, 2026</td>
          <td className="col-action">
            <div className="flex gap-1">
              <button className="btn btn--ghost btn--sm btn--icon" aria-label="Edit Jane Doe">
                <svg aria-hidden="true">...</svg>
              </button>
              <button className="btn btn--ghost btn--sm btn--icon" aria-label="More options">
                <svg aria-hidden="true">...</svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  {/* Footer with count + pagination */}
  <div className="data-table-foot">
    <span className="table-count">Showing 1–20 of 143 results</span>
    <nav className="pagination" aria-label="Table pagination">
      <button className="pagination__btn" aria-label="Previous page" disabled>‹</button>
      <button className="pagination__btn pagination__btn--active" aria-current="page">1</button>
      <button className="pagination__btn">2</button>
      <button className="pagination__btn">3</button>
      <span className="pagination__ellipsis">…</span>
      <button className="pagination__btn">8</button>
      <button className="pagination__btn" aria-label="Next page">›</button>
    </nav>
  </div>
</div>
```

**Table column classes:**
- `.col-check` — 40px, checkbox column
- `.col-sortable` — has sort icon, cursor pointer
- `.col-num` — right-aligned, tabular figures
- `.col-date` — right-aligned, nowrap
- `.col-action` — right-aligned, action buttons

**Row states:**
- `.row--selected` — light blue background, checked checkbox
- `.row--hover` — applied on hover via CSS
- `.row--disabled` — muted text, no interactions

**Claude Rules for Data Tables:**
- Every table must have a `<thead>` with descriptive `<th>` elements
- Action columns always use `<span className="sr-only">` for accessibility
- Sortable columns use `aria-sort` attribute
- Always wrap in `.table-scroll` for horizontal scrolling
- Pagination always includes `aria-label`
- Numeric columns use `.col-num` class for right-alignment
#### Sorting

- Click a sortable column header to sort ascending (`aria-sort="ascending"`)
- Click again to sort descending (`aria-sort="descending"`)
- Click a third time to clear the sort (`aria-sort="none"`)
- Only one column sorted at a time
- Sorted column header shows a directional chevron at full opacity; unsorted sortable columns show the chevron at 30% on hover only
- `.col-sortable` marks a column as sortable; add `aria-sort` attribute to reflect current state

#### Row Selection

```jsx
{/* Header: select-all checkbox */}
<th className="col-check">
  <input type="checkbox"
         aria-label="Select all rows"
         id="select-all"
         ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }} />
</th>

{/* Body row: selected state */}
<tr className="row--selected">
  <td><input type="checkbox" defaultChecked aria-label="Select Jane Doe" /></td>
  ...
</tr>
```

**Select-all checkbox states:**
- **Unchecked** — no rows selected
- **Checked** — all visible rows selected
- **Indeterminate** — some but not all rows selected — set via `.indeterminate = true` in JS, never via HTML alone

#### Bulk Actions

Appears above the table when one or more rows are selected. Replaces the table header actions area while active.

```jsx
{/* Shown when rows are selected */}
<div className="data-table-bulk" role="toolbar" aria-label="Bulk actions">
  <span className="data-table-bulk__count">3 rows selected</span>
  <div className="data-table-bulk__actions">
    <button className="btn btn--secondary btn--sm">Export</button>
    <button className="btn btn--secondary btn--sm">Assign</button>
    <button className="btn btn--outline btn--sm" style={{ color: 'var(--color-danger)' }}>
      Delete
    </button>
  </div>
  <button className="btn btn--ghost btn--sm data-table-bulk__clear"
          aria-label="Clear selection">
    Clear
  </button>
</div>
```

**Bulk action rules:**
- Always show the selected count
- Destructive bulk actions (Delete) always require a confirmation modal before executing
- Never more than 4 bulk actions — use a dropdown for additional actions
- Clear button always present on the right

#### Density Modes

Control row height via modifier class on `.data-table`:

| Class | Row height | Vertical padding | Use when |
|-------|-----------|-----------------|---------|
| `.data-table--compact` | 32px | 6px | Dense data review, power users |
| `.data-table` (default) | 44px | 12px | Standard — most contexts |
| `.data-table--comfortable` | 56px | 16px | Sparse data, public-facing |

#### Expandable Rows

```jsx
<tr className="row--expandable">
  <td>
    <button className="row-expand-btn" aria-expanded="false"
            aria-controls="row-1-detail" aria-label="Expand Jane Doe">
      <svg className="ds-icon row-expand-icon" aria-hidden="true">
        <use href="#icon-chevron-right"/>
      </svg>
    </button>
  </td>
  ...
</tr>
{/* Expanded detail row — full width */}
<tr className="row--detail" id="row-1-detail" hidden>
  <td colSpan="100%">
    {/* Detail content */}
  </td>
</tr>
```

**Expandable row rules:**
- Maximum one level of nesting — never nest expandable rows
- `aria-expanded` on the trigger reflects open/closed state
- Detail row uses `colspan="100%"` to span all columns
- Expansion toggle lives in the first column, before the checkbox if both are present

#### Sticky Column Headers

Always apply when the table height exceeds its container:

```css
.data-table thead th {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--surface-base);
  box-shadow: 0 1px 0 var(--border-default); /* visible when scrolling */
}
```

#### Empty and Loading States

```jsx
{/* Loading — skeleton rows */}
<tbody className="table-loading" aria-busy="true" aria-label="Loading data">
  <tr><td colSpan="100%"><div className="skeleton__line" style={{ height: '44px' }}></div></td></tr>
  <tr><td colSpan="100%"><div className="skeleton__line" style={{ height: '44px' }}></div></td></tr>
  <tr><td colSpan="100%"><div className="skeleton__line" style={{ height: '44px' }}></div></td></tr>
</tbody>

{/* Empty — no data */}
<tbody>
  <tr>
    <td colSpan="100%">
      <div className="empty-state">
        <svg className="ds-icon ds-icon--lg" aria-hidden="true">
          <use href="#icon-inbox"/>
        </svg>
        <p className="empty-state__title">No results</p>
        <p className="empty-state__desc">
          No items match your current filters.
        </p>
        <button className="btn btn--secondary btn--sm">Clear filters</button>
      </div>
    </td>
  </tr>
</tbody>
```

**Updated Claude Rules for Data Tables:**
- Every sortable column must have `aria-sort` reflecting current state
- Select-all indeterminate state must be set via JavaScript, not HTML
- Bulk action bar replaces table header actions — never show both simultaneously
- Destructive bulk actions always require confirmation before executing
- Expandable rows never nest more than one level deep
- Sticky headers always include `background` to prevent content showing through
- Table loading state uses `aria-busy="true"` on the tbody
- Empty state within a table uses `colspan="100%"` on the single cell



---

### 4.6 Stat / KPI Cards 

```jsx
{/* Stats row */}
<div className="stat-grid">
  <div className="stat-card">
    <div className="stat-card__label">Total Revenue</div>
    <div className="stat-card__value">$48,291</div>
    <div className="stat-card__delta stat-card__delta--up">
      <svg aria-hidden="true">{/* up arrow */}</svg>
      12.4% vs last month
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-card__label">Active Users</div>
    <div className="stat-card__value">1,284</div>
    <div className="stat-card__delta stat-card__delta--down">
      <svg aria-hidden="true">{/* down arrow */}</svg>
      3.1% vs last month
    </div>
  </div>

  <div className="stat-card stat-card--featured">
    <div className="stat-card__label">Conversion Rate</div>
    <div className="stat-card__value">8.7%</div>
    <div className="stat-card__delta stat-card__delta--neutral">No change</div>
  </div>
</div>
```

```scss
// .stat-grid: grid auto-fill minmax(200px, 1fr), gap 16px
// .stat-card: white · border · shadow-sm · radius-xl · p-6
// .stat-card__label: text-xs uppercase tracking-wide text-secondary
// .stat-card__value: text-3xl font-bold text-primary mt-2
// .stat-card__delta: text-sm flex items-center gap-1 mt-2
// .stat-card__delta--up: text-success
// .stat-card__delta--down: text-danger
// .stat-card__delta--neutral: text-secondary
// .stat-card--featured: border-accent border-2 (highlighted KPI)
```

---

### 4.7 Filter Bar 

Appears above data tables. Combines search, filters, and actions.

```jsx
<div className="filter-bar">
  <div className="filter-bar__search">
    <div className="input-icon-wrap">
      <svg className="input-icon" aria-hidden="true">{/* search */}</svg>
      <input className="input input--sm" type="search" placeholder="Search users…" />
    </div>
  </div>

  <div className="filter-bar__filters">
    <div className="select-wrap">
      <select className="select select--sm">
        <option>All status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>
    </div>
    <div className="select-wrap">
      <select className="select select--sm">
        <option>All roles</option>
        <option>Admin</option>
        <option>Member</option>
      </select>
    </div>
  </div>

  <div className="filter-bar__actions">
    <button className="btn btn--secondary btn--sm">
      <svg aria-hidden="true">{/* download */}</svg>
      Export
    </button>
    <button className="btn btn--primary btn--sm">
      + Add user
    </button>
  </div>
</div>
```

```scss
// .filter-bar: flex items-center gap-3 flex-wrap py-4
// .filter-bar__search: flex-1 min-width 200px max-width 320px
// .filter-bar__filters: flex items-center gap-2
// .filter-bar__actions: flex items-center gap-2 ml-auto
// .input-icon-wrap: relative
// .input-icon: absolute left-3 top-50% transform -50% w-4 h-4 text-tertiary
// inputs inside .input-icon-wrap get pl-9
```

---

### 4.8 Page Header

Every internal page in IMIN opens with a page header. It sits directly below the top nav, inside `.page-container`. It contains: an optional breadcrumb, the page title (H1), an optional description, and right-aligned actions.

```
┌─────────────────────────────────────────────────────────────┐
│  Logo  │  Dashboard    Tasks    Workspaces ▾    Explore     │  ← top nav
├─────────────────────────────────────────────────────────────┤
│  Workspaces › Clearance                                     │  ← breadcrumb
│  Clearance                          [Screen with VESTA]  [+ New statement] │  ← title + actions
│                                                             │  ← page content starts here
```

#### HTML Pattern

```jsx
<div className="page-header">
  <div className="page-header__main">

    {/* Breadcrumb — always present on internal pages */}
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb__list">
        <li className="breadcrumb__item">
          <a href="/workspaces" className="breadcrumb__link">Workspaces</a>
        </li>
        <li className="breadcrumb__item" aria-hidden="true">›</li>
        <li className="breadcrumb__item">
          <span className="breadcrumb__current" aria-current="page">Clearance</span>
        </li>
      </ol>
    </nav>

    <h1 className="page-title">Clearance</h1>
    {/* Description is optional — omit if the title is self-explanatory */}
    <p className="page-desc">Screen and clear public statements before release.</p>

  </div>
  <div className="page-header__actions">
    {/* Secondary action left, primary action right */}
    <button className="btn btn--secondary">Secondary action</button>
    <button className="btn btn--primary">
      <svg className="ds-icon" aria-hidden="true"><use href="#icon-plus"/></svg>
      Primary action
    </button>
  </div>
</div>
```

#### SCSS Reference

```scss
// .page-header: flex items-start justify-between gap-6 margin-bottom:28px
// .page-header__main: flex-1 min-width:0
// .page-header__actions: flex items-center gap-2 flex-shrink-0 padding-top:4px
// .page-title: font-size:28px font-weight:700 color:text-primary letter-spacing:-0.02em (composes the .t-display role)
// .page-desc: font-size:14px color:text-secondary margin-top:4px
// .breadcrumb__list: flex items-center gap-6px list-style:none margin-bottom:8px
// .breadcrumb__item: font-size:12px color:text-tertiary
// .breadcrumb__link: color:text-secondary text-decoration:none hover:color:text-primary
// .breadcrumb__current: color:text-primary font-weight:500
```

**Claude Rules for Page Header:**
- Page header appears on every internal page — it is never optional
- Breadcrumb is always present on pages 2+ levels deep — never omit it
- H1 always matches the last breadcrumb segment exactly
- Maximum one `.btn--primary` in the actions area
- Description is optional — use only when the title alone doesn't convey enough context
- Actions are role-scoped — hide unavailable actions with conditional rendering, never disable them

---

### 4.9 Callouts

```jsx
<div className="callout callout--info">
  <svg className="callout__icon" aria-hidden="true">{/* info */}</svg>
  <div className="callout__body">
    <strong className="callout__title">New feature available</strong>
    <p>Advanced filtering is now available in your dashboard.</p>
  </div>
</div>
```

Variants: `.callout--info`, `.callout--success`, `.callout--warning`, `.callout--danger`

---

### 4.10 Modals

```jsx
<div className="modal-overlay" role="presentation" aria-hidden="false">
  <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div className="modal__header">
      <h2 className="modal__title" id="modal-title">Confirm deletion</h2>
      <button className="btn btn--ghost btn--icon" aria-label="Close dialog">
        <svg aria-hidden="true">{/* x */}</svg>
      </button>
    </div>
    <div className="modal__body">
      <p className="text-secondary">This action cannot be undone. All data will be permanently deleted.</p>
    </div>
    <div className="modal__footer">
      <button className="btn btn--secondary">Cancel</button>
      <button className="btn btn--danger">Delete permanently</button>
    </div>
  </div>
</div>
```

**Sizes:** `.modal--sm` (480px) · `.modal` (560px default) · `.modal--lg` (720px) · `.modal--xl` (960px)

**Claude Rules for Modals:**
- Always `role="dialog"` + `aria-modal="true"` + `aria-labelledby`
- Focus must be trapped inside modal when open
- Escape key must close
- Footer always: cancel (secondary) left, primary action right

---

### 4.11 Empty States

```jsx
<div className="empty-state">
  <div className="empty-state__icon">
    <svg aria-hidden="true">{/* contextual icon */}</svg>
  </div>
  <h3 className="empty-state__title">No users yet</h3>
  <p className="empty-state__desc">
    Invite your first team member to get started.
  </p>
  <button className="btn btn--primary">Invite a user</button>
</div>
```

**Variants:**
- Default: icon + title + description + optional CTA
- `.empty-state--table`: inline with table (smaller, centered in table body)
- `.empty-state--filtered`: "No results match your filters" + Clear filters button

---

### 4.12 Loading / Skeleton

```jsx
{/* Skeleton lines */}
<div className="skeleton">
  <div className="skeleton__line skeleton__line--title"></div>
  <div className="skeleton__line"></div>
  <div className="skeleton__line skeleton__line--short"></div>
</div>

{/* Skeleton stat card */}
<div className="card skeleton-card">
  <div className="skeleton__line skeleton__line--label"></div>
  <div className="skeleton__line skeleton__line--value"></div>
  <div className="skeleton__line skeleton__line--short"></div>
</div>

{/* Skeleton table row */}
<tr className="row--skeleton">
  <td><div className="skeleton__block skeleton__block--sm"></div></td>
  <td><div className="skeleton__line"></div></td>
  <td><div className="skeleton__block skeleton__block--badge"></div></td>
  <td><div className="skeleton__line skeleton__line--short"></div></td>
</tr>
```

```scss
// Skeleton animation: shimmer left-to-right
// Background: linear-gradient(90deg, $neutral-100 25%, $neutral-200 50%, $neutral-100 75%)
// background-size: 400% 100%
// animation: shimmer 1.5s ease-in-out infinite
```

---

### 4.13 Tabs

```jsx
<div className="tabs" role="tablist" aria-label="Section label">
  <button className="tab tab--active" role="tab" aria-selected="true" aria-controls="panel-a">Overview</button>
  <button className="tab" role="tab" aria-selected="false" aria-controls="panel-b">Activity</button>
  <button className="tab" role="tab" aria-selected="false" aria-controls="panel-c">Settings</button>
</div>
<div className="tab-panel tab-panel--active" id="panel-a" role="tabpanel">...</div>
```

---

### 4.14 Toast / Notification *(transient feedback)*

```jsx
<div className="toast-container" aria-live="polite">
  <div className="toast toast--success">
    <svg className="toast__icon" aria-hidden="true">...</svg>
    <span className="toast__message">Changes saved successfully</span>
    <button className="btn btn--ghost btn--icon btn--sm toast__close" aria-label="Dismiss">×</button>
  </div>
</div>
```

**Variants:** `.toast--success`, `.toast--info`, `.toast--warning`, `.toast--error`
**Position:** `.toast-container` fixed bottom-right, stack upward

---

### 4.15 Segmented Control

Mutually exclusive view or filter selector. A gray pill container with a floating white pill for the active item. Use when switching between 2–5 related views of the same content.

**Not Tabs.** Tabs switch content panels with `role="tablist"`. Segmented controls switch view modes or filter scope with `role="radiogroup"`. Different semantic role, different context, different placement.

#### Variants

| Variant | Example | Use |
|---------|---------|-----|
| Icon + text | Board / List / Calendar | Primary view switcher |
| Text only | Only Mine / My Teams | Scope or ownership filter |
| With Agent item | All / People / Agents | View selector including an AI agent as a first-class option |

#### HTML Pattern

```jsx
{/* Icon + text (Board/List/Calendar) */}
<div className="seg-control" role="radiogroup" aria-label="View mode">
  <button className="seg-control__item seg-control__item--active"
          role="radio" aria-checked="true">
    <svg className="ds-icon" aria-hidden="true"><use href="#icon-columns"/></svg>
    Board
  </button>
  <button className="seg-control__item" role="radio" aria-checked="false">
    <svg className="ds-icon" aria-hidden="true"><use href="#icon-list"/></svg>
    List
  </button>
  <button className="seg-control__item" role="radio" aria-checked="false">
    <svg className="ds-icon" aria-hidden="true"><use href="#icon-calendar"/></svg>
    Calendar
  </button>
</div>

{/* Text only (Only Mine / My Teams) */}
<div className="seg-control" role="radiogroup" aria-label="Scope">
  <button className="seg-control__item" role="radio" aria-checked="false">Only Mine</button>
  <button className="seg-control__item seg-control__item--active" role="radio" aria-checked="true">My Teams</button>
</div>

{/* With Agent item — .seg-control__item--agent on the Agents button */}
<div className="seg-control" role="radiogroup" aria-label="View type">
  <button className="seg-control__item seg-control__item--active" role="radio" aria-checked="true">
    <svg className="ds-icon" aria-hidden="true"><use href="#icon-list"/></svg>All
  </button>
  <button className="seg-control__item" role="radio" aria-checked="false">
    <svg className="ds-icon" aria-hidden="true"><use href="#icon-users"/></svg>People
  </button>
  <button className="seg-control__item seg-control__item--agent" role="radio" aria-checked="false">
    <svg className="ds-icon" aria-hidden="true"><use href="#icon-cpu"/></svg>Agents
  </button>
</div>

{/* Small — for toolbar or card-queue header use */}
<div className="seg-control seg-control--sm" role="radiogroup" aria-label="Filter">
  <button className="seg-control__item seg-control__item--active" role="radio" aria-checked="true">All</button>
  <button className="seg-control__item" role="radio" aria-checked="false">Mine</button>
</div>
```

#### SCSS

```scss
.seg-control {
  display: inline-flex;
  background: var(--surface-subtle);
  border-radius: $radius-pill;
  padding: 3px;
  gap: 2px;

  &__item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 6px 14px;
    font-size: 14px;
    font-weight: 400;
    color: var(--text-secondary);
    background: transparent;
    border: none;
    border-radius: $radius-pill;
    cursor: pointer;
    white-space: nowrap;
    @include transition(color, background, box-shadow);
    @include focus-ring;

    &:hover:not(&--active) { color: var(--text-primary); }

    &--active {
      background: var(--surface-base);
      color: var(--text-primary);
      font-weight: 500;
      box-shadow: 0 1px 3px rgba(15,23,42,.12), 0 0 0 1px rgba(15,23,42,.06);
    }

    // AI agent item — accent when active
    &--agent { &.seg-control__item--active { color: $color-accent; } }
  }

  &--sm .seg-control__item { padding: 4px 10px; font-size: 12px; }
}
```

#### The Agent Item

`.seg-control__item--agent` is reserved for items representing AI agents (e.g., "Agents" in an All/People/Agents switcher). When active, it uses `$color-accent` instead of `$text-primary` — a deliberate signal that this view is AI-powered. This is the **Agent-First Design** principle (Section 13) expressed as a concrete UI pattern: agents get a named slot in navigation, not buried in settings.

**Claude Rules for Segmented Control:**
- Always `role="radiogroup"` on wrapper + descriptive `aria-label`
- Always `role="radio"` + `aria-checked` on each item — never just CSS class
- 2–5 items maximum. More than 5 → use a Select or Filter Bar
- Icons are all-or-nothing — all items have icons, or none do
- `.seg-control__item--agent` accent treatment is exclusively for AI agent items
- Use `.seg-control--sm` inside toolbars, card queue headers, and filter bars

---

### 4.16 Card Queue

A sortable list where each row reads as an individual work item rather than a data record. Use for queues, inboxes, approval flows, and task lists where users review and act on items one at a time.

**Not a Data Table.** Use this decision:

| | Data Table | Card Queue |
|--|-----------|------------|
| Primary use | Analytics, user management | Queues, inboxes, approvals |
| Row treatment | Flat, dense, dividers | Each row is a floating card |
| Primary action | Bulk select + batch action | Per-item CTA (Review, Open, Approve) |
| Key CSS | `border-collapse: collapse` | `border-collapse: separate` |
| Row hover | Background tint | `translateY(-1px)` + shadow-md |
| Semantics | `<table>` with flat rows | `<table>` with `border-spacing: 0 6px` |

The `border-collapse: separate` + `border-spacing: 0 6px` creates row gaps. Border-radius on the first and last cell of each row creates the card shape. `box-shadow` on `<tr>` provides elevation.

#### HTML Pattern

```jsx
<div className="card-queue-wrap">

  {/* Header: title + optional seg-control filter + actions */}
  <div className="card-queue-head">
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span className="card-queue-head__title">Review Requests</span>
      <span className="badge badge--neutral">12</span>
    </div>
    <div className="card-queue-head__actions">
      <div className="seg-control seg-control--sm" role="radiogroup" aria-label="Filter">
        <button className="seg-control__item seg-control__item--active" role="radio" aria-checked="true">All</button>
        <button className="seg-control__item" role="radio" aria-checked="false">Mine</button>
        <button className="seg-control__item" role="radio" aria-checked="false">Unassigned</button>
      </div>
      <button className="btn btn--ghost btn--sm">
        <svg aria-hidden="true"><use href="#icon-filter"/></svg>Filter
      </button>
    </div>
  </div>

  {/* Table: border-collapse separate gives card rows */}
  <div className="card-queue-table-wrap">
    <table className="card-queue" aria-label="Review requests">
      <thead>
        <tr>
          <th className="col-sortable" aria-sort="ascending" style={{ width: '38%' }}>
            Request <svg className="sort-icon" aria-hidden="true">...</svg>
          </th>
          <th>Status</th>
          <th>Assignee</th>
          <th className="col-sortable" style={{ textAlign: 'right' }}>Submitted</th>
          <th className="col-action"><span className="sr-only">Actions</span></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="font-medium text-base">Issue title</div>
            <div className="text-xs text-tertiary">Company · Plan</div>
          </td>
          <td><span className="badge badge--danger">Urgent</span></td>
          <td>
            <div className="flex items-center gap-2">
              <div className="avatar avatar--sm">JD</div>
              <span className="text-sm text-secondary">Jane D.</span>
            </div>
          </td>
          <td className="col-date">2h ago</td>
          <td className="col-action">
            <div className="flex gap-1 justify-end">
              <button className="btn btn--primary btn--sm">Review</button>
              <button className="btn btn--ghost btn--sm btn--icon"
                      aria-label="More options for Issue title">
                <svg aria-hidden="true"><use href="#icon-more-horizontal"/></svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  {/* Footer: count + pagination */}
  <div className="card-queue-foot">
    <span className="table-count">Showing 1–4 of 12 requests</span>
    <nav className="pagination" aria-label="Queue pagination">...</nav>
  </div>

</div>
```

#### SCSS

```scss
.card-queue-wrap {
  @include card-base;
  overflow: hidden;
}
.card-queue-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--border-default);
  &__title   { font-size: 15px; font-weight: 600; color: var(--text-primary); }
  &__actions { display: flex; align-items: center; gap: 8px; }
}
.card-queue-table-wrap { padding: 0 12px 12px; }
.card-queue {
  width: 100%;
  border-collapse: separate;   // ← the key property
  border-spacing: 0 6px;       // ← gap between card rows
  font-size: 14px;

  thead th {
    text-align: left;
    font-size: 11px; font-weight: 600;
    letter-spacing: .06em; text-transform: uppercase;
    color: var(--text-tertiary);
    padding: 4px 16px 6px;
    white-space: nowrap; cursor: pointer;
    @include transition(color);
    &:hover { color: var(--text-secondary); }
  }
  tbody {
    td {
      padding: 14px 16px;
      background: var(--surface-base);
      vertical-align: middle;
      border-top: 1px solid var(--border-default);
      border-bottom: 1px solid var(--border-default);
      @include transition(background, border-color);
    }
    td:first-child { border-left: 1px solid var(--border-default); border-radius: 10px 0 0 10px; }
    td:last-child  { border-right: 1px solid var(--border-default); border-radius: 0 10px 10px 0; }
    tr {
      box-shadow: $shadow-sm;
      cursor: pointer;
      @include transition(transform, box-shadow);
      &:hover { transform: translateY(-1px); box-shadow: $shadow-md;
        td { background: $neutral-50; border-color: var(--border-strong); }
      }
    }
  }
}
.card-queue-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 20px 16px;
}
```

**Claude Rules for Card Queue:**
- Always `border-collapse: separate` — never `collapse`. This is non-negotiable for the card row effect.
- Never use `<ul>` or `<div>` rows — column header alignment requires `<table>` semantics
- Every action button `aria-label` must identify the specific item: `"Review [item name]"`, not just `"Review"`
- Sortable headers always carry `aria-sort` attribute
- The `.seg-control--sm` filter in the header is the recommended pattern for queue-level filtering
- Primary action ("Review", "Open", "Approve") always on the right. Never more than one primary CTA per row.

---

### 4.17 Workspace Switcher

The Workspace Switcher opens from the Workspaces nav item as a rich dropdown picker. Each workspace is presented as a two-line item: a colored icon square on the left, bold workspace name on top, brief description below. This is a workspace launcher, not a compact list.

#### Key Behaviours
- Items unavailable to the current role are **not rendered** (conditional render) — never disabled, never shown as locked
- The active workspace shows an accent left border + tinted background + accent-colored name
- Dropdown width is fixed at 320px minimum to accommodate descriptions
- Dropdown closes on: item selection, Escape key, click outside, focus leaving the component
- Chevron rotates 180° when open (`[aria-expanded="true"]` CSS selector)

#### HTML Pattern
```jsx
<div className="workspace-switcher">
  <button className="app-topnav__item workspace-switcher__trigger"
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="workspace-dropdown">
    Workspaces
    <svg className="workspace-switcher__chevron ds-icon" aria-hidden="true">
      <use href="#icon-chevron-down"/>
    </svg>
  </button>

  <div className="workspace-switcher__dropdown"
       id="workspace-dropdown"
       role="menu"
       aria-label="Workspaces">

    {/* Optional label when workspaces are grouped */}
    <span className="workspace-switcher__section-label">Your workspaces</span>

    {/* Active workspace */}
    <button className="workspace-switcher__item workspace-switcher__item--active"
            role="menuitem" aria-current="true">
      <div className="workspace-switcher__icon ws-icon--green" aria-hidden="true">
        <svg className="ds-icon"><use href="#icon-layers"/></svg>
      </div>
      <div className="workspace-switcher__item-text">
        <span className="workspace-switcher__item-name">Collection Review — Q3</span>
        <span className="workspace-switcher__item-desc">Review and classify incoming files</span>
      </div>
    </button>

    {/* Available workspaces (role-scoped — excluded roles are not rendered) */}
    <button className="workspace-switcher__item" role="menuitem">
      <div className="workspace-switcher__icon ws-icon--purple" aria-hidden="true">
        <svg className="ds-icon"><use href="#icon-edit-3"/></svg>
      </div>
      <div className="workspace-switcher__item-text">
        <span className="workspace-switcher__item-name">Translation Queue</span>
        <span className="workspace-switcher__item-desc">Assign and track translation work</span>
      </div>
    </button>

    <button className="workspace-switcher__item" role="menuitem">
      <div className="workspace-switcher__icon ws-icon--teal" aria-hidden="true">
        <svg className="ds-icon"><use href="#icon-check-circle"/></svg>
      </div>
      <div className="workspace-switcher__item-text">
        <span className="workspace-switcher__item-name">Senior Review Pool</span>
        <span className="workspace-switcher__item-desc">Confirm relevance decisions and set priorities</span>
      </div>
    </button>

    <div className="workspace-switcher__divider" role="separator"></div>

    {/* Footer utility action — no icon, no description */}
    <button className="workspace-switcher__item" role="menuitem"
            style={{ gap: '10px', padding: '10px 20px' }}>
      <svg className="ds-icon ds-icon--sm" aria-hidden="true"><use href="#icon-settings"/></svg>
      <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Manage workspaces</span>
    </button>

  </div>
</div>
```

#### Icon Color Themes

Applied as modifier class on `.workspace-switcher__icon`. Each workspace has a defined color in application configuration.

| Class | Background | Icon color | Use for |
|-------|-----------|-----------|---------|
| `.ws-icon--green`  | `#E8F5F0` | `#1B7A4E` | Review / collection work |
| `.ws-icon--blue`   | `#EBF0FF` | `#3B5BDB` | General / admin |
| `.ws-icon--purple` | `#F0EBFF` | `#7048E8` | Drafting / prep work |
| `.ws-icon--rose`   | `#FFE8F0` | `#C2255C` | Teams / people |
| `.ws-icon--amber`  | `#FFF3E0` | `#D6840A` | Flagged / priority |
| `.ws-icon--teal`   | `#E0F8F5` | `#0E9684` | Translation / language |

**Claude Rules for Workspace Switcher:**
- Every item must have both a name and a description — never a single-line workspace item
- Icon color is assigned per workspace — do not choose it arbitrarily, use the workspace's defined theme
- Never render workspace items as disabled — omit role-restricted items from the render instead
- The footer utility action (Manage workspaces) has no icon square and no description — it is a plain text action
- `aria-haspopup="true"` and `aria-expanded` are required on the trigger button
- `role="menu"` on the dropdown, `role="menuitem"` on each item, `role="separator"` on dividers

---

### 4.18 Dropdown / Contextual Menu

General-purpose action menu triggered by a button. Right-aligned by default. Use wherever a set of actions applies to a specific item — table rows, card menus, header actions.

**Not the Workspace Switcher.** That is a specialized picker with a defined structure. The Dropdown is a general action list.

#### HTML Pattern
```jsx
<div className="dropdown">
  {/* Trigger — usually a ghost icon button */}
  <button className="btn btn--ghost btn--icon dropdown__trigger"
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="menu-id"
          aria-label="More options for [item name]">
    <svg className="ds-icon" aria-hidden="true"><use href="#icon-more-horizontal"/></svg>
  </button>

  <div className="dropdown__menu" id="menu-id" role="menu">

    {/* Optional group label */}
    <span className="dropdown__label">Actions</span>

    <button className="dropdown__item" role="menuitem">
      <svg aria-hidden="true"><use href="#icon-edit-3"/></svg>
      Edit
    </button>
    <button className="dropdown__item" role="menuitem">
      <svg aria-hidden="true"><use href="#icon-download"/></svg>
      Export
    </button>
    <button className="dropdown__item" role="menuitem">
      <svg aria-hidden="true"><use href="#icon-user"/></svg>
      Assign
    </button>

    <div className="dropdown__divider" role="separator"></div>

    {/* Danger item — always last, always after a divider */}
    <button className="dropdown__item dropdown__item--danger" role="menuitem">
      <svg aria-hidden="true"><use href="#icon-trash-2"/></svg>
      Delete
    </button>

  </div>
</div>

{/* Left-aligned variant (when trigger is on the right side of the screen) */}
<div className="dropdown__menu dropdown__menu--left is-open">...</div>
```

**Claude Rules for Dropdown:**
- Trigger `aria-label` must name the specific item: `"More options for Jane Doe"` not `"More options"`
- Danger actions always appear last, always preceded by a divider
- Never put more than 8 items in a dropdown — use a modal for complex action sets
- `role="menu"` on the container, `role="menuitem"` on each item, `role="separator"` on dividers
- Keyboard: Arrow keys navigate items, Escape closes and returns focus to trigger

---

### 4.19 Toggle / Switch

Binary on/off control. Use instead of a checkbox when the action takes effect **immediately** without a form submission. Use a checkbox when the selection is part of a submit flow.

| Attribute | Toggle | Checkbox |
|-----------|--------|---------|
| Effect timing | Immediate | On submit |
| ARIA | `role="switch"` | `role="checkbox"` |
| Common use | Settings, feature flags | Form multi-select |

#### HTML Pattern

```jsx
{/* Default — label right */}
<label className="toggle">
  <input className="toggle__input" type="checkbox" role="switch" aria-checked="false" />
  <span className="toggle__track"><span className="toggle__thumb"></span></span>
  <div className="toggle__content">
    <span className="toggle__label">Email notifications</span>
    <span className="toggle__hint">Receive updates about your assignments</span>
  </div>
</label>

{/* Row variant — full width, label left, toggle right */}
<label className="toggle toggle--row">
  <input className="toggle__input" type="checkbox" role="switch" aria-checked="true" />
  <span className="toggle__track"><span className="toggle__thumb"></span></span>
  <div className="toggle__content">
    <span className="toggle__label">Auto-assign new files</span>
  </div>
</label>

{/* Small */}
<label className="toggle toggle--sm">
  <input className="toggle__input" type="checkbox" role="switch" />
  <span className="toggle__track"><span className="toggle__thumb"></span></span>
  <span className="toggle__label">Compact mode</span>
</label>

{/* Disabled */}
<label className="toggle">
  <input className="toggle__input" type="checkbox" role="switch" disabled />
  <span className="toggle__track"><span className="toggle__thumb"></span></span>
  <span className="toggle__label">Disabled feature</span>
</label>
```

**Claude Rules for Toggle:**
- Always `role="switch"` — not `role="checkbox"` — on the input
- `aria-checked` must reflect current state (`"true"` / `"false"`)
- The `<label>` wraps the entire component — clicking the label text must activate the toggle
- Use `.toggle--row` on settings pages where toggles run full-width
- Never show a loading state on a toggle — the action must be instant

---


## 5. Layout Patterns

Compositional patterns built from Section 4 components. Includes full-page layout shells, reusable structural patterns, and complex multi-component compositions.

### 5.1 App Shell *(Primary — use for every screen)*

The root layout for all screens in this product. A sticky top navigation bar sits above a single scrollable content area. **There is no sidebar in this product.**

```jsx
<div className="app-shell">

  {/* Sticky top navigation */}
  <header className="app-topnav" role="banner">

    {/* Brand */}
    <a href="/" className="app-topnav__brand" aria-label="Go to home">
      <img className="app-topnav__logo" src="logo.svg" alt="" />
      <span className="app-topnav__name">ProductName</span>
    </a>

    {/* Primary navigation — all four items visible to all roles */}
    <nav className="app-topnav__nav" aria-label="Primary navigation">

      <a href="/dashboard" className="app-topnav__item app-topnav__item--active"
         aria-current="page">Dashboard</a>

      <a href="/tasks" className="app-topnav__item">Tasks</a>

      {/* Workspace switcher — role-scoped dropdown */}
      <div className="workspace-switcher">
        <button className="app-topnav__item workspace-switcher__trigger"
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="workspace-dropdown">
          Workspaces
          <svg className="workspace-switcher__chevron ds-icon" aria-hidden="true">
            <use href="#icon-chevron-down"/>
          </svg>
        </button>
        <div className="workspace-switcher__dropdown"
             id="workspace-dropdown"
             role="menu"
             aria-label="Workspaces">
          <span className="workspace-switcher__section-label">Your workspaces</span>
          {/* Role-scoped items — not rendered for excluded roles, never disabled */}
          <button className="workspace-switcher__item workspace-switcher__item--active"
                  role="menuitem" aria-current="true">
            <svg className="ds-icon ds-icon--sm" aria-hidden="true"><use href="#icon-layers"/></svg>
            Active Workspace
          </button>
          <button className="workspace-switcher__item" role="menuitem">
            <svg className="ds-icon ds-icon--sm" aria-hidden="true"><use href="#icon-layers"/></svg>
            Another Workspace
          </button>
          <div className="workspace-switcher__divider"></div>
          <button className="workspace-switcher__item" role="menuitem">
            <svg className="ds-icon ds-icon--sm" aria-hidden="true"><use href="#icon-settings"/></svg>
            Manage workspaces
          </button>
        </div>
      </div>

      <a href="/explore" className="app-topnav__item">Explore</a>

    </nav>

    {/* Right-side utility actions */}
    <div className="app-topnav__right">
      <button className="btn btn--ghost btn--icon" aria-label="Notifications">
        <svg className="ds-icon" aria-hidden="true"><use href="#icon-bell"/></svg>
      </button>
      <div className="avatar" aria-label="My account">JD</div>
    </div>

  </header>

  {/* Scrollable main content — changes when workspace is switched */}
  <main className="app-content" id="main-content" tabIndex="-1">
    <div className="page-container">
      {/* Page content goes here */}
    </div>
  </main>

</div>
```

```scss
// .app-shell          — flex-col, height:100vh, overflow:hidden
// .app-topnav         — sticky top:0 z:200, height:56px, bg:surface-base, border-bottom
// .app-topnav__brand  — flex, gap:10px, margin-right:20px
// .app-topnav__nav    — flex, gap:2px, flex:1
// .app-topnav__item   — inline-flex, 14px, color:text-secondary, hover:bg-surface-subtle
// .app-topnav__item--active — font-weight:500, color:text-primary, bg:surface-subtle
// .app-topnav__right  — flex, gap:8px, margin-left:auto
// .workspace-switcher — position:relative
// .app-content        — flex:1, overflow-y:auto
// .page-container     — max-width:1280px, mx:auto, padding:32px 32px 64px
```

**Claude Rules for the App Shell:**
- Always start every screen with `.app-shell` → `.app-topnav` → `.app-content`
- Never generate a sidebar. No `.app-sidebar`, no `.sidebar-nav`. These do not exist.
- The active nav item uses `aria-current="page"` and `.app-topnav__item--active`
- Workspace dropdown items for excluded roles are conditionally rendered — never `disabled`
- `main#main-content` receives focus on route change (`tabIndex={-1}`, focus via router)
- Skip navigation link must precede the top nav: `<a href="#main-content" className="skip-nav">Skip to content</a>`

---

### 5.3 Split Panel Layout

```jsx
<div className="split-layout">
  <div className="split-layout__list">
    {/* List panel: filters + table/list */}
  </div>
  <div className="split-layout__detail">
    {/* Detail panel: selected item */}
  </div>
</div>
```

```scss
// .split-layout: flex gap-6 h-full
// .split-layout__list: flex flex-col w-96 flex-shrink-0
// .split-layout__detail: flex-1 min-w-0
```

---

### 5.4 Settings Layout

```jsx
<div className="settings-layout">
  <nav className="settings-nav">
    <a className="settings-nav__item settings-nav__item--active" href="#">General</a>
    <a className="settings-nav__item" href="#">Security</a>
    <a className="settings-nav__item" href="#">Notifications</a>
    <a className="settings-nav__item" href="#">Billing</a>
  </nav>
  <div className="settings-content">
    <div className="settings-section">
      <h2 className="settings-section__title">General settings</h2>
      <p className="settings-section__desc">...</p>
      <div className="settings-section__body">
        {/* Form fields */}
      </div>
    </div>
  </div>
</div>
```


---

### 5.5 Board Switcher

A category-based board selector used on the Tasks page. Each item represents a workflow category. Selecting one changes which Kanban board (and its column set) is displayed. Items wrap to multiple rows when many categories exist.

**Distinct from Segmented Control.** A Segmented Control changes HOW content is viewed (Board/List/Calendar). A Board Switcher changes WHICH content is shown (which board/category). They are different components with different semantic roles — do not substitute one for the other.

```jsx
<div className="board-switcher" role="radiogroup" aria-label="Task category">

  {/* "All" always first, shows total count across all categories */}
  <button className="board-switcher__item board-switcher__item--active"
          role="radio" aria-checked="true">
    All
    <span className="board-switcher__count">8</span>
  </button>

  {/* Category items — role-scoped, dynamic, driven by user's workspaces */}
  <button className="board-switcher__item" role="radio" aria-checked="false">
    <svg className="ds-icon" aria-hidden="true"><use href="#icon-[category-icon]"/></svg>
    Press clearance
    <span className="board-switcher__count">2</span>
  </button>

  <button className="board-switcher__item" role="radio" aria-checked="false">
    <svg className="ds-icon" aria-hidden="true"><use href="#icon-[category-icon]"/></svg>
    Relevance coding
    <span className="board-switcher__count">2</span>
  </button>

  {/* Additional categories rendered dynamically — no maximum */}
</div>
```

**Claude Rules for Board Switcher:**
- Always `role="radiogroup"` on wrapper + `role="radio"` + `aria-checked` on each item
- "All" is always the first item, always shows the total count across all categories
- Category items and their icons are data-driven — never hardcode specific categories
- When a category is selected, the Kanban board re-renders with that category's column configuration
- Items that contain no tasks for the current user may be hidden (role-scoped — not rendered)

---


---

### 5.6 Kanban Board

A dynamic column-based task board. Column names, count, and order are **always** data-driven — provided by the selected board category and the user's role. Never hardcode column names in templates.

#### HTML Pattern

```jsx
{/* Column configuration comes from the selected board category */}
{/* columns = [{ id, name, count, cards: [] }, ...] — provided by the data layer */}

<div className="kanban-board" aria-label={`${categoryName} board`}>

  {columns.map((col) => (
    <div className="kanban-col" key={col.id}>
      <div className="kanban-col__header">
        <span className="kanban-col__name">{col.name}</span>
        <span className="kanban-col__count" aria-label={`${col.count} tasks`}>
          {col.count}
        </span>
        <button className="kanban-col__add" aria-label={`Add task to ${col.name}`}>+</button>
      </div>

      <div className="kanban-col__cards" role="list" aria-label={`${col.name} tasks`}>

        {/* Card — structure is consistent, content is dynamic */}
        {col.cards.map((card) => (
          <div
            className="kanban-card"
            role="listitem"
            key={card.id}
            tabIndex={0}
            onClick={() => openCard(card)}
            onKeyDown={(e) => e.key === 'Enter' && openCard(card)}
          >
            {/* Optional workspace/collection context label */}
            <div className="kanban-card__workspace">{card.workspace}</div>

            <div className="kanban-card__title">{card.title}</div>

            <div className="kanban-card__tags">
              {card.tags.map((tag) => (
                <span className="kanban-card__tag" key={tag}>{tag}</span>
              ))}
            </div>

            <div className="kanban-card__footer">
              <div className="kanban-card__assignees">
                {card.assignees.map((a) => (
                  <div className="avatar avatar--sm" key={a.name} aria-label={a.name}>{a.initials}</div>
                ))}
              </div>
              <div className={`kanban-card__due ${card.isUrgent ? 'kanban-card__due--urgent' : ''}`}>
                <svg className="ds-icon" aria-hidden="true"><use href="#icon-clock" /></svg>
                {card.dueLabel}
              </div>
            </div>
          </div>
        ))}

        {/* Empty column state */}
        {col.cards.length === 0 && (
          <div className="kanban-col__empty">No tasks in {col.name}</div>
        )}

      </div>
    </div>
  ))}

</div>
```

**Claude Rules for Kanban:**
- Never hardcode column names — columns come from data
- Every column needs an empty state (`.kanban-col__empty`)
- Cards navigate to the Entity Detail page on click — never open a modal
- The board scrolls horizontally — always wrap in a container with `overflow-x: auto`
- `max-height: calc(100vh - 320px)` on `.kanban-col` prevents the board from pushing below the viewport

---

## 6. Navigation Patterns

### 6.1 Top Nav Item States

```scss
.app-topnav__item {
  // Default:  color: text-secondary, background: transparent
  // Hover:    color: text-primary,   background: surface-subtle
  // Active:   color: text-primary,   background: surface-subtle, font-weight: 500
  //           aria-current="page" on the active <a> element
  // Focus:    2px accent outline, offset 2px
}
```

### 6.2 Workspace Switcher States

```scss
.workspace-switcher__trigger {
  // Closed:   same as .app-topnav__item default
  // Open:     aria-expanded="true", color: text-primary, bg: surface-subtle
  //           chevron rotates 180deg via .workspace-switcher__chevron
}

.workspace-switcher__item {
  // Default:  color: text-primary, background: transparent
  // Hover:    background: surface-subtle
  // Active:   background: accent-subtle, color: accent, font-weight: 500
  //           aria-current="true" on the active item
}
```

### 6.3 Navigation Rules

**Role scoping:** Workspace items not available to the current role are not rendered (conditional rendering). They are never shown as disabled. A user should not see destinations they cannot access.

**Active state:** The nav item matching the current route always has `aria-current="page"` (for `<a>` elements) or `aria-current="true"` (for workspace dropdown items). This drives both the visual active state and screen reader announcement.

**Workspace switching:** Selecting a workspace updates only `.app-content`. The top nav, page title region, and URL update. The page does not fully reload. Scroll position resets to top.

**Keyboard navigation:** Tab moves through nav items. Enter/Space activates. Workspace dropdown opens on Enter/Space, arrow keys navigate items, Escape closes and returns focus to the trigger.

**Skip navigation:** Required on every screen above the `.app-topnav`:
```jsx
<a href="#main-content" className="skip-nav">Skip to main content</a>
```
```scss
.skip-nav {
  position: absolute;
  top: -100%;
  left: 24px;
  z-index: 9999;
  background: $color-primary;
  color: #fff;
  padding: 8px 16px;
  border-radius: 0 0 $radius-md $radius-md;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  &:focus { top: 0; }
}
```

---

## 7. State Patterns

### Loading States
| Context | Pattern |
|---------|---------|
| Full page | Skeleton layout matching page structure |
| Table | 5–8 skeleton rows |
| Cards | Skeleton cards in same grid |
| Button | `.is-loading` with spinner |
| Inline | Small spinner + "Loading…" text |

### Empty States
| Context | Pattern |
|---------|---------|
| Empty table (no data) | `.empty-state` centered in table body |
| Filtered empty (no results) | "No results" + "Clear filters" button |
| Error loading | Error icon + "Failed to load" + Retry button |
| First use (onboarding) | Illustration (optional) + descriptive CTA |

### Error States
```jsx
{/* Inline field error */}
<span className="field__error" role="alert">...</span>

{/* Page-level error */}
<div className="callout callout--danger">
  <svg className="callout__icon" aria-hidden="true">...</svg>
  <div className="callout__body">
    <strong className="callout__title">Failed to load data</strong>
    <p>There was a problem fetching your data.</p>
    <button className="btn btn--secondary btn--sm mt-3">Try again</button>
  </div>
</div>
```

---

## 8. Theming

```scss
// Toggle with JavaScript:
document.documentElement.classList.add('dark');

// All components use CSS custom properties.
// Zero component API changes needed for dark mode.
// Add --token-name overrides under .dark in _design-system.scss.
```

**Status:** Light mode active. Dark tokens scaffolded. Visual implementation: v2.

---

## 9. Accessibility

**Standard:** WCAG 2.1 AA minimum.

| Pair | Ratio | Level |
|------|-------|-------|
| `$text-primary` on white | 15.1:1 | AAA |
| `$text-secondary` on white | 5.9:1 | AA |
| `$text-tertiary` on white | 4.84:1 | AA *(corrected v2.1 — was #94A3B8 at 2.48:1)* |
| White on `$color-primary` | 10.2:1 | AAA |
| White on `$color-accent` | 4.6:1 | AA |

**Required on all interactive elements:**
```scss
&:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

**Never use:** `outline: none` without a visible replacement.
**Touch targets:** min 44×44px on mobile.

### Windows High Contrast Mode

WCAG 2.1 AA requires content to be functional in Windows High Contrast Mode (`forced-colors: active`). In this mode, the OS replaces all custom colors with a restricted system palette. Every state that is currently communicated via background color must also be communicated via border, outline, or text.

**Required for all components:**
- Active/selected states must use a visible border in `Highlight` system color, not background color alone
- All badges must show a visible border — background color will be stripped
- Form controls must show borders in `ButtonText` system color
- Focus rings must use `Highlight` system color

The `@media (forced-colors: active)` block in `_design-system.scss` implements these requirements. Do not remove or override it.

### Zoom Compliance

See **Section 12: Zoom and Reflow** for full specification.

---

## 10. Claude Rules *(Read before generating any UI)*

### Hard Rules — Never Violate
1. **Never hardcode** hex colors, pixel sizes, or font sizes. Use tokens only.
2. **Accent (`$color-accent`)** is never a button background. Only `$color-primary` or white.
3. **One primary button** per visible screen section maximum.
4. **All spacing** uses utility classes (`p-4`, `gap-2`). Never `padding: 15px`.
5. **Labels above inputs** always. Never placeholder-as-label.
6. **`<button type="button">`** for all actions. `<a>` for navigation only.
7. **Data tables** always include `<thead>`, `aria-sort`, and `.table-scroll` wrapper.
8. **Empty states** and **loading states** must be included for every data display.
9. **Never create new component variants** — use the defined ones.
10. **Include `_design-system.scss`** in every screen stylesheet.

### Composition Rules
- Start every screen with the Dashboard Shell pattern (Section 5.1)
- KPI screens always begin with a `.stat-grid` of 3–4 cards before the data table
- Filter bars always sit between page header and data table
- Settings pages always use the Settings Layout (Section 5.4)

### Typography Rules
- Page titles: `.t-display` (28px / 700)
- Section headings: `.t-title` (20px / 600)
- Table column headers: `.t-label .uppercase .tracking-wide .text-tertiary`
- Body text: `.t-body` (14px)
- Size utilities (`.text-3xl`, `.text-xl`, …) are legacy implementation internals — never use them in new page markup
- Never use `.text-hero` outside of marketing/hero sections

### SCSS Output Rules
- Output a single `<style>` block per screen
- Import `_design-system.scss` at top: `@use 'design-system' as *;`
- Screen-specific styles go below the import
- No `!important`
- No inline styles

---

### 10.1 Component Decision Tree

> Visual similarity to a component is not sufficient reason to use it. Behavioural appropriateness is. Before selecting any component, work through the relevant decision below.

#### Decision 1 — Communicating a message to the user

```
What is the message about?
│
├── An action the user just completed
│   ├── No further action needed from user → Toast
│   └── User must make a decision → Modal (confirmation variant)
│
├── A persistent condition on this page
│   ├── Blocks the user's task entirely → Callout --danger (non-dismissible)
│   ├── Risk the user should know about → Callout --warning
│   ├── Helpful context → Callout --info
│   └── Confirms a completed page-level state → Callout --success
│
└── A system event unrelated to the current task → Toast (info variant)

NEVER: Toast for errors the user must act on.
NEVER: Callout for transient success confirmations.
NEVER: Modal for information that requires no decision.
```

#### Decision 2 — Displaying structured data

```
How many records?
│
├── 1 record → Entity Detail page. Never a table.
│
├── 2–4 records → Card Grid
│   Exception: user needs to sort or filter → use Data Table
│
└── 5+ records
    ├── User acts on items individually (review, approve, assign) → Card Queue
    └── User sorts, filters, bulk-selects, or exports → Data Table

NEVER: Data Table for fewer than 5 items.
NEVER: Card Queue when bulk selection is the primary action.
NEVER: Card Grid when records have more than 5 data points each.
```

#### Decision 3 — Collecting user input

```
How many fields?
│
├── 1–2 fields, quick in-context action → Inline form (no modal)
│
├── 3–6 fields, focused single task
│   ├── Secondary to the current page → Modal (sm or default)
│   └── Primary purpose of the current page → Page-level form
│
├── 7–12 fields, logically grouped
│   ├── Groups are independent → Settings Layout with sections
│   └── Groups must be completed in sequence → Wizard
│
└── Any fields are conditional (Field B depends on Field A) →
    Wizard always, regardless of total field count

NEVER: More than 8 fields in a modal.
NEVER: A modal for a workflow requiring more than 2 steps.
NEVER: A wizard for a task completable in under 60 seconds.
```

#### Decision 4 — Taking action on a record

```
Does the action require leaving the current context?
│
├── No — user should keep the list visible
│   ├── Action is simple (assign, change status, toggle) → Inline or Dropdown
│   └── Action requires detailed input → Side Panel / Overlay
│
├── Yes — the record warrants full attention →
│   Navigate to Entity Detail page
│
└── Action is destructive or irreversible →
    Always: Confirmation Modal (sm, danger variant) first
    Never: Inline action without confirmation

NEVER: Full-page navigation for actions completing in under 60 seconds.
NEVER: Inline destructive action without a confirmation step.
```

#### Decision 5 — Communicating status

```
Is this a property of a record (what it currently IS)?
│
├── Yes → Badge
│   ├── Active / healthy / completed → Badge --success
│   ├── Pending / waiting / in review → Badge --warning
│   ├── Failed / blocked / overdue → Badge --danger
│   ├── Draft / inactive / archived → Badge --neutral
│   └── In progress / processing → Badge --primary
│
└── No — it is a system or process condition
    ├── Temporary, resolves itself → Toast
    ├── Persistent, user must act → Callout --warning or --danger
    └── Blocks all further action → Callout --danger, non-dismissible, top of page

NEVER: Badge for a status that requires user action.
Badges describe what something IS. Callouts describe what needs to HAPPEN.
NEVER: More than one danger callout per page.
```

#### Decision 6 — Choosing an empty state

```
Why is the content area empty?
│
├── No data exists yet (first use) → empty-state (no-data)
│   Copy: "[Objects] will appear here once [action]."
│   CTA: Primary action
│
├── Filters return no results → empty-state (filtered)
│   Copy: "No [objects] match these filters."
│   CTA: Clear filters (secondary)
│
├── Data failed to load → empty-state (error)
│   Copy: "Failed to load [resource]. [Reason if known]."
│   CTA: Try again (secondary)
│
└── Content exists but user lacks permission → empty-state (permission)
    Copy: "You don't have access to [resource]."
    CTA: Request access (secondary or link)

NEVER: Use the no-data state when the real reason is a permission boundary.
NEVER: Leave a data area blank — a blank space is always a bug.
```

#### Decision 7 — Choosing a loading pattern

```
What is loading?
│
├── Full page or major section with known layout → Skeleton
│   Match skeleton structure exactly to the real content
│
├── Specific data within a loaded page
│   ├── Will replace a defined area → Skeleton (matching the shape)
│   └── Will appear inline → Inline spinner
│
├── An AI agent is reasoning → AI Thinking state
│   (distinct from data loading — three pulsing dots)
│
├── Multi-step process with known total steps → Progress bar
│
└── Button action in progress → .btn.is-loading

NEVER: Full-page spinner for content with a known layout.
NEVER: Skeleton for AI reasoning — they communicate different things.
NEVER: Show any loading state without a timeout fallback.
```

#### Decision 8 — Navigation within a view

```
Are the options mutually exclusive selections within the same view?
│
├── Yes, 2–5 options, switching view mode or filter scope →
│   Segmented Control
│
├── Yes, switching between content panels that load different content →
│   Tabs (role="tablist")
│
├── Yes, more than 5 options →
│   Select / Dropdown Filter
│
└── No, navigating between pages or sections →
    Top Nav — App Shell (§5.1). This product has NO sidebar.
    (never use tabs or segmented control for page-level navigation)

NEVER: Tabs and Segmented Control on the same view for the same level of navigation.
NEVER: More than 5 items in a Segmented Control.
NEVER: Segmented Control for page-level navigation.
```

#### Decision 9 — Button variant

```
What is the action's importance and risk?
│
├── The single most important action on this view → .btn--primary
│   (maximum one per screen section)
│
├── Secondary action, equal visual weight → .btn--secondary
│
├── Tertiary action, low visual priority → .btn--ghost
│
├── Navigation (goes somewhere, does not perform action) → .btn--link
│
├── Destructive, irreversible action → .btn--danger
│   (only after user has confirmed intent — never as first visible action)
│
└── Icon-only toolbar or table row action →
    .btn--ghost.btn--icon (always with aria-label naming the specific target)

NEVER: .btn--danger as the first visible action.
NEVER: More than one .btn--primary per section.
NEVER: .btn--link for actions that change data.
```

#### Decision 10 — Stay on page vs navigate away

```
What does the user need after completing the action?
│
├── They return to exactly where they were → Stay on page
│   Use: Modal, Side Panel, Inline action + Toast
│
├── They need to see the result in the same context → Stay on page
│   Use: Optimistic UI update then Toast confirmation
│
├── They need to do extended work on a single record →
│   Navigate to Entity Detail page
│
├── They are starting a multi-step sequential process →
│   Navigate to Wizard (full-page, suppress all other navigation)
│
└── Action opens an entirely new primary context →
    Navigate (new workspace, new project, new entity)

The deciding question: "Will the user want to go back immediately after?"
├── Yes → Stay on page
└── No → Navigate
```

---


## 11. Data Visualization Standards

**Chart library:** echarts-for-react (Apache ECharts React wrapper — `<ReactECharts option={…} />`)

### 11.1 The Core Rule

**Never use `$color-primary`, `$color-accent`, or any semantic color token in a chart.** Chart colors live in the `$chart-*` token family exclusively. Mixing brand colors with data series creates false semantic meaning — a chart bar in `$color-accent` (#0073E6) looks like an interactive element, not a data point.

### 11.2 Chart Color Tokens

#### Categorical palette — for comparing distinct series

| Token | Value | Use |
|-------|-------|-----|
| `$chart-cat-1` | `#3B82F6` | First series (blue — distinct from accent) |
| `$chart-cat-2` | `#10B981` | Second series (emerald) |
| `$chart-cat-3` | `#F59E0B` | Third series (amber) |
| `$chart-cat-4` | `#EF4444` | Fourth series (red) |
| `$chart-cat-5` | `#8B5CF6` | Fifth series (purple) |
| `$chart-cat-6` | `#EC4899` | Sixth series (pink) |
| `$chart-cat-7` | `#14B8A6` | Seventh series (teal) |
| `$chart-cat-8` | `#F97316` | Eighth series (orange) |

#### IMIN semantic chart colors — decision type mapping

Use these whenever charting relevance decision breakdowns. Always use in this order so decision types are visually consistent across all charts.

| Token | Value | Decision type |
|-------|-------|--------------|
| `$chart-relevant-a` | `#10B981` | Type A Relevant |
| `$chart-relevant-b` | `#3B82F6` | Type B Relevant |
| `$chart-relevant-c` | `#8B5CF6` | Type C Relevant |
| `$chart-not-rel`    | `#EF4444` | Not Relevant |
| `$chart-no-dec`     | `#94A3B8` | No Decision |

### 11.3 Chart Type Selection

| Chart type | Use when | IMIN use cases |
|-----------|----------|---------------|
| **Donut** | Showing proportions of a whole | Decision breakdown, file status distribution |
| **Bar** | Comparing values across discrete categories | Files by collection, team workload |
| **Line** | Showing trends over time | Review throughput, daily file volume |

**Decision tree:**
- Is the question "what proportion?" → Donut
- Is the question "which is largest?" → Bar
- Is the question "how has this changed?" → Line

### 11.4 ECharts Option Patterns

All charts must use these base settings. Copy and extend — do not deviate.

```typescript
// Base option — apply to ALL chart types
const baseOption = {
  animation: true,
  backgroundColor: 'transparent',
  textStyle: {
    fontFamily: 'Inter, system-ui, sans-serif',
    color: '#64748B'       // $chart-axis-text
  },
  tooltip: {
    backgroundColor: '#1E293B',   // $chart-tooltip-bg
    borderColor: '#334155',
    textStyle: { color: '#F1F5F9', fontSize: 13 },
    confine: true
  }
};

// Axis base (bar + line charts)
const axisBase = {
  xAxis: {
    type: 'category',
    axisLine:  { lineStyle: { color: '#E2E8F0' } },
    axisTick:  { show: false },
    axisLabel: { color: '#64748B', fontSize: 12 }
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: '#F1F5F9', type: 'solid' } },
    axisLine:  { show: false },
    axisLabel: { color: '#64748B', fontSize: 12 }
  }
};

// Donut chart
const donutOption = {
  ...baseOption,
  series: [{
    type: 'pie',
    radius: ['55%', '80%'],
    center: ['50%', '50%'],
    label: { show: false },
    emphasis: { label: { show: true, fontSize: 20, fontWeight: 700 } },
    data: [
      { name: 'Relevant — Type A', value: 42, itemStyle: { color: '#10B981' } },
      { name: 'Relevant — Type B', value: 18, itemStyle: { color: '#3B82F6' } },
      { name: 'Relevant — Type C', value: 9,  itemStyle: { color: '#8B5CF6' } },
      { name: 'Not Relevant',      value: 24, itemStyle: { color: '#EF4444' } },
      { name: 'No Decision',       value: 7,  itemStyle: { color: '#94A3B8' } }
    ]
  }]
};

// Bar chart
const barOption = {
  ...baseOption, ...axisBase,
  series: [{
    type: 'bar',
    barMaxWidth: 48,
    itemStyle: { color: '#3B82F6', borderRadius: [4, 4, 0, 0] }
  }]
};

// Line chart (with area fill)
const lineOption = {
  ...baseOption, ...axisBase,
  series: [{
    type: 'line',
    smooth: 0.3,
    symbol: 'circle', symbolSize: 6,
    lineStyle: { width: 2, color: '#3B82F6' },
    itemStyle: { color: '#3B82F6', borderWidth: 2, borderColor: '#fff' },
    areaStyle: {
      color: {
        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(59,130,246,.15)' },
          { offset: 1, color: 'rgba(59,130,246,0)' }
        ]
      }
    }
  }]
};
```

### 11.5 Chart States

Every chart wrapper must handle four states. Use the `.chart-container` component.

```jsx
<div className="chart-card">
  <div className="chart-card__header">
    <div>
      <div className="chart-card__title">Decision Breakdown</div>
      <div className="chart-card__subtitle">Last 30 days · 143 files</div>
    </div>
    <div className="chart-card__actions">
      <button className="btn btn--ghost btn--sm">Export</button>
    </div>
  </div>

  <div className="chart-container" style={{ height: 240 }}>

    {/* Loading */}
    {loading && (
      <div className="chart-state chart-state--loading">
        <div className="skeleton__line" style={{ height: 200, borderRadius: 8 }}></div>
      </div>
    )}

    {/* Error */}
    {error && !loading && (
      <div className="chart-state chart-state--error">
        <svg className="ds-icon ds-icon--lg" aria-hidden="true"><use href="#icon-alert-circle" /></svg>
        <p>Failed to load chart data.</p>
        <button className="btn btn--secondary btn--sm" onClick={retry}>Try again</button>
      </div>
    )}

    {/* Empty */}
    {!loading && !error && !data?.length && (
      <div className="chart-state chart-state--empty">
        <svg className="ds-icon ds-icon--lg" aria-hidden="true"><use href="#icon-bar-chart-2" /></svg>
        <p>No data available for this period.</p>
      </div>
    )}

    {/* Chart — echarts-for-react */}
    {!loading && !error && data?.length > 0 && (
      <ReactECharts
        option={chartOption}
        role="img"
        aria-label={`${chartTitle}: ${chartSummary}`}
        style={{ height: '100%', width: '100%' }}
      />
    )}

  </div>

  {/* Accessibility: data-table toggle — always provide */}
  <button className="chart-table-toggle" onClick={toggleTable}>
    View as table
  </button>
  <div className={`chart-table-fallback ${tableVisible ? 'is-visible' : ''}`}>
    <table className="data-table" aria-label={`Chart data — ${chartTitle}`}>
      ...
    </table>
  </div>
</div>
```

**Claude Rules for Charts:**
- Every chart must have a visible title and a machine-readable `aria-label` on the echarts element
- Always provide a "View as table" toggle — this is a WCAG requirement, not optional
- Never pass `$color-accent` or `$color-primary` as a chart series color
- The IMIN semantic palette (`$chart-relevant-*`) must be used consistently — Type A is always `#10B981` everywhere it appears
- Tooltip formatting follows Section 2.7 Formatting Conventions (numbers: commas, dates: Mon D format, percentages: 1 decimal)
- Bar chart series colors follow categorical palette order: `$chart-cat-1` first, `$chart-cat-2` second, etc.

---

## 12. Zoom and Reflow

IMIN is a desktop-first product. WCAG 1.4.4 (Resize Text) and 1.4.10 (Reflow) compliance is required.

### Effective viewport widths at common zoom levels

| Zoom | 1440px screen | 1280px screen | Behavior |
|------|--------------|--------------|---------|
| 100% | 1440px | 1280px | Full layout |
| 125% | 1152px | 1024px | Reduced padding (1024px breakpoint) |
| 150% | 960px  | 853px  | Reduced padding, compact nav |
| 200% | 720px  | 640px  | 768px breakpoint triggers — compact layout |
| 400% | 360px  | 320px  | WCAG minimum — single column, scrollable |

### Behavior at each breakpoint

**At 1024px (125% zoom on 1440px):**
- `page-container` padding reduces to 24px
- Stat grid: 2 columns
- Dashboard split: narrows to 300px activity panel

**At 768px (200% zoom on 1440px):**
- Top nav: product name hidden, item padding reduces
- File list panel narrows to 240px
- Dashboard split: stacks to single column
- Stat grid: 2 columns
- All tables retain horizontal scroll

**At 480px (400% zoom on 720px):**
- Stat grid: single column
- Modals: bottom sheet (border-radius top only)

### WCAG 1.4.10 Reflow

At 320px CSS width (400% zoom on 1280px), all content must be available in a single column without horizontal scrolling. Exceptions: data tables and Kanban boards may scroll horizontally — these are two-dimensional data structures exempt from reflow under WCAG.

### What NOT to do at zoom

- Never use `overflow: hidden` on the `<body>` — this breaks zoom reflow
- Never use fixed pixel widths on text containers — use `max-width` with `%` or `ch` units
- Never rely on absolute positioning for layout at small effective widths
- The Kanban board and data tables MUST have horizontal scroll — they are exempt from reflow by WCAG definition

---

---

## 13. Keyboard Interaction Standards

Every interactive component must be fully operable by keyboard. This section defines the required keyboard behaviour per component type. These are not optional — they are part of the component specification.

### 13.1 Global Rules

- **Tab** always moves focus forward through interactive elements in DOM order
- **Shift + Tab** always moves focus backward
- **Focus is always visible** — the `$color-accent` 2px outline must appear on every focused element
- **Focus is never trapped** except inside an open Modal or Dialog
- **Escape** always closes overlays (modals, dropdowns, tooltips) and returns focus to the triggering element

### 13.2 Modal / Dialog

| Key | Behaviour |
|-----|-----------|
| `Tab` | Cycles forward through focusable elements inside the modal only |
| `Shift + Tab` | Cycles backward through focusable elements inside the modal only |
| `Escape` | Closes the modal. Focus returns to the element that triggered it |
| `Enter` | Activates the focused button |

**Rules:**
- On open: focus moves to the first focusable element (or the dialog title if nothing is focusable)
- Background content is inert while the modal is open — keyboard cannot reach it
- On close: focus always returns to the element that triggered the modal

### 13.3 Dropdown / Contextual Menu

| Key | Behaviour |
|-----|-----------|
| `Enter` or `Space` on trigger | Opens the dropdown. Focus moves to the first item |
| `Arrow Down` | Moves focus to the next item. Wraps from last to first |
| `Arrow Up` | Moves focus to the previous item. Wraps from first to last |
| `Home` | Moves focus to the first item |
| `End` | Moves focus to the last item |
| `Enter` or `Space` on item | Selects item and closes the dropdown |
| `Escape` | Closes the dropdown. Focus returns to the trigger |
| `Tab` | Closes the dropdown. Focus moves to the next element in the page |

### 13.4 Tabs / Segmented Control

Tabs use **roving tabindex** — only the active tab is in the tab order. Arrow keys move between tabs.

| Key | Behaviour |
|-----|-----------|
| `Tab` | Moves focus into the tab group (to the active tab), then out of it |
| `Arrow Right` or `Arrow Down` | Moves focus to the next tab and activates it |
| `Arrow Left` or `Arrow Up` | Moves focus to the previous tab and activates it |
| `Home` | Moves focus to the first tab and activates it |
| `End` | Moves focus to the last tab and activates it |

**Rule:** Tabs activate on arrow key focus — do not require a separate Enter press to activate.

### 13.5 Data Table

| Key | Behaviour |
|-----|-----------|
| `Tab` | Moves between interactive elements: checkboxes, column headers, action buttons |
| `Space` on row checkbox | Toggles row selection |
| `Space` on select-all checkbox | Selects or deselects all rows |
| `Enter` on sortable header | Toggles sort direction |
| `Enter` on row action button | Activates that button |

### 13.6 Form Controls — Text Input

| Key | Behaviour |
|-----|-----------|
| `Tab` | Moves focus in and out of the field |
| `Shift + Tab` | Moves focus backward |
| `Enter` | Submits the nearest form (if no other handler intercepts) |

### 13.7 Form Controls — Select

| Key | Behaviour |
|-----|-----------|
| `Space` or `Arrow Down` | Opens the select |
| `Arrow Down` | Moves focus to the next option |
| `Arrow Up` | Moves focus to the previous option |
| `Enter` | Selects the focused option and closes |
| `Escape` | Closes without changing selection |
| `Home` | Moves to the first option |
| `End` | Moves to the last option |

### 13.8 Board Switcher / Pill Filter Group

| Key | Behaviour |
|-----|-----------|
| `Tab` | Moves focus into the group (to the active item), then out |
| `Arrow Right` | Moves focus to the next item and selects it |
| `Arrow Left` | Moves focus to the previous item and selects it |
| `Home` | Moves to the first item |
| `End` | Moves to the last item |

Uses roving tabindex — same pattern as Tabs.

### 13.9 Toast

| Key | Behaviour |
|-----|-----------|
| `Tab` | If the toast has an action button, Tab moves focus to it |
| `Enter` or `Space` on action | Activates the action |
| `Escape` | Dismisses the toast |

**Rule:** Toasts without action buttons are not keyboard-focusable. They are announced to screen readers via `role="status"` (non-urgent) or `role="alert"` (urgent/error).

### 13.10 Card (Interactive)

| Key | Behaviour |
|-----|-----------|
| `Tab` | Moves focus to the card (or through interactive elements inside it) |
| `Enter` | Activates the card's primary action |
| `Space` | Activates the card if it functions as a toggle |

---

## 14. UI Copy Patterns

Lightweight system-level writing standards. These govern interface copy — not brand voice. The goal is specificity and consistency across every message the system produces.

### 14.1 Core Rule

**Be specific. Be actionable. Use plain language.**

| ✓ Good | ✗ Bad |
|--------|-------|
| Enter a valid email address | Invalid input |
| Changes saved | Operation completed successfully |
| Couldn't connect. Try again | An error occurred |
| Delete collection? | Are you sure? |
| No files yet. Upload your first file | N/A |

### 14.2 Error Messages

**Formula:** [What went wrong] + [How to fix it]

```
Enter a valid email address.
Password must be at least 8 characters.
This email is already in use. Sign in instead.
File exceeds the 25 MB limit. Choose a smaller file.
```

**Rules:**
- Name the field or value that failed, not the system operation
- Tell the user what to do, not what they did wrong
- Never use: "Error", "Failed", "Invalid", "Validation error" as the full message
- Always pair with an icon — never rely on color alone

### 14.3 Empty States

**Formula:** [What's missing] + [What to do next]

| Context | Title | Description | Action |
|---------|-------|-------------|--------|
| First use | "No [things] yet" | "Create your first [thing] to get started." | "Add [thing]" |
| No results | "No results" | "No [things] match your current filters." | "Clear filters" |
| Permission denied | "Access restricted" | "You don't have permission to view this. Contact your admin." | — |
| Disconnected | "Can't load [thing]" | "Check your connection and try again." | "Retry" |

**Rules:**
- Never use "N/A" or "—" as an empty state
- Never leave an empty state without a next action (except permission-denied)
- Empty state title is a noun phrase, not a sentence: "No files yet" not "You don't have any files yet"

### 14.4 Confirmation Dialogs

**Title:** The consequence, not the action.
**Body:** What will happen. Be specific.
**Primary button:** The action verb. Not "Yes" or "Confirm".
**Secondary button:** Always "Cancel".

```
Title:   Delete Litigation Q3?
Body:    This will permanently delete the collection and all 47 files.
         This can't be undone.
Primary: Delete
Cancel:  Cancel
```

**Rules:**
- Title ends with a `?`
- Never: "Are you sure you want to..." as the title
- Never: "Yes", "OK", "Confirm" as the primary button label
- Destructive primary buttons use `.btn--danger`

### 14.5 Toast Messages

| Type | Tense | Example |
|------|-------|---------|
| Success | Past tense | "Changes saved" |
| Error | Present tense | "Couldn't save changes. Try again." |
| Info | Present tense | "Auto-saving every 30 seconds." |

**Rules:**
- Success toasts: no period for single phrases. "Changes saved" not "Changes saved."
- Error toasts: always include a recovery action or direction
- Never: "Operation completed successfully", "Action performed", "Process finished"
- Max one sentence. If you need more, use a callout instead of a toast

### 14.6 Form Validation

Validate on blur (when the user leaves a field) — not on keystroke.

| Scenario | Message |
|----------|---------|
| Required field, left empty | "Enter your [field name]" |
| Format invalid | "Enter a valid [field name]" |
| Value already in use | "[Value] is already in use. [Recovery action]." |
| Below minimum | "[Field] must be at least [min]." |
| Above maximum | "[Field] must be [max] or fewer characters." |

**Rules:**
- Always show validation inline — below the field, never in a toast
- Show field-level errors, not form-level summaries
- Resolve errors on keystroke once the user starts correcting

### 14.7 Loading States

| Duration | Pattern | Copy |
|----------|---------|------|
| < 1 second | No indicator | — |
| 1–3 seconds | Skeleton or spinner | No copy needed |
| 3–10 seconds | Spinner | "Loading [thing]..." |
| > 10 seconds | Progress indicator | "This may take a moment." |

**Rules:**
- Use "Loading files..." not just "Loading..." when the subject is known
- Never leave a spinner running with no copy for operations over 3 seconds
- For operations users trigger (export, upload): show a progress indicator, not a spinner

---

## 15. Z-Index Layer System

Named semantic layers. Never use raw z-index values in component CSS — always reference a layer variable. This prevents the collision bugs that occur when two independently-developed components both use `z-index: 1000`.

### Layer scale

| Layer | Variable | Value | Elements |
|-------|----------|-------|---------|
| Base | `$z-base` | 0 | Default document flow |
| Sticky | `$z-sticky` | 100 | Sticky headers, fixed top nav |
| Dropdown | `$z-dropdown` | 200 | Dropdown menus, contextual menus |
| Popover | `$z-popover` | 300 | Interactive overlays (click-triggered, contains focusable elements) |
| Overlay | `$z-overlay` | 400 | Modal backdrop / scrim |
| Modal | `$z-modal` | 500 | Modals, dialogs |
| Toast | `$z-toast` | 600 | Toast notifications |
| Tooltip | `$z-tooltip` | 700 | Tooltips — always highest |

### Why Tooltip is highest

A tooltip triggered on a button **inside a modal** must appear above the modal. At any z-index below `$z-modal`, it would be buried. Tooltip is non-interactive (hover-triggered, no focusable elements) so it can safely sit above everything without blocking interaction.

### Popover vs Tooltip — definitions

These are frequently confused. The distinction determines keyboard behaviour, ARIA, and dismissal rules:

| Attribute | Tooltip | Popover |
|-----------|---------|---------|
| Trigger | Hover / focus | Click |
| Interactive | No | Yes — can contain buttons, links |
| ARIA role | `role="tooltip"` | `role="dialog"` or contextual |
| Focus managed | No | Yes — focus moves into popover |
| Dismiss | Cursor-out / blur | Explicit close or click outside |
| Max width | 220px | Content-driven |

**Never put interactive content in a tooltip.** If a user needs to click something inside the overlay, it's a Popover, not a Tooltip.

### Usage in SCSS

```scss
// Component file
.dropdown__menu {
  z-index: $z-dropdown; // ← always use the variable, never a raw number
}

.modal-overlay {
  z-index: $z-overlay;
}

.modal {
  z-index: $z-modal;
}

.tooltip {
  z-index: $z-tooltip;
}
```

### Utility classes (markup use)

```jsx
<div className="z-sticky">...</div>
<div className="z-dropdown">...</div>
<div className="z-modal">...</div>
<div className="z-tooltip">...</div>
```

---

## 16. Responsive Grid

12-column grid with named gutter and margin tokens. Columns stay at 12 through 1024px — collapsing to 8 at that width is too aggressive for enterprise tools where most users work at 1024–1280px.

### Breakpoint specification

| Breakpoint | Columns | Margin | Gutter | Philosophy |
|------------|---------|--------|--------|-----------|
| 1440px+ | 12 | 32px | 24px | Ideal — primary design target |
| 1024–1439px | 12 | 24px | 24px | Primary working width — no collapse |
| 768–1023px | 8 | 24px | 16px | Adaptive — full functionality, some stacking |
| < 768px | 4 | 16px | 16px | Accessible — not optimised |

### Tablet behaviour (768–1023px)

Tablet is **adaptive but fully functional**. No feature is hidden or removed. Layout changes only:
- Data tables scroll horizontally
- Dense side-by-side layouts stack vertically
- Secondary panels collapse to a toggle
- Complex filters move into drawers

### Mobile behaviour (< 768px)

Mobile is **accessible, not optimised**. Users can review records, approve tasks, and read data. They cannot perform heavy editing, complex reporting, or table administration — these are inherently desktop workflows.

### HTML usage

```jsx
{/* Grid container — use instead of page-container for grid-based layouts */}
<div className="grid-container">
  <div className="grid-row">

    {/* Span columns using .col-{n} (1–12) */}
    <div className="col-8">Main content</div>
    <div className="col-4">Sidebar</div>

  </div>
</div>

{/* Preset layouts */}
<div className="grid-container">
  <div className="grid-halves">...</div>    {/* 1:1 two-column */}
  <div className="grid-thirds">...</div>   {/* 1:1:1 three-column (2-up at tablet) */}
  <div className="grid-sidebar">...</div>  {/* 280px fixed + flex content */}
  <div className="grid-sidebar-r">...</div>{/* flex content + 320px fixed */}
</div>
```

### SCSS variables

```scss
$grid-cols-lg:    12;        // 1024px+
$grid-cols-md:     8;        // 768–1023px
$grid-cols-sm:     4;        // <768px

$grid-gutter-xl:  24px;     // 1024px+
$grid-gutter-md:  16px;     // 768–1023px

$grid-margin-xl:  32px;     // 1440px+
$grid-margin-lg:  24px;     // 1024–1439px
$grid-margin-md:  24px;     // 768–1023px
$grid-margin-sm:  16px;     // <768px
```

**Claude Rules for Grid:**
- Use `.grid-container` instead of `.page-container` when the layout uses column spans
- Never hardcode column widths in pixels — use `.col-{n}` or preset layouts
- Never suppress functionality at tablet — only adapt the layout
- Data tables and Kanban boards are exempt from the 4-column mobile reflow (WCAG exception for two-dimensional data)

---

## 17. Tooltip

Non-interactive contextual label triggered on hover or keyboard focus. The most commonly misimplemented component. Read the Popover vs Tooltip distinction in Section 15 before building anything overlay-like.

### Anatomy

- **Trigger:** any interactive element (`button`, `a`, form control, icon button)
- **Content:** one short phrase — max 220px wide, wraps if needed
- **Positioning:** prefer top-center; flip to bottom if clipped; flip to right if near left edge
- **Arrow:** 6px triangle pointing at the trigger

### Timing

| Event | Delay | Reason |
|-------|-------|--------|
| Show (mouse) | 300ms | Prevents flicker on cursor transit |
| Show (focus) | 0ms | Keyboard users need immediate feedback |
| Hide (mouse-out) | 0ms | Remove immediately on cursor leave |
| Hide (blur) | 0ms | Remove immediately on focus leave |

### HTML Pattern

```jsx
{/* The trigger element */}
<button
  className="btn btn--ghost btn--icon"
  aria-label="Download file"
  aria-describedby="tooltip-download"
  data-tooltip="Download">
  <svg className="ds-icon" aria-hidden="true"><use href="#icon-download"/></svg>
</button>

{/* The tooltip — rendered via JS, positioned absolutely */}
<div className="tooltip"
     id="tooltip-download"
     role="tooltip"
     aria-hidden="true">
  Download
</div>
```

### SCSS

```scss
.tooltip {
  position: absolute;
  z-index: $z-tooltip;   // 700 — always above everything
  background: var(--neutral-900);
  color: #F1F5F9;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  padding: 5px 9px;
  border-radius: $radius-md;
  max-width: 220px;
  white-space: normal;
  word-break: break-word;
  pointer-events: none;   // tooltip itself is never interactive
  user-select: none;

  // Arrow
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: var(--neutral-900);
    border-bottom: none;
  }

  // Position variants (JS sets these based on available space)
  &--bottom::after {
    top: -5px; bottom: auto;
    border-top: none;
    border-bottom: 5px solid var(--neutral-900);
  }
}
```

### Accessibility rules

- `role="tooltip"` on the tooltip element
- `aria-describedby="{tooltip-id}"` on the trigger — not `aria-label` (that replaces the label; this supplements it)
- `aria-hidden="true"` on the tooltip when not visible
- Tooltip content must never be the **only** source of critical information — it is supplementary
- Never put links, buttons, or any interactive element inside a tooltip
- On mobile / touch: suppress the tooltip entirely — touch devices have no hover state

### Mobile behaviour

```scss
@media (hover: none) {
  .tooltip { display: none !important; }
}
```

Suppressing on touch devices is the correct behaviour. If the information is important enough to show on mobile, it belongs in the UI itself — not in a tooltip.

**Claude Rules for Tooltip:**
- Always use `$z-tooltip` (700) — never a lower value
- Always use `aria-describedby` on the trigger, not `aria-label`
- Never put interactive content inside a tooltip — that is a Popover
- Always suppress on touch devices with `@media (hover: none)`
- Show delay: 300ms on hover, 0ms on focus
- Max width: 220px

---

## 18. QA Checklists

Two separate checklists for two separate audiences. One answers "Does it feel like the product?" The other answers "Can it ship safely?" Never combine them into one.

---

### 18.1 Design Review Checklist

**Audience:** Designers, Claude Design output review
**Question it answers:** Does this feel right?

#### Visual

- [ ] Spacing uses system tokens — no hardcoded pixel values
- [ ] Typography uses semantic role classes (`.t-display`, `.t-title`, `.t-body`, etc.)
- [ ] Exactly one `.btn--primary` per view — never two
- [ ] Alignment is consistent — elements share axis lines
- [ ] Truncation rules applied — long text uses `overflow: hidden; text-overflow: ellipsis`
- [ ] Icon sizes match context — `ds-icon--sm` in compact areas, default in standard

#### States

- [ ] Loading state shown (skeleton matches the loaded layout)
- [ ] Empty state shown (title + description + action)
- [ ] Error state shown (recoverable — has a retry path)
- [ ] All interactive component states visible: hover, focus, active, disabled

#### Content

- [ ] Error messages follow the formula: [what went wrong] + [how to fix it]
- [ ] Confirmation dialog titles state the consequence, not the action
- [ ] Toast copy is past tense for success, present tense for error
- [ ] Empty states have a next action (except permission-denied)

#### Theme

- [ ] Reviewed in both light and dark mode
- [ ] No hardcoded colour values visible in dark mode
- [ ] Neutral scale light values (0–200) are visible in dark mode

#### Responsive

- [ ] Layout adapts gracefully at 1024px
- [ ] No content is hidden at tablet — only restructured
- [ ] Overflow behaviour defined for all data-heavy components

---

### 18.2 Engineering QA Checklist

**Audience:** Engineers, PR reviewers, AI-generated implementation review
**Question it answers:** Can this ship safely?

#### Accessibility

- [ ] All interactive elements reachable by keyboard (Tab / Shift+Tab)
- [ ] Focus ring visible on every focused element — `outline` never suppressed without replacement
- [ ] Contrast AA verified: text on background ≥ 4.5:1, large text ≥ 3:1
- [ ] Form inputs have associated `<label>` elements (not just `placeholder`)
- [ ] Images have meaningful `alt` text (or `alt=""` if decorative)
- [ ] ARIA roles and states implemented per Section 13 keyboard specs
- [ ] Modal: focus trapped, background inert, focus returns to trigger on close
- [ ] Dropdown: `aria-expanded`, `aria-haspopup` on trigger; `role="menu"` on container

#### Functionality

- [ ] Validation fires on blur — not on keystroke
- [ ] Disabled states use `disabled` attribute or `aria-disabled` — not CSS only
- [ ] Loading states use `aria-busy="true"` on the loading container
- [ ] Read-only inputs remain focusable
- [ ] All error states are recoverable — every error has a path forward

#### Responsive

- [ ] Tested at 1440px, 1280px, 1024px, 768px
- [ ] Data tables and Kanban boards scroll horizontally at narrow widths
- [ ] Touch targets ≥ 44×44px on any touchable element
- [ ] No content hidden at tablet (768–1023px) — only restructured

#### Performance

- [ ] `prefers-reduced-motion` respected — no animation when user has reduced motion enabled
- [ ] Animations use `transform` and `opacity` only — no layout-triggering properties
- [ ] No `box-shadow` animation on large surfaces (use `opacity` instead)

#### Dark mode

- [ ] Component renders correctly in `.dark`
- [ ] No hardcoded hex or RGB colours in component CSS
- [ ] All colour values reference CSS custom properties
- [ ] Z-index values use named layer variables (`$z-modal`, `$z-tooltip`, etc.)

---

## Appendix B: Quick Token Reference

```scss
// Colors
$color-primary: #1D3557  $color-accent: #0073E6  $color-danger: #DC2626
$color-success: #16A34A  $color-warning: #EABA1C  $color-info: #0EA5E9
$text-primary: #24272D   $text-secondary: #475569  $text-tertiary: #64748B
$surface-base: #FFFFFF   $surface-page: #F8FAFC   $border-default: #E2E8F0

// Chart tokens — IMIN decision types
$chart-relevant-a: #10B981   $chart-relevant-b: #3B82F6
$chart-relevant-c: #8B5CF6   $chart-not-rel: #EF4444   $chart-no-dec: #94A3B8

// Chart tokens — categorical (in order of use)
$chart-cat-1: #3B82F6  $chart-cat-2: #10B981  $chart-cat-3: #F59E0B
$chart-cat-4: #EF4444  $chart-cat-5: #8B5CF6  $chart-cat-6: #EC4899

// Chart surface
$chart-axis-text: #64748B   $chart-tooltip-bg: #1E293B   $chart-grid-line: #F1F5F9

// Spacing (select)
4px · 8px · 12px · 16px · 24px · 32px · 40px · 48px · 64px

// Radius
sm:4px · md:6px · lg:9px · xl:12px · pill:9999px

// Shadow
sm: 0 1px 2px rgba(15,23,42,.06)
md: 0 4px 12px rgba(15,23,42,.10)
lg: 0 12px 24px rgba(15,23,42,.14)

// Motion
fast:120ms · base:180ms · slow:240ms · ease-out:cubic-bezier(0,0,0.2,1)
```

---
*IMIN Design System v2.1 · June 2026*
