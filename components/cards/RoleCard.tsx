"use client";

import React from "react";
import { RoleDefinition } from "@/lib/whatif";
import { cn } from "@/lib/utils";
import { Briefcase, ChevronRight, Check } from "lucide-react";

interface RoleCardProps {
  role: RoleDefinition;
  readinessScore: number;
  isSelected?: boolean;
  onSelect?: () => void;
  onViewDetails?: () => void;
  className?: string;
}

export function RoleCard({
  role,
  readinessScore,
  isSelected = false,
  onSelect,
  onViewDetails,
  className,
}: RoleCardProps) {
  let badgeColor = "text-coral bg-coral-soft border-red-200";
  if (readinessScore >= 70) {
    badgeColor = "text-teal bg-teal-soft border-teal-200";
  } else if (readinessScore >= 40) {
    badgeColor = "text-amber-700 bg-amber-soft border-amber-200";
  }

  return (
    <div
      className={cn(
        "p-5 rounded-2xl border transition-all duration-200 bg-white flex flex-col justify-between",
        isSelected
          ? "border-primary ring-2 ring-primary/20 shadow-md"
          : "border-border shadow-sm hover:border-primary/40 hover:shadow-cardHover",
        className
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary-soft text-primary">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
                {role.category}
              </span>
              <h3 className="font-heading font-bold text-base text-ink-900">{role.title}</h3>
            </div>
          </div>

          <div className={cn("px-2.5 py-1 rounded-full text-xs font-mono font-bold border", badgeColor)}>
            {readinessScore}% Match
          </div>
        </div>

        {role.onetCode && (
          <span className="inline-block text-[11px] font-mono text-ink-500 bg-slate-100 px-2 py-0.5 rounded mb-2">
            O*NET: {role.onetCode}
          </span>
        )}

        <p className="text-xs text-ink-500 line-clamp-2 mb-3 leading-relaxed">
          {role.description}
        </p>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {role.skills.slice(0, 3).map((s) => (
            <span
              key={s.id}
              className="text-[11px] font-medium text-ink-700 bg-slate-100 px-2 py-0.5 rounded-md"
            >
              {s.name}
            </span>
          ))}
          {role.skills.length > 3 && (
            <span className="text-[11px] font-mono text-ink-500 px-1 py-0.5">
              +{role.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        {onViewDetails && (
          <button
            type="button"
            onClick={onViewDetails}
            className="text-xs font-medium text-ink-500 hover:text-ink-900 transition-colors"
          >
            View curriculum
          </button>
        )}

        {onSelect && (
          <button
            type="button"
            onClick={onSelect}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all",
              isSelected
                ? "bg-primary text-white"
                : "bg-slate-100 text-ink-700 hover:bg-primary-soft hover:text-primary"
            )}
          >
            {isSelected ? (
              <>
                <Check className="w-3.5 h-3.5" /> Selected Target
              </>
            ) : (
              <>
                Set as Target <ChevronRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
