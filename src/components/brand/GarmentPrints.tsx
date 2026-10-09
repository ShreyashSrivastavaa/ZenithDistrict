import React from 'react';
import { PrintDefinition, GarmentView } from '@/data/types';

interface GarmentPrintsProps {
  print: PrintDefinition;
  view: GarmentView;
  inkColor: string;
}

/**
 * Architectural vector graphics for Collection 01 garments.
 * Derived from cadastre site plans, dimension blueprint sections, and coordinate strings.
 */
export function GarmentPrints({ print, view, inkColor }: GarmentPrintsProps) {
  const opacity = 0.94;

  // 1. Coordinates (ZB-01)
  if (print.type === 'coordinates') {
    if (view === 'front') {
      // Left-chest coordinate string
      return (
        <g
          transform="translate(240, 260)"
          fill={inkColor}
          opacity={opacity}
          className="select-none pointer-events-none"
        >
          <text
            x="0"
            y="0"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="8.5"
            letterSpacing="0.1em"
            fontWeight="500"
          >
            {'28°36\'42"N 77°12\'18"E'}
          </text>
          <text
            x="0"
            y="12"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="7"
            letterSpacing="0.16em"
            opacity="0.85"
          >
            REF: ZB-01 // QUAD 04
          </text>
        </g>
      );
    }

    if (view === 'back') {
      // Large back hairline site plan cadastre drawing
      return (
        <g
          transform="translate(200, 240)"
          stroke={inkColor}
          strokeWidth="0.85"
          fill="none"
          opacity={opacity}
          className="select-none pointer-events-none"
        >
          {/* Outer Boundary Box */}
          <rect x="0" y="0" width="200" height="230" strokeWidth="1" />
          
          {/* Hairline Grid Dividers */}
          <line x1="0" y1="90" x2="200" y2="90" />
          <line x1="110" y1="0" x2="110" y2="230" />
          <line x1="0" y1="170" x2="110" y2="170" strokeDasharray="3 3" />
          <line x1="55" y1="90" x2="55" y2="230" strokeDasharray="2 2" />

          {/* Plot Labels */}
          <text
            x="8"
            y="20"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="7"
            letterSpacing="0.12em"
            fill={inkColor}
            stroke="none"
          >
            PLOT 01 // NORTH CORRIDOR
          </text>
          <text
            x="118"
            y="20"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="7"
            letterSpacing="0.12em"
            fill={inkColor}
            stroke="none"
          >
            PLOT 02 // ATELIER
          </text>
          <text
            x="8"
            y="110"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="7"
            letterSpacing="0.12em"
            fill={inkColor}
            stroke="none"
          >
            PLOT 03 // FABRIC
          </text>
          <text
            x="118"
            y="110"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="7"
            letterSpacing="0.12em"
            fill={inkColor}
            stroke="none"
          >
            PLOT 04 // VOID
          </text>

          {/* Center Cadastre Crosshair */}
          <circle cx="110" cy="90" r="14" strokeWidth="0.75" />
          <circle cx="110" cy="90" r="2" fill={inkColor} />
          <line x1="110" y1="70" x2="110" y2="110" strokeWidth="0.5" />
          <line x1="90" y1="90" x2="130" y2="90" strokeWidth="0.5" />

          {/* Dimension Annotations */}
          <text
            x="100"
            y="244"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="6.5"
            letterSpacing="0.16em"
            fill={inkColor}
            stroke="none"
            textAnchor="middle"
          >
            — 480mm SPAN // ZENITH DISTRICT —
          </text>
        </g>
      );
    }
  }

  // 2. Blueprint (ZB-02)
  if (print.type === 'blueprint') {
    if (view === 'front') {
      // Hemline section datum
      return (
        <g
          transform="translate(235, 480)"
          fill={inkColor}
          opacity={opacity}
          className="select-none pointer-events-none"
        >
          <line x1="0" y1="0" x2="70" y2="0" stroke={inkColor} strokeWidth="0.75" />
          <polygon points="0,0 8,-3 8,3" fill={inkColor} />
          <text
            x="14"
            y="-6"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="6.5"
            letterSpacing="0.14em"
          >
            SEC. 02-B // +0.00
          </text>
        </g>
      );
    }

    if (view === 'back') {
      // Technical section-line drawing with dimension annotations
      return (
        <g
          transform="translate(195, 235)"
          stroke={inkColor}
          strokeWidth="0.8"
          fill="none"
          opacity={opacity}
          className="select-none pointer-events-none"
        >
          {/* Header Mark */}
          <text
            x="105"
            y="-10"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="7"
            letterSpacing="0.16em"
            fill={inkColor}
            stroke="none"
            textAnchor="middle"
          >
            ELEVATION SECTION // 420mm × 640mm
          </text>

          {/* Section Geometry */}
          <path d="M 15 20 L 195 20 L 175 180 L 35 180 Z" strokeWidth="1" />
          <line x1="105" y1="20" x2="105" y2="180" strokeDasharray="4 2" />

          {/* Dimension Arrows */}
          <line x1="0" y1="20" x2="0" y2="180" strokeWidth="0.75" />
          <polygon points="0,20 -3,28 3,28" fill={inkColor} />
          <polygon points="0,180 -3,172 3,172" fill={inkColor} />
          <text
            x="-8"
            y="105"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="6"
            letterSpacing="0.1em"
            fill={inkColor}
            stroke="none"
            transform="rotate(-90, -8, 105)"
            textAnchor="middle"
          >
            640mm
          </text>

          {/* Hatching Lines */}
          <line x1="45" y1="40" x2="85" y2="80" strokeWidth="0.5" strokeDasharray="1 3" />
          <line x1="55" y1="40" x2="95" y2="80" strokeWidth="0.5" strokeDasharray="1 3" />
          <line x1="65" y1="40" x2="105" y2="80" strokeWidth="0.5" strokeDasharray="1 3" />

          {/* Bottom Spec String */}
          <text
            x="105"
            y="200"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="6"
            letterSpacing="0.12em"
            fill={inkColor}
            stroke="none"
            textAnchor="middle"
          >
            TOLERANCE ±2mm // COMPACT JERSEY 260 GSM
          </text>
        </g>
      );
    }
  }

  // 3. Index (ZB-03)
  if (print.type === 'index') {
    if (view === 'front') {
      // Chest tonal register
      return (
        <g
          transform="translate(290, 275)"
          fill={inkColor}
          opacity={opacity}
          className="select-none pointer-events-none"
        >
          <text
            x="0"
            y="0"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="8"
            letterSpacing="0.18em"
            fontWeight="500"
          >
            INDX // 03
          </text>
          <rect x="0" y="4" width="36" height="1.5" fill={inkColor} opacity="0.6" />
        </g>
      );
    }

    if (view === 'back') {
      // Vertical index list down the left sleeve
      return (
        <g
          transform="translate(100, 300) rotate(-55)"
          fill={inkColor}
          opacity={opacity}
          className="select-none pointer-events-none"
        >
          <text
            x="0"
            y="0"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="6.5"
            letterSpacing="0.16em"
          >
            01 DISTRICT · 02 ATELIER · 03 SYSTEM · 04 FABRIC · 05 VOID
          </text>
        </g>
      );
    }
  }

  // 4. Axis (ZB-04)
  if (print.type === 'axis') {
    if (view === 'back') {
      // Minimal single spine line with terminal coordinate
      return (
        <g
          transform="translate(300, 180)"
          stroke={inkColor}
          opacity={opacity}
          className="select-none pointer-events-none"
        >
          <line x1="0" y1="0" x2="0" y2="340" strokeWidth="0.85" />
          <circle cx="0" cy="0" r="1.5" fill={inkColor} />
          <circle cx="0" cy="340" r="1.5" fill={inkColor} />
          <text
            x="8"
            y="338"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="6.5"
            letterSpacing="0.18em"
            fill={inkColor}
            stroke="none"
          >
            AXIS // 0.00°
          </text>
        </g>
      );
    }
  }

  return null;
}
