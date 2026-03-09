/**
 * 서비스 카드 데이터 스키마와 확장 메타데이터 샘플을 정의합니다.
 */
export type CardCategory = "TAROT" | "ORACLE" | "ASTROLOGY";
export type CardType = "MAJOR" | "MINOR" | "MESSAGE";

export interface CardDataItem {
  id: string;
  index: number;
  type: CardType;
  name: string;
  subtitle: string;
  images: {
    default: string;
    thumbnail: string;
  };
  attributes: {
    element: "Fire" | "Water" | "Air" | "Earth" | "Spirit";
    planet?: string;
    zodiac?: string;
    suit: "Wands" | "Cups" | "Swords" | "Pentacles" | null;
    number: number;
  };
  meanings: {
    upright: {
      keywords: string[];
      summary: string;
      advice: string;
    };
    reversed: {
      keywords: string[];
      summary: string;
      advice: string;
    };
  };
  aiPrompts: {
    symbolism: string;
    visualStory: string;
    toneHint: "gentle" | "balanced" | "direct" | "mystic";
  };
}

export interface CardDataDeck {
  deckId: string;
  deckName: string;
  category: CardCategory;
  cards: CardDataItem[];
}


