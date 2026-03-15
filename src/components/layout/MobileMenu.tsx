'use client';

import Link from 'next/link';
import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { navItems, siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" data-testid="mobile-menu">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-background-surface border-l border-white/10 animate-slide-in">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <span className="text-lg font-heading font-semibold text-foreground">
              {siteConfig.name}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-white/5 transition-colors"
              aria-label="Close menu"
              data-testid="mobile-menu-close"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() =>
                          setExpandedItem(
                            expandedItem === item.label ? null : item.label
                          )
                        }
                        className={cn(
                          'flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors',
                          'text-foreground-secondary hover:text-foreground hover:bg-white/5'
                        )}
                        data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                      >
                        <span className="font-medium">{item.label}</span>
                        {expandedItem === item.label ? (
                          <ChevronUp className="w-4 h-4" strokeWidth={1.5} />
                        ) : (
                          <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                        )}
                      </button>
                      
                      {expandedItem === item.label && (
                        <ul className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="block px-4 py-2.5 text-sm text-foreground-secondary hover:text-foreground transition-colors"
                                data-testid={`mobile-nav-${child.label.toLowerCase().replace(/\s+/g, '-')}`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'block px-4 py-3 rounded-lg font-medium transition-colors',
                        'text-foreground-secondary hover:text-foreground hover:bg-white/5'
                      )}
                      data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-white/10">
            <p className="text-sm text-foreground-muted text-center">
              © 2025 {siteConfig.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
