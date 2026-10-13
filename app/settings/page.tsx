"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useStudentStore } from "@/store/useStudent";
import { User, Shield, Clock, RotateCcw, Save, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const {
    studentName,
    studentUsn,
    classBudgetMinutes,
    selfStudyBudgetMinutes,
    setTimeBudgets,
    resetToDefaults,
  } = useStudentStore();

  const [classMin, setClassMin] = useState(classBudgetMinutes);
  const [selfMin, setSelfMin] = useState(selfStudyBudgetMinutes);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeBudgets(classMin, selfMin);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <AppShell>
      <div className="max-w-3xl space-y-8">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            Preferences &amp; Defaults
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink-900 tracking-tight">
            Account &amp; Study Settings
          </h1>
          <p className="text-xs sm:text-sm text-ink-500 mt-1">
            Configure your student identity and study budget parameters.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Identity info */}
          <div className="p-6 rounded-3xl bg-white border border-border shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-base text-ink-900 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <span>Student Profile Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue={studentName}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-slate-50 text-xs font-medium text-ink-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">USN Identifier</label>
                <input
                  type="text"
                  defaultValue={studentUsn}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-slate-50 text-xs font-mono font-medium text-ink-700 cursor-not-allowed"
                />
              </div>
            </div>

            <p className="text-[11px] text-ink-500">
              Verified academic student database identity record.
            </p>
          </div>

          {/* Time Budget */}
          <div className="p-6 rounded-3xl bg-white border border-border shadow-sm space-y-6">
            <h3 className="font-heading font-bold text-base text-ink-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Default Time Budget Allocations</span>
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-ink-900">
                <span>Class / Lab Period Minutes:</span>
                <span className="font-mono text-purple-700 font-bold">{classMin}m</span>
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
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-ink-900">
                <span>Self-Study / Homework Minutes:</span>
                <span className="font-mono text-blue-700 font-bold">{selfMin}m</span>
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
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={resetToDefaults}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-coral bg-red-50 hover:bg-red-100 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Data to Benchmark Defaults</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary-dark flex items-center gap-2 shadow-sm transition-all"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Preferences Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
