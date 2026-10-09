import React from 'react';
import { Container } from '@/components/layout/Container';

export default function ShopLoading() {
  return (
    <div className="py-8 sm:py-12 md:py-16 space-y-12 animate-pulse">
      <Container>
        {/* Header Block Skeleton */}
        <div className="space-y-4 max-w-4xl">
          <div className="h-4 w-32 bg-[var(--line-subtle)]" />
          <div className="h-14 w-3/4 sm:w-1/2 bg-[var(--line-subtle)]" />
          <div className="h-4 w-full bg-[var(--line-subtle)]" />
          <div className="h-4 w-2/3 bg-[var(--line-subtle)]" />
        </div>

        {/* Filter Row Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 hairline-border-y mt-8">
          <div className="h-6 w-48 bg-[var(--line-subtle)]" />
          <div className="h-6 w-48 bg-[var(--line-subtle)]" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 w-full mt-12">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-[var(--line-subtle)] border border-[var(--border-color)]" />
          ))}
        </div>
      </Container>
    </div>
  );
}
