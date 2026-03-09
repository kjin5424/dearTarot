# constants 작업 TODO

## 완료된 항목
1. 상수 파일 주석 한국어 통일
2. 깨진 한글(인코딩 깨짐) 문자열 정리
3. 실제 해석 엔진 구현
- 파일: `INTERPRETATION_ENGINE.ts`
- 함수: `interpretTarotReading(input)`
- 포함 내용:
  - 카드 단위 점수화
  - 컨텍스트/포지션/역방향 보정
  - 태그 조합 룰 적용
  - 카드 조합 룰 적용
  - 감정 벡터 합성
  - 충돌 규칙 적용
  - confidence 계산
  - action plan 생성
  - `buildSystemPrompt` 프로필 주입
4. 상수 자동 검증기 구현
- 파일: `CONSTANTS_VALIDATOR.ts`
- 함수: `validateTarotConstants()`
- 포함 검증:
  - 카드 ID 범위/중복
  - 의미 데이터 누락
  - 컨텍스트 키 불일치/alias 사용
  - 룰 priority 범위
  - 룰 참조 카드 ID 무결성
  - 스프레드 cardCount/position 의미/가중치 일치
5. 배럴 export 반영
- 파일: `index.ts`
- 추가: `CONSTANTS_VALIDATOR`, `INTERPRETATION_ENGINE`

## 신규 완료 항목 (시각/공간/확언 확장)
1. `SYMBOL_COORDINATES.ts` 추가
- 카드별 상징물 위치(정규화 좌표) 정의
- zone(1~9) 기반 공간 연결 가능

2. `GAZE_DIRECTION_RULES.ts` 추가
- 카드 시선 방향(left/right/up/down/center) 규칙
- 컨텍스트별 흐름 보정 힌트 제공

3. `COLOR_PALETTE_ANALYSIS.ts` 추가
- 카드별 색채 팔레트 및 색채 심리 신호 정의
- 컨텍스트/극성(light/shadow)별 해석 함수 제공

4. `HEALING_AFFIRMATIONS.ts` 추가
- `CARD_ID + POLARITY + CONTEXT` 조합 1:1 매핑 생성
- 마지막 단계 치유 확언 조회 함수 제공

5. `SPATIAL_PSYCHOLOGY_RULES.ts` 추가
- 9분할 구역 심리 해석 및 구역 간 전이 규칙 정의

6. 영향 파일 업데이트
- `INTERPRETATION_ENGINE.ts`: visualPsychology/healingAffirmation 출력 반영
- `AI_INTERPRETATION_PIPELINE.ts`: 신규 단계 및 가중치 반영
- `INTERPRETATION_ENGINE_BLUEPRINT.ts`: 시각 심리 phase 및 출력 계약 확장
- `INTERPRETATION_HOOK.ts`: visual/affirmation 후처리 훅 추가
- `CONSTANTS_VALIDATOR.ts`: 신규 상수 범위/커버리지 검증 추가
- `CONSTANTS_VALIDATION_RULES.ts`: 신규 검증 규칙 추가
- `index.ts`: 신규 상수 export 추가
- `interpretation.md`: 해석 순서 표/영향 설명 업데이트

## 리서치 기반 추가 반영 (전문화)
1. 감정 벡터 중립 보정
- 파일: `EMOTION_VECTOR.ts`
- 반영: High Priestess(2), Hierophant(5), Hermit(9), Justice(11) valence를 중립 해석 방향으로 조정

2. Wands 수트 톤 보정
- 파일: `SUIT_INFO.ts`
- 반영: `coreTheme`를 `passion_vision_creation`으로 정교화, 코칭 렌즈를 의도-에너지 정렬 중심으로 수정

3. One Card 스프레드 의미 보정
- 파일: `SPREAD_TYPES.ts`
- 반영: 단일 카드 스프레드 용도를 결과 단정형이 아닌 메시지/현재 에너지 점검 중심으로 조정

4. Tower 역방향 정책 보정
- 파일: `REVERSED_MEANINGS.ts`
- 반영: personal 컨텍스트를 `invert` -> `weaken`으로 완화

5. 카드 한국어명 전문화
- 파일: `TAROT_CARDS.ts`
- 반영: 메이저 아르카나 `nameKr`를 표준 한국어 명칭 배열로 분리

6. 그리드 해석 문구 전문화
- 파일: `GRID_INTERPRETATIONS.ts`
- 반영: 1~9 전 셀을 한국어 전문 문구로 정제

7. 품질 기준 상수 신설 + validator 연동
- 파일: `INTERPRETATION_QUALITY_BENCHMARKS.ts`
- 파일: `CONSTANTS_VALIDATOR.ts`
- 반영: 키워드/조언 최소치, 룰 개수 기준 등 품질 기준 기반 경고 체계 추가

## 다음 개선 후보
1. `SYMBOL_COORDINATES`를 카드 이미지 실제 객체 검출 데이터와 동기화
2. `HEALING_AFFIRMATIONS`를 사용자 프로필 톤(직설/부드러움)에 맞춰 다중 버전화
3. 시각 심리(trace.visualTrace)를 프론트엔드 카드 하이라이트 UI와 직결
