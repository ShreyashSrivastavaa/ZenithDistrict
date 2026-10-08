'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { LogoMark } from '@/components/brand/LogoMark';
import { X, ArrowRight } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Trap body scroll & handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const links = [
    { href: '/', label: 'District Home', code: '00' },
    { href: '/studio', label: 'Studio', code: 'Z-01', desc: 'Client Engineering' },
    { href: '/brands', label: 'Brands', code: 'Z-02', desc: 'Consumer Ventures' },
    { href: '/products', label: 'Products', code: 'Z-03', desc: 'Digital Utilities' },
    { href: '/labs', label: 'Labs', code: 'Z-04', desc: 'Active R&D' },
    { href: '/district', label: 'District Plan', code: 'MAP', desc: 'Interactive Grid' },
    { href: '/about', label: 'About', code: 'DOC', desc: 'Venture Model' },
    { href: '/contact', label: 'Inquiries', code: 'MSG', desc: 'Start a Project' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-[100] bg-[var(--bg-page)] flex flex-col justify-between overflow-y-auto"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 sm:p-6 hairline-border-b">
        <div className="flex items-center gap-3">
          <LogoMark size={24} variant="gradient" />
          <span className="font-mono-tag tracking-wider text-xs">
            INDEX DIRECTORY
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle className="min-h-[44px] px-3 py-2 flex items-center" />
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 border border-[var(--border-color)] hover:border-[var(--signal)] rounded-none focus-visible:ring-2 focus-visible:ring-[var(--signal)] transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5 text-[var(--text-primary)]" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Nav List */}
      <div className="flex-1 px-4 sm:px-6 py-6 divide-y divide-[var(--border-color)]">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="group flex items-center justify-between py-4 transition-colors hover:text-[var(--signal)]"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono-tag text-[10px] tracking-[0.033em] text-[var(--stone)] group-hover:text-[var(--signal)]">
                  {link.code}
                </span>
                <div>
                  <span
                    className={`text-2xl font-display uppercase tracking-tight ${
                      isActive ? 'text-[var(--signal)] font-medium' : 'text-[var(--text-primary)]'
                    }`}
                  >
                    {link.label}
                  </span>
                  {link.desc && (
                    <span className="block font-mono-tag text-[10px] tracking-[0.033em] text-[var(--muted-text)] mt-0.5">
                      {link.desc}
                    </span>
                  )}
                </div>
              </div>
              <ArrowRight
                className="w-4 h-4 opacity-40 transition-transform group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-[var(--signal)]"
                strokeWidth={1.5}
              />
            </Link>
          );
        })}
      </div>

      {/* Pinned Bottom CTA */}
      <div className="p-4 sm:p-6 hairline-border-t bg-[var(--surface-elevated)] flex flex-col gap-3">
        <Link
          href="/contact"
          onClick={onClose}
          className="w-full py-3.5 px-4 border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg-page)] font-mono-tag text-[11px] tracking-[0.033em] text-center uppercase transition-colors rounded-none"
        >
          START A PROJECT →
        </Link>
        <div className="flex items-center justify-between text-[10px] font-mono-tag text-[var(--muted-text)]">
          <span>ZENITHDISTRICT VENTURES</span>
          <span>EST. 2026</span>
        </div>
      </div>
    </div>
  );
}
