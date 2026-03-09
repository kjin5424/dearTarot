/**
 * 카드/극성/컨텍스트 조합별 1:1 치유 확언 문구를 정의합니다.
 * - key 형식: `${cardId}:${polarity}:${context}`
 */
import { TAROT_CARDS } from "./TAROT_CARDS";
import type { CanonicalInterpretationContext } from "./INTERPRETATION_CONTEXT_SCHEMA";

export type HealingPolarity = "light" | "shadow";

const CONTEXT_LINE: Record<
  CanonicalInterpretationContext,
  { light: string; shadow: string }
> = {
  love: {
    light: "나는 관계에서 따뜻함과 경계를 함께 지킬 수 있다.",
    shadow: "나는 흔들림 속에서도 나를 지키는 사랑의 기준을 세운다.",
  },
  career: {
    light: "나는 내 역량을 신뢰하며 필요한 행동을 꾸준히 실행한다.",
    shadow: "나는 불확실성 속에서도 작은 실행으로 방향을 회복한다.",
  },
  finance: {
    light: "나는 자원을 명확히 관리하며 안정적인 흐름을 만든다.",
    shadow: "나는 두려움 대신 계획으로 재정 균형을 회복한다.",
  },
  health: {
    light: "나는 내 몸의 신호를 존중하고 회복의 리듬을 따른다.",
    shadow: "나는 완벽보다 지속 가능한 회복 습관을 선택한다.",
  },
  spiritual: {
    light: "나는 내면의 직관을 신뢰하며 의미를 확장한다.",
    shadow: "나는 혼란 속에서도 나를 비추는 조용한 중심을 찾는다.",
  },
  personal: {
    light: "나는 지금의 나를 인정하고 다음 단계를 기쁘게 맞이한다.",
    shadow: "나는 불안한 순간에도 나를 지지하는 선택을 이어간다.",
  },
  advice: {
    light: "나는 오늘의 우선순위를 분명히 하고 실행한다.",
    shadow: "나는 복잡함을 줄이고 가장 중요한 한 걸음을 시작한다.",
  },
};

export const buildHealingAffirmationKey = (
  cardId: number,
  polarity: HealingPolarity,
  context: CanonicalInterpretationContext,
): string => `${cardId}:${polarity}:${context}`;

export const HEALING_AFFIRMATIONS: Record<string, string> = Object.fromEntries(
  TAROT_CARDS.flatMap((card) =>
    (["light", "shadow"] as const).flatMap((polarity) =>
      (Object.keys(CONTEXT_LINE) as CanonicalInterpretationContext[]).map((context) => {
        const key = buildHealingAffirmationKey(card.id, polarity, context);
        const sentence = CONTEXT_LINE[context][polarity];
        const value = `${card.name}의 메시지: ${sentence}`;
        return [key, value] as const;
      }),
    ),
  ),
);

export const getHealingAffirmation = (
  cardId: number,
  polarity: HealingPolarity,
  context: CanonicalInterpretationContext,
): string => {
  const key = buildHealingAffirmationKey(cardId, polarity, context);
  return (
    HEALING_AFFIRMATIONS[key] ??
    "나는 지금의 흐름을 받아들이고, 나에게 유익한 선택을 차분히 이어간다."
  );
};
