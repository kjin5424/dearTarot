# Progress (현재 진행 상황)

## 현재 단계: Phase 0 — 문서 정리 및 기반 설계

### 완료 (2026-03-09)

- [x] CLAUDE.md 워크플로우 전략 수립 (섹션 0~4)
- [x] .claudememory/ 컨텍스트 문서 작성 (productContext, projectBrief, systemPatterns, techContext)
- [x] 컬러 테마 정의 (`_color-theme.scss` — 5개 그룹)
- [x] CLAUDE.md 섹션 5(Design Principles), 6(Constraints), 7(Business Logic) 보충
- [x] 상세 내러티브 플로우 문서화 (productContext.md)
- [x] progress.md / todo.md / MILESTONES.md 생성

### 미완료 (다음 세션)

- [ ] Phase 1: 의존성 설치 (pixi.js, gsap, howler, sass)
- [ ] Phase 1: vite.config.ts 설정 (path alias, svgr)
- [ ] Phase 1: tsconfig paths 등록
- [ ] Phase 2: 핵심 시스템 구현 (SceneManager, Camera, BaseScene, PixiApp)
- [ ] Phase 2: Pinia store (useTarotStore — currentScene 기반)
- [ ] Phase 3: 씬 구현 (placeholder 에셋 사용)

## 핵심 결정 사항

- Vue 주도 + PixiJS 렌더링 아키텍처
- vue-router 미사용 (씬 기반 전환)
- AI 해석은 타로 상수 완성 후 구현 (현재 mock)
- 에셋 없음 → placeholder-first 전략
- 8명의 양머리 소녀 원형 집회
