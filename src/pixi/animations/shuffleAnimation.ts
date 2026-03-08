import type { CardDeck } from "~pixi/objects/CardDeck";

export async function runShuffleSequence(deck: CardDeck, times = 3): Promise<void> {
  for (let i = 0; i < times; i++) {
    await deck.shuffle();
  }
}
