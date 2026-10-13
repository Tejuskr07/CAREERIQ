# CAREERIQ

> **AI-Based Student Skill Gap & Career Readiness Platform**  
> *Deterministic skill diagnostic, greedy time-budget roadmaps, and confidence calibration.*

---

## 📌 Overview

**CAREERIQ** is an empirical, data-first skill diagnostic and career readiness web platform built for computer science engineering students and academic faculty. 

Unlike conventional platforms that provide vague, subjective course recommendations or unachievable multi-month schedules, CAREERIQ delivers:
1. **Deterministic Skill Gap Scoring**: Transparent mathematical benchmark evaluation against O*NET occupational standards with **zero AI hallucinations**.
2. **Greedy Time-Budget Roadmaps**: A knapsack-inspired efficiency scheduler that dynamically selects the highest-yield tasks fitting a student's daily classroom (e.g. 30–45 min) and self-study (e.g. 45–60 min) limits.
3. **What-If Career Simulator**: Instant side-by-side modeling of skill boosts and adjacent career pathway ranking.
4. **Confidence Calibration Engine**: Psychological alignment tracking ($100 - \text{average } |\text{gap}|$) detecting risky overconfidence ($> +15$ pts) and imposter syndrome ($< -15$ pts).
5. **Lecturer Cohort Intelligence**: Class heatmaps, cohort-wide skill deficit bars, systemic overconfidence alerts, and automated 15–60 min lecture slot outlines.

---

## 🧮 Core Mathematical Formulations

### 1. Skill Gap & Readiness Scoring
$$\text{gap} = \max(0, \text{required\_level} - \text{measured\_level})$$

$$\text{Readiness} = 100 \times \left( 1 - \frac{\sum (\text{weight} \times \text{gap})}{\sum (\text{weight} \times \text{required\_level})} \right)$$

* **Surplus Protection**: If measured competence exceeds the benchmark, $\text{gap} = 0$, guaranteeing students are never penalized for surplus knowledge.
* **Verified Benchmark Proof**: In the Data Analyst occupational benchmark, an initial baseline with SQL at 40 (required 70, weight 0.40), Python at 50 (required 80, weight 0.30), Data Viz at 45 (required 75, weight 0.20), and Statistics at 20 (required 80, weight 0.10) scores **exactly 56%**. Boosting SQL from 40 to 70 elevates the overall readiness to **72% (+16%)**.

### 2. Time-Budget Greedy Scheduler
$$\text{Task Value} = \text{weight} \times \min(\text{level\_gain}, \text{current\_gap})$$

$$\text{Efficiency} = \frac{\text{Task Value}}{\text{duration\_minutes}}$$

* Evaluates all candidate learning tasks at each iteration.
* Greedily selects the task yielding maximum efficiency that fits within remaining class or self-study time budgets.
* Recomputes remaining skill gaps sequentially after each pick.

### 3. Confidence Calibration Divergence
$$\text{Calibration Gap} = \text{self\_rating} - \text{measured\_level}$$

$$\text{Calibration Score} = 100 - \text{average } |\text{Calibration Gap}|$$

* **Overconfident** ($\text{gap} > +15$): Student overestimates technical ability; critical placement interview risk.
* **Well-Calibrated** ($-15 \le \text{gap} \le +15$): Realistic self-awareness.
* **Underconfident** ($\text{gap} < -15$): Performance surpasses self-judgment; imposter syndrome alert.

---

## 🛠️ Technology Stack

* **Framework**: Next.js 14 (App Router) + TypeScript
* **Styling**: Tailwind CSS with custom design tokens (`ink-900`, `ink-700`, `paper`, `primary`, `teal`, `amber`, `coral`, `sky`)
* **Visualizations & Charts**: Recharts (Radar charts, Diverging calibration bar charts, Area progression charts) + Custom SVG Semi-Circle Sweep Gauges
* **State Management**: Zustand with persistent local storage
* **Icons**: Lucide React
* **Testing**: Node.js Native Test Runner (`node:test`) + `tsx`

---

## 📂 Project Structure

