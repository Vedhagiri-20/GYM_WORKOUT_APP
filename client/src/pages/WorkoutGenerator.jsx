// src/pages/WorkoutGenerator.jsx
// Logic helpers to generate beginner/intermediate/advanced workouts
// based on the assessment form. Kept as .jsx (per project convention).

/**
 * Main generator used by DashboardAssessmentFlow (and can be reused elsewhere).
 * Expects an object shaped like the assessment form:
 * {
 *   fitnessLevel: "beginner" | "intermediate" | "advanced",
 *   experience: number | string,
 *   goals: string,
 *   daysPerWeek: string,
 *   injuries: string,
 *   preferredEquipment: string[]
 * }
 */
export function generateWorkoutsFromAssessment(form) {
  const level = (form?.fitnessLevel || "beginner").toLowerCase();

  if (level === "beginner") {
    return getBeginnerWorkouts();
  }

  if (level === "intermediate") {
    return getIntermediateWorkouts();
  }

  // Default to advanced set if not beginner or intermediate
  return getAdvancedWorkouts();
}

/**
 * Beginner: 3 sessions focused on fundamentals and movement quality.
 */
export function getBeginnerWorkouts() {
  return [
    {
      name: "Full Body Starter",
      desc: "Focus on fundamentals and movement quality.",
      exercises: [
        "Bodyweight Squat — 3×12",
        "Knee Push-Ups — 3×10",
        "DB Row — 3×12",
      ],
    },
    {
      name: "Core & Mobility",
      desc: "Strengthen core and improve flexibility.",
      exercises: [
        "Plank — 3×30s",
        "Glute Bridge — 3×12",
        "Dead Bug — 3×10/side",
      ],
    },
    {
      name: "Cardio Intro",
      desc: "Low-impact conditioning.",
      exercises: [
        "Treadmill Walk — 15–20 min",
        "Bike — 10–15 min",
        "Light Stretching — 5–10 min",
      ],
    },
  ];
}

/**
 * Intermediate: 3 balanced strength sessions.
 */
export function getIntermediateWorkouts() {
  return [
    {
      name: "Upper Day",
      desc: "Balanced upper strength session.",
      exercises: [
        "Bench Press — 4×8",
        "Lat Pulldown — 4×10",
        "DB Shoulder Press — 3×10",
      ],
    },
    {
      name: "Lower Day",
      desc: "Lower body strength and stability.",
      exercises: [
        "Back Squat — 4×6",
        "Romanian Deadlift — 3×8",
        "Walking Lunge — 3×12",
      ],
    },
    {
      name: "Cardio + Core",
      desc: "Conditioning and core stability.",
      exercises: [
        "Row — 12 min",
        "Mountain Climbers — 3×40s",
        "Side Plank — 3×30s/side",
      ],
    },
  ];
}

/**
 * Advanced: heavier / higher intensity template.
 */
export function getAdvancedWorkouts() {
  return [
    {
      name: "Strength Focus",
      desc: "Heavy compound lifts for power.",
      exercises: [
        "Deadlift — 5×3",
        "Overhead Press — 5×5",
        "Weighted Pull-Up — 4×5",
      ],
    },
    {
      name: "Hypertrophy Push/Pull",
      desc: "Volume for growth.",
      exercises: [
        "Incline DB Press — 4×10",
        "Cable Row — 4×12",
        "EZ-Bar Curl — 3×12",
      ],
    },
    {
      name: "HIIT Session",
      desc: "High-intensity circuit.",
      exercises: [
        "Burpees — 6×20s",
        "Air Bike — 6×20s",
        "KB Swings — 6×15",
      ],
    },
  ];
}

// Optional default export if you prefer importing as a single object
const WorkoutGenerator = {
  generateWorkoutsFromAssessment,
  getBeginnerWorkouts,
  getIntermediateWorkouts,
  getAdvancedWorkouts,
};

export default WorkoutGenerator;
