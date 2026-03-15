'use client';

import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { calculators, calculatorCategories, searchCalculators, getCalculatorsByCategory, CalculatorCategory } from '@/data/calculators';
import { CalculatorCard } from './CalculatorCard';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

export function CalculatorGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CalculatorCategory | 'all'>('all');

  const filteredCalculators = useMemo(() => {
    let results = calculators;
    
    if (searchQuery) {
      results = searchCalculators(searchQuery);
    }
    
    if (selectedCategory !== 'all') {
      results = results.filter((calc) => calc.category === selectedCategory);
    }
    
    return results;
  }, [searchQuery, selectedCategory]);

  return (
    <div>
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" strokeWidth={1.5} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search calculators..."
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-foreground-muted focus:border-brand-primary/50 focus:bg-white/[0.07] outline-none transition-all"
            data-testid="calculator-search"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedCategory('all')}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all',
            selectedCategory === 'all'
              ? 'bg-brand-primary text-white'
              : 'bg-white/5 text-foreground-secondary hover:bg-white/10 border border-white/10'
          )}
          data-testid="category-all"
        >
          All ({calculators.length})
        </button>
        {calculatorCategories.map((category) => {
          const IconComponent = (Icons as any)[category.icon] || Icons.Calculator;
          const count = getCalculatorsByCategory(category.id as CalculatorCategory).length;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as CalculatorCategory)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
                selectedCategory === category.id
                  ? 'bg-brand-primary text-white'
                  : 'bg-white/5 text-foreground-secondary hover:bg-white/10 border border-white/10'
              )}
              data-testid={`category-${category.id}`}
            >
              <IconComponent className="w-4 h-4" strokeWidth={1.5} />
              {category.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Results */}
      {filteredCalculators.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCalculators.map((calculator) => (
            <CalculatorCard key={calculator.id} calculator={calculator} />
          ))}
        </div>
      ) : (
        <div className="card-base p-12 text-center">
          <p className="text-foreground-secondary">
            No calculators found matching "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}
