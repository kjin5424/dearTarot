# TODO (다음 작업 목록)

## Phase 5-1: 타로 상수 데이터 정제 (2026-03-09)

### ~~5-1-A. CRITICAL: SEMENTIC_TAG.ts → SEMANTIC_TAG.ts 파일명/데이터 정규화~~
- [x] ✅ 파일명 변경, SEMANTIC_TAGS 직접 export, Cups(36-49)/Pentacles(64-77) ID 수정, normalizer 제거

### 5-1-B. ~~CRITICAL: EMOTION_VECTOR.ts Minor Arcana ID 체계 통합~~
- [x] ✅ haiku가 `toGlobalCardId` + `EMOTION_VECTOR_BY_CARD_ID` export 추가로 해결
- [ ] (선택) 원본 데이터 자체를 전역 ID로 수정하고 변환 함수 제거

### ~~5-1-C. HIGH: SPREAD_TYPES.ts 스프레드 완성~~
- [x] ✅ SPREAD_DEFINITIONS 8개 스프레드 메타데이터 정의 완료
- [x] ✅ SPREAD_POSITION_MEANINGS 8개 스프레드 포지션 역할/의미 정의 완료

### 5-1-D. HIGH: TAROT_CONTEXT_MEANINGS.ts 카드별 고유 해석
- [x] ✅ 동적 생성으로 78장 × 7컨텍스트 구조 완성 (haiku)
- [ ] 품질 이슈: 모든 해석이 `supportive momentum` / `friction and caution` 템플릿 1줄
- [ ] AI 프롬프트로 카드별/컨텍스트별 고유 해석 텍스트 생성 필요 (Phase 6 이후)

### ~~5-1-E. HIGH: GRID_INTERPRETATIONS.ts 9칸 완성~~
- [x] ✅ 9개 셀 모두 label/role/meaning/focus 정의 완료 (haiku)

### 5-1-F. HIGH: TAROT_MEANINGS.ts Minor 키워드 품질 개선
- [x] ✅ 동적 생성으로 78장 전체 커버 (haiku)
- [ ] 품질 이슈: core_keywords가 SEMANTIC_TAGS.themes 복사본, light/shadow 구분 불명확
- [ ] AI 또는 수동으로 카드별 고유 light_keywords/shadow_keywords 보강 (Phase 6 이후)

### 5-1-G. MEDIUM: CARD_COMBINATION_RULE.ts Minor 조합 추가
- [ ] 같은 슈트 3장 이상 원소 에너지 강화 규칙
- [ ] 같은 숫자 조합 (예: 5가 3장 = 극심한 갈등)
- [ ] Major + Minor 크로스 조합

### ~~5-1-H. MEDIUM: CARD_DATA.ts vs TAROT_CARDS.ts 역할 정리~~
- [x] ✅ CARD_DATA const(샘플 1장) 제거, 인터페이스(CardDataItem/CardDataDeck/CardCategory/CardType)만 보존 — Phase 7에서 활용 예정

### ~~5-1-I. LOW: CONTEXT_TAGS.ts 한글 키 통일~~
- [x] ✅ priority / themeBias / emotionBias / energyBias 로 통일 완료

### 5-1-J. OPTIONAL: 데이터 검증
- [ ] CONSTANTS_VALIDATOR로 ID 범위/중복/누락 검증
- [ ] 78장 전체 cardId 연속성 확인 (0-77)

### ~~5-1-X. constants/ 디렉토리 구조 개편~~
- [x] ✅ 5개 서브디렉토리 분리: tarot/(10) spread/(5) interpretation/(9) scoring/(7) visual/(5)
- [x] ✅ INTERPRETATION_ENGINE → src/utils/helpers/interpretationEngine.ts
- [x] ✅ CONSTANTS_VALIDATOR → src/utils/helpers/constantsValidator.ts
- [x] ✅ 배럴 진입점: src/types/tarot.ts, 모든 내부 import 경로 수정 완료

## ~~Phase 5-2: 통합 & 데이터 연결~~ (✅완료 2026-03-09)

- [x] 5-2-A: cardHelpers.ts (shuffleArray, drawRandomCards, getCardById, getPositionLabel)
- [x] 5-2-B: tarotApi.ts getMockInterpretation + InsightPanel 연결
- [x] 5-2-C: localStorage.ts (세션/일기 저장소)
- [x] 5-2-D: karmaApi.ts (DIARY/DONATION/AD 분기)
- [x] 5-2-E: useSceneTransition.ts + App.vue 연결
- [x] 5-2-F: pixiHelpers.ts + pixiLoader.ts

## ~~Phase 6: AI 해석 연동~~ (✅완료 2026-03-09)

- [x] `@google/generative-ai` 설치 + `.env` VITE_GOOGLE_API_KEY, `.gitignore` 추가
- [x] `geminiClient.ts` — Gemini Flash 클라이언트 래퍼 (키 없으면 null graceful)
- [x] `tarotApi.ts` — requestInterpretation 실제 Gemini API 호출 + 7일 캐싱 + mock fallback
- [ ] 프록시 서버 or Edge Function (API 키 보호) → Phase 후반

