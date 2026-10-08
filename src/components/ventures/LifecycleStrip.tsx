import React from 'react';
import Link from 'next/link';
import { LabExperiment } from '@/data/types';
import { STATUS_ORDER, STATUS_REGISTRY } from '@/data/status';
import { ArrowRight } from 'lucide-react';

interface LifecycleStripProps {
  experiments: LabExperiment[];
  headline?: string;
}

export function LifecycleStrip({
  experiments,
  headline = 'Not every idea starts as a company.',
}: LifecycleStripProps) {
  return (
    <div className="w-full space-y-8">
      {/* Subhead Editorial */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 hairline-border-b">
        <p className="font-editorial-italic text-2xl sm:text-3xl text-[var(--text-primary)]">
          {headline}
        </p>
        <span className="font-mono-tag text-xs text-[var(--stone)]">
          LIFECYCLE TRAJECTORY // 6 PHASES
        </span>
      </div>

      {/* Horizontal Lifecycle Columns (6 Stages) */}
      <div className="w-full overflow-x-auto pb-4">
        <div className="min-w-[780px] grid grid-cols-6 gap-3">
          {STATUS_ORDER.map((stage, idx) => {
            const config = STATUS_REGISTRY[stage];
            const matchingItems = experiments.filter((e) => e.status === stage);

            return (
              <div
                key={stage}
                className="border border-[var(--border-color)] bg-[var(--surface-elevated)] p-3.5 flex flex-col justify-between min-h-[220px]"
              >
                {/* Column Stage Header */}
                <div>
                  <div className="flex items-center justify-between pb-2 hairline-border-b">
                    <span className="font-mono-tag text-[10px] text-[var(--stone)]">
                      0{idx + 1}
                    </span>
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: config.dotColor }}
                    />
                  </div>
                  <div className="mt-2">
                    <span className="font-mono-tag text-xs font-semibold text-[var(--text-primary)] block">
                      {stage}
                    </span>
                    <span className="text-[10px] text-[var(--muted-text)] line-clamp-2 mt-1">
                      {config.description}
                    </span>
                  </div>
                </div>

                {/* Items in this stage */}
                <div className="space-y-2 mt-4 pt-3 hairline-border-t">
                  {matchingItems.length > 0 ? (
                    matchingItems.map((item) => (
                      <Link
                        key={item.id}
                        href={`/labs/${item.slug}`}
                        className="group block p-2 border border-[var(--border-color)] hover:border-[var(--signal)] bg-[var(--surface)] text-[11px] transition-colors"
                      >
                        <span className="font-medium text-[var(--text-primary)] group-hover:text-[var(--signal)] block truncate">
                          {item.name}
                        </span>
                        <span className="text-[9px] font-mono-tag text-[var(--stone)] block mt-0.5">
                          UPDATED {item.updatedAt || 'ACTIVE'}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <div className="text-[10px] font-mono-tag text-[var(--stone)]/60 text-center py-4">
                      -- EMPTY --
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-mono-tag text-[var(--muted-text)] pt-2">
        <span>TRACKING ACTIVE R&D THROUGH PRODUCTION HORIZONS</span>
        <Link
          href="/labs"
          className="hover:text-[var(--signal)] flex items-center gap-1 font-medium"
        >
          <span>VIEW FULL LABS BOARD</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
