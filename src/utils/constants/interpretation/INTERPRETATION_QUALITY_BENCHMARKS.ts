/**
 * 해석 상수 데이터의 품질 기준(최소 충족 조건)을 정의합니다.
 * - validator가 이 기준을 참조해 품질 저하를 조기에 감지합니다.
 */
export const INTERPRETATION_QUALITY_BENCHMARKS = {
  cardMeaning: {
    minCoreKeywordsMajor: 3,
    minCoreKeywordsMinor: 3,
    minAdviceLines: 1,
  },

  contextCoverage: {
    requiredContexts: [
      "love",
      "career",
      "finance",
      "health",
      "spiritual",
      "personal",
      "advice",
    ],
  },

  rules: {
    minTagCombinationRules: 300,
    minCardCombinationRules: 250,
  },

  emotionVector: {
    minCardCoverageRatio: 1,
  },
} as const;
