import { ApparelProduct } from './types';

/**
 * Z-02 Apparel Collection 01 Data
 * All four mock products are defined strictly from data.
 * Adding product number five requires editing this file only.
 * 
 * HONESTY PROTOCOL:
 * All prices, GSM, measurements, shipping timelines, and return policies
 * are explicitly flagged with TODO comments until confirmed with the supplier.
 */

export const apparelProducts: ApparelProduct[] = [
  {
    slug: 'unisex-oversized-jersey',
    code: 'ZB-01',
    name: 'Unisex Oversized Jersey',
    silhouette: 'oversized-tee',
    colorways: [
      { id: 'white', label: 'White', hex: '#FFFFFF', garmentHex: '#FFFFFF' },
    ],
    print: {
      type: 'coordinates',
      frontPlacement: 'Center chest: Sublimation Graphic',
      backPlacement: 'Full back: Sublimation Graphic',
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    disabledSizes: [],
    fitNote: 'Wide through the chest with a pronounced dropped shoulder. Sits naturally at the hip.',
    availability: 'preorder',
    price: 599, 
    currency: 'INR',
    priceConfirmed: true, 
    fabric: {
      gsm: 240, 
      composition: '100% Combed Organic Cotton',
      weave: 'Heavy single jersey, preshrunk',
      unconfirmed: false,
    },
    care: [
      'Cold machine wash with like colors (30°C)',
      'Line dry in shade to preserve print alignment',
      'Iron inside out on low heat — avoid direct print contact',
      'Do not tumble dry or bleach',
    ],
    sizeChart: [
      { size: 'XS', chestCm: 56, lengthCm: 71, shoulderCm: 52, sleeveCm: 22 },
      { size: 'S', chestCm: 59, lengthCm: 73, shoulderCm: 54, sleeveCm: 23 },
      { size: 'M', chestCm: 62, lengthCm: 75, shoulderCm: 56, sleeveCm: 24 },
      { size: 'L', chestCm: 65, lengthCm: 77, shoulderCm: 58, sleeveCm: 25 },
      { size: 'XL', chestCm: 68, lengthCm: 79, shoulderCm: 60, sleeveCm: 26 },
      { size: 'XXL', chestCm: 71, lengthCm: 81, shoulderCm: 62, sleeveCm: 27 },
    ],
    sortOrder: 1,
    featured: true,
    description:
      'Heavyweight unisex oversized jersey engineered for comfort and modern drape. Features precise sublimation prints on the front chest and full back.',
    details: [
      '240 GSM heavy combed cotton single jersey',
      '1x1 ribbed crew neck collar with twin-needle topstitch reinforcement',
      'Dropped shoulder seam with reinforced internal tape',
      'High-fidelity Sublimation Print (Print Type 23)',
      'Internal woven neck label: "A ZenithDistrict brand"',
      'Engineered and printed to order on demand',
    ],
    productionNote:
      'Produced strictly to order via Qikink. Zero speculative warehouse inventory. Lead times reflect custom printing and individual quality check before dispatch.',
  },
  {
    slug: 'boxy-cropped-tee-blueprint',
    code: 'ZB-02',
    name: 'Boxy Cropped Tee "Blueprint"', // Working title
    silhouette: 'boxy-cropped-tee',
    colorways: [
      { id: 'sand', label: 'Sand', hex: '#D6CEBE', garmentHex: '#D6CEBE' },
      { id: 'ink', label: 'Ink', hex: '#151618', garmentHex: '#151618' },
    ],
    print: {
      type: 'blueprint',
      frontPlacement: 'Lower hem: Minimal section datum mark',
      backPlacement: 'Center back: Architectural section-line elevation drawing with dimension callouts',
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    disabledSizes: [],
    fitNote: 'Boxy, wide profile with a shortened body length that finishes squarely at the waistline.',
    availability: 'concept',
    price: 3400, // TODO: confirm with supplier
    currency: 'INR',
    priceConfirmed: false,
    fabric: {
      gsm: 260, // TODO: confirm with supplier
      composition: '100% Compact Organic Cotton', // TODO: confirm with supplier
      weave: 'Dense dry-hand jersey', // TODO: confirm with supplier
      unconfirmed: true,
    },
    care: [
      'Machine wash cold (30°C) with mild detergent',
      'Reshape while damp and dry flat',
      'Do not iron over print elements',
      'Do not dry clean',
    ],
    sizeChart: [
      // TODO: confirm with supplier
      { size: 'XS', chestCm: 55, lengthCm: 58, shoulderCm: 51, sleeveCm: 21 },
      { size: 'S', chestCm: 58, lengthCm: 60, shoulderCm: 53, sleeveCm: 22 },
      { size: 'M', chestCm: 61, lengthCm: 62, shoulderCm: 55, sleeveCm: 23 },
      { size: 'L', chestCm: 64, lengthCm: 64, shoulderCm: 57, sleeveCm: 24 },
      { size: 'XL', chestCm: 67, lengthCm: 66, shoulderCm: 59, sleeveCm: 25 },
    ],
    sortOrder: 2,
    featured: true,
    description:
      'Cut with exaggerated horizontal volume and a deliberate shortened hem. Features subtle elevation annotations at the hemline and a full dimension blueprint on the reverse.',
    details: [
      '260 GSM compact dry-hand jersey (TODO: confirm with supplier)',
      'Substantial 32mm neck ribbing',
      'Clean square hem construction without side vents',
      'Water-based soft-touch typographic discharge ink',
      'Internal woven neck label: "A ZenithDistrict brand"',
      'Manufactured strictly on-demand',
    ],
    productionNote:
      'Manufactured individually per order. Eliminates material obsolescence and excess fabric waste.',
  },
  {
    slug: 'oversized-long-sleeve-index',
    code: 'ZB-03',
    name: 'Oversized Long Sleeve "Index"', // Working title
    silhouette: 'oversized-long-sleeve',
    colorways: [
      { id: 'ink', label: 'Ink', hex: '#151618', garmentHex: '#151618' },
      { id: 'bone', label: 'Bone', hex: '#F5F2EB', garmentHex: '#F5F2EB' },
    ],
    print: {
      type: 'index',
      frontPlacement: 'Center chest: Tonal miniature catalog index mark',
      sleevePlacement: 'Left sleeve: Vertical technical vocabulary index with numbered registers',
    },
    sizes: ['S', 'M', 'L', 'XL'],
    disabledSizes: [],
    fitNote: 'Generous silhouette with dropped shoulders and extended sleeves that stack slightly at the ribbed cuff.',
    availability: 'concept',
    price: 4400, // TODO: confirm with supplier
    currency: 'INR',
    priceConfirmed: false,
    fabric: {
      gsm: 280, // TODO: confirm with supplier
      composition: '100% Heavy Organic Cotton', // TODO: confirm with supplier
      weave: 'Structured interlock jersey', // TODO: confirm with supplier
      unconfirmed: true,
    },
    care: [
      'Wash inside out at 30°C',
      'Do not use optical brighteners',
      'Dry flat away from direct heat',
      'Warm iron on reverse side',
    ],
    sizeChart: [
      // TODO: confirm with supplier
      { size: 'S', chestCm: 58, lengthCm: 74, shoulderCm: 53, sleeveCm: 64 },
      { size: 'M', chestCm: 61, lengthCm: 76, shoulderCm: 55, sleeveCm: 65 },
      { size: 'L', chestCm: 64, lengthCm: 78, shoulderCm: 57, sleeveCm: 66 },
      { size: 'XL', chestCm: 67, lengthCm: 80, shoulderCm: 59, sleeveCm: 67 },
    ],
    sortOrder: 3,
    featured: true,
    description:
      'Constructed from structured 280 GSM cotton with articulated long sleeves. Engineered with a five-register index running down the left forearm and an unobtrusive tonal identifier at the chest.',
    details: [
      '280 GSM structured interlock cotton (TODO: confirm with supplier)',
      'Heavy-gauge elastane-reinforced ribbed cuffs',
      'Continuous sleeve print running wrist-to-shoulder with zero hand-feel',
      'Twin-needle hem stitch with reinforced side split',
      'Internal woven neck label: "A ZenithDistrict brand"',
      'Print-on-demand fulfillment pipeline',
    ],
    productionNote:
      'Printed on demand to ensure zero pre-allocated warehouse stock. Finished pieces inspected before individual packaging.',
  },
  {
    slug: 'oversized-sleeveless-axis',
    code: 'ZB-04',
    name: 'Oversized Sleeveless Top "Axis"', // Working title
    silhouette: 'oversized-sleeveless',
    colorways: [
      { id: 'moss', label: 'Moss', hex: '#485244', garmentHex: '#485244' },
      { id: 'bone', label: 'Bone', hex: '#F5F2EB', garmentHex: '#F5F2EB' },
    ],
    print: {
      type: 'axis',
      backPlacement: 'Spine axis: Single 0.75pt vertical hairline datum line with terminal orientation coordinate',
    },
    sizes: ['S', 'M', 'L', 'XL'],
    disabledSizes: [],
    fitNote: 'Relaxed vest profile with generous armhole drop for layering or loose summer wear.',
    availability: 'concept',
    price: 3200, // TODO: confirm with supplier
    currency: 'INR',
    priceConfirmed: false,
    fabric: {
      gsm: 220, // TODO: confirm with supplier
      composition: '100% Combed Organic Cotton', // TODO: confirm with supplier
      weave: 'Breathable open-end jersey', // TODO: confirm with supplier
      unconfirmed: true,
    },
    care: [
      'Gentle cold wash (30°C)',
      'Do not soak or wring',
      'Line dry flat in shade',
      'Low iron, avoiding spine print',
    ],
    sizeChart: [
      // TODO: confirm with supplier
      { size: 'S', chestCm: 57, lengthCm: 72, shoulderCm: 44 },
      { size: 'M', chestCm: 60, lengthCm: 74, shoulderCm: 46 },
      { size: 'L', chestCm: 63, lengthCm: 76, shoulderCm: 48 },
      { size: 'XL', chestCm: 66, lengthCm: 78, shoulderCm: 50 },
    ],
    sortOrder: 4,
    featured: true,
    description:
      'A stripped-back sleeveless silhouette with deep dropped armholes and taped seam bindings. Marked exclusively by a solitary datum line traversing the spine.',
    details: [
      '220 GSM open-end breathable jersey (TODO: confirm with supplier)',
      'Bound collar and armholes with self-fabric tape',
      'Straight hem with side slits for natural drape',
      'Ultra-fine vertical spinal print with geographic angle annotation',
      'Internal woven neck label: "A ZenithDistrict brand"',
      'Printed to order on demand',
    ],
    productionNote:
      'Produced in individual batches on demand. Fabric and finishing verified against baseline prototypes.',
  },
];

/**
 * Accessor methods for apparel products
 */
export async function getApparelProducts(): Promise<ApparelProduct[]> {
  return [...apparelProducts].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getApparelProductBySlug(slug: string): Promise<ApparelProduct | null> {
  const item = apparelProducts.find((p) => p.slug === slug);
  return item ?? null;
}
