'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LabExperiment, VentureStatus } from '@/data/types';
import { STATUS_ORDER, STATUS_REGISTRY } from '@/data/status';
import { StatusTag } from '@/components/ui/StatusTag';

interface LabsBoardProps {
  experiments: LabExperiment[];
}

export function LabsBoard({ experiments }: LabsBoardProps) {
  const [selectedMobileStage, setSelectedMobileStage] = useState<VentureStatus | 'All'>('All');

  const filteredExperiments =
    selectedMobileStage === 'All'
      ? experiments
      : experiments.filter((e) => e.status === selectedMobileStage);

  return (
    <div className="w-full space-y-10">
      {/* Editorial Headline */}
      <div className="pb-6 hairline-border-b flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        <div>
          <h2 className="font-editorial-italic text-3xl sm:text-4xl text-[var(--text-primary)]">
            Some ideas become products. Some products become companies.
          </h2>
          <p className="text-sm text-[var(--muted-text)] mt-2 max-w-2xl">
            The Labs division operates with radical transparency. We document hypotheses, record failure modes, and rigorously test whether a project deserves sovereign resources.
          </p>
        </div>
        <div className="font-mono-tag text-xs text-[var(--stone)] shrink-0">
          EXPERIMENTS: {experiments.length} LOGGED
        </div>
      </div>

      {/* Mobile Stage Selector Filter Tabs (Hidden on Desktop) */}
      <div className="flex lg:hidden overflow-x-auto gap-2 pb-2">
        <button
          type="button"
          onClick={() => setSelectedMobileStage('All')}
          className={`px-3 py-1.5 font-mono-tag text-xs border rounded-none shrink-0 ${
            selectedMobileStage === 'All'
              ? 'border-[var(--signal)] bg-[var(--surface-elevated)] text-[var(--signal)]'
              : 'border-[var(--border-color)] text-[var(--muted-text)]'
          }`}
        >
          ALL STAGES ({experiments.length})
        </button>
        {STATUS_ORDER.map((stage) => {
          const count = experiments.filter((e) => e.status === stage).length;
          return (
            <button
              key={stage}
              type="button"
              onClick={() => setSelectedMobileStage(stage)}
              className={`px-3 py-1.5 font-mono-tag text-xs border rounded-none shrink-0 flex items-center gap-1.5 ${
                selectedMobileStage === stage
                  ? 'border-[var(--signal)] bg-[var(--surface-elevated)] text-[var(--signal)]'
                  : 'border-[var(--border-color)] text-[var(--muted-text)]'
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: STATUS_REGISTRY[stage].dotColor }}
              />
              <span>
                {stage} ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile View: Vertical Cards / Stepper List */}
      <div className="block lg:hidden space-y-4">
        {filteredExperiments.map((exp) => (
          <Link
            key={exp.id}
            href={`/labs/${exp.slug}`}
            className="group block p-5 border border-[var(--border-color)] hover:border-[var(--signal)] bg-[var(--surface)] transition-colors"
          >
            <div className="flex items-center justify-between pb-3 hairline-border-b">
              <span className="font-mono-tag text-xs text-[var(--stone)]">
                {`${exp.division} // ${exp.id}`}
              </span>
              <StatusTag status={exp.status} size="sm" />
            </div>

            <div className="my-3">
              <h3 className="font-display text-xl font-medium text-[var(--text-primary)] group-hover:text-[var(--signal)]">
                {exp.name}
              </h3>
              <p className="text-xs text-[var(--muted-text)] mt-1 line-clamp-2">
                {exp.tagline}
              </p>
            </div>

            <div className="text-[11px] font-mono-tag text-[var(--stone)] pt-2 flex items-center justify-between">
              <span>UPDATED {exp.updatedAt || 'ACTIVE'}</span>
              <span className="text-[var(--signal)] flex items-center gap-1">
                INSPECT ↗
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop 6-Column Kanban Matrix */}
      <div className="hidden lg:grid grid-cols-6 gap-4 items-start">
        {STATUS_ORDER.map((stage, idx) => {
          const config = STATUS_REGISTRY[stage];
          const stageItems = experiments.filter((e) => e.status === stage);

          return (
            <div
              key={stage}
              className="border border-[var(--border-color)] bg-[var(--surface-elevated)]/60 p-4 min-h-[520px] flex flex-col justify-between"
            >
              <div>
                {/* Column Header */}
                <div className="pb-3 hairline-border-b">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono-tag text-[10px] text-[var(--stone)]">
                      STAGE 0{idx + 1}
                    </span>
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: config.dotColor }}
                    />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-mono-tag text-xs font-semibold text-[var(--text-primary)]">
                      {stage}
                    </h3>
                    <span className="font-mono-tag text-[10px] text-[var(--muted-text)]">
                      ({stageItems.length})
                    </span>
                  </div>
                </div>

                {/* Experiment Cards Stack */}
                <div className="space-y-3 mt-4">
                  {stageItems.length > 0 ? (
                    stageItems.map((item) => (
                      <Link
                        key={item.id}
                        href={`/labs/${item.slug}`}
                        className="group block p-3.5 border border-[var(--border-color)] hover:border-[var(--signal)] bg-[var(--surface)] transition-all hover:-translate-y-0.5"
                      >
                        <div className="flex items-center justify-between text-[9px] font-mono-tag text-[var(--stone)] mb-1.5">
                          <span>{item.id}</span>
                          <span>{item.updatedAt || 'ACTIVE'}</span>
                        </div>
                        <h4 className="font-display text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--signal)] leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-[var(--muted-text)] mt-1.5 line-clamp-3 leading-relaxed">
                          {item.tagline}
                        </p>
                        <div className="mt-3 pt-2 hairline-border-t flex flex-wrap gap-1">
                          {item.tags.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="text-[9px] font-mono-tag px-1 py-0.5 border border-[var(--border-color)] text-[var(--stone)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="py-12 text-center border border-dashed border-[var(--border-color)] text-[10px] font-mono-tag text-[var(--stone)]/50">
                      NO ACTIVE EXPERIMENTS
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-6 hairline-border-t text-[10px] font-mono-tag text-[var(--stone)]">
                {`// ${config.description.split('.')[0]}.`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
