# Project Brief

## project name: dearTarot

**픽셀아트 게임 형식의 AI 타로 웹 애플리케이션**

---

## 0. Core Story Concept:

달이 뜬 어두운 숲속에서 유저가 길을 잃은 상태로 시작된다.
카메라(씬)가 위로 이동하면서 양머리 소녀들이 손을 잡고 원형으로 춤추는 집회가 나타난다.
그 중 한 명이 다가와 길을 잃었냐고 묻고, 집회로 인도한다.
집회에 참가(타로 리딩)가 끝나면 소녀가 배웅하며 유저를 돌려보낸다.

## 1. User Workflows

1-1. **Question Input & Ethical Filtering**

- 사용자가 고민을 텍스트로 입력
- AI 기반 윤리 가이드 작동
- 사망 / 질병 / 재해 / 이혼 등 인간이 통제 불가한 극단적 질문 필터링
- 필터링 시 건설적 질문으로 전환 유도 (부드럽게)
- 원칙: "결과를 감당할 수 없는 점은 치지 않는다"

1-2. **Spread Method Curation**

- 2~3개의 사전 질문으로 스프레드 방식 자동 결정
- 예: "확실하고 간결한 답을 원하나요?" / "전체적인 흐름을 보고 싶나요?"
- 결정 가능한 스프레드: 원 카드 / 쓰리 카드 / 켈트 십자가

1-3. **Shuffling & Energy Exchange (카르마 정화)**

- 카드 셔플 애니메이션 (노멀 셔플 / 매시 셔플 / 커트 애니메이션)
- "점술은 카르마를 쌓는 행위, 선의의 교환이 필요하다" 메시지
- 복채 옵션: 감사 일기 작성 / 후원 링크 클릭 / 광고 시청

1-4. **Intuitive Card Draw**

- 사용자가 직접 카드를 직관으로 선택
- 스프레드 레이아웃에 맞춰 선택된 카드 배열

1-5. **Insight & Explanation**

- 위치(과거/현재/미래 등) + 카드 상징(정/역방향) 결합
- AI가 개인화된 해석 제공 (스트리밍 출력)
- 단순 키워드 나열이 아닌 그림 중심의 직관적 성찰 가이드

## 2. Target User

- 타로에 관심 있는 MZ세대
- 픽셀아트 / 인디게임 감성을 좋아하는 유저
- 진지한 점술보다 가볍고 아름다운 자기 성찰 경험을 원하는 유저

## 3. 핵심 가치

- **몰입감**: 게임처럼 진행되는 스토리텔링
- **윤리성**: 해로운 질문 필터링, 건강한 방향 제시
- **심미성**: 픽셀아트 컨셉 일관성
- **개인화**: AI 기반 맞춤 해석

## 4. Phaser vs PixiJS 선택 이유

PixiJS는 게임 엔진이 아닌 **고성능 2D WebGL 렌더러**다.
씬 관리 / 카메라 / 오디오 등 게임 엔진 기능이 없는 대신,
Vue.js와의 통합이 훨씬 자연스럽고 **Vue가 주도권을 유지**한다.

- Vue: 상태 관리, 씬 전환 로직, UI overlay, AI API 통신 전담
- PixiJS: 캔버스 렌더링, 스프라이트 애니메이션, 파티클 효과 전담
- 씬 매니저 / 카메라 / 오디오는 직접 구현 (Vue hook으로)

---

## 1. Product Vision & Target

- **Core Goal:** 단순한 점술 앱을 넘어, '에너지 교환'이라는 서사를 통해 사용자의 심리적 허들을 낮춘 **유료급 퀄리티의 무료 힐링 타로 서비스**.
- **Target Audience:**
- 타로와 오컬트 문화를 즐기며 시각적/감성적 충족을 원하는 MZ세대.
- 일상의 고민에 대해 즉각적이고 개인화된 위로(Insight)를 얻고자 하는 유저.
- 픽셀아트 / 인디게임 감성을 좋아하는 유저

---

## 2. Key Features (The 4 Pillars)

