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
const PARTICLE_COUNT = 350
const COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853']
const mouse = { x: -1000, y: -1000 }

class GeometricParticle3D {
  constructor() {
    this.reset()
  }

  reset() {
    // Spread sphere: distribute horizontally wider
    const phi = Math.acos(Math.random() * 2 - 1)
    const theta = Math.random() * Math.PI * 2
    const radius = 350 + Math.random() * 100 // Wider spread
    
    // Origin in 3D
    this.ox = radius * Math.sin(phi) * Math.cos(theta)
    this.oy = radius * Math.sin(phi) * Math.sin(theta)
    this.oz = radius * Math.cos(phi)
    
    // Current positions
    this.x = this.ox
    this.y = this.oy
    this.z = this.oz
    
    this.vx = 0
    this.vy = 0
    this.vz = 0
    
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.size = Math.random() * 4 + 2
    this.rotation = Math.random() * Math.PI * 2
    this.rotationSpeed = (Math.random() - 0.5) * 0.05
    
    // Unique float phase
    this.phase = Math.random() * Math.PI * 2
    this.phaseSpeed = Math.random() * 0.01 + 0.005
  }

  update(rx, ry) {
    this.phase += this.phaseSpeed
    
    // 1. Ambient Float (Drift around target)
    const targetX = this.ox + Math.sin(this.phase) * 20
    const targetY = this.oy + Math.cos(this.phase * 0.8) * 20
    const targetZ = this.oz + Math.sin(this.phase * 1.2) * 20

    // 2. Mouse Attraction (Transform mouse to 3D roughly or just use 2D screen proximity)
    // For 3D attraction, we need to know where the mouse is in 3D. 
    // We'll approximate: project our 2D screen pos and compare with mouse.
    const focalLength = 500
    const scale = focalLength / (focalLength + this.z)
    const px = this.x * scale + W / 2
    const py = this.y * scale + H / 2
    
    const dx = mouse.x - px
    const dy = mouse.y - py
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    if (dist < 400) {
      const force = (400 - dist) / 400
      // Pull towards mouse (invert projection to 3D roughly)
      this.vx += (dx / scale) * force * 0.02
      this.vy += (dy / scale) * force * 0.02
    }

    // Spring back to target
    this.vx += (targetX - this.x) * 0.01
    this.vy += (targetY - this.y) * 0.01
    this.vz += (targetZ - this.z) * 0.01

    // Damping
    this.vx *= 0.95
    this.vy *= 0.95
    this.vz *= 0.95
    
    this.x += this.vx
    this.y += this.vy
    this.z += this.vz
    
    this.rotation += this.rotationSpeed
  }

  draw(rx, ry) {
    // 3D Rotation on Y/X axes for the cloud
    let x1 = this.x * Math.cos(ry) - this.z * Math.sin(ry)
    let z1 = this.x * Math.sin(ry) + this.z * Math.cos(ry)
    let y2 = this.y * Math.cos(rx) - z1 * Math.sin(rx)
    let z2 = this.y * Math.sin(rx) + z1 * Math.cos(rx)
    
    const focalLength = 500
    const scale = focalLength / (focalLength + z2)
    const px = x1 * scale + W / 2
    const py = y2 * scale + H / 2
    
    if (px < -50 || px > W+50 || py < -50 || py > H+50) return

    const alpha = Math.min(1, Math.max(0.1, (z2 + 400) / 800)) * 0.7
    ctx.globalAlpha = alpha
    ctx.fillStyle = this.color
    
    // Draw TRIANGLE
    ctx.save()
    ctx.translate(px, py)
    ctx.rotate(this.rotation)
    ctx.beginPath()
    const s = this.size * scale
    ctx.moveTo(0, -s)
    ctx.lineTo(s * 0.86, s * 0.5)
    ctx.lineTo(-s * 0.86, s * 0.5)
    ctx.closePath()
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
  particles = Array.from({ length: PARTICLE_COUNT }, () => new GeometricParticle3D())
}

let time = 0
function loop() {
  time += 0.005
  ctx.clearRect(0, 0, W, H)
  
  // Base subtle rotation
  const rx = Math.sin(time * 0.5) * 0.2
  const ry = time * 0.3
  
  particles.forEach(p => {
    p.update()
    p.draw(rx, ry)
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
