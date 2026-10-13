import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white text-ink-700 pt-10 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold font-heading">
                CQ
              </div>
              <span className="font-heading font-bold text-lg text-ink-900">CAREERIQ</span>
            </div>
            <p className="text-xs text-ink-500 leading-relaxed max-w-sm">
              AI-Powered Diagnostic Skill Gap Engine &amp; Time-Budgeted Career Readiness Platform.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-ink-900 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-1.5 text-xs text-ink-500">
              <li><Link href="/dashboard" className="hover:text-primary">Student Dashboard</Link></li>
              <li><Link href="/readiness" className="hover:text-primary">Gap Analysis</Link></li>
              <li><Link href="/roadmap" className="hover:text-primary">Time-Budget Roadmap</Link></li>
              <li><Link href="/what-if" className="hover:text-primary">What-If Simulator</Link></li>
              <li><Link href="/calibration" className="hover:text-primary">Confidence Calibration</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-ink-900 uppercase tracking-wider">Methodology</h4>
            <ul className="space-y-1.5 text-xs text-ink-500">
              <li><Link href="/how-it-works" className="hover:text-primary">Deterministic Scoring Formula</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary">Greedy Knapsack Scheduler</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary">Confidence Calibration Metric</Link></li>
              <li><Link href="/lecturer" className="hover:text-primary">Lecturer Analytics</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-500">
          <p>© 2026 CAREERIQ. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/how-it-works" className="hover:text-primary">Documentation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
