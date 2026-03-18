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
const sphereCenter = { x: 0, y: 0, tx: 0, ty: 0 }
const rotation = { x: 0, y: 0 }

class Capsule3D {
  constructor(index) {
    // 1. Fibonacci Sphere Distribution (Equal Distance)
    const phi = Math.acos(1 - 2 * (index + 0.5) / PARTICLE_COUNT)
    const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5)
    const radius = 240 // Fixed sphere radius
    
    this.x = radius * Math.sin(phi) * Math.cos(theta)
    this.y = radius * Math.sin(phi) * Math.sin(theta)
    this.z = radius * Math.cos(phi)
    
    this.color = COLORS[index % COLORS.length]
    this.w = 8 // Capsule length
    this.h = 4 // Capsule width
    this.rotation = Math.random() * Math.PI * 2
  }

  draw(rx, ry) {
    // 2. 3D Rotation
    let x1 = this.x * Math.cos(ry) - this.z * Math.sin(ry)
    let z1 = this.x * Math.sin(ry) + this.z * Math.cos(ry)
    let y2 = this.y * Math.cos(rx) - z1 * Math.sin(rx)
    let z2 = this.y * Math.sin(rx) + z1 * Math.cos(rx)
    
    // 3. Perspective Projection
    const focalLength = 500
    const scale = focalLength / (focalLength + z2)
    
    // 4. Center Follows Mouse (sphereCenter logic)
    const px = x1 * scale + W / 2 + sphereCenter.x
    const py = y2 * scale + H / 2 + sphereCenter.y
    
    // Culling
    if (px < -50 || px > W+50 || py < -50 || py > H+50) return

    // 5. Build Gradient/Transparency for Depth
    const alpha = Math.min(1, Math.max(0.1, (z2 + 240) / 480)) * 0.8
    ctx.globalAlpha = alpha
    ctx.fillStyle = this.color
    
    // 6. Draw Capsule (Pill Shape)
    ctx.save()
    ctx.translate(px, py)
    ctx.rotate(this.rotation + ry) // Sync some rotation with globe
    
    ctx.beginPath()
    const rw = this.w * scale
    const rh = this.h * scale
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
  
  // Initial center in middle
  sphereCenter.x = 0
  sphereCenter.y = 0
  
  particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => new Capsule3D(i))
}

function loop() {
  ctx.clearRect(0, 0, W, H)
  
  // 7. Sphere Center Follows Mouse with Elastic Spring
  // Translate mouse pos into screen offset from center
  const targetX = (mouse.x - W / 2) * 0.5
  const targetY = (mouse.y - H / 2) * 0.5
  
  sphereCenter.x += (targetX - sphereCenter.x) * 0.08
  sphereCenter.y += (targetY - sphereCenter.y) * 0.08
  
  // 8. Globe Rotation
  rotation.y += 0.005
  rotation.x += 0.001
  
  particles.forEach(p => {
    p.draw(rotation.x, rotation.y)
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
}
</style>
