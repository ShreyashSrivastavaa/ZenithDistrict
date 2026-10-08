'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const subscribe = () => () => {};

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div
        className={`w-16 h-7 border border-[var(--border-color)] opacity-40 rounded-none ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`group flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono-tag tracking-[0.033em] border border-[var(--border-color)] hover:border-[var(--signal)] bg-[var(--surface-elevated)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--signal)] rounded-none ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Toggle theme (currently ${theme})`}
    >
      {isDark ? (
        <>
          <Sun className="w-3 h-3 text-[var(--signal)] transition-transform group-hover:rotate-45" />
          <span className="text-[var(--text-primary)]">LIGHT</span>
        </>
      ) : (
        <>
          <Moon className="w-3 h-3 text-[var(--signal)] transition-transform group-hover:-rotate-12" />
          <span className="text-[var(--text-primary)]">DARK</span>
        </>
      )}
    </button>
  );
}
