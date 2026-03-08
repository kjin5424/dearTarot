# TODO (다음 작업 목록)

## Phase 1: 프로젝트 기반 설정
- [ ] `npm install pixi.js gsap howler sass`
- [ ] vite.config.ts: path alias 추가 (components, hooks, services, types, utils, pixi, stores, assets)
- [ ] vite.config.ts: sass preprocessor 설정
- [ ] tsconfig.app.json: paths 등록 (vite alias와 1:1 대응)
- [ ] main.ts: Pinia 플러그인 등록
- [ ] App.vue: 기본 구조 작성 (PixiJS 캔버스 + Vue overlay 레이어)

## Phase 2: 핵심 시스템 구현
- [ ] `src/types/index.ts` — Scene, Card, Spread 등 타입 정의
- [ ] `src/stores/useTarotStore.ts` — currentScene, drawnCards, question 등 상태
- [ ] `src/pixi/PixiApp.ts` — PIXI.Application 초기화
- [ ] `src/pixi/scenes/BaseScene.ts` — 추상 씬 클래스
- [ ] `src/pixi/SceneManager.ts` — currentScene watch → Container 교체
- [ ] `src/pixi/Camera.ts` — worldContainer y offset + GSAP
- [ ] `src/hooks/ui/usePixiCanvas.ts` — 캔버스 마운트 훅
- [ ] `src/hooks/ui/useAudio.ts` — Howler.js 오디오 훅

## Phase 4: Vue Overlay 구현
- [ ] DialogBox.vue — 타이핑 효과 대화창
- [ ] QuestionInput.vue — 고민 입력
- [ ] SpreadQuiz.vue — 스프레드 선택 대화
- [ ] KarmaOptions.vue — 카르마 3가지 선택지
- [ ] InsightPanel.vue — AI 해석 패널 (mock)
- [ ] EthicsModal.vue — 윤리 필터 모달
