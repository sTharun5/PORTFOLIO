import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Award, 
  Code2, 
  Server, 
  Database, 
  Terminal,
  ChevronDown,
  Star,
  Globe,
  Cpu
} from 'lucide-react';

// --- DATA ---
const HERO_STATS = [
  { label: 'NPTEL Java - Elite Gold', value: 97, unit: '%', icon: <Award className="text-yellow-400" /> },
  { label: 'LeetCode Problems', value: 300, unit: '+', icon: <Code2 className="text-blue-400" /> },
  { label: 'GitHub Flagship Stars', value: 9, unit: '★', icon: <Star className="text-violet-400" /> },
];

const PROJECTS = [
  {
    id: 1,
    title: 'Smart OD Portal',
    tagline: 'AI-Powered College Automation System',
    description: 'Autonomous OD approval ecosystem for BIT featuring DocSense OCR engine (zero-touch PDF parsing), intelligent fraud detection, multi-role dashboards, and QR attendance automation.',
    stack: ['React 19', 'Node.js', 'PostgreSQL', 'Prisma', 'JWT', 'Framer Motion'],
    live: 'https://automation-nu-dusky.vercel.app',
    github: 'https://github.com/sTharun5/Automation',
    stars: 9,
    featured: true
  },
  {
    id: 2,
    title: 'WhiffAndWrap',
    tagline: 'Premium E-commerce Presentation',
    description: 'A sophisticated frontend for a luxury perfume and gift wrapping service.',
    stack: ['TypeScript', 'React', 'Tailwind CSS'],
    github: 'https://github.com/sTharun5/WhiffAndWrap',
    stars: 8
  },
  {
    id: 3,
    title: 'Currency Converter',
    tagline: 'Real-time live currency conversion',
    description: 'Supports all major world currencies with live exchange rates and country flag display.',
    stack: ['JavaScript', 'Flags API', 'Exchange Rate API'],
    live: 'https://tharun-cc.netlify.app/',
    github: 'https://github.com/sTharun5/currency-converter',
    stars: 8
  },
  {
    id: 4,
    title: 'Tic-Tac-Toe',
    tagline: 'Classic browser game with clean UI',
    description: 'Interactive 2-player Tic-Tac-Toe with win detection, game reset, and smooth UI.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    live: 'https://tharun-tictactoe.netlify.app/',
    github: 'https://github.com/sTharun5/Tic-Tac-Toe',
    stars: 8
  }
];

const SKILLS = {
  Frontend: ['React 19', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'Leaflet'],
  Backend: ['Node.js', 'Express.js', 'Prisma ORM', 'JWT'],
  Database: ['PostgreSQL (Supabase)', 'MongoDB', 'MySQL'],
  Tools: ['Git', 'GitHub', 'Brevo API', 'REST APIs', 'XLSX'],
  Languages: ['JavaScript', 'TypeScript', 'Java', 'C', 'HTML', 'CSS']
};

// --- COMPONENTS ---

interface CounterProps {
  value: number | string;
  unit: string;
  duration?: number;
}

const Counter = ({ value, unit, duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = typeof value === 'string' ? parseInt(value) : value;
    if (start === end) return;

    const totalMilisecondsStep = Math.max((duration * 1000) / end, 1);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, totalMilisecondsStep);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}{unit}</span>;
};

interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
}

