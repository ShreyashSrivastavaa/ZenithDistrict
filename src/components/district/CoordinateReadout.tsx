'use client';

import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'motion/react';

export function CoordinateReadout() {
  const [point, setPoint] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Only enable on desktop pointer devices
    const isDesktop = window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPoint({
        x: e.clientX,
        y: e.clientY,
        w: window.innerWidth,
        h: window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

  if (!point || shouldReduceMotion) return null;

  // Normalized coordinate string (simulated architectural coordinates)
  const normX = ((point.x / (point.w || 1)) * 100).toFixed(1);
  const normY = ((point.y / (point.h || 1)) * 100).toFixed(1);
  const lat = (40.7128 + (point.y / (point.h || 1)) * 0.05).toFixed(4);
  const lon = (-74.006 + (point.x / (point.w || 1)) * 0.05).toFixed(4);

  return (
    <div
      className="fixed pointer-events-none z-40 transition-transform duration-75 hidden lg:flex items-center gap-2 px-2 py-1 bg-[var(--surface-elevated)]/90 backdrop-blur-xs border border-[var(--border-color)] text-[10px] font-mono-tag text-[var(--muted-text)] shadow-xs rounded-none"
      style={{
        left: `${point.x + 16}px`,
        top: `${point.y + 16}px`,
        transform: 'translate3d(0, 0, 0)',
      }}
      aria-hidden="true"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)]"></span>
      <span>
        GRID [{normX}%, {normY}%] // {lat}°N, {lon}°W
      </span>
    </div>
  );
}
