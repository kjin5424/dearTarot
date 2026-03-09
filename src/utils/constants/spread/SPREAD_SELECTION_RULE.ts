/**
 * 질문 유형별 추천 스프레드 규칙을 정의합니다.
 */
export const SPREAD_SELECTION_RULE = [
  { questionType: "yes_no", recommended: ["one_card", "three_card"] },
  {
    questionType: "relationship",
    recommended: ["relationship_spread", "three_card"],
  },
  { questionType: "timeline", recommended: ["three_card", "horseshoe_spread"] },
  { questionType: "advice", recommended: ["four_card", "five_card"] },
  {
    questionType: "problem_solving",
    recommended: ["four_card", "five_card", "magic_seven"],
  },
  { questionType: "decision", recommended: ["three_card", "five_card"] },
  {
    questionType: "outcome_prediction",
    recommended: ["three_card", "horseshoe_spread", "magic_seven"],
  },
  {
    questionType: "emotional_clarity",
    recommended: ["three_card", "magic_seven"],
  },
  {
    questionType: "life_direction",
    recommended: ["celtic_cross", "magic_seven"],
  },
  {
    questionType: "career",
    recommended: ["three_card", "four_card", "five_card", "celtic_cross"],
  },
  {
    questionType: "finance",
    recommended: ["three_card", "four_card", "five_card", "horseshoe_spread"],
  },
  { questionType: "health", recommended: ["three_card", "four_card"] },
  {
    questionType: "general_reading",
    recommended: ["horseshoe_spread", "magic_seven", "celtic_cross"],
  },
  { questionType: "general", recommended: ["three_card"] },
];


