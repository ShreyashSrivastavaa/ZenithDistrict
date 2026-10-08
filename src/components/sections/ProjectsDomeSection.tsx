'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { DomeGallery, DomeGalleryImageObject } from '@/components/ui/DomeGallery';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Container } from '@/components/layout/Container';
import { ArrowRight, Compass, Eye, Filter } from 'lucide-react';

export interface ProjectWorkItem extends DomeGalleryImageObject {
  id: string;
  divisionSlug: 'studio' | 'brands' | 'products' | 'labs';
  tags: string[];
}

export const ZENITH_PROJECTS: ProjectWorkItem[] = [
  {
    id: 'saas-cloud',
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=900&auto=format&fit=crop',
    alt: 'Multi-Tenant SaaS Cloud Platform',
    title: 'Multi-Tenant SaaS Cloud Platform',
    category: 'Z-01 STUDIO // SAAS',
    divisionSlug: 'studio',
    tagline: 'Multi-region tenant data isolation, RBAC security, and Stripe billing engine.',
    url: '/studio',
    tags: ['NEXT.JS', 'TYPESCRIPT', 'POSTGRES', 'STRIPE'],
  },
  {
    id: 'ihatepdf',
    src: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=900&auto=format&fit=crop',
    alt: 'I Hate Love PDF',
    title: 'I Hate Love PDF',
    category: 'Z-03 PRODUCTS // WEBASSEMBLY',
    divisionSlug: 'products',
    tagline: 'Private browser-native PDF manipulation suite powered by WebAssembly.',
    url: '/products/i-hate-love-pdf',
    tags: ['WEBASSEMBLY', 'PDF UTILITY', 'CLIENT-SIDE', 'PRIVACY'],
  },
  {
    id: 'vector-rag',
    src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=900&auto=format&fit=crop',
    alt: 'Local Vector RAG Engine',
    title: 'Local Vector RAG Engine',
    category: 'Z-04 LABS // EXPERIMENTAL',
    divisionSlug: 'labs',
    tagline: 'Client-side WebGPU embedding inference and nearest-neighbor vector space.',
    url: '/labs/local-vector-rag',
    tags: ['WEBGPU', 'LOCAL AI', 'EMBEDDINGS', 'RESEARCH'],
  },
  {
    id: 'brand-one',
    src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=900&auto=format&fit=crop',
    alt: 'Brand One // Studio Collection',
    title: 'Brand One Apparel',
    category: 'Z-02 BRANDS // APPAREL',
    divisionSlug: 'brands',
    tagline: 'Print-on-demand architectural streetwear & generative typography graphics.',
    url: '/brands/brand-one',
    tags: ['APPAREL', 'GENERATIVE GRAPHICS', 'E-COMMERCE'],
  },
  {
    id: 'gitfc',
    src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=900&auto=format&fit=crop',
    alt: 'GitFC // Version Coordinator',
    title: 'GitFC // Version Coordinator',
    category: 'Z-03 PRODUCTS // DEVTOOLS',
    divisionSlug: 'products',
    tagline: 'Distributed Git-native filesystem coordinator and branch reconciliation.',
    url: '/products/gitfc',
    tags: ['GIT', 'DEVTOOLS', 'FILE SYSTEM', 'CLI'],
  },
  {
    id: 'garment-cad',
    src: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=900&auto=format&fit=crop',
    alt: 'Algorithmic Garment Pattern CAD',
    title: 'Parametric Garment CAD',
    category: 'Z-04 LABS // CAD',
    divisionSlug: 'labs',
    tagline: 'Parametric vector pattern drafting calculated from 3D biometric scans.',
    url: '/labs/algorithmic-garment-patterns',
    tags: ['ALGORITHMIC', 'SVG VECTOR', 'PARAMETRIC', 'APPAREL'],
  },
  {
    id: 'product-forum',
    src: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=900&auto=format&fit=crop',
    alt: 'Product Forum Knowledge Graph',
    title: 'Product Forum Knowledge Graph',
    category: 'Z-03 PRODUCTS // COMMUNITY',
    divisionSlug: 'products',
    tagline: 'High-signal technical discourse system with relational discussion graphs.',
    url: '/products/product-forum',
    tags: ['GRAPH UI', 'SEARCH', 'COMMUNITY', 'TYPESCRIPT'],
  },
  {
    id: 'cross-tld',
    src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=900&auto=format&fit=crop',
    alt: 'Cross-TLD Session Handshake',
    title: 'Cross-TLD Session Protocol',
    category: 'Z-04 LABS // CRYPTO',
    divisionSlug: 'labs',
    tagline: 'Cryptographic cross-domain authentication handshake without 3rd-party cookies.',
    url: '/labs/cross-tld-session-handshake',
    tags: ['AUTH', 'SECURITY', 'CRYPTO', 'PRIVACY'],
  },
  {
    id: 'design-system',
    src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=900&auto=format&fit=crop',
    alt: 'Architectural Design Systems',
    title: 'Enterprise Design System Tokens',
    category: 'Z-01 STUDIO // DESIGN SYSTEMS',
    divisionSlug: 'studio',
    tagline: 'Sub-millisecond layout stability and accessible token primitives.',
    url: '/studio',
    tags: ['DESIGN TOKENS', 'A11Y', 'COMPONENT SYSTEM'],
  },
  {
    id: 'ai-integrations',
    src: 'https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=900&auto=format&fit=crop',
    alt: 'AI Agentic Workflows',
    title: 'Agentic Workflows & Tool Extraction',
    category: 'Z-01 STUDIO // AI ENGINEERING',
    divisionSlug: 'studio',
    tagline: 'Production function calling, structured extraction, and cost-controlled token caching.',
    url: '/studio',
    tags: ['LLM', 'STRUCTURED OUTPUT', 'AGENTIC', 'CACHING'],
  },
  {
    id: 'headless-cart',
    src: 'https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=900&auto=format&fit=crop',
    alt: 'Headless Cart Sandbox',
    title: 'Headless Cart Sandbox',
    category: 'Z-04 LABS // COMMERCE',
    divisionSlug: 'labs',
    tagline: 'Sub-50ms reactive e-commerce state machine with optimistic checkout.',
    url: '/labs/headless-cart-sandbox',
    tags: ['STATE MACHINE', 'COMMERCE', 'HEADLESS'],
  },
  {
    id: 'cad-plotter',
    src: 'https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=900&auto=format&fit=crop',
    alt: 'Agentic CAD Plotter',
    title: 'Agentic CAD Plotter',
    category: 'Z-04 LABS // CAD',
    divisionSlug: 'labs',
    tagline: 'Natural language parametric 2D vector CAD blueprint generator.',
    url: '/labs/agentic-cad-plotter',
    tags: ['CAD', 'CANVAS API', 'BLUEPRINT', 'SVG'],
  },
];

