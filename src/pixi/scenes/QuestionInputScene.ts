import { BaseScene } from "~pixi/scenes/BaseScene";
import { ForestBackground } from "~pixi/objects/ForestBackground";
import { WitchGirl } from "~pixi/objects/WitchGirl";
import type { Camera } from "~pixi/Camera";

export class QuestionInputScene extends BaseScene {
  constructor(private camera: Camera) {
    super();

    const bg = new ForestBackground();
    this.addChild(bg);

    const guide = new WitchGirl();
    guide.x = 240;
    guide.y = 480;
    this.addChild(guide);
  }

  async enter() {
    this.camera.moveTo(270, 0);
    // Vue DialogBox/QuestionInput overlay handles user input
  }

  async exit() {}
}
