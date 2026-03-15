'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkText?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  href,
  linkText = 'View all',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10', className)}>
      <div>
        <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="text-foreground-secondary mt-2 max-w-xl">
            {subtitle}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-brand-primary hover:gap-3 transition-all group"
          data-testid={`section-link-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <span className="text-sm font-medium">{linkText}</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </Link>
      )}
    </div>
  );
}
