"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="border border-border rounded-xl bg-white overflow-hidden shadow-sm transition-all duration-200"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full px-5 py-4 text-left flex items-center justify-between font-medium text-ink-900 hover:text-primary transition-colors focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="font-heading font-semibold text-sm sm:text-base">{item.question}</span>
              <ChevronDown
                className={cn("w-4 h-4 text-ink-500 transition-transform duration-200 shrink-0 ml-3", isOpen && "rotate-180 text-primary")}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-sm text-ink-500 leading-relaxed border-t border-slate-100">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
