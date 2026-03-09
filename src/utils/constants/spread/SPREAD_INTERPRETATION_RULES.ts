/**
 * 스프레드별 종합 해석 모드와 출력 구조 규칙을 정의합니다.
 */
export const SPREAD_INTERPRETATION_RULES = [
  {
    ruleId: "sir_one_card_001",
    spreadId: "one_card",
    interpretationMode: "single_focus",
    anchorPositions: [1],
    supportPositions: [],
    outputStructure: [
      "direct_answer",
      "short_explanation",
      "practical_advice"
    ],
    synthesisRules: {
      dominantPosition: 1,
      contradictionHandling: "none",
      summaryBias: "answer_first"
    },
    questionTypeBoost: {
      yes_no: ["direct_answer"],
      advice: ["practical_advice"],
      general_reading: ["short_explanation"]
    }
  },

  {
    ruleId: "sir_three_card_001",
    spreadId: "three_card",
    interpretationMode: "linear_timeline",
    anchorPositions: [2, 3],
    supportPositions: [1],
    outputStructure: [
      "past_context",
      "present_analysis",
      "future_projection",
      "action_tip"
    ],
    synthesisRules: {
      dominantPosition: 3,
      contradictionHandling: "present_overrides_past",
      summaryBias: "future_first"
    },
    questionTypeBoost: {
      timeline: ["past_context", "present_analysis", "future_projection"],
      relationship: ["present_analysis", "future_projection"],
      emotional_clarity: ["present_analysis", "action_tip"],
      decision: ["future_projection", "action_tip"]
    }
  },

  {
    ruleId: "sir_three_card_002",
    spreadId: "three_card",
    interpretationMode: "cause_action_result",
    anchorPositions: [2, 3],
    supportPositions: [1],
    outputStructure: [
      "root_cause",
      "recommended_action",
      "expected_result"
    ],
    synthesisRules: {
      dominantPosition: 2,
      contradictionHandling: "action_mitigates_negative_result",
      summaryBias: "action_first"
    },
    activationConditions: {
      questionTypes: ["problem_solving", "advice"]
    }
  },

  {
    ruleId: "sir_four_card_001",
    spreadId: "four_card",
    interpretationMode: "problem_resolution",
    anchorPositions: [1, 3, 4],
    supportPositions: [2],
    outputStructure: [
      "problem_definition",
      "cause_analysis",
      "solution_guidance",
      "outcome_projection"
    ],
    synthesisRules: {
      dominantPosition: 3,
      contradictionHandling: "advice_reframes_cause",
      summaryBias: "solution_first"
    },
    questionTypeBoost: {
      problem_solving: ["problem_definition", "cause_analysis", "solution_guidance"],
      advice: ["solution_guidance", "outcome_projection"],
      career: ["problem_definition", "solution_guidance"],
      finance: ["cause_analysis", "outcome_projection"]
    }
  },

  {
    ruleId: "sir_five_card_001",
    spreadId: "five_card",
    interpretationMode: "layered_diagnosis",
    anchorPositions: [1, 3, 4, 5],
    supportPositions: [2],
    outputStructure: [
      "current_state",
      "past_driver",
      "hidden_factor_analysis",
      "detailed_advice",
      "future_outlook"
    ],
    synthesisRules: {
      dominantPosition: 4,
      contradictionHandling: "hidden_factor_explains_conflict",
      summaryBias: "diagnosis_then_strategy"
    },
    questionTypeBoost: {
      problem_solving: ["hidden_factor_analysis", "detailed_advice"],
      advice: ["detailed_advice", "future_outlook"],
      decision: ["current_state", "future_outlook"]
    }
  },

  {
    ruleId: "sir_celtic_001",
    spreadId: "celtic_cross",
    interpretationMode: "holistic_deep_reading",
    anchorPositions: [1, 2, 6, 10],
    supportPositions: [3, 4, 5, 7, 8, 9],
    outputStructure: [
      "core_situation",
      "main_challenge",
      "conscious_vs_subconscious",
      "past_background",
      "near_future",
      "self_and_environment",
      "hopes_fears_tension",
      "final_outcome",
      "integrated_advice"
    ],
    synthesisRules: {
      dominantPosition: 10,
      contradictionHandling: "inner_conflict_explains_external_delay",
      summaryBias: "core_issue_first"
    },
    questionTypeBoost: {
      life_direction: ["core_situation", "main_challenge", "final_outcome", "integrated_advice"],
      general_reading: ["core_situation", "near_future", "final_outcome"],
      spiritual: ["conscious_vs_subconscious", "hopes_fears_tension"]
    }
  },

  {
    ruleId: "sir_relationship_001",
    spreadId: "relationship_spread",
    interpretationMode: "relational_dynamic",
    anchorPositions: [1, 2, 3, 6],
    supportPositions: [4, 5],
    outputStructure: [
      "self_feeling",
      "partner_feeling",
      "relationship_dynamic",
      "hidden_conflict",
      "relationship_advice",
      "relationship_future"
    ],
    synthesisRules: {
      dominantPosition: 3,
      contradictionHandling: "dynamic_overrides_individual_intent",
      summaryBias: "relationship_state_first"
    },
    questionTypeBoost: {
      relationship: ["partner_feeling", "relationship_dynamic", "relationship_future"],
      advice: ["hidden_conflict", "relationship_advice"],
      yes_no: ["relationship_future"]
    }
  },

  {
    ruleId: "sir_horseshoe_001",
    spreadId: "horseshoe_spread",
    interpretationMode: "broad_situation_scan",
    anchorPositions: [2, 4, 6, 7],
    supportPositions: [1, 3, 5],
    outputStructure: [
      "past_context",
      "present_status",
      "hidden_influence",
      "main_obstacle",
      "external_environment",
      "strategic_advice",
      "probable_outcome"
    ],
    synthesisRules: {
      dominantPosition: 7,
      contradictionHandling: "external_environment_modifies_outcome",
      summaryBias: "obstacle_then_outcome"
    },
    questionTypeBoost: {
      general_reading: ["present_status", "main_obstacle", "probable_outcome"],
      outcome_prediction: ["main_obstacle", "probable_outcome"],
      finance: ["external_environment", "probable_outcome"],
      career: ["strategic_advice", "probable_outcome"]
    }
  },

  {
    ruleId: "sir_magic_seven_001",
    spreadId: "magic_seven",
    interpretationMode: "deep_problem_intervention",
    anchorPositions: [1, 3, 4, 7],
    supportPositions: [2, 5, 6],
    outputStructure: [
      "problem_overview",
      "root_cause",
      "hidden_factor",
      "intervention_strategy",
      "external_pressure",
      "near_future_shift",
      "final_resolution"
    ],
    synthesisRules: {
      dominantPosition: 4,
      contradictionHandling: "strategy_can_override_negative_trend",
      summaryBias: "intervention_first"
    },
    questionTypeBoost: {
      problem_solving: ["root_cause", "hidden_factor", "intervention_strategy", "final_resolution"],
      emotional_clarity: ["problem_overview", "hidden_factor", "intervention_strategy"],
      life_direction: ["problem_overview", "near_future_shift", "final_resolution"]
    }
  }
];

