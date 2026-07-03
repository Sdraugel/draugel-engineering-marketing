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
  email: 'steven@draugelengineering.com',
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
    'Draugel Engineering brings more than a decade of platform and AI engineering to your team, without adding headcount.',
  primary: { label: PRIMARY_CTA.label, href: PRIMARY_CTA.href } as LinkRef,
  secondary: { label: 'View selected work', href: '#work' } as LinkRef,
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
    label: 'Direct access',
    value: 'Straight to a seasoned engineer',
    note: 'No account managers or handoffs. You work with the engineer building it.',
  },
  {
    icon: 'shield-lock',
    label: 'Clearance',
    value: 'Cleared for sensitive work',
    note: 'Active Top Secret clearance. Defense, federal, and regulated clients engage without clearance delays.',
  },
  {
    icon: 'medal',
    label: 'Veteran-owned',
    value: 'Dependable, security-minded delivery',
    note: 'A U.S. military veteran firm, eligible for veteran-owned contracting preferences.',
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
    body: 'A seasoned engineer who plugs into your team and ships.',
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
];

export const ABOUT = {
  name: IDENTITY.person,
  role: IDENTITY.role,
  paragraphs: [
    'Steven Draugel is a principal full-stack engineer and the founder of Draugel Engineering, with more than a decade of experience architecting cloud-native and AI-driven platforms that have generated eight figures in business value. A U.S. military veteran with an active Top Secret clearance, he has spent his career leading R&D teams and owning platform architecture end to end for federal agencies and national firms, from early system design through production and scale.',
    'Beyond client work, Steven builds and ships his own products, giving him a founder\'s perspective on the tradeoffs between speed, cost, and engineering quality. He holds a B.S. in Computer Science with minors in Physics and Mathematics.',
  ],
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
  body: 'Tell us about the platform you are building. We reply within a couple of days.',
  engagement: 'Project-based or retainer engagements, scoped after a free intro call.',
  emailFallback: IDENTITY.email,
} as const;

export interface Testimonial {
  quote: string;
  name: string;
  org: string;
}

// Real client testimonials, shown between Selected Work and Notable Builds.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Working with Steven was seamless. He understood exactly what I needed for my campaign website and delivered a site I\'m proud to share with voters. Responsive, thoughtful, and genuinely talented at what he does.',
    name: 'Lindsey Draugel',
    org: 'Berkeley County District 2 Candidate',
  },
  {
    quote:
      'Steven created a polished, easy to navigate site from nothing but a brief description. He handled everything, including the design, build, hosting, and it was ready in no time at all. Berkeley County parents will actually find us now, and know how to get involved.',
    name: 'Sarah Kalil',
    org: 'President and Co-Founder of Moms for Change',
  },
];
