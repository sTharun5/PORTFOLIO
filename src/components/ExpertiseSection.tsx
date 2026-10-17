'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TiltCard } from './TiltCard';
import { SKILL_CATEGORIES, PROFESSIONAL_TRAITS, LEADERSHIP, PERSONAL_INFO } from '@/lib/data';
import { Code2, ExternalLink, Dna, Award, Users } from 'lucide-react';

export const ExpertiseSection = () => {
  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 py-14">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2 mb-10"
      >
        <span className="text-indigo-400 text-xs font-mono uppercase tracking-[0.3em]">
          Technical Arsenal
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Specialized Skill Matrix
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
          A targeted blend of enterprise database engineering, autonomous GenAI protocols, cloud data stores, and algorithmic foundations.
        </p>
      </motion.div>

      {/* 4 Skill Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {SKILL_CATEGORIES.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <TiltCard 
              key={cat.title}
              className="border-slate-800/80 bg-slate-900/60 hover:border-indigo-500/40 transition-all !p-0 shadow-lg"
              padding="p-6 sm:p-8"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-slate-950/80 border ${cat.borderColor} flex items-center justify-center ${cat.accentColor} shadow-inner`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Domain 0{idx + 1}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 mb-5 leading-relaxed font-sans">
                {cat.description}
              </p>

              {/* Skills Pills */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <div 
                    key={skill.name}
                    className="px-3 py-1.5 rounded-lg bg-slate-950/90 border border-slate-800/90 hover:border-slate-700 flex items-center gap-2 group transition-all"
                  >
                    <span className="text-xs font-mono font-medium text-slate-200">
                      {skill.name}
                    </span>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </TiltCard>
          );
        })}
      </div>

      {/* Bottom Highlights: LeetCode + Leadership + Traits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LeetCode Spotlight */}
        <motion.a
          href={PERSONAL_INFO.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-4 block group"
          aria-label="Visit LeetCode Profile"
        >
          <TiltCard 
            className="flex flex-col items-center justify-center text-center !p-0 border-amber-500/20 bg-gradient-to-b from-slate-900/90 to-amber-950/15 hover:border-amber-500/40 h-full"
            padding="p-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 shadow-xl shadow-amber-600/20 group-hover:scale-105 transition-transform duration-500">
              <Code2 className="text-white" size={32} />
            </div>
            <span className="text-4xl font-black text-white font-mono tracking-tight mb-1">
              300+
            </span>
            <p className="text-amber-400 font-mono uppercase tracking-[0.2em] text-[11px] mb-2 font-bold">
              LeetCode Problems Solved
            </p>
            <p className="text-xs text-slate-400 max-w-xs mb-4">
              Algorithmic problem-solving in Arrays, Trees, Dynamic Programming, Graphs, and Hash Tables.
            </p>
            <div className="flex items-center gap-2 text-amber-300 font-mono text-xs uppercase tracking-widest bg-slate-950/80 px-4 py-2 rounded-xl border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
              View LeetCode Profile <ExternalLink size={13} />
            </div>
          </TiltCard>
        </motion.a>

        {/* Leadership Spotlight (Java Trainer) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-4"
        >
          <TiltCard 
            className="flex flex-col justify-between !p-0 border-indigo-500/20 bg-gradient-to-b from-slate-900/90 to-indigo-950/20 hover:border-indigo-500/40 h-full"
            padding="p-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Users size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 block font-bold">
                    Mentorship & Impact
                  </span>
                  <h3 className="font-bold text-white text-lg">Java Trainer</h3>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {LEADERSHIP[0].description}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
              <Award size={16} className="text-amber-400 shrink-0" />
              <span>Certified Top 1% Java Instructor</span>
            </div>
          </TiltCard>
        </motion.div>

        {/* Engineering Traits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-4"
        >
          <TiltCard 
            className="flex flex-col justify-between !p-0 border-slate-800/80 bg-slate-900/60 hover:border-slate-700 h-full"
            padding="p-8"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-4 text-xs font-mono uppercase tracking-wider text-emerald-400">
                <Dna size={16} /> Engineering Core
              </div>
              <h3 className="font-bold text-white text-base mb-3">
                Architectural Principles
              </h3>
              <div className="flex flex-wrap gap-2">
                {PROFESSIONAL_TRAITS.map((trait) => (
                  <span
                    key={trait}
                    className="px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-slate-500 font-mono mt-4 pt-3 border-t border-slate-800/60">
              Clean, modular, fault-tolerant design philosophy.
            </div>
          </TiltCard>
        </motion.div>

      </div>
    </section>
  );
};
