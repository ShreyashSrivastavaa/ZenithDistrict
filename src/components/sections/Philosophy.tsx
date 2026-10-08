import React from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';

export function Philosophy() {
  const principles = [
    {
      num: '01',
      title: 'Ship the baseline version.',
      elaboration:
        'Ideas are cheap until they make contact with reality. We compress the distance between concept and deployment, shipping honest functional baselines rather than endless slide decks.',
    },
    {
      num: '02',
      title: 'Let the work decide.',
      elaboration:
        'We do not fall in love with speculative narratives. If an experiment resonates, it earns additional engineering resources. If it falters, we document the learning and archive it without remorse.',
    },
    {
      num: '03',
      title: 'Operate what you launch.',
      elaboration:
        'We are not an incubator that delegates execution to junior hands. We write the code, manage the infrastructure, monitor error traces, and refine the product mechanics ourselves.',
    },
  ];

  return (
    <section
      id="philosophy-section"
      className="py-20 md:py-32 hairline-border-b scroll-mt-20"
      aria-label="Operating Philosophy"
    >
      <Container>
        <SectionHeader
          index="07"
          title="OPERATING PHILOSOPHY"
          code="DOCTRINE"
          caption="Three non-negotiable principles guiding every product, brand, and engagement we touch."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-[var(--border-color)]">
          {principles.map((p, idx) => (
            <div
              key={p.num}
              className={`space-y-4 ${
                idx > 0 ? 'pt-8 md:pt-0 md:pl-8 lg:pl-12' : ''
              }`}
            >
              <span className="font-mono-tag text-xs font-semibold text-[var(--signal)]">
                PRINCIPLE // {p.num}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]">
                {p.title}
              </h3>
              <p className="text-sm text-[var(--muted-text)] leading-relaxed">
                {p.elaboration}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
