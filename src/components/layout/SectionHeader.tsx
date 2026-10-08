import React from 'react';

interface SectionHeaderProps {
  index: string;
  title: string;
  code?: string;
  caption?: string;
  className?: string;
}

export function SectionHeader({
  index,
  title,
  code,
  caption,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`w-full hairline-border-b pb-5 mb-12 md:mb-16 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono-tag text-[var(--signal)] font-semibold">
            {index}
          </span>
          <span className="font-mono-tag text-[var(--stone)] select-none">/</span>
          <h2 className="text-xl md:text-2xl font-medium tracking-tight uppercase font-display text-[var(--text-primary)]">
            {title}
          </h2>
          {code && (
            <span className="ml-2 font-mono-tag px-2 py-0.5 border border-[var(--border-color)] text-[var(--muted-text)] bg-[var(--surface-elevated)]">
              {code}
            </span>
          )}
        </div>
        {caption && (
          <p className="font-mono-tag text-[var(--muted-text)] text-xs md:text-right max-w-md">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}
