import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  className = '',
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={`w-full max-w-[1520px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 ${className}`}
    >
      {children}
    </Component>
  );
}
