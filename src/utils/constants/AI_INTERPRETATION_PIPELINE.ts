/**
 * 해석 파이프라인 단계와 가중치, 엔진 전역 설정을 정의합니다.
 */
export const AI_INTERPRETATION_PIPELINE = [
  { step: 1, key: "card_metadata", source: "TAROT_CARDS" },
  { step: 2, key: "basic_meaning", source: "TAROT_MEANINGS" },
  { step: 3, key: "context_meaning", source: "TAROT_CONTEXT_MEANINGS" },
  { step: 4, key: "semantic_tags", source: "SEMANTIC_TAGS" },
  { step: 5, key: "context_tag", source: "CONTEXT_TAGS" },
  { step: 6, key: "tag_combination_rule", source: "TAG_COMBINATION_RULES" },
  { step: 7, key: "card_combination_rule", source: "CARD_COMBINATION_RULES" },
  { step: 8, key: "emotion_vector", source: "EMOTION_VECTOR_BY_CARD_ID" },
  { step: 9, key: "symbol_coordinates", source: "SYMBOL_COORDINATES" },
  {
    step: 10,
    key: "gaze_direction_rules",
    source: "GAZE_DIRECTION_RULES",
  },
  {
    step: 11,
    key: "color_palette_analysis",
    source: "COLOR_PALETTE_ANALYSIS",
  },
  {
    step: 12,
    key: "spatial_psychology_rules",
    source: "SPATIAL_PSYCHOLOGY_RULES",
  },
  { step: 13, key: "spread_definition", source: "SPREAD_DEFINITIONS" },
  {
    step: 14,
    key: "spread_position_meaning",
    source: "SPREAD_POSITION_MEANINGS",
  },
  { step: 15, key: "ai_interpretation_engine", source: "ENGINE_CONFIG" },
  {
    step: 16,
    key: "healing_affirmations",
    source: "HEALING_AFFIRMATIONS",
  },
  {
    step: 17,
    key: "engine_blueprint",
    source: "INTERPRETATION_ENGINE_BLUEPRINT",
  },
  {
    step: 18,
    key: "constants_validator",
    source: "CONSTANTS_VALIDATION_RULES",
  },
] as const;

export const AI_INTERPRETATION_WEIGHT = {
  card_metadata: 0.9,
  basic_meaning: 1.0,
  context_meaning: 1.2,
  semantic_tags: 0.95,
  context_tag: 1.0,
  tag_combination_rule: 1.15,
  card_combination_rule: 1.2,
  emotion_vector: 0.9,
  symbol_coordinates: 0.75,
  gaze_direction_rules: 0.8,
  color_palette_analysis: 0.82,
  spatial_psychology_rules: 0.88,
  spread_definition: 1.0,
  spread_position_meaning: 1.15,
  healing_affirmations: 0.7,
} as const;

export const AI_INTERPRETATION_ENGINE_CONFIG = {
  confidence: {
    high: 0.78,
    medium: 0.58,
    low: 0.38,
  },
  contradictionPolicy: {
    tagAndCardRuleConflict: "prefer_higher_priority_rule",
    contextAndSpreadConflict: "prefer_spread_position_weight",
    emotionAndMeaningConflict: "blend_with_emotion_cap",
  },
  emotionBlend: {
    maxShiftPerEmotion: 0.35,
    clampMin: 0,
    clampMax: 1,
  },
  summaryPolicy: {
    includeStrengths: true,
    includeRisks: true,
    includeActionPlan: true,
    maxActionItems: 3,
  },
  personalizationHooks: {
    profile: "DEFAULT_PERSONALIZED_PROFILE",
    contextToneGuide: "CONTEXT_SPECIFIC_TONE_GUIDE",
    promptBuilder: "buildSystemPrompt",
  },
  debugging: {
    includeTrace: true,
    includeAppliedRuleIds: true,
    includeIntermediateScore: false,
  },
} as const;


