"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import { SkillCalibrationItem } from "@/lib/calibration";

interface DivergingCalibrationBarProps {
  items: SkillCalibrationItem[];
  height?: number;
}

export function DivergingCalibrationBar({ items, height = 300 }: DivergingCalibrationBarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ height }} className="w-full flex items-center justify-center bg-slate-50/50 rounded-xl">
        <span className="text-xs text-ink-500">Loading calibration chart...</span>
      </div>
    );
  }

  const chartData = items.map((item) => ({
    name: item.name.length > 15 ? item.name.slice(0, 14) + "…" : item.name,
    fullName: item.name,
    gap: item.gap,
    selfRating: item.selfRating,
    measuredLevel: item.measuredLevel,
    status: item.status,
  }));

  return (
    <div className="w-full flex flex-col gap-2" style={{ height }}>
      {/* Zone Legend Indicator */}
      <div className="flex flex-wrap items-center justify-between text-xs px-2 text-ink-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-sky" />
          <span>Underconfident (&lt; -15)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-teal" />
          <span>Well Calibrated (±15 Zone)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-coral" />
          <span>Overconfident (&gt; +15)</span>
        </div>
      </div>

      <div className="w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 15, right: 20, left: -10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#5B6585" }}
              interval={0}
              angle={-20}
              textAnchor="end"
            />
            <YAxis
              domain={[-50, 50]}
              tick={{ fontSize: 10, fill: "#5B6585" }}
              unit=" pts"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="p-3 bg-ink-900 text-white rounded-xl text-xs shadow-lg border border-ink-700">
                      <p className="font-semibold text-teal-300 mb-1">{data.fullName}</p>
                      <div className="flex justify-between gap-4 font-mono text-[11px]">
                        <span>Self Rating:</span>
                        <strong>{data.selfRating}</strong>
                      </div>
                      <div className="flex justify-between gap-4 font-mono text-[11px]">
                        <span>Measured Quiz:</span>
                        <strong>{data.measuredLevel}</strong>
                      </div>
                      <div className="flex justify-between gap-4 font-mono text-[11px] pt-1 border-t border-ink-700 mt-1">
                        <span>Calibration Gap:</span>
                        <strong
                          className={
                            data.gap > 15
                              ? "text-red-400"
                              : data.gap < -15
                              ? "text-sky-400"
                              : "text-teal-400"
                          }
                        >
                          {data.gap > 0 ? `+${data.gap}` : data.gap} pts
                        </strong>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            {/* Shaded well-calibrated reference band lines at +15 and -15 */}
            <ReferenceLine y={15} stroke="#14B8A6" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: "+15 Threshold", position: "insideTopRight", fill: "#14B8A6", fontSize: 10 }} />
            <ReferenceLine y={-15} stroke="#14B8A6" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: "-15 Threshold", position: "insideBottomRight", fill: "#14B8A6", fontSize: 10 }} />
            <ReferenceLine y={0} stroke="#94A3B8" strokeWidth={1.5} />

            <Bar dataKey="gap" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => {
                let barFill = "#14B8A6"; // calibrated
                if (entry.gap > 15) barFill = "#EF4444"; // overconfident
                if (entry.gap < -15) barFill = "#38BDF8"; // underconfident
                return <Cell key={`cell-${index}`} fill={barFill} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
