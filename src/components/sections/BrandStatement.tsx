'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Container } from '@/components/layout/Container';

export function BrandStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const statementText =
    'ZenithDistrict is where ideas get built, launched and operated. A studio for clients. A house for consumer brands. A home for software products. A lab for everything that doesn’t exist yet.';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'center 0.4'],
  });

  const paragraphOpacity = useTransform(scrollYProgress, [0, 0.6], [0.35, 1]);

  const verbs = [
    { verb: 'We build.', division: 'Studio (Z-01)', href: '/studio' },
    { verb: 'We launch.', division: 'Brands (Z-02)', href: '/brands' },
    { verb: 'We operate.', division: 'Products (Z-03)', href: '/products' },
    { verb: 'We experiment.', division: 'Labs (Z-04)', href: '/labs' },
  ];

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 md:py-40 hairline-border-b"
      aria-label="ZenithDistrict Brand Statement"
    >
      <Container>
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Section Marker */}
          <div className="flex items-center gap-2 font-mono-tag text-xs text-[var(--stone)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)]"></span>
            <span>00 // OPERATING THESIS</span>
          </div>

          {/* Large Editorial Paragraph with Scroll Opacity Reveal */}
          <div className="text-editorial-lead font-display font-normal text-[var(--text-primary)] leading-[1.35] tracking-tight">
            {shouldReduceMotion ? (
              <p>{statementText}</p>
            ) : (
              <motion.p
                style={{ opacity: paragraphOpacity }}
                className="transition-opacity duration-300"
              >
                {statementText}
              </motion.p>
            )}
          </div>

          {/* Four Verbs Line in Mono mapping to divisions on hover */}
          <div className="pt-8 hairline-border-t flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 sm:gap-10">
              {verbs.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="group flex flex-col font-mono-tag transition-colors hover:text-[var(--signal)]"
                >
                  <span className="text-sm sm:text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--signal)]">
                    {item.verb}
                  </span>
                  <span className="text-[10px] text-[var(--stone)] group-hover:text-[var(--signal)] mt-0.5">
                    → {item.division}
                  </span>
                </Link>
              ))}
            </div>

            <div className="font-mono-tag text-[11px] text-[var(--stone)] hidden lg:block">
              {"// ONE DISTRICT. FOUR DISCIPLINES."}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
