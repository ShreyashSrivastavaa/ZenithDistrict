# Z-02 Apparel Brand — Design Specification (DESIGN.md)
> Architectural on-demand garment label within ZenithDistrict Venture House.
> High-craft, editorial, factual minimalism. Designed like an atelier technical catalog.

---

## 1. Visual Atmosphere & Aesthetic Dial Settings
- **Design Variance:** 7 (Offset asymmetric editorial compositions, alternating collection card scales, deliberate rhythm).
- **Motion Intensity:** 4 (Restrained, transform/opacity only, subtle crossfades < 200ms, zero auto-playing carousels).
- **Visual Density:** 3 (Art gallery airy, generous whitespace, invisible UI chrome, product as the undisputed protagonist).
- **Craft Principle:** "More air, more garment, fewer containers." No borders around cards, no dropshadows, no badges.

---

## 2. Color Palette & Token Calibration

### 2.1 Surfaces & Neutrals (Inherited from Parent Venture House)
- **Paper White / Canvas (Light):** `#FFFFFF` (Surface, Background)
- **Ink Black (Light Text & Structure):** `#000000`
- **Graphite (Subtle Lines & Labels):** `#6B6B6B`
- **Hairline Border (Light):** `#F2F2F2` (0.5px to 1px structure only)
- **Deep Void (Dark Mode Background):** `#000000`
- **Pure Light (Dark Mode Text):** `#FFFFFF`
- **Dark Graphite (Dark Labels):** `#8A8A8A`
- **Hairline Border (Dark):** `#181818`

### 2.2 Studio Garment Plates (Neutral Presentation Stage)
- **Light Theme Plate:** `#F8F7F4` (Warm alabaster studio surface)
- **Dark Theme Plate:** `#0A0A0B` (Deep charcoal technical studio surface)
- **Contact Shadow:** Soft elliptical contact shadow directly beneath garment hem (`rgba(0, 0, 0, 0.08)` in light, `rgba(0, 0, 0, 0.4)` in dark).

### 2.3 Garment Colorways (The Actual Color in the Page)
- **Bone:** `#F5F2EB` (Warm natural unbleached cotton)
- **Ink:** `#151618` (Deep mineral black)
- **Washed Grey:** `#5C5D61` (Garment-dyed faded charcoal)
- **Sand:** `#D6CEBE` (Warm desert stone)
- **Moss:** `#485244` (Muted technical earth green)

### 2.4 Functional Accent (Singular)
- **Signal Cobalt:** `#0018A8` (Light) / `#3D5AFE` (Dark).
- **Role:** Strict functional restraint. Reserved exclusively for focus rings, selected size indicator dots, and active subnav state. NEVER used as full button fill or decorative borders.

---

## 3. Typographic Architecture

| Hierarchy Role | Font Family | Size | Tracking | Leading | Features / Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Editorial Display Title** | Instrument Serif | `56px – 96px` | `-0.03em` | `0.95 – 1.0` | High-contrast editorial elegance. Set big, tight, sparingly. |
| **Section Label** | Geist Mono | `10px – 11px` | `+0.12em` | `1.0` | Uppercase, micro-scale, structural. `[Z-02 // COLLECTION 01]` |
| **Product Title** | Geist Sans | `18px – 22px` | `-0.015em` | `1.2` | Clean, semi-bold or medium weight. |
| **Product Code** | Geist Mono | `11px – 12px` | `+0.05em` | `1.0` | Tabular figures: `ZB-01`, `ZB-02`. |
| **Price** | Geist Mono | `13px – 15px` | `0` | `1.0` | Strict tabular figures (`tabular-nums`), INR format (`₹4,800`). |
| **Body & Tailor Notes** | Geist Sans | `13px – 15px` | `0` | `1.6` | Max 60 characters per line. `text-wrap: pretty`. |
| **Specifications / Table**| Geist Mono | `11px – 12px` | `+0.02em` | `1.4` | Tabular numerals for all measurements (cm/in). |

---

## 4. Spacing Scale & Grid Rigor

