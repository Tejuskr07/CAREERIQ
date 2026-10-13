"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStudentStore } from "@/store/useStudent";
import { RoleCard } from "@/components/cards/RoleCard";
import { SkillChip } from "@/components/ui/SkillChip";
import {
  Upload,
  FileText,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Briefcase,
  Layers,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const {
    getAllRoles,
    selectedRoleId,
    setSelectedRole,
    extractedSkills,
    setCustomResumeText,
    classBudgetMinutes,
    selfStudyBudgetMinutes,
    setTimeBudgets,
  } = useStudentStore();

  const allRoles = getAllRoles();

  // Onboarding Step: 1 (Pick Role), 2 (Resume upload / LLM extract), 3 (Skill chips), 4 (Time Budget)
  const [step, setStep] = useState<number>(1);
  const [resumeText, setResumeText] = useState(
    "Proficient in Python scripting, SQL relational queries, Pandas, Tableau data visualization, Git, and exploratory data analysis."
  );
  const [skillsList, setSkillsList] = useState<string[]>(extractedSkills);
  const [newSkillInput, setNewSkillInput] = useState("");
  const [classMin, setClassMin] = useState(classBudgetMinutes);
  const [selfMin, setSelfMin] = useState(selfStudyBudgetMinutes);
  const [isExtracting, setIsExtracting] = useState(false);

  const handleSimulateResumeExtract = () => {
    setIsExtracting(true);
    setTimeout(() => {
      // Simulate LLM parsing skills from resume
      setSkillsList([
        "SQL & Relational DBs",
        "Python (Pandas / NumPy)",
        "Tableau Dashboards",
        "Git & GitHub",
        "Business Statistics",
      ]);
      setIsExtracting(false);
      setStep(3);
    }, 800);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillInput.trim() && !skillsList.includes(newSkillInput.trim())) {
      setSkillsList([...skillsList, newSkillInput.trim()]);
      setNewSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkillsList(skillsList.filter((s) => s !== skillToRemove));
  };

  const handleFinishOnboarding = () => {
    setTimeBudgets(classMin, selfMin);
    setCustomResumeText(resumeText, skillsList);
    router.push("/dashboard");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Header & Stepper */}
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          Student Diagnostic Setup
        </span>
        <h1 className="font-heading font-extrabold text-3xl text-ink-900 tracking-tight">
          Welcome to CareerIQ Onboarding
        </h1>
        <p className="text-xs sm:text-sm text-ink-500">
          Step {step} of 4: Setup your career target, parse background, and configure study minutes.
        </p>

        {/* Stepper bar */}
        <div className="flex items-center justify-center gap-2 max-w-xs mx-auto pt-4">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                s <= step ? "bg-primary" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: Pick Role */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm space-y-2">
            <h2 className="font-heading font-bold text-xl text-ink-900">
              1. Select Your Target Career Pathway
            </h2>
            <p className="text-xs text-ink-500">
              Pick the industry occupation standard you aim to benchmark against.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allRoles.map((role) => {
              const isSelected = role.id === selectedRoleId;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary bg-primary-soft/30 ring-2 ring-primary/20 shadow-sm"
                      : "border-border bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold text-primary uppercase">
                      {role.category}
                    </span>
                    {isSelected && (
                      <span className="text-xs text-primary font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Selected
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-base text-ink-900">{role.title}</h3>
                  <p className="text-xs text-ink-500 line-clamp-2 mt-1 mb-3">
                    {role.description}
                  </p>
                  <div className="text-[11px] text-ink-500 font-mono">
                    {role.skills.length} core competency benchmarks
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-xl bg-primary text-white font-semibold text-xs shadow-sm hover:bg-primary-dark transition-all flex items-center gap-1.5"
            >
              <span>Continue to Resume Parsing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Resume Dropzone */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm space-y-2">
            <h2 className="font-heading font-bold text-xl text-ink-900">
              2. Paste or Drop Resume (LLM Extraction)
            </h2>
            <p className="text-xs text-ink-500">
              Our lightweight LLM extractor parses key technical competencies and coursework from your resume text.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm space-y-4">
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center space-y-2 hover:border-primary/50 transition-colors">
              <Upload className="w-8 h-8 text-primary mx-auto" />
              <p className="text-xs font-semibold text-ink-900">
                Drag and drop your PDF / TXT resume here, or paste below
              </p>
              <p className="text-[11px] text-ink-500">
                Supports standard formats (PDF, DOCX, TXT)
              </p>
            </div>

            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={5}
              placeholder="Paste raw resume or LinkedIn text here..."
              className="w-full p-4 rounded-xl border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 font-sans"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-ink-500 hover:text-ink-900 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <button
              type="button"
              disabled={isExtracting}
              onClick={handleSimulateResumeExtract}
              className="px-6 py-3 rounded-xl bg-primary text-white font-semibold text-xs shadow-sm hover:bg-primary-dark transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isExtracting ? "Extracting Skills via LLM..." : "Extract Technical Skills"}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Confirm Skills */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm space-y-2">
            <h2 className="font-heading font-bold text-xl text-ink-900">
              3. Confirm Extracted Skills
            </h2>
            <p className="text-xs text-ink-500">
              Review and adjust your declared technical competencies before taking the diagnostic quiz.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm space-y-4">
            <div className="flex flex-wrap gap-2">
              {skillsList.map((skill) => (
                <SkillChip
                  key={skill}
                  label={skill}
                  onRemove={() => handleRemoveSkill(skill)}
                />
              ))}
            </div>

            <form onSubmit={handleAddSkill} className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Add custom skill (e.g. Docker, Rust)..."
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-100 text-ink-900 text-xs font-semibold hover:bg-slate-200"
              >
                Add
              </button>
            </form>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-ink-500 hover:text-ink-900 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <button
              type="button"
              onClick={() => setStep(4)}
              className="px-6 py-3 rounded-xl bg-primary text-white font-semibold text-xs shadow-sm hover:bg-primary-dark transition-all flex items-center gap-1.5"
            >
              <span>Proceed to Time Budget</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Time Budget */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm space-y-2">
            <h2 className="font-heading font-bold text-xl text-ink-900">
              4. Configure Daily Time Budget
            </h2>
            <p className="text-xs text-ink-500">
              How much time can you realistically invest? Our greedy scheduler will fit tasks specifically to these limits.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-border shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-ink-900">Classroom &amp; Lab Minutes:</span>
                <span className="font-mono font-bold text-purple-700">{classMin} min</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="15"
                value={classMin}
                onChange={(e) => setClassMin(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-ink-900">Self-Study / Homework Minutes:</span>
                <span className="font-mono font-bold text-blue-700">{selfMin} min</span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                step="15"
                value={selfMin}
                onChange={(e) => setSelfMin(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-ink-500 hover:text-ink-900 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <button
              type="button"
              onClick={handleFinishOnboarding}
              className="px-6 py-3 rounded-xl bg-primary text-white font-semibold text-xs shadow-sm hover:bg-primary-dark transition-all flex items-center gap-2"
            >
              <span>Complete Setup &amp; Launch Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
