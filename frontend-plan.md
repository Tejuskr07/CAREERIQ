# Frontend Plan: AI-Based Student Skill Gap & Career Readiness Platform

Source: `AI_Skill_Gap_Career_Readiness_Review1.pptx` (Mini Project Review 1, V Sem BCS506, BMSIT&M CSE, 2026-27).
Deck says Streamlit. This plan = real website frontend. Streamlit too limited for this look.

---

## 1. Stack

- Next.js (App Router) + TypeScript + Tailwind + shadcn/ui
- Framer Motion (animation), Recharts (charts), Zustand (state)
- Scoring logic in TS, runs in browser (deck slide 9: no AI call for scoring)
- Backend: FastAPI or Next API routes. SQLite → later Postgres. LLM only for resume extract, quiz gen, roadmap text.

## 2. Design direction

Clean, data-first, calm. "Dashboard meets study planner." Light default, dark toggle. Big number gauges. Rounded cards, soft shadow, thin borders. Color = meaning (gap, over, under, good).

## 3. Fonts

| Use | Font | Why |
|---|---|---|
| Headings | **Sora** (600/700) | Modern, friendly, techy |
| Body/UI | **Inter** (400/500/600) | Readable in tables, forms |
| Numbers, formula, code | **JetBrains Mono** | Readiness score, formula block, minutes |

Type scale: 12 / 14 / 16 / 20 / 24 / 32 / 48 / 64. Hero score = 64–96 mono.

## 4. Colors

| Token | Hex | Use |
|---|---|---|
| ink-900 | `#0B1020` | Dark bg, headings |
| ink-700 | `#1B2440` | Dark cards |
| ink-500 | `#5B6585` | Muted text |
| paper | `#F7F8FC` | Light page bg |
| surface | `#FFFFFF` | Cards |
| border | `#E3E6F0` | Dividers |
| primary | `#4F46E5` | Buttons, links, active nav |
| primary-soft | `#EEF0FF` | Chips, highlights |
| teal (good) | `#14B8A6` | Well calibrated, readiness up, done |
| amber (gap) | `#F59E0B` | Skill gaps, warnings |
| coral (over) | `#EF4444` | Overconfident, critical gap |
| sky (under) | `#38BDF8` | Underconfident |

Rules:
- Gauge: coral below 40, amber 40–70, teal above 70.
- Contrast AA minimum.
- Never color alone. Add icon or label.

## 5. Pages (routes)

**Public**
- `/` Landing
- `/how-it-works` Method + formulas
- `/about` Team, guide, SDGs, references
- `/login`, `/signup`

**Student**
- `/onboarding` Pick role → upload resume → confirm skills
- `/dashboard` Home
- `/assessment` Self-rate + quiz
- `/readiness` Gap report
- `/roadmap` Time-Budget Roadmap
- `/what-if` Simulator
- `/calibration` Confidence report
- `/roles` Explore roles + close roles
- `/settings`

**Lecturer**
- `/lecturer` Class overview
- `/lecturer/class/[id]` Class gaps + overrating
- `/lecturer/plan` Lecture-slot planner

**System:** `404`, `500`, empty / loading / error states.

## 6. Sections per page

### Landing `/`
1. Sticky navbar: logo, How it works, Features, For Lecturers, SDGs, Login, **Get started**
2. Hero: headline "Know your readiness. Learn what matters." + sub + 2 CTAs + animated gauge (56 → 72)
3. Problem strip: 4 motivation cards (unsure role skills, bad self-assessment, long plans, no class data)
4. How it works: 5-step pipeline (Profile → Quiz + Self-rating → Gap Engine → Roadmap / What-If / Calibration → Dashboard)
5. Feature 1, Time-Budget Roadmap: mini demo, minutes slider picks tasks live
6. Feature 2, What-If Simulator: mini demo, drag SQL 40→70, score updates
7. Feature 3, Confidence Calibration: self vs quiz bar pair, labels
8. Formula block: readiness formula in mono, plain-English caption
9. Student vs Lecturer: 2-col tabs
10. SDG row: 4, 8, 9, 10 icon cards
11. Tech / trust: O*NET data, no-AI scoring, lightweight for colleges
12. FAQ accordion
13. Final CTA band
14. Footer: BMSIT&M CSE, 2026-27, links, references

### Onboarding
Stepper: Role search/cards → Resume drop zone (LLM extract) → Skill chips edit → Time budget (class min, self-study min) → Done.

