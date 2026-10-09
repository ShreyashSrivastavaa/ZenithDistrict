'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ApparelProduct, GarmentColorway, ApparelSize } from '@/data/types';
import { commerceAdapter } from '@/lib/commerce';
import { GarmentMeasureDiagram } from './GarmentMeasureDiagram';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { BrandWaitlistForm } from './BrandWaitlistForm';

interface ProductInteractiveDetailsProps {
  product: ApparelProduct;
  onColorwayChange?: (colorway: GarmentColorway) => void;
}

export function ProductInteractiveDetails({
  product,
  onColorwayChange,
}: ProductInteractiveDetailsProps) {
  const searchParams = useSearchParams();

  // Colorway state synced with URL query
  const queryColor = searchParams.get('color');
  const [selectedColorId, setSelectedColorId] = useState<string>(
    () => queryColor || product.colorways[0].id
  );
  
  const activeColorId = queryColor || selectedColorId;
  const activeColorway =
    product.colorways.find((c) => c.id === activeColorId) || product.colorways[0];

  const [selectedSize, setSelectedSize] = useState<ApparelSize>('M');
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  useEffect(() => {
    onColorwayChange?.(activeColorway);
  }, [activeColorway, onColorwayChange]);

  function handleColorSelect(cw: GarmentColorway) {
    setSelectedColorId(cw.id);
    onColorwayChange?.(cw);
    // Non-reloading query update
    const url = new URL(window.location.href);
    url.searchParams.set('color', cw.id);
    window.history.replaceState({}, '', url.toString());
  }

  const formattedPrice = commerceAdapter.formatPrice(product.price, product.currency);
  const actions = commerceAdapter.getProductActions(product, {
    colorway: activeColorway.id,
    size: selectedSize,
  });
  const primaryAction = actions[0];

  const activeSizeData = product.sizeChart.find((sc) => sc.size === selectedSize) || product.sizeChart[0];

  function toggleAccordion(id: string) {
    setOpenAccordion((prev) => (prev === id ? null : id));
  }

  return (
    <div className="space-y-8">
      {/* 1. Header Spec & Tabular Price */}
      <div className="space-y-2 pb-6 hairline-border-b">
        <div className="flex items-center justify-between font-mono-tag text-xs text-[var(--stone)]">
          <span>SPEC: {product.code}</span>
          <span className="uppercase text-[var(--signal)]">
            [{product.availability.toUpperCase()}]
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[var(--text-primary)]">
          {product.name}
        </h1>

        <div className="flex items-baseline justify-between pt-1">
          <span className="font-mono-tag text-xl font-semibold text-[var(--text-primary)] tabular-nums">
            {formattedPrice}
          </span>
          <span className="font-mono-tag text-[11px] text-[var(--stone)]">
            TAX INCL. // MADE TO ORDER
          </span>
        </div>
      </div>

      {/* 2. Colorway Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono-tag text-xs">
          <span className="text-[var(--stone)]">SHADE / COLORWAY</span>
          <span className="text-[var(--text-primary)] font-semibold uppercase">
            {activeColorway.label}
          </span>
        </div>

        <div className="flex items-center gap-3" role="radiogroup" aria-label="Colorway selection">
          {product.colorways.map((cw) => {
            const isSelected = cw.id === activeColorway.id;
            return (
              <button
                key={cw.id}
                type="button"
                onClick={() => handleColorSelect(cw)}
                role="radio"
                aria-checked={isSelected}
                className={`relative w-8 h-8 rounded-full border transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)] ${
                  isSelected
                    ? 'border-[var(--text-primary)] scale-105 ring-2 ring-[var(--text-primary)]'
                    : 'border-[var(--border-color)] opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: cw.hex }}
                aria-label={`Select ${cw.label}`}
              >
                {isSelected && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      cw.id === 'bone' || cw.id === 'sand' ? 'bg-[#151618]' : 'bg-[#F5F2EB]'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Size Selector (Square Mono Buttons with 44px Touch Target) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono-tag text-xs">
          <span className="text-[var(--stone)]">SELECT SIZE</span>
          <span className="text-[var(--stone)]">
            CHEST: {activeSizeData.chestCm}CM · LEN: {activeSizeData.lengthCm}CM
          </span>
        </div>

        <div className="grid grid-cols-6 gap-2" role="radiogroup" aria-label="Size selection">
          {product.sizes.map((s) => {
            const isSelected = selectedSize === s;
            const isDisabled = product.disabledSizes?.includes(s);

            return (
              <button
                key={s}
                type="button"
                disabled={isDisabled}
                onClick={() => setSelectedSize(s)}
                role="radio"
                aria-checked={isSelected}
                aria-disabled={isDisabled}
                className={`h-11 min-h-[44px] flex items-center justify-center font-mono-tag text-xs font-semibold border transition-all rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)] relative ${
                  isSelected
                    ? 'bg-[var(--text-primary)] text-[var(--bg-page)] border-[var(--text-primary)]'
                    : isDisabled
                    ? 'border-[var(--border-color)] text-[var(--stone)] opacity-40 cursor-not-allowed bg-transparent'
                    : 'border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] hover:border-[var(--signal)]'
                }`}
              >
                <span>{s}</span>
                {isDisabled && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-full h-[1px] bg-[var(--stone)] rotate-45 transform pointer-events-none" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tailor Fit Note */}
        <p className="text-xs text-[var(--muted-text)] leading-relaxed pt-1">
          {product.fitNote}
        </p>
      </div>

      {/* 4. Primary Commerce Action */}
      <div className="space-y-3 pt-2">
        {primaryAction.type === 'waitlist' ? (
          <button
            type="button"
            onClick={() => setShowWaitlistModal(true)}
            className="w-full h-12 px-6 bg-[var(--text-primary)] text-[var(--bg-page)] hover:bg-[var(--signal)] hover:text-white font-mono-tag text-xs tracking-widest uppercase transition-colors rounded-none flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)]"
          >
            <span>{primaryAction.label}</span>
          </button>
        ) : primaryAction.external ? (
          <a
            href={primaryAction.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 px-6 bg-[var(--text-primary)] text-[var(--bg-page)] hover:bg-[var(--signal)] hover:text-white font-mono-tag text-xs tracking-widest uppercase transition-colors rounded-none flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)]"
          >
            <span>{primaryAction.label}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        ) : (
          <button
            type="button"
            disabled={primaryAction.disabled}
            className="w-full h-12 px-6 bg-[var(--surface-elevated)] border border-[var(--border-color)] text-[var(--muted-text)] font-mono-tag text-xs tracking-widest uppercase cursor-not-allowed rounded-none"
          >
            <span>{primaryAction.label}</span>
          </button>
        )}

        {primaryAction.secondaryText && (
          <p className="font-mono-tag text-[10px] text-[var(--stone)] text-center">
            {primaryAction.secondaryText}
          </p>
        )}
      </div>

      {/* Inline Waitlist Drawer / Modal Triggered on Demand */}
      {showWaitlistModal && (
        <div className="pt-2">
          <BrandWaitlistForm
            productSlug={product.slug}
            colorway={activeColorway.label}
            size={selectedSize}
            headline={`Join ${product.name} Registry`}
            caption={`We will notify you the moment this piece (${activeColorway.label}, Size ${selectedSize}) enters sampling.`}
          />
        </div>
      )}

      {/* 5. Detailed Tailor Accordions */}
      <div className="space-y-0 pt-4 hairline-border-t divide-y divide-[var(--border-color)]">
        {/* Accordion 1: Details */}
        <div className="py-3">
          <button
            type="button"
            onClick={() => toggleAccordion('details')}
            className="w-full flex items-center justify-between text-left font-mono-tag text-xs uppercase tracking-wider text-[var(--text-primary)] py-2 focus-visible:outline-none focus-visible:text-[var(--signal)]"
            aria-expanded={openAccordion === 'details'}
          >
            <span>01 // DETAILS & CONSTRUCTION</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                openAccordion === 'details' ? 'rotate-180 text-[var(--signal)]' : 'text-[var(--stone)]'
              }`}
            />
          </button>
          {openAccordion === 'details' && (
            <div className="pt-3 pb-2 text-xs text-[var(--muted-text)] space-y-2 leading-relaxed">
              <p>{product.description}</p>
              <ul className="space-y-1.5 list-disc pl-4 pt-1 font-mono-tag text-[11px]">
                {product.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Accordion 2: Fit & Measurements with SVG Blueprint */}
        <div className="py-3">
          <button
            type="button"
            onClick={() => toggleAccordion('fit')}
            className="w-full flex items-center justify-between text-left font-mono-tag text-xs uppercase tracking-wider text-[var(--text-primary)] py-2 focus-visible:outline-none focus-visible:text-[var(--signal)]"
            aria-expanded={openAccordion === 'fit'}
          >
            <span>02 // FIT & MEASUREMENTS</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                openAccordion === 'fit' ? 'rotate-180 text-[var(--signal)]' : 'text-[var(--stone)]'
              }`}
            />
          </button>
          {openAccordion === 'fit' && (
            <div className="pt-3 pb-2 space-y-4">
              <GarmentMeasureDiagram
                silhouette={product.silhouette}
                activeSizeData={activeSizeData}
              />
              <span className="font-mono-tag text-[9px] text-[var(--stone)] block">
                * TODO: confirm with supplier. Measurements represent flat garment dimensions with ±1.5cm standard tolerance.
              </span>
            </div>
          )}
        </div>

        {/* Accordion 3: Fabric & Care */}
        <div className="py-3">
          <button
            type="button"
            onClick={() => toggleAccordion('care')}
            className="w-full flex items-center justify-between text-left font-mono-tag text-xs uppercase tracking-wider text-[var(--text-primary)] py-2 focus-visible:outline-none focus-visible:text-[var(--signal)]"
            aria-expanded={openAccordion === 'care'}
          >
            <span>03 // FABRIC & LAUNDERING</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                openAccordion === 'care' ? 'rotate-180 text-[var(--signal)]' : 'text-[var(--stone)]'
              }`}
            />
          </button>
          {openAccordion === 'care' && (
            <div className="pt-3 pb-2 text-xs text-[var(--muted-text)] space-y-2 font-mono-tag">
              <p>
                COMPOSITION: {product.fabric.composition} ({product.fabric.gsm} GSM)
                {product.fabric.unconfirmed && ' [TODO: confirm with supplier]'}
              </p>
              <p>WEAVE: {product.fabric.weave}</p>
              <ul className="space-y-1 list-disc pl-4 pt-1 text-[11px]">
                {product.care.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Accordion 4: Production & Shipping (Honest POD Disclosure) */}
        <div className="py-3">
          <button
            type="button"
            onClick={() => toggleAccordion('shipping')}
            className="w-full flex items-center justify-between text-left font-mono-tag text-xs uppercase tracking-wider text-[var(--text-primary)] py-2 focus-visible:outline-none focus-visible:text-[var(--signal)]"
            aria-expanded={openAccordion === 'shipping'}
          >
            <span>04 // PRODUCTION & SHIPPING (PRINT ON DEMAND)</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                openAccordion === 'shipping' ? 'rotate-180 text-[var(--signal)]' : 'text-[var(--stone)]'
              }`}
            />
          </button>
          {openAccordion === 'shipping' && (
            <div className="pt-3 pb-2 text-xs text-[var(--muted-text)] space-y-2 leading-relaxed">
              <p className="font-semibold text-[var(--text-primary)]">
                Zero Speculative Warehouse Inventory.
              </p>
              <p>
                Each piece is printed strictly on demand once ordered. Production typically takes 4–7 business days prior to dispatch.
                <span className="font-mono-tag text-[10px] text-[var(--stone)] block mt-1">
                  {'// TODO: confirm with supplier (exact logistics window per region)'}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Accordion 5: Returns & Exchange */}
        <div className="py-3">
          <button
            type="button"
            onClick={() => toggleAccordion('returns')}
            className="w-full flex items-center justify-between text-left font-mono-tag text-xs uppercase tracking-wider text-[var(--text-primary)] py-2 focus-visible:outline-none focus-visible:text-[var(--signal)]"
            aria-expanded={openAccordion === 'returns'}
          >
            <span>05 {'//'} RETURNS & QUALITY GUARANTEE</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                openAccordion === 'returns' ? 'rotate-180 text-[var(--signal)]' : 'text-[var(--stone)]'
              }`}
            />
          </button>
          {openAccordion === 'returns' && (
            <div className="pt-3 pb-2 text-xs text-[var(--muted-text)] space-y-2 leading-relaxed">
              <p>
                Because items are custom printed on demand, exchanges for fit are subject to supplier manufacturing policies. Defective prints or structural garment flaws are replaced unconditionally.
                <span className="font-mono-tag text-[10px] text-[var(--stone)] block mt-1">
                  {'// TODO: confirm with supplier (formal returns policy window)'}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductInteractiveDetails;
