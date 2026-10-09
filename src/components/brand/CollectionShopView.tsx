'use client';

import React, { useState } from 'react';
import { ApparelProduct } from '@/data/types';
import { ProductCard } from './ProductCard';

interface CollectionShopViewProps {
  products: ApparelProduct[];
}

export function CollectionShopView({ products }: CollectionShopViewProps) {
  const [selectedSilhouette, setSelectedSilhouette] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');

  const silhouettes = [
    { id: 'all', label: 'All Silhouettes' },
    { id: 'oversized-tee', label: 'Oversized Tee' },
    { id: 'boxy-cropped-tee', label: 'Boxy Cropped' },
    { id: 'oversized-long-sleeve', label: 'Long Sleeve' },
    { id: 'oversized-sleeveless', label: 'Sleeveless' },
  ];

  const colors = [
    { id: 'all', label: 'All Shades' },
    { id: 'bone', label: 'Bone' },
    { id: 'ink', label: 'Ink' },
    { id: 'washed-grey', label: 'Washed Grey' },
    { id: 'sand', label: 'Sand' },
    { id: 'moss', label: 'Moss' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchSilhouette = selectedSilhouette === 'all' || p.silhouette === selectedSilhouette;
    const matchColor = selectedColor === 'all' || p.colorways.some((c) => c.id === selectedColor);
    return matchSilhouette && matchColor;
  });

  return (
    <div className="space-y-12">
      {/* Quiet Minimal Filter Row (No heavy sidebars) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 hairline-border-y font-mono-tag text-xs">
        {/* Silhouette filter buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <span className="text-[var(--stone)] uppercase tracking-wider mr-1">CUT:</span>
          {silhouettes.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedSilhouette(s.id)}
              className={`transition-colors uppercase tracking-wider py-1 px-2 ${
                selectedSilhouette === s.id
                  ? 'bg-[var(--text-primary)] text-[var(--bg-page)] font-semibold'
                  : 'text-[var(--muted-text)] hover:text-[var(--text-primary)]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Colorway filter buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-[var(--stone)] uppercase tracking-wider mr-1">SHADE:</span>
          {colors.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedColor(c.id)}
              className={`transition-colors uppercase tracking-wider py-1 px-2 ${
                selectedColor === c.id
                  ? 'bg-[var(--text-primary)] text-[var(--bg-page)] font-semibold'
                  : 'text-[var(--muted-text)] hover:text-[var(--text-primary)]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Modular Editorial Layout (Not a uniform 4-column box grid) */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-3">
          <p className="font-mono-tag text-sm text-[var(--muted-text)]">
            NO SILHOUETTES MATCHING SELECTED CRITERIA.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedSilhouette('all');
              setSelectedColor('all');
            }}
            className="font-mono-tag text-xs text-[var(--signal)] underline uppercase"
          >
            RESET ALL FILTERS
          </button>
        </div>
      ) : (
        <div className="space-y-16">
          {/* Row 1: Asymmetric 7 : 5 Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {filteredProducts[0] && (
              <div className="lg:col-span-7">
                <ProductCard product={filteredProducts[0]} priority={true} />
              </div>
            )}
            {filteredProducts[1] && (
              <div className="lg:col-span-5 lg:pt-16">
                <ProductCard product={filteredProducts[1]} />
              </div>
            )}
          </div>

          {/* Typographic Interstitial Between Rows */}
          <div className="py-8 sm:py-12 hairline-border-y border-[var(--border-color)]">
            <div className="max-w-4xl mx-auto text-center space-y-2">
              <span className="font-mono-tag text-[10px] text-[var(--signal)] block uppercase tracking-widest">
                SPECIFICATION PROTOCOL // Z-02
              </span>
              <p className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] italic">
                “Every seam and stitch rendered with architectural discipline. Printed when ordered.”
              </p>
              <span className="font-mono-tag text-[10px] text-[var(--stone)] block uppercase tracking-wider">
                100% COMBED ORGANIC COTTON · ZERO INVENTORY CARRYING COST
              </span>
            </div>
          </div>

          {/* Row 2: Alternating Asymmetric 5 : 7 Split */}
          {filteredProducts.length > 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              {filteredProducts[2] && (
                <div className="lg:col-span-5 lg:pt-12">
                  <ProductCard product={filteredProducts[2]} />
                </div>
              )}
              {filteredProducts[3] && (
                <div className="lg:col-span-7">
                  <ProductCard product={filteredProducts[3]} />
                </div>
              )}
            </div>
          )}

          {/* Additional rows if product catalog grows beyond 4 */}
          {filteredProducts.length > 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.slice(4).map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CollectionShopView;
