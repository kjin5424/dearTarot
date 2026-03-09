/**
 * 9분할 그리드 기반 공간 심리 매핑 규칙을 정의합니다.
 * - zone: 1~9 구역
 * - psycheFocus: 해당 구역의 심리 해석 핵심
 */
export type SpatialZone = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const SPATIAL_PSYCHOLOGY_RULES = {
  zones: {
    1: {
      label: "좌상단",
      psycheFocus: "과거 신념과 자동 반응",
      axis: "과거-사고",
      promptHint: "이전 패턴이 현재 판단에 미치는 영향",
    },
    2: {
      label: "상단 중앙",
      psycheFocus: "의식적 목표와 기대",
      axis: "미래-사고",
      promptHint: "질문자가 바라는 방향과 기대치",
    },
    3: {
      label: "우상단",
      psycheFocus: "예상 시나리오와 선행 징후",
      axis: "미래-전개",
      promptHint: "가까운 미래 신호와 촉발 요인",
    },
    4: {
      label: "중앙 좌측",
      psycheFocus: "외부 환경 영향",
      axis: "외부-압력",
      promptHint: "관계/조직/환경에서 들어오는 변수",
    },
    5: {
      label: "중앙",
      psycheFocus: "핵심 심리 상태",
      axis: "핵심-현재",
      promptHint: "가장 본질적인 감정과 갈등 축",
    },
    6: {
      label: "중앙 우측",
      psycheFocus: "의사결정 게이트",
      axis: "실행-선택",
      promptHint: "흐름을 바꾸는 다음 행동 선택",
    },
    7: {
      label: "좌하단",
      psycheFocus: "무의식적 방어 패턴",
      axis: "과거-무의식",
      promptHint: "숨은 두려움/고착 패턴",
    },
    8: {
      label: "하단 중앙",
      psycheFocus: "통합/회복 과제",
      axis: "현재-회복",
      promptHint: "수용과 재정렬이 필요한 지점",
    },
    9: {
      label: "우하단",
      psycheFocus: "행동 이후 결과 심리",
      axis: "미래-결과",
      promptHint: "실행 후 안정화/확장 가능성",
    },
  } as const,

  transitionRules: [
    {
      from: 1,
      to: 5,
      meaning: "과거 신념을 현재 핵심 감정과 연결해 재해석",
    },
    {
      from: 5,
      to: 6,
      meaning: "핵심 감정을 행동 의사결정으로 전환",
    },
    {
      from: 6,
      to: 9,
      meaning: "선택 결과를 현실 계획으로 고정",
    },
    {
      from: 7,
      to: 8,
      meaning: "무의식적 불안을 수용 가능한 과제로 변환",
    },
    {
      from: 2,
      to: 3,
      meaning: "목표를 구체적 미래 시나리오로 변환",
    },
  ] as const,
};

export const resolveSpatialPsychology = (zone: number) => {
  const safeZone = Math.min(9, Math.max(1, Math.trunc(zone || 5))) as SpatialZone;
  return SPATIAL_PSYCHOLOGY_RULES.zones[safeZone];
};

export const positionToSpatialZone = (position: number): SpatialZone =>
  Math.min(9, Math.max(1, Math.trunc(position || 5))) as SpatialZone;
