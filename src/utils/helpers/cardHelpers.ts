// import type { TarotCard, DrawnCard, SpreadType } from "~types/index";
// import { TAROT_CARDS } from "~utils/constants/TAROT_CARDS";
// import { SPREAD_TYPES } from "~utils/constants/SPREAD_TYPES";

// === shuffleArray<T>(arr: T[]): T[] ===
// Fisher-Yates 셔플 (원본 변경 없이 복사본 반환)

// === drawRandomCards(spreadType: SpreadType): DrawnCard[] ===
// 1. SPREAD_TYPES[spreadType].count 로 뽑을 카드 수 결정
// 2. TAROT_CARDS 배열(78장)을 shuffleArray로 셔플
// 3. 앞에서 count장 slice
// 4. 각 카드에 대해:
//    - isReversed: Math.random() < 0.3 (30% 역방향)
//    - position: SPREAD_TYPES[spreadType].positions[i]
// 5. DrawnCard[] 반환

// === getCardById(id: number): TarotCard | undefined ===
// TAROT_CARDS.find(c => c.id === id)

// === getPositionLabel(spreadType: SpreadType, index: number): string ===
// SPREAD_TYPES[spreadType].positions[index] 반환
