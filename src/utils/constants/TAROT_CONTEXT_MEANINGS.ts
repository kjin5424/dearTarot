/**
 * 카드별 컨텍스트 해석 블록을 정의합니다.
 */
import { SEMANTIC_TAGS } from "./SEMENTIC_TAG";
import { TAROT_CARDS } from "./TAROT_CARDS";

const makeContextBlock = (
  cardName: string,
  themes: string[],
  context: string,
  polarity: number,
) => ({
  themes: themes.slice(0, 3),
  interpretations: [
    polarity >= 0.5
      ? `${cardName} indicates supportive momentum in ${context}.`
      : `${cardName} indicates friction and caution in ${context}.`,
  ],
  advice: [
    polarity >= 0.5
      ? `Strengthen what is already working in ${context}.`
      : `Stabilize risk first, then act in ${context}.`,
  ],
});

export const TAROT_CONTEXT_MEANINGS = TAROT_CARDS.map((card) => {
  const semantic = SEMANTIC_TAGS.find((s) => s.cardId === card.id);
  const themes = semantic?.themes ?? ["awareness", "choice", "adjustment"];
  const polarity = semantic?.polarity ?? 0.5;

  return {
    cardId: card.id,
    contexts: {
      love: makeContextBlock(card.name, themes, "love", polarity),
      career: makeContextBlock(card.name, themes, "career", polarity),
      finance: makeContextBlock(card.name, themes, "finance", polarity),
      health: makeContextBlock(card.name, themes, "health", polarity),
      spiritual: makeContextBlock(card.name, themes, "spiritual", polarity),
      personal: makeContextBlock(card.name, themes, "personal", polarity),
      advice: makeContextBlock(card.name, themes, "decision making", polarity),
    },
  };
});

