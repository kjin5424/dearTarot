/**
 * 셔플 타입별 동작 파라미터를 정의합니다.
 */
export const SHUFFLE_TYPES = [
  {
    id: "overhand",
    label: "Overhand",
    ritualTone: "grounding",
    animationPreset: "soft_split_merge",
    durationMs: 2200,
    recommendedFor: ["yes_no", "advice", "daily_guidance"],
  },
  {
    id: "riffle",
    label: "Riffle",
    ritualTone: "active",
    animationPreset: "split_bridge",
    durationMs: 1800,
    recommendedFor: ["decision", "career", "problem_solving"],
  },
  {
    id: "spiral",
    label: "Spiral",
    ritualTone: "mystic",
    animationPreset: "circular_orbit",
    durationMs: 2600,
    recommendedFor: ["life_direction", "spiritual", "general_reading"],
  },
  {
    id: "chaotic_cut",
    label: "Chaotic Cut",
    ritualTone: "disruptive",
    animationPreset: "random_cut_stack",
    durationMs: 2000,
    recommendedFor: ["outcome_prediction", "complex_situation_analysis"],
  },
] as const;

export const SHUFFLE_DEFAULT = {
  type: "spiral",
  reverseProbability: 0.3,
  minimumCycles: 2,
  maximumCycles: 4,
} as const;


