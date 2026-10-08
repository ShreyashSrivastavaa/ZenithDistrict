import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface LinkArrowProps {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
  className?: string;
}

export function LinkArrow({
  href,
  children,
  isExternal = false,
  className = '',
}: LinkArrowProps) {
  const content = (
    <span
      className={`group inline-flex items-center gap-2 font-mono-tag text-xs tracking-wider uppercase text-[var(--text-primary)] hover:text-[var(--signal)] transition-colors ${className}`}
    >
      <span>{children}</span>
      {isExternal ? (
        <ArrowUpRight
          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[var(--signal)]"
          strokeWidth={1.5}
        />
      ) : (
        <ArrowRight
          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[var(--signal)]"
          strokeWidth={1.5}
        />
      )}
    </span>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
}
