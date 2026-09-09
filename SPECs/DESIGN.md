---
name: PetiscoPet Design System
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#424752'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737783'
  outline-variant: '#c3c6d3'
  surface-tint: '#245db0'
  primary: '#245db0'
  on-primary: '#ffffff'
  primary-container: '#77a7ff'
  on-primary-container: '#003b7e'
  inverse-primary: '#acc7ff'
  secondary: '#00696b'
  on-secondary: '#ffffff'
  secondary-container: '#20fbfe'
  on-secondary-container: '#007072'
  tertiary: '#006c52'
  on-tertiary: '#ffffff'
  tertiary-container: '#00be92'
  on-tertiary-container: '#004634'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#acc7ff'
  on-primary-fixed: '#001a40'
  on-primary-fixed-variant: '#004491'
  secondary-fixed: '#20fbfe'
  secondary-fixed-dim: '#00dcdf'
  on-secondary-fixed: '#002020'
  on-secondary-fixed-variant: '#004f50'
  tertiary-fixed: '#64fbcb'
  tertiary-fixed-dim: '#40deb0'
  on-tertiary-fixed: '#002117'
  on-tertiary-fixed-variant: '#00513d'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Poppins
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Poppins
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Poppins
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Poppins
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  headline-sm:
    fontFamily: Poppins
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Open Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Open Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Open Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Poppins
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Poppins
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Poppins
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  gutter-mobile: 1rem
  gutter-desktop: 1.5rem
  margin-mobile: 1.25rem
  margin-desktop: 2rem
---

## Brand & Style

The design system embodies a fresh, cheerful, and wholesome aesthetic tailored for pet parents seeking premium, natural, and handmade nutrition for their pets. The emotional tone is energetic, welcoming, and rigorously clean—balancing the joy and love for pets with the nutritional reliability of an artisanal culinary brand.

The visual direction merges **Modern Organic Softness** with **Tactile Fluid Minimalism**:
- Generous whites and clean negative space keep the interface breezy and legible.
- Expressive, energetic gradients blending sky blue, vivid cyan, and crisp mint greens convey vitality, freshness, and high energy.
- Organic rounded structures evoke friendly warmth and touchable safety.
- Micro-interactions are tactile, bouncy, and responsive, offering immediate physical feedback on tap and hover without feeling childish.

## Colors

The color palette reflects purity, hydration, freshness, and health. The light canvas highlights colorful pet treat photography while maintaining WCAG AA contrast standards for readability.

### Core Swatches
- **Primary (Sky Blue - `#77A7FF`):** Main interactive elements, primary branding, navigation active states, and focused accents.
- **Secondary (Vibrant Cyan - `#24FCFF`):** High-energy highlight used sparingly for promotions, dynamic gradients, active toggles, and hero banners.
- **Tertiary (Soft Mint Green - `#68FFCE`):** Natural ingredient tags, freshness badges, and complementary gradient stops.
- **Accent & Success (Vivid Green - `#20FF6B`):** Explicit success indicators, health certifications, dietary approvals, and cart confirmation badges.
- **Soft Tint (Pastel Sky - `#BEE9FF`):** Soft surface fills, chip backgrounds, and gentle focus rings.

### Neutral & Surface Hierarchy
- **Canvas Base:** `#FFFFFF` (pure white for cards and floating sheets).
- **Background Surface:** `#F8FAFC` (neutral canvas background) and `#F1F5F9` (recessed track backgrounds, dividers, and input fills).
- **Text & Headings:** Deep graphite `#0F172A` for headlines and primary text; slate `#334155` for secondary body copy, metadata, and placeholder text.

## Typography

The typographic pairing balances geometric warmth with clear legibility:
- **Poppins** handles all display headers, category titles, pricing callouts, and interactive button labels. Its circular geometry and friendly terminal curves complement the pet-centric brand personality.
- **Open Sans** drives nutritional descriptions, ingredient listings, reviews, and body text. Its neutral vertical metrics and open letterforms guarantee effortless reading on small screens.

### Iconography Rules
Icons exclusively leverage **Google Material Symbols Rounded** (fill: 0 or 1, weight: 400-500, optical size: 20-24px). Standard Unicode emojis must not be used inside UI components to maintain an elevated, cohesive, and intentional brand feel.

## Layout & Spacing

The layout model utilizes a standard 8pt spatial system nested inside a fluid, adaptive container.

