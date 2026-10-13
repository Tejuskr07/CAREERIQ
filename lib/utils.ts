import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

export function getScoreColor(score: number): {
  color: string;
  bgSoft: string;
  borderColor: string;
  label: string;
} {
  if (score >= 70) {
    return {
      color: "text-teal-600",
      bgSoft: "bg-teal-50",
      borderColor: "border-teal-200",
      label: "Ready / High",
    };
  }
  if (score >= 40) {
    return {
      color: "text-amber-600",
      bgSoft: "bg-amber-50",
      borderColor: "border-amber-200",
      label: "Emerging Gap",
    };
  }
  return {
    color: "text-coral",
    bgSoft: "bg-coral-soft",
    borderColor: "border-red-200",
    label: "Critical Gap",
  };
}
