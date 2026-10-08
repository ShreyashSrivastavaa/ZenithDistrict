'use client';
 
import React, { useState } from 'react';
import Link from 'next/link';
import { Division, AnyVenture } from '@/data/types';
import { DistrictMap } from './DistrictMap';
import { DistrictList } from './DistrictList';
import { StatusTag } from '@/components/ui/StatusTag';
import { Tag } from '@/components/ui/Tag';
import { STATUS_ORDER } from '@/data/status';
import { studioServices } from '@/data/services';
import { BranchedMenu, BranchedMenuItem } from '@/components/ui/BranchedMenu';
import {
  LayoutGrid,
  List,
  ArrowRight,
  GitBranch,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import {
  CpuIcon,
  PaintBoardIcon,
  Layers01Icon,
  Rocket01Icon,
  Settings02Icon,
  FlashIcon,
  ShoppingBag01Icon,
  Download04Icon,
  GitBranchIcon,
  Atom01Icon,
  CursorPointer01Icon,
} from '@hugeicons/core-free-icons';

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
  const [viewMode, setViewMode] = useState<'map' | 'tree' | 'list'>('map');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeTreeValue, setActiveTreeValue] = useState<string>('i-hate-love-pdf');

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
              onClick={() => setViewMode('tree')}
              className={`p-1.5 flex items-center gap-1.5 font-mono-tag text-xs ${
                viewMode === 'tree'
                  ? 'bg-[var(--ink)] text-[var(--bone)] dark:bg-[var(--bone)] dark:text-[var(--ink)]'
                  : 'text-[var(--stone)] hover:text-[var(--text-primary)]'
              }`}
              title="Interactive Branch Tree"
              aria-label="Switch to Interactive Branch Tree"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">BRANCH TREE</span>
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
      {viewMode === 'map' && (
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
      )}

      {viewMode === 'tree' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between font-mono-tag text-xs text-[var(--stone)] pb-2 hairline-border-b">
            <span className="flex items-center gap-2 text-[var(--signal)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] animate-pulse" />
              INTERACTIVE HIERARCHY AST // BRANCH TREE
            </span>
            <span>CLICK BRANCH TO INSPECT DOSSIER</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: BranchedMenu (5 cols) */}
            <div className="lg:col-span-5 p-5 sm:p-6 border border-[var(--border-color)] bg-[var(--surface-elevated)] space-y-4">
              <div className="flex items-center justify-between pb-3 hairline-border-b text-[10px] font-mono-tag text-[var(--muted-text)]">
                <span>SECTOR TREE NAVIGATION</span>
                <span className="text-[var(--signal)]">LIVE VECTOR RAILS</span>
              </div>

              <div className="py-2 overflow-x-auto">
                <BranchedMenu
                  items={
                    (selectedDivision === 'all'
                      ? [
                          {
                            label: 'Z-01 STUDIO (SERVICES)',
                            children: studioServices.map((service) => ({
                              value: `service-${service.id}`,
                              label: service.title,
                              icon:
                                service.id === 'web-dev'
                                  ? Layers01Icon
                                  : service.id === 'saas-dev'
                                  ? Settings02Icon
                                  : service.id === 'ai-integrations'
                                  ? CpuIcon
                                  : service.id === 'backend-api'
                                  ? Settings02Icon
                                  : service.id === 'ui-ux-design'
                                  ? PaintBoardIcon
                                  : FlashIcon,
                            })),
                          },
                          {
                            label: 'Z-02 BRANDS (CONSUMER)',
                            children: (venturesByDivision['brands'] || []).map((brand) => ({
                              value: brand.slug,
                              label: brand.name,
                              icon: ShoppingBag01Icon,
                            })),
                          },
                          {
                            label: 'Z-03 PRODUCTS (SOFTWARE)',
                            children: (venturesByDivision['products'] || []).map((prod) => ({
                              value: prod.slug,
                              label: prod.name,
                              icon:
                                prod.slug === 'i-hate-love-pdf'
                                  ? Download04Icon
                                  : prod.slug === 'gitfc'
                                  ? GitBranchIcon
                                  : prod.slug === 'product-forum'
                                  ? CursorPointer01Icon
                                  : Rocket01Icon,
                            })),
                          },
                          {
                            label: 'Z-04 LABS (RESEARCH)',
                            children: (venturesByDivision['labs'] || []).map((lab) => ({
                              value: lab.slug,
                              label: lab.name,
                              icon:
                                lab.slug === 'local-vector-rag'
                                  ? CpuIcon
                                  : lab.slug === 'algorithmic-garment-patterns'
                                  ? PaintBoardIcon
                                  : lab.slug === 'agentic-cad-plotter'
                                  ? FlashIcon
                                  : Atom01Icon,
                            })),
                          },
                        ]
                      : [
                          selectedDivision === 'studio'
                            ? {
                                label: 'Z-01 STUDIO (SERVICES)',
                                children: studioServices.map((service) => ({
                                  value: `service-${service.id}`,
                                  label: service.title,
                                  icon:
                                    service.id === 'web-dev'
                                      ? Layers01Icon
                                      : service.id === 'saas-dev'
                                      ? Settings02Icon
                                      : service.id === 'ai-integrations'
                                      ? CpuIcon
                                      : service.id === 'backend-api'
                                      ? Settings02Icon
                                      : service.id === 'ui-ux-design'
                                      ? PaintBoardIcon
                                      : FlashIcon,
                                })),
                              }
                            : selectedDivision === 'brands'
                            ? {
                                label: 'Z-02 BRANDS (CONSUMER)',
                                children: (venturesByDivision['brands'] || []).map((brand) => ({
                                  value: brand.slug,
                                  label: brand.name,
                                  icon: ShoppingBag01Icon,
                                })),
                              }
                            : selectedDivision === 'products'
                            ? {
                                label: 'Z-03 PRODUCTS (SOFTWARE)',
                                children: (venturesByDivision['products'] || []).map((prod) => ({
                                  value: prod.slug,
                                  label: prod.name,
                                  icon:
                                    prod.slug === 'i-hate-love-pdf'
                                      ? Download04Icon
                                      : prod.slug === 'gitfc'
                                      ? GitBranchIcon
                                      : prod.slug === 'product-forum'
                                      ? CursorPointer01Icon
                                      : Rocket01Icon,
                                })),
                              }
                            : {
                                label: 'Z-04 LABS (RESEARCH)',
                                children: (venturesByDivision['labs'] || []).map((lab) => ({
                                  value: lab.slug,
                                  label: lab.name,
                                  icon:
                                    lab.slug === 'local-vector-rag'
                                      ? CpuIcon
                                      : lab.slug === 'algorithmic-garment-patterns'
                                      ? PaintBoardIcon
                                      : lab.slug === 'agentic-cad-plotter'
                                      ? FlashIcon
                                      : Atom01Icon,
                                })),
                              },
                        ]
                    ) as BranchedMenuItem[]
                  }
                  defaultOpen={[0, 1, 2, 3]}
                  defaultActive={activeTreeValue}
                  onSelect={(val) => setActiveTreeValue(val)}
                  width={380}
                  rowHeight={38}
                  indent={42}
                  trunk={14}
                  radius={10}
                  lineWidth={1.5}
                  fontSize={13}
                  drawDuration={350}
                  foldDuration={280}
                  color="var(--text-primary)"
                  accentColor="var(--signal)"
                  lineColor="var(--border-color)"
                />
              </div>
            </div>

            {/* Right Column: Node Specification Dossier Card (7 cols) */}
            <div className="lg:col-span-7 border border-[var(--border-color)] bg-[var(--surface-elevated)] p-6 sm:p-8 space-y-6">
              {(() => {
                const activeService = studioServices.find(
                  (s) => s.id === activeTreeValue || `service-${s.id}` === activeTreeValue
                );
                const activeVenture = allVentures.find((v) => v.slug === activeTreeValue);

                if (activeService) {
                  return (
                    <div className="space-y-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 hairline-border-b">
                        <div className="flex items-center gap-2">
                          <span className="font-mono-tag text-xs font-semibold px-2 py-0.5 border border-[var(--border-color)] text-[var(--signal)]">
                            Z-01
                          </span>
                          <span className="font-mono-tag text-[11px] text-[var(--stone)] uppercase">
                            STUDIO // SERVICE PRACTICE {activeService.number}
                          </span>
                        </div>
                        <span className="font-mono-tag text-xs px-2 py-0.5 border border-[var(--signal)] text-[var(--signal)] bg-[var(--signal)]/10">
                          ACTIVE PRACTICE
                        </span>
                      </div>

                      <div>
                        <h3 className="font-display text-2xl sm:text-3xl font-medium text-[var(--text-primary)]">
                          {activeService.title}
                        </h3>
                        <p className="text-sm sm:text-base text-[var(--muted-text)] mt-2 leading-relaxed">
                          {activeService.shortDesc}
                        </p>
                      </div>

                      <div className="p-4 border border-[var(--border-color)] bg-[var(--surface)] space-y-3">
                        <span className="font-mono-tag text-[10px] text-[var(--signal)] uppercase block">
                          CORE DELIVERABLES & ARCHITECTURAL SCOPE
                        </span>
                        <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-primary)]">
                          {activeService.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--signal)] mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 border border-[var(--border-color)] bg-[var(--surface)] text-xs text-[var(--muted-text)]">
                        <span className="font-mono-tag text-[10px] text-[var(--stone)] block mb-1 uppercase">
                          PRODUCTION OUTCOME:
                        </span>
                        <p className="italic text-[var(--text-primary)]">
                          &ldquo;{activeService.outcomes}&rdquo;
                        </p>
                      </div>

                      <div className="pt-4 hairline-border-t">
                        <Link
                          href="/studio#services"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--ink)] text-[var(--bone)] dark:bg-[var(--bone)] dark:text-[var(--ink)] font-mono-tag text-xs font-medium hover:bg-[var(--signal)] hover:text-white transition-colors"
                        >
                          <span>INQUIRE STUDIO PRACTICE</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                }

                if (activeVenture) {
                  return (
                    <div className="space-y-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 hairline-border-b">
                        <div className="flex items-center gap-2">
                          <span className="font-mono-tag text-xs font-semibold px-2 py-0.5 border border-[var(--border-color)] text-[var(--signal)]">
                            {activeVenture.division}
                          </span>
                          <span className="font-mono-tag text-[11px] text-[var(--stone)] uppercase">
                            {activeVenture.divisionSlug}
                            {' // SPECIFICATION'}
                          </span>
                        </div>
                        <StatusTag status={activeVenture.status} size="sm" />
                      </div>

                      <div>
                        <h3 className="font-display text-2xl sm:text-3xl font-medium text-[var(--text-primary)]">
                          {activeVenture.name}
                        </h3>
                        <p className="text-sm sm:text-base text-[var(--muted-text)] mt-2 leading-relaxed">
                          {activeVenture.tagline}
                        </p>
                      </div>

                      <div className="p-4 border border-[var(--border-color)] bg-[var(--surface)] text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed space-y-3">
                        <p>{activeVenture.description}</p>
                        {'problem' in activeVenture && activeVenture.problem && (
                          <div className="pt-3 hairline-border-t space-y-2">
                            <div>
                              <span className="font-mono-tag text-[10px] text-[var(--signal)] uppercase block mb-1">
                                PROBLEM SPACE
                              </span>
                              <p className="text-xs text-[var(--muted-text)]">{activeVenture.problem}</p>
                            </div>
                            <div>
                              <span className="font-mono-tag text-[10px] text-[var(--signal)] uppercase block mb-1">
                                SOLUTION SPECIFICATION
                              </span>
                              <p className="text-xs text-[var(--muted-text)]">{activeVenture.solution}</p>
                            </div>
                          </div>
                        )}
                        {'hypothesis' in activeVenture && activeVenture.hypothesis && (
                          <div className="pt-3 hairline-border-t space-y-2">
                            <span className="font-mono-tag text-[10px] text-[var(--signal)] uppercase block mb-1">
                              RESEARCH HYPOTHESIS
                            </span>
                            <p className="text-xs text-[var(--muted-text)]">{activeVenture.hypothesis}</p>
                            {activeVenture.nextMilestone && (
                              <p className="text-xs text-[var(--stone)] pt-1">
                                <span className="font-semibold text-[var(--text-primary)]">Next Milestone:</span>{' '}
                                {activeVenture.nextMilestone}
                              </p>
                            )}
                          </div>
                        )}
                        {'story' in activeVenture && activeVenture.story && (
                          <div className="pt-3 hairline-border-t">
                            <span className="font-mono-tag text-[10px] text-[var(--signal)] uppercase block mb-1">
                              BRAND THESIS
                            </span>
                            <p className="text-xs text-[var(--muted-text)]">{activeVenture.story}</p>
                          </div>
                        )}
                      </div>

                      {activeVenture.tags && activeVenture.tags.length > 0 && (
                        <div className="space-y-2">
                          <span className="font-mono-tag text-[10px] text-[var(--stone)] block">
                            TAGS // CAPABILITIES:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {activeVenture.tags.map((tag) => (
                              <Tag key={tag} size="sm">
                                {tag}
                              </Tag>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-4 hairline-border-t flex flex-wrap items-center gap-3">
                        <Link
                          href={`/${activeVenture.divisionSlug}/${activeVenture.slug}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--ink)] text-[var(--bone)] dark:bg-[var(--bone)] dark:text-[var(--ink)] font-mono-tag text-xs font-medium hover:bg-[var(--signal)] hover:text-white transition-colors"
                        >
                          <span>OPEN FULL DOSSIER</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        {activeVenture.links?.live && (
                          <a
                            href={activeVenture.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-2 border border-[var(--border-color)] hover:border-[var(--signal)] font-mono-tag text-xs text-[var(--text-primary)] transition-colors"
                          >
                            <span>LIVE SURFACE</span>
                            <ExternalLink className="w-3 h-3 text-[var(--stone)]" />
                          </a>
                        )}

                        {activeVenture.links?.repo && (
                          <a
                            href={activeVenture.links.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-2 border border-[var(--border-color)] hover:border-[var(--signal)] font-mono-tag text-xs text-[var(--text-primary)] transition-colors"
                          >
                            <span>REPOSITORY</span>
                            <ExternalLink className="w-3 h-3 text-[var(--stone)]" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="p-8 text-center space-y-3 text-[var(--muted-text)] font-mono-tag text-xs">
                    <GitBranch className="w-8 h-8 mx-auto text-[var(--stone)]" />
                    <p>Select any branch on the tree to inspect its operational specification.</p>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'list' && (
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
