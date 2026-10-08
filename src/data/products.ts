import { ProductVenture } from './types';

export const productsData: ProductVenture[] = [
  {
    id: 'prod-01',
    slug: 'i-hate-love-pdf',
    name: 'I Hate Love PDF',
    division: 'Z-03',
    divisionSlug: 'products',
    category: 'Web Utilities',
    status: 'Building',
    tagline: 'Private, in-browser PDF manipulation without the predatory ads.',
    description:
      'A clean, fast suite of browser-native PDF utilities that perform merges, splits, compressions, and page extractions locally without uploading your documents to third-party servers.',
    longDescription:
      'Most online PDF converters have become bloated with deceptive ads, arbitrary file size paywalls, and questionable privacy policies. I Hate Love PDF runs essential PDF manipulation tasks client-side using WebAssembly and Web Workers, keeping files completely on the user’s machine.',
    featured: true,
    featuredOrder: 2,
    tags: ['WebAssembly', 'PDF Utility', 'Client-Side', 'Privacy First'],
    startedAt: '2026-Q2',
    updatedAt: '2026-Q4',
    theme: {
      accent: '#EF4444',
      badgeBg: 'rgba(239, 68, 68, 0.12)',
    },
    problem:
      'Everyday users frequently need to merge two PDFs or extract pages, but are forced through ad-choked web tools that upload sensitive personal documents to unknown remote servers.',
    solution:
      'A stripped-back, high-performance web tool where all cryptographic rendering and document modifications execute inside the browser sandbox using WebAssembly.',
    architectureNotes: [
      'PDF-lib and WebAssembly for in-memory byte manipulation',
      'Zero server upload architecture ensures GDPR and HIPAA friendly processing',
      'Web Workers prevent UI freezing during large multi-page compilations',
    ],
    roadmap: [
      {
        phase: 'Phase 1: Core Operations',
        status: 'In Progress',
        summary: 'PDF merge, split, rotate, and page reordering.',
      },
      {
        phase: 'Phase 2: Client Optimization',
        status: 'Planned',
        summary: 'Local image-to-PDF compilation and client-side raster compression.',
      },
      {
        phase: 'Phase 3: Native Desktop Wrapper',
        status: 'Planned',
        summary: 'Lightweight offline desktop application for macOS and Windows.',
      },
    ],
    links: {
      // TODO: replace with live deployment link once domain is connected
      live: 'https://ihatelovepdf.com', // placeholder link
      repo: 'https://github.com/ShreyashSrivastavaa/i-hate-love-pdf', // TODO: verify repo visibility
    },
  },
  {
    id: 'prod-02',
    slug: 'product-forum',
    name: 'Product.forum',
    division: 'Z-03',
    divisionSlug: 'products',
    category: 'Discovery',
    status: 'Building',
    tagline: 'Transparent discovery and verification for modern products and businesses.',
    description:
      'A structured platform designed for authentic product discovery, verifiable reviews, and signal-driven discussions around newly launched software and ventures.',
    longDescription:
      'Online feedback loops are increasingly polluted by bot upvotes, sponsored placements, and unverified reviews. Product.forum explores a high-trust verification model where discussion is anchored to authentic usage and founder disclosures.',
    featured: true,
    featuredOrder: 3,
    tags: ['Community', 'Product Discovery', 'Verification', 'Directory'],
    startedAt: '2026-Q2',
    updatedAt: '2026-Q4',
    theme: {
      accent: '#3B82F6',
      badgeBg: 'rgba(59, 130, 246, 0.12)',
    },
    problem:
      'Modern product launch platforms have skewed toward vanity metrics, coordinated voting rings, and shallow engagement, making it hard to identify genuinely useful products.',
    solution:
      'An architectural forum layout that prioritizes verified engineering teardowns, longitudinal user reviews, and structured founder AMA threads.',
    architectureNotes: [
      'Next.js App Router with hybrid static-dynamic indexing',
      'PostgreSQL full-text search with vector ranking for product discovery',
      'Cryptographic domain ownership verification for creators',
    ],
    roadmap: [
      {
        phase: 'Alpha Prototype',
        status: 'In Progress',
        summary: 'Core product directory schema and verification pipeline.',
      },
      {
        phase: 'Community Feed',
        status: 'Planned',
        summary: 'Structured discussion threads and verified customer badge validation.',
      },
    ],
    links: {
      // TODO: replace with live deployment link
      live: 'https://product.forum', // placeholder link
    },
  },
  {
    id: 'prod-03',
    slug: 'gitfc',
    name: 'GitFC',
    division: 'Z-03',
    divisionSlug: 'products',
    category: 'Developer Tools',
    status: 'Beta',
    tagline: 'Transform GitHub developer profiles into collectible football-style player cards.',
    description:
      'A fun, technically sharp utility that ingests GitHub contribution history, repository language distributions, and commit velocity to generate dynamic, collectible digital trading cards.',
    longDescription:
      'GitFC bridges the gap between developer metrics and collectible sports cards. By analyzing public GitHub activity, it computes specialized player stats (e.g., Velocity, Defending codebase, Polyglot rating) and renders printable vector player cards.',
    featured: true,
    featuredOrder: 4,
    tags: ['Developer Tool', 'Card Generator', 'GitHub API', 'SVG Rendering'],
    startedAt: '2026-Q1',
    updatedAt: '2026-Q4',
    theme: {
      accent: '#10B981',
      badgeBg: 'rgba(16, 185, 129, 0.12)',
    },
    problem:
      'Standard developer resumes and GitHub overview tabs are visually dry and fail to highlight specialized craftsmanship or open-source momentum in a shareable format.',
    solution:
      'An automated card engine that pulls GitHub GraphQL stats, normalizes metrics into rating scales, and generates shareable high-res SVG and PNG cards.',
    architectureNotes: [
      'GitHub GraphQL API caching layer with rate-limit dampening',
      'Dynamic OpenGraph and SVG card generator powered by @vercel/og',
      'Downloadable high-DPI export for physical print and stickers',
    ],
    roadmap: [
      {
        phase: 'V1 Generator',
        status: 'Shipped',
        summary: 'Core card renderer with 3 classic trading card themes.',
      },
      {
        phase: 'Team Decks',
        status: 'In Progress',
        summary: 'Team and organization rosters comparing repository contributors.',
      },
      {
        phase: 'Print-on-Demand Integration',
        status: 'Planned',
        summary: 'Direct bridge to Z-02 Brands for physical foil card printing.',
      },
    ],
    links: {
      // TODO: replace with production link once domain pointed
      live: 'https://gitfc.dev', // placeholder link
      repo: 'https://github.com/ShreyashSrivastavaa/gitfc', // TODO: verify repo visibility
    },
  },
];
