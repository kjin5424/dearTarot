# Tech Context

## 1. Tech Stack & Versions

### Runtime & Tooling

| 항목            | 버전     |
| --------------- | -------- |
| Node.js         | v24.12.0 |
| Package Manager | npm      |
| TypeScript      | ^5.9.3   |
| Vite            | ^7.3.1   |

### Core Dependencies

| Package          | Version | 용도                               |
| ---------------- | ------- | ---------------------------------- |
| react            | ^19.2.3 | UI 라이브러리                      |
| react-dom        | ^19.2.3 | DOM 렌더링                         |
| react-router-dom | ^7.11.0 | SPA 라우팅                         |
| axios            | ^1.13.2 | HTTP 클라이언트                    |
| nanoid           | ^5.1.6  | 로컬 고유 ID 생성 (서버 없는 단계) |
| react-modal      | ^3.16.3 | 접근성 모달                        |

### Dev Dependencies

| Package              | Version  | 용도                      |
| -------------------- | -------- | ------------------------- |
| @vitejs/plugin-react | ^5.1.4   | Vite React 플러그인       |
| sass                 | ^1.97.3  | SCSS 컴파일러             |
| vite-plugin-svgr     | ^4.5.0   | SVG → React 컴포넌트 변환 |
| @types/react         | ^19.2.14 | React 타입 정의           |

### 스크립트

```sh
npm run dev      # Vite 개발 서버 (HMR)
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
```

---

## 2. ⚠️ 즉시 수정이 필요한 설정 문제 2건

### 문제 1: TypeScript strict 비활성화

`tsconfig.json`에 `"strict": false` → **반드시 `true`로 변경 필요.**

`strict: true`가 활성화하는 주요 검사:

- `strictNullChecks`: `null`/`undefined` 타입 오류 방지 (런타임 크래시 원인 1위 차단)
- `noImplicitAny`: 암묵적 `any` 허용 차단
- `strictFunctionTypes`: 콜백 함수 타입 불일치 방지

> **Project→Episode→Page→Cut** 계층처럼 중첩이 깊을수록 타입 오류가 런타임까지 숨어든다. 지금 켜지 않으면 나중에 수십 개 오류를 한꺼번에 수정해야 한다.

**수정 방법:**

```json
// tsconfig.json
"strict": true
```

### 문제 2: tsconfig.json에 paths 미등록 (IDE 인식 불가)

`vite.config.ts`는 런타임 별칭을 정의하지만, `tsconfig.json`에 `paths`가 없으면 **TypeScript 컴파일러와 IDE(VS Code)가 별칭을 인식하지 못해 빨간 줄 발생.**

**수정 방법 (vite.config.ts alias와 1:1 대응):**

```json
// tsconfig.json compilerOptions에 추가
"paths": {
  "assets/*":     ["assets/*"],
  "components/*": ["components/*"],
  "contexts/*":   ["contexts/*"],
  "hooks/*":      ["hooks/*"],
  "services/*":   ["services/*"],
  "types/*":      ["types/*"],
  "utils/*":      ["utils/*"],
  "Setting/*":    ["Setting/*"]
}
```

---

## 3. Path Alias 현황

### vite.config.ts 등록 별칭

```ts
alias: {
  assets:     './src/assets',
  components: './src/components',
  contexts:   './src/contexts',
  hooks:      './src/hooks',
  services:   './src/services',
  types:      './src/types',
  utils:      './src/utils',
  Setting:    './src/Setting',   // systemPatterns에 미등장 — 용도 확인 필요
}
```

### systemPatterns.md 디렉토리 vs Vite alias 대조

| 디렉토리        | systemPatterns      | vite alias | tsconfig paths |
| --------------- | ------------------- | ---------- | -------------- |
| src/assets/     | ✅                  | ✅         | ❌ 미등록      |
| src/components/ | ✅                  | ✅         | ❌ 미등록      |
| src/contexts/   | ✅                  | ✅         | ❌ 미등록      |
| src/hooks/      | ✅                  | ✅         | ❌ 미등록      |
| src/services/   | ✅                  | ✅         | ❌ 미등록      |
| src/types/      | ✅                  | ✅         | ❌ 미등록      |
| src/utils/      | ✅                  | ✅         | ❌ 미등록      |
| src/config/     | ✅ (axiosConfig.ts) | ❌ 미등록  | ❌ 미등록      |
| src/locales/    | ✅ (i18n)           | ❌ 미등록  | ❌ 미등록      |
| src/Setting/    | ❌ 언급 없음        | ✅         | ❌ 미등록      |

> `src/config/`와 `src/locales/`는 systemPatterns 계획에 있으나 vite.config.ts에 미등록. 디렉토리 생성 시 alias 추가 필요.

### ⚠️ vite-plugin-svgr 미등록

`package.json`에 설치되어 있으나 `vite.config.ts`에 import 및 등록 누락.
SVG를 React 컴포넌트로 사용 시 추가 필요:

```ts
// vite.config.ts
import svgr from 'vite-plugin-svgr';
plugins: [react(), svgr()],
```

