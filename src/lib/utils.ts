import { Tool, BlogPost } from '@/types';

export function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) {
    return 'Date not available';
  }

  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return 'Invalid date';
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getToolsByCategory(tools: Tool[], category: string): Tool[] {
  return tools.filter(tool => 
    tool.category.toLowerCase() === category.toLowerCase()
  );
}

export function filterTools(
  tools: Tool[],
  query: string,
  category?: string
): Tool[] {
  let filtered = tools;

  if (query) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(tool =>
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  if (category) {
    filtered = filtered.filter(tool =>
      tool.category.toLowerCase() === category.toLowerCase()
    );
  }

  return filtered;
}

export function getTrendingTools(tools: Tool[], limit: number = 10): Tool[] {
  return [...tools]
    .filter(tool => tool.trending)
    .sort((a, b) => b.visits - a.visits)
    .slice(0, limit);
}

export function getFeaturedTools(tools: Tool[], limit: number = 6): Tool[] {
  return tools.filter(tool => tool.featured).slice(0, limit);
}

export function getRelatedBlogPosts(
  posts: BlogPost[],
  tags: string[],
  exclude: string,
  limit: number = 3
): BlogPost[] {
  return posts
    .filter(post => post.id !== exclude && post.tags.some(tag => tags.includes(tag)))
    .slice(0, limit);
}

export function getTopTools(tools: Tool[], limit: number = 5): Tool[] {
  return [...tools]
    .sort((a, b) => {
      const scoreA = (a.rating * a.reviews) + a.visits;
      const scoreB = (b.rating * b.reviews) + b.visits;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}
