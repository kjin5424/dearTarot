// === 씬 전환 훅 ===
// SceneManager를 Vue Composition API로 감싸는 래퍼
// 현재 SceneManager가 store.currentScene을 직접 watch하므로
// 이 훅은 추가적인 전환 효과(페이드, 로딩)를 위한 레이어

// import { ref } from "vue";
// import { useTarotStore } from "~stores/useTarotStore";
// import type { SceneName } from "~types/index";

// === export function useSceneTransition() ===
// 1. const store = useTarotStore()
// 2. const isTransitioning = ref(false)
//
// 3. async function transitionTo(scene: SceneName):
//    - isTransitioning.value = true
//    - await nextTick() (Vue overlay 정리 대기)
//    - store.goTo(scene)
//    - 짧은 딜레이 후 isTransitioning.value = false
//
// 4. return { isTransitioning, transitionTo }
//
// 사용처: App.vue에서 store.goTo() 대신 transitionTo() 사용
// → isTransitioning으로 Vue overlay에 페이드 transition 적용 가능
