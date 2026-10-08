import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { DistrictFullView } from '@/components/district/DistrictFullView';
import {
  getAllDivisions,
  getAllVentures,
  getBrands,
  getProducts,
  getLabs,
} from '@/lib/content';
import { studioServices } from '@/data/services';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'District Cadastre // Interactive Ecosystem Plan',
  description:
    'Complete architectural map and index of ZenithDistrict operational sectors, consumer brands, software products, and experimental research labs.',
  path: '/district',
});

export default async function DistrictPage() {
  const [divisions, allVentures, brands, products, labs] = await Promise.all([
    getAllDivisions(),
    getAllVentures(),
    getBrands(),
    getProducts(),
    getLabs(),
  ]);

  const venturesByDivision = {
    brands,
    products,
    labs,
  };

  return (
    <div className="py-12 md:py-20">
      <Container>
        <SectionHeader
          index="MAP"
          title="DISTRICT CADASTRE"
          code="ZONE_01"
          caption="A full-spectrum architectural view of the ZenithDistrict ecosystem. Filter by sector or lifecycle stage."
        />

        <DistrictFullView
          divisions={divisions}
          allVentures={allVentures}
          venturesByDivision={venturesByDivision}
          serviceCount={studioServices.length}
        />
      </Container>
    </div>
  );
}
