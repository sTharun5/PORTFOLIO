<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useMouse, useWindowSize } from '@vueuse/core';

const { x, y } = useMouse();
const { width: windowWidth } = useWindowSize();

const DOTS_COUNT = 10;
const dots = ref(Array.from({ length: DOTS_COUNT }, () => ({ x: 0, y: 0 })));

const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

let rafId: number;

const updateCursor = () => {
  // Cascading follow: First dot follows mouse, rest follow previous dot
  for (let i = 0; i < DOTS_COUNT; i++) {
    const targetX = i === 0 ? x.value : dots.value[i - 1].x;
    const targetY = i === 0 ? y.value : dots.value[i - 1].y;
    
    // Varying LERP factors create the ribbon stretch/lag
    const factor = i === 0 ? 0.25 : 0.15 + (i * 0.02);
    
    dots.value[i].x = lerp(dots.value[i].x, targetX, factor);
    dots.value[i].y = lerp(dots.value[i].y, targetY, factor);
  }
  
  rafId = requestAnimationFrame(updateCursor);
};

onMounted(() => {
  dots.value.forEach(d => {
    d.x = x.value;
    d.y = y.value;
  });
  updateCursor();
});

onUnmounted(() => {
  cancelAnimationFrame(rafId);
});

const isMobile = computed(() => windowWidth.value < 768);
</script>

<template>
  <div v-if="!isMobile" class="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
    <!-- Trailing Dots -->
    <div 
      v-for="(dot, i) in dots" 
      :key="i"
      class="absolute top-0 left-0 rounded-full bg-indigo-600 shadow-sm"
      :style="{ 
        transform: `translate3d(${dot.x - (4 - i * 0.3)}px, ${dot.y - (4 - i * 0.3)}px, 0)`,
        width: `${8 - i * 0.6}px`,
        height: `${8 - i * 0.6}px`,
        opacity: (1 - i / DOTS_COUNT) * 0.6,
        zIndex: DOTS_COUNT - i
      }"
    ></div>
  </div>
</template>

<style scoped>
div {
  will-change: transform, opacity;
}
</style>

<style scoped>
/* Ensure smooth transitions for the scale factor */
div {
  will-change: transform, opacity;
}
</style>
