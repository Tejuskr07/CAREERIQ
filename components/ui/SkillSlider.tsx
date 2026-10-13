"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkillSliderProps {
  label: string;
  value: number; // 0 - 100
  onChange: (val: number) => void;
  requiredLevel?: number;
  category?: string;
  weight?: number;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function SkillSlider({
  label,
  value,
  onChange,
  requiredLevel,
  category,
  weight,
  min = 0,
  max = 100,
  step = 5,
  className,
}: SkillSliderProps) {
  const gap = requiredLevel !== undefined ? Math.max(0, requiredLevel - value) : 0;

  return (
    <div className={cn("flex flex-col gap-2 p-3 bg-white rounded-xl border border-border shadow-sm", className)}>
      <div className="flex items-center justify-between">
        <div>
          <span className="font-medium text-sm text-ink-900 block">{label}</span>
          <div className="flex items-center gap-2 mt-0.5">
            {category && <span className="text-[11px] text-ink-500">{category}</span>}
            {weight !== undefined && (
              <span className="text-[11px] font-mono text-ink-500 bg-slate-100 px-1.5 py-0.2 rounded">
                Weight: {Math.round(weight * 100)}%
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {requiredLevel !== undefined && (
            <span className="text-xs text-ink-500 font-mono">
              Req: <strong className="text-ink-700">{requiredLevel}</strong>
            </span>
          )}
          <span className="font-mono font-bold text-sm text-primary px-2 py-0.5 bg-primary-soft rounded-md min-w-[42px] text-center">
            {value}
          </span>
        </div>
      </div>

      {/* Slider input */}
      <div className="relative py-1 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={`${label} level slider`}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[44px]"
        />
        {requiredLevel !== undefined && (
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none w-1 h-3.5 bg-ink-900/60 rounded-full"
            style={{ left: `${requiredLevel}%` }}
            title={`Required: ${requiredLevel}`}
          />
        )}
      </div>

      {/* Gap status banner */}
      {requiredLevel !== undefined && (
        <div className="flex items-center justify-between text-[11px]">
          {gap > 0 ? (
            <span className="text-amber-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Gap: <strong className="font-mono">-{gap} pts</strong>
            </span>
          ) : (
            <span className="text-teal font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal" />
              Requirement satisfied (+{value - requiredLevel} surplus)
            </span>
          )}
          <span className="text-ink-500">Target: {requiredLevel}/100</span>
        </div>
      )}
    </div>
  );
}
