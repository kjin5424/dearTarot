<template>
  <div class="insight-panel">
    <div class="panel-header">
      <span class="spread-label">{{ spreadLabel }}</span>
      <span class="page-indicator">{{ currentIndex + 1 }} / {{ drawnCards.length }}</span>
    </div>

    <div class="card-reading" v-if="current">
      <div class="card-meta">
        <span class="position-label">{{ current.position }}</span>
        <span class="card-name">{{ current.card.nameKr }}</span>
        <span class="reversed-badge" v-if="current.isReversed">역방향</span>
      </div>
      <div class="insight-text">
        <DialogBox
          :lines="getMockLines(current)"
          speaker="숲의 목소리"
          :speed="30"
          @done="onLineDone"
        />
      </div>
    </div>

    <div class="panel-nav" v-if="!isTypingActive">
      <button class="nav-btn" v-if="currentIndex > 0" @click="prev">◀ 이전</button>
      <button class="nav-btn primary" v-if="currentIndex < drawnCards.length - 1" @click="next">다음 ▶</button>
      <button class="nav-btn primary" v-else @click="emit('done')">숲을 나서겠습니다 ▶</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { DrawnCard, SpreadType } from '@types/index'
import DialogBox from '@components/common/DialogBox.vue'

const props = defineProps<{
  drawnCards: DrawnCard[]
  spreadType: SpreadType
}>()

const emit = defineEmits<{
  done: []
}>()

const currentIndex = ref(0)
const isTypingActive = ref(true)

const current = computed(() => props.drawnCards[currentIndex.value])

const spreadLabel = computed(() => {
  const map: Record<SpreadType, string> = {
    ONE_CARD: '원카드',
    THREE_CARD: '쓰리카드',
    CELTIC_CROSS: '켈틱 크로스',
  }
  return map[props.spreadType]
})

function getMockLines(card: DrawnCard): string[] {
  const dir = card.isReversed ? '역방향으로 놓인 ' : ''
  return [
    `${dir}${card.card.nameKr} 카드가 이 자리에 있군요.`,
    `이 카드는 예언이 아니에요. 숲을 빠져나가기 위한 하나의 조언으로 받아들여 주세요.`,
    `지금 이 순간, 이 카드가 당신에게 건네는 말을 천천히 들어보세요.`,
  ]
}

function onLineDone() {
  isTypingActive.value = false
}

function next() {
  currentIndex.value++
  isTypingActive.value = true
}

function prev() {
  currentIndex.value--
  isTypingActive.value = true
}
</script>

<style scoped lang="scss">
.insight-panel {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 88%;
  max-width: 560px;
  background-color: rgba(26, 16, 38, 0.97);
  border: 2px solid $Accent-witch-magic-2-hex;
  border-bottom: none;
  padding: 14px 16px 0;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid $Ground-Soil-4-hex;
}

.spread-label {
  font-family: monospace;
  font-size: 10px;
  color: $Accent-witch-magic-4-hex;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.page-indicator {
  font-family: monospace;
  font-size: 10px;
  color: $Fog-Atmosphere-3-hex;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.position-label {
  font-family: monospace;
  font-size: 10px;
  color: $Fog-Atmosphere-3-hex;
  padding: 2px 6px;
  border: 1px solid $Ground-Soil-4-hex;
}

.card-name {
  font-family: monospace;
  font-size: 13px;
  color: $Fog-Atmosphere-6-hex;
  letter-spacing: 0.5px;
}

.reversed-badge {
  font-family: monospace;
  font-size: 9px;
  color: $Accent-witch-magic-3-hex;
  border: 1px solid $Accent-witch-magic-2-hex;
  padding: 1px 5px;
}

.insight-text {
  position: relative;
  min-height: 100px;

  :deep(.dialog-box) {
    position: static;
    transform: none;
    width: 100%;
    bottom: auto;
    left: auto;
  }
}

.panel-nav {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 10px 0 14px;
}

.nav-btn {
  font-family: monospace;
  font-size: 11px;
  padding: 6px 14px;
  background: transparent;
  border: 1px solid $Ground-Soil-4-hex;
  color: $Fog-Atmosphere-4-hex;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: $Accent-witch-magic-3-hex;
    color: $Fog-Atmosphere-5-hex;
  }

  &.primary {
    background: $Accent-witch-magic-1-hex;
    border-color: $Accent-witch-magic-2-hex;
    color: $Fog-Atmosphere-5-hex;

    &:hover {
      background: $Accent-witch-magic-2-hex;
    }
  }
}
</style>
