import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, Linkedin, Mail, ExternalLink, Award, Code2, Terminal, Star, Cpu, Globe, 
  LayoutDashboard, FolderGit2, Wrench, GraduationCap, Send
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

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
    description: 'Autonomous OD approval ecosystem featuring DocSense OCR engine (zero-touch PDF parsing), intelligent fraud detection, and multi-role dashboards.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Prisma'],
    live: 'https://automation-nu-dusky.vercel.app',
    github: 'https://github.com/sTharun5/Automation',
    stars: 9,
    featured: true
  },
  {
    id: 2,
    title: 'WhiffAndWrap',
    tagline: 'Premium E-commerce',
    description: 'Sophisticated frontend for luxury perfume and gift wrapping.',
    stack: ['TypeScript', 'React', 'Tailwind'],
    github: 'https://github.com/sTharun5/WhiffAndWrap',
    stars: 8
  },
  {
    id: 3,
    title: 'Currency Converter',
    tagline: 'Real-time live conversion',
    description: 'Supports major world currencies with live exchange rates.',
    stack: ['JavaScript', 'API'],
    live: 'https://tharun-cc.netlify.app/',
    github: 'https://github.com/sTharun5/currency-converter',
    stars: 8
  },
  {
    id: 4,
    title: 'Tic-Tac-Toe',
    tagline: 'Classic browser game',
    description: 'Interactive 2-player game with win detection.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    live: 'https://tharun-tictactoe.netlify.app/',
    github: 'https://github.com/sTharun5/Tic-Tac-Toe',
    stars: 8
  }
];

const SKILL_RADAR_DATA = [
  { subject: 'Backend Logic', proficiency: 95 },
  { subject: 'SQL & RDBMS', proficiency: 90 },
  { subject: 'API Design', proficiency: 85 },
  { subject: 'Database Schema', proficiency: 88 },
  { subject: 'Problem Solving', proficiency: 95 },
  { subject: 'Server Arch', proficiency: 80 },
];

const NAV_ITEMS = [
  { label: 'Dashboard', icon: <LayoutDashboard size={20} />, id: 'dashboard' },
  { label: 'Projects', icon: <FolderGit2 size={20} />, id: 'projects' },
  { label: 'Skills', icon: <Wrench size={20} />, id: 'skills' },
  { label: 'Certifications', icon: <GraduationCap size={20} />, id: 'certifications' },
  { label: 'Contact', icon: <Send size={20} />, id: 'contact' },
];

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

// --- MAIN APP ---

