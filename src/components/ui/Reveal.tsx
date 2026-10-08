'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TRANSITION_EASE } from '@/lib/motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  duration?: number;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  yOffset = 20,
  duration = 0.65,
  className = '',
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: TRANSITION_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
