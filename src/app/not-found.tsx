import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32 md:py-40 flex items-center justify-center">
      <Container>
        <div className="max-w-2xl mx-auto p-8 sm:p-12 border border-dashed border-[var(--border-color)] bg-[var(--surface-elevated)] space-y-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 font-mono-tag text-xs text-[var(--signal)]">
            <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
            <span>ERROR 404 // CADASTRE MISALIGNMENT</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
            This plot is unassigned.
          </h1>

          <p className="text-base text-[var(--muted-text)] leading-relaxed">
            The coordinates or venture URL you requested do not map to an active division, brand, product, or lab experiment in ZenithDistrict. The plot remains open for future development.
          </p>

          <div className="pt-4 hairline-border-t flex flex-wrap items-center justify-between gap-4 font-mono-tag text-xs">
            <Link
              href="/"
              className="px-5 py-3 bg-[var(--ink)] text-[var(--bone)] dark:bg-[var(--bone)] dark:text-[var(--ink)] hover:bg-[var(--signal)] hover:text-white uppercase tracking-wider transition-colors flex items-center gap-2 rounded-none"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO DISTRICT HOME</span>
            </Link>

            <Link
              href="/district"
              className="text-[var(--signal)] hover:underline flex items-center gap-1"
            >
              <span>INSPECT DISTRICT CADASTRE →</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
