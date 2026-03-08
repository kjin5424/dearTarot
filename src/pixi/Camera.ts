import * as PIXI from "pixi.js";
import { gsap } from "gsap";

// PIXI.Container의 y offset을 GSAP으로 이동
export class Camera {
  readonly worldContainer: PIXI.Container; // 모든 씬이 이 안에 있음

  constructor() {
    this.worldContainer = new PIXI.Container();
  }

  moveTo(y: number, duration: number): Promise<void> {
    return new Promise((resolve) => {
      gsap.to(this.worldContainer, {
        y: -y, // 카메라가 내려가면 월드가 올라감
        duration,
        ease: "power2.inOut",
        onComplete: resolve,
      });
    });
  }

  reset() {
    this.worldContainer.y = 0;
  }
}
