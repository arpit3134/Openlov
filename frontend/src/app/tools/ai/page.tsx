import { Metadata } from 'next';
import { resources, getResourcesByCategory } from '@/data/resources';
import { ResourceCard } from '@/components/resource/ResourceCard';

export const metadata: Metadata = {
  title: 'AI Tools',
  description: 'Discover the best AI tools and assistants.',
};

export default function AIToolsPage() {
  const aiTools = resources.filter((r) => r.category === 'AI Tools');

  return (
    <div className="min-h-screen" data-testid="ai-tools-page">
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            AI Tools
          </h1>
          <p className="text-lg text-foreground-secondary">
            Explore cutting-edge AI tools and assistants for your work.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {aiTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiTools.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="card-base p-12 text-center">
              <p className="text-foreground-secondary">
                AI tools are being curated. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
