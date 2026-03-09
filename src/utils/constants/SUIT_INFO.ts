/**
 * 수트별 상징 특성과 해석 보정 힌트를 정의합니다.
 */
export const SUIT_INFO = {
  Wands: {
    element: "Fire",
    coreTheme: "passion_vision_creation",
    lifeBias: { career: 0.1, personal: 0.08, spiritual: 0.03 },
    shadowPattern: ["impulsiveness", "burnout", "ego_drive"],
    coachingLens: "clarify_intention_then_channel_energy",
  },
  Cups: {
    element: "Water",
    coreTheme: "emotion_bond_intuition",
    lifeBias: { love: 0.12, personal: 0.08, spiritual: 0.05 },
    shadowPattern: ["emotional_overflow", "avoidance", "idealization"],
    coachingLens: "name_feelings_before_action",
  },
  Swords: {
    element: "Air",
    coreTheme: "mind_truth_conflict",
    lifeBias: { career: 0.07, personal: 0.09, advice: 0.08 },
    shadowPattern: ["overthinking", "harsh_judgment", "defensiveness"],
    coachingLens: "separate_fact_and_story",
  },
  Pentacles: {
    element: "Earth",
    coreTheme: "resource_body_stability",
    lifeBias: { finance: 0.13, health: 0.08, career: 0.06 },
    shadowPattern: ["scarcity_fear", "rigidity", "comfort_attachment"],
    coachingLens: "small_consistent_moves_compound",
  },
} as const;

export const COURT_RANK_PROFILE = {
  Page: { maturity: 0.35, momentum: 0.45, socialInfluence: 0.3 },
  Knight: { maturity: 0.5, momentum: 0.9, socialInfluence: 0.65 },
  Queen: { maturity: 0.82, momentum: 0.55, socialInfluence: 0.78 },
  King: { maturity: 0.88, momentum: 0.62, socialInfluence: 0.86 },
} as const;


