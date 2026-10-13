import React from "react";
import { cn } from "@/lib/utils";

interface SkillChipProps {
  label: string;
  category?: string;
  level?: number;
  onRemove?: () => void;
  className?: string;
}

export function SkillChip({ label, category, level, onRemove, className }: SkillChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-primary-soft text-primary-dark border border-indigo-100",
        className
      )}
    >
      <span>{label}</span>
      {level !== undefined && (
        <span className="font-mono text-[11px] font-semibold text-primary px-1 bg-white/70 rounded">
          {level}%
        </span>
      )}
      {category && <span className="text-[10px] text-ink-500">· {category}</span>}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 text-ink-500 hover:text-coral transition-colors"
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
}
