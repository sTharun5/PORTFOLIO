'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Calendar, CheckCircle2, Database, Sparkles, 
  ChevronRight, Zap
} from 'lucide-react';
import { TiltCard } from './TiltCard';
import { EXPERIENCE } from '@/lib/data';

export const ExperienceSection = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <motion.section 
      id="experience" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-6 py-14"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-10">
        <div className="flex items-center gap-3">
          <span className="text-indigo-400 text-xs font-mono uppercase tracking-[0.3em]">
            Industry Track
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase tracking-wider border border-emerald-500/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Current Role
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Professional Experience
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-1">
          Engineering mission-critical enterprise database architectures and building next-generation GenAI and MCP data integrations.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {EXPERIENCE.map((exp, idx) => (
          <TiltCard 
            key={idx} 
            className="border-slate-800/80 bg-slate-900/70 group hover:border-indigo-500/40 transition-all duration-700 !p-0 shadow-2xl" 
            padding="p-7 md:p-12" 
            isOverflowHidden={false}
          >
            {/* Ambient Accent Glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] z-0 group-hover:bg-indigo-600/20 transition-colors pointer-events-none" />
            
            <div className="relative z-10 w-full flex flex-col gap-8">
              {/* Header: Company, Role & Duration */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
                <div className="flex items-start md:items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-500 shrink-0">
                    <Database size={30} />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {exp.role}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-mono uppercase tracking-wider border border-indigo-500/20">
                        {exp.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 text-slate-300 text-sm font-semibold">
                      <Building2 size={16} className="text-indigo-400" />
                      <span className="text-indigo-300 font-bold text-base">{exp.company}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400 text-xs font-mono">{exp.department}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950/80 text-slate-200 font-mono text-xs uppercase tracking-wider border border-slate-800 self-start md:self-auto shadow-inner">
                  <Calendar size={14} className="text-indigo-400" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-slate-300 font-normal text-base sm:text-lg leading-relaxed max-w-4xl">
                {exp.description}
              </p>

              {/* Impact Breakdown - Interactive Domain Tabs */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 flex items-center gap-1.5">
                    <Sparkles size={14} /> Core Engineering Impact Areas
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    Explore key accomplishments:
                  </span>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {exp.impactAreas.map((area, aIdx) => (
                    <button
                      key={aIdx}
                      onClick={() => setActiveTab(aIdx)}
                      className={`text-left p-3.5 rounded-xl border text-xs font-mono transition-all flex flex-col justify-between gap-2 ${
                        activeTab === aIdx
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                          : 'bg-slate-950/70 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold flex items-center justify-between">
                        <span>Domain 0{aIdx + 1}</span>
                        {activeTab === aIdx && <Zap size={13} className="text-indigo-400" />}
                      </span>
                      <span className="line-clamp-2 leading-tight font-sans text-xs">
                        {area.title}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Active Tab Accomplishments Card */}
                <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-3.5 transition-all">
                  <h4 className="text-sm font-bold text-indigo-300 font-mono flex items-center gap-2">
                    <ChevronRight size={16} className="text-indigo-400" />
                    {exp.impactAreas[activeTab].title}
                  </h4>

                  <div className="space-y-3 pl-2">
                    {exp.impactAreas[activeTab].points.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3">
                        <CheckCircle2 size={17} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base font-normal text-slate-200 leading-relaxed">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technologies Applied */}
              <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-800/70">
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mr-2">
                  Applied Technologies:
                </span>
                {exp.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 rounded-lg bg-slate-950/90 border border-slate-800 text-slate-300 text-xs font-mono uppercase tracking-wider hover:border-indigo-500/40 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </motion.section>
  );
};
