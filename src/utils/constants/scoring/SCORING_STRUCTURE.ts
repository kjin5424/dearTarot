/**
 * 점수 구성요소, 정규화, 신뢰도 구간, 포화 한계를 정의합니다.
 */
export const SCORING_STRUCTURE = {
  baseWeights: {
    basicMeaning: 1.0,
    contextMeaning: 1.2,
    semanticTag: 0.95,
    contextBias: 1.0,
    tagCombination: 1.15,
    cardCombination: 1.2,
    emotionVector: 0.9,
    spreadPosition: 1.15,
    reversedAdjustment: 1.0,
  },

  synthesisWeights: {
    present: 1.0,
    future: 1.08,
    advice: 1.12,
    outcome: 1.14,
    finalOutcome: 1.18,
  },

  normalization: {
    minRaw: -10,
    maxRaw: 10,
    clampMin: 0,
    clampMax: 1,
  },

  confidenceBands: {
    high: 0.78,
    medium: 0.58,
    low: 0.38,
  },

  saturation: {
    maxRuleBonus: 0.45,
    maxRulePenalty: -0.45,
    duplicateModifierDamping: 0.65,
  },
} as const;

export const SCORE_COMPONENT_KEYS = [
  "basicMeaning",
  "contextMeaning",
  "semanticTag",
  "contextBias",
  "tagCombination",
  "cardCombination",
  "emotionVector",
  "spreadPosition",
  "reversedAdjustment",
] as const;


