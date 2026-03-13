/**
 * 상수 조합 기반 실제 타로 해석 엔진 함수를 정의합니다.
 */
import {
  AI_INTERPRETATION_ENGINE_CONFIG,
  AI_INTERPRETATION_WEIGHT,
} from "../constants/interpretation/AI_INTERPRETATION_PIPELINE";
import { CARD_COMBINATION_RULES } from "../constants/scoring/CARD_COMBINATION_RULE";
import { getColorPaletteAnalysis } from "../constants/visual/COLOR_PALETTE_ANALYSIS";
import { CONTEXT_TAGS } from "../constants/scoring/CONTEXT_TAGS";
import { EMOTION_VECTOR_BY_CARD_ID } from "../constants/tarot/EMOTION_VECTOR";
import { resolveGazeFlow } from "../constants/visual/GAZE_DIRECTION_RULES";
import {
  getHealingAffirmation,
  type HealingPolarity,
} from "../constants/interpretation/HEALING_AFFIRMATIONS";
import { INTERPRETATION_CONFLICT_RULES } from "../constants/interpretation/INTERPRETATION_CONFLICT_RULES";
import {
  normalizeInterpretationContext,
  type CanonicalInterpretationContext,
} from "../constants/interpretation/INTERPRETATION_CONTEXT_SCHEMA";
import { buildSystemPrompt } from "../constants/interpretation/PROMPT";
import type { PersonalizedInterpretationProfile } from "../constants/interpretation/PERSONALIZED_INTERPRETATION_PROFILE";
import {
  MAJOR_REVERSED_LOGIC,
  MINOR_REVERSED_PATTERN,
  CARD_REVERSED_OVERRIDE,
} from "../constants/tarot/REVERSED_MEANINGS";
import { SCORING_STRUCTURE } from "../constants/scoring/SCORING_STRUCTURE";
import { SEMANTIC_TAGS } from "../constants/tarot/SEMANTIC_TAG";
import { SPREAD_POSITION_WEIGHTS } from "../constants/scoring/POSITION_WEIGHT";
import { SPREAD_POSITION_MEANINGS } from "../constants/spread/SPREAD_POSITION_MEANING";
import {
  positionToSpatialZone,
  resolveSpatialPsychology,
} from "../constants/visual/SPATIAL_PSYCHOLOGY_RULES";
import { getSymbolCoordinatesByCardId } from "../constants/visual/SYMBOL_COORDINATES";
import { TAG_COMBINATION_RULES } from "../constants/tarot/TAG_COMBINATION_RULES";
import { TAROT_CARDS } from "../constants/tarot/TAROT_CARDS";
import { TAROT_CONTEXT_MEANINGS } from "../constants/tarot/TAROT_CONTEXT_MEANINGS";
import { TAROT_MEANINGS } from "../constants/tarot/TAROT_MEANINGS";

type CardInput = {
  cardId: number;
  position: number;
  reversed?: boolean;
};

export type TarotInterpretationInput = {
  question: string;
  context: string;
  spreadId: keyof typeof SPREAD_POSITION_MEANINGS;
  cards: CardInput[];
  profile?: Partial<PersonalizedInterpretationProfile>;
  questionType?: string;
};

type EmotionSummary = {
  valence: number;
  arousal: number;
  dominance: number;
};

export type TarotInterpretationResult = {
  cardInterpretations: Array<{
    cardId: number;
    cardName: string;
    position: number;
    role: string;
    reversed: boolean;
    score: number;
    polarity: number;
    keywords: string[];
    contextInterpretation: string[];
    advice: string[];
  }>;
  spreadSynthesis: {
    summary: string;
    dominantThemes: string[];
    dominantEmotions: string[];
  };
  actionPlan: string[];
  healingAffirmation: string;
  visualPsychology: {
    symbolHighlights: string[];
    gazeFlow: string;
    colorSignal: string;
    spatialSignal: string;
  };
  confidence: {
    value: number;
    band: "high" | "medium" | "low";
  };
  systemPrompt: string;
  trace: {
    appliedTagRules: string[];
    appliedCardRules: string[];
    positionWeightMap: Record<number, number>;
    emotionSummary: EmotionSummary;
    conflictResolutionSummary: string[];
    visualTrace: {
      symbolCount: number;
      gazeDirection: string;
      dominantColor: string;
      spatialZone: number;
    };
  };
};

