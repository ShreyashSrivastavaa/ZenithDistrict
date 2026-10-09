import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { getBrandBySlug } from '@/lib/content';
import { getApparelProducts, getApparelProductBySlug } from '@/data/apparel';
import { constructMetadata, safeJsonLdStringify } from '@/lib/seo';
import { ProductClientView } from '@/components/brand/ProductClientView';
import { ProductCard } from '@/components/brand/ProductCard';
import { commerceAdapter } from '@/lib/commerce';
import { ArrowLeft } from 'lucide-react';
import { APPAREL_BRAND_SLUG } from '@/data/brands';

type PageProps = {
  params: Promise<{ slug: string; product: string }>;
};

export const instant = false;

export async function generateStaticParams() {
  const products = await getApparelProducts();
  return products.map((p) => ({
    slug: APPAREL_BRAND_SLUG,
    product: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, product: productSlug } = await params;
  const product = await getApparelProductBySlug(productSlug);

  if (!product || slug !== APPAREL_BRAND_SLUG) {
    return constructMetadata({
      title: 'Product Not Found',
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${product.name} (${product.code}) // Apparel Collection 01`,
    description: product.description,
    path: `/brands/${slug}/shop/${product.slug}`,
  });
}

export default async function ApparelProductPage({ params }: PageProps) {
  const { slug, product: productSlug } = await params;

  const brand = await getBrandBySlug(slug);
  const product = await getApparelProductBySlug(productSlug);

  if (!brand || !product || slug !== APPAREL_BRAND_SLUG) {
    notFound();
  }

  const allProducts = await getApparelProducts();
  const relatedProducts = allProducts.filter((p) => p.slug !== product.slug).slice(0, 3);

  const siteUrl = 'https://zenithdistrict.com';
  const productJsonLd = commerceAdapter.generateProductJsonLd(product, siteUrl);

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ZenithDistrict',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: brand.name,
        item: `${siteUrl}/brands/${brand.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Shop',
        item: `${siteUrl}/brands/${brand.slug}/shop`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: product.name,
        item: `${siteUrl}/brands/${brand.slug}/shop/${product.slug}`,
      },
    ],
  };

  return (
    <div className="py-6 sm:py-10 md:py-14 space-y-16 sm:space-y-24">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(breadcrumbsJsonLd) }}
      />

      <Container>
        {/* Breadcrumb Hierarchy */}
        <nav
          aria-label="Breadcrumb Navigation"
          className="flex items-center gap-2 font-mono-tag text-xs text-[var(--stone)] mb-6 sm:mb-8"
        >
          <Link href={`/brands/${slug}`} className="hover:text-[var(--signal)] transition-colors">
            {brand.name}
          </Link>
          <span>/</span>
          <Link
            href={`/brands/${slug}/shop`}
            className="hover:text-[var(--signal)] transition-colors"
          >
            SHOP
          </Link>
          <span>/</span>
          <span className="text-[var(--text-primary)] font-medium">{product.code}</span>
        </nav>

        {/* 2-Zone Product Viewer with Left Scrolling Gallery & Right Sticky Info */}
        <Suspense fallback={<div className="min-h-[600px] flex items-center justify-center font-mono-tag text-xs text-[var(--stone)]">LOADING PIECE SPECIFICATION...</div>}>
          <ProductClientView product={product} />
        </Suspense>
      </Container>

      {/* Related Silhouettes Section */}
      <Container>
        <div className="pt-16 hairline-border-t space-y-8">
          <div className="flex items-center justify-between">
            <span className="font-mono-tag text-xs text-[var(--stone)] uppercase tracking-wider">
              RELATED SILHOUETTES // COLLECTION 01
            </span>
            <Link
              href={`/brands/${slug}/shop`}
              className="font-mono-tag text-xs text-[var(--signal)] hover:underline uppercase tracking-wider"
            >
              VIEW ALL PIECES →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.slug} product={rel} />
            ))}
          </div>
        </div>
      </Container>

      {/* Back to Shop Link */}
      <Container>
        <div className="pt-8 hairline-border-t">
          <Link
            href={`/brands/${slug}/shop`}
            className="font-mono-tag text-xs text-[var(--stone)] hover:text-[var(--signal)] transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO COLLECTION 01 SHOP</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
