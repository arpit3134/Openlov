import { Metadata } from 'next';
import { articles } from '@/data/articles';
import { ArticleCard } from '@/components/article/ArticleCard';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Browse all articles on technology, design, development, and more.',
};

export default function ArticlesPage() {
  return (
    <div className="min-h-screen" data-testid="articles-page">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Articles
            </h1>
            <p className="text-lg text-foreground-secondary">
              In-depth analysis, tutorials, and insights from industry experts and thought leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
