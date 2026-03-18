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
const PARTICLE_COUNT = 600
const COLORS = ['#6366f1', '#0ea5e9', '#f43f5e', '#8b5cf6', '#a5b4fc']

// Global States
const mouse = { x: 0, y: 0 }
const sphereCenter = { x: 0, y: 0 }
const rotation = { x: 0, y: 0 }
let isInitialized = false

class StructuralCapsule {
  constructor(index) {
    this.index = index
    // 1. Strict Fibonacci Sphere Math (Arranged Structurally)
    const phi = Math.acos(1 - 2 * (index + 0.5) / PARTICLE_COUNT)
    const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5)
    const radius = 450 // Large structural radius to cover whole site
    
    this.x = radius * Math.sin(phi) * Math.cos(theta)
    this.y = radius * Math.sin(phi) * Math.sin(theta)
    this.z = radius * Math.cos(phi)
    
    // 2. Tangential Rotation (Align with sphere surface)
    this.tiltX = phi
    this.tiltY = theta
    
    this.color = COLORS[index % COLORS.length]
    this.w = 16 // Distinct capsule width
    this.h = 5  // Distinct capsule height
    
    this.shimmerOffset = Math.random() * Math.PI * 2
  }

  draw(rx, ry) {
    // 3. 3D Rotation for the Globe
    const cosY = Math.cos(ry)
    const sinY = Math.sin(ry)
    const cosX = Math.cos(rx)
    const sinX = Math.sin(rx)

    let x1 = this.x * cosY - this.z * sinY
    let z1 = this.x * sinY + this.z * cosY
    let y2 = this.y * cosX - z1 * sinX
    let z2 = this.y * sinX + z1 * cosX
    
    const focalLength = 1000
    const scale = focalLength / (focalLength + z2)
    
    const px = x1 * scale + (W / 2) + sphereCenter.x
    const py = y2 * scale + (H / 2) + sphereCenter.y
    
    if (px < -100 || px > W+100 || py < -100 || py > H+100) return

    // Depth and Shimmering
    const shimmer = 0.7 + 0.3 * Math.sin(Date.now() * 0.002 + this.shimmerOffset)
    const alpha = Math.min(1, Math.max(0.05, (z2 + 450) / 900)) * shimmer
    
    ctx.globalAlpha = alpha
    ctx.fillStyle = this.color
    
    ctx.save()
    ctx.translate(px, py)
    // Align with sphere surface rotation
    ctx.rotate(this.tiltY + ry)
    
    const rw = this.w * scale
    const rh = this.h * scale
    
    // Drawing a clear Capsule (Pill)
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
  }
}

function handleResize() {
  if (!canvasRef.value) return
  W = canvasRef.value.width = window.innerWidth
  H = canvasRef.value.height = window.innerHeight
  mouse.x = W / 2
  mouse.y = H / 2
}

function init() {
  handleResize()
  ctx = canvasRef.value.getContext('2d')
  particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => new StructuralCapsule(i))
  isInitialized = true
}

function loop() {
  if (!isInitialized || !ctx) {
    rafId = requestAnimationFrame(loop)
    return
  }

  ctx.clearRect(0, 0, W, H)
  
  // Entire sphere follows mouse with elastic delay
  const targetX = (mouse.x - W / 2) * 0.4
  const targetY = (mouse.y - H / 2) * 0.4
  sphereCenter.x += (targetX - sphereCenter.x) * 0.08
  sphereCenter.y += (targetY - sphereCenter.y) * 0.08
  
  rotation.y += 0.005
  rotation.x += 0.002
  
  particles.forEach(p => p.draw(rotation.x, rotation.y))
  
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
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.antigravity-background {
  position: fixed;
  inset: 0;
  z-index: -10;
  pointer-events: none;
}
.canvas {
  display: block;
}
</style>
