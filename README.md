# ZenithDistrict — Venture House

ZenithDistrict is an independent venture house. One parent identity operates four sovereign divisions under one high-craft technical roof:

- **Z-01 Studio**: Client-service practice designing and engineering digital products for other companies.
- **Z-02 Brands**: Consumer brands owned and operated in-house (starting with on-demand physical apparel).
- **Z-03 Products**: Software tools, utilities, and developer infrastructure (I Hate Love PDF, Product.forum, GitFC).
- **Z-04 Labs**: Experimental R&D division where hypotheses undergo lifecycle stress-testing before graduation.

---

## Brand Architecture & Visual System

- **Identity**: Architectural cadastre meets restrained editorial publication.
- **Palette**:
  - Bone: `#F3F1EC` (light background)
  - Obsidian / Ink: `#0A0A0B` (dark background / primary text)
  - Charcoal / Graphite: `#1A1A1D` (surfaces & cards)
  - Stone: `#8B8984` (secondary metadata)
  - Line: `rgba(10,10,11,0.12)` (light hairlines) / `rgba(243,241,236,0.14)` (dark hairlines)
  - Signal: `#3882F6` (Electric Blue brand accent) with `#FF4F1F` (Signal Orange) for priorities.
- **Typography**:
  - Primary UI & Display: `Geist` (tight tracking `-0.04em`)
  - Editorial Accent: `Instrument Serif` (italic used for single emphasized words)
  - Technical Labels: `Geist Mono` (`+0.08em` tracking, uppercase)
- **Architectural Grid**: Press **`G`** on any page to toggle the hairline 12-column architectural overlay.

---

## Lifecycle & Status System

Every venture, brand, product, and experiment follows the strict 6-phase lifecycle:
```
Idea → Exploring → Building → Beta → Live → Venture
```
The status registry in `src/data/status.ts` is the single source of truth. No project is marked `Live` or `Venture` unless verified in config.

---

## How to Add New Ventures (Data-Driven Architecture)

The site is entirely data-driven. Adding a new brand, product, or experiment requires adding a single typed object to its respective file in `src/data/`. No page templates need to be modified.

### 1. Adding a New Consumer Brand
Edit `src/data/brands.ts`:
```typescript
import { BrandVenture } from './types';

export const brandsData: BrandVenture[] = [
  // ... existing brands
  {
    id: 'brand-02',
    slug: 'coastal-mono',
    name: 'Coastal Mono',
    division: 'Z-02',
    divisionSlug: 'brands',
    category: 'Goods',
    status: 'Exploring',
    tagline: 'Technical travel accessories and architectural luggage.',
    description: 'Utilitarian bags built from recycled sailcloth.',
    featured: true,
    tags: ['Accessories', 'Sustainable', 'D2C'],
    startedAt: '2026-Q4',
    story: 'Conceived to eliminate fragile zippers and disposable travel bags.',
    theme: {
      accent: '#0284C7',
    },
    dropsPlaceholder: [
      {
        title: 'Drop 01: The Weekender',
        status: 'Prototyping',
        note: 'Weatherproof duffel bag with modular internal divider.',
      },
    ],
  },
];
```

### 2. Adding a New Software Product
Edit `src/data/products.ts`:
```typescript
{
  id: 'prod-04',
  slug: 'cache-sentinel',
  name: 'CacheSentinel',
  division: 'Z-03',
  divisionSlug: 'products',
  category: 'Developer Tools',
  status: 'Building',
  tagline: 'Edge cache invalidation telemetry for Cloudflare Workers.',
  description: 'Monitor stale cache ratios across multi-region edge deployments in real-time.',
  featured: true,
  tags: ['Edge', 'Caching', 'Cloudflare', 'Telemetry'],
  startedAt: '2026-Q3',
  problem: 'Silent edge cache staleness causing data divergence for distributed users.',
  solution: 'Lightweight probe injecting cryptographic heartbeat headers into origin responses.',
  architectureNotes: [
    'Sub-2ms execution budget on V8 isolates',
    'Zero external database required for telemetry collection',
  ],
  links: {
    live: 'https://cachesentinel.dev',
    repo: 'https://github.com/ShreyashSrivastavaa/cachesentinel',
  },
}
```

### 3. Adding a New Lab Experiment
Edit `src/data/labs.ts`:
```typescript
{
  id: 'lab-06',
  slug: 'wasm-sqlite-sync',
  name: 'WASM SQLite Sync',
  division: 'Z-04',
  divisionSlug: 'labs',
  status: 'Idea',
  tagline: 'Client-side relational databases synchronized via WebRTC meshes.',
  description: 'Investigating peer-to-peer data replication for local-first collaborative tools.',
  featured: false,
  tags: ['Local-First', 'WASM', 'SQLite', 'WebRTC'],
  hypothesis: 'WebRTC data channels can propagate SQLite binary patches with under 30ms latency across peer meshes.',
  learnings: ['NAT traversal fallbacks require lightweight TURN coordination.'],
  nextMilestone: 'Prototype two-browser sync engine.',
}
```

---

## Feature Flags

Toggles live in `src/data/site.ts`:
```typescript
flags: {
  showCareers: false,        // Enables /careers route in navigation & footer
  showPress: false,          // Enables /press kit route
  showNewsletter: false,     // Toggles newsletter capture in footer
  showCommunity: false,      // Reserved for Discord/forum community links
  showInvestors: false,      // Reserved for capital stakeholder briefs
  showGridDevToggle: true,   // Enables 'G' keypress hairline grid
}
```

---

## Connecting the Contact Form

Submissions are handled by `src/app/api/contact/route.ts` and dispatch through `src/lib/contact.ts`.

To connect production endpoints:
1. **Webhook (Slack/Discord)**: Add `CONTACT_WEBHOOK_URL="https://hooks.slack.com/..."` to `.env.local`.
2. **Resend (Email)**: In `src/lib/contact.ts`, uncomment and initialize `Resend`:
   ```typescript
   import { Resend } from 'resend';
   const resend = new Resend(process.env.RESEND_API_KEY);
   await resend.emails.send({
     from: 'dispatches@zenithdistrict.com',
     to: process.env.RESEND_TO_EMAIL,
     subject: `[${data.inquiryType}] New Inquiry from ${data.name}`,
     text: data.message,
   });
   ```

---

## Swapping in a Headless CMS

All data access is mediated through `src/lib/content.ts`. To migrate to Sanity, Payload, or Contentful:
1. Replace the local data imports inside `src/lib/content.ts` with your CMS client SDK queries.
2. The component tree and dynamic routes (`/brands/[slug]`, `/products/[slug]`, `/labs/[slug]`) require zero changes.

---

## Deployment (Vercel)

1. Push this repository to GitHub: `https://github.com/ShreyashSrivastavaa/ZenithDistrict`.
2. Import project into Vercel.
3. Set the environment variable:
   - `NEXT_PUBLIC_SITE_URL`: `https://zenithdistrict.com` (or your custom domain)
4. Framework Preset: Next.js (automatic).
5. Build Command: `next build`.

---

## Local Development

```bash
npm run dev
```
Visit `http://localhost:3000`.
