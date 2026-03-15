'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Star, ExternalLink } from 'lucide-react';
import { Resource } from '@/types';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
  resource: Resource;
  variant?: 'default' | 'compact';
}

export function ResourceCard({ resource, variant = 'default' }: ResourceCardProps) {
  const isExternal = resource.url.startsWith('http');

  if (variant === 'compact') {
    return (
      <Link
        href={isExternal ? resource.url : `/tools/${resource.slug}`}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="group flex items-center gap-4 p-4 rounded-xl card-base"
        data-testid={`resource-card-${resource.id}`}
      >
        <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-white/5">
          <Image
            src={resource.image}
            alt={resource.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground group-hover:text-brand-primary transition-colors">
            {resource.name}
          </h4>
          <p className="text-sm text-foreground-muted line-clamp-1">{resource.shortDescription}</p>
        </div>
        {isExternal && (
          <ExternalLink className="w-4 h-4 text-foreground-muted flex-shrink-0" strokeWidth={1.5} />
        )}
      </Link>
    );
  }

  return (
    <Link
      href={isExternal ? resource.url : `/tools/${resource.slug}`}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group card-base block"
      data-testid={`resource-card-${resource.id}`}
    >
      <div className="aspect-[16/10] relative overflow-hidden rounded-t-xl">
        <Image
          src={resource.image}
          alt={resource.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {resource.pricing && (
          <div className="absolute top-4 right-4">
            <span className={cn(
              'px-3 py-1 rounded-full text-xs font-medium capitalize',
              resource.pricing === 'free' && 'bg-green-500/20 text-green-400 border border-green-500/30',
              resource.pricing === 'freemium' && 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
              resource.pricing === 'paid' && 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
            )}>
              {resource.pricing}
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="tag">{resource.category}</span>
          {resource.trending && (
            <span className="text-xs text-brand-primary font-medium">Trending</span>
          )}
        </div>
        <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-brand-primary transition-colors">
          {resource.name}
        </h3>
        <p className="text-sm text-foreground-secondary line-clamp-2 mb-4">
          {resource.shortDescription}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-foreground">{resource.rating}</span>
            <span className="text-sm text-foreground-muted">({resource.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-brand-primary group-hover:gap-2 transition-all">
            <span>Learn more</span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </Link>
  );
}
