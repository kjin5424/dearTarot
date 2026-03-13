import type { DrawnCard, SpreadType } from "@types/index";
import { SPREAD_POSITION_MEANINGS } from "@utils/constants/spread/SPREAD_POSITION_MEANING";
import { buildSystemPrompt } from "@utils/constants/interpretation/PROMPT";
import {
  interpretTarotReading,
  type TarotInterpretationInput,
  type TarotInterpretationResult,
} from "@utils/helpers/interpretationEngine";
import { generateText } from "./geminiClient";

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

const SPREAD_ID_MAP: Record<SpreadType, keyof typeof SPREAD_POSITION_MEANINGS> = {
  ONE_CARD: "one_card",
  THREE_CARD: "three_card",
  FOUR_CARD: "four_card",
  FIVE_CARD: "five_card",
  CELTIC_CROSS: "celtic_cross",
  RELATIONSHIP_SPREAD: "relationship_spread",
  HORSESHOE_SPREAD: "horseshoe_spread",
  MAGIC_SEVEN: "magic_seven",
};

function roleToPosition(spreadId: keyof typeof SPREAD_POSITION_MEANINGS, role: string): number {
  const positions = SPREAD_POSITION_MEANINGS[spreadId];
  const found = positions?.find((p) => p.role === role);
  return found?.position ?? 1;
}

function runEngine(
  question: string,
  drawnCards: DrawnCard[],
  spreadType: SpreadType,
  context: string,
): TarotInterpretationResult {
  const spreadId = SPREAD_ID_MAP[spreadType];

  const engineInput: TarotInterpretationInput = {
    question,
    context,
    spreadId,
    cards: drawnCards.map((dc) => ({
      cardId: dc.card.id,
      position: roleToPosition(spreadId, dc.position),
      reversed: dc.isReversed,
    })),
  };

  return interpretTarotReading(engineInput);
}

interface GeminiInterpretationResponse {
  cardInterpretations: { position: string; lines: string[] }[];
  synthesis: string;
  actionSteps: string[];
}

export interface InterpretationResult {
  cardLines: string[][];
  synthesis: string;
  actionSteps: string[];
}

function buildCacheKey(question: string, cards: DrawnCard[]): string {
  const cardSig = cards
    .map((c) => `${c.card.id}-${c.isReversed ? "r" : "u"}-${c.position}`)
    .join("|");
  return `tarot_interp_${btoa(encodeURIComponent(question + cardSig)).slice(0, 40)}`;
}

function loadFromCache(key: string): GeminiInterpretationResponse | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, expiresAt } = JSON.parse(raw);
    if (Date.now() > expiresAt) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function saveToCache(key: string, data: GeminiInterpretationResponse): void {
  try {
    const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 7;
    localStorage.setItem(key, JSON.stringify({ data, expiresAt }));
  } catch {
    // 저장 실패는 무시
  }
}

