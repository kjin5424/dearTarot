import { BaseScene } from "~pixi/scenes/BaseScene";
import { ForestBackground } from "~pixi/objects/ForestBackground";
import { CardDeck } from "~pixi/objects/CardDeck";
import type { CardSprite } from "~pixi/objects/CardSprite";
import type { Camera } from "~pixi/Camera";
import { useTarotStore } from "@stores/useTarotStore";
import type { DrawnCard } from "@types/index";

const SPREAD_COUNTS: Record<string, number> = {
  ONE_CARD: 1,
  THREE_CARD: 3,
  CELTIC_CROSS: 10,
};

const SPREAD_WIDTH: Record<string, number> = {
  ONE_CARD: 0,
  THREE_CARD: 160,
  CELTIC_CROSS: 260,
};

export class DrawScene extends BaseScene {
  private deck: CardDeck;
  private selectedCount = 0;
  private requiredCount = 1;

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

    const store = useTarotStore();
    const spreadType = store.spreadType ?? "ONE_CARD";
    this.requiredCount = SPREAD_COUNTS[spreadType] ?? 1;
    this.selectedCount = 0;

    await this.deck.fan(this.requiredCount, SPREAD_WIDTH[spreadType] ?? 0);

    const cards = this.deck.getTopCards(this.requiredCount);
    cards.forEach((card) => card.enableClick((c) => this.onCardClick(c)));
  }

  private async onCardClick(card: CardSprite) {
    card.disableClick();
    await card.flip();
    this.selectedCount++;

    if (this.selectedCount >= this.requiredCount) {
      const store = useTarotStore();
      const cards = this.deck.getTopCards(this.requiredCount);
      const drawnCards: DrawnCard[] = cards.map((c, i) => ({
        card: {
          id: c.cardIndex,
          name: `Card ${c.cardIndex}`,
          nameKr: `카드 ${c.cardIndex}`,
          arcana: c.cardIndex < 22 ? "Major" : "Minor",
          suit: null,
          rank: null,
          number: c.cardIndex,
          image: "",
        },
        position: `position-${i}`,
        isReversed: Math.random() < 0.3,
      }));

      store.setDrawnCards(drawnCards);
      await new Promise<void>((r) => setTimeout(r, 800));
      store.goTo("READING");
    }
  }

  async exit() {
    const cards = this.deck.getTopCards(this.requiredCount);
    cards.forEach((c) => c.disableClick());
  }
}
