# Progress (현재 진행 상황)

## 현재 단계: Phase 5 — 통합 & 데이터 연결

### 완료 (Phase 1~4, 2026-03-09)

- [x] Phase 1: 프로젝트 기반 설정 (pixi.js/gsap/howler/sass, alias, Pinia, App.vue 레이어)
- [x] Phase 2: 핵심 시스템 (types, store, PixiApp, BaseScene, SceneManager, Camera, hooks)
- [x] Phase 3: 10개 씬 + 5개 오브젝트 + 3개 애니메이션 (placeholder)
- [x] Phase 4: Vue Overlay 6개 (DialogBox, QuestionInput, SpreadAsk, KarmaOptions, InsightPanel, EthicsModal)

### Phase 5 준비 완료 (2026-03-09)

- [x] 불필요 파일 정리 (views 라우터 페이지, 빈 store/config, 중복 overlay 삭제)
- [x] 구현 필요 파일에 주석 가이드 작성 완료:
  - `src/utils/helpers/cardHelpers.ts` — 카드 셔플/뽑기/조회
  - `src/services/api/tarotApi.ts` — AI 해석 API (mock 포함)
  - `src/services/api/karmaApi.ts` — 카르마 처리
  - `src/services/local/localStorage.ts` — 세션/일기 저장
  - `src/utils/constants/prompts.ts` — AI 프롬프트 템플릿
  - `src/pixi/utils/pixiHelpers.ts` — Pixi 유틸
  - `src/pixi/utils/pixiLoader.ts` — 에셋 로더
  - `src/hooks/ui/useSceneTransition.ts` — 씬 전환 훅

### 미완료 (Phase 5-1: 타로 상수 정제 중)

**발견된 이슈** (research.md 검토 결과):
- ⏳ SEMENTIC_TAG.ts 파일명 오타 미수정 (→ SEMANTIC_TAG.ts 필요)
- ⏳ EMOTION_VECTOR.ts Minor ID 체계 미통합 (자체 0-55 ID 사용 중, 전역 22-77로 변환 필요)
- ⏳ SPREAD_TYPES.ts 5개 스프레드 일부만 정의됨
- ⏳ TAROT_CONTEXT_MEANINGS.ts 컨텍스트 0-63 미완성 (64-77 Pentacles만 완성)
- ⏳ GRID_INTERPRETATIONS.ts 6개 셀 미정의 (3/9만 완성)
- ⏳ TAROT_MEANINGS.ts Minor 키워드 부족 (1-2개, 3-4개로 확대 필요)
- ⏳ CARD_COMBINATION_RULE.ts Minor 조합 규칙 없음 (Major만 200+개)

**완료 항목** (src/utils/constants/todo.md 기준):
- ✅ INTERPRETATION_ENGINE.ts (실제 해석 엔진)
- ✅ CONSTANTS_VALIDATOR.ts (검증기)
- ✅ SYMBOL_COORDINATES.ts, GAZE_DIRECTION_RULES.ts, COLOR_PALETTE_ANALYSIS.ts (시각 심리 3개)
- ✅ HEALING_AFFIRMATIONS.ts, SPATIAL_PSYCHOLOGY_RULES.ts (확언/공간 2개)

### 다음 할 일 (Phase 5-1 & 5-2)

- [ ] 5-1-A~I: 타로 상수 정제 (CRITICAL/HIGH 우선순위)
- [ ] 5-2-A~F: 통합 & 데이터 연결 (cardHelpers, mock API, localStorage 등)

## 핵심 결정 사항

- Vue 주도 + PixiJS 렌더링 아키텍처
- vue-router 미사용 (씬 기반 전환)
- AI 해석은 타로 상수 완성 후 구현 (현재 mock)
- 에셋 없음 → placeholder-first 전략
- 8명의 양머리 소녀 원형 집회

## 삭제된 파일 (Phase 5 정리)

- src/views/*.vue (5개) — router 기반 페이지, 사용 안 함
- src/components/overlays/KarmaOverlay.vue — KarmaOptions.vue로 대체됨
- src/components/overlays/ReadingOverlay.vue — InsightPanel.vue로 대체됨
- src/components/tarot/Card.ts — 미사용
- src/stores/useUserStore.ts — 빈 파일
- src/config/axiosConfig.ts — 빈 파일
- src/utils/constants/CONTEXT_INTERPRETATION_LAYER.ts — 단일 예시 데이터, TAROT_CONTEXT_MEANINGS.ts로 통합됨
- src/components/common/Button.vue, Loading.vue — 빈 파일, Phase 7에서 필요 시 재생성
