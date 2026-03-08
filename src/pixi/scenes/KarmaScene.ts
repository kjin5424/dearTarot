import * as PIXI from "pixi.js";
import { BaseScene } from "~pixi/scenes/BaseScene";
import { ForestBackground } from "~pixi/objects/ForestBackground";
import { WitchGirl } from "~pixi/objects/WitchGirl";
import type { Camera } from "~pixi/Camera";

export class KarmaScene extends BaseScene {
  constructor(private camera: Camera) {
    super();

    const bg = new ForestBackground();
    this.addChild(bg);

    // Ritual circle glow on ground
    const ritualGlow = new PIXI.Graphics();
    ritualGlow.circle(240, 500, 50).fill({ color: 0x9b30c0, alpha: 0.15 });
    ritualGlow.circle(240, 500, 50).stroke({ color: 0x9b30c0, width: 1, alpha: 0.5 });
    this.addChild(ritualGlow);

    const guide = new WitchGirl();
    guide.x = 240;
    guide.y = 475;
    this.addChild(guide);
  }

  async enter() {
    this.camera.moveTo(270, 0);
    // Vue KarmaOptions overlay handles selection
  }

  async exit() {}
}
