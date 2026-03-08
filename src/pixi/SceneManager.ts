import * as PIXI from "pixi.js";
import { watch, type Ref } from "vue";
import type { SceneName } from "@types/index";
import type { BaseScene } from "~pixi/scenes/BaseScene";
import { Camera } from "~pixi/Camera";

type SceneFactory = () => BaseScene;

export class SceneManager {
  private camera: Camera;
  private sceneRegistry = new Map<SceneName, SceneFactory>();
  private currentScene: BaseScene | null = null;

  constructor(private stage: PIXI.Container) {
    this.camera = new Camera();
    this.stage.addChild(this.camera.worldContainer);
  }

  register(name: SceneName, factory: SceneFactory) {
    this.sceneRegistry.set(name, factory);
  }

  async goTo(name: SceneName) {
    if (this.currentScene) {
      await this.currentScene.exit();
      this.camera.worldContainer.removeChild(this.currentScene);
    }

    const factory = this.sceneRegistry.get(name);
    if (!factory) return;

    const next = factory();
    this.camera.worldContainer.addChild(next);
    this.currentScene = next;
    await next.enter();
  }

  getCamera() {
    return this.camera;
  }

  watchStore(currentSceneRef: Ref<SceneName>) {
    watch(currentSceneRef, (name) => this.goTo(name), { immediate: true });
  }
}
