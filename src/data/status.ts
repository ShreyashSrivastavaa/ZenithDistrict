import { VentureStatus, StatusConfig } from './types';

export const STATUS_ORDER: VentureStatus[] = [
  'Idea',
  'Exploring',
  'Building',
  'Beta',
  'Live',
  'Venture',
];

export const STATUS_REGISTRY: Record<VentureStatus, StatusConfig> = {
  Idea: {
    label: 'Idea',
    description: 'Conceptual hypothesis recorded in the district ledger. Awaiting exploration triage.',
    dotColor: '#8B8984', // stone
  },
  Exploring: {
    label: 'Exploring',
    description: 'Active technical prototyping, feasibility stress-testing, and market alignment.',
    dotColor: '#D97706', // amber/warm
  },
  Building: {
    label: 'Building',
    description: 'In active architectural design, engineering and interface assembly.',
    dotColor: '#3882F6', // electric blue
    dotPulse: true,
  },
  Beta: {
    label: 'Beta',
    description: 'Functional build undergoing closed cohort verification and dogfooding.',
    dotColor: '#10B981', // emerald
    dotPulse: true,
  },
  Live: {
    label: 'Live',
    description: 'Publicly deployed, serving active users with ongoing maintenance.',
    dotColor: '#059669', // solid emerald
  },
  Venture: {
    label: 'Venture',
    description: 'Graduated from internal district lab into a standalone sovereign entity.',
    dotColor: '#FF4F1F', // signal orange
  },
};
