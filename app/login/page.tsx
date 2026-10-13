"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, GraduationCap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("aarav.sharma@university.edu");
  const [password, setPassword] = useState("••••••••");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 bg-white border border-border rounded-3xl shadow-cardHover space-y-6">
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-heading font-extrabold mx-auto mb-3">
            CQ
          </div>
          <h1 className="font-heading font-bold text-2xl text-ink-900">Sign in to CareerIQ</h1>
          <p className="text-xs text-ink-500">Access your skill gap diagnostic and roadmap</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">
              Student / Faculty Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 pl-10 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="student@university.edu"
              />
              <Mail className="w-4 h-4 text-ink-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 pl-10 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Lock className="w-4 h-4 text-ink-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-1.5 text-ink-500">
              <input type="checkbox" defaultChecked className="rounded text-primary" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-primary hover:underline font-medium">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm shadow-sm hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
          >
            <span>Log in as Student</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            href="/lecturer"
            className="w-full py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-ink-700 font-semibold text-xs transition-all flex items-center justify-center gap-2 hover:bg-slate-100"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Switch to Faculty / Lecturer Login</span>
          </Link>
        </form>

        <p className="text-center text-xs text-ink-500">
          New student?{" "}
          <Link href="/onboarding" className="text-primary font-semibold hover:underline">
            Start Diagnostic Onboarding
          </Link>
        </p>
      </div>
    </div>
  );
}
