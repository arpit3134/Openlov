import { Metadata } from 'next';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { calculators, categoryLabels, categoryIcons, calculatorsByCategory } from '@/data/calculators';

export const metadata: Metadata = {
  title: 'Calculators - Advanced Tools for Financial, Health & Math Calculations',
  description: 'Use our free online calculators for EMI, BMI, investments, tax, and more. No API required, all calculations done locally.',
};

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-background" data-testid="calculators-page">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-foreground mb-4">
              Premium <span className="gradient-text">Calculators</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground-secondary leading-relaxed">
              Powerful, free calculators for finance, health, math, and developer tools. All calculations run locally on your device—no API calls, no data collection.
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'Calculators', value: calculators.length },
              { label: 'Categories', value: Object.keys(calculatorsByCategory).length },
              { label: 'No API', value: '100%' },
              { label: 'Privacy', value: 'Local' },
            ].map((stat) => (
              <div key={stat.label} className="card-base p-4 md:p-6">
                <div className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-foreground-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators by category */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {Object.entries(calculatorsByCategory).map(([category, calcs]) => (
            <div key={category} className="mb-16 md:mb-24 last:mb-0">
              {/* Category header */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl md:text-4xl">
                  {categoryIcons[category] || '🛠️'}
                </span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
                    {categoryLabels[category] || category}
                  </h2>
                  <p className="text-sm text-foreground-muted mt-1">
                    {calcs.length} calculator{calcs.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Category calculators grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {calcs.map((calc) => (
                  <CalculatorCard key={calc.id} calculator={calc} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-12 text-center">
            Why use our calculators?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Completely Free',
                description: 'No subscriptions, no hidden costs. All calculators are permanently free to use.',
                icon: '💎',
              },
              {
                title: 'Privacy First',
                description: 'All calculations happen locally on your device. No data is sent to any server.',
                icon: '🔒',
              },
              {
                title: 'Always Available',
                description: 'Works offline. No API dependencies, no rate limits, no downtime.',
                icon: '⚡',
              },
              {
                title: 'Accurate Results',
                description: 'Precise calculations with proper formulas and proven accuracy.',
                icon: '✅',
              },
              {
                title: 'Mobile Friendly',
                description: 'Responsive design works perfectly on phones, tablets, and desktops.',
                icon: '📱',
              },
              {
                title: 'No Ads',
                description: 'Clean interface focused on functionality. No distracting advertisements.',
                icon: '🎯',
              },
            ].map((benefit) => (
              <div key={benefit.title} className="card-base p-8">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
