"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, User, Shield } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/onboarding");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 bg-white border border-border rounded-3xl shadow-cardHover space-y-6">
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-heading font-extrabold mx-auto mb-3">
            CQ
          </div>
          <h1 className="font-heading font-bold text-2xl text-ink-900">Create Account</h1>
          <p className="text-xs text-ink-500">Student Career Readiness Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 pl-10 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Aarav Sharma"
              />
              <User className="w-4 h-4 text-ink-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">University Seat Number (USN)</label>
            <div className="relative">
              <input
                type="text"
                value={usn}
                onChange={(e) => setUsn(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 pl-10 rounded-xl border border-border text-sm uppercase font-mono focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="1BY23CS042"
              />
              <Shield className="w-4 h-4 text-ink-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">Institutional Email</label>
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

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm shadow-sm hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Diagnostic Setup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-ink-500">
          Already registered?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
