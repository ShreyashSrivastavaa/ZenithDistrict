import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { StatusTag } from '@/components/ui/StatusTag';
import { Tag } from '@/components/ui/Tag';
import { getLabs, getLabBySlug } from '@/lib/content';
import { constructMetadata, generateVentureJsonLd } from '@/lib/seo';
import { ArrowLeft, Lightbulb, Compass, Milestone, CheckCircle2 } from 'lucide-react';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const labs = await getLabs();
  return labs.map((lab) => ({
    slug: lab.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lab = await getLabBySlug(slug);

  if (!lab) {
    return constructMetadata({
      title: 'Experiment Not Found',
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${lab.name} // Lab Experiment (Z-04)`,
    description: lab.description,
    path: `/labs/${lab.slug}`,
  });
}

export default async function LabTemplatePage({ params }: PageProps) {
  const { slug } = await params;
  const lab = await getLabBySlug(slug);

  if (!lab) {
    notFound();
  }

  const jsonLd = generateVentureJsonLd(lab);

  return (
    <div className="py-12 md:py-20 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container>
        {/* Breadcrumb Navigation */}
        <div className="pb-8 hairline-border-b flex items-center justify-between font-mono-tag text-xs text-[var(--muted-text)]">
          <Link
            href="/labs"
            className="flex items-center gap-2 hover:text-[var(--signal)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ALL EXPERIMENTS (Z-04)</span>
          </Link>
          <span>{`LAB DOSSIER // ${lab.id}`}</span>
        </div>

        {/* Experiment Header */}
        <div className="pt-8 space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono-tag text-xs px-2 py-0.5 border border-[var(--border-color)] text-[var(--stone)]">
              {`${lab.division} // EXPERIMENTAL HYPOTHESIS`}
            </span>
            <StatusTag status={lab.status} />
            <span className="font-mono-tag text-xs text-[var(--stone)]">
              UPDATED {lab.updatedAt || 'ACTIVE'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-[var(--text-primary)]">
            {lab.name}
          </h1>

          <p className="text-xl sm:text-2xl font-editorial-italic text-[var(--text-primary)] leading-relaxed">
            {lab.tagline}
          </p>

          <p className="text-base text-[var(--muted-text)] leading-relaxed max-w-3xl">
            {lab.description}
          </p>
        </div>

        {/* Hypothesis Block */}
        <div className="mt-16 pt-12 hairline-border-t grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 font-mono-tag text-xs text-[var(--stone)]">
            01 // CORE HYPOTHESIS
          </div>
          <div className="md:col-span-8 p-6 border border-[var(--border-color)] bg-[var(--surface-elevated)] space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono-tag text-[var(--signal)]">
              <Lightbulb className="w-4 h-4" />
              <span>TESTABLE PREMISE</span>
            </div>
            <p className="text-base text-[var(--text-primary)] leading-relaxed">
              {lab.hypothesis}
            </p>
          </div>
        </div>

        {/* What We're Learning */}
        <div className="mt-16 pt-12 hairline-border-t grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 font-mono-tag text-xs text-[var(--stone)]">
            {"02 // WHAT WE'RE LEARNING"}
          </div>
          <div className="md:col-span-8 space-y-3">
            {lab.learnings.map((learning, idx) => (
              <div
                key={idx}
                className="p-4 border border-[var(--border-color)] bg-[var(--surface)] flex items-start gap-3"
              >
                <Compass className="w-4 h-4 text-[var(--signal)] shrink-0 mt-0.5" />
                <span className="text-sm text-[var(--text-primary)] leading-relaxed">
                  {learning}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Step & Graduation Milestones */}
        <div className="mt-16 pt-12 hairline-border-t grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 font-mono-tag text-xs text-[var(--stone)]">
            03 // NEXT HORIZON & CRITERIA
          </div>
          <div className="md:col-span-8 space-y-6">
            {/* Immediate Next Step */}
            <div className="p-5 border border-[var(--border-color)] bg-[var(--surface)] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono-tag text-[var(--signal)]">
                <Milestone className="w-4 h-4" />
                <span>IMMEDIATE NEXT STEP</span>
              </div>
              <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                {lab.nextMilestone}
              </p>
            </div>

            {/* Graduation Criteria */}
            {lab.graduationCriteria && (
              <div className="space-y-3">
                <span className="font-mono-tag text-xs text-[var(--stone)] uppercase block">
                  CONDITIONS TO EARN PRODUCT STATUS:
                </span>
                <div className="space-y-2">
                  {lab.graduationCriteria.map((crit, idx) => (
                    <div
                      key={idx}
                      className="p-3 border border-[var(--border-color)] bg-[var(--surface-elevated)] flex items-start gap-2.5 text-xs text-[var(--text-primary)]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--signal)] shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tags & System Metadata */}
        <div className="mt-16 pt-12 hairline-border-t flex flex-wrap items-center justify-between gap-4 font-mono-tag text-xs text-[var(--stone)]">
          <div className="flex flex-wrap items-center gap-2">
            <span>RESEARCH KEYWORDS:</span>
            {lab.tags.map((t) => (
              <Tag key={t} size="sm">
                {t}
              </Tag>
            ))}
          </div>
          <span>TRANSPARENT R&D LEDGER // ZENITHDISTRICT LABS</span>
        </div>
      </Container>
    </div>
  );
}
