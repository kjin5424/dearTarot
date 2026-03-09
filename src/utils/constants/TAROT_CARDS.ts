/**
 * 78장 카드의 기본 메타데이터를 정의합니다.
 */
const MAJOR_NAMES = [
  "The Fool",
  "The Magician",
  "The High Priestess",
  "The Empress",
  "The Emperor",
  "The Hierophant",
  "The Lovers",
  "The Chariot",
  "Strength",
  "The Hermit",
  "Wheel of Fortune",
  "Justice",
  "The Hanged Man",
  "Death",
  "Temperance",
  "The Devil",
  "The Tower",
  "The Star",
  "The Moon",
  "The Sun",
  "Judgement",
  "The World",
] as const;

const MAJOR_NAMES_KR = [
  "바보",
  "마법사",
  "여사제",
  "여황제",
  "황제",
  "교황",
  "연인",
  "전차",
  "힘",
  "은둔자",
  "운명의 수레바퀴",
  "정의",
  "매달린 사람",
  "죽음",
  "절제",
  "악마",
  "탑",
  "별",
  "달",
  "태양",
  "심판",
  "세계",
] as const;

const MINOR_RANKS = [
  "Ace",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Page",
  "Knight",
  "Queen",
  "King",
] as const;

const MINOR_SUITS = ["Wands", "Cups", "Swords", "Pentacles"] as const;

const buildMinorName = (rank: string, suit: string) => `${rank} of ${suit}`;

export const TAROT_CARDS = [
  ...MAJOR_NAMES.map((name, id) => ({
    id,
    name,
    nameKr: MAJOR_NAMES_KR[id] ?? name,
    arcana: "Major" as const,
    suit: null,
    rank: null,
    number: id,
    image: `/assets/cards/rider-waite/${String(id).padStart(2, "0")}.webp`,
  })),
  ...MINOR_SUITS.flatMap((suit, suitIndex) =>
    MINOR_RANKS.map((rank, rankIndex) => {
      const id = 22 + suitIndex * 14 + rankIndex;
      return {
        id,
        name: buildMinorName(rank, suit),
        nameKr: buildMinorName(rank, suit),
        arcana: "Minor" as const,
        suit,
        rank,
        number: rankIndex + 1,
        image: `/assets/cards/rider-waite/${String(id).padStart(2, "0")}.webp`,
      };
    }),
  ),
];

