/**
 * 카드 시선 방향과 에너지 흐름 해석 규칙을 정의합니다.
 * - direction은 인물/에너지의 주 흐름 방향입니다.
 * - contextModifier는 컨텍스트별 해석 보정 문구입니다.
 */
import { TAROT_CARDS } from "./TAROT_CARDS";
import type { CanonicalInterpretationContext } from "./INTERPRETATION_CONTEXT_SCHEMA";

export type GazeDirection = "left" | "right" | "up" | "down" | "center";

export type GazeRule = {
  direction: GazeDirection;
  flowMeaning: string;
  contextModifier: Partial<Record<CanonicalInterpretationContext, string>>;
};

const MAJOR_GAZE_OVERRIDES: Partial<Record<number, GazeDirection>> = {
  0: "right",
  1: "up",
  2: "center",
  9: "left",
  12: "down",
  16: "down",
  17: "up",
  18: "left",
  19: "right",
  21: "center",
};

const SUIT_GAZE_DEFAULT: Record<string, GazeDirection> = {
  Wands: "right",
  Cups: "left",
  Swords: "up",
  Pentacles: "down",
};

const DIRECTION_BASE_MEANING: Record<GazeDirection, string> = {
  left: "과거/내면 회고 흐름",
  right: "미래/행동 전진 흐름",
  up: "이상/판단/관점 상승 흐름",
  down: "현실/실행/정착 흐름",
  center: "균형/중립/정렬 흐름",
};

const DIRECTION_CONTEXT_MODIFIER: Record<
  GazeDirection,
  Partial<Record<CanonicalInterpretationContext, string>>
> = {
  left: {
    love: "관계의 과거 패턴 정리가 우선입니다.",
    career: "기존 전략 회고가 필요합니다.",
    finance: "지출 히스토리 점검이 우선입니다.",
  },
  right: {
    love: "관계에서 다음 행동 제안이 중요합니다.",
    career: "실행 속도를 높일 타이밍입니다.",
    finance: "수익 전환 액션이 유효합니다.",
  },
  up: {
    personal: "관점 전환과 기준 재정의가 필요합니다.",
    advice: "큰 원칙을 먼저 세우는 편이 좋습니다.",
    spiritual: "의미 해석의 깊이를 확장할 시점입니다.",
  },
  down: {
    health: "생활 루틴의 안정화가 최우선입니다.",
    finance: "현금흐름과 안전마진 점검이 중요합니다.",
    career: "실무/기초 역량 고도화가 핵심입니다.",
  },
  center: {
    personal: "중심축을 유지하며 과속을 피하세요.",
    love: "감정과 사실의 균형이 중요합니다.",
    advice: "우선순위를 1개로 좁히는 것이 효과적입니다.",
  },
};

export const GAZE_DIRECTION_RULES: Record<number, GazeRule> = Object.fromEntries(
  TAROT_CARDS.map((card) => {
    const direction =
      MAJOR_GAZE_OVERRIDES[card.id] ??
      (card.suit ? SUIT_GAZE_DEFAULT[card.suit] : "center");

    const rule: GazeRule = {
      direction,
      flowMeaning: DIRECTION_BASE_MEANING[direction],
      contextModifier: DIRECTION_CONTEXT_MODIFIER[direction],
    };

    return [card.id, rule];
  }),
);

export const resolveGazeFlow = (
  cardId: number,
  context: CanonicalInterpretationContext,
): { direction: GazeDirection; flowMeaning: string; contextHint: string } => {
  const rule = GAZE_DIRECTION_RULES[cardId] ?? {
    direction: "center",
    flowMeaning: DIRECTION_BASE_MEANING.center,
    contextModifier: DIRECTION_CONTEXT_MODIFIER.center,
  };

  return {
    direction: rule.direction,
    flowMeaning: rule.flowMeaning,
    contextHint:
      rule.contextModifier[context] ??
      "현재 맥락에서는 속도보다 정렬된 선택이 중요합니다.",
  };
};
