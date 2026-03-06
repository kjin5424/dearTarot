# System Patterns

- **1. Tech Stack:**
  - **Framework:** Vue.js 3 (Composition API with <script setup>)
  - **Language:** TypeScript
  - **State Management:** Pinia (Global), ref/reactive (Local)
  - **Styling:** SCSS (Global Variables + Scoped SCSS with BEM)
  - **HTTP Client:** Axios (with Interceptors)
  - **Internationalization:** vue-i18n (한국어, 영어, 일본어 대응)

- **2. Architecture & Directory Structure:**
  - **2-1. Architecture:**
    - **Component Pattern:** Composition API를 기반으로 한 <script setup lang="ts"> 형식을 준수한다.

    - **State Management:**
      - **Global:** Pinia를 사용하여 전역 상태를 관리한다. (타로 결과, 유저 설정 등)
      - **Local:** 컴포넌트 내부 상태는 **ref**와 **reactive**를 사용한다.
      - **Cross-Component:** Props Drilling이 심할 경우에만 Provide/Inject를 검토한다.

    - **Styling:**
      - **Scoped SCSS:** 컴포넌트별로 스타일을 격리하며, BEM 네이밍 컨벤션을 적용한다.
      - **Global Theme:** 색상, 간격, 글꼴 등은 \_variables.scss에 정의된 CSS 변수를 활용한다.

- **2-2. Directory Structure:**
  - `src/assets/`: 정적 자원 (`styles/`, `images/`, `sounds/`)
  - `src/components/`: 재사용 가능한 컴포넌트 (.vue)
    - `common/`: 재사용 UI (Button, Modal, ProgressBar, Skeleton 등)
    - `layout/`: 전체 레이아웃 (Header, Footer, PageTransition 등)
    - `tarot`: 타로 전용 컴포넌트 (Card, Deck, SpreadLayout 등)
  - `src/router/`: Vue Router 설정 및 네비게이션 가드
  - `src/views/`: 라우터에 매핑되는 페이지 단위 컴포넌트 (Intro, Selection, Shuffling, Drawing, Result)
  - `src/config/`: 전역 설정 및 라이브러리 래퍼 (`axiosConfig.ts` 등)
  - `src/hooks/`: 상태 기반 재사용 로직 (`useAuth.ts` 등)
    - `user/`: 사용자 관련 훅
    - `data/`: 데이터(카드) 관련 훅 (`useTarotLogic.ts` 등)
    - `ui/`: 화면 UI 관련 훅 (`useAudio.ts` 등)
  - `src/stores/`: Pinia 기반 전역 상태 (`useTarotStore.ts`, `useUserStore.ts` 등)
  - `src/services/`: API 통신 로직 및 localStorage
    - `api/`: Axios 인스턴스 및 API 호출 로직
    - `storage/`: LocalStorage 래퍼
  - `src/types/`: TypeScript 타입 정의 (`settings.ts` 등)
  - `src/utils/`: 순수 자바스크립트 함수 (Fisher-Yates Shuffle 등)
    - `constants/`: 불변 데이터 (Card Data, Spread Definitions 등)
    - `helpers/`: 상태를 가지지 않는(Stateless) 순수 함수

- **3. Coding Standards:**
  - **3-1. Vue 3 최적화 패턴**
    - **Script Setup:** 모든 컴포넌트는 <script setup lang="ts"> 구조를 사용한다.
    - **Props/Emits:** defineProps와 defineEmits를 사용해 명시적으로 타입을 정의한다.
    - **Composables over Mixins:** 로직 재사용은 컴포저블(`src/hooks`)을 통해서만 수행한다.

  - **3-2. Styling (SCSS)**
    - **Variables:** 색상, 폰트, 신비로운 효과(Blur, Glow) 등은 `\_variables.scss`에 정의하고 전역으로 주입한다.
    - **BEM:** 컴포넌트 클래스 네이밍은 `block\_\_element--modifier` 형식을 권장한다.

  - **3-3. API & Security**
    - **Interceptors:** Request 시에는 타임아웃 처리를, Response 시에는 에러 핸들링을 일괄 처리한다.
    - **Environment Variables:** AI API 엔드포인트(Serverless) 주소 등은 `.env` 파일로 관리한다.
