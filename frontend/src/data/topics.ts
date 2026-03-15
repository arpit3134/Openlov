import { Topic } from '@/types';

export const topics: Topic[] = [
  {
    id: 'topic-1',
    name: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    description: 'Explore the latest developments in AI, machine learning, and intelligent systems.',
    icon: 'Brain',
    color: '#3B82F6',
    articleCount: 24,
    featured: true,
    trending: true,
  },
  {
    id: 'topic-2',
    name: 'Product Design',
    slug: 'product-design',
    description: 'Design principles, UX patterns, and creative processes for building great products.',
    icon: 'Palette',
    color: '#EC4899',
    articleCount: 18,
    featured: true,
  },
  {
    id: 'topic-3',
    name: 'Software Engineering',
    slug: 'software-engineering',
    description: 'Best practices, architecture patterns, and engineering excellence.',
    icon: 'Code',
    color: '#10B981',
    articleCount: 32,
    featured: true,
    trending: true,
  },
  {
    id: 'topic-4',
    name: 'Cloud Infrastructure',
    slug: 'cloud-infrastructure',
    description: 'Modern cloud architecture, DevOps practices, and infrastructure management.',
    icon: 'Cloud',
    color: '#6366F1',
    articleCount: 15,
    trending: true,
  },
  {
    id: 'topic-5',
    name: 'Data Science',
    slug: 'data-science',
    description: 'Analytics, data engineering, and turning data into actionable insights.',
    icon: 'BarChart3',
    color: '#F59E0B',
    articleCount: 21,
    featured: true,
  },
  {
    id: 'topic-6',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    description: 'Security best practices, threat intelligence, and protecting digital assets.',
    icon: 'Shield',
    color: '#EF4444',
    articleCount: 12,
  },
  {
    id: 'topic-7',
    name: 'Startup Strategy',
    slug: 'startup-strategy',
    description: 'Building and scaling startups, fundraising, and go-to-market strategies.',
    icon: 'Rocket',
    color: '#8B5CF6',
    articleCount: 16,
    trending: true,
  },
  {
    id: 'topic-8',
    name: 'Web Development',
    slug: 'web-development',
    description: 'Modern web technologies, frameworks, and frontend development.',
    icon: 'Globe',
    color: '#14B8A6',
    articleCount: 28,
    featured: true,
  },
  {
    id: 'topic-9',
    name: 'Mobile Development',
    slug: 'mobile-development',
    description: 'Native and cross-platform mobile app development.',
    icon: 'Smartphone',
    color: '#F97316',
    articleCount: 14,
  },
  {
    id: 'topic-10',
    name: 'Blockchain',
    slug: 'blockchain',
    description: 'Distributed ledger technology, Web3, and decentralized applications.',
    icon: 'Blocks',
    color: '#84CC16',
    articleCount: 9,
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug);
}

export function getFeaturedTopics(limit: number = 6): Topic[] {
  return topics.filter((topic) => topic.featured).slice(0, limit);
}

export function getTrendingTopics(limit: number = 4): Topic[] {
  return topics.filter((topic) => topic.trending).slice(0, limit);
}
