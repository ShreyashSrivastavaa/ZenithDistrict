import { BrandVenture } from './types';

/**
 * Centralized Apparel Brand Constants
 * Renaming the brand is a one-line change here. Never hard-code the brand name in components or copy.
 */
export const APPAREL_BRAND_NAME = 'ZenithDistrict';
export const APPAREL_BRAND_SLUG = 'zenith-district';

export const brandsData: BrandVenture[] = [
  {
    id: 'brand-01',
    slug: APPAREL_BRAND_SLUG,
    name: APPAREL_BRAND_NAME,
    division: 'Z-02',
    divisionSlug: 'brands',
    category: 'Apparel',
    status: 'Building',
    tagline: 'Minimalist physical apparel produced on demand.',
    description:
      'The official ZenithDistrict physical apparel label combining architectural typography, heavyweight organic textiles, and zero-inventory on-demand fulfillment.',
    longDescription:
      'ZenithDistrict Apparel is our sovereign physical label. Rather than stocking large upfront production runs, we engineer structured heavyweight garments produced strictly to order with zero speculative inventory.',
    featured: true,
    featuredOrder: 1,
    tags: ['Apparel', 'Print-on-Demand', 'Textiles', 'D2C'],
    startedAt: '2026-Q1',
    updatedAt: '2026-Q4',
    theme: {
      accent: '#0018a8',
      badgeBg: 'rgba(0, 24, 168, 0.08)',
    },
    story:
      'Born from our frustration with disposable streetwear graphics and wasteful speculative inventory. We focus on structured heavyweight silhouettes, minimal typographic treatments, and localized on-demand manufacturing that prints only when ordered.',
    dropsPlaceholder: [
      {
        title: 'Collection 01: Architectural Mono',
        status: 'Concept / Sampling',
        note: 'Four silhouettes: Oversized Tee, Boxy Cropped Tee, Long Sleeve, and Sleeveless Top featuring technical coordinate prints.',
      },
    ],
    links: {
      // TODO: replace with storefront URL once Shopify/Printify integration is live
      external: '',
    },
  },
  // Future brands will be appended here as sovereign entries
];