### Dashboard
- Greeting + target role switcher
- Big readiness gauge + delta vs last week
- Top 3 gaps card
- Today's roadmap card (minutes used / budget)
- Calibration mini-card
- Quick actions: Take quiz, Run what-if
- Progress line chart (readiness over time)

### Assessment
- Step 1: self-rate sliders 0–100 per skill (before quiz)
- Step 2: quiz runner: progress bar, timer, one question per screen
- Step 3: results summary → go to readiness

### Readiness `/readiness`
- Gauge + role name
- Skill table: required, measured, gap, weight
- Radar chart (required vs measured)
- Gap bars sorted by weight × gap
- "Formula" expandable
- Export PDF

### Roadmap
- Budget inputs: class min, self-study min
- Task table: value, efficiency, duration
- Selected plan timeline, split Class / Self-study
- Used-minutes progress bar (e.g. 40 of 45)
- Recompute-gap step viewer (greedy picks one by one)
- LLM text note per task

### What-If
- Skill picker + level slider
- Side-by-side: Readiness now vs After (56 vs 72), animated number
- Delta badge
- Close roles list: same formula on all roles, ranked
- Reset button

### Calibration
- Table: skill, self, quiz, gap, label chip
- Diverging bar chart (±15 band shaded)
- Calibration score = 100 − average |gap|
- Tips per overconfident skill

### Roles
- Role cards grid + search/filter
- Role detail drawer: skills + weights
- Match % per role

### Lecturer `/lecturer`
- Class picker
- KPI row: avg readiness, students, top gap, % overrating
- Heatmap: skill × student bucket
- Class-wide gap bar chart
- Overrating share per skill (slide 10)
- "Teach this next" recommendation card

### Lecturer plan
- Slot minutes input (e.g. 30)
- Picks skills to cover by class-wide efficiency
- Printable lesson outline

## 7. Component list

Navbar, Sidebar (app shell), Gauge, ScoreDelta, SkillChip, SkillSlider, GapBar, RadarChart, DivergingBar, Heatmap, TaskCard, TimelineBar, Stepper, QuizCard, DataTable, RoleCard, Drawer, Toast, EmptyState, Skeleton, ThemeToggle, FormulaBlock, FAQ accordion.

## 8. Layout + responsive

- Marketing: max-w 1200, 12-col grid
- App: left sidebar 240px (collapse to icons at ≤1024, bottom tab bar at ≤640)
- Breakpoints: 640 / 768 / 1024 / 1280
- Tables → stacked cards on mobile

## 9. Motion

- Gauge sweep 800ms ease-out
- Number count-up
- Task cards slide in as greedy picks happen
- Page fade 200ms
- Respect `prefers-reduced-motion`

## 10. Accessibility

- Keyboard control on all sliders
- ARIA labels on charts + text summary
- Focus ring in primary color
- Labels beside colors
- 44px tap targets

## 11. Folder structure

```
app/
  (marketing)/ page.tsx, how-it-works/, about/
  (auth)/ login/, signup/
  (student)/ dashboard/, assessment/, readiness/, roadmap/, what-if/, calibration/, roles/, onboarding/
  (lecturer)/ lecturer/
components/ ui/, charts/, cards/, layout/
lib/ scoring.ts, roadmap.ts, calibration.ts, whatif.ts
store/ useStudent.ts
data/ roles.json, tasks.json
```

- `scoring.ts` = readiness formula from slide 7.
- `roadmap.ts` = greedy efficiency pick from slide 8.
- Unit test both with deck examples (Data Analyst: 56 → 72 after SQL 40→70).

## 12. Core formulas (from deck)

```
gap       = max(0, required_level − measured_level)
Readiness = 100 × ( 1 − Σ(weight × gap) / Σ(weight × required_level) )

Task value = weight × min(level_gain, gap)
Efficiency = value ÷ task_duration_minutes

Calibration gap   = self_rating − measured_level   (> +15 over, < −15 under)
Calibration score = 100 − average |gap|
```

## 13. Build order

1. Tokens: colors, fonts, Tailwind config
2. Scoring libs + tests
3. App shell + dashboard + Gauge
4. Readiness → What-If → Roadmap → Calibration
5. Assessment + quiz flow
6. Onboarding + resume extract
7. Lecturer views
8. Landing + about
9. Polish: motion, dark mode, a11y, mobile
