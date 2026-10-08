import React from 'react';

interface WordmarkProps {
  className?: string;
  withTagline?: boolean;
}

export function Wordmark({ className = '', withTagline = false }: WordmarkProps) {
  return (
    <div className={`flex flex-col select-none ${className}`}>
      <span className="font-semibold tracking-[0.16em] text-[1.05rem] uppercase leading-none font-display text-[var(--text-primary)]">
        ZENITH<span className="opacity-90 font-medium">DISTRICT</span>
      </span>
      {withTagline && (
        <span className="font-mono-tag text-[0.62rem] text-[var(--muted-text)] tracking-[0.2em] mt-1">
          BUILDING WHAT’S <span className="text-[var(--signal)] font-semibold">NEXT.</span>
        </span>
      )}
    </div>
  );
}
