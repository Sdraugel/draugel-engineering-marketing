/**
 * Single source of truth for page content. Every string is drawn from the brief.
 * Date ranges use the word "to". No em-dashes or en-dashes anywhere.
 *
 * Framing: a work-led engineering firm and portfolio, not a resume. One prior
 * employer is intentionally never named; that work is reattributed to
 * "a proptech and senior-living analytics company".
 */

export interface LinkRef {
  label: string;
  href: string;
}

export const IDENTITY = {
  firm: 'Draugel Engineering, LLC',
  firmShort: 'Draugel Engineering',
  person: 'Steven Draugel',
  role: 'Founder and Principal Full-Stack Engineer',
  location: 'Charleston, South Carolina',
  email: 'sdraugel@gmail.com',
  linkedin: { label: 'linkedin.com/in/stevendraugel', href: 'https://www.linkedin.com/in/stevendraugel' } as LinkRef,
  github: { label: 'github.com/Sdraugel', href: 'https://github.com/Sdraugel' } as LinkRef,
  resume: 'steven-draugel-resume.pdf',
} as const;

export const NAV_LINKS: LinkRef[] = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
];

// The single primary call to action for the whole page.
export const PRIMARY_CTA = { label: 'Book a 30-minute call', navLabel: 'Book a call', href: '#contact' } as const;

export const HERO = {
  eyebrow: 'Draugel Engineering, LLC',
  accentWord: 'AI-driven',
  headlineTail: ' platforms,',
  headlineLine2: 'engineered to last.',
  subtext:
    'Draugel Engineering gives you principal-level platform and AI engineering, without adding headcount.',
  primary: { label: PRIMARY_CTA.label, href: PRIMARY_CTA.href } as LinkRef,
  secondary: { label: 'View selected work', href: '#work' } as LinkRef,
  proofImage: 'work-moms-for-change.png',
  proofAlt: 'Moms for Change, a civic platform designed and built by Draugel Engineering in Angular and Tailwind.',
  proofCaption: 'Moms for Change, built in Angular and Tailwind.',
} as const;

export interface Credential {
  icon: string;
  label: string;
  value: string;
  note: string;
}

export const CREDENTIALS: Credential[] = [
  {
    icon: 'briefcase',
    label: 'Practice',
    value: 'Founder, principal engineer',
    note: '10-plus years architecting AI-driven, cloud-native platforms.',
  },
  {
    icon: 'shield-lock',
    label: 'Clearance',
    value: 'Active Top Secret',
    note: 'Cleared for federal and contracting-adjacent work.',
  },
  {
    icon: 'medal',
    label: 'Service',
    value: 'U.S. military veteran',
    note: 'Security-minded delivery, end to end.',
  },
];

export interface Service {
  icon: string;
  title: string;
  body: string;
}

export const SERVICES: Service[] = [
  {
    icon: 'sitemap',
    title: 'Platform architecture',
    body: 'System design for AI-driven, cloud-native platforms, from data model to delivery.',
  },
  {
    icon: 'cpu',
    title: 'AI and LLM integration',
    body: 'Multi-provider LLM gateways and AI features wired into production systems.',
  },
  {
    icon: 'code',
    title: 'Build and staff augmentation',
    body: 'Principal-level engineering that plugs into your team and ships.',
  },
  {
    icon: 'list-search',
    title: 'Technical due diligence',
    body: 'Architecture, code, and risk review for investors and founders.',
  },
];

export interface WorkItem {
  name: string;
  org: string;
  role: string;
  status?: string;
  summary: string;
  outcome: string;
  tags: string[];
  link: LinkRef;
  image: string;
  imageAlt: string;
}

