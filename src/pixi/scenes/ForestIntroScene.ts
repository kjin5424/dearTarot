import { BaseScene } from "@pixi/scenes/BaseScene";
import { ForestBackground } from "@pixi/objects/ForestBackground";
import { panCamera } from "@pixi/animations/cameraAnimation";
import type { Camera } from "@pixi/Camera";
import { useTarotStore } from "@stores/useTarotStore";

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export class ForestIntroScene extends BaseScene {
  private bg: ForestBackground;

  constructor(private camera: Camera) {
    super();
    this.bg = new ForestBackground();
    this.addChild(this.bg);
  }

  async enter() {
    this.camera.reset();
    await wait(1200);
    await panCamera(this.camera, 270, 2.5);
    await wait(600);
    useTarotStore().goTo("WITCH_CIRCLE");
  }

  async exit() {}
}
