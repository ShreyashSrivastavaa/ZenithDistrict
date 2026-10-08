'use strict';
import React from 'react';

interface LogoMarkProps {
  className?: string;
  size?: number;
  variant?: 'gradient' | 'outline' | 'solid' | 'monochrome';
}

/**
 * ZenithDistrict Unified "ZD" Mark
 * Faithful vector rendering of the brand geometry from the official brand identity guide.
 */
export function LogoMark({
  className = '',
  size = 32,
  variant = 'gradient',
}: LogoMarkProps) {
  const gradientIdZ = React.useId();
  const gradientIdD = React.useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ZenithDistrict Monogram"
      role="img"
    >
      <defs>
        {/* Silver/Platinum gradient for Z */}
        <linearGradient
          id={gradientIdZ}
          x1="10"
          y1="10"
          x2="90"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#D1D5DB" />
          <stop offset="100%" stopColor="#9CA3AF" />
        </linearGradient>

        {/* Electric Blue gradient for D */}
        <linearGradient
          id={gradientIdD}
          x1="45"
          y1="15"
          x2="85"
          y2="85"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="40%" stopColor="#3882F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>

      {variant === 'outline' ? (
        <g stroke="currentColor" strokeWidth="3" fill="none">
          {/* Z stroke outline */}
          <path d="M22 25 L68 25 L34 75 L80 75" strokeLinecap="square" />
          {/* D loop outline */}
          <path
            d="M44 25 C74 25 86 42 86 52 C86 64 74 75 48 75"
            strokeLinecap="round"
          />
        </g>
      ) : variant === 'solid' ? (
        <g fill="currentColor">
          {/* Z letterform */}
          <path
            d="M18 20 H68 L60 28 H34 L64 68 H74 V76 H22 L30 68 H54 L24 28 H18 V20 Z"
          />
          {/* D interlocking curve */}
          <path
            d="M48 20 C68 20 84 32 84 50 C84 66 70 76 46 76 H40 L46 68 C64 68 74 60 74 50 C74 38 62 28 44 28 H40 L48 20 Z"
          />
        </g>
      ) : variant === 'monochrome' ? (
        <g>
          {/* Z dark/light neutral */}
          <path
            d="M18 20 H68 L60 28 H34 L64 68 H74 V76 H22 L30 68 H54 L24 28 H18 V20 Z"
            fill="#6B7280"
          />
          {/* D darker neutral */}
          <path
            d="M48 20 C68 20 84 32 84 50 C84 66 70 76 46 76 H40 L46 68 C64 68 74 60 74 50 C74 38 62 28 44 28 H40 L48 20 Z"
            fill="#4B5563"
          />
        </g>
      ) : (
        /* Default: Official Gradient Mark */
        <g>
          {/* Z segment with silver gradient on dark, or ink on light */}
          <path
            d="M18 20 H68 L60 28 H34 L64 68 H74 V76 H22 L30 68 H54 L24 28 H18 V20 Z"
            fill="currentColor"
            className="text-stone-900 dark:text-stone-100"
          />
          {/* D segment with brand Electric Blue gradient */}
          <path
            d="M48 20 C68 20 84 32 84 50 C84 66 70 76 46 76 H40 L46 68 C64 68 74 60 74 50 C74 38 62 28 44 28 H40 L48 20 Z"
            fill={`url(#${gradientIdD})`}
          />
        </g>
      )}
    </svg>
  );
}
