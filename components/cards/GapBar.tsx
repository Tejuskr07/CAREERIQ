import React from "react";
import { SkillGapDetail } from "@/lib/scoring";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface GapBarProps {
  detail: SkillGapDetail;
  showCategory?: boolean;
  className?: string;
}

export function GapBar({ detail, showCategory = true, className }: GapBarProps) {
  const isSatisfied = detail.gap === 0;

  return (
    <div className={cn("p-4 rounded-xl bg-white border border-border shadow-sm flex flex-col gap-2.5", className)}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-sm text-ink-900">{detail.name}</h4>
            {isSatisfied ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-teal px-2 py-0.5 rounded-full bg-teal-soft">
                <CheckCircle2 className="w-3 h-3" /> Met
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 px-2 py-0.5 rounded-full bg-amber-soft">
                <AlertCircle className="w-3 h-3" /> Gap: -{detail.gap}
              </span>
            )}
          </div>
          {showCategory && <p className="text-xs text-ink-500 mt-0.5">{detail.category}</p>}
        </div>

        <div className="text-right">
          <span className="text-xs font-mono text-ink-500">
            Weight: <strong>{Math.round(detail.weight * 100)}%</strong>
          </span>
          <div className="text-[11px] text-ink-500 font-mono">
            Urgency: <span className="font-semibold text-ink-700">{detail.urgencyScore.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Visual Dual-Bar for Measured vs Required */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs font-mono text-ink-500">
          <span>Current: <strong className="text-ink-900">{detail.measuredLevel}/100</strong></span>
          <span>Target: <strong className="text-ink-900">{detail.requiredLevel}/100</strong></span>
        </div>

        <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          {/* Target requirement marker / background guide */}
          <div
            className="absolute top-0 bottom-0 bg-slate-300 rounded-full"
            style={{ width: `${detail.requiredLevel}%` }}
          />
          {/* Measured progress fill */}
          <div
            className={cn(
              "absolute top-0 bottom-0 rounded-full transition-all duration-500",
              isSatisfied ? "bg-teal" : detail.measuredLevel < 40 ? "bg-coral" : "bg-primary"
            )}
            style={{ width: `${Math.min(100, detail.measuredLevel)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
