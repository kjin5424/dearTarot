/**
 * 복수 질문 유형을 병합할 때의 우선순위 규칙을 정의합니다.
 */
export const QUESTION_TYPE_MERGE_RULES = [
  {
    ruleId: "qtm_001",
    when: ["relationship", "timeline"],
    result: {
      primaryType: "relationship",
      secondaryType: "timeline",
      recommendedSpreads: ["relationship_spread", "three_card"],
    },
  },
  {
    ruleId: "qtm_002",
    when: ["problem_solving", "advice"],
    result: {
      primaryType: "problem_solving",
      secondaryType: "advice",
      recommendedSpreads: ["four_card", "five_card"],
    },
  },
  {
    ruleId: "qtm_003",
    when: ["decision", "outcome_prediction"],
    result: {
      primaryType: "decision",
      secondaryType: "outcome_prediction",
      recommendedSpreads: ["three_card", "five_card"],
    },
  },
  {
    ruleId: "qtm_004",
    when: ["life_direction", "emotional_clarity"],
    result: {
      primaryType: "life_direction",
      secondaryType: "emotional_clarity",
      recommendedSpreads: ["celtic_cross", "magic_seven"],
    },
  },
];


