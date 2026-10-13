import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScoreDeltaProps {
  delta: number;
  label?: string;
  className?: string;
}

export function ScoreDelta({ delta, label, className }: ScoreDeltaProps) {
  if (delta === 0) {
    return (
      <span className={cn("inline-flex items-center gap-1 text-xs font-medium text-ink-500 bg-slate-100 px-2 py-0.5 rounded-full", className)}>
        <Minus className="w-3 h-3" />
        <span>No change</span>
        {label && <span className="opacity-80">({label})</span>}
      </span>
    );
  }

  const isPositive = delta > 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border",
        isPositive
          ? "text-teal-700 bg-teal-soft border-teal-200"
          : "text-red-700 bg-coral-soft border-red-200",
        className
      )}
    >
      {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
      <span className="font-mono">{isPositive ? `+${delta}%` : `${delta}%`}</span>
      {label && <span className="text-[11px] font-normal opacity-90">{label}</span>}
    </span>
  );
}
