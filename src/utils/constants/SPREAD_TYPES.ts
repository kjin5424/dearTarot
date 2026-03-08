// 타로 배열 방식
export const SPREAD_TYPES = {
  ONE_CARD: {
    name: "One Card",
    description: "Yes or No, 빠른 답변이 필요할 때",
    count: 1,
    positions: ["결과/조언"],
  },
  THREE_CARD: {
    name: "Three Card",
    description: "과거, 현재, 미래 및 관계 해석",
    count: 3,
    positions: ["과거(원인)", "현재(상황)", "미래(결과)"],
  },
  FOUR_CARD: {},
  FIVE_CARD: {},
  CELTIC_CROSS: {
    name: "켈틱 크로스",
    count: 10,
    positions: [
      "현재상황",
      "장애물",
      "무의식",
      "과거",
      "의식/목표",
      "가까운 미래",
      "자기자신",
      "주변환경",
      "희망/공포",
      "최종결과",
    ],
  },
  RELATIONSHIP: {},
  HORSESHOE: {},
  MAGIC_SEVEN: {},
};
