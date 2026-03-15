'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { navItems, siteConfig } from '@/config/site';
import { ThemeToggle } from './ThemeToggle';
import { SearchOverlay } from './SearchOverlay';
import { MobileMenu } from './MobileMenu';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        )}
        data-testid="header"
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              data-testid="logo-link"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary/20 border border-brand-primary/30 group-hover:border-brand-primary/50 transition-colors">
                <span className="text-lg font-bold text-brand-primary">S</span>
              </div>
              <span className="text-xl font-heading font-semibold text-foreground hidden sm:inline">
                {siteConfig.name}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                      'text-foreground-secondary hover:text-foreground hover:bg-white/5'
                    )}
                    data-testid={`nav-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                    )}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {item.children && openDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-2">
                      <div className="bg-background-surface border border-white/10 rounded-xl p-2 min-w-[200px] shadow-xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground-secondary hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
                            data-testid={`nav-${child.label.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-white/5 transition-colors"
                aria-label="Search"
                data-testid="search-button"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>
              
              <ThemeToggle />
              
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2.5 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-white/5 transition-colors lg:hidden"
                aria-label="Menu"
                data-testid="mobile-menu-button"
              >
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
