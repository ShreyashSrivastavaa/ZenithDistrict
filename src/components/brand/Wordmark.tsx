import React from 'react';

interface WordmarkProps {
  className?: string;
  withTagline?: boolean;
  tagline?: string;
}

export function Wordmark({
  className = '',
  withTagline = false,
  tagline = 'WEAR YOUR WORLD',
}: WordmarkProps) {
  return (
    <div className={`flex flex-col select-none ${className}`}>
      <span className="font-semibold tracking-[0.18em] text-[1.05rem] uppercase leading-none font-display text-[var(--text-primary)]">
        ZENITH <span className="opacity-90 font-medium">DISTRICT</span>
      </span>
      {withTagline && (
        <span className="font-mono-tag text-[0.6rem] text-[var(--muted-text)] tracking-[0.25em] mt-1 uppercase">
          — {tagline} —
        </span>
      )}
    </div>
  );
}
