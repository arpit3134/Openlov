import { BlogPost } from "@/types";

export const blogs: BlogPost[] = [
  {
    id: '1',
    title: 'Mera Pehla AI Blog',
    slug: 'mera-pehla-ai-blog',
    excerpt: 'AI ki duniya mein aapka swagat hai...',
    content: 'AI ki duniya mein aapka swagat hai. Yeh blog AI ke basics aur future ke baare mein hai.',
    author: 'Arpit',
    image: '/images/blog/ai-intro.jpg',
    tags: ['AI', 'Technology'],
    category: 'AI News',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
    readingTime: 2
  },
  {
    id: '2',
    title: 'Top 10 AI Tools for 2024',
    slug: 'top-10-ai-tools-2024',
    excerpt: 'Discover the most powerful AI tools that are transforming how we work and create.',
    content: 'In this comprehensive guide, we explore the top AI tools that are making waves in 2024.',
    author: 'Arpit',
    image: '/images/blog/ai-tools.jpg',
    tags: ['AI Tools', 'Productivity'],
    category: 'AI Tools',
    createdAt: '2024-03-10',
    updatedAt: '2024-03-10',
    readingTime: 5
  },
  {
    id: '3',
    title: 'Understanding Machine Learning Basics',
    slug: 'understanding-machine-learning-basics',
    excerpt: 'A beginner-friendly introduction to machine learning concepts and applications.',
    content: 'Machine learning is a subset of artificial intelligence that enables systems to learn from data.',
    author: 'Arpit',
    image: '/images/blog/ml-basics.jpg',
    tags: ['Machine Learning', 'Education'],
    category: 'Tutorials',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
    readingTime: 8
  }
];
