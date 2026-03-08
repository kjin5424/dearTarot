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

### 미완료 (Phase 5 작업 대기)

- [ ] 5-A: cardHelpers 구현 → DrawScene 연결
- [ ] 5-B: mock 해석 고도화 → InsightPanel 연결
- [ ] 5-C: localStorage 구현
- [ ] 5-D: karmaApi 구현 → KarmaOptions 연결
- [ ] 5-E: useSceneTransition 구현 → App.vue 교체
- [ ] 5-F: pixiHelpers/pixiLoader 구현

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
