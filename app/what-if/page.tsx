"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { ScoreDelta } from "@/components/ui/ScoreDelta";
import { Gauge } from "@/components/ui/Gauge";
import { useStudentStore } from "@/store/useStudent";
import { simulateSkillChange, rankCloseRoles } from "@/lib/whatif";
import {
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Compass,
  CheckCircle2,
  Briefcase,
} from "lucide-react";

export default function WhatIfPage() {
  const { getCurrentRole, getAllRoles, ratings } = useStudentStore();
  const currentRole = getCurrentRole();
  const allRoles = getAllRoles();

  // Active skill being simulated
  const [activeSkillId, setActiveSkillId] = useState<string>(
    currentRole.skills[0]?.id || "sql"
  );

  const initialSkillLevel = ratings[activeSkillId]?.measured ?? 40;
  const [simulatedLevel, setSimulatedLevel] = useState<number>(initialSkillLevel);

  // Run simulation
  const simulation = simulateSkillChange(
    currentRole,
    ratings,
    activeSkillId,
    simulatedLevel
  );

  // Close roles ranked with updated simulated rating
  const simulatedRatingsMap = {
    ...ratings,
    [activeSkillId]: {
      ...ratings[activeSkillId],
      measured: simulatedLevel,
    },
  };
  const closeRoles = rankCloseRoles(allRoles, simulatedRatingsMap);

  const handleReset = () => {
    setSimulatedLevel(initialSkillLevel);
  };

  const activeSkillObj = currentRole.skills.find((s) => s.id === activeSkillId);

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Hypothetical Scenario Modeler
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-ink-500 font-mono">Slide 9 Sandbox</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink-900 tracking-tight">
              What-If Career Simulator
            </h1>
            <p className="text-xs sm:text-sm text-ink-500 mt-1">
              Simulate skill improvements in real-time and discover adjacent career readiness.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-ink-700 transition-all flex items-center gap-1.5 self-start md:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Simulation</span>
          </button>
        </div>

        {/* Simulation Controls & Dual Score View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Skill Picker & Slider */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-border shadow-sm space-y-6">
            <div>
              <label className="block text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">
                1. Select Skill to Boost
              </label>
              <div className="space-y-2">
                {currentRole.skills.map((skill) => {
                  const isSelected = skill.id === activeSkillId;
                  const currentMeasured = ratings[skill.id]?.measured ?? 0;
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => {
                        setActiveSkillId(skill.id);
                        setSimulatedLevel(ratings[skill.id]?.measured ?? 0);
                      }}
                      className={`w-full p-3 rounded-2xl text-left border text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? "border-primary bg-primary-soft font-semibold text-primary-dark ring-2 ring-primary/20"
                          : "border-border hover:bg-slate-50 text-ink-700"
                      }`}
                    >
                      <div>
                        <span className="font-medium text-ink-900 block">{skill.name}</span>
                        <span className="text-[11px] text-ink-500">
                          Weight: {Math.round(skill.weight * 100)}% · Target: {skill.requiredLevel}/100
                        </span>
                      </div>
                      <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-white border border-slate-200">
                        {currentMeasured} pts
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slider */}
            {activeSkillObj && (
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-ink-900">
                    Hypothetical Mastery Level:
                  </span>
                  <span className="font-mono font-bold text-primary text-base">
                    {simulatedLevel} / 100
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={simulatedLevel}
                  onChange={(e) => setSimulatedLevel(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />

                <div className="flex justify-between text-[11px] font-mono text-ink-500">
                  <span>Current: {simulation.originalLevel}</span>
                  <span>Target: {activeSkillObj.requiredLevel}</span>
                  <span>Max: 100</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Side-by-Side Current vs Simulated */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-border shadow-sm flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
                  Target Benchmark: {currentRole.title}
                </span>
                <h3 className="font-heading font-bold text-lg text-ink-900">
                  Projected Readiness Impact
                </h3>
              </div>

              <ScoreDelta delta={simulation.delta} label="Net Score Shift" />
            </div>

            {/* Side-by-side Numbers */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
                  Baseline Now
                </span>
                <div className="font-mono font-extrabold text-4xl sm:text-5xl text-ink-900">
                  {simulation.baselineReadiness}%
                </div>
                <span className="text-xs text-ink-500 block">
                  Original {activeSkillObj?.name.split(" ")[0]} = {simulation.originalLevel}
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-teal-soft/40 border border-teal-200 text-center space-y-2">
                <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
                  After Simulation
                </span>
                <div className="font-mono font-extrabold text-4xl sm:text-5xl text-teal">
                  {simulation.simulatedReadiness}%
                </div>
                <span className="text-xs text-teal-800 font-medium block">
                  Simulated {activeSkillObj?.name.split(" ")[0]} = {simulatedLevel}
                </span>
              </div>
            </div>

            {/* Impact Insight Note */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-ink-700 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong>Simulation Takeaway:</strong> Adjusting <em>{activeSkillObj?.name}</em> by{" "}
                <span className="font-mono font-semibold">
                  {simulatedLevel - simulation.originalLevel > 0
                    ? `+${simulatedLevel - simulation.originalLevel}`
                    : simulatedLevel - simulation.originalLevel}{" "}
                  pts
                </span>{" "}
                yields a{" "}
                <span className="font-mono font-bold text-primary">
                  {simulation.delta > 0 ? `+${simulation.delta}%` : `${simulation.delta}%`}
                </span>{" "}
                movement in total candidate employability.
              </div>
            </div>
          </div>
        </div>

        {/* Close & Adjacent Roles Ranked List */}
        <div className="bg-white p-6 rounded-3xl border border-border shadow-sm space-y-4">
          <div>
            <h3 className="font-heading font-bold text-base text-ink-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              <span>Adjacent &amp; Close Career Role Matches</span>
            </h3>
            <p className="text-xs text-ink-500">
              Evaluates your simulated skill profile across all occupational standards to reveal nearby career tracks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {closeRoles.map((roleMatch) => (
              <div
                key={roleMatch.roleId}
                className="p-4 rounded-2xl border border-border bg-paper hover:bg-white hover:shadow-cardHover transition-all flex flex-col justify-between gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-semibold text-primary uppercase">
                      {roleMatch.category}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-ink-900">{roleMatch.title}</h4>
                  </div>
                  <span
                    className={`font-mono font-bold text-xs px-2.5 py-0.5 rounded-full border ${
                      roleMatch.readinessScore >= 70
                        ? "text-teal bg-teal-soft border-teal-200"
                        : roleMatch.readinessScore >= 40
                        ? "text-amber-700 bg-amber-soft border-amber-200"
                        : "text-coral bg-coral-soft border-red-200"
                    }`}
                  >
                    {roleMatch.readinessScore}% Match
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-ink-500 pt-2 border-t border-slate-200">
                  <span>Remaining Gaps: {roleMatch.gapCount}</span>
                  <Link
                    href={`/roles`}
                    className="text-primary font-semibold hover:underline flex items-center gap-1"
                  >
                    View role <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
