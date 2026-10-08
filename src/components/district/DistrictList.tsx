'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Division, AnyVenture } from '@/data/types';
import { StatusTag } from '@/components/ui/StatusTag';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface DistrictListProps {
  divisions: Division[];
  venturesByDivision: Record<string, AnyVenture[]>;
  serviceCount: number;
}

export function DistrictList({
  divisions,
  venturesByDivision,
  serviceCount,
}: DistrictListProps) {
  const [expandedCode, setExpandedCode] = useState<string | null>('Z-01');

  const toggle = (code: string) => {
    setExpandedCode((prev) => (prev === code ? null : code));
  };

  return (
    <div className="w-full divide-y divide-[var(--border-color)] hairline-border-y bg-[var(--surface)]">
      {divisions.map((division) => {
        const isExpanded = expandedCode === division.code;
        const ventures = venturesByDivision[division.slug] || [];

        return (
          <div key={division.code} className="py-2">
            <button
              type="button"
              onClick={() => toggle(division.code)}
              aria-expanded={isExpanded}
              className="w-full py-4 px-4 sm:px-6 flex items-center justify-between text-left hover:bg-[var(--surface-elevated)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--signal)]"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-mono-tag text-xs font-semibold px-2 py-0.5 border border-[var(--border-color)] text-[var(--signal)]">
                  {division.code}
                </span>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-normal text-[var(--text-primary)]">
                    {division.name}
                  </h3>
                  <span className="font-mono-tag text-[10px] text-[var(--stone)] block">
                    {division.title}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono-tag text-xs text-[var(--muted-text)] hidden sm:inline">
                  {division.slug === 'studio'
                    ? `${serviceCount} Services`
                    : `${ventures.length} Items`}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[var(--stone)] transition-transform duration-200 ${
                    isExpanded ? 'rotate-180 text-[var(--signal)]' : ''
                  }`}
                  strokeWidth={1.5}
                />
              </div>
            </button>

            {isExpanded && (
              <div className="px-4 sm:px-6 pb-6 pt-2 bg-[var(--surface-elevated)]/50 space-y-4">
                <p className="text-sm text-[var(--muted-text)] leading-relaxed max-w-2xl">
                  {division.leadParagraph}
                </p>

                {/* Sub items */}
                <div className="pt-2 space-y-2">
                  <div className="text-[10px] font-mono-tag text-[var(--stone)] uppercase tracking-wider">
                    SECTOR CONTENTS
                  </div>
                  {division.slug === 'studio' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {[
                        'Full-stack & web development',
                        'SaaS architecture & development',
                        'AI integrations & workflows',
                        'Backend & API engineering',
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2 border border-[var(--border-color)] bg-[var(--surface)] flex items-center justify-between"
                        >
                          <span className="text-[var(--text-primary)]">{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {ventures.map((v) => (
                        <Link
                          key={v.id}
                          href={`/${division.slug}/${v.slug}`}
                          className="p-2.5 border border-[var(--border-color)] hover:border-[var(--signal)] bg-[var(--surface)] flex items-center justify-between text-xs transition-colors block"
                        >
                          <span className="font-medium text-[var(--text-primary)] truncate pr-2">
                            {v.name}
                          </span>
                          <StatusTag status={v.status} size="sm" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3">
                  <Link
                    href={division.route}
                    className="inline-flex items-center gap-2 font-mono-tag text-xs text-[var(--signal)] hover:underline uppercase"
                  >
                    <span>ENTER DIVISION PAGE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
