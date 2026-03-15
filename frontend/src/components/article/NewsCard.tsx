'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { NewsItem } from '@/types';
import { formatShortDate } from '@/lib/utils';

interface NewsCardProps {
  item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
  return (
    <article
      className="group py-4 border-b border-white/5 last:border-0"
      data-testid={`news-card-${item.id}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="tag text-[10px]">{item.category}</span>
            <span className="text-xs text-foreground-muted">{formatShortDate(item.publishedAt)}</span>
          </div>
          <h4 className="font-medium text-foreground group-hover:text-brand-primary transition-colors line-clamp-2">
            {item.title}
          </h4>
          <p className="text-sm text-foreground-secondary mt-1 line-clamp-1">
            {item.excerpt}
          </p>
        </div>
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-white/5 transition-colors"
          aria-label={`Read on ${item.source}`}
        >
          <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
        </a>
      </div>
    </article>
  );
}
