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
const PARTICLE_COUNT = 450
const COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853']
const mouse = { x: 0, y: 0 }
const sphereCenter = { x: 0, y: 0 }
const rotation = { x: 0, y: 0 }

class Capsule3D {
  constructor(index) {
    // 1. Fibonacci Distribution (Golden Ratio)
    const phi = Math.acos(1 - 2 * (index + 0.5) / PARTICLE_COUNT)
    const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5)
    const radius = 240
    
    this.ox = radius * Math.sin(phi) * Math.cos(theta)
    this.oy = radius * Math.sin(phi) * Math.sin(theta)
    this.oz = radius * Math.cos(phi)
    
    this.color = COLORS[index % COLORS.length]
    this.w = 10
    this.h = 4
    this.baseRotation = Math.random() * Math.PI * 2
    
    // Twinkle Phase
    this.twinklePhase = Math.random() * Math.PI * 2
    this.twinkleSpeed = 0.02 + Math.random() * 0.03
  }

  getProjected(rx, ry) {
    // 3D Rotation
    let x1 = this.ox * Math.cos(ry) - this.oz * Math.sin(ry)
    let z1 = this.ox * Math.sin(ry) + this.oz * Math.cos(ry)
    let y2 = this.oy * Math.cos(rx) - z1 * Math.sin(rx)
    this.z2 = this.oy * Math.sin(rx) + z1 * Math.cos(rx)
    
    const focalLength = 500
    this.scale = focalLength / (focalLength + this.z2)
    
    this.px = x1 * this.scale + W / 2 + sphereCenter.x
    this.py = y2 * this.scale + H / 2 + sphereCenter.y
    return { x: this.px, y: this.py, z: this.z2, scale: this.scale }
  }

  draw() {
    this.twinklePhase += this.twinkleSpeed
    const shimmer = 0.7 + 0.3 * Math.sin(this.twinklePhase)
    
    // Culling
    if (this.px < -100 || this.px > W+100 || this.py < -100 || this.py > H+100) return

    // Depth-aware alpha
    const alpha = Math.min(1, Math.max(0.05, (this.z2 + 240) / 480)) * shimmer
    ctx.globalAlpha = alpha
    ctx.fillStyle = this.color
    
    ctx.save()
    ctx.translate(this.px, this.py)
    ctx.rotate(this.baseRotation + (this.twinklePhase * 0.1))
    
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
  
  // 1. Group Mouse Tracking (Smooth Second-Order Spring)
  const targetX = (mouse.x - W / 2) * 0.55
  const targetY = (mouse.y - H / 2) * 0.55
  sphereCenter.x += (targetX - sphereCenter.x) * 0.075
  sphereCenter.y += (targetY - sphereCenter.y) * 0.075
  
  // 2. Global Rotation
  rotation.y += 0.004
  rotation.x += 0.001
  
  // Project all particles first to draw links
  particles.forEach(p => p.getProjected(rotation.x, rotation.y))
  
  // 3. Draw Structural Constellation Links (Faint)
  ctx.beginPath()
  ctx.lineWidth = 0.5
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Only connect a few neighbors to keep it clean (Fibonacci neighbors are i+1, i+2)
    const neighbors = [1, 2, 13, 21] // Fibonacci related steps
    neighbors.forEach(n => {
      const j = (i + n) % PARTICLE_COUNT
      const p1 = particles[i]
      const p2 = particles[j]
      const d = Math.sqrt(Math.pow(p1.px - p2.px, 2) + Math.pow(p1.py - p2.py, 2))
      
      if (d < 100) {
        // Average depth for link opacity
        const depthAlpha = Math.min(1, Math.max(0, (p1.z2 + p2.z2 + 480) / 960))
        ctx.strokeStyle = `rgba(0, 0, 0, ${depthAlpha * 0.04 * (1 - d / 100)})`
        ctx.beginPath()
        ctx.moveTo(p1.px, p1.py)
        ctx.lineTo(p2.px, p2.py)
        ctx.stroke()
      }
    })
  }

  // 4. Draw Particles
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
}
</style>
