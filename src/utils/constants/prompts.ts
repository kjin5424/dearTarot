/**
 * 시스템/유저 프롬프트 템플릿과 프로필 주입 빌더를 정의합니다.
 */
import {
  CONTEXT_SPECIFIC_TONE_GUIDE,
  DEFAULT_PERSONALIZED_PROFILE,
  type PersonalizedInterpretationProfile,
} from "./PERSONALIZED_INTERPRETATION_PROFILE";
import { normalizeInterpretationContext } from "./INTERPRETATION_CONTEXT_SCHEMA";

export const SYSTEM_PROMPT_BASE = `
You are an empathetic tarot interpreter.
Use evidence from cards, positions, context meanings, and rule-based signals.
Never claim absolute certainty about the future.
Never provide medical diagnosis or guaranteed financial outcomes.
Always provide practical next actions.
`.trim();

export const SYSTEM_PROMPT_STYLE_RULES = {
  toneGuide: {
    gentle: "Warm and validating, avoid pressure language.",
    balanced: "Empathetic but concrete with clear reasoning.",
    direct: "Concise and clear with explicit action priorities.",
    coach: "Motivational and action-oriented with checkpoints.",
    spiritual: "Reflective and symbolic while staying practical.",
  },
  confidenceLanguage: {
    high: "Use confident but non-absolute language.",
    medium: "Use probabilistic language and offer options.",
    low: "Use exploratory language and ask clarification cues.",
  },
} as const;

export const USER_PROMPT_TEMPLATE = `
Question: {question}
Context: {context}
Spread: {spreadId}
Cards:
{cardLines}

Interpretation requirements:
1) card-by-card reading
2) synthesis by spread positions
3) key opportunities and risks
4) 1 to 3 practical action steps
5) short closing reflection
`.trim();

export const TRACE_PROMPT_TEMPLATE = `
Use these structured signals as evidence:
- baseMeaning: {baseMeaning}
- contextMeaning: {contextMeaning}
- semanticTags: {semanticTags}
- tagRules: {tagRules}
- cardRules: {cardRules}
- emotionVector: {emotionVector}
- positionWeights: {positionWeights}
`.trim();

export const buildSystemPrompt = (
  profile: Partial<PersonalizedInterpretationProfile> = {},
  rawContext: string,
) => {
  const merged = { ...DEFAULT_PERSONALIZED_PROFILE, ...profile };
  const context = normalizeInterpretationContext(rawContext);
  const guide = CONTEXT_SPECIFIC_TONE_GUIDE[context];

  const styleLine =
    SYSTEM_PROMPT_STYLE_RULES.toneGuide[merged.tone] ??
    SYSTEM_PROMPT_STYLE_RULES.toneGuide.balanced;

  return [
    SYSTEM_PROMPT_BASE,
    `Tone: ${merged.tone}`,
    `Style rule: ${styleLine}`,
    `Directness: ${merged.directness.toFixed(2)}`,
    `Empathy: ${merged.empathy.toFixed(2)}`,
    `Practicality: ${merged.practicality.toFixed(2)}`,
    `Detail level: ${merged.detailLevel}`,
    `Context focus: ${guide.focus.join(", ")}`,
    `Avoid patterns: ${[...guide.avoid, ...merged.disallowedPatterns].join(", ")}`,
  ].join("\n");
};


