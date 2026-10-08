import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { foundersData } from '@/data/founders';
import { constructMetadata } from '@/lib/seo';
import { Cpu, Shield } from 'lucide-react';
import { GithubIcon, XIcon } from '@/components/ui/BrandSocialIcons';

export const metadata: Metadata = constructMetadata({
  title: 'About the District // Venture Model & Operating Architecture',
  description:
    'The architectural thesis, operating principles, and sovereign venture model powering ZenithDistrict.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 space-y-24 md:space-y-32">
      {/* 1. Mission & Manifesto */}
      <Container>
        <div className="space-y-6 max-w-4xl">
          <div className="flex items-center gap-2 font-mono-tag text-xs text-[var(--signal)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)]"></span>
            <span>VENTURE HOUSE THESIS // EST. 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-[var(--text-primary)] leading-tight">
            One parent identity. Many sovereign ventures.
          </h1>

          <p className="text-lg md:text-xl text-[var(--muted-text)] leading-relaxed">
            ZenithDistrict is an independent venture house. We design and build software, launch consumer brands, and run experiments—taking the strongest ideas from first sketch to standalone company.
          </p>

          <p className="text-sm md:text-base text-[var(--text-primary)] leading-relaxed pt-2">
            Most digital organizations are forced into false dichotomies: you are either an agency billing hours, an early-stage startup pitching speculative growth metrics, or an apparel brand chasing trends. ZenithDistrict rejects this fragmentation. We unify client engineering, consumer commerce, focused utilities, and R&D under one high-craft technical roof.
          </p>
        </div>
      </Container>

      {/* 2. Architectural Venture Model Diagram (SVG Vector Tree) */}
      <Container>
        <SectionHeader
          index="01"
          title="THE OPERATING ARCHITECTURE"
          code="STRUCTURE"
          caption="One parent infrastructure supporting four sovereign divisions."
        />

        <div className="p-6 sm:p-10 border border-[var(--border-color)] bg-[var(--surface-elevated)] space-y-8">
          <div className="flex items-center justify-between font-mono-tag text-xs text-[var(--stone)] pb-4 hairline-border-b">
            <span>SCHEMATIC: PARENT → DIVISIONS → SOVEREIGN VENTURES</span>
            <span>SPEC: VENTURE HOUSE 1.0</span>
          </div>

          {/* SVG Diagram */}
          <div className="w-full overflow-x-auto py-4">
            <div className="min-w-[700px] flex flex-col items-center">
              {/* Parent Apex Box */}
              <div className="p-5 border-2 border-[var(--ink)] dark:border-[var(--bone)] bg-[var(--surface)] text-center w-80 shadow-xs">
                <span className="font-mono-tag text-[10px] text-[var(--signal)] font-semibold block">
                  PARENT HOLDING & VENTURE HOUSE
                </span>
                <span className="font-display text-xl font-medium text-[var(--text-primary)] block mt-1">
                  ZENITHDISTRICT
                </span>
                <span className="text-[11px] text-[var(--muted-text)] block mt-0.5">
                  Core Engineering & Capital Allocation
                </span>
              </div>

              {/* Trunk Connector */}
              <div className="w-[1px] h-8 bg-[var(--border-color)]" />
              <div className="w-[84%] h-[1px] bg-[var(--border-color)] relative">
                <div className="absolute left-0 top-0 w-[1px] h-8 bg-[var(--border-color)]" />
                <div className="absolute left-[33%] top-0 w-[1px] h-8 bg-[var(--border-color)]" />
                <div className="absolute left-[67%] top-0 w-[1px] h-8 bg-[var(--border-color)]" />
                <div className="absolute right-0 top-0 w-[1px] h-8 bg-[var(--border-color)]" />
              </div>
              <div className="h-8" />

              {/* 4 Division Nodes */}
              <div className="w-full grid grid-cols-4 gap-4">
                {/* Node 1: Studio */}
                <div className="p-4 border border-[var(--border-color)] bg-[var(--surface)] text-center space-y-1">
                  <span className="font-mono-tag text-[10px] text-[var(--signal)] block">
                    Z-01 STUDIO
                  </span>
                  <span className="font-display text-base font-medium text-[var(--text-primary)] block">
                    Client Practice
                  </span>
                  <span className="text-[11px] text-[var(--muted-text)] block">
                    Web, SaaS & AI Engineering
                  </span>
                  <div className="mt-3 pt-2 hairline-border-t text-[10px] font-mono-tag text-[var(--stone)]">
                    Generates Cash Flow & Signal
                  </div>
                </div>

                {/* Node 2: Brands */}
                <div className="p-4 border border-[var(--border-color)] bg-[var(--surface)] text-center space-y-1">
                  <span className="font-mono-tag text-[10px] text-[var(--signal)] block">
                    Z-02 BRANDS
                  </span>
                  <span className="font-display text-base font-medium text-[var(--text-primary)] block">
                    Consumer Ventures
                  </span>
                  <span className="text-[11px] text-[var(--muted-text)] block">
                    On-Demand Physical Labels
                  </span>
                  <div className="mt-3 pt-2 hairline-border-t text-[10px] font-mono-tag text-[var(--stone)]">
                    Direct Consumer Connection
                  </div>
                </div>

                {/* Node 3: Products */}
                <div className="p-4 border border-[var(--border-color)] bg-[var(--surface)] text-center space-y-1">
                  <span className="font-mono-tag text-[10px] text-[var(--signal)] block">
                    Z-03 PRODUCTS
                  </span>
                  <span className="font-display text-base font-medium text-[var(--text-primary)] block">
                    Digital Software
                  </span>
                  <span className="text-[11px] text-[var(--muted-text)] block">
                    Utilities, SaaS & DevTools
                  </span>
                  <div className="mt-3 pt-2 hairline-border-t text-[10px] font-mono-tag text-[var(--stone)]">
                    Durable Recurring Software
                  </div>
                </div>

                {/* Node 4: Labs */}
                <div className="p-4 border border-[var(--border-color)] bg-[var(--surface)] text-center space-y-1">
                  <span className="font-mono-tag text-[10px] text-[var(--signal)] block">
                    Z-04 LABS
                  </span>
                  <span className="font-display text-base font-medium text-[var(--text-primary)] block">
                    R&D Prototyping
                  </span>
                  <span className="text-[11px] text-[var(--muted-text)] block">
                    Hypotheses & Feasibility
                  </span>
                  <div className="mt-3 pt-2 hairline-border-t text-[10px] font-mono-tag text-[var(--stone)]">
                    Filter for High-Conviction Ideas
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 hairline-border-t text-xs font-mono-tag text-[var(--stone)] flex items-center justify-between">
            <span>PRINCIPLE: SHARED TECHNICAL CAPABILITY // SEPARATE COMMERCIAL IDENTITIES</span>
            <span>REVERSIBLE EXPERIMENTATION</span>
          </div>
        </div>
      </Container>

      {/* 3. Operating Principles */}
      <Container>
        <SectionHeader
          index="02"
          title="OPERATING DISCIPLINE"
          code="DOCTRINE"
          caption="Non-negotiable operational boundaries and quality controls."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-[var(--border-color)] bg-[var(--surface)] space-y-3">
            <div className="flex items-center gap-2 font-mono-tag text-xs text-[var(--signal)]">
              <Shield className="w-4 h-4" />
              <span>PRINCIPLE 01</span>
            </div>
            <h3 className="font-display text-2xl font-medium text-[var(--text-primary)]">
              Radical Operational Honesty
            </h3>
            <p className="text-sm text-[var(--muted-text)] leading-relaxed">
              We never fabricate press logos, vanity user counts, artificial client counts, or false metrics. If a product is in pre-release beta, we say so. Our credibility is earned through visible craftsmanship and working software.
            </p>
          </div>

          <div className="p-6 border border-[var(--border-color)] bg-[var(--surface)] space-y-3">
            <div className="flex items-center gap-2 font-mono-tag text-xs text-[var(--signal)]">
              <Cpu className="w-4 h-4" />
              <span>PRINCIPLE 02</span>
            </div>
            <h3 className="font-display text-2xl font-medium text-[var(--text-primary)]">
              Shared Infrastructure Synergies
            </h3>
            <p className="text-sm text-[var(--muted-text)] leading-relaxed">
              Every system built for a client engagement or internal product enriches the parent codebase. A vector search engine perfected in Labs powers our next SaaS product; an on-demand print pipeline in Brands unlocks merchandise for all district properties.
            </p>
          </div>
        </div>
      </Container>

      {/* 4. Graduation Criteria for Labs */}
      <Container>
        <SectionHeader
          index="03"
          title="GRADUATION CRITERIA"
          code="GATEWAY"
          caption="The rigorous standard an experimental idea must satisfy to become a standalone venture."
        />

        <div className="p-8 border border-[var(--border-color)] bg-[var(--surface-elevated)] space-y-6">
          <p className="text-base text-[var(--text-primary)] leading-relaxed max-w-2xl">
            Not every idea deserves to become a company. Most should remain small scripts or focused utilities. An initiative only transitions from Labs into a sovereign Venture if it meets four specific thresholds:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                num: '01',
                title: 'Technical Resilience',
                desc: 'Architecture scales stably without requiring daily ad-hoc firefighting.',
              },
              {
                num: '02',
                title: 'Inherent Retention',
                desc: 'Real users return repeatedly without aggressive artificial marketing prompts.',
              },
              {
                num: '03',
                title: 'Clear Economic Model',
                desc: 'Positive unit economics on direct software subscriptions or consumer sales.',
              },
              {
                num: '04',
                title: 'Sovereign Brand Narrative',
                desc: 'Strong enough to stand on its own without leaning on parent identity.',
              },
            ].map((crit) => (
              <div
                key={crit.num}
                className="p-5 border border-[var(--border-color)] bg-[var(--surface)] space-y-2"
              >
                <span className="font-mono-tag text-xs text-[var(--signal)]">
                  GATE // {crit.num}
                </span>
                <h4 className="font-display text-lg font-medium text-[var(--text-primary)]">
                  {crit.title}
                </h4>
                <p className="text-xs text-[var(--muted-text)] leading-relaxed">
                  {crit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* 5. Founders & Leadership */}
      <Container>
        <SectionHeader
          index="04"
          title="FOUNDERS & OPERATORS"
          code="PEOPLE"
          caption="The engineers and designers operating the district."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {foundersData.map((founder, idx) => (
            <div
              key={idx}
              className="p-8 border border-[var(--border-color)] bg-[var(--surface)] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono-tag text-xs text-[var(--signal)]">
                    OPERATOR // 0{idx + 1}
                  </span>
                  <span className="font-mono-tag text-xs text-[var(--stone)]">
                    PRINCIPAL
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-3xl font-medium text-[var(--text-primary)]">
                    {founder.name}
                  </h3>
                  <p className="font-mono-tag text-xs text-[var(--stone)] mt-0.5">
                    {founder.role}
                  </p>
                </div>

                <p className="text-sm text-[var(--muted-text)] leading-relaxed">
                  {founder.bio}
                </p>

                <div className="pt-2 text-xs font-mono-tag text-[var(--stone)]">
                  FOCUS // {founder.focus}
                </div>
              </div>

              {founder.links && (
                <div className="pt-4 hairline-border-t flex items-center gap-4 font-mono-tag text-xs">
                  {founder.links.github && (
                    <a
                      href={founder.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--signal)] flex items-center gap-1 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>GITHUB</span>
                    </a>
                  )}
                  {founder.links.x && (
                    <a
                      href={founder.links.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--signal)] flex items-center gap-1 transition-colors"
                    >
                      <XIcon className="w-3.5 h-3.5" />
                      <span>X PROFILE</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Partner Placeholder */}
          <div className="p-8 border border-dashed border-[var(--border-color)] bg-[var(--surface-elevated)]/30 flex flex-col justify-between select-none">
            <div className="space-y-2">
              <span className="font-mono-tag text-xs text-[var(--stone)]">
                OPERATOR // 02
              </span>
              <h3 className="font-display text-2xl font-light text-[var(--stone)]">
                Division Lead (Open Slot)
              </h3>
              <p className="text-xs text-[var(--muted-text)] mt-2">
                As independent ventures graduate into standalone entities, technical co-founders and division leads will be appointed directly to oversee sovereign roadmaps.
              </p>
            </div>
            <div className="pt-6 font-mono-tag text-[10px] text-[var(--stone)]">
              {"// RECRUITMENT TRIGGERED BY VENTURE GRADUATION"}
            </div>
          </div>
        </div>
      </Container>

      {/* 6. Where We're Going (Honest Roadmap) */}
      <Container>
        <SectionHeader
          index="05"
          title="WHERE WE'RE GOING"
          code="TRAJECTORY"
          caption="Our long-term architectural roadmap. No speculative release dates."
        />

        <div className="p-8 border border-[var(--border-color)] bg-[var(--surface)] space-y-6">
          <div className="space-y-4 max-w-2xl">
            <h3 className="font-display text-3xl font-medium text-[var(--text-primary)]">
              A durable, self-sustaining venture network.
            </h3>
            <p className="text-sm text-[var(--muted-text)] leading-relaxed">
              We are building a model where client engineering funds internal exploration, and internal software tools compound in value over decades. We do not operate on artificial quarterly venture-capital clocks; we operate on software durability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 hairline-border-t">
            <div className="space-y-2">
              <span className="font-mono-tag text-xs text-[var(--signal)]">
                HORIZON 1 (CURRENT)
              </span>
              <h4 className="font-display text-lg font-medium text-[var(--text-primary)]">
                Baseline Establishment
              </h4>
              <p className="text-xs text-[var(--muted-text)] leading-relaxed">
                Launch initial suite of digital utilities (I Hate Love PDF, Product.forum, GitFC) and initial on-demand apparel brand.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono-tag text-xs text-[var(--signal)]">
                HORIZON 2
              </span>
              <h4 className="font-display text-lg font-medium text-[var(--text-primary)]">
                Sovereign Spin-Outs
              </h4>
              <p className="text-xs text-[var(--muted-text)] leading-relaxed">
                Transition qualified products and brands onto dedicated subdomains and independent balance sheets.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono-tag text-xs text-[var(--signal)]">
                HORIZON 3
              </span>
              <h4 className="font-display text-lg font-medium text-[var(--text-primary)]">
                Ecosystem Operations
              </h4>
              <p className="text-xs text-[var(--muted-text)] leading-relaxed">
                Multi-product holding company with internal venture studio and external seed partnerships.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
