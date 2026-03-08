// cards_ko.json, cards_en.json
// 구버전, 단, 도입할 부분은 도입할 것.
const CARD_DATA = {
  version: "1.0.0",
  last_updated: "2026-03-06",
  decks: [
    {
      deck_id: "rider-waite-classic",
      deck_name: "Rider-Waite Tarot",
      // - 점성술 카드: category를 "ASTROLOGY"로 설정하고,
      //              attributes에 "Planet", "House", "Aspect" 등의 정보를 커스텀하게 넣을 수 있습니다.
      category: "TAROT", // TAROT, ORACLE, ASTROLOGY 등
      cards: [
        {
          id: "major-00",
          index: 0,
          name: "The Fool",
          sub_title: "광대",
          // - 타로: type에 "MAJOR", "MINOR"를 넣고 attributes.suit에 "Cups", "Swords" 등을 넣습니다.
          // - 오라클 카드: 정해진 규칙이 없으므로 type을 "MESSAGE" 등으로
          //              자유롭게 정의하고 meanings 구조만 동일하게 유지하면 됩니다.
          type: "MAJOR", // MAJOR, MINOR (오라클의 경우 다른 구분값 사용)
          images: {
            default: "/assets/cards/rider-waite/00_fool.webp",
            thumbnail: "/assets/cards/rider-waite/thumbs/00_fool.webp",
          },
          attributes: {
            element: "Air",
            planet: "Uranus",
            number: 0,
            suit: null, // MINOR일 경우 "Cups", "Wands" 등 입력
          },
          meanings: {
            upright: {
              keywords: ["자유", "순수", "시작", "모험"],
              summary:
                "새로운 여정의 시작을 알립니다. 두려움 없이 발걸음을 내딛으세요.",
              advice:
                "당신의 직관을 믿고 가벼운 마음으로 시작해보는 것이 좋습니다.",
            },
            reversed: {
              keywords: ["무모함", "부주의", "불안정", "지연"],
              summary:
                "준비되지 않은 시작은 위험할 수 있습니다. 주변을 다시 살피세요.",
              advice: "충동적인 결정보다는 잠시 멈춰서 계획을 검토할 때입니다.",
            },
          },
          ai_prompts: {
            // AI에게 힌트를 줄 수 있는 symbolism 필드
            // API 호출 시 이 데이터를 프롬프트에 포함하면 AI가 훨씬 정확한 도상학적 해석을 제공
            symbolism:
              "절벽 끝의 아슬아슬함, 하얀 강아지(본능적 경고), 하얀 장미(순수함)",
            tone: "희망차지만 주의가 필요한",
          },
        },
      ],
    },
  ],
};
