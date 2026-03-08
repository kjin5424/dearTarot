<template>
  <div id="game-container">
    <canvas ref="canvasRef" />
    <div id="vue-overlay">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;
  background-color: $shadow-deepest;
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

  > * {
    pointer-events: auto;
  }
}
</style>
