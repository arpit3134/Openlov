import { Metadata } from 'next';
import Link from 'next/link';
import { resources, resourceCategories } from '@/data/resources';
import { ResourceCard } from '@/components/resource/ResourceCard';
import { Brain, Calculator, Zap, Code, Palette, DollarSign, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Brain, Calculator, Zap, Code, Palette, DollarSign,
};

export const metadata: Metadata = {
  title: 'Tools & Resources',
  description: 'Discover essential tools for productivity, development, design, and more.',
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen" data-testid="tools-page">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Tools & Resources
            </h1>
            <p className="text-lg text-foreground-secondary">
              Discover the best tools for productivity, development, design, and more. 
              Hand-picked and reviewed by our team.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground-muted mb-6">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {resourceCategories.map((category) => {
              const Icon = iconMap[category.icon] || Brain;
              return (
                <Link
                  key={category.slug}
                  href={`/tools/${category.slug}`}
                  className="card-base p-4 text-center group"
                  data-testid={`category-${category.slug}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-primary/10 transition-colors">
                    <Icon className="w-6 h-6 text-foreground-secondary group-hover:text-brand-primary transition-colors" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-brand-primary transition-colors">
                    {category.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Tools */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-8">
            All Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
