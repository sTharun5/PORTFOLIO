'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Rocket, Github, ExternalLink } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { PROJECTS } from '@/lib/data';

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
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};



export const ProjectsSection = () => {
  return (
    <section id="projects" className="mt-12">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-4 mb-10"
      >
        <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-500">
          <Rocket size={24} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Engineering Projects</h2>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10"
      >
        {PROJECTS.map((project) => (
          <motion.div key={project.title} variants={itemVariants} className="h-full">
            <TiltCard 
              className="flex flex-col group justify-between hover:border-indigo-200 transition-all duration-500 !p-0 border-slate-100 shadow-sm h-full"
              padding="p-10"
            >
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] bg-indigo-50 px-3 py-1 rounded-lg">
                    {project.tagline}
                  </span>
                  <div className="flex gap-3">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-slate-400 hover:text-slate-900 transition-colors"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <Github size={18} />
                    </a>
                    {project.url && (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-slate-400 hover:text-indigo-600 transition-colors"
                        aria-label={`${project.title} live demo`}
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-5 tracking-tighter group-hover:text-indigo-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-base text-slate-500 mb-10 leading-relaxed font-medium line-clamp-2 md:line-clamp-none">
                  {project.description}
                </p>
              </div>
              
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2.5 mb-2">
                  {project.stack.map(tech => (
                    <span 
                      key={tech} 
                      className="px-4 py-1.5 bg-slate-50 rounded-xl text-[10px] font-bold text-slate-500 border border-slate-100 uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
