<template>
  <Transition name="fade">
    <div v-if="visible" class="ethics-backdrop" @click.self="close">
      <div class="ethics-modal">
        <p class="modal-speaker">소녀</p>
        <p class="modal-message">{{ message }}</p>
        <p class="modal-alt" v-if="suggestion">{{ suggestion }}</p>
        <button class="close-btn" @click="close">다른 질문을 해볼게요</button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  visible: boolean
  message?: string
  suggestion?: string
}>()

const emit = defineEmits<{
  close: []
}>()

function close() {
  emit('close')
}
</script>

<style scoped lang="scss">
.ethics-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(26, 16, 38, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ethics-modal {
  width: 78%;
  max-width: 440px;
  background: rgba(34, 13, 54, 0.98);
  border: 2px solid $Accent-witch-magic-2-hex;
  padding: 20px 18px;
}

.modal-speaker {
  font-family: monospace;
  font-size: 10px;
  color: $Accent-witch-magic-4-hex;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.modal-message {
  font-family: monospace;
  font-size: 12px;
  line-height: 1.7;
  color: $Fog-Atmosphere-5-hex;
  margin-bottom: 10px;
}

.modal-alt {
  font-family: monospace;
  font-size: 11px;
  line-height: 1.6;
  color: $Fog-Atmosphere-3-hex;
  padding: 8px 10px;
  border-left: 2px solid $Accent-witch-magic-3-hex;
  margin-bottom: 16px;
  background: rgba(53, 29, 99, 0.3);
}

.close-btn {
  width: 100%;
  font-family: monospace;
  font-size: 11px;
  padding: 8px;
  background: transparent;
  border: 1px solid $Ground-Soil-4-hex;
  color: $Fog-Atmosphere-4-hex;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: all 0.15s;

  &:hover {
    border-color: $Accent-witch-magic-3-hex;
    color: $Fog-Atmosphere-5-hex;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