### Breakpoints & Grids
- **Mobile (< 640px):** 4-column layout, `16px` (1rem) gutters, `20px` (1.25rem) margins. Sticky bottom action bar for navigation and instant checkout.
- **Tablet (640px - 1024px):** 8-column layout, `20px` gutters, `24px` margins. Adaptive card grids displaying 2 to 3 items per row.
- **Desktop (> 1024px):** 12-column layout max-width `1200px`, `24px` (1.5rem) gutters, centered alignment with dynamic side padding.

Vertical rhythm adheres strictly to multiples of 8px (with 4px reserved for micro-spacing between icons and label pairs).

## Elevation & Depth

Depth is established through subtle atmospheric lighting rather than harsh drop shadows. The design uses tinted ambient occlusion that carries faint blue-gray tones to maintain an airy, clean kitchen feel.

### Elevation Levels
- **Level 0 (Flat / Recessed):** Borderless `#F1F5F9` or pure `#FFFFFF` background with an ultra-soft border (`1px solid #E2E8F0`).
- **Level 1 (Card Default):** `box-shadow: 0 4px 20px -2px rgba(119, 167, 255, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04);`
- **Level 2 (Floating Action / Hover / Active Modals):** `box-shadow: 0 12px 32px -4px rgba(119, 167, 255, 0.16), 0 4px 12px -2px rgba(15, 23, 42, 0.06);`
- **Level 3 (Sticky Navigation / Bottom Sheets):** `box-shadow: 0 -8px 24px -4px rgba(15, 23, 42, 0.05);`

All floating surfaces include a subtle translucent rim when layered above imagery: `backdrop-filter: blur(12px)`.

## Shapes

The shape language is ultra-rounded and tactile, communicating gentle softness and welcoming ergonomics:
- **Base Shape Level (`rounded-xl` / 16px - 20px):** Used for input fields, review blocks, and compact pet dietary chips.
- **Key Container Level (`rounded-2xl` / 24px):** Standard for product cards, nutritional info tables, and floating modal panels.
- **Hero Containers (`rounded-3xl` / 32px):** Reserved for category banners, featured artisanal recipe showcases, and bottom sheet dialogs.
- **Interactive Pills (`rounded-full` / 9999px):** Buttons, search pills, floating tags, and segmented pet switchers (e.g., "Cães" vs. "Gatos").

## Components

### Buttons
- **Primary:** Filled `#77A7FF` with white text (`Poppins SemiBold`), `rounded-full`, height 48px or 56px. Gradient transition state combining `#77A7FF` to `#24FCFF` on hover.
- **Secondary / Soft:** Faint tint background `#BEE9FF` with `#0F172A` text and subtle hover lift.
- **Tactile Feedback:** `transform: scale(0.97)` on `:active` with cubic-bezier transition (`cubic-bezier(0.34, 1.56, 0.64, 1)`).

### Chips & Filters
- Compact pill-shaped selectors (`rounded-full`, padding `8px 16px`).
- **Unselected:** White fill with `1px solid #E2E8F0`, slate `#334155` text.
- **Selected:** Gradient wash (`#77A7FF` to `#68FFCE`) with dark graphite `#0F172A` text and an accompanying leading Material Symbol (e.g., `pets`, `eco`, `verified`).

### Product Cards
- Built using `rounded-2xl` surfaces on pure white with Elevation Level 1.
- Top media section has an internal subtle rounding (`rounded-xl`), accompanied by floating dietary badges (e.g., "100% Natural", "Sem Glúten") in tertiary mint `#68FFCE`.
- Action zone incorporates a direct rounded floating "+" button triggering micro-bounce feedback.

### Input Fields
- Filled background `#F1F5F9` transitioning to `#FFFFFF` on `:focus` with a 2px ring in `#77A7FF`.
- Border-radius `rounded-2xl` (16px), accompanied by leading Google Material Symbols Rounded icons in `#334155`.

### Checkboxes & Radio Controls
- Circular and smooth: `rounded-lg` for checkboxes (8px) and `rounded-full` for radios.
- In active states, filled with `#77A7FF` or `#20FF6B` with a clean white inner checkmark or pip, completely avoiding native browser styles.

### Specialized Pet Switcher (Segmented Control)
- Capsule container (`rounded-full`) in `#F1F5F9` holding dual switches for "Cães" (dog icon) and "Gatos" (cat icon).
- Active segment slides smoothly across with a pure white elevated pill (`rounded-full`), casting Elevation Level 1.