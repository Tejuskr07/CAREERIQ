"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { SkillSlider } from "@/components/ui/SkillSlider";
import { useStudentStore } from "@/store/useStudent";
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  HelpCircle,
  Award,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

interface Question {
  id: string;
  skillId: string;
  skillName: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "q-sql-1",
    skillId: "sql",
    skillName: "SQL & Relational Databases",
    question: "Which SQL window function assigns consecutive ranks without skipping numbers in case of duplicate values?",
    options: ["RANK()", "ROW_NUMBER()", "DENSE_RANK()", "NTILE(4)"],
    correctIndex: 2,
    explanation: "DENSE_RANK() assigns consecutive rankings without gaps when ties occur, unlike RANK() which leaves gaps.",
  },
  {
    id: "q-py-1",
    skillId: "python",
    skillName: "Python for Data Analysis",
    question: "In Pandas, which operation efficiently handles grouped multi-column aggregations without intermediate slow Python loops?",
    codeSnippet: "df.groupby(['dept', 'year']).agg({'salary': ['mean', 'median'], 'bonus': 'sum'})",
    options: ["df.apply() with lambda", "df.groupby().agg() vectorized matrix", "Iterating via df.iterrows()", "Nested python list comprehensions"],
    correctIndex: 1,
    explanation: "Vectorized .agg() leverages C-level NumPy optimizations without row iteration bottlenecks.",
  },
  {
    id: "q-viz-1",
    skillId: "data-viz",
    skillName: "Data Visualization",
    question: "When visualizing the distribution and skewness of a continuous variable across 4 categories, which chart is most appropriate?",
    options: ["Pie chart", "Stacked 100% bar chart", "Box & Whisker plot", "Dual-axis radar"],
    correctIndex: 2,
    explanation: "Box & Whisker plots explicitly expose quartiles, median, interquartile ranges (IQR), and outliers.",
  },
  {
    id: "q-stat-1",
    skillId: "statistics",
    skillName: "Business Statistics",
    question: "If an A/B test results in a p-value of 0.03 at an alpha threshold of 0.05, what is the correct statistical conclusion?",
    options: [
      "Accept the null hypothesis (no difference)",
      "Reject the null hypothesis; the observed effect is statistically significant",
      "The test is inconclusive and power was 0",
      "The sample size was invalid",
    ],
    correctIndex: 1,
    explanation: "When p < alpha, we reject the null hypothesis in favor of the alternative hypothesis.",
  },
];

