/**
 * 정규 컨텍스트와 별칭 정규화 규칙을 정의합니다.
 */
export const CANONICAL_INTERPRETATION_CONTEXTS = [
  "love",
  "career",
  "finance",
  "health",
  "spiritual",
  "personal",
  "advice",
] as const;

export type CanonicalInterpretationContext =
  (typeof CANONICAL_INTERPRETATION_CONTEXTS)[number];

export const CONTEXT_ALIAS_MAP: Record<string, CanonicalInterpretationContext> = {
  money: "finance",
  finances: "finance",
  wealth: "finance",
  work: "career",
  relationship: "love",
  relationships: "love",
  self: "personal",
  self_growth: "personal",
  guidance: "advice",
};

export const normalizeInterpretationContext = (
  rawContext: string,
): CanonicalInterpretationContext => {
  const normalized = rawContext.trim().toLowerCase();
  return (
    CONTEXT_ALIAS_MAP[normalized] ??
    (CANONICAL_INTERPRETATION_CONTEXTS.includes(
      normalized as CanonicalInterpretationContext,
    )
      ? (normalized as CanonicalInterpretationContext)
      : "personal")
  );
};


