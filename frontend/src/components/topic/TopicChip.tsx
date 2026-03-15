'use client';

import Link from 'next/link';
import { Brain, Palette, Code, Cloud, BarChart3, Shield, Rocket, Globe, Smartphone, Blocks, LucideIcon } from 'lucide-react';
import { Topic } from '@/types';
import { cn } from '@/lib/utils';

interface TopicChipProps {
  topic: Topic;
  variant?: 'default' | 'large';
}

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Palette,
  Code,
  Cloud,
  BarChart3,
  Shield,
  Rocket,
  Globe,
  Smartphone,
  Blocks,
};

export function TopicChip({ topic, variant = 'default' }: TopicChipProps) {
  const Icon = iconMap[topic.icon] || Brain;

  if (variant === 'large') {
    return (
      <Link
        href={`/topics/${topic.slug}`}
        className="group card-base block p-6"
        data-testid={`topic-chip-${topic.id}`}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${topic.color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color: topic.color }} strokeWidth={1.5} />
        </div>
        <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-brand-primary transition-colors">
          {topic.name}
        </h3>
        <p className="text-sm text-foreground-secondary line-clamp-2 mb-3">
          {topic.description}
        </p>
        <span className="text-sm text-foreground-muted">
          {topic.articleCount} articles
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/topics/${topic.slug}`}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all',
        'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
      )}
      data-testid={`topic-chip-${topic.id}`}
    >
      <Icon className="w-4 h-4" style={{ color: topic.color }} strokeWidth={1.5} />
      <span className="text-sm font-medium text-foreground">{topic.name}</span>
      {topic.trending && (
        <span className="px-2 py-0.5 rounded-full bg-brand-primary/20 text-brand-primary text-xs font-medium">
          Trending
        </span>
      )}
    </Link>
  );
}
