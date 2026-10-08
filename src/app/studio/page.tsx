import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Accordion } from '@/components/ui/Accordion';
import { Tag } from '@/components/ui/Tag';
import { ProjectsDomeSection } from '@/components/sections/ProjectsDomeSection';
import {
  studioServices,
  processSteps,
  engagementModels,
  techStackCompetencies,
} from '@/data/services';
import { studioFaqs } from '@/data/faq';
import { constructMetadata } from '@/lib/seo';
import { ArrowRight, Check } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Studio Practice (Z-01) // Product Design & Engineering',
  description:
    'The client-service practice of ZenithDistrict. High-craft web applications, SaaS systems, and AI workflows for ambitious founders and teams.',
  path: '/studio',
});

export default function StudioPage() {
  const faqItems = studioFaqs.map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  return (
    <div className="py-12 md:py-20 space-y-24 md:space-y-32">
      {/* 1. Hero Statement */}
      <Container>
        <div className="space-y-6 max-w-4xl">
          <div className="flex items-center gap-2 font-mono-tag text-xs text-[var(--signal)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)]"></span>
            <span>DIVISION Z-01 // CLIENT PRACTICE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-[var(--text-primary)] leading-tight">
            We architect and ship production digital products for teams with high craft standards.
          </h1>

          <p className="text-lg md:text-xl text-[var(--muted-text)] max-w-2xl leading-relaxed">
            We partner with a limited roster of founders and engineering leaders. We don’t deliver static Figma mockups and vanish—we design the system, write the production code, and launch it into the world.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4 font-mono-tag text-xs">
            <Link
              href="/contact?type=Studio+project"
              className="px-6 py-3.5 border border-[var(--ink)] bg-[var(--ink)] text-[var(--bg-page)] hover:bg-transparent hover:text-[var(--ink)] font-mono-tag text-[11px] tracking-[0.033em] uppercase transition-colors flex items-center gap-2 rounded-none"
            >
              <span>DISCUSS A PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-[var(--stone)] px-2">
              {"// TYPICAL DURATION: 4–10 WEEKS PER INITIATIVE"}
            </span>
          </div>
        </div>
      </Container>

      {/* 1.5. Interactive 3D Projects Archive Dome */}
      <ProjectsDomeSection />

      {/* 2. Detailed Services */}
      <Container>
        <SectionHeader
          index="01"
          title="CAPABILITIES & SERVICES"
          code="SPECS"
          caption="Outcome-focused software engineering and interface architecture."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studioServices.map((service) => (
            <div
              key={service.id}
              className="p-6 border border-[var(--border-color)] bg-[var(--surface)] flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-center justify-between pb-3 hairline-border-b text-xs font-mono-tag text-[var(--signal)]">
                  <span>{service.number}</span>
                  <span className="text-[var(--stone)]">SPECIFIED</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-medium text-[var(--text-primary)] mt-3">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted-text)] mt-2 leading-relaxed">
                  {service.shortDesc}
                </p>

                <div className="mt-5 space-y-2 pt-4 hairline-border-t">
                  <span className="text-[10px] font-mono-tag text-[var(--stone)] uppercase block">
                    DELIVERABLES:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[var(--text-primary)]">
                    {service.deliverables.map((deliv, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[var(--signal)] shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 hairline-border-t text-[11px] font-mono-tag text-[var(--stone)]">
                OUTCOME // {service.outcomes}
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* 3. 4-Step Process */}
      <Container>
        <SectionHeader
          index="02"
          title="THE OPERATING PROCESS"
          code="PIPELINE"
          caption="Discover → Design → Build → Operate. Short cycles with continuous preview deployments."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="p-6 border border-[var(--border-color)] bg-[var(--surface-elevated)] space-y-4"
            >
              <div className="flex items-center justify-between font-mono-tag text-xs">
                <span className="text-[var(--signal)] font-semibold">
                  STEP // {step.step}
                </span>
                <span className="text-[var(--stone)]">{step.duration}</span>
              </div>
              <h3 className="font-display text-2xl font-medium text-[var(--text-primary)]">
                {step.title}
              </h3>
              <p className="text-xs text-[var(--muted-text)] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* 4. Engagement Models */}
      <Container>
        <SectionHeader
          index="03"
          title="ENGAGEMENT MODELS"
          code="TERMS"
          caption="Honest, straightforward structures tailored to stage and velocity."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {engagementModels.map((model, idx) => (
            <div
              key={idx}
              className="p-6 border border-[var(--border-color)] bg-[var(--surface)] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="font-mono-tag text-xs text-[var(--signal)]">
                  FORMAT 0{idx + 1}
                </div>
                <h3 className="font-display text-2xl font-medium text-[var(--text-primary)]">
                  {model.title}
                </h3>
                <p className="font-mono-tag text-xs text-[var(--stone)]">
                  {model.tagline}
                </p>
                <p className="text-sm text-[var(--muted-text)] leading-relaxed pt-2">
                  {model.description}
                </p>
              </div>

              <div className="pt-4 hairline-border-t text-xs font-mono-tag text-[var(--stone)]">
                BEST SUITED FOR // {model.bestFor}
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* 5. Tech Competencies */}
      <Container>
        <SectionHeader
          index="04"
          title="TECHNICAL COMPETENCIES"
          code="STACK"
          caption="Core toolchain and production technologies deployed across studio builds."
        />

        <div className="flex flex-wrap gap-2.5 p-6 border border-[var(--border-color)] bg-[var(--surface-elevated)]">
          {techStackCompetencies.map((tech) => (
            <Tag key={tech} size="md" className="py-1 px-3 text-xs">
              {tech}
            </Tag>
          ))}
        </div>
      </Container>

      {/* 6. Selected Work / Transparent Readiness */}
      <Container>
        <SectionHeader
          index="05"
          title="SELECTED WORK"
          code="PROVENANCE"
          caption="Audited client deliverables and case histories."
        />

        <div className="p-8 border border-dashed border-[var(--border-color)] bg-[var(--surface-elevated)]/40 text-center space-y-3">
          <div className="font-mono-tag text-xs text-[var(--stone)]">
            {"// STATUS: REPOSITORIES UNDER PRE-RELEASE AUDIT"}
          </div>
          <h3 className="font-display text-2xl font-normal text-[var(--text-primary)]">
            Case studies currently in preparation
          </h3>
          <p className="text-sm text-[var(--muted-text)] max-w-xl mx-auto leading-relaxed">
            In keeping with our transparency principles, we do not post anonymized logos or speculative client quotes. Case studies are published only with client sign-off following live deployment.
          </p>
          <div className="pt-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-mono-tag text-xs text-[var(--signal)] hover:underline"
            >
              <span>INSPECT OUR INTERNAL PRODUCTS INSTEAD</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </Container>

      {/* 7. FAQ */}
      <Container>
        <SectionHeader
          index="06"
          title="STUDIO FAQ"
          code="QUERY"
          caption="Direct answers to foundational engagement and IP questions."
        />

        <div className="max-w-3xl">
          <Accordion items={faqItems} />
        </div>
      </Container>

      {/* 8. Studio CTA */}
      <Container>
        <div className="p-8 sm:p-12 border border-[var(--border-color)] bg-[var(--surface)] flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <div className="font-mono-tag text-xs text-[var(--signal)]">
              INITIATE COLLABORATION
            </div>
            <h3 className="font-display text-3xl font-medium text-[var(--text-primary)]">
              Ready to architect your next product?
            </h3>
            <p className="text-sm text-[var(--muted-text)] leading-relaxed">
              We review briefs directly. Share your timeline, current stack, and scope to get a direct technical assessment.
            </p>
          </div>

          <Link
            href="/contact?type=Studio+project"
            className="px-8 py-4 bg-[var(--ink)] text-[var(--bone)] dark:bg-[var(--bone)] dark:text-[var(--ink)] hover:bg-[var(--signal)] hover:text-white dark:hover:bg-[var(--signal)] dark:hover:text-white font-mono-tag text-xs tracking-widest uppercase transition-colors rounded-none text-center shrink-0 flex items-center justify-center gap-2"
          >
            <span>START A STUDIO PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </div>
  );
}
