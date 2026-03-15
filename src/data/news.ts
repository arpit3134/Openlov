import { NewsItem } from '@/types';

export const news: NewsItem[] = [
  {
    id: 'news-1',
    title: 'OpenAI Announces Major Model Updates with Enhanced Reasoning',
    excerpt: 'The latest iteration brings significant improvements to complex problem-solving and reduced hallucinations.',
    source: 'TechCrunch',
    sourceUrl: 'https://techcrunch.com',
    publishedAt: '2025-01-12',
    category: 'AI',
  },
  {
    id: 'news-2',
    title: 'GitHub Reports 50% Increase in AI-Assisted Code Commits',
    excerpt: 'Developer productivity metrics show accelerating adoption of AI coding tools across all experience levels.',
    source: 'The Verge',
    sourceUrl: 'https://theverge.com',
    publishedAt: '2025-01-11',
    category: 'Development',
  },
  {
    id: 'news-3',
    title: 'European Union Finalizes AI Governance Framework',
    excerpt: 'New regulations establish clear guidelines for AI deployment in high-risk applications.',
    source: 'Wired',
    sourceUrl: 'https://wired.com',
    publishedAt: '2025-01-10',
    category: 'Policy',
  },
  {
    id: 'news-4',
    title: 'Figma Introduces AI-Powered Design Suggestions',
    excerpt: 'New features leverage machine learning to accelerate design workflows and maintain consistency.',
    source: 'Fast Company',
    sourceUrl: 'https://fastcompany.com',
    publishedAt: '2025-01-09',
    category: 'Design',
  },
  {
    id: 'news-5',
    title: 'Cloud Computing Market Projected to Reach $1.5T by 2028',
    excerpt: 'Enterprise adoption of multi-cloud strategies drives unprecedented growth in infrastructure spending.',
    source: 'Bloomberg',
    sourceUrl: 'https://bloomberg.com',
    publishedAt: '2025-01-08',
    category: 'Business',
  },
];

export function getLatestNews(limit: number = 5): NewsItem[] {
  return news.slice(0, limit);
}
