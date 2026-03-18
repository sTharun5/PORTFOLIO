<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useMouse, useWindowSize, useWindowScroll } from '@vueuse/core';

const { x, y } = useMouse({ type: 'client' });
const { x: scrollX, y: scrollY } = useWindowScroll();
const { width: windowWidth } = useWindowSize();

const DOTS_COUNT = 15; // Increased for a richer trail
const dots = ref(Array.from({ length: DOTS_COUNT }, () => ({ x: 0, y: 0 })));

const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

let rafId: number;
let lastScrollY = scrollY.value;

const updateCursor = () => {
  const scrollDeltaY = scrollY.value - lastScrollY;
  lastScrollY = scrollY.value;

  for (let i = 0; i < DOTS_COUNT; i++) {
    const targetX = i === 0 ? x.value : dots.value[i - 1].x;
    const targetY = i === 0 ? y.value : dots.value[i - 1].y;
    
    // Antigravity physics: Faster follow at head, massive lag at tail
    const factor = i === 0 ? 0.35 : 0.15 - (i * 0.005);
    
    dots.value[i].x = lerp(dots.value[i].x, targetX, factor);
    // Add scroll awareness to Y to prevent "lagging behind" during fast scroll
    dots.value[i].y = lerp(dots.value[i].y, targetY - (scrollDeltaY * 0.2), factor);
  }
  
  rafId = requestAnimationFrame(updateCursor);
};

onMounted(() => {
  dots.value.forEach(d => {
    d.x = x.value;
    d.y = y.value;
  });
  lastScrollY = scrollY.value;
  updateCursor();
});

onUnmounted(() => {
  cancelAnimationFrame(rafId);
});

const isMobile = computed(() => windowWidth.value < 768);
</script>

<template>
  <div v-if="!isMobile" class="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
    <!-- Antigravity Stardust Trail -->
    <div 
      v-for="(dot, i) in dots" 
      :key="i"
      class="absolute top-0 left-0 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.3)]"
      :class="i % 3 === 0 ? 'bg-indigo-600' : 'bg-indigo-400/60'"
      :style="{ 
        transform: `translate3d(${dot.x}px, ${dot.y}px, 0)`,
        width: `${Math.max(2, 10 - i * 0.6)}px`,
        height: `${Math.max(2, 10 - i * 0.6)}px`,
        opacity: Math.max(0, (1 - i / DOTS_COUNT) * 0.8),
        zIndex: DOTS_COUNT - i,
        filter: i > 5 ? 'blur(1px)' : 'none'
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
