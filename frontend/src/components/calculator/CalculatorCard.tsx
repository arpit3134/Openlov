'use client';

import Link from 'next/link';
import { Calculator } from '@/data/calculators';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalculatorCardProps {
  calculator: Calculator;
}

export function CalculatorCard({ calculator }: CalculatorCardProps) {
  const IconComponent = (Icons as any)[calculator.icon] || Icons.Calculator;

  return (
    <Link
      href={`/calculators/${calculator.slug}`}
      className="group card-base block p-6 hover:border-brand-primary/30"
      data-testid={`calculator-card-${calculator.id}`}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary/20 transition-colors">
          <IconComponent className="w-6 h-6 text-brand-primary" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1 group-hover:text-brand-primary transition-colors">
            {calculator.name}
          </h3>
          <p className="text-sm text-foreground-secondary line-clamp-2">
            {calculator.shortDescription}
          </p>
          {calculator.popular && (
            <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-medium">
              Popular
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
