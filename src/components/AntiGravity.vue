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

// Interaction & Viscous State
const mouse = { x: 0, y: 0 }
const sphereCenter = { x: 0, y: 0, vx: 0, vy: 0 }
const rotation = { x: 0, y: 0 }
let time = 0
let isInitialized = false

class EtherealCapsule {
  constructor(index) {
    this.index = index
    const phi = Math.acos(1 - 2 * (index + 0.5) / PARTICLE_COUNT)
    const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5)
    
    this.baseRadius = 550 // Large structural shell
    
    this.lx = this.baseRadius * Math.sin(phi) * Math.cos(theta)
    this.ly = this.baseRadius * Math.sin(phi) * Math.sin(theta)
    this.lz = this.baseRadius * Math.cos(phi)
    
    this.tiltY = theta
    
    // Physics State
    this.x = this.lx
    this.y = this.ly
    this.z = this.lz
    this.vx = 0; this.vy = 0; this.vz = 0;
    
    this.color = COLORS[index % COLORS.length]
    this.w = 18
    this.h = 5
    this.shimmerOffset = Math.random() * Math.PI * 2
  }

  update(rx, ry, stretchX, stretchY) {
    // 1. Slow-Motion Anchors
    const cosY = Math.cos(ry)
    const sinY = Math.sin(ry)
    const cosX = Math.cos(rx)
    const sinX = Math.sin(rx)

    // Cinematic breathing
    const pulse = 1 + Math.sin(time * 0.3 + this.index * 0.05) * 0.03
    
    let x1 = this.lx * cosY - this.lz * sinY
    let z1 = this.lx * sinY + this.lz * cosY
    let ty = this.ly * cosX - z1 * sinX
    let tz = this.ly * sinX + z1 * cosX
    let tx = x1
    
    tx *= (1 + stretchX * 0.15) * pulse
    ty *= (1 + stretchY * 0.15) * pulse
    tz *= pulse

    // 2. High Viscosity Spring Physics (Atmospheric Slow-Mo)
    const spring = 0.025 // Very soft
    const friction = 0.94 // High viscosity
    
    this.vx += (tx - this.x) * spring
    this.vy += (ty - this.y) * spring
    this.vz += (tz - this.z) * spring
    
    this.vx *= friction
    this.vy *= friction
    this.vz *= friction
    
    this.x += this.vx
    this.y += this.vy
    this.z += this.vz
    
    const focalLength = 1200
    this.scale = focalLength / (focalLength + this.z)
    
    this.px = this.x * this.scale + sphereCenter.x
    this.py = this.y * this.scale + sphereCenter.y
  }

  draw(ry) {
    // 3. HARD DEPTH CULLING (No particles behind cursor)
    if (this.z > 0) return

    if (this.px < -200 || this.px > W+200 || this.py < -200 || this.py > H+200) return

    // 4. RADIAL FADE-OUT (The "Disappearing" effect)
    // Distance from center of sphere (local x,y,z)
    const dist = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    const fadeLimit = this.baseRadius * 0.8
    // If we are near the edges of our sphere volume, fade out
    const radialAlpha = Math.max(0, 1 - (dist - fadeLimit) / (this.baseRadius - fadeLimit))
    
    // Depth Alpha (frontal focused)
    const depthAlpha = Math.min(1, Math.max(0, (-this.z) / this.baseRadius))
    
    const shimmer = 0.8 + 0.2 * Math.sin(Date.now() * 0.0015 + this.shimmerOffset)
    
    ctx.globalAlpha = depthAlpha * radialAlpha * shimmer * 0.85
    ctx.fillStyle = this.color
    
    ctx.save()
    ctx.translate(this.px, this.py)
    ctx.rotate(this.tiltY + ry)
    
    const rw = this.w * this.scale
    const rh = this.h * this.scale
    
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
  particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => new EtherealCapsule(i))
  isInitialized = true
}

function loop() {
  if (!isInitialized || !ctx) {
    rafId = requestAnimationFrame(loop)
    return
  }
  ctx.clearRect(0, 0, W, H)
  time += 0.016
  
  // 5. Viscous Center Movement
  const dx = mouse.x - sphereCenter.x
  const dy = mouse.y - sphereCenter.y
  
  sphereCenter.vx += dx * 0.04
  sphereCenter.vy += dy * 0.04
  sphereCenter.vx *= 0.8 // High viscous drag on the center too
  sphereCenter.vy *= 0.8
  
  sphereCenter.x += sphereCenter.vx
  sphereCenter.y += sphereCenter.vy
  
  const stretchX = sphereCenter.vx * 0.01
  const stretchY = sphereCenter.vy * 0.01
  
  // 6. Reduced Rotation Speed (Cinematic Atmosphere)
  rotation.y += 0.002
  rotation.x += 0.001
  
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
