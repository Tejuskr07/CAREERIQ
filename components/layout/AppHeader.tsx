"use client";

import React from "react";
import Link from "next/link";
import { useStudentStore } from "@/store/useStudent";
import { Briefcase, ChevronDown, User, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppHeader() {
  const { selectedRoleId, setSelectedRole, getAllRoles, getReadiness, studentName, studentUsn } = useStudentStore();
  const roles = getAllRoles();
  const currentRole = roles.find((r) => r.id === selectedRoleId) || roles[0];
  const readiness = getReadiness();

  return (
    <div className="bg-white border-b border-border px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-16 z-30">
      {/* Target Role Switcher */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary-soft text-primary">
            <Briefcase className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium text-ink-500 hidden sm:inline">Target Track:</span>
        </div>

        <div className="relative">
          <select
            value={selectedRoleId}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="appearance-none bg-slate-50 border border-border text-ink-900 font-semibold text-xs sm:text-sm rounded-xl px-3 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
          >
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-ink-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Student & Score pills */}
      <div className="flex items-center gap-3">
        <Link
          href="/readiness"
          className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-50 border border-border hover:bg-slate-100 transition-colors"
        >
          <span className="text-xs text-ink-500">Readiness:</span>
          <span
            className={cn(
              "font-mono font-bold text-xs px-2 py-0.5 rounded-md",
              readiness.readinessScore >= 70
                ? "bg-teal-soft text-teal-700"
                : readiness.readinessScore >= 40
                ? "bg-amber-soft text-amber-700"
                : "bg-coral-soft text-coral"
            )}
          >
            {readiness.readinessScore}%
          </span>
        </Link>

        {/* User badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
            {studentName.charAt(0)}
          </div>
          <div className="hidden lg:block text-left text-xs leading-tight">
            <div className="font-semibold text-ink-900">{studentName}</div>
            <div className="text-[10px] text-ink-500 font-mono">{studentUsn}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
