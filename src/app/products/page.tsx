import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { ProductsFilterView } from '@/components/products/ProductsFilterView';
import { getProducts } from '@/lib/content';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Software Products (Z-03) // Digital Utilities & Tools',
  description:
    'Independent digital products, SaaS applications, browser utilities, and developer tools built and operated by ZenithDistrict.',
  path: '/products',
});

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="py-12 md:py-20 space-y-16">
      <Container>
        <SectionHeader
          index="Z-03"
          title="SOFTWARE PRODUCTS"
          code="DIRECTORY"
          caption="Independent software tools and developer utilities built to solve specific technical friction."
        />

        <div className="max-w-3xl space-y-4 mb-12">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
            Focused software engineered for durability.
          </h1>
          <p className="text-base text-[var(--muted-text)] leading-relaxed">
            Every product in this catalog was created because existing tools were bloated, intrusive, or unnecessarily complex. We build lightweight, privacy-respecting software with zero artificial metrics.
          </p>
        </div>

        <ProductsFilterView products={products} />

        <div className="pt-12 hairline-border-t flex items-center justify-between font-mono-tag text-xs text-[var(--stone)]">
          <span>ALL TOOLS CURRENTLY IN ACTIVE DOGFOODING & PUBLIC RELEASE</span>
          <span>DISTRICT SECTOR SW</span>
        </div>
      </Container>
    </div>
  );
}
