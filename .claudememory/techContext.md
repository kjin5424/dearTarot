# techContext.md

## 기술 스택

### 프레임워크 / 런타임
| 역할 | 기술 |
|------|------|
| UI 프레임워크 | Vue.js 3 (Composition API) |
| 언어 | TypeScript |
| 렌더러 | PixiJS v8 |
| Vue-PixiJS 바인딩 | vue3-pixi (선택적) 또는 직접 통합 |
| 상태 관리 | Pinia |
| 빌드 도구 | Vite |
| 씬 관리 | 직접 구현 (Vue store 기반) |
| 카메라 | 직접 구현 (PixiJS Container offset) |
| 오디오 | Howler.js (PixiJS에 오디오 없음) |
| 애니메이션 | GSAP + PixiJS Ticker |

---

## Phaser와의 핵심 차이

| 항목 | Phaser | PixiJS |
|------|--------|--------|
| 성격 | 게임 엔진 (all-in-one) | 렌더러 (렌더링만) |
| 씬 매니저 | 내장 | 직접 구현 필요 |
| 카메라 | 내장 | Container 이동으로 구현 |
| 오디오 | 내장 | Howler.js 별도 사용 |
| 물리엔진 | 내장 | 없음 (Matter.js 별도) |
| Vue 통합 | EventBus 필요 | Vue 반응형과 직접 연결 가능 |
| 주도권 | Phaser가 주도 | Vue가 주도 |
| 러닝커브 | 높음 | 낮음 (렌더링 API만 학습) |

---

## 레이어 구조

```
┌──────────────────────────────────────────┐
│          Vue.js (DOM Layer)              │
│  입력창 / 모달 / AI패널 / 버튼 / 대화창   │
├──────────────────────────────────────────┤
│         PixiJS (Canvas Layer)            │
│  배경 / 캐릭터 / 카드 / 파티클 / 이펙트   │
└──────────────────────────────────────────┘
```

- PixiJS Application이 `<canvas>`를 소유
- Vue는 canvas 위에 `position: absolute`로 HTML overlay
- **Vue가 씬 상태를 소유** → PixiJS는 현재 씬 상태를 받아 렌더링만 수행
- Phaser 버전과 달리 EventBus 없이 Vue의 반응형 상태를 PixiJS가 직접 구독 가능

---

## 통신 방식: Vue 반응형 직접 연동

PixiJS 버전에서는 Phaser처럼 별도 EventBus가 필수가 아니다.
Vue의 `watch` / `ref`를 PixiJS 렌더 루프에서 직접 참조할 수 있다.

```typescript
// pixi/PixiApp.ts 내부
import { watch } from 'vue'
import { useTarotStore } from '@/stores/useTarotStore'

const store = useTarotStore()

// Vue 상태 변화를 PixiJS가 직접 감지
watch(() => store.currentScene, (newScene) => {
  sceneManager.transitionTo(newScene)
})
```

단, PixiJS → Vue 방향 알림은 여전히 EventBus 또는 store action 호출로 처리.

---

## 폴더 구조

```
src/
├─ App.vue                        ← PixiJS 캔버스 마운트 + Vue UI overlay
├─ main.ts
├─ style.css
│
├─ pixi/                          ← PixiJS 전담 폴더 (game/ 대신 pixi/)
│  ├─ PixiApp.ts                  ← PIXI.Application 인스턴스 생성 및 초기화
│  ├─ SceneManager.ts             ← 씬 전환 직접 구현 (Phaser Scene 대체)
│  ├─ Camera.ts                   ← Container 기반 카메라 이동 직접 구현
│  │
│  ├─ scenes/                     ← PixiJS 씬 클래스 (PIXI.Container 상속)
│  │  ├─ BaseScene.ts             ← 모든 씬의 추상 베이스 클래스
│  │  ├─ ForestIntroScene.ts
│  │  ├─ WitchCircleScene.ts
│  │  ├─ WitchApproachScene.ts
│  │  ├─ ShuffleScene.ts
│  │  ├─ DrawScene.ts
│  │  └─ ReturnScene.ts
│  │
│  ├─ objects/                    ← 재사용 가능한 PixiJS 게임 오브젝트
│  │  ├─ WitchGirl.ts             ← 소녀 스프라이트 클래스
│  │  ├─ WitchCircle.ts           ← 원형 집회 그룹
│  │  ├─ ForestBackground.ts      ← parallax 배경 레이어
│  │  ├─ CardSprite.ts            ← 타로 카드 스프라이트
│  │  └─ CardDeck.ts              ← 카드 덱 (셔플/펼치기)
│  │
│  ├─ animations/                 ← GSAP / PixiJS Ticker 애니메이션
│  │  ├─ shuffleAnim.ts           ← 카드 셔플 애니메이션
│  │  ├─ cameraAnim.ts            ← 카메라 이동 애니메이션
│  │  └─ characterAnim.ts         ← 캐릭터 걷기/말하기 프레임 제어
│  │
│  └─ utils/
│     ├─ pixiLoader.ts            ← 에셋 사전 로딩 관리
│     └─ pixiHelpers.ts           ← PixiJS 유틸 함수 모음
│
├─ components/
│  ├─ overlays/                   ← Vue UI 오버레이 (canvas 위 렌더링)
│  │  ├─ QuestionOverlay.vue      ← 질문 입력창
│  │  ├─ KarmaOverlay.vue         ← 카르마 정화 선택
│  │  ├─ ReadingOverlay.vue       ← AI 해석 패널 (스트리밍)
│  │  └─ EthicsModal.vue          ← 윤리 필터 모달
│  │
│  ├─ common/
│  │  ├─ DialogBox.vue            ← 픽셀 말풍선 (Vue 컴포넌트)
│  │  ├─ PixelButton.vue
│  │  └─ LoadingSprite.vue
│  │
│  └─ tarot/
│     ├─ SpreadLayout.vue         ← 스프레드 슬롯 배치 (Vue 렌더링)
│     ├─ InsightPanel.vue         ← AI 해석 스트리밍 출력
│     ├─ SpreadQuiz.vue           ← 스프레드 결정 질문 UI
│     ├─ KarmaOptions.vue         ← 카르마 3가지 선택지
│     └─ QuestionInput.vue        ← 고민 텍스트 입력창
│
├─ hooks/
│  ├─ data/
│  │  └─ useTarotLogic.ts         ← 핵심 비즈니스 로직
│  ├─ ui/
│  │  ├─ useAudio.ts              ← Howler.js 기반 오디오 훅
│  │  ├─ useSceneTransition.ts    ← SceneManager 연결 훅
│  │  └─ usePixiCanvas.ts         ← PixiApp 초기화 및 캔버스 마운트 훅
│  └─ user/
│     └─ useKarma.ts
│
├─ stores/
│  ├─ useTarotStore.ts            ← currentScene 포함 앱 전체 상태
│  └─ useUserStore.ts
│
├─ services/
│  ├─ api/
│  │  ├─ tarotApi.ts              ← Anthropic API 통신
│  │  └─ karmaApi.ts
│  └─ local/
│     └─ localStorage.ts
│
├─ types/
│  └─ tarot.ts
│
└─ utils/
   ├─ constants/
   │  ├─ tarotData.ts
   │  └─ prompts.ts
   └─ helpers/
      └─ cardHelpers.ts
```

