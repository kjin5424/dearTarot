# Progress (현재 진행 상황)

## 현재 단계: Phase 3 — 씬 구현 (placeholder)

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

### 미완료 (다음 세션)

- [ ] Phase 3: ForestIntroScene — 배경 + 카메라 이동
- [ ] Phase 3: WitchCircleScene — 8명 소녀 원형 배치 + 회전
- [ ] Phase 3: WitchApproachScene — 소녀 walkTo + DialogBox
- [ ] Phase 3: ShuffleScene — 카드 셔플 애니메이션
- [ ] Phase 3: DrawScene — 카드 선택 인터랙션
- [ ] Phase 3: ReturnScene — 카메라 복귀 + 손흔들기

## 핵심 결정 사항

- Vue 주도 + PixiJS 렌더링 아키텍처
- vue-router 미사용 (씬 기반 전환)
- AI 해석은 타로 상수 완성 후 구현 (현재 mock)
- 에셋 없음 → placeholder-first 전략
- 8명의 양머리 소녀 원형 집회