## Phase 7: 타로 상수 품질 보강 + 카드 UX (2026-03-13)

### 7-A. 타로 상수 품질 보강

#### ~~7-A1. TAROT_MEANINGS.ts — 메이저 22장 고유 데이터 (5-1-F 해소)~~
- [x] ✅ 동적 생성 → `MAJOR_MEANINGS.ts` 정적 데이터 분리
- [x] ✅ 메이저 22장: 카드별 고유 light_keywords / shadow_keywords (RWS 전통 해석 기반)
- [x] ✅ 메이저 22장: love/career/finance/health/spiritual/advice 한국어 고유 해석 (2문장씩)
- [x] ✅ `TAROT_MEANINGS.ts`: MAJOR_MEANINGS + MINOR(동적생성) 합성 구조
- 파일: `MAJOR_MEANINGS.ts` (신규), `TAROT_MEANINGS.ts` (수정)

#### ~~7-A2. MINOR_MEANINGS.ts — 마이너 56장 고유 데이터 (5-1-F 해소)~~
- [x] ✅ MINOR_MEANINGS.ts 신규: 56장 정적 데이터 (RWS 전통 해석 기반)
- [x] ✅ 슈트별 고유 light/shadow keywords + 6컨텍스트 한국어 해석 2문장씩
- [x] ✅ TAROT_MEANINGS.ts: 동적 생성 → 정적 import 교체
- 파일: `MINOR_MEANINGS.ts` (신규), `TAROT_MEANINGS.ts` (수정)

#### ~~7-A3. TAROT_CONTEXT_MEANINGS.ts — 78장 × 7 컨텍스트 고유 해석 (5-1-D 해소)~~
- [x] ✅ MAJOR/MINOR_MEANINGS 한국어 고유 해석 연결, 템플릿 제거
- 파일: `src/utils/constants/tarot/TAROT_CONTEXT_MEANINGS.ts`

#### ~~7-A4. CARD_COMBINATION_RULE.ts — Minor 조합 규칙 (5-1-G 해소)~~
- [x] ✅ 슈트 패턴 8개(3장/4장) + 숫자 패턴 18개 + Major-Minor 크로스 17개 (r301-r343)
- [x] ✅ interpretationEngine suitPattern/numberPattern 매칭 로직 추가
- 파일: `CARD_COMBINATION_RULE.ts`, `interpretationEngine.ts`

### 7-B. 카드 뽑기/뒤집기 UX

#### 7-B1. DrawScene — 클릭 카드 = 실제 뽑힌 카드 연결
- [ ] 현재 문제: 카드 flip 후 drawRandomCards()로 랜덤 재추출 → 클릭과 무관
- [ ] 수정: CardSprite에 cardId 연결, 클릭한 카드 정보를 drawnCards에 반영
- [ ] shuffleArray로 덱 섞은 후 fan한 카드가 곧 선택 대상
- 파일: `DrawScene.ts`, `cardHelpers.ts`, `CardSprite.ts`, `CardDeck.ts`

#### 7-B2. ReadingScene — 원카드 직접 뒤집기
- [ ] 카드 1장 뒤집어진 채(face-down) 표시
- [ ] 유저 클릭 → flip 애니메이션 → InsightPanel 해석 표시
- 파일: `ReadingScene.ts`, `InsightPanel.vue`

#### 7-B3. ReadingScene — 다카드 자동 순차 뒤집기 + 해석
- [ ] 스프레드 레이아웃에 맞게 카드 배치 (face-down)
- [ ] 순서대로 자동 flip → 각 카드 해석 표시 (InsightPanel 동기화)
- [ ] 모든 카드 뒤집힌 후 → 종합(synthesis) 해석 표시
- [ ] InsightPanel: 자동 모드 (카드 뒤집기 이벤트 수신) vs 수동 prev/next 제거
- 파일: `ReadingScene.ts`, `InsightPanel.vue`, `useTarotStore.ts`

## Phase 8: 에셋 & 폴리시 (대기)

- [ ] 타로 카드 이미지 확보 (metabismuth/tarot-json RWS 350x600px) → webp 변환
- [ ] 픽셀아트 스프라이트시트 제작 (소녀, 숲)
- [ ] pixiLoader.ts 에셋 프리로딩
- [ ] 오디오 파일 (forest-ambient, shuffle, cardflip, magic)
- [ ] SpreadLayout.vue — 켈틱크로스 시각적 배치

---

## 완료 아카이브

### Phase 1~4 (✅완료) → HISTORY.md 참조
### Phase 5-1-B (✅완료): EMOTION_VECTOR 전역 ID 매핑
### Phase 5-1-C (✅완료): SPREAD_TYPES + SPREAD_POSITION_MEANING 8개 스프레드
### Phase 5-1-E (✅완료): GRID_INTERPRETATIONS 9칸
