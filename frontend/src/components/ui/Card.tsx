'use client';

import React from 'react';
import { classNames } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={classNames(
        'rounded-lg border border-gray-200 bg-white p-6 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
