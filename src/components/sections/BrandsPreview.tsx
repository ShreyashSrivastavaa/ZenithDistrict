import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { VentureCard } from '@/components/ventures/VentureCard';
import { BrandVenture } from '@/data/types';
import { ArrowRight } from 'lucide-react';

interface BrandsPreviewProps {
  brands: BrandVenture[];
}

export function BrandsPreview({ brands }: BrandsPreviewProps) {
  const firstBrand = brands[0];

  return (
    <section
      id="brands-section"
      className="py-20 md:py-32 hairline-border-b scroll-mt-20"
      aria-label="Brands Division Overview"
    >
      <Container>
        <SectionHeader
          index="04"
          title="CONSUMER BRANDS"
          code="Z-02"
          caption="Independent consumer ventures conceived, manufactured, and operated in-house."
        />

        {/* Editorial Subtext */}
        <div className="max-w-2xl mb-12">
          <p className="text-sm md:text-base text-[var(--muted-text)] leading-relaxed">
            The Brands division incubates standalone physical and consumer product companies. Rather than single-product drops, we build sovereign brand properties with their own identities, supply chains, and customer bases.
          </p>
        </div>

        {/* Developing Neighborhood Grid (Active Brand + Plot Unassigned) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First Apparel Brand Card */}
          {firstBrand && <VentureCard venture={firstBrand} />}

          {/* Plot Unassigned Placeholder 1 */}
          <VentureCard venture={firstBrand} isPlaceholder={true} />

          {/* Plot Unassigned Placeholder 2 */}
          <div className="hidden lg:block">
            <VentureCard venture={firstBrand} isPlaceholder={true} />
          </div>
        </div>

        <div className="pt-8 flex items-center justify-between font-mono-tag text-xs text-[var(--muted-text)]">
          <span>ONE VENTURE HOUSE. MANY SOVEREIGN BRANDS.</span>
          <Link
            href="/brands"
            className="hover:text-[var(--signal)] flex items-center gap-1 font-semibold"
          >
            <span>VIEW BRANDS DIRECTORY</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