const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

const normalizeScore = (raw: number): number => {
  const { minRaw, maxRaw, clampMin, clampMax } =
    SCORING_STRUCTURE.normalization;
  const normalized = (raw - minRaw) / (maxRaw - minRaw);
  return clamp(normalized, clampMin, clampMax);
};

const resolvePositionRole = (
  spreadId: keyof typeof SPREAD_POSITION_MEANINGS,
  position: number,
): { role: string; coreMeaning: string } => {
  const found = SPREAD_POSITION_MEANINGS[spreadId]?.find(
    (item) => item.position === position,
  );
  if (!found) {
    return {
      role: `position_${position}`,
      coreMeaning: "기본 포지션",
    };
  }
  return { role: found.role, coreMeaning: found.coreMeaning };
};

const resolvePositionWeight = (
  spreadId: keyof typeof SPREAD_POSITION_MEANINGS,
  position: number,
): number => {
  const found = SPREAD_POSITION_WEIGHTS[spreadId]?.find(
    (item) => item.position === position,
  );
  return found?.weight ?? 1;
};

const getReversedPolicy = (
  cardId: number,
  suit: string | null,
  context: CanonicalInterpretationContext,
): "invert" | "weaken" | null => {
  const override = (
    CARD_REVERSED_OVERRIDE as Record<
      number,
      Partial<Record<CanonicalInterpretationContext, "invert" | "weaken">>
    >
  )[cardId];
  if (override?.[context]) return override[context] ?? null;

  if (cardId <= 21) {
    const found = MAJOR_REVERSED_LOGIC.find((item) => item.cardId === cardId);
    if (!found) return null;
    return (found as Record<string, "invert" | "weaken">)[context] ?? null;
  }

  if (!suit) return null;
  const key = suit.toLowerCase() as keyof typeof MINOR_REVERSED_PATTERN;
  return MINOR_REVERSED_PATTERN[key]?.[context] ?? null;
};

const reversedFactorFromPolicy = (
  policy: "invert" | "weaken" | null,
): number => {
  if (policy === "invert") return -0.9;
  if (policy === "weaken") return 0.7;
  return 1;
};

const contextCompatibility = (
  themes: string[],
  emotions: string[],
  contextBias:
    | {
        themeBias?: Record<string, number>;
        emotionBias?: Record<string, number>;
        weight?: number;
      }
    | undefined,
): number => {
  if (!contextBias) return 0;

  const themeScore = themes.reduce(
    (acc, theme) => acc + (contextBias.themeBias?.[theme] ?? 0),
    0,
  );
  const emotionScore = emotions.reduce(
    (acc, emotion) => acc + (contextBias.emotionBias?.[emotion] ?? 0),
    0,
  );

  const normalized =
    (themeScore + emotionScore) / Math.max(1, themes.length + emotions.length);
  return normalized * (contextBias.weight ?? 1);
};

