import { defineStore } from "pinia";
import { ref } from "vue";
import type { SceneName, SpreadType, KarmaOption, DrawnCard } from "@types/index";

export const useTarotStore = defineStore("tarot", () => {
  const currentScene = ref<SceneName>("FOREST_INTRO");
  const question = ref("");
  const spreadType = ref<SpreadType | null>(null);
  const karmaOption = ref<KarmaOption | null>(null);
  const drawnCards = ref<DrawnCard[]>([]);

  function goTo(scene: SceneName) {
    currentScene.value = scene;
  }

  function setQuestion(q: string) {
    question.value = q;
  }

  function setSpread(type: SpreadType) {
    spreadType.value = type;
  }

  function setKarma(option: KarmaOption) {
    karmaOption.value = option;
  }

  function setDrawnCards(cards: DrawnCard[]) {
    drawnCards.value = cards;
  }

  function reset() {
    currentScene.value = "FOREST_INTRO";
    question.value = "";
    spreadType.value = null;
    karmaOption.value = null;
    drawnCards.value = [];
  }

  return {
    currentScene,
    question,
    spreadType,
    karmaOption,
    drawnCards,
    goTo,
    setQuestion,
    setSpread,
    setKarma,
    setDrawnCards,
    reset,
  };
});
