# HISTORY (완료 작업 아카이브)

## Phase 4: Vue Overlay 구현 (✅ 2026-03-09)

- [x] DialogBox.vue — 타이핑 효과(40ms/char), 클릭 스킵, done emit, ▼ 프롬프트
- [x] QuestionInput.vue — textarea, 5자 검증, Ctrl+Enter 단축키
- [x] SpreadAsk.vue — 2단계 분기 대화 → ONE_CARD / THREE_CARD / CELTIC_CROSS
- [x] KarmaOptions.vue — 3가지 선택(DIARY/DONATION/AD) + confirm
- [x] InsightPanel.vue — mock 해석 3줄, 카드 페이지네이션, done emit
- [x] EthicsModal.vue — 차단 키워드 감지 시 대안 제시, Transition fade
- [x] App.vue — currentScene 기반 씬별 오버레이 분기 완성

## Phase 3: 씬 구현 — placeholder (✅ 2026-03-09)

- [x] Objects — ForestBackground / WitchGirl / WitchCircle / CardSprite / CardDeck
- [x] Animations — cameraAnimation / characterAnimation / shuffleAnimation
- [x] ForestIntroScene — 배경 + 카메라 pan → auto goTo(WITCH_CIRCLE)
- [x] WitchCircleScene — 8명 원형 회전 → auto goTo(WITCH_APPROACH)
- [x] WitchApproachScene — walkTo 애니메이션 → Vue 대기
- [x] QuestionInputScene / SpreadQuizScene / KarmaScene / ReadingScene — 정적 씬 (Vue 주도)
- [x] ShuffleScene — 카드 셔플 × 3 → auto goTo(DRAW)
- [x] DrawScene — 카드 fan + 클릭 인터랙션 → store.setDrawnCards + goTo(READING)
- [x] ReturnScene — 손흔들기 + 카메라 복귀 → store.reset + goTo(FOREST_INTRO)
- [x] usePixiCanvas.ts — 10개 씬 전체 register 완료

## Phase 2: 핵심 시스템 구현 (✅ 2026-03-09)

- [x] `src/types/index.ts` — SceneName/SpreadType/KarmaOption/DrawnCard 타입 추가
- [x] `src/stores/useTarotStore.ts` — currentScene, question, spreadType, karmaOption, drawnCards
- [x] `src/pixi/PixiApp.ts` — initPixiApp(canvas) async 함수
- [x] `src/pixi/scenes/BaseScene.ts` — PIXI.Container 추상 클래스 (enter/exit)
- [x] `src/pixi/SceneManager.ts` — register/goTo/watchStore
- [x] `src/pixi/Camera.ts` — worldContainer + GSAP moveTo/reset
- [x] `src/hooks/ui/usePixiCanvas.ts` — 캔버스 마운트 → PixiApp → SceneManager 파이프라인
- [x] `src/hooks/ui/useAudio.ts` — Howler.js (이미 완성)
- [x] `src/App.vue` — usePixiCanvas 훅 통합

## Phase 1: 프로젝트 기반 설정 (✅ 2026-03-09)

- [x] `npm install pixi.js gsap howler sass` + @types/howler
- [x] vite.config.ts: path alias 9개 + scss additionalData
- [x] tsconfig.app.json: paths 등록 (vite alias와 1:1 대응)
- [x] main.ts: Pinia 플러그인 등록
- [x] App.vue: PixiJS 캔버스 + Vue overlay 이중 레이어 구조

## Phase 0: 문서 정리 및 기반 설계 (✅ 2026-03-09)

- [x] CLAUDE.md 워크플로우 전략 수립 (섹션 0~7)
- [x] .claudememory/ 컨텍스트 문서 작성 (productContext, projectBrief, systemPatterns, techContext)
- [x] 컬러 테마 정의 (`_color-theme.scss` — 5그룹)
- [x] 상세 내러티브 플로우 문서화 (productContext.md)
- [x] progress.md / todo.md / MILESTONES.md 생성

## Phase 5 정리 — 삭제된 파일 (2026-03-09)

- src/views/*.vue (5개) — router 기반 페이지, 씬 전환 방식으로 미사용
- src/components/overlays/KarmaOverlay.vue — KarmaOptions.vue로 대체
- src/components/overlays/ReadingOverlay.vue — InsightPanel.vue로 대체
- src/components/tarot/Card.ts — 미사용
- src/stores/useUserStore.ts — 빈 파일
- src/config/axiosConfig.ts — 빈 파일
- src/utils/constants/CONTEXT_INTERPRETATION_LAYER.ts — TAROT_CONTEXT_MEANINGS.ts로 통합
- src/components/common/Button.vue, Loading.vue — 빈 파일
