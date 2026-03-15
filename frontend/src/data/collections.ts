import { Collection } from '@/types';
import { authors } from './articles';

export const collections: Collection[] = [
  {
    id: 'collection-1',
    title: 'AI Engineering Essentials',
    description: 'A curated guide to building production-ready AI systems. From model selection to deployment strategies.',
    slug: 'ai-engineering-essentials',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    curator: authors[0],
    items: ['article-1', 'article-4'],
    itemCount: 12,
    category: 'Technology',
    createdAt: '2025-01-05',
    featured: true,
  },
  {
    id: 'collection-2',
    title: 'Modern Frontend Architecture',
    description: 'Best practices for building scalable, maintainable frontend applications with modern tools.',
    slug: 'modern-frontend-architecture',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    curator: authors[1],
    items: ['article-2'],
    itemCount: 8,
    category: 'Development',
    createdAt: '2025-01-03',
    featured: true,
  },
  {
    id: 'collection-3',
    title: 'Design Leadership',
    description: 'Resources for design managers and leaders building high-performing creative teams.',
    slug: 'design-leadership',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop',
    curator: authors[2],
    items: ['article-3', 'article-5'],
    itemCount: 10,
    category: 'Design',
    createdAt: '2024-12-28',
    featured: true,
  },
  {
    id: 'collection-4',
    title: 'Platform Engineering Guide',
    description: 'Building internal developer platforms that accelerate product delivery.',
    slug: 'platform-engineering-guide',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
    curator: authors[1],
    items: ['article-6'],
    itemCount: 6,
    category: 'Infrastructure',
    createdAt: '2024-12-20',
  },
  {
    id: 'collection-5',
    title: 'Startup Playbook',
    description: 'Essential strategies and frameworks for founders building venture-scale companies.',
    slug: 'startup-playbook',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=500&fit=crop',
    curator: authors[0],
    items: [],
    itemCount: 15,
    category: 'Business',
    createdAt: '2024-12-15',
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((collection) => collection.slug === slug);
}

export function getFeaturedCollections(limit: number = 3): Collection[] {
  return collections.filter((collection) => collection.featured).slice(0, limit);
}
