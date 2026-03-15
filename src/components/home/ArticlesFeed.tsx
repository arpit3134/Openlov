'use client';

import { articles } from '@/data/articles';
import { getLatestNews } from '@/data/news';
import { ArticleCard } from '@/components/article/ArticleCard';
import { NewsCard } from '@/components/article/NewsCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function ArticlesFeed() {
  const latestArticles = articles.slice(0, 4);
  const latestNews = getLatestNews(5);

  return (
    <section className="section-spacing bg-background-surface" data-testid="articles-feed">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Articles */}
          <div className="lg:col-span-8">
            <SectionHeader
              title="Latest Articles"
              subtitle="Fresh perspectives on technology, design, and building"
              href="/articles"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* News Sidebar */}
          <div className="lg:col-span-4">
            <SectionHeader title="Latest News" />
            <div className="card-base p-6">
              {latestNews.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
