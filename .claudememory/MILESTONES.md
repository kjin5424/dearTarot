# MILESTONES

## 2026-03-09 (Phase 4: Vue Overlay 구현 완료)

- DialogBox(타이핑/클릭스킵) + SpreadAsk(2단계 대화분기) + KarmaOptions + InsightPanel(페이지네이션) + EthicsModal 구현
- App.vue를 currentScene 기반 완전 분기 구조로 교체 — 10개 씬의 Vue 오버레이 연결 완성
- 윤리 필터: BLOCKED_KEYWORDS 인라인 검사 → EthicsModal로 차단(대안 제시), 통과 시 store.goTo('SPREAD_QUIZ')

## 2026-03-09 (Phase 3: 씬 구현 완료 — placeholder)

- ForestBackground/WitchGirl/WitchCircle/CardSprite/CardDeck 5개 오브젝트 + 3개 애니메이션 헬퍼 구현 (PIXI v8 Graphics, GSAP 기반)
- 10개 씬 전체 구현 완료: ForestIntro(카메라 pan) → WitchCircle(회전) → WitchApproach(walkTo) → 정적 4씬 → Shuffle(셔플) → Draw(카드 클릭) → Return(카메라 복귀)
- usePixiCanvas.ts에 10개 씬 factory 등록 완료 — SceneManager 씬 전환 파이프라인 동작 가능 상태

## 2026-03-09 (Phase 2: 핵심 시스템 구현 완료)

- SceneName/SpreadType/KarmaOption/DrawnCard 타입 정의 + useTarotStore(Pinia) currentScene 기반 씬 전환 상태 관리 체계 구축
- PixiApp(initPixiApp 함수화) / BaseScene(추상클래스) / SceneManager(watch+Container교체) / Camera(GSAP worldContainer) 4개 Pixi 핵심 클래스 완성
- usePixiCanvas 훅으로 캔버스 마운트→PixiApp 초기화→SceneManager 연결 파이프라인 완성, App.vue에 통합

## 2026-03-09 (Phase 1: 프로젝트 기반 설정 완료)

- pixi.js/gsap/howler/sass 설치 확인 + @types/howler devDep 추가로 TypeScript 타입 지원 확보
- vite.config.ts에 9개 path alias(@, @components, @hooks 등) + scss additionalData로 색상 변수 전역 자동 주입 설정
- tsconfig.app.json paths/baseUrl 등록, main.ts Pinia 플러그인 연결, App.vue canvas+overlay 이중 레이어 기본 구조 완성

## 2026-03-09 (Phase 0: 문서 정리 및 기반 설계 완료)

- CLAUDE.md 섹션 5/6/7 보충 완료: 디자인 원칙(Top-down, Vue 주도, Placeholder-first), 제약사항(미설치 의존성, 에셋 없음), 비즈니스 로직(10개 씬 플로우, 카르마 교환, 윤리 필터)
- productContext.md에 상세 내러티브 플로우 추가: FOREST_INTRO~RETURN 전체 스토리 흐름과 대사 예시 문서화
- progress.md / todo.md / MILESTONES.md 신규 생성으로 Memory Bank 체계 완성
