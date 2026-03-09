/**
 * 스프레드 메타데이터(카드 수/난이도/사용 맥락)를 정의합니다.
 */
export const SPREAD_DEFINITIONS = [
  {
    spreadId: "one_card",
    name: "One Card",
    cardCount: 1,
    difficulty: "basic",

    useCases: [
      "core_message_check",
      "current_energy_scan",
      "daily_guidance",
    ],

    questionPatterns: [
      "single_focus_question",
      "current_state_check",
      "simple_decision",
    ],

    recommendedContexts: [
      "love",
      "career",
      "finance",
      "health",
      "personal",
      "advice",
      "spiritual",
    ],
  },

  {
    spreadId: "three_card",
    name: "Three Card",
    cardCount: 3,
    difficulty: "basic",

    useCases: [
      "past_present_future",
      "cause_action_result",
      "relationship_understanding",
      "decision_support",
      "emotional_clarity",
    ],

    questionPatterns: [
      "timeline_question",
      "relationship_question",
      "choice_question",
      "situation_analysis",
    ],

    recommendedContexts: ["love", "career", "finance", "personal"],
  },

  {
    spreadId: "four_card",
    name: "Four Card",
    cardCount: 4,
    difficulty: "intermediate",

    useCases: ["problem_solving", "quick_diagnosis"],

    questionPatterns: ["urgent_problem", "situation_breakdown"],

    recommendedContexts: ["career", "finance", "personal", "health"],
  },

  {
    spreadId: "five_card",
    name: "Five Card",
    cardCount: 5,
    difficulty: "intermediate",

    useCases: ["detailed_problem_analysis", "multi_factor_situation"],

    questionPatterns: ["complex_problem", "deep_analysis_needed"],

    recommendedContexts: ["career", "finance", "personal", "health", "love"],
  },

  {
    spreadId: "celtic_cross",
    name: "Celtic Cross",
    cardCount: 10,
    difficulty: "advanced",

    useCases: [
      "life_direction",
      "complex_situation_analysis",
      "deep_psychological_reading",
    ],

    questionPatterns: [
      "major_life_question",
      "long_term_problem",
      "deep_self_analysis",
    ],

    recommendedContexts: ["career", "love", "spiritual", "personal"],
  },

  {
    spreadId: "relationship_spread",
    name: "Relationship Spread",
    cardCount: 6,
    difficulty: "intermediate",

    useCases: [
      "romantic_relationship",
      "human_relationship",
      "family_relationship",
      "work_relationship",
    ],

    questionPatterns: [
      "relationship_question",
      "emotion_analysis",
      "mutual_feelings",
    ],

    recommendedContexts: ["love", "personal", "career"],
  },

  {
    spreadId: "horseshoe_spread",
    name: "Horseshoe Spread",
    cardCount: 7,
    difficulty: "intermediate",

    useCases: [
      "broad_question",
      "non_relationship_problem",
      "situation_overview",
    ],

    questionPatterns: ["wide_scope_question", "problem_overview"],

    recommendedContexts: ["career", "finance", "personal", "advice"],
  },

  {
    spreadId: "magic_seven",
    name: "Magic Seven",
    cardCount: 7,
    difficulty: "advanced",

    useCases: [
      "current_problem_detection",
      "future_obstacles",
      "problem_intervention",
    ],

    questionPatterns: ["problem_diagnosis", "future_risk_analysis"],

    recommendedContexts: ["career", "finance", "personal", "spiritual"],
  },
];


