# systemPatterns.md (PixiJS 버전)

## 핵심 아키텍처 원칙

### 0. 게임 시점 및 유저 조작

- **시점:** Top-down view (탑다운 뷰)
- **유저 이동:** 없음. 유저가 화살표 키로 직접 캐릭터를 조작하지 않음
- **카메라:** 자동 이동 (y축). 소녀의 안내에 따라 씬이 전환됨
- **유저 인터랙션:** 텍스트 입력, 선택지 클릭, 카드 선택 등 Vue overlay를 통한 간접 조작
- **향후:** 유저 직접 이동 기능 추가 가능성 있음

### 1. Vue가 주도권을 가진다

**Vue가 상태/로직/씬 전환을 소유**, PixiJS는 현재 상태를 받아 그리기만 함

```
Vue (주도)                       PixiJS (종속)
─────────────────                ─────────────────
currentScene 상태 소유            씬 상태 watch → 렌더링 반응
씬 전환 결정                      Container 교체
비즈니스 로직 전담                 스프라이트 / 애니메이션 전담
AI API 호출                       파티클 / 이펙트 전담
```

---

### 2. Single Screen, No Router

- URL 경로는 변경되지 않는다
- Vue Router를 사용하지 않는다
- 씬 전환은 `useTarotStore`의 `currentScene` 상태값 하나로 제어
- `SceneManager.ts`가 `currentScene`을 watch하여 PixiJS 씬 Container를 교체

---

### 3. 레이어 분리

```
Vue 담당                          PixiJS 담당
────────────────                  ────────────────
질문 입력창                        배경 (달, 숲, 안개 parallax)
카르마 선택 UI                     소녀 스프라이트 + 애니메이션
AI 해석 패널                       원형 집회 연출
윤리 필터 모달                     카드 스프라이트 + 뒤집기
대화창 (DialogBox.vue)             셔플 애니메이션
로딩 인디케이터                    파티클 이펙트
씬 상태 관리                       카메라 이동 (Container offset)
오디오 (Howler.js 훅)
```

---

### 4. 씬 구조: PIXI.Container 기반

Phaser의 `Scene` 클래스 대신, 각 씬은 `PIXI.Container`를 상속한 클래스로 구현.

```typescript
// pixi/scenes/BaseScene.ts
export abstract class BaseScene extends PIXI.Container {
  abstract setup(): Promise<void>; // 에셋 로드 + 초기 배치
  abstract enter(): Promise<void>; // 등장 애니메이션
  abstract exit(): Promise<void>; // 퇴장 애니메이션
  abstract destroy(): void; // 메모리 정리
}
```

```typescript
// pixi/SceneManager.ts
// useTarotStore의 currentScene을 watch하여 씬 Container를 worldContainer에 교체

watch(
  () => store.currentScene,
  async (newScene) => {
    await currentSceneInstance?.exit();
    worldContainer.removeChildren();

    const next = sceneMap[newScene]; // 씬 이름 → 클래스 매핑
    await next.setup();
    worldContainer.addChild(next);
    await next.enter();

    currentSceneInstance = next;
  },
);
```

---

### 5. 씬 목록 및 전환 순서

```
FOREST_INTRO
    ↓ 카메라 아래로 이동 (Camera.moveTo)
WITCH_CIRCLE
    ↓ 클릭 또는 타이머
WITCH_APPROACH
    ↓ DialogBox 대화 완료 → store.goToScene('QUESTION_INPUT')
QUESTION_INPUT     ← Vue QuestionOverlay 표시
    ↓ 윤리 필터 통과 → store.goToScene('SPREAD_QUIZ')
SPREAD_QUIZ        ← Vue SpreadQuiz overlay 표시
    ↓ 스프레드 결정 → store.goToScene('KARMA')
KARMA              ← Vue KarmaOverlay 표시
    ↓ 카르마 완료 → store.goToScene('SHUFFLE')
SHUFFLE            ← PixiJS 주도 (카드 셔플 애니메이션)
    ↓ 완료 → store.goToScene('DRAW')
DRAW               ← PixiJS 주도 + Vue SpreadLayout overlay
    ↓ 카드 선택 완료 → store.goToScene('READING')
READING            ← Vue ReadingOverlay 주도 (AI 해석 스트리밍)
    ↓ 완료 → store.goToScene('RETURN')
RETURN
    ↓ 카메라 위로 이동 + resetSession → store.goToScene('FOREST_INTRO')
FOREST_INTRO
```

---

### 6. 캐릭터 이동 패턴

#### 씬 내부 이동 (스프라이트 직접 이동)

