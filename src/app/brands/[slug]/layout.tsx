import React from 'react';
import { BrandSubNav } from '@/components/brand/BrandSubNav';
import { APPAREL_BRAND_SLUG } from '@/data/brands';

interface BrandLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function BrandLayout({ children, params }: BrandLayoutProps) {
  const { slug } = await params;

  return (
    <div className="w-full flex flex-col">
      {/* Brand Sub-Navigation Bar (Active only under apparel brand) */}
      {slug === APPAREL_BRAND_SLUG && <BrandSubNav brandSlug={slug} />}
      <main className="w-full">{children}</main>
    </div>
  );
}
