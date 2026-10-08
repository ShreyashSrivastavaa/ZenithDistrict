import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { MagneticWrapper } from '@/components/ui/MagneticWrapper';
import { ArrowRight } from 'lucide-react';
import { LogoMark } from '@/components/brand/LogoMark';

export function CTASection() {
  return (
    <section
      className="w-full bg-[#0A0A0B] text-[#F3F1EC] py-24 sm:py-32 md:py-40 select-none relative overflow-hidden"
      aria-label="Call to Action: Work with ZenithDistrict"
    >
      {/* Background Architectural Grid & Celestial Monogram Watermark */}
      <div
        className="absolute inset-0 architectural-grid opacity-20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -right-16 -bottom-20 opacity-[0.05] pointer-events-none select-none text-[#F3F1EC] hidden md:block"
        aria-hidden="true"
      >
        <LogoMark size={340} variant="solid" />
      </div>

      <Container>
        <div className="max-w-4xl mx-auto space-y-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 font-mono-tag text-xs text-[var(--signal)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] animate-pulse" />
            <span>COMMUNICATION CHANNEL // DIRECTORY OPEN</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-[#F3F1EC] leading-tight">
            Have something to build?
          </h2>

          <p className="text-base sm:text-xl text-[#A19F9A] max-w-2xl leading-relaxed">
            Studio projects, partnerships, and early conversations are welcome. We answer every inquiry directly without intermediaries.
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <MagneticWrapper strength={12}>
              <Link
                href="/contact"
                className="px-7 py-3.5 bg-[#F3F1EC] text-[#0A0A0B] hover:bg-[var(--signal)] hover:text-white font-mono-tag text-xs tracking-widest uppercase transition-colors rounded-none flex items-center gap-2 border border-transparent shadow-md"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticWrapper>

            <Link
              href="/contact?type=Partnership"
              className="px-7 py-3.5 border border-white/20 hover:border-white/60 text-[#F3F1EC] font-mono-tag text-xs tracking-widest uppercase transition-colors rounded-none"
            >
              <span>PARTNER WITH US</span>
            </Link>
          </div>

          <div className="pt-8 hairline-border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono-tag text-[#8B8984] gap-2">
            <span>RESPONSE WINDOW: 24–48 HOURS</span>
            <span>END-TO-END CONFIDENTIALITY OBSERVED</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
