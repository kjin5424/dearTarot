/**
 * 역방향 카드 해석 정책(invert/weaken)과 예외를 정의합니다.
 */
export const MAJOR_REVERSED_LOGIC = [
  {
    cardId: 0,
    love: "weaken",
    career: "weaken",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "weaken",
    personal: "weaken",
  },
  {
    cardId: 1,
    love: "weaken",
    career: "invert",
    finance: "invert",
    health: "weaken",
    advice: "invert",
    spiritual: "weaken",
    personal: "weaken",
  },
  {
    cardId: 2,
    love: "weaken",
    career: "weaken",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "invert",
    personal: "weaken",
  },
  {
    cardId: 3,
    love: "weaken",
    career: "weaken",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "weaken",
    personal: "weaken",
  },
  {
    cardId: 4,
    love: "invert",
    career: "weaken",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "weaken",
    personal: "invert",
  },
  {
    cardId: 5,
    love: "invert",
    career: "invert",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "invert",
    personal: "invert",
  },
  {
    cardId: 6,
    love: "invert",
    career: "weaken",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "weaken",
    personal: "invert",
  },
  {
    cardId: 7,
    love: "weaken",
    career: "weaken",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "weaken",
    personal: "weaken",
  },
  {
    cardId: 8,
    love: "weaken",
    career: "weaken",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "weaken",
    personal: "weaken",
  },
  {
    cardId: 9,
    love: "weaken",
    career: "weaken",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "invert",
    personal: "weaken",
  },
  {
    cardId: 10,
    love: "weaken",
    career: "weaken",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "weaken",
    personal: "weaken",
  },
  {
    cardId: 11,
    love: "invert",
    career: "invert",
    finance: "invert",
    health: "weaken",
    advice: "invert",
    spiritual: "weaken",
    personal: "invert",
  },
  {
    cardId: 12,
    love: "weaken",
    career: "weaken",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "invert",
    personal: "weaken",
  },
  {
    cardId: 13,
    love: "weaken",
    career: "weaken",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "invert",
    personal: "weaken",
  },
  {
    cardId: 14,
    love: "weaken",
    career: "weaken",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "weaken",
    personal: "weaken",
  },
  {
    cardId: 15,
    love: "invert",
    career: "invert",
    finance: "invert",
    health: "weaken",
    advice: "invert",
    spiritual: "invert",
    personal: "invert",
  },
  {
    cardId: 16,
    love: "invert",
    career: "invert",
    finance: "invert",
    health: "weaken",
    advice: "invert",
    spiritual: "invert",
    personal: "invert",
  },
  {
    cardId: 17,
    love: "weaken",
    career: "weaken",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "weaken",
    personal: "weaken",
  },
  {
    cardId: 18,
    love: "invert",
    career: "invert",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "invert",
    personal: "invert",
  },
  {
    cardId: 19,
    love: "weaken",
    career: "weaken",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "weaken",
    personal: "weaken",
  },
  {
    cardId: 20,
    love: "weaken",
    career: "weaken",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "invert",
    personal: "weaken",
  },
  {
    cardId: 21,
    love: "weaken",
    career: "weaken",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "weaken",
    personal: "weaken",
  },
];
export const MINOR_REVERSED_PATTERN = {
  wands: {
    love: "weaken",
    career: "weaken",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "weaken",
    personal: "weaken",
  },
  cups: {
    love: "invert",
    career: "weaken",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "weaken",
    personal: "invert",
  },
  swords: {
    love: "invert",
    career: "invert",
    finance: "invert",
    health: "weaken",
    advice: "invert",
    spiritual: "weaken",
    personal: "invert",
  },
  pentacles: {
    love: "weaken",
    career: "weaken",
    finance: "weaken",
    health: "weaken",
    advice: "invert",
    spiritual: "weaken",
    personal: "weaken",
  },
};
export const CARD_REVERSED_OVERRIDE = {
  /* 메이저 아르카나 */
  4: { love: "invert", personal: "invert" }, // Emperor
  5: { love: "invert", career: "invert", personal: "invert" }, // Hierophant
  6: { love: "invert", personal: "invert" }, // Lovers
  11: {
    love: "invert",
    career: "invert",
    finance: "invert",
    personal: "invert",
  }, // Justice
  15: {
    love: "invert",
    career: "invert",
    finance: "invert",
    personal: "invert",
    spiritual: "invert",
  }, // Devil
  16: {
    love: "invert",
    career: "invert",
    finance: "invert",
    personal: "invert",
    spiritual: "invert",
  }, // Tower
  18: {
    love: "invert",
    career: "invert",
    personal: "invert",
    spiritual: "invert",
  }, // Moon

  /* 완드 */
  23: { career: "invert", personal: "invert" }, // 2 Wands
  24: { career: "invert", personal: "invert" }, // 3 Wands
  27: { career: "invert", personal: "invert" }, // 6 Wands
  28: { love: "invert", personal: "invert" }, // 7 Wands
  29: { health: "invert", personal: "invert" }, // 8 Wands
  31: { health: "invert", personal: "invert" }, // 10 Wands

  /* 컵 */
  36: { love: "invert", spiritual: "invert", personal: "invert" }, // Ace Cups
  38: { love: "invert", personal: "invert" }, // 3 Cups
  39: { love: "invert", personal: "invert" }, // 4 Cups
  41: { love: "invert", personal: "invert" }, // 6 Cups
  42: { love: "invert", personal: "invert" }, // 7 Cups
  43: { love: "invert", personal: "invert" }, // 8 Cups

  /* 소드 */
  50: { personal: "invert", spiritual: "invert" }, // Ace Swords
  52: { love: "invert", personal: "invert" }, // 3 Swords
  54: { personal: "invert", health: "invert" }, // 5 Swords
  55: { health: "invert", personal: "invert" }, // 6 Swords
  56: { personal: "invert", career: "invert" }, // 7 Swords
  58: { health: "invert", personal: "invert" }, // 9 Swords
  59: { health: "invert", personal: "invert" }, // 10 Swords

  /* 펜타클 */
  65: { finance: "invert", career: "invert" }, // 2 Pentacles
  66: { career: "invert", finance: "invert" }, // 3 Pentacles
  68: { finance: "invert", career: "invert" }, // 5 Pentacles
  69: { career: "invert", finance: "invert" }, // 6 Pentacles
  70: { career: "invert", personal: "invert" }, // 7 Pentacles
  71: { career: "invert", finance: "invert" }, // 8 Pentacles
  72: { finance: "invert", personal: "invert" }, // 9 Pentacles
};



