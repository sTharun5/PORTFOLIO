<template>
  <div class="antigravity-background">
    <canvas ref="canvasRef" class="canvas" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref(null)

let ctx, W, H, rafId
let particles = []
const PARTICLE_COUNT = 300
// Official Google brand colors
const COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#8AB4F8', '#F28B82', '#FDE293', '#81C995']
const mouse = { x: -1000, y: -1000 }

class Particle {
  constructor() {
    this.reset(true)
  }

  reset(initial = false) {
    // Start mostly in the center for the "Iris" effect
    this.x = initial ? Math.random() * W : W / 2 + (Math.random() - 0.5) * 100
    this.y = initial ? Math.random() * H : H / 2 + (Math.random() - 0.5) * 100
    this.vx = (Math.random() - 0.5) * 1.5
    this.vy = (Math.random() - 0.5) * 1.5
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.size = Math.random() * 2.5 + 0.5
    this.alpha = Math.random() * 0.4 + 0.2
  }

  update() {
    // 1. Centripetal Pull (towards center of viewport)
    const dxCenter = W / 2 - this.x
    const dyCenter = H / 2 - this.y
    const distCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter)
    
    this.vx += (dxCenter / distCenter) * 0.015
    this.vy += (dyCenter / distCenter) * 0.015

    // 2. Mouse Attraction (The "Antigravity" magnetic pull)
    const dxMouse = this.x - mouse.x
    const dyMouse = this.y - mouse.y
    const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)
    
    if (distMouse < 350) {
      const force = (350 - distMouse) / 350
      this.vx -= (dxMouse / distMouse) * force * 0.5
      this.vy -= (dyMouse / distMouse) * force * 0.5
    }

    // 3. Apply Velocity & Damping (Liquid motion)
    this.vx *= 0.98
    this.vy *= 0.98
    this.x += this.vx
    this.y += this.vy

    // 4. Boundary Logic: Wrap or Reset
    if (this.x < -100 || this.x > W + 100 || this.y < -100 || this.y > H + 100) {
      if (Math.random() > 0.95) this.reset()
    }
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.globalAlpha = this.alpha
    ctx.fill()
    ctx.globalAlpha = 1
  }
}

function init() {
  const canvas = canvasRef.value
  if (!canvas) return
  W = canvas.width = window.innerWidth
  H = canvas.height = window.innerHeight
  ctx = canvas.getContext('2d')
  particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle())
}

function loop() {
  ctx.clearRect(0, 0, W, H)
  
  // Draw Subtle Connection Lines (The Constellation Effect)
  ctx.beginPath()
  ctx.lineWidth = 0.5
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    for (let j = i + 1; j < PARTICLE_COUNT; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 90) {
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(0, 0, 0, ${(1 - dist / 90) * 0.05})`
        ctx.stroke()
      }
    }
  }

  particles.forEach(p => {
    p.update()
    p.draw()
  })
  
  rafId = requestAnimationFrame(loop)
}

function onMouseMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function onResize() {
  init()
}

onMounted(() => {
  init()
  loop()
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.antigravity-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: transparent;
}
.canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
