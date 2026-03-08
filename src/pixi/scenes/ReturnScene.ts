import { BaseScene } from "~pixi/scenes/BaseScene";
import { ForestBackground } from "~pixi/objects/ForestBackground";
import { WitchGirl } from "~pixi/objects/WitchGirl";
import { panCamera } from "~pixi/animations/cameraAnimation";
import { gsap } from "gsap";
import type { Camera } from "~pixi/Camera";
import { useTarotStore } from "@stores/useTarotStore";

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export class ReturnScene extends BaseScene {
  private guide: WitchGirl;

  constructor(private camera: Camera) {
    super();

    const bg = new ForestBackground();
    this.addChild(bg);

    this.guide = new WitchGirl();
    this.guide.x = 240;
    this.guide.y = 490;
    this.addChild(this.guide);
  }

  async enter() {
    this.camera.moveTo(270, 0);

    // Girl waves (arm wiggle via scaleX oscillation)
    const waveTween = gsap.to(this.guide.scale, {
      x: -1,
      duration: 0.25,
      yoyo: true,
      repeat: 5,
      ease: "power1.inOut",
    });

    await wait(2000);
    waveTween.kill();
    this.guide.scale.x = 1;

    // Camera pans back up to forest
    await panCamera(this.camera, 0, 2.5);
    await wait(600);

    useTarotStore().reset();
    useTarotStore().goTo("FOREST_INTRO");
  }

  async exit() {}
}
