import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { StatusTag } from '@/components/ui/StatusTag';
import { Tag } from '@/components/ui/Tag';
import { getBrands, getBrandBySlug } from '@/lib/content';
import { constructMetadata, generateVentureJsonLd } from '@/lib/seo';
import { ArrowLeft, ArrowUpRight, Box } from 'lucide-react';

type PageProps = {
  params: Promise<{ slug: string }>;
};

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
      title: 'Brand Not Found',
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${brand.name} // Consumer Brand (Z-02)`,
    description: brand.description,
    path: `/brands/${brand.slug}`,
  });
}

export default async function BrandTemplatePage({ params }: PageProps) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  const jsonLd = generateVentureJsonLd(brand);
  const brandAccent = brand.theme?.accent || 'var(--signal)';

  return (
    <div
      className="py-12 md:py-20 space-y-16"
      style={{ '--venture-accent': brandAccent } as React.CSSProperties}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container>
        {/* Navigation Breadcrumb */}
        <div className="pb-8 hairline-border-b flex items-center justify-between font-mono-tag text-xs text-[var(--muted-text)]">
          <Link
            href="/brands"
            className="flex items-center gap-2 hover:text-[var(--signal)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ALL BRANDS (Z-02)</span>
          </Link>
          <span>{`SECTOR CADASTRE // ${brand.id}`}</span>
        </div>

        {/* Brand Header */}
        <div className="pt-8 space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono-tag text-xs px-2 py-0.5 border border-[var(--border-color)] text-[var(--stone)]">
              {`${brand.division} // ${brand.category.toUpperCase()}`}
            </span>
            <StatusTag status={brand.status} />
            <span className="font-mono-tag text-xs text-[var(--stone)]">
              INITIATED {brand.startedAt}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-[var(--text-primary)]">
            {brand.name}
          </h1>

          <p className="text-xl sm:text-2xl font-editorial-italic text-[var(--text-primary)] leading-relaxed">
            {brand.tagline}
          </p>

          <p className="text-base text-[var(--muted-text)] leading-relaxed max-w-3xl">
            {brand.longDescription || brand.description}
          </p>

          {/* External Storefront Link Slot */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            {brand.storeUrl ? (
              <a
                href={brand.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[var(--ink)] text-[var(--bone)] dark:bg-[var(--bone)] dark:text-[var(--ink)] hover:bg-[var(--signal)] hover:text-white font-mono-tag text-xs tracking-wider uppercase transition-colors rounded-none flex items-center gap-2"
              >
                <span>ENTER STOREFRONT</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            ) : (
              <div className="p-3 border border-[var(--border-color)] bg-[var(--surface-elevated)] text-xs font-mono-tag text-[var(--stone)] flex items-center gap-2">
                <Box className="w-4 h-4 text-[var(--signal)]" />
                <span>{"// STOREFRONT INTEGRATION IN ACTIVE DEVELOPMENT"}</span>
              </div>
            )}
          </div>
        </div>

        {/* Brand Narrative / Story */}
        <div className="mt-16 pt-12 hairline-border-t grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 font-mono-tag text-xs text-[var(--stone)]">
            01 // BRAND STORY & ETHOS
          </div>
          <div className="md:col-span-8 space-y-4">
            <p className="text-base sm:text-lg text-[var(--text-primary)] leading-relaxed font-normal">
              {brand.story}
            </p>
          </div>
        </div>

        {/* Drops / Collection Schedule */}
        <div className="mt-16 pt-12 hairline-border-t grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 font-mono-tag text-xs text-[var(--stone)]">
            02 // COLLECTION ROADMAP
          </div>
          <div className="md:col-span-8 space-y-4">
            {brand.dropsPlaceholder?.map((drop, idx) => (
              <div
                key={idx}
                className="p-5 border border-[var(--border-color)] bg-[var(--surface)] space-y-2"
              >
                <div className="flex items-center justify-between font-mono-tag text-xs">
                  <span className="font-semibold text-[var(--text-primary)]">
                    {drop.title}
                  </span>
                  <span className="text-[var(--signal)] px-2 py-0.5 border border-[var(--border-color)] bg-[var(--surface-elevated)]">
                    {drop.status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--muted-text)] leading-relaxed">
                  {drop.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Metadata & Tagging */}
        <div className="mt-16 pt-12 hairline-border-t flex flex-wrap items-center justify-between gap-4 font-mono-tag text-xs text-[var(--stone)]">
          <div className="flex flex-wrap items-center gap-2">
            <span>INDEX TAGS:</span>
            {brand.tags.map((t) => (
              <Tag key={t} size="sm">
                {t}
              </Tag>
            ))}
          </div>
          <span>SOVEREIGN VENTURE // ZENITHDISTRICT</span>
        </div>
      </Container>
    </div>
  );
}
