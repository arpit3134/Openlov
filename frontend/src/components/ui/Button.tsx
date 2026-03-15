'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all',
          {
            'btn-primary': variant === 'primary',
            'btn-secondary': variant === 'secondary',
            'btn-ghost': variant === 'ghost',
          },
          {
            'px-4 py-2 text-sm rounded-lg': size === 'sm',
            'px-6 py-3 text-sm rounded-lg': size === 'md',
            'px-8 py-4 text-base rounded-xl': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
