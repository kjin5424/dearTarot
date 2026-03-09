/**
 * 상수 검증에 사용하는 기준 범위와 정책 값을 정의합니다.
 */
export const CONSTANTS_VALIDATION_RULES = {
  cardId: {
    min: 0,
    max: 77,
    mustBeInteger: true,
    uniqueAcrossPrimarySets: true,
  },

  contextKey: {
    canonical: [
      "love",
      "career",
      "finance",
      "health",
      "spiritual",
      "personal",
      "advice",
    ],
    aliases: ["money", "finances", "work", "relationship", "guidance"],
    warnOnAlias: true,
  },

  spread: {
    requirePositionMeaning: true,
    requirePositionWeight: true,
    requireInterpretationRule: true,
    cardCountMustMatchPositions: true,
  },

  rule: {
    priorityMin: 1,
    priorityMax: 100,
    uniqueRuleId: true,
    enforceReferencedCardId: true,
  },

  emotion: {
    valenceMin: -1,
    valenceMax: 1,
    arousalMin: 0,
    arousalMax: 1,
    dominanceMin: 0,
    dominanceMax: 1,
    clampAfterShift: true,
  },

  symbolCoordinates: {
    normalizedMin: 0,
    normalizedMax: 1,
    zoneMin: 1,
    zoneMax: 9,
    minSymbolsPerCard: 1,
  },

  spatialPsychology: {
    requiredZones: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    requireTransitionRules: true,
  },

  healingAffirmation: {
    requireFullCoverage: true,
    polaritySet: ["light", "shadow"],
  },
} as const;

export const VALIDATION_REPORT_LEVEL = {
  error: "must_fix",
  warning: "should_fix",
  info: "nice_to_fix",
} as const;


