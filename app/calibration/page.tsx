"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { DivergingCalibrationBar } from "@/components/charts/DivergingCalibrationBar";
import { FormulaBlock } from "@/components/ui/FormulaBlock";
import { useStudentStore } from "@/store/useStudent";
import {
  Scale,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export default function CalibrationPage() {
  const { getCurrentRole, getCalibration, studentName } = useStudentStore();
  const currentRole = getCurrentRole();
  const report = getCalibration();

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Psychometric Metric
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-ink-500 font-mono">Slide 10 Specification</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink-900 tracking-tight">
              Confidence Calibration Report
            </h1>
            <p className="text-xs sm:text-sm text-ink-500 mt-1">
              Measuring alignment between your self-ratings and validated test scores to diagnose psychological bias.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/assessment"
              className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Retake Diagnostic Test</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Top Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-border shadow-sm">
            <span className="text-xs font-semibold text-ink-500 uppercase">
              Calibration Score
            </span>
            <div className="font-mono font-bold text-3xl text-ink-900 mt-1">
              {report.calibrationScore} / 100
            </div>
            <span className="text-[11px] text-ink-500 mt-1 block">
              100 − average |gap|
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-border shadow-sm">
            <span className="text-xs font-semibold text-ink-500 uppercase">
              Avg Absolute Gap
            </span>
            <div className="font-mono font-bold text-3xl text-ink-700 mt-1">
              ±{report.averageAbsoluteGap} pts
            </div>
            <span className="text-[11px] text-ink-500 mt-1 block">
              Discrepancy magnitude
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-border shadow-sm">
            <span className="text-xs font-semibold text-coral uppercase">
              Overconfident Skills
            </span>
            <div className="font-mono font-bold text-3xl text-coral mt-1">
              {report.overconfidentCount}
            </div>
            <span className="text-[11px] text-coral font-medium mt-1 block">
              Self &gt; Quiz by &gt;15 pts
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-border shadow-sm">
            <span className="text-xs font-semibold text-teal uppercase">
              Well Calibrated
            </span>
            <div className="font-mono font-bold text-3xl text-teal mt-1">
              {report.calibratedCount}
            </div>
            <span className="text-[11px] text-teal font-medium mt-1 block">
              Within ±15 pts tolerance
            </span>
          </div>
        </div>

        {/* Diverging Bar Chart */}
        <div className="p-6 rounded-3xl bg-white border border-border shadow-sm space-y-4">
          <div>
            <h3 className="font-heading font-bold text-base text-ink-900">
              Calibration Divergence Chart (±15 Band)
            </h3>
            <p className="text-xs text-ink-500">
              Positive values indicate overconfidence (self exceeds quiz), negative values indicate underconfidence
            </p>
          </div>

          <div className="py-2">
            <DivergingCalibrationBar items={report.items} height={280} />
          </div>

          <p className="text-[11px] text-ink-500 text-center italic">
            Dashed green horizontal lines denote the ±15 point calibrated threshold boundaries.
          </p>
        </div>

        {/* Detailed Table */}
        <div className="p-6 rounded-3xl bg-white border border-border shadow-sm space-y-4">
          <div>
            <h3 className="font-heading font-bold text-base text-ink-900">
              Skill Calibration Matrix
            </h3>
            <p className="text-xs text-ink-500">
              Comparing perceived proficiency vs measured performance
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-border text-ink-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Skill</th>
                  <th className="py-3 px-3 text-center">Self-Rating</th>
                  <th className="py-3 px-3 text-center">Quiz Measured</th>
                  <th className="py-3 px-3 text-center">Calibration Gap</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-4">Personalized Actionable Advice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {report.items.map((item) => (
                  <tr key={item.skillId} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-semibold text-ink-900">{item.name}</td>
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-ink-700">
                      {item.selfRating}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-primary">
                      {item.measuredLevel}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-semibold">
                      <span
                        className={
                          item.gap > 15
                            ? "text-coral"
                            : item.gap < -15
                            ? "text-sky-700"
                            : "text-teal"
                        }
                      >
                        {item.gap > 0 ? `+${item.gap}` : item.gap} pts
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                          item.status === "overconfident"
                            ? "bg-coral-soft text-coral border-red-200"
                            : item.status === "underconfident"
                            ? "bg-sky-soft text-sky-800 border-sky-200"
                            : "bg-teal-soft text-teal border-teal-200"
                        }`}
                      >
                        {item.statusLabel}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-ink-600 max-w-sm leading-relaxed">
                      {item.actionableTip}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Overconfidence Remediation Cards */}
        {report.overconfidentCount > 0 && (
          <div className="p-6 rounded-3xl bg-amber-50/60 border border-amber-200 space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-700" />
              <h3 className="font-heading font-bold text-base text-amber-950">
                High-Priority Intervention Tips for Overconfident Skills
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.items
                .filter((i) => i.status === "overconfident")
                .map((item) => (
                  <div key={item.skillId} className="p-4 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-sm text-ink-900">{item.name}</h4>
                      <span className="font-mono text-xs font-bold text-coral">
                        +{item.gap} pts overestimate
                      </span>
                    </div>
                    <p className="text-xs text-ink-600 leading-relaxed">
                      {item.actionableTip}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
