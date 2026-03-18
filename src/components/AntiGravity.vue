<template>
  <div class="antigravity-wrapper">
    <canvas ref="canvasRef" class="canvas" />

    <!-- Custom Cursor -->
    <div
      class="cursor"
      :class="{ active: isMouseDown }"
      :style="{ left: mouse.x + 'px', top: mouse.y + 'px' }"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

// ── Config ──────────────────────────────────────────────
const PARTICLE_COUNT = 120
const STAR_COUNT     = 200
const REPEL_RADIUS   = 150
const REPEL_FORCE    = 0.6
const SPRING         = 0.035
const DAMPING        = 0.88
const CONNECT_DIST   = 90
const TRAIL_LEN      = 8
const COLORS = [
  '#4285F4','#EA4335','#FBBC05','#34A853',
  '#8AB4F8','#F28B82','#FDD663','#81C995'
]

// ── Refs ────────────────────────────────────────────────
const canvasRef  = ref(null)
const isMouseDown = ref(false)
const mouse = reactive({ x: -1000, y: -1000 })

let ctx, W, H
let particles = []
let stars     = []
let rafId     = null

// ── Helpers ─────────────────────────────────────────────
const rand = (a, b) => a + Math.random() * (b - a)

// ── Star ─────────────────────────────────────────────────
class Star {
  constructor () { this.reset() }
  reset () {
    this.x      = rand(0, W)
    this.y      = rand(0, H)
    this.r      = rand(0.3, 1.5)
    this.alpha  = rand(0.1, 0.7)
    this.speed  = rand(0.002, 0.008)
    this.phase  = rand(0, Math.PI * 2)
  }
  draw () {
    this.phase += this.speed
    const a = this.alpha * (0.6 + 0.4 * Math.sin(this.phase))
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${a})`
    ctx.fill()
  }
}

// ── Particle ──────────────────────────────────────────────
class Particle {
  constructor () {
    this.ox    = rand(60, W - 60)
    this.oy    = rand(60, H - 60)
    this.x     = this.ox
    this.y     = this.oy
    this.vx    = rand(-0.4, 0.4)
    this.vy    = rand(-0.4, 0.4)
    this.r     = rand(3, 10)
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.alpha = rand(0.5, 0.95)

    this.floatSpeed  = rand(0.003, 0.009)
    this.floatAmpX   = rand(8, 25)
    this.floatAmpY   = rand(8, 25)
    this.floatPhaseX = rand(0, Math.PI * 2)
    this.floatPhaseY = rand(0, Math.PI * 2)
    this.t = rand(0, 100)

    this.trail = []
    this.isRing = Math.random() > 0.75
  }

  update () {
    this.t += this.floatSpeed

    // Ambient float target
    const tx = this.ox + this.floatAmpX * Math.sin(this.t + this.floatPhaseX)
    const ty = this.oy + this.floatAmpY * Math.cos(this.t * 1.3 + this.floatPhaseY)

    // Spring towards float target
    this.vx += (tx - this.x) * SPRING
    this.vy += (ty - this.y) * SPRING

    // Cursor repulsion
    const dx   = this.x - mouse.x
    const dy   = this.y - mouse.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < REPEL_RADIUS && dist > 0.1) {
      const force = (REPEL_RADIUS - dist) / REPEL_RADIUS
      const angle = Math.atan2(dy, dx)
      const boost = REPEL_FORCE * (1 + this.r / 6)
      this.vx += Math.cos(angle) * force * boost
      this.vy += Math.sin(angle) * force * boost
    }

    this.vx *= DAMPING
    this.vy *= DAMPING
    this.x  += this.vx
    this.y  += this.vy

    this.trail.push({ x: this.x, y: this.y })
    if (this.trail.length > TRAIL_LEN) this.trail.shift()
  }

  draw () {
    // Trail
    for (let i = 1; i < this.trail.length; i++) {
      ctx.beginPath()
      ctx.moveTo(this.trail[i - 1].x, this.trail[i - 1].y)
      ctx.lineTo(this.trail[i].x, this.trail[i].y)
      ctx.globalAlpha = (i / this.trail.length) * 0.18
      ctx.strokeStyle = this.color
      ctx.lineWidth   = this.r * 0.4
      ctx.stroke()
    }
    ctx.globalAlpha = 1

    // Proximity glow
    const dx   = this.x - mouse.x
    const dy   = this.y - mouse.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const prox = Math.max(0, 1 - dist / REPEL_RADIUS)
    if (prox > 0) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.r * (2 + prox * 3), 0, Math.PI * 2)
      ctx.globalAlpha = prox * 0.12
      ctx.fillStyle   = this.color
      ctx.fill()
      ctx.globalAlpha = 1
    }

    // Main shape
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.globalAlpha = this.alpha
    if (this.isRing) {
      ctx.strokeStyle = this.color
      ctx.lineWidth   = 2
      ctx.stroke()
    } else {
      ctx.fillStyle = this.color
      ctx.fill()
    }
    ctx.globalAlpha = 1
  }
}

// ── Draw helpers ─────────────────────────────────────────
function drawBackground () {
  const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.8)
  bg.addColorStop(0, '#0d0d1a')
  bg.addColorStop(1, '#000005')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)
}

function drawRepelField () {
  const grad = ctx.createRadialGradient(
    mouse.x, mouse.y, 0,
    mouse.x, mouse.y, REPEL_RADIUS
  )
  grad.addColorStop(0,   'rgba(255,255,255,0.04)')
  grad.addColorStop(0.6, 'rgba(255,255,255,0.01)')
  grad.addColorStop(1,   'rgba(255,255,255,0)')

  ctx.beginPath()
  ctx.arc(mouse.x, mouse.y, REPEL_RADIUS, 0, Math.PI * 2)
  ctx.fillStyle = grad
  ctx.fill()

  ctx.beginPath()
  ctx.arc(mouse.x, mouse.y, REPEL_RADIUS, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'
  ctx.lineWidth   = 1
  ctx.stroke()
}

function drawConnections () {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const d  = Math.sqrt(dx * dx + dy * dy)
      if (d < CONNECT_DIST) {
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.globalAlpha = (1 - d / CONNECT_DIST) * 0.07
        ctx.strokeStyle = '#fff'
        ctx.lineWidth   = 0.5
        ctx.stroke()
        ctx.globalAlpha = 1
      }
    }
  }
}

// ── Init & Loop ──────────────────────────────────────────
function init () {
  const canvas = canvasRef.value
  W = canvas.width  = window.innerWidth
  H = canvas.height = window.innerHeight
  ctx = canvas.getContext('2d')

  stars     = Array.from({ length: STAR_COUNT },     () => new Star())
  particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle())
}

function loop () {
  ctx.clearRect(0, 0, W, H)
  drawBackground()
  stars.forEach(s => s.draw())
  drawRepelField()
  drawConnections()
  particles.forEach(p => { p.update(); p.draw() })
  rafId = requestAnimationFrame(loop)
}

// ── Event Listeners ──────────────────────────────────────
function onMouseMove (e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}
function onMouseDown ()  { isMouseDown.value = true  }
function onMouseUp ()    { isMouseDown.value = false }
function onResize ()     { init() }

// ── Lifecycle ────────────────────────────────────────────
onMounted(() => {
  init()
  loop()
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mouseup',   onMouseUp)
  window.addEventListener('resize',    onResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mouseup',   onMouseUp)
  window.removeEventListener('resize',    onResize)
})
</script>

<style scoped>
.antigravity-wrapper {
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: transparent;
  cursor: none;
  z-index: 0;
  pointer-events: none;
}

.canvas {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
}

/* ── Custom Cursor ── */
.cursor {
  position: fixed;
  width: 32px;
  height: 32px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 999;
  transition: width 0.2s, height 0.2s, border-color 0.2s;
  mix-blend-mode: difference;
}
.cursor.active {
  width: 20px;
  height: 20px;
  border-color: rgba(255, 255, 255, 0.9);
}

/* ── Center UI ── */
.ui-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  z-index: 10;
}

.logo {
  font-size: 82px;
  font-weight: 700;
  letter-spacing: -2px;
  line-height: 1;
  user-select: none;
}

.g-blue   { color: #4285F4; }
.g-red    { color: #EA4335; }
.g-yellow { color: #FBBC05; }
.g-green  { color: #34A853; }

.tagline {
  color: rgba(255, 255, 255, 0.55);
  font-size: 16px;
  margin-top: 14px;
  letter-spacing: 0.5px;
}

/* ── Hint ── */
.hint {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.3);
  font-size: 13px;
  letter-spacing: 1px;
  z-index: 10;
  pointer-events: none;
  white-space: nowrap;
}
</style>
