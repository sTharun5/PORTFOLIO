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
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 100,
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      type: 'spring',
      damping: 25,
    },
  },
};


export const HeroSection = () => {
  return (
    <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center pt-4 min-h-[85vh] relative px-4 sm:px-0">
      {/* Identity Text */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="lg:col-span-7 flex flex-col z-10"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
          <span className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-[10px] sm:text-xs font-black uppercase tracking-widest border border-indigo-100 shadow-sm backdrop-blur-sm">
            Software Developer
          </span>
          <span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-[10px] sm:text-xs font-black uppercase tracking-widest border border-emerald-100 shadow-sm animate-pulse backdrop-blur-sm">
            Available for Hire
          </span>
        </motion.div>
        
        <motion.h1 
          variants={titleVariants}
          className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter mb-8 leading-[0.85] text-slate-900"
        >
          Building <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Robust</span> Logic <br/>
          at <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">Scale.</span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants} 
          className="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed mb-12 font-medium"
        >
          I&apos;m <strong className="text-slate-900">Tharun S</strong>, a Final Year AI & DS student specialized in designing resilient server architectures and high-performance data pipelines.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
          <a 
            href="mailto:stharun612@gmail.com" 
            className="group flex items-center gap-3 px-10 py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xl shadow-indigo-200 transition-all hover:scale-105 active:scale-95 font-black text-sm uppercase tracking-widest"
            aria-label="Send email to Tharun S"
          >
            Get in Touch
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </a>
          <a 
            href="https://linkedin.com/in/tharuntech" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-200 text-slate-900 shadow-sm hover:shadow-xl hover:shadow-indigo-100 transition-all hover:scale-105 font-black text-sm uppercase tracking-widest"
            aria-label="Visit Tharun S LinkedIn profile"
          >
            <Linkedin size={20} className="text-indigo-600" /> LinkedIn
          </a>
        </motion.div>
      </motion.div>

      {/* Float Picture Showcase */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, type: 'spring', damping: 20, delay: 0.5 }}
        className="lg:col-span-5 flex justify-center lg:justify-end mt-12 lg:mt-0"
      >
        <div className="relative w-full max-w-[480px] aspect-[4/5] group">
          {/* Layered decorative glows */}
          <div className="absolute -inset-8 bg-indigo-400/10 rounded-[4rem] blur-[80px] animate-pulse"></div>
          <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-400/20 to-sky-400/20 rounded-[3rem] blur-3xl transform group-hover:scale-110 transition-transform duration-1000"></div>
          
          <TiltCard className="!p-0 border-0 shadow-[0_50px_100px_rgba(0,0,0,0.1)] relative z-10" padding="p-0" isOverflowHidden={false}>
            <div className="w-full h-full rounded-[2.5rem] overflow-hidden">
               <img src="/IMG_6954.jpg" alt="Tharun S" className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000 ease-out" />
            </div>
            
            {/* Floating Badge - Magnetic feel */}
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6,
                ease: "easeInOut"
              }}
              className="absolute bottom-10 -left-10 bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white/50 z-[60] group-hover:-translate-x-2 transition-transform duration-500"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                  <GraduationCap size={28} />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-tighter text-slate-400 leading-none mb-1.5">Status</p>
                  <p className="text-sm font-black text-slate-900 leading-none">Final Year AI & DS</p>
                </div>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </motion.div>
    </section>
  );
};
