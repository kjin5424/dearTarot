import * as PIXI from "pixi.js";

const W = 480;
const WORLD_H = 540;

export class ForestBackground extends PIXI.Container {
  constructor() {
    super();
    this.build();
  }

  private build() {
    const sky = new PIXI.Graphics();
    sky.rect(0, 0, W, WORLD_H).fill(0x0d1117);
    this.addChild(sky);

    const fog = new PIXI.Graphics();
    fog.rect(0, 160, W, 120).fill({ color: 0x1e2840, alpha: 0.5 });
    this.addChild(fog);

    this.addChild(this.buildTreeLayer(0x162516, 28, 22, 10));
    this.addChild(this.buildTreeLayer(0x1a2d1a, 18, 38, 14));
    this.addChild(this.buildTreeLayer(0x0f1a0f, 10, 60, 20));

    const ground = new PIXI.Graphics();
    ground.rect(0, WORLD_H - 50, W, 50).fill(0x3d2b1f);
    this.addChild(ground);

    const clearingGround = new PIXI.Graphics();
    clearingGround.rect(60, 380, 360, 120).fill(0x2a1f14);
    this.addChild(clearingGround);

    const moon = new PIXI.Graphics();
    moon.circle(240, 50, 16).fill(0xfff5c0);
    this.addChild(moon);

    const moonGlow = new PIXI.Graphics();
    moonGlow.circle(240, 50, 42).fill({ color: 0xfff5c0, alpha: 0.12 });
    this.addChild(moonGlow);

    const moonGlow2 = new PIXI.Graphics();
    moonGlow2.circle(240, 50, 70).fill({ color: 0xfff5c0, alpha: 0.05 });
    this.addChild(moonGlow2);
  }

  private buildTreeLayer(
    color: number,
    count: number,
    height: number,
    width: number
  ): PIXI.Graphics {
    const g = new PIXI.Graphics();
    const spacing = W / count;

    for (let row = 0; row < 3; row++) {
      for (let i = 0; i < count; i++) {
        const seed = row * 1000 + i * 37;
        const x = i * spacing + ((seed % 11) / 11) * spacing * 0.6;
        const y = row * 180 + 80 + ((seed % 7) / 7) * 30;
        g.poly([x, y, x + width / 2, y - height, x + width, y]).fill(color);
      }
    }
    return g;
  }
}
