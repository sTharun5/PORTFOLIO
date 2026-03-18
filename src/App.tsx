import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, ExternalLink, Award, Code2, Terminal, Star, Cpu, Globe, 
  Menu, X, ChevronRight, GraduationCap, Database
} from 'lucide-react';

// --- DATA ---
const HERO_STATS = [
  { label: 'NPTEL Java (Elite Gold)', value: '97%', icon: <Award className="text-google-yellow" /> },
  { label: 'LeetCode Solved', value: '300+', icon: <Code2 className="text-google-blue" /> },
  { label: 'Flagship GitHub Stars', value: '9', icon: <Star className="text-google-red" /> },
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

const NAV_ITEMS = [
  { label: 'Projects', id: 'projects' },
  { label: 'Expertise', id: 'expertise' },
  { label: 'Certifications', id: 'certifications' },
];

// --- APP COMPONENT ---

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const springConfig = { type: "spring", stiffness: 100, damping: 20 } as const;

  return (
    <div className="min-h-screen bg-google-bg text-google-text font-sans pb-24 selection:bg-google-blue/20">
      
      {/* APP BAR */}
      <header className="sticky top-0 w-full bg-white/90 backdrop-blur-md border-b border-google-border z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-google-border shadow-sm">
              <img src="/IMG_6954.jpg" alt="Tharun S" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-google-text">
              Tharun <span className="text-google-blue">S</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-google-gray hover:text-google-blue transition-colors"
              >
                {item.label}
              </button>
            ))}
            <a 
              href="mailto:stharun612@gmail.com" 
              className="ml-4 px-5 py-2 rounded-full bg-google-blue hover:bg-blue-600 text-white text-sm font-bold shadow-sm transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 -mr-2 text-google-gray hover:bg-google-bg rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-google-border bg-white overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left w-full px-4 py-3 text-sm font-medium text-google-gray hover:bg-google-bg rounded-xl"
                  >
                    {item.label}
                  </button>
                ))}
                <a 
                  href="mailto:stharun612@gmail.com" 
                  className="mt-2 w-full px-4 py-3 text-center rounded-xl bg-google-blue text-white text-sm font-bold"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 md:pt-20 space-y-12 md:space-y-20">
        
        {/* HERO SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
          className="text-center md:text-left flex flex-col items-center md:items-start"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shadow-lg mb-8 border-4 border-white bg-white">
             <img src="/IMG_6954.jpg" alt="Tharun S" className="w-full h-full object-cover" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-black leading-tight tracking-tight mb-4">
            Architecting <span className="text-google-blue">Data</span>.<br/>
            Optimizing <span className="text-google-green">Logic</span>.
          </h1>
          
          <p className="text-lg md:text-xl text-google-gray max-w-2xl leading-relaxed mb-8">
            I'm <strong className="text-google-text">Tharun</strong>, a Backend & SQL Developer focused on designing resilient algorithms, high-performance relational databases, and scalable RESTful APIs.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-10">
            <a href="https://github.com/sTharun5" target="_blank" className="flex items-center gap-2 px-6 py-3 rounded-full bg-google-bg hover:bg-gray-200 border border-google-border text-sm font-bold transition-colors">
              <Github size={18} /> GitHub
            </a>
            <a href="https://linkedin.com/in/tharuntech" target="_blank" className="flex items-center gap-2 px-6 py-3 rounded-full bg-google-bg hover:bg-gray-200 border border-google-border text-sm font-bold transition-colors">
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>

          {/* Intro Stats Bar */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
            {HERO_STATS.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, ...springConfig }}
                className="google-card-flat p-4 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-google-gray uppercase tracking-wider mb-1">{stat.label}</div>
                  <div className="text-xl font-black text-google-text">{stat.value}</div>
                </div>
                <div className="p-2 bg-google-bg rounded-full">
                  {stat.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* EXPERTISE SECTION */}
        <motion.section 
          id="expertise"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springConfig}
        >
          <div className="flex items-center gap-3 mb-6">
            <Database className="text-google-blue" size={28} />
            <h2 className="text-2xl md:text-3xl font-display font-black">Core Expertise</h2>
          </div>

          <div className="google-card p-6 md:p-8">
            <p className="text-google-gray mb-8 leading-relaxed">
              My core philosophy lies in treating the backend as the foundation of any successful application. I build strict data models, optimize heavy SQL queries, and deploy secure Node.js microservices.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-google-blue shrink-0"></div>
                <div>
                  <h3 className="font-bold text-google-text mb-1">Server-Side Logic</h3>
                  <p className="text-sm text-google-gray">Node.js, Express.js, and Java backend architectural patterns.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-google-red shrink-0"></div>
                <div>
                  <h3 className="font-bold text-google-text mb-1">Relational Databases</h3>
                  <p className="text-sm text-google-gray">PostgreSQL, MySQL, and complex query optimization.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-google-green shrink-0"></div>
                <div>
                  <h3 className="font-bold text-google-text mb-1">API Development</h3>
                  <p className="text-sm text-google-gray">RESTful principles, JWT stateless auth, and robust routing.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-google-yellow shrink-0"></div>
                <div>
                  <h3 className="font-bold text-google-text mb-1">NoSQL & ORMs</h3>
                  <p className="text-sm text-google-gray">Prisma object-relational mapping and MongoDB integrations.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* PROJECTS SECTION */}
        <motion.section 
          id="projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springConfig}
        >
          <div className="flex items-center gap-3 mb-6">
             <Terminal className="text-google-red" size={28} />
             <h2 className="text-2xl md:text-3xl font-display font-black">Featured Work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ...springConfig }}
                className={`google-card p-6 md:p-8 flex flex-col group ${project.featured ? 'md:col-span-2' : ''}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl ${project.id === 1 ? 'bg-blue-50 text-google-blue' : 'bg-gray-50 text-google-gray'}`}>
                    {project.id === 1 ? <Cpu size={24} /> : project.id === 4 ? <Globe size={24} /> : <Terminal size={24} />}
                  </div>
                  {project.featured && (
                    <span className="px-3 py-1 bg-green-50 text-google-green text-xs font-bold uppercase tracking-wider rounded-full">
                      Flagship
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-google-text mb-1 group-hover:text-google-blue transition-colors">{project.title}</h3>
                <p className="text-sm font-semibold text-google-gray mb-3">{project.tagline}</p>
                
                <p className="text-sm text-google-gray leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-google-bg border border-google-border rounded-lg text-xs font-medium text-google-gray">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-google-border">
                  {project.live && (
                    <a href={project.live} target="_blank" className="text-sm font-bold text-google-blue hover:text-blue-700 flex items-center gap-1 transition-colors">
                      Live App <ExternalLink size={14} />
                    </a>
                  )}
                  <a href={project.github} target="_blank" className="text-sm font-bold text-google-gray hover:text-google-text flex items-center gap-1 transition-colors ml-auto">
                    <Github size={14} /> Source
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CERTIFICATIONS SECTION */}
        <motion.section 
          id="certifications"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springConfig}
        >
          <div className="flex items-center gap-3 mb-6">
             <GraduationCap className="text-google-yellow" size={28} />
             <h2 className="text-2xl md:text-3xl font-display font-black">Official Credentials</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* NPTEL */}
             <div className="google-card p-6 border-l-4 border-l-google-yellow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-google-text text-lg">Programming in Java</h3>
                  <Award className="text-google-yellow" size={24} />
                </div>
                <p className="text-sm text-google-gray mb-4">NPTEL (IIT professors — Govt of India)</p>
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-yellow-50 text-google-yellow text-xs font-bold rounded-full">Elite Gold (97/100)</span>
                </div>
                <a href="https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs57/Course/NPTEL25CS57S114900069304436474.pdf" target="_blank" className="inline-flex items-center gap-1 text-sm font-bold text-google-blue hover:text-blue-700 group">
                  View PDF Certificate <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
             </div>

             {/* Udemy */}
             <div className="google-card p-6 border-l-4 border-l-google-green">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-google-text text-lg">C Programming for Beginners</h3>
                  <GraduationCap className="text-google-green" size={24} />
                </div>
                <p className="text-sm text-google-gray mb-4">Udemy Academy</p>
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-green-50 text-google-green text-xs font-bold rounded-full">Verified Completion</span>
                </div>
                <a href="https://udemy-certificate.s3.amazonaws.com/pdf/UC-bf46b573-0177-4003-abad-dd956cda72ab.pdf" target="_blank" className="inline-flex items-center gap-1 text-sm font-bold text-google-blue hover:text-blue-700 group">
                  View PDF Certificate <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
             </div>
          </div>
        </motion.section>

      </main>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-google-border bg-white py-8">
         <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xl font-display font-bold tracking-tight text-google-text">
              Tharun <span className="text-google-blue">S</span>
            </span>
            <p className="text-sm text-google-gray">
              Built with React, Vite & Tailwind CSS. Designed with Material principles.
            </p>
         </div>
      </footer>
    </div>
  );
};

export default App;
