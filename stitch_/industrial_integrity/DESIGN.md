---
name: Industrial Integrity
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0b1c30'
  on-tertiary-container: '#75859d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  grid_columns: '12'
  gutter: 24px
  margin: 40px
  section_padding: 80px
  unit_base: 8px
---

## Brand & Style
The design system is engineered for a ToB export manufacturer specializing in 3C accessories. The brand personality is rooted in **Industrial Professionalism**—communicating reliability, precision, and international scale. The target audience includes global procurement officers and distributors who value transparency and manufacturing excellence.

The visual style is **Corporate Modern with an Industrial Edge**. It avoids the softness of consumer-facing SaaS in favor of structured, purposeful layouts. It utilizes high-quality industrial photography, generous white space, and a rigid adherence to alignment to evoke an emotional response of "security" and "capability." The aesthetic is clean and authoritative, prioritizing information density and legibility over decorative flourishes.

## Colors
The palette is anchored by **Deep Navy (#0F172A)**, representing the institutional stability of a large-scale manufacturer. This primary color is used for typography and structural headers. **Accent Blue (#2563EB)** serves as the "Action Color," reserved strictly for CTAs, interactive states, and key navigational highlights to ensure a clear path to inquiry.

**Slate Gray (#64748B)** is used for secondary text and icons, maintaining a professional hierarchy without the harshness of pure black. Backgrounds utilize **Off-White (#F8FAFC)** to distinguish different content modules, such as factory specs or product detail tables, ensuring the UI feels organized and airy.

## Typography
This design system utilizes **Inter** across all levels. It is chosen for its exceptional legibility in technical contexts and its neutral, systematic appearance. 

Headlines use a tighter letter-spacing and a semi-bold/bold weight to feel solid and architectural. Labels are often set in uppercase with slight tracking to differentiate metadata (like SKU numbers or material specs) from body copy. Mobile typography scales down display sizes while maintaining the same line-height ratios to preserve readability on factory floors or in transit.

## Layout & Spacing
The layout follows a strict **12-column fluid grid** for desktop, transitioning to 8 columns for tablet and 4 columns for mobile. A base unit of **8px** governs all spacing, ensuring vertical rhythm and modular consistency.

Large sections, such as "Factory Capabilities" or "Product Showcases," are separated by **80px** of vertical padding to prevent visual clutter and allow the high-quality photography to breathe. Product specifications and technical tables should use a condensed spacing model (4px-8px) to maximize the density of professional data.

## Elevation & Depth
To avoid a "consumer SaaS" look, this design system uses **Low-contrast outlines** combined with very subtle **Ambient shadows**. 

Depth is primarily established through tonal layering: surfaces sit on a `#F8FAFC` background with a white `#FFFFFF` card face. Borders are thin (1px) and colored in a light slate (`#E2E8F0`). For interactive elements like product cards, a hover state should trigger a slightly more pronounced, diffused shadow to indicate clickability without appearing "floaty."

## Shapes
The shape language is **Soft (0.25rem)**. This slight rounding takes the edge off the industrial aesthetic, making it feel modern and international rather than dated or "brutalist." It mimics the precision-machined corners often found in high-quality 3C hardware accessories. 

Buttons and input fields follow this 4px radius. Larger containers, such as factory gallery images, can scale up to 8px (rounded-lg) to frame photography elegantly.

## Components

### Buttons & CTAs
- **Primary (Inquiry):** Solid `#2563EB` background with white text. High-contrast, rectangular but with a 4px corner.
- **Secondary (Contact Us):** Outlined `#0F172A` border with matching text. 
- **Language Switcher:** A clean, borderless toggle in the utility nav using `label-sm` typography.

### Product Cards
- Clean white background with a subtle `#E2E8F0` border.
- Images are placed in a light gray container (`#F1F5F9`) to ensure white products (cables, adapters) remain visible.
- Typography identifies the SKU, Category, and key specs immediately below the image.

### Trust Elements
- **Certificate Wall:** A grayscale grid of ISO/CE/FCC logos with low opacity, moving to full color on hover.
- **Quality Badges:** Small, `label-sm` badges with a light blue background used on product detail pages to highlight "QC Passed" or "MFi Certified."

### Input Fields
- Structured, rectangular inputs with 1px slate borders. Focus states use a 2px Deep Navy border. Labels are always persistent above the field.

### Factory Gallery
- A modular grid of varying widths (spanning 4, 6, or 8 columns) to showcase manufacturing scale. Images should use a consistent aspect ratio (16:9 or 4:3) within their containers.