"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { TaskCard } from "@/components/cards/TaskCard";
import { FormulaBlock } from "@/components/ui/FormulaBlock";
import { useStudentStore } from "@/store/useStudent";
import { generateGreedyRoadmap } from "@/lib/roadmap";
import { formatMinutes } from "@/lib/utils";
import {
  Compass,
  Clock,
  Zap,
  Sliders,
  CheckCircle2,
  Layers,
  Sparkles,
  ArrowRight,
  Info,
  ChevronDown,
} from "lucide-react";

export default function RoadmapPage() {
  const {
    getCurrentRole,
    ratings,
    getAllTasks,
    classBudgetMinutes,
    selfStudyBudgetMinutes,
    setTimeBudgets,
    completedTaskIds,
    toggleTaskCompletion,
  } = useStudentStore();

  const currentRole = getCurrentRole();
  const allTasks = getAllTasks();

  // Local budget state
  const [classMin, setClassMin] = useState(classBudgetMinutes);
  const [selfMin, setSelfMin] = useState(selfStudyBudgetMinutes);
  const [showStepViewer, setShowStepViewer] = useState(true);

  // Compute greedy roadmap
  const roadmap = generateGreedyRoadmap(
    currentRole.skills,
    ratings,
    allTasks,
    {
      classMinutes: classMin,
      selfStudyMinutes: selfMin,
    }
  );

  const handleApplyBudget = () => {
    setTimeBudgets(classMin, selfMin);
  };

  const classTasks = roadmap.selectedTasks.filter((t) => t.category === "Class");
  const selfStudyTasks = roadmap.selectedTasks.filter((t) => t.category === "Self-study");

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Greedy Knapsack Scheduler
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-ink-500 font-mono">Slide 8 Specification</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink-900 tracking-tight">
              Time-Budget Learning Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-ink-500 mt-1">
              Optimizes learning tasks within your daily time constraints based on empirical efficiency.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-teal bg-teal-soft px-3 py-1.5 rounded-xl border border-teal-200">
              +{roadmap.totalValueGained.toFixed(1)} Aggregate Value Yield
            </span>
          </div>
        </div>

        {/* Budget Control Panel */}
        <div className="bg-white p-6 rounded-3xl border border-border shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-ink-900">
              Configure Available Minutes
            </h3>
            <button
              type="button"
              onClick={handleApplyBudget}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Save as Default Budget
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Classroom Minutes Slider */}
            <div className="p-4 rounded-2xl bg-paper border border-border space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-purple-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  Class / Lab Period Budget:
                </span>
                <span className="font-mono font-bold text-purple-700 text-sm">
                  {classMin} Minutes
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="15"
                value={classMin}
                onChange={(e) => setClassMin(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-[11px] text-ink-500 font-mono">
                <span>0m</span>
                <span>30m (standard slot)</span>
                <span>60m</span>
                <span>90m (lab)</span>
              </div>
            </div>

            {/* Self-Study Minutes Slider */}
            <div className="p-4 rounded-2xl bg-paper border border-border space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-blue-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  Self-Study / Evening Budget:
                </span>
                <span className="font-mono font-bold text-blue-700 text-sm">
                  {selfMin} Minutes
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                step="15"
                value={selfMin}
                onChange={(e) => setSelfMin(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-ink-500 font-mono">
                <span>0m</span>
                <span>45m (quick drill)</span>
                <span>90m</span>
                <span>180m (deep sprint)</span>
              </div>
            </div>
          </div>

          {/* Budget Utilization Progress Bar */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex flex-wrap items-center justify-between text-xs font-mono">
              <div>
                <strong className="text-ink-900">Total Scheduled:</strong>{" "}
                {roadmap.usedMinutes} of {roadmap.totalBudgetMinutes} minutes used
              </div>
              <div className="flex items-center gap-4">
                <span className="text-purple-700">Class: {roadmap.classUsedMinutes}/{classMin}m</span>
                <span className="text-blue-700">Self-Study: {roadmap.selfStudyUsedMinutes}/{selfMin}m</span>
              </div>
            </div>

            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
              <div
                className="bg-purple-600 h-full transition-all duration-300"
                style={{ width: `${roadmap.totalBudgetMinutes > 0 ? (roadmap.classUsedMinutes / roadmap.totalBudgetMinutes) * 100 : 0}%` }}
                title="Class minutes"
              />
              <div
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${roadmap.totalBudgetMinutes > 0 ? (roadmap.selfStudyUsedMinutes / roadmap.totalBudgetMinutes) * 100 : 0}%` }}
                title="Self-study minutes"
              />
            </div>
          </div>
        </div>

        {/* Selected Tasks Timeline (Split by Class / Self-Study) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Column 1: Class Curriculum Tasks */}
          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-purple-950 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                  <span>Class &amp; Lab Exercises ({classTasks.length})</span>
                </h3>
                <p className="text-xs text-ink-500">
                  Tasks fitted into class periods ({roadmap.classUsedMinutes} min scheduled)
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {classTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isCompleted={completedTaskIds.includes(task.id)}
                  onToggleComplete={() => toggleTaskCompletion(task.id)}
                />
              ))}
              {classTasks.length === 0 && (
                <div className="p-8 text-center text-xs text-ink-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  No class tasks fit in available budget or gaps are met.
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Self-Study Tasks */}
          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-blue-950 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span>Self-Study &amp; Mini-Projects ({selfStudyTasks.length})</span>
                </h3>
                <p className="text-xs text-ink-500">
                  Independent drills fitted into study budget ({roadmap.selfStudyUsedMinutes} min scheduled)
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {selfStudyTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isCompleted={completedTaskIds.includes(task.id)}
                  onToggleComplete={() => toggleTaskCompletion(task.id)}
                />
              ))}
              {selfStudyTasks.length === 0 && (
                <div className="p-8 text-center text-xs text-ink-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  No self-study tasks fit in available budget or gaps are met.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recompute-Gap Step Viewer (Greedy Selection Traces) */}
        <div className="bg-white p-6 rounded-3xl border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-base text-ink-900">
                  Greedy Optimizer Step Trace
                </h3>
                <span className="text-[11px] font-mono text-primary font-bold bg-primary-soft px-2 py-0.5 rounded">
                  Slide 8 Algorithm Viewer
                </span>
              </div>
              <p className="text-xs text-ink-500">
                Detailed audit trail showing how remaining gap is recomputed after each greedy pick
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowStepViewer(!showStepViewer)}
              className="text-xs font-semibold text-ink-500 hover:text-ink-900 flex items-center gap-1"
            >
              <span>{showStepViewer ? "Hide Traces" : "Show Traces"}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${showStepViewer ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {showStepViewer && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-border text-ink-500 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Step #</th>
                    <th className="py-2.5 px-3">Picked Task</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3 text-center">Duration</th>
                    <th className="py-2.5 px-3 text-center">Gap Before → After</th>
                    <th className="py-2.5 px-3 text-center">Value Yield</th>
                    <th className="py-2.5 px-3 text-right">Efficiency (Value/Min)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {roadmap.pickSteps.map((step) => (
                    <tr key={step.stepNumber} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-mono font-bold text-primary">
                        #{step.stepNumber}
                      </td>
                      <td className="py-3 px-3 font-semibold text-ink-900 max-w-xs truncate">
                        {step.task.title}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            step.task.category === "Class"
                              ? "bg-purple-50 text-purple-700"
                              : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          {step.task.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-mono">
                        {step.task.durationMinutes}m
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-amber-700">
                        {step.gapBefore} → <strong className="text-teal font-bold">{step.gapAfter}</strong>
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-semibold text-teal">
                        +{step.taskValue}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-primary">
                        {step.efficiency.toFixed(4)}
                      </td>
                    </tr>
                  ))}
                  {roadmap.pickSteps.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-ink-500">
                        No tasks selected within available minutes. Increase your time budget above!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
