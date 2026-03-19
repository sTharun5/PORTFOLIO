'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { TiltCard } from './TiltCard';
import { PRO_SKILLS } from '@/lib/data';
import { Code2, ExternalLink } from 'lucide-react';

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
      type: 'spring',
      damping: 25,
      stiffness: 100,
    },
  },
};

export const ExpertiseSection = () => {
  return (
    <section id="expertise" className="max-w-7xl mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
        <div className="lg:col-span-8 flex flex-col h-full">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-2 mb-12"
          >
            <motion.span variants={itemVariants} className="text-indigo-600 text-xs font-black uppercase tracking-[0.3em] mb-2">Capabilities</motion.span>
            <motion.h2 variants={itemVariants} className="text-5xl font-black text-slate-900 tracking-tighter">Technical Expertise</motion.h2>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-grow"
          >
            {PRO_SKILLS.map((skill) => (
              <motion.div key={skill.name} variants={itemVariants}>
                <TiltCard 
                  className="!p-0 border-slate-100/60 flex flex-col items-center justify-center group overflow-visible h-full"
                  padding="p-8"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-indigo-200 transition-all duration-500 mb-5 shadow-inner">
                    <skill.icon size={22} />
                  </div>
                  <span className="font-bold text-slate-700 text-sm group-hover:text-indigo-600 transition-colors tracking-tight text-center">{skill.name}</span>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.a 
          href="https://leetcode.com/u/user3651Q/" 
          target="_blank" 
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: 'spring', damping: 20 }}
          className="lg:col-span-4 block h-full group"
          aria-label="Visit LeetCode Profile"
        >
          <TiltCard className="flex flex-col items-center justify-center text-center !p-0 border-orange-100/50 bg-gradient-to-b from-white to-orange-50/20 h-full" padding="p-10">
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
    </section>
  );
};
