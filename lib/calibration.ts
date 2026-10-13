export type CalibrationStatus = "overconfident" | "underconfident" | "calibrated";

export interface SkillCalibrationItem {
  skillId: string;
  name: string;
  selfRating: number;
  measuredLevel: number;
  gap: number; // selfRating - measuredLevel
  absoluteGap: number;
  status: CalibrationStatus;
  statusLabel: string;
  actionableTip: string;
}

export interface CalibrationReport {
  calibrationScore: number; // 100 - average |gap|
  averageAbsoluteGap: number;
  items: SkillCalibrationItem[];
  overconfidentCount: number;
  underconfidentCount: number;
  calibratedCount: number;
  overconfidentShare: number; // percentage
  summaryNote: string;
}

/**
 * Calculates confidence calibration from slide 10:
 * Calibration gap   = self_rating − measured_level (> +15 over, < −15 under)
 * Calibration score = 100 − average |gap|
 */
export function calculateCalibration(
  skills: { id: string; name: string }[],
  ratings: Record<string, { measured: number; self?: number }>
): CalibrationReport {
  if (skills.length === 0) {
    return {
      calibrationScore: 100,
      averageAbsoluteGap: 0,
      items: [],
      overconfidentCount: 0,
      underconfidentCount: 0,
      calibratedCount: 0,
      overconfidentShare: 0,
      summaryNote: "No skills to calibrate.",
    };
  }

  let totalAbsGap = 0;
  let overconfidentCount = 0;
  let underconfidentCount = 0;
  let calibratedCount = 0;

  const items: SkillCalibrationItem[] = skills.map((skill) => {
    const data = ratings[skill.id] || { measured: 50, self: 50 };
    const measuredLevel = data.measured ?? 0;
    const selfRating = data.self ?? measuredLevel;
    const gap = selfRating - measuredLevel;
    const absGap = Math.abs(gap);
    totalAbsGap += absGap;

    let status: CalibrationStatus = "calibrated";
    let statusLabel = "Well Calibrated";
    let actionableTip = "Accurate self-perception. Continue standard progression.";

    if (gap > 15) {
      status = "overconfident";
      statusLabel = "Overconfident";
      overconfidentCount++;
      actionableTip = `You rated yourself ${gap} pts higher than quiz validation. Focus on hands-on edge-cases and practice tests to eliminate blind spots.`;
    } else if (gap < -15) {
      status = "underconfident";
      statusLabel = "Underconfident";
      underconfidentCount++;
      actionableTip = `You demonstrated stronger capability (${measuredLevel}) than you gave yourself credit for (${selfRating}). Tackle real projects and interview prompts with confidence!`;
    } else {
      calibratedCount++;
    }

    return {
      skillId: skill.id,
      name: skill.name,
      selfRating,
      measuredLevel,
      gap,
      absoluteGap: absGap,
      status,
      statusLabel,
      actionableTip,
    };
  });

  const averageAbsoluteGap = Number((totalAbsGap / skills.length).toFixed(1));
  const calibrationScore = Math.max(0, Math.min(100, Math.round(100 - averageAbsoluteGap)));
  const overconfidentShare = Math.round((overconfidentCount / skills.length) * 100);

  let summaryNote = "Great calibration! Your self-assessments align closely with objective test metrics.";
  if (calibrationScore < 60) {
    summaryNote = "Significant discrepancy detected between self-assessment and practical validation. Review overconfident areas to avoid surprise exam or interview hurdles.";
  } else if (calibrationScore < 80) {
    summaryNote = "Moderate calibration. Targeted hands-on problem sets will sharpen your accuracy in self-judging technical depth.";
  }

  return {
    calibrationScore,
    averageAbsoluteGap,
    items,
    overconfidentCount,
    underconfidentCount,
    calibratedCount,
    overconfidentShare,
    summaryNote,
  };
}
