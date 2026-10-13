"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Users, Search, Download, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

interface StudentRosterRow {
  usn: string;
  name: string;
  targetRole: string;
  readiness: number;
  topGapSkill: string;
  calibrationStatus: "Overconfident" | "Well Calibrated" | "Underconfident";
  gapScore: number;
}

const ROSTER_MOCK: StudentRosterRow[] = [
  {
    usn: "1BY23CS042",
    name: "Aarav Sharma",
    targetRole: "Data Analyst",
    readiness: 56,
    topGapSkill: "SQL Window Functions",
    calibrationStatus: "Overconfident",
    gapScore: 25,
  },
  {
    usn: "1BY23CS015",
    name: "Ananya Rao",
    targetRole: "Full-Stack Engineer",
    readiness: 74,
    topGapSkill: "System Design",
    calibrationStatus: "Well Calibrated",
    gapScore: 8,
  },
  {
    usn: "1BY23CS028",
    name: "Chetan Kumar",
    targetRole: "ML Engineer",
    readiness: 62,
    topGapSkill: "MLOps Pipelines",
    calibrationStatus: "Underconfident",
    gapScore: -18,
  },
  {
    usn: "1BY23CS033",
    name: "Diya Patil",
    targetRole: "Cloud DevOps",
    readiness: 48,
    topGapSkill: "Docker & Kubernetes",
    calibrationStatus: "Overconfident",
    gapScore: 22,
  },
  {
    usn: "1BY23CS050",
    name: "Karan Nair",
    targetRole: "Data Analyst",
    readiness: 68,
    topGapSkill: "Business Statistics",
    calibrationStatus: "Well Calibrated",
    gapScore: 4,
  },
];

export default function ClassDetailPage() {
  const params = useParams();
  const classId = params?.id || "BCS506-A";

  return (
    <div className="flex-1 bg-paper min-h-screen p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/lecturer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-500 hover:text-ink-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cohort Overview</span>
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            Cohort Student Drilldown
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink-900 tracking-tight">
            Class {classId} Student Roster
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            Individual student diagnostic results, target benchmarks, and confidence calibration flags.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="px-4 py-2.5 rounded-xl border border-border bg-slate-50 text-xs font-semibold text-ink-700 hover:bg-slate-100 transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Roster CSV</span>
        </button>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-3xl border border-border shadow-sm p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-border text-ink-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">USN</th>
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-3">Target Career Benchmark</th>
                <th className="py-3 px-3 text-center">Readiness</th>
                <th className="py-3 px-3">Primary Deficit Gap</th>
                <th className="py-3 px-3 text-center">Confidence Flag</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ROSTER_MOCK.map((student) => (
                <tr key={student.usn} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-mono font-bold text-ink-900">{student.usn}</td>
                  <td className="py-3.5 px-3 font-semibold text-ink-900">{student.name}</td>
                  <td className="py-3.5 px-3 text-ink-600">{student.targetRole}</td>
                  <td className="py-3.5 px-3 text-center font-mono font-bold">
                    <span
                      className={`px-2.5 py-0.5 rounded-full ${
                        student.readiness >= 70
                          ? "bg-teal-soft text-teal"
                          : student.readiness >= 50
                          ? "bg-amber-soft text-amber-700"
                          : "bg-coral-soft text-coral"
                      }`}
                    >
                      {student.readiness}%
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-ink-800">{student.topGapSkill}</td>
                  <td className="py-3.5 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                        student.calibrationStatus === "Overconfident"
                          ? "bg-coral-soft text-coral border-red-200"
                          : student.calibrationStatus === "Underconfident"
                          ? "bg-sky-soft text-sky-800 border-sky-200"
                          : "bg-teal-soft text-teal border-teal-200"
                      }`}
                    >
                      {student.calibrationStatus} ({student.gapScore > 0 ? `+${student.gapScore}` : student.gapScore})
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href="/dashboard"
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Inspect Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
