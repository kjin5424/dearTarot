# AI 타로 해석 상수 조합 가이드

아래 표는 `src/utils/constants` 내부 상수 파일을 실제 해석 흐름 기준으로 정렬한 것입니다.

| 순서 | 파일 | 역할 |
|---|---|---|
| 1 | `INTERPRETATION_CONTEXT_SCHEMA.ts` | 입력 컨텍스트 정규화 및 alias 매핑 |
| 2 | `QUESTION_TYPE_INFERENCE_RULES.ts` | 질문 문장에서 질문 유형 추론 |
| 3 | `QUESTION_TYPE_MERGE_RULES.ts` | 복수 질문 유형 충돌 병합 |
| 4 | `SPREAD_SELECTION_RULE.ts` | 질문 유형 기준 스프레드 추천 |
| 5 | `SPREAD_TYPES.ts` | 스프레드 메타데이터(카드 수/난이도) |
| 6 | `SPREAD_POSITION_MEANING.ts` | 스프레드 포지션의 해석 역할/핵심 의미 |
| 7 | `POSITION_WEIGHT.ts` | 포지션/역할별 영향 가중치 |
| 8 | `SPATIAL_PSYCHOLOGY_RULES.ts` | 9분할 공간 심리 규칙 및 전이 규칙 |
| 9 | `GRID_INTERPRETATIONS.ts` | 9분할 그리드 리딩 보조 해석 |
| 10 | `TAROT_CARDS.ts` | 78장 카드 기본 메타데이터 |
| 11 | `CARD_DATA.ts` | 서비스 확장 카드 스키마/미디어/속성 |
| 12 | `TAROT_MEANINGS.ts` | 카드 기본 해석 데이터 |
| 13 | `TAROT_CONTEXT_MEANINGS.ts` | 컨텍스트별 카드 해석 블록 |
| 14 | `SEMENTIC_TAG.ts` | 카드별 semantic tag, polarity, 감정 태그 |
| 15 | `CONTEXT_TAGS.ts` | 컨텍스트별 편향 가중치(theme/emotion/energy) |
| 16 | `SITUATION_WEIGHT.ts` | 카드-상황 기본 영향도 |
| 17 | `SUIT_INFO.ts` | 수트별 성향/보정 힌트 |
| 18 | `REVERSED_MEANINGS.ts` | 역방향 카드(invert/weaken) 정책 |
| 19 | `EMOTION_VECTOR.ts` | 카드별 감정 벡터(VAD) |
| 20 | `SYMBOL_COORDINATES.ts` | 카드 상징물 위치 좌표(정규화) |
| 21 | `GAZE_DIRECTION_RULES.ts` | 시선 방향 및 흐름 해석 규칙 |
| 22 | `COLOR_PALETTE_ANALYSIS.ts` | 카드 색채 심리 상수 및 컨텍스트 해석 |
| 23 | `TAG_COMBINATION_RULES.ts` | 태그 조합에 따른 의미/감정 보정 |
| 24 | `CARD_COMBINATION_RULE.ts` | 카드 조합에 따른 위험/기회 보정 |
| 25 | `INTERPRETATION_CONFLICT_RULES.ts` | 상충 신호 해소 우선순위 |
| 26 | `SCORING_STRUCTURE.ts` | 점수 컴포넌트/정규화/신뢰도 구간 |
| 27 | `SPREAD_INTERPRETATION_RULES.ts` | 스프레드별 종합 출력 구조 규칙 |
| 28 | `SPREAD_INTERPRETATION_TEMPLATES.ts` | 스프레드별 문장 템플릿 |
| 29 | `PERSONALIZED_INTERPRETATION_PROFILE.ts` | 개인화 프로필 스키마/기본값 |
| 30 | `prompts.ts` | 프롬프트 템플릿 및 프로필 주입 빌더 |
| 31 | `HEALING_AFFIRMATIONS.ts` | 카드ID+극성+컨텍스트 1:1 치유 확언 |
| 32 | `INTERPRETATION_HOOK.ts` | 전처리/후처리 훅 정의 |
| 33 | `INTERPRETATION_ENGINE_BLUEPRINT.ts` | 엔진 단계 청사진/출력 계약 |
| 34 | `AI_INTERPRETATION_PIPELINE.ts` | 단계 순서/가중치/엔진 설정 |
| 35 | `INTERPRETATION_ENGINE.ts` | 실제 해석 엔진 함수 구현 |
| 36 | `INTERPRETATION_QUALITY_BENCHMARKS.ts` | 데이터 품질 최소 기준(전문성 기준선) |
| 37 | `CONSTANTS_VALIDATION_RULES.ts` | 상수 검증 규칙(범위/형식/무결성) |
| 38 | `CONSTANTS_VALIDATOR.ts` | 자동 검증 함수 구현 |
| 39 | `SHUFFLE_TYPES.ts` | 셔플 방식 메타데이터 |
| 40 | `index.ts` | constants 배럴 export 진입점 |

## 실제 해석 실행 순서 요약
1. 입력 정규화: 컨텍스트/질문 유형/스프레드/포지션을 정규화합니다.
2. 카드 해석 점수화: 메타데이터 + 기본 의미 + 컨텍스트 의미 + semantic tag + 편향/가중치를 합산합니다.
3. 시각 심리 해석: 상징물 위치, 시선 흐름, 색채 심리, 9분할 공간 심리를 결합합니다.
4. 조합 규칙 적용: 태그 조합 규칙을 먼저, 카드 조합 규칙을 다음으로 적용합니다.
5. 감정 합성: 카드 감정 벡터를 집계하고 shift/clamp를 적용합니다.
6. 충돌 해소: 포지션 기반 충돌 규칙으로 최종 방향을 보정합니다.
7. 결과 구성: 카드별 해석, 스프레드 종합, action plan, healing affirmation, confidence, trace를 생성합니다.

## 엔진/검증 함수
- 엔진 함수: `interpretTarotReading(input)` (`INTERPRETATION_ENGINE.ts`)
- 검증 함수: `validateTarotConstants()` (`CONSTANTS_VALIDATOR.ts`)
- 품질 기준: `INTERPRETATION_QUALITY_BENCHMARKS` (`INTERPRETATION_QUALITY_BENCHMARKS.ts`)

## 이번 추가 항목의 직접 영향
- 엔진 결과에 `healingAffirmation`, `visualPsychology`, `trace.visualTrace`가 추가됩니다.
- 파이프라인 단계에 `symbol_coordinates`, `gaze_direction_rules`, `color_palette_analysis`, `spatial_psychology_rules`, `healing_affirmations`가 추가됩니다.
- 검증기에 신규 상수 누락/범위/커버리지 검사 로직이 추가됩니다.
