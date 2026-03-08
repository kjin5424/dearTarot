import * as PIXI from "pixi.js";
import { gsap } from "gsap";

export class WitchGirl extends PIXI.Container {
  private body: PIXI.Graphics;
  private isWalking = false;

  constructor(private robeColor = 0x4a0a6b) {
    super();
    this.body = this.buildBody();
    this.addChild(this.body);
  }

  private buildBody(): PIXI.Graphics {
    const g = new PIXI.Graphics();

    // left horn
    g.poly([-3, -14, -1, -20, 1, -14]).fill(0x8a8a8a);
    // right horn
    g.poly([3, -14, 5, -20, 7, -14]).fill(0x8a8a8a);

    // head
    g.circle(2, -9, 5).fill(0xe0c8a0);

    // robe body
    g.rect(-5, -4, 14, 14).fill(this.robeColor);

    // robe hem (slightly wider)
    g.poly([-7, 10, 11, 10, 13, 16, -9, 16]).fill(this.robeColor);

    return g;
  }

  walkTo(tx: number, ty: number, duration = 1.5): Promise<void> {
    this.isWalking = true;
    return new Promise((resolve) => {
      const bobTween = gsap.to(this.body, {
        y: 2,
        duration: 0.2,
        yoyo: true,
        repeat: Math.ceil((duration / 0.4) * 2),
        ease: "power1.inOut",
      });

      gsap.to(this, {
        x: tx,
        y: ty,
        duration,
        ease: "power1.inOut",
        onComplete: () => {
          bobTween.kill();
          this.body.y = 0;
          this.isWalking = false;
          resolve();
        },
      });
    });
  }

  talk() {
    gsap.to(this.body, {
      scaleX: 1.05,
      duration: 0.15,
      yoyo: true,
      repeat: 5,
      ease: "power1.inOut",
    });
  }

  idle() {
    gsap.killTweensOf(this.body);
    gsap.to(this.body, { y: 0, scaleX: 1, duration: 0.1 });
  }
}
