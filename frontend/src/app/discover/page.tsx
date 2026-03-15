import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles, Flame, Bookmark, Clock } from 'lucide-react';
import { articles, getTrendingArticles } from '@/data/articles';
import { topics, getTrendingTopics } from '@/data/topics';
import { collections, getFeaturedCollections } from '@/data/collections';
import { resources, getTrendingResources } from '@/data/resources';
import { ArticleCard } from '@/components/article/ArticleCard';
import { TopicChip } from '@/components/topic/TopicChip';
import { CollectionCard } from '@/components/collection/CollectionCard';
import { ResourceCard } from '@/components/resource/ResourceCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Discover',
  description: 'Explore curated content across topics, articles, collections, and resources.',
};

export default function DiscoverPage() {
  const trendingArticles = getTrendingArticles(3);
  const trendingTopics = getTrendingTopics(8);
  const featuredCollections = getFeaturedCollections(2);
  const trendingResources = getTrendingResources(4);

  return (
    <div className="min-h-screen" data-testid="discover-page">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-brand-primary" strokeWidth={1.5} />
              <span className="text-sm font-medium text-brand-primary">Discovery Hub</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Discover
            </h1>
            <p className="text-lg text-foreground-secondary">
              Your central hub for exploring ideas, resources, and insights across all categories.
            </p>
          </div>
        </div>
      </section>

      {/* Trending Topics */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader
            title="Explore by Topic"
            subtitle="Find content organized around themes that matter to you"
            href="/topics"
          />
          <div className="flex flex-wrap gap-3">
            {trendingTopics.map((topic) => (
              <TopicChip key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Articles - Bento Grid */}
      <section className="py-16 bg-background-surface border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader
            title="Trending Now"
            subtitle="What's capturing attention this week"
            href="/trending"
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {trendingArticles[0] && (
              <div className="lg:col-span-7">
                <ArticleCard article={trendingArticles[0]} variant="featured" />
              </div>
            )}
            <div className="lg:col-span-5 space-y-6">
              {trendingArticles.slice(1, 3).map((article) => (
                <ArticleCard key={article.id} article={article} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader
            title="Featured Collections"
            subtitle="Deep dives curated by experts"
            href="/collections"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredCollections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader
            title="Popular Tools"
            subtitle="Essential resources for your workflow"
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
