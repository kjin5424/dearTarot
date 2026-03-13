# 타로 해석 알고리즘 정밀 검토 (2026-03-13)

> 점성술에 빠진 타로 전문가의 관점에서 해석 시스템 전체를 검토함

---

## 1. 구조적 문제 (CRITICAL)

### 1-1. 해석 엔진이 미연결 — 두 개의 분리된 시스템

**현재 실제 해석 경로 (사용 중):**
```
InsightPanel.vue → requestInterpretation() → Gemini API / getMockInterpretation()
                                                           ↓
                                            tarotApi.ts (3줄 mock 생성)
```

**미사용 해석 경로 (죽은 코드):**
```
interpretationEngine.ts → interpretTarotReading()
  ├── TAROT_MEANINGS (78장 키워드)
  ├── TAROT_CONTEXT_MEANINGS (78장×7 고유 한국어 해석)
  ├── CARD_COMBINATION_RULES (343개 조합 규칙)
  ├── TAG_COMBINATION_RULES (60+개 태그 조합)
  ├── EMOTION_VECTOR (78장 VAD 벡터)
  ├── REVERSED_MEANINGS (22+4 역방향 정책)
  ├── SCORING_STRUCTURE (가중치/정규화)
  ├── COLOR_PALETTE_ANALYSIS (색채 심리)
  ├── GAZE_DIRECTION_RULES (시선 흐름)
  ├── SPATIAL_PSYCHOLOGY_RULES (공간 심리)
  ├── HEALING_AFFIRMATIONS (치유 문구)
  └── INTERPRETATION_CONFLICT_RULES (모순 해소)
→ 결과: 아무데서도 호출하지 않음 ❌
```

**영향:** Phase 1~7에서 구축한 모든 상수 데이터(MAJOR_MEANINGS, MINOR_MEANINGS, TAROT_CONTEXT_MEANINGS, CARD_COMBINATION_RULES 등)가 실제 사용자에게 전달되지 않음. Gemini API가 이 데이터를 프롬프트로 받지도 않고, mock도 이 데이터의 극히 일부만 사용.

### 1-2. requestInterpretation이 컨텍스트를 무시

```ts
// tarotApi.ts:168 — 항상 "personal" 하드코딩
const systemPrompt = buildSystemPrompt({}, "personal");
```

사용자가 "연애", "직장", "건강" 등 어떤 맥락으로 질문해도 시스템 프롬프트는 항상 `personal` 컨텍스트로 고정. CONTEXT_SPECIFIC_TONE_GUIDE의 love/career/finance/health 등 세밀한 톤 가이드가 전혀 적용되지 않음.

### 1-3. Gemini 프롬프트에 상수 데이터 미주입

현재 Gemini에 전달되는 정보:
- 질문 텍스트
- 카드 배치 (이름 + 정/역방향)

전달되지 않는 정보:
- 카드별 고유 한국어 해석 (MAJOR/MINOR_MEANINGS의 love/career/... 문장들)
- 조합 규칙 결과 (어떤 시너지/충돌이 발생했는지)
- 감정 벡터 요약
- 역방향 정책 (invert vs weaken)
- 포지션 의미/가중치

Gemini가 자체 타로 지식에만 의존하게 되어, 우리가 정성스럽게 작성한 RWS 기반 해석이 무용지물.

---

## 2. 해석 품질 문제 (HIGH)

### 2-1. Mock 해석이 너무 얇음

getMockInterpretation은 카드당 3줄:
1. "{포지션}에 {카드명} 카드가 놓였군요."
2. "{키워드}의 에너지가 작용하고 있어요." / 역방향 변형
3. advice[0] (MAJOR/MINOR_MEANINGS의 advice 첫 문장)

**문제점:**
- 컨텍스트별 해석(love/career 등)을 전혀 사용하지 않음
- 2번 문장이 모든 카드에서 동일한 패턴 ("~의 에너지가 작용")
- 카드 고유의 상징/이미지 서술 없음 (RWS 전통에서는 그림 묘사가 핵심)
- 포지션과 카드의 상호작용 해석 없음 ("과거 자리에 탑이 있다"는 것과 "미래 자리에 탑이 있다"는 전혀 다른 의미)

### 2-2. spreadSynthesis가 기계적 (미사용 엔진)

```ts
`${topCard?.cardName} 중심으로 ${normalizedContext} 맥락에서 ${topCard?.role} 신호가 가장 강합니다.`
```

