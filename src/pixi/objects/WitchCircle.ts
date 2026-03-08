import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { WitchGirl } from "~pixi/objects/WitchGirl";

const GIRL_COUNT = 8;
const RADIUS = 70;
const ROBE_COLORS = [
  0x4a0a6b, 0x3d0a5e, 0x5a1080, 0x420d70,
  0x4f0e78, 0x380858, 0x530f7a, 0x3a0960,
];

export class WitchCircle extends PIXI.Container {
  private girls: WitchGirl[] = [];
  private rotateTween: gsap.core.Tween | null = null;

  constructor() {
    super();
    this.buildCircle();
  }

  private buildCircle() {
    const glowRing = new PIXI.Graphics();
    glowRing
      .circle(0, 0, RADIUS + 10)
      .fill({ color: 0x9b30c0, alpha: 0.08 })
      .circle(0, 0, RADIUS)
      .stroke({ color: 0x9b30c0, width: 1, alpha: 0.4 });
    this.addChild(glowRing);

    for (let i = 0; i < GIRL_COUNT; i++) {
      const angle = (i / GIRL_COUNT) * Math.PI * 2 - Math.PI / 2;
      const girl = new WitchGirl(ROBE_COLORS[i]);
      girl.x = Math.cos(angle) * RADIUS;
      girl.y = Math.sin(angle) * RADIUS;
      this.girls.push(girl);
      this.addChild(girl);
    }
  }

  startRotate(duration = 20) {
    this.rotateTween = gsap.to(this, {
      rotation: Math.PI * 2,
      duration,
      ease: "none",
      repeat: -1,
    });
  }

  stopRotate(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.rotateTween) {
        resolve();
        return;
      }
      this.rotateTween.kill();
      this.rotateTween = null;
      gsap.to(this, { rotation: 0, duration: 0.5, onComplete: resolve });
    });
  }

  getGirl(index: number): WitchGirl {
    return this.girls[index % GIRL_COUNT];
  }

  detachGirl(index: number): WitchGirl {
    const girl = this.girls[index % GIRL_COUNT];
    const worldPos = this.toGlobal(girl.position);
    this.removeChild(girl);
    girl.x = worldPos.x;
    girl.y = worldPos.y;
    return girl;
  }
}
