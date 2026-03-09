import * as PIXI from "pixi.js";
import { gsap } from "gsap";

const STAGE_WIDTH = 480;
const STAGE_HEIGHT = 270;

export function createRect(width: number, height: number, color: number): PIXI.Graphics {
  const g = new PIXI.Graphics();
  g.rect(0, 0, width, height).fill(color);
  return g;
}

export function createCircle(radius: number, color: number): PIXI.Graphics {
  const g = new PIXI.Graphics();
  g.circle(0, 0, radius).fill(color);
  return g;
}

export function centerObject(
  obj: PIXI.Container,
  stageWidth = STAGE_WIDTH,
  stageHeight = STAGE_HEIGHT,
): void {
  obj.x = (stageWidth - obj.width) / 2;
  obj.y = (stageHeight - obj.height) / 2;
}

export function fadeIn(obj: PIXI.Container, duration = 0.5): Promise<void> {
  return new Promise((resolve) => {
    gsap.to(obj, { alpha: 1, duration, onComplete: resolve });
  });
}

export function fadeOut(obj: PIXI.Container, duration = 0.5): Promise<void> {
  return new Promise((resolve) => {
    gsap.to(obj, { alpha: 0, duration, onComplete: resolve });
  });
}

export function pulseEffect(
  obj: PIXI.Container,
  scale = 1.1,
  duration = 0.8,
): gsap.core.Tween {
  return gsap.to(obj.scale, { x: scale, y: scale, yoyo: true, repeat: -1, duration, ease: "sine.inOut" });
}
