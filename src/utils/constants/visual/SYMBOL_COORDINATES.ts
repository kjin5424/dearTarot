/**
 * 카드 이미지 내 상징물 위치(정규화 좌표) 데이터를 정의합니다.
 * - x, y, w, h는 0~1 범위 정규화 좌표입니다.
 * - zone은 9분할 그리드(1~9) 기준 위치를 의미합니다.
 */
import { TAROT_CARDS } from "../tarot/TAROT_CARDS";

export type SymbolCoordinate = {
  symbol: string;
  keyword: string;
  x: number;
  y: number;
  w: number;
  h: number;
  zone: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
};

const DEFAULT_MAJOR_SYMBOLS: SymbolCoordinate[] = [
  {
    symbol: "figure",
    keyword: "주체성",
    x: 0.32,
    y: 0.2,
    w: 0.34,
    h: 0.58,
    zone: 5,
  },
  {
    symbol: "sky",
    keyword: "가능성",
    x: 0.02,
    y: 0.02,
    w: 0.96,
    h: 0.22,
    zone: 2,
  },
  {
    symbol: "ground",
    keyword: "현실 기반",
    x: 0.02,
    y: 0.72,
    w: 0.96,
    h: 0.24,
    zone: 8,
  },
];

const DEFAULT_MINOR_SYMBOLS: SymbolCoordinate[] = [
  {
    symbol: "main_figure",
    keyword: "행동 주체",
    x: 0.28,
    y: 0.24,
    w: 0.42,
    h: 0.56,
    zone: 5,
  },
  {
    symbol: "suit_symbol",
    keyword: "수트 에너지",
    x: 0.66,
    y: 0.18,
    w: 0.26,
    h: 0.24,
    zone: 3,
  },
  {
    symbol: "foreground",
    keyword: "즉시 과제",
    x: 0.08,
    y: 0.68,
    w: 0.84,
    h: 0.24,
    zone: 8,
  },
];

const MAJOR_OVERRIDES: Partial<Record<number, SymbolCoordinate[]>> = {
  0: [
    {
      symbol: "cliff",
      keyword: "도약 직전",
      x: 0.66,
      y: 0.58,
      w: 0.28,
      h: 0.26,
      zone: 6,
    },
    {
      symbol: "dog",
      keyword: "직관적 경고",
      x: 0.56,
      y: 0.62,
      w: 0.16,
      h: 0.18,
      zone: 6,
    },
    {
      symbol: "sun",
      keyword: "순수한 추진력",
      x: 0.06,
      y: 0.06,
      w: 0.2,
      h: 0.18,
      zone: 1,
    },
  ],
  1: [
    {
      symbol: "wand",
      keyword: "의지",
      x: 0.63,
      y: 0.18,
      w: 0.12,
      h: 0.46,
      zone: 3,
    },
    {
      symbol: "table_tools",
      keyword: "자원 활용",
      x: 0.2,
      y: 0.58,
      w: 0.62,
      h: 0.22,
      zone: 8,
    },
    {
      symbol: "infinity",
      keyword: "집중된 잠재력",
      x: 0.4,
      y: 0.08,
      w: 0.2,
      h: 0.12,
      zone: 2,
    },
  ],
  2: [
    {
      symbol: "veil",
      keyword: "숨겨진 정보",
      x: 0.22,
      y: 0.14,
      w: 0.56,
      h: 0.58,
      zone: 5,
    },
    {
      symbol: "pillars",
      keyword: "이중성",
      x: 0.08,
      y: 0.16,
      w: 0.84,
      h: 0.66,
      zone: 5,
    },
    {
      symbol: "moon",
      keyword: "직관",
      x: 0.4,
      y: 0.04,
      w: 0.18,
      h: 0.12,
      zone: 2,
    },
  ],
  16: [
    {
      symbol: "tower",
      keyword: "구조 붕괴",
      x: 0.3,
      y: 0.12,
      w: 0.42,
      h: 0.74,
      zone: 5,
    },
    {
      symbol: "lightning",
      keyword: "급격한 각성",
      x: 0.56,
      y: 0.06,
      w: 0.26,
      h: 0.3,
      zone: 3,
    },
    {
      symbol: "falling_figures",
      keyword: "통제 상실",
      x: 0.14,
      y: 0.42,
      w: 0.74,
      h: 0.44,
      zone: 8,
    },
  ],
  17: [
    {
      symbol: "star",
      keyword: "회복 신호",
      x: 0.28,
      y: 0.04,
      w: 0.42,
      h: 0.24,
      zone: 2,
    },
    {
      symbol: "water",
      keyword: "정서 정화",
      x: 0.12,
      y: 0.46,
      w: 0.76,
      h: 0.42,
      zone: 8,
    },
    {
      symbol: "figure",
      keyword: "신뢰 회복",
      x: 0.34,
      y: 0.24,
      w: 0.28,
      h: 0.52,
      zone: 5,
    },
  ],
  19: [
    {
      symbol: "sun",
      keyword: "명료함",
      x: 0.24,
      y: 0.04,
      w: 0.5,
      h: 0.28,
      zone: 2,
    },
    {
      symbol: "child",
      keyword: "순수한 활력",
      x: 0.36,
      y: 0.34,
      w: 0.28,
      h: 0.46,
      zone: 5,
    },
    {
      symbol: "wall",
      keyword: "보호 경계",
      x: 0.06,
      y: 0.62,
      w: 0.88,
      h: 0.22,
      zone: 8,
    },
  ],
};

export const SYMBOL_COORDINATES: Record<number, SymbolCoordinate[]> =
  Object.fromEntries(
    TAROT_CARDS.map((card) => {
      const base =
        card.arcana === "Major" ? DEFAULT_MAJOR_SYMBOLS : DEFAULT_MINOR_SYMBOLS;
      const coords = MAJOR_OVERRIDES[card.id] ?? base;
      return [card.id, coords];
    }),
  );

export const getSymbolCoordinatesByCardId = (
  cardId: number,
): SymbolCoordinate[] => SYMBOL_COORDINATES[cardId] ?? [];
