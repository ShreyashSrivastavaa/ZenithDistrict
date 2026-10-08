'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[ZenithDistrict::RuntimeError]', error);
  }, [error]);

  return (
    <div className="py-24 sm:py-32 flex items-center justify-center">
      <Container>
        <div className="max-w-xl mx-auto p-8 border border-[var(--border-color)] bg-[var(--surface-elevated)] space-y-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 font-mono-tag text-xs text-[var(--signal)]">
            <AlertTriangle className="w-4 h-4" />
            <span>RUNTIME EXCEPTION // SECTOR RECOVERY</span>
          </div>

          <h2 className="font-display text-3xl font-medium text-[var(--text-primary)]">
            A temporary disruption occurred.
          </h2>

          <p className="text-sm text-[var(--muted-text)] leading-relaxed">
            The requested module encountered an unhandled state. The error has been captured in system logs.
          </p>

          <div className="pt-4 hairline-border-t flex flex-wrap items-center justify-between gap-4 font-mono-tag text-xs">
            <button
              type="button"
              onClick={() => reset()}
              className="px-5 py-2.5 bg-[var(--ink)] text-[var(--bone)] dark:bg-[var(--bone)] dark:text-[var(--ink)] hover:bg-[var(--signal)] hover:text-white uppercase transition-colors rounded-none flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RETRY RENDER</span>
            </button>

            <Link
              href="/"
              className="text-[var(--text-primary)] hover:text-[var(--signal)] transition-colors"
            >
              RETURN TO DISTRICT HOME →
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
