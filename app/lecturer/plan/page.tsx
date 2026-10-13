"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Printer, Sparkles, BookOpen, CheckCircle2, Zap } from "lucide-react";

interface PlannedTopic {
  title: string;
  durationMinutes: number;
  cohortImpact: string;
  activityType: string;
  notes: string;
}

export default function LecturerPlanPage() {
  const [slotMinutes, setSlotMinutes] = useState(30);

  // Generate lesson outline according to available lecture slot
  const generateOutline = (minutes: number): PlannedTopic[] => {
    if (minutes <= 30) {
      return [
        {
          title: "Diagnostic Hook: Common Pitfalls in SQL Self-Perception",
          durationMinutes: 5,
          cohortImpact: "Addresses 46% overconfidence rate in Section A",
          activityType: "Brief Quiz Retrospective",
          notes: "Present anonymized test stats showing why DENSE_RANK vs RANK tripped up 28 students.",
        },
        {
          title: "Hands-on Lab: Window Partitioning & Common Table Expressions",
          durationMinutes: 18,
          cohortImpact: "Resolves top cohort gap (+15 pts gain for 38 students)",
          activityType: "Live Coding & Lab Exercise",
          notes: "Step through PostgreSQL execution plan with running total and partition by dept_id.",
        },
        {
          title: "Wrap-up & Rapid Exit Ticket",
          durationMinutes: 7,
          cohortImpact: "Validates instant retention and updates calibration metric",
          activityType: "Exit Ticket Assessment",
          notes: "2 multiple-choice questions submitted via student portal.",
        },
      ];
    } else {
      return [
        {
          title: "Diagnostic Review & Common Pitfalls Analysis",
          durationMinutes: 10,
          cohortImpact: "Exposes systemic conceptual blind spots across cohort",
          activityType: "Discussion",
          notes: "Walk through misjudged edge cases in query aggregation and indexing.",
        },
        {
          title: "Deep Dive: Window Functions, CTEs & Multi-table Joins",
          durationMinutes: 30,
          cohortImpact: "Closes 65% of cohort database skill deficit",
          activityType: "Interactive Workshop",
          notes: "Student lab pairing on production order/customer transaction schemas.",
        },
        {
          title: "Peer Problem Solving Sprint",
          durationMinutes: 12,
          cohortImpact: "Reinforces collaborative mastery",
          activityType: "Peer Review",
          notes: "Pairs cross-check query efficiency and EXPLAIN ANALYZE traces.",
        },
        {
          title: "Post-Lecture Verification Quiz",
          durationMinutes: 8,
          cohortImpact: "Directly recomputes measured ratings for all 60 students",
          activityType: "Formal Checkpoint",
          notes: "Automatic system ingestion into CareerIQ scoring engine.",
        },
      ];
    }
  };

  const outline = generateOutline(slotMinutes);
  const totalPlannedMinutes = outline.reduce((acc, o) => acc + o.durationMinutes, 0);

  return (
    <div className="flex-1 bg-paper min-h-screen p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/lecturer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-500 hover:text-ink-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Lecturer Overview</span>
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            Faculty Curriculum Optimization
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink-900 tracking-tight">
            Lecture-Slot Planner
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            Generates high-efficiency lesson outlines tailored to available teaching slots and cohort skill deficits.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="px-4 py-2.5 rounded-xl border border-border bg-slate-50 text-xs font-semibold text-ink-700 hover:bg-slate-100 transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>Print Lesson Outline</span>
        </button>
      </div>

      {/* Available Slot Input Slider */}
      <div className="bg-white p-6 rounded-3xl border border-border shadow-sm space-y-4">
        <div className="flex justify-between items-center text-xs font-semibold text-ink-900">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>Available Teaching Slot Duration:</span>
          </span>
          <span className="font-mono text-primary font-bold text-base">{slotMinutes} Minutes</span>
        </div>

        <input
          type="range"
          min="15"
          max="60"
          step="15"
          value={slotMinutes}
          onChange={(e) => setSlotMinutes(Number(e.target.value))}
          className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
        />

        <div className="flex justify-between text-[11px] font-mono text-ink-500">
          <span>15m (Micro intervention)</span>
          <span>30m (Recommended slot)</span>
          <span>45m (Standard period)</span>
          <span>60m (Extended lab)</span>
        </div>
      </div>

      {/* Generated Lesson Outline */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-border shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <h3 className="font-heading font-bold text-lg text-ink-900">
              Generated Lesson Plan: Advanced SQL Optimization
            </h3>
            <span className="text-xs text-ink-500">
              Target Cohort: Section BCS506-A · {totalPlannedMinutes} Minutes Planned
            </span>
          </div>

          <span className="font-mono text-xs font-bold text-teal bg-teal-soft px-3 py-1 rounded-xl self-start sm:self-auto border border-teal-200">
            Maximizes Class Efficiency: 0.420
          </span>
        </div>

        {/* Timeline items */}
        <div className="space-y-4">
          {outline.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-paper border border-border space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    {idx + 1}
                  </span>
                  <h4 className="font-heading font-bold text-sm text-ink-900">{item.title}</h4>
                </div>

                <span className="font-mono text-xs font-bold text-ink-700 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shrink-0">
                  {item.durationMinutes} min
                </span>
              </div>

              <div className="pl-8 text-xs text-ink-600 space-y-1">
                <div className="text-primary font-medium">
                  {item.activityType} · <span className="text-ink-500">{item.cohortImpact}</span>
                </div>
                <p className="text-slate-500 italic bg-white p-2.5 rounded-xl border border-slate-100">
                  <strong>Instructor Notes:</strong> {item.notes}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
