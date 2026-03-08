import { BaseScene } from "@pixi/scenes/BaseScene";
import { ForestBackground } from "@pixi/objects/ForestBackground";
import { WitchCircle } from "@pixi/objects/WitchCircle";
import { WitchGirl } from "@pixi/objects/WitchGirl";
import { walkGirlTo } from "@pixi/animations/characterAnimation";
import type { Camera } from "@pixi/Camera";

export class WitchApproachScene extends BaseScene {
  private guide: WitchGirl | null = null;
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

    // Detach front girl and walk her to center-front
    this.guide = this.circle.detachGirl(0);
    this.addChild(this.guide);

    await walkGirlTo(this.guide, 240, 480, 1.8);
    // Vue overlay takes control here (DialogBox activates on WITCH_APPROACH scene)
  }

  async exit() {
    if (this.guide) {
      this.guide.idle();
    }
  }
}
