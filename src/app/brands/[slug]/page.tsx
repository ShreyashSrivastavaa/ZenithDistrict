import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { getBrands, getBrandBySlug } from '@/lib/content';
import { getApparelProducts } from '@/data/apparel';
import { constructMetadata, generateVentureJsonLd, safeJsonLdStringify } from '@/lib/seo';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LogoMark } from '@/components/brand/LogoMark';
import { GarmentMock } from '@/components/brand/GarmentMock';
import { ProductCard } from '@/components/brand/ProductCard';
import { BrandWaitlistForm } from '@/components/brand/BrandWaitlistForm';
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
      title: 'Brand Not Found',
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${brand.name} // On-Demand Apparel (Z-02)`,
    description: brand.description,
    path: `/brands/${brand.slug}`,
  });
}

export default async function BrandTemplatePage({ params }: PageProps) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  const jsonLd = generateVentureJsonLd(brand);

  // If this is the sovereign apparel brand, render the dedicated atelier brand home
  if (slug === APPAREL_BRAND_SLUG) {
    const products = await getApparelProducts();
    const heroProduct = products[0]; // ZB-01 Coordinates

    return (
      <div className="py-8 sm:py-12 md:py-20 space-y-24 sm:space-y-32">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
        />

        {/* 1. Hero: Big Editorial Title, One Line Copy, Generous Garment Render */}
        <Container>
          <div className="space-y-12">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-sm bg-[#0A0A0B] border border-white/10 flex items-center justify-center p-1 shrink-0 text-[#F3F1EC] shadow-none">
                <LogoMark size={22} variant="solid" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 font-mono-tag text-xs text-[var(--signal)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)]" />
                  <span>Z-02 // ZENITHDISTRICT APPAREL · EST. 2026</span>
                </div>
                <span className="text-[10px] font-mono-tag text-[var(--stone)] uppercase tracking-wider">
                  OFFICIAL PHYSICAL LABEL
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              <div className="lg:col-span-7 space-y-6">
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[-0.03em] leading-[0.98] text-[var(--text-primary)] text-balance">
                  Garments engineered without speculative excess.
                </h1>

                <p className="text-base sm:text-lg text-[var(--muted-text)] max-w-xl leading-relaxed text-pretty">
                  An exploratory apparel label combining architectural typography, heavyweight organic textiles, and zero-inventory on-demand manufacturing.
                </p>

                <div className="pt-4 flex items-center gap-6 font-mono-tag text-xs">
                  <Link
                    href={`/brands/${slug}/shop`}
                    className="px-6 py-3 bg-[var(--text-primary)] text-[var(--bg-page)] hover:bg-[var(--signal)] hover:text-white transition-colors rounded-none flex items-center gap-2 uppercase tracking-widest"
                  >
                    <span>EXPLORE COLLECTION 01</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/brands/${slug}/story`}
                    className="text-[var(--text-primary)] hover:text-[var(--signal)] transition-colors uppercase tracking-wider underline underline-offset-4"
                  >
                    HOW WE MANUFACTURE
                  </Link>
                </div>
              </div>

              {/* Generous Scale Hero Render */}
              <div className="lg:col-span-5">
                <Link
                  href={`/brands/${slug}/shop/${heroProduct.slug}`}
                  className="block relative overflow-hidden bg-[#F8F7F4] dark:bg-[#0A0A0B] group"
                >
                  <GarmentMock
                    silhouette={heroProduct.silhouette}
                    colorway={heroProduct.colorways[0]}
                    view="back"
                    print={heroProduct.print}
                    aspectRatio="4/5"
                    alt={`${heroProduct.name} Hero Render`}
                  />
                  <div className="p-4 flex items-center justify-between font-mono-tag text-xs hairline-border-t">
                    <span className="text-[var(--stone)]">{heroProduct.code} {'// HERO PIECE'}</span>
                    <span className="group-hover:text-[var(--signal)] transition-colors flex items-center gap-1">
                      VIEW PIECE <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Container>

        {/* 2. Collection 01 Editorial Showcase */}
        <Container>
          <div className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 hairline-border-b">
              <div>
                <span className="font-mono-tag text-xs text-[var(--stone)] block uppercase tracking-wider">
                  COLLECTION 01 // ARCHITECTURAL MONO
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[var(--text-primary)] mt-1">
                  Four baseline silhouettes.
                </h2>
              </div>

              <Link
                href={`/brands/${slug}/shop`}
                className="font-mono-tag text-xs text-[var(--signal)] hover:underline uppercase tracking-wider flex items-center gap-1 shrink-0"
              >
                <span>VIEW FULL CATALOG</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Editorial 4-Piece Grid with Alternating Card Scale */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-6">
                <ProductCard product={products[0]} priority={true} />
              </div>
              <div className="lg:col-span-6">
                <ProductCard product={products[1]} />
              </div>
              <div className="lg:col-span-6">
                <ProductCard product={products[2]} />
              </div>
              <div className="lg:col-span-6">
                <ProductCard product={products[3]} />
              </div>
            </div>
          </div>
        </Container>

        {/* 3. Tailor Manifesto & Made-To-Order Production Model Note */}
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 p-8 sm:p-12 md:p-16 border border-[var(--border-color)] bg-[var(--surface)]">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono-tag text-xs text-[var(--signal)] block uppercase tracking-wider">
                01 // PRODUCTION THESIS
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] leading-tight">
                No warehouse shelves piled high with speculative inventory.
              </h3>
            </div>

            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-[var(--muted-text)] leading-relaxed">
              <p>
                The fashion industry runs on an unsustainable cadence: brands predict demand six months ahead, over-produce overseas runs, discount the unsold bulk, and incinerate the remainder.
              </p>
              <p>
                We reject this cycle entirely. Every garment in Collection 01 is printed strictly to order. When you place a request, a blank is pulled, custom silk-screened or digitally cured with permeable pigment, and dispatched directly from our regional manufacturing partner.
              </p>
              <div className="pt-2 flex items-center gap-6 font-mono-tag text-xs text-[var(--text-primary)]">
                <span>· 100% ORGANIC COTTON BLANKS</span>
                <span>· ZERO INVENTORY WASTE</span>
              </div>
            </div>
          </div>
        </Container>

        {/* 4. On-Demand Waitlist Section */}
        <Container>
          <BrandWaitlistForm
            headline="Enter Collection 01 Registry"
            caption="Physical sampling is currently in progress. Enter your email for notification when the on-demand printing queue opens."
          />
        </Container>

        {/* 5. Quiet Return Link to District */}
        <Container>
          <div className="pt-12 hairline-border-t flex items-center justify-between font-mono-tag text-xs text-[var(--stone)]">
            <Link
              href="/"
              className="hover:text-[var(--signal)] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO ZENITHDISTRICT VENTURE HOUSE</span>
            </Link>
            <span>Z-02 DIVISION CADASTRE</span>
          </div>
        </Container>
      </div>
    );
  }

  // Fallback for any other sovereign brands
  return (
    <div className="py-12 md:py-20 space-y-16">
      <Container>
        <Link
          href="/brands"
          className="inline-flex items-center gap-2 font-mono-tag text-xs text-[var(--stone)] hover:text-[var(--signal)] transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>ALL BRANDS</span>
        </Link>
        <h1 className="font-display text-4xl font-medium">{brand.name}</h1>
        <p className="text-lg text-[var(--muted-text)] mt-4">{brand.description}</p>
      </Container>
    </div>
  );
}
