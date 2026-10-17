'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { 
  Database, Award, Linkedin, Mail, 
  Terminal as TerminalIcon, 
  Sparkles, CheckCircle2, FileText, Bot, 
  RefreshCw, Zap
} from 'lucide-react';
import { TiltCard } from './TiltCard';
import { PERSONAL_INFO, KEY_METRICS } from '@/lib/data';
import { ResumeModal } from './ResumeModal';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.08
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const HeroSection = () => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 2400);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center py-12 lg:py-20 relative">
        {/* Identity Text Column */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col"
        >
          {/* Top Badges */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6 flex-wrap">
            <div className="px-3.5 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-xs font-mono text-indigo-300 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold">{PERSONAL_INFO.company} • {PERSONAL_INFO.role}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 flex items-center gap-1.5">
              <Award size={13} />
              <span>CGPA {PERSONAL_INFO.cgpa} / 10.0</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>Java Top 1% (97%)</span>
            </div>
          </motion.div>
          
          {/* Main Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-[4.6rem] font-black tracking-tight mb-6 leading-[1.08] text-white"
          >
            Engineering <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400">
              Enterprise Data Pipelines
            </span> <br/>
            & GenAI Systems.
          </motion.h1>
          
          {/* Bio Paragraph */}
          <motion.p 
            variants={itemVariants} 
            className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-normal"
          >
            I&apos;m <strong className="text-white font-bold">{PERSONAL_INFO.name}</strong>, a Data Engineering Intern at{' '}
            <strong className="text-indigo-400 font-bold">Aptean (TLX)</strong> and B.Tech AI & Data Science scholar ({PERSONAL_INFO.cgpa} CGPA). 
            I build high-throughput <strong className="text-sky-300 font-medium">T-SQL data synchronization stored procedures</strong>, 
            multi-company architectures, and cutting-edge <strong className="text-emerald-300 font-medium">Model Context Protocol (MCP)</strong> servers 
            connecting enterprise shipment datasets to autonomous AI agents.
          </motion.p>
          
          {/* Primary Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 mb-10">
            <button 
              onClick={() => scrollTo('experience')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5 font-bold text-sm tracking-wide"
            >
              <Database size={17} /> View Experience
            </button>

            <button 
              onClick={() => setResumeOpen(true)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-indigo-500/50 shadow-md transition-all hover:-translate-y-0.5 font-bold text-sm"
            >
              <FileText size={17} className="text-indigo-400" /> Official Resume
            </button>

            <button 
              onClick={() => scrollTo('contact')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 border border-slate-800 transition-all font-semibold text-sm"
            >
              <Mail size={16} /> Contact Me
            </button>
          </motion.div>

          {/* Key Metric Bar */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md"
          >
            {KEY_METRICS.map((metric, idx) => (
              <div key={idx} className="flex flex-col">
                <span className={`text-2xl font-black font-mono tracking-tight ${metric.highlight}`}>
                  {metric.value}
                </span>
                <span className="text-[11px] font-mono text-slate-300 uppercase tracking-wider font-semibold">
                  {metric.label}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {metric.subtext}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Interactive Architecture Showcase & Portrait Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-5 flex flex-col items-center lg:items-end"
        >
          <div className="relative w-full max-w-[490px]">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-600/25 via-sky-600/15 to-emerald-500/20 rounded-[2.5rem] blur-3xl opacity-75 pointer-events-none"></div>
            
            <TiltCard 
              className="!p-0 border border-slate-700/80 bg-[#0B101D]/90 shadow-[0_30px_70px_rgba(0,0,0,0.6)] rounded-3xl overflow-hidden" 
              padding="p-0" 
              isOverflowHidden={false}
            >
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <TerminalIcon size={13} className="text-indigo-400" /> aptean_mcp_sync.sql
                  </span>
                </div>
                <button
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className="flex items-center gap-1 text-[10px] font-mono text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-700/40 px-2.5 py-1 rounded-md transition-colors"
                  title="Simulate Pipeline Step"
                >
                  <RefreshCw size={11} className={isSimulating ? 'animate-spin' : ''} />
                  <span>{isSimulating ? 'SYNCING...' : 'RUN PIPELINE'}</span>
                </button>
              </div>

              {/* Code & Terminal Body */}
              <div className="p-5 font-mono text-xs leading-relaxed text-slate-300 bg-[#060911]/95 space-y-3">
                <div className="text-slate-500 text-[11px] pb-1 border-b border-slate-800/80 flex items-center justify-between">
                  <span>-- Aptean TLX Enterprise Architecture</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Zap size={11} /> LIVE EXEC
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-indigo-300 font-semibold">
                    EXEC <span className="text-emerald-300">sp_SyncCompanyShipments</span>
                  </p>
                  <p className="pl-4 text-slate-400">
                    @COID = <span className="text-amber-300">1042</span>,
                  </p>
                  <p className="pl-4 text-slate-400">
                    @SyncMode = <span className="text-amber-300">&apos;FULL_INCREMENTAL&apos;</span>;
                  </p>
                </div>

                {/* MCP Server Integration Stream */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] space-y-1.5">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5 text-sky-300">
                      <Bot size={13} /> Local MCP Server (IP Liability):
                    </span>
                    <span className="text-emerald-400 text-[10px]">CONNECTED</span>
                  </div>
                  <p className="text-slate-400 text-[10px]">
                    &gt; Exposing TMS/FAP tables via Model Context Protocol
                  </p>
                  <p className="text-slate-400 text-[10px]">
                    &gt; RapidOCR ONNX extraction: <span className="text-emerald-300">Invoice Match (100%)</span>
                  </p>
                </div>

                {/* Live Pipeline Metrics Output */}
                <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block">Status:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 size={11} /> 0 Errors • Sync Passed
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block">Agent Audit:</span>
                    <span className="text-indigo-300 font-bold">
                      Freight Validated
                    </span>
                  </div>
                </div>
              </div>

              {/* Tharun Profile Overlay Float Card */}
              <div className="p-4 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-indigo-500/50 shrink-0 shadow-md">
                    <Image
                      src="/IMG_6954.jpg"
                      alt="Tharun S"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-white leading-tight">Tharun S</h2>
                    <p className="text-[10px] font-mono text-indigo-400 leading-tight">
                      Data Engineering Intern @ Aptean
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Bannari Amman Inst. of Tech (8.95)
                    </p>
                  </div>
                </div>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/30 transition-all text-xs shrink-0"
                  title="Connect on LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </TiltCard>
          </div>
        </motion.div>
      </section>

      {/* Official Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
};
