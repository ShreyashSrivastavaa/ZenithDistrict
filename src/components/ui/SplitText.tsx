'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TRANSITION_EASE } from '@/lib/motion';

interface SplitTextProps {
  lines: string[];
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  lineClassName?: string;
  delayStart?: number;
  accentWord?: {
    word: string;
    className: string;
  };
}

export function SplitText({
  lines,
  as: Component = 'h1',
  className = '',
  lineClassName = '',
  delayStart = 0.1,
  accentWord,
}: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const fullText = lines.join(' ');

  if (shouldReduceMotion) {
    return (
      <Component className={className} aria-label={fullText}>
        {lines.map((line, idx) => (
          <span key={idx} className={`block ${lineClassName}`}>
            {accentWord && line.includes(accentWord.word) ? (
              line.split(accentWord.word).map((part, pIdx, arr) => (
                <React.Fragment key={pIdx}>
                  {part}
                  {pIdx < arr.length - 1 && (
                    <span className={accentWord.className}>
                      {accentWord.word}
                    </span>
                  )}
                </React.Fragment>
              ))
            ) : (
              line
            )}
          </span>
        ))}
      </Component>
    );
  }

  return (
    <Component className={className} aria-label={fullText}>
      {lines.map((line, idx) => (
        <span
          key={idx}
          className="block overflow-hidden pb-1"
          style={{ willChange: 'transform' }}
        >
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: delayStart + idx * 0.12,
              ease: TRANSITION_EASE,
            }}
          >
            {accentWord && line.includes(accentWord.word) ? (
              line.split(accentWord.word).map((part, pIdx, arr) => (
                <React.Fragment key={pIdx}>
                  {part}
                  {pIdx < arr.length - 1 && (
                    <span className={accentWord.className}>
                      {accentWord.word}
                    </span>
                  )}
                </React.Fragment>
              ))
            ) : (
              line
            )}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
