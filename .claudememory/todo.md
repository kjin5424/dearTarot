# TODO (다음 작업 목록)

## Phase 5-1: 타로 상수 데이터 정제 (2026-03-09)

### 5-1-A. CRITICAL: SEMENTIC_TAG.ts 파일명 및 ID 정규화
- [ ] 파일명: `SEMENTIC_TAG.ts` → `SEMANTIC_TAG.ts` 변경
- [ ] export 이름도 `SEMANTIC_TAG`로 통일
- [ ] Cups cardId: 64-77 → **36-49**로 정정
- [ ] Pentacles cardId: 78-91 → **64-77**로 정정
- [ ] index.ts export 업데이트
- [ ] 관련 import 경로 전체 교체 (`grep -r "SEMENTIC"`)

### 5-1-B. CRITICAL: EMOTION_VECTOR.ts Minor Arcana ID 체계 통합
- [ ] Minor 54장을 자체 ID 0-55에서 **전역 cardId 22-77**로 변환
  - Wands: 0-13 → 22-35
  - Cups: 14-27 → 36-49
  - Swords: 28-41 → 50-63
  - Pentacles: 42-55 → 64-77
- [ ] EMOTION_VECTOR_BY_CARD_ID 추가 (전역 ID 기반 조회용)
- [ ] import 관계 파일 검증 (AI_INTERPRETATION_PIPELINE.ts 등)

### 5-1-C. HIGH: SPREAD_TYPES.ts 5개 스프레드 완성
- [ ] `FOUR_CARD`: 상황/장애/조언/결과
- [ ] `FIVE_CARD`: 현재/과거/미래/이유/잠재력
- [ ] `RELATIONSHIP`: 나/상대/관계/조언/결과
- [ ] `HORSESHOE`: 과거/현재/숨겨진/장애물/주변/행동/결과
- [ ] `MAGIC_SEVEN`: 과거/현재/미래/최선행동/주변/희망두려움/결과

### 5-1-D. HIGH: TAROT_CONTEXT_MEANINGS.ts 컨텍스트 통일
- [ ] cardId 0-63: love/career/finance/personal/health 5개 컨텍스트 모두 채우기
- [ ] `finance` vs `money` 키 혼용 제거 (통일값 결정)
- [ ] Pentacles(64-77)와 일관성 검증

### 5-1-E. HIGH: GRID_INTERPRETATIONS.ts 9칸 완성
- [ ] Cell 1(좌상), 3(우상), 4(좌중), 6(우중), 7(좌하), 9(우하) 정의

### 5-1-F. HIGH: TAROT_MEANINGS.ts Minor 56장 키워드 보강
- [ ] Wands/Cups/Swords/Pentacles 각 14장씩 core/light/shadow 보강
- [ ] 현재 1-2개에서 3-4개로 확대

### 5-1-G. MEDIUM: CARD_COMBINATION_RULE.ts Minor 조합 추가
- [ ] 같은 슈트 3장 이상 원소 에너지 강화
- [ ] 같은 숫자 조합 (예: 5가 3장 = 극심한 갈등)
- [ ] Major + Minor 크로스 조합

### 5-1-H. MEDIUM: CARD_DATA.ts vs TAROT_CARDS.ts 역할 정리
- [ ] 정본 파일 결정 후 하나 통합/삭제

### 5-1-I. OPTIONAL: 데이터 확인 & 테스트
- [ ] `npm run test:constants` (자동 검증 실행)
- [ ] CONSTANTS_VALIDATOR로 범위/중복/누락 검증

## Phase 5-2: 통합 & 데이터 연결

### 5-2-A. 카드 헬퍼 구현 (cardHelpers.ts)
- [ ] shuffleArray — Fisher-Yates 셔플
- [ ] drawRandomCards — 스프레드별 카드 뽑기 + 역방향 30%
- [ ] getCardById — ID로 카드 조회
- [ ] getPositionLabel — 스프레드 위치명 반환
- [ ] DrawScene.ts에서 cardHelpers 사용하도록 연결

### 5-2-B. Mock 해석 고도화 (tarotApi.ts → getMockInterpretation)
- [ ] TAROT_MEANINGS + REVERSED_MEANINGS 데이터 기반 mock 해석 생성
- [ ] InsightPanel.vue의 하드코딩된 mock을 tarotApi.getMockInterpretation()으로 교체
- [ ] position(과거/현재/미래 등) 맥락 반영

### 5-2-C. 로컬 저장소 (localStorage.ts)
- [ ] saveSession / getRecentSessions 구현
- [ ] clearOldSessions (30일 초과 자동 삭제)
- [ ] 카르마 일기 저장/조회 (saveDiaryEntry / getDiaryEntries)

### 5-2-D. 카르마 처리 (karmaApi.ts)
- [ ] processKarma — 옵션별 분기 처리
- [ ] hasCompletedKarma — 오늘 완료 여부
- [ ] KarmaOptions.vue에서 karmaApi 호출 연결

### 5-2-E. 씬 전환 훅 (useSceneTransition.ts)
- [ ] transitionTo 함수 + isTransitioning 상태
- [ ] App.vue에서 store.goTo() → transitionTo()로 교체
- [ ] Vue overlay 페이드 트랜지션 CSS 적용

### 5-2-F. Pixi 유틸리티 (pixiHelpers.ts / pixiLoader.ts)
- [ ] createRect / createCircle / centerObject 헬퍼
- [ ] fadeIn / fadeOut / pulseEffect GSAP 래퍼
- [ ] pixiLoader — 에셋 로딩 구조 (에셋 확보 후 사용)

## Phase 6: AI 해석 연동 (대기)

- [ ] prompts.ts — SYSTEM_PROMPT + buildUserPrompt 작성
- [ ] tarotApi.ts — requestInterpretation 실제 API 호출 구현
- [ ] 프록시 서버 or Edge Function 결정 (API 키 보호)
- [ ] InsightPanel.vue에서 실제 AI 해석으로 교체

## Phase 7: 에셋 & 폴리시 (대기)

- [ ] 픽셀아트 스프라이트시트 제작 (소녀, 숲, 카드)
- [ ] pixiLoader.ts로 에셋 프리로딩
- [ ] placeholder → 실제 에셋 교체
- [ ] 오디오 파일 추가 (forest-ambient, shuffle, cardflip, magic)
- [ ] SpreadLayout.vue — 켈틱크로스 시각적 배치
- [ ] Loading.vue — 에셋 로딩 화면

---

## 완료 아카이브

### Phase 1~4 (✅완료) → HISTORY.md 참조