---

## PixiJS 핵심 설정

```typescript
// pixi/PixiApp.ts
import * as PIXI from 'pixi.js'

export const app = new PIXI.Application()

await app.init({
  width: 480,
  height: 270,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  antialias: false,          // 픽셀아트는 반드시 false
  backgroundAlpha: 0,        // 배경 투명 (Vue DOM이 보임)
})

// 전역 스케일 모드: nearest (픽셀아트 흐림 방지)
PIXI.TextureSource.defaultOptions.scaleMode = 'nearest'
```

---

## 카메라 구현 (PixiJS 방식)

```typescript
// pixi/Camera.ts
// Phaser camera.pan() 대신 PIXI.Container의 y offset을 GSAP으로 이동

import { gsap } from 'gsap'

export class Camera {
  private worldContainer: PIXI.Container  // 모든 씬이 이 안에 있음

  moveTo(y: number, duration: number): Promise<void> {
    return new Promise(resolve => {
      gsap.to(this.worldContainer, {
        y: -y,                 // 카메라가 내려가면 월드가 올라감
        duration,
        ease: 'power2.inOut',
        onComplete: resolve,
      })
    })
  }
}
```

---

## 오디오: Howler.js

```typescript
// hooks/ui/useAudio.ts
import { Howl } from 'howler'

const sounds = {
  forest:   new Howl({ src: ['/assets/sounds/forest-ambient.mp3'], loop: true }),
  shuffle:  new Howl({ src: ['/assets/sounds/shuffle.mp3'] }),
  cardflip: new Howl({ src: ['/assets/sounds/cardflip.mp3'] }),
  magic:    new Howl({ src: ['/assets/sounds/magic.mp3'] }),
}

export function useAudio() {
  const play = (key: keyof typeof sounds) => sounds[key].play()
  const stop = (key: keyof typeof sounds) => sounds[key].stop()
  const fadeIn = (key: keyof typeof sounds) => sounds[key].fade(0, 1, 1500)
  return { play, stop, fadeIn }
}
```

---

## 외부 API
- **Anthropic API** (`/v1/messages`): 윤리 필터링, 스트리밍 해석
  - 모델: 미결정 (타로 상수 완성 후 결정)
  - 호출 방식: 미결정 (백엔드 프록시 vs 클라이언트 직접)
  - 현재: mock 데이터 사용
  - 사용처: `filterQuestion()`, `getReading()`
- **EmailJS** (`@emailjs/browser`): 리딩 결과 이메일 발송
- **저장소**: localStorage (`services/local/localStorage.ts`)

---

## 현재 구현 상태 (2026-03-09)

### 설치된 패키지 (package.json)
- vue 3, vue-router (미사용), pinia, axios
- @emailjs/browser, jenesius-vue-modal
- vite, typescript, vue-tsc, sass 미설치

### 미설치 (구현 시 필요)
- pixi.js, gsap, howler (코어 렌더링/애니메이션/오디오)
- sass (SCSS 컴파일 - _color-theme.scss 사용 위해)

### 구현된 코드
- `src/assets/styles/_color-theme.scss` — 5개 컬러 그룹 정의 완료
- 그 외 소스 코드 없음 (빈 상태)

### 에셋 상태
- 픽셀아트 스프라이트시트 없음 (소녀, 숲, 카드 전부 미완성)
- placeholder 색상 박스/도형으로 시작 예정