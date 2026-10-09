import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { getBrands, getBrandBySlug } from '@/lib/content';
import { getApparelProducts } from '@/data/apparel';
import { constructMetadata } from '@/lib/seo';
import { CollectionShopView } from '@/components/brand/CollectionShopView';
import { ArrowLeft } from 'lucide-react';
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
      title: 'Shop Not Found',
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `Collection 01 Shop // ${brand.name} (Z-02)`,
    description:
      'Collection 01: Four baseline technical garment silhouettes printed on-demand with architectural vector motifs.',
    path: `/brands/${brand.slug}/shop`,
  });
}

export default async function BrandShopPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand || slug !== APPAREL_BRAND_SLUG) {
    notFound();
  }

  const products = await getApparelProducts();

  return (
    <div className="py-8 sm:py-12 md:py-16 space-y-12">
      <Container>
        {/* Header Block */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center gap-2 font-mono-tag text-xs text-[var(--stone)]">
            <Link
              href={`/brands/${slug}`}
              className="hover:text-[var(--signal)] transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>{brand.name}</span>
            </Link>
            <span>/</span>
            <span className="text-[var(--signal)] font-medium">COLLECTION 01</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)] font-normal tracking-[-0.02em]">
            Architectural Mono.
          </h1>

          <p className="text-base text-[var(--muted-text)] max-w-2xl leading-relaxed">
            Four disciplined silhouettes engineered in heavyweight organic cotton. Rendered with vector plan drawings and coordinate registrations. Produced strictly on demand.
          </p>
        </div>

        {/* Asymmetric Modular Catalog View */}
        <div className="pt-8">
          <CollectionShopView products={products} />
        </div>

        {/* Tailor Disclaimer Footer */}
        <div className="pt-16 hairline-border-t flex flex-col sm:flex-row sm:items-center justify-between font-mono-tag text-xs text-[var(--stone)] gap-3">
          <span>ALL DESIGNS ARE ORIGINAL ARCHITECTURAL VECTOR CONCEPTS</span>
          <span>PRINT ON DEMAND // ZERO WAREHOUSE STOCK</span>
        </div>
      </Container>
    </div>
  );
}
