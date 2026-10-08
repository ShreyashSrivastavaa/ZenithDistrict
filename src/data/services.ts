import { ServiceItem, ServiceProcessStep, EngagementModel } from './types';

export const studioServices: ServiceItem[] = [
  {
    id: 'web-dev',
    number: '01',
    title: 'Full-stack & Web Development',
    shortDesc: 'Production-grade web applications engineered with modern Next.js and TypeScript architectures.',
    deliverables: [
      'Server-driven App Router architectures',
      'Design systems and component libraries',
      'Responsive, accessible, fluid interfaces',
      'End-to-end performance and Core Web Vitals optimization',
    ],
    outcomes: 'Fast, resilient digital surfaces that load instantly and scale predictably.',
  },
  {
    id: 'saas-dev',
    number: '02',
    title: 'SaaS Architecture & Development',
    shortDesc: 'Multi-tenant cloud applications, subscriber workflows, billing integration, and authentication.',
    deliverables: [
      'Role-based access control and tenant isolation',
      'Stripe/LemonSqueezy subscription plumbing',
      'Background task workers and event queues',
      'Self-serve onboarding flows and settings dashboards',
    ],
    outcomes: 'Turnkey software products ready for customer activation from day one.',
  },
  {
    id: 'ai-integrations',
    number: '03',
    title: 'AI Integrations & Workflows',
    shortDesc: 'Pragmatic LLM features, structured extraction pipelines, semantic retrieval, and agentic workflows.',
    deliverables: [
      'Function calling and structured schema generation',
      'Vector indexing and hybrid lexical-semantic search',
      'Cost-controlled token caching and prompt engineering',
      'Streaming user interfaces with fallback states',
    ],
    outcomes: 'Useful, reliable AI capabilities embedded directly where users actually need them.',
  },
  {
    id: 'backend-api',
    number: '04',
    title: 'Backend & API Engineering',
    shortDesc: 'Type-safe endpoints, relational database modeling, caching tiers, and third-party integrations.',
    deliverables: [
      'PostgreSQL schema design and index tuning',
      'RESTful & GraphQL API contracts with Zod validation',
      'Edge workers and serverless microservices',
      'Webhook ingest engines and idempotent queues',
    ],
    outcomes: 'Rock-solid data foundations designed to handle unexpected spikes without downtime.',
  },
  {
    id: 'ecommerce',
    number: '05',
    title: 'E-commerce & Store Architecture',
    shortDesc: 'Custom storefronts, headless commerce integrations, cart mechanics, and checkout reliability.',
    deliverables: [
      'Shopify Storefront API and headless implementations',
      'Cart state orchestration and inventory sync',
      'Dynamic product customizers and configuration previews',
      'High-conversion checkout redirection and webhooks',
    ],
    outcomes: 'Bespoke shopping experiences unconstrained by off-the-shelf theme limitations.',
  },
  {
    id: 'automation-consulting',
    number: '06',
    title: 'Automation & Technical Consulting',
    shortDesc: 'System audits, refactoring strategies, CI/CD pipeline automation, and tech stack evaluation.',
    deliverables: [
      'Codebase health audits and dependency de-bloating',
      'Automated deployment pipelines and linting gates',
      'Architectural blueprints for pre-seed and seed teams',
      'Migration roadmaps for legacy frontends',
    ],
    outcomes: 'Clarity on technical debt, reduced cloud overhead, and accelerated team velocity.',
  },
];

export const processSteps: ServiceProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    description: 'We define the problem boundaries, data schema requirements, and essential MVP constraints.',
    duration: 'Week 1',
  },
  {
    step: '02',
    title: 'Design',
    description: 'We assemble architectural blueprints, data models, and high-fidelity typographic interfaces.',
    duration: 'Week 2',
  },
  {
    step: '03',
    title: 'Build',
    description: 'We write clean, strictly-typed code with continuous preview deployments and strict verification.',
    duration: 'Weeks 3–6',
  },
  {
    step: '04',
    title: 'Operate',
    description: 'We monitor production traffic, tune queries, and ship iterative enhancements as metrics warrant.',
    duration: 'Ongoing',
  },
];

export const engagementModels: EngagementModel[] = [
  {
    title: 'Project Engagement',
    tagline: 'Defined scope. Fixed milestones.',
    description:
      'Ideal for standalone MVPs, greenfield applications, or major architectural rebuilds with clear deliverables.',
    bestFor: 'Founders building a flagship V1 or companies launching a dedicated initiative.',
  },
  {
    title: 'Engineering Sprints',
    tagline: 'Dedicated monthly velocity.',
    description:
      'Continuous design and engineering bandwidth integrated into your roadmap on an agile, milestone-driven basis.',
    bestFor: 'Growing teams requiring senior full-stack execution without the hiring lag.',
  },
  {
    title: 'Technical Partnership',
    tagline: 'Architecture to launch.',
    description:
      'Deep collaboration where we act as the primary engineering and design division from whiteboard through launch.',
    bestFor: 'Early-stage ventures seeking cohesive technical leadership and craft.',
  },
];

export const techStackCompetencies = [
  'TypeScript',
  'Next.js (App Router)',
  'React 19',
  'Node.js',
  'PostgreSQL',
  'Prisma / Drizzle',
  'Tailwind CSS',
  'Motion',
  'Redis',
  'Cloudflare Workers',
  'Zod',
  'Docker',
  'Python',
  'Git / GitHub Actions',
];
