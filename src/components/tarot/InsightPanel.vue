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
          :lines="getMockInterpretation(current)"
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
import { getMockInterpretation } from '@services/api/tarotApi'

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
    FOUR_CARD: '포카드',
    FIVE_CARD: '파이브카드',
    CELTIC_CROSS: '켈틱 크로스',
    RELATIONSHIP_SPREAD: '관계 스프레드',
    HORSESHOE_SPREAD: '말굽 스프레드',
    MAGIC_SEVEN: '매직 세븐',
  }
  return map[props.spreadType]
})

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
