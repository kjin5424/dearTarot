/**
 * 점수화 전후와 출력 정제 단계의 훅 구성을 정의합니다.
 */
export const INTERPRETATION_HOOKS = {
  preScoring: [
    "normalize_context",
    "normalize_card_ids",
    "resolve_spread_positions",
    "hydrate_personalization_profile",
  ],

  postScoring: [
    "apply_conflict_resolution",
    "apply_confidence_calibration",
    "inject_visual_psychology",
    "inject_healing_affirmation",
    "limit_extreme_language",
    "inject_action_plan",
  ],

  promptAssembly: [
    "inject_profile_tone",
    "inject_context_focus",
    "inject_safety_rules",
    "inject_trace_metadata",
  ],

  outputSanitization: [
    "remove_absolute_future_claims",
    "remove_financial_guarantees",
    "remove_medical_diagnosis_claims",
  ],
} as const;

export const INTERPRETATION_HOOK_PRIORITY = {
  normalize_context: 100,
  normalize_card_ids: 100,
  resolve_spread_positions: 95,
  hydrate_personalization_profile: 95,
  apply_conflict_resolution: 90,
  apply_confidence_calibration: 85,
  inject_action_plan: 80,
  inject_visual_psychology: 78,
  inject_healing_affirmation: 77,
  limit_extreme_language: 80,
  inject_profile_tone: 75,
  inject_context_focus: 75,
  inject_safety_rules: 95,
  inject_trace_metadata: 60,
  remove_absolute_future_claims: 99,
  remove_financial_guarantees: 99,
  remove_medical_diagnosis_claims: 99,
} as const;


