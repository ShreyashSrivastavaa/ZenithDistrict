import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { BrandStatement } from '@/components/sections/BrandStatement';
import { TheDistrict } from '@/components/sections/TheDistrict';
import { FeaturedVentures } from '@/components/sections/FeaturedVentures';
import { StudioPreview } from '@/components/sections/StudioPreview';
import { BrandsPreview } from '@/components/sections/BrandsPreview';
import { ProductsPreview } from '@/components/sections/ProductsPreview';
import { LabsPreview } from '@/components/sections/LabsPreview';
import { Philosophy } from '@/components/sections/Philosophy';
import { CTASection } from '@/components/sections/CTASection';
import {
  getAllDivisions,
  getBrands,
  getProducts,
  getLabs,
  getFeaturedVentures,
} from '@/lib/content';

export default async function HomePage() {
  const [divisions, brands, products, labs, featuredVentures] = await Promise.all([
    getAllDivisions(),
    getBrands(),
    getProducts(),
    getLabs(),
    getFeaturedVentures(),
  ]);

  const venturesByDivision = {
    brands,
    products,
    labs,
  };

  return (
    <div className="w-full flex flex-col">
      {/* 5.1 A: HERO */}
      <Hero />

      {/* 5.1 B: BRAND STATEMENT */}
      <BrandStatement />

      {/* 5.1 C: THE DISTRICT (Core Interactive Section) */}
      <TheDistrict
        divisions={divisions}
        venturesByDivision={venturesByDivision}
      />

      {/* 5.1 D: FEATURED VENTURES */}
      <FeaturedVentures ventures={featuredVentures} />

      {/* 5.1 E: STUDIO PREVIEW (Z-01) */}
      <StudioPreview />

      {/* 5.1 F: BRANDS PREVIEW (Z-02) */}
      <BrandsPreview brands={brands} />

      {/* 5.1 G: PRODUCTS PREVIEW (Z-03) */}
      <ProductsPreview products={products} />

      {/* 5.1 H: LABS PREVIEW (Z-04) */}
      <LabsPreview experiments={labs} />

      {/* 5.1 I: PHILOSOPHY */}
      <Philosophy />

      {/* 5.1 J: CTA */}
      <CTASection />
    </div>
  );
}
