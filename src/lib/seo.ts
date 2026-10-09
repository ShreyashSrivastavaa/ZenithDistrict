import { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { AnyVenture } from '@/data/types';

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenithdistrict.com';

export function constructMetadata({
  title,
  description,
  path = '',
  image = '/brand/og-image.png',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const fullTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;
  const fullDesc = description || siteConfig.description;
  const canonicalUrl = `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;

  return {
    title: fullTitle,
    description: fullDesc,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description: fullDesc,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — Venture House`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDesc,
      images: [image],
      creator: '@zenithdistrict',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      apple: '/brand/apple-touch-icon.png',
    },
  };
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteUrl,
    logo: `${siteUrl}/brand/logo-mark.svg`,
    description: siteConfig.description,
    foundingDate: '2026',
    sameAs: [siteConfig.socials.github, siteConfig.socials.x].filter(Boolean),
    knowsAbout: [
      'Digital Venture Architecture',
      'Software Engineering',
      'Consumer Brand Incubation',
      'Experimental R&D',
    ],
  };
}

export function generateVentureJsonLd(venture: AnyVenture) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: venture.name,
    headline: venture.tagline,
    description: venture.description,
    datePublished: venture.startedAt,
    dateModified: venture.updatedAt,
    creator: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    keywords: venture.tags.join(', '),
  };
}

/**
 * Safely serializes data into a JSON string suitable for inline <script> tags.
 * Escapes '<', '>', and '&' to prevent HTML parser breakouts and XSS.
 */
export function safeJsonLdStringify(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}