export interface ProjectsDomeSectionProps {
  id?: string;
  indexCode?: string;
  title?: string;
  code?: string;
  caption?: string;
  projects?: ProjectWorkItem[];
  defaultFilter?: 'all' | 'studio' | 'brands' | 'products' | 'labs';
  className?: string;
  showFilters?: boolean;
}

export function ProjectsDomeSection({
  id = 'projects-dome-archive',
  indexCode = 'ARCHIVE',
  title = 'PROJECTS & SHIPPED WORKS',
  code = '3D_DOME',
  caption = 'Interactive 3D spherical projection of software platforms, client initiatives, and sovereign ventures engineered by ZenithDistrict.',
  projects = ZENITH_PROJECTS,
  defaultFilter = 'all',
  className = '',
  showFilters = true,
}: ProjectsDomeSectionProps = {}) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'studio' | 'brands' | 'products' | 'labs'>(defaultFilter);
  const [grayscale, setGrayscale] = useState<boolean>(false);

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') return projects;
    return projects.filter((p) => p.divisionSlug === selectedFilter);
  }, [projects, selectedFilter]);

  return (
    <section
      id={id}
      className={`space-y-8 scroll-mt-20${className ? ` ${className}` : ''}`}
      aria-label="Interactive 3D Projects Archive"
    >
      <Container>
        <SectionHeader
          index={indexCode}
          title={title}
          code={code}
          caption={caption}
        />

        {/* Controls Bar: Filter tabs & interaction instructions */}
        {showFilters && (
          <div className="p-4 border border-[var(--border-color)] bg-[var(--surface-elevated)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono-tag text-[10px] text-[var(--stone)] flex items-center gap-1 mr-1">
                <Filter className="w-3 h-3 text-[var(--signal)]" />
                SECTOR:
              </span>
              {(
                [
                  { id: 'all', label: 'ALL INITIATIVES' },
                  { id: 'studio', label: 'STUDIO CLIENT WORK' },
                  { id: 'products', label: 'SOFTWARE PRODUCTS' },
                  { id: 'labs', label: 'R&D LABS' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-3 py-1 font-mono-tag text-xs border rounded-none transition-colors ${
                    selectedFilter === tab.id
                      ? 'border-[var(--signal)] bg-[var(--signal)]/10 text-[var(--signal)] font-medium'
                      : 'border-[var(--border-color)] hover:border-[var(--stone)] text-[var(--text-primary)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs font-mono-tag text-[var(--stone)]">
              <button
                type="button"
                onClick={() => setGrayscale((prev) => !prev)}
                className="flex items-center gap-1.5 px-2.5 py-1 border border-[var(--border-color)] hover:border-[var(--stone)] text-[var(--text-primary)] transition-colors"
              >
                <Eye className="w-3 h-3 text-[var(--signal)]" />
                <span>{grayscale ? 'SHOW COLOR' : 'GRAYSCALE MODE'}</span>
              </button>

              <span className="hidden lg:flex items-center gap-1.5 text-[var(--signal)]">
                <Compass className="w-3.5 h-3.5 animate-spin text-[var(--signal)]" style={{ animationDuration: '8s' }} />
                <span>DRAG TO ROTATE 360° // CLICK TILE TO INSPECT</span>
              </span>
            </div>
          </div>
        )}

        {/* 3D Dome Gallery Frame */}
        <div className="relative w-full h-[520px] sm:h-[600px] md:h-[660px] border border-[var(--border-color)] bg-[#0A0A0B] overflow-hidden select-none">
          {/* 3D Dome Component */}
          <DomeGallery
            images={filteredProjects}
            fit={0.5}
            minRadius={580}
            maxRadius={1000}
            padFactor={0.2}
            overlayBlurColor="#0A0A0B"
            maxVerticalRotationDeg={6}
            dragSensitivity={22}
            dragDampening={1.8}
            enlargeTransitionMs={320}
            segments={35}
            openedImageWidth="min(440px, 86vw)"
            openedImageHeight="min(440px, 75vh)"
            imageBorderRadius="0px"
            openedImageBorderRadius="0px"
            grayscale={grayscale}
          />

          {/* HUD Status Badges */}
          <div className="absolute top-3 left-3 pointer-events-none z-10 flex flex-col gap-1 font-mono-tag text-[10px] text-white/70 bg-black/60 p-2.5 backdrop-blur-md border border-white/10">
            <div className="flex items-center gap-1.5 text-[#3882F6]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3882F6] animate-pulse" />
              <span>DOME PROJECTION // 3D SPHERICAL STAGE</span>
            </div>
            <span>TOTAL PROJECT TILES: {filteredProjects.length} WORKS MAPPED</span>
          </div>

          <div className="absolute bottom-3 right-3 pointer-events-none z-10 font-mono-tag text-[10px] text-white/70 bg-black/60 px-3 py-1.5 backdrop-blur-md border border-white/10 flex items-center gap-2">
            <span>CLICK TO ENLARGE SPECIFICATION</span>
            <span className="text-[#3882F6]">↖ ESC TO CLOSE</span>
          </div>
        </div>

        {/* Footnote Strip with Direct Links */}
        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono-tag text-xs text-[var(--stone)]">
          <span>ALL PROJECTS ARCHIVED UNDER ZENITHDISTRICT SPECIFICATION SYSTEM</span>
          <Link
            href="/contact?type=Studio+project"
            className="flex items-center gap-1.5 text-[var(--signal)] hover:underline"
          >
            <span>COMMISSION A NEW INITIATIVE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default ProjectsDomeSection;
