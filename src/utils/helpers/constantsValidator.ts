/**
 * 상수 무결성 자동 검증 함수를 정의합니다.
 */
import { CARD_COMBINATION_RULES } from "../constants/scoring/CARD_COMBINATION_RULE";
import { COLOR_PALETTE_ANALYSIS } from "../constants/visual/COLOR_PALETTE_ANALYSIS";
import {
  CONSTANTS_VALIDATION_RULES,
  VALIDATION_REPORT_LEVEL,
} from "../constants/CONSTANTS_VALIDATION_RULES";
import { CONTEXT_TAGS } from "../constants/scoring/CONTEXT_TAGS";
import { EMOTION_VECTOR_BY_CARD_ID } from "../constants/tarot/EMOTION_VECTOR";
import {
  buildHealingAffirmationKey,
  HEALING_AFFIRMATIONS,
} from "../constants/interpretation/HEALING_AFFIRMATIONS";
import { GAZE_DIRECTION_RULES } from "../constants/visual/GAZE_DIRECTION_RULES";
import { INTERPRETATION_QUALITY_BENCHMARKS } from "../constants/interpretation/INTERPRETATION_QUALITY_BENCHMARKS";
import { SPREAD_POSITION_WEIGHTS } from "../constants/scoring/POSITION_WEIGHT";
import { SPREAD_POSITION_MEANINGS } from "../constants/spread/SPREAD_POSITION_MEANING";
import { SPREAD_DEFINITIONS } from "../constants/spread/SPREAD_TYPES";
import {
  SPATIAL_PSYCHOLOGY_RULES,
  type SpatialZone,
} from "../constants/visual/SPATIAL_PSYCHOLOGY_RULES";
import { SYMBOL_COORDINATES } from "../constants/visual/SYMBOL_COORDINATES";
import { TAG_COMBINATION_RULES } from "../constants/tarot/TAG_COMBINATION_RULES";
import { TAROT_CARDS } from "../constants/tarot/TAROT_CARDS";
import { TAROT_CONTEXT_MEANINGS } from "../constants/tarot/TAROT_CONTEXT_MEANINGS";
import { TAROT_MEANINGS } from "../constants/tarot/TAROT_MEANINGS";

type ValidationItem = {
  level: (typeof VALIDATION_REPORT_LEVEL)[keyof typeof VALIDATION_REPORT_LEVEL];
  code: string;
  message: string;
};

export type TarotConstantsValidationReport = {
  errors: ValidationItem[];
  warnings: ValidationItem[];
  info: ValidationItem[];
  isValid: boolean;
};

const addError = (items: ValidationItem[], code: string, message: string) => {
  items.push({ level: VALIDATION_REPORT_LEVEL.error, code, message });
};

const addWarning = (items: ValidationItem[], code: string, message: string) => {
  items.push({ level: VALIDATION_REPORT_LEVEL.warning, code, message });
};

const isCanonicalContext = (context: string): boolean =>
  CONSTANTS_VALIDATION_RULES.contextKey.canonical.includes(context as any);

const isAliasContext = (context: string): boolean =>
  CONSTANTS_VALIDATION_RULES.contextKey.aliases.includes(context as any);

const findDuplicates = (values: number[]): number[] => {
  const seen = new Set<number>();
  const duplicates = new Set<number>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
};

