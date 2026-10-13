"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { RoleCard } from "@/components/cards/RoleCard";
import { useStudentStore } from "@/store/useStudent";
import { RoleDefinition } from "@/lib/whatif";
import { calculateReadiness } from "@/lib/scoring";
import {
  Briefcase,
  Search,
  Filter,
  X,
  CheckCircle2,
  ExternalLink,
  Layers,
} from "lucide-react";

export default function RolesPage() {
  const { getAllRoles, selectedRoleId, setSelectedRole, ratings } = useStudentStore();
  const allRoles = getAllRoles();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [inspectingRole, setInspectingRole] = useState<RoleDefinition | null>(null);

  const categories = ["All", ...Array.from(new Set(allRoles.map((r) => r.category)))];

  const filteredRoles = allRoles.filter((role) => {
    const matchesSearch =
      role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || role.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Occupational Standards Library
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-ink-500 font-mono">O*NET Integrated</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink-900 tracking-tight">
              Explore Career Pathways
            </h1>
            <p className="text-xs sm:text-sm text-ink-500 mt-1">
              Compare your current capability benchmarks against verified industry standards.
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search roles or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 bg-white border border-border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Search className="w-4 h-4 text-ink-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white border border-border text-ink-700 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => {
            const readiness = calculateReadiness(role.skills, ratings);
            const isTarget = role.id === selectedRoleId;

            return (
              <RoleCard
                key={role.id}
                role={role}
                readinessScore={readiness.readinessScore}
                isSelected={isTarget}
                onSelect={() => setSelectedRole(role.id)}
                onViewDetails={() => setInspectingRole(role)}
              />
            );
          })}
        </div>

        {/* Role Detail Drawer / Modal */}
        {inspectingRole && (
          <div className="fixed inset-0 z-50 bg-ink-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-border shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-primary uppercase">
                    {inspectingRole.category}
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-ink-900">
                    {inspectingRole.title}
                  </h3>
                  {inspectingRole.onetCode && (
                    <span className="text-xs font-mono text-ink-500 block mt-0.5">
                      O*NET Code: {inspectingRole.onetCode}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setInspectingRole(null)}
                  className="p-2 rounded-xl text-ink-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
                {inspectingRole.description}
              </p>

              {/* Skills and weights list */}
              <div className="space-y-3">
                <h4 className="font-heading font-bold text-sm text-ink-900">
                  Required Competency Weights &amp; Benchmarks
                </h4>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                  {inspectingRole.skills.map((s) => (
                    <div key={s.id} className="p-3.5 flex items-center justify-between text-xs bg-white">
                      <div>
                        <strong className="text-ink-900 block">{s.name}</strong>
                        <span className="text-[11px] text-ink-500">{s.category}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-primary block">
                          Required: {s.requiredLevel}/100
                        </span>
                        <span className="font-mono text-[11px] text-ink-500">
                          Weight: {Math.round(s.weight * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setInspectingRole(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-ink-700 bg-slate-100 hover:bg-slate-200"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole(inspectingRole.id);
                    setInspectingRole(null);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary-dark shadow-sm"
                >
                  Set as Target Role
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