export const interpretTarotReading = (
  input: TarotInterpretationInput,
): TarotInterpretationResult => {
  const normalizedContext = normalizeInterpretationContext(input.context);
  const positionWeightMap: Record<number, number> = {};

  const contextBias = CONTEXT_TAGS.find((item) => {
    if (item.context === normalizedContext) return true;
    return normalizedContext === "finance" && item.context === "money";
  });

  const cardSet = new Set(input.cards.map((item) => item.cardId));
  const aggregateThemes = new Set<string>();
  const aggregateEmotions = new Set<string>();

  let emotionAcc: EmotionSummary = { valence: 0, arousal: 0, dominance: 0 };
  let emotionWeightTotal = 0;

  const cardInterpretations = input.cards.map((draw) => {
    const cardMeta = TAROT_CARDS.find((c) => c.id === draw.cardId);
    const basic = TAROT_MEANINGS.find((m) => m.id === draw.cardId);
    const semantic = SEMANTIC_TAGS.find((s) => s.cardId === draw.cardId);
    const contextBlock = TAROT_CONTEXT_MEANINGS.find(
      (c) => c.cardId === draw.cardId,
    )?.contexts?.[normalizedContext];
    const emotion = EMOTION_VECTOR_BY_CARD_ID.find(
      (v) => v.cardId === draw.cardId,
    );

    const { role } = resolvePositionRole(input.spreadId, draw.position);
    const positionWeight = resolvePositionWeight(input.spreadId, draw.position);
    positionWeightMap[draw.position] = positionWeight;

    const polarity = semantic?.polarity ?? 0.5;
    const polaritySignal = (polarity - 0.5) * 2;
    const themes = semantic?.themes ?? [];
    const emotions = semantic?.emotions ?? [];

    for (const theme of themes) aggregateThemes.add(theme);
    for (const e of emotions) aggregateEmotions.add(e);

    const baseMeaningScore =
      polaritySignal *
      SCORING_STRUCTURE.baseWeights.basicMeaning *
      AI_INTERPRETATION_WEIGHT.basic_meaning;
    const contextMeaningScore =
      (contextBlock?.themes?.length ?? 0) *
      0.08 *
      SCORING_STRUCTURE.baseWeights.contextMeaning;
    const semanticScore =
      (themes.length + emotions.length) *
      0.05 *
      SCORING_STRUCTURE.baseWeights.semanticTag;
    const contextBiasScore =
      contextCompatibility(themes, emotions, contextBias) *
      SCORING_STRUCTURE.baseWeights.contextBias;

    const reversedPolicy = draw.reversed
      ? getReversedPolicy(
          draw.cardId,
          cardMeta?.suit ?? null,
          normalizedContext,
        )
      : null;
    const reversedFactor = draw.reversed
      ? reversedFactorFromPolicy(reversedPolicy)
      : 1;

    const positionScore =
      positionWeight * SCORING_STRUCTURE.baseWeights.spreadPosition;
    const cardRawScore =
      (baseMeaningScore +
        contextMeaningScore +
        semanticScore +
        contextBiasScore +
        positionScore) *
      reversedFactor;

    if (emotion) {
      emotionAcc = {
        valence: emotionAcc.valence + emotion.valence * positionWeight,
        arousal: emotionAcc.arousal + emotion.arousal * positionWeight,
        dominance: emotionAcc.dominance + emotion.dominance * positionWeight,
      };
      emotionWeightTotal += positionWeight;
    }

    return {
      cardId: draw.cardId,
      cardName: cardMeta?.name ?? `Unknown(${draw.cardId})`,
      position: draw.position,
      role,
      reversed: Boolean(draw.reversed),
      score: normalizeScore(cardRawScore),
      polarity,
      keywords: basic?.core_keywords ?? themes,
      contextInterpretation: contextBlock?.interpretations ?? [],
      advice: contextBlock?.advice ?? basic?.advice ?? [],
    };
  });

  const allTags = new Set([...aggregateThemes, ...aggregateEmotions]);
  const appliedTagRules: string[] = [];
  const appliedCardRules: string[] = [];
  const emotionShift: Record<string, number> = {};
  let ruleBonus = 0;

  for (const rule of TAG_COMBINATION_RULES as Array<Record<string, any>>) {
    const tags = rule.tags as string[];
    const contexts = (rule.contexts ?? []) as string[];
    if (!tags?.length) continue;
    if (!tags.every((tag) => allTags.has(tag))) continue;
    if (
      contexts.length &&
      !contexts.includes(normalizedContext) &&
      !(normalizedContext === "finance" && contexts.includes("money"))
    ) {
      continue;
    }

    appliedTagRules.push(rule.ruleId);
    ruleBonus += clamp(rule.aiModifier?.probabilityBoost ?? 0, -0.15, 0.25);

    const shift = rule.effect?.emotionShift ?? {};
    for (const [key, value] of Object.entries(shift)) {
      emotionShift[key] = (emotionShift[key] ?? 0) + Number(value);
    }

    for (const theme of rule.effect?.themeAdd ?? []) {
      aggregateThemes.add(theme);
    }
  }

  const SUIT_RANGES: Record<string, [number, number]> = {
    wands: [22, 35],
    cups: [36, 49],
    swords: [50, 63],
    pentacles: [64, 77],
  };

  const getMinorNumber = (id: number): number | null => {
    for (const [, [lo, hi]] of Object.entries(SUIT_RANGES)) {
      if (id >= lo && id <= hi) return id - lo + 1;
    }
    return null;
  };

  const cardIds = [...cardSet];

  for (const rule of CARD_COMBINATION_RULES as Array<Record<string, any>>) {
    const cond = rule.condition ?? {};

    if (cond.suitPattern) {
      const range = SUIT_RANGES[cond.suitPattern as string];
      if (!range) continue;
      const count = cardIds.filter((id) => id >= range[0] && id <= range[1]).length;
      if (count < (cond.minCount ?? 3)) continue;
    } else if (cond.numberPattern) {
      const target = cond.numberPattern as number;
      const count = cardIds.filter((id) => getMinorNumber(id) === target).length;
      if (count < (cond.minCount ?? 2)) continue;
    } else {
      const cards = (cond.cards ?? []) as number[];
      if (!cards.length) continue;
      if (!cards.every((id: number) => cardSet.has(id))) continue;
    }

    appliedCardRules.push(rule.ruleId);

    const aiModifier = rule.aiModifier ?? {};
    const positiveSignal = [
      aiModifier.opportunity,
      aiModifier.success,
      aiModifier.hope,
      aiModifier.clarity,
      aiModifier.relationship,
      aiModifier.stability,
    ].filter((v) => typeof v === "number") as number[];

    const negativeSignal = [
      aiModifier.risk,
      aiModifier.loss,
      aiModifier.uncertainty,
    ].filter((v) => typeof v === "number") as number[];

    if (positiveSignal.length) ruleBonus += Math.max(...positiveSignal) * 0.08;
    if (negativeSignal.length) ruleBonus -= Math.max(...negativeSignal) * 0.08;

    for (const theme of rule.effect?.themeAdd ?? []) {
      aggregateThemes.add(theme);
    }
  }

  const emotionSummaryBase =
    emotionWeightTotal > 0
      ? {
          valence: emotionAcc.valence / emotionWeightTotal,
          arousal: emotionAcc.arousal / emotionWeightTotal,
          dominance: emotionAcc.dominance / emotionWeightTotal,
        }
      : { valence: 0, arousal: 0, dominance: 0 };

  const emotionShiftAmount = Object.values(emotionShift).reduce(
    (acc, value) => acc + value,
    0,
  );
  const maxShift =
    AI_INTERPRETATION_ENGINE_CONFIG.emotionBlend.maxShiftPerEmotion;

  const emotionSummary: EmotionSummary = {
    valence: clamp(
      emotionSummaryBase.valence +
        clamp(emotionShiftAmount * 0.1, -maxShift, maxShift),
      AI_INTERPRETATION_ENGINE_CONFIG.emotionBlend.clampMin,
      AI_INTERPRETATION_ENGINE_CONFIG.emotionBlend.clampMax,
    ),
    arousal: clamp(
      emotionSummaryBase.arousal +
        clamp(emotionShiftAmount * 0.06, -maxShift, maxShift),
      AI_INTERPRETATION_ENGINE_CONFIG.emotionBlend.clampMin,
      AI_INTERPRETATION_ENGINE_CONFIG.emotionBlend.clampMax,
    ),
    dominance: clamp(
      emotionSummaryBase.dominance +
        clamp(emotionShiftAmount * 0.04, -maxShift, maxShift),
      AI_INTERPRETATION_ENGINE_CONFIG.emotionBlend.clampMin,
      AI_INTERPRETATION_ENGINE_CONFIG.emotionBlend.clampMax,
    ),
  };

  const conflictResolutionSummary: string[] = [];
  for (const rule of INTERPRETATION_CONFLICT_RULES as Array<
    Record<string, any>
  >) {
    const positives = new Set(rule.condition?.positivePositions ?? []);
    const negatives = new Set(rule.condition?.negativePositions ?? []);

    const positiveHit = cardInterpretations.some(
      (item) => positives.has(item.role) && item.score >= 0.58,
    );
    const negativeHit = cardInterpretations.some(
      (item) => negatives.has(item.role) && item.score < 0.45,
    );

    if (positiveHit && negativeHit) {
      conflictResolutionSummary.push(
        `${rule.ruleId}: ${rule.resolution?.strategy}`,
      );
      ruleBonus += 0.03;
    }
  }

  const cappedRuleBonus = clamp(
    ruleBonus,
    SCORING_STRUCTURE.saturation.maxRulePenalty,
    SCORING_STRUCTURE.saturation.maxRuleBonus,
  );

  const meanCardScore =
    cardInterpretations.reduce((acc, card) => acc + card.score, 0) /
    Math.max(1, cardInterpretations.length);
  const confidenceValue = clamp(meanCardScore + cappedRuleBonus, 0, 1);

  const confidenceBand =
    confidenceValue >= SCORING_STRUCTURE.confidenceBands.high
      ? "high"
      : confidenceValue >= SCORING_STRUCTURE.confidenceBands.medium
        ? "medium"
        : "low";

  const sortedCards = [...cardInterpretations].sort(
    (a, b) => b.score - a.score,
  );
  const actionPlan = [
    sortedCards[0]?.advice?.[0],
    sortedCards[1]?.advice?.[0],
    sortedCards[2]?.advice?.[0],
  ]
    .filter((item): item is string => Boolean(item))
    .slice(0, AI_INTERPRETATION_ENGINE_CONFIG.summaryPolicy.maxActionItems);

  const dominantThemes = [...aggregateThemes].slice(0, 8);
  const dominantEmotions = [...aggregateEmotions].slice(0, 6);

  const topCard = sortedCards[0];
  const topCardId = topCard?.cardId ?? input.cards[0]?.cardId ?? 0;
  const topPolarity: HealingPolarity =
    (topCard?.polarity ?? 0.5) >= 0.5 ? "light" : "shadow";

  const symbolHighlights = getSymbolCoordinatesByCardId(topCardId)
    .slice(0, 3)
    .map((item) => `${item.symbol}(${item.keyword})`);
  const gaze = resolveGazeFlow(topCardId, normalizedContext);
  const color = getColorPaletteAnalysis(
    topCardId,
    normalizedContext,
    topPolarity,
  );
  const spatialZone = positionToSpatialZone(topCard?.position ?? 5);
  const spatial = resolveSpatialPsychology(spatialZone);

  const healingAffirmation = getHealingAffirmation(
    topCardId,
    topPolarity,
    normalizedContext,
  );

  const spreadSynthesis = {
    summary: `${topCard?.cardName ?? "핵심 카드"} 중심으로 ${normalizedContext} 맥락에서 ${topCard?.role ?? "핵심 포지션"} 신호가 가장 강합니다. 시선 흐름은 ${gaze.flowMeaning}이며, 공간 심리상 핵심 축은 ${spatial.psycheFocus}입니다.`,
    dominantThemes,
    dominantEmotions,
  };

  return {
    cardInterpretations,
    spreadSynthesis,
    actionPlan,
    healingAffirmation,
    visualPsychology: {
      symbolHighlights,
      gazeFlow: `${gaze.flowMeaning} / ${gaze.contextHint}`,
      colorSignal: `${color.dominant}(${color.palette.join(", ")}) - ${color.meaning}`,
      spatialSignal: `${spatial.label}: ${spatial.psycheFocus}`,
    },
    confidence: {
      value: confidenceValue,
      band: confidenceBand,
    },
    systemPrompt: buildSystemPrompt(input.profile, normalizedContext),
    trace: {
      appliedTagRules,
      appliedCardRules,
      positionWeightMap,
      emotionSummary,
      conflictResolutionSummary,
      visualTrace: {
        symbolCount: symbolHighlights.length,
        gazeDirection: gaze.direction,
        dominantColor: color.dominant,
        spatialZone,
      },
    },
  };
};
