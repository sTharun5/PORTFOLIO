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
  const yOffset = -80; 
  if (el) {
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
  }
};

const scrollProgress = ref(0);
const updateScrollProgress = () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  scrollProgress.value = (winScroll / height) * 100;
};

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress);
});
onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress);
});
</script>

<template>
  <div class="relative min-h-screen bg-slate-50 text-slate-600 overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
    
    <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }"></div>
    
    <!-- Antigravity Physics Background (Light Theme Variants) -->
    <vue-particles id="tsparticles" :options="particlesOptions" class="absolute inset-0 z-0 opacity-30 pointer-events-none" />

    <!-- Ambient glowing nebulas (Light Theme Gradients) -->
    <div class="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-100/30 rounded-full blur-[120px] pointer-events-none z-0"></div>
    <div class="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-sky-100/30 rounded-full blur-[120px] pointer-events-none z-0"></div>

    <!-- PROMINENT HEADER -->
    <header class="sticky top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100/50 z-50 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-2 group cursor-pointer" @click="scrollToSection('hero')">
          <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform">
            T
          </div>
          <span class="text-xl font-display font-black tracking-tighter text-slate-900 lg:block hidden">
            Tharun <span class="text-indigo-600">S</span>
          </span>
        </div>

        <nav class="hidden md:flex items-center justify-center flex-1 gap-10">
          <button
            v-for="item in NAV_ITEMS"
            :key="item.id"
            @click="scrollToSection(item.id)"
            class="text-xs font-black tracking-widest uppercase text-slate-400 hover:text-indigo-600 transition-all hover:scale-105"
          >
            {{ item.label }}
          </button>
        </nav>

        <div class="hidden md:flex items-center gap-6">
          <a href="https://linkedin.com/in/tharuntech" target="_blank" class="text-slate-400 hover:text-indigo-600 transition-colors">
            <Linkedin :size="20" />
          </a>
          <a href="mailto:stharun612@gmail.com" class="px-7 py-3 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white text-sm font-black shadow-lg hover:shadow-indigo-500/20 transition-all hover:-translate-y-1">
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

    <main class="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col gap-32">
      
      <!-- MASSIVE HERO SHOWCASE -->
      <section id="hero" class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center pt-8">
        <!-- Identity Text -->
        <div class="lg:col-span-7 flex flex-col" v-motion="{ initial: { opacity: 0, x: -50 }, enter: { opacity: 1, x: 0, transition: { duration: 800, type: 'spring', damping: 25 } } }">
          <div class="flex items-center gap-3 mb-6">
            <span class="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100 shadow-sm">
              Software Developer
            </span>
            <span class="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm animate-pulse">
              Available for Hire
            </span>
          </div>
          
          <h1 class="text-6xl md:text-8xl lg:text-[6.5rem] font-display font-black tracking-tighter mb-8 leading-[0.9] text-slate-900">
            Building <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Robust</span>
            Logic <br/>
            at <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">Scale.</span>
          </h1>
          
          <p class="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed mb-12 font-medium">
            I'm <strong class="text-slate-900">Tharun S</strong>, a Final Year AI & DS student specialized in designing resilient server architectures and high-performance data pipelines.
          </p>
          
          <div class="flex flex-wrap gap-5">
            <a href="mailto:stharun612@gmail.com" class="flex items-center gap-3 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 font-black text-sm uppercase tracking-widest">
              Get in Touch
            </a>
            <a href="https://linkedin.com/in/tharuntech" target="_blank" class="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 text-slate-900 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 font-black text-sm uppercase tracking-widest">
              <Linkedin :size="20" class="text-indigo-600" /> LinkedIn
            </a>
          </div>
        </div>

        <!-- Float Picture Showcase -->
        <div class="lg:col-span-5 flex justify-center lg:justify-end" v-motion="{ initial: { opacity: 0, scale: 0.8 }, enter: { opacity: 1, scale: 1, transition: { duration: 1000, type: 'spring', damping: 20, delay: 200 } } }">
          <div class="relative w-full max-w-[450px] aspect-[4/5] animate-float-slow group">
            <!-- Background decorative glow -->
            <div class="absolute -inset-4 bg-gradient-to-tr from-indigo-400/20 to-sky-400/20 rounded-[3rem] blur-3xl transform group-hover:scale-110 transition-transform duration-700"></div>
            
            <TiltCard class="!p-0 border-0 shadow-[0_40px_80px_rgba(0,0,0,0.08)]" padding="p-0" :isOverflowHidden="false">
              <img src="/IMG_6954.jpg" alt="Tharun S" class="w-full h-full object-cover rounded-[2.5rem]" />
              
              <!-- Floating Badge - Now NOT clipped -->
              <div class="absolute bottom-8 -left-8 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/50 animate-float-fast max-w-[180px] z-[60]">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    <GraduationCap :size="20" />
                  </div>
                  <div>
                    <p class="text-[10px] font-black uppercase tracking-tighter text-slate-400 leading-none mb-1">Status</p>
                    <p class="text-xs font-black text-slate-900 leading-none">Final Year AI & DS</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      <!-- EXPERTISE -->
      <section id="expertise" class="max-w-7xl mx-auto" v-motion="{ initial: { opacity: 0, y: 50 }, visibleOnce: { opacity: 1, y: 0, transition: { duration: 800, type: 'spring', damping: 25 } } }">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div class="lg:col-span-8 flex flex-col h-full">
            <div class="flex items-center gap-4 mb-10">
              <div class="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-600">
                <Database :size="24" />
              </div>
              <h2 class="text-4xl font-display font-black text-slate-900 tracking-tighter">Backend Arsenal</h2>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 flex-grow">
              <TiltCard v-for="(skill, i) in ['Problem Solving', 'Node.js', 'Express', 'SQL', 'Java', 'C', 'JavaScript']" :key="skill" 
                         v-motion="{ initial: { opacity: 0, scale: 0.9 }, visibleOnce: { opacity: 1, scale: 1, transition: { delay: i * 50 } } }"
                         class="!px-4 !py-8 text-center justify-center border-slate-100 flex flex-col items-center group">
                <span class="font-black text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">{{ skill }}</span>
              </TiltCard>
            </div>
          </div>
          
          <!-- LEETCODE COMPONENT LIGHT THEME -->
          <a href="https://leetcode.com/u/user3651Q/" target="_blank" class="lg:col-span-4 block h-full group" v-motion="{ initial: { opacity: 0, scale: 0.9 }, visibleOnce: { opacity: 1, scale: 1, transition: { delay: 200 } } }">
            <TiltCard class="flex flex-col items-center justify-center text-center p-10 border-orange-100 bg-gradient-to-b from-white to-orange-50/30">
              <div class="w-20 h-20 rounded-3xl bg-orange-100 flex items-center justify-center mb-8 shadow-sm group-hover:shadow-orange-200 transition-all group-hover:scale-110">
                <Code2 class="text-orange-500" :size="36" />
              </div>
              <h2 class="text-6xl font-display font-black text-slate-900 mb-2 tracking-tighter">{{`300+`}}</h2>
              <p class="text-orange-600 font-black uppercase tracking-widest text-xs mb-6">Problems Solved</p>
              <p class="text-slate-500 text-sm leading-relaxed font-medium">Consistent algorithmic problem solving in database logic and data structures on LeetCode.</p>
              <div class="mt-8 flex items-center gap-3 text-orange-600 font-black text-xs uppercase tracking-widest bg-orange-100/50 px-6 py-3 rounded-2xl border border-orange-200 group-hover:bg-orange-600 group-hover:text-white transition-all text-center">
                View Profile <ExternalLink :size="14" />
              </div>
            </TiltCard>
          </a>
        </div>
      </section>

      <!-- PROJECTS -->
      <section id="projects" class="mt-12" v-motion="{ initial: { opacity: 0, y: 50 }, visibleOnce: { opacity: 1, y: 0, transition: { duration: 800, type: 'spring', damping: 25 } } }">
        <div class="flex items-center gap-4 mb-10">
          <div class="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-500">
            <Rocket :size="24" />
          </div>
          <h2 class="text-4xl font-display font-black text-slate-900 tracking-tighter">Advanced Architectures</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TiltCard v-for="(project, i) in PROJECTS" :key="project.title" 
                     v-motion="{ initial: { opacity: 0, y: 30 }, visibleOnce: { opacity: 1, y: 0, transition: { delay: i * 100 } } }"
                     class="flex flex-col group justify-between hover:border-indigo-100 transition-colors duration-500 !p-8">
            <div>
              <p class="text-sky-500 text-[10px] font-black uppercase tracking-widest mb-3">{{ project.tagline }}</p>
              <h3 class="text-2xl font-black font-display text-slate-900 mb-4 tracking-tighter">{{ project.title }}</h3>
              <p class="text-base text-slate-500 mb-8 leading-relaxed font-medium">{{ project.description }}</p>
            </div>
            <div class="mt-auto">
              <div class="flex flex-wrap gap-2 mb-8">
                <span v-for="tech in project.stack" :key="tech" class="px-3 py-1 bg-slate-50 rounded-lg text-xs font-black text-slate-500 border border-slate-100">
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-4 border-t border-slate-50 pt-6">
                <a :href="project.url || project.github" target="_blank" class="text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 flex items-center gap-2 transition">
                  Live App <ExternalLink :size="14" />
                </a>
                <a :href="project.github" target="_blank" class="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 flex items-center gap-2 transition ml-auto">
                  Code <Github :size="14" />
                </a>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      <!-- ACADEMICS -->
      <section id="education" class="mt-12" v-motion="{ initial: { opacity: 0, y: 50 }, visibleOnce: { opacity: 1, y: 0, transition: { duration: 800, type: 'spring', damping: 25 } } }">
        <div class="flex items-center gap-4 mb-10">
          <div class="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-600">
            <GraduationCap :size="24" />
          </div>
          <h2 class="text-4xl font-display font-black text-slate-900 tracking-tighter">Academic Journey</h2>
        </div>
        <TiltCard class="border-slate-100 group transition-all duration-500 relative overflow-hidden !p-10">
          <div class="absolute -top-10 -right-10 w-48 h-48 bg-indigo-50/50 rounded-full blur-3xl z-0 group-hover:scale-125 transition-transform duration-1000"></div>
          <div class="flex flex-col md:flex-row gap-10 md:items-center justify-between relative z-10 w-full">
            <div class="flex-1">
              <h3 class="text-3xl font-black font-display text-slate-900 mb-3 tracking-tighter">B.Tech Artificial Intelligence & Data Science</h3>
              <p class="text-indigo-600 text-sm font-black uppercase tracking-widest mb-4">Bannari Amman Institute of Technology</p>
              <p class="text-slate-500 font-medium leading-relaxed text-lg max-w-3xl">Currently in <span class="text-slate-900 font-bold underline decoration-indigo-200 decoration-4">Final Year (Semester 8)</span>. Specializing in advanced algorithmic efficiency, machine learning architectures, and scalable cloud-based data systems.</p>
            </div>
            <div class="px-8 py-6 bg-slate-900 rounded-3xl text-center shrink-0 shadow-2xl shadow-indigo-200 group-hover:-translate-y-2 transition-transform">
              <span class="block text-4xl font-black text-white tracking-tighter">2026</span>
              <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expected Graduation</span>
            </div>
          </div>
        </TiltCard>
      </section>

      <!-- CERTIFICATIONS -->
      <section id="credentials" class="mt-12 mb-24" v-motion="{ initial: { opacity: 0, y: 50 }, visibleOnce: { opacity: 1, y: 0, transition: { duration: 800, type: 'spring', damping: 25 } } }">
        <div class="flex items-center gap-4 mb-10">
          <div class="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500">
            <Trophy :size="24" />
          </div>
          <h2 class="text-4xl font-display font-black text-slate-900 tracking-tighter">Official Credentials</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TiltCard v-for="(cert, i) in CERTS" :key="cert.title" 
                     v-motion="{ initial: { opacity: 0, scale: 0.95 }, visibleOnce: { opacity: 1, scale: 1, transition: { delay: i * 150 } } }"
                     class="border-rose-100/50 group hover:border-rose-200 transition-colors duration-500 !p-10">
            <h3 class="text-2xl font-black font-display text-slate-900 mb-3 tracking-tighter">{{ cert.title }}</h3>
            <p class="text-rose-500 text-xs font-black uppercase tracking-widest mb-8">{{ cert.issuer }}</p>
            <a :href="cert.url" target="_blank" class="mt-auto inline-flex self-start items-center gap-3 px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all group-hover:shadow-lg">
              View Detailed PDF <ChevronRight :size="14" class="group-hover:translate-x-1 transition-transform" />
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
