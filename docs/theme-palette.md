# SingleClick — Theme Palette

Extracted from the home-page design so the entire app stays visually consistent. Use these tokens in every component; never hard-code hex values in JSX.

## Brand

| Token | Hex | Usage |
|---|---|---|
| `brand` | `#2563EB` | Primary buttons, "Get Things Done" headline, brand icons |
| `brand-hover` | `#1D4ED8` | Hover state of brand buttons |
| `brand-soft` | `#DBEAFE` | Hero gradient blobs, light tints |
| `brand-softer` | `#EFF6FF` | "Your Privacy" section background |
| `brand-fg` | `#FFFFFF` | Text on brand surfaces |

Tailwind class examples: `bg-brand`, `text-brand`, `border-brand`, `bg-brand-soft`, `hover:bg-brand-hover`.

## Ink (dark surfaces)

| Token | Hex | Usage |
|---|---|---|
| `ink` | `#1E1B4B` | Footer, "A Smarter Way" video block, "Ready to Get Started" CTA |
| `ink-soft` | `#312E81` | Hover/secondary dark |
| `ink-fg` | `#FFFFFF` | Text on ink |

## Neutrals

| Token | Hex | Usage |
|---|---|---|
| `bg` | `#FFFFFF` | Page background |
| `surface` | `#F9FAFB` | Cards, FAQ items |
| `surface-2` | `#F3F4F6` | Subtle alternate rows |
| `border` | `#E5E7EB` | Default 1px borders |
| `fg` | `#0F172A` | Headings, body text |
| `muted` | `#64748B` | Captions, secondary text |
| `eyebrow` | `#2563EB` | Section eyebrows (e.g. "ABOUT US") |

## Accent palette

Used for **Top Categories** tiles and the **How Single Click Works** step icons. Apply via the matching utility class.

| Token | Hex | Step / Category |
|---|---|---|
| `accent-blue` | `#3B82F6` | App Development · Step 02 |
| `accent-purple` | `#8B5CF6` | Step 01 (Past an Enquiry) |
| `accent-green` | `#10B981` | Digital Marketing · Step 03 · privacy checks |
| `accent-orange` | `#F97316` | Web Development · Step 04 |
| `accent-amber` | `#F59E0B` | SEO Services · rating star |
| `accent-red` | `#EF4444` | Graphic Design · Step 05 |
| `accent-pink` | `#EC4899` | Content Writing |

Tailwind class examples: `bg-accent-blue`, `text-accent-green`, `ring-accent-purple`.

## Functional

| Token | Hex |
|---|---|
| `success` | `#10B981` |
| `warning` | `#F59E0B` |
| `danger` | `#EF4444` |
| `info` | `#3B82F6` |

## How to extend

When you add a new component, use a token — never `bg-[#2563EB]`. If a token doesn't exist yet, add it to `src/styles/theme.css` first so it's documented in one place.
