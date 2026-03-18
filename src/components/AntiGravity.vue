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
const PARTICLE_COUNT = 650
const COLORS = ['#6366f1', '#0ea5e9', '#f43f5e', '#8b5cf6', '#c7d2fe']

// Interaction & Physics State
const mouse = { x: 0, y: 0 }
const sphereCenter = { x: 0, y: 0, vx: 0, vy: 0 }
const rotation = { x: 0, y: 0 }
let time = 0
let isInitialized = false

class JellyCapsule {
  constructor(index) {
    this.index = index
    // 1. Structural Fibonacci Mapping (The "Anchor")
    const phi = Math.acos(1 - 2 * (index + 0.5) / PARTICLE_COUNT)
    const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5)
    
    this.baseRadius = 550 
    
    // Relative coordinates (Local Space)
    this.lx = this.baseRadius * Math.sin(phi) * Math.cos(theta)
    this.ly = this.baseRadius * Math.sin(phi) * Math.sin(theta)
    this.lz = this.baseRadius * Math.cos(phi)
    
    // Aligned to sphere surface
    this.tiltY = theta
    
    // 2. Physics Property (Jelly state)
    this.x = this.lx
    this.y = this.ly
    this.z = this.lz
    this.vx = 0
    this.vy = 0
    this.vz = 0
    
    this.color = COLORS[index % COLORS.length]
    this.w = 18
    this.h = 5
    this.shimmerOffset = Math.random() * Math.PI * 2
  }

  update(rx, ry, stretchX, stretchY) {
    // 3. 3D Rotation for the TARGET Anchor
    const cosY = Math.cos(ry)
    const sinY = Math.sin(ry)
    const cosX = Math.cos(rx)
    const sinX = Math.sin(rx)

    // Breathing pulse
    const pulse = 1 + Math.sin(time * 0.5 + this.index * 0.05) * 0.02
    
    // Calculate rotated target position
    let x1 = this.lx * cosY - this.lz * sinY
    let z1 = this.lx * sinY + this.lz * cosY
    let ty = this.ly * cosX - z1 * sinX
    let tz = this.ly * sinX + z1 * cosX
    let tx = x1
    
    // 4. Global Jelly Deformation (Stretch based on sphere movement)
    tx *= (1 + stretchX * 0.2) * pulse
    ty *= (1 + stretchY * 0.2) * pulse
    tz *= pulse

    // 5. Soft-Body Spring Physics (individual lag)
    const spring = 0.06
    const friction = 0.85
    
    this.vx += (tx - this.x) * spring
    this.vy += (ty - this.y) * spring
    this.vz += (tz - this.z) * spring
    
    this.vx *= friction
    this.vy *= friction
    this.vz *= friction
    
    this.x += this.vx
    this.y += this.vy
    this.z += this.vz
    
    // Projection variables
    this.z_final = this.z
    const focalLength = 1200
    this.scale = focalLength / (focalLength + this.z_final)
    
    this.px = this.x * this.scale + sphereCenter.x
    this.py = this.y * this.scale + sphereCenter.y
  }

  draw(ry) {
    // Frontal culling (No capsules behind center)
    if (this.z_final > 0) return

    if (this.px < -150 || this.px > W+150 || this.py < -150 || this.py > H+150) return

    const alpha = Math.min(1, Math.max(0.05, (-this.z_final) / this.baseRadius)) * 0.9
    const shimmer = 0.8 + 0.2 * Math.sin(Date.now() * 0.003 + this.shimmerOffset)
    
    ctx.globalAlpha = alpha * shimmer
    ctx.fillStyle = this.color
    
    ctx.save()
    ctx.translate(this.px, this.py)
    ctx.rotate(this.tiltY + ry)
    
    const rw = this.w * this.scale
    const rh = this.h * this.scale
    
    // Capsule Shape
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
  if (!isInitialized) {
    sphereCenter.x = W / 2
    sphereCenter.y = H / 2
    mouse.x = W / 2
    mouse.y = H / 2
  }
}

function init() {
  handleResize()
  ctx = canvasRef.value.getContext('2d', { alpha: true })
  particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => new JellyCapsule(i))
  isInitialized = true
}

function loop() {
  if (!isInitialized || !ctx) {
    rafId = requestAnimationFrame(loop)
    return
  }
  ctx.clearRect(0, 0, W, H)
  time += 0.016
  
  // 1. Sphere Center Elasticity & Momentum (The "Weight")
  const dx = mouse.x - sphereCenter.x
  const dy = mouse.y - sphereCenter.y
  
  sphereCenter.vx += dx * 0.05
  sphereCenter.vy += dy * 0.05
  sphereCenter.vx *= 0.82
  sphereCenter.vy *= 0.82
  
  sphereCenter.x += sphereCenter.vx
  sphereCenter.y += sphereCenter.vy
  
  // 2. Deformation amounts (Stretch X/Y)
  const stretchX = sphereCenter.vx * 0.01
  const stretchY = sphereCenter.vy * 0.01
  
  // High-Speed Rotation
  rotation.y += 0.005
  rotation.x += 0.002
  
  // Update and Draw
  particles.forEach(p => {
    p.update(rotation.x, rotation.y, stretchX, stretchY)
    p.draw(rotation.y)
  })
  
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
