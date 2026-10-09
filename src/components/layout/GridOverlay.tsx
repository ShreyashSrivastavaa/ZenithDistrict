'use client';

import React, { useEffect, useState } from 'react';
import { siteConfig } from '@/data/site';

export function GridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!siteConfig.flags.showGridDevToggle) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on 'G' or 'g' when not typing in form fields
      if (
        (e.key === 'g' || e.key === 'G') &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(
          (document.activeElement?.tagName || '')
        )
      ) {
        setVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1520px] mx-auto"
      aria-hidden="true"
    >
      <div className="w-full h-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-full border-x border-red-500/10 bg-red-500/[0.015] relative flex flex-col justify-between"
          >
            <span className="font-mono text-[9px] text-red-500/50 p-1">
              COL_{String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-mono text-[9px] text-red-500/50 p-1 text-right">
              {i + 1}
            </span>
          </div>
        ))}
      </div>
      <div className="fixed bottom-3 right-3 bg-[var(--surface-elevated)] border border-[var(--border-color)] px-2.5 py-1 text-[10px] font-mono-tag pointer-events-auto flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)]"></span>
        <span>ARCHITECTURAL GRID ACTIVE [PRESS &apos;G&apos; TO HIDE]</span>
      </div>
    </div>
  );
}
