'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Tool } from '@/types';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.id}`}>
      <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:border-blue-300 hover:shadow-lg">
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <Image
            src={tool.image}
            alt={tool.name}
            fill
            className="object-cover transition group-hover:scale-105"
          />
          {tool.featured && (
            <div className="absolute top-3 right-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-gray-900">
              Featured
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600">
            {tool.name}
          </h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{tool.shortDescription}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">{tool.rating}</span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(tool.rating) ? '★' : '☆'}>
                    {' '}
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500">({tool.reviews})</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-1">
            {tool.tags.slice(0, 2).map(tag => (
              <span key={tag} className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
