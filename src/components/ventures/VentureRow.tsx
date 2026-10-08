import React from 'react';
import Link from 'next/link';
import { AnyVenture } from '@/data/types';
import { StatusTag } from '@/components/ui/StatusTag';
import { ArrowRight } from 'lucide-react';

interface VentureRowProps {
  venture: AnyVenture;
  index: number;
}

export function VentureRow({ venture, index }: VentureRowProps) {
  const indexStr = String(index + 1).padStart(2, '0');
  const href = `/${venture.divisionSlug}/${venture.slug}`;

  return (
    <Link
      href={href}
      className="group block w-full py-5 sm:py-6 px-3 sm:px-4 hairline-border-b hover:bg-[var(--surface-elevated)] transition-colors"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">
        {/* Index & Division Code */}
        <div className="md:col-span-2 flex items-center gap-3">
          <span className="font-mono-tag text-xs text-[var(--stone)] group-hover:text-[var(--signal)]">
            {indexStr}
          </span>
          <span className="font-mono-tag text-[10px] px-2 py-0.5 border border-[var(--border-color)] bg-[var(--surface)] text-[var(--stone)]">
            {venture.division}
          </span>
        </div>

        {/* Venture Name & Tagline */}
        <div className="md:col-span-4">
          <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-[var(--text-primary)] group-hover:text-[var(--signal)] transition-colors truncate">
            {venture.name}
          </h3>
        </div>

        {/* One-Line Description */}
        <div className="md:col-span-4 text-xs sm:text-sm text-[var(--muted-text)] line-clamp-1">
          {venture.tagline}
        </div>

        {/* Status Tag & Arrow */}
        <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-3">
          <StatusTag status={venture.status} size="sm" />
          <ArrowRight
            className="w-4 h-4 text-[var(--stone)] group-hover:text-[var(--signal)] group-hover:translate-x-1 transition-all"
            strokeWidth={1.5}
          />
        </div>
      </div>
    </Link>
  );
}
