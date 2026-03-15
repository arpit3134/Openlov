'use client';

import { Calculator } from '@/data/calculators';
import { Check } from 'lucide-react';

interface CalculatorResultProps {
  result: Record<string, number | string>;
  calculator: Calculator;
}

export function CalculatorResult({ result, calculator }: CalculatorResultProps) {
  // Format result values for display
  const formatValue = (value: number | string): string => {
    if (typeof value === 'string') return value;
    if (Number.isInteger(value)) return value.toString();
    return value.toFixed(2);
  };

  return (
    <div className="card-base p-8 bg-gradient-to-br from-background-surface to-background-surface/50 border-2 border-brand-primary/30">
      <div className="flex items-center gap-2 mb-6">
        <Check className="w-6 h-6 text-green-400" strokeWidth={1.5} />
        <h2 className="text-2xl font-heading font-semibold text-foreground">
          Result
        </h2>
      </div>

      {/* Result grid */}
      <div className="space-y-4 mb-8">
        {Object.entries(result).map(([key, value]) => {
          // Skip internal/error flags
          if (key === 'valid' || key === 'success' || key === 'error') return null;

          const displayKey = key
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          return (
            <div key={key} className="flex items-center justify-between pb-4 border-b border-white/5 last:border-b-0">
              <span className="text-foreground-secondary">{displayKey}</span>
              <span className="text-xl font-heading font-semibold text-foreground">
                {formatValue(value)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
        <p className="text-sm text-foreground-secondary mb-2">Summary</p>
        <p className="text-lg text-foreground font-medium">
          {calculator.resultTemplate(result)}
        </p>
      </div>

      {/* Tips */}
      {calculator.tips && calculator.tips.length > 0 && (
        <div className="mt-8 p-4 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
          <h3 className="text-sm font-semibold text-brand-primary mb-3">💡 Tips</h3>
          <ul className="space-y-2">
            {calculator.tips.map((tip, idx) => (
              <li key={idx} className="text-sm text-foreground-secondary flex gap-2">
                <span className="text-brand-primary">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
