# ZenithDistrict Site-Wide Polish & De-Vibe Changelog

Every surgical change executed across existing routes to elevate visual craft from generic AI-templates to an obsessive, disciplined architectural studio standard.

- **`src/app/globals.css` (Zero Shadow Mandate)**
  - *Before:* Generic CSS allowed incidental drop shadows (`shadow-2xs`, `shadow-sm`, `shadow-md`, `shadow-xs`).
  - *After:* Global reset strictly enforces `box-shadow: none !important` with zero box-shadows permitted anywhere on UI containers.

- **`src/app/globals.css` (Typographic Balancing & Tabular Numerals)**
  - *Before:* Headings suffered from uneven line wraps and standard non-tabular price digits.
  - *After:* Enabled `text-wrap: balance` on all headings, `text-wrap: pretty` on paragraphs, and global `font-variant-numeric: tabular-nums` / `font-feature-settings: 'tnum'` on mono/price elements.

- **`src/app/globals.css` (Editorial Selection Styling)**
  - *Before:* Browser-default selection highlight clashed with monochromatic palette.
  - *After:* Added custom editorial selection token (`background: var(--signal)` with pure white contrast text).

- **`src/components/sections/BrandStatement.tsx` (Motion Hook Normalization)**
  - *Before:* Dynamic `useTransform` hooks were declared inside an array `.map()` in JSX, violating React Rules of Hooks.
  - *After:* Replaced with a single declarative `useTransform` hook bound to container scroll progress, eliminating hydration risks and rendering smooth editorial reveal.

- **`src/components/sections/CTASection.tsx` (Elevation Cleanup)**
  - *Before:* Primary CTA button used generic `shadow-md` drop shadow typical of starter templates.
  - *After:* Removed `shadow-md` for clean, sharp architectural borders conforming to the 0-2px corner and zero-shadow rule.

- **`src/components/ventures/LabsBoard.tsx` (Experiment Card Shadow Removal)**
  - *Before:* Kanban experiment cards had `shadow-2xs` applied on container elements.
  - *After:* Replaced with sharp hairline border transitions (`border-[var(--border-color)] hover:border-[var(--signal)]`).

- **`src/components/layout/GridOverlay.tsx` (Status Chip Polish)**
  - *Before:* Grid toggle indicator used `shadow-sm` floating pill styling.
  - *After:* Converted to crisp hairline border container matching architectural cadastre rules.

- **`src/components/district/DistrictMap.tsx` (Map Plot Selection Polish)**
  - *Before:* Selected district plot cards applied `shadow-sm` drop shadow on active state.
  - *After:* Active state signified purely by high-contrast cobalt hairline border and subtle lift without drop shadow.

- **`src/app/about/page.tsx` (Apex Node Polish & Interactive Cadastre)**
  - *Before:* Holding apex box utilized `shadow-xs`, and the four division nodes were static non-interactive boxes.
  - *After:* Stripped `shadow-xs` and turned all four division nodes into interactive links, explicitly routing Z-02 Brands to the active apparel label.

- **`src/components/sections/BrandsPreview.tsx` (Collection 01 Spotlight)**
  - *Before:* Brands section displayed only a sparse generic card grid with empty plot cards.
  - *After:* Added a dedicated Collection 01 active run spotlight bar connecting directly to `/brands/brand-one/shop`.

- **`src/app/brands/page.tsx` (Division Directory In-Flight Spotlight)**
  - *Before:* Brand directory offered no immediate indication of current on-demand textile status.
  - *After:* Embedded an active sampling callout detailing Collection 01 (ZB-01–04) with direct links to the brand overview and shop.

- **`src/components/sections/FeaturedVentures.tsx` (Navigation Balance)**
  - *Before:* Footer links only routed to Products and Labs, skipping Brands.
  - *After:* Balanced navigation by including "ALL BRANDS" alongside Products and Labs.

- **`src/components/layout/Footer.tsx` (Brand Sub-Route Discovery)**
  - *Before:* Footer linked to `/brands` generally with no sovereign brand presence.
  - *After:* Added a dedicated sub-link to `{APPAREL_BRAND_NAME}` under Z-02 Brands for rapid access from anywhere on the site.
