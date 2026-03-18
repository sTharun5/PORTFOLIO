<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useMouse, useWindowSize } from '@vueuse/core';

const { x, y } = useMouse();
const { width: windowWidth } = useWindowSize();

const cursorX = ref(0);
const cursorY = ref(0);
const dotX = ref(0);
const dotY = ref(0);

const isHovering = ref(false);
const isClicking = ref(false);

const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

let rafId: number;

const updateCursor = () => {
  // Main ring follows with lag (liquid feel)
  cursorX.value = lerp(cursorX.value, x.value, 0.15);
  cursorY.value = lerp(cursorY.value, y.value, 0.15);
  
  // Center dot follows faster
  dotX.value = lerp(dotX.value, x.value, 0.3);
  dotY.value = lerp(dotY.value, y.value, 0.3);
  
  rafId = requestAnimationFrame(updateCursor);
};

const handleMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.closest('.magnetic-trigger') || target.tagName === 'BUTTON' || target.tagName === 'A') {
    isHovering.value = true;
  } else {
    isHovering.value = false;
  }
};

const handleMouseDown = () => isClicking.value = true;
const handleMouseUp = () => isClicking.value = false;

onMounted(() => {
  cursorX.value = x.value;
  cursorY.value = y.value;
  dotX.value = x.value;
  dotY.value = y.value;
  
  updateCursor();
  window.addEventListener('mouseover', handleMouseOver);
  window.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mouseup', handleMouseUp);
});

onUnmounted(() => {
  cancelAnimationFrame(rafId);
  window.removeEventListener('mouseover', handleMouseOver);
  window.removeEventListener('mousedown', handleMouseDown);
  window.removeEventListener('mouseup', handleMouseUp);
});

const isMobile = computed(() => windowWidth.value < 768);
</script>

<template>
  <div v-if="!isMobile" class="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
    <!-- Main Outer Ring (Liquid Feel) -->
    <div 
      class="absolute top-0 left-0 w-10 h-10 border border-indigo-500/40 rounded-full transition-transform duration-500 ease-out flex items-center justify-center bg-indigo-500/5 backdrop-blur-[2px]"
      :style="{ 
        transform: `translate3d(${cursorX - 20}px, ${cursorY - 20}px, 0) scale(${isHovering ? 1.6 : 1}) ${isClicking ? 'scale(0.8)' : ''}`,
        opacity: x === 0 ? 0 : 1
      }"
    ></div>

    <!-- Center Dot (Faster Follow) -->
    <div 
      class="absolute top-0 left-0 w-1.5 h-1.5 bg-indigo-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"
      :style="{ 
        transform: `translate3d(${dotX - 3}px, ${dotY - 3}px, 0) scale(${isHovering ? 0 : 1})`,
        opacity: x === 0 ? 0 : 1
      }"
    ></div>
  </div>
</template>

<style scoped>
/* Ensure smooth transitions for the scale factor */
div {
  will-change: transform, opacity;
}
</style>
