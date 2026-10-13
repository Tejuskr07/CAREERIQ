import React from "react";
import Link from "next/link";
import { FormulaBlock } from "@/components/ui/FormulaBlock";
import { ArrowRight, CheckCircle2, BookOpen, Layers, Zap, Scale, FileText } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          Methodology &amp; Mathematical Foundations
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink-900 tracking-tight">
          How CareerIQ Works
        </h1>
        <p className="text-base text-ink-500 leading-relaxed max-w-3xl">
          CareerIQ replaces subjective intuition with verifiable, deterministic algorithms and empirical skill benchmarks.
        </p>
      </div>

      {/* Section 1: Scoring Formula */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-bold text-xs">
            1
          </div>
          <h2 className="font-heading font-bold text-xl text-ink-900">
            Readiness Scoring Algorithm (Slide 7)
          </h2>
        </div>
        <p className="text-sm text-ink-500 leading-relaxed">
          Job readiness is an aggregate benchmark computed across all skills required by an O*NET occupational standard. A gap is defined as the non-negative deficit between the industry required benchmark and the student&apos;s measured score:
        </p>

        <FormulaBlock
          title="Equation 1: Overall Career Readiness Score"
          formula="Readiness = 100 × ( 1 − Σ(weight × gap) / Σ(weight × required_level) )"
          explanation="Where gap = max(0, required_level − measured_level). If measured exceeds required, gap is 0 (surplus does not penalize or artificially inflate unrelated skills)."
        />

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-ink-700 space-y-1">
          <strong className="text-ink-900 font-semibold block">Verified Deck Example: Data Analyst</strong>
          <p>
            When a Data Analyst student has SQL at 40 (required 70), Python at 50 (required 80), Data Viz at 45 (required 75), and Statistics at 20 (required 80), their readiness is exactly <strong>56%</strong>. Increasing SQL from 40 to 70 lifts their readiness to <strong>72%</strong> (+16 pts).
          </p>
        </div>
      </div>

      {/* Section 2: Greedy Roadmap Scheduler */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-bold text-xs">
            2
          </div>
          <h2 className="font-heading font-bold text-xl text-ink-900">
            Time-Budget Greedy Scheduler (Slide 8)
          </h2>
        </div>
        <p className="text-sm text-ink-500 leading-relaxed">
          Standard recommendations overwhelm students with unachievable hours. CareerIQ models learning as a fractional knapsack variant where each task yields an empirical value:
        </p>

        <FormulaBlock
          title="Equation 2: Task Value & Efficiency"
          formula="Task Value = weight × min(level_gain, gap)   |   Efficiency = Task Value ÷ duration_minutes"
          explanation="At each iteration, the scheduler evaluates all available learning tasks, greedily picks the one with the maximum efficiency that fits within remaining class or self-study budget, and recomputes the remaining skill gap."
          variables={[
            { name: "level_gain", meaning: "Point increase in competency achieved upon completing task" },
            { name: "duration_minutes", meaning: "Real-world study time required (e.g. 25m, 30m, 45m)" },
            { name: "recompute", meaning: "As gaps shrink towards 0, future tasks in that skill yield diminished value" },
          ]}
        />
      </div>

      {/* Section 3: Confidence Calibration */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-bold text-xs">
            3
          </div>
          <h2 className="font-heading font-bold text-xl text-ink-900">
            Confidence Calibration Metric (Slide 10)
          </h2>
        </div>
        <p className="text-sm text-ink-500 leading-relaxed">
          Before taking objective tests, students rate their self-assessed competence (0–100). The gap highlights psychological alignment:
        </p>

        <FormulaBlock
          title="Equation 3: Calibration Divergence"
          formula="Calibration Gap = self_rating − measured_level   |   Calibration Score = 100 − average |gap|"
          explanation="Divergence > +15 identifies Overconfidence (interview blind spot). Divergence < -15 identifies Underconfidence (imposter syndrome). -15 to +15 is Well Calibrated."
        />
      </div>

      {/* Final Action */}
      <div className="pt-6 border-t border-border flex items-center justify-between">
        <Link href="/" className="text-xs font-semibold text-ink-500 hover:text-ink-900">
          ← Back to Overview
        </Link>
        <Link
          href="/dashboard"
          className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold flex items-center gap-2 shadow-sm"
        >
          <span>Try Interactive Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