---

## 4. Environment Variables (.env 전략)

서버가 없는 현 단계에서도 파일 구조를 미리 잡아둔다.

| 파일              | 용도                  | Git 추적             |
| ----------------- | --------------------- | -------------------- |
| `.env`            | 공개 기본값 (팀 공유) | ✅                   |
| `.env.local`      | 로컬 전용 민감 정보   | ❌ (.gitignore 필수) |
| `.env.production` | 프로덕션 빌드 주입    | ✅ (값 제외)         |

**Vite 환경 변수 규칙:** 반드시 `VITE_` prefix 필요, 클라이언트 코드에서 `import.meta.env.VITE_*`로 접근.

```sh
# .env.local 예시 (현재 단계)
VITE_APP_ENV=development
VITE_API_BASE_URL=http://localhost:8080/api   # 서버 도입 후 활성화
```

---

## 5. Data Normalization

### 설계 원칙

중첩 구조(nested) 대신 **ID 기반 평탄화(flat)** 로 상태 관리.
특정 Cut 수정 시 Project 전체가 리렌더링되는 현상 방지.

### 핵심 인터페이스 (`src/types/entities.ts`) ✅ 확정

```ts
interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface Project extends BaseEntity {
  bookshelfId: string;
  title: string;
  coverImageAssetId: string | null;
  isFavorited: boolean;
  permissions: Record<string, Permission>;
  settings: ProjectSettings;
  episodeOrder: string[];
}

type EpisodeStatus = "draft" | "inProgress" | "done"; // 예정 | 진행중 | 완료
interface Episode extends BaseEntity {
  projectId: string;
  title: string;
  thumbnailUrl: string | null;
  status: EpisodeStatus;
  deadline: string | null;
  permissions: Record<string, Permission>;
  settings: EpisodeSettings | null;
  pageOrder: string[];
}

interface Page extends BaseEntity {
  episodeId: string;
  pageType: "single" | "spread";
  side: "left" | "right" | null;
  cutOrder: string[];
  scriptSnippetOrder: string[];
}

interface Cut extends BaseEntity {
  pageId: string;
  frame: CutFrame;
  assetId: string | null;
}

// Memo: Project/Episode/Page/Cut 단독+상세 메모 통합
// order: Lexosort (DETAIL), 'a0' 고정 (SINGLE)
// emoji: EPISODE SINGLE, CUT SINGLE 전용
// parentId: null = CUT SINGLE 미배정 상태
interface Memo extends BaseEntity {
  parentId: string | null;
  parentType: "PROJECT" | "EPISODE" | "PAGE" | "CUT";
  role: "SINGLE" | "DETAIL";
  content: string;
  order: string;
  tags: string[];
  emoji: string | null;
}

// ScriptSnippet = cutDetailMemo: 컷에 배정 가능한 대사/지문
// cutId: null = 미배정 (isAssigned boolean 폐기, cutId===null로 판단)
// type/speakerId: 보류 — 캐릭터 시스템 확정 전 미활성화
interface ScriptSnippet extends BaseEntity {
  pageId: string;
  cutId: string | null;
  content: string;
  type: "dialog" | "narration" | "sfx" | "action";
  speakerId: string | null;
  order: string;
}

interface CutFrame {
  x: number;
  y: number;
  w: number;
  h: number;
  vertices?: [number, number][]; // 비정형 다각형 컷 (선택)
}
```

### 정규화 스토어 구조 (`src/types/store.ts`) ✅ 확정

```ts
interface NormalizedStore {
  bookshelves: Record<string, Bookshelf>;
  projects: Record<string, Project>;
  episodes: Record<string, Episode>;
  pages: Record<string, Page>;
  cuts: Record<string, Cut>;
  memos: Record<string, Memo>; // ← 추가
  scriptSnippets: Record<string, ScriptSnippet>;
  assets: Record<string, Asset>;
}
```

### Settings 상속 로직 (Episode > Project > User > Default)

```ts
const resolveSettings = (
  episode: Episode,
  project: Project,
): ResolvedSettings => ({
  ...DEFAULT_SETTINGS,
  ...project.settings,
  ...(episode.settings ?? {}), // null이면 스프레드 무시
});
```

---

## 6. Coordinate System (B4 Inner Frame 기준)

### 규격 상수 (`src/utils/b4Layout.ts`)

```ts
export const B4_SPEC = {
  BLEED: { w: 324, h: 238 }, // 제판선 (전체 캔버스), CSS: aspect-ratio: 324/238
  TRIM: { w: 312, h: 226 }, // 재단선 — 참조용 수치만 보존, 가이드라인 오버레이 미표시
  INNER: { w: 270, h: 180 }, // 내곽선 — 모든 컷 배치 기준
  BLEED_MM: 6,
  MARGIN: { top: 21, bottom: 21, gutter: 12, outer: 23 }, // mm
} as const;
```

### CutFrame 타입 — Inner Frame 기준 % 좌표

