import { SiteConfig } from './types';

export const siteConfig: SiteConfig = {
  name: 'ZenithDistrict',
  legalName: 'ZenithDistrict Ventures',
  tagline: "Building what's next.",
  heroHeadline: 'Building what’s',
  heroHeadlineAccent: 'next.',
  description:
    'ZenithDistrict is an independent venture house. We design and build software, launch consumer brands, and run experiments, taking the strongest ideas from first sketch to standalone company.',
  establishedYear: 2026,
  contactEmail: 'inquiries@zenithdistrict.com', // TODO: replace with production mailbox
  location: 'Remote & Distributed',
  statusHeadline: 'One district. Many ventures.',
  shop: {
    mode: 'live', // Options: 'preview' | 'waitlist' | 'external' | 'live'
  },
  flags: {
    showCareers: false, // Hidden until active roles are opened
    showPress: false, // Hidden until formal press kit is released
    showNewsletter: false, // Placeholder toggle
    showCommunity: false,
    showInvestors: false,
    showGridDevToggle: false, // Architectural grid overlay disabled
  },
  socials: {
    github: 'https://github.com/ShreyashSrivastavaa', // Primary repository hub
    x: 'https://x.com/zenithdistrict', // TODO: replace if handle differs
  },
  navigation: [
    { label: 'Studio', href: '/studio', code: 'Z-01' },
    { label: 'Brands', href: '/brands', code: 'Z-02' },
    { label: 'Products', href: '/products', code: 'Z-03' },
    { label: 'Labs', href: '/labs', code: 'Z-04' },
    { label: 'About', href: '/about' },
  ],
};
