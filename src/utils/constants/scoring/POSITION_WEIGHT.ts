/**
 * 스프레드 포지션/역할별 가중치 모델을 정의합니다.
 */
export const POSITION_ROLE_WEIGHT = {
  answer: 1.35,

  past: 0.82,
  present: 1.2,
  future: 1.18,

  situation: 1.15,
  current_situation: 1.15,
  current_state: 1.15,

  cause: 0.95,
  past_influence: 0.9,
  past_cause: 0.9,

  hidden_factor: 1.05,
  hidden_influence: 1.03,
  subconscious: 1.02,

  challenge: 1.12,
  obstacle: 1.12,

  advice: 1.25,
  present_action: 1.22,

  outcome: 1.3,
  final_outcome: 1.35,
  near_future: 1.15,
  future_direction: 1.18,

  conscious_goal: 0.92,
  self_position: 1.0,
  external_influence: 0.98,
  external_factor: 0.98,
  hopes_and_fears: 0.9,

  self: 1.12,
  partner: 1.12,
  relationship_state: 1.2,
  relationship_future: 1.28,
};

export const SPREAD_POSITION_WEIGHTS = {
  one_card: [
    {
      position: 1,
      role: "answer",
      weight: 1.4,
    },
  ],

  three_card: [
    {
      position: 1,
      role: "past",
      weight: 0.85,
    },
    {
      position: 2,
      role: "present",
      weight: 1.2,
    },
    {
      position: 3,
      role: "future",
      weight: 1.25,
    },
  ],

  four_card: [
    {
      position: 1,
      role: "situation",
      weight: 1.15,
    },
    {
      position: 2,
      role: "cause",
      weight: 0.95,
    },
    {
      position: 3,
      role: "advice",
      weight: 1.25,
    },
    {
      position: 4,
      role: "outcome",
      weight: 1.3,
    },
  ],

  five_card: [
    {
      position: 1,
      role: "current_situation",
      weight: 1.15,
    },
    {
      position: 2,
      role: "past_influence",
      weight: 0.88,
    },
    {
      position: 3,
      role: "hidden_factor",
      weight: 1.05,
    },
    {
      position: 4,
      role: "advice",
      weight: 1.22,
    },
    {
      position: 5,
      role: "future",
      weight: 1.28,
    },
  ],

  celtic_cross: [
    {
      position: 1,
      role: "present",
      weight: 1.2,
    },
    {
      position: 2,
      role: "challenge",
      weight: 1.12,
    },
    {
      position: 3,
      role: "conscious_goal",
      weight: 0.9,
    },
    {
      position: 4,
      role: "subconscious",
      weight: 1.0,
    },
    {
      position: 5,
      role: "past",
      weight: 0.82,
    },
    {
      position: 6,
      role: "near_future",
      weight: 1.15,
    },
    {
      position: 7,
      role: "self_position",
      weight: 0.98,
    },
    {
      position: 8,
      role: "external_influence",
      weight: 0.95,
    },
    {
      position: 9,
      role: "hopes_and_fears",
      weight: 0.88,
    },
    {
      position: 10,
      role: "final_outcome",
      weight: 1.35,
    },
  ],

  relationship_spread: [
    {
      position: 1,
      role: "self",
      weight: 1.1,
    },
    {
      position: 2,
      role: "partner",
      weight: 1.1,
    },
    {
      position: 3,
      role: "relationship_state",
      weight: 1.22,
    },
    {
      position: 4,
      role: "hidden_issue",
      weight: 1.08,
    },
    {
      position: 5,
      role: "advice",
      weight: 1.24,
    },
    {
      position: 6,
      role: "future",
      weight: 1.3,
    },
  ],

  horseshoe_spread: [
    {
      position: 1,
      role: "past",
      weight: 0.84,
    },
    {
      position: 2,
      role: "present",
      weight: 1.18,
    },
    {
      position: 3,
      role: "hidden_influence",
      weight: 1.02,
    },
    {
      position: 4,
      role: "obstacle",
      weight: 1.12,
    },
    {
      position: 5,
      role: "external_influence",
      weight: 0.96,
    },
    {
      position: 6,
      role: "advice",
      weight: 1.22,
    },
    {
      position: 7,
      role: "outcome",
      weight: 1.3,
    },
  ],

  magic_seven: [
    {
      position: 1,
      role: "current_state",
      weight: 1.15,
    },
    {
      position: 2,
      role: "past_cause",
      weight: 0.9,
    },
    {
      position: 3,
      role: "hidden_factor",
      weight: 1.06,
    },
    {
      position: 4,
      role: "present_action",
      weight: 1.22,
    },
    {
      position: 5,
      role: "external_factor",
      weight: 0.97,
    },
    {
      position: 6,
      role: "near_future",
      weight: 1.16,
    },
    {
      position: 7,
      role: "final_outcome",
      weight: 1.34,
    },
  ],
};
export const POSITION_WEIGHT_MODIFIERS_BY_QUESTION_TYPE = {
  yes_no: {
    answer: 1.15,
    future: 1.08,
    outcome: 1.12,
    final_outcome: 1.12,
  },

  relationship: {
    self: 1.08,
    partner: 1.15,
    relationship_state: 1.12,
    hidden_issue: 1.1,
    future: 1.05,
  },

  advice: {
    advice: 1.18,
    present_action: 1.18,
    hidden_factor: 1.05,
    outcome: 1.05,
  },

  problem_solving: {
    cause: 1.12,
    hidden_factor: 1.1,
    obstacle: 1.12,
    advice: 1.12,
  },

  timeline: {
    past: 1.05,
    present: 1.08,
    future: 1.12,
    near_future: 1.1,
  },
};