const App = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-slate-300 selection:bg-primary/30 font-sans">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full"></div>
      </div>

      {/* SIDEBAR (Desktop) / BOTTOM NAV (Mobile) */}
      <nav className="fixed md:sticky top-0 bottom-0 md:bottom-auto md:h-screen w-full md:w-64 bg-card/80 backdrop-blur-xl border-t md:border-t-0 md:border-r border-white/10 z-50 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start px-4 md:px-6 py-3 md:py-8 shadow-2xl md:shadow-none order-last md:order-first">
        
        {/* Brand/Avatar (Hidden on mobile bottom nav, managed in top header) */}
        <div className="hidden md:flex flex-col items-center w-full mb-10">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-secondary p-1 animate-pulse-slow">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-3xl font-black text-white font-display uppercase tracking-widest">
                TS
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold text-white font-display tracking-wider">THARUN S</h2>
          <p className="text-xs text-secondary font-bold uppercase tracking-widest mt-1">Backend Developer</p>
        </div>

        {/* Nav Links */}
        <div className="flex flex-row md:flex-col w-full gap-2 md:gap-3 justify-around md:justify-start overflow-x-auto no-scrollbar">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all font-medium text-xs md:text-sm w-full md:w-auto md:justify-start ${
                activeSection === item.id 
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {item.icon}
              <span className="md:inline-block">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Social Links (Desktop bottom) */}
        <div className="hidden md:flex flex-wrap justify-center gap-3 w-full mt-auto pt-8 border-t border-white/5">
          <a href="https://github.com/sTharun5" target="_blank" className="p-2.5 bg-background border border-white/5 hover:border-white/20 hover:text-white rounded-lg transition-all text-slate-400">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/tharuntech" target="_blank" className="p-2.5 bg-background border border-white/5 hover:border-secondary/50 hover:text-secondary rounded-lg transition-all text-slate-400">
            <Linkedin size={18} />
          </a>
          <a href="mailto:stharun612@gmail.com" className="p-2.5 bg-background border border-white/5 hover:border-primary/50 hover:text-primary rounded-lg transition-all text-slate-400">
            <Mail size={18} />
          </a>
        </div>
      </nav>

      {/* MOBILE HEADER */}
      <header className="md:hidden sticky top-0 bg-card/80 backdrop-blur-xl border-b border-white/10 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-sm font-black text-white font-display">
              TS
            </div>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white font-display leading-tight">THARUN S</h2>
            <p className="text-[10px] text-secondary font-bold uppercase tracking-widest">Backend Dev</p>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 md:p-8 lg:p-10 container mx-auto mb-20 md:mb-0 relative z-10 overflow-x-hidden">
        
        {/* DASHBOARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 auto-rows-max">

          {/* HERO WIDGET (Spans 2 columns on desktop, 4 on XL) */}
          <motion.section 
            id="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 xl:col-span-4 bg-glass p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full group-hover:bg-primary/20 transition-all duration-700"></div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Available for Opportunities
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              Innovating through <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-accent animate-gradient bg-[length:200%_auto]">Code & Design.</span>
            </h1>
            
            <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed mb-8">
              Student at <strong className="text-white">BIT</strong>. Architecting robust server-side ecosystems, optimizing complex SQL queries, and building scalable RESTful APIs. Specializing in high-performance backend infrastructure and data modeling.
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollToSection('projects')} className="px-6 py-3 bg-primary hover:bg-primary/80 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] flex items-center gap-2 text-sm text-glow">
                View Projects <ExternalLink size={16} />
              </button>
            </div>
          </motion.section>

          {/* STATS WIDGETS */}
          {HERO_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * (i + 1) }}
              className="bg-card/40 backdrop-blur-md p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all flex flex-col justify-center relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none transform scale-150">
                {stat.icon}
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                  {stat.icon}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
                  {stat.label.split(' - ')[0]}<br/>
                  <span className="text-primary">{stat.label.split(' - ')[1]}</span>
                </div>
              </div>
              <div className="text-4xl font-black text-white font-mono tracking-tighter">
                <Counter value={stat.value} unit={stat.unit} />
              </div>
            </motion.div>
          ))}

          {/* FILLER WIDGET OR LOCATION (To complete the 4-col grid top section) */}
           <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="md:col-span-1 bg-card/40 backdrop-blur-md p-6 rounded-3xl border border-white/5 hover:border-secondary/30 transition-all flex flex-col justify-center items-center text-center relative overflow-hidden group"
            >
             <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <Globe className="text-secondary opacity-50 mb-3" size={32} />
             <h3 className="text-white font-bold text-lg">Based in India</h3>
             <p className="text-xs text-slate-400 mt-1">Ready to work globally</p>
          </motion.div>


          {/* SKILLS CHART WIDGET (Spans 2 columns) */}
           <motion.section 
            id="skills"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 xl:col-span-2 bg-glass p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col h-[400px]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 text-primary rounded-xl"><Wrench size={20} /></div>
              <h2 className="text-xl font-bold text-white">Technical Proficiency</h2>
            </div>
            <div className="flex-1 w-full h-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILL_RADAR_DATA}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: 'Inter' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(139,92,246,0.3)', borderRadius: '12px', fontSize: '12px' }}
                    itemStyle={{ color: '#8b5cf6', fontWeight: 'bold' }}
                  />
                  <Radar name="Proficiency" dataKey="proficiency" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.section>

          {/* TECH STACK LIST WIDGET (Spans 2 columns) */}
           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 xl:col-span-2 bg-glass p-6 md:p-8 rounded-3xl border border-white/10"
          >
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Ecosystem</h3>
             <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2"><span className="text-white">Server-Side</span> <span className="text-primary">Node.js, Express, Java</span></div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-primary w-[95%] rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2"><span className="text-white">Relational DBs (SQL)</span> <span className="text-secondary">PostgreSQL, MySQL</span></div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-secondary w-[90%] rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2"><span className="text-white">NoSQL & ORMs</span> <span className="text-accent">MongoDB, Prisma</span></div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-accent w-[85%] rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div></div>
                </div>
             </div>
             <div className="mt-6 flex flex-wrap gap-2">
               {['REST APIs', 'JWT Auth', 'Data Modeling', 'Git', 'Brevo API'].map(tool => (
                 <span key={tool} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] uppercase font-bold text-slate-500">{tool}</span>
               ))}
             </div>
          </motion.div>


          {/* PROJECTS SECTION (Spans full width) */}
          <section id="projects" className="md:col-span-2 xl:col-span-4 mt-8">
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="p-2 bg-white/10 text-white rounded-xl"><FolderGit2 size={24} /></div>
              <h2 className="text-2xl font-black text-white">Featured Projects</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {PROJECTS.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className={`group flex flex-col bg-card/60 backdrop-blur-xl p-6 rounded-3xl border border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(139,92,246,0.1)] hover:-translate-y-1 ${project.featured ? 'md:col-span-2 relative overflow-hidden' : ''}`}
                >
                  {project.featured && (
                    <div className="absolute top-0 right-0 py-1.5 px-4 bg-primary text-[10px] font-bold uppercase tracking-widest text-white rounded-bl-2xl shadow-lg">
                      Flagship Initiative
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-5 h-10">
                    <div className={`p-2.5 rounded-xl ${project.id === 1 ? 'bg-primary/20 text-primary' : 'bg-white/5 text-slate-400'}`}>
                      {project.id === 1 ? <Cpu size={20} /> : project.id === 4 ? <Globe size={20} /> : <Terminal size={20} />}
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-400/10 border border-yellow-400/20 text-yellow-500 text-[10px] font-bold rounded-full">
                      <Star size={10} fill="currentColor" /> {project.stars}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1.5 line-clamp-1">{project.title}</h3>
                  <p className="text-primary text-[10px] font-bold mb-3 uppercase tracking-wider">{project.tagline}</p>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6 flex-grow line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.stack.slice(0, 4).map(tech => (
                      <span key={tech} className="px-2 py-1 bg-white/5 border border-white/5 rounded-md text-[9px] uppercase font-bold tracking-wider text-slate-500">
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && <span className="px-2 py-1 bg-white/5 border border-white/5 rounded-md text-[9px] uppercase font-bold tracking-wider text-slate-500">+{project.stack.length - 4}</span>}
                  </div>

                  <div className="flex gap-2 w-full mt-auto">
                    {project.live && (
                      <a href={project.live} target="_blank" className="flex-1 py-2.5 bg-secondary/10 hover:bg-secondary border border-secondary/20 hover:border-secondary text-secondary hover:text-background font-bold rounded-xl text-center text-xs transition-all flex items-center justify-center gap-1.5">
                        Live Demo
                      </a>
                    )}
                    <a href={project.github} target="_blank" className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl text-center text-xs transition-all flex items-center justify-center gap-1.5">
                      <Github size={14} /> Code
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CERTIFICATIONS (Spans full width) */}
          <section id="certifications" className="md:col-span-2 xl:col-span-4 mt-8">
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="p-2 bg-yellow-400/10 text-yellow-400 rounded-xl"><GraduationCap size={24} /></div>
              <h2 className="text-2xl font-black text-white">Verified Credentials</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* NPTEL Cert */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card/60 backdrop-blur-xl p-8 rounded-3xl border border-yellow-400/20 hover:border-yellow-400/50 transition-all flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 blur-3xl rounded-full group-hover:bg-yellow-400/20 transition-all"></div>
                
                <div className="w-16 h-16 shrink-0 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                  <Award size={32} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">Programming in Java</h3>
                  <p className="text-xs text-slate-400 mb-4 uppercase tracking-widest font-bold">NPTEL (IIT professors — Govt of India)</p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                    <span className="px-3 py-1 bg-yellow-400/20 text-yellow-500 text-xs font-black rounded-lg border border-yellow-400/20">Scored 97/100</span>
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-lg border border-primary/20">Elite Gold</span>
                  </div>

                  <a 
                    href="https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs57/Course/NPTEL25CS57S114900069304436474.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex py-2 px-4 bg-white/5 border border-white/10 hover:bg-yellow-400/10 hover:border-yellow-400/30 hover:text-yellow-400 rounded-xl text-xs font-bold text-slate-300 transition-all w-full md:w-auto justify-center"
                  >
                    View Official PDF
                  </a>
                </div>
              </motion.div>

              {/* Udemy Cert */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card/60 backdrop-blur-xl p-8 rounded-3xl border border-white/5 hover:border-secondary/50 transition-all flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-3xl rounded-full group-hover:bg-secondary/10 transition-all"></div>
                
                <div className="w-16 h-16 shrink-0 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-secondary/10 group-hover:text-secondary group-hover:border-secondary/30 group-hover:scale-110 transition-all">
                  <GraduationCap size={32} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">C Programming for Beginners</h3>
                  <p className="text-xs text-slate-400 mb-4 uppercase tracking-widest font-bold">Udemy Academy</p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                    <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-black rounded-lg border border-secondary/20">Verified Credentials</span>
                  </div>

                  <a 
                    href="https://udemy-certificate.s3.amazonaws.com/pdf/UC-bf46b573-0177-4003-abad-dd956cda72ab.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex py-2 px-4 bg-white/5 border border-white/10 hover:bg-secondary/10 hover:border-secondary/30 hover:text-secondary rounded-xl text-xs font-bold text-slate-300 transition-all w-full md:w-auto justify-center"
                  >
                    View Official PDF
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* CONTACT WIDGET (Spans 2 columns on XL) */}
          <motion.section 
            id="contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 xl:col-span-4 bg-gradient-to-br from-card to-background p-8 md:p-12 rounded-3xl border border-white/10 mt-8 text-center relative overflow-hidden group"
          >
             <div className="absolute -inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
             
             <div className="relative z-10 max-w-xl mx-auto">
               <div className="w-16 h-16 mx-auto bg-primary/20 text-primary border border-primary/30 rounded-full flex items-center justify-center mb-6 animate-pulse-slow">
                 <Send size={28} />
               </div>
               <h2 className="text-3xl font-black text-white mb-4">Let's Build the Future</h2>
               <p className="text-slate-400 text-sm mb-8">Looking to collaborate on innovative solutions or have a technical role in mind? My inbox is always responsive.</p>
               
               <a href="mailto:stharun612@gmail.com" className="inline-flex px-8 py-4 bg-white text-background hover:bg-slate-200 font-black rounded-2xl transition-all shadow-[0_10px_40px_rgba(255,255,255,0.2)] hover:scale-105">
                 stharun612@gmail.com
               </a>
             </div>
          </motion.section>

        </div> {/* END GRID */}
      </main>
    </div>
  );
};

export default App;
