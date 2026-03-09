import { ref, nextTick } from "vue";
import { useTarotStore } from "@stores/useTarotStore";
import type { SceneName } from "@types/index";

export function useSceneTransition() {
  const store = useTarotStore();
  const isTransitioning = ref(false);

  async function transitionTo(scene: SceneName): Promise<void> {
    isTransitioning.value = true;
    await nextTick();
    store.goTo(scene);
    await new Promise<void>((r) => setTimeout(r, 300));
    isTransitioning.value = false;
  }

  return { isTransitioning, transitionTo };
}
