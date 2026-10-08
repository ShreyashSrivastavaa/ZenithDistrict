'use client';

import React, { useState } from 'react';
import { ProductVenture } from '@/data/types';
import { VentureCard } from '@/components/ventures/VentureCard';
import { STATUS_ORDER } from '@/data/status';

interface ProductsFilterViewProps {
  products: ProductVenture[];
}

export function ProductsFilterView({ products }: ProductsFilterViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const categories = [
    'all',
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (selectedStatus !== 'all' && p.status !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Filters Bar */}
      <div className="p-4 border border-[var(--border-color)] bg-[var(--surface-elevated)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono-tag text-[10px] text-[var(--stone)] mr-1">
            CATEGORY:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 font-mono-tag text-xs border rounded-none transition-colors ${
                selectedCategory === cat
                  ? 'border-[var(--signal)] bg-[var(--signal)]/10 text-[var(--signal)] font-medium'
                  : 'border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--stone)]'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="font-mono-tag text-[10px] text-[var(--stone)]">
            STATUS:
          </span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1 text-xs font-mono-tag bg-[var(--surface)] border border-[var(--border-color)] text-[var(--text-primary)]"
          >
            <option value="all">ALL STATUSES</option>
            {STATUS_ORDER.map((status) => (
              <option key={status} value={status}>
                {status.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <VentureCard key={product.id} venture={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="p-12 text-center border border-dashed border-[var(--border-color)] font-mono-tag text-xs text-[var(--stone)]">
          NO SOFTWARE PRODUCTS MATCHED CURRENT FILTER CRITERIA
        </div>
      )}
    </div>
  );
}
