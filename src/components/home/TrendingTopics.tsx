'use client';

import { getTrendingTopics, topics } from '@/data/topics';
import { TopicChip } from '@/components/topic/TopicChip';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function TrendingTopics() {
  const trendingTopics = getTrendingTopics(4);
  const featuredTopics = topics.filter((t) => t.featured).slice(0, 6);

  return (
    <section className="section-spacing bg-background-surface" data-testid="trending-topics">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          title="Trending Topics"
          subtitle="Explore what's capturing attention right now"
          href="/topics"
          linkText="All topics"
        />

        {/* Trending Pills */}
        <div className="flex flex-wrap gap-3 mb-12">
          {trendingTopics.map((topic) => (
            <TopicChip key={topic.id} topic={topic} />
          ))}
        </div>

        {/* Topic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTopics.map((topic) => (
            <TopicChip key={topic.id} topic={topic} variant="large" />
          ))}
        </div>
      </div>
    </section>
  );
}