타로 리더는 이렇게 말하지 않음. 카드 간의 흐름과 이야기를 엮어야 함:
- "과거의 탑(파괴)에서 현재의 별(희망)로 이어지는 여정이 보여요"
- "세 장 모두 컵이 많은 걸 보니, 지금 감정의 파도 속에 있는 것 같아요"

### 2-3. 역방향 카드 해석 텍스트 부재

REVERSED_MEANINGS.ts에 22장 메이저 + 4슈트의 invert/weaken 정책이 있지만:
- **interpretationEngine**: score에만 반영 (텍스트 불변)
- **getMockInterpretation**: shadow_keywords 사용 + 1줄 변형문 (이것은 양호)
- **Gemini**: "(역방향)" 태그만 전달, 구체적 역방향 의미 미전달

타로에서 역방향은 단순히 "반대"가 아님. The Tower 역방향은 "피할 수 있었던 재난" 또는 "내면의 작은 붕괴"이고, The Fool 역방향은 "무모함에 대한 경고". 카드마다 고유한 역방향 해석이 필요.

---

## 3. 타로학적 정확성 (MEDIUM)

### 3-1. 원소 존엄(Elemental Dignity) 미구현

CARD_COMBINATION_RULES에 같은 슈트 3+장 규칙은 있지만, 전통적 원소 존엄:
- **우호:** Fire(Wands)+Air(Swords), Water(Cups)+Earth(Pentacles)
- **적대:** Fire+Water, Air+Earth
- **중립:** Fire+Earth, Water+Air

이 상호작용이 해석에 반영되지 않음. 예: Ace of Wands + Ace of Cups가 함께 나오면 "열정과 감정의 충돌, 머리와 마음의 갈등"이어야 하는데, 현재는 별도 해석.

### 3-2. 궁정 카드(Court Cards) 인물 해석 부재

Pages/Knights/Queens/Kings는 전통적으로 질문자의 삶에 등장하는 **인물**을 나타내는 경우가 많음:
- Page: 젊은 사람, 메시지를 가져오는 자
- Knight: 급변을 가져오는 인물, 행동하는 에너지
- Queen: 성숙한 여성적 에너지, 수용적 힘
- King: 성숙한 남성적 에너지, 통제적 힘

현재 MINOR_MEANINGS에 이런 인물 해석 관점이 부족.

### 3-3. 카드 이미지/상징 서술 부재

RWS(Rider-Waite-Smith) 전통에서 해석의 핵심은 **카드 그림 묘사**:
- "카드 속 인물이 왼쪽을 바라보고 있어요 — 과거를 돌아보는 중이에요"
- "배경의 물은 감정의 흐름을, 산은 넘어야 할 도전을 의미해요"

GAZE_DIRECTION_RULES와 SYMBOL_COORDINATES가 이를 위해 존재하지만, 실제 해석 텍스트에 반영되지 않음.

### 3-4. 스프레드 포지션 × 카드 상호작용

현재 포지션은 레이블과 가중치만 제공하고, 카드와의 의미적 상호작용이 없음:
- "과거 자리의 Death" = 이미 겪은 큰 변화, 끝난 관계
- "미래 자리의 Death" = 다가올 전환기, 준비해야 할 변화
- "조언 자리의 Death" = 집착을 놓아주라는 메시지

같은 카드라도 포지션에 따라 해석이 완전히 달라져야 함.

---

## 4. 문장 자연스러움 검토

### 4-1. MAJOR_MEANINGS — 양호 ✅

> "새로운 만남이나 관계의 시작이 가까이 있는 것처럼 보여요."
> "마음을 열고 순수하게 다가가는 것이 지금 필요한 에너지일 수 있어요."

자연스럽고, 단정하지 않으며("~처럼 보여요", "~일 수 있어요"), 카드의 핵심 에너지를 잘 전달. "숲속 마녀"의 톤과 일치.

### 4-2. MINOR_MEANINGS — 양호 ✅

> "새로운 만남이나 관계에 뜨거운 불꽃이 튀는 시기예요."

슈트별 원소 에너지가 문장에 잘 반영됨 (Wands=불꽃, Cups=감정, Swords=명확함, Pentacles=안정).

### 4-3. getMockInterpretation — 개선 필요 ⚠️

```
"이 자리에서 creative ignition, bold start의 에너지가 작용하고 있어요."
```

**문제:** keywords가 영어 그대로 삽입됨. 한국어 해석 문맥에 영어 키워드가 노출되면 몰입감이 깨짐. light_keywords/shadow_keywords를 한국어로 번역하거나, MAJOR/MINOR_MEANINGS의 한국어 해석 문장을 직접 사용해야 함.

