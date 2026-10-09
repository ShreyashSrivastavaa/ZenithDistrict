export type DivisionCode = 'Z-01' | 'Z-02' | 'Z-03' | 'Z-04';

export type DivisionSlug = 'studio' | 'brands' | 'products' | 'labs';

export type VentureStatus =
  | 'Idea'
  | 'Exploring'
  | 'Building'
  | 'Beta'
  | 'Live'
  | 'Venture';

export interface StatusConfig {
  label: VentureStatus;
  description: string;
  dotColor: string;
  dotPulse?: boolean;
}

export interface VentureBase {
  id: string;
  slug: string;
  name: string;
  division: DivisionCode;
  divisionSlug: DivisionSlug;
  status: VentureStatus;
  tagline: string;
  description: string;
  longDescription?: string;
  featured: boolean;
  featuredOrder?: number;
  tags: string[];
  links?: {
    live?: string;
    repo?: string;
    docs?: string;
    external?: string;
  };
  startedAt?: string;
  updatedAt?: string;
  theme?: {
    accent?: string;
    badgeBg?: string;
  };
  // Scalability hooks for future venture architecture
  parentId?: string;
  acquiredFrom?: string;
}

export interface BrandVenture extends VentureBase {
  division: 'Z-02';
  divisionSlug: 'brands';
  category: 'Apparel' | 'Goods' | 'Lifestyle' | 'Print';
  story: string;
  dropsPlaceholder?: {
    title: string;
    status: string;
    note: string;
  }[];
  storeUrl?: string;
}

export interface ProductVenture extends VentureBase {
  division: 'Z-03';
  divisionSlug: 'products';
  category: 'Developer Tools' | 'Web Utilities' | 'Discovery' | 'AI Systems' | 'SaaS';
  problem: string;
  solution: string;
  architectureNotes?: string[];
  roadmap?: {
    phase: string;
    status: 'Planned' | 'In Progress' | 'Shipped';
    summary: string;
  }[];
}

export interface LabExperiment extends VentureBase {
  division: 'Z-04';
  divisionSlug: 'labs';
  hypothesis: string;
  learnings: string[];
  nextMilestone: string;
  graduationCriteria?: string[];
}

export type AnyVenture = BrandVenture | ProductVenture | LabExperiment;

export interface Division {
  code: DivisionCode;
  slug: DivisionSlug;
  name: string;
  title: string;
  descriptor: string;
  leadParagraph: string;
  route: string;
  plotCoord: string;
  colorToken: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  deliverables: string[];
  outcomes: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
  duration?: string;
}

export interface EngagementModel {
  title: string;
  tagline: string;
  description: string;
  bestFor: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: 'studio' | 'general' | 'ventures';
}

export interface Founder {
  name: string;
  role: string;
  bio: string;
  focus: string;
  links?: {
    github?: string;
    x?: string;
    linkedin?: string;
  };
}

export type ShopMode = 'preview' | 'waitlist' | 'external' | 'live';

export type GarmentSilhouette =
  | 'oversized-tee'
  | 'boxy-cropped-tee'
  | 'oversized-long-sleeve'
  | 'oversized-sleeveless';

export type GarmentView =
  | 'front'
  | 'back'
  | 'detail-rib'
  | 'detail-print'
  | 'detail-hem';

export interface GarmentColorway {
  id: string;
  label: string;
  hex: string;
  garmentHex?: string;
  plateHex?: {
    light: string;
    dark: string;
  };
}

export type ApparelSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface SizeChartEntry {
  size: ApparelSize;
  chestCm: number;
  lengthCm: number;
  shoulderCm: number;
  sleeveCm?: number;
}

export interface PrintDefinition {
  type: 'coordinates' | 'blueprint' | 'index' | 'axis';
  frontPlacement?: string;
  backPlacement?: string;
  sleevePlacement?: string;
}

export type ProductAvailability = 'concept' | 'sampling' | 'preorder' | 'available';

export interface ApparelProduct {
  slug: string;
  code: string;
  name: string;
  silhouette: GarmentSilhouette;
  colorways: GarmentColorway[];
  print: PrintDefinition;
  sizes: ApparelSize[];
  disabledSizes?: ApparelSize[];
  fitNote: string;
  availability: ProductAvailability;
  price: number;
  currency: string;
  priceConfirmed: boolean;
  fabric: {
    gsm?: number;
    composition: string;
    weave: string;
    unconfirmed: boolean;
  };
  care: string[];
  sizeChart: SizeChartEntry[];
  realImages?: Record<string, Partial<Record<GarmentView, string>>>;
  sortOrder: number;
  featured: boolean;
  description: string;
  details: string[];
  productionNote: string;
  externalCheckoutUrl?: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  heroHeadline: string;
  heroHeadlineAccent: string;
  description: string;
  establishedYear: number;
  contactEmail: string;
  location: string;
  statusHeadline: string;
  shop: {
    mode: ShopMode;
  };
  flags: {
    showCareers: boolean;
    showPress: boolean;
    showNewsletter: boolean;
    showCommunity: boolean;
    showInvestors: boolean;
    showGridDevToggle: boolean;
  };
  socials: {
    github: string;
    x: string;
    linkedin?: string;
  };
  navigation: {
    label: string;
    href: string;
    code?: string;
  }[];
}