```ts
interface CutFrame {
  x: number; // Inner Frame 좌측 기준 % (0~100)
  y: number; // Inner Frame 상단 기준 % (0~100)
  w: number; // Inner Frame 너비 기준 % (0~100)
  h: number; // Inner Frame 높이 기준 % (0~100)
}
// 전면 컷: { x:0, y:0, w:100, h:100 }
// 좌상단 1/4: { x:0, y:0, w:50, h:50 }
```

### 유틸리티 함수 (`src/utils/b4Layout.ts`)

```ts
// % 좌표 → px 변환 (렌더링 시점에만 호출)
export const frameToPixels = (
  frame: CutFrame,
  containerPx: { w: number; h: number },
) => ({
  x: (frame.x / 100) * containerPx.w,
  y: (frame.y / 100) * containerPx.h,
  w: (frame.w / 100) * containerPx.w,
  h: (frame.h / 100) * containerPx.h,
});

// Inner Frame의 캔버스 내 실제 offset 계산
export const calcInnerFrameOffset = (canvasPx: { w: number; h: number }) => {
  const sx = canvasPx.w / B4_SPEC.BLEED.w;
  const sy = canvasPx.h / B4_SPEC.BLEED.h;
  return {
    top: B4_SPEC.MARGIN.top * sy,
    left: B4_SPEC.MARGIN.gutter * sx,
    w: B4_SPEC.INNER.w * sx,
    h: B4_SPEC.INNER.h * sy,
  };
};

// 개발 모드 가이드라인 표시 여부
export const SHOW_GUIDELINES = import.meta.env.DEV;
```

### CSS 캔버스 비율 유지

```scss
.canvas-b4 {
  aspect-ratio: 324 / 238;
  width: 100%;
  max-width: 800px; // 편집 뷰 최대 너비
}
```

가이드라인 색상: **내곽선** (파란색 — 컷 미분할 시 / 검정색 — 컷 분할 후), **제판선** (파란색). 재단선 오버레이 미표시.

---

## 7. State Management

### Context + useReducer 액션 타입

```ts
// src/contexts/StoreContext.tsx
type Action =
  // Cut
  | { type: "ADD_CUT"; payload: { pageId: string; frame: CutFrame } }
  | { type: "MOVE_CUT"; payload: { cutId: string; newFrame: CutFrame } }
  | { type: "DELETE_CUT"; payload: { cutId: string } }
  // Script
  | { type: "ASSIGN_SCRIPT"; payload: { cutId: string; snippetId: string } }
  | { type: "UNASSIGN_SCRIPT"; payload: { cutId: string } }
  // Ordering
  | { type: "REORDER_CUTS"; payload: { pageId: string; newCutOrder: string[] } }
  | {
      type: "REORDER_PAGES";
      payload: { episodeId: string; newPageOrder: string[] };
    }
  | {
      type: "REORDER_EPISODES";
      payload: { projectId: string; newEpisodeOrder: string[] };
    }
  // Sync
  | { type: "LOAD_STORE"; payload: NormalizedStore };
```

### Context 분리 (성능 최적화)

단일 Context에 모든 상태를 넣지 않는다.

```
StoreContext    → NormalizedStore 데이터 (entities)
DispatchContext → dispatch 함수만 (데이터 변경 시만 리렌더)
UIContext       → 선택 상태, 편집 모드 등 UI 전용 상태
```

---

## 8. Optimistic Updates & Persistence

### Offline-First 전략 (서버 없는 현 단계)

```
[User Action]
     ↓
[dispatch(action)] ← 즉시 UI 반영 (낙관적 업데이트)
     ↓
[storeReducer] → 새 state 계산
     ↓
[IndexedDB 저장] ← 비동기 백그라운드 (Debounce 500ms)
     ↓ (서버 도입 후)
[API POST/PATCH] ← 실패 시 롤백
```

### 예정 유틸리티 (`src/services/persistence.ts`)

```ts
export const saveToLocal = async (store: NormalizedStore): Promise<void> => {
  // idb 라이브러리 또는 직접 IndexedDB API 사용 예정
};

export const debouncedSave = debounce(saveToLocal, 500);
```

---

## 9. 미도입 라이브러리 (향후 추가 예정)

| 라이브러리      | 용도                               | 시점                |
| --------------- | ---------------------------------- | ------------------- |
| `zod`           | 서버 API 응답 런타임 검증          | 서버 연동 전        |
| `@dnd-kit/core` | ScriptSnippet → Cut 드래그 앤 드롭 | Cut 편집 구현 시    |
| `idb`           | IndexedDB wrapper                  | 로컬 저장소 구현 시 |

---

## 10. Constraints

- **IndexedDB:** 탭 간 공유 불가. 멀티 탭 편집 시 BroadcastChannel API 검토.
- **이미지 에셋:** 현재 단계 `URL.createObjectURL()` 로컬 프리뷰. DB에는 assetId/URL 문자열만 저장.
- **순서 보장:** `episodeOrder`, `pageOrder`, `cutOrder` 배열로 관리. 중간 삽입 빈도가 높아지면 Lexosort 전환 검토.
