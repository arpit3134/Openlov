'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowUpRight } from 'lucide-react';
import { Article } from '@/types';
import { cn, formatShortDate } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  if (variant === 'featured') {
    return (
      <Link
        href={`/articles/${article.slug}`}
        className="group relative block card-base overflow-hidden"
        data-testid={`article-card-${article.id}`}
      >
        <div className="aspect-[16/9] relative">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <span className="tag mb-3">{article.category}</span>
          <h3 className="font-heading text-2xl md:text-3xl font-semibold text-white mb-3 group-hover:text-brand-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-zinc-300 line-clamp-2 mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <span>{formatShortDate(article.createdAt)}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" strokeWidth={1.5} />
              {article.readingTime} min
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link
        href={`/articles/${article.slug}`}
        className="group flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
        data-testid={`article-card-${article.id}`}
      >
        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs text-brand-primary font-medium">{article.category}</span>
          <h4 className="font-medium text-foreground line-clamp-2 mt-1 group-hover:text-brand-primary transition-colors">
            {article.title}
          </h4>
          <p className="text-sm text-foreground-muted mt-1">{article.readingTime} min read</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group card-base block"
      data-testid={`article-card-${article.id}`}
    >
      <div className="aspect-[16/10] relative overflow-hidden rounded-t-xl">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="tag">{article.category}</span>
          {article.trending && (
            <span className="text-xs text-brand-primary font-medium">Trending</span>
          )}
        </div>
        <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-foreground-secondary line-clamp-2 mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-foreground-muted">
          <div className="flex items-center gap-3">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span>{article.author.name}</span>
          </div>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" strokeWidth={1.5} />
            {article.readingTime} min
          </span>
        </div>
      </div>
    </Link>
  );
}