Use **ONLY** the calibrated modular spacing scale:
- `4px` (`spacing-1` / micro gap)
- `8px` (`spacing-2` / inline element separation)
- `12px` (`spacing-3` / tag and badge padding)
- `16px` (`spacing-4` / standard compact gap)
- `24px` (`spacing-6` / card internal spacing)
- `32px` (`spacing-8` / module gap)
- `48px` (`spacing-12` / section separation)
- `72px` (`spacing-18` / major editorial block margin)
- `120px` (`spacing-30` / full page hero whitespace)

Grid: 12-column fluid grid with max-width `1520px`. Asymmetric layouts alternate between 7:5, 8:4, and full-bleed modules.

---

## 5. Component Construction Rules

### 5.1 Product Cards
- **Structure:** Zero card surface box, zero box shadows, zero rounded corners (`rounded-none`).
- **Visual:** Fixed 4:5 aspect ratio studio plate. Garment renderer centered.
- **Micro-Interaction:** On desktop pointer hover, subtle 200ms crossfade between front view and back view. On touch devices, front view remains primary without hover dependency.
- **Labels:** Mono code left, tabular price right, garment title below with subtle colorway swatch indicators.

### 5.2 PDP Gallery & Sticky Action Architecture
- **Desktop (>= 1024px):** 2-zone layout. Left column: generous vertical scrolling stream of flat-lay renders (Front, Back, Detail Rib Crop, Detail Hem Crop). Right column: sticky viewport-aligned info & buy module.
- **Mobile (< 1024px):** Swipe-free, stacked vertical gallery. Sticky thumb-reachable bottom bar for size and action.
- **Colorway Selector:** Real radio inputs with circular swatches (18px) and accessible visible focus rings. Label displays selected colorway name in mono.
- **Size Selector:** Row of square mono buttons (`44px` touch target), displaying `XS`, `S`, `M`, `L`, `XL`, `XXL`. Disabled states styled with honest diagonal slash and `aria-disabled="true"`.
- **Accordions:** Clean hairline dividers with ARIA expanded state, containing Details, Fit & Measurements (with SVG measurement blueprint), Fabric & Care, Production & Shipping (honest POD disclosure), and Returns.

### 5.3 Garment Mock Engine (`<GarmentMock />`)
- **Render Technology:** Pure vector SVG with CSS custom properties. Server-rendered, 0kb client bundle bloat.
- **Proportions:** Meticulously modeled silhouette geometry (oversized tee, boxy cropped tee, oversized long-sleeve, sleeveless vest).
- **Tactile Depth:** Subtle SVG turbulence filter (`feTurbulence`) for unbleached cotton grain at 4% opacity. Precise stitching paths (`stroke-dasharray="2 2"`), drop-shoulder seams, and neck ribbing.
- **Prints:** Rendered as vector overlays on the cloth with 94% opacity ink blending.
- **Fallback Override:** Standardized next/image container if real photographic assets are provided in product data.

---

## 6. Voice, Tone & Honesty Architecture

- **Tailor's Tone:** Short, declarative, dry. Describe garment construction, fit, silhouette, and drape with factual precision.
- **Banned Language:** "Elevate your wardrobe", "streetwear essential", "must-have", "luxury reimagined", "vibes", "game-changing".
- **Zero Deception:**
  - Print-on-Demand disclosure is made explicit in the story, PDP shipping accordion, and collection footer.
  - Every unconfirmed price, GSM, or measurement is flagged in code and rendered with a neutral "Concept" status.
  - Never display fake review stars, fake counter "Only 2 items left", or synthetic purchase notifications.

---

## 7. Anti-Pattern Checklist (Do's & Don'ts)

| Don't (AI Slop Tells) | Do (High-Agency Studio Craft) |
| :--- | :--- |
| Uniform 4-column card grid across every screen | Asymmetric modular layout with typographic interstitials |
| Rounded-2xl pill cards with heavy borders | Crisp 0px–2px corners with hairline structural lines |
| Gradient button fills and glowing shadows | Solid monochrome push-buttons with tactile focus rings |
| Stock photography or AI-generated model portraits | Factual flat-lay vector garment renders with fabric grain |
| Over-embellished badges and promotional ribbons | Quiet mono status tags: `[CONCEPT // MADE TO ORDER]` |
| Generic serif or Inter font pairings | Instrument Serif editorial headings + Geist Sans + Geist Mono |
