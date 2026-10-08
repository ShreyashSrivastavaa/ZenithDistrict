import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { studioServices } from '@/data/services';
import { ArrowRight } from 'lucide-react';

export function StudioPreview() {
  return (
    <section
      id="studio-section"
      className="py-20 md:py-32 hairline-border-b scroll-mt-20"
      aria-label="Studio Division Overview"
    >
      <Container>
        <SectionHeader
          index="03"
          title="STUDIO PRACTICE"
          code="Z-01"
          caption="Digital products designed and engineered for select founders and ambitious organizations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Positioning Manifesto */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-[var(--text-primary)] leading-snug">
              We engineer high-craft web software for teams that value architectural precision.
            </h3>
            <p className="text-sm text-[var(--muted-text)] leading-relaxed">
              The Studio is our client-service division. We do not operate as an open agency or take on dozens of concurrent engagements. We partner deeply with 1–2 teams per quarter to design, architect, and ship production systems.
            </p>

            <div className="pt-4 flex flex-col gap-2 font-mono-tag text-xs text-[var(--stone)]">
              <div>{"// CAPACITY: 1–2 CONCURRENT ENGAGEMENTS"}</div>
              <div>{"// CADENCE: RAPID SPRINT CYCLES WITH WEEKLY PREVIEWS"}</div>
            </div>

            <div className="pt-6">
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--ink)] text-[var(--bone)] dark:bg-[var(--bone)] dark:text-[var(--ink)] hover:bg-[var(--signal)] hover:text-white dark:hover:bg-[var(--signal)] dark:hover:text-white font-mono-tag text-xs tracking-wider uppercase transition-colors rounded-none"
              >
                <span>WORK WITH THE STUDIO</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: 6 Services Numbered List */}
          <div className="lg:col-span-7 divide-y divide-[var(--border-color)] hairline-border-y">
            {studioServices.map((service) => (
              <div
                key={service.id}
                className="py-4 sm:py-5 flex items-start justify-between gap-4 group"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <span className="font-mono-tag text-xs text-[var(--signal)] pt-1">
                    {service.number}
                  </span>
                  <div>
                    <h4 className="font-display text-lg sm:text-xl font-medium text-[var(--text-primary)] group-hover:text-[var(--signal)] transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--muted-text)] mt-1 max-w-lg leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Work / Transparent State */}
        <div className="mt-16 p-6 border border-[var(--border-color)] bg-[var(--surface-elevated)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono-tag text-xs text-[var(--muted-text)]">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--stone)]" />
            <span>CLIENT WORK CADASTRE // CASE STUDIES CURRENTLY IN PREPARATION</span>
          </div>
          <Link
            href="/studio#process"
            className="hover:text-[var(--signal)] flex items-center gap-1 font-medium text-[var(--text-primary)]"
          >
            <span>REVIEW STUDIO PROCESS & TECH STACK</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
