<script setup lang="ts">
import { ref } from 'vue';
import { 
  Github, Linkedin, ExternalLink, Award, Code2, Terminal, Star, Cpu, Globe, 
  Menu, X, ChevronRight, GraduationCap, Database
} from 'lucide-vue-next';

const mobileMenuOpen = ref(false);

const HERO_STATS = [
  { label: 'NPTEL Java (Elite Gold)', value: '97%' },
  { label: 'LeetCode Solved', value: '300+' },
  { label: 'Flagship GitHub Stars', value: '9' },
];

const PROJECTS = [
  {
    id: 1,
    title: 'Smart OD Portal',
    tagline: 'AI-Powered College Automation System',
    description: 'Autonomous OD approval ecosystem featuring DocSense OCR engine (zero-touch PDF parsing), intelligent fraud detection, and multi-role dashboards.',
    stack: ['Vue 3', 'Node.js', 'PostgreSQL', 'Prisma'],
    live: 'https://automation-nu-dusky.vercel.app',
    github: 'https://github.com/sTharun5/Automation',
    featured: true
  },
  {
    id: 2,
    title: 'WhiffAndWrap',
    tagline: 'Premium E-commerce',
    description: 'Sophisticated frontend for luxury perfume and gift wrapping.',
    stack: ['TypeScript', 'Vue 3', 'Tailwind'],
    github: 'https://github.com/sTharun5/WhiffAndWrap',
  },
  {
    id: 3,
    title: 'Currency Converter',
    tagline: 'Real-time live conversion',
    description: 'Supports major world currencies with live exchange rates.',
    stack: ['JavaScript', 'API'],
    live: 'https://tharun-cc.netlify.app/',
    github: 'https://github.com/sTharun5/currency-converter',
  },
  {
    id: 4,
    title: 'Tic-Tac-Toe',
    tagline: 'Classic browser game',
    description: 'Interactive 2-player game with win detection.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    live: 'https://tharun-tictactoe.netlify.app/',
    github: 'https://github.com/sTharun5/Tic-Tac-Toe',
  }
];

const NAV_ITEMS = [
  { label: 'Projects', id: 'projects' },
  { label: 'Expertise', id: 'expertise' },
  { label: 'Certifications', id: 'certifications' },
];

const scrollToSection = (id: string) => {
  mobileMenuOpen.value = false;
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};
</script>

