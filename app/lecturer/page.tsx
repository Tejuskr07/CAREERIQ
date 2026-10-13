"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ClassHeatmap } from "@/components/charts/ClassHeatmap";
import {
  GraduationCap,
  Users,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  TrendingDown,
  Clock,
  Sparkles,
  Layers,
  CheckCircle2,
} from "lucide-react";

export default function LecturerOverviewPage() {
  const [selectedClass, setSelectedClass] = useState("BCS506-A");

  const classes = [
    { id: "BCS506-A", name: "Section A · V Sem CSE (60 Students)" },
    { id: "BCS506-B", name: "Section B · V Sem CSE (58 Students)" },
    { id: "BCS506-C", name: "Section C · V Sem CSE (62 Students)" },
  ];

  return (
    <div className="flex-1 bg-paper min-h-screen p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header with Class Picker */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Faculty Curriculum Intelligence
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink-900 tracking-tight">
            Cohort Skill Gap Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-ink-500 mt-1">
            Aggregate student competency analytics, systemic overconfidence tracking, and automated lecture slot optimization.
          </p>
        </div>

        {/* Class switcher & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-border bg-slate-50 text-xs font-semibold text-ink-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <Link
            href="/lecturer/plan"
            className="px-4 py-2.5 rounded-xl bg-ink-900 text-white text-xs font-semibold shadow-sm hover:bg-slate-800 transition-all flex items-center gap-1.5"
          >
            <Clock className="w-4 h-4" />
            <span>Lecture-Slot Planner</span>
          </Link>
        </div>
      </div>

      {/* KPI Row (Avg readiness, students, top gap, % overrating) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-border shadow-sm space-y-1">
          <span className="text-xs font-semibold text-ink-500 uppercase">
            Avg Cohort Readiness
          </span>
          <div className="font-mono font-bold text-3xl text-ink-900">
            58.4%
          </div>
          <span className="text-[11px] font-mono text-teal block font-medium">
            +3.2% vs last assessment
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-border shadow-sm space-y-1">
          <span className="text-xs font-semibold text-ink-500 uppercase">
            Total Enrolled
          </span>
          <div className="font-mono font-bold text-3xl text-ink-900">
            60 Students
          </div>
          <span className="text-[11px] text-ink-500 block">
            56 completed Review 1 diagnostic
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-border shadow-sm space-y-1">
          <span className="text-xs font-semibold text-coral uppercase">
            Top Cohort Gap
          </span>
          <div className="font-mono font-bold text-2xl text-coral truncate">
            SQL Windowing
          </div>
          <span className="text-[11px] text-coral font-medium block">
            42% cohort deficit below target
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-border shadow-sm space-y-1">
          <span className="text-xs font-semibold text-amber-700 uppercase">
            Overconfidence Share
          </span>
          <div className="font-mono font-bold text-3xl text-amber-600">
            34%
          </div>
          <span className="text-[11px] text-amber-700 font-medium block">
            Overestimated ability by &gt;15 pts
          </span>
        </div>
      </div>

      {/* "Teach This Next" Recommendation Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-primary-soft to-indigo-50 border border-primary/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Automated Faculty Recommendation</span>
          </div>
          <span className="text-[10px] font-mono text-primary font-bold bg-white px-2 py-0.5 rounded border border-primary/20">
            Slide 8 Greedy Efficiency: 0.420
          </span>
        </div>

        <h3 className="font-heading font-extrabold text-xl text-ink-900">
          Teach This Next: Advanced Relational SQL &amp; CTE Aggregations
        </h3>

        <p className="text-xs sm:text-sm text-ink-700 leading-relaxed max-w-4xl">
          Addressing SQL query optimizations in a single 30-minute interactive lab slot delivers the highest aggregate gain for Section {selectedClass}, resolving the core bottleneck for 38 out of 60 students currently targeting Data &amp; Software Engineering roles.
        </p>

        <div className="pt-2 flex items-center gap-3">
          <Link
            href="/lecturer/plan"
            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>Generate 30-Min Lesson Outline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={`/lecturer/class/${selectedClass}`}
            className="px-4 py-2 rounded-xl bg-white border border-border text-xs font-semibold text-ink-700 hover:bg-slate-50 transition-all"
          >
            Student Roster Drilldown
          </Link>
        </div>
      </div>

      {/* Cohort Skill Heatmap */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-border shadow-sm space-y-4">
        <div>
          <h3 className="font-heading font-bold text-base text-ink-900">
            Cohort Competency Distribution Heatmap
          </h3>
          <p className="text-xs text-ink-500">
            Student distribution across proficiency buckets: Critical (&lt;40%), Emerging (40–70%), and Ready (&gt;70%)
          </p>
        </div>

        <ClassHeatmap totalStudents={60} />
      </div>

      {/* Overrating Share Per Skill (Slide 10) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-border shadow-sm space-y-4">
        <div>
          <h3 className="font-heading font-bold text-base text-ink-900">
            Systemic Overconfidence Share per Skill (Slide 10)
          </h3>
          <p className="text-xs text-ink-500">
            Percentage of class whose self-rating exceeded actual diagnostic quiz scores by &gt;15 points
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { skill: "SQL Window Functions", overPercent: 46, status: "Critical Blindspot" },
            { skill: "Business Statistics & Hypothesis Testing", overPercent: 38, status: "High Blindspot" },
            { skill: "Data Visualization & Dashboard Design", overPercent: 24, status: "Moderate" },
            { skill: "Python Analytics (Pandas Vectorization)", overPercent: 18, status: "Low Blindspot" },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-paper border border-border flex items-center justify-between">
              <div>
                <strong className="text-xs font-bold text-ink-900 block">{item.skill}</strong>
                <span className="text-[11px] text-ink-500">{item.status}</span>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-sm text-coral">{item.overPercent}%</span>
                <span className="text-[10px] text-ink-500 block">of class</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
