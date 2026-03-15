'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStatus('success');
    setFormState({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="min-h-screen" data-testid="contact-page">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-foreground-secondary">
              Have a question, suggestion, or want to collaborate? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="card-base p-8">
                <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
                  Send us a message
                </h2>
                
                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-foreground-secondary">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/5 border border-white/10 focus:border-white/30 text-foreground placeholder:text-foreground-muted rounded-lg h-12 px-4 outline-none transition-colors"
                          placeholder="Your name"
                          data-testid="contact-name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/5 border border-white/10 focus:border-white/30 text-foreground placeholder:text-foreground-muted rounded-lg h-12 px-4 outline-none transition-colors"
                          placeholder="you@example.com"
                          data-testid="contact-email"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 focus:border-white/30 text-foreground rounded-lg h-12 px-4 outline-none transition-colors appearance-none cursor-pointer"
                        data-testid="contact-subject"
                      >
                        <option value="" className="bg-background-surface">Select a topic</option>
                        <option value="general" className="bg-background-surface">General Inquiry</option>
                        <option value="feedback" className="bg-background-surface">Feedback</option>
                        <option value="partnership" className="bg-background-surface">Partnership</option>
                        <option value="support" className="bg-background-surface">Support</option>
                        <option value="other" className="bg-background-surface">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full bg-white/5 border border-white/10 focus:border-white/30 text-foreground placeholder:text-foreground-muted rounded-lg p-4 outline-none transition-colors resize-none"
                        placeholder="Your message..."
                        data-testid="contact-message"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full md:w-auto"
                      data-testid="contact-submit"
                    >
                      {status === 'loading' ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send className="w-4 h-4" strokeWidth={1.5} />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="card-base p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-brand-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Email</h3>
                    <a 
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-sm text-foreground-secondary hover:text-brand-primary transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
                <p className="text-sm text-foreground-muted">
                  We typically respond within 24-48 hours.
                </p>
              </div>

              <div className="card-base p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-brand-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Social</h3>
                    <p className="text-sm text-foreground-secondary">
                      Connect with us online
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  {siteConfig.social.twitter && (
                    <a
                      href={siteConfig.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-white/5 transition-colors"
                      aria-label="Twitter"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                  {siteConfig.social.linkedin && (
                    <a
                      href={siteConfig.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-white/5 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