<template>
  <div class="min-h-screen bg-google-bg text-google-text font-sans pb-24 selection:bg-google-blue/20">
    <!-- APP BAR -->
    <header class="sticky top-0 w-full bg-white/90 backdrop-blur-md border-b border-google-border z-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full overflow-hidden border border-google-border shadow-sm">
            <img src="/IMG_6954.jpg" alt="Tharun S" class="w-full h-full object-cover" />
          </div>
          <span class="text-xl font-display font-bold tracking-tight text-google-text">
            Tharun <span class="text-google-blue">S</span>
          </span>
        </div>

        <nav class="hidden md:flex items-center gap-6">
          <button
            v-for="item in NAV_ITEMS"
            :key="item.id"
            @click="scrollToSection(item.id)"
            class="text-sm font-medium text-google-gray hover:text-google-blue transition-colors"
          >
            {{ item.label }}
          </button>
          <a href="mailto:stharun612@gmail.com" class="ml-4 px-5 py-2 rounded-full bg-google-blue hover:bg-blue-600 text-white text-sm font-bold shadow-sm transition-colors">
            Contact
          </a>
        </nav>

        <button class="md:hidden p-2 -mr-2 text-google-gray hover:bg-google-bg rounded-full transition-colors" @click="mobileMenuOpen = !mobileMenuOpen">
          <X v-if="mobileMenuOpen" :size="24" />
          <Menu v-else :size="24" />
        </button>
      </div>

      <!-- Mobile Nav -->
      <transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0 -translate-y-4" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">
        <div v-if="mobileMenuOpen" class="md:hidden border-t border-google-border bg-white absolute w-full left-0 shadow-lg">
          <div class="flex flex-col p-4 gap-2">
            <button v-for="item in NAV_ITEMS" :key="item.id" @click="scrollToSection(item.id)" class="text-left w-full px-4 py-3 text-sm font-medium text-google-gray hover:bg-google-bg rounded-xl">
              {{ item.label }}
            </button>
            <a href="mailto:stharun612@gmail.com" class="mt-2 w-full px-4 py-3 text-center rounded-xl bg-google-blue text-white text-sm font-bold">
              Contact Me
            </a>
          </div>
        </div>
      </transition>
    </header>

    <main class="max-w-4xl mx-auto px-4 sm:px-6 pt-12 md:pt-20 space-y-12 md:space-y-20">
      
      <!-- HERO -->
      <section v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } } }" class="text-center md:text-left flex flex-col items-center md:items-start">
        <div class="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shadow-lg mb-8 border-4 border-white bg-white">
           <img src="/IMG_6954.jpg" alt="Tharun S" class="w-full h-full object-cover" />
        </div>
        
        <h1 class="text-4xl md:text-6xl font-display font-black leading-tight tracking-tight mb-4">
          Architecting <span class="text-google-blue">Data</span>.<br/>
          Optimizing <span class="text-google-green">Logic</span>.
        </h1>
        
        <p class="text-lg md:text-xl text-google-gray max-w-2xl leading-relaxed mb-8">
          I'm <strong class="text-google-text">Tharun</strong>, a Backend & SQL Developer focused on designing resilient algorithms, high-performance relational databases, and scalable APIs in Vue 3.
        </p>

        <div class="flex flex-wrap justify-center md:justify-start gap-4 mb-10">
          <a href="https://github.com/sTharun5" target="_blank" class="flex items-center gap-2 px-6 py-3 rounded-full bg-google-bg border border-google-border hover:bg-gray-200 text-sm font-bold transition-colors">
            <Github :size="18" /> GitHub
          </a>
          <a href="https://linkedin.com/in/tharuntech" target="_blank" class="flex items-center gap-2 px-6 py-3 rounded-full bg-google-bg border border-google-border hover:bg-gray-200 text-sm font-bold transition-colors">
            <Linkedin :size="18" /> LinkedIn
          </a>
        </div>
        
        <div class="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div v-for="(stat, i) in HERO_STATS" :key="stat.label" v-motion="{ initial: { opacity: 0, y: 10 }, enter: { opacity: 1, y: 0, transition: { delay: i * 100, type: 'spring' } } }" class="google-card-flat p-4 flex items-center justify-between">
            <div>
              <div class="text-xs font-bold text-google-gray uppercase tracking-wider mb-1">{{ stat.label }}</div>
              <div class="text-xl font-black text-google-text">{{ stat.value }}</div>
            </div>
            <div class="p-2 bg-google-bg rounded-full">
               <Award v-if="i===0" class="text-google-yellow" />
               <Code2 v-if="i===1" class="text-google-blue" />
               <Star v-if="i===2" class="text-google-red" />
            </div>
          </div>
        </div>
      </section>

      <!-- EXPERTISE -->
      <section id="expertise" v-motion-slide-visible-bottom>
        <div class="flex items-center gap-3 mb-6">
          <Database class="text-google-blue" :size="28" />
          <h2 class="text-2xl md:text-3xl font-display font-black">Core Expertise</h2>
        </div>
        
        <div class="google-card p-6 md:p-8">
          <p class="text-google-gray mb-8 leading-relaxed">
            My core philosophy lies in treating the backend as the foundation of any successful application. I build strict data models, optimize heavy SQL queries, and deploy secure Node.js microservices.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div class="flex gap-4"><div class="w-2 h-2 mt-2 rounded-full bg-google-blue shrink-0"></div><div><h3 class="font-bold text-google-text mb-1">Server-Side Logic</h3><p class="text-sm text-google-gray">Node.js, Express.js, and Java backend architectural patterns.</p></div></div>
             <div class="flex gap-4"><div class="w-2 h-2 mt-2 rounded-full bg-google-red shrink-0"></div><div><h3 class="font-bold text-google-text mb-1">Relational Databases</h3><p class="text-sm text-google-gray">PostgreSQL, MySQL, and complex query optimization.</p></div></div>
             <div class="flex gap-4"><div class="w-2 h-2 mt-2 rounded-full bg-google-green shrink-0"></div><div><h3 class="font-bold text-google-text mb-1">API Development</h3><p class="text-sm text-google-gray">RESTful principles, JWT stateless auth, and robust routing.</p></div></div>
             <div class="flex gap-4"><div class="w-2 h-2 mt-2 rounded-full bg-google-yellow shrink-0"></div><div><h3 class="font-bold text-google-text mb-1">NoSQL & ORMs</h3><p class="text-sm text-google-gray">Prisma object-relational mapping and MongoDB integrations.</p></div></div>
          </div>
        </div>
      </section>

      <!-- PROJECTS -->
      <section id="projects" v-motion-slide-visible-bottom>
        <div class="flex items-center gap-3 mb-6">
          <Terminal class="text-google-red" :size="28" />
          <h2 class="text-2xl md:text-3xl font-display font-black">Featured Work</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="project in PROJECTS" :key="project.id" class="google-card p-6 md:p-8 flex flex-col group" :class="{ 'md:col-span-2': project.featured }">
             <div class="flex justify-between items-start mb-4">
               <div :class="['p-3 rounded-2xl', project.id === 1 ? 'bg-blue-50 text-google-blue' : 'bg-gray-50 text-google-gray']">
                 <Cpu v-if="project.id === 1" :size="24" />
                 <Globe v-else-if="project.id === 4" :size="24" />
                 <Terminal v-else :size="24" />
               </div>
               <span v-if="project.featured" class="px-3 py-1 bg-green-50 text-google-green text-xs font-bold uppercase tracking-wider rounded-full">Flagship</span>
             </div>
             <h3 class="text-xl font-bold text-google-text mb-1 group-hover:text-google-blue transition-colors">{{ project.title }}</h3>
             <p class="text-sm font-semibold text-google-gray mb-3">{{ project.tagline }}</p>
             <p class="text-sm text-google-gray leading-relaxed mb-6 flex-grow">{{ project.description }}</p>
             <div class="flex flex-wrap gap-2 mb-6">
                <span v-for="tech in project.stack" :key="tech" class="px-3 py-1 bg-google-bg border border-google-border rounded-lg text-xs font-medium text-google-gray">
                  {{ tech }}
                </span>
             </div>
             <div class="flex items-center gap-3 mt-auto pt-4 border-t border-google-border">
               <a v-if="project.live" :href="project.live" target="_blank" class="text-sm font-bold text-google-blue hover:text-blue-700 flex items-center gap-1 transition-colors">
                 Live App <ExternalLink :size="14" />
               </a>
               <a :href="project.github" target="_blank" class="text-sm font-bold text-google-gray hover:text-google-text flex items-center gap-1 transition-colors ml-auto">
                 <Github :size="14" /> Source
               </a>
             </div>
          </div>
        </div>
      </section>

      <!-- CERTIFICATIONS -->
      <section id="certifications" v-motion-slide-visible-bottom>
        <div class="flex items-center gap-3 mb-6">
          <GraduationCap class="text-google-yellow" :size="28" />
          <h2 class="text-2xl md:text-3xl font-display font-black">Official Credentials</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div class="google-card p-6 border-l-4 border-l-google-yellow hover:translate-y-[-2px] hover:shadow-lg transition-all">
             <div class="flex justify-between items-start mb-4">
                <h3 class="font-bold text-google-text text-lg">Programming in Java</h3>
                <Award class="text-google-yellow" :size="24" />
             </div>
             <p class="text-sm text-google-gray mb-4">NPTEL</p>
             <div class="flex items-center gap-2 mb-6"><span class="px-3 py-1 bg-yellow-50 text-google-yellow text-xs font-bold rounded-full">Elite Gold (97/100)</span></div>
             <a href="https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs57/Course/NPTEL25CS57S114900069304436474.pdf" target="_blank" class="inline-flex items-center gap-1 text-sm font-bold text-google-blue hover:text-blue-700 group">
                View PDF Certificate <ChevronRight :size="16" class="group-hover:translate-x-1 transition-transform" />
             </a>
           </div>

           <div class="google-card p-6 border-l-4 border-l-google-green hover:translate-y-[-2px] hover:shadow-lg transition-all">
             <div class="flex justify-between items-start mb-4">
                <h3 class="font-bold text-google-text text-lg">C Programming for Beginners</h3>
                <GraduationCap class="text-google-green" :size="24" />
             </div>
             <p class="text-sm text-google-gray mb-4">Udemy</p>
             <div class="flex items-center gap-2 mb-6"><span class="px-3 py-1 bg-green-50 text-google-green text-xs font-bold rounded-full">Verified Completion</span></div>
             <a href="https://udemy-certificate.s3.amazonaws.com/pdf/UC-bf46b573-0177-4003-abad-dd956cda72ab.pdf" target="_blank" class="inline-flex items-center gap-1 text-sm font-bold text-google-blue hover:text-blue-700 group">
                View PDF Certificate <ChevronRight :size="16" class="group-hover:translate-x-1 transition-transform" />
             </a>
           </div>
        </div>
      </section>

    </main>

    <!-- FOOTER -->
    <footer class="mt-20 border-t border-google-border bg-white py-8">
      <div class="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span class="text-xl font-display font-bold tracking-tight text-google-text">
          Tharun <span class="text-google-blue">S</span>
        </span>
        <p class="text-sm text-google-gray">Built with Vue 3, Vite & Tailwind CSS. Designed with Material principles.</p>
      </div>
    </footer>
  </div>
</template>
