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
const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
const rotation = { x: 0, y: 0 }

class Particle3D {
  constructor() {
    // Distribute points on a sphere
    const phi = Math.acos(Math.random() * 2 - 1)
    const theta = Math.random() * Math.PI * 2
    const radius = 220 // Sphere radius
    
    this.x = radius * Math.sin(phi) * Math.cos(theta)
    this.y = radius * Math.sin(phi) * Math.sin(theta)
    this.z = radius * Math.cos(phi)
    
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.size = Math.random() * 2 + 1
  }

  project(rx, ry) {
    // 3D Rotation on Y axis
    let x1 = this.x * Math.cos(ry) - this.z * Math.sin(ry)
    let z1 = this.x * Math.sin(ry) + this.z * Math.cos(ry)
    
    // 3D Rotation on X axis
    let y2 = this.y * Math.cos(rx) - z1 * Math.sin(rx)
    let z2 = this.y * Math.sin(rx) + z1 * Math.cos(rx)
    
    // Perspective Projection
    const focalLength = 500
    const scale = focalLength / (focalLength + z2)
    const px = x1 * scale + W / 2
    const py = y2 * scale + H / 2
    
    // Draw
    const alpha = (z2 + 220) / 440 * 0.8 + 0.2 // Depth-based opacity
    ctx.beginPath()
    ctx.arc(px, py, this.size * scale, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.globalAlpha = alpha
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
  particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle3D())
}

function loop() {
  ctx.clearRect(0, 0, W, H)
  
  // Smooth mouse-influenced rotation
  mouse.tx += (rotation.y - mouse.tx) * 0.05
  mouse.ty += (rotation.x - mouse.ty) * 0.05
  
  // Base rotation + mouse tilt
  rotation.y += 0.003
  
  particles.forEach(p => {
    p.project(mouse.ty, rotation.y + mouse.tx)
  })
  
  rafId = requestAnimationFrame(loop)
}

function onMouseMove(e) {
  // Map mouse position to rotation offsets (-0.5 to 0.5)
  rotation.y = (e.clientX / W - 0.5) * 1.5
  rotation.x = -(e.clientY / H - 0.5) * 1.5
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
