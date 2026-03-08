<template>
  <div class="spread-ask">
    <div class="dialog-area">
      <p class="speaker">소녀</p>
      <p class="message">{{ currentStep.message }}</p>
    </div>
    <div class="choices">
      <button
        v-for="choice in currentStep.choices"
        :key="choice.label"
        class="choice-btn"
        @click="choose(choice)"
      >
        {{ choice.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SpreadType } from '@types/index'

interface Choice {
  label: string
  next?: string
  spread?: SpreadType
}

interface Step {
  message: string
  choices: Choice[]
}

const STEPS: Record<string, Step> = {
  start: {
    message: '어떤 식으로 답을 찾고 싶으세요? 빠르게 돌아가고 싶으신가요, 아니면 좀 더 자세히 들여다보고 싶으신가요?',
    choices: [
      { label: '빨리 돌아가고 싶어요.', spread: 'ONE_CARD' },
      { label: '좀 더 알고 싶어요.', next: 'deeper' },
    ],
  },
  deeper: {
    message: '과거와 현재, 미래의 흐름을 보고 싶으신가요? 아니면 더 깊고 복잡한 상황을 풀어보고 싶으신가요?',
    choices: [
      { label: '흐름 정도면 충분해요.', spread: 'THREE_CARD' },
      { label: '뿌리까지 파헤쳐 보고 싶어요.', spread: 'CELTIC_CROSS' },
    ],
  },
}

const emit = defineEmits<{
  selected: [spread: SpreadType]
}>()

const currentStepKey = ref('start')
const currentStep = ref(STEPS.start)

function choose(choice: Choice) {
  if (choice.spread) {
    emit('selected', choice.spread)
    return
  }
  if (choice.next) {
    currentStepKey.value = choice.next
    currentStep.value = STEPS[choice.next]
  }
}
</script>

<style scoped lang="scss">
.spread-ask {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  width: 82%;
  background-color: rgba(34, 13, 54, 0.93);
  border: 2px solid $Accent-witch-magic-2-hex;
  padding: 14px 16px;
}

.dialog-area {
  margin-bottom: 12px;
}

.speaker {
  font-family: monospace;
  font-size: 10px;
  color: $Accent-witch-magic-4-hex;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.message {
  font-family: monospace;
  font-size: 12px;
  line-height: 1.6;
  color: $Fog-Atmosphere-5-hex;
}

.choices {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.choice-btn {
  font-family: monospace;
  font-size: 11px;
  text-align: left;
  padding: 7px 12px;
  background: rgba(53, 29, 99, 0.6);
  border: 1px solid $Ground-Soil-4-hex;
  color: $Fog-Atmosphere-5-hex;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: rgba(114, 64, 168, 0.4);
    border-color: $Accent-witch-magic-3-hex;
    color: $Accent-witch-magic-5-hex;
  }

  &::before {
    content: '▸ ';
    color: $Accent-witch-magic-3-hex;
  }
}
</style>
