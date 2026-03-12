'use client';

import { useState, useCallback, useMemo } from 'react';
import { Tool, BlogPost, SearchResult } from '@/types';

export function useSearch(tools: Tool[], blogPosts: BlogPost[]) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo((): SearchResult[] => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const toolResults: SearchResult[] = tools
      .filter(tool =>
        tool.name.toLowerCase().includes(lowerQuery) ||
        tool.description.toLowerCase().includes(lowerQuery) ||
        tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
      .slice(0, 5)
      .map(tool => ({
        id: tool.id,
        title: tool.name,
        type: 'tool',
        description: tool.shortDescription,
        url: `/tools/${tool.id}`,
        image: tool.image,
      }));

    const blogResults: SearchResult[] = blogPosts
      .filter(post =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
      .slice(0, 5)
      .map(post => ({
        id: post.id,
        title: post.title,
        type: 'blog',
        description: post.excerpt,
        url: `/blog/${post.slug}`,
        image: post.image,
      }));

    return [...toolResults, ...blogResults].slice(0, 10);
  }, [query, tools, blogPosts]);

  const handleClear = useCallback(() => {
    setQuery('');
    setIsOpen(false);
  }, []);

  return {
    query,
    setQuery,
    results,
    isOpen,
    setIsOpen,
    handleClear,
    hasResults: results.length > 0,
  };
}
