# HISTORY (완료 작업 아카이브)

## Opus 전수 검토 — haiku 작업 검증 (2026-03-09)

**검토 범위:** src/utils/constants/ 38개 .ts 파일 + src/services/api/example.md

**haiku가 완료한 것 (검증 통과):**
- EMOTION_VECTOR.ts: `toGlobalCardId` + `EMOTION_VECTOR_BY_CARD_ID` — Minor 0-55 → 전역 22-77 변환 ✓
- SPREAD_TYPES.ts: 8개 스프레드(one_card~magic_seven) 메타데이터 완성 ✓
- SPREAD_POSITION_MEANING.ts: 8개 스프레드 포지션 역할/coreMeaning 완성 ✓
- GRID_INTERPRETATIONS.ts: 9개 셀(좌상단~우하단) label/role/meaning/focus 완성 ✓
- TAROT_CONTEXT_MEANINGS.ts: 동적 생성 78장 × 7컨텍스트 구조 ✓ (품질은 템플릿)
- TAROT_MEANINGS.ts: 동적 생성 78장 core/light/shadow/context 구조 ✓ (품질은 복사)
- SEMENTIC_TAG.ts: normalizeSemanticCardId + SEMANTIC_TAGS/SEMANTIC_TAG export 호환 ✓

**haiku가 미처리/미흡:**
- SEMENTIC_TAG.ts 파일명 미변경 (SEMANTIC_TAG.ts로 rename 필요)
- 원본 `SEMENTIG_TAG` export (T→G 추가 오타 발견)
- 원본 Cups(64-77)/Pentacles(78-91) cardId 미수정 (normalizer로 런타임 변환만)
- CARD_COMBINATION_RULE.ts Minor 조합 규칙 없음 (Major만 200+개)
- CARD_DATA.ts 샘플 1장(Fool)만 — TAROT_CARDS.ts(78장)와 역할 중복
- CONTEXT_TAGS.ts 한글 키 (우선순위/theme편향/emotion편향/energy편향) 비일관성

**신규 정리:**
- api-strategy.md 생성: API 플랫폼 비교, AI 접목 전략, 이미지 소스, 카르마 기부 링크
- example.md 핵심 내용: OpenAI SDK 호환, JSON 출력 강제, 캐싱 전략, 하이브리드 비용 모델

---

## 타로 상수 리서치 결과 (2026-03-09)

**상수 데이터 검토 범위:**
- 40개 타로 해석 상수 파일 분석
- CRITICAL/HIGH/MEDIUM/LOW 이슈 분류 (총 15개)
- 반영 완료: 감정 벡터 보정, One Card 스프레드, 시각 심리 3개(좌표/시선/색채), 확언/공간 2개 파일

**미반영 CRITICAL 이슈:**
1. SEMENTIC_TAG.ts → SEMANTIC_TAG.ts 파일명 오타 미수정
2. EMOTION_VECTOR.ts Minor Arcana 자체 ID 0-55 (전역 22-77로 통일 필요)
3. SPREAD_TYPES.ts 5개 스프레드 중 2-3개만 정의됨

**미반영 HIGH 이슈:**
1. TAROT_CONTEXT_MEANINGS.ts cardId 0-63에 finance/personal/health 미완성
2. GRID_INTERPRETATIONS.ts 6개 셀 미정의 (3/9만 완성)
3. TAROT_MEANINGS.ts Minor 56장 키워드 부족 (1-2개에서 3-4개로 확대 필요)
4. CARD_COMBINATION_RULE.ts Minor 조합 규칙 없음

**아카이브 파일:** `interpretation.md` (40개 상수 흐름 정렬), `todo.md` (완료 항목 정리)
- src/utils/constants/ 내의 md 파일들은 참고용 가이드로 보존 권장

---

## Phase 5 정리 — 삭제된 파일 (2026-03-09)

- src/views/\*.vue (5개) — router 기반 페이지, 씬 전환 방식으로 미사용
- src/components/overlays/KarmaOverlay.vue — KarmaOptions.vue로 대체
- src/components/overlays/ReadingOverlay.vue — InsightPanel.vue로 대체
- src/components/tarot/Card.ts — 미사용
- src/stores/useUserStore.ts — 빈 파일
- src/config/axiosConfig.ts — 빈 파일
- src/utils/constants/CONTEXT_INTERPRETATION_LAYER.ts — TAROT_CONTEXT_MEANINGS.ts로 통합
- src/components/common/Button.vue, Loading.vue — 빈 파일

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
