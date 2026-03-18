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
const PARTICLE_COUNT = 400
const COLORS = ['#6366f1', '#0ea5e9', '#f43f5e', '#8b5cf6', '#a5b4fc', '#7dd3fc']

// State
const mouse = { x: 0, y: 0 }
const sphereCenter = { x: 0, y: 0 }
const rotation = { x: 0, y: 0 }

class Capsule3D {
  constructor(index) {
    this.index = index
    this.reset()
  }

  reset() {
    // 1. Uniform Fibonacci Sphere Distribution
    const phi = Math.acos(1 - 2 * (this.index + 0.5) / PARTICLE_COUNT)
    const theta = Math.PI * (1 + Math.sqrt(5)) * (this.index + 0.5)
    
    // Spread: Wide fullscreen volume
    const isOutlier = Math.random() > 0.6
    const radius = isOutlier ? 550 + Math.random() * 350 : 250 + Math.random() * 100
    
    this.ox = radius * Math.sin(phi) * Math.cos(theta)
    this.oy = radius * Math.sin(phi) * Math.sin(theta)
    this.oz = radius * Math.cos(phi)
    
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.w = 12
    this.h = 4
    this.baseRotation = Math.random() * Math.PI * 2
    
    this.twinklePhase = Math.random() * Math.PI * 2
    this.twinkleSpeed = 0.01 + Math.random() * 0.02
    
    // Projection cache
    this.px = 0
    this.py = 0
    this.z2 = 0
    this.scale = 1
  }

  project(rx, ry) {
    if (!W || !H) return

    // 2. 3D Rotation Math
    const cosX = Math.cos(rx)
    const sinX = Math.sin(rx)
    const cosY = Math.cos(ry)
    const sinY = Math.sin(ry)

    // Y Axis Rotation
    let x1 = this.ox * cosY - this.oz * sinY
    let z1 = this.ox * sinY + this.oz * cosY
    
    // X Axis Rotation
    let y2 = this.oy * cosX - z1 * sinX
    this.z2 = this.oy * sinX + z1 * cosX
    
    // 3. Perspective Projection
    const focalLength = 600
    this.scale = focalLength / (focalLength + this.z2)
    
    // Use group offset + center screen
    this.px = x1 * this.scale + (W / 2) + sphereCenter.x
    this.py = y2 * this.scale + (H / 2) + sphereCenter.y
  }

  draw() {
    this.twinklePhase += this.twinkleSpeed
    const shimmer = 0.65 + 0.35 * Math.sin(this.twinklePhase)
    
    // Culling: avoid drawing off-screen
    if (this.px < -200 || this.px > W+200 || this.py < -200 || this.py > H+200) return

    const alpha = Math.min(1, Math.max(0, (this.z2 + 600) / 1200)) * shimmer
    ctx.globalAlpha = alpha
    ctx.fillStyle = this.color
    
    ctx.save()
    ctx.translate(this.px, this.py)
    ctx.rotate(this.baseRotation + (this.twinklePhase * 0.03))
    
    const rw = this.w * this.scale
    const rh = this.h * this.scale
    
    // Manual CAPSULE (Pill) - High compatibility
    ctx.beginPath()
    const r = rh / 2
    ctx.moveTo(-rw/2 + r, -rh/2)
    ctx.lineTo(rw/2 - r, -rh/2)
    ctx.quadraticCurveTo(rw/2, -rh/2, rw/2, 0)
    ctx.quadraticCurveTo(rw/2, rh/2, rw/2 - r, rh/2)
    ctx.lineTo(-rw/2 + r, rh/2)
    ctx.quadraticCurveTo(-rw/2, rh/2, -rw/2, 0)
    ctx.quadraticCurveTo(-rw/2, -rh/2, -rw/2 + r, -rh/2)
    ctx.fill()
    
    ctx.restore()
    ctx.globalAlpha = 1
  }
}

function updateDimensions() {
  W = window.innerWidth
  H = window.innerHeight
  if (canvasRef.value) {
    canvasRef.value.width = W
    canvasRef.value.height = H
  }
}

function init() {
  updateDimensions()
  ctx = canvasRef.value.getContext('2d')
  
  // Set initial mouse to center
  mouse.x = W / 2
  mouse.y = H / 2
  
  particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => new Capsule3D(i))
}

function loop() {
  if (!ctx) {
    rafId = requestAnimationFrame(loop)
    return
  }

  // Defend against resize/init race
  if (!W || !H) {
    updateDimensions()
  }

  ctx.clearRect(0, 0, W, H)
  
  // 4. Elastic Group Translation (Sphere follows mouse)
  const targetX = (mouse.x - W / 2) * 0.5
  const targetY = (mouse.y - H / 2) * 0.5
  sphereCenter.x += (targetX - sphereCenter.x) * 0.05
  sphereCenter.y += (targetY - sphereCenter.y) * 0.05
  
  // 5. Ambient Rotation
  rotation.y += 0.003
  rotation.x += 0.001
  
  // 6. Projection Pass
  for (let i = 0; i < particles.length; i++) {
    particles[i].project(rotation.x, rotation.y)
  }
  
  // 7. Constellation Connections (Faint)
  ctx.beginPath()
  ctx.lineWidth = 0.5
  for (let i = 0; i < particles.length; i += 3) {
    const p1 = particles[i]
    const j = (i + 13) % particles.length
    const p2 = particles[j]
    
    const d = Math.sqrt(Math.pow(p1.px - p2.px, 2) + Math.pow(p1.py - p2.py, 2))
    if (d < 120) {
      const depthAlpha = Math.min(1, Math.max(0, (p1.z2 + p2.z2 + 600) / 1200))
      ctx.strokeStyle = `rgba(0, 0, 0, ${depthAlpha * 0.03 * (1 - d / 120)})`
      ctx.beginPath()
      ctx.moveTo(p1.px, p1.py)
      ctx.lineTo(p2.px, p2.py)
      ctx.stroke()
    }
  }

  // 8. Draw Pass
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw()
  }
  
  rafId = requestAnimationFrame(loop)
}

function onMouseMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function onResize() {
  updateDimensions()
}

onMounted(() => {
  init()
  loop()
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
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
}
</style>
