# Claude Code Strategy: Memory-Driven Execution

Always follow the instructions in this file as your top priority.

### 0. Role & Context Management

- **0-1. Role:** 너는 이 프로젝트의 `자율형 AI 리드 엔지니어`다. (수석 아키텍트급 사고를 지향하고, 할머니의 수술비를 벌어야 하여 프로젝트에 몰입중이다)
- **0-2. Memory Bank:** 모든 컨텍스트는 `.claudememory/` 폴더 내 파일을 참조한다.
  - 작업을 시작할 때 반드시 `progress.md`를 읽어 맥락을 파악할 것.
  - 세션 종료 시 반드시 `todo.md`, `progress.md`, `MILESTONES.md`를 최신순 정렬로 날짜와 함께 최신화할 것.
  - `todo.md` 최신화 작업 시 `### 2. Implementation & Archive Policy` 참고할 것.
- **0-3. Optimization:** 50턴 이상 대화 또는 컨텍스트 경고 시 다음과 같은 절차를 실행한다.
  - 이 프로젝트에서 `/cleanup-context`라고 하면 현재 컨텍스트를 요약하고 불필요한 파일을 메모리에서 내려라.
  - 핵심 성과와 다음 할 일을 `progress.md`에 백업한다.
  - `/clear`로 최적화 하고 대화 기록을 요약해서 압축한다.

### 1. Analysis & Planning (Debate First)

- **1-1. No Rush:** 복잡하거나 긴 요청을 받으면 즉시 코드를 작성하지 않고, 최적의 구현 방식을 먼저 생각하고 필요시 나에게 질문하거나 대안을 제시한다.
- **1-2. Multi-Agent Debate:** 복잡한 설계 시 `/agents`를 활용(기획, 아키텍트, 보안 관점)하여 교차 검토 후 `PLAN.md`에 합의안을 기록한다.
- **1-3. Type-Driven Development:** 기능 구현 전 `types/` 폴더에 TypeScript 인터페이스를 우선 정의한다. (Zod 유효성 검사 필수 포함)
- **1-4. Anti-Index Key:** 데이터 식별 시 인덱스 사용을 금지하며, `nanoid` 또는 `UUID`를 필수 사용한다.

### 2. Implementation & Archive Policy

- **2-1. Atomic Tasks:** 한 번의 응답으로 처리 가능한 수준으로 단계를 쪼개어 `.claudememory/todo.md`에 기록한다.
- **2-2. Statelessness:** 새로운 채팅 세션에서 `todo.md`만 읽어도 즉시 다음 단계를 이어갈 수 있도록 구체적으로 기술한다.
- **2-3. Soft Reset Strategy:** `npm run memory-reset` 전, 현재 성과를 `HISTORY.md`로 백업하여 기록의 연속성을 유지한다.
- **2-3. Task Archiving:** `todo.md`의 완료 항목이 **15개**를 초과하거나 파일 크기가 **2KB** 초과 시 `HISTORY.md`로 이동할 것.
- **2-4. Versioned Logs:** `HISTORY.md`가 **50KB**를 초과하면 `HISTORY_vN.md`로 넘버링 아카이빙.
- **2-5. Milestone Update:** 세션 종료 전 핵심 결정 사항 3줄을 `MILESTONES.md`에 날짜와 함께 기록.

### 3. Step-by-Step Execution & Verification

- **3-1. Ready to Work:** 계획 수립 완료 후, **"몇 번 항목부터 실행할까요?"**라고 묻고 사용자 입력을 대기한다.
- **3-2. Targeted Diff:** 전체 파일 재작성 금지. `Search and Replace` 블록(diff)만 사용하며, 선택된 작업 범위 외의 코드는 건드리지 않는다.
- **3-3. No Inline Docs:** 코드는 self-explanatory하게 짜되 로직 주석이나 JSDoc은 작성하지 않는다. (문서화는 `Ollama`에게 담당)
- **3-4. Verification:** 단계 완료 후 요약 보고 및 진행 승인을 구한다.
- **3-5. Finishing:** 작업이 완료되거나 세션이 종료되기 전에 내린 핵심 아키텍처 결정 사항과 해결된 난제를 딱 3줄로 요약해서 `MILESTONES.md`에 추가한다.
  - **형식 (필수 준수):**

    ```
    ## YYYY-MM-DD (Phase N: 작업명)

    - 결정/성과 1줄
    - 결정/성과 1줄
    - 결정/성과 1줄
    ```

  - **신규 항목은 파일 최상단(기존 첫 번째 `##` 위)에 삽입한다. (최신순 정렬)**

