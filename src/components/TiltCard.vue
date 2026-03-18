<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMouseInElement } from '@vueuse/core';

const target = ref<HTMLElement | null>(null);
const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(target);

const cardTransform = computed(() => {
  if (isOutside.value) {
    return 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }
  const MAX_ROTATION = 8;
  const rX = (MAX_ROTATION / 2 - (elementY.value / elementHeight.value) * MAX_ROTATION).toFixed(2);
  const rY = ((elementX.value / elementWidth.value) * MAX_ROTATION - MAX_ROTATION / 2).toFixed(2);
  
  return `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.02, 1.02, 1.02)`;
});

const glareStyle = computed(() => {
  if (isOutside.value) return { opacity: 0 };
  return {
    opacity: 1,
    '--x': `${elementX.value}px`,
    '--y': `${elementY.value}px`
  };
});
</script>

<template>
  <div 
    ref="target" 
    class="relative w-full h-full rounded-2xl bg-glass border border-white/5 shadow-2xl overflow-hidden preserve-3d transition-transform duration-200 ease-out z-10"
    :style="{ transform: cardTransform }"
  >
    <!-- Dynamic glare mask calculated from mouse position -->
    <div 
      class="absolute inset-0 z-50 pointer-events-none glare-mask rounded-2xl" 
      :style="glareStyle"
    ></div>
    
    <!-- Neon glowing border using our custom CSS -->
    <div class="absolute inset-0 z-0 neon-border rounded-2xl opacity-50"></div>
    
    <div class="relative z-10 p-6 h-full flex flex-col items-start translate-z-10 w-full">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.translate-z-10 {
  transform: translateZ(20px);
}
</style>
