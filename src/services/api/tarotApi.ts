// import type { DrawnCard, SpreadType } from "~types/index";

// === Anthropic Claude API를 통한 타로 해석 ===
// ⚠️ 현재 백엔드 없음 → 프록시 서버 또는 Edge Function 필요
// ⚠️ API 키를 클라이언트에 노출하면 안 됨

// === requestInterpretation(question, drawnCards, spreadType): Promise<string[]> ===
// 1. prompts.ts의 buildUserPrompt()로 프롬프트 조립
// 2. fetch로 프록시 서버에 POST
//    - endpoint: import.meta.env.VITE_API_URL + "/interpret"
//    - body: { model: "claude-sonnet-4-6", system: SYSTEM_PROMPT, messages: [{ role: "user", content: prompt }] }
// 3. 응답 텍스트를 카드별로 split → string[] 반환
// 4. 에러 시 fallback: getMockInterpretation() 호출

// === getMockInterpretation(card: DrawnCard): string[] ===
// AI 연동 전 임시 해석 (현재 InsightPanel에 하드코딩된 것을 여기로 이동)
// 1. TAROT_MEANINGS에서 해당 카드 의미 조회
// 2. isReversed면 REVERSED_MEANINGS 참조
// 3. position 맥락에 맞는 문장 3줄 생성
// 4. string[] 반환