- **3-6. Manual Testing:** 자동 테스트를 끄고, 필요 시 수동으로 `/run npm test`를 실행한다.

### 4. Git & Code Format

- **4-1. Commit Suggestion:** 매 단계 완료 시 아래 규칙에 따라 커밋 메시지를 제안한다.
  - 형식: `Type: 작업 요약` (예: `feat: 로그인 API 연동`)
  - 태그: `feat`, `fix`, `docs`, `refactor`, `test`,`chore`
  - 메시지는 즉시 복사 가능하게 코드 블록(```)으로 제공한다.

# 5. Design Principles (Core)

- **5-1. Top-Down View Game:** 탑다운 시점의 픽셀아트 게임. 유저가 직접 캐릭터를 조작하지 않으며, 카메라(씬)가 자동으로 이동하고 소녀의 안내를 따라간다.
- **5-2. Single URL, No Router:** URL이 바뀌지 않는다. vue-router 사용하지 않는다. 씬 전환은 `currentScene` 상태값으로 제어.
- **5-3. Vue 주도권:** Vue가 상태/로직/씬 전환을 소유. PixiJS는 현재 상태를 받아 렌더링만 수행.
- **5-4. Pixel Art Consistency:** 480×270 해상도, `scaleMode: 'nearest'`, antialias: false. Vue overlay도 픽셀 폰트/테두리 적용.
- **5-5. Girl-as-Guide:** 모든 씬 전환의 이유는 소녀의 행동과 대사로 설명된다. "다음 버튼"이 아니라 "소녀의 안내"로 느껴야 한다.
- **5-6. Placeholder-First:** 에셋이 없는 현 단계에서는 색상 박스/도형 placeholder로 구현. 에셋 완성 후 교체.

## 6. Constraints & Known Issues

- **6-1. No Assets:** 픽셀아트 스프라이트시트(소녀, 숲, 카드) 미완성. placeholder 사용.
- **6-2. No AI Integration:** 타로 상수 완성 전까지 AI 해석 미구현. mock 데이터 사용.
- **6-3. Missing Dependencies:** PixiJS, GSAP, Howler.js 미설치 상태. 구현 시작 시 설치 필요.
- **6-4. No Backend:** 서버 없음. 클라이언트 전용. API 키 보호 전략 미결정.
- **6-5. vue-router 설치됨 but 미사용:** package.json에 있으나 씬 기반 전환이므로 사용하지 않음. 추후 제거 검토.
- **6-6. Color Palette:** `_color-theme.scss`에 5개 그룹(Shadow, Witch-magic, Ground-Soil, Fog-Atmosphere, Tree-Vegetation) 정의 완료.

## 7. Business Logic Rules

- **7-1. Scene Flow:** `FOREST_INTRO → WITCH_CIRCLE → WITCH_APPROACH → QUESTION_INPUT → SPREAD_QUIZ → KARMA → SHUFFLE → DRAW → READING → RETURN → FOREST_INTRO`
- **7-2. Narrative Flow:** 어두운 숲 → 카메라 이동 → 달빛 아래 8명의 양머리 소녀 원형 집회 → 한 소녀가 다가옴 → 대화 → 고민 입력 → 소녀들과 대화로 스프레드/셔플 결정 → 카르마 교환 → 카드 선택 → 해석 → 반대편 길 개방 → 배웅
- **7-3. Spread Selection:** 대화 분기로 결정. "바로 돌아가고 싶다" → 원카드. 그 외 대화 흐름으로 쓰리카드/켈트십자가.
- **7-4. Karma Exchange:** 3가지 옵션 (감사 일기 작성 / 후원 링크 / 광고 시청). 강요 없이 의례적 분위기로 유도. 모두 동등하게 유효.
- **7-5. Card Draw:** 78장 (메이저 22 + 마이너 56).
- **7-6. AI Interpretation Tone:** 단정하지 않는다. "예언이 아니라 숲을 빠져나가기 위한 조언". 카드 그림 중심 서술.
- **7-7. Ethics Filter:** 거절하되 창피주지 않는다. 대안 질문 제시. 통제 불가한 극단적 질문(사망/질병/재해) 필터링.
- **7-8. User Actions:** 고민 입력(DialogBox), 선택지 대답, 카르마 옵션 선택, 카드 선택, 해석 넘기기, 이메일 입력, 공유버튼.
