'use client';

import { getFeaturedResources } from '@/data/resources';
import { ResourceCard } from '@/components/resource/ResourceCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function ResourcesSection() {
  const featuredResources = getFeaturedResources(4);

  return (
    <section className="section-spacing" data-testid="resources-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          title="Tools & Resources"
          subtitle="Essential tools for productivity, development, and creativity"
          href="/tools"
          linkText="Browse all tools"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
}
