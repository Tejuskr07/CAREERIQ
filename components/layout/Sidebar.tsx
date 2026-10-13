"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardCheck,
  Target,
  Compass,
  SlidersHorizontal,
  Scale,
  Briefcase,
  Settings,
  GraduationCap,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/assessment", label: "Assessment", icon: ClipboardCheck },
  { href: "/readiness", label: "Gap Report", icon: Target },
  { href: "/roadmap", label: "Time-Budget", icon: Compass },
  { href: "/what-if", label: "What-If Simulator", icon: SlidersHorizontal },
  { href: "/calibration", label: "Calibration", icon: Scale },
  { href: "/roles", label: "Explore Roles", icon: Briefcase },
  { href: "/onboarding", label: "Onboarding Flow", icon: UserCheck },
  { href: "/lecturer", label: "Lecturer View", icon: GraduationCap },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-white flex flex-col justify-between shrink-0 h-[calc(100vh-4rem)] sticky top-16 select-none hidden md:flex">
      {/* Navigation list */}
      <div className="p-4 space-y-1">
        <div className="px-3 py-2 text-[11px] font-semibold text-ink-500 uppercase tracking-wider">
          Student Portal
        </div>

        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                isActive
                  ? "bg-primary text-white shadow-sm font-semibold"
                  : "text-ink-700 hover:bg-slate-100 hover:text-ink-900"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 transition-transform group-hover:scale-110",
                  isActive ? "text-white" : "text-ink-500 group-hover:text-primary"
                )}
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Mini info footer */}
      <div className="p-4 m-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-ink-500 space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-ink-900">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>CAREERIQ Engine</span>
        </div>
        <p className="text-[11px] text-ink-500">
          Deterministic Readiness Diagnostic
        </p>
        <div className="pt-1 flex items-center gap-2 text-[10px] text-primary">
          <Link href="/how-it-works" className="hover:underline">Methodology &amp; Formulas</Link>
        </div>
      </div>
    </aside>
  );
}

/**
 * Mobile Bottom Nav Bar for phones (<= 640px)
 */
export function MobileTabBar() {
  const pathname = usePathname();

  const mobileItems = [
    { href: "/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/readiness", label: "Gaps", icon: Target },
    { href: "/roadmap", label: "Roadmap", icon: Compass },
    { href: "/what-if", label: "What-If", icon: SlidersHorizontal },
    { href: "/calibration", label: "Calib", icon: Scale },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-border z-50 flex items-center justify-around py-2 px-1 shadow-lg">
      {mobileItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors",
              isActive ? "text-primary font-bold" : "text-ink-500 hover:text-ink-900"
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
