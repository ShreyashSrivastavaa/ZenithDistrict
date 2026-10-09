'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { APPAREL_BRAND_NAME, APPAREL_BRAND_SLUG } from '@/data/brands';

interface BrandSubNavProps {
  brandSlug?: string;
}

export function BrandSubNav({ brandSlug = APPAREL_BRAND_SLUG }: BrandSubNavProps) {
  const pathname = usePathname();
  const basePath = `/brands/${brandSlug}`;

  // Only render on brand-specific sub-routes
  if (!pathname.startsWith(basePath)) {
    return null;
  }

  const navItems = [
    { label: 'Overview', href: basePath },
    { label: 'Shop', href: `${basePath}/shop` },
    { label: 'Story', href: `${basePath}/story` },
    { label: 'Size Guide', href: `${basePath}/size-guide` },
    { label: 'Waitlist', href: `${basePath}#waitlist` },
  ];

  return (
    <div className="hidden md:block w-full bg-[var(--bg-page)]/95 backdrop-blur-md hairline-border-b sticky top-16 md:top-20 z-40 transition-colors">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 h-11 flex items-center justify-between text-xs font-mono-tag">
        {/* Left: Brand Name / Identifier */}
        <Link
          href={basePath}
          className="flex items-center gap-2 text-[var(--text-primary)] hover:text-[var(--signal)] transition-colors uppercase tracking-[0.14em] font-medium"
        >
          <span className="text-[10px] text-[var(--stone)]">Z-02 //</span>
          <span>{APPAREL_BRAND_NAME}</span>
        </Link>

        {/* Right: Sub-navigation links */}
        <nav aria-label="Brand Navigation" className="flex items-center gap-5 sm:gap-7">
          {navItems.map((item) => {
            const isExact = pathname === item.href;
            const isNested = item.href !== basePath && pathname.startsWith(item.href) && !item.href.includes('#');
            const isActive = isExact || isNested;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative py-1 tracking-[0.06em] uppercase transition-colors hover:text-[var(--signal)] ${
                  isActive
                    ? 'text-[var(--signal)] font-semibold'
                    : 'text-[var(--muted-text)]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[var(--signal)]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default BrandSubNav;
