# 👽수정함 (2026-03-09)

## 주요 반영:

1. 리서치 권고 직접 반영

- 감정 벡터 중립 보정: EMOTION_VECTOR.ts
  - High Priestess(2), Hierophant(5), Hermit(9), Justice(11) valence 조정
- Wands 해석 톤 정제: SUIT_INFO.ts
  - coreTheme/coachingLens를 의도-에너지 정렬 중심으로 수정
- One Card 스프레드 의미 보정: SPREAD_TYPES.ts
  - 결과 단정형에서 “핵심 메시지/현재 에너지 점검” 중심으로 조정
- Tower 역방향 완화: REVERSED_MEANINGS.ts
  - personal을 invert -> weaken으로 조정
- 메이저 한국어명 정제: TAROT_CARDS.ts
  - nameKr 표준 한국어명 배열 반영(예: The Fool → 바보)
- 9그리드 문구 전문화(한국어): GRID_INTERPRETATIONS.ts

2. 새 파일 추가(전문화)

- INTERPRETATION_QUALITY_BENCHMARKS.ts
  - 의미 품질/룰 수/커버리지 기준선 정의

3. 검증기 고도화

- CONSTANTS_VALIDATOR.ts
  - 위 품질 기준 연동
  - 키워드/advice 최소치, 룰 개수 최소치 경고 추가

4. export 및 문서 갱신

- 배럴 export 반영: index.ts
- 해석 문서 업데이트: interpretation.md
- TODO 업데이트: todo.md

## 참고:

- 요청하신 경로 제한을 지켜 src/utils/constants/ 외부 파일은 수정하지 않았습니다.
- 별도 타입체크/테스트 실행은 하지 않았습니다.

# 👽수정함 (2026-03-09)

## 수정된 내용

- semantic tag ID 정규화 + 오탈자 호환 alias 추가
  - SEMENTIC_TAG.ts
  - SEMANTIC_TAGS를 추가해서 기존 잘못된 ID 체계(컵/펜타클 오프셋)를 자동 보정
  - SEMENTIG_TAG는 유지(호환성), SEMENTIC_TAG/SEMANTIC_TAG alias 제공
- emotion vector 전역 카드 ID 정규화 추가
  - EMOTION_VECTOR.ts
  - 기존 minor arcana의 중복 id(0~55 재사용)를 엔진용 cardId(22~77)로 변환한 EMOTION_VECTOR_BY_CARD_ID 추가
- 엔진 파이프라인 상수 신설 (요청한 11단계 순서 반영)
  - AI_INTERPRETATION_PIPELINE.ts
  - 단계별 source, 가중치, 충돌/요약 정책, 개인화 hook 포함
- 컨텍스트 표준화 상수 신설 (money/finance 통합)
  - INTERPRETATION_CONTEXT_SCHEMA.ts
  - canonical context + alias map + normalizeInterpretationContext 추가
- 개인화 상담 프로필 상수 신설
  - PERSONALIZED_INTERPRETATION_PROFILE.ts
  - 톤, 상세도, 공감/직설/실행성, 불확실성 허용, 금지패턴, 컨텍스트별 포커스 정의
- 질문 유형 ↔ 스프레드 추천 규칙 정합성 수정
  - SPREAD_SELECTION_RULE.ts
  - QUESTION_TYPE_INFERENCE_RULES의 타입들과 맞지 않던 complex_life_problem/general_problem 제거
  - timeline/advice/problem_solving/outcome_prediction/emotional_clarity/life_direction/...와 일치하도록 재정의

## 참고

- INTERPRETATION_CONTEXT_SCHEMA.ts
- canonical context + alias map + normalizeInterpretationContext 추가
- 개인화 상담 프로필 상수 신설
  - PERSONALIZED_INTERPRETATION_PROFILE.ts
  - 톤, 상세도, 공감/직설/실행성, 불확실성 허용, 금지패턴, 컨텍스트별 포커스 정의
- 질문 유형 ↔ 스프레드 추천 규칙 정합성 수정
  - SPREAD_SELECTION_RULE.ts
  - canonical context + alias map + normalizeInterpretationContext 추가
- 개인화 상담 프로필 상수 신설
  - PERSONALIZED_INTERPRETATION_PROFILE.ts
  - 톤, 상세도, 공감/직설/실행성, 불확실성 허용, 금지패턴, 컨텍스트별 포커스 정의
