<template>
  <div class="dialog-box" @click="handleClick">
    <p v-if="speaker" class="dialog-speaker">{{ speaker }}</p>
    <p class="dialog-text">
      {{ displayedText }}<span class="cursor" :class="{ hidden: !isTyping }">▌</span>
    </p>
    <span class="dialog-prompt" v-if="!isTyping && !isDone">▼</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  lines: string[]
  speaker?: string
  speed?: number
}>()

const emit = defineEmits<{
  done: []
}>()

const currentLineIndex = ref(0)
const displayedText = ref('')
const isTyping = ref(false)
const isDone = ref(false)

let timer: ReturnType<typeof setInterval> | null = null

function startTyping() {
  const line = props.lines[currentLineIndex.value]
  displayedText.value = ''
  isTyping.value = true
  let i = 0

  timer = setInterval(() => {
    displayedText.value += line[i]
    i++
    if (i >= line.length) {
      clearInterval(timer!)
      timer = null
      isTyping.value = false
    }
  }, props.speed ?? 40)
}

function handleClick() {
  if (isTyping.value) {
    clearInterval(timer!)
    timer = null
    displayedText.value = props.lines[currentLineIndex.value]
    isTyping.value = false
    return
  }

  if (currentLineIndex.value < props.lines.length - 1) {
    currentLineIndex.value++
    startTyping()
  } else {
    isDone.value = true
    emit('done')
  }
}

onMounted(startTyping)
onUnmounted(() => { if (timer) clearInterval(timer) })
</script>

<style scoped lang="scss">
.dialog-box {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  width: 82%;
  min-height: 80px;
  padding: 12px 16px 10px;
  background-color: rgba(34, 13, 54, 0.92);
  border: 2px solid $Accent-witch-magic-2-hex;
  cursor: pointer;
  user-select: none;
  image-rendering: pixelated;
}

.dialog-speaker {
  font-size: 10px;
  letter-spacing: 1px;
  color: $Accent-witch-magic-4-hex;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.dialog-text {
  font-family: monospace;
  font-size: 12px;
  line-height: 1.6;
  color: $Fog-Atmosphere-5-hex;
  white-space: pre-wrap;
  min-height: 38px;
}

.cursor {
  animation: blink 0.7s step-end infinite;
  color: $Accent-witch-magic-3-hex;

  &.hidden {
    visibility: hidden;
  }
}

.dialog-prompt {
  position: absolute;
  bottom: 6px;
  right: 12px;
  font-size: 10px;
  color: $Accent-witch-magic-3-hex;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
