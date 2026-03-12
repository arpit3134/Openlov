'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:border-blue-300 hover:shadow-lg">
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase text-blue-600">{post.category}</span>
            <span className="text-xs text-gray-500">{post.readingTime} min read</span>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600">
            {post.title}
          </h3>
          <p className="mb-4 text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{formatDate(post.createdAt)}</span>
            <span className="text-xs font-medium text-blue-600">By {post.author}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-1">
            {post.tags.slice(0, 2).map(tag => (
              <span key={tag} className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
