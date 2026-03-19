'use client';

import React, { useRef, useEffect, useState } from 'react';

const PARTICLE_COUNT = 120;
const STAR_COUNT = 200;
const REPEL_RADIUS = 150;
const REPEL_FORCE = 0.6;
const SPRING = 0.035;
const DAMPING = 0.88;
const CONNECT_DIST = 90;
const TRAIL_LEN = 8;
const COLORS = [
  '#4285F4', '#EA4335', '#FBBC05', '#34A853',
  '#8AB4F8', '#F28B82', '#FDD663', '#81C995'
];

const rand = (a: number, b: number) => a + Math.random() * (b - a);

class Star {
  x: number = 0;
  y: number = 0;
  r: number = 0;
  alpha: number = 0;
  speed: number = 0;
  phase: number = 0;
  W: number;
  H: number;

  constructor(W: number, H: number) {
    this.W = W;
    this.H = H;
    this.reset();
  }

  reset() {
    this.x = rand(0, this.W);
    this.y = rand(0, this.H);
    this.r = rand(0.3, 1.5);
    this.alpha = rand(0.1, 0.7);
    this.speed = rand(0.002, 0.008);
    this.phase = rand(0, Math.PI * 2);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.phase += this.speed;
    const a = this.alpha * (0.6 + 0.4 * Math.sin(this.phase));
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${a})`;
    ctx.fill();
  }
}

class Particle {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  alpha: number;
  floatSpeed: number;
  floatAmpX: number;
  floatAmpY: number;
  floatPhaseX: number;
  floatPhaseY: number;
  t: number;
  trail: { x: number; y: number }[] = [];
  isRing: boolean;

  constructor(W: number, H: number) {
    this.ox = rand(60, W - 60);
    this.oy = rand(60, H - 60);
    this.x = this.ox;
    this.y = this.oy;
    this.vx = rand(-0.4, 0.4);
    this.vy = rand(-0.4, 0.4);
    this.r = rand(3, 10);
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.alpha = rand(0.5, 0.95);
    this.floatSpeed = rand(0.003, 0.009);
    this.floatAmpX = rand(8, 25);
    this.floatAmpY = rand(8, 25);
    this.floatPhaseX = rand(0, Math.PI * 2);
    this.floatPhaseY = rand(0, Math.PI * 2);
    this.t = rand(0, 100);
    this.isRing = Math.random() > 0.75;
  }

  update(mouseX: number, mouseY: number) {
    this.t += this.floatSpeed;
    const tx = this.ox + this.floatAmpX * Math.sin(this.t + this.floatPhaseX);
    const ty = this.oy + this.floatAmpY * Math.cos(this.t * 1.3 + this.floatPhaseY);

    this.vx += (tx - this.x) * SPRING;
    this.vy += (ty - this.y) * SPRING;

    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < REPEL_RADIUS && dist > 0.1) {
      const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
      const angle = Math.atan2(dy, dx);
      const boost = REPEL_FORCE * (1 + this.r / 6);
      this.vx += Math.cos(angle) * force * boost;
      this.vy += Math.sin(angle) * force * boost;
    }

    this.vx *= DAMPING;
    this.vy *= DAMPING;
    this.x += this.vx;
    this.y += this.vy;

    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > TRAIL_LEN) this.trail.shift();
  }

  draw(ctx: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
    for (let i = 1; i < this.trail.length; i++) {
      ctx.beginPath();
      ctx.moveTo(this.trail[i - 1].x, this.trail[i - 1].y);
      ctx.lineTo(this.trail[i].x, this.trail[i].y);
      ctx.globalAlpha = (i / this.trail.length) * 0.18;
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.r * 0.4;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const prox = Math.max(0, 1 - dist / REPEL_RADIUS);
    if (prox > 0) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * (2 + prox * 3), 0, Math.PI * 2);
      ctx.globalAlpha = prox * 0.12;
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.globalAlpha = this.alpha;
    if (this.isRing) {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}

export const AntiGravityBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    let stars = Array.from({ length: STAR_COUNT }, () => new Star(W, H));
    let particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle(W, H));

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      
      const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.8);
      bg.addColorStop(0, '#0d0d1a');
      bg.addColorStop(1, '#000005');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      stars.forEach(s => s.draw(ctx));

      const grad = ctx.createRadialGradient(mouse.current.x, mouse.current.y, 0, mouse.current.x, mouse.current.y, REPEL_RADIUS);
      grad.addColorStop(0, 'rgba(255,255,255,0.04)');
      grad.addColorStop(0.6, 'rgba(255,255,255,0.01)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, REPEL_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.globalAlpha = (1 - d / CONNECT_DIST) * 0.07;
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      particles.forEach(p => {
        p.update(mouse.current.x, mouse.current.y);
        p.draw(ctx, mouse.current.x, mouse.current.y);
      });

      requestAnimationFrame(loop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      stars = Array.from({ length: STAR_COUNT }, () => new Star(W, H));
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle(W, H));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    const rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: '#000' }}
    />
  );
};
