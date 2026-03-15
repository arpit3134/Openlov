'use client';

import { useState } from 'react';
import { Calculator, CalculatorField } from '@/data/calculators';
import { Button } from '@/components/ui/Button';
import { CalculatorResult } from './CalculatorResult';

interface CalculatorFormProps {
  calculator: Calculator;
}

export function CalculatorForm({ calculator }: CalculatorFormProps) {
  const [values, setValues] = useState<Record<string, string | number>>({});
  const [result, setResult] = useState<Record<string, number | string> | null>(null);
  const [error, setError] = useState('');

  const handleInputChange = (fieldId: string, value: string | number) => {
    setValues(prev => ({ ...prev, [fieldId]: value }));
    setError('');
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Validate required fields
      const emptyFields = calculator.fields.filter(
        f => values[f.id] === undefined || values[f.id] === ''
      );

      if (emptyFields.length > 0) {
        setError(`Please fill in all fields`);
        return;
      }

      // Calculate
      const calculatedResult = calculator.calculate(values);
      setResult(calculatedResult);
    } catch (err) {
      setError(`Calculation error: ${String(err)}`);
    }
  };

  const handleReset = () => {
    setValues({});
    setResult(null);
    setError('');
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Form */}
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="card-base p-8">
          <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">
            Inputs
          </h2>

          <div className="space-y-6">
            {calculator.fields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {field.label}
                  {field.unit && <span className="text-foreground-muted"> ({field.unit})</span>}
                </label>

                {field.type === 'select' && field.options ? (
                  <select
                    value={values[field.id] as string || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-white/10 rounded-lg text-foreground placeholder:text-foreground-muted focus:border-brand-primary focus:outline-none transition-colors"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={values[field.id] as string || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-white/10 rounded-lg text-foreground placeholder:text-foreground-muted focus:border-brand-primary focus:outline-none transition-colors"
                  />
                )}

                {field.help && (
                  <p className="text-xs text-foreground-muted mt-2">{field.help}</p>
                )}
              </div>
            ))}
          </div>

          {error && (
            <div className="mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3 mt-8">
            <Button
              type="submit"
              size="lg"
              className="flex-1"
            >
              Calculate
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>
      </form>

      {/* Results */}
      {result && <CalculatorResult result={result} calculator={calculator} />}
    </div>
  );
}
