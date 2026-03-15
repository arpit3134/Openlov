import { Metadata } from 'next';
import Image from 'next/image';
import { Target, Users, Lightbulb, Heart } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Signal and our mission to help you discover quality content.',
};

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Curated Quality',
      description: 'Every piece of content is hand-picked and reviewed by our editorial team.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We build for curious minds, builders, and lifelong learners.',
    },
    {
      icon: Lightbulb,
      title: 'Actionable Insights',
      description: 'Content that informs decisions and inspires action.',
    },
    {
      icon: Heart,
      title: 'Thoughtful Design',
      description: 'An experience crafted with care for readers and explorers.',
    },
  ];

  return (
    <div className="min-h-screen" data-testid="about-page">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              About {siteConfig.name}
            </h1>
            <p className="text-xl text-foreground-secondary leading-relaxed">
              We're building a smarter way to discover quality content. {siteConfig.name} is an 
              intelligent content discovery platform that helps you find articles, resources, 
              and tools that matter.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-background-surface border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-semibold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-foreground-secondary leading-relaxed mb-4">
                In an age of information overload, finding quality content is harder than ever. 
                We believe everyone deserves access to thoughtfully curated knowledge.
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                {siteConfig.name} combines editorial curation with intelligent organization 
                to surface the content that matters most to builders, creators, and curious minds.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-heading text-3xl font-semibold text-foreground mb-12 text-center">
            What We Believe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="card-base p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-brand-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-foreground-secondary">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-heading text-3xl font-semibold text-foreground mb-4">
            Ready to explore?
          </h2>
          <p className="text-foreground-secondary mb-8 max-w-xl mx-auto">
            Start discovering curated content across topics, collections, and resources.
          </p>
          <a href="/discover" className="btn-primary inline-flex" data-testid="cta-discover">
            Start Discovering
          </a>
        </div>
      </section>
    </div>
  );
}
