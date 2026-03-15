import { Metadata } from 'next';
import { resources } from '@/data/resources';
import { ResourceCard } from '@/components/resource/ResourceCard';

export const metadata: Metadata = {
  title: 'Design Tools',
  description: 'Tools for designers and creative professionals.',
};

export default function DesignToolsPage() {
  const designTools = resources.filter((r) => r.category === 'Design Tools');

  return (
    <div className="min-h-screen" data-testid="design-tools-page">
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Design Tools
          </h1>
          <p className="text-lg text-foreground-secondary">
            Creative tools for designers and visual thinkers.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {designTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {designTools.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="card-base p-12 text-center">
              <p className="text-foreground-secondary">
                Design tools are being curated. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
