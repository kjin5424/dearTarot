import { BaseScene } from "@pixi/scenes/BaseScene";
import { ForestBackground } from "@pixi/objects/ForestBackground";
import { WitchCircle } from "@pixi/objects/WitchCircle";
import type { Camera } from "@pixi/Camera";
import { useTarotStore } from "@stores/useTarotStore";

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export class WitchCircleScene extends BaseScene {
  private circle: WitchCircle;

  constructor(private camera: Camera) {
    super();

    const bg = new ForestBackground();
    this.addChild(bg);

    this.circle = new WitchCircle();
    this.circle.x = 240;
    this.circle.y = 420;
    this.addChild(this.circle);
  }

  async enter() {
    this.camera.moveTo(270, 0);
    this.circle.startRotate(18);
    await wait(3000);
    useTarotStore().goTo("WITCH_APPROACH");
  }

  async exit() {
    await this.circle.stopRotate();
  }
}
