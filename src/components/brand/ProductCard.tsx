'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ApparelProduct, GarmentColorway } from '@/data/types';
import { GarmentMock } from './GarmentMock';
import { commerceAdapter } from '@/lib/commerce';
import { APPAREL_BRAND_SLUG } from '@/data/brands';

interface ProductCardProps {
  product: ApparelProduct;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [selectedColorway, setSelectedColorway] = useState<GarmentColorway>(product.colorways[0]);
  const [isHovered, setIsHovered] = useState(false);

  const formattedPrice = commerceAdapter.formatPrice(product.price, product.currency);
  const productHref = `/brands/${APPAREL_BRAND_SLUG}/shop/${product.slug}?color=${selectedColorway.id}`;

  return (
    <div data-priority={priority ? 'true' : undefined} className="group flex flex-col w-full h-full relative">
      {/* Caption ABOVE image, overlaid slightly if needed or just block */}
      <div className="absolute top-0 left-0 w-full z-10 pt-[30px] px-2 md:px-[10px] pointer-events-none">
        <h2 className="font-mono-tag text-[10px] uppercase text-[var(--ink)] tracking-[0.033em] leading-tight">
          {product.name}
        </h2>
      </div>

      {/* Product Image Stage (Full Bleed, 4:5 Aspect Ratio) with Pointer Hover Crossfade */}
      <Link
        href={productHref}
        className="relative block w-full overflow-hidden bg-[var(--surface-paper-white)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`${product.name}`}
      >
        {/* Primary View: Front */}
        <div
          className={`transition-opacity duration-300 ease-out ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <GarmentMock
            silhouette={product.silhouette}
            colorway={selectedColorway}
            view="front"
            print={product.print}
            aspectRatio="4/5"
            alt={`${product.name} in ${selectedColorway.label}, front view`}
          />
        </div>

        {/* Secondary View: Back (Fades in on pointer hover) */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ease-out pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <GarmentMock
            silhouette={product.silhouette}
            colorway={selectedColorway}
            view="back"
            print={product.print}
            aspectRatio="4/5"
            alt={`${product.name} in ${selectedColorway.label}, back view`}
          />
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