export const validateTarotConstants = (): TarotConstantsValidationReport => {
  const errors: ValidationItem[] = [];
  const warnings: ValidationItem[] = [];
  const info: ValidationItem[] = [];

  const { cardId, rule } = CONSTANTS_VALIDATION_RULES;

  const primaryCardIds = TAROT_CARDS.map((card) => card.id);
  const meaningIds = TAROT_MEANINGS.map((item) => item.id);
  const contextMeaningIds = TAROT_CONTEXT_MEANINGS.map((item) => item.cardId);
  const emotionIds = EMOTION_VECTOR_BY_CARD_ID.map((item) => item.cardId);

  const allPrimary = [...primaryCardIds, ...meaningIds, ...contextMeaningIds];
  for (const id of allPrimary) {
    if (!Number.isInteger(id)) {
      addError(
        errors,
        "CARD_ID_NOT_INTEGER",
        `정수 ID가 아닌 값이 있습니다: ${id}`,
      );
      continue;
    }
    if (id < cardId.min || id > cardId.max) {
      addError(
        errors,
        "CARD_ID_OUT_OF_RANGE",
        `허용 범위(${cardId.min}~${cardId.max})를 벗어난 ID: ${id}`,
      );
    }
  }

  const tarotCardDuplicates = findDuplicates(primaryCardIds);
  if (tarotCardDuplicates.length) {
    addError(
      errors,
      "CARD_ID_DUPLICATE",
      `TAROT_CARDS 중복 ID: ${tarotCardDuplicates.join(", ")}`,
    );
  }

  const meaningMissing = primaryCardIds.filter(
    (id) => !meaningIds.includes(id),
  );
  if (meaningMissing.length) {
    addError(
      errors,
      "MEANING_ID_MISSING",
      `기본 의미 누락 카드 ID: ${meaningMissing.join(", ")}`,
    );
  }

  const contextMissing = primaryCardIds.filter(
    (id) => !contextMeaningIds.includes(id),
  );
  if (contextMissing.length) {
    addError(
      errors,
      "CONTEXT_MEANING_ID_MISSING",
      `컨텍스트 의미 누락 카드 ID: ${contextMissing.join(", ")}`,
    );
  }

  const emotionOutOfRange = emotionIds.filter(
    (id) => id < cardId.min || id > cardId.max,
  );
  if (emotionOutOfRange.length) {
    addError(
      errors,
      "EMOTION_ID_OUT_OF_RANGE",
      `감정 벡터 카드 ID 범위 오류: ${emotionOutOfRange.join(", ")}`,
    );
  }

  const requiredContexts = new Set(
    CONSTANTS_VALIDATION_RULES.contextKey.canonical,
  );
  for (const item of TAROT_CONTEXT_MEANINGS) {
    const keys = new Set(Object.keys(item.contexts ?? {}));
    for (const required of requiredContexts) {
      if (!keys.has(required)) {
        addError(
          errors,
          "CONTEXT_KEY_MISSING",
          `카드 ${item.cardId}에 '${required}' 컨텍스트가 없습니다.`,
        );
      }
    }
  }

  for (const tag of CONTEXT_TAGS) {
    const key = tag.context;
    if (isCanonicalContext(key)) continue;
    if (isAliasContext(key)) {
      addWarning(
        warnings,
        "CONTEXT_ALIAS_USED",
        `CONTEXT_TAGS에 alias 컨텍스트 사용: ${key}`,
      );
      continue;
    }
    addError(
      errors,
      "CONTEXT_KEY_INVALID",
      `CONTEXT_TAGS의 유효하지 않은 컨텍스트: ${key}`,
    );
  }

  for (const ruleItem of TAG_COMBINATION_RULES as Array<Record<string, any>>) {
    for (const key of ruleItem.contexts ?? []) {
      if (isCanonicalContext(key)) continue;
      if (isAliasContext(key)) {
        addWarning(
          warnings,
          "TAG_RULE_ALIAS_CONTEXT",
          `태그 조합 룰(${ruleItem.ruleId})에서 alias 컨텍스트 사용: ${key}`,
        );
      } else {
        addError(
          errors,
          "TAG_RULE_INVALID_CONTEXT",
          `태그 조합 룰(${ruleItem.ruleId})의 유효하지 않은 컨텍스트: ${key}`,
        );
      }
    }

    const priority = Number(ruleItem.priority);
    if (priority < rule.priorityMin || priority > rule.priorityMax) {
      addError(
        errors,
        "TAG_RULE_PRIORITY_OUT_OF_RANGE",
        `태그 조합 룰(${ruleItem.ruleId}) priority 범위 오류: ${priority}`,
      );
    }
  }

  const cardRuleIds = CARD_COMBINATION_RULES.map((item) => item.ruleId);
  const duplicateCardRuleIds = cardRuleIds.filter(
    (id, idx) => cardRuleIds.indexOf(id) !== idx,
  );
  if (duplicateCardRuleIds.length) {
    addError(
      errors,
      "CARD_RULE_ID_DUPLICATE",
      `카드 조합 룰 ID 중복: ${[...new Set(duplicateCardRuleIds)].join(", ")}`,
    );
  }

  for (const item of CARD_COMBINATION_RULES) {
    const priority = Number(item.priority);
    if (priority < rule.priorityMin || priority > rule.priorityMax) {
      addError(
        errors,
        "CARD_RULE_PRIORITY_OUT_OF_RANGE",
        `카드 조합 룰(${item.ruleId}) priority 범위 오류: ${priority}`,
      );
    }

    for (const refCardId of item.condition?.cards ?? []) {
      if (refCardId < cardId.min || refCardId > cardId.max) {
        addError(
          errors,
          "CARD_RULE_REF_OUT_OF_RANGE",
          `카드 조합 룰(${item.ruleId})이 잘못된 카드 ID를 참조: ${refCardId}`,
        );
      }
      if (!primaryCardIds.includes(refCardId)) {
        addError(
          errors,
          "CARD_RULE_REF_MISSING",
          `카드 조합 룰(${item.ruleId})이 존재하지 않는 카드 ID를 참조: ${refCardId}`,
        );
      }
    }
  }

  for (const spread of SPREAD_DEFINITIONS) {
    const meanings =
      SPREAD_POSITION_MEANINGS[
        spread.spreadId as keyof typeof SPREAD_POSITION_MEANINGS
      ] ?? [];
    const weights =
      SPREAD_POSITION_WEIGHTS[
        spread.spreadId as keyof typeof SPREAD_POSITION_WEIGHTS
      ] ?? [];

    if (
      CONSTANTS_VALIDATION_RULES.spread.requirePositionMeaning &&
      meanings.length === 0
    ) {
      addError(
        errors,
        "SPREAD_MEANING_MISSING",
        `스프레드(${spread.spreadId}) 포지션 의미가 없습니다.`,
      );
    }

    if (
      CONSTANTS_VALIDATION_RULES.spread.requirePositionWeight &&
      weights.length === 0
    ) {
      addError(
        errors,
        "SPREAD_WEIGHT_MISSING",
        `스프레드(${spread.spreadId}) 포지션 가중치가 없습니다.`,
      );
    }

    if (CONSTANTS_VALIDATION_RULES.spread.cardCountMustMatchPositions) {
      if (spread.cardCount !== meanings.length) {
        addError(
          errors,
          "SPREAD_POSITION_COUNT_MISMATCH",
          `스프레드(${spread.spreadId}) cardCount(${spread.cardCount})와 포지션 의미(${meanings.length})가 불일치합니다.`,
        );
      }
      if (spread.cardCount !== weights.length) {
        addError(
          errors,
          "SPREAD_WEIGHT_COUNT_MISMATCH",
          `스프레드(${spread.spreadId}) cardCount(${spread.cardCount})와 포지션 가중치(${weights.length})가 불일치합니다.`,
        );
      }
    }
  }

  for (const meaning of TAROT_MEANINGS) {
    const card = TAROT_CARDS.find((c) => c.id === meaning.id);
    const minKeywords =
      card?.arcana === "Major"
        ? INTERPRETATION_QUALITY_BENCHMARKS.cardMeaning.minCoreKeywordsMajor
        : INTERPRETATION_QUALITY_BENCHMARKS.cardMeaning.minCoreKeywordsMinor;

    if ((meaning.core_keywords?.length ?? 0) < minKeywords) {
      addWarning(
        warnings,
        "MEANING_KEYWORD_LOW",
        `카드 ${meaning.id} core_keywords 개수가 권장치(${minKeywords})보다 작습니다.`,
      );
    }

    if (
      (meaning.advice?.length ?? 0) <
      INTERPRETATION_QUALITY_BENCHMARKS.cardMeaning.minAdviceLines
    ) {
      addWarning(
        warnings,
        "MEANING_ADVICE_LOW",
        `카드 ${meaning.id} advice 라인이 부족합니다.`,
      );
    }
  }

  for (const cardIdValue of primaryCardIds) {
    const symbols = SYMBOL_COORDINATES[cardIdValue];
    if (!symbols?.length) {
      addWarning(
        warnings,
        "SYMBOL_COORDS_MISSING",
        `카드 ${cardIdValue}의 SYMBOL_COORDINATES 데이터가 비어 있습니다.`,
      );
      continue;
    }

    for (const item of symbols) {
      const points = [item.x, item.y, item.w, item.h];
      if (
        points.some(
          (value) =>
            value <
              CONSTANTS_VALIDATION_RULES.symbolCoordinates.normalizedMin ||
            value > CONSTANTS_VALIDATION_RULES.symbolCoordinates.normalizedMax,
        )
      ) {
        addError(
          errors,
          "SYMBOL_COORDS_OUT_OF_RANGE",
          `카드 ${cardIdValue} 상징 좌표가 0~1 범위를 벗어났습니다.`,
        );
      }
      if (
        item.zone < CONSTANTS_VALIDATION_RULES.symbolCoordinates.zoneMin ||
        item.zone > CONSTANTS_VALIDATION_RULES.symbolCoordinates.zoneMax
      ) {
        addError(
          errors,
          "SYMBOL_ZONE_OUT_OF_RANGE",
          `카드 ${cardIdValue} 상징 zone(${item.zone})이 1~9 범위를 벗어났습니다.`,
        );
      }
    }
  }

  if (
    TAG_COMBINATION_RULES.length <
    INTERPRETATION_QUALITY_BENCHMARKS.rules.minTagCombinationRules
  ) {
    addWarning(
      warnings,
      "TAG_RULE_COUNT_LOW",
      `태그 조합 룰 수(${TAG_COMBINATION_RULES.length})가 권장치(${INTERPRETATION_QUALITY_BENCHMARKS.rules.minTagCombinationRules})보다 작습니다.`,
    );
  }

  if (
    CARD_COMBINATION_RULES.length <
    INTERPRETATION_QUALITY_BENCHMARKS.rules.minCardCombinationRules
  ) {
    addWarning(
      warnings,
      "CARD_RULE_COUNT_LOW",
      `카드 조합 룰 수(${CARD_COMBINATION_RULES.length})가 권장치(${INTERPRETATION_QUALITY_BENCHMARKS.rules.minCardCombinationRules})보다 작습니다.`,
    );
  }

  for (const cardIdValue of primaryCardIds) {
    if (!GAZE_DIRECTION_RULES[cardIdValue]) {
      addWarning(
        warnings,
        "GAZE_RULE_MISSING",
        `카드 ${cardIdValue}의 GAZE_DIRECTION_RULES가 없습니다.`,
      );
    }
    if (!COLOR_PALETTE_ANALYSIS[cardIdValue]) {
      addWarning(
        warnings,
        "COLOR_ANALYSIS_MISSING",
        `카드 ${cardIdValue}의 COLOR_PALETTE_ANALYSIS가 없습니다.`,
      );
    }
  }

  const spatialZones = Object.keys(SPATIAL_PSYCHOLOGY_RULES.zones).map(Number);
  const missingZones =
    CONSTANTS_VALIDATION_RULES.spatialPsychology.requiredZones.filter(
      (zone) => !spatialZones.includes(zone),
    );
  if (missingZones.length) {
    addError(
      errors,
      "SPATIAL_ZONE_MISSING",
      `SPATIAL_PSYCHOLOGY_RULES 누락 zone: ${missingZones.join(", ")}`,
    );
  }

  for (const transition of SPATIAL_PSYCHOLOGY_RULES.transitionRules) {
    const from = transition.from as SpatialZone;
    const to = transition.to as SpatialZone;
    if (!(from >= 1 && from <= 9 && to >= 1 && to <= 9)) {
      addError(
        errors,
        "SPATIAL_TRANSITION_INVALID",
        `공간 심리 전이 규칙이 유효하지 않습니다: ${transition.from} -> ${transition.to}`,
      );
    }
  }

  const canonicalContexts = CONSTANTS_VALIDATION_RULES.contextKey
    .canonical as unknown as Array<
    | "love"
    | "career"
    | "finance"
    | "health"
    | "spiritual"
    | "personal"
    | "advice"
  >;

  for (const cardIdValue of primaryCardIds) {
    for (const polarity of CONSTANTS_VALIDATION_RULES.healingAffirmation
      .polaritySet as ReadonlyArray<"light" | "shadow">) {
      for (const context of canonicalContexts) {
        const key = buildHealingAffirmationKey(cardIdValue, polarity, context);
        if (!HEALING_AFFIRMATIONS[key]) {
          addError(
            errors,
            "HEALING_AFFIRMATION_MISSING",
            `치유 확언 누락: ${key}`,
          );
        }
      }
    }
  }

  if (!errors.length && !warnings.length) {
    info.push({
      level: VALIDATION_REPORT_LEVEL.info,
      code: "VALIDATION_OK",
      message: "상수 검증이 정상적으로 완료되었습니다.",
    });
  }

  return {
    errors,
    warnings,
    info,
    isValid: errors.length === 0,
  };
};