`pixi/animations/characterAnim.ts` + GSAP

```typescript
// pixi/objects/WitchGirl.ts
export class WitchGirl extends PIXI.AnimatedSprite {
  async walkTo(targetX: number, duration: number): Promise<void> {
    this.play(); // 걷기 애니메이션 프레임 재생
    await gsap.to(this, { x: targetX, duration, ease: "linear" });
    this.gotoAndStop(0); // idle 프레임으로
  }

  talk() {
    this.gotoAndPlay(FRAME.TALK_START);
  }
  idle() {
    this.gotoAndStop(FRAME.IDLE);
  }
  wave() {
    this.gotoAndPlay(FRAME.WAVE_START);
  }
}
```

#### 씬 전환 이동 (카메라 이동)

`pixi/Camera.ts` + GSAP

```typescript
// 집회 씬으로 카메라 내려가기
await camera.moveTo(SCENE_Y.WITCH_CIRCLE, 2.0);

// 귀환 씬에서 위로 복귀
await camera.moveTo(SCENE_Y.FOREST, 2.0);
```

- `worldContainer.y` 값을 GSAP으로 조작
- 씬들은 worldContainer 안에서 Y좌표로 층층이 배치
- 카메라가 이동하면 해당 층이 뷰포트에 들어옴

```
worldContainer (전체 월드)
    y=0    → ForestIntro 씬
    y=270  → WitchCircle 씬
    y=540  → WitchApproach 씬
    ...
카메라(뷰포트): worldContainer.y = -270 → WitchCircle이 보임
```

---

### 7. PixiJS ↔ Vue 통신 패턴

#### Vue → PixiJS (주 방향)

Vue store 상태 변화를 SceneManager가 watch

```typescript
// PixiJS 측에서 Vue 상태 구독
watch(() => store.currentScene, newScene => { ... })
watch(() => store.drawnCards, cards => { ... })
```

#### PixiJS → Vue (역방향)

store action 직접 호출 또는 EventBus

```typescript
// pixi/scenes/DrawScene.ts 내부
// 카드 클릭 시 Vue store에 직접 기록
onCardClick(cardIndex: number) {
  const card = useTarotLogic().drawCard(cardIndex)
  store.addDrawnCard(card)
  // store 변화를 Vue overlay가 watch하여 UI 업데이트
}
```

EventBus는 꼭 필요한 경우에만 사용 (예: PixiJS 애니메이션 완료 알림)

---

### 8. 에셋 로딩 패턴

```typescript
// pixi/utils/pixiLoader.ts
// 앱 시작 시 모든 에셋 사전 로딩

export async function preloadAssets(): Promise<void> {
  await PIXI.Assets.load([
    { alias: "witch-girl", src: "/assets/images/witch-girl-spritesheet.json" },
    { alias: "forest-bg", src: "/assets/images/forest-bg.png" },
    { alias: "card-back", src: "/assets/images/card-back.png" },
    { alias: "cards", src: "/assets/images/tarot-cards-spritesheet.json" },
  ]);
}
// App.vue의 onMounted에서 preloadAssets() 완료 후 PixiApp 초기화
```

---

### 9. 데이터 흐름

```
유저 인터랙션 (Vue overlay 또는 PixiJS 클릭)
    ↓
hooks/data/useTarotLogic.ts     ← 비즈니스 로직
    ↓
services/api/tarotApi.ts        ← Anthropic API 통신
    ↓
stores/useTarotStore.ts         ← 상태 저장
    ↓
    ├── Vue 컴포넌트 반응형 업데이트 (overlay 표시/숨김)
    └── SceneManager watch → PixiJS 씬 전환 또는 렌더링 업데이트
```

---

### 10. 코딩 컨벤션

- PixiJS 씬 클래스: `BaseScene` 상속, `pixi/scenes/` 폴더
- PixiJS 게임 오브젝트: `PIXI.Container` 또는 `PIXI.AnimatedSprite` 상속, `pixi/objects/` 폴더
- 애니메이션 함수: `pixi/animations/` 폴더, Promise 반환으로 await 가능하게
- Vue overlay: `components/overlays/` 폴더, `pointer-events: all` 명시
- 카드 정/역방향 비율: 정방향 70% / 역방향 30% (`utils/helpers/cardHelpers.ts`)
- 픽셀아트: `PIXI.TextureSource.defaultOptions.scaleMode = 'nearest'` 전역 설정 필수
- 모든 GSAP 애니메이션은 `Promise` 반환하여 `await` 체이닝 가능하게 작성
