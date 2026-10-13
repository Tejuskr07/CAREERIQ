import { SkillRequirement, calculateReadiness, ReadinessResult } from "./scoring";

export interface RoleDefinition {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  skills: SkillRequirement[];
  onetCode?: string;
}

export interface WhatIfSimulation {
  baselineReadiness: number;
  simulatedReadiness: number;
  delta: number;
  adjustedSkillId: string;
  newLevel: number;
  originalLevel: number;
  baselineResult: ReadinessResult;
  simulatedResult: ReadinessResult;
}

export interface CloseRoleMatch {
  roleId: string;
  title: string;
  category: string;
  readinessScore: number;
  gapCount: number;
  matchTier: "High" | "Medium" | "Low";
}

/**
 * Runs a what-if simulation by adjusting one or more skills
 * and recomputing readiness according to slide 7 & 9 formulas.
 */
export function simulateSkillChange(
  role: RoleDefinition,
  currentRatings: Record<string, { measured: number; self?: number }>,
  skillIdToChange: string,
  newMeasuredLevel: number
): WhatIfSimulation {
  const baselineResult = calculateReadiness(role.skills, currentRatings);
  const baselineReadiness = baselineResult.readinessScore;

  const simulatedRatings: Record<string, { measured: number; self?: number }> = {
    ...currentRatings,
    [skillIdToChange]: {
      ...currentRatings[skillIdToChange],
      measured: newMeasuredLevel,
    },
  };

  const simulatedResult = calculateReadiness(role.skills, simulatedRatings);
  const simulatedReadiness = simulatedResult.readinessScore;
  const delta = simulatedReadiness - baselineReadiness;

  const originalLevel = currentRatings[skillIdToChange]?.measured ?? 0;

  return {
    baselineReadiness,
    simulatedReadiness,
    delta,
    adjustedSkillId: skillIdToChange,
    newLevel: newMeasuredLevel,
    originalLevel,
    baselineResult,
    simulatedResult,
  };
}

/**
 * Evaluates readiness across all roles in the catalog to rank close/adjacent roles
 */
export function rankCloseRoles(
  allRoles: RoleDefinition[],
  userRatings: Record<string, { measured: number; self?: number }>
): CloseRoleMatch[] {
  return allRoles
    .map((role) => {
      const res = calculateReadiness(role.skills, userRatings);
      let matchTier: "High" | "Medium" | "Low" = "Low";
      if (res.readinessScore >= 70) matchTier = "High";
      else if (res.readinessScore >= 45) matchTier = "Medium";

      return {
        roleId: role.id,
        title: role.title,
        category: role.category,
        readinessScore: res.readinessScore,
        gapCount: res.topGaps.length,
        matchTier,
      };
    })
    .sort((a, b) => b.readinessScore - a.readinessScore);
}
