/**
 * 카드 색채 심리 상수와 컨텍스트별 색채 해석 규칙을 정의합니다.
 */
import { TAROT_CARDS } from "./TAROT_CARDS";
import type { CanonicalInterpretationContext } from "./INTERPRETATION_CONTEXT_SCHEMA";

export type ColorPolarity = "light" | "shadow";

export type ColorSignal = {
  dominant: string;
  palette: string[];
  psychologicalMeaning: string;
  contextMeaning: Partial<Record<CanonicalInterpretationContext, string>>;
};

const COLOR_PSYCHOLOGY: Record<string, { light: string; shadow: string }> = {
  gold: { light: "명료함과 성취 의식", shadow: "인정 욕구 과열" },
  blue: { light: "안정과 신뢰", shadow: "정서 위축" },
  red: { light: "추진력과 생동", shadow: "충동과 과열" },
  green: { light: "회복과 성장", shadow: "정체와 미련" },
  purple: { light: "통찰과 직관", shadow: "현실 회피" },
  black: { light: "경계 인식", shadow: "두려움 고착" },
  white: { light: "정화와 시작", shadow: "경험 부족" },
  gray: { light: "중립적 판단", shadow: "결정 지연" },
};

const SUIT_PALETTE: Record<string, string[]> = {
  Wands: ["red", "gold", "orange"],
  Cups: ["blue", "white", "silver"],
  Swords: ["gray", "blue", "white"],
  Pentacles: ["green", "gold", "brown"],
};

const MAJOR_PALETTE_OVERRIDES: Partial<Record<number, string[]>> = {
  0: ["white", "yellow", "blue"],
  1: ["red", "white", "gold"],
  2: ["blue", "black", "white"],
  13: ["black", "white", "gray"],
  16: ["black", "red", "gray"],
  17: ["blue", "white", "green"],
  18: ["blue", "gray", "black"],
  19: ["gold", "yellow", "white"],
};

const toContextMeaning = (
  color: string,
): Partial<Record<CanonicalInterpretationContext, string>> => ({
  love: `${color} 계열은 감정 표현의 톤을 조절하라는 신호입니다.`,
  career: `${color} 계열은 의사결정 속도와 집중도 조절이 핵심입니다.`,
  finance: `${color} 계열은 위험 대비와 안정 균형을 점검하라는 신호입니다.`,
  health: `${color} 계열은 회복 리듬과 생활 습관 정렬이 중요합니다.`,
  personal: `${color} 계열은 자기 인식 패턴을 재정비하라는 신호입니다.`,
  advice: `${color} 계열은 실행 순서를 단순화하라는 메시지입니다.`,
  spiritual: `${color} 계열은 내면 해석의 깊이를 조절하라는 신호입니다.`,
});

export const COLOR_PALETTE_ANALYSIS: Record<number, ColorSignal> = Object.fromEntries(
  TAROT_CARDS.map((card) => {
    const palette =
      MAJOR_PALETTE_OVERRIDES[card.id] ??
      (card.suit ? SUIT_PALETTE[card.suit] : ["white", "gray", "gold"]);
    const dominant = palette[0] ?? "white";

    const psychologicalMeaning =
      COLOR_PSYCHOLOGY[dominant]?.light ?? "상황을 선명하게 보는 시점";

    return [
      card.id,
      {
        dominant,
        palette,
        psychologicalMeaning,
        contextMeaning: toContextMeaning(dominant),
      } satisfies ColorSignal,
    ];
  }),
);

export const getColorPaletteAnalysis = (
  cardId: number,
  context: CanonicalInterpretationContext,
  polarity: ColorPolarity,
): { dominant: string; palette: string[]; meaning: string; contextHint: string } => {
  const signal = COLOR_PALETTE_ANALYSIS[cardId] ?? {
    dominant: "white",
    palette: ["white", "gray"],
    psychologicalMeaning: "정화와 재정렬",
    contextMeaning: {},
  };

  const polarityMeaning =
    COLOR_PSYCHOLOGY[signal.dominant]?.[polarity] ?? signal.psychologicalMeaning;

  return {
    dominant: signal.dominant,
    palette: signal.palette,
    meaning: polarityMeaning,
    contextHint:
      signal.contextMeaning[context] ??
      "색채 신호는 현재 해석의 정서적 톤 조절 포인트로 사용됩니다.",
  };
};
