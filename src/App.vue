<script setup lang="ts">
import { Github, Linkedin, ExternalLink, Code2, Database, Rocket, Trophy } from 'lucide-vue-next';
import TiltCard from './components/TiltCard.vue';

const particlesOptions = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 }
    }
  },
  particles: {
    color: { value: ["#8b5cf6", "#0ea5e9"] },
    links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.1, width: 1 },
    move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 0.8, straight: false },
    number: { density: { enable: true, area: 800 }, value: 60 },
    opacity: { value: 0.3 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } }
  },
  detectRetina: true
};

const PROJECTS = [
  {
    title: 'Smart OD Portal',
    tagline: 'Autonomous AI Approvals',
    url: 'https://automation-nu-dusky.vercel.app',
    github: 'https://github.com/sTharun5/Automation',
    description: 'Zero-touch PDF parsing OCR engine with an intelligent fraud detection pipeline.',
    stack: ['Vue 3', 'Node.js', 'PostgreSQL', 'Prisma']
  },
  {
    title: 'WhiffAndWrap Architecture',
    tagline: 'Luxury Backend Pipeline',
    github: 'https://github.com/sTharun5/WhiffAndWrap',
    description: 'Resilient data models for complex inventory and secure payment logic.',
    stack: ['TypeScript', 'Node.js', 'APIs']
  },
  {
    title: 'Currency Exchange Engine',
    tagline: 'Real-time Synchronization',
    url: 'https://tharun-cc.netlify.app/',
    github: 'https://github.com/sTharun5/currency-converter',
    description: 'Live continuous external API sync supporting major global currencies.',
    stack: ['JavaScript', 'REST API']
  }
];

const CERTS = [
  {
    title: 'Java Architecture (97%)',
    issuer: 'NPTEL Elite Gold',
    url: 'https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs57/Course/NPTEL25CS57S114900069304436474.pdf',
  },
  {
    title: 'C Programming Core',
    issuer: 'Udemy Verified',
    url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-bf46b573-0177-4003-abad-dd956cda72ab.pdf',
  }
];
</script>

