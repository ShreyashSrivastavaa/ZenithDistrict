import React from 'react';
import Link from 'next/link';
import { AnyVenture } from '@/data/types';
import { StatusTag } from '@/components/ui/StatusTag';
import { Tag } from '@/components/ui/Tag';
import { ArrowUpRight } from 'lucide-react';

interface VentureCardProps {
  venture: AnyVenture;
  isPlaceholder?: boolean;
}

export function VentureCard({
  venture,
  isPlaceholder = false,
}: VentureCardProps) {
  if (isPlaceholder) {
    return (
      <div className="border border-dashed border-[var(--border-color)] bg-[var(--surface-elevated)]/40 p-6 flex flex-col justify-between min-h-[300px] select-none">
        <div className="flex items-center justify-between">
          <span className="font-mono-tag text-xs text-[var(--stone)]">
            PLOT UNASSIGNED
          </span>
          <span className="font-mono-tag text-[10px] text-[var(--stone)]">
            RESERVED
          </span>
        </div>
        <div className="text-center py-8">
          <span className="font-mono-tag text-3xl font-light text-[var(--stone)]/40 block mb-2">
            [+]
          </span>
          <p className="font-mono-tag text-xs text-[var(--stone)]">
            FUTURE CONSUMER VENTURE
          </p>
          <p className="text-[11px] text-[var(--muted-text)] mt-1">
            Sector earmarked for next brand incubation.
          </p>
        </div>
        <div className="font-mono-tag text-[10px] text-[var(--stone)] pt-4 hairline-border-t">
          {"// STATUS: DORMANT"}
        </div>
      </div>
    );
  }

  const firstLetter = venture.name.charAt(0);
  const href = `/${venture.divisionSlug}/${venture.slug}`;

  return (
    <Link
      href={href}
      className="group border border-[var(--border-color)] hover:border-[var(--signal)] bg-[var(--surface)] hover:bg-[var(--surface-card)] transition-all duration-200 p-6 flex flex-col justify-between min-h-[320px] rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)]"
    >
      {/* Top Bar: Division Code + Status Tag */}
      <div>
        <div className="flex items-center justify-between pb-4 hairline-border-b">
          <div className="flex items-center gap-2">
            <span className="font-mono-tag text-[10px] px-2 py-0.5 border border-[var(--border-color)] bg-[var(--surface-elevated)] text-[var(--stone)]">
              {venture.division}
            </span>
            <span className="font-mono-tag text-[10px] text-[var(--stone)]">
              {venture.tags[0]}
            </span>
          </div>
          <StatusTag status={venture.status} size="sm" />
        </div>

        {/* Big Letterform Typographic Mark */}
        <div className="relative py-6 flex items-center justify-between">
          <span className="font-display text-5xl sm:text-6xl font-light text-[var(--text-primary)] opacity-20 group-hover:opacity-100 group-hover:text-[var(--signal)] transition-all select-none">
            {firstLetter}
          </span>
          <ArrowUpRight
            className="w-5 h-5 text-[var(--stone)] group-hover:text-[var(--signal)] transition-colors"
            strokeWidth={1.5}
          />
        </div>

        {/* Venture Title & Tagline */}
        <div className="space-y-1.5">
          <h3 className="font-display text-2xl font-normal text-[var(--text-primary)] group-hover:text-[var(--signal)] transition-colors tracking-tight">
            {venture.name}
          </h3>
          <p className="text-xs text-[var(--muted-text)] line-clamp-2 leading-relaxed">
            {venture.tagline}
          </p>
        </div>
      </div>

      {/* Card Footer: Tags */}
      <div className="pt-4 mt-6 hairline-border-t flex flex-wrap gap-1.5">
        {venture.tags.slice(0, 3).map((tag) => (
          <Tag key={tag} size="sm">
            {tag}
          </Tag>
        ))}
      </div>
    </Link>
  );
}
