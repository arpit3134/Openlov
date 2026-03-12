export interface Tool {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  tags: string[];
  image: string;
  rating: number;
  reviews: number;
  visits: number;
  url: string;
  featured: boolean;
  trending: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  tags: string[];
  category: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  readingTime: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  count: number;
}

export interface SearchResult {
  id: string;
  title: string;
  type: 'tool' | 'blog' | 'category';
  description: string;
  url: string;
  image?: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  image: string;
  author: string;
  contact: {
    email: string;
    phone: string;
  };
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}
