'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Division, AnyVenture } from '@/data/types';
import { DistrictMap } from './DistrictMap';
import { DistrictList } from './DistrictList';
import { StatusTag } from '@/components/ui/StatusTag';
import { STATUS_ORDER } from '@/data/status';
import { LayoutGrid, List, ArrowRight } from 'lucide-react';

interface DistrictFullViewProps {
  divisions: Division[];
  allVentures: AnyVenture[];
  venturesByDivision: Record<string, AnyVenture[]>;
  serviceCount: number;
}

export function DistrictFullView({
  divisions,
  allVentures,
  venturesByDivision,
  serviceCount,
}: DistrictFullViewProps) {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredVentures = allVentures.filter((venture) => {
    if (selectedDivision !== 'all' && venture.divisionSlug !== selectedDivision) {
      return false;
    }
    if (selectedStatus !== 'all' && venture.status !== selectedStatus) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-10">
      {/* Controls Bar: Filters & View Switcher */}
      <div className="p-4 border border-[var(--border-color)] bg-[var(--surface-elevated)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Division Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono-tag text-[10px] text-[var(--stone)] mr-1">
            SECTOR:
          </span>
          {['all', 'studio', 'brands', 'products', 'labs'].map((div) => (
            <button
              key={div}
              type="button"
              onClick={() => setSelectedDivision(div)}
              className={`px-3 py-1 font-mono-tag text-xs border rounded-none transition-colors ${
                selectedDivision === div
                  ? 'border-[var(--signal)] bg-[var(--signal)]/10 text-[var(--signal)] font-medium'
                  : 'border-[var(--border-color)] hover:border-[var(--stone)] text-[var(--text-primary)]'
              }`}
            >
              {div.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Status Filters & View Toggle */}
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
          <div className="flex items-center gap-2">
            <span className="font-mono-tag text-[10px] text-[var(--stone)]">
              STATUS:
            </span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1 text-xs font-mono-tag bg-[var(--surface)] border border-[var(--border-color)] text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--signal)]"
            >
              <option value="all">ALL STATUSES</option>
              {STATUS_ORDER.map((status) => (
                <option key={status} value={status}>
                  {status.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-[var(--border-color)] bg-[var(--surface)]">
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`p-1.5 flex items-center gap-1.5 font-mono-tag text-xs ${
                viewMode === 'map'
                  ? 'bg-[var(--ink)] text-[var(--bone)] dark:bg-[var(--bone)] dark:text-[var(--ink)]'
                  : 'text-[var(--stone)] hover:text-[var(--text-primary)]'
              }`}
              title="CAD Map View"
              aria-label="Switch to CAD Map View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CAD PLAN</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 flex items-center gap-1.5 font-mono-tag text-xs ${
                viewMode === 'list'
                  ? 'bg-[var(--ink)] text-[var(--bone)] dark:bg-[var(--bone)] dark:text-[var(--ink)]'
                  : 'text-[var(--stone)] hover:text-[var(--text-primary)]'
              }`}
              title="Directory List View"
              aria-label="Switch to Directory List View"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">DIRECTORY</span>
            </button>
          </div>
        </div>
      </div>

      {/* View Rendering */}
      {viewMode === 'map' ? (
        <div className="space-y-12">
          <DistrictMap
            divisions={divisions}
            venturesByDivision={venturesByDivision}
            serviceCount={serviceCount}
            expandedMode={true}
          />

          {/* Filtered Ventures Sub-Index under Map */}
          <div className="space-y-4 pt-8 hairline-border-t">
            <div className="flex items-center justify-between font-mono-tag text-xs text-[var(--stone)]">
              <span>ACTIVE SUB-SECTORS IN CURRENT VIEW FILTER</span>
              <span>{filteredVentures.length} VENTURES MATCHED</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVentures.map((venture) => (
                <Link
                  key={venture.id}
                  href={`/${venture.divisionSlug}/${venture.slug}`}
                  className="group p-4 border border-[var(--border-color)] hover:border-[var(--signal)] bg-[var(--surface)] transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between pb-2 hairline-border-b text-[10px] font-mono-tag">
                    <span className="text-[var(--signal)]">{venture.division}</span>
                    <StatusTag status={venture.status} size="sm" />
                  </div>
                  <div className="py-3">
                    <h4 className="font-display text-lg font-medium text-[var(--text-primary)] group-hover:text-[var(--signal)]">
                      {venture.name}
                    </h4>
                    <p className="text-xs text-[var(--muted-text)] mt-1 line-clamp-2">
                      {venture.tagline}
                    </p>
                  </div>
                  <div className="pt-2 hairline-border-t flex items-center justify-between font-mono-tag text-[10px] text-[var(--stone)]">
                    <span>{venture.divisionSlug.toUpperCase()}</span>
                    <span className="group-hover:text-[var(--signal)] flex items-center gap-1">
                      ENTER ↗
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <DistrictList
            divisions={divisions}
            venturesByDivision={venturesByDivision}
            serviceCount={serviceCount}
          />

          {/* Complete Directory Flat List */}
          <div className="divide-y divide-[var(--border-color)] hairline-border-y bg-[var(--surface)]">
            {filteredVentures.map((venture) => (
              <Link
                key={venture.id}
                href={`/${venture.divisionSlug}/${venture.slug}`}
                className="group p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--surface-elevated)] transition-colors"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono-tag text-xs text-[var(--stone)]">
                    {venture.division}
                  </span>
                  <div>
                    <h4 className="font-display text-lg sm:text-xl font-medium text-[var(--text-primary)] group-hover:text-[var(--signal)]">
                      {venture.name}
                    </h4>
                    <p className="text-xs text-[var(--muted-text)]">
                      {venture.tagline}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusTag status={venture.status} size="sm" />
                  <ArrowRight className="w-4 h-4 text-[var(--stone)] group-hover:text-[var(--signal)] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
