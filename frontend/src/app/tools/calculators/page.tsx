import { Metadata } from 'next';
import { resources } from '@/data/resources';
import { ResourceCard } from '@/components/resource/ResourceCard';

export const metadata: Metadata = {
  title: 'Calculators',
  description: 'Useful calculators for finance, productivity, and more.',
};

export default function CalculatorsPage() {
  const calculators = resources.filter((r) => r.category === 'Calculators');

  return (
    <div className="min-h-screen" data-testid="calculators-page">
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Calculators
          </h1>
          <p className="text-lg text-foreground-secondary">
            Handy calculators for finance, business, and everyday calculations.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {calculators.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {calculators.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="card-base p-12 text-center">
              <p className="text-foreground-secondary">
                Calculators are being developed. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
