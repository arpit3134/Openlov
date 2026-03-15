'use client';

import Link from 'next/link';
import { Calculator } from '@/data/calculators';
import { ArrowRight } from 'lucide-react';

interface CalculatorCardProps {
  calculator: Calculator;
}

export function CalculatorCard({ calculator }: CalculatorCardProps) {
  return (
    <Link href={`/tools/calculators/${calculator.id}`}>
      <div className="group card-base hover:shadow-lg cursor-pointer h-full flex flex-col p-6 md:p-8">
        {/* Icon */}
        <div className="text-4xl mb-4">{calculator.icon}</div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2 group-hover:text-brand-primary transition-colors">
          {calculator.name}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base text-foreground-secondary flex-1 mb-4">
          {calculator.description}
        </p>

        {/* Link indicator */}
        <div className="flex items-center gap-2 text-brand-primary text-sm font-medium group-hover:gap-3 transition-all">
          <span>Use Calculator</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </div>
      </div>
    </Link>
  );
}
