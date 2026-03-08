import { BaseScene } from "@pixi/scenes/BaseScene";
import { ForestBackground } from "@pixi/objects/ForestBackground";
import { CardDeck } from "@pixi/objects/CardDeck";
import { runShuffleSequence } from "@pixi/animations/shuffleAnimation";
import type { Camera } from "@pixi/Camera";
import { useTarotStore } from "@stores/useTarotStore";

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export class ShuffleScene extends BaseScene {
  private deck: CardDeck;

  constructor(private camera: Camera) {
    super();

    const bg = new ForestBackground();
    this.addChild(bg);

    this.deck = new CardDeck();
    this.deck.x = 240;
    this.deck.y = 450;
    this.addChild(this.deck);
  }

  async enter() {
    this.camera.moveTo(270, 0);
    await wait(400);
    await runShuffleSequence(this.deck, 3);
    await wait(500);
    useTarotStore().goTo("DRAW");
  }

  async exit() {}
}
