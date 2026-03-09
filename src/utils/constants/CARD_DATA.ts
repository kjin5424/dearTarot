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

export const CARD_DATA = {
  version: "1.1.0",
  lastUpdated: "2026-03-09",
  decks: [
    {
      deckId: "rider-waite-classic",
      deckName: "Rider-Waite Tarot",
      category: "TAROT",
      cards: [
        {
          id: "major-00",
          index: 0,
          type: "MAJOR",
          name: "The Fool",
          subtitle: "Leap of Trust",
          images: {
            default: "/assets/cards/rider-waite/00_fool.webp",
            thumbnail: "/assets/cards/rider-waite/thumbs/00_fool.webp",
          },
          attributes: {
            element: "Air",
            planet: "Uranus",
            suit: null,
            number: 0,
          },
          meanings: {
            upright: {
              keywords: ["new_start", "freedom", "openness", "trust"],
              summary:
                "A new chapter opens when curiosity is stronger than fear.",
              advice:
                "Take a small but real first step instead of waiting for certainty.",
            },
            reversed: {
              keywords: ["naivety", "hesitation", "distraction", "risk_blindness"],
              summary:
                "Energy is scattered or delayed because preparation is missing.",
              advice:
                "Reduce risk and define one boundary before moving forward.",
            },
          },
          aiPrompts: {
            symbolism:
              "Traveler at the edge, white dog warning, bright sky, light pack.",
            visualStory:
              "Begin with innocence, then contrast excitement with practical caution.",
            toneHint: "balanced",
          },
        },
      ],
    } satisfies CardDataDeck,
  ],
} as const;


