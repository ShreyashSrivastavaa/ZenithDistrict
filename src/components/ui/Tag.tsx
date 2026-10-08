import React from 'react';

interface TagProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

export function Tag({ children, className = '', size = 'md' }: TagProps) {
  return (
    <span
      className={`inline-block font-mono-tag border border-[var(--border-color)] bg-[var(--surface-elevated)] text-[var(--muted-text)] ${
        size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-[11px]'
      } ${className}`}
    >
      {children}
    </span>
  );
}
