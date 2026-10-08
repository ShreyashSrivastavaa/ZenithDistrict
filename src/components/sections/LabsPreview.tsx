import React from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { LifecycleStrip } from '@/components/ventures/LifecycleStrip';
import { LabExperiment } from '@/data/types';

interface LabsPreviewProps {
  experiments: LabExperiment[];
}

export function LabsPreview({ experiments }: LabsPreviewProps) {
  return (
    <section
      id="labs-section"
      className="py-20 md:py-32 hairline-border-b scroll-mt-20"
      aria-label="Labs Division Overview"
    >
      <Container>
        <SectionHeader
          index="06"
          title="LABS & EXPERIMENTS"
          code="Z-04"
          caption="Our experimental division where ideas are explored before they earn the right to become products or companies."
        />

        <LifecycleStrip
          experiments={experiments}
          headline="Not every idea starts as a company."
        />
      </Container>
    </section>
  );
}
