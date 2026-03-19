'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { TiltCard } from './TiltCard';
import { PRO_SKILLS, PERSONAL_TRAITS } from '@/lib/data';
import { Code2, ExternalLink, Dna } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.05
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


export const ExpertiseSection = () => {
  return (
    <section id="expertise" className="max-w-7xl mx-auto px-6 py-20 sm:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
        <div className="lg:col-span-8 flex flex-col h-full">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-2 mb-10 sm:mb-12"
          >
            <motion.span variants={itemVariants} className="text-indigo-600 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-2">Capabilities</motion.span>
            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]">Technical Expertise</motion.h2>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 flex-grow mb-16"
          >
            {PRO_SKILLS.map((skill) => (
              <motion.div key={skill.name} variants={itemVariants}>
                <TiltCard 
                  className="!p-0 border-slate-100/60 flex flex-col items-center justify-center group overflow-visible h-full"
                  padding="p-6 sm:p-8"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-indigo-200 transition-all duration-500 mb-4 sm:mb-5 shadow-inner">
                    <skill.icon size={20} />
                  </div>
                  <span className="font-bold text-slate-700 text-xs sm:text-sm group-hover:text-indigo-600 transition-colors tracking-tight text-center">{skill.name}</span>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Professional DNA Section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100/50">
                <Dna size={16} className="animate-pulse" />
              </div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Professional DNA</h3>
            </div>
            
            <motion.div 
              variants={containerVariants}
              className="flex flex-wrap gap-2 sm:gap-3"
            >
              {PERSONAL_TRAITS.map((trait) => (
                <motion.span 
                  key={trait} 
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 rounded-full bg-white border border-slate-100 text-slate-600 text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-sm hover:shadow-md hover:border-indigo-100 hover:text-indigo-600 transition-all cursor-default"
                >
                  {trait}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        <motion.a 
          href="https://leetcode.com/u/user3651Q/" 
          target="_blank" 
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: 'spring', damping: 20 }}
          className="lg:col-span-4 block h-full group"
          aria-label="Visit LeetCode Profile"
        >
          <TiltCard className="flex flex-col items-center justify-center text-center !p-0 border-orange-100/50 bg-gradient-to-b from-white to-orange-50/20 h-full" padding="p-8 sm:p-10">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-6 sm:mb-8 shadow-2xl shadow-orange-200 group-hover:scale-110 transition-transform duration-700">
              <Code2 className="text-white" size={40} />
            </div>
            <h2 className="text-6xl sm:text-7xl font-black text-slate-900 mb-2 tracking-tighter">300+</h2>
            <p className="text-orange-600 font-black uppercase tracking-[0.2em] text-[8px] sm:text-[10px] mb-6">Problems Solved</p>
            <div className="mt-6 sm:mt-8 flex items-center gap-3 text-orange-600 font-black text-[10px] uppercase tracking-widest bg-white shadow-xl shadow-orange-100/50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-orange-100 group-hover:bg-orange-600 group-hover:text-white transition-all">
              LeetCode Profile <ExternalLink size={14} />
            </div>
          </TiltCard>
        </motion.a>
      </div>
    </section>
  );
};
