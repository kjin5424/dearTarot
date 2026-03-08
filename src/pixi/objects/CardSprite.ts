import * as PIXI from "pixi.js";
import { gsap } from "gsap";

const CARD_W = 26;
const CARD_H = 42;

export class CardSprite extends PIXI.Container {
  private front: PIXI.Graphics;
  private back: PIXI.Graphics;
  isFaceUp = false;

  constructor(public cardIndex = 0) {
    super();
    this.back = this.buildBack();
    this.front = this.buildFront();
    this.addChild(this.back);
    this.addChild(this.front);
    this.front.visible = false;
  }

  private buildBack(): PIXI.Graphics {
    const g = new PIXI.Graphics();
    g.rect(-CARD_W / 2, -CARD_H / 2, CARD_W, CARD_H).fill(0x1a0a2e);
    g.rect(-CARD_W / 2 + 2, -CARD_H / 2 + 2, CARD_W - 4, CARD_H - 4).stroke({
      color: 0x9b30c0,
      width: 1,
    });
    g.poly([0, -CARD_H / 2 + 5, 4, -CARD_H / 2 + 9, 0, -CARD_H / 2 + 13, -4, -CARD_H / 2 + 9]).fill({
      color: 0x9b30c0,
      alpha: 0.6,
    });
    return g;
  }

  private buildFront(): PIXI.Graphics {
    const g = new PIXI.Graphics();
    g.rect(-CARD_W / 2, -CARD_H / 2, CARD_W, CARD_H).fill(0xf5e6c8);
    g.rect(-CARD_W / 2 + 2, -CARD_H / 2 + 2, CARD_W - 4, CARD_H - 4).stroke({
      color: 0x8a6020,
      width: 1,
    });
    const hue = (this.cardIndex * 37) % 360;
    const color = PIXI.Color.shared.setValue({ h: hue, s: 0.5, l: 0.45 }).toNumber();
    g.circle(0, 0, 8).fill({ color, alpha: 0.8 });
    return g;
  }

  flip(): Promise<void> {
    return new Promise((resolve) => {
      gsap.to(this.scale, {
        x: 0,
        duration: 0.15,
        ease: "power2.in",
        onComplete: () => {
          this.isFaceUp = !this.isFaceUp;
          this.back.visible = !this.isFaceUp;
          this.front.visible = this.isFaceUp;
          gsap.to(this.scale, {
            x: 1,
            duration: 0.15,
            ease: "power2.out",
            onComplete: resolve,
          });
        },
      });
    });
  }

  setFaceUp(v: boolean) {
    this.isFaceUp = v;
    this.back.visible = !v;
    this.front.visible = v;
  }

  enableClick(onClick: (card: CardSprite) => void) {
    this.eventMode = "static";
    this.cursor = "pointer";
    this.on("pointerover", () => gsap.to(this, { y: this.y - 4, duration: 0.1 }));
    this.on("pointerout", () => gsap.to(this, { y: this.y + 4, duration: 0.1 }));
    this.on("pointertap", () => onClick(this));
  }

  disableClick() {
    this.eventMode = "none";
    this.removeAllListeners();
  }
}