- 질문 유형 ↔ 스프레드 추천 규칙 정합성 수정
  - SPREAD_SELECTION_RULE.ts
- 개인화 상담 프로필 상수 신설
  - PERSONALIZED_INTERPRETATION_PROFILE.ts
  - 톤, 상세도, 공감/직설/실행성, 불확실성 허용, 금지패턴, 컨텍스트별 포커스 정의
- 질문 유형 ↔ 스프레드 추천 규칙 정합성 수정
  - SPREAD_SELECTION_RULE.ts
  - PERSONALIZED_INTERPRETATION_PROFILE.ts
  - 톤, 상세도, 공감/직설/실행성, 불확실성 허용, 금지패턴, 컨텍스트별 포커스 정의
- 질문 유형 ↔ 스프레드 추천 규칙 정합성 수정
  - SPREAD_SELECTION_RULE.ts
  - QUESTION_TYPE_INFERENCE_RULES의 타입들과 맞지 않던 complex_life_problem/general_problem 제거
- 질문 유형 ↔ 스프레드 추천 규칙 정합성 수정
  - SPREAD_SELECTION_RULE.ts
  - QUESTION_TYPE_INFERENCE_RULES의 타입들과 맞지 않던 complex_life_problem/general_problem 제거
  - timeline/advice/problem_solving/outcome_prediction/emotional_clarity/life_direction/...와 일치하도록 재정의
- 프로젝트 전체 build는 기존 다른 영역의 타입 오류로 실패하며, 이번 변경 파일 기준 문법 문제는 추가되지 않았습니다.
- 워크트리에 원래 있던 다른 변경사항이 많아, 이번 작업은 위 파일들만 기준으로 반영했습니다.

---

1. 실제 AI interpretation engine 함수(스코어링/룰 적용 순서)까지 바로 구현
2. 현재 상수들에 대한 validator(ID 범위/중복/컨텍스트 키 불일치 자동 검증) 추가
3. prompts.ts에 개인화 프로필을 실제 프롬프트로 주입하도록 연결

4. 현재 상수들에 대한 validator(ID 범위/중복/컨텍스트 키 불일치 자동 검증) 추가
5. prompts.ts에 개인화 프로필을 실제 프롬프트로 주입하도록 연결

# 타로 상수 데이터 검토 결과 (2026-03-09)

## CRITICAL — 즉시 수정

### 1. SEMENTIC_TAG.ts — cardId 불일치 + 파일명 오타

- 파일명: `SEMENTIC` → `SEMANTIC`으로 수정
- Cups cardId 64-77 → **36-49**로 수정 (TAROT_CARDS 기준)
- Pentacles cardId 78-91 → **64-77**로 수정 (TAROT_CARDS 기준)
- Wands(22-35), Swords(50-63)는 정상

### 2. EMOTION_VECTOR.ts — Minor Arcana ID 체계 불일치

- Major(0-21): OK
- Minor: 자체 0-55 번호 사용 중 → TAROT_CARDS 기준 22-77로 통일 필요
  - Wands: 0-13 → 22-35
  - Cups: 14-27 → 36-49
  - Swords: 28-41 → 50-63
  - Pentacles: 42-55 → 64-77

---

## HIGH — 구조 문제

### 3. SPREAD_TYPES.ts — 빈 스프레드 객체 채우기

현재 비어있는 5개 스프레드 정의 필요:

- `FOUR_CARD`: 4장 스프레드 (상황/장애/조언/결과)
- `FIVE_CARD`: 5장 크로스 (현재/과거/미래/이유/잠재력)
- `RELATIONSHIP`: 관계 스프레드 (나/상대/관계/조언/결과 등)
- `HORSESHOE`: 말굽 7장 (과거/현재/숨겨진영향/장애물/주변환경/행동제안/결과)
- `MAGIC_SEVEN`: 마법의 7장 (과거/현재/미래/최선의행동/주변영향/희망과두려움/최종결과)

### 4. TAROT_CARDS.ts — 확장 필드 불일치

- id 22(Ace of Wands)만 `is_court`, `visual_flow`, `weight` 있음
- id 63(King of Swords)만 `personality_vector`, `social_traits` 있음
- 결정 필요: 전체 78장에 확장하거나, 해당 필드를 별도 상수로 분리

### 5. TAROT_CONTEXT_MEANINGS.ts — 컨텍스트 키 불일치

