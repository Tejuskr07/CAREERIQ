"use client";

import React, { useEffect, useState } from "react";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { SkillGapDetail } from "@/lib/scoring";

interface RadarGapChartProps {
  details: SkillGapDetail[];
  height?: number;
}

export function RadarGapChart({ details, height = 320 }: RadarGapChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ height }} className="w-full flex items-center justify-center bg-slate-50/50 rounded-xl">
        <span className="text-xs text-ink-500">Loading chart...</span>
      </div>
    );
  }

  const chartData = details.map((d) => ({
    skill: d.name.length > 18 ? d.name.slice(0, 16) + "..." : d.name,
    fullName: d.name,
    Measured: d.measuredLevel,
    Required: d.requiredLevel,
    Gap: d.gap,
  }));

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="#E2E8F0" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: "#5B6585", fontSize: 11, fontWeight: 500 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#CBD5E1" tick={{ fontSize: 10 }} />
          <Radar
            name="Target Requirement"
            dataKey="Required"
            stroke="#4F46E5"
            fill="#4F46E5"
            fillOpacity={0.15}
            strokeWidth={2}
          />
          <Radar
            name="Measured Level"
            dataKey="Measured"
            stroke="#14B8A6"
            fill="#14B8A6"
            fillOpacity={0.4}
            strokeWidth={2}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="p-3 bg-ink-900 text-white rounded-xl text-xs shadow-lg border border-ink-700">
                    <p className="font-semibold text-teal-300 mb-1">{data.fullName}</p>
                    <div className="flex justify-between gap-4 font-mono text-[11px]">
                      <span>Measured:</span>
                      <strong>{data.Measured}/100</strong>
                    </div>
                    <div className="flex justify-between gap-4 font-mono text-[11px]">
                      <span>Required:</span>
                      <strong>{data.Required}/100</strong>
                    </div>
                    <div className="flex justify-between gap-4 font-mono text-[11px] text-amber-300">
                      <span>Skill Gap:</span>
                      <strong>{data.Gap} pts</strong>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
            iconType="circle"
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
