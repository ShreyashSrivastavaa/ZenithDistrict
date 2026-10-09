import React from 'react';
import { GarmentSilhouette, SizeChartEntry } from '@/data/types';

interface GarmentMeasureDiagramProps {
  silhouette: GarmentSilhouette;
  activeSizeData?: SizeChartEntry;
  className?: string;
}

export function GarmentMeasureDiagram({
  silhouette,
  activeSizeData,
  className = '',
}: GarmentMeasureDiagramProps) {
  return (
    <div
      data-silhouette={silhouette}
      className={`p-4 border border-[var(--border-color)] bg-[var(--surface-elevated)] space-y-3 ${className}`}
    >
      <div className="flex items-center justify-between font-mono-tag text-[10px] text-[var(--stone)]">
        <span>SPECIFICATION SCHEMATIC</span>
        <span>UNIT: CM (FLAT LAY)</span>
      </div>

      <div className="relative w-full aspect-[4/3] flex items-center justify-center">
        <svg
          viewBox="0 0 300 240"
          className="w-full h-full text-[var(--text-primary)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Garment Outline Blueprint */}
          <path
            d="M 115 45 Q 150 48 185 45 L 235 68 L 220 110 L 195 102 L 192 195 L 108 195 L 105 102 L 80 110 L 65 68 Z"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.3"
            strokeDasharray="4 2"
          />

          {/* Neck curve */}
          <path d="M 118 45 Q 150 62 182 45" stroke="currentColor" strokeWidth="1" opacity="0.4" />

          {/* Measure A: Chest Width */}
          <g stroke="var(--signal)" strokeWidth="1">
            <line x1="106" y1="115" x2="194" y2="115" />
            <line x1="106" y1="110" x2="106" y2="120" />
            <line x1="194" y1="110" x2="194" y2="120" />
          </g>
          <text
            x="150"
            y="110"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="7.5"
            fill="var(--signal)"
            textAnchor="middle"
            fontWeight="bold"
          >
            A: {activeSizeData ? `${activeSizeData.chestCm}cm` : 'CHEST'}
          </text>

          {/* Measure B: Body Length */}
          <g stroke="currentColor" strokeWidth="0.85" opacity="0.8">
            <line x1="150" y1="52" x2="150" y2="195" strokeDasharray="2 2" />
            <line x1="145" y1="52" x2="155" y2="52" />
            <line x1="145" y1="195" x2="155" y2="195" />
          </g>
          <text
            x="158"
            y="155"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="7"
            fill="var(--text-primary)"
            opacity="0.85"
          >
            B: {activeSizeData ? `${activeSizeData.lengthCm}cm` : 'LENGTH'}
          </text>

          {/* Measure C: Shoulder Width */}
          <g stroke="currentColor" strokeWidth="0.85" opacity="0.8">
            <line x1="102" y1="36" x2="198" y2="36" />
            <line x1="102" y1="32" x2="102" y2="40" />
            <line x1="198" y1="32" x2="198" y2="40" />
          </g>
          <text
            x="150"
            y="32"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="7"
            fill="var(--text-primary)"
            textAnchor="middle"
            opacity="0.85"
          >
            C: {activeSizeData ? `${activeSizeData.shoulderCm}cm` : 'SHOULDER'}
          </text>
        </svg>
      </div>

      {activeSizeData && (
        <div className="grid grid-cols-3 gap-2 text-center pt-2 hairline-border-t font-mono-tag text-[11px]">
          <div>
            <span className="text-[var(--stone)] block text-[9px]">A · CHEST</span>
            <span className="font-semibold tabular-nums">{activeSizeData.chestCm} cm</span>
          </div>
          <div>
            <span className="text-[var(--stone)] block text-[9px]">B · LENGTH</span>
            <span className="font-semibold tabular-nums">{activeSizeData.lengthCm} cm</span>
          </div>
          <div>
            <span className="text-[var(--stone)] block text-[9px]">C · SHOULDER</span>
            <span className="font-semibold tabular-nums">{activeSizeData.shoulderCm} cm</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default GarmentMeasureDiagram;
