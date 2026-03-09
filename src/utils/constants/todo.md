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

## 다음 개선 후보
1. `SYMBOL_COORDINATES`를 카드 이미지 실제 객체 검출 데이터와 동기화
2. `HEALING_AFFIRMATIONS`를 사용자 프로필 톤(직설/부드러움)에 맞춰 다중 버전화
3. 시각 심리(trace.visualTrace)를 프론트엔드 카드 하이라이트 UI와 직결
