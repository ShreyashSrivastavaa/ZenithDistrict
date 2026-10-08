'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandHeaderLogo } from '@/components/brand/BrandHeaderLogo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { MobileMenu } from './MobileMenu';
import { Menu } from 'lucide-react';
import { siteConfig } from '@/data/site';

export function Header() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Header border activation
      setHasScrolled(currentScrollY > 16);

      // Auto-hide on scroll down, reveal on scroll up
      if (currentScrollY > 80) {
        if (currentScrollY > lastScrollY.current + 5) {
          setIsVisible(false); // scrolling down
        } else if (currentScrollY < lastScrollY.current - 5) {
          setIsVisible(true); // scrolling up
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Skip to Content Accessible Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[var(--signal)] focus:text-white focus:font-mono-tag focus:rounded-sm focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          hasScrolled
            ? 'bg-[var(--bg-page)]/90 backdrop-blur-md hairline-border-b shadow-xs'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 h-16 md:h-20 flex items-center justify-between">
          {/* Brand Wordmark & Monogram */}
          <div className="flex items-center">
            <BrandHeaderLogo withTagline={false} />
          </div>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-7 text-xs font-mono-tag tracking-wider"
          >
            {siteConfig.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative py-2 transition-colors hover:text-[var(--signal)] ${
                    isActive
                      ? 'text-[var(--signal)] font-medium'
                      : 'text-[var(--text-primary)]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.code && (
                      <span className="text-[10px] text-[var(--stone)] group-hover:text-[var(--signal)] opacity-80">
                        {item.code}
                      </span>
                    )}
                    <span>{item.label}</span>
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--signal)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Theme Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/contact"
              className="px-4 py-2 bg-[var(--ink)] text-[var(--bone)] dark:bg-[var(--bone)] dark:text-[var(--ink)] font-mono-tag text-xs tracking-wider uppercase hover:bg-[var(--signal)] hover:text-white transition-colors duration-200 border border-transparent rounded-sm"
            >
              START A PROJECT
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle className="scale-90" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 border border-[var(--border-color)] hover:border-[var(--signal)] rounded-sm focus-visible:ring-2 focus-visible:ring-[var(--signal)]"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5 text-[var(--text-primary)]" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
