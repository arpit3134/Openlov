import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, Sparkles } from 'lucide-react';
import { calculators, calculatorCategories, getPopularCalculators } from '@/data/calculators';
import { CalculatorGrid } from '@/components/calculator/CalculatorGrid';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Free Online Calculators',
  description: 'Explore our collection of 50+ free online calculators for finance, health, math, tax, and more. No API required - all calculations run instantly in your browser.',
};

export default function CalculatorsPage() {
  const popularCalculators = getPopularCalculators(8);

  return (
    <div className="min-h-screen" data-testid="calculators-hub-page">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
              <Calculator className="w-4 h-4 text-brand-primary" strokeWidth={1.5} />
              <span className="text-sm font-medium text-brand-primary">
                {calculators.length}+ Free Calculators
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Online Calculators
            </h1>
            <p className="text-lg text-foreground-secondary">
              Free, fast, and private. All calculations run locally in your browser — 
              no data is sent to any server. Choose from finance, health, tax, math, and developer tools.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader
            title="Popular Calculators"
            subtitle="Most used tools by our visitors"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularCalculators.map((calc) => (
              <CalculatorCard key={calc.id} calculator={calc} />
            ))}
          </div>
        </div>
      </section>

      {/* All Calculators with Search & Filter */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader
            title="All Calculators"
            subtitle="Search and filter to find the right tool"
          />
          <CalculatorGrid />
        </div>
      </section>
    </div>
  );
}
