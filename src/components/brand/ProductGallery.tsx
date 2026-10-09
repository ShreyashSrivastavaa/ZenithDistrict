'use client';

import React from 'react';
import { ApparelProduct, GarmentColorway, GarmentView } from '@/data/types';
import { GarmentMock } from './GarmentMock';

interface ProductGalleryProps {
  product: ApparelProduct;
  activeColorway: GarmentColorway;
}

export function ProductGallery({ product, activeColorway }: ProductGalleryProps) {
  const views: { view: GarmentView; label: string; aspect: '4/5' | '3/4' }[] = [
    { view: 'front', label: 'Front Silhouette', aspect: '4/5' },
    { view: 'back', label: 'Back Construction & Vector Print', aspect: '4/5' },
    { view: 'detail-rib', label: 'Collar Ribbing & Woven Tag', aspect: '3/4' },
    { view: 'detail-print', label: 'Print Texture & Hairline Detail', aspect: '3/4' },
    { view: 'detail-hem', label: 'Hem Seam & Stitching', aspect: '3/4' },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {views.map((item, idx) => {
        const realImg = product.realImages?.[activeColorway.id]?.[item.view];

        return (
          <div
            key={item.view}
            className="group relative bg-[#F8F7F4] dark:bg-[#0A0A0B] overflow-hidden"
          >
            <GarmentMock
              silhouette={product.silhouette}
              colorway={activeColorway}
              view={item.view}
              print={product.print}
              aspectRatio={item.aspect}
              realImage={realImg}
              showCaption={true}
              alt={`${product.name} in ${activeColorway.label} — ${item.label}`}
            />

            {/* View index mark */}
            <div className="absolute top-3 right-3 font-mono-tag text-[9px] text-[var(--stone)] uppercase tracking-wider pointer-events-none">
              0{idx + 1} {'//'} {item.view.toUpperCase()}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductGallery;
