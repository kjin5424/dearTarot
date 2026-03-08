import { BaseScene } from "~pixi/scenes/BaseScene";
import { ForestBackground } from "~pixi/objects/ForestBackground";
import { WitchCircle } from "~pixi/objects/WitchCircle";
import { WitchGirl } from "~pixi/objects/WitchGirl";
import type { Camera } from "~pixi/Camera";

export class SpreadQuizScene extends BaseScene {
  constructor(private camera: Camera) {
    super();

    const bg = new ForestBackground();
    this.addChild(bg);

    const circle = new WitchCircle();
    circle.x = 240;
    circle.y = 420;
    this.addChild(circle);

    const guide = new WitchGirl();
    guide.x = 240;
    guide.y = 480;
    this.addChild(guide);
  }

  async enter() {
    this.camera.moveTo(270, 0);
    // Vue SpreadQuiz overlay handles dialogue selection
  }

  async exit() {}
}
