/**
 * 개인화 프로필 스키마, 기본값, 컨텍스트 톤 가이드를 정의합니다.
 */
import type { CanonicalInterpretationContext } from "./INTERPRETATION_CONTEXT_SCHEMA";

export type InterpretationTone =
  | "gentle"
  | "balanced"
  | "direct"
  | "coach"
  | "spiritual";

export type ActionStyle = "reflective" | "practical" | "mixed";

export interface PersonalizedInterpretationProfile {
  tone: InterpretationTone;
  detailLevel: 1 | 2 | 3 | 4 | 5;
  directness: number;
  empathy: number;
  practicality: number;
  uncertaintyTolerance: number;
  actionStyle: ActionStyle;
  contextPriority: Partial<Record<CanonicalInterpretationContext, number>>;
  disallowedPatterns: string[];
}

export const DEFAULT_PERSONALIZED_PROFILE: PersonalizedInterpretationProfile = {
  tone: "balanced",
  detailLevel: 3,
  directness: 0.55,
  empathy: 0.7,
  practicality: 0.7,
  uncertaintyTolerance: 0.5,
  actionStyle: "mixed",
  contextPriority: {
    love: 1,
    career: 1,
    finance: 1,
    health: 0.9,
    personal: 1,
    advice: 1,
    spiritual: 0.8,
  },
  disallowedPatterns: [
    "deterministic_future_claim",
    "medical_diagnosis_claim",
    "financial_guarantee_claim",
    "fear_inducing_absolute_statement",
  ],
};

export const CONTEXT_SPECIFIC_TONE_GUIDE: Record<
  CanonicalInterpretationContext,
  { focus: string[]; avoid: string[] }
> = {
  love: {
    focus: ["mutual_intent", "boundary", "communication", "emotional_safety"],
    avoid: ["blame_language", "absolute_relationship_outcome"],
  },
  career: {
    focus: ["decision_frame", "execution", "risk_management", "timing"],
    avoid: ["wishful_only_advice"],
  },
  finance: {
    focus: ["cashflow", "risk_budget", "time_horizon", "discipline"],
    avoid: ["investment_guarantee", "high_risk_encouragement"],
  },
  health: {
    focus: ["stress_management", "habit_consistency", "rest_recovery"],
    avoid: ["diagnostic_statement", "medical_replacement_advice"],
  },
  spiritual: {
    focus: ["meaning", "pattern_awareness", "inner_alignment"],
    avoid: ["fatalism"],
  },
  personal: {
    focus: ["self_honesty", "pattern_change", "small_consistent_actions"],
    avoid: ["identity_labeling"],
  },
  advice: {
    focus: ["next_step", "priority", "checkpoint", "fallback_plan"],
    avoid: ["vague_encouragement_only"],
  },
};


