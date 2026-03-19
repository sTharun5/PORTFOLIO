'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

import { GraduationCap, Linkedin } from 'lucide-react';
import { TiltCard } from './TiltCard';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      type: 'spring',
      damping: 25,
    },
  },
};


export const HeroSection = () => {
  return (
    <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center min-h-[50vh] relative">
      {/* Identity Text */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="lg:col-span-7 flex flex-col"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
          <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100 shadow-sm">
            Software Developer
          </span>
          <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm animate-pulse">
            Available for Hire
          </span>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-[6.5rem] font-black tracking-tighter mb-8 leading-[0.9] text-slate-900"
        >
          Building <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Robust</span> Logic <br/>
          at <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">Scale.</span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants} 
          className="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed mb-8 font-medium"
        >
          I&apos;m <strong className="text-slate-900">Tharun S</strong>, a Final Year AI & DS student specialized in designing resilient server architectures and high-performance data pipelines.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
          <a href="mailto:stharun612@gmail.com" className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 font-black text-sm uppercase tracking-widest">
            Get in Touch
          </a>
          <a href="https://linkedin.com/in/tharuntech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 text-slate-900 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 font-black text-sm uppercase tracking-widest">
            <Linkedin size={20} className="text-indigo-600" /> LinkedIn
          </a>
        </motion.div>
      </motion.div>

      {/* Float Picture Showcase */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: 'spring', damping: 20, delay: 0.2 }}
        className="lg:col-span-5 flex justify-center lg:justify-end"
      >
        <div className="relative w-full max-w-[450px] aspect-[4/5] animate-float-slow group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-400/20 to-sky-400/20 rounded-[3rem] blur-3xl transform group-hover:scale-110 transition-transform duration-700"></div>
          <TiltCard className="!p-0 border-0 shadow-[0_40px_80px_rgba(0,0,0,0.08)]" padding="p-0" isOverflowHidden={false}>
            <img src="/IMG_6954.jpg" alt="Tharun S" className="w-full h-full object-cover rounded-[2.5rem]" />
            <div className="absolute bottom-8 -left-8 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/50 animate-float-fast max-w-[180px] z-[60]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-tighter text-slate-400 leading-none mb-1">Status</p>
                  <p className="text-xs font-black text-slate-900 leading-none">Final Year AI & DS</p>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </motion.div>
    </section>
  );
};
