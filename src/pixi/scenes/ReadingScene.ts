import { BaseScene } from "~pixi/scenes/BaseScene";
import { ForestBackground } from "~pixi/objects/ForestBackground";
import { CardSprite } from "~pixi/objects/CardSprite";
import type { Camera } from "~pixi/Camera";
import { useTarotStore } from "@stores/useTarotStore";

export class ReadingScene extends BaseScene {
  constructor(private camera: Camera) {
    super();

    const bg = new ForestBackground();
    this.addChild(bg);
  }

  async enter() {
    this.camera.moveTo(270, 0);

    const store = useTarotStore();
    const drawn = store.drawnCards;
    const count = drawn.length || 1;
    const step = count > 1 ? 160 / (count - 1) : 0;

    drawn.forEach((d, i) => {
      const card = new CardSprite(d.card.id);
      card.setFaceUp(true);
      card.x = 240 + (i - (count - 1) / 2) * step;
      card.y = 420;
      if (d.isReversed) card.rotation = Math.PI;
      this.addChild(card);
    });
    // Vue InsightPanel overlay handles interpretation
  }

  async exit() {}
}
