<template>
  <div class="question-input">
    <p class="label">숲에서 묻고 싶은 것을 적어주세요.</p>
    <textarea
      v-model="text"
      class="input-area"
      placeholder="마음속 고민을 써내려가세요..."
      maxlength="200"
      rows="4"
      @keydown.enter.ctrl="trySubmit"
    />
    <div class="input-footer">
      <span class="char-count">{{ text.length }} / 200</span>
      <button class="submit-btn" :disabled="text.trim().length < 5" @click="trySubmit">
        건네기 ▶
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  submit: [text: string]
}>()

const text = ref('')

function trySubmit() {
  const trimmed = text.value.trim()
  if (trimmed.length < 5) return
  emit('submit', trimmed)
}
</script>

<style scoped lang="scss">
.question-input {
  width: 82%;
  max-width: 520px;
  padding: 16px;
  background-color: rgba(34, 13, 54, 0.95);
  border: 2px solid $Accent-witch-magic-2-hex;
}

.label {
  font-family: monospace;
  font-size: 11px;
  color: $Accent-witch-magic-4-hex;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
}

.input-area {
  width: 100%;
  resize: none;
  background: rgba(26, 16, 38, 0.8);
  border: 1px solid $Ground-Soil-4-hex;
  color: $Fog-Atmosphere-5-hex;
  font-family: monospace;
  font-size: 12px;
  line-height: 1.6;
  padding: 8px 10px;
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: $Fog-Atmosphere-2-hex;
  }

  &:focus {
    border-color: $Accent-witch-magic-3-hex;
  }
}

.input-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}

.char-count {
  font-family: monospace;
  font-size: 10px;
  color: $Fog-Atmosphere-3-hex;
}

.submit-btn {
  font-family: monospace;
  font-size: 11px;
  padding: 5px 14px;
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
