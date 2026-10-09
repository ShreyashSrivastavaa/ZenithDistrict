import React from 'react';
import Link from 'next/link';
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

        {/* Active Collection 01 Spotlight Bar */}
        {firstBrand && (
          <div className="mt-8 p-5 border border-[var(--border-color)] bg-[var(--surface-elevated)]/30 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono-tag text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[var(--text-primary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)]" />
                <span className="font-medium">COLLECTION 01 — ARCHITECTURAL MONO</span>
                <span className="text-[var(--stone)] text-[11px]">(4 Silhouettes // Made to Order)</span>
              </div>
              <p className="text-[11px] text-[var(--muted-text)] font-sans">
                Heavyweight cotton blanks, vector technical prints, and localized on-demand production.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/brands/${firstBrand.slug}`}
                className="text-[var(--muted-text)] hover:text-[var(--text-primary)] transition-colors"
              >
                Brand Overview →
              </Link>
              <Link
                href={`/brands/${firstBrand.slug}/shop`}
                className="px-3.5 py-1.5 bg-[var(--text-primary)] text-[var(--bg-page)] hover:bg-[var(--signal)] hover:text-white transition-colors"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        )}

        <div className="pt-12 hairline-border-t flex items-center justify-between font-mono-tag text-xs text-[var(--stone)]">
          <span>SUPPLY CHAIN: ON-DEMAND TEXTILES // ZERO SPECULATIVE INVENTORY</span>
          <span>DISTRICT SECTOR NE</span>
        </div>
      </Container>
    </div>
  );
}
