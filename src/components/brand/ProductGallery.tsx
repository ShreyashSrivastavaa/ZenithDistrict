'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ApparelProduct, GarmentColorway, GarmentView } from '@/data/types';
import { GarmentMock } from './GarmentMock';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setActiveIndex((prev) => (prev + 1) % views.length);
      if (e.key === 'ArrowLeft') setActiveIndex((prev) => (prev - 1 + views.length) % views.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, views.length]);

  // Focus trap for lightbox
  useEffect(() => {
    if (lightboxOpen && lightboxRef.current) {
      lightboxRef.current.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  // Reset active index when colorway changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeColorway.id]);

  // Touch swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) setActiveIndex((prev) => (prev + 1) % views.length);
    if (isRightSwipe) setActiveIndex((prev) => (prev - 1 + views.length) % views.length);
  };

  const activeItem = views[activeIndex];
  const realImg = product.realImages?.[activeColorway.id]?.[activeItem.view];

  return (
    <div className="flex flex-col space-y-4 select-none">
      {/* Large Primary Image */}
      <button 
        type="button"
        onClick={() => setLightboxOpen(true)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-full relative cursor-zoom-in bg-[var(--surface-paper-white)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)]"
        aria-label={`Open zoom view of ${activeItem.label}`}
      >
        <GarmentMock
          silhouette={product.silhouette}
          colorway={activeColorway}
          view={activeItem.view}
          print={product.print}
          aspectRatio="4/5"
          realImage={realImg}
          showCaption={false}
          alt={`${product.name} in ${activeColorway.label} — ${activeItem.label}`}
        />
        <div className="absolute top-3 right-3 font-mono-tag text-[9px] text-[var(--stone)] uppercase tracking-wider pointer-events-none">
          0{activeIndex + 1} {'//'} {activeItem.view.toUpperCase()}
        </div>
      </button>

      {/* Thumbnail Rail */}
      <div 
        className="flex space-x-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
        role="tablist"
        aria-label="Product gallery thumbnails"
      >
        {views.map((item, idx) => {
          const thumbImg = product.realImages?.[activeColorway.id]?.[item.view];
          const isActive = idx === activeIndex;
          
          return (
            <button
              key={item.view}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(idx)}
              className={`flex-shrink-0 snap-center relative w-16 h-20 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)] ${isActive ? 'opacity-100 ring-1 ring-[var(--border-color)]' : 'opacity-50 hover:opacity-100'}`}
              aria-label={`View ${item.label}`}
            >
              <GarmentMock
                silhouette={product.silhouette}
                colorway={activeColorway}
                view={item.view}
                print={product.print}
                aspectRatio="4/5"
                realImage={thumbImg}
                showCaption={false}
                alt={`Thumbnail of ${item.label}`}
              />
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          ref={lightboxRef}
          tabIndex={-1}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-page)]/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image zoom lightbox"
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 text-[var(--text-primary)] hover:text-[var(--signal)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)]"
            aria-label="Close zoom view"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Prev Button */}
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + views.length) % views.length)}
            className="absolute left-4 p-4 text-[var(--text-primary)] hover:text-[var(--signal)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)]"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Next Button */}
          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % views.length)}
            className="absolute right-4 p-4 text-[var(--text-primary)] hover:text-[var(--signal)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)]"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Zoomed Image */}
          <div 
            className="relative w-full max-w-4xl max-h-[85vh] flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
             <GarmentMock
              silhouette={product.silhouette}
              colorway={activeColorway}
              view={activeItem.view}
              print={product.print}
              aspectRatio="4/5"
              realImage={realImg}
              showCaption={false}
              className="max-h-[85vh] object-contain"
              alt={`${product.name} in ${activeColorway.label} — ${activeItem.label}`}
            />
          </div>

          <div className="absolute bottom-8 font-mono-tag text-[10px] text-[var(--stone)] uppercase tracking-wider pointer-events-none">
            {activeIndex + 1} / {views.length} {'//'} {activeItem.view.replace('-', ' ')}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
