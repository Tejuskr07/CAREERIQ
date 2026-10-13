"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HeatmapRow {
  skill: string;
  buckets: {
    label: string; // e.g. "0-40% Critical", "40-70% Emerging", "70-100% Ready"
    count: number;
    percentage: number;
  }[];
}

interface ClassHeatmapProps {
  data?: HeatmapRow[];
  totalStudents?: number;
  className?: string;
}

const DEFAULT_HEATMAP_DATA: HeatmapRow[] = [
  {
    skill: "SQL & Databases",
    buckets: [
      { label: "Critical (<40%)", count: 18, percentage: 30 },
      { label: "Emerging (40-70%)", count: 27, percentage: 45 },
      { label: "Ready (70-100%)", count: 15, percentage: 25 },
    ],
  },
  {
    skill: "Python Analytics",
    buckets: [
      { label: "Critical (<40%)", count: 12, percentage: 20 },
      { label: "Emerging (40-70%)", count: 30, percentage: 50 },
      { label: "Ready (70-100%)", count: 18, percentage: 30 },
    ],
  },
  {
    skill: "Data Visualization",
    buckets: [
      { label: "Critical (<40%)", count: 8, percentage: 13 },
      { label: "Emerging (40-70%)", count: 28, percentage: 47 },
      { label: "Ready (70-100%)", count: 24, percentage: 40 },
    ],
  },
  {
    skill: "Business Statistics",
    buckets: [
      { label: "Critical (<40%)", count: 25, percentage: 42 },
      { label: "Emerging (40-70%)", count: 25, percentage: 42 },
      { label: "Ready (70-100%)", count: 10, percentage: 16 },
    ],
  },
  {
    skill: "System Design & Cloud",
    buckets: [
      { label: "Critical (<40%)", count: 22, percentage: 37 },
      { label: "Emerging (40-70%)", count: 26, percentage: 43 },
      { label: "Ready (70-100%)", count: 12, percentage: 20 },
    ],
  },
];

export function ClassHeatmap({
  data = DEFAULT_HEATMAP_DATA,
  totalStudents = 60,
  className,
}: ClassHeatmapProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <div className="min-w-[500px]">
        {/* Table header */}
        <div className="grid grid-cols-4 pb-2 border-b border-border text-xs font-semibold text-ink-500 uppercase tracking-wider">
          <div className="col-span-1">Curriculum Skill</div>
          <div className="col-span-1 text-center text-red-600">Critical (&lt;40%)</div>
          <div className="col-span-1 text-center text-amber-600">Emerging (40–70%)</div>
          <div className="col-span-1 text-center text-teal-600">Ready (&gt;70%)</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100">
          {data.map((row, idx) => (
            <div key={idx} className="grid grid-cols-4 py-3 items-center text-xs">
              <div className="col-span-1 font-medium text-ink-900 pr-2">
                {row.skill}
              </div>

              {row.buckets.map((b, bIdx) => {
                let cellBg = "bg-slate-50 text-ink-700";
                if (bIdx === 0) {
                  // critical
                  if (b.percentage > 35) cellBg = "bg-red-500 text-white font-bold";
                  else if (b.percentage > 20) cellBg = "bg-red-200 text-red-900 font-semibold";
                  else cellBg = "bg-red-50 text-red-700";
                } else if (bIdx === 1) {
                  // emerging
                  if (b.percentage > 45) cellBg = "bg-amber-400 text-amber-950 font-bold";
                  else if (b.percentage > 25) cellBg = "bg-amber-200 text-amber-900 font-semibold";
                  else cellBg = "bg-amber-50 text-amber-800";
                } else {
                  // ready
                  if (b.percentage > 35) cellBg = "bg-teal-500 text-white font-bold";
                  else if (b.percentage > 20) cellBg = "bg-teal-200 text-teal-900 font-semibold";
                  else cellBg = "bg-teal-50 text-teal-800";
                }

                return (
                  <div key={bIdx} className="col-span-1 px-1.5 flex justify-center">
                    <div
                      className={cn(
                        "w-full py-2 px-1 text-center rounded-lg transition-transform hover:scale-105 cursor-default flex flex-col items-center justify-center",
                        cellBg
                      )}
                      title={`${row.skill} - ${b.label}: ${b.count} students (${b.percentage}%)`}
                    >
                      <span className="font-mono text-xs">{b.count} sts</span>
                      <span className="text-[10px] opacity-80">{b.percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
