// PixiApp 초기화 및 캔버스 마운트 훅
import { onMounted, onUnmounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { initPixiApp } from "@pixi/PixiApp";
import { SceneManager } from "@pixi/SceneManager";
import { useTarotStore } from "@stores/useTarotStore";

export function usePixiCanvas() {
  const canvasRef = ref<HTMLCanvasElement | null>(null);
  let manager: SceneManager | null = null;

  onMounted(async () => {
    if (!canvasRef.value) return;

    const app = await initPixiApp(canvasRef.value);
    const store = useTarotStore();
    const { currentScene } = storeToRefs(store);

    manager = new SceneManager(app.stage);
    manager.watchStore(currentScene);
  });

  onUnmounted(() => {
    manager = null;
  });

  return { canvasRef };
}
