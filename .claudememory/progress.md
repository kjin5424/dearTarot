# Progress (현재 진행 상황)

## 현재 단계: Phase 4 — Vue Overlay 구현

### 완료 (2026-03-09)

- [x] CLAUDE.md 워크플로우 전략 수립 (섹션 0~4, 5~7)
- [x] .claudememory/ 컨텍스트 문서 작성 (productContext, projectBrief, systemPatterns, techContext)
- [x] 컬러 테마 정의 (`_color-theme.scss` — 5개 그룹)
- [x] 상세 내러티브 플로우 문서화 (productContext.md)
- [x] progress.md / todo.md / MILESTONES.md 생성
- [x] Phase 1: pixi.js/gsap/howler/sass 설치 확인, @types/howler 추가
- [x] Phase 1: vite.config.ts path alias 9개 + scss additionalData 설정
- [x] Phase 1: tsconfig.app.json baseUrl/paths 등록
- [x] Phase 1: main.ts Pinia 플러그인 등록
- [x] Phase 1: App.vue canvas + vue-overlay 이중 레이어 구조
- [x] CLAUDE.md 3-5 MILESTONES 작성 형식 규칙 추가 (최신순 삽입)

- [x] Phase 2: `src/types/index.ts` — SceneName/SpreadType/KarmaOption/DrawnCard 타입 추가
- [x] Phase 2: `src/stores/useTarotStore.ts` — currentScene, question, spreadType, karmaOption, drawnCards
- [x] Phase 2: `src/pixi/PixiApp.ts` — initPixiApp(canvas) async 함수
- [x] Phase 2: `src/pixi/scenes/BaseScene.ts` — PIXI.Container 추상 클래스 (enter/exit)
- [x] Phase 2: `src/pixi/SceneManager.ts` — register/goTo/watchStore
- [x] Phase 2: `src/pixi/Camera.ts` — worldContainer + GSAP moveTo/reset
- [x] Phase 2: `src/hooks/ui/usePixiCanvas.ts` — storeToRefs + SceneManager 연결
- [x] Phase 2: `src/hooks/ui/useAudio.ts` — Howler.js (이미 완성)
- [x] Phase 2: `src/App.vue` — usePixiCanvas 훅 통합

- [x] Phase 3: Objects — ForestBackground / WitchGirl / WitchCircle / CardSprite / CardDeck
- [x] Phase 3: Animations — cameraAnimation / characterAnimation / shuffleAnimation
- [x] Phase 3: ForestIntroScene — 배경 + 카메라 이동 → auto goTo(WITCH_CIRCLE)
- [x] Phase 3: WitchCircleScene — 8명 원형 회전 → auto goTo(WITCH_APPROACH)
- [x] Phase 3: WitchApproachScene — walkTo 애니메이션 → Vue 대기
- [x] Phase 3: QuestionInputScene / SpreadQuizScene / KarmaScene / ReadingScene — 정적 씬 (Vue 주도)
- [x] Phase 3: ShuffleScene — 카드 셔플 × 3 → auto goTo(DRAW)
- [x] Phase 3: DrawScene — 카드 fan + 클릭 인터랙션 → store.setDrawnCards + goTo(READING)
- [x] Phase 3: ReturnScene — 손흔들기 + 카메라 복귀 → store.reset + goTo(FOREST_INTRO)
- [x] Phase 3: usePixiCanvas.ts — 10개 씬 전체 register 완료

- [x] Phase 4: DialogBox.vue — 타이핑 효과 RPG 대화창 (클릭 스킵, done emit)
- [x] Phase 4: QuestionInput.vue — 고민 입력 textarea + 검증
- [x] Phase 4: SpreadAsk.vue — 2단계 대화 분기로 스프레드 결정
- [x] Phase 4: KarmaOptions.vue — 카르마 3가지 선택지 (DIARY/DONATION/AD)
- [x] Phase 4: InsightPanel.vue — mock AI 해석 + 카드 페이지네이션
- [x] Phase 4: EthicsModal.vue — 차단 메시지 + 대안 제시
- [x] Phase 4: App.vue — currentScene 기반 씬별 오버레이 분기 완성

### 미완료 (다음 세션)

## 핵심 결정 사항

- Vue 주도 + PixiJS 렌더링 아키텍처
- vue-router 미사용 (씬 기반 전환)
- AI 해석은 타로 상수 완성 후 구현 (현재 mock)
- 에셋 없음 → placeholder-first 전략
- 8명의 양머리 소녀 원형 집회
