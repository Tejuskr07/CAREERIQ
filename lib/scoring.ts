export interface SkillRequirement {
  id: string;
  name: string;
  category: string;
  requiredLevel: number; // 0 - 100
  weight: number; // e.g. 0.1 - 0.5 (sum can be normalized or arbitrary)
}

export interface StudentSkillRating {
  skillId: string;
  measuredLevel: number; // 0 - 100
  selfRating?: number; // 0 - 100
}

export interface SkillGapDetail {
  skillId: string;
  name: string;
  category: string;
  requiredLevel: number;
  measuredLevel: number;
  selfRating: number;
  gap: number;
  weightedGap: number;
  weight: number;
  urgencyScore: number; // weight * gap
}

export interface ReadinessResult {
  readinessScore: number; // 0 - 100
  totalGap: number;
  details: SkillGapDetail[];
  topGaps: SkillGapDetail[];
}

/**
 * Computes skill gap: max(0, required_level - measured_level)
 */
export function calculateGap(requiredLevel: number, measuredLevel: number): number {
  return Math.max(0, requiredLevel - measuredLevel);
}

/**
 * Computes Readiness score according to the formula:
 * Readiness = 100 * ( 1 - Σ(weight * gap) / Σ(weight * required_level) )
 * Clamped between 0 and 100.
 */
export function calculateReadiness(
  requirements: SkillRequirement[],
  ratings: Record<string, { measured: number; self?: number }>
): ReadinessResult {
  if (!requirements || requirements.length === 0) {
    return { readinessScore: 0, totalGap: 0, details: [], topGaps: [] };
  }

  let totalWeightedGap = 0;
  let totalWeightedRequirement = 0;

  const details: SkillGapDetail[] = requirements.map((req) => {
    const studentData = ratings[req.id] || { measured: 0, self: 0 };
    const measuredLevel = Math.min(100, Math.max(0, studentData.measured ?? 0));
    const selfRating = Math.min(100, Math.max(0, studentData.self ?? measuredLevel));
    const gap = calculateGap(req.requiredLevel, measuredLevel);
    const weightedGap = req.weight * gap;
    const weightedReq = req.weight * req.requiredLevel;

    totalWeightedGap += weightedGap;
    totalWeightedRequirement += weightedReq;

    return {
      skillId: req.id,
      name: req.name,
      category: req.category,
      requiredLevel: req.requiredLevel,
      measuredLevel,
      selfRating,
      gap,
      weightedGap,
      weight: req.weight,
      urgencyScore: weightedGap,
    };
  });

  const readinessScore =
    totalWeightedRequirement > 0
      ? Math.max(0, Math.min(100, Math.round(100 * (1 - totalWeightedGap / totalWeightedRequirement))))
      : 0;

  const sortedGaps = [...details].sort((a, b) => b.urgencyScore - a.urgencyScore);

  return {
    readinessScore,
    totalGap: totalWeightedGap,
    details,
    topGaps: sortedGaps.filter((d) => d.gap > 0),
  };
}
