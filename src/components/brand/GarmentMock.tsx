import React from 'react';
import Image from 'next/image';
import { GarmentSilhouette, GarmentColorway, GarmentView, PrintDefinition } from '@/data/types';
import { GarmentSilhouettes } from './GarmentSilhouettes';
import { GarmentPrints } from './GarmentPrints';

export interface GarmentMockProps {
  silhouette: GarmentSilhouette;
  colorway: GarmentColorway;
  view?: GarmentView;
  print: PrintDefinition;
  className?: string;
  realImage?: string;
  aspectRatio?: '4/5' | '3/4' | '1/1';
  showCaption?: boolean;
  alt?: string;
}

/**
 * Calculates tonal seam, rib, and print ink contrast based on garment hex.
 */
function getGarmentPalette(hex: string) {
  // Normalize hex
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  
  // Perceived luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const isDark = luminance < 0.45;

  if (isDark) {
    return {
      garmentColor: hex,
      seamColor: 'rgba(255, 255, 255, 0.16)',
      ribColor: 'rgba(255, 255, 255, 0.08)',
      inkColor: '#F5F2EB', // Bone white ink on dark fabric
      shadowColor: 'rgba(0, 0, 0, 0.45)',
    };
  }

  return {
    garmentColor: hex,
    seamColor: 'rgba(0, 0, 0, 0.14)',
    ribColor: 'rgba(0, 0, 0, 0.07)',
    inkColor: '#151618', // Deep mineral ink on light fabric
    shadowColor: 'rgba(0, 0, 0, 0.09)',
  };
}

/**
 * Maps the requested view to an appropriate SVG viewBox crop.
 */
function getViewBox(view: GarmentView, printType: PrintDefinition['type']): string {
  switch (view) {
    case 'detail-rib':
      return '190 120 220 120'; // Macro on collar ribbing & neck label
    case 'detail-print':
      if (printType === 'coordinates') return '180 220 240 260';
      if (printType === 'blueprint') return '170 210 260 250';
      if (printType === 'index') return '220 230 160 160';
      return '250 180 100 240'; // Axis
    case 'detail-hem':
      return '170 480 260 120'; // Macro on hemline stitch
    case 'back':
    case 'front':
    default:
      return '0 0 600 750'; // Full flat-lay composition
  }
}

/**
 * Reusable <GarmentMock /> component.
 * Generates tactile, high-craft flat-lay vector garment visuals in code.
 * Seamlessly swaps to next/image when photographic assets are provided.
 */
export function GarmentMock({
  silhouette,
  colorway,
  view = 'front',
  print,
  className = '',
  realImage,
  aspectRatio = '4/5',
  showCaption = false,
  alt,
}: GarmentMockProps) {
  const aspectClass =
    aspectRatio === '3/4'
      ? 'aspect-[3/4]'
      : aspectRatio === '1/1'
      ? 'aspect-square'
      : 'aspect-[4/5]';

  const defaultAlt = `${colorway.label} ${silhouette.replace(/-/g, ' ')}, ${view} view`;
  const imageAlt = alt || defaultAlt;

  // Real Photographic Asset Override
  if (realImage) {
    return (
      <div className={`relative w-full ${aspectClass} overflow-hidden bg-[var(--surface-card)] ${className}`}>
        <Image
          src={realImage}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-opacity duration-300"
        />
      </div>
    );
  }

  // Tasteful neutral placeholder for missing photography
  return (
    <div
      className={`relative w-full ${aspectClass} flex items-center justify-center bg-[#F8F7F4] dark:bg-[#0A0A0B] ${className}`}
      role="img"
      aria-label={imageAlt}
    >
      <span className="font-mono-tag text-[10px] text-[var(--stone)] uppercase tracking-wider">
        Image coming soon
      </span>
    </div>
  );
}

export default GarmentMock;
