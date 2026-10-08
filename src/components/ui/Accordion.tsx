'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id?: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className = '' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={`divide-y divide-[var(--border-color)] hairline-border-y ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `accordion-btn-${index}`;
        const panelId = `accordion-panel-${index}`;

        return (
          <div key={item.id || index} className="py-2">
            <button
              id={buttonId}
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between py-4 text-left font-display text-lg md:text-xl font-normal hover:text-[var(--signal)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--signal)]"
            >
              <span className="pr-4">{item.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-[var(--stone)] shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[var(--signal)]' : ''
                }`}
                strokeWidth={1.5}
              />
            </button>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="pb-5 pt-1 text-sm md:text-base text-[var(--muted-text)] leading-relaxed max-w-3xl"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
