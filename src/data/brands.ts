import { BrandVenture } from './types';

export const brandsData: BrandVenture[] = [
  {
    id: 'brand-01',
    slug: 'brand-one',
    name: 'Brand One (Working Title)', // TODO: replace with finalized apparel brand name
    division: 'Z-02',
    divisionSlug: 'brands',
    category: 'Apparel',
    status: 'Building',
    tagline: 'Minimalist physical apparel produced on demand.',
    description:
      'An exploratory apparel label combining architectural typography, heavyweight organic textiles, and zero-inventory on-demand fulfillment.',
    longDescription:
      'Brand One is ZenithDistrict’s initial experiment in physical commerce. Rather than stocking large upfront production runs, we are testing an on-demand manufacturing pipeline connected directly to high-quality garment blanks and automated fulfillment.',
    featured: true,
    featuredOrder: 1,
    tags: ['Apparel', 'Print-on-Demand', 'Textiles', 'D2C'],
    startedAt: '2026-Q1',
    updatedAt: '2026-Q4',
    theme: {
      accent: '#E53E3E',
      badgeBg: 'rgba(229, 62, 62, 0.1)',
    },
    story:
      'Born from our frustration with disposable streetwear graphics and wasteful speculative inventory. We focus on structured heavyweight silhouettes, minimal typographic treatments, and localized on-demand manufacturing that prints only when ordered.',
    dropsPlaceholder: [
      {
        title: 'Collection 00: District Baseline',
        status: 'In Prototyping',
        note: 'Heavyweight 380gsm french terry hoodies and 240gsm structured tees featuring technical coordinate motifs.',
      },
      {
        title: 'Collection 01: Architectural Mono',
        status: 'Planned',
        note: 'Monochromatic utilitarian outerwear and structured totes.',
      },
    ],
    links: {
      // TODO: replace with storefront URL once Shopify/Printify integration is live
      external: '',
    },
  },
  // Future brands will be appended here as sovereign entries
];
