/**
 * 질문 문장에서 질문 유형을 추론하는 규칙을 정의합니다.
 */
export const QUESTION_TYPE_INFERENCE_RULES = [
  {
    ruleId: "qir_001",
    priority: 100,
    condition: {
      includesAny: ["yes", "no", "맞아", "아니야", "가능할까", "될까"],
      excludesAny: ["왜", "원인", "어떻게", "해결"],
    },
    result: {
      questionType: "yes_no",
      confidence: 0.95,
      recommendedSpreads: ["one_card", "three_card"],
    },
  },
  {
    ruleId: "qir_002",
    priority: 96,
    condition: {
      includesAny: ["과거", "현재", "미래", "흐름", "timeline", "next month"],
    },
    result: {
      questionType: "timeline",
      confidence: 0.9,
      recommendedSpreads: ["three_card", "horseshoe_spread"],
    },
  },
  {
    ruleId: "qir_003",
    priority: 98,
    condition: {
      includesAny: ["연애", "관계", "상대", "파트너", "부부", "relationship"],
    },
    result: {
      questionType: "relationship",
      confidence: 0.94,
      recommendedSpreads: ["relationship_spread", "three_card"],
    },
  },
  {
    ruleId: "qir_004",
    priority: 95,
    condition: {
      includesAny: ["조언", "어떻게", "방향", "선택", "무엇을 해야"],
    },
    result: {
      questionType: "advice",
      confidence: 0.9,
      recommendedSpreads: ["four_card", "five_card"],
    },
  },
  {
    ruleId: "qir_005",
    priority: 94,
    condition: {
      includesAny: ["원인", "문제", "막힘", "장애", "왜"],
    },
    result: {
      questionType: "problem_solving",
      confidence: 0.9,
      recommendedSpreads: ["four_card", "five_card", "magic_seven"],
    },
  },
  {
    ruleId: "qir_006",
    priority: 92,
    condition: {
      includesAny: ["결정", "A or B", "선택", "갈까 말까", "해야 할까"],
    },
    result: {
      questionType: "decision",
      confidence: 0.88,
      recommendedSpreads: ["three_card", "five_card"],
    },
  },
  {
    ruleId: "qir_007",
    priority: 90,
    condition: {
      includesAny: ["결과", "될까", "가능성", "outcome", "prediction"],
    },
    result: {
      questionType: "outcome_prediction",
      confidence: 0.86,
      recommendedSpreads: ["three_card", "horseshoe_spread", "magic_seven"],
    },
  },
  {
    ruleId: "qir_008",
    priority: 89,
    condition: {
      includesAny: ["불안", "감정", "마음", "정리", "emotion"],
    },
    result: {
      questionType: "emotional_clarity",
      confidence: 0.84,
      recommendedSpreads: ["three_card", "magic_seven"],
    },
  },
  {
    ruleId: "qir_009",
    priority: 88,
    condition: {
      includesAny: ["인생", "방향", "장기", "사명", "life direction"],
    },
    result: {
      questionType: "life_direction",
      confidence: 0.82,
      recommendedSpreads: ["celtic_cross", "magic_seven"],
    },
  },
  {
    ruleId: "qir_010",
    priority: 87,
    condition: {
      includesAny: ["커리어", "직업", "이직", "승진", "프로젝트", "career"],
    },
    result: {
      questionType: "career",
      confidence: 0.8,
      recommendedSpreads: ["three_card", "four_card", "five_card", "celtic_cross"],
    },
  },
  {
    ruleId: "qir_011",
    priority: 87,
    condition: {
      includesAny: ["돈", "재정", "투자", "수입", "지출", "finance"],
    },
    result: {
      questionType: "finance",
      confidence: 0.8,
      recommendedSpreads: ["three_card", "four_card", "five_card", "horseshoe_spread"],
    },
  },
  {
    ruleId: "qir_012",
    priority: 87,
    condition: {
      includesAny: ["건강", "회복", "컨디션", "스트레스", "health"],
    },
    result: {
      questionType: "health",
      confidence: 0.8,
      recommendedSpreads: ["three_card", "four_card", "five_card"],
    },
  },
  {
    ruleId: "qir_013",
    priority: 80,
    condition: {
      includesAny: ["조언", "일반", "전체 흐름", "general reading"],
    },
    result: {
      questionType: "general_reading",
      confidence: 0.7,
      recommendedSpreads: ["horseshoe_spread", "magic_seven", "celtic_cross"],
    },
  },
  {
    ruleId: "qir_999",
    priority: 1,
    condition: { default: true },
    result: {
      questionType: "general",
      confidence: 0.4,
      recommendedSpreads: ["three_card"],
    },
  },
];

