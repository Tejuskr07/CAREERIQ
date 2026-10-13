import { create } from "zustand";
import { persist } from "zustand/middleware";
import rolesData from "@/data/roles.json";
import tasksData from "@/data/tasks.json";
import { RoleDefinition } from "@/lib/whatif";
import { LearningTask } from "@/lib/roadmap";
import { calculateReadiness, ReadinessResult } from "@/lib/scoring";
import { calculateCalibration, CalibrationReport } from "@/lib/calibration";

export interface StudentSkillRatingMap {
  [skillId: string]: {
    measured: number;
    self: number;
  };
}

export interface StudentState {
  // Profile & Target Role
  studentName: string;
  studentUsn: string;
  selectedRoleId: string;
  customResumeText: string;
  extractedSkills: string[];
  
  // Time budgets in minutes
  classBudgetMinutes: number;
  selfStudyBudgetMinutes: number;

  // Skill ratings
  ratings: StudentSkillRatingMap;
  
  // Completed tasks tracking
  completedTaskIds: string[];

  // Quiz history & progress
  quizAnswers: Record<string, number>; // questionId -> selectedOptionIndex
  assessmentCompleted: boolean;

  // Actions
  setSelectedRole: (roleId: string) => void;
  updateSkillRating: (skillId: string, measured: number, self?: number) => void;
  setSelfRating: (skillId: string, self: number) => void;
  setMeasuredRating: (skillId: string, measured: number) => void;
  setTimeBudgets: (classMin: number, selfStudyMin: number) => void;
  setCustomResumeText: (text: string, extractedSkills: string[]) => void;
  toggleTaskCompletion: (taskId: string) => void;
  recordQuizAnswer: (questionId: string, answerIndex: number) => void;
  completeAssessment: () => void;
  resetToDefaults: () => void;

  // Computed getters
  getCurrentRole: () => RoleDefinition;
  getReadiness: () => ReadinessResult;
  getCalibration: () => CalibrationReport;
  getAllRoles: () => RoleDefinition[];
  getAllTasks: () => LearningTask[];
}

const DEFAULT_RATINGS: StudentSkillRatingMap = {
  sql: { measured: 40, self: 65 },
  python: { measured: 50, self: 50 },
  "data-viz": { measured: 45, self: 40 },
  statistics: { measured: 20, self: 20 },
  "frontend-dev": { measured: 55, self: 60 },
  "backend-apis": { measured: 45, self: 50 },
  "system-design": { measured: 30, self: 40 },
  "docker-k8s": { measured: 35, self: 40 },
  "cloud-aws": { measured: 40, self: 45 },
  cicd: { measured: 50, self: 50 },
  "linux-shell": { measured: 60, self: 60 },
  "network-sec": { measured: 40, self: 40 },
  "threat-analysis": { measured: 30, self: 35 },
  "incident-response": { measured: 25, self: 30 },
  "ml-theory": { measured: 45, self: 55 },
  mlops: { measured: 30, self: 35 },
};

export const useStudentStore = create<StudentState>()(
  persist(
    (set, get) => ({
      studentName: "Aarav Sharma",
      studentUsn: "1BY23CS042",
      selectedRoleId: "data-analyst",
      customResumeText: "",
      extractedSkills: ["Python", "SQL Basics", "Tableau", "Git"],
      classBudgetMinutes: 45,
      selfStudyBudgetMinutes: 60,
      ratings: DEFAULT_RATINGS,
      completedTaskIds: [],
      quizAnswers: {},
      assessmentCompleted: true,

      setSelectedRole: (roleId: string) => set({ selectedRoleId: roleId }),

      updateSkillRating: (skillId: string, measured: number, self?: number) =>
        set((state) => ({
          ratings: {
            ...state.ratings,
            [skillId]: {
              measured,
              self: self !== undefined ? self : state.ratings[skillId]?.self ?? measured,
            },
          },
        })),

      setSelfRating: (skillId: string, self: number) =>
        set((state) => ({
          ratings: {
            ...state.ratings,
            [skillId]: {
              measured: state.ratings[skillId]?.measured ?? 0,
              self,
            },
          },
        })),

      setMeasuredRating: (skillId: string, measured: number) =>
        set((state) => ({
          ratings: {
            ...state.ratings,
            [skillId]: {
              self: state.ratings[skillId]?.self ?? measured,
              measured,
            },
          },
        })),

      setTimeBudgets: (classMin: number, selfStudyMin: number) =>
        set({ classBudgetMinutes: classMin, selfStudyBudgetMinutes: selfStudyMin }),

      setCustomResumeText: (text: string, extractedSkills: string[]) =>
        set({ customResumeText: text, extractedSkills }),

      toggleTaskCompletion: (taskId: string) =>
        set((state) => {
          const isDone = state.completedTaskIds.includes(taskId);
          return {
            completedTaskIds: isDone
              ? state.completedTaskIds.filter((id) => id !== taskId)
              : [...state.completedTaskIds, taskId],
          };
        }),

      recordQuizAnswer: (questionId: string, answerIndex: number) =>
        set((state) => ({
          quizAnswers: {
            ...state.quizAnswers,
            [questionId]: answerIndex,
          },
        })),

      completeAssessment: () => set({ assessmentCompleted: true }),

      resetToDefaults: () =>
        set({
          selectedRoleId: "data-analyst",
          ratings: DEFAULT_RATINGS,
          classBudgetMinutes: 45,
          selfStudyBudgetMinutes: 60,
          completedTaskIds: [],
          quizAnswers: {},
          assessmentCompleted: true,
        }),

      getCurrentRole: () => {
        const role = (rolesData as RoleDefinition[]).find((r) => r.id === get().selectedRoleId);
        return role || (rolesData[0] as RoleDefinition);
      },

      getReadiness: () => {
        const currentRole = get().getCurrentRole();
        return calculateReadiness(currentRole.skills, get().ratings);
      },

      getCalibration: () => {
        const currentRole = get().getCurrentRole();
        const skillsList = currentRole.skills.map((s) => ({ id: s.id, name: s.name }));
        return calculateCalibration(skillsList, get().ratings);
      },

      getAllRoles: () => rolesData as RoleDefinition[],

      getAllTasks: () => tasksData as LearningTask[],
    }),
    {
      name: "careeriq-student-storage",
    }
  )
);
