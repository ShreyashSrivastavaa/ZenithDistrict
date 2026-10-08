import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { VentureCard } from '@/components/ventures/VentureCard';
import { ProductVenture } from '@/data/types';
import { ArrowRight } from 'lucide-react';

interface ProductsPreviewProps {
  products: ProductVenture[];
}

export function ProductsPreview({ products }: ProductsPreviewProps) {
  return (
    <section
      id="products-section"
      className="py-20 md:py-32 hairline-border-b scroll-mt-20"
      aria-label="Products Division Overview"
    >
      <Container>
        <SectionHeader
          index="05"
          title="SOFTWARE PRODUCTS"
          code="Z-03"
          caption="Digital utilities, developer systems, and software tools built to solve internal friction."
        />

        {/* Editorial Subline */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-10 pb-4 hairline-border-b">
          <p className="font-editorial-italic text-2xl sm:text-3xl text-[var(--text-primary)]">
            Software we build for ourselves first.
          </p>
          <span className="font-mono-tag text-xs text-[var(--stone)]">
            UTILITIES & SAAS INFRASTRUCTURE
          </span>
        </div>

        {/* Products Grid (I Hate Love PDF, Product.forum, GitFC) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <VentureCard key={product.id} venture={product} />
          ))}
        </div>

        {/* Footer Link */}
        <div className="pt-8 flex items-center justify-between font-mono-tag text-xs text-[var(--muted-text)]">
          <span>ALL PRODUCTS DEVELOPED AND MAINTAINED IN-HOUSE</span>
          <Link
            href="/products"
            className="hover:text-[var(--signal)] flex items-center gap-1 font-semibold"
          >
            <span>VIEW ALL SOFTWARE PRODUCTS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
