import { Metadata } from 'next';
import { collections } from '@/data/collections';
import { CollectionCard } from '@/components/collection/CollectionCard';

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Explore curated collections of articles and resources.',
};

export default function CollectionsPage() {
  return (
    <div className="min-h-screen" data-testid="collections-page">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Collections
            </h1>
            <p className="text-lg text-foreground-secondary">
              Curated sets of articles and resources, thoughtfully assembled around specific themes and goals.
            </p>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
