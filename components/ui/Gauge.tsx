"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ShieldCheck, AlertTriangle, AlertCircle } from "lucide-react";

interface GaugeProps {
  score: number; // 0 - 100
  size?: number; // width in px
  strokeWidth?: number;
  label?: string;
  showIcon?: boolean;
  subLabel?: string;
  animate?: boolean;
  className?: string;
}

export function Gauge({
  score,
  size = 220,
  strokeWidth = 14,
  label = "Readiness Score",
  showIcon = true,
  subLabel,
  animate = true,
  className,
}: GaugeProps) {
  const [currentScore, setCurrentScore] = useState(animate ? 0 : score);

  useEffect(() => {
    if (!animate) {
      setCurrentScore(score);
      return;
    }
    const timeout = setTimeout(() => {
      setCurrentScore(score);
    }, 50);
    return () => clearTimeout(timeout);
  }, [score, animate]);

  // Radius for semi-circle
  const radius = (size - strokeWidth * 2) / 2;
  const arcLength = Math.PI * radius; // exact length of 180° semi-circle
  const progress = Math.max(0, Math.min(100, currentScore));
  const strokeDashoffset = arcLength * (1 - progress / 100);

  // SVG Coordinates for a clean top semi-circle arch
  // Start on the left, arc over the top, end on the right
  const startX = strokeWidth;
  const startY = radius + strokeWidth;
  const endX = size - strokeWidth;
  const endY = radius + strokeWidth;
  const arcPath = `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;

  // Color mapping based on plan rules: coral < 40, amber 40-70, teal >= 70
  let strokeColor = "#EF4444"; // coral
  let textBadgeColor = "text-red-700 bg-red-50 border-red-200";
  let statusText = "Needs Focus";
  let Icon = AlertCircle;

  if (currentScore >= 70) {
    strokeColor = "#14B8A6"; // teal
    textBadgeColor = "text-teal-700 bg-teal-50 border-teal-200";
    statusText = "Career Ready";
    Icon = ShieldCheck;
  } else if (currentScore >= 40) {
    strokeColor = "#F59E0B"; // amber
    textBadgeColor = "text-amber-700 bg-amber-50 border-amber-200";
    statusText = "In Progress";
    Icon = AlertTriangle;
  }

  // Svg height is radius + strokeWidth + padding
  const svgHeight = radius + strokeWidth + 6;

  return (
    <div className={cn("flex flex-col items-center justify-center select-none", className)}>
      <div className="relative flex flex-col items-center" style={{ width: size }}>
        <svg
          width={size}
          height={svgHeight}
          viewBox={`0 0 ${size} ${svgHeight}`}
          className="overflow-visible"
        >
          {/* Background track semi-circle */}
          <path
            d={arcPath}
            fill="none"
            stroke="#E3E6F0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Active progress semi-circle */}
          <path
            d={arcPath}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: "stroke-dashoffset 800ms cubic-bezier(0.16, 1, 0.3, 1), stroke 400ms ease",
            }}
          />
        </svg>

        {/* Center score readout - neatly nestled inside the arch */}
        <div className="absolute inset-x-0 bottom-2 flex flex-col items-center text-center pointer-events-none">
          <span
            className="font-mono font-extrabold tracking-tight text-ink-900 transition-all duration-300"
            style={{ fontSize: size * 0.24, lineHeight: 1 }}
          >
            {Math.round(currentScore)}
            <span className="text-ink-500 font-sans font-normal text-sm ml-0.5">%</span>
          </span>
          {label && (
            <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider mt-1.5">
              {label}
            </span>
          )}
        </div>
      </div>

      {/* Status chip with icon - positioned safely below the arch with clear breathing room */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <div
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-xs",
            textBadgeColor
          )}
        >
          {showIcon && <Icon className="w-3.5 h-3.5" />}
          <span>{statusText}</span>
        </div>
        {subLabel && <span className="text-xs text-ink-500 font-mono">{subLabel}</span>}
      </div>
    </div>
  );
}
