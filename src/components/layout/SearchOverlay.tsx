'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, FileText, Folder, Tag, Wrench } from 'lucide-react';
import { articles } from '@/data/articles';
import { topics } from '@/data/topics';
import { collections } from '@/data/collections';
import { resources } from '@/data/resources';
import { cn } from '@/lib/utils';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResultItem {
  id: string;
  title: string;
  type: 'article' | 'topic' | 'collection' | 'resource';
  href: string;
  description?: string;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const searchResults: SearchResultItem[] = [];

    // Search articles
    articles.forEach((article) => {
      if (
        article.title.toLowerCase().includes(lowerQuery) ||
        article.excerpt.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          id: article.id,
          title: article.title,
          type: 'article',
          href: `/articles/${article.slug}`,
          description: article.excerpt,
        });
      }
    });

    // Search topics
    topics.forEach((topic) => {
      if (
        topic.name.toLowerCase().includes(lowerQuery) ||
        topic.description.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          id: topic.id,
          title: topic.name,
          type: 'topic',
          href: `/topics/${topic.slug}`,
          description: topic.description,
        });
      }
    });

    // Search collections
    collections.forEach((collection) => {
      if (
        collection.title.toLowerCase().includes(lowerQuery) ||
        collection.description.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          id: collection.id,
          title: collection.title,
          type: 'collection',
          href: `/collections/${collection.slug}`,
          description: collection.description,
        });
      }
    });

    // Search resources
    resources.forEach((resource) => {
      if (
        resource.name.toLowerCase().includes(lowerQuery) ||
        resource.description.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          id: resource.id,
          title: resource.name,
          type: 'resource',
          href: `/tools/${resource.slug}`,
          description: resource.shortDescription,
        });
      }
    });

    setResults(searchResults.slice(0, 8));
  }, [query]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="w-4 h-4" strokeWidth={1.5} />;
      case 'topic':
        return <Tag className="w-4 h-4" strokeWidth={1.5} />;
      case 'collection':
        return <Folder className="w-4 h-4" strokeWidth={1.5} />;
      case 'resource':
        return <Wrench className="w-4 h-4" strokeWidth={1.5} />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" data-testid="search-overlay">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Search Panel */}
      <div className="relative max-w-2xl mx-auto mt-20 px-4">
        <div className="bg-background-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {/* Search Input */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-white/10">
            <Search className="w-5 h-5 text-foreground-muted" strokeWidth={1.5} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, topics, collections, tools..."
              className="flex-1 bg-transparent text-foreground placeholder:text-foreground-muted outline-none text-lg"
              data-testid="search-input"
            />
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-white/5 transition-colors"
              data-testid="search-close"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="max-h-[400px] overflow-y-auto p-2">
              {results.map((result) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  href={result.href}
                  onClick={onClose}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
                  data-testid={`search-result-${result.id}`}
                >
                  <div className="flex-shrink-0 p-2 rounded-lg bg-white/5 text-foreground-secondary">
                    {getIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground group-hover:text-brand-primary transition-colors">
                        {result.title}
                      </span>
                      <span className="tag text-[10px]">{result.type}</span>
                    </div>
                    {result.description && (
                      <p className="text-sm text-foreground-secondary mt-1 line-clamp-1">
                        {result.description}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-foreground transition-colors flex-shrink-0 mt-1" strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {query && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-foreground-secondary">
                No results found for "{query}"
              </p>
            </div>
          )}

          {/* Initial State */}
          {!query && (
            <div className="p-6">
              <p className="text-sm text-foreground-muted mb-4">Quick Links</p>
              <div className="flex flex-wrap gap-2">
                {['AI', 'Design', 'Development', 'Productivity'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="tag hover:border-white/20"
                    data-testid={`quick-link-${tag.toLowerCase()}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Keyboard Hint */}
        <p className="text-center text-sm text-foreground-muted mt-4">
          Press <kbd className="px-2 py-1 rounded bg-white/10 text-xs">ESC</kbd> to close
        </p>
      </div>
    </div>
  );
}
