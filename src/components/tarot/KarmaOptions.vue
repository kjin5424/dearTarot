<template>
  <div class="karma-options">
    <div class="intro">
      <p class="speaker">소녀</p>
      <p class="message">카드를 펼치기 전에, 작은 의례가 필요해요. 당신이 편한 방식으로 골라주세요.</p>
    </div>
    <div class="options">
      <button
        v-for="opt in OPTIONS"
        :key="opt.id"
        class="option-btn"
        :class="{ selected: selected === opt.id }"
        @click="select(opt.id)"
      >
        <span class="opt-icon">{{ opt.icon }}</span>
        <span class="opt-text">
          <strong>{{ opt.title }}</strong>
          <small>{{ opt.desc }}</small>
        </span>
      </button>
    </div>
    <button class="confirm-btn" :disabled="!selected" @click="confirm">
      의례를 치르겠습니다 ▶
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { KarmaOption } from '@types/index'

const OPTIONS: { id: KarmaOption; icon: string; title: string; desc: string }[] = [
  { id: 'DIARY', icon: '✦', title: '감사 일기', desc: '오늘 감사한 일 세 가지를 마음속에 떠올려 주세요.' },
  { id: 'DONATION', icon: '✧', title: '후원', desc: '숲의 목소리를 유지하는 데 작은 힘을 보태주세요.' },
  { id: 'AD', icon: '✦', title: '광고 시청', desc: '짧은 영상 하나로 숲에 빛을 밝혀주세요.' },
]

const emit = defineEmits<{
  selected: [option: KarmaOption]
}>()

const selected = ref<KarmaOption | null>(null)

function select(id: KarmaOption) {
  selected.value = id
}

function confirm() {
  if (!selected.value) return
  emit('selected', selected.value)
}
</script>

<style scoped lang="scss">
.karma-options {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  width: 82%;
  max-width: 480px;
  background-color: rgba(34, 13, 54, 0.95);
  border: 2px solid $Accent-witch-magic-2-hex;
  padding: 16px;
}

.intro {
  margin-bottom: 14px;
}

.speaker {
  font-family: monospace;
  font-size: 10px;
  color: $Accent-witch-magic-4-hex;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 6px;
}

.message {
  font-family: monospace;
  font-size: 11px;
  line-height: 1.6;
  color: $Fog-Atmosphere-5-hex;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}

.option-btn {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 9px 12px;
  background: rgba(53, 29, 99, 0.5);
  border: 1px solid $Ground-Soil-4-hex;
  color: $Fog-Atmosphere-5-hex;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: rgba(114, 64, 168, 0.3);
    border-color: $Accent-witch-magic-3-hex;
  }

  &.selected {
    background: rgba(114, 64, 168, 0.5);
    border-color: $Accent-witch-magic-2-hex;
  }
}

.opt-icon {
  font-size: 14px;
  color: $Accent-witch-magic-3-hex;
  line-height: 1.4;
  flex-shrink: 0;
}

.opt-text {
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong {
    font-family: monospace;
    font-size: 11px;
    font-weight: normal;
    color: $Fog-Atmosphere-6-hex;
    letter-spacing: 0.5px;
  }

  small {
    font-family: monospace;
    font-size: 10px;
    color: $Fog-Atmosphere-3-hex;
    line-height: 1.5;
  }
}

.confirm-btn {
  width: 100%;
  font-family: monospace;
  font-size: 11px;
  padding: 8px;
  background: $Accent-witch-magic-1-hex;
  color: $Fog-Atmosphere-5-hex;
  border: 1px solid $Accent-witch-magic-3-hex;
  cursor: pointer;
  letter-spacing: 1px;
  transition: background 0.15s;

  &:hover:not(:disabled) {
    background: $Accent-witch-magic-2-hex;
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
}
</style>
