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
const PARTICLE_COUNT = 650
// Theme Matching Colors: Indigo, Sky, Rose, Violet
const COLORS = ['#6366f1', '#0ea5e9', '#f43f5e', '#8b5cf6', '#a5b4fc', '#7dd3fc']
const mouse = { x: 0, y: 0 }
const sphereCenter = { x: 0, y: 0 }
const rotation = { x: 0, y: 0 }

class Capsule3D {
  constructor(index) {
    this.index = index
    this.reset()
  }

  reset() {
    // Widely distributed Fibonacci Sphere with "noise" for fullscreen spread
    const phi = Math.acos(1 - 2 * (this.index + 0.5) / PARTICLE_COUNT)
    const theta = Math.PI * (1 + Math.sqrt(5)) * (this.index + 0.5)
    
    // Spread: 70% in central globe, 30% widely across screen
    const isOutlier = Math.random() > 0.7
    const radius = isOutlier ? 600 + Math.random() * 500 : 250 + Math.random() * 100
    
    this.ox = radius * Math.sin(phi) * Math.cos(theta)
    this.oy = radius * Math.sin(phi) * Math.sin(theta)
    this.oz = radius * Math.cos(phi)
    
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.w = 12
    this.h = 4
    this.baseRotation = Math.random() * Math.PI * 2
    
    this.twinklePhase = Math.random() * Math.PI * 2
    this.twinkleSpeed = 0.01 + Math.random() * 0.02
  }

  getProjected(rx, ry) {
    // 3D Rotation
    let x1 = this.ox * Math.cos(ry) - this.oz * Math.sin(ry)
    let z1 = this.ox * Math.sin(ry) + this.oz * Math.cos(ry)
    let y2 = this.oy * Math.cos(rx) - z1 * Math.sin(rx)
    this.z2 = this.oy * Math.sin(rx) + z1 * Math.cos(rx)
    
    const focalLength = 600
    this.scale = focalLength / (focalLength + this.z2)
    
    // Smooth group offset tracks mouse
    this.px = x1 * this.scale + W / 2 + sphereCenter.x
    this.py = y2 * this.scale + H / 2 + sphereCenter.y
  }

  draw() {
    this.twinklePhase += this.twinkleSpeed
    const shimmer = 0.6 + 0.4 * Math.sin(this.twinklePhase)
    
    if (this.px < -150 || this.px > W+150 || this.py < -150 || this.py > H+150) return

    const alpha = Math.min(1, Math.max(0.02, (this.z2 + 600) / 1200)) * shimmer
    ctx.globalAlpha = alpha
    ctx.fillStyle = this.color
    
    ctx.save()
    ctx.translate(this.px, this.py)
    ctx.rotate(this.baseRotation + (this.twinklePhase * 0.05))
    
    const rw = this.w * this.scale
    const rh = this.h * this.scale
    ctx.beginPath()
    ctx.roundRect(-rw/2, -rh/2, rw, rh, rh/2)
    ctx.fill()
    ctx.restore()
    ctx.globalAlpha = 1
  }
}

function init() {
  const canvas = canvasRef.value
  if (!canvas) return
  W = canvas.width = window.innerWidth
  H = canvas.height = window.innerHeight
  ctx = canvas.getContext('2d')
  
  particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => new Capsule3D(i))
}

function loop() {
  ctx.clearRect(0, 0, W, H)
  
  // Group Follow Physics (Screen-wide elasticity)
  const targetX = (mouse.x - W / 2) * 0.6
  const targetY = (mouse.y - H / 2) * 0.6
  sphereCenter.x += (targetX - sphereCenter.x) * 0.05
  sphereCenter.y += (targetY - sphereCenter.y) * 0.05
  
  rotation.y += 0.003
  rotation.x += 0.001
  
  particles.forEach(p => p.getProjected(rotation.x, rotation.y))
  
  // Global Faint Constellation for connectivity
  ctx.beginPath()
  ctx.lineWidth = 0.5
  for (let i = 0; i < PARTICLE_COUNT; i += 2) { // Skip some for performance in complex scene
    const n = 13 // Fibonacci step
    const j = (i + n) % PARTICLE_COUNT
    const p1 = particles[i]
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

  particles.forEach(p => p.draw())
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
