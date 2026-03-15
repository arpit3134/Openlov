'use client';

import { useState, useEffect, useContext, createContext } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

type Theme = 'dark' | 'light';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('signal-theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'light') {
        document.body.classList.add('light');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('signal-theme', newTheme);
    if (newTheme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  };

  if (!mounted) {
    return (
      <button
        className={cn(
          'p-2.5 rounded-lg transition-colors',
          'text-foreground-secondary hover:text-foreground hover:bg-white/5'
        )}
        aria-label="Toggle theme"
        data-testid="theme-toggle"
      >
        <Sun className="w-5 h-5" strokeWidth={1.5} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'p-2.5 rounded-lg transition-colors',
        'text-foreground-secondary hover:text-foreground hover:bg-white/5'
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      data-testid="theme-toggle"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" strokeWidth={1.5} />
      ) : (
        <Moon className="w-5 h-5" strokeWidth={1.5} />
      )}
    </button>
  );
}
