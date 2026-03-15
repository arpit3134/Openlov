'use client';

import { getFeaturedArticles } from '@/data/articles';
import { ArticleCard } from '@/components/article/ArticleCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function FeaturedStories() {
  const featuredArticles = getFeaturedArticles(3);

  return (
    <section className="section-spacing" data-testid="featured-stories">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          title="Featured Stories"
          subtitle="Hand-picked articles from our editorial team"
          href="/articles"
          linkText="All articles"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Large Feature */}
          {featuredArticles[0] && (
            <div className="lg:col-span-8">
              <ArticleCard article={featuredArticles[0]} variant="featured" />
            </div>
          )}

          {/* Side Stack */}
          <div className="lg:col-span-4 space-y-6">
            {featuredArticles.slice(1, 3).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
