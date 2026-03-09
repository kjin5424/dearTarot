/**
 * 스프레드별 문장 템플릿을 정의합니다.
 */
export const SPREAD_INTERPRETATION_TEMPLATES = {
  one_card: {
    direct_answer: "{cardCore}가 질문에 대한 핵심 신호입니다.",
    short_explanation: "현재 질문의 중심 축은 {focusSummary} 입니다.",
    practical_advice: "지금은 {adviceSummary} 방향으로 행동을 정리해 보세요.",
  },

  three_card: {
    past_context: "과거에는 {pastSummary} 흐름이 있었고, 이것이 현재에 영향을 줍니다.",
    present_analysis: "현재 핵심 상태는 {presentSummary} 입니다.",
    future_projection: "가까운 미래는 {futureSummary} 방향으로 전개될 가능성이 큽니다.",
    action_tip: "실행 포인트는 {actionSummary} 입니다.",
    root_cause: "문제의 원인은 {causeSummary} 입니다.",
    recommended_action: "권장 행동은 {actionSummary} 입니다.",
    expected_result: "이 행동의 예상 결과는 {resultSummary} 입니다.",
  },

  four_card: {
    problem_definition: "지금 문제의 핵심은 {problemSummary} 입니다.",
    cause_analysis: "원인 축은 {causeSummary} 로 보입니다.",
    solution_guidance: "해결 방향은 {adviceSummary} 입니다.",
    outcome_projection: "이 경로를 따르면 {outcomeSummary} 결과가 예상됩니다.",
  },

  five_card: {
    current_state: "현재 상태는 {currentSummary} 입니다.",
    past_driver: "배경에는 {pastSummary} 요인이 작동했습니다.",
    hidden_factor_analysis: "숨은 변수는 {hiddenSummary} 입니다.",
    detailed_advice: "지금 필요한 조치는 {adviceSummary} 입니다.",
    future_outlook: "향후 전개는 {futureSummary} 쪽으로 이어집니다.",
  },

  celtic_cross: {
    core_situation: "현재 전체 구도는 {presentSummary} 입니다.",
    main_challenge: "가장 큰 도전은 {challengeSummary} 입니다.",
    conscious_vs_subconscious:
      "의식적 목표는 {goalSummary}, 무의식적 동인은 {subconsciousSummary} 입니다.",
    past_background: "배경 흐름은 {pastSummary} 입니다.",
    near_future: "가까운 시점에는 {nearFutureSummary} 변화가 들어옵니다.",
    self_and_environment: "내적 상태는 {selfSummary}, 외부 환경은 {externalSummary} 입니다.",
    hopes_fears_tension: "희망과 두려움의 긴장은 {fearHopeSummary} 로 나타납니다.",
    final_outcome: "최종 결과는 {finalSummary} 방향입니다.",
    integrated_advice: "종합 조언: {integratedAdvice}",
  },

  relationship_spread: {
    self_feeling: "나의 감정은 {selfSummary} 입니다.",
    partner_feeling: "상대의 감정은 {partnerSummary} 입니다.",
    relationship_dynamic: "관계의 현재 역학은 {relationSummary} 입니다.",
    hidden_conflict: "숨은 갈등 요소는 {hiddenSummary} 입니다.",
    relationship_advice: "관계를 위한 실행 조언은 {adviceSummary} 입니다.",
    relationship_future: "관계의 다음 흐름은 {futureSummary} 입니다.",
  },

  horseshoe_spread: {
    past_context: "과거 배경은 {pastSummary} 입니다.",
    present_status: "현재 상태는 {presentSummary} 입니다.",
    hidden_influence: "숨은 영향은 {hiddenSummary} 입니다.",
    main_obstacle: "핵심 장애물은 {obstacleSummary} 입니다.",
    external_environment: "외부 환경 변수는 {externalSummary} 입니다.",
    strategic_advice: "전략 조언은 {adviceSummary} 입니다.",
    probable_outcome: "예상 결과는 {outcomeSummary} 입니다.",
  },

  magic_seven: {
    problem_overview: "문제 개요는 {problemSummary} 입니다.",
    root_cause: "근본 원인은 {causeSummary} 입니다.",
    hidden_factor: "숨은 요인은 {hiddenSummary} 입니다.",
    intervention_strategy: "개입 전략은 {strategySummary} 입니다.",
    external_pressure: "외부 압력은 {externalSummary} 입니다.",
    near_future_shift: "가까운 변화는 {nearFutureSummary} 입니다.",
    final_resolution: "최종 해소 방향은 {finalSummary} 입니다.",
  },
} as const;

