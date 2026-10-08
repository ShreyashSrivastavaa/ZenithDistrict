import { LabExperiment } from './types';

export const labsData: LabExperiment[] = [
  {
    id: 'lab-01',
    slug: 'local-vector-rag',
    name: 'Local Vector RAG Engine',
    division: 'Z-04',
    divisionSlug: 'labs',
    status: 'Exploring',
    tagline: 'Zero-cloud semantic search across personal markdown archives.',
    description:
      'Testing browser-native vector embeddings via WebGPU and WASM quantized models to query private local notes without network transit.',
    featured: true,
    featuredOrder: 5,
    tags: ['WebGPU', 'Quantized Models', 'Local AI', 'WASM'],
    startedAt: '2026-Q3',
    updatedAt: '2026-Q4',
    hypothesis:
      'Small quantized embedding models (e.g., bge-micro) running via WebGPU in the browser can deliver sub-50ms semantic search over 10,000 personal notes with zero server costs and absolute privacy.',
    learnings: [
      'Cold-start model download (approx 25MB) requires transparent progress UX to prevent user dropoff.',
      'WebGPU shader compilation varies across mobile browser runtimes; fallback to CPU WASM is mandatory.',
      'Cosine similarity on typed Float32Arrays is surprisingly fast when vectorized with SIMD.',
    ],
    nextMilestone: 'Benchmark memory consumption on mobile Safari and add streaming token response.',
    graduationCriteria: [
      'Sustained query latency under 75ms on consumer laptops',
      'Stable offline caching via CacheStorage API',
      'Clear integration path as a standalone developer utility',
    ],
  },
  {
    id: 'lab-02',
    slug: 'algorithmic-garment-patterns',
    name: 'Generative Coordinate Patterns',
    division: 'Z-04',
    divisionSlug: 'labs',
    status: 'Building',
    tagline: 'Procedural SVG vector generators for technical streetwear graphics.',
    description:
      'An algorithmic visual synthesizer that generates architectural floor plans and geometric coordinates into production-ready print vectors.',
    featured: false,
    tags: ['Generative Design', 'SVG', 'Computational Art', 'Print Pipeline'],
    startedAt: '2026-Q3',
    updatedAt: '2026-Q4',
    hypothesis:
      'Procedural SVG generation can automate the creation of unique, mathematically cohesive print-ready artwork for Z-02 Brands without manual illustrator intervention.',
    learnings: [
      'CMYK color profile drift between browser SVG renderers and DTG textile printers requires strict ICC profile pre-processing.',
      'Constraining geometric randomness with strict architectural grid rules yields consistently high-craft outputs.',
    ],
    nextMilestone: 'Build direct rasterization pipeline exporting at 300 DPI for direct-to-film printers.',
    graduationCriteria: [
      'Zero visual artifacts across 100 consecutive procedural seeds',
      'Automated export to print-ready PDF/X-1a formats',
    ],
  },
  {
    id: 'lab-03',
    slug: 'git-activity-ledger',
    name: 'Autonomous Code Health Auditor',
    division: 'Z-04',
    divisionSlug: 'labs',
    status: 'Idea',
    tagline: 'Lightweight static analysis scanning repositories for architectural decay.',
    description:
      'A non-intrusive CLI daemon analyzing git churn, circular dependency clusters, and abandoned module dead-weight.',
    featured: false,
    tags: ['Static Analysis', 'AST Parsing', 'Developer Tooling'],
    startedAt: '2026-Q4',
    updatedAt: '2026-Q4',
    hypothesis:
      'Correlating git commit frequency with AST node complexity exposes architectural bottlenecks far earlier than traditional test coverage metrics.',
    learnings: [
      'AST parsing large monorepos in pure Node is memory-intensive; exploring Rust-based parser bindings.',
      'Actionable output must be constrained to 3 highest-leverage fixes to avoid dashboard fatigue.',
    ],
    nextMilestone: 'Prototype minimal CLI scanning TypeScript import graph.',
    graduationCriteria: [
      'Full repository analysis finishes under 3 seconds',
      'Actionable signals verified against 5 internal repositories',
    ],
  },
  {
    id: 'lab-04',
    slug: 'edge-auth-proxy',
    name: 'Edge Auth Session Mesh',
    division: 'Z-04',
    divisionSlug: 'labs',
    status: 'Exploring',
    tagline: 'Stateless cross-domain authentication for the multi-venture ecosystem.',
    description:
      'Investigating unified cryptographic session tokens across district subdomains without centralized database lookups on every request.',
    featured: false,
    tags: ['Edge Computing', 'Cryptographic Tokens', 'Cloudflare Workers'],
    startedAt: '2026-Q3',
    updatedAt: '2026-Q4',
    hypothesis:
      'Ed25519 asymmetric signatures verified on Cloudflare Workers edge nodes can authorize requests across multiple ZenithDistrict subdomains with zero origin latency.',
    learnings: [
      'Key rotation strategies require careful TTL bounds to prevent stale edge cache validation.',
      'Cookie domain scoping across divergent TLDs requires an explicit cryptographic handshake redirect.',
    ],
    nextMilestone: 'Implement token revocation list synchronized via Cloudflare KV.',
    graduationCriteria: [
      'Under 5ms verification overhead at edge PoPs',
      'Fault tolerance during origin network partitions',
    ],
  },
  {
    id: 'lab-05',
    slug: 'markdown-content-sync',
    name: 'Git-Backed Content Reactor',
    division: 'Z-04',
    divisionSlug: 'labs',
    status: 'Beta',
    tagline: 'Type-safe content layer compiling git markdown into reactive web data.',
    description:
      'A minimal, zero-runtime markdown content compiler providing instant hot-reloading for editorial venture publications.',
    featured: false,
    tags: ['Markdown', 'Type-Safety', 'Build Systems'],
    startedAt: '2026-Q2',
    updatedAt: '2026-Q4',
    hypothesis:
      'Static markdown files checked directly into git can provide a superior authoring and audit experience compared to heavyweight headless CMS platforms for early venture teams.',
    learnings: [
      'Zod schema validation at build time catches broken frontmatter before it ever touches production.',
      'Incremental compilation is critical once article count passes 100 documents.',
    ],
    nextMilestone: 'Package into an internal utility adapter for ZenithDistrict websites.',
    graduationCriteria: [
      'Zero build-time regression on incremental changes',
      'Self-contained schema definition with zero third-party cloud lock-in',
    ],
  },
];
