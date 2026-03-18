<template>
  <div class="antigravity-background">
    <canvas ref="canvasRef" class="canvas" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const canvasRef = ref(null)

let ctx, W, H, rafId
let particles = []
const PARTICLE_COUNT = 300 // Reduced density for maximum performance and visibility
const COLORS = ['#6366f1', '#0ea5e9', '#f43f5e', '#8b5cf6', '#a5b4fc']

// Physics State
const mouse = { x: 0, y: 0 }
const sphereCenter = { x: 0, y: 0 }
const rotation = { x: 0, y: 0 }
let isInitialized = false

class Capsule3D {
  constructor(index) {
    this.index = index
    this.reset()
  }

  reset() {
    const phi = Math.acos(1 - 2 * (this.index + 0.5) / PARTICLE_COUNT)
    const theta = Math.PI * (1 + Math.sqrt(5)) * (this.index + 0.5)
    
    // Controlled fullscreen spread
    const radius = 250 + Math.random() * 400
    
    this.ox = radius * Math.sin(phi) * Math.cos(theta)
    this.oy = radius * Math.sin(phi) * Math.sin(theta)
    this.oz = radius * Math.cos(phi)
    
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.w = 12 + Math.random() * 8 // Slightly larger for visibility
    this.h = 4
    this.baseRotation = Math.random() * Math.PI * 2
    
    this.twinklePhase = Math.random() * Math.PI * 2
    this.twinkleSpeed = 0.01 + Math.random() * 0.02
  }

  update(rx, ry) {
    if (!W || !H) return

    // 3D Rotation
    const cosX = Math.cos(rx)
    const sinX = Math.sin(rx)
    const cosY = Math.cos(ry)
    const sinY = Math.sin(ry)

    // Orbit
    let x1 = this.ox * cosY - this.oz * sinY
    let z1 = this.ox * sinY + this.oz * cosY
    let y2 = this.oy * cosX - z1 * sinX
    this.z2 = this.oy * sinX + z1 * cosX
    
    const focalLength = 600
    this.scale = focalLength / (focalLength + this.z2)
    
    this.px = x1 * this.scale + (W / 2) + sphereCenter.x
    this.py = y2 * this.scale + (H / 2) + sphereCenter.y
  }

  draw() {
    this.twinklePhase += this.twinkleSpeed
    const shimmer = 0.7 + 0.3 * Math.sin(this.twinklePhase)
    
    if (this.px < -100 || this.px > W+100 || this.py < -100 || this.py > H+100) return

    const alpha = Math.min(1, Math.max(0.05, (this.z2 + 600) / 1200)) * shimmer
    ctx.globalAlpha = alpha
    ctx.fillStyle = this.color
    
    ctx.save()
    ctx.translate(this.px, this.py)
    ctx.rotate(this.baseRotation + (this.twinklePhase * 0.1))
    
    const rw = this.w * this.scale
    const rh = this.h * this.scale
    
    // Direct Rect drawing for maximum compatibility
    ctx.beginPath()
    ctx.rect(-rw/2, -rh/2, rw, rh)
    ctx.fill()
    ctx.restore()
  }
}

function resize() {
  if (!canvasRef.value) return
  W = canvasRef.value.width = window.innerWidth
  H = canvasRef.value.height = window.innerHeight
  
  // Update mouse init to true center
  mouse.x = W / 2
  mouse.y = H / 2
}

function init() {
  resize()
  ctx = canvasRef.value.getContext('2d')
  particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => new Capsule3D(i))
  isInitialized = true
}

function loop() {
  if (!isInitialized || !ctx) {
    rafId = requestAnimationFrame(loop)
    return
  }

  ctx.clearRect(0, 0, W, H)
  
  // Follow Mouse Physics
  const targetX = (mouse.x - W / 2) * 0.4
  const targetY = (mouse.y - H / 2) * 0.4
  sphereCenter.x += (targetX - sphereCenter.x) * 0.05
  sphereCenter.y += (targetY - sphereCenter.y) * 0.05
  
  rotation.y += 0.004
  rotation.x += 0.001
  
  // Single pass update and draw
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    p.update(rotation.x, rotation.y)
    p.draw()
  }
  
  rafId = requestAnimationFrame(loop)
}

onMounted(async () => {
  await nextTick()
  init()
  loop()
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })
  window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
  window.removeEventListener('resize', resize)
})
</script>

<style scoped>
.antigravity-background {
  position: fixed;
  inset: 0;
  z-index: -10; /* Put it behind everything */
  pointer-events: none;
}
.canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