- cardId 0-63: `love`, `career`만 (Swords 일부에 `personal`)
- cardId 64-77(Pentacles): `love`, `career`, `money`, `personal`, `health` 전부
- `finance`(TAROT_MEANINGS) vs `money`(CONTEXT_MEANINGS) 혼용 → 통일 필요
- **모든 카드에 love/career/finance/personal/health 5개 컨텍스트 채우기**

### 6. GRID_INTERPRETATIONS.ts — 9칸 중 3칸만 정의

- 완성: Cell 8(Bottom/Root), 5(Center), 2(Top)
- 미완성: Cell 1, 3, 4, 6, 7, 9 — 채우기 필요
- 참고 배치:
  ```
  |  1(좌상)  |  2(상/이상)  |  3(우상)  |
  |  4(좌중)  |  5(중앙/현재)|  6(우중)  |
  |  7(좌하)  |  8(하/근본)  |  9(우하)  |
  ```

### 7. CARD_COMBINATION_RULE.ts — Minor 조합 없음

- 현재 200+개 룰 전부 Major(0-21) 조합
- 추가 필요:
  - 같은 슈트 3장 이상: 원소 에너지 강화
  - 같은 숫자 조합 (예: 5가 3장 = 극심한 갈등)
  - Major + Minor 크로스 조합
  - 코트카드(Page/Knight/Queen/King) 간 관계 조합

### 8. TAROT_MEANINGS.ts — Minor Arcana 키워드 얇음

- Major: core/light/shadow 3-4개씩
- Minor: 1-2개로 부족 → AI 해석 품질에 직접 영향
- 전체 Minor 56장 키워드 보강 필요

---

## MEDIUM — 타로학 관점 수정

### 9. EMOTION_VECTOR.ts — 중립 카드 Valence 편향

| 카드              | 현재 | 권장     | 이유                  |
| ----------------- | ---- | -------- | --------------------- |
| High Priestess(2) | 0.2  | 0.45~0.5 | 고요한 지혜 ≠ 부정    |
| Hierophant(5)     | 0.3  | 0.5      | 전통/안내 = 중립      |
| Hermit(9)         | 0.1  | 0.35~0.4 | 내면의 빛 ≠ 우울      |
| Justice(11)       | 0.2  | 0.5      | 균형/공정 = 완전 중립 |

### 10. SUIT_INFO.ts — Wands 테마

- 현재: `"행동"` → 수정: `"열정"` 또는 `"의지와 창조"`
- Fire 원소 = 의지/열정/창조, 단순 "행동"과 구분 필요

### 11. SPREAD_TYPES.ts — ONE_CARD 포지션명

- 현재: `"결과/조언"` → 수정: `"핵심 메시지"` 또는 `"현재 에너지"`
- 한 장으로 "결과"를 논하는 것은 타로학적으로 부적절

### 12. REVERSED_MEANINGS.ts — Tower(16) 역방향

- 현재: 전 컨텍스트 `invert`
- 제안: health, personal은 `weaken`으로 (내면 붕괴/지연된 변화 뉘앙스)

### 13. TAROT_CARDS.ts — The Fool 한국어 이름

- 현재: `"광대"` → 표준: `"바보"` (한국 타로 커뮤니티 기준)
- "광대"는 서커스 뉘앙스, 원래 의미 "순진한 여행자"와 거리

---

## LOW — 정리/개선

### 14. CARD_DATA.ts — TAROT_CARDS.ts와 역할 중복

- 어느 쪽이 정본인지 결정 후 하나 삭제

### 15. SEMENTIC_TAG.ts — Cups/Pentacles 데이터 누락 주석

- 파일 내 주석: "Cups와 Pentacles의 ID 36~49, 78~91 구간 완성하기"
- cardId 수정 후에도 Cups(36-49) 데이터가 실제로 존재하는지 확인 필요

---

## 채워야 할 빈 데이터 목록 (우선순위순)

1. **SPREAD_TYPES.ts** — 5개 스프레드 정의 (count, positions, description)
2. **GRID_INTERPRETATIONS.ts** — 6개 셀 (1,3,4,6,7,9)
3. **TAROT_CONTEXT_MEANINGS.ts** — cardId 0-63에 finance/personal/health 컨텍스트 추가
4. **TAROT_MEANINGS.ts** — Minor 56장 키워드 보강
5. **CARD_COMBINATION_RULE.ts** — Minor 조합 룰 추가
6. **SEMENTIC_TAG.ts** — ID 수정 후 누락 데이터 확인
