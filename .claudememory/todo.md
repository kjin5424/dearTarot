# TODO (다음 작업 목록)

## Phase 5: 통합 & 데이터 연결 (🔥현재)

### 5-A. 카드 헬퍼 구현 (cardHelpers.ts)
- [ ] shuffleArray — Fisher-Yates 셔플
- [ ] drawRandomCards — 스프레드별 카드 뽑기 + 역방향 30%
- [ ] getCardById — ID로 카드 조회
- [ ] getPositionLabel — 스프레드 위치명 반환
- [ ] DrawScene.ts에서 cardHelpers 사용하도록 연결

### 5-B. Mock 해석 고도화 (tarotApi.ts → getMockInterpretation)
- [ ] TAROT_MEANINGS + REVERSED_MEANINGS 데이터 기반 mock 해석 생성
- [ ] InsightPanel.vue의 하드코딩된 mock을 tarotApi.getMockInterpretation()으로 교체
- [ ] position(과거/현재/미래 등) 맥락 반영

### 5-C. 로컬 저장소 (localStorage.ts)
- [ ] saveSession / getRecentSessions 구현
- [ ] clearOldSessions (30일 초과 자동 삭제)
- [ ] 카르마 일기 저장/조회 (saveDiaryEntry / getDiaryEntries)

### 5-D. 카르마 처리 (karmaApi.ts)
- [ ] processKarma — 옵션별 분기 처리
- [ ] hasCompletedKarma — 오늘 완료 여부
- [ ] KarmaOptions.vue에서 karmaApi 호출 연결

### 5-E. 씬 전환 훅 (useSceneTransition.ts)
- [ ] transitionTo 함수 + isTransitioning 상태
- [ ] App.vue에서 store.goTo() → transitionTo()로 교체
- [ ] Vue overlay 페이드 트랜지션 CSS 적용

### 5-F. Pixi 유틸리티 (pixiHelpers.ts / pixiLoader.ts)
- [ ] createRect / createCircle / centerObject 헬퍼
- [ ] fadeIn / fadeOut / pulseEffect GSAP 래퍼
- [ ] pixiLoader — 에셋 로딩 구조 (에셋 확보 후 사용)

## Phase 6: AI 해석 연동 (대기)

- [ ] prompts.ts — SYSTEM_PROMPT + buildUserPrompt 작성
- [ ] tarotApi.ts — requestInterpretation 실제 API 호출 구현
- [ ] 프록시 서버 or Edge Function 결정 (API 키 보호)
- [ ] InsightPanel.vue에서 실제 AI 해석으로 교체

## Phase 7: 에셋 & 폴리시 (대기)

- [ ] 픽셀아트 스프라이트시트 제작 (소녀, 숲, 카드)
- [ ] pixiLoader.ts로 에셋 프리로딩
- [ ] placeholder → 실제 에셋 교체
- [ ] 오디오 파일 추가 (forest-ambient, shuffle, cardflip, magic)
- [ ] SpreadLayout.vue — 켈틱크로스 시각적 배치
- [ ] Loading.vue — 에셋 로딩 화면

---

## 완료 아카이브

### Phase 1~4 (✅완료) → HISTORY.md 참조
