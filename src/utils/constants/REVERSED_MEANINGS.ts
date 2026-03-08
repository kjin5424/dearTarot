// invert: 정방향 의미의 반전(정반대 방향으로 해석)
// weaken: 의미가 반대로 바뀌기보다는 지연·막힘·약화

// 1. 데이터 일관성 체크 (Card ID)
// MAJOR_REVERSED_LOGIC과 CARD_REVERSED_OVERRIDE의 ID 체계가 일치하는지 확인이 필요합니다.

// 2. weaken 로직의 정량화
// 앞서 만든 EMOTION_VECTOR(VAD)와 연동할 때 weaken을 어떻게 처리할지 정의하면 좋습니다.
// - 제안: weaken일 경우 Arousal을 30% 감소시키고, Dominance를 20% 낮추는 식의 연산 함수를 만들면 AI가 "기운이 빠진, 지연되는" 톤으로 말하게 유도할 수 있습니다.

// 3. invert 로직의 정량화
// - 제안: invert일 경우 Valence의 부호를 반전시키거나(v * -1), 1.0 - v 형태의 연산을 적용하여 긍/부정을 교체할 수 있습니다.

// 제안: advice 항목이 대부분 invert인 것을 활용해, "역방향은 틀린 게 아니라, 잠시 멈춰서 다르게 생각해보라는 신호예요"라는 식의 Healing Bridge Phrase를 생성 로직에 포함하면 서비스의 색깔이 더 분명해질 것 같습니다.

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
  /* Major Arcana */
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

  /* Wands */
  23: { career: "invert", personal: "invert" }, // 2 Wands
  24: { career: "invert", personal: "invert" }, // 3 Wands
  27: { career: "invert", personal: "invert" }, // 6 Wands
  28: { love: "invert", personal: "invert" }, // 7 Wands
  29: { health: "invert", personal: "invert" }, // 8 Wands
  31: { health: "invert", personal: "invert" }, // 10 Wands

  /* Cups */
  36: { love: "invert", spiritual: "invert", personal: "invert" }, // Ace Cups
  38: { love: "invert", personal: "invert" }, // 3 Cups
  39: { love: "invert", personal: "invert" }, // 4 Cups
  41: { love: "invert", personal: "invert" }, // 6 Cups
  42: { love: "invert", personal: "invert" }, // 7 Cups
  43: { love: "invert", personal: "invert" }, // 8 Cups

  /* Swords */
  50: { personal: "invert", spiritual: "invert" }, // Ace Swords
  52: { love: "invert", personal: "invert" }, // 3 Swords
  54: { personal: "invert", health: "invert" }, // 5 Swords
  55: { health: "invert", personal: "invert" }, // 6 Swords
  56: { personal: "invert", career: "invert" }, // 7 Swords
  58: { health: "invert", personal: "invert" }, // 9 Swords
  59: { health: "invert", personal: "invert" }, // 10 Swords

  /* Pentacles */
  65: { finance: "invert", career: "invert" }, // 2 Pentacles
  66: { career: "invert", finance: "invert" }, // 3 Pentacles
  68: { finance: "invert", career: "invert" }, // 5 Pentacles
  69: { career: "invert", finance: "invert" }, // 6 Pentacles
  70: { career: "invert", personal: "invert" }, // 7 Pentacles
  71: { career: "invert", finance: "invert" }, // 8 Pentacles
  72: { finance: "invert", personal: "invert" }, // 9 Pentacles
};