<template>
  <div class="relative min-h-screen bg-[#02040a] text-slate-200 overflow-hidden font-sans">
    
    <!-- Antigravity Physics Background -->
    <vue-particles id="tsparticles" :options="particlesOptions" class="absolute inset-0 z-0 opacity-50 pointer-events-auto" />

    <!-- Ambient glowing nebulas -->
    <div class="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
    <div class="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

    <main class="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col gap-24">
      
      <!-- HERO GRID -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-float-slow">
        <div class="lg:col-span-8 flex flex-col">
          <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-700 shadow-2xl mb-8 animate-float-medium">
            <img src="/IMG_6954.jpg" alt="Tharun S" class="w-full h-full object-cover" />
          </div>
          <h1 class="text-5xl md:text-7xl font-display font-black tracking-tight mb-4 leading-tight text-white glow-layer">
            Architecting <span class="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent text-glow">Data.</span><br/>
            Optimizing <span class="bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">Logic.</span>
          </h1>
          <p class="text-xl text-slate-400 max-w-2xl leading-relaxed mb-8">
            I'm <strong class="text-white">Tharun S</strong>, a Backend Engineer building highly resilient data pipelines and zero-downtime microservices using advanced tech stacks.
          </p>
          <div class="flex flex-wrap gap-4">
            <a href="https://github.com/sTharun5" target="_blank" class="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition backdrop-blur-md">
              <Github :size="20" /> GitHub
            </a>
            <a href="https://linkedin.com/in/tharuntech" target="_blank" class="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition backdrop-blur-md">
              <Linkedin :size="20" /> LinkedIn
            </a>
          </div>
        </div>

        <!-- LEETCODE COMPONENT -->
        <a href="https://leetcode.com/u/user3651Q/" target="_blank" class="lg:col-span-4 block h-full animate-float-fast group">
          <TiltCard class="flex flex-col items-center justify-center text-center p-8 border-[#ffa116]/30 bg-black/40">
            <div class="w-16 h-16 rounded-full bg-[#ffa116]/20 flex items-center justify-center mb-6 border border-[#ffa116]/50 shadow-[0_0_30px_rgba(255,161,22,0.3)] group-hover:shadow-[0_0_50px_rgba(255,161,22,0.6)] transition-shadow">
              <Code2 class="text-[#ffa116]" :size="32" />
            </div>
            <h2 class="text-4xl font-display font-black text-white text-glow-leetcode mb-2">300+</h2>
            <p class="text-[#ffa116] font-bold uppercase tracking-widest text-sm mb-4">Problems Solved</p>
            <p class="text-slate-400 text-sm">Consistent algorithmic problem solving in database logic and data structures on LeetCode.</p>
            <div class="mt-6 flex items-center gap-2 text-white font-bold text-sm bg-[#ffa116]/20 px-4 py-2 rounded-full border border-[#ffa116]/30">
              View Profile <ExternalLink :size="16" />
            </div>
          </TiltCard>
        </a>
      </section>

      <!-- EXPERTISE -->
      <section class="max-w-4xl max-auto animate-float-medium">
        <div class="flex items-center gap-3 mb-8">
          <Database class="text-sky-400" :size="32" />
          <h2 class="text-3xl font-display font-black text-white">Backend Arsenal</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <TiltCard v-for="skill in ['Node.js', 'PostgreSQL', 'Prisma ORM', 'Express', 'MongoDB', 'Vue 3', 'TypeScript', 'Java']" :key="skill" class="!px-4 !py-4 text-center justify-center border-slate-800">
            <span class="font-bold text-slate-300">{{ skill }}</span>
          </TiltCard>
        </div>
      </section>

      <!-- PROJECTS -->
      <section class="animate-float-slow transition-all delay-150">
        <div class="flex items-center gap-3 mb-8">
          <Rocket class="text-violet-400" :size="32" />
          <h2 class="text-3xl font-display font-black text-white">Advanced Architectures</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TiltCard v-for="project in PROJECTS" :key="project.title" class="flex flex-col group justify-between">
            <div>
              <h3 class="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">{{ project.title }}</h3>
              <p class="text-sky-400 text-xs font-bold uppercase tracking-wider mb-4">{{ project.tagline }}</p>
              <p class="text-sm text-slate-400 mb-6 leading-relaxed">{{ project.description }}</p>
            </div>
            <div>
              <div class="flex flex-wrap gap-2 mb-6">
                <span v-for="tech in project.stack" :key="tech" class="px-2 py-1 bg-white/10 rounded text-xs font-medium text-slate-300 border border-white/5">
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-4">
                <a :href="project.url || project.github" target="_blank" class="text-sm font-bold text-white hover:text-sky-400 flex items-center gap-1 transition">
                  <ExternalLink :size="14" /> Live
                </a>
                <a :href="project.github" target="_blank" class="text-sm font-bold text-slate-500 hover:text-white flex items-center gap-1 transition">
                  <Github :size="14" /> Code
                </a>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      <!-- CERTIFICATIONS -->
      <section class="animate-float-fast transition-all delay-300">
        <div class="flex items-center gap-3 mb-8">
          <Trophy class="text-rose-400" :size="32" />
          <h2 class="text-3xl font-display font-black text-white">Official Credentials</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TiltCard v-for="cert in CERTS" :key="cert.title" class="border-rose-500/30">
            <h3 class="text-lg font-bold text-white mb-2">{{ cert.title }}</h3>
            <p class="text-rose-400 text-sm font-bold uppercase tracking-wider mb-6">{{ cert.issuer }}</p>
            <a :href="cert.url" target="_blank" class="mt-auto inline-flex self-start items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-bold hover:bg-white/10 transition">
              View Certificate <ExternalLink :size="14" />
            </a>
          </TiltCard>
        </div>
      </section>

    </main>
  </div>
</template>

<style>
/* Remove base tailwind background */
body { background: #02040a; }
</style>
