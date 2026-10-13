"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Gauge } from "@/components/ui/Gauge";
import { FormulaBlock } from "@/components/ui/FormulaBlock";
import { FAQAccordion, FAQItem } from "@/components/ui/FAQAccordion";
import { ScoreDelta } from "@/components/ui/ScoreDelta";
import {
  ArrowRight,
  Sparkles,
  Target,
  SlidersHorizontal,
  Compass,
  Scale,
  GraduationCap,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
  TrendingUp,
  Cpu,
  BarChart3,
  BookOpen,
  Award,
} from "lucide-react";

export default function LandingPage() {
  // Interactive Hero Demo State
  const [heroScore, setHeroScore] = useState(56);

  // Interactive Feature 1 Demo: Time-Budget Slider
  const [demoMinutes, setDemoMinutes] = useState(60);

  // Interactive Feature 2 Demo: What-If SQL Slider
  const [demoSqlLevel, setDemoSqlLevel] = useState(40);
  // Using the deck formula: SQL 40 -> 70 transforms 56% -> 72%
  const simulatedScore = Math.round(56 + ((demoSqlLevel - 40) / 30) * 16);

  // FAQ items
  const faqItems: FAQItem[] = [
    {
      question: "Why does CareerIQ avoid LLMs for readiness scoring?",
      answer:
        "As highlighted in Review 1 (Slide 9), student readiness scores and academic recommendations must be mathematically reproducible, fair, and free of hallucination. Scoring is calculated deterministically via a weighted gap formula using O*NET industry benchmarks. LLMs are reserved strictly for unstructured tasks like resume parsing and contextual lesson explanations.",
    },
    {
      question: "How does the Time-Budget Roadmap work?",
      answer:
        "Standard curriculum paths overload students with endless generic courses. CareerIQ’s greedy efficiency algorithm (Slide 8) evaluates each task's value (weight × effective gap gain) against its duration in minutes. It fits the highest yield tasks into your available classroom and self-study minutes.",
    },
    {
      question: "What is Confidence Calibration?",
      answer:
        "Students rate their own skills prior to diagnostic testing. Overconfidence (> +15 pts) exposes risky blind spots before placement interviews, while underconfidence (< -15 pts) identifies imposter syndrome. Slide 10 tracks calibration scores (100 − average |gap|) so educators can intervene.",
    },
    {
      question: "Can colleges and lecturers use this for batch curriculum planning?",
      answer:
        "Yes! The Lecturer Portal aggregates student cohorts into skill heatmaps and calculates cohort-wide gaps. Lecturers can input available class minutes (e.g. 30 min) to generate high-efficiency lesson plans that target the entire class's largest deficit.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-primary-soft/40 via-paper to-paper border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">


              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-ink-900 tracking-tight leading-[1.12]">
                Know your readiness. <br className="hidden sm:inline" />
                <span className="text-primary">Learn what matters.</span>
              </h1>

              <p className="text-base sm:text-lg text-ink-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Stop guessing job preparedness with vague advice. CareerIQ diagnoses exact skill gaps against O*NET industry benchmarks, budgets study minutes with a greedy optimizer, and calibrates self-confidence.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/onboarding"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm shadow-md hover:bg-primary-dark transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Start Free Diagnostic</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-border text-ink-900 font-semibold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Demo Student</span>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-ink-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal" />
                  <span>Deterministic Scoring (Deck Slide 7)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal" />
                  <span>O*NET Standard Competencies</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal" />
                  <span>Zero AI Hallucination</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Interactive Gauge (56 -> 72) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white border border-border shadow-cardHover relative">
                <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Target Role
                    </span>
                    <h3 className="font-heading font-bold text-lg text-ink-900">Data Analyst</h3>
                  </div>
                  <ScoreDelta delta={heroScore === 72 ? 16 : 0} label={heroScore === 72 ? "SQL +30 pts" : "Baseline"} />
                </div>

                <div className="py-4 flex justify-center">
                  <Gauge
                    score={heroScore}
                    size={210}
                    label="Current Readiness"
                    subLabel="O*NET 15-2051.01"
                  />
                </div>

                {/* Hero toggle trigger */}
                <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                  <div className="text-xs">
                    <span className="font-semibold text-ink-900 block">Simulate Skill Boost</span>
                    <span className="text-ink-500 text-[11px]">Toggle SQL mastery (40 → 70)</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setHeroScore(heroScore === 56 ? 72 : 56)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-dark transition-all shrink-0"
                  >
                    {heroScore === 56 ? "Boost to 72%" : "Reset to 56%"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem Strip (4 Motivation Cards) */}
      <section className="py-16 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              The Real Problem
            </h2>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-ink-900">
              Why traditional skill preparation fails students
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-paper border border-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-coral flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-heading font-bold text-base text-ink-900">Unclear Role Requirements</h4>
              <p className="text-xs text-ink-500 leading-relaxed">
                Students rarely know what proficiency levels (0–100) real industry roles mandate, leading to misplaced effort.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-paper border border-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-heading font-bold text-base text-ink-900">Uncalibrated Self-Perception</h4>
              <p className="text-xs text-ink-500 leading-relaxed">
                Overestimating competence creates harsh placement shocks; underestimating creates severe imposter syndrome.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-paper border border-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-primary flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-heading font-bold text-base text-ink-900">Unrealistic Multi-Month Roadmaps</h4>
              <p className="text-xs text-ink-500 leading-relaxed">
                Students abandon 60-hour course plans. They need granular tasks that respect daily 30-to-60 minute budgets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-paper border border-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal flex items-center justify-center font-bold">
                4
              </div>
              <h4 className="font-heading font-bold text-base text-ink-900">No Cohort Visibility for Lecturers</h4>
              <p className="text-xs text-ink-500 leading-relaxed">
                Professors cannot see which competencies a whole class struggles with, making revision lectures guesswork.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works (5-Step Pipeline) */}
      <section id="how-it-works" className="py-20 bg-paper border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Diagnostic Architecture
            </span>
            <h2 className="font-heading font-bold text-3xl text-ink-900 mt-1">
              5-Step Skill Gap &amp; Readiness Pipeline
            </h2>
            <p className="text-sm text-ink-500 mt-2">
              From resume extraction to greedy time optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              {
                step: "01",
                title: "Student Profile",
                desc: "Target role selection & automated resume extraction of technical skills.",
              },
              {
                step: "02",
                title: "Dual Assessment",
                desc: "Self-rating sliders (0–100) followed by diagnostic timed quiz questions.",
              },
              {
                step: "03",
                title: "Gap Engine",
                desc: "Deterministic computation of gap = max(0, required − measured) with O*NET weights.",
              },
              {
                step: "04",
                title: "Greedy Roadmap",
                desc: "Knapsack efficiency planner fits highest value tasks into class & self-study budgets.",
              },
              {
                step: "05",
                title: "What-If & Calib",
                desc: "Dynamic simulation and self-calibration reporting for students and lecturers.",
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-border shadow-sm flex flex-col justify-between hover:border-primary/50 transition-colors"
              >
                <div>
                  <span className="font-mono font-bold text-xs text-primary bg-primary-soft px-2 py-0.5 rounded">
                    {p.step}
                  </span>
                  <h4 className="font-heading font-bold text-sm text-ink-900 mt-3 mb-1">{p.title}</h4>
                  <p className="text-xs text-ink-500 leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] text-teal font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Ready
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Feature 1: Time-Budget Roadmap Live Demo */}
      <section id="features" className="py-20 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-semibold">
                <Compass className="w-3.5 h-3.5" />
                <span>Feature 1 · Deck Slide 8</span>
              </div>
              <h2 className="font-heading font-bold text-3xl text-ink-900">
                Time-Budget Roadmap Generator
              </h2>
              <p className="text-sm text-ink-500 leading-relaxed">
                Instead of demanding hours you don&apos;t have, CareerIQ evaluates task efficiency:
                <br />
                <code className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-ink-900 inline-block my-2">
                  Efficiency = (weight × min(level_gain, gap)) ÷ duration_minutes
                </code>
                <br />
                The greedy optimizer selects the highest yield learning units that fit into your available daily minutes.
              </p>

              {/* Live slider */}
              <div className="p-4 rounded-2xl bg-paper border border-border space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-ink-900">Your Available Study Budget:</span>
                  <span className="font-mono font-bold text-primary text-sm">{demoMinutes} Minutes</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="120"
                  step="10"
                  value={demoMinutes}
                  onChange={(e) => setDemoMinutes(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[11px] text-ink-500 font-mono">
                  <span>20 min (micro sprint)</span>
                  <span>60 min (standard)</span>
                  <span>120 min (deep study)</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/roadmap"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
                >
                  <span>Open Full Interactive Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-center">
                <span className="font-semibold text-ink-900">
                  Greedy Optimizer Output ({demoMinutes >= 60 ? "2 Tasks Selected" : "1 Task Selected"}):
                </span>
                <span className="text-teal font-mono font-semibold">
                  Used: {demoMinutes >= 60 ? "55" : "30"} of {demoMinutes} min
                </span>
              </div>

              {/* Task 1 */}
              <div className="p-4 rounded-xl border border-primary/30 bg-white shadow-sm flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700">Class Lab</span>
                    <span className="text-xs font-semibold text-ink-900">Advanced SQL Window Functions &amp; CTEs</span>
                  </div>
                  <p className="text-xs text-ink-500">
                    Target: SQL &amp; Relational Databases · +15 pts level gain
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-xs font-bold text-ink-900 block">30 min</span>
                  <span className="font-mono text-[10px] text-primary font-semibold">Eff: 0.200</span>
                </div>
              </div>

              {/* Task 2 (conditionally enabled if budget >= 55) */}
              <div
                className={`p-4 rounded-xl border bg-white shadow-sm flex items-start justify-between gap-3 transition-opacity ${
                  demoMinutes >= 60 ? "border-primary/30 opacity-100" : "border-slate-200 opacity-40"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">Self-Study</span>
                    <span className="text-xs font-semibold text-ink-900">Visual Storytelling &amp; Chart Decision Matrix</span>
                  </div>
                  <p className="text-xs text-ink-500">
                    Target: Data Visualization · +10 pts level gain
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-xs font-bold text-ink-900 block">25 min</span>
                  <span className="font-mono text-[10px] text-primary font-semibold">Eff: 0.080</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Feature 2: What-If Simulator Live Demo */}
      <section className="py-20 bg-paper border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual simulation card */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-border shadow-cardHover space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
                    Interactive What-If Demo
                  </span>
                  <h3 className="font-heading font-bold text-lg text-ink-900">
                    Drag SQL Proficiency (40 → 70)
                  </h3>
                </div>
                <ScoreDelta delta={simulatedScore - 56} label="Simulated Delta" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-ink-500 block mb-1">Current Readiness</span>
                  <span className="font-mono font-bold text-3xl text-ink-900">56%</span>
                  <span className="text-[11px] text-ink-500 block mt-1">SQL Level: 40/100</span>
                </div>

                <div className="p-4 rounded-2xl bg-teal-soft/40 border border-teal-200">
                  <span className="text-xs text-teal-800 font-medium block mb-1">Projected Readiness</span>
                  <span className="font-mono font-bold text-3xl text-teal">
                    {simulatedScore}%
                  </span>
                  <span className="text-[11px] text-teal-700 block mt-1">
                    SQL Level: {demoSqlLevel}/100
                  </span>
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-ink-700">
                  <span>SQL Proficiency Slider:</span>
                  <span className="font-mono font-bold text-primary">{demoSqlLevel} / 100</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="70"
                  step="5"
                  value={demoSqlLevel}
                  onChange={(e) => setDemoSqlLevel(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <p className="text-xs text-ink-500 italic">
                Notice how lifting SQL from 40 to 70 exactly increases overall Data Analyst readiness from 56% to 72% (+16%), matching Deck Slide 7 &amp; 9.
              </p>
            </div>

            {/* Explanatory text */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-semibold">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Feature 2 · Deck Slide 9</span>
              </div>
              <h2 className="font-heading font-bold text-3xl text-ink-900">
                What-If Career Simulator
              </h2>
              <p className="text-sm text-ink-500 leading-relaxed">
                &quot;If I spend the weekend studying SQL, how much does my hiring readiness actually jump?&quot;
              </p>
              <p className="text-sm text-ink-500 leading-relaxed">
                CareerIQ solves this with instant mathematical projections. In addition to single-skill what-ifs, the simulator runs your competency profile across adjacent careers (e.g. Machine Learning, Cloud DevOps, Full-Stack) to reveal nearby alternate roles where your existing skills already yield high match percentages.
              </p>

              <div className="pt-2">
                <Link
                  href="/what-if"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
                >
                  <span>Explore What-If Sandbox</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Feature 3: Confidence Calibration */}
      <section className="py-20 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-semibold">
              <Scale className="w-3.5 h-3.5" />
              <span>Feature 3 · Deck Slide 10</span>
            </div>
            <h2 className="font-heading font-bold text-3xl text-ink-900">
              Confidence Calibration Engine
            </h2>
            <p className="text-sm text-ink-500 leading-relaxed">
              Evaluating technical capability is only half the battle. If a student rates themselves at 80 but scores 45 on the diagnostic test, they have an overconfidence blind spot. CareerIQ detects divergence early.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-paper border border-border text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-coral mx-auto flex items-center justify-center font-bold">
                +25
              </div>
              <h4 className="font-heading font-bold text-sm text-ink-900">Overconfident (&gt; +15)</h4>
              <p className="text-xs text-ink-500">
                Self rating exceeds objective quiz validation. Risk of sudden failure in technical interviews.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-paper border border-border text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-soft text-teal mx-auto flex items-center justify-center font-bold">
                ±5
              </div>
              <h4 className="font-heading font-bold text-sm text-ink-900">Well-Calibrated (±15)</h4>
              <p className="text-xs text-ink-500">
                Self-awareness matches measured technical ability. Clear, realistic career progression.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-paper border border-border text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-soft text-sky-800 mx-auto flex items-center justify-center font-bold">
                -20
              </div>
              <h4 className="font-heading font-bold text-sm text-ink-900">Underconfident (&lt; -15)</h4>
              <p className="text-xs text-ink-500">
                Candidate performs significantly better than they judge themselves. Imposter syndrome alert.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Formula Block */}
      <section className="py-20 bg-paper border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Mathematical Rigor
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-ink-900 mt-1">
              Transparent, Deterministic Scoring
            </h2>
          </div>

          <FormulaBlock />
        </div>
      </section>

      {/* 9. Student vs Lecturer Dual Tabs */}
      <section className="py-20 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-bold text-3xl text-ink-900">
              Built for Students. Essential for Faculty.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-paper border border-border space-y-4">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-xl text-ink-900">For Engineering Students</h3>
              <ul className="space-y-2.5 text-xs text-ink-500">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                  <span>Know exact job benchmark levels (0–100) instead of vague course lists.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                  <span>Time-budget roadmaps tailored to 30 min class slots or 45 min self-study.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                  <span>Test interview readiness before applying to campus placements.</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold inline-block"
                >
                  Student Dashboard
                </Link>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-paper border border-border space-y-4">
              <div className="w-10 h-10 rounded-xl bg-ink-900 text-white flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-xl text-ink-900">For Lecturers &amp; Colleges</h3>
              <ul className="space-y-2.5 text-xs text-ink-500">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                  <span>Cohort-wide skill heatmaps across 60+ students in Section BCS506.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                  <span>&quot;Teach this next&quot; recommendations based on highest cohort deficit.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                  <span>30-minute lecture slot planner optimizes maximum cohort efficiency.</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/lecturer"
                  className="px-4 py-2 rounded-xl bg-ink-900 text-white text-xs font-semibold inline-block"
                >
                  Lecturer Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 11 & 12. FAQ Accordion */}
      <section className="py-20 bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Got Questions?
            </span>
            <h2 className="font-heading font-bold text-3xl text-ink-900 mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* 13. Final CTA Band */}
      <section className="py-16 bg-gradient-to-r from-primary to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
            Ready to find your exact skill readiness?
          </h2>
          <p className="text-sm sm:text-base text-primary-soft/90 max-w-xl mx-auto">
            Take a 5-minute diagnostic self-assessment and get your instant greedy roadmap.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/onboarding"
              className="px-6 py-3.5 rounded-xl bg-white text-primary font-bold text-sm shadow-md hover:bg-slate-100 transition-all"
            >
              Start Onboarding Diagnostic
            </Link>
          </div>
        </div>
      </section>

      {/* Footer is rendered at root layout */}
      <div className="border-t border-border">
        {/* Included globally */}
      </div>
    </div>
  );
}
