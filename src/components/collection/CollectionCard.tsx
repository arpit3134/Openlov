'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Folder } from 'lucide-react';
import { Collection } from '@/types';
import { cn } from '@/lib/utils';

interface CollectionCardProps {
  collection: Collection;
  variant?: 'default' | 'featured';
}

export function CollectionCard({ collection, variant = 'default' }: CollectionCardProps) {
  if (variant === 'featured') {
    return (
      <Link
        href={`/collections/${collection.slug}`}
        className="group relative block card-base overflow-hidden aspect-[4/3]"
        data-testid={`collection-card-${collection.id}`}
      >
        <Image
          src={collection.image}
          alt={collection.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="tag mb-3">{collection.category}</span>
          <h3 className="font-heading text-xl font-semibold text-white mb-2 group-hover:text-brand-primary transition-colors">
            {collection.title}
          </h3>
          <p className="text-sm text-zinc-300 line-clamp-2 mb-3">
            {collection.description}
          </p>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Folder className="w-4 h-4" strokeWidth={1.5} />
            <span>{collection.itemCount} items</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group card-base block"
      data-testid={`collection-card-${collection.id}`}
    >
      <div className="aspect-[16/9] relative overflow-hidden rounded-t-xl">
        <Image
          src={collection.image}
          alt={collection.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <span className="tag mb-3">{collection.category}</span>
        <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-brand-primary transition-colors">
          {collection.title}
        </h3>
        <p className="text-sm text-foreground-secondary line-clamp-2 mb-4">
          {collection.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={collection.curator.avatar}
              alt={collection.curator.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-sm text-foreground-muted">{collection.curator.name}</span>
          </div>
          <span className="text-sm text-foreground-muted">{collection.itemCount} items</span>
        </div>
      </div>
    </Link>
  );
}
