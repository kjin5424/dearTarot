import { MAJOR_MEANINGS } from "./MAJOR_MEANINGS";
import { MINOR_MEANINGS } from "./MINOR_MEANINGS";
import { SEMANTIC_TAGS } from "./SEMANTIC_TAG";

type ContextKey = "love" | "career" | "finance" | "health" | "spiritual" | "advice";

type MeaningEntry = {
  id: number;
  love: string[];
  career: string[];
  finance: string[];
  health: string[];
  spiritual: string[];
  advice: string[];
};

const ALL_MEANINGS: MeaningEntry[] = [
  ...MAJOR_MEANINGS,
  ...MINOR_MEANINGS,
];

const CONTEXT_KEYS: ContextKey[] = [
  "love", "career", "finance", "health", "spiritual", "advice",
];

const buildContextBlock = (
  sentences: string[],
  themes: string[],
) => ({
  themes: themes.slice(0, 3),
  interpretations: [sentences[0] ?? ""],
  advice: [sentences[1] ?? ""],
});

export const TAROT_CONTEXT_MEANINGS = ALL_MEANINGS.map((card) => {
  const semantic = SEMANTIC_TAGS.find((s) => s.cardId === card.id);
  const themes = semantic?.themes ?? ["awareness", "choice", "adjustment"];

  const contexts: Record<string, ReturnType<typeof buildContextBlock>> = {};

  for (const key of CONTEXT_KEYS) {
    contexts[key] = buildContextBlock(card[key], themes);
  }

  contexts.personal = buildContextBlock(card.spiritual, themes);

  return { cardId: card.id, contexts };
});
