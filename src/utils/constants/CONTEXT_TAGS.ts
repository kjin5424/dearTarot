/**
 * 컨텍스트별 테마/감정/에너지 편향 가중치를 정의합니다.
 */
export const CONTEXT_TAGS = [
  {
    context: "love",
    우선순위: 100,
    weight: 1.0,
    theme편향: {
      relationship: 0.6,
      commitment: 0.5,
      attraction: 0.5,
      jealousy: 0.4,
      breakup: 0.6,
    },
    emotion편향: {
      hope: 0.25,
      joy: 0.25,
      anxiety: 0.3,
      regret: 0.2,
    },
    energy편향: {
      momentum: 0.2,
      delay: 0.2,
      block: 0.3,
    },
  },

  {
    context: "career",
    우선순위: 95,
    weight: 1.0,
    theme편향: {
      ambition: 0.6,
      competition: 0.5,
      growth: 0.5,
      conflict: 0.4,
      stability: 0.4,
    },
    emotion편향: {
      confidence: 0.3,
      determination: 0.35,
      anxiety: 0.25,
    },
    energy편향: {
      momentum: 0.35,
      expansion: 0.3,
      delay: 0.2,
    },
  },

  {
    context: "finance",
    우선순위: 90,
    weight: 0.95,
    theme편향: {
      risk: 0.6,
      opportunity: 0.55,
      stability: 0.5,
      loss: 0.6,
    },
    emotion편향: {
      fear: 0.3,
      confidence: 0.25,
    },
    energy편향: {
      momentum: 0.25,
      contraction: 0.3,
      block: 0.25,
    },
  },

  {
    context: "health",
    우선순위: 85,
    weight: 0.9,
    theme편향: {
      recovery: 0.6,
      imbalance: 0.5,
      restriction: 0.4,
    },
    emotion편향: {
      anxiety: 0.35,
      hope: 0.25,
    },
    energy편향: {
      delay: 0.3,
      contraction: 0.25,
    },
  },

  {
    context: "advice",
    우선순위: 80,
    weight: 0.85,
    theme편향: {
      decision: 0.6,
      strategy: 0.5,
      awareness: 0.5,
    },
    emotion편향: {
      determination: 0.3,
      confidence: 0.25,
    },
    energy편향: {
      momentum: 0.25,
      block: 0.2,
    },
  },

  {
    context: "spiritual",
    우선순위: 75,
    weight: 0.85,
    theme편향: {
      awakening: 0.6,
      intuition: 0.6,
      transformation: 0.5,
    },
    emotion편향: {
      hope: 0.25,
      fear: 0.2,
    },
    energy편향: {
      contraction: 0.25,
      expansion: 0.3,
    },
  },

    // `personal`은 다른 컨텍스트가 없을 때 적용되는 기본 대체 컨텍스트
  {
    context: "personal",
    우선순위: 10,
    weight: 0.7,
    theme편향: {},
    emotion편향: {},
    energy편향: {},
  },

  // 우선순위 값으로 컨텍스트 충돌을 해결하고,
  // 편향 값은 해석 엔진에서 점수 보정치로 사용합니다.
] as const;



