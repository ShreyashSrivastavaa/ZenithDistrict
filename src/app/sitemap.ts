import { MetadataRoute } from 'next';
import { getBrands, getProducts, getLabs } from '@/lib/content';
import { getApparelProducts } from '@/data/apparel';
import { siteUrl } from '@/lib/seo';
import { APPAREL_BRAND_SLUG } from '@/data/brands';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [brands, products, labs, apparelItems] = await Promise.all([
    getBrands(),
    getProducts(),
    getLabs(),
    getApparelProducts(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/district`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/studio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/brands`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/labs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];

  const brandRoutes: MetadataRoute.Sitemap = brands.flatMap((brand) => {
    const base: MetadataRoute.Sitemap = [
      {
        url: `${siteUrl}/brands/${brand.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.75,
      },
    ];

    if (brand.slug === APPAREL_BRAND_SLUG) {
      base.push(
        {
          url: `${siteUrl}/brands/${brand.slug}/shop`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        },
        {
          url: `${siteUrl}/brands/${brand.slug}/story`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        },
        {
          url: `${siteUrl}/brands/${brand.slug}/size-guide`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }
      );
    }
    return base;
  });

  const apparelProductRoutes: MetadataRoute.Sitemap = apparelItems.map((p) => ({
    url: `${siteUrl}/brands/${APPAREL_BRAND_SLUG}/shop/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const labRoutes: MetadataRoute.Sitemap = labs.map((lab) => ({
    url: `${siteUrl}/labs/${lab.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...brandRoutes,
    ...apparelProductRoutes,
    ...productRoutes,
    ...labRoutes,
  ];
}
