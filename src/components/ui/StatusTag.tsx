import React from 'react';
import { VentureStatus } from '@/data/types';
import { STATUS_REGISTRY } from '@/data/status';

interface StatusTagProps {
  status: VentureStatus;
  className?: string;
  showDescriptionTooltip?: boolean;
  size?: 'sm' | 'md';
}

export function StatusTag({
  status,
  className = '',
  size = 'md',
}: StatusTagProps) {
  const config = STATUS_REGISTRY[status] ?? {
    label: status,
    description: '',
    dotColor: '#8B8984',
    dotPulse: false,
  };

  const isSmall = size === 'sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono-tag border border-[var(--border-color)] bg-[var(--surface-elevated)] rounded-none ${
        isSmall ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-[11px]'
      } text-[var(--text-primary)] select-none ${className}`}
      title={config.description}
    >
      <span
        className="w-1.5 h-1.5 rounded-full inline-block shrink-0 relative"
        style={{ backgroundColor: config.dotColor }}
      >
        {config.dotPulse && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-60"
            style={{ backgroundColor: config.dotColor }}
          />
        )}
      </span>
      <span>{config.label}</span>
    </span>
  );
}
