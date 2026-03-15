export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  image: string;
  tags: string[];
  category: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  readingTime: number;
  featured?: boolean;
  trending?: boolean;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  articleCount: number;
  featured?: boolean;
  trending?: boolean;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  slug: string;
  image: string;
  curator: Author;
  items: string[];
  itemCount: number;
  category: string;
  createdAt: string;
  featured?: boolean;
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  subcategory?: string;
  tags: string[];
  image: string;
  url: string;
  slug: string;
  rating: number;
  reviews: number;
  featured?: boolean;
  trending?: boolean;
  pricing?: 'free' | 'freemium' | 'paid';
  createdAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  sourceUrl: string;
  image?: string;
  publishedAt: string;
  category: string;
}

export interface SearchResult {
  id: string;
  title: string;
  type: 'article' | 'topic' | 'collection' | 'resource';
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
  };
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
