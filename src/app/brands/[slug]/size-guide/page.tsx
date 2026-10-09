import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { getBrands, getBrandBySlug } from '@/lib/content';
import { getApparelProducts } from '@/data/apparel';
import { constructMetadata } from '@/lib/seo';
import { GarmentMeasureDiagram } from '@/components/brand/GarmentMeasureDiagram';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { APPAREL_BRAND_SLUG } from '@/data/brands';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const instant = false;

export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.map((brand) => ({
    slug: brand.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    return constructMetadata({
      title: 'Size Guide Not Found',
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `Technical Size Guide // ${brand.name} (Z-02)`,
    description:
      'Flat-lay garment measurements, dimensional tolerances, and silhouette sizing tables for Collection 01.',
    path: `/brands/${brand.slug}/size-guide`,
  });
}

export default async function BrandSizeGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand || slug !== APPAREL_BRAND_SLUG) {
    notFound();
  }

  const products = await getApparelProducts();

  return (
    <div className="py-8 sm:py-12 md:py-16 space-y-16">
      <Container>
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 font-mono-tag text-xs text-[var(--stone)] mb-6">
          <Link
            href={`/brands/${slug}`}
            className="hover:text-[var(--signal)] transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>{brand.name}</span>
          </Link>
          <span>/</span>
          <span className="text-[var(--signal)] font-medium">SIZE GUIDE</span>
        </div>

        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="font-mono-tag text-xs text-[var(--stone)] block uppercase tracking-wider">
            DIMENSIONAL AUDIT // COLLECTION 01
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)] font-normal tracking-[-0.02em]">
            Technical Garment Specifications.
          </h1>
          <p className="text-base text-[var(--muted-text)] leading-relaxed">
            All measurements represent the actual garment dimensions measured flat on a level studio surface. Compare these against a favorite existing tee or top to determine your intended drape.
          </p>
          <div className="p-3 bg-[var(--surface-elevated)] border border-[var(--border-color)] font-mono-tag text-[11px] text-[var(--stone)]">
            * HONESTY NOTICE: All dimensions below are concept baseline values [TODO: confirm with supplier upon final prototype grading sign-off].
          </div>
        </div>
      </Container>

      {/* Sizing Tables Per Silhouette */}
      <Container>
        <div className="space-y-16">
          {products.map((product) => (
            <div key={product.slug} className="space-y-6 pt-10 hairline-border-t">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <span className="font-mono-tag text-xs text-[var(--signal)] block uppercase">
                    SILHOUETTE SPEC // {product.code}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)] mt-1">
                    {product.name}
                  </h2>
                </div>
                <Link
                  href={`/brands/${slug}/shop/${product.slug}`}
                  className="font-mono-tag text-xs text-[var(--text-primary)] hover:text-[var(--signal)] transition-colors uppercase tracking-wider flex items-center gap-1"
                >
                  <span>VIEW PIECE</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* SVG Blueprint Diagram */}
                <div className="lg:col-span-4">
                  <GarmentMeasureDiagram
                    silhouette={product.silhouette}
                    activeSizeData={product.sizeChart.find((sc) => sc.size === 'M')}
                  />
                </div>

                {/* Flat Table */}
                <div className="lg:col-span-8 overflow-x-auto">
                  <table className="w-full text-left font-mono-tag text-xs border border-[var(--border-color)]">
                    <thead className="bg-[var(--surface-elevated)] hairline-border-b">
                      <tr>
                        <th className="p-3.5 font-semibold text-[var(--text-primary)]">SIZE</th>
                        <th className="p-3.5 font-semibold text-[var(--text-primary)]">A · CHEST (CM)</th>
                        <th className="p-3.5 font-semibold text-[var(--text-primary)]">B · LENGTH (CM)</th>
                        <th className="p-3.5 font-semibold text-[var(--text-primary)]">C · SHOULDER (CM)</th>
                        {product.sizeChart[0]?.sleeveCm && (
                          <th className="p-3.5 font-semibold text-[var(--text-primary)]">D · SLEEVE (CM)</th>
                        )}
                        <th className="p-3.5 font-semibold text-[var(--stone)]">AVAILABILITY</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-color)]">
                      {product.sizeChart.map((row) => {
                        const isDisabled = product.disabledSizes?.includes(row.size);
                        return (
                          <tr
                            key={row.size}
                            className={`hover:bg-[var(--surface-elevated)]/50 transition-colors ${
                              isDisabled ? 'opacity-40 bg-[var(--surface-elevated)]/25' : ''
                            }`}
                          >
                            <td className="p-3.5 font-bold text-[var(--text-primary)]">{row.size}</td>
                            <td className="p-3.5 tabular-nums text-[var(--text-primary)]">{row.chestCm}</td>
                            <td className="p-3.5 tabular-nums text-[var(--text-primary)]">{row.lengthCm}</td>
                            <td className="p-3.5 tabular-nums text-[var(--text-primary)]">{row.shoulderCm}</td>
                            {row.sleeveCm && (
                              <td className="p-3.5 tabular-nums text-[var(--text-primary)]">{row.sleeveCm}</td>
                            )}
                            <td className="p-3.5 text-[10px] text-[var(--stone)]">
                              {isDisabled ? '[NOT PRODUCED]' : '[CONCEPT]'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <p className="text-[11px] text-[var(--stone)] mt-2 font-mono-tag">
                    Fit Note: {product.fitNote}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Flat Lay Measurement Guide */}
      <Container>
        <div className="p-8 sm:p-12 border border-[var(--border-color)] bg-[var(--surface-elevated)] space-y-4">
          <span className="font-mono-tag text-xs text-[var(--stone)] block uppercase tracking-wider">
            HOW TO MEASURE
          </span>
          <h3 className="font-display text-xl font-medium text-[var(--text-primary)]">
            Flat-Lay Calibration Protocol
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[var(--muted-text)] leading-relaxed font-mono-tag pt-2">
            <div>
              <span className="text-[var(--text-primary)] font-semibold block mb-1">A · CHEST WIDTH</span>
              Measure horizontally across the front from armpit seam to armpit seam with the garment smoothed out flat.
            </div>
            <div>
              <span className="text-[var(--text-primary)] font-semibold block mb-1">B · BODY LENGTH</span>
              Measure vertically from the highest shoulder point adjacent to the neck collar straight down to the bottom hemline.
            </div>
            <div>
              <span className="text-[var(--text-primary)] font-semibold block mb-1">C · SHOULDER DROP</span>
              Measure straight across the back from the apex of one shoulder seam to the apex of the opposite shoulder seam.
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
