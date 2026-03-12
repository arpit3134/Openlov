import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Openlov',
  description: 'Discover the best AI tools and resources for your projects',
  url: 'https://openlov.com',
  image: '/logo.png',
  author: 'Openlov Team',
  contact: {
    email: 'hello@openlov.com',
    phone: '+1 (555) 123-4567',
  },
  social: {
    twitter: 'https://twitter.com/openlov',
    linkedin: 'https://linkedin.com/company/openlov',
    github: 'https://github.com/openlov',
  },
};

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Tools', href: '/tools' },
  { label: 'Blog', href: '/blog' },
  { label: 'Categories', href: '/categories' },
  { label: 'Trending', href: '/trending' },
  { label: 'Submit Tool', href: '/submit-tool' },
];

export const footerLinks = {
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
};
