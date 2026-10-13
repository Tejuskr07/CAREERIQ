import test from "node:test";
import assert from "node:assert/strict";
import roles from "../data/roles.json" with { type: "json" };
import tasks from "../data/tasks.json" with { type: "json" };
import { calculateReadiness, calculateGap } from "./scoring.ts";
import { generateGreedyRoadmap, calculateTaskEfficiency } from "./roadmap.ts";
import { calculateCalibration } from "./calibration.ts";
import { simulateSkillChange } from "./whatif.ts";

test("calculateGap respects non-negative gap", () => {
  assert.equal(calculateGap(80, 50), 30);
  assert.equal(calculateGap(70, 70), 0);
  assert.equal(calculateGap(60, 85), 0);
});

test("deck example: Data Analyst readiness is 56% initially and 72% after SQL 40->70", () => {
  const dataAnalyst = roles.find((r) => r.id === "data-analyst");
  assert.ok(dataAnalyst, "Data analyst role must exist");

  const initialRatings = {
    sql: { measured: 40, self: 65 },
    python: { measured: 50, self: 50 },
    "data-viz": { measured: 45, self: 40 },
    statistics: { measured: 20, self: 20 },
  };

  const initialResult = calculateReadiness(dataAnalyst.skills, initialRatings);
  assert.equal(initialResult.readinessScore, 56, "Initial readiness should be exactly 56%");

  // Simulate SQL going from 40 to 70
  const sim = simulateSkillChange(dataAnalyst, initialRatings, "sql", 70);
  assert.equal(sim.baselineReadiness, 56);
  assert.equal(sim.simulatedReadiness, 72, "Simulated readiness should be 72% after SQL becomes 70");
  assert.equal(sim.delta, 16, "Delta should be +16%");
});

test("greedy roadmap scheduler respects time budget and picks highest efficiency first", () => {
  const dataAnalyst = roles.find((r) => r.id === "data-analyst");
  const initialRatings = {
    sql: { measured: 40 },
    python: { measured: 50 },
    "data-viz": { measured: 45 },
    statistics: { measured: 20 },
  };

  const roadmap = generateGreedyRoadmap(
    dataAnalyst.skills,
    initialRatings,
    tasks,
    { classMinutes: 30, selfStudyMinutes: 45 }
  );

  assert.ok(roadmap.selectedTasks.length > 0);
  assert.ok(roadmap.classUsedMinutes <= 30);
  assert.ok(roadmap.selfStudyUsedMinutes <= 45);
  assert.ok(roadmap.usedMinutes <= 75);
});

test("calibration accurately computes over/under confidence and calibration score", () => {
  const skills = [
    { id: "sql", name: "SQL" },
    { id: "python", name: "Python" },
    { id: "viz", name: "Visualization" }
  ];

  // SQL: self 75, measured 50 -> gap +25 (overconfident)
  // Python: self 40, measured 60 -> gap -20 (underconfident)
  // Viz: self 70, measured 65 -> gap +5 (calibrated)
  const ratings = {
    sql: { measured: 50, self: 75 },
    python: { measured: 60, self: 40 },
    viz: { measured: 65, self: 70 },
  };

  const report = calculateCalibration(skills, ratings);
  assert.equal(report.overconfidentCount, 1);
  assert.equal(report.underconfidentCount, 1);
  assert.equal(report.calibratedCount, 1);
  // Average abs gap = (25 + 20 + 5) / 3 = 50 / 3 = 16.7
  // Score = 100 - 16.7 = 83
  assert.equal(report.calibrationScore, 83);
});
