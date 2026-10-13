"use client";

import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProgressHistoryChartProps {
  currentScore: number;
  height?: number;
}

export function ProgressHistoryChart({ currentScore, height = 220 }: ProgressHistoryChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ height }} className="w-full flex items-center justify-center bg-slate-50/50 rounded-xl">
        <span className="text-xs text-ink-500">Loading progress data...</span>
      </div>
    );
  }

  const data = [
    { week: "Week 1", score: 38 },
    { week: "Week 2", score: 44 },
    { week: "Week 3", score: 49 },
    { week: "Week 4", score: 52 },
    { week: "Current", score: currentScore },
  ];

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#5B6585" }} />
          <YAxis domain={[20, 100]} tick={{ fontSize: 10, fill: "#5B6585" }} unit="%" />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="p-2.5 bg-ink-900 text-white rounded-lg text-xs shadow-md border border-ink-700">
                    <p className="text-slate-400">{payload[0].payload.week}</p>
                    <p className="font-mono font-bold text-teal-300">
                      Readiness: {payload[0].value}%
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#4F46E5"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#scoreGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
