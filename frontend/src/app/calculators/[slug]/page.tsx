import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calculator } from 'lucide-react';
import { calculators, getCalculatorBySlug, calculatorCategories } from '@/data/calculators';
import * as Icons from 'lucide-react';
import { CalculatorWrapper } from './CalculatorWrapper';

export async function generateStaticParams() {
  return calculators.map((calc) => ({
    slug: calc.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const calculator = getCalculatorBySlug(params.slug);
  if (!calculator) return { title: 'Calculator Not Found' };

  return {
    title: `${calculator.name} - Free Online Calculator`,
    description: calculator.description,
  };
}

export default function CalculatorPage({ params }: { params: { slug: string } }) {
  const calculator = getCalculatorBySlug(params.slug);

  if (!calculator) {
    notFound();
  }

  const IconComponent = (Icons as any)[calculator.icon] || Calculator;
  const category = calculatorCategories.find((c) => c.id === calculator.category);

  return (
    <div className="min-h-screen" data-testid={`calculator-${calculator.slug}`}>
      {/* Hero */}
      <section className="py-12 md:py-16 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Link
            href="/calculators"
            className="inline-flex items-center gap-2 text-foreground-secondary hover:text-foreground transition-colors mb-6"
            data-testid="back-to-calculators"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            <span>All Calculators</span>
          </Link>

          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${category?.color || '#3B82F6'}20` }}
            >
              <IconComponent
                className="w-7 h-7"
                style={{ color: category?.color || '#3B82F6' }}
                strokeWidth={1.5}
              />
            </div>
            <div>
              <span className="tag mb-2">{category?.name || calculator.category}</span>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                {calculator.name}
              </h1>
              <p className="text-foreground-secondary">{calculator.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="card-base p-6 md:p-8">
            <CalculatorWrapper slug={calculator.slug} />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-background-surface border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
            About This Calculator
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-foreground-secondary leading-relaxed">
              {calculator.description} This calculator runs entirely in your browser — no data is sent 
              to any server, ensuring your information remains private and secure.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