function buildEnrichedUserPrompt(
  question: string,
  drawnCards: DrawnCard[],
  engine: TarotInterpretationResult,
): string {
  const cardSection = drawnCards
    .map((c, i) => {
      const posLabel = POSITION_LABEL[c.position] ?? c.position;
      const dir = c.isReversed ? "(역방향)" : "(정방향)";
      const ei = engine.cardInterpretations[i];
      const interp = ei?.contextInterpretation?.[0] ?? "";
      const adv = ei?.advice?.[0] ?? "";
      return `- [${posLabel}] ${c.card.nameKr} ${dir}
  해석 근거: ${interp}
  조언 근거: ${adv}
  키워드: ${(ei?.keywords ?? []).join(", ")}`;
    })
    .join("\n");

  const themes = engine.spreadSynthesis.dominantThemes.slice(0, 5).join(", ");
  const emotions = engine.spreadSynthesis.dominantEmotions.slice(0, 4).join(", ");
  const emo = engine.trace.emotionSummary;
  const emotionTone =
    emo.valence > 0.5 ? "긍정적" : emo.valence < -0.2 ? "부정적" : "중립적";
  const arousalTone = emo.arousal > 0.5 ? "활발한" : "차분한";
  const confidence = engine.confidence.band === "high" ? "높음" : engine.confidence.band === "medium" ? "중간" : "낮음";

  return `질문: ${question}

카드 배치 및 해석 근거:
${cardSection}

조합 분석:
- 핵심 테마: ${themes || "없음"}
- 감정 톤: ${emotionTone}, ${arousalTone}
- 해석 신뢰도: ${confidence}
- 치유 문구: ${engine.healingAffirmation}

응답 형식 (JSON, 반드시 준수):
{
  "cardInterpretations": [
    { "position": "포지션명", "lines": ["문장1", "문장2", "문장3"] }
  ],
  "synthesis": "전체 흐름을 아우르는 2~3문장 종합 해석",
  "actionSteps": ["실천 조언1", "실천 조언2", "실천 조언3"]
}

조건:
- 각 카드 해석은 3문장 이내
- 위의 해석 근거와 조언 근거를 반드시 참고하되, 그대로 복사하지 말고 자연스럽게 풀어서 서술
- 카드 간의 흐름과 이야기를 엮어서 종합 해석 작성
- 단정하지 말 것 ("~일 것입니다" 금지, "~처럼 보여요" 권장)
- 한국어로 작성
- 숲속 마녀의 따뜻하고 신비로운 어조`;
}

function buildMockFromEngine(
  drawnCards: DrawnCard[],
  engine: TarotInterpretationResult,
): InterpretationResult {
  const cardLines = drawnCards.map((c, i) => {
    const posLabel = POSITION_LABEL[c.position] ?? c.position;
    const dir = c.isReversed ? "역방향으로 놓인 " : "";
    const ei = engine.cardInterpretations[i];

    const lines: string[] = [
      `${posLabel}에 ${dir}${c.card.nameKr} 카드가 놓였군요.`,
    ];

    if (ei?.contextInterpretation?.[0]) {
      lines.push(ei.contextInterpretation[0]);
    }
    if (ei?.advice?.[0]) {
      lines.push(ei.advice[0]);
    }

    if (lines.length === 1) {
      lines.push("지금 이 순간, 이 카드가 건네는 말을 천천히 들어보세요.");
    }

    return lines;
  });

  const synthesis = engine.actionPlan.length > 0
    ? engine.actionPlan.join(" ") + ` ${engine.healingAffirmation}`
    : engine.healingAffirmation;

  return {
    cardLines,
    synthesis,
    actionSteps: engine.actionPlan,
  };
}

export async function requestInterpretation(
  question: string,
  drawnCards: DrawnCard[],
  spreadType: SpreadType = "ONE_CARD",
  context: string = "personal",
): Promise<InterpretationResult> {
  const cacheKey = buildCacheKey(question, drawnCards);
  const cached = loadFromCache(cacheKey);

  if (cached) {
    return {
      cardLines: cached.cardInterpretations.map((c) => c.lines),
      synthesis: cached.synthesis,
      actionSteps: cached.actionSteps,
    };
  }

  const engine = runEngine(question, drawnCards, spreadType, context);

  try {
    const systemPrompt = buildSystemPrompt({}, context);
    const userPrompt = buildEnrichedUserPrompt(question, drawnCards, engine);
    const raw = await generateText(systemPrompt, userPrompt);

    const parsed: GeminiInterpretationResponse = JSON.parse(raw);
    saveToCache(cacheKey, parsed);

    return {
      cardLines: parsed.cardInterpretations.map((c) => c.lines),
      synthesis: parsed.synthesis,
      actionSteps: parsed.actionSteps,
    };
  } catch (err) {
    console.error("[tarotApi] Gemini 호출 실패, 엔진 기반 mock 사용:", err);
    return buildMockFromEngine(drawnCards, engine);
  }
}
