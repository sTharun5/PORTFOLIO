<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Github, Linkedin, ExternalLink, ArrowRight, Database } from 'lucide-vue-next';

const activeSection = ref('about');

const PROJECTS = [
  {
    title: 'Smart OD Portal',
    url: 'https://automation-nu-dusky.vercel.app',
    github: 'https://github.com/sTharun5/Automation',
    description: 'An autonomous OD approval ecosystem constructed to eliminate manual paperwork. It features a custom DocSense OCR engine for zero-touch PDF parsing, intelligent fraud detection workflows, and role-based access control.',
    stack: ['Vue 3', 'Node.js', 'PostgreSQL', 'Prisma'],
    featured: true
  },
  {
    title: 'WhiffAndWrap Architecture',
    github: 'https://github.com/sTharun5/WhiffAndWrap',
    description: 'A sophisticated backend architecture for luxury e-commerce. Designed resilient data models to handle complex inventory workflows and secure payment pipeline integrations.',
    stack: ['TypeScript', 'Node.js', 'APIs'],
  },
  {
    title: 'Currency Exchange API',
    url: 'https://tharun-cc.netlify.app/',
    github: 'https://github.com/sTharun5/currency-converter',
    description: 'Engineered a real-time live conversion service supporting major world currencies with continuous external API synchronization.',
    stack: ['JavaScript', 'REST'],
  }
];

const CERTS = [
  {
    title: 'Programming in Java (Elite Gold, 97/100)',
    issuer: 'NPTEL, Govt. of India',
    date: '2024',
    url: 'https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs57/Course/NPTEL25CS57S114900069304436474.pdf',
    description: 'Mastered advanced JVM concepts, multithreading, and algorithmic efficiency at a top tier level under IIT professors.'
  },
  {
    title: 'C Programming for Beginners',
    issuer: 'Udemy',
    date: '2023',
    url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-bf46b573-0177-4003-abad-dd956cda72ab.pdf',
    description: 'Solidified deep foundational knowledge in memory management, pointers, and essential low-level system design.'
  }
];

