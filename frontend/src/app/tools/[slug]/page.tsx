import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Star, Tag } from 'lucide-react';
import { resources, getResourceBySlug } from '@/data/resources';
import { Button } from '@/components/ui/Button';

export async function generateStaticParams() {
  return resources.map((resource) => ({
    slug: resource.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resource = getResourceBySlug(params.slug);
  if (!resource) return { title: 'Resource Not Found' };
  
  return {
    title: resource.name,
    description: resource.description,
  };
}

export default function ResourceDetailPage({ params }: { params: { slug: string } }) {
  const resource = getResourceBySlug(params.slug);
  
  if (!resource) {
    notFound();
  }

  const isExternal = resource.url.startsWith('http');

  return (
    <div className="min-h-screen" data-testid="resource-detail-page">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-foreground-secondary hover:text-foreground transition-colors mb-8"
            data-testid="back-to-tools"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            <span>All Tools</span>
          </Link>

          <div className="flex items-start gap-6">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
              <Image
                src={resource.image}
                alt={resource.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="tag">{resource.category}</span>
                {resource.pricing && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    resource.pricing === 'free' ? 'bg-green-500/20 text-green-400' :
                    resource.pricing === 'freemium' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {resource.pricing}
                  </span>
                )}
                {resource.trending && (
                  <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-medium">
                    Trending
                  </span>
                )}
              </div>
              
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                {resource.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium text-foreground">{resource.rating}</span>
                  <span className="text-foreground-muted">({resource.reviews} reviews)</span>
                </div>
              </div>
              
              {isExternal && (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                  data-testid="visit-website"
                >
                  Visit Website
                  <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                About
              </h2>
              <p className="text-foreground-secondary leading-relaxed mb-8">
                {resource.description}
              </p>

              {/* Featured Image */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
                <Image
                  src={resource.image}
                  alt={resource.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="card-base p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Details</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-xs text-foreground-muted uppercase tracking-wider mb-1">Category</dt>
                    <dd className="text-foreground">{resource.category}</dd>
                  </div>
                  {resource.subcategory && (
                    <div>
                      <dt className="text-xs text-foreground-muted uppercase tracking-wider mb-1">Subcategory</dt>
                      <dd className="text-foreground">{resource.subcategory}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-xs text-foreground-muted uppercase tracking-wider mb-1">Pricing</dt>
                    <dd className="text-foreground capitalize">{resource.pricing}</dd>
                  </div>
                </dl>
              </div>

              <div className="card-base p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
