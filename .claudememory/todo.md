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

## Phase 5-2: 통합 & 데이터 연결

### 5-2-A. 카드 헬퍼 구현 (cardHelpers.ts)
- [ ] shuffleArray, drawRandomCards, getCardById, getPositionLabel
- [ ] DrawScene.ts에서 cardHelpers 사용하도록 연결

### 5-2-B. Mock 해석 고도화 (tarotApi.ts → getMockInterpretation)
- [ ] TAROT_MEANINGS + REVERSED_MEANINGS 데이터 기반 mock 해석 생성
- [ ] InsightPanel.vue의 하드코딩된 mock을 tarotApi.getMockInterpretation()으로 교체

### 5-2-C. 로컬 저장소 (localStorage.ts)
- [ ] saveSession / getRecentSessions / clearOldSessions (30일 초과 삭제)
- [ ] 카르마 일기 저장/조회 (saveDiaryEntry / getDiaryEntries)

### 5-2-D. 카르마 처리 (karmaApi.ts)
- [ ] processKarma — 옵션별 분기 (DIARY/DONATION/AD)
- [ ] hasCompletedKarma — 오늘 완료 여부
- [ ] 기부 링크: GreaterGood / Brother Click for the Earth

### 5-2-E. 씬 전환 훅 (useSceneTransition.ts)
- [ ] transitionTo + isTransitioning 상태
- [ ] App.vue에서 store.goTo() → transitionTo()로 교체

### 5-2-F. Pixi 유틸리티 (pixiHelpers.ts / pixiLoader.ts)
- [ ] createRect / createCircle / centerObject / fadeIn / fadeOut / pulseEffect
- [ ] pixiLoader — 에셋 로딩 구조

## Phase 6: AI 해석 연동 (대기)

- [ ] 타로 상수 품질 보강 (5-1-D, 5-1-F의 AI 생성 해석)
- [ ] tarotApi.ts — requestInterpretation 실제 API 호출
- [ ] 프록시 서버 or Edge Function (API 키 보호) → api-strategy.md 참조
- [ ] 캐싱 전략: 동일 카드 조합 해석 DB 저장

## Phase 7: 에셋 & 폴리시 (대기)

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
