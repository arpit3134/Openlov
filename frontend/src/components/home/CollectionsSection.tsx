'use client';

import { getFeaturedCollections } from '@/data/collections';
import { CollectionCard } from '@/components/collection/CollectionCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function CollectionsSection() {
  const featuredCollections = getFeaturedCollections(3);

  return (
    <section className="section-spacing" data-testid="collections-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          title="Curated Collections"
          subtitle="Deep dives and comprehensive guides assembled by experts"
          href="/collections"
          linkText="All collections"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredCollections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              variant={index === 0 ? 'featured' : 'default'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