const SectionHeading = ({ children, subtitle }: SectionHeadingProps) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const App = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <div className="min-h-screen bg-background text-slate-300 selection:bg-primary/30">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/50 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold text-white tracking-widest font-display"
          >
            THARUN<span className="text-secondary">.S</span>
          </motion.div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {['Projects', 'Skills', 'Certification', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-primary transition-colors uppercase tracking-wider">
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden">
        <motion.div style={{ opacity, scale }} className="text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-primary/10 border border-primary/20 text-primary rounded-full"
          >
            Full Stack Developer | MERN Stack
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-black mb-6 leading-tight"
          >
            Innovating through <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-gradient bg-[length:200%_auto]">Code & Design.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Student at <span className="text-white font-medium">Bannari Amman Institute of Technology</span>. 
            Passionate about building scalable web ecosystems and solving complex algorithmic challenges.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-20"
          >
            <a href="#projects" className="px-8 py-4 bg-primary hover:bg-primary/80 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
              View Work <ExternalLink size={18} />
            </a>
            <div className="flex gap-2">
              <a href="https://github.com/sTharun5" target="_blank" className="p-4 bg-glass hover:bg-white/10 rounded-xl transition-all">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/tharuntech" target="_blank" className="p-4 bg-glass hover:bg-white/10 rounded-xl transition-all">
                <Linkedin size={20} />
              </a>
              <a href="mailto:stharun612@gmail.com" className="p-4 bg-glass hover:bg-white/10 rounded-xl transition-all">
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {HERO_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="p-8 bg-glass neon-border group hover:border-primary/80 transition-all text-center md:text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2 flex items-center md:justify-start justify-center gap-2">
                <Counter value={stat.value} unit={stat.unit} />
              </div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-widest leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10"
        >
          <ChevronDown className="text-slate-600" />
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
        <SectionHeading subtitle="A showcase of full-stack engineering and innovative problem solving.">
          Featured <span className="text-secondary">Projects</span>
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className={`group flex flex-col bg-glass p-8 rounded-2xl border-white/5 hover:border-primary/50 transition-all ${project.featured ? 'md:col-span-2 lg:col-span-2 relative overflow-hidden' : ''}`}
            >
              {project.featured && (
                <div className="absolute top-0 right-0 py-1 px-4 bg-primary text-[10px] font-bold uppercase tracking-widest text-white rounded-bl-xl">
                  Featured Project
                </div>
              )}

              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  {project.id === 1 ? <Cpu size={24} /> : project.id === 4 ? <Globe size={24} /> : <Terminal size={24} />}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-400/10 text-yellow-500 text-xs font-bold rounded-full">
                  <Star size={12} fill="currentColor" /> {project.stars}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-secondary text-sm font-medium mb-4 uppercase tracking-wider">{project.tagline}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.stack.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {project.live && (
                  <a href={project.live} target="_blank" className="flex-1 py-3 bg-secondary hover:bg-secondary/80 text-background font-bold rounded-xl text-center text-sm transition-all flex items-center justify-center gap-2">
                    Live Demo
                  </a>
                )}
                <a href={project.github} target="_blank" className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-center text-sm transition-all flex items-center justify-center gap-2">
                  GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Modern tools and technologies I use to bring ideas to life.">
            Technical <span className="text-primary">Ecosystem</span>
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {Object.entries(SKILLS).map(([category, items], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
              >
                <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                    {category === 'Frontend' ? < Globe size={16} /> : category === 'Backend' ? <Server size={16} /> : <Database size={16} />}
                  </div>
                  {category}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {items.map(skill => (
                    <span key={skill} className="px-4 py-2 bg-glass border-white/5 hover:border-secondary/30 transition-all rounded-xl text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section id="certification" className="py-24 px-6 max-w-7xl mx-auto">
        <SectionHeading subtitle="Validated expertise through rigorous academic evaluation.">
          Key <span className="text-yellow-400">Certification</span>
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* NPTEL Java Certification */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-10 bg-glass rounded-[2rem] neon-border text-center overflow-hidden flex flex-col items-center"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 blur-3xl rounded-full"></div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="inline-block p-4 bg-yellow-400/10 rounded-full mb-6"
            >
              <Award size={48} className="text-yellow-400" />
            </motion.div>
            <h3 className="text-2xl font-black text-white mb-2">Programming in Java</h3>
            <p className="text-md text-slate-400 mb-6 font-medium">NPTEL (IIT professors — Govt of India)</p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="px-5 py-2 bg-yellow-400/20 text-yellow-400 font-black text-xl rounded-xl border border-yellow-400/30 text-glow">
                97 / 100
              </div>
              <div className="px-5 py-2 bg-primary/20 text-primary font-bold text-md rounded-xl border border-primary/30 flex items-center gap-2 uppercase tracking-tight">
                Elite Gold
              </div>
            </div>
            <div className="mt-auto">
              <a 
                href="https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs57/Course/NPTEL25CS57S114900069304436474.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:border-yellow-400/50 hover:bg-yellow-400/5 transition-all rounded-xl font-bold text-white text-sm"
              >
                View Certificate <ExternalLink size={16} className="text-yellow-400" />
              </a>
            </div>
          </motion.div>

          {/* Udemy C Programming Certification */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative p-10 bg-glass rounded-[2rem] border border-white/5 hover:border-secondary/50 text-center overflow-hidden flex flex-col items-center"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-3xl rounded-full"></div>
            <div className="inline-block p-4 bg-secondary/10 rounded-full mb-6">
              <Award size={48} className="text-secondary" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">C Programming for Beginners</h3>
            <p className="text-md text-slate-400 mb-6 font-medium">Udemy (UC-bf46b573-0177-4003-abad-dd956cda72ab)</p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="px-5 py-2 bg-secondary/20 text-secondary font-black text-xl rounded-xl border border-secondary/30 text-glow-secondary">
                Verified
              </div>
              <div className="px-5 py-2 bg-white/5 text-slate-300 font-bold text-md rounded-xl border border-white/10 flex items-center gap-2 uppercase tracking-tight">
                Foundational
              </div>
            </div>
            <div className="mt-auto">
              <a 
                href="https://udemy-certificate.s3.amazonaws.com/pdf/UC-bf46b573-0177-4003-abad-dd956cda72ab.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:border-secondary/50 hover:bg-secondary/5 transition-all rounded-xl font-bold text-white text-sm"
              >
                View Certificate <ExternalLink size={16} className="text-secondary" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading subtitle="Have a project in mind or want to discuss a technical challenge? My inbox is always open.">
            Let's <span className="text-glow animate-pulse">Connect</span>
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <a href="mailto:stharun612@gmail.com" className="p-8 bg-glass rounded-2xl hover:border-primary/50 transition-all group overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              <Mail size={32} className="text-primary mb-4 mx-auto" />
              <div className="text-lg font-bold text-white mb-1">Email Me</div>
              <div className="text-slate-400 text-sm">stharun612@gmail.com</div>
            </a>
            <a href="https://linkedin.com/in/tharuntech" target="_blank" className="p-8 bg-glass rounded-2xl hover:border-secondary/50 transition-all group overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              <Linkedin size={32} className="text-secondary mb-4 mx-auto" />
              <div className="text-lg font-bold text-white mb-1">LinkedIn</div>
              <div className="text-slate-400 text-sm">tharuntech</div>
            </a>
          </div>

          <div className="p-1 px-4 py-2 inline-flex items-center gap-2 bg-white/5 rounded-full text-xs font-mono text-slate-500">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Available for new opportunities
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-white/5">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-4">
          Built with <span className="text-primary font-bold">React 19</span> & <span className="text-secondary font-bold">Tailwind 4</span>
        </p>
        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} Tharun S. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;
