import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  isExternal = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-mono-tag uppercase tracking-wider transition-colors duration-200 select-none rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)]';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[11px]',
    md: 'px-5 py-2.5 text-xs',
    lg: 'px-7 py-3.5 text-sm',
  }[size];

  const variantStyles = {
    primary:
      'bg-[var(--ink)] text-[var(--bone)] dark:bg-[var(--bone)] dark:text-[var(--ink)] hover:bg-[var(--signal)] hover:text-white dark:hover:bg-[var(--signal)] dark:hover:text-white border border-transparent',
    secondary:
      'bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:border-[var(--signal)] border border-[var(--border-color)]',
    outline:
      'bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--signal)] hover:text-[var(--signal)]',
    ghost:
      'bg-transparent text-[var(--text-primary)] hover:text-[var(--signal)] border border-transparent',
  }[variant];

  const fullClassName = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={fullClassName}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={fullClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={fullClassName} {...props}>
      {children}
    </button>
  );
}
