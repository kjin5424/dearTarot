/**
 * 그리드 리딩에서 쓰는 위치별 해석 힌트를 정의합니다.
 */
export const GRID_INTERPRETATIONS = {
  1: {
    label: "Upper Left",
    role: "past_mindset",
    meaning: "Earlier assumptions that shaped the current question.",
    focus: ["bias", "old_story", "inherited_pattern"],
  },
  2: {
    label: "Upper Center",
    role: "aspiration",
    meaning: "What the querent consciously wants right now.",
    focus: ["goal", "wish", "ideal_outcome"],
  },
  3: {
    label: "Upper Right",
    role: "future_signal",
    meaning: "Likely short-term direction if current momentum continues.",
    focus: ["trend", "timing", "emerging_factor"],
  },
  4: {
    label: "Middle Left",
    role: "external_influence",
    meaning: "People or systems shaping the situation from outside.",
    focus: ["environment", "pressure", "support"],
  },
  5: {
    label: "Center",
    role: "core_state",
    meaning: "The heart of the matter and present emotional center.",
    focus: ["truth", "primary_conflict", "current_energy"],
  },
  6: {
    label: "Middle Right",
    role: "decision_gate",
    meaning: "The next practical choice that changes trajectory.",
    focus: ["option", "tradeoff", "commitment"],
  },
  7: {
    label: "Lower Left",
    role: "root_pattern",
    meaning: "Deep pattern from fear, memory, or unresolved need.",
    focus: ["shadow", "attachment", "origin"],
  },
  8: {
    label: "Lower Center",
    role: "integration",
    meaning: "What must be accepted and integrated to move forward.",
    focus: ["acceptance", "boundary", "self_responsibility"],
  },
  9: {
    label: "Lower Right",
    role: "action_result",
    meaning: "Most probable outcome after aligned action.",
    focus: ["result", "stability", "next_chapter"],
  },
} as const;


