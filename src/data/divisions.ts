import { Division } from './types';

export const divisions: Division[] = [
  {
    code: 'Z-01',
    slug: 'studio',
    name: 'Studio',
    title: 'Client Practice & Engineering',
    descriptor: 'Digital products designed and engineered for ambitious teams.',
    leadParagraph:
      'The Studio is our client-service division. We partner with select founders and organizations to design, architect, and ship high-craft web systems, SaaS platforms, and AI integrations.',
    route: '/studio',
    plotCoord: 'SECTOR NW // Z-01',
    colorToken: '#3882F6',
  },
  {
    code: 'Z-02',
    slug: 'brands',
    name: 'Brands',
    title: 'Consumer Ventures & Goods',
    descriptor: 'Physical and digital consumer brands conceived and operated in-house.',
    leadParagraph:
      'The Brands division conceives, manufactures, and operates consumer offerings. We test brand narratives, modern supply chains, and direct-to-consumer distribution.',
    route: '/brands',
    plotCoord: 'SECTOR NE // Z-02',
    colorToken: '#10B981',
  },
  {
    code: 'Z-03',
    slug: 'products',
    name: 'Products',
    title: 'Software & Digital Utilities',
    descriptor: 'Independent software tools, utilities, and developer infrastructure.',
    leadParagraph:
      'The Products division builds specialized software born out of internal friction. We turn internal workflows and niche utilities into durable, focused web products.',
    route: '/products',
    plotCoord: 'SECTOR SW // Z-03',
    colorToken: '#8B5CF6',
  },
  {
    code: 'Z-04',
    slug: 'labs',
    name: 'Labs',
    title: 'R&D & Active Prototyping',
    descriptor: 'Unfiltered technical experiments and early-stage hypotheses.',
    leadParagraph:
      'The Labs division is where ideas are explored before they earn the right to become products or companies. Fast iterations, open code experiments, and transparent failures.',
    route: '/labs',
    plotCoord: 'SECTOR SE // Z-04',
    colorToken: '#FF4F1F',
  },
];
