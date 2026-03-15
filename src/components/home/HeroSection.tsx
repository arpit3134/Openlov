'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" data-testid="hero-section">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-brand-primary" strokeWidth={1.5} />
            <span className="text-sm font-medium text-brand-primary">
              Intelligent Content Discovery
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-heading text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] text-foreground mb-6"
          >
            Discover ideas that{' '}
            <span className="gradient-text">shape the future</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-2xl mb-10"
          >
            Curated articles, resources, and tools for builders, creators, and curious minds. 
            Explore topics that matter, collections that inspire, and insights that inform.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/discover" data-testid="hero-cta-discover">
              <Button size="lg" className="group">
                Start Exploring
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </Button>
            </Link>
            <Link href="/topics" data-testid="hero-cta-topics">
              <Button variant="secondary" size="lg">
                Browse Topics
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap gap-8 md:gap-12 mt-16 pt-8 border-t border-white/5"
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
