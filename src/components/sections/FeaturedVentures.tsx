import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { VentureRow } from '@/components/ventures/VentureRow';
import { AnyVenture } from '@/data/types';
import { ArrowRight } from 'lucide-react';

interface FeaturedVenturesProps {
  ventures: AnyVenture[];
}

export function FeaturedVentures({ ventures }: FeaturedVenturesProps) {
  return (
    <section
      id="ventures-section"
      className="py-20 md:py-32 hairline-border-b scroll-mt-20"
      aria-label="Featured Ventures Index"
    >
      <Container>
        <SectionHeader
          index="02"
          title="FEATURED VENTURES"
          code="INDEX"
          caption="Selected projects currently deployed, in development, or undergoing active experimentation across the district."
        />

        {/* Horizontal Editorial Table Index */}
        <div className="w-full border-t border-[var(--border-color)]">
          {ventures.map((venture, idx) => (
            <VentureRow key={venture.id} venture={venture} index={idx} />
          ))}
        </div>

        {/* Index Footer */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono-tag text-xs text-[var(--muted-text)]">
          <span>REAL WORK SHIPPED AND IN PROGRESS. NEVER FABRICATED NUMBERS.</span>
          <div className="flex items-center gap-6">
            <Link
              href="/products"
              className="hover:text-[var(--signal)] flex items-center gap-1 font-medium"
            >
              <span>ALL PRODUCTS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/labs"
              className="hover:text-[var(--signal)] flex items-center gap-1 font-medium"
            >
              <span>ALL LAB EXPERIMENTS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
