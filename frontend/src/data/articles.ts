import { Article, Author } from '@/types';

export const authors: Author[] = [
  {
    id: 'author-1',
    name: 'Elena Vance',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    bio: 'Senior technology editor focusing on AI and emerging tech.',
    role: 'Senior Editor',
  },
  {
    id: 'author-2',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    bio: 'Tech analyst covering productivity and developer tools.',
    role: 'Tech Analyst',
  },
  {
    id: 'author-3',
    name: 'Sarah Mitchell',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    bio: 'Design and UX specialist with a passion for creative tools.',
    role: 'Design Editor',
  },
];

export const articles: Article[] = [
  {
    id: 'article-1',
    title: 'The Rise of Autonomous AI Agents in Enterprise Workflows',
    excerpt: 'How intelligent agents are reshaping business operations and what it means for the future of work.',
    content: `The landscape of enterprise technology is undergoing a fundamental shift. Autonomous AI agents—software systems capable of performing complex tasks with minimal human intervention—are moving from experimental projects to production deployments across industries.

These agents differ from traditional automation in their ability to reason, adapt, and make decisions in dynamic environments. Rather than following rigid scripts, they can interpret context, handle exceptions, and learn from outcomes.

Major technology companies have released enterprise-grade agent frameworks in the past year, making this technology accessible to organizations of all sizes. The implications for productivity, decision-making, and organizational structure are profound.`,
    author: authors[0],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    tags: ['AI', 'Enterprise', 'Automation', 'Future of Work'],
    category: 'Technology',
    slug: 'rise-of-autonomous-ai-agents',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-10',
    readingTime: 8,
    featured: true,
    trending: true,
  },
  {
    id: 'article-2',
    title: 'Building Sustainable Development Practices with Modern Tools',
    excerpt: 'A comprehensive guide to establishing development workflows that scale with your team and product.',
    content: `Sustainable development practices are the foundation of long-term product success. This article explores the tools, processes, and cultural shifts needed to build software that stands the test of time.

From continuous integration pipelines to documentation-first development, we examine the practices that leading engineering teams have adopted to maintain velocity while improving quality.`,
    author: authors[1],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop',
    tags: ['Development', 'DevOps', 'Best Practices', 'Engineering'],
    category: 'Development',
    slug: 'sustainable-development-practices',
    createdAt: '2025-01-08',
    updatedAt: '2025-01-08',
    readingTime: 12,
    featured: true,
  },
  {
    id: 'article-3',
    title: 'The Design Systems Revolution: From Components to Culture',
    excerpt: 'Why design systems have become essential infrastructure and how to build one that actually works.',
    content: `Design systems have evolved from simple component libraries to comprehensive ecosystems that define how products look, feel, and behave. The best design systems go beyond UI kits to establish shared language, principles, and processes across design and engineering teams.

This article examines what separates successful design systems from those that gather dust, drawing lessons from organizations that have made design systems a competitive advantage.`,
    author: authors[2],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop',
    tags: ['Design', 'Design Systems', 'UI/UX', 'Product'],
    category: 'Design',
    slug: 'design-systems-revolution',
    createdAt: '2025-01-06',
    updatedAt: '2025-01-06',
    readingTime: 10,
    featured: true,
    trending: true,
  },
  {
    id: 'article-4',
    title: 'Mastering API Architecture: Patterns for Scale',
    excerpt: 'Essential patterns and anti-patterns for building APIs that can handle millions of requests.',
    content: `API design is both an art and a science. As systems grow in complexity and scale, the decisions made in API architecture become increasingly consequential. This guide covers the patterns that have proven effective at scale, from versioning strategies to rate limiting approaches.`,
    author: authors[1],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
    tags: ['API', 'Architecture', 'Backend', 'Scale'],
    category: 'Development',
    slug: 'mastering-api-architecture',
    createdAt: '2025-01-04',
    updatedAt: '2025-01-04',
    readingTime: 15,
    trending: true,
  },
  {
    id: 'article-5',
    title: 'The Psychology of Product Onboarding',
    excerpt: 'Research-backed strategies for creating onboarding experiences that drive long-term engagement.',
    content: `First impressions matter enormously in product design. The onboarding experience often determines whether a user becomes a loyal customer or churns within days. This article synthesizes research from behavioral psychology and product analytics to present a framework for effective onboarding.`,
    author: authors[2],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
    tags: ['Product', 'UX', 'Psychology', 'Growth'],
    category: 'Product',
    slug: 'psychology-of-product-onboarding',
    createdAt: '2025-01-02',
    updatedAt: '2025-01-02',
    readingTime: 9,
  },
  {
    id: 'article-6',
    title: 'Edge Computing: The Next Frontier of Application Performance',
    excerpt: 'How edge deployment is changing the rules of application architecture and user experience.',
    content: `The traditional model of centralized cloud computing is giving way to distributed edge architectures. By moving computation closer to users, organizations are achieving latency improvements that seemed impossible just years ago.`,
    author: authors[0],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
    tags: ['Edge Computing', 'Performance', 'Infrastructure', 'Cloud'],
    category: 'Technology',
    slug: 'edge-computing-next-frontier',
    createdAt: '2024-12-28',
    updatedAt: '2024-12-28',
    readingTime: 11,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getFeaturedArticles(limit: number = 3): Article[] {
  return articles.filter((article) => article.featured).slice(0, limit);
}

export function getTrendingArticles(limit: number = 4): Article[] {
  return articles.filter((article) => article.trending).slice(0, limit);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((article) => article.category.toLowerCase() === category.toLowerCase());
}

export function getRelatedArticles(article: Article, limit: number = 3): Article[] {
  return articles
    .filter((a) => a.id !== article.id && (a.category === article.category || a.tags.some((tag) => article.tags.includes(tag))))
    .slice(0, limit);
}