export default function AssessmentPage() {
  const router = useRouter();
  const {
    getCurrentRole,
    ratings,
    setSelfRating,
    setMeasuredRating,
    completeAssessment,
  } = useStudentStore();

  const currentRole = getCurrentRole();

  // Assessment flow stages: "self-rate" -> "quiz" -> "results"
  const [stage, setStage] = useState<"self-rate" | "quiz" | "results">("self-rate");

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timerSeconds, setTimerSeconds] = useState(180);

  const currentQuestion = SAMPLE_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: index,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate scores
      let correctCount = 0;
      SAMPLE_QUESTIONS.forEach((q) => {
        if (selectedAnswers[q.id] === q.correctIndex) {
          correctCount++;
        }
      });

      // Update measured ratings based on answers
      SAMPLE_QUESTIONS.forEach((q) => {
        const isCorrect = selectedAnswers[q.id] === q.correctIndex;
        const currentMeasured = ratings[q.skillId]?.measured ?? 50;
        const newMeasured = isCorrect
          ? Math.min(100, currentMeasured + 10)
          : Math.max(20, currentMeasured - 5);
        setMeasuredRating(q.skillId, newMeasured);
      });

      completeAssessment();
      setStage("results");
    }
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Progress Stepper Banner */}
        <div className="p-4 bg-white rounded-2xl border border-border flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono ${
                stage === "self-rate" ? "bg-primary text-white" : "bg-teal text-white"
              }`}
            >
              1
            </span>
            <span className={stage === "self-rate" ? "font-bold text-ink-900" : "text-ink-500"}>
              Self-Rate Competencies
            </span>
          </div>

          <div className="h-0.5 w-12 bg-slate-200" />

          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono ${
                stage === "quiz"
                  ? "bg-primary text-white"
                  : stage === "results"
                  ? "bg-teal text-white"
                  : "bg-slate-200 text-ink-500"
              }`}
            >
              2
            </span>
            <span className={stage === "quiz" ? "font-bold text-ink-900" : "text-ink-500"}>
              Objective Quiz Runner
            </span>
          </div>

          <div className="h-0.5 w-12 bg-slate-200" />

          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono ${
                stage === "results" ? "bg-primary text-white" : "bg-slate-200 text-ink-500"
              }`}
            >
              3
            </span>
            <span className={stage === "results" ? "font-bold text-ink-900" : "text-ink-500"}>
              Calibration &amp; Gaps
            </span>
          </div>
        </div>

        {/* STAGE 1: Self-Rate Sliders */}
        {stage === "self-rate" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-border shadow-sm space-y-2">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Step 1 of 2: Subjective Calibration
              </span>
              <h2 className="font-heading font-bold text-2xl text-ink-900">
                Rate your perceived mastery in each skill
              </h2>
              <p className="text-xs text-ink-500 leading-relaxed">
                Before the diagnostic quiz validates your capability, honestly estimate your proficiency from 0 to 100. This data enables Slide 10 confidence calibration (identifying overconfidence vs imposter syndrome).
              </p>
            </div>

            <div className="space-y-4">
              {currentRole.skills.map((skill) => {
                const selfVal = ratings[skill.id]?.self ?? ratings[skill.id]?.measured ?? 50;
                return (
                  <SkillSlider
                    key={skill.id}
                    label={skill.name}
                    category={skill.category}
                    weight={skill.weight}
                    requiredLevel={skill.requiredLevel}
                    value={selfVal}
                    onChange={(val) => setSelfRating(skill.id, val)}
                  />
                );
              })}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStage("quiz")}
                className="px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm shadow-sm hover:bg-primary-dark transition-all flex items-center gap-2"
              >
                <span>Proceed to Objective Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: Quiz Runner */}
        {stage === "quiz" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Diagnostic Quiz Question {currentQuestionIndex + 1} of {SAMPLE_QUESTIONS.length}
                </span>
                <h3 className="font-heading font-bold text-base text-ink-900 mt-1">
                  Topic: {currentQuestion.skillName}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                <Clock className="w-4 h-4" />
                <span>Timer Active</span>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-border shadow-sm space-y-6">
              <h2 className="font-heading font-semibold text-lg text-ink-900 leading-snug">
                {currentQuestion.question}
              </h2>

              {currentQuestion.codeSnippet && (
                <div className="p-4 rounded-xl bg-ink-900 text-teal-300 font-mono text-xs overflow-x-auto">
                  <code>{currentQuestion.codeSnippet}</code>
                </div>
              )}

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full p-4 rounded-2xl text-left text-sm font-medium border transition-all flex items-center justify-between ${
                        isSelected
                          ? "border-primary bg-primary-soft text-primary-dark ring-2 ring-primary/20 font-semibold"
                          : "border-border hover:bg-slate-50 text-ink-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs ${
                            isSelected ? "bg-primary text-white" : "bg-slate-100 text-ink-500"
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs text-ink-500">
                  {Object.keys(selectedAnswers).length} of {SAMPLE_QUESTIONS.length} answered
                </span>

                <button
                  type="button"
                  disabled={selectedAnswers[currentQuestion.id] === undefined}
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold disabled:opacity-40 disabled:pointer-events-none hover:bg-primary-dark transition-all flex items-center gap-1.5"
                >
                  <span>
                    {currentQuestionIndex < SAMPLE_QUESTIONS.length - 1 ? "Next Question" : "Submit & Finish"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: Results Summary */}
        {stage === "results" && (
          <div className="bg-white p-8 rounded-3xl border border-border shadow-sm text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-teal-soft text-teal mx-auto flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-heading font-extrabold text-2xl text-ink-900">
                Diagnostic Assessment Complete!
              </h2>
              <p className="text-xs sm:text-sm text-ink-500 max-w-md mx-auto">
                Your measured skill levels and confidence calibration profile have been updated in the mathematical scoring engine.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-xs text-ink-700 text-left space-y-2">
              <div className="flex justify-between">
                <span>Validated Questions:</span>
                <strong className="font-mono">{SAMPLE_QUESTIONS.length}/{SAMPLE_QUESTIONS.length}</strong>
              </div>
              <div className="flex justify-between">
                <span>Benchmark Role:</span>
                <strong className="font-mono">{currentRole.title}</strong>
              </div>
              <div className="flex justify-between text-teal">
                <span>Calculated via:</span>
                <strong>Deck Slide 7 &amp; 10 Engine</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Link
                href="/readiness"
                className="px-6 py-3 rounded-xl bg-primary text-white font-semibold text-xs shadow-sm hover:bg-primary-dark transition-all flex items-center justify-center gap-1.5"
              >
                <span>Inspect Gap Analysis Report</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calibration"
                className="px-6 py-3 rounded-xl bg-slate-100 text-ink-900 font-semibold text-xs hover:bg-slate-200 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Check Confidence Calibration</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