export const CLIENT_WORK: WorkItem[] = [
  {
    name: 'Moms for Change',
    org: 'momsforchangesc.org',
    role: 'Design and build',
    summary: 'A grassroots civic platform built in Angular and Tailwind.',
    outcome: 'Holds Berkeley County schools accountable to the families they serve.',
    tags: ['Angular', 'Tailwind CSS', 'Civic'],
    link: { label: 'Visit site', href: 'https://momsforchangesc.org' },
    image: 'work-moms-for-change.png',
    imageAlt: 'Moms for Change website hero, a Berkeley County school accountability civic platform.',
  },
  {
    name: 'Draugel for District 2',
    org: 'draugelfordistrict2.com',
    role: 'Design and build',
    summary: 'A school board campaign site built in Angular and Tailwind.',
    outcome: 'Gave a Charleston-area school board race a clear, credible home online.',
    tags: ['Angular', 'Tailwind CSS', 'Civic'],
    link: { label: 'Visit site', href: 'https://draugelfordistrict2.com' },
    image: 'work-draugel-district2.png',
    imageAlt: 'Draugel for District 2 school board campaign website hero.',
  },
];

export const FOUNDER_PRODUCT: WorkItem = {
  name: 'Finwatch',
  org: 'Lowcountry Investing, LLC',
  role: 'Founder, product and engineering',
  status: 'Coming soon, in private development',
  summary: 'Automated crypto trading for Kraken and Coinbase. Grid-trading bots with paper and live modes.',
  outcome: 'You keep custody of your funds and pay only on realized profit.',
  tags: ['Kraken', 'Coinbase', 'Grid bots', 'Paper and live'],
  link: { label: 'Visit the marketing site', href: 'https://sdraugel.github.io/lci-marketing/' },
  image: 'work-finwatch.png',
  imageAlt: 'Finwatch marketing site showing the automated crypto trading product for Kraken and Coinbase.',
};

export interface Build {
  title: string;
  context: string;
  body: string;
}

export const BUILDS: Build[] = [
  {
    title: 'AI-driven senior-living investment platform',
    context: 'Proptech and senior-living analytics',
    body: 'Architected an AI-driven senior-living investment platform and a companion product, a multi-provider LLM gateway, and a schema-driven Angular UI system. Built the platforms behind two new revenue lines that drove the company to its first profitable year in five years, roughly $10M net.',
  },
  {
    title: 'Decision-support and CPIC platforms for federal agencies',
    context: 'Booz Allen Hamilton',
    body: 'Built the Decision Assistant AI product and the Folio CPIC platform serving 17-plus federal agencies, plus the IT Collect ACRAPI that secured $500K in GSA funding.',
  },
  {
    title: 'AI facial-recognition billing system',
    context: 'Blackbaud Labs',
    body: 'Designed an AI facial-recognition billing system, applying computer vision to automate reconciliation.',
  },
  {
    title: 'Journey to a Black Hole',
    context: 'College of Charleston, NSF-funded',
    body: 'An NSF-funded iOS app with a novel real-time gravitational-lensing engine.',
  },
];

export interface BackgroundOrg {
  org: string;
  note: string;
}

export const ABOUT = {
  name: IDENTITY.person,
  role: IDENTITY.role,
  paragraphs: [
    'Steven Draugel is a TS-cleared principal full-stack engineer and the founder of Draugel Engineering, with 10-plus years architecting AI-driven, cloud-native platforms across .NET, Angular, React, and Azure.',
    'A U.S. military veteran with an active Top Secret clearance, he has mentored five engineers who were all hired, and holds a B.S. in Computer Science from the College of Charleston with minors in Physics and Mathematics.',
  ],
  background: [
    { org: 'A senior-living analytics company', note: 'Principal Engineer' },
    { org: 'Booz Allen Hamilton', note: 'Lead Full-Stack Engineer' },
    { org: 'Blackbaud', note: 'Staff Software Engineer' },
    { org: 'Michelin', note: 'Mobile and Web Developer' },
  ] as BackgroundOrg[],
} as const;

export const SKILLS = {
  label: 'Working across',
  items: [
    'C# / .NET',
    'Angular / TypeScript',
    'React',
    'Java / Spring',
    'Python',
    'PostgreSQL',
    'Azure',
    'AWS',
    'Docker',
    'Terraform',
    'Bicep',
    'CI/CD',
    'AI / LLM integration',
  ],
} as const;

export const CONTACT = {
  headline: 'Book a call, or send a note.',
  body: 'Tell me about the platform you are building. I reply within a couple of days.',
  emailFallback: IDENTITY.email,
} as const;
