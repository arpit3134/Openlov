'use client';

import dynamic from 'next/dynamic';
import {
  EMICalculator,
  SIPCalculator,
  BMICalculator,
  PercentageCalculator,
  CompoundInterestCalculator,
  GSTCalculator,
  AgeCalculator,
  DiscountCalculator,
} from '@/components/calculator/CalculatorLogic';
import {
  WordCounterCalculator,
  JSONFormatterCalculator,
  Base64Calculator,
  CaseConverterCalculator,
  UnitConverterCalculator,
  TipCalculator,
} from '@/components/calculator/MoreCalculators';

// Map slugs to calculator components
const calculatorComponents: Record<string, React.ComponentType> = {
  // Finance
  'emi': EMICalculator,
  'home-loan-emi': EMICalculator,
  'car-loan-emi': EMICalculator,
  'personal-loan-emi': EMICalculator,
  'sip': SIPCalculator,
  'compound-interest': CompoundInterestCalculator,
  
  // Tax
  'gst': GSTCalculator,
  
  // Health
  'bmi': BMICalculator,
  'age': AgeCalculator,
  
  // Math
  'percentage': PercentageCalculator,
  'discount': DiscountCalculator,
  'unit-converter': UnitConverterCalculator,
  'tip': TipCalculator,
  
  // Developer
  'json-formatter': JSONFormatterCalculator,
  'base64': Base64Calculator,
  'word-counter': WordCounterCalculator,
  'case-converter': CaseConverterCalculator,
};

// Fallback calculator for unimplemented ones
function ComingSoonCalculator() {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Coming Soon</h3>
      <p className="text-foreground-secondary max-w-md mx-auto">
        This calculator is being developed. Check back soon for the full functionality.
      </p>
    </div>
  );
}

interface CalculatorWrapperProps {
  slug: string;
}

export function CalculatorWrapper({ slug }: CalculatorWrapperProps) {
  const CalculatorComponent = calculatorComponents[slug] || ComingSoonCalculator;
  return <CalculatorComponent />;
}
