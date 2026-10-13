"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Gauge } from "@/components/ui/Gauge";
import { RadarGapChart } from "@/components/charts/RadarGapChart";
import { GapBar } from "@/components/cards/GapBar";
import { FormulaBlock } from "@/components/ui/FormulaBlock";
import { useStudentStore } from "@/store/useStudent";
import {
  Download,
  Printer,
  ChevronDown,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function ReadinessPage() {
  const { getCurrentRole, getReadiness, studentName, studentUsn } = useStudentStore();
  const currentRole = getCurrentRole();
  const readiness = getReadiness();
  const [showFormula, setShowFormula] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Formal Diagnostic Report
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-ink-500 font-mono">O*NET Standardized</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink-900 tracking-tight">
              Skill Gap &amp; Readiness Analysis
            </h1>
            <p className="text-xs sm:text-sm text-ink-500 mt-1">
              Evaluation for <strong className="text-ink-900">{currentRole.title}</strong> · {studentName} ({studentUsn})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl border border-border bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-ink-700 transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Export PDF</span>
            </button>
            <Link
              href="/roadmap"
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Build Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Top Section: Hero Gauge & Radar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Hero Gauge */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-border shadow-sm flex flex-col justify-between items-center text-center">
            <div className="w-full text-left">
              <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
                Readiness Score
              </span>
              <h3 className="font-heading font-bold text-lg text-ink-900">
                {currentRole.title}
              </h3>
            </div>

            <div className="py-4">
              <Gauge
                score={readiness.readinessScore}
                size={220}
                label="Overall Readiness"
                subLabel="Deck Slide 7 Verified"
              />
            </div>

            <div className="w-full pt-4 border-t border-slate-100 flex justify-between text-xs font-mono text-ink-500">
              <span>Required sum: <strong>{currentRole.skills.reduce((acc, s) => acc + s.requiredLevel * s.weight, 0).toFixed(1)}</strong></span>
              <span>Total weighted gap: <strong>{readiness.totalGap.toFixed(1)}</strong></span>
            </div>
          </div>

          {/* Radar Chart: Target vs Measured */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-border shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-heading font-bold text-base text-ink-900">
                Competency Radar (Target vs Measured)
              </h3>
              <p className="text-xs text-ink-500">
                Visualizing multidimensional benchmark fit across all required skill dimensions
              </p>
            </div>

            <div className="py-2">
              <RadarGapChart details={readiness.details} height={260} />
            </div>

            <div className="text-[11px] text-ink-500 text-center italic">
              Purple perimeter represents target benchmark level; Teal shape represents verified student performance.
            </div>
          </div>
        </div>

        {/* Expandable Formula Block */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setShowFormula(!showFormula)}
            className="w-full p-4 text-left flex items-center justify-between text-xs font-semibold text-ink-700 hover:text-primary transition-colors"
          >
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              <span>Inspect Mathematical Formula &amp; Scoring Logic (Slide 7)</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showFormula ? "rotate-180 text-primary" : ""}`}
            />
          </button>

          {showFormula && (
            <div className="p-4 pt-0 border-t border-slate-100">
              <FormulaBlock />
            </div>
          )}
        </div>

        {/* Skill Gap Detail Table */}
        <div className="bg-white rounded-3xl border border-border shadow-sm p-6 space-y-4">
          <div>
            <h3 className="font-heading font-bold text-base text-ink-900">
              Skill Breakdown Table
            </h3>
            <p className="text-xs text-ink-500">
              Complete matrix of required levels, measured capability, gaps, and weighted urgency
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-border text-ink-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Skill Name</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3 text-center">Required</th>
                  <th className="py-3 px-3 text-center">Measured</th>
                  <th className="py-3 px-3 text-center">Deficit Gap</th>
                  <th className="py-3 px-3 text-center">Weight</th>
                  <th className="py-3 px-3 text-right">Weighted Urgency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {readiness.details.map((row) => (
                  <tr key={row.skillId} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-ink-900">{row.name}</td>
                    <td className="py-3.5 px-3 text-ink-500">{row.category}</td>
                    <td className="py-3.5 px-3 text-center font-mono font-medium">{row.requiredLevel}/100</td>
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-primary">{row.measuredLevel}/100</td>
                    <td className="py-3.5 px-3 text-center">
                      {row.gap > 0 ? (
                        <span className="font-mono font-bold text-amber-700 bg-amber-soft px-2 py-0.5 rounded-full">
                          -{row.gap} pts
                        </span>
                      ) : (
                        <span className="font-mono font-semibold text-teal bg-teal-soft px-2 py-0.5 rounded-full">
                          Met
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono text-ink-500">
                      {Math.round(row.weight * 100)}%
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-ink-900">
                      {row.urgencyScore.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gap Bars Sorted by Urgency */}
        <div className="space-y-4">
          <div>
            <h3 className="font-heading font-bold text-base text-ink-900">
              Urgency Prioritized Action Items
            </h3>
            <p className="text-xs text-ink-500">
              Sorted by weight × gap to prioritize highest impact learning interventions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {readiness.topGaps.map((item) => (
              <GapBar key={item.skillId} detail={item} />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
