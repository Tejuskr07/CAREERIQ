import { SkillRequirement, calculateGap } from "./scoring";

export interface LearningTask {
  id: string;
  skillId: string;
  skillName: string;
  title: string;
  description: string;
  category: "Class" | "Self-study";
  durationMinutes: number;
  levelGain: number; // How many points this task adds to the skill
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  resourceType: "Lab" | "Problem Set" | "Video & Notes" | "Project Mini-Sprint" | "Interactive Exercise";
  llmRationale?: string;
}

export interface TaskPickEvaluation {
  task: LearningTask;
  effectiveGain: number;
  taskValue: number;
  efficiency: number; // value / durationMinutes
  stepNumber: number;
  gapBefore: number;
  gapAfter: number;
  remainingTimeBefore: number;
  remainingTimeAfter: number;
}

export interface RoadmapPlan {
  totalBudgetMinutes: number;
  classBudgetMinutes: number;
  selfStudyBudgetMinutes: number;
  usedMinutes: number;
  classUsedMinutes: number;
  selfStudyUsedMinutes: number;
  totalValueGained: number;
  selectedTasks: LearningTask[];
  pickSteps: TaskPickEvaluation[];
  projectedSkillLevels: Record<string, number>;
  unselectedTasks: LearningTask[];
}

/**
 * Calculates task value: weight * min(level_gain, current_gap)
 * And efficiency: value / duration_minutes
 */
export function calculateTaskEfficiency(
  task: LearningTask,
  currentLevel: number,
  requiredLevel: number,
  skillWeight: number
): { value: number; efficiency: number; effectiveGain: number } {
  const currentGap = calculateGap(requiredLevel, currentLevel);
  const effectiveGain = Math.min(task.levelGain, currentGap);
  const value = skillWeight * effectiveGain;
  const efficiency = task.durationMinutes > 0 ? value / task.durationMinutes : 0;
  return { value, efficiency, effectiveGain };
}

/**
 * Greedy Time-Budget Roadmap Generator:
 * Evaluates tasks iteratively, selecting the task with highest efficiency
 * that fits within available time budget, recomputing remaining gaps at each step.
 */
export function generateGreedyRoadmap(
  requirements: SkillRequirement[],
  currentRatings: Record<string, { measured: number }>,
  availableTasks: LearningTask[],
  budgets: { classMinutes: number; selfStudyMinutes: number }
): RoadmapPlan {
  const totalBudget = budgets.classMinutes + budgets.selfStudyMinutes;
  let remainingClass = budgets.classMinutes;
  let remainingSelf = budgets.selfStudyMinutes;

  const currentLevels: Record<string, number> = {};
  requirements.forEach((req) => {
    currentLevels[req.id] = currentRatings[req.id]?.measured ?? 0;
  });

  const weightMap = new Map<string, number>();
  const reqLevelMap = new Map<string, number>();
  requirements.forEach((req) => {
    weightMap.set(req.id, req.weight);
    reqLevelMap.set(req.id, req.requiredLevel);
  });

  const remainingTasks = [...availableTasks];
  const selectedTasks: LearningTask[] = [];
  const pickSteps: TaskPickEvaluation[] = [];
  let totalValueGained = 0;
  let step = 1;

  while (remainingTasks.length > 0) {
    let bestIndex = -1;
    let bestEfficiency = -1;
    let bestEvaluation: { value: number; efficiency: number; effectiveGain: number; gapBefore: number } | null = null;

    for (let i = 0; i < remainingTasks.length; i++) {
      const task = remainingTasks[i];
      const budgetForCategory = task.category === "Class" ? remainingClass : remainingSelf;

      if (task.durationMinutes > budgetForCategory) {
        continue; // Doesn't fit in remaining time budget
      }

      const currLevel = currentLevels[task.skillId] ?? 0;
      const reqLevel = reqLevelMap.get(task.skillId) ?? 100;
      const weight = weightMap.get(task.skillId) ?? 0.1;
      const gapBefore = calculateGap(reqLevel, currLevel);

      // If gap is already 0, task yields 0 value
      if (gapBefore <= 0) continue;

      const evalResult = calculateTaskEfficiency(task, currLevel, reqLevel, weight);

      if (evalResult.efficiency > bestEfficiency && evalResult.value > 0) {
        bestEfficiency = evalResult.efficiency;
        bestIndex = i;
        bestEvaluation = { ...evalResult, gapBefore };
      }
    }

    if (bestIndex === -1 || !bestEvaluation) {
      break; // No more tasks fit in budget or give value
    }

    const picked = remainingTasks.splice(bestIndex, 1)[0];
    const prevLevel = currentLevels[picked.skillId] ?? 0;
    const reqLevel = reqLevelMap.get(picked.skillId) ?? 100;
    const newLevel = Math.min(100, prevLevel + picked.levelGain);
    currentLevels[picked.skillId] = newLevel;

    const remainingBefore = picked.category === "Class" ? remainingClass : remainingSelf;
    if (picked.category === "Class") {
      remainingClass -= picked.durationMinutes;
    } else {
      remainingSelf -= picked.durationMinutes;
    }

    totalValueGained += bestEvaluation.value;
    selectedTasks.push(picked);

    pickSteps.push({
      task: picked,
      effectiveGain: bestEvaluation.effectiveGain,
      taskValue: Number(bestEvaluation.value.toFixed(2)),
      efficiency: Number(bestEvaluation.efficiency.toFixed(4)),
      stepNumber: step++,
      gapBefore: bestEvaluation.gapBefore,
      gapAfter: calculateGap(reqLevel, newLevel),
      remainingTimeBefore: remainingBefore,
      remainingTimeAfter: picked.category === "Class" ? remainingClass : remainingSelf,
    });
  }

  const classUsed = budgets.classMinutes - remainingClass;
  const selfUsed = budgets.selfStudyMinutes - remainingSelf;

  return {
    totalBudgetMinutes: totalBudget,
    classBudgetMinutes: budgets.classMinutes,
    selfStudyBudgetMinutes: budgets.selfStudyMinutes,
    usedMinutes: classUsed + selfUsed,
    classUsedMinutes: classUsed,
    selfStudyUsedMinutes: selfUsed,
    totalValueGained: Number(totalValueGained.toFixed(2)),
    selectedTasks,
    pickSteps,
    projectedSkillLevels: currentLevels,
    unselectedTasks: remainingTasks,
  };
}
