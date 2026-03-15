'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setStatus('success');
    setEmail('');
    
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="section-spacing bg-background-surface relative overflow-hidden" data-testid="newsletter-section">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-hero-glow opacity-50 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Stay in the loop
          </h2>
          <p className="text-foreground-secondary text-lg mb-8">
            Get weekly insights on technology, design, and building products. 
            No spam, unsubscribe anytime.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-white/5 border border-white/10 focus:border-white/30 text-foreground placeholder:text-foreground-muted rounded-lg h-12 px-4 outline-none transition-colors"
              required
              disabled={status === 'loading' || status === 'success'}
              data-testid="newsletter-email"
            />
            <Button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="h-12"
              data-testid="newsletter-submit"
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Subscribing...
                </span>
              ) : status === 'success' ? (
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" strokeWidth={1.5} />
                  Subscribed!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Subscribe
                  <Send className="w-4 h-4" strokeWidth={1.5} />
                </span>
              )}
            </Button>
          </form>

          <p className="text-sm text-foreground-muted mt-4">
            Join 10,000+ readers who trust us for quality content.
          </p>
        </div>
      </div>
    </section>
  );
}
