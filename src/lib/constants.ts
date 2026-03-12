export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://openlov.com';
export const SITE_NAME = 'Openlov';
export const SITE_DESCRIPTION = 'Discover the best AI tools and resources';

export const CATEGORIES = [
  { id: '1', name: 'Text Generation', slug: 'text-generation', icon: '✍️' },
  { id: '2', name: 'Image Generation', slug: 'image-generation', icon: '🎨' },
  { id: '3', name: 'Code Assistant', slug: 'code-assistant', icon: '💻' },
  { id: '4', name: 'Video Tools', slug: 'video-tools', icon: '🎬' },
  { id: '5', name: 'Audio Tools', slug: 'audio-tools', icon: '🎵' },
  { id: '6', name: 'Productivity', slug: 'productivity', icon: '⚡' },
  { id: '7', name: 'Analytics', slug: 'analytics', icon: '📊' },
  { id: '8', name: 'Content Creation', slug: 'content-creation', icon: '📝' },
];

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/openlov',
  linkedin: 'https://linkedin.com/company/openlov',
  github: 'https://github.com/openlov',
  email: 'hello@openlov.com',
};

export const ITEMS_PER_PAGE = 12;
export const BLOG_ITEMS_PER_PAGE = 9;
