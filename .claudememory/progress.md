# Progress (현재 진행 상황)

## 현재 단계: Phase 7 — 타로 상수 품질 보강 + 카드 UX

### Phase 7-A1 완료 (2026-03-13)
- [x] MAJOR_MEANINGS.ts 신규: 메이저 22장 정적 데이터 (light/shadow keywords + 6컨텍스트 한국어 해석)
- [x] TAROT_MEANINGS.ts 구조 변경: MAJOR(정적) + MINOR(동적) 합성
- [x] Phase 7 전체 계획 수립 → todo.md 기록 (A1~A4 상수품질 + B1~B3 카드UX)

### 완료 (Phase 1~4, 2026-03-09)

- [x] Phase 1: 프로젝트 기반 설정 (pixi.js/gsap/howler/sass, alias, Pinia, App.vue 레이어)
- [x] Phase 2: 핵심 시스템 (types, store, PixiApp, BaseScene, SceneManager, Camera, hooks)
- [x] Phase 3: 10개 씬 + 5개 오브젝트 + 3개 애니메이션 (placeholder)
- [x] Phase 4: Vue Overlay 6개 (DialogBox, QuestionInput, SpreadAsk, KarmaOptions, InsightPanel, EthicsModal)
- [x] Phase 5 준비: 불필요 파일 10개 삭제, stub 파일 8개에 주석 가이드 작성

### Phase 5-1: 타로 상수 정제 — 완료/미완료 현황 (Opus 검토 2026-03-09)

**완료 (haiku 처리 → Opus 검증):**
- [x] EMOTION_VECTOR.ts: `EMOTION_VECTOR_BY_CARD_ID` 전역 ID(22-77) 매핑 추가 ✓
- [x] SPREAD_TYPES.ts: 8개 스프레드 메타데이터 완성 ✓
- [x] SPREAD_POSITION_MEANING.ts: 8개 스프레드 포지션 역할/의미 완성 ✓
- [x] GRID_INTERPRETATIONS.ts: 9개 셀 모두 정의 ✓
- [x] TAROT_CONTEXT_MEANINGS.ts: 동적 생성으로 78장 × 7컨텍스트 구조 완성 (품질은 템플릿 수준)
- [x] TAROT_MEANINGS.ts: 동적 생성으로 78장 커버 (품질은 SEMANTIC_TAGS 복사 수준)

**이번 세션 완료:**
- [x] **5-1-A CRITICAL**: SEMANTIC_TAG.ts 파일명 변경 + Cups(36-49)/Pentacles(64-77) ID 직접 수정, normalizer 제거
- [x] **5-1-H**: CARD_DATA.ts 샘플 const 제거, 인터페이스 스키마만 보존 (Phase 7 활용)
- [x] **5-1-I**: CONTEXT_TAGS 한글 키 → 영어 통일 (priority/themeBias/emotionBias/energyBias)

**Phase 6 이후 (품질 보강):**
- ⏳ **5-1-D**: TAROT_CONTEXT_MEANINGS 해석 품질 — 템플릿 1줄 (AI 생성 필요)
- ⏳ **5-1-F**: TAROT_MEANINGS 키워드 품질 — light/shadow 구분 불명확
- ⏳ **5-1-G**: CARD_COMBINATION_RULE Minor 조합 규칙 없음 (Major만 200+개)

### Phase 5 구조 정리 완료 (2026-03-09)

- constants/ → 5개 서브디렉토리 분리 (tarot/10, spread/5, interpretation/9, scoring/7, visual/5)
- INTERPRETATION_ENGINE → utils/helpers/interpretationEngine.ts
- CONSTANTS_VALIDATOR → utils/helpers/constantsValidator.ts
- 배럴 export: src/types/tarot.ts (중앙 진입점)
- CONSTANTS_VALIDATION_RULES.ts — constants/ 루트에 잔류

### Phase 5-2: 통합 & 데이터 연결 — 완료 (2026-03-09)

- [x] **5-2-A**: cardHelpers.ts — shuffleArray, drawRandomCards, getCardById, getPositionLabel
- [x] **5-2-B**: tarotApi.ts — getMockInterpretation (TAROT_MEANINGS + REVERSED_MEANINGS 기반)
- [x] **5-2-C**: localStorage.ts — saveSession, getRecentSessions, clearOldSessions, saveDiaryEntry, getDiaryEntries
- [x] **5-2-D**: karmaApi.ts — processKarma(DIARY/DONATION/AD), hasCompletedKarma, getKarmaHistory
- [x] **5-2-E**: useSceneTransition.ts — transitionTo + isTransitioning, App.vue store.goTo() 전체 교체
- [x] **5-2-F**: pixiHelpers.ts + pixiLoader.ts — createRect/Circle/centerObject/fadeIn/fadeOut/pulseEffect, preloadAll/getTexture

