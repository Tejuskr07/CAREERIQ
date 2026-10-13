"use client";

import React from "react";
import { LearningTask } from "@/lib/roadmap";
import { cn, formatMinutes } from "@/lib/utils";
import { Clock, Zap, CheckCircle2, Circle, Sparkles, BookOpen, Layers } from "lucide-react";

interface TaskCardProps {
  task: LearningTask;
  efficiency?: number;
  taskValue?: number;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
  isCompact?: boolean;
  className?: string;
}

export function TaskCard({
  task,
  efficiency,
  taskValue,
  isCompleted = false,
  onToggleComplete,
  isCompact = false,
  className,
}: TaskCardProps) {
  const isClass = task.category === "Class";

  return (
    <div
      className={cn(
        "p-4 rounded-xl border transition-all duration-200 bg-white",
        isCompleted
          ? "border-teal/30 bg-teal-soft/20 opacity-80"
          : "border-border shadow-sm hover:shadow-cardHover hover:border-primary/40",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {onToggleComplete && (
            <button
              type="button"
              onClick={onToggleComplete}
              aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
              className="mt-0.5 text-ink-500 hover:text-teal transition-colors"
            >
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-teal fill-teal-soft" />
              ) : (
                <Circle className="w-5 h-5 text-slate-400" />
              )}
            </button>
          )}

          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <span
                className={cn(
                  "text-[11px] font-semibold px-2 py-0.5 rounded-full border",
                  isClass
                    ? "bg-purple-50 text-purple-700 border-purple-200"
                    : "bg-blue-50 text-blue-700 border-blue-200"
                )}
              >
                {task.category}
              </span>

              <span className="text-[11px] font-medium text-ink-500 bg-slate-100 px-2 py-0.5 rounded-full">
                {task.skillName}
              </span>

              <span className="text-[11px] text-ink-500 font-mono">
                {task.difficulty} · {task.resourceType}
              </span>
            </div>

            <h4
              className={cn(
                "text-sm font-semibold text-ink-900 leading-snug",
                isCompleted && "line-through text-ink-500"
              )}
            >
              {task.title}
            </h4>

            {!isCompact && (
              <p className="text-xs text-ink-500 mt-1 leading-relaxed">
                {task.description}
              </p>
            )}
          </div>
        </div>

        {/* Metrics Chip */}
        <div className="flex flex-col items-end shrink-0 gap-1 text-right">
          <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-ink-700 bg-slate-100 px-2 py-0.5 rounded-md">
            <Clock className="w-3 h-3 text-ink-500" />
            {formatMinutes(task.durationMinutes)}
          </span>

          <span className="text-[11px] font-mono text-teal-700 font-medium">
            +{task.levelGain} pts gain
          </span>

          {efficiency !== undefined && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-mono font-bold text-primary bg-primary-soft px-1.5 py-0.5 rounded">
              <Zap className="w-2.5 h-2.5" />
              Eff: {efficiency.toFixed(3)}
            </span>
          )}
        </div>
      </div>

      {/* Rationale note */}
      {task.llmRationale && !isCompact && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-start gap-1.5 text-[11px] text-slate-500 italic">
          <Sparkles className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
          <span>{task.llmRationale}</span>
        </div>
      )}
    </div>
  );
}
