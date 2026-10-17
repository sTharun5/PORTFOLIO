'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Rocket, Github, ExternalLink, 
  Workflow, ChevronDown, ChevronUp, CheckCircle2 
} from 'lucide-react';
import { TiltCard } from './TiltCard';
import { FEATURED_PROJECTS, ARCHIVED_PROJECTS } from '@/lib/data';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const ProjectsSection = () => {
  const [showArchived, setShowArchived] = useState(false);

  return (
    <section id="projects" className="py-14 max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-2 mb-10"
      >
        <span className="text-sky-400 text-xs font-mono uppercase tracking-[0.3em]">
          Engineered Systems & Software
        </span>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Rocket size={22} />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Featured Projects
          </h2>
        </div>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-1">
          Production-grade applications and systems spanning multimodal GenAI agents, distributed computer vision on AWS, and concurrent transaction engines.
        </p>
      </motion.div>

      {/* 4 Premier Resume Projects Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10"
      >
        {FEATURED_PROJECTS.map((project) => (
          <motion.div key={project.title} variants={itemVariants} className="h-full">
            <TiltCard 
              className="flex flex-col group justify-between hover:border-indigo-500/40 transition-all duration-500 !p-0 border-slate-800/80 bg-slate-900/60 shadow-xl h-full"
              padding="p-7 sm:p-9"
            >
              <div className="relative flex flex-col h-full justify-between">
                <div>
                  {/* Top Category & Links Bar */}
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <span className="text-indigo-400 text-[10px] font-mono uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-lg font-bold">
                      {project.category}
                    </span>

                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
                          aria-label={`${project.title} GitHub repository`}
                          title="View Source Code"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {project.url && (
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-2 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 hover:text-white hover:bg-indigo-600 transition-all"
                          aria-label={`${project.title} live deployment`}
                          title="Live Demo"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl font-black text-white mb-2 tracking-tight group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs font-mono text-slate-400 mb-4 font-semibold">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-300 mb-5 leading-relaxed font-normal">
                    {project.description}
                  </p>

                  {/* Architecture Flow Box */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 mb-5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1 font-bold flex items-center gap-1.5">
                      <Workflow size={12} className="text-sky-400" /> Pipeline Architecture
                    </span>
                    <p className="text-[11px] font-mono text-slate-300 leading-snug break-words">
                      {project.architecture}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="space-y-2 mb-6">
                    {project.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Tech Stack Pills Footer */}
                <div className="mt-auto pt-4 border-t border-slate-800/70">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map(tech => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-1 bg-slate-950/90 rounded-md text-[11px] font-mono text-slate-300 border border-slate-800/80 uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Projects Toggle (Archive) */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => setShowArchived(!showArchived)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono transition-all hover:border-slate-700"
        >
          <span>{showArchived ? 'Hide Additional Projects' : 'View More Projects & Utilities (4)'}</span>
          {showArchived ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>

        {showArchived && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 w-full"
          >
            {ARCHIVED_PROJECTS.map((proj) => (
              <div 
                key={proj.title}
                className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white text-base">{proj.title}</h4>
                    <div className="flex items-center gap-2">
                      <a href={proj.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                        <Github size={15} />
                      </a>
                      {proj.url && (
                        <a href={proj.url} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-white">
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mb-2">{proj.tagline}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{proj.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                  {proj.stack.map(s => (
                    <span key={s} className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
