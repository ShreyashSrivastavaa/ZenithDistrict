import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { getBrands, getBrandBySlug } from '@/lib/content';
import { constructMetadata } from '@/lib/seo';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { APPAREL_BRAND_SLUG } from '@/data/brands';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const instant = false;

export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.map((brand) => ({
    slug: brand.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    return constructMetadata({
      title: 'Story Not Found',
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `Atelier Story // ${brand.name} (Z-02)`,
    description:
      'The manufacturing thesis, on-demand supply architecture, and honest status timeline behind Collection 01.',
    path: `/brands/${brand.slug}/story`,
  });
}

export default async function BrandStoryPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand || slug !== APPAREL_BRAND_SLUG) {
    notFound();
  }

  const timeline = [
    {
      phase: 'PHASE 01',
      title: 'Vector Blueprint & Silhouette Prototyping',
      date: '2026-Q1',
      status: 'COMPLETED',
      summary:
        'Engineered parametric vector graphics derived from architectural site plans, coordinate registries, and cross-section drawings. Calibrated flat-lay proportions for four foundational silhouettes.',
    },
    {
      phase: 'PHASE 02',
      title: 'Fabric Blank Sourcing & Sampling Curation',
      date: '2026-Q2',
      status: 'ACTIVE',
      summary:
        'Testing heavyweight combed organic cotton blanks (220–280 GSM) with regional direct-to-garment and water-based silk-screening partners. Assessing wash longevity, collar rib recovery, and ink hand-feel.',
    },
    {
      phase: 'PHASE 03',
      title: 'First On-Demand Drop & Registry Dispatch',
      date: 'PLANNED',
      status: 'UPCOMING',
      summary:
        'Opening made-to-order printing queue for Collection 01 registry members. Each piece manufactured individually upon order verification with zero speculative inventory.',
    },
  ];

  return (
    <div className="py-8 sm:py-12 md:py-16 space-y-20">
      <Container>
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 font-mono-tag text-xs text-[var(--stone)] mb-6">
          <Link
            href={`/brands/${slug}`}
            className="hover:text-[var(--signal)] transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>{brand.name}</span>
          </Link>
          <span>/</span>
          <span className="text-[var(--signal)] font-medium">STORY & DISCIPLINE</span>
        </div>

        {/* Story Header */}
        <div className="space-y-6 max-w-3xl">
          <span className="font-mono-tag text-xs text-[var(--signal)] block uppercase tracking-wider">
            Z-02 // OPERATING THESIS
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)] font-normal tracking-[-0.02em] leading-tight">
            Why this label exists, and how we refuse to build it.
          </h1>
          <p className="text-lg text-[var(--muted-text)] leading-relaxed">
            Most modern streetwear brands exist as marketing veneers wrapping cheap fast-fashion blanks. They manufacture artificial scarcity, fabricate heritage stories, and discard tons of unsold inventory each season.
          </p>
        </div>
      </Container>

      {/* The Tailor's Principles */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 pt-8 hairline-border-t">
          <div className="space-y-4">
            <span className="font-mono-tag text-xs text-[var(--stone)] block uppercase tracking-wider">
              01 // WHAT WE WILL CLAIM
            </span>
            <ul className="space-y-3 font-mono-tag text-xs text-[var(--text-primary)] leading-relaxed list-disc pl-4">
              <li>Heavyweight organic cotton jersey chosen for structured drape.</li>
              <li>Original vector drawings derived from cadastre grids and technical elevations.</li>
              <li>100% made-to-order manufacturing: garments exist only after you order.</li>
              <li>Honest disclosure of prototype status and supplier verification stages.</li>
              <li>Unconditional replacement of defective print curing or seam flaws.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <span className="font-mono-tag text-xs text-[var(--stone)] block uppercase tracking-wider">
              02 // WHAT WE WILL NEVER CLAIM
            </span>
            <ul className="space-y-3 font-mono-tag text-xs text-[var(--stone)] leading-relaxed list-disc pl-4">
              <li>No fabricated &quot;century-old atelier heritage&quot; or artificial artisanal myths.</li>
              <li>No fake inventory counters (&quot;Only 3 units remaining!&quot;).</li>
              <li>No paid influencer reviews, synthetic rating stars, or fake testimonials.</li>
              <li>No unconfirmed GSM or composition presented as verified fact before lab sign-off.</li>
              <li>No disposable seasonal cycles engineered to induce manufactured FOMO.</li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Honest Production Timeline (No Invented Dates) */}
      <Container>
        <div className="space-y-8 pt-8 hairline-border-t">
          <div>
            <span className="font-mono-tag text-xs text-[var(--stone)] block uppercase tracking-wider">
              OPERATIONAL CADENCE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)] mt-1">
              Honest status timeline.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[var(--border-color)]">
            {timeline.map((item, idx) => (
              <div key={item.phase} className={`space-y-3 ${idx > 0 ? 'pt-6 md:pt-0 md:pl-8' : ''}`}>
                <div className="flex items-center justify-between font-mono-tag text-xs">
                  <span className="text-[var(--stone)]">{item.phase}</span>
                  <span className={item.status === 'ACTIVE' ? 'text-[var(--signal)] font-semibold' : 'text-[var(--stone)]'}>
                    [{item.status}]
                  </span>
                </div>
                <h3 className="font-display text-lg font-medium text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <span className="font-mono-tag text-[10px] text-[var(--stone)] block">
                  TIMEFRAME // {item.date}
                </span>
                <p className="text-xs text-[var(--muted-text)] leading-relaxed">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Explore Collection Link */}
      <Container>
        <div className="p-8 sm:p-12 border border-[var(--border-color)] bg-[var(--surface-elevated)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-display text-xl font-medium text-[var(--text-primary)]">
              Explore Collection 01.
            </h3>
            <p className="text-sm text-[var(--muted-text)]">
              View the four baseline silhouettes, technical measurements, and vector prints.
            </p>
          </div>

          <Link
            href={`/brands/${slug}/shop`}
            className="px-6 py-3 bg-[var(--text-primary)] text-[var(--bg-page)] hover:bg-[var(--signal)] hover:text-white transition-colors rounded-none font-mono-tag text-xs uppercase tracking-wider flex items-center gap-2 shrink-0"
          >
            <span>VIEW SHOP</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </div>
  );
}
