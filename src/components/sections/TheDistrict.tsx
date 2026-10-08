import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { DistrictMap } from '@/components/district/DistrictMap';
import { DistrictList } from '@/components/district/DistrictList';
import { Division, AnyVenture } from '@/data/types';
import { studioServices } from '@/data/services';
import { ArrowRight } from 'lucide-react';

interface TheDistrictProps {
  divisions: Division[];
  venturesByDivision: Record<string, AnyVenture[]>;
}

export function TheDistrict({
  divisions,
  venturesByDivision,
}: TheDistrictProps) {
  return (
    <section
      id="district-section"
      className="py-20 md:py-32 hairline-border-b scroll-mt-20"
      aria-label="The District Architectural Plan"
    >
      <Container>
        <SectionHeader
          index="01"
          title="THE DISTRICT"
          code="CADASTRE"
          caption="An interactive plan of our active operational sectors. Four dedicated divisions under one parent venture house."
        />

        {/* Desktop View: Plan CAD Grid + Side Inspector */}
        <div className="hidden md:block">
          <DistrictMap
            divisions={divisions}
            venturesByDivision={venturesByDivision}
            serviceCount={studioServices.length}
          />
        </div>

        {/* Mobile View: Vertical Accordion Preview Stack */}
        <div className="block md:hidden">
          <DistrictList
            divisions={divisions}
            venturesByDivision={venturesByDivision}
            serviceCount={studioServices.length}
          />
        </div>

        {/* Link to Full District Map Page */}
        <div className="pt-8 flex items-center justify-between font-mono-tag text-xs text-[var(--muted-text)]">
          <span>EXPLORE COMPLETE ECOSYSTEM REGISTRY</span>
          <Link
            href="/district"
            className="hover:text-[var(--signal)] flex items-center gap-1 font-semibold uppercase"
          >
            <span>FULL DISTRICT PLAN (/district)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
