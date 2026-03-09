/**
 * 상충 신호 해석 시 우선순위 규칙을 정의합니다.
 */
export const INTERPRETATION_CONFLICT_RULES = [
  {
    ruleId: "icr_001",
    condition: {
      positivePositions: ["future", "outcome", "final_outcome"],
      negativePositions: ["past", "cause", "challenge"],
    },
    resolution: {
      strategy: "future_overrides_past_if_advice_positive",
      explanation:
        "과거/원인 축이 부정적이어도 조언과 미래 신호가 강하면 회복 가능성을 우선 반영합니다.",
    },
  },
  {
    ruleId: "icr_002",
    condition: {
      positivePositions: ["self", "partner"],
      negativePositions: ["relationship_state", "hidden_issue"],
    },
    resolution: {
      strategy: "relationship_state_overrides_individual_feelings",
      explanation:
        "개인 감정보다 실제 관계 상태와 숨은 이슈를 우선하여 현실적으로 해석합니다.",
    },
  },
  {
    ruleId: "icr_003",
    condition: {
      positivePositions: ["advice", "present_action"],
      negativePositions: ["outcome", "final_outcome"],
    },
    resolution: {
      strategy: "advice_reopens_closed_outcome",
      explanation:
        "결과 신호가 약해도 실행 조언 신호가 강하면 결과를 고정하지 않고 가변적으로 처리합니다.",
    },
  },
  {
    ruleId: "icr_004",
    condition: {
      positivePositions: ["external_influence", "external_factor"],
      negativePositions: ["self_position", "self", "present"],
    },
    resolution: {
      strategy: "external_support_softens_internal_weakness",
      explanation:
        "내부 동력이 약한 경우 외부 지원 요인을 반영해 실행 가능성을 보정합니다.",
    },
  },
] as const;

