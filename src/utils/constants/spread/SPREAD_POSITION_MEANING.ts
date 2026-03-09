/**
 * 스프레드 포지션의 역할과 핵심 의미를 정의합니다.
 */
export const SPREAD_POSITION_MEANINGS = {
  one_card: [
    { position: 1, role: "answer", coreMeaning: "질문에 대한 핵심 답", focus: ["overall_guidance"] },
  ],

  three_card: [
    { position: 1, role: "past", coreMeaning: "과거 배경", focus: ["past_influence"] },
    { position: 2, role: "present", coreMeaning: "현재 상태", focus: ["current_state"] },
    { position: 3, role: "future", coreMeaning: "가까운 미래 흐름", focus: ["future_trend"] },
  ],

  four_card: [
    { position: 1, role: "situation", coreMeaning: "문제 상황", focus: ["problem_state"] },
    { position: 2, role: "cause", coreMeaning: "원인", focus: ["root_cause"] },
    { position: 3, role: "advice", coreMeaning: "행동 조언", focus: ["action"] },
    { position: 4, role: "outcome", coreMeaning: "예상 결과", focus: ["result"] },
  ],

  five_card: [
    { position: 1, role: "current_situation", coreMeaning: "현재 상황", focus: ["present"] },
    { position: 2, role: "past_influence", coreMeaning: "과거 영향", focus: ["background"] },
    { position: 3, role: "hidden_factor", coreMeaning: "숨은 요인", focus: ["hidden_issue"] },
    { position: 4, role: "advice", coreMeaning: "핵심 조언", focus: ["guidance"] },
    { position: 5, role: "future", coreMeaning: "미래 방향", focus: ["future_direction"] },
  ],

  celtic_cross: [
    { position: 1, role: "present", coreMeaning: "현재 핵심", focus: ["core_state"] },
    { position: 2, role: "challenge", coreMeaning: "주요 도전", focus: ["obstacle"] },
    { position: 3, role: "conscious_goal", coreMeaning: "의식적 목표", focus: ["goal"] },
    { position: 4, role: "subconscious", coreMeaning: "무의식적 영향", focus: ["subconscious"] },
    { position: 5, role: "past", coreMeaning: "최근 과거", focus: ["recent_past"] },
    { position: 6, role: "near_future", coreMeaning: "가까운 미래", focus: ["near_future"] },
    { position: 7, role: "self_position", coreMeaning: "질문자의 태도", focus: ["mindset"] },
    { position: 8, role: "external_influence", coreMeaning: "외부 영향", focus: ["environment"] },
    { position: 9, role: "hopes_and_fears", coreMeaning: "희망과 두려움", focus: ["inner_tension"] },
    { position: 10, role: "final_outcome", coreMeaning: "최종 결과", focus: ["long_term_result"] },
  ],

  relationship_spread: [
    { position: 1, role: "self", coreMeaning: "나의 감정", focus: ["self_emotion"] },
    { position: 2, role: "partner", coreMeaning: "상대의 감정", focus: ["partner_emotion"] },
    { position: 3, role: "relationship_state", coreMeaning: "관계의 현재 상태", focus: ["dynamic"] },
    { position: 4, role: "hidden_issue", coreMeaning: "숨은 이슈", focus: ["conflict"] },
    { position: 5, role: "advice", coreMeaning: "관계 조언", focus: ["relationship_guidance"] },
    { position: 6, role: "future", coreMeaning: "관계의 미래 흐름", focus: ["relationship_future"] },
  ],

  horseshoe_spread: [
    { position: 1, role: "past", coreMeaning: "과거 영향", focus: ["past"] },
    { position: 2, role: "present", coreMeaning: "현재 상태", focus: ["present"] },
    { position: 3, role: "hidden_influence", coreMeaning: "숨은 영향", focus: ["hidden_factor"] },
    { position: 4, role: "obstacle", coreMeaning: "핵심 장애물", focus: ["obstacle"] },
    { position: 5, role: "external_influence", coreMeaning: "외부 요인", focus: ["external"] },
    { position: 6, role: "advice", coreMeaning: "전략 조언", focus: ["strategy"] },
    { position: 7, role: "outcome", coreMeaning: "결과", focus: ["outcome"] },
  ],

  magic_seven: [
    { position: 1, role: "current_state", coreMeaning: "현재 문제 상태", focus: ["problem"] },
    { position: 2, role: "past_cause", coreMeaning: "과거 원인", focus: ["cause"] },
    { position: 3, role: "hidden_factor", coreMeaning: "숨은 요인", focus: ["hidden"] },
    { position: 4, role: "present_action", coreMeaning: "현재 행동 전략", focus: ["intervention"] },
    { position: 5, role: "external_factor", coreMeaning: "외부 압력", focus: ["pressure"] },
    { position: 6, role: "near_future", coreMeaning: "가까운 변화", focus: ["shift"] },
    { position: 7, role: "final_outcome", coreMeaning: "최종 해소 방향", focus: ["resolution"] },
  ],
} as const;