### 4-4. Gemini 프롬프트 — 혼재 ⚠️

시스템 프롬프트는 영어, 사용자 프롬프트에서 "한국어로 작성", "숲속 마녀의 따뜻하고 신비로운 어조" 지시. 언어 혼재가 Gemini의 톤 일관성에 영향을 줄 수 있음.

---

## 5. 점수 산출 로직 검토 (미사용 엔진)

### 5-1. 스코어링 구조 — 합리적이나 무의미

```
cardRawScore = (baseMeaning + contextMeaning + semantic + contextBias + position) × reversedFactor
```

가중치 체계는 합리적:
- basicMeaning: 1.0 (카드 고유 극성)
- contextMeaning: 1.2 (컨텍스트 적합성, 가장 높은 가중치 — 적절)
- spreadPosition: 1.0 (포지션 중요도)

하지만 이 점수가 **해석 텍스트 선택에 영향을 주지 않음**. 점수가 높건 낮건 동일한 문장이 출력됨. 점수는 confidence band 계산에만 사용되는데, 그마저 미사용.

### 5-2. 감정 벡터 블렌딩 — 정교하나 사장됨

VAD 모델 기반 position-weighted 감정 집계 + emotionShift 보정은 심리학적으로 타당한 접근. 하지만 결과가 trace에만 기록되고 실제 해석 생성에 반영되지 않음.

---

## 6. 개선 제안 (우선순위순)

### P0 — interpretationEngine을 실제 해석 파이프라인에 연결

**방안 A: Engine → Gemini 프롬프트 보강**
1. interpretTarotReading() 결과를 Gemini 프롬프트에 주입
2. 카드별 contextInterpretation, advice, 조합 규칙 결과, 감정 요약을 structured evidence로 전달
3. Gemini가 이 데이터를 기반으로 "숲속 마녀" 톤의 자연어 해석 생성

**방안 B: Engine → Mock 해석 대체**
1. Gemini 없이도 풍부한 해석 제공
2. contextInterpretation + advice + healingAffirmation + visualPsychology를 조합
3. spreadSynthesis를 카드 간 이야기 흐름으로 재구성

**권장: A+B 병행** — Engine 결과를 mock에도 Gemini에도 활용

### P1 — 컨텍스트 전달 수정

```ts
// 현재 (tarotApi.ts:168)
const systemPrompt = buildSystemPrompt({}, "personal");

// 수정
const systemPrompt = buildSystemPrompt({}, detectedContext);
```

질문에서 컨텍스트를 추출하거나 사용자가 선택한 컨텍스트를 전달해야 함.

### P2 — Mock 해석 한국어화

getMockInterpretation에서 영어 keywords 대신 MAJOR/MINOR_MEANINGS의 한국어 컨텍스트 해석을 직접 사용.

### P3 — 역방향 전용 해석 텍스트 추가

MAJOR/MINOR_MEANINGS에 reversed_love, reversed_career 등 역방향 전용 문장 추가. 또는 shadow_keywords를 한국어 문장으로 확장.

### P4 — 원소 존엄 규칙 추가

CARD_COMBINATION_RULES에 원소 간 우호/적대 상호작용 규칙 추가.

### P5 — 궁정 카드 인물 해석

Pages/Knights/Queens/Kings에 "이 카드가 나타내는 인물" 필드 추가.

---

## 7. 요약

| 영역 | 상태 | 심각도 |
|------|------|--------|
| interpretationEngine 미연결 | 모든 상수 데이터가 사장됨 | CRITICAL |
| 컨텍스트 하드코딩 | "personal" 고정 | CRITICAL |
| Gemini 프롬프트에 상수 미주입 | RWS 해석 데이터 미활용 | HIGH |
| Mock 해석 영어 키워드 노출 | 몰입감 저해 | HIGH |
| 역방향 해석 텍스트 부재 | 정방향과 동일 텍스트 | HIGH |
| 원소 존엄 미구현 | 타로 전통 미반영 | MEDIUM |
| 궁정 카드 인물 해석 | 인물 관점 부재 | MEDIUM |
| 카드 이미지 서술 미활용 | gaze/symbol 데이터 사장 | MEDIUM |
| MAJOR/MINOR_MEANINGS 문장 | 자연스럽고 품질 양호 | ✅ OK |
| VAD 감정 모델 | 정교하나 미사용 | MEDIUM |
| 스코어링 구조 | 합리적이나 미사용 | MEDIUM |
