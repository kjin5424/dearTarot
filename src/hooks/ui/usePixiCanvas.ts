// PixiApp 초기화 및 캔버스 마운트 훅
import { onMounted, onUnmounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { initPixiApp } from "~pixi/PixiApp";
import { SceneManager } from "~pixi/SceneManager";
import { useTarotStore } from "@stores/useTarotStore";
import { ForestIntroScene } from "~pixi/scenes/ForestIntroScene";
import { WitchCircleScene } from "~pixi/scenes/WitchCircleScene";
import { WitchApproachScene } from "~pixi/scenes/WitchApproachScene";
import { QuestionInputScene } from "~pixi/scenes/QuestionInputScene";
import { SpreadQuizScene } from "~pixi/scenes/SpreadQuizScene";
import { KarmaScene } from "~pixi/scenes/KarmaScene";
import { ShuffleScene } from "~pixi/scenes/ShuffleScene";
import { DrawScene } from "~pixi/scenes/DrawScene";
import { ReadingScene } from "~pixi/scenes/ReadingScene";
import { ReturnScene } from "~pixi/scenes/ReturnScene";

export function usePixiCanvas() {
  const canvasRef = ref<HTMLCanvasElement | null>(null);
  let manager: SceneManager | null = null;

  onMounted(async () => {
    if (!canvasRef.value) return;

    const app = await initPixiApp(canvasRef.value);
    const store = useTarotStore();
    const { currentScene } = storeToRefs(store);

    manager = new SceneManager(app.stage);
    const cam = manager.getCamera();

    manager.register("FOREST_INTRO", () => new ForestIntroScene(cam));
    manager.register("WITCH_CIRCLE", () => new WitchCircleScene(cam));
    manager.register("WITCH_APPROACH", () => new WitchApproachScene(cam));
    manager.register("QUESTION_INPUT", () => new QuestionInputScene(cam));
    manager.register("SPREAD_QUIZ", () => new SpreadQuizScene(cam));
    manager.register("KARMA", () => new KarmaScene(cam));
    manager.register("SHUFFLE", () => new ShuffleScene(cam));
    manager.register("DRAW", () => new DrawScene(cam));
    manager.register("READING", () => new ReadingScene(cam));
    manager.register("RETURN", () => new ReturnScene(cam));

    manager.watchStore(currentScene);
  });

  onUnmounted(() => {
    manager = null;
  });

  return { canvasRef };
}
