'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { siteConfig } from '@/data/site';
import { divisions } from '@/data/divisions';
import { MagneticWrapper } from '@/components/ui/MagneticWrapper';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { TRANSITION_EASE } from '@/lib/motion';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const isDesktop = window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 14; // max ~7px parallax
      const y = (e.clientY / innerHeight - 0.5) * 14;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100svh-5rem)] flex flex-col justify-between overflow-hidden pt-8 pb-8 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1520px] mx-auto select-none"
      aria-label="ZenithDistrict Hero Introduction"
    >
      {/* Background Architectural Grid with Subtle Parallax */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out -z-10"
        style={{
          transform: shouldReduceMotion
            ? 'none'
            : `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 architectural-grid opacity-70" />
        {/* Subtle Plot Boundary Hairlines */}
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-[var(--line-subtle)]" />
        <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-[var(--line-subtle)]" />
        <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-[var(--line-subtle)]" />
        <div className="absolute left-2/3 top-0 bottom-0 w-[1px] bg-[var(--line-subtle)]" />
      </div>

      {/* Top Ledger Strip */}
      <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono-tag text-[var(--muted-text)]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)]"></span>
          <span>ZENITHDISTRICT — VENTURE HOUSE</span>
          {siteConfig.establishedYear && (
            <span>— EST. {siteConfig.establishedYear}</span>
          )}
        </div>
        <div className="text-[11px] text-[var(--stone)]">
          AUTONOMOUS OPERATING FRAMEWORK // 4 SECTORS
        </div>
      </div>

      {/* Dominant Hero Typographic Block */}
      <div className="my-auto py-12 md:py-16 space-y-6 md:space-y-8">
        <div className="overflow-hidden">
          {shouldReduceMotion ? (
            <h1 className="text-hero-fluid font-display tracking-tight text-[var(--text-primary)]">
              Building what’s{' '}
              <span className="font-editorial-italic text-[var(--signal)] font-normal italic">
                next.
              </span>
            </h1>
          ) : (
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, ease: TRANSITION_EASE }}
              className="text-hero-fluid font-display tracking-tight text-[var(--text-primary)]"
            >
              Building what’s{' '}
              <span className="font-editorial-italic text-[var(--signal)] font-normal italic">
                next.
              </span>
            </motion.h1>
          )}
        </div>

        {/* Supporting Copy (Max 2 sentences) */}
        <div className="max-w-2xl">
          <p className="text-base sm:text-lg md:text-xl text-[var(--muted-text)] leading-relaxed font-normal">
            {siteConfig.description}
          </p>
        </div>

        {/* Primary and Secondary Action CTAs */}
        <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6">
          <MagneticWrapper strength={10}>
            <Link
              href="/contact"
              className="px-6 py-3.5 bg-[var(--ink)] text-[var(--bone)] dark:bg-[var(--bone)] dark:text-[var(--ink)] hover:bg-[var(--signal)] hover:text-white dark:hover:bg-[var(--signal)] dark:hover:text-white font-mono-tag text-xs tracking-widest uppercase transition-colors rounded-none flex items-center gap-2 border border-transparent shadow-xs"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </MagneticWrapper>

          <a
            href="#district-section"
            className="px-6 py-3.5 border border-[var(--border-color)] hover:border-[var(--signal)] bg-[var(--surface-elevated)] font-mono-tag text-xs tracking-widest uppercase transition-colors rounded-none flex items-center gap-2 text-[var(--text-primary)]"
          >
            <span>EXPLORE THE DISTRICT</span>
            <ArrowDown className="w-4 h-4 text-[var(--stone)]" />
          </a>
        </div>
      </div>

      {/* Bottom District Nav Strip (Quick Structure Anchor) */}
      <div className="pt-6 hairline-border-t">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {divisions.map((division) => (
            <Link
              key={division.code}
              href={`#${division.slug}-section`}
              className="group p-3 border border-[var(--border-color)] hover:border-[var(--signal)] bg-[var(--surface-elevated)]/50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="font-mono-tag text-xs font-semibold text-[var(--signal)]">
                  {division.code}
                </span>
                <span className="font-mono-tag text-xs text-[var(--text-primary)] group-hover:text-[var(--signal)] truncate">
                  {division.name}
                </span>
              </div>
              <span className="text-[10px] font-mono-tag text-[var(--stone)] hidden sm:inline">
                ↓
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
