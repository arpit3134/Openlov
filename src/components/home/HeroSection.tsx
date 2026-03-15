'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" data-testid="hero-section">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40">
        <div
          className={`max-w-4xl transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-8 transition-all duration-500 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Sparkles className="w-4 h-4 text-brand-primary" strokeWidth={1.5} />
            <span className="text-sm font-medium text-brand-primary">
              Intelligent Content Discovery
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`font-heading text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] text-foreground mb-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Discover ideas that{' '}
            <span className="gradient-text">shape the future</span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-2xl mb-10 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Curated articles, resources, and tools for builders, creators, and curious minds. 
            Explore topics that matter, collections that inspire, and insights that inform.
          </p>

          {/* Premium Search Bar */}
          <form
            onSubmit={handleSearch}
            className={`max-w-2xl mb-10 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-purple-500/20 rounded-xl blur-lg opacity-50" />
              <div className="relative flex items-center gap-3 px-6 py-4 bg-background-surface border border-white/10 rounded-xl hover:border-white/20 focus-within:border-white/30 transition-all duration-200">
                <Search className="w-5 h-5 text-foreground-muted flex-shrink-0" strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Search articles, topics, tools, calculators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-foreground placeholder:text-foreground-muted outline-none text-base"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors font-medium text-sm"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <Link href="/discover" data-testid="hero-cta-discover">
              <Button size="lg" className="group">
                Start Exploring
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </Button>
            </Link>
            <Link href="/tools/calculators" data-testid="hero-cta-calculators">
              <Button variant="secondary" size="lg">
                Try Calculators
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div
            className={`flex flex-wrap gap-8 md:gap-12 mt-16 pt-8 border-t border-white/5 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {[
              { value: '200+', label: 'Curated Resources' },
              { value: '50+', label: 'Expert Topics' },
              { value: '1000+', label: 'Articles Published' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