1. **AI Oracle Insight:** 사용자의 구체적인 질문을 분석하여 AI가 맥락을 파악하고, 카드별 상징과 결합한 고도의 개인화된 해석 엔진 제공.
2. **Mystic Curation (Spread Selection):** 사용자가 고민하지 않게 하되, 질문의 성격에 따라 시스템이 가장 적절한 스프레드(배열법)를 제안하여 '운명적인 선택'이라는 느낌을 강화.
3. **Immersive Mystery:** 고퀄리티 애니메이션, 공간감을 주는 앰비언트 사운드, 신비로운 이펙트(Glow, Particle)를 통해 앱에 접속하는 순간 다른 차원에 온 듯한 몰입감 제공.
4. **Karma-based Monetization:** 직접 결제 대신 광고 시청, 후원 사이트 방문, 감사 일기 작성 등을 '에너지 교환(복채)' 과정으로 설계하여, 수익 창출과 사용자 경험(UX)의 서사를 일치시킴.
   몰입감: 게임처럼 진행되는 스토리텔링
   윤리성: 해로운 질문 필터링, 건강한 방향 제시
   심미성: 픽셀아트 컨셉 일관성
   개인화: AI 기반 맞춤 해석

---

## 3. Design Context (비주얼 전략)

- **Concept:** **"Modern Mystic & Deep Healing"** (현대적인 세련미와 고전적인 신비로움의 조화)
- **Color Palette:** (`src/assets/styles/_color-theme.scss` 기준)
- **Shadow:** #1a1026 ~ #3e287d — 어두운 배경, 그림자
- **Accent (Witch Magic):** #7240a8 ~ #e5ccea — 마법 이펙트, 강조색
- **Ground Soil:** #1a1026 ~ #62418a — 땅, 흙 톤
- **Fog Atmosphere:** #3a3c5c ~ #c1e2e8 — 안개, 달빛, 분위기
- **Tree Vegetation:** #2e1b46 ~ #a49bf3 — 나무, 식물

- **Typography:**
- **Headings:** 고전적인 느낌의 Serif 서체 (예: Cinzel, Playfair Display).
- **Body:** 가독성이 높은 깔끔한 Sans-serif (예: Pretendard, Noto Sans).

- **Visual Elements:** 카드 뒷면의 복잡하고 아름다운 기하학적 패턴.
- 클릭/스와이프 시 발생하는 은은한 빛의 궤적(Particle Trail).

---

## 4. Future Roadmap & Strategic Constraints

- **Scalable Data Schema:** 웨이트 타로를 넘어 오라클, 점성술 등으로 확장 가능한 **Generic Card JSON Schema** 설계 (Flutter 모바일 앱과의 데이터 호환성 보장).
- **CRM & Retention:** \* **Magic Mail:** 상담 결과를 잊지 않도록 정기적인 리마인드 이메일 발송.
- **Past & Present Comparison:** 이전 기록과 현재를 비교하여 유저의 성장을 시각화하는 대시보드 제공.

- **Global Reach:** `vue-i18n`을 활용한 다국어(KOR/ENG/JPN) 지원 및 문화권별 타로 해석 톤앤매너 최적화.
- **Social Amplification:** SNS 공유 시 가장 예쁘게 보일 수 있는 '오늘의 카드 결과지' 이미지 생성 기능 (Open Graph 최적화).

PixiJS와 Vue의 생명주기 관리: Pixi 캔버스가 Vue 컴포넌트 언마운트 시점에 메모리에서 완전히 해제되도록 destroy({ children: true }) 처리를 철저히 해야 메모리 누수를 방지할 수 있습니다.

AI 비용 최적화: 모든 해석을 매번 생성하기보다, 자주 나오는 카드 조합이나 키워드에 대해서는 부분적인 캐싱(Caching) 또는 Pre-defined Templates를 활용하여 API 응답 속도와 비용을 동시에 잡는 것이 좋습니다.

에너지 교환(복채)의 UX: 광고 시청이 몰입감을 깨지 않도록, '마녀의 집회에 바치는 공물'이라는 서사적인 연출(예: 불꽃이 타오르며 광고가 나타남)을 더하면 이질감을 줄일 수 있습니다.