### 추가 변경 (Phase 5-2 과정)

- SpreadType 3개 → 8개 확장 (FOUR_CARD, FIVE_CARD, RELATIONSHIP_SPREAD, HORSESHOE_SPREAD, MAGIC_SEVEN)
- DrawScene.ts: SPREAD_COUNTS 제거 → SPREAD_DEFINITIONS 단일 진실 공급원 사용
- InsightPanel.vue: spreadLabel map 8개 완비, getMockInterpretation 연결

### Phase 6: AI 해석 연동 — 완료 (2026-03-09)

- [x] `@google/generative-ai` 설치 + `.env` / `.gitignore` 세팅
- [x] `geminiClient.ts`: Gemini Flash 래퍼, 키 없으면 null graceful
- [x] `tarotApi.ts`: requestInterpretation 실제 API 호출 + 7일 캐싱 + mock fallback
- [x] `api-strategy.md` 섹션 5: 파인튜닝 ToS 비교 + 로드맵 기록

### Phase 7-A2 완료 (2026-03-13)
- [x] MINOR_MEANINGS.ts 신규: 마이너 56장 정적 데이터 (RWS 전통 해석 기반)
- [x] 슈트별 고유 light_keywords / shadow_keywords 4개씩
- [x] 56장 × 6컨텍스트(love/career/finance/health/spiritual/advice) 한국어 고유 해석 2문장씩
- [x] TAROT_MEANINGS.ts: 동적 MINOR_MEANINGS 생성 → 정적 import로 교체, SEMANTIC_TAGS/TAROT_CARDS 의존 제거

### Phase 7-A3 완료 (2026-03-13)
- [x] TAROT_CONTEXT_MEANINGS: 영어 템플릿 → MAJOR/MINOR_MEANINGS 한국어 고유 해석 연결
- [x] interpretations(첫 문장) + advice(둘째 문장) 분리, personal→spiritual 매핑
- [x] TAROT_CARDS 의존 제거, 타입 체크 통과

### 다음 할 일 (Phase 7: 타로 상수 품질 보강 + 카드 UX, 2026-03-13~)

- [x] **7-A1**: TAROT_MEANINGS 메이저 22장 고유 light/shadow keywords + 컨텍스트 해석
- [x] **7-A2**: TAROT_MEANINGS 마이너 56장 고유 키워드 + 해석
- [x] **7-A3**: TAROT_CONTEXT_MEANINGS 78장 × 7컨텍스트 고유 해석
- [ ] **7-A4**: CARD_COMBINATION_RULE Minor 조합 규칙
- [ ] **7-B1**: DrawScene 클릭 카드 = 실제 뽑힌 카드 연결
- [ ] **7-B2**: ReadingScene 원카드 직접 뒤집기 UX
- [ ] **7-B3**: ReadingScene 다카드 자동 순차 뒤집기 + 해석 동기화
- [ ] **Phase 8**: 에셋 확보 및 pixiLoader ASSET_MANIFEST 실제 경로 교체
- [ ] **Phase 후반**: API 키 보호 프록시 서버 or Edge Function 도입

## 핵심 결정 사항

- Vue 주도 + PixiJS 렌더링 아키텍처
- vue-router 미사용 (씬 기반 전환)
- TAROT_CARDS.ts가 78장 정본 (다른 상수가 import)
- AI 해석: 프롬프트 엔지니어링 → RAG → 파인튜닝 단계별 접근
- 이미지: metabismuth/tarot-json RWS 스캔 (350x600px, MIT)
- 카르마 기부: GreaterGood / Brother Click for the Earth
- API 전략: .claudememory/api-strategy.md 참조

## 삭제된 파일 (Phase 5 정리)

- src/views/*.vue (5개) — router 기반, 미사용
- src/components/overlays/KarmaOverlay.vue, ReadingOverlay.vue — 대체됨
- src/components/tarot/Card.ts, src/stores/useUserStore.ts, src/config/axiosConfig.ts — 빈 파일
- src/utils/constants/CONTEXT_INTERPRETATION_LAYER.ts — TAROT_CONTEXT_MEANINGS로 통합
- src/components/common/Button.vue, Loading.vue — 빈 파일
- src/utils/constants/todo.md, interpretation.md — HISTORY에 백업 후 삭제
- .claudememory/research.md — HISTORY에 백업 후 삭제
