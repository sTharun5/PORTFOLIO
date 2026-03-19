'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Trophy, Code2, ExternalLink, Github } from 'lucide-react';
import { HeroSection } from '@/components/HeroSection';
import { TiltCard } from '@/components/TiltCard';
import { PROJECTS, CERTS, PRO_SKILLS } from '@/lib/data';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
    };
    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <main className="relative z-10 max-w-7xl mx-auto px-6 py-4 lg:py-8 flex flex-col gap-32 overflow-hidden">
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      {/* Hero Section */}
      <HeroSection />

      {/* EXPERTISE */}
      <motion.section 
        id="expertise" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: 'spring', damping: 25 }}
        className="max-w-7xl mx-auto py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          <div className="lg:col-span-8 flex flex-col h-full">
            <div className="flex flex-col gap-2 mb-12">
              <span className="text-indigo-600 text-xs font-black uppercase tracking-[0.3em] mb-2">Capabilities</span>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Technical Expertise</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-grow">
              {PRO_SKILLS.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <TiltCard 
                    className="!p-0 border-slate-100/60 flex flex-col items-center justify-center group overflow-visible"
                    padding="p-8"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-indigo-200 transition-all duration-500 mb-5 shadow-inner">
                      <skill.icon size={22} />
                    </div>
                    <span className="font-bold text-slate-700 text-sm group-hover:text-indigo-600 transition-colors tracking-tight text-center">{skill.name}</span>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* LEETCODE COMPONENT */}
          <motion.a 
            href="https://leetcode.com/u/user3651Q/" 
            target="_blank" 
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: 'spring', damping: 20 }}
            className="lg:col-span-4 block h-full group"
          >
            <TiltCard className="flex flex-col items-center justify-center text-center !p-0 border-orange-100/50 bg-gradient-to-b from-white to-orange-50/20" padding="p-10">
              <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-8 shadow-2xl shadow-orange-200 group-hover:scale-110 transition-transform duration-700">
                <Code2 className="text-white" size={48} />
              </div>
              <h2 className="text-7xl font-black text-slate-900 mb-2 tracking-tighter">300+</h2>
              <p className="text-orange-600 font-black uppercase tracking-[0.2em] text-[10px] mb-6">Problems Solved</p>
              <div className="mt-8 flex items-center gap-3 text-orange-600 font-black text-[10px] uppercase tracking-widest bg-white shadow-xl shadow-orange-100/50 px-8 py-4 rounded-2xl border border-orange-100 group-hover:bg-orange-600 group-hover:text-white transition-all">
                LeetCode Profile <ExternalLink size={14} />
              </div>
            </TiltCard>
          </motion.a>
        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section 
        id="projects" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: 'spring', damping: 25 }}
        className="mt-12"
      >
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-500">
            <Rocket size={24} />
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Engineering Projects</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TiltCard 
                className="flex flex-col group justify-between hover:border-indigo-200 transition-all duration-500 !p-0 border-slate-100 shadow-sm h-full"
                padding="p-10"
              >
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] bg-indigo-50 px-3 py-1 rounded-lg">{project.tagline}</span>
                    <div className="flex gap-3">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
                        <Github size={18} />
                      </a>
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-5 tracking-tighter group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                  <p className="text-base text-slate-500 mb-10 leading-relaxed font-medium line-clamp-2 md:line-clamp-none">{project.description}</p>
                </div>
                
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2.5 mb-2">
                    {project.stack.map(tech => (
                      <span key={tech} className="px-4 py-1.5 bg-slate-50 rounded-xl text-[10px] font-bold text-slate-500 border border-slate-100 uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ACADEMICS */}
      <motion.section 
        id="education" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: 'spring', damping: 25 }}
        className="mt-12"
      >
        <div className="flex flex-col gap-2 mb-10">
          <span className="text-indigo-600 text-xs font-black uppercase tracking-[0.3em] mb-2">History</span>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Academic Journey</h2>
        </div>
        <TiltCard className="border-slate-100 group transition-all duration-700 relative !p-0" padding="p-12" isOverflowHidden={false}>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-50/40 rounded-full blur-[100px] z-0 group-hover:bg-indigo-100/40 transition-colors"></div>
          <div className="flex flex-col md:flex-row gap-12 md:items-center justify-between relative z-10 w-full text-left">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl">
                  <Code2 size={24} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">B.Tech Artificial Intelligence & Data Science</h3>
              </div>
              <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Bannari Amman Institute of Technology</p>
              <p className="text-slate-500 font-medium leading-relaxed text-lg max-w-3xl">Active candidate in <span className="text-slate-900 font-bold underline decoration-indigo-200 decoration-4">Semester 8 (Final Year)</span>. Focused on high-performance algorithmic logic, scalable data architectures, and efficient backend systems.</p>
            </div>
            <div className="px-10 py-8 bg-white rounded-[2rem] text-center shrink-0 shadow-2xl shadow-indigo-100/50 border border-slate-50 group-hover:-translate-y-2 transition-transform duration-500">
              <span className="block text-5xl font-black text-slate-900 tracking-tighter mb-1">2026</span>
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Expected Graduation</span>
            </div>
          </div>
        </TiltCard>
      </motion.section>

      {/* CERTIFICATIONS */}
      <motion.section 
        id="credentials" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: 'spring', damping: 25 }}
        className="mt-12 mb-32"
      >
        <div className="flex flex-col gap-2 mb-10">
          <span className="text-rose-600 text-xs font-black uppercase tracking-[0.3em] mb-2">Verified</span>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Official Credentials</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {CERTS.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <TiltCard 
                className="border-slate-100 group hover:border-rose-100 transition-all duration-500 !p-0 h-full"
                padding="p-10"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-500">
                    <Trophy size={24} />
                  </div>
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-rose-500 transition-colors">
                    <ExternalLink size={18} />
                  </a>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tighter group-hover:text-rose-600 transition-colors">{cert.title}</h3>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{cert.issuer}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
