<template>
  <div id="game-container">
    <canvas ref="canvasRef" />

    <div id="vue-overlay" :class="{ fading: isTransitioning }">
      <DialogBox
        v-if="scene === 'WITCH_APPROACH'"
        :lines="APPROACH_LINES"
        speaker="소녀"
        @done="transitionTo('QUESTION_INPUT')"
      />

      <div v-if="scene === 'QUESTION_INPUT'" class="overlay-centered">
        <QuestionInput @submit="onQuestionSubmit" />
        <EthicsModal
          :visible="ethicsVisible"
          :message="ethicsMessage"
          :suggestion="ethicsSuggestion"
          @close="ethicsVisible = false"
        />
      </div>

      <SpreadAsk v-if="scene === 'SPREAD_QUIZ'" @selected="onSpreadSelected" />

      <KarmaOptions v-if="scene === 'KARMA'" @selected="onKarmaSelected" />

      <InsightPanel
        v-if="scene === 'READING' && store.drawnCards.length > 0"
        :drawn-cards="store.drawnCards"
        :spread-type="store.spreadType!"
        :question="store.question"
        @done="transitionTo('RETURN')"
      />

      <DialogBox
        v-if="scene === 'RETURN'"
        :lines="RETURN_LINES"
        speaker="소녀"
        @done="transitionTo('FOREST_INTRO')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { usePixiCanvas } from "@hooks/ui/usePixiCanvas";
import { useTarotStore } from "@stores/useTarotStore";
import { useSceneTransition } from "@hooks/ui/useSceneTransition";
import DialogBox from "@components/common/DialogBox.vue";
import QuestionInput from "@components/tarot/QuestionInput.vue";
import SpreadAsk from "@components/tarot/SpreadAsk.vue";
import KarmaOptions from "@components/tarot/KarmaOptions.vue";
import InsightPanel from "@components/tarot/InsightPanel.vue";
import EthicsModal from "@components/overlays/EthicsModal.vue";
import type { SpreadType, KarmaOption } from "@types/index";

const { canvasRef } = usePixiCanvas();
const store = useTarotStore();
const { currentScene: scene } = storeToRefs(store);
const { isTransitioning, transitionTo } = useSceneTransition();

const ethicsVisible = ref(false);
const ethicsMessage = ref("");
const ethicsSuggestion = ref("");

const BLOCKED_KEYWORDS = [
  "죽",
  "자살",
  "살인",
  "재해",
  "질병",
  "사망",
  "암",
  "전쟁",
];

const APPROACH_LINES = [
  "...이 숲에서 길을 잃으셨나요?",
  "괜찮아요. 저도 가끔 이 길이 헷갈리거든요.",
  "고민이 있다면 카드에게 물어볼 수 있어요. 같이 해볼까요?",
];

const RETURN_LINES = [
  "카드가 건넨 말이 마음에 남길 바라요.",
  "이 숲은 언제든 다시 열려 있을 거예요.",
  "...잘 가요.",
];

function onQuestionSubmit(text: string) {
  const blocked = BLOCKED_KEYWORDS.some((kw) => text.includes(kw));
  if (blocked) {
    ethicsMessage.value =
      "이 숲의 카드는 그 질문에 답하기 어려워요. 당신을 외면하는 게 아니에요.";
    ethicsSuggestion.value =
      '대신 이런 질문은 어떨까요? "지금 내가 할 수 있는 것은 무엇일까?"';
    ethicsVisible.value = true;
    return;
  }
  store.setQuestion(text);
  transitionTo("SPREAD_QUIZ");
}

function onSpreadSelected(spread: SpreadType) {
  store.setSpread(spread);
  transitionTo("KARMA");
}

function onKarmaSelected(option: KarmaOption) {
  store.setKarma(option);
  transitionTo("SHUFFLE");
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  background-color: $Shadow-group-1-hex;
  overflow: hidden;
}

#game-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  canvas {
    display: block;
    image-rendering: pixelated;
  }
}

#vue-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transition: opacity 0.3s ease;

  &.fading {
    opacity: 0;
    pointer-events: none;
  }

  > * {
    pointer-events: auto;
  }
}

.overlay-centered {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
