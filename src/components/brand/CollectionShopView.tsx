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
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('featured');

  const silhouettes = [
    { id: 'all', label: 'All Cuts' },
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

  const sizes = [
    { id: 'all', label: 'All Sizes' },
    { id: 'XS', label: 'XS' },
    { id: 'S', label: 'S' },
    { id: 'M', label: 'M' },
    { id: 'L', label: 'L' },
    { id: 'XL', label: 'XL' },
    { id: 'XXL', label: 'XXL' },
  ];

  const availabilities = [
    { id: 'all', label: 'All Status' },
    { id: 'concept', label: 'Concept' },
    { id: 'sampling', label: 'Sampling' },
    { id: 'preorder', label: 'Pre-Order' },
    { id: 'available', label: 'Available' },
  ];

  const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchSilhouette = selectedSilhouette === 'all' || p.silhouette === selectedSilhouette;
    const matchColor = selectedColor === 'all' || p.colorways.some((c) => c.id === selectedColor);
    const matchSize = selectedSize === 'all' || p.sizes.includes(selectedSize as any);
    const matchAvailability = selectedAvailability === 'all' || p.availability === selectedAvailability;
    return matchSilhouette && matchColor && matchSize && matchAvailability;
  }).sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    return a.sortOrder - b.sortOrder;
  });

  return (
    <div className="space-y-12">
      {/* Quiet Minimal Filter Row */}
      <div className="flex flex-col gap-6 py-4 hairline-border-y font-mono-tag text-xs">
        
        {/* Filter Groups Row */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          
          {/* Silhouette */}
          <div className="flex items-center gap-2">
            <span className="text-[var(--stone)] uppercase tracking-wider">CUT:</span>
            <select 
              value={selectedSilhouette}
              onChange={(e) => setSelectedSilhouette(e.target.value)}
              className="bg-transparent text-[var(--text-primary)] border-none focus:ring-0 cursor-pointer uppercase outline-none"
            >
              {silhouettes.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>

          {/* Colorway */}
          <div className="flex items-center gap-2">
            <span className="text-[var(--stone)] uppercase tracking-wider">SHADE:</span>
            <select 
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="bg-transparent text-[var(--text-primary)] border-none focus:ring-0 cursor-pointer uppercase outline-none"
            >
              {colors.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>

          {/* Size */}
          <div className="flex items-center gap-2">
            <span className="text-[var(--stone)] uppercase tracking-wider">SIZE:</span>
            <select 
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="bg-transparent text-[var(--text-primary)] border-none focus:ring-0 cursor-pointer uppercase outline-none"
            >
              {sizes.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2">
            <span className="text-[var(--stone)] uppercase tracking-wider">STATUS:</span>
            <select 
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="bg-transparent text-[var(--text-primary)] border-none focus:ring-0 cursor-pointer uppercase outline-none"
            >
              {availabilities.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
            </select>
          </div>
          
        </div>

        {/* Sort Row */}
        <div className="flex items-center justify-between border-t border-[var(--line-subtle)] pt-4">
          <span className="text-[var(--stone)]">{filteredProducts.length} RESULTS</span>
          <div className="flex items-center gap-2">
            <span className="text-[var(--stone)] uppercase tracking-wider">SORT:</span>
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-transparent text-[var(--text-primary)] border-none focus:ring-0 cursor-pointer uppercase outline-none text-right"
            >
              {sortOptions.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
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
              setSelectedSize('all');
              setSelectedAvailability('all');
              setSortOption('featured');
            }}
            className="font-mono-tag text-xs text-[var(--signal)] underline uppercase"
          >
            RESET ALL FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 w-full">
          {filteredProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CollectionShopView;
