import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { StatusTag } from '@/components/ui/StatusTag';
import { Tag } from '@/components/ui/Tag';
import { getProducts, getProductBySlug } from '@/lib/content';
import { constructMetadata, generateVentureJsonLd, safeJsonLdStringify } from '@/lib/seo';
import { ArrowLeft, ArrowUpRight, Code2 } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandSocialIcons';

export const instant = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return constructMetadata({
      title: 'Product Not Found',
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${product.name} // Software Product (Z-03)`,
    description: product.description,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductTemplatePage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const jsonLd = generateVentureJsonLd(product);

  return (
    <div className="py-12 md:py-20 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
      />

      <Container>
        {/* Breadcrumb Bar */}
        <div className="pb-8 hairline-border-b flex items-center justify-between font-mono-tag text-xs text-[var(--muted-text)]">
          <Link
            href="/products"
            className="flex items-center gap-2 hover:text-[var(--signal)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ALL PRODUCTS (Z-03)</span>
          </Link>
          <span>{`SECTOR CADASTRE // ${product.id}`}</span>
        </div>

        {/* Product Hero */}
        <div className="pt-8 space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono-tag text-xs px-2 py-0.5 border border-[var(--border-color)] text-[var(--stone)]">
              {`${product.division} // ${product.category.toUpperCase()}`}
            </span>
            <StatusTag status={product.status} />
            <span className="font-mono-tag text-xs text-[var(--stone)]">
              INITIATED {product.startedAt}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-[var(--text-primary)]">
            {product.name}
          </h1>

          <p className="text-xl sm:text-2xl font-editorial-italic text-[var(--text-primary)] leading-relaxed">
            {product.tagline}
          </p>

          <p className="text-base text-[var(--muted-text)] leading-relaxed max-w-3xl">
            {product.longDescription || product.description}
          </p>

          {/* Product Outbound Links */}
          <div className="pt-4 flex flex-wrap items-center gap-4 font-mono-tag text-xs">
            {product.links?.live && (
              <a
                href={product.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 border border-[var(--ink)] bg-[var(--ink)] text-[var(--bg-page)] hover:bg-transparent hover:text-[var(--ink)] font-mono-tag text-[11px] tracking-[0.033em] uppercase transition-colors rounded-none flex items-center gap-2"
              >
                <span>OPEN PRODUCT</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}

            {product.links?.repo && (
              <a
                href={product.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 border border-[var(--border-color)] hover:border-[var(--signal)] bg-[var(--surface-elevated)] font-mono-tag text-xs tracking-wider uppercase transition-colors rounded-none flex items-center gap-2 text-[var(--text-primary)]"
              >
                <GithubIcon className="w-4 h-4" />
                <span>SOURCE REPO</span>
              </a>
            )}
          </div>
        </div>

        {/* Problem & Solution Blueprint */}
        <div className="mt-16 pt-12 hairline-border-t grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Problem */}
          <div className="p-6 border border-[var(--border-color)] bg-[var(--surface-elevated)] space-y-3">
            <span className="font-mono-tag text-xs text-[var(--signal)]">
              01 // THE CORE FRICTION
            </span>
            <h3 className="font-display text-2xl font-medium text-[var(--text-primary)]">
              The Problem
            </h3>
            <p className="text-sm text-[var(--muted-text)] leading-relaxed">
              {product.problem}
            </p>
          </div>

          {/* Solution */}
          <div className="p-6 border border-[var(--border-color)] bg-[var(--surface)] space-y-3">
            <span className="font-mono-tag text-xs text-[var(--signal)]">
              02 // THE ARCHITECTURAL ANSWER
            </span>
            <h3 className="font-display text-2xl font-medium text-[var(--text-primary)]">
              How It Works
            </h3>
            <p className="text-sm text-[var(--muted-text)] leading-relaxed">
              {product.solution}
            </p>
          </div>
        </div>

        {/* Technical Architecture Notes */}
        {product.architectureNotes && (
          <div className="mt-16 pt-12 hairline-border-t grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 font-mono-tag text-xs text-[var(--stone)]">
              03 // TECHNICAL BLUEPRINT
            </div>
            <div className="md:col-span-8 space-y-3">
              {product.architectureNotes.map((note, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-[var(--border-color)] bg-[var(--surface)] flex items-start gap-3"
                >
                  <Code2 className="w-4 h-4 text-[var(--signal)] shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--text-primary)]">{note}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Roadmap Trajectory */}
        {product.roadmap && (
          <div className="mt-16 pt-12 hairline-border-t grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 font-mono-tag text-xs text-[var(--stone)]">
              04 // VERIFICATION & ROADMAP
            </div>
            <div className="md:col-span-8 space-y-4">
              {product.roadmap.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 border border-[var(--border-color)] bg-[var(--surface)] space-y-1.5"
                >
                  <div className="flex items-center justify-between font-mono-tag text-xs">
                    <span className="font-semibold text-[var(--text-primary)]">
                      {item.phase}
                    </span>
                    <span
                      className={`px-2 py-0.5 border text-[10px] ${
                        item.status === 'Shipped'
                          ? 'border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                          : item.status === 'In Progress'
                          ? 'border-[var(--signal)] text-[var(--signal)] bg-[var(--signal)]/10'
                          : 'border-[var(--border-color)] text-[var(--stone)]'
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--muted-text)] leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags & Metadata */}
        <div className="mt-16 pt-12 hairline-border-t flex flex-wrap items-center justify-between gap-4 font-mono-tag text-xs text-[var(--stone)]">
          <div className="flex flex-wrap items-center gap-2">
            <span>CORE STACK:</span>
            {product.tags.map((t) => (
              <Tag key={t} size="sm">
                {t}
              </Tag>
            ))}
          </div>
          <span>INDEPENDENT DIGITAL PRODUCT // ZENITHDISTRICT</span>
        </div>
      </Container>
    </div>
  );
}
