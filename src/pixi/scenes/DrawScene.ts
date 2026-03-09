import { BaseScene } from "~pixi/scenes/BaseScene";
import { ForestBackground } from "~pixi/objects/ForestBackground";
import { CardDeck } from "~pixi/objects/CardDeck";
import type { CardSprite } from "~pixi/objects/CardSprite";
import type { Camera } from "~pixi/Camera";
import { useTarotStore } from "@stores/useTarotStore";
import type { SpreadType } from "@types/index";
import { drawRandomCards } from "@utils/helpers/cardHelpers";
import { SPREAD_DEFINITIONS } from "@utils/constants/spread/SPREAD_TYPES";

const SPREAD_WIDTH: Record<string, number> = {
  ONE_CARD: 0,
  THREE_CARD: 160,
  FOUR_CARD: 200,
  FIVE_CARD: 220,
  CELTIC_CROSS: 260,
  RELATIONSHIP_SPREAD: 240,
  HORSESHOE_SPREAD: 240,
  MAGIC_SEVEN: 240,
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
    const spreadId = spreadType.toLowerCase();
    const def = SPREAD_DEFINITIONS.find((d) => d.spreadId === spreadId);
    this.requiredCount = def?.cardCount ?? 1;
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
      const spreadType = (store.spreadType ?? "ONE_CARD") as SpreadType;
      const drawnCards = drawRandomCards(spreadType);

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