// Intersection Observer for scroll spy
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      }
    },
    { rootMargin: '-30% 0px -70% 0px' }
  );

  const sections = document.querySelectorAll('section[id]');
  sections.forEach((section) => observer.observe(section));

  onUnmounted(() => {
    sections.forEach((section) => observer.unobserve(section));
  });
});

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <div class="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0 selection:bg-slate-300 selection:text-slate-900">
    <div class="lg:flex lg:justify-between lg:gap-4">
      
      <!-- STICKY LEFT PANE -->
      <header class="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
        <div>
          <!-- Avatar Identity -->
          <div class="mb-8 w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm" v-motion="{ initial: { opacity: 0, scale: 0.9 }, enter: { opacity: 1, scale: 1, transition: { type: 'spring' } } }">
            <img src="/IMG_6954.jpg" alt="Tharun S" class="w-full h-full object-cover" />
          </div>
          
          <h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl border-b border-transparent">
            Tharun S
          </h1>
          <h2 class="mt-3 text-lg font-medium tracking-tight text-slate-700 sm:text-xl">
            Backend Engineer
          </h2>
          <p class="mt-4 max-w-xs leading-relaxed text-slate-500">
            I build scalable data pipelines and robust server architecture. I focus on logic, optimization, and zero-downtime systems.
          </p>

          <nav class="nav hidden lg:block mt-16 text-sm font-bold tracking-widest text-slate-500 uppercase">
            <ul class="flex flex-col gap-5">
              <li>
                <button @click="scrollTo('about')" :class="['group flex items-center gap-4 transition-all', activeSection === 'about' ? 'text-slate-900' : 'hover:text-slate-900']">
                  <span :class="['h-px bg-slate-400 transition-all group-hover:w-16 group-hover:bg-slate-900', activeSection === 'about' ? 'w-16 bg-slate-900' : 'w-8']"></span>
                  About
                </button>
              </li>
              <li>
                <button @click="scrollTo('expertise')" :class="['group flex items-center gap-4 transition-all', activeSection === 'expertise' ? 'text-slate-900' : 'hover:text-slate-900']">
                  <span :class="['h-px bg-slate-400 transition-all group-hover:w-16 group-hover:bg-slate-900', activeSection === 'expertise' ? 'w-16 bg-slate-900' : 'w-8']"></span>
                  Expertise
                </button>
              </li>
              <li>
                <button @click="scrollTo('projects')" :class="['group flex items-center gap-4 transition-all', activeSection === 'projects' ? 'text-slate-900' : 'hover:text-slate-900']">
                  <span :class="['h-px bg-slate-400 transition-all group-hover:w-16 group-hover:bg-slate-900', activeSection === 'projects' ? 'w-16 bg-slate-900' : 'w-8']"></span>
                  Projects
                </button>
              </li>
              <li>
                <button @click="scrollTo('credentials')" :class="['group flex items-center gap-4 transition-all', activeSection === 'credentials' ? 'text-slate-900' : 'hover:text-slate-900']">
                  <span :class="['h-px bg-slate-400 transition-all group-hover:w-16 group-hover:bg-slate-900', activeSection === 'credentials' ? 'w-16 bg-slate-900' : 'w-8']"></span>
                  Credentials
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Social Anchors -->
        <ul class="mt-8 flex items-center gap-6 text-slate-400 lg:mt-0" v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1, transition: { delay: 300 } } }">
          <li>
            <a href="https://github.com/sTharun5" target="_blank" class="hover:text-slate-900 transition-colors">
              <span class="sr-only">GitHub</span>
              <Github class="h-6 w-6" />
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/tharuntech" target="_blank" class="hover:text-slate-900 transition-colors">
              <span class="sr-only">LinkedIn</span>
              <Linkedin class="h-6 w-6" />
            </a>
          </li>
          <li>
            <a href="mailto:stharun612@gmail.com" class="hover:text-slate-900 transition-colors font-bold text-sm tracking-widest uppercase ml-4">
              stharun612@gmail.com
            </a>
          </li>
        </ul>
      </header>

      <!-- SCROLLABLE RIGHT PANE -->
      <main class="pt-24 lg:w-[52%] lg:py-24 flex flex-col gap-24">
        
        <!-- ABOUT -->
        <section id="about" class="scroll-mt-24" v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0 } }">
          <div class="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-50/90 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
            <h2 class="text-sm font-bold uppercase tracking-widest text-slate-900">About</h2>
          </div>
          
          <div class="text-slate-500 leading-relaxed space-y-4">
             <p>
               Back in 2023, I decided that building pretty interfaces wasn't enough; I needed to understand how the engine worked. Fast-forward to today, and I've spent thousands of hours querying relational databases, building JWT authentication flows, and bridging microservices to power heavy enterprise applications.
             </p>
             <p>
               My main focus these days is architecting highly resilient, zero-downtime server setups for college-level automation ecosystems. I specialize in designing pure logic: parsing logic, routing logic, and data storage theory. I write algorithms that execute silently in the background, making sure the user never sees a loading spinner.
             </p>
             <p>
               When I'm not writing backend infrastructure in Node.js or optimizing Prisma models, I'm deep-diving into memory management in C or solving complex LeetCode algorithms to keep my logic sharp.
             </p>
          </div>
        </section>

        <!-- EXPERTISE -->
        <section id="expertise" class="scroll-mt-24" v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0 } }">
          <div class="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-50/90 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
            <h2 class="text-sm font-bold uppercase tracking-widest text-slate-900">Core Expertise</h2>
          </div>
          <div class="flex items-center gap-2 text-slate-900 font-bold mb-6">
            <Database :size="18" /> The Backend Arsenal
          </div>
          <ul class="flex flex-wrap gap-2">
            <li v-for="skill in ['Node.js', 'Express.js', 'PostgreSQL', 'MySQL', 'Prisma ORM', 'MongoDB', 'REST APIs', 'Java', 'C', 'JWT Auth', 'Git / GitHub']" :key="skill" 
                class="flex items-center rounded-full bg-slate-200/50 px-3 py-1 text-xs font-semibold leading-5 text-slate-700 hover:bg-slate-200 transition-colors">
               {{ skill }}
            </li>
          </ul>
        </section>

        <!-- PROJECTS -->
        <section id="projects" class="scroll-mt-24" v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0 } }">
          <div class="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-50/90 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
            <h2 class="text-sm font-bold uppercase tracking-widest text-slate-900">Projects</h2>
          </div>

          <ol class="group/list space-y-8">
            <li v-for="project in PROJECTS" :key="project.title" class="mb-12">
              <div class="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div class="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-[20px] transition motion-reduce:transition-none lg:block lg:group-hover:bg-slate-100/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-sm"></div>
                
                <div class="z-10 sm:order-2 sm:col-span-8">
                  <h3 class="font-medium leading-snug text-slate-900">
                    <div>
                      <a :href="project.url || project.github" target="_blank" class="inline-flex items-baseline font-bold leading-tight text-slate-900 hover:text-indigo-600 focus-visible:text-indigo-600 group/link text-base">
                        <span class="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                        <span>
                          {{ project.title }}
                          <span class="inline-block"><ArrowRight class="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 ml-1 translate-y-px" /></span>
                        </span>
                      </a>
                    </div>
                  </h3>
                  <p class="mt-2 text-sm leading-normal text-slate-500">
                    {{ project.description }}
                  </p>
                  <ul class="mt-4 flex flex-wrap gap-2">
                    <li v-for="tech in project.stack" :key="tech" class="flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold leading-5 text-indigo-600">
                      {{ tech }}
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ol>
        </section>

        <!-- CERTIFICATIONS -->
        <section id="credentials" class="scroll-mt-24 mb-24" v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0 } }">
          <div class="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-50/90 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
            <h2 class="text-sm font-bold uppercase tracking-widest text-slate-900">Credentials</h2>
          </div>

          <ol class="group/list space-y-8">
            <li v-for="cert in CERTS" :key="cert.title" class="mb-12">
              <div class="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div class="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-[20px] transition motion-reduce:transition-none lg:block lg:group-hover:bg-slate-100/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-sm"></div>
                
                <header class="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:col-span-2">
                  {{ cert.date }}
                </header>
                
                <div class="z-10 sm:col-span-6">
                  <h3 class="font-medium leading-snug text-slate-900">
                    <div>
                      <a :href="cert.url" target="_blank" class="inline-flex items-baseline font-bold leading-tight text-slate-900 hover:text-indigo-600 focus-visible:text-indigo-600 group/link text-base">
                        <span class="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                        <span>
                          {{ cert.title }}
                          <span class="inline-block"><ArrowRight class="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 ml-1 translate-y-px" /></span>
                        </span>
                      </a>
                    </div>
                  </h3>
                  <div class="text-sm font-semibold text-slate-600 mt-1 mb-2">{{ cert.issuer }}</div>
                  <p class="mt-2 text-sm leading-normal text-slate-500">
                    {{ cert.description }}
                  </p>
                </div>
              </div>
            </li>
          </ol>
        </section>

      </main>
    </div>
  </div>
</template>
