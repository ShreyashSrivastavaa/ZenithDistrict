import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { VentureCard } from '@/components/ventures/VentureCard';
import { getBrands } from '@/lib/content';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Consumer Brands (Z-02) // In-House Portfolio',
  description:
    'Consumer brands conceived, manufactured, and operated by ZenithDistrict. Exploring on-demand fulfillment, sustainable supply chains, and sovereign digital identity.',
  path: '/brands',
});

export default async function BrandsPage() {
  const brands = await getBrands();
  const firstBrand = brands[0];

  return (
    <div className="py-12 md:py-20 space-y-16">
      <Container>
        <SectionHeader
          index="Z-02"
          title="CONSUMER BRANDS"
          code="PORTFOLIO"
          caption="Physical and consumer product ventures conceived and operated in-house."
        />

        <div className="max-w-3xl space-y-4 mb-12">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
            Incubating physical goods with digital-native supply models.
          </h1>
          <p className="text-base text-[var(--muted-text)] leading-relaxed">
            The Brands division operates with a disciplined thesis: test consumer resonance with on-demand zero-inventory models before scaling manufacturing. Each brand functions as an autonomous entity within the district.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <VentureCard key={brand.id} venture={brand} />
          ))}

          {/* Reserved Unassigned Plots */}
          <VentureCard venture={firstBrand} isPlaceholder={true} />
          <div className="hidden lg:block">
            <VentureCard venture={firstBrand} isPlaceholder={true} />
          </div>
        </div>

        <div className="pt-12 hairline-border-t flex items-center justify-between font-mono-tag text-xs text-[var(--stone)]">
          <span>SUPPLY CHAIN: ON-DEMAND TEXTILES // ZERO SPECULATIVE INVENTORY</span>
          <span>DISTRICT SECTOR NE</span>
        </div>
      </Container>
    </div>
  );
}