```
CAREERIQ/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                  # High-fidelity Landing page with interactive demos
│   │   └── how-it-works/page.tsx      # Mathematical derivations & proofs
│   ├── (auth)/
│   │   ├── login/page.tsx             # Student & faculty authentication
│   │   └── signup/page.tsx            # Student registration
│   ├── (student)/
│   │   ├── dashboard/page.tsx         # Readiness gauge, progress chart & top gaps
│   │   ├── assessment/page.tsx        # Self-rating sliders & objective timed quiz
│   │   ├── readiness/page.tsx         # Detailed radar chart, matrix table & PDF print
│   │   ├── roadmap/page.tsx           # Time-budget sliders, split timeline & greedy traces
│   │   ├── what-if/page.tsx           # Interactive level simulation & adjacent roles
│   │   ├── calibration/page.tsx       # Diverging bar chart (±15 band) & remedial tips
│   │   ├── roles/page.tsx             # O*NET occupational standards catalog
│   │   ├── onboarding/page.tsx        # 4-step wizard with simulated resume LLM extraction
│   │   └── settings/page.tsx          # Default time budgets and preferences
│   ├── (lecturer)/
│   │   └── lecturer/
│   │       ├── page.tsx               # Cohort KPIs, heatmap & "Teach This Next"
│   │       ├── class/[id]/page.tsx    # Class student roster drilldown
│   │       └── plan/page.tsx          # Lecture-slot planner with printable outlines
│   ├── globals.css                    # Tailwind setup & typography tokens
│   ├── layout.tsx                     # Font variables & Root shell
│   └── not-found.tsx                  # 404 page
├── components/
│   ├── cards/
│   │   ├── GapBar.tsx                 # Dual target vs measured progress bars
│   │   ├── RoleCard.tsx               # Occupational role cards with match %
│   │   └── TaskCard.tsx               # Learning tasks with efficiency and checkboxes
│   ├── charts/
│   │   ├── ClassHeatmap.tsx           # Cohort bucket heatmap (<40%, 40-70%, >70%)
│   │   ├── DivergingCalibrationBar.tsx# Diverging chart with ±15 tolerance lines
│   │   ├── ProgressHistoryChart.tsx   # Weekly readiness trajectory
│   │   └── RadarGapChart.tsx          # Multidimensional target vs measured radar
│   ├── layout/
│   │   ├── AppHeader.tsx              # Role switcher & live readiness badge
│   │   ├── AppShell.tsx               # Student portal shell wrapper
│   │   ├── Footer.tsx                 # Platform footer
│   │   ├── Navbar.tsx                 # Global responsive top navigation
│   │   └── Sidebar.tsx                # Desktop sidebar (240px) & mobile bottom tab bar
│   └── ui/
│       ├── FAQAccordion.tsx           # Accessible accordion
│       ├── FormulaBlock.tsx           # JetBrains Mono formula blocks with captions
│       ├── Gauge.tsx                  # Custom SVG animated semi-circle gauge
│       ├── ScoreDelta.tsx             # Score shift indicators (+16%)
│       ├── SkillChip.tsx              # Interactive skill tag chips
│       └── SkillSlider.tsx            # Accessible range sliders with target markers
├── data/
│   ├── roles.json                     # O*NET occupational benchmarks & weights
│   └── tasks.json                     # Learning tasks with durations and level gains
├── lib/
│   ├── calibration.ts                 # Confidence calibration math engine
│   ├── roadmap.ts                     # Greedy knapsack efficiency scheduler
│   ├── scoring.ts                     # Deterministic readiness scoring engine
│   ├── scoring.test.mjs               # Node test suite verifying deck examples
│   ├── utils.ts                       # Formatters and style helpers
│   └── whatif.ts                      # What-if simulator and adjacent role ranker
├── store/
│   └── useStudent.ts                  # Zustand state store with persistent storage
├── frontend-plan.md                   # Source design & architectural plan
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
* Node.js `v18+` (Tested on `v24.20.0`)
* npm `v9+` (Tested on `v12.0.2`)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Unit Test Suite
Verify that the core formulas pass:
```bash
npm test
```

Expected output:
```
✔ calculateGap respects non-negative gap
✔ deck example: Data Analyst readiness is 56% initially and 72% after SQL 40->70
✔ greedy roadmap scheduler respects time budget and picks highest efficiency first
✔ calibration accurately computes over/under confidence and calibration score
ℹ tests 4 | pass 4 | fail 0
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Routes Overview

| Route | Audience | Purpose |
|---|---|---|
| `/` | Public | High-converting landing page with interactive demos and FAQ |
| `/how-it-works` | Public | Mathematical derivations, knapsack logic, and academic formulas |
| `/login` & `/signup` | Public | Authentication portals for students and faculty |
| `/onboarding` | Student | 4-step wizard: target role selection, resume drop, skill confirmation, time budget |
| `/dashboard` | Student | Primary dashboard: readiness gauge, progress chart, top deficits, today's roadmap |
| `/assessment` | Student | Step 1: Self-rate sliders $\to$ Step 2: Timed diagnostic quiz $\to$ Step 3: Summary |
| `/readiness` | Student | Full gap analysis: radar chart, matrix table, urgency bars, print/export |
| `/roadmap` | Student | Time-budget sliders, Class vs Self-study split, and greedy step trace audit trail |
| `/what-if` | Student | Interactive single-skill sliders, delta badges, and close roles ranking |
| `/calibration` | Student | Diverging bar chart (±15 threshold band) and remedial guidance for blindspots |
| `/roles` | Student | Occupational catalog with O*NET codes and curriculum drawer |
| `/settings` | Student | Profile details and default time budget preferences |
| `/lecturer` | Faculty | Cohort overview, 60-student competency heatmap, systemic overconfidence, "Teach This Next" |
| `/lecturer/class/[id]` | Faculty | Roster drilldown table by USN with readiness and confidence flags |
| `/lecturer/plan` | Faculty | Lecture-slot planner with 15–60 min slider and printable lesson outlines |

---

## 📄 License

MIT License. © 2026 CAREERIQ.
