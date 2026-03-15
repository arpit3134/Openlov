import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { getTrendingArticles } from '@/data/articles';
import { getTrendingTopics } from '@/data/topics';
import { getTrendingResources } from '@/data/resources';
import { ArticleCard } from '@/components/article/ArticleCard';
import { TopicChip } from '@/components/topic/TopicChip';
import { ResourceCard } from '@/components/resource/ResourceCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Trending',
  description: 'See what\'s trending across articles, topics, and resources.',
};

export default function TrendingPage() {
  const trendingArticles = getTrendingArticles(6);
  const trendingTopics = getTrendingTopics(8);
  const trendingResources = getTrendingResources(4);

  return (
    <div className="min-h-screen" data-testid="trending-page">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
              <Flame className="w-4 h-4 text-orange-500" strokeWidth={1.5} />
              <span className="text-sm font-medium text-orange-400">What's Hot</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Trending
            </h1>
            <p className="text-lg text-foreground-secondary">
              Discover what's capturing attention right now across our platform.
            </p>
          </div>
        </div>
      </section>

      {/* Trending Topics */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader
            title="Trending Topics"
            subtitle="Popular topics this week"
          />
          <div className="flex flex-wrap gap-3">
            {trendingTopics.map((topic) => (
              <TopicChip key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Articles */}
      <section className="py-16 bg-background-surface border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader
            title="Trending Articles"
            subtitle="Most read articles this week"
            href="/articles"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Resources */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader
            title="Trending Tools"
            subtitle="Most popular tools this week"
            href="/tools"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
