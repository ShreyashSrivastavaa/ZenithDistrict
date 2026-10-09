'use client';

import React, { useState } from 'react';
import { ApparelProduct, GarmentColorway } from '@/data/types';
import { ProductGallery } from './ProductGallery';
import { ProductInteractiveDetails } from './ProductInteractiveDetails';
import { commerceAdapter } from '@/lib/commerce';

interface ProductClientViewProps {
  product: ApparelProduct;
  initialColorwayId?: string;
}

export function ProductClientView({
  product,
  initialColorwayId,
}: ProductClientViewProps) {
  const defaultCw =
    product.colorways.find((c) => c.id === initialColorwayId) || product.colorways[0];
  const [activeColorway, setActiveColorway] = useState<GarmentColorway>(defaultCw);

  const formattedPrice = commerceAdapter.formatPrice(product.price, product.currency);
  const actions = commerceAdapter.getProductActions(product, {
    colorway: activeColorway.id,
  });
  const primaryAction = actions[0];

  return (
    <div>
      {/* 2-Zone Layout: Left Gallery, Right Sticky Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left: Generous Scrolling Gallery (7 cols) */}
        <div className="lg:col-span-7">
          <ProductGallery product={product} activeColorway={activeColorway} />
        </div>

        {/* Right: Sticky Details & Specification Column (5 cols) */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-36 space-y-8">
            <ProductInteractiveDetails
              product={product}
              onColorwayChange={setActiveColorway}
            />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Action Bar (< 1024px) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-page)]/95 backdrop-blur-md hairline-border-t p-3 sm:p-4 flex items-center justify-between gap-4">
        <div>
          <span className="font-mono-tag text-[10px] text-[var(--stone)] block uppercase">
            {activeColorway.label} · {product.code}
          </span>
          <span className="font-mono-tag text-sm font-semibold text-[var(--text-primary)] tabular-nums">
            {formattedPrice}
          </span>
        </div>

        {primaryAction.type === 'waitlist' ? (
          <a
            href="#waitlist"
            className="h-11 px-5 bg-[var(--text-primary)] text-[var(--bg-page)] font-mono-tag text-xs tracking-wider uppercase flex items-center justify-center rounded-none hover:bg-[var(--signal)] hover:text-white transition-colors"
          >
            WAITLIST
          </a>
        ) : primaryAction.external ? (
          <a
            href={primaryAction.href}
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 px-5 bg-[var(--text-primary)] text-[var(--bg-page)] font-mono-tag text-xs tracking-wider uppercase flex items-center justify-center rounded-none hover:bg-[var(--signal)] hover:text-white transition-colors"
          >
            ORDER PIECE
          </a>
        ) : (
          <button
            disabled
            className="h-11 px-5 bg-[var(--surface-elevated)] border border-[var(--border-color)] text-[var(--muted-text)] font-mono-tag text-xs tracking-wider uppercase rounded-none cursor-not-allowed"
          >
            CONCEPT
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductClientView;
