'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Division, AnyVenture } from '@/data/types';
import { StatusTag } from '@/components/ui/StatusTag';
import { ArrowRight } from 'lucide-react';

interface DistrictMapProps {
  divisions: Division[];
  venturesByDivision: Record<string, AnyVenture[]>;
  serviceCount: number;
  expandedMode?: boolean; // for /district full view
}

export function DistrictMap({
  divisions,
  venturesByDivision,
  serviceCount,
  expandedMode = false,
}: DistrictMapProps) {
  const [activeCode, setActiveCode] = useState<string>('Z-01');

  const activeDivision = divisions.find((d) => d.code === activeCode) || divisions[0];
  const activeVentures = (venturesByDivision[activeDivision.slug] || []).slice(0, 4);

  const getDivisionCount = (slug: string) => {
    if (slug === 'studio') return `${serviceCount} Services`;
    const count = (venturesByDivision[slug] || []).length;
    return `${count} Venture${count === 1 ? '' : 's'}`;
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Interactive Architectural SVG Map Grid (Cols 1-7 or 8) */}
      <div
        className={`${
          expandedMode ? 'lg:col-span-8' : 'lg:col-span-7'
        } relative border border-[var(--border-color)] bg-[var(--surface-elevated)] p-4 sm:p-6 select-none`}
      >
        {/* District Plan Title Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 hairline-border-b text-[10px] font-mono-tag text-[var(--muted-text)]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)]"></span>
            <span>ZENITH DISTRICT CADASTRE // PLAN VIEW</span>
          </div>
          <span>SCALE 1:1 // VECTOR CAD</span>
        </div>

        {/* 2x2 Architectural Grid Plan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
          {divisions.map((division) => {
            const isSelected = activeCode === division.code;
            const countLabel = getDivisionCount(division.slug);

            return (
              <div
                key={division.code}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setActiveCode(division.code);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveCode(division.code);
                  }
                }}
                onMouseEnter={() => setActiveCode(division.code)}
                onFocus={() => setActiveCode(division.code)}
                className={`relative p-5 sm:p-6 border transition-all duration-200 cursor-pointer text-left flex flex-col justify-between min-h-[180px] sm:min-h-[220px] rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)] ${
                  isSelected
                    ? 'border-[var(--signal)] bg-[var(--surface)] -translate-y-0.5'
                    : 'border-[var(--border-color)] hover:border-[var(--stone)] bg-[var(--surface-card)]'
                }`}
                aria-pressed={isSelected}
                aria-label={`Plot ${division.code}: ${division.name}`}
              >
                {/* Plot Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono-tag text-xs font-semibold px-2 py-0.5 border ${
                        isSelected
                          ? 'border-[var(--signal)] text-[var(--signal)] bg-[var(--signal)]/5'
                          : 'border-[var(--border-color)] text-[var(--stone)]'
                      }`}
                    >
                      {division.code}
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] animate-pulse" />
                    )}
                  </div>
                  <span className="font-mono-tag text-[10px] text-[var(--muted-text)]">
                    {division.plotCoord}
                  </span>
                </div>

                {/* Plot Title & Descriptor */}
                <div className="my-4">
                  <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-[var(--text-primary)]">
                    {division.name}
                  </h3>
                  <p className="font-mono-tag text-[11px] text-[var(--stone)] mt-0.5">
                    {division.title}
                  </p>
                  <p className="text-xs text-[var(--muted-text)] mt-2 line-clamp-2 leading-relaxed">
                    {division.descriptor}
                  </p>
                </div>

                {/* Plot Footer: Count & Route */}
                <div className="pt-3 hairline-border-t flex items-center justify-between text-[11px] font-mono-tag text-[var(--muted-text)]">
                  <span>{countLabel}</span>
                  <Link
                    href={division.route}
                    onClick={(e) => e.stopPropagation()}
                    className="hover:text-[var(--signal)] flex items-center gap-1 group font-medium"
                    aria-label={`Visit ${division.name} division`}
                  >
                    <span>ENTER</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

                {/* Coordinate Crosshairs at corners */}
                <span className="absolute -top-1 -left-1 w-2 h-2 text-[var(--stone)] text-[8px] leading-none pointer-events-none select-none">
                  +
                </span>
                <span className="absolute -bottom-1 -right-1 w-2 h-2 text-[var(--stone)] text-[8px] leading-none pointer-events-none select-none">
                  +
                </span>
              </div>
            );
          })}
        </div>

        {/* Plan Base Compass & Metadata */}
        <div className="mt-4 pt-3 hairline-border-t flex items-center justify-between text-[10px] font-mono-tag text-[var(--stone)]">
          <span>COORDINATE DATUM: WGS84 // ARCHITECTURAL ZONE 01</span>
          <span>SELECT PLOT TO INSPECT SECTOR</span>
        </div>
      </div>

      {/* Side Inspector Panel (Cols 8-12 or 9-12) */}
      <div
        className={`${
          expandedMode ? 'lg:col-span-4' : 'lg:col-span-5'
        } border border-[var(--border-color)] bg-[var(--surface)] p-6 flex flex-col justify-between min-h-[380px] sm:min-h-[460px]`}
      >
        <div>
          {/* Panel Top Metadata */}
          <div className="flex items-center justify-between pb-4 mb-4 hairline-border-b text-[10px] font-mono-tag text-[var(--stone)]">
            <span className="text-[var(--signal)] font-medium">
              PLOT INSPECTION // {activeDivision.code}
            </span>
            <span>{activeDivision.plotCoord}</span>
          </div>

          {/* Division Title & Description */}
          <div className="space-y-2 mb-6">
            <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]">
              {activeDivision.name}
            </h3>
            <p className="text-xs text-[var(--muted-text)] font-mono-tag uppercase">
              {activeDivision.title}
            </p>
            <p className="text-sm text-[var(--text-primary)] leading-relaxed pt-2">
              {activeDivision.leadParagraph}
            </p>
          </div>

          {/* Active Items in Plot */}
          <div className="space-y-3 pt-4 hairline-border-t">
            <div className="flex items-center justify-between text-xs font-mono-tag text-[var(--stone)]">
              <span>REGISTERED IN SECTOR</span>
              <span>
                {activeDivision.slug === 'studio'
                  ? `${serviceCount} CAPABILITIES`
                  : `${activeVentures.length} DEPLOYED`}
              </span>
            </div>

            {activeDivision.slug === 'studio' ? (
              <div className="space-y-2">
                {[
                  'Full-stack & web development',
                  'SaaS architecture & development',
                  'AI integrations & workflows',
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 border border-[var(--border-color)] bg-[var(--surface-card)] flex items-center justify-between text-xs"
                  >
                    <span className="font-mono-tag text-[10px] text-[var(--stone)]">
                      0{idx + 1}
                    </span>
                    <span className="font-medium text-[var(--text-primary)] text-right">
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {activeVentures.length > 0 ? (
                  activeVentures.map((v) => (
                    <Link
                      key={v.id}
                      href={`/${activeDivision.slug}/${v.slug}`}
                      className="group p-2.5 border border-[var(--border-color)] hover:border-[var(--signal)] bg-[var(--surface-card)] flex items-center justify-between text-xs transition-colors"
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <span className="font-medium text-[var(--text-primary)] group-hover:text-[var(--signal)] truncate">
                          {v.name}
                        </span>
                      </div>
                      <StatusTag status={v.status} size="sm" />
                    </Link>
                  ))
                ) : (
                  <div className="p-3 border border-dashed border-[var(--border-color)] text-xs text-[var(--stone)] font-mono-tag text-center">
                    PLOT UNASSIGNED // FUTURE VENTURE
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Panel Action Button */}
        <div className="pt-6 mt-6 hairline-border-t">
          <Link
            href={activeDivision.route}
            className="w-full py-3 px-4 bg-[var(--ink)] text-[var(--bone)] dark:bg-[var(--bone)] dark:text-[var(--ink)] hover:bg-[var(--signal)] hover:text-white dark:hover:bg-[var(--signal)] dark:hover:text-white font-mono-tag text-xs text-center flex items-center justify-center gap-2 transition-colors uppercase tracking-wider rounded-none"
          >
            <span>ENTER {activeDivision.name.toUpperCase()} (/{activeDivision.slug})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
