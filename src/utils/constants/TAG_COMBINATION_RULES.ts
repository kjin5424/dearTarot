// 1. 규칙의 폭발적 증가 관리 (Scalability)
// 주석에 써주신 대로 theme × emotion 등 수백 개의 규칙이 생길 텐데, 이를 관리하기 위한 **'Rule Validator'**가 있으면 좋습니다.
// - Tip: tags 배열을 정렬(sort())해서 key로 사용하면, order: "any"인 경우 중복 검사를 훨씬 쉽게 할 수 있습니다.

// 2. AI Modifier의 활용
// probabilityBoost를 설정하신 점이 흥미롭습니다.
// - 제안: AI 프롬프트에 이 수치를 전달할 때, "이 조합은 매우 희귀하고 강력한 조합이니 강조해서 설명해줘"라는 가이드를 함께 주면 '힐링 타로'로서의 특별한 사용자 경험(Aha-moment)을 줄 수 있습니다.

// 3. 감정의 임계값 (Threshold)
// emotionShift로 수치가 변하다가 0 이하로 떨어지거나 1을 초과하는 경우를 대비해 clamp(value, 0, 1) 처리가 엔진에 포함되어야 할 것 같습니다.

// 4. '상충하는 조합' 처리 로직
// 만약 아주 긍정적인 카드(The Sun)와 아주 부정적인 카드(The Tower)가 만났을 때, 단순히 수치를 섞기보다 **'어떤 카드가 결과 카드인가'**에 따라 가중치를 주는 대안을 고려해 보세요.

export const TAG_COMBINATION_RULES = [
  // emotion × emotion 60개
  {
    ruleId: "tcr_001",
    priority: 70,
    tags: ["hope", "anxiety"],
    order: "any",
    contexts: ["love", "career", "money", "personal"],
    effect: {
      themeAdd: ["uncertain_expectation"],
      meaningModifier: "hope_under_stress",
      emotionShift: {
        hope: -0.2,
        anxiety: 0.3,
      },
    },
    aiModifier: { probabilityBoost: 0.12 },
  },
  {
    ruleId: "tcr_002",
    priority: 70,
    tags: ["hope", "fear"],
    order: "any",
    contexts: ["love", "career", "money", "personal"],
    effect: {
      themeAdd: ["hesitation"],
      meaningModifier: "fearful_hope",
      emotionShift: {
        hope: -0.25,
        fear: 0.25,
      },
    },
    aiModifier: { probabilityBoost: 0.13 },
  },
  {
    ruleId: "tcr_003",
    priority: 70,
    tags: ["hope", "confidence"],
    order: "any",
    contexts: ["love", "career", "money", "personal"],
    effect: {
      themeAdd: ["optimistic_progress"],
      meaningModifier: "strong_expectation",
      emotionShift: {
        hope: 0.25,
        confidence: 0.25,
      },
    },
    aiModifier: { probabilityBoost: 0.2 },
  },
  {
    ruleId: "tcr_004",
    priority: 70,
    tags: ["hope", "determination"],
    order: "any",
    contexts: ["career", "personal"],
    effect: {
      themeAdd: ["goal_pursuit"],
      meaningModifier: "driven_hope",
      emotionShift: {
        hope: 0.2,
        determination: 0.3,
      },
    },
    aiModifier: { probabilityBoost: 0.18 },
  },
  {
    ruleId: "tcr_005",
    priority: 70,
    tags: ["hope", "joy"],
    order: "any",
    contexts: ["love", "personal"],
    effect: {
      themeAdd: ["positive_outcome"],
      meaningModifier: "joyful_expectation",
      emotionShift: {
        hope: 0.2,
        joy: 0.3,
      },
    },
    aiModifier: { probabilityBoost: 0.22 },
  },
  {
    ruleId: "tcr_006",
    priority: 70,
    tags: ["hope", "regret"],
    order: "any",
    contexts: ["love", "personal"],
    effect: {
      themeAdd: ["nostalgia"],
      meaningModifier: "regretful_hope",
      emotionShift: {
        hope: -0.15,
        regret: 0.25,
      },
    },
    aiModifier: { probabilityBoost: 0.11 },
  },
  {
    ruleId: "tcr_007",
    priority: 70,
    tags: ["hope", "anger"],
    order: "any",
    contexts: ["personal", "career"],
    effect: {
      themeAdd: ["frustration"],
      meaningModifier: "angry_expectation",
      emotionShift: {
        hope: -0.2,
        anger: 0.35,
      },
    },
    aiModifier: { probabilityBoost: 0.1 },
  },
  {
    ruleId: "tcr_008",
    priority: 70,
    tags: ["confidence", "fear"],
    order: "any",
    contexts: ["career", "personal"],
    effect: {
      themeAdd: ["inner_conflict"],
      meaningModifier: "confidence_tested",
      emotionShift: {
        confidence: -0.2,
        fear: 0.25,
      },
    },
    aiModifier: { probabilityBoost: 0.14 },
  },
  {
    ruleId: "tcr_009",
    priority: 70,
    tags: ["confidence", "joy"],
    order: "any",
    contexts: ["career", "personal"],
    effect: {
      themeAdd: ["success_energy"],
      meaningModifier: "confident_happiness",
      emotionShift: {
        confidence: 0.3,
        joy: 0.25,
      },
    },
    aiModifier: { probabilityBoost: 0.24 },
  },
  {
    ruleId: "tcr_010",
    priority: 70,
    tags: ["confidence", "anxiety"],
    order: "any",
    contexts: ["career", "personal"],
    effect: {
      themeAdd: ["pressure"],
      meaningModifier: "strained_confidence",
      emotionShift: {
        confidence: -0.2,
        anxiety: 0.3,
      },
    },
    aiModifier: { probabilityBoost: 0.13 },
  },
  // theme × theme 120개
  // theme × emotion 120개
  // theme × energy 50개
  // emotion × energy 40개
];
