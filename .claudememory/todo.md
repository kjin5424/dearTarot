# TODO (다음 작업 목록)

## Phase 1: 프로젝트 기반 설정 (✅완료)

- [x] `npm install pixi.js gsap howler sass`
- [x] vite.config.ts: path alias 추가 (components, hooks, services, types, utils, pixi, stores, assets)
- [x] vite.config.ts: sass preprocessor 설정
- [x] tsconfig.app.json: paths 등록 (vite alias와 1:1 대응)
- [x] main.ts: Pinia 플러그인 등록
- [x] App.vue: 기본 구조 작성 (PixiJS 캔버스 + Vue overlay 레이어)

## Phase 2: 핵심 시스템 구현 (✅완료)

- [x] `src/types/index.ts` — Scene, Card, Spread 등 타입 정의
- [x] `src/stores/useTarotStore.ts` — currentScene, drawnCards, question 등 상태
- [x] `src/pixi/PixiApp.ts` — PIXI.Application 초기화
- [x] `src/pixi/scenes/BaseScene.ts` — 추상 씬 클래스
- [x] `src/pixi/SceneManager.ts` — currentScene watch → Container 교체
- [x] `src/pixi/Camera.ts` — worldContainer y offset + GSAP
- [x] `src/hooks/ui/usePixiCanvas.ts` — 캔버스 마운트 훅
- [x] `src/hooks/ui/useAudio.ts` — Howler.js 오디오 훅

## Phase 3: 씬 구현 (placeholder) (✅완료)

- [x] ForestIntroScene — 배경 + 카메라 이동
- [x] WitchCircleScene — 8명 소녀 원형 배치 + 회전
- [x] WitchApproachScene — 소녀 walkTo + DialogBox
- [x] ShuffleScene — 카드 셔플 애니메이션
- [x] DrawScene — 카드 선택 인터랙션
- [x] ReturnScene — 카메라 복귀 + 손흔들기

## Phase 4: Vue Overlay 구현 (✅완료)

- [x] DialogBox.vue — 타이핑 효과, 클릭 스킵, done emit
- [x] QuestionInput.vue — textarea + 5자 이상 검증 + submit emit
- [x] SpreadAsk.vue — 대화 분기 2단계 (ONE_CARD / THREE_CARD / CELTIC_CROSS)
- [x] KarmaOptions.vue — 3가지 선택 + confirm emit
- [x] InsightPanel.vue — mock 해석 + 카드 페이지네이션 + done emit
- [x] EthicsModal.vue — 차단 메시지 + 대안 제시 + Transition
- [x] App.vue — currentScene 기반 오버레이 분기 (전체 씬 연결)
