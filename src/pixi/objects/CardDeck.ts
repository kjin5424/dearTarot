import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { CardSprite } from "@pixi/objects/CardSprite";

const DECK_SIZE = 78;

export class CardDeck extends PIXI.Container {
  private cards: CardSprite[] = [];

  constructor() {
    super();
    this.buildDeck();
  }

  private buildDeck() {
    for (let i = 0; i < DECK_SIZE; i++) {
      const card = new CardSprite(i);
      card.x = (i * 0.15) - (DECK_SIZE * 0.075);
      card.y = -(i * 0.05);
      this.cards.push(card);
      this.addChild(card);
    }
  }

  gather(): Promise<void> {
    const tweens = this.cards.map((card, i) =>
      gsap.to(card, {
        x: (i * 0.15) - (DECK_SIZE * 0.075),
        y: -(i * 0.05),
        rotation: 0,
        duration: 0.5,
        ease: "power2.inOut",
        delay: i * 0.002,
      })
    );
    return Promise.all(tweens.map((t) => new Promise<void>((r) => t.then(r)))).then(() => undefined);
  }

  shuffle(): Promise<void> {
    return new Promise((resolve) => {
      const tl = gsap.timeline({ onComplete: resolve });

      tl.to(
        this.cards.map((c) => c),
        {
          x: (i: number) => ((i % 2 === 0 ? -1 : 1) * (30 + (i % 5) * 8)),
          y: (i: number) => -10 + (i % 3) * 5,
          rotation: (i: number) => ((i % 2 === 0 ? -1 : 1) * (0.1 + (i % 4) * 0.05)),
          duration: 0.4,
          stagger: 0.005,
          ease: "power1.out",
        }
      );

      tl.to(
        this.cards.map((c) => c),
        {
          x: (i: number) => (i * 0.15) - (DECK_SIZE * 0.075),
          y: (i: number) => -(i * 0.05),
          rotation: 0,
          duration: 0.4,
          stagger: 0.003,
          ease: "power2.inOut",
        },
        "+=0.1"
      );
    });
  }

  fan(count: number, spreadWidth = 200): Promise<void> {
    const selected = this.cards.slice(0, count);
    const step = count > 1 ? spreadWidth / (count - 1) : 0;
    const offset = -spreadWidth / 2;

    const tweens = selected.map((card, i) =>
      gsap.to(card, {
        x: offset + i * step,
        y: 0,
        rotation: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: i * 0.04,
      })
    );
    return Promise.all(tweens.map((t) => new Promise<void>((r) => t.then(r)))).then(() => undefined);
  }

  getCard(index: number): CardSprite {
    return this.cards[index % DECK_SIZE];
  }

  getTopCards(count: number): CardSprite[] {
    return this.cards.slice(0, count);
  }
}
