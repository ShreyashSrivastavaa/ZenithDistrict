'use client';

import React from 'react';
import Link from 'next/link';
import { Wordmark } from '@/components/brand/Wordmark';
import { LogoMark } from '@/components/brand/LogoMark';
import { siteConfig } from '@/data/site';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = siteConfig.establishedYear || 2026;

  return (
    <footer className="w-full hairline-border-t bg-[var(--bg-page)] pt-16 pb-12 mt-20">
      <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 hairline-border-b">
          {/* Brand & Manifesto Statement */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <LogoMark size={28} variant="solid" />
                <Wordmark withTagline={true} />
              </div>
              <p className="text-sm text-[var(--muted-text)] max-w-md leading-relaxed font-normal">
                {siteConfig.description}
              </p>
            </div>

            <div className="pt-4 flex flex-col gap-1 font-mono-tag text-xs text-[var(--muted-text)]">
              <span>LOCATION // {siteConfig.location}</span>
              <span>OPERATING STATUS // INDEPENDENT VENTURE HOUSE</span>
            </div>
          </div>

          {/* Directory Indices */}
          <div className="lg:col-span-2 space-y-4">
            <div className="font-mono-tag text-xs text-[var(--stone)]">
              01 / DISTRICT
            </div>
            <ul className="space-y-2.5 text-sm font-mono-tag">
              <li>
                <Link
                  href="/studio"
                  className="hover:text-[var(--signal)] transition-colors flex items-center gap-2"
                >
                  <span className="text-[var(--stone)] text-[10px]">Z-01</span>
                  <span>Studio</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className="hover:text-[var(--signal)] transition-colors flex items-center gap-2"
                >
                  <span className="text-[var(--stone)] text-[10px]">Z-02</span>
                  <span>Brands</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-[var(--signal)] transition-colors flex items-center gap-2"
                >
                  <span className="text-[var(--stone)] text-[10px]">Z-03</span>
                  <span>Products</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/labs"
                  className="hover:text-[var(--signal)] transition-colors flex items-center gap-2"
                >
                  <span className="text-[var(--stone)] text-[10px]">Z-04</span>
                  <span>Labs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/district"
                  className="hover:text-[var(--signal)] transition-colors flex items-center gap-2 text-[var(--signal)]"
                >
                  <span className="text-[var(--stone)] text-[10px]">MAP</span>
                  <span>Interactive Plan</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Practice & Governance */}
          <div className="lg:col-span-2 space-y-4">
            <div className="font-mono-tag text-xs text-[var(--stone)]">
              02 / FOUNDATION
            </div>
            <ul className="space-y-2.5 text-sm font-mono-tag">
              <li>
                <Link href="/about" className="hover:text-[var(--signal)] transition-colors">
                  Operating Model
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--signal)] transition-colors">
                  Start a Project
                </Link>
              </li>
              <li>
                <Link href="/contact?type=Partnership" className="hover:text-[var(--signal)] transition-colors">
                  Partnerships
                </Link>
              </li>
              {siteConfig.flags.showCareers && (
                <li>
                  <Link href="/careers" className="hover:text-[var(--signal)] transition-colors">
                    Careers
                  </Link>
                </li>
              )}
              {siteConfig.flags.showPress && (
                <li>
                  <Link href="/press" className="hover:text-[var(--signal)] transition-colors">
                    Press Kit
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Connectivity & Communication */}
          <div className="lg:col-span-3 space-y-4">
            <div className="font-mono-tag text-xs text-[var(--stone)]">
              03 / SIGNALS
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-xs text-[var(--muted-text)] font-mono-tag">
                Direct Inquiries:
              </p>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="font-mono-tag text-xs text-[var(--text-primary)] hover:text-[var(--signal)] transition-colors break-all block"
              >
                {siteConfig.contactEmail}
              </a>

              <div className="pt-2 flex items-center gap-3 font-mono-tag text-xs">
                {siteConfig.socials.github && (
                  <a
                    href={siteConfig.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--signal)] transition-colors"
                  >
                    GITHUB ↗
                  </a>
                )}
                {siteConfig.socials.x && (
                  <a
                    href={siteConfig.socials.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--signal)] transition-colors"
                  >
                    X (TWITTER) ↗
                  </a>
                )}
              </div>

              {siteConfig.flags.showNewsletter && (
                <div className="pt-3">
                  <span className="font-mono-tag text-[10px] text-[var(--stone)]">
                    DISPATCH (COMING SOON)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tag text-xs text-[var(--muted-text)]">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {currentYear} ZENITHDISTRICT VENTURES. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline">·</span>
            <span>STRUCTURE OVER SLOGANS</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 hover:text-[var(--signal)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--signal)] p-1 rounded-none text-[10px] tracking-[0.033em]"
            aria-label="Scroll back to top of page"
          >
            <span>BACK TO TOP</span>
            <ArrowUp
              className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
