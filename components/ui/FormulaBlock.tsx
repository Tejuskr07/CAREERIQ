import React from "react";
import { cn } from "@/lib/utils";
import { Code, BookOpen } from "lucide-react";

interface FormulaBlockProps {
  title?: string;
  formula?: string;
  explanation?: string;
  variables?: { name: string; meaning: string }[];
  className?: string;
}

export function FormulaBlock({
  title = "Core Mathematical Formula (Deck Slide 7)",
  formula = "Readiness = 100 × ( 1 − Σ(weight × gap) / Σ(weight × required_level) )",
  explanation = "Quantifies overall industry job readiness as a percentage. It takes the weighted sum of skill gaps against the total weighted benchmark requirement. Zero AI hallucination, completely deterministic.",
  variables = [
    { name: "gap", meaning: "max(0, required_level − measured_level)" },
    { name: "weight", meaning: "Curriculum / O*NET industry relevance weighting (Σw = 1.0)" },
    { name: "required_level", meaning: "Target mastery benchmark (0–100) for the designated job role" },
    { name: "measured_level", meaning: "Student validated skill score from practical diagnostic test" },
  ],
  className,
}: FormulaBlockProps) {
  return (
    <div className={cn("p-5 rounded-2xl bg-ink-900 text-white border border-ink-700 shadow-md", className)}>
      <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-400">
        <Code className="w-4 h-4" />
        <span>{title}</span>
      </div>

      <div className="p-4 rounded-xl bg-ink-700/60 border border-ink-700 font-mono text-sm sm:text-base text-teal-300 overflow-x-auto my-2">
        <code>{formula}</code>
      </div>

      <div className="flex items-start gap-2 mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <BookOpen className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
        <p>{explanation}</p>
      </div>

      {variables && variables.length > 0 && (
        <div className="mt-4 pt-3 border-t border-ink-700 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {variables.map((v, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="font-mono text-amber-300 font-bold shrink-0">{v.name}:</span>
              <span className="text-slate-400">{v.meaning}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
