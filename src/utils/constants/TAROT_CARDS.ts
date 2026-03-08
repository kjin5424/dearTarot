// 1. 데이터 구조 최적화: '정규화(Normalization)' 제안
// 현재 모든 카드 객체에 personality_vector 등을 일일이 넣으면 코드가 비대해지고 유지보수가 어렵습니다. 제안하신 대로 슈트별/계급별 기본값을 상수로 빼서 계산하는 방식이 훨씬 효율적입니다.
/*
// 1. 기본 베이스 정의
const SUIT_BASE = {
  Swords: { thinking: 0.6, energy: 0.5, nature: "Rational" },
  Cups: { thinking: -0.6, energy: -0.5, nature: "Emotional" },
  Wands: { energy: 0.8, assertiveness: 0.7, nature: "Passionate" },
  Pentacles: { stability: 0.9, thinking: 0.3, nature: "Practical" }
};

const RANK_MULTIPLIER = {
  Page: { curiosity: 1.2, focus: 0.3 },
  Knight: { speed: 1.5, assertiveness: 1.2 },
  Queen: { empathy: 1.3, stability: 0.8 },
  King: { authority: 1.5, stability: 1.1 }
};

// 2. 팩토리 함수를 통한 확장 (Runtime 또는 Build-time)
const getEnhancedCardData = (card) => {
  if (card.arcana === 'Minor' && card.is_court) {
    const base = SUIT_BASE[card.suit];
    const mult = RANK_MULTIPLIER[card.rank];
    return { ...card, calculated_vector: combine(base, mult) };
  }
  return card;
};
 */
// 2. 시각적/흐름 데이터 추가 (visual_flow)
// Ace of Wands에 넣으신 visual_flow는 신의 한 수입니다. 이를 배열 전체로 확장하면 '시선 유도' 리딩이 가능해집니다.
// - Gaze (시선): "과거(왼쪽)를 보고 있는가, 미래(오른쪽)를 보고 있는가?"
// - Motion (움직임): "정적인가(4 of Swords), 역동적인가(Chariot)?"
// - AI 활용: "이 카드 속 인물이 다음 카드를 쳐다보고 있으니, 이 사건이 다음 사건의 직접적인 원인이 됩니다"라는 식의 스토리텔링이 가능해집니다.

// 3. 수비학적 흐름 (Numerology) 매핑 테이블
// 주석으로 언급하신 1→5→10 흐름을 위해 number 속성을 활용할 별도의 규칙 테이블을 추천합니다.
// 숫자        의미 테마              적용 예시
// 1 (Ace)    태동, 순수한 잠재력      새로운 시작의 에너지가 강함
// 5          갈등, 혼란, 중간 점검    에너지가 부딪히거나 상실되는 시점
// 10         완성, 과잉, 종결        결과가 나왔으나 책임감이 무거움

// 4. 메이저 아르카나 가중치 (weight)
// 메이저 카드는 weight: 1.5~2.0으로 잡으신다고 하셨는데, 이는 매우 적절합니다. 다만, 모든 메이저가 항상 강한 것은 아닙니다.
// - 대안: 질문의 주제가 '일상적인 고민'일 때는 마이너의 가중치를 높이고, '인생의 변곡점'일 때 메이저 가중치를 폭발시키는 [Contextual Weighting] 시스템을 고려해 보세요.

