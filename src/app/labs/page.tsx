import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { LabsBoard } from '@/components/ventures/LabsBoard';
import { getLabs } from '@/lib/content';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Labs & R&D (Z-04) // Lifecycle Board',
  description:
    'The experimental division of ZenithDistrict. Active prototypes, technical hypotheses, and open research exploring what deserves to become a product or sovereign venture.',
  path: '/labs',
});

export default async function LabsPage() {
  const experiments = await getLabs();

  return (
    <div className="py-12 md:py-20 space-y-16">
      <Container>
        <SectionHeader
          index="Z-04"
          title="LABS & EXPERIMENTS"
          code="KANBAN"
          caption="Active technical prototyping and early hypotheses undergoing lifecycle stress-testing."
        />

        <LabsBoard experiments={experiments} />

        <div className="pt-12 hairline-border-t flex items-center justify-between font-mono-tag text-xs text-[var(--stone)]">
          <span>GRADUATION MODEL: IDEA → EXPLORING → BUILDING → BETA → LIVE → VENTURE</span>
          <span>DISTRICT SECTOR SE</span>
        </div>
      </Container>
    </div>
  );
}
