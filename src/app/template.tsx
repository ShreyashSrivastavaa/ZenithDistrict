'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TRANSITION_EASE } from '@/lib/motion';

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{
        duration: 0.3,
        ease: TRANSITION_EASE,
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
