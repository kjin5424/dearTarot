import type { DrawnCard } from "@types/index";
import { TAROT_MEANINGS } from "@utils/constants/tarot/TAROT_MEANINGS";
import { MAJOR_REVERSED_LOGIC } from "@utils/constants/tarot/REVERSED_MEANINGS";

const POSITION_LABEL: Record<string, string> = {
  answer: "이 질문의 핵심",
  past: "지나온 시간",
  present: "지금 이 순간",
  future: "앞으로의 흐름",
  situation: "현재 상황",
  cause: "문제의 근원",
  advice: "앞으로의 방향",
  outcome: "결과",
  conscious_goal: "의식적 목표",
  subconscious: "무의식 깊은 곳",
  near_future: "가까운 미래",
  challenge: "마주한 도전",
  self_position: "내 안의 태도",
  external_influence: "외부의 영향",
  hopes_and_fears: "희망과 두려움",
  final_outcome: "최종 결과",
  self: "나의 감정",
  partner: "상대의 감정",
  relationship_state: "관계의 현재",
  hidden_issue: "숨은 이슈",
  hidden_factor: "숨은 요인",
  current_situation: "현재 상황",
  past_influence: "과거의 영향",
  hidden_influence: "숨은 영향",
  obstacle: "핵심 장애물",
  current_state: "현재 문제",
  past_cause: "과거 원인",
  present_action: "지금 취할 행동",
  external_factor: "외부 압력",
  resolution: "해소 방향",
};

export function getMockInterpretation(card: DrawnCard): string[] {
  const meaning = TAROT_MEANINGS.find((m) => m.id === card.card.id);
  if (!meaning) {
    return [
      `${card.card.nameKr} 카드가 이 자리에 있군요.`,
      "이 카드는 예언이 아니에요. 숲을 빠져나가기 위한 하나의 조언으로 받아들여 주세요.",
      "지금 이 순간, 이 카드가 건네는 말을 천천히 들어보세요.",
    ];
  }

  const dir = card.isReversed ? "역방향으로 놓인 " : "";
  const posLabel = POSITION_LABEL[card.position] ?? card.position;

  const keywords = card.isReversed
    ? meaning.shadow_keywords.slice(0, 2)
    : meaning.light_keywords.slice(0, 2);
  const keywordPhrase = keywords.length > 0 ? keywords.join(", ") : meaning.core_keywords[0];

  let line2: string;
  if (card.isReversed) {
    const reversedLogic =
      card.card.arcana === "Major"
        ? (MAJOR_REVERSED_LOGIC.find((r) => r.cardId === card.card.id)?.advice ?? "weaken")
        : "weaken";
    line2 =
      reversedLogic === "invert"
        ? `이 에너지가 뒤집혀, ${keywordPhrase}의 반대 방향으로 흐르고 있습니다.`
        : `${keywordPhrase}의 흐름이 약해지거나 내면으로 숨어드는 시기입니다.`;
  } else {
    line2 = `이 자리에서 ${keywordPhrase}의 에너지가 작용하고 있어요.`;
  }

  return [
    `${posLabel}에 ${dir}${card.card.nameKr} 카드가 놓였군요.`,
    line2,
    meaning.advice[0],
  ];
}

export async function requestInterpretation(
  _question: string,
  drawnCards: DrawnCard[],
): Promise<string[][]> {
  return drawnCards.map((card) => getMockInterpretation(card));
}
