import { SiteConfig, NavItem } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Signal',
  description: 'Discover curated articles, topics, and resources. Your intelligent content discovery platform.',
  url: 'https://signal.app',
  image: '/logo.png',
  author: 'Signal Team',
  contact: {
    email: 'hello@signal.app',
  },
  social: {
    twitter: 'https://twitter.com/signal',
    linkedin: 'https://linkedin.com/company/signal',
    github: 'https://github.com/signal',
  },
};

export const navItems: NavItem[] = [
  { label: 'Discover', href: '/discover' },
  { label: 'Topics', href: '/topics' },
  { label: 'Collections', href: '/collections' },
  { label: 'Articles', href: '/articles' },
  {
    label: 'Tools',
    href: '/tools',
    children: [
      { label: 'AI Tools', href: '/tools/ai' },
      { label: 'Calculators', href: '/tools/calculators' },
      { label: 'Productivity', href: '/tools/productivity' },
      { label: 'Developer Tools', href: '/tools/developer' },
      { label: 'Design Tools', href: '/tools/design' },
      { label: 'Finance Tools', href: '/tools/finance' },
    ],
  },
  { label: 'Trending', href: '/trending' },
];

export const footerLinks = {
  Explore: [
    { label: 'Discover', href: '/discover' },
    { label: 'Topics', href: '/topics' },
    { label: 'Collections', href: '/collections' },
    { label: 'Articles', href: '/articles' },
    { label: 'Tools', href: '/tools' },
  ],
  Resources: [
    { label: 'AI Tools', href: '/tools/ai' },
    { label: 'Calculators', href: '/tools/calculators' },
    { label: 'Developer Tools', href: '/tools/developer' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};
