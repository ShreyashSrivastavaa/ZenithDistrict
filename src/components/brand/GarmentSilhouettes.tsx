import React from 'react';
import { GarmentSilhouette, GarmentView } from '@/data/types';

interface GarmentSilhouetteProps {
  silhouette: GarmentSilhouette;
  view: GarmentView;
  garmentColor: string;
  shadowColor: string;
  seamColor: string;
  ribColor: string;
  filterId: string;
}

/**
 * Geometric SVG silhouette generator for Collection 01 garments.
 * Modeled on realistic technical flat-lay garment draft specifications.
 */
export function GarmentSilhouettes({
  silhouette,
  view,
  garmentColor,
  shadowColor,
  seamColor,
  ribColor,
  filterId,
}: GarmentSilhouetteProps) {
  const isBack = view === 'back';

  // 1. Oversized Tee (ZB-01)
  if (silhouette === 'oversized-tee') {
    return (
      <g filter={`url(#${filterId})`}>
        {/* Soft Contact Shadow */}
        <ellipse
          cx="300"
          cy="575"
          rx="175"
          ry="12"
          fill={shadowColor}
          opacity="0.65"
          filter="blur(8px)"
        />

        {/* Garment Base Contour */}
        <path
          d="M 235 150 
             Q 300 152 365 150 
             L 490 205 
             L 450 315 
             L 400 295 
             L 395 550 
             Q 300 554 205 550 
             L 200 295 
             L 150 315 
             L 110 205 
             Z"
          fill={garmentColor}
          stroke={seamColor}
          strokeWidth="0.85"
        />

        {/* Sleeve Inset Seams */}
        <path d="M 375 185 Q 395 240 400 295" fill="none" stroke={seamColor} strokeWidth="0.75" />
        <path d="M 225 185 Q 205 240 200 295" fill="none" stroke={seamColor} strokeWidth="0.75" />

        {/* Subtle Sleeve Fold Shading */}
        <path d="M 440 220 Q 425 260 415 295" fill="none" stroke={seamColor} strokeWidth="0.4" opacity="0.4" />
        <path d="M 160 220 Q 175 260 185 295" fill="none" stroke={seamColor} strokeWidth="0.4" opacity="0.4" />

        {/* Neck Ribbing & Collar */}
        {isBack ? (
          // Back View: High collar curve with woven neck label line
          <g>
            <path
              d="M 240 150 Q 300 162 360 150"
              fill="none"
              stroke={ribColor}
              strokeWidth="11"
              strokeLinecap="round"
            />
            {/* Woven neck brand label: "A ZenithDistrict brand" */}
            <rect x="272" y="157" width="56" height="12" fill={garmentColor} stroke={seamColor} strokeWidth="0.5" />
            <text
              x="300"
              y="165"
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="4.2"
              fill={seamColor}
              letterSpacing="0.08em"
              textAnchor="middle"
            >
              ZENITHDISTRICT
            </text>
          </g>
        ) : (
          // Front View: Dropped neck rib curve showing inner collar depth
          <g>
            {/* Inner Back Collar */}
            <path d="M 242 150 Q 300 166 358 150 Q 300 174 242 150 Z" fill={ribColor} opacity="0.35" />
            {/* Front Collar Rib */}
            <path
              d="M 240 150 Q 300 196 360 150"
              fill="none"
              stroke={ribColor}
              strokeWidth="9.5"
              strokeLinecap="round"
            />
            {/* Inner neck woven tag visible inside neckline */}
            <rect x="278" y="156" width="44" height="10" fill={garmentColor} stroke={seamColor} strokeWidth="0.5" opacity="0.8" />
            <text
              x="300"
              y="163"
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="3.8"
              fill={seamColor}
              letterSpacing="0.08em"
              textAnchor="middle"
              opacity="0.9"
            >
              ZENITHDISTRICT
            </text>
          </g>
        )}

        {/* Twin-Needle Hem Stitch Lines */}
        <line x1="207" y1="540" x2="393" y2="540" stroke={seamColor} strokeWidth="0.6" strokeDasharray="3 2" />
        <line x1="207" y1="543" x2="393" y2="543" stroke={seamColor} strokeWidth="0.6" strokeDasharray="3 2" />

        {/* Sleeve Hem Stitches */}
        <line x1="403" y1="292" x2="447" y2="310" stroke={seamColor} strokeWidth="0.6" strokeDasharray="2.5 2" />
        <line x1="197" y1="292" x2="153" y2="310" stroke={seamColor} strokeWidth="0.6" strokeDasharray="2.5 2" />
      </g>
    );
  }

  // 2. Boxy Cropped Tee (ZB-02)
  if (silhouette === 'boxy-cropped-tee') {
    return (
      <g filter={`url(#${filterId})`}>
        {/* Contact Shadow (Wide & Short) */}
        <ellipse
          cx="300"
          cy="500"
          rx="185"
          ry="12"
          fill={shadowColor}
          opacity="0.65"
          filter="blur(8px)"
        />

        {/* Boxy Wide Body & Short Square Hem */}
        <path
          d="M 230 155 
             Q 300 157 370 155 
             L 505 205 
             L 468 310 
             L 415 290 
             L 410 475 
             L 190 475 
             L 185 290 
             L 132 310 
             L 95 205 
             Z"
          fill={garmentColor}
          stroke={seamColor}
          strokeWidth="0.85"
        />

        {/* Wide Seam Construction */}
        <path d="M 385 185 Q 405 235 415 290" fill="none" stroke={seamColor} strokeWidth="0.75" />
        <path d="M 215 185 Q 195 235 185 290" fill="none" stroke={seamColor} strokeWidth="0.75" />

        {/* Thicker 32mm Neck Rib */}
        {isBack ? (
          <g>
            <path
              d="M 235 155 Q 300 167 365 155"
              fill="none"
              stroke={ribColor}
              strokeWidth="13"
              strokeLinecap="round"
            />
            <rect x="272" y="162" width="56" height="12" fill={garmentColor} stroke={seamColor} strokeWidth="0.5" />
            <text
              x="300"
              y="170"
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="4.2"
              fill={seamColor}
              letterSpacing="0.08em"
              textAnchor="middle"
            >
              ZENITHDISTRICT
            </text>
          </g>
        ) : (
          <g>
            <path d="M 237 155 Q 300 172 363 155 Q 300 182 237 155 Z" fill={ribColor} opacity="0.35" />
            <path
              d="M 235 155 Q 300 204 365 155"
              fill="none"
              stroke={ribColor}
              strokeWidth="11.5"
              strokeLinecap="round"
            />
            <rect x="278" y="161" width="44" height="10" fill={garmentColor} stroke={seamColor} strokeWidth="0.5" opacity="0.8" />
            <text
              x="300"
              y="168"
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="3.8"
              fill={seamColor}
              letterSpacing="0.08em"
              textAnchor="middle"
              opacity="0.9"
            >
              ZENITHDISTRICT
            </text>
          </g>
        )}

        {/* Square Hem Twin-Needle Stitches */}
        <line x1="192" y1="465" x2="408" y2="465" stroke={seamColor} strokeWidth="0.6" strokeDasharray="3 2" />
        <line x1="192" y1="468" x2="408" y2="468" stroke={seamColor} strokeWidth="0.6" strokeDasharray="3 2" />
      </g>
    );
  }

  // 3. Oversized Long Sleeve (ZB-03)
  if (silhouette === 'oversized-long-sleeve') {
    return (
      <g filter={`url(#${filterId})`}>
        {/* Contact Shadow */}
        <ellipse
          cx="300"
          cy="585"
          rx="170"
          ry="12"
          fill={shadowColor}
          opacity="0.65"
          filter="blur(8px)"
        />

        {/* Long Sleeve Extended Contour with Cuff Stacking */}
        <path
          d="M 235 150 
             Q 300 152 365 150 
             L 485 200 
             L 535 430 
             L 495 440 
             L 400 280 
             L 395 560 
             Q 300 564 205 560 
             L 200 280 
             L 105 440 
             L 65 430 
             L 115 200 
             Z"
          fill={garmentColor}
          stroke={seamColor}
          strokeWidth="0.85"
        />

        {/* Sleeve Shoulder Seams */}
        <path d="M 375 185 Q 395 235 400 280" fill="none" stroke={seamColor} strokeWidth="0.75" />
        <path d="M 225 185 Q 205 235 200 280" fill="none" stroke={seamColor} strokeWidth="0.75" />

        {/* Ribbed Wrist Cuffs */}
        <rect x="495" y="420" width="38" height="20" rx="1" fill={ribColor} opacity="0.75" stroke={seamColor} strokeWidth="0.5" transform="rotate(12 514 430)" />
        <rect x="67" y="420" width="38" height="20" rx="1" fill={ribColor} opacity="0.75" stroke={seamColor} strokeWidth="0.5" transform="rotate(-12 86 430)" />

        {/* Neck Ribbing */}
        {isBack ? (
          <g>
            <path d="M 240 150 Q 300 162 360 150" fill="none" stroke={ribColor} strokeWidth="11" strokeLinecap="round" />
            <rect x="272" y="157" width="56" height="12" fill={garmentColor} stroke={seamColor} strokeWidth="0.5" />
            <text x="300" y="165" fontFamily="var(--font-geist-mono), monospace" fontSize="4.2" fill={seamColor} letterSpacing="0.08em" textAnchor="middle">
              ZENITHDISTRICT
            </text>
          </g>
        ) : (
          <g>
            <path d="M 242 150 Q 300 166 358 150 Q 300 174 242 150 Z" fill={ribColor} opacity="0.35" />
            <path d="M 240 150 Q 300 196 360 150" fill="none" stroke={ribColor} strokeWidth="9.5" strokeLinecap="round" />
            <rect x="278" y="156" width="44" height="10" fill={garmentColor} stroke={seamColor} strokeWidth="0.5" opacity="0.8" />
            <text x="300" y="163" fontFamily="var(--font-geist-mono), monospace" fontSize="3.8" fill={seamColor} letterSpacing="0.08em" textAnchor="middle" opacity="0.9">
              ZENITHDISTRICT
            </text>
          </g>
        )}

        {/* Hem Stitches */}
        <line x1="207" y1="550" x2="393" y2="550" stroke={seamColor} strokeWidth="0.6" strokeDasharray="3 2" />
        <line x1="207" y1="553" x2="393" y2="553" stroke={seamColor} strokeWidth="0.6" strokeDasharray="3 2" />
      </g>
    );
  }

  // 4. Oversized Sleeveless Top (ZB-04)
  if (silhouette === 'oversized-sleeveless') {
    return (
      <g filter={`url(#${filterId})`}>
        {/* Contact Shadow */}
        <ellipse
          cx="300"
          cy="565"
          rx="155"
          ry="12"
          fill={shadowColor}
          opacity="0.65"
          filter="blur(8px)"
        />

        {/* Sleeveless Cut with Deep Armhole Drop */}
        <path
          d="M 245 155 
             Q 300 157 355 155 
             L 385 185 
             Q 370 290 395 340 
             L 390 540 
             Q 300 544 210 540 
             L 205 340 
             Q 230 290 215 185 
             Z"
          fill={garmentColor}
          stroke={seamColor}
          strokeWidth="0.85"
        />

        {/* Bound Armhole Tapes */}
        <path d="M 385 185 Q 370 290 395 340" fill="none" stroke={ribColor} strokeWidth="4" strokeLinecap="round" />
        <path d="M 215 185 Q 230 290 205 340" fill="none" stroke={ribColor} strokeWidth="4" strokeLinecap="round" />

        {/* Neck Binding */}
        {isBack ? (
          <g>
            <path d="M 250 155 Q 300 166 350 155" fill="none" stroke={ribColor} strokeWidth="7" strokeLinecap="round" />
            <rect x="274" y="160" width="52" height="11" fill={garmentColor} stroke={seamColor} strokeWidth="0.5" />
            <text x="300" y="167" fontFamily="var(--font-geist-mono), monospace" fontSize="4.2" fill={seamColor} letterSpacing="0.08em" textAnchor="middle">
              ZENITHDISTRICT
            </text>
          </g>
        ) : (
          <g>
            <path d="M 250 155 Q 300 170 350 155 Q 300 180 250 155 Z" fill={ribColor} opacity="0.35" />
            <path d="M 250 155 Q 300 202 350 155" fill="none" stroke={ribColor} strokeWidth="6.5" strokeLinecap="round" />
            <rect x="278" y="159" width="44" height="10" fill={garmentColor} stroke={seamColor} strokeWidth="0.5" opacity="0.8" />
            <text x="300" y="166" fontFamily="var(--font-geist-mono), monospace" fontSize="3.8" fill={seamColor} letterSpacing="0.08em" textAnchor="middle" opacity="0.9">
              ZENITHDISTRICT
            </text>
          </g>
        )}

        {/* Hem Stitches & Side Slits */}
        <line x1="212" y1="530" x2="388" y2="530" stroke={seamColor} strokeWidth="0.6" strokeDasharray="3 2" />
        <line x1="212" y1="533" x2="388" y2="533" stroke={seamColor} strokeWidth="0.6" strokeDasharray="3 2" />
      </g>
    );
  }

  return null;
}
