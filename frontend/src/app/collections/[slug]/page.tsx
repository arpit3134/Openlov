import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Folder } from 'lucide-react';
import { collections, getCollectionBySlug } from '@/data/collections';
import { articles } from '@/data/articles';
import { ArticleCard } from '@/components/article/ArticleCard';

export async function generateStaticParams() {
  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) return { title: 'Collection Not Found' };
  
  return {
    title: collection.title,
    description: collection.description,
  };
}

export default function CollectionDetailPage({ params }: { params: { slug: string } }) {
  const collection = getCollectionBySlug(params.slug);
  
  if (!collection) {
    notFound();
  }

  // Get articles for this collection
  const collectionArticles = articles.filter((a) => collection.items.includes(a.id));

  return (
    <div className="min-h-screen" data-testid="collection-detail-page">
      {/* Hero */}
      <section className="relative py-16 md:py-24 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src={collection.image}
            alt={collection.title}
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-foreground-secondary hover:text-foreground transition-colors mb-8"
            data-testid="back-to-collections"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            <span>All Collections</span>
          </Link>

          <span className="tag mb-4">{collection.category}</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            {collection.title}
          </h1>
          <p className="text-lg text-foreground-secondary max-w-2xl mb-6">
            {collection.description}
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Image
                src={collection.curator.avatar}
                alt={collection.curator.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-foreground">{collection.curator.name}</p>
                <p className="text-xs text-foreground-muted">{collection.curator.role}</p>
              </div>
            </div>
            <span className="text-foreground-muted">•</span>
            <div className="flex items-center gap-2 text-foreground-muted">
              <Folder className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm">{collection.itemCount} items</span>
            </div>
          </div>
        </div>
      </section>

      {/* Items */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-8">
            In This Collection
          </h2>
          {collectionArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collectionArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="card-base p-12 text-center">
              <p className="text-foreground-secondary">
                Content for this collection is being curated. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
