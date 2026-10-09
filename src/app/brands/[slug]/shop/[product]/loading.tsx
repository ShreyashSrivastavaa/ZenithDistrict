import React from 'react';
import { Container } from '@/components/layout/Container';

export default function ProductLoading() {
  return (
    <div className="py-6 sm:py-10 md:py-14 space-y-16 sm:space-y-24 animate-pulse">
      <Container>
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <div className="h-4 w-16 bg-[var(--line-subtle)]" />
          <div className="h-4 w-2 bg-[var(--line-subtle)]" />
          <div className="h-4 w-12 bg-[var(--line-subtle)]" />
          <div className="h-4 w-2 bg-[var(--line-subtle)]" />
          <div className="h-4 w-24 bg-[var(--line-subtle)]" />
        </div>

        {/* 2-Zone Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: Gallery Skeleton (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="w-full aspect-[4/5] bg-[var(--line-subtle)]" />
            <div className="flex gap-2">
              <div className="w-16 h-20 bg-[var(--line-subtle)]" />
              <div className="w-16 h-20 bg-[var(--line-subtle)]" />
              <div className="w-16 h-20 bg-[var(--line-subtle)]" />
            </div>
          </div>

          {/* Right: Info Skeleton (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="h-4 w-32 bg-[var(--line-subtle)]" />
              <div className="h-10 w-3/4 bg-[var(--line-subtle)]" />
              <div className="h-6 w-24 bg-[var(--line-subtle)]" />
            </div>

            <div className="space-y-4">
              <div className="h-4 w-48 bg-[var(--line-subtle)]" />
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--line-subtle)]" />
                <div className="w-8 h-8 rounded-full bg-[var(--line-subtle)]" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-4 w-32 bg-[var(--line-subtle)]" />
              <div className="grid grid-cols-6 gap-2">
                <div className="h-11 bg-[var(--line-subtle)]" />
                <div className="h-11 bg-[var(--line-subtle)]" />
                <div className="h-11 bg-[var(--line-subtle)]" />
                <div className="h-11 bg-[var(--line-subtle)]" />
              </div>
            </div>

            <div className="h-12 w-full bg-[var(--line-subtle)]" />
          </div>
        </div>
      </Container>
    </div>
  );
}