// image, element
// UI, 카드 렌더링, 덱 구성
export const TAROT_CARDS = [
  // Major Arcana
  {
    id: 0,
    name: "The Fool",
    nameKr: "광대",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 0,
  },
  {
    id: 1,
    name: "The Magician",
    nameKr: "마법사",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 1,
  },
  {
    id: 2,
    name: "The High Priestess",
    nameKr: "여사제",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 2,
  },
  {
    id: 3,
    name: "The Empress",
    nameKr: "여황제",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 3,
  },
  {
    id: 4,
    name: "The Emperor",
    nameKr: "황제",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 4,
  },
  {
    id: 5,
    name: "The Hierophant",
    nameKr: "교황",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 5,
  },
  {
    id: 6,
    name: "The Lovers",
    nameKr: "연인",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 6,
  },
  {
    id: 7,
    name: "The Chariot",
    nameKr: "전차",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 7,
  },
  {
    id: 8,
    name: "Strength",
    nameKr: "힘",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 8,
  },
  {
    id: 9,
    name: "The Hermit",
    nameKr: "은둔자",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 9,
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    nameKr: "운명의 수레바퀴",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 10,
  },
  {
    id: 11,
    name: "Justice",
    nameKr: "정의",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 11,
  },
  {
    id: 12,
    name: "The Hanged Man",
    nameKr: "매달린 남자",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 12,
  },
  {
    id: 13,
    name: "Death",
    nameKr: "죽음",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 13,
  },
  {
    id: 14,
    name: "Temperance",
    nameKr: "절제",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 14,
  },
  {
    id: 15,
    name: "The Devil",
    nameKr: "악마",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 15,
  },
  {
    id: 16,
    name: "The Tower",
    nameKr: "탑",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 16,
  },
  {
    id: 17,
    name: "The Star",
    nameKr: "별",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 17,
  },
  {
    id: 18,
    name: "The Moon",
    nameKr: "달",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 18,
  },
  {
    id: 19,
    name: "The Sun",
    nameKr: "태양",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 19,
  },
  {
    id: 20,
    name: "Judgement",
    nameKr: "심판",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 20,
  },
  {
    id: 21,
    name: "The World",
    nameKr: "세계",
    arcana: "Major",
    suit: null,
    rank: null,
    number: 21,
  },

  // Minor Arcana
  // Wands
  {
    id: 22,
    name: "Ace of Wands",
    nameKr: "완드 에이스",
    arcana: "Minor",
    suit: "Wands",
    rank: "Ace", // Page, Knight 등
    number: 1,
    is_court: false,
    visual_flow: { gaze: "right", motion: "forward" },
    weight: 1.0, // 메이저는 1.5~2.0으로 상향 조정
  },
  // Tag Combination Rule을 돌리기 전에,
  // **원소 궁합(불+물=증발)**이나
  // **수비학적 흐름(1→5→10)**을 먼저 계산하여
  // 해석의 큰 줄기를 잡을 수 있음
  {
    id: 23,
    name: "Two of Wands",
    nameKr: "완드 2",
    arcana: "Minor",
    suit: "Wands",
    rank: "Two",
    number: 2,
  },
  {
    id: 24,
    name: "Three of Wands",
    nameKr: "완드 3",
    arcana: "Minor",
    suit: "Wands",
    rank: "Three",
    number: 3,
  },
  {
    id: 25,
    name: "Four of Wands",
    nameKr: "완드 4",
    arcana: "Minor",
    suit: "Wands",
    rank: "Four",
    number: 4,
  },
  {
    id: 26,
    name: "Five of Wands",
    nameKr: "완드 5",
    arcana: "Minor",
    suit: "Wands",
    rank: "Five",
    number: 5,
  },
  {
    id: 27,
    name: "Six of Wands",
    nameKr: "완드 6",
    arcana: "Minor",
    suit: "Wands",
    rank: "Six",
    number: 6,
  },
  {
    id: 28,
    name: "Seven of Wands",
    nameKr: "완드 7",
    arcana: "Minor",
    suit: "Wands",
    rank: "Seven",
    number: 7,
  },
  {
    id: 29,
    name: "Eight of Wands",
    nameKr: "완드 8",
    arcana: "Minor",
    suit: "Wands",
    rank: "Eight",
    number: 8,
  },
  {
    id: 30,
    name: "Nine of Wands",
    nameKr: "완드 9",
    arcana: "Minor",
    suit: "Wands",
    rank: "Nine",
    number: 9,
  },
  {
    id: 31,
    name: "Ten of Wands",
    nameKr: "완드 10",
    arcana: "Minor",
    suit: "Wands",
    rank: "Ten",
    number: 10,
  },
  {
    id: 32,
    name: "Page of Wands",
    nameKr: "완드 시종",
    arcana: "Minor",
    suit: "Wands",
    rank: "Page",
    number: 11,
  },
  {
    id: 33,
    name: "Knight of Wands",
    nameKr: "완드 기사",
    arcana: "Minor",
    suit: "Wands",
    rank: "Knight",
    number: 12,
  },
  {
    id: 34,
    name: "Queen of Wands",
    nameKr: "완드 여왕",
    arcana: "Minor",
    suit: "Wands",
    rank: "Queen",
    number: 13,
  },
  {
    id: 35,
    name: "King of Wands",
    nameKr: "완드 왕",
    arcana: "Minor",
    suit: "Wands",
    rank: "King",
    number: 14,
  },

  // Cups
  {
    id: 36,
    name: "Ace of Cups",
    nameKr: "컵 에이스",
    arcana: "Minor",
    suit: "Cups",
    rank: "Ace",
    number: 1,
  },
  {
    id: 37,
    name: "Two of Cups",
    nameKr: "컵 2",
    arcana: "Minor",
    suit: "Cups",
    rank: "Two",
    number: 2,
  },
  {
    id: 38,
    name: "Three of Cups",
    nameKr: "컵 3",
    arcana: "Minor",
    suit: "Cups",
    rank: "Three",
    number: 3,
  },
  {
    id: 39,
    name: "Four of Cups",
    nameKr: "컵 4",
    arcana: "Minor",
    suit: "Cups",
    rank: "Four",
    number: 4,
  },
  {
    id: 40,
    name: "Five of Cups",
    nameKr: "컵 5",
    arcana: "Minor",
    suit: "Cups",
    rank: "Five",
    number: 5,
  },
  {
    id: 41,
    name: "Six of Cups",
    nameKr: "컵 6",
    arcana: "Minor",
    suit: "Cups",
    rank: "Six",
    number: 6,
  },
  {
    id: 42,
    name: "Seven of Cups",
    nameKr: "컵 7",
    arcana: "Minor",
    suit: "Cups",
    rank: "Seven",
    number: 7,
  },
  {
    id: 43,
    name: "Eight of Cups",
    nameKr: "컵 8",
    arcana: "Minor",
    suit: "Cups",
    rank: "Eight",
    number: 8,
  },
  {
    id: 44,
    name: "Nine of Cups",
    nameKr: "컵 9",
    arcana: "Minor",
    suit: "Cups",
    rank: "Nine",
    number: 9,
  },
  {
    id: 45,
    name: "Ten of Cups",
    nameKr: "컵 10",
    arcana: "Minor",
    suit: "Cups",
    rank: "Ten",
    number: 10,
  },
  {
    id: 46,
    name: "Page of Cups",
    nameKr: "컵 시종",
    arcana: "Minor",
    suit: "Cups",
    rank: "Page",
    number: 11,
  },
  {
    id: 47,
    name: "Knight of Cups",
    nameKr: "컵 기사",
    arcana: "Minor",
    suit: "Cups",
    rank: "Knight",
    number: 12,
  },
  {
    id: 48,
    name: "Queen of Cups",
    nameKr: "컵 여왕",
    arcana: "Minor",
    suit: "Cups",
    rank: "Queen",
    number: 13,
  },
  {
    id: 49,
    name: "King of Cups",
    nameKr: "컵 왕",
    arcana: "Minor",
    suit: "Cups",
    rank: "King",
    number: 14,
  },

  // Swords
  {
    id: 50,
    name: "Ace of Swords",
    nameKr: "소드 에이스",
    arcana: "Minor",
    suit: "Swords",
    rank: "Ace",
    number: 1,
  },
  {
    id: 51,
    name: "Two of Swords",
    nameKr: "소드 2",
    arcana: "Minor",
    suit: "Swords",
    rank: "Two",
    number: 2,
  },
  {
    id: 52,
    name: "Three of Swords",
    nameKr: "소드 3",
    arcana: "Minor",
    suit: "Swords",
    rank: "Three",
    number: 3,
  },
  {
    id: 53,
    name: "Four of Swords",
    nameKr: "소드 4",
    arcana: "Minor",
    suit: "Swords",
    rank: "Four",
    number: 4,
  },
  {
    id: 54,
    name: "Five of Swords",
    nameKr: "소드 5",
    arcana: "Minor",
    suit: "Swords",
    rank: "Five",
    number: 5,
  },
  {
    id: 55,
    name: "Six of Swords",
    nameKr: "소드 6",
    arcana: "Minor",
    suit: "Swords",
    rank: "Six",
    number: 6,
  },
  {
    id: 56,
    name: "Seven of Swords",
    nameKr: "소드 7",
    arcana: "Minor",
    suit: "Swords",
    rank: "Seven",
    number: 7,
  },
  {
    id: 57,
    name: "Eight of Swords",
    nameKr: "소드 8",
    arcana: "Minor",
    suit: "Swords",
    rank: "Eight",
    number: 8,
  },
  {
    id: 58,
    name: "Nine of Swords",
    nameKr: "소드 9",
    arcana: "Minor",
    suit: "Swords",
    rank: "Nine",
    number: 9,
  },
  {
    id: 59,
    name: "Ten of Swords",
    nameKr: "소드 10",
    arcana: "Minor",
    suit: "Swords",
    rank: "Ten",
    number: 10,
  },
  {
    id: 60,
    name: "Page of Swords",
    nameKr: "소드 시종",
    arcana: "Minor",
    suit: "Swords",
    rank: "Page",
    number: 11,
  },
  {
    id: 61,
    name: "Knight of Swords",
    nameKr: "소드 기사",
    arcana: "Minor",
    suit: "Swords",
    rank: "Knight",
    number: 12,
  },
  {
    id: 62,
    name: "Queen of Swords",
    nameKr: "소드 여왕",
    arcana: "Minor",
    suit: "Swords",
    rank: "Queen",
    number: 13,
  },
  {
    id: 63,
    name: "King of Swords",
    nameKr: "소드 왕",
    arcana: "Minor",
    suit: "Swords",
    rank: "King",
    number: 14,
    personality_vector: {
      extraversion: 0.6, // 외향성
      intuition: 0.4, // 직관성
      thinking: 1.0, // 사고형
      judging: 0.9, // 판단형
    },
    social_traits: {
      warmth: 0.2, // 따뜻함(낮음)
      assertiveness: 0.9, // 적극성(높음)
      openness: 0.3, // 개방성(보통)
    },
    // X축 (Energy Flow):
    // Wands/Swords (외향, 발산: +1) ↔ Cups/Pentacles (내향, 수렴: -1)
    // Y축 (Decision Basis):
    // Swords/Pentacles (이성, 현실: +1) ↔ Wands/Cups (직관, 감정: -1)
    // 계급 (Rank)    속성 (Nature)       수치적 특성 (AI 가중치)          MBTI 대응 성향
    // Page (시종)   "호기심, 미숙, 학습"  "Focus: 0.3, Stability: 0.2"   P (인식형) 가중치 높음
    // Knight (기사) "저돌성, 실행, 극단"  "Speed: 1.0, Stability: 0.4"   E (외향) 가중치 극대화
    // Queen (여왕)  "수용, 관리, 내면"    "Focus: 0.8, Stability: 0.9"   I (내향) 가중치 높음
    // King (왕)     "지배, 결과, 권위"    "Focus: 1.0, Stability: 1.0"   J (판단형) 가중치 극대화
    // - 상보적 관계 (Complementary): 한 카드는 T가 높고 다른 카드는 F가 높을 때 → "서로의 부족한 점을 채워주는 관계"
    // - 충돌 관계 (Conflict): 둘 다 E와 Assertiveness가 극단적으로 높을 때 → "주도권 싸움이 치열한 관계"
    // - 동질적 관계 (Mirroring): 벡터 유사도가 0.9 이상일 때 → "말하지 않아도 잘 통하는 소울메이트"
    // 처음부터 16장을 모두 세밀하게 조정하기 힘들다면, **슈트별 기본값(Suit Base)**을 먼저 정하고, 거기에 **계급별 가중치(Rank Multiplier)**를 곱하는 방식으로 초기 데이터를 생성
    // 예를 들어, 모든 Swords 카드는 기본적으로 Thinking: +0.5를 먹고 들어가고, 그중 King이면 Thinking: +0.5가 추가되어 1.0이 되는 방식
  },

  // Pentacles
  {
    id: 64,
    name: "Ace of Pentacles",
    nameKr: "펜타클 에이스",
    arcana: "Minor",
    suit: "Pentacles",
    rank: "Ace",
    number: 1,
  },
  {
    id: 65,
    name: "Two of Pentacles",
    nameKr: "펜타클 2",
    arcana: "Minor",
    suit: "Pentacles",
    rank: "Two",
    number: 2,
  },
  {
    id: 66,
    name: "Three of Pentacles",
    nameKr: "펜타클 3",
    arcana: "Minor",
    suit: "Pentacles",
    rank: "Three",
    number: 3,
  },
  {
    id: 67,
    name: "Four of Pentacles",
    nameKr: "펜타클 4",
    arcana: "Minor",
    suit: "Pentacles",
    rank: "Four",
    number: 4,
  },
  {
    id: 68,
    name: "Five of Pentacles",
    nameKr: "펜타클 5",
    arcana: "Minor",
    suit: "Pentacles",
    rank: "Five",
    number: 5,
  },
  {
    id: 69,
    name: "Six of Pentacles",
    nameKr: "펜타클 6",
    arcana: "Minor",
    suit: "Pentacles",
    rank: "Six",
    number: 6,
  },
  {
    id: 70,
    name: "Seven of Pentacles",
    nameKr: "펜타클 7",
    arcana: "Minor",
    suit: "Pentacles",
    rank: "Seven",
    number: 7,
  },
  {
    id: 71,
    name: "Eight of Pentacles",
    nameKr: "펜타클 8",
    arcana: "Minor",
    suit: "Pentacles",
    rank: "Eight",
    number: 8,
  },
  {
    id: 72,
    name: "Nine of Pentacles",
    nameKr: "펜타클 9",
    arcana: "Minor",
    suit: "Pentacles",
    rank: "Nine",
    number: 9,
  },
  {
    id: 73,
    name: "Ten of Pentacles",
    nameKr: "펜타클 10",
    arcana: "Minor",
    suit: "Pentacles",
    rank: "Ten",
    number: 10,
  },
  {
    id: 74,
    name: "Page of Pentacles",
    nameKr: "펜타클 시종",
    arcana: "Minor",
    suit: "Pentacles",
    rank: "Page",
    number: 11,
  },
  {
    id: 75,
    name: "Knight of Pentacles",
    nameKr: "펜타클 기사",
    arcana: "Minor",
    suit: "Pentacles",
    rank: "Knight",
    number: 12,
  },
  {
    id: 76,
    name: "Queen of Pentacles",
    nameKr: "펜타클 여왕",
    arcana: "Minor",
    suit: "Pentacles",
    rank: "Queen",
    number: 13,
  },
  {
    id: 77,
    name: "King of Pentacles",
    nameKr: "펜타클 왕",
    arcana: "Minor",
    suit: "Pentacles",
    rank: "King",
    number: 14,
  },
];
