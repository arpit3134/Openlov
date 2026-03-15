import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from 'lucide-react';
import { articles, getArticleBySlug, getRelatedArticles } from '@/data/articles';
import { ArticleCard } from '@/components/article/ArticleCard';
import { formatDate } from '@/lib/utils';

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: 'Article Not Found' };
  
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article, 3);

  return (
    <div className="min-h-screen" data-testid="article-detail-page">
      {/* Hero */}
      <section className="relative py-16 md:py-24 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-foreground-secondary hover:text-foreground transition-colors mb-8"
            data-testid="back-to-articles"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            <span>All Articles</span>
          </Link>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="tag">{article.category}</span>
            {article.trending && (
              <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-medium">
                Trending
              </span>
            )}
          </div>

          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-foreground-secondary mb-8">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-medium text-foreground">{article.author.name}</p>
                <p className="text-sm text-foreground-muted">{article.author.role}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-foreground-muted">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
                {formatDate(article.createdAt)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                {article.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="relative aspect-[2/1] rounded-2xl overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="prose prose-invert prose-lg max-w-none">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-foreground-secondary leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/5">
            {article.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-8">
            <button className="btn-secondary flex items-center gap-2" data-testid="share-button">
              <Share2 className="w-4 h-4" strokeWidth={1.5} />
              Share
            </button>
            <button className="btn-secondary flex items-center gap-2" data-testid="bookmark-button">
              <Bookmark className="w-4 h-4" strokeWidth={1.5} />
              Save
            </button>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-background-surface border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <ArticleCard key={related.id} article={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
