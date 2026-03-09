export type SceneName =
  | "FOREST_INTRO"
  | "WITCH_CIRCLE"
  | "WITCH_APPROACH"
  | "QUESTION_INPUT"
  | "SPREAD_QUIZ"
  | "KARMA"
  | "SHUFFLE"
  | "DRAW"
  | "READING"
  | "RETURN";

export type SpreadType =
  | "ONE_CARD"
  | "THREE_CARD"
  | "FOUR_CARD"
  | "FIVE_CARD"
  | "CELTIC_CROSS"
  | "RELATIONSHIP_SPREAD"
  | "HORSESHOE_SPREAD"
  | "MAGIC_SEVEN";

export type KarmaOption = "DIARY" | "DONATION" | "AD";

export interface DrawnCard {
  card: TarotCard;
  position: string;
  isReversed: boolean;
}

export type Arcana = "Major" | "Minor";
export type Suit = "Wands" | "Cups" | "Swords" | "Pentacles" | null;

export interface TarotCard {
  id: number;
  name: string;
  nameKr: string;
  arcana: Arcana;
  suit: Suit;
  rank: string | null;
  number: number;
  image: string;
}

export type ContextMeaning = {
  themes: string[];
  interpretations: string[];
  advice: string[];
  warnings?: string[];
};

export type TarotCardMeaning = {
  id: number;
  name: string;
  arcana: "major";
  number: number;

  core_keywords: string[];
  light_keywords: string[];
  shadow_keywords: string[];

  love: string[];
  career: string[];
  finance: string[];
  health: string[];
  spiritual: string[];

  advice: string[];
};

export type CardContextMeaning = {
  cardId: number;
  contexts: {
    love?: ContextMeaning;
    career?: ContextMeaning;
    finance?: ContextMeaning;
    spiritual?: ContextMeaning;
  };
};

type InterpretationLogic = "invert" | "weaken";

interface ReversedLogic {
  love: InterpretationLogic;
  career: InterpretationLogic;
  finance: InterpretationLogic;
  health: InterpretationLogic;
  advice: InterpretationLogic;
  spiritual: InterpretationLogic;
  personal: InterpretationLogic;
}
