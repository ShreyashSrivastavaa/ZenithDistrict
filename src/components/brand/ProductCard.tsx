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
    <div data-priority={priority ? 'true' : undefined} className="group flex flex-col space-y-4">
      {/* Product Image Stage (4:5 Aspect Ratio) with Pointer Hover Crossfade */}
      <Link
        href={productHref}
        className="relative block w-full overflow-hidden bg-[#F8F7F4] dark:bg-[#0A0A0B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`${product.name} — ${selectedColorway.label} — ${formattedPrice}`}
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

        {/* Quiet Concept Availability Indicator */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <span className="font-mono-tag text-[9px] text-[var(--stone)] tracking-widest uppercase">
            [{product.availability.toUpperCase()}]
          </span>
        </div>
      </Link>

      {/* Product Information Strip */}
      <div className="space-y-2">
        {/* Top: Code & Tabular Price */}
        <div className="flex items-center justify-between font-mono-tag text-xs">
          <span className="text-[var(--stone)] tracking-wider">
            {product.code}
          </span>
          <span className="font-semibold text-[var(--text-primary)] tabular-nums">
            {formattedPrice}
          </span>
        </div>

        {/* Middle: Title */}
        <Link
          href={productHref}
          className="block font-medium text-base text-[var(--text-primary)] hover:text-[var(--signal)] transition-colors leading-snug tracking-tight"
        >
          {product.name}
        </Link>

        {/* Bottom: Colorway Swatches */}
        <div
          className="flex items-center gap-2 pt-1"
          role="radiogroup"
          aria-label={`Available colorways for ${product.name}`}
        >
          {product.colorways.map((cw) => {
            const isSelected = selectedColorway.id === cw.id;
            return (
              <button
                key={cw.id}
                type="button"
                onClick={() => setSelectedColorway(cw)}
                className={`relative w-4 h-4 rounded-full border transition-all ${
                  isSelected
                    ? 'border-[var(--text-primary)] scale-110 ring-1 ring-[var(--text-primary)]'
                    : 'border-[var(--border-color)] opacity-75 hover:opacity-100'
                }`}
                style={{ backgroundColor: cw.hex }}
                aria-label={`Select ${cw.label}`}
                aria-checked={isSelected}
                role="radio"
              />
            );
          })}
          <span className="text-[11px] font-mono-tag text-[var(--stone)] ml-1">
            {selectedColorway.label}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
