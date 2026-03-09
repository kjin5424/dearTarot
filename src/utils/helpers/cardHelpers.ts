import type { TarotCard, DrawnCard, SpreadType } from "@types/index";
import { TAROT_CARDS } from "@utils/constants/tarot/TAROT_CARDS";
import { SPREAD_DEFINITIONS } from "@utils/constants/spread/SPREAD_TYPES";
import { SPREAD_POSITION_MEANINGS } from "@utils/constants/spread/SPREAD_POSITION_MEANING";

const SPREAD_ID_MAP: Record<SpreadType, string> = {
  ONE_CARD: "one_card",
  THREE_CARD: "three_card",
  FOUR_CARD: "four_card",
  FIVE_CARD: "five_card",
  CELTIC_CROSS: "celtic_cross",
  RELATIONSHIP_SPREAD: "relationship_spread",
  HORSESHOE_SPREAD: "horseshoe_spread",
  MAGIC_SEVEN: "magic_seven",
};

export function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function drawRandomCards(spreadType: SpreadType): DrawnCard[] {
  const spreadId = SPREAD_ID_MAP[spreadType];
  const def = SPREAD_DEFINITIONS.find((d) => d.spreadId === spreadId);
  const count = def?.cardCount ?? 1;
  const positions = SPREAD_POSITION_MEANINGS[spreadId as keyof typeof SPREAD_POSITION_MEANINGS] ?? [];

  const shuffled = shuffleArray(TAROT_CARDS as TarotCard[]);
  return shuffled.slice(0, count).map((card, i) => ({
    card,
    position: positions[i]?.role ?? `position-${i + 1}`,
    isReversed: Math.random() < 0.5,
  }));
}

export function getCardById(id: number): TarotCard | undefined {
  return (TAROT_CARDS as TarotCard[]).find((c) => c.id === id);
}

export function getPositionLabel(spreadType: SpreadType, index: number): string {
  const spreadId = SPREAD_ID_MAP[spreadType];
  const positions = SPREAD_POSITION_MEANINGS[spreadId as keyof typeof SPREAD_POSITION_MEANINGS] ?? [];
  return positions[index]?.role ?? `position-${index + 1}`;
}
