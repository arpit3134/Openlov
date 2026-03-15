import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { topics, getTopicBySlug } from '@/data/topics';
import { articles, getArticlesByCategory } from '@/data/articles';
import { ArticleCard } from '@/components/article/ArticleCard';
import { Brain, Palette, Code, Cloud, BarChart3, Shield, Rocket, Globe, Smartphone, Blocks, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Brain, Palette, Code, Cloud, BarChart3, Shield, Rocket, Globe, Smartphone, Blocks,
};

export async function generateStaticParams() {
  return topics.map((topic) => ({
    slug: topic.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const topic = getTopicBySlug(params.slug);
  if (!topic) return { title: 'Topic Not Found' };
  
  return {
    title: topic.name,
    description: topic.description,
  };
}

export default function TopicDetailPage({ params }: { params: { slug: string } }) {
  const topic = getTopicBySlug(params.slug);
  
  if (!topic) {
    notFound();
  }

  const Icon = iconMap[topic.icon] || Brain;
  const relatedArticles = articles.slice(0, 6);

  return (
    <div className="min-h-screen" data-testid="topic-detail-page">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Link
            href="/topics"
            className="inline-flex items-center gap-2 text-foreground-secondary hover:text-foreground transition-colors mb-8"
            data-testid="back-to-topics"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            <span>All Topics</span>
          </Link>

          <div className="flex items-start gap-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${topic.color}20` }}
            >
              <Icon className="w-8 h-8" style={{ color: topic.color }} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                {topic.name}
              </h1>
              <p className="text-lg text-foreground-secondary max-w-2xl">
                {topic.description}
              </p>
              <p className="text-sm text-foreground-muted mt-4">
                {topic.articleCount} articles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-8">
            Latest in {topic.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
