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

// Interaction State
const mouse = { x: 0, y: 0 }
const sphereCenter = { x: 0, y: 0 }
const rotation = { x: 0, y: 0 }
let isInitialized = false

class FocalCapsule {
  constructor(index) {
    this.index = index
    // 1. Structural Fibonacci Mapping
    const phi = Math.acos(1 - 2 * (index + 0.5) / PARTICLE_COUNT)
    const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5)
    
    // Radius of the focused "bubble" around cursor
    this.radius = 280 
    
    this.ox = this.radius * Math.sin(phi) * Math.cos(theta)
    this.oy = this.radius * Math.sin(phi) * Math.sin(theta)
    this.oz = this.radius * Math.cos(phi)
    
    // Aligned to sphere surface
    this.tiltX = phi
    this.tiltY = theta
    
    this.color = COLORS[index % COLORS.length]
    this.w = 16
    this.h = 5
    
    this.shimmerOffset = Math.random() * Math.PI * 2
  }

  draw(rx, ry) {
    // 2. 3D Rotation
    const cosY = Math.cos(ry)
    const sinY = Math.sin(ry)
    const cosX = Math.cos(rx)
    const sinX = Math.sin(rx)

    let x1 = this.ox * cosY - this.oz * sinY
    let z1 = this.ox * sinY + this.oz * cosY
    let y2 = this.oy * cosX - z1 * sinX
    let z2 = this.oy * sinX + z1 * cosX
    
    const focalLength = 1000
    let scale = focalLength / (focalLength + z2)
    
    // 3. Anchor to Mouse Position (offset from center)
    const px = x1 * scale + mouse.x
    const py = y2 * scale + mouse.y
    
    if (px < -150 || px > W+150 || py < -150 || py > H+150) return

    // 4. "FOCUS" Effect: Proximity to Center (the cursor itself)
    // Particles "front" of the mouse get bigger/brighter
    const focusIntensity = Math.min(1.5, Math.max(0.5, (z2 + this.radius) / (this.radius * 2)))
    const shimmer = 0.8 + 0.2 * Math.sin(Date.now() * 0.003 + this.shimmerOffset)
    
    const alpha = Math.min(1, Math.max(0.1, (z2 + this.radius) / (this.radius * 2))) * shimmer
    ctx.globalAlpha = alpha
    ctx.fillStyle = this.color
    
    ctx.save()
    ctx.translate(px, py)
    ctx.rotate(this.tiltY + ry)
    
    // Apply Focus Scale
    const rw = this.w * scale * focusIntensity
    const rh = this.h * scale * focusIntensity
    
    // High-Compatibility Capsule (Pill)
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
  // Start mouse at center
  if (!isInitialized) {
    mouse.x = W / 2
    mouse.y = H / 2
  }
}

function init() {
  handleResize()
  ctx = canvasRef.value.getContext('2d')
  particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => new FocalCapsule(i))
  isInitialized = true
}

function loop() {
  if (!isInitialized || !ctx) {
    rafId = requestAnimationFrame(loop)
    return
  }

  ctx.clearRect(0, 0, W, H)
  
  // High-Speed Rotation
  rotation.y += 0.006
  rotation.x += 0.002
  
  particles.forEach(p => p.draw(rotation.x, rotation.y))
  
  rafId = requestAnimationFrame(loop)
}

onMounted(async () => {
  await nextTick()
  init()
  loop()
  window.addEventListener('mousemove', (e) => {
    // Direct anchoring for the "focused on cursor" feel
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
