"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Gauge } from "@/components/ui/Gauge";
import { ScoreDelta } from "@/components/ui/ScoreDelta";
import { GapBar } from "@/components/cards/GapBar";
import { TaskCard } from "@/components/cards/TaskCard";
import { ProgressHistoryChart } from "@/components/charts/ProgressHistoryChart";
import { useStudentStore } from "@/store/useStudent";
import { generateGreedyRoadmap } from "@/lib/roadmap";
import {
  ArrowRight,
  ClipboardCheck,
  SlidersHorizontal,
  Compass,
  Scale,
  Sparkles,
  AlertCircle,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function DashboardPage() {
  const {
    studentName,
    getCurrentRole,
    getReadiness,
    getCalibration,
    classBudgetMinutes,
    selfStudyBudgetMinutes,
    getAllTasks,
    ratings,
    completedTaskIds,
    toggleTaskCompletion,
  } = useStudentStore();

  const currentRole = getCurrentRole();
  const readiness = getReadiness();
  const calibration = getCalibration();
  const allTasks = getAllTasks();

  // Generate today's roadmap based on budget
  const roadmap = generateGreedyRoadmap(
    currentRole.skills,
    ratings,
    allTasks,
    {
      classMinutes: classBudgetMinutes,
      selfStudyMinutes: selfStudyBudgetMinutes,
    }
  );

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Greeting Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Career Diagnostic Center
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink-900 tracking-tight">
              Welcome back, {studentName} 👋
            </h1>
            <p className="text-xs sm:text-sm text-ink-500 mt-1">
              Tracking career preparedness for <strong className="text-ink-900 font-semibold">{currentRole.title}</strong> benchmark.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/assessment"
              className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-sm hover:bg-primary-dark transition-all flex items-center gap-1.5"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Diagnostic Assessment</span>
            </Link>
            <Link
              href="/what-if"
              className="px-4 py-2.5 rounded-xl bg-slate-100 text-ink-900 text-xs font-semibold hover:bg-slate-200 transition-all flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>What-If Sandbox</span>
            </Link>
          </div>
        </div>

        {/* Top Metric Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Hero Readiness Gauge Card */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-border shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
                  Verified Readiness
                </span>
                <h3 className="font-heading font-bold text-lg text-ink-900">
                  {currentRole.title}
                </h3>
              </div>
              <ScoreDelta delta={4} label="vs last week" />
            </div>

            <div className="py-6 flex justify-center">
              <Gauge
                score={readiness.readinessScore}
                size={210}
                label="Aggregate Score"
                subLabel="Slide 7 Formula"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-ink-500">
                Total weighted gap: <strong className="text-ink-900 font-mono">{readiness.totalGap.toFixed(1)} pts</strong>
              </span>
              <Link href="/readiness" className="text-primary font-semibold hover:underline flex items-center gap-1">
                Full gap breakdown <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Readiness Progression Chart & Calibration Card */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Progress line chart */}
            <div className="p-6 rounded-3xl bg-white border border-border shadow-sm flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-heading font-bold text-base text-ink-900">
                    Readiness Progression
                  </h3>
                  <p className="text-xs text-ink-500">
                    Empirical trajectory across diagnostic assessment milestones
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-teal bg-teal-soft px-2.5 py-1 rounded-full">
                  +18% Overall Lift
                </span>
              </div>

              <ProgressHistoryChart currentScore={readiness.readinessScore} height={190} />
            </div>

            {/* Confidence Calibration mini-card */}
            <div className="p-5 rounded-2xl bg-white border border-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-soft text-amber-700">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-bold text-sm text-ink-900">
                      Confidence Calibration
                    </h4>
                    <span className="text-xs font-mono font-bold text-ink-900 bg-slate-100 px-2 py-0.5 rounded">
                      Score: {calibration.calibrationScore}/100
                    </span>
                  </div>
                  <p className="text-xs text-ink-500 mt-0.5">
                    {calibration.overconfidentCount > 0
                      ? `${calibration.overconfidentCount} skill has overconfidence risk (>+15 pts)`
                      : "Well calibrated self-perception aligned with quiz results"}
                  </p>
                </div>
              </div>

              <Link
                href="/calibration"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-primary bg-primary-soft hover:bg-primary hover:text-white transition-all shrink-0"
              >
                Inspect Calibration
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section: Top 3 Gaps & Today's Roadmap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Top 3 Gaps */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-ink-900">
                  Critical Skill Deficits
                </h3>
                <p className="text-xs text-ink-500">
                  Ranked by urgency = weight × gap
                </p>
              </div>
              <Link href="/readiness" className="text-xs font-semibold text-primary hover:underline">
                View all ({readiness.details.length})
              </Link>
            </div>

            <div className="space-y-3">
              {readiness.topGaps.slice(0, 3).map((detail) => (
                <GapBar key={detail.skillId} detail={detail} />
              ))}
              {readiness.topGaps.length === 0 && (
                <div className="p-8 text-center text-xs text-ink-500">
                  All target role skill benchmarks satisfied! 🎉
                </div>
              )}
            </div>
          </div>

          {/* Today's Optimized Roadmap */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading font-bold text-base text-ink-900">
                    Greedy Time-Budget Plan
                  </h3>
                  <span className="text-[10px] font-mono text-primary font-bold bg-primary-soft px-1.5 py-0.5 rounded">
                    Slide 8
                  </span>
                </div>
                <p className="text-xs text-ink-500">
                  Budget: {roadmap.usedMinutes} of {roadmap.totalBudgetMinutes} min scheduled
                </p>
              </div>

              <Link href="/roadmap" className="text-xs font-semibold text-primary hover:underline">
                Configure Budget
              </Link>
            </div>

            {/* Time budget progress indicator */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-ink-500">
                <span>Class: {roadmap.classUsedMinutes}/{roadmap.classBudgetMinutes}m</span>
                <span>Self-Study: {roadmap.selfStudyUsedMinutes}/{roadmap.selfStudyBudgetMinutes}m</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                <div
                  className="bg-purple-500 h-full"
                  style={{ width: `${(roadmap.classUsedMinutes / roadmap.totalBudgetMinutes) * 100}%` }}
                />
                <div
                  className="bg-blue-500 h-full"
                  style={{ width: `${(roadmap.selfStudyUsedMinutes / roadmap.totalBudgetMinutes) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              {roadmap.selectedTasks.slice(0, 2).map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isCompleted={completedTaskIds.includes(task.id)}
                  onToggleComplete={() => toggleTaskCompletion(task.id)}
                />
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/roadmap"
                className="w-full py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-ink-900 font-semibold text-xs transition-all flex items-center justify-center gap-2 hover:bg-slate-100"
              >
                <span>View Full Sequence &amp; Recompute Steps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
