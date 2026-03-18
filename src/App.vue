<script setup lang="ts">
import { Github, Linkedin, ExternalLink, Code2, Database, Rocket, Trophy, Menu, X, ChevronRight, GraduationCap } from 'lucide-vue-next';
import { ref, onMounted, onUnmounted } from 'vue';
import TiltCard from './components/TiltCard.vue';

const mobileMenuOpen = ref(false);

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
    color: { value: ["#cbd5e1"] }, // Light theme slate-300 particles
    links: { color: "#cbd5e1", distance: 150, enable: true, opacity: 0.5, width: 1 },
    move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 0.5, straight: false },
    number: { density: { enable: true, area: 800 }, value: 50 },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 2 } }
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

const NAV_ITEMS = [
  { label: 'Expertise', id: 'expertise' },
  { label: 'Projects', id: 'projects' },
  { label: 'Credentials', id: 'credentials' },
];

const scrollToSection = (id: string) => {
  mobileMenuOpen.value = false;
  const el = document.getElementById(id);
  // Account for sticky header
  const yOffset = -100; 
  if (el) {
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
  }
};
</script>

<template>
  <div class="relative min-h-screen bg-slate-50 text-slate-600 overflow-hidden font-sans">
    
    <!-- Antigravity Physics Background (Light Theme Variants) -->
    <vue-particles id="tsparticles" :options="particlesOptions" class="absolute inset-0 z-0 opacity-40 pointer-events-auto" />

    <!-- Ambient glowing nebulas (Light Theme Gradients) -->
    <div class="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[120px] pointer-events-none z-0"></div>
    <div class="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-200/40 rounded-full blur-[120px] pointer-events-none z-0"></div>

    <!-- PROMINENT HEADER -->
    <header class="sticky top-0 w-full bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm z-50">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-2xl font-display font-black tracking-tight text-slate-900 border-l-4 border-indigo-600 pl-3">
            Tharun S
          </span>
        </div>

        <nav class="hidden md:flex items-center justify-center flex-1 gap-8 ml-8">
          <button
            v-for="item in NAV_ITEMS"
            :key="item.id"
            @click="scrollToSection(item.id)"
            class="text-sm font-bold tracking-wide uppercase text-slate-500 hover:text-indigo-600 transition-colors"
          >
            {{ item.label }}
          </button>
        </nav>

        <div class="hidden md:flex items-center gap-4">
          <a href="mailto:stharun612@gmail.com" class="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-indigo-600 text-white text-sm font-bold shadow-md hover:shadow-xl transition-all hover:-translate-y-0.5">
            Contact Me
          </a>
        </div>

        <button class="md:hidden p-2 text-slate-600" @click="mobileMenuOpen = !mobileMenuOpen">
          <X v-if="mobileMenuOpen" :size="24" />
          <Menu v-else :size="24" />
        </button>
      </div>

      <!-- Mobile Nav -->
      <transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0 -translate-y-4" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">
        <div v-if="mobileMenuOpen" class="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-3xl absolute w-full left-0 shadow-2xl">
          <div class="flex flex-col p-6 gap-4">
            <button v-for="item in NAV_ITEMS" :key="item.id" @click="scrollToSection(item.id)" class="text-left w-full px-4 py-3 text-lg font-bold text-slate-700 hover:text-indigo-600">
              {{ item.label }}
            </button>
            <a href="mailto:stharun612@gmail.com" class="mt-4 w-full px-4 py-4 text-center rounded-xl bg-slate-900 text-white text-lg font-bold shadow-md">
              Contact Me
            </a>
          </div>
        </div>
      </transition>
    </header>

    <main class="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-24 flex flex-col gap-24">
      
      <!-- MASSIVE HERO SHOWCASE -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-float-slow">
        <!-- Identity Text -->
        <div class="lg:col-span-7 flex flex-col">
          <p class="text-indigo-600 font-bold tracking-widest uppercase mb-4 text-sm mix-blend-multiply">Backend Engineer</p>
          <h1 class="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-black tracking-tight mb-6 leading-[1.05] text-slate-900">
            Architecting <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-500">Data.</span>
            Optimizing <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-teal-400">Logic.</span>
          </h1>
          <p class="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed mb-10">
            I build highly resilient data pipelines and zero-downtime microservices using advanced tech stacks.
          </p>
          <div class="flex flex-wrap gap-4">
            <a href="https://github.com/sTharun5" target="_blank" class="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-900 shadow-sm hover:shadow-md transition text-sm font-bold">
              <Github :size="18" /> GitHub Profile
            </a>
            <a href="https://linkedin.com/in/tharuntech" target="_blank" class="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-900 shadow-sm hover:shadow-md transition text-sm font-bold">
              <Linkedin :size="18" /> LinkedIn Profile
            </a>
          </div>
        </div>

        <!-- Float Picture Showcase -->
        <div class="lg:col-span-5 h-[450px] md:h-[550px] animate-float-medium group perspective-1000 w-full relative">
          <!-- Background decorative glow -->
          <div class="absolute inset-0 bg-gradient-to-tr from-indigo-300/30 to-sky-300/30 rounded-[2.5rem] blur-2xl transform group-hover:scale-105 transition-transform duration-700"></div>
          
          <TiltCard class="!p-0 border-0 shadow-[0_30px_60px_rgba(0,0,0,0.12)] rounded-[2.5rem]">
            <img src="/IMG_6954.jpg" alt="Tharun S" class="w-full h-full object-cover rounded-[2.5rem]" />
          </TiltCard>
        </div>
      </section>

      <!-- EXPERTISE (With LeetCode Integration in Light Mode) -->
      <section id="expertise" class="animate-float-medium mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div class="lg:col-span-8 flex flex-col h-full">
          <div class="flex items-center gap-3 mb-8">
            <Database class="text-indigo-600" :size="32" />
            <h2 class="text-4xl font-display font-black text-slate-900">Backend Arsenal</h2>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow">
            <TiltCard v-for="skill in ['Node.js', 'PostgreSQL', 'Prisma ORM', 'Express', 'MongoDB', 'Vue 3', 'TypeScript', 'Java']" :key="skill" class="!px-4 !py-6 text-center justify-center border-slate-100/50 flex flex-col items-center">
              <span class="font-bold text-slate-900 text-lg">{{ skill }}</span>
            </TiltCard>
          </div>
        </div>
        
        <!-- LEETCODE COMPONENT LIGHT THEME -->
        <a href="https://leetcode.com/u/user3651Q/" target="_blank" class="lg:col-span-4 block h-full animate-float-fast group">
          <TiltCard class="flex flex-col items-center justify-center text-center p-8 border-orange-100 bg-gradient-to-b from-white to-orange-50/50">
            <div class="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
              <Code2 class="text-orange-500" :size="32" />
            </div>
            <h2 class="text-5xl font-display font-black text-slate-900 mb-2">{{`300+`}}</h2>
            <p class="text-orange-600 font-bold uppercase tracking-widest text-sm mb-4">Problems Solved</p>
            <p class="text-slate-500 text-sm leading-relaxed">Consistent algorithmic problem solving in database logic and data structures on LeetCode.</p>
            <div class="mt-6 flex items-center gap-2 text-orange-600 font-bold text-sm bg-orange-100/50 px-5 py-2.5 rounded-full border border-orange-200 group-hover:bg-orange-100 transition-colors">
              View Profile <ExternalLink :size="16" />
            </div>
          </TiltCard>
        </a>
      </section>

      <!-- PROJECTS -->
      <section id="projects" class="animate-float-slow transition-all delay-150 mt-12">
        <div class="flex items-center gap-3 mb-8">
          <Rocket class="text-sky-500" :size="32" />
          <h2 class="text-4xl font-display font-black text-slate-900">Advanced Architectures</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TiltCard v-for="project in PROJECTS" :key="project.title" class="flex flex-col group justify-between hover:border-indigo-100 transition-colors duration-500">
            <div>
              <p class="text-sky-500 text-xs font-bold uppercase tracking-widest mb-3">{{ project.tagline }}</p>
              <h3 class="text-2xl font-black font-display text-slate-900 mb-4">{{ project.title }}</h3>
              <p class="text-base text-slate-500 mb-8 leading-relaxed">{{ project.description }}</p>
            </div>
            <div class="mt-auto">
              <div class="flex flex-wrap gap-2 mb-6">
                <span v-for="tech in project.stack" :key="tech" class="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 border border-slate-200/50">
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-4 border-t border-slate-100 pt-6 mt-6">
                <a :href="project.url || project.github" target="_blank" class="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 transition">
                  <ExternalLink :size="16" /> Live App
                </a>
                <a :href="project.github" target="_blank" class="text-sm font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition ml-auto">
                  <Github :size="16" /> Source Code
                </a>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      <!-- ACADEMICS -->
      <section id="education" class="animate-float-slow transition-all delay-200 mt-12">
        <div class="flex items-center gap-3 mb-8">
          <GraduationCap class="text-indigo-600" :size="32" />
          <h2 class="text-4xl font-display font-black text-slate-900">Academic Background</h2>
        </div>
        <TiltCard class="border-indigo-100/50 group hover:border-indigo-200 transition-colors duration-500 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-full z-0 group-hover:scale-110 transition-transform"></div>
          <div class="flex flex-col md:flex-row gap-6 md:items-center justify-between relative z-10 w-full">
            <div>
              <h3 class="text-2xl font-black font-display text-slate-900 mb-2">B.Tech in Artificial Intelligence & Data Science</h3>
              <p class="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-3">Bannari Amman Institute of Technology</p>
              <p class="text-slate-500 font-medium leading-relaxed">Currently in Final Year (Semester 8). Concentrating on algorithmic efficiency, machine learning models, and scalable backend data infrastructure.</p>
            </div>
            <div class="px-6 py-4 bg-indigo-50/80 rounded-2xl border border-indigo-100/50 text-center shrink-0">
              <span class="block text-3xl font-black text-indigo-600">2026</span>
              <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Expected</span>
            </div>
          </div>
        </TiltCard>
      </section>

      <!-- CERTIFICATIONS -->
      <section id="credentials" class="animate-float-fast transition-all delay-300 mt-12 mb-20">
        <div class="flex items-center gap-3 mb-8">
          <Trophy class="text-rose-500" :size="32" />
          <h2 class="text-4xl font-display font-black text-slate-900">Official Credentials</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TiltCard v-for="cert in CERTS" :key="cert.title" class="border-rose-100/50 group hover:border-rose-200 transition-colors duration-500">
            <h3 class="text-2xl font-black font-display text-slate-900 mb-3">{{ cert.title }}</h3>
            <p class="text-rose-500 text-sm font-bold uppercase tracking-widest mb-8">{{ cert.issuer }}</p>
            <a :href="cert.url" target="_blank" class="mt-auto inline-flex self-start items-center gap-2 px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-100 text-slate-900 transition-colors">
              View Original PDF <ChevronRight :size="16" class="translate-y-px group-hover:translate-x-1 transition-transform" />
            </a>
          </TiltCard>
        </div>
      </section>

    </main>
  </div>
</template>

<style>
/* Base tailwind background handled in index.css */
</style>
