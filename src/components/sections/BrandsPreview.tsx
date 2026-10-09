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

        {/* Active Collection 01 Spotlight */}
        {firstBrand && (
          <div className="mt-6 p-4 border border-[var(--border-color)] bg-[var(--surface-elevated)]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono-tag text-xs">
            <div className="flex items-center gap-2 text-[var(--text-primary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)]" />
              <span>COLLECTION 01 IN SAMPLING</span>
              <span className="text-[var(--stone)]">— 4 Architectural Silhouettes (ZB-01–04)</span>
            </div>
            <Link
              href={`/brands/${firstBrand.slug}/shop`}
              className="text-[var(--text-primary)] hover:text-[var(--signal)] transition-colors flex items-center gap-1.5 font-medium"
            >
              <span>ENTER ATELIER SHOP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

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
