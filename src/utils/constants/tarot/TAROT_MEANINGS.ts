import { MAJOR_MEANINGS } from "./MAJOR_MEANINGS";
import { SEMANTIC_TAGS } from "./SEMANTIC_TAG";
import { TAROT_CARDS } from "./TAROT_CARDS";

const DEFAULT_CONTEXT_LINE = (
  cardName: string,
  area: string,
  polarity: number,
) =>
  polarity >= 0.5
    ? `${cardName} suggests constructive movement in ${area}.`
    : `${cardName} highlights caution and unresolved tension in ${area}.`;

const MINOR_MEANINGS = TAROT_CARDS.filter((card) => card.arcana === "Minor").map((card) => {
  const semantic = SEMANTIC_TAGS.find((s) => s.cardId === card.id);
  const polarity = semantic?.polarity ?? 0.5;
  const core = semantic?.themes?.slice(0, 4) ?? [
    "awareness",
    "choice",
    "movement",
    "integration",
  ];
  const emotions = semantic?.emotions ?? [];

  return {
    id: card.id,
    name: card.name,
    arcana: "minor" as const,
    number: card.number,
    core_keywords: core,
    light_keywords: polarity >= 0.5 ? core : core.slice(0, 2),
    shadow_keywords: polarity < 0.5 ? core : emotions.slice(0, 2),
    love: [DEFAULT_CONTEXT_LINE(card.name, "love", polarity)],
    career: [DEFAULT_CONTEXT_LINE(card.name, "career", polarity)],
    finance: [DEFAULT_CONTEXT_LINE(card.name, "finance", polarity)],
    health: [DEFAULT_CONTEXT_LINE(card.name, "health", polarity)],
    spiritual: [DEFAULT_CONTEXT_LINE(card.name, "spiritual growth", polarity)],
    advice: [
      polarity >= 0.5
        ? "Keep momentum with one specific action this week."
        : "Reduce uncertainty first, then choose one realistic next step.",
    ],
  };
});

export const TAROT_MEANINGS = [...MAJOR_MEANINGS, ...MINOR_MEANINGS];
