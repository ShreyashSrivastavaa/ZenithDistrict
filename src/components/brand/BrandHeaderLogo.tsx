import React from 'react';
import Link from 'next/link';
import { LogoMark } from './LogoMark';
import { Wordmark } from './Wordmark';

interface BrandHeaderLogoProps {
  withTagline?: boolean;
}

export function BrandHeaderLogo({ withTagline = false }: BrandHeaderLogoProps) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)] rounded-sm"
      aria-label="ZenithDistrict — Home"
    >
      <div className="relative flex items-center justify-center p-1 rounded transition-transform group-hover:scale-[1.03]">
        <LogoMark size={28} variant="gradient" />
      </div>
      <Wordmark withTagline={withTagline} />
    </Link>
  );
}
