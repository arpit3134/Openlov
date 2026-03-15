'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CalculatorInputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number';
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  helpText?: string;
  min?: number;
  max?: number;
  step?: number;
}

export function CalculatorInput({
  label,
  value,
  onChange,
  type = 'number',
  prefix,
  suffix,
  placeholder,
  helpText,
  min,
  max,
  step,
}: CalculatorInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={cn(
            'w-full h-12 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-foreground-muted',
            'focus:border-brand-primary/50 focus:bg-white/[0.07] outline-none transition-all',
            prefix ? 'pl-10 pr-4' : 'px-4',
            suffix ? 'pr-12' : ''
          )}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted">
            {suffix}
          </span>
        )}
      </div>
      {helpText && <p className="text-xs text-foreground-muted">{helpText}</p>}
    </div>
  );
}

interface CalculatorSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  helpText?: string;
}

export function CalculatorSelect({
  label,
  value,
  onChange,
  options,
  helpText,
}: CalculatorSelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-foreground focus:border-brand-primary/50 focus:bg-white/[0.07] outline-none transition-all appearance-none cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-background-surface">
            {option.label}
          </option>
        ))}
      </select>
      {helpText && <p className="text-xs text-foreground-muted">{helpText}</p>}
    </div>
  );
}

interface CalculatorResultProps {
  label: string;
  value: string | number;
  highlight?: boolean;
  subtext?: string;
}

export function CalculatorResult({
  label,
  value,
  highlight = false,
  subtext,
}: CalculatorResultProps) {
  return (
    <div className={cn(
      'p-4 rounded-xl',
      highlight ? 'bg-brand-primary/10 border border-brand-primary/20' : 'bg-white/5 border border-white/10'
    )}>
      <p className="text-sm text-foreground-secondary mb-1">{label}</p>
      <p className={cn(
        'text-2xl font-heading font-bold',
        highlight ? 'text-brand-primary' : 'text-foreground'
      )}>
        {value}
      </p>
      {subtext && <p className="text-xs text-foreground-muted mt-1">{subtext}</p>}
    </div>
  );
}

interface CalculatorButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export function CalculatorButton({
  children,
  onClick,
  variant = 'primary',
  fullWidth = false,
}: CalculatorButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'h-12 px-6 rounded-xl font-medium transition-all',
        variant === 'primary'
          ? 'bg-brand-primary text-white hover:bg-brand-primary/90'
          : 'bg-white/5 text-foreground border border-white/10 hover:bg-white/10',
        fullWidth ? 'w-full' : ''
      )}
    >
      {children}
    </button>
  );
}
