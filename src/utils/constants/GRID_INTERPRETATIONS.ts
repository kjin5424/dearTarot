/**
 * 9분할 그리드 리딩의 위치별 해석 힌트를 정의합니다.
 */
export const GRID_INTERPRETATIONS = {
  1: {
    label: "좌상단",
    role: "past_mindset",
    meaning: "현재 질문을 만들게 된 과거의 인식 틀과 전제입니다.",
    focus: ["bias", "old_story", "inherited_pattern"],
  },
  2: {
    label: "상단 중앙",
    role: "aspiration",
    meaning: "질문자가 의식적으로 원하는 목표와 기대치입니다.",
    focus: ["goal", "wish", "ideal_outcome"],
  },
  3: {
    label: "우상단",
    role: "future_signal",
    meaning: "현재 흐름이 유지될 때 나타나는 단기 미래 신호입니다.",
    focus: ["trend", "timing", "emerging_factor"],
  },
  4: {
    label: "중앙 좌측",
    role: "external_influence",
    meaning: "사람/조직/환경 등 외부 시스템에서 들어오는 영향입니다.",
    focus: ["environment", "pressure", "support"],
  },
  5: {
    label: "중앙",
    role: "core_state",
    meaning: "문제의 핵심 정서와 본질 갈등이 응축된 중심입니다.",
    focus: ["truth", "primary_conflict", "current_energy"],
  },
  6: {
    label: "중앙 우측",
    role: "decision_gate",
    meaning: "흐름을 바꾸는 다음 현실적 선택 지점입니다.",
    focus: ["option", "tradeoff", "commitment"],
  },
  7: {
    label: "좌하단",
    role: "root_pattern",
    meaning: "두려움/기억/결핍에서 비롯된 심층 패턴입니다.",
    focus: ["shadow", "attachment", "origin"],
  },
  8: {
    label: "하단 중앙",
    role: "integration",
    meaning: "앞으로 나아가기 위해 수용하고 통합해야 할 과제입니다.",
    focus: ["acceptance", "boundary", "self_responsibility"],
  },
  9: {
    label: "우하단",
    role: "action_result",
    meaning: "정렬된 행동 이후 가장 가능성 높은 결과 영역입니다.",
    focus: ["result", "stability", "next_chapter"],
  },
} as const;
