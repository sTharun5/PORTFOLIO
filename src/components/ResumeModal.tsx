'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Printer, Mail, Phone, Linkedin, 
  Check, Copy, FileText
} from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE, FEATURED_PROJECTS } from '@/lib/data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[92vh] bg-[#0E131F] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200"
          >
            {/* Header Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900/95 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base tracking-tight">Tharun S — Official Resume</h3>
                  <p className="text-xs text-slate-400 font-mono">Data Engineering & GenAI Systems</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
                  title="Print or Save as PDF"
                >
                  <Printer size={14} />
                  <span className="hidden sm:inline">Print / Save PDF</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Scrollable Printable Document */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 text-sm leading-relaxed custom-scrollbar">
              
              {/* Document Header */}
              <div className="text-center pb-6 border-b border-slate-800">
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase mb-2">
                  {PERSONAL_INFO.name}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-300 font-mono">
                  <span className="flex items-center gap-1">
                    <Phone size={12} className="text-indigo-400" /> {PERSONAL_INFO.phoneFormatted}
                  </span>
                  <span>•</span>
                  <button 
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 hover:text-white transition-colors text-indigo-300 underline underline-offset-2"
                  >
                    <Mail size={12} className="text-indigo-400" /> {PERSONAL_INFO.email}
                    {copiedEmail ? <Check size={12} className="text-emerald-400" /> : <Copy size={11} />}
                  </button>
                  <span>•</span>
                  <a 
                    href={PERSONAL_INFO.linkedin} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1 hover:text-white transition-colors text-indigo-300"
                  >
                    <Linkedin size={12} className="text-indigo-400" /> linkedin.com/in/tharuntech
                  </a>
                  <span>•</span>
                  <a 
                    href={PERSONAL_INFO.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1 hover:text-white transition-colors text-indigo-300"
                  >
                    github.com/sTharun5
                  </a>
                </div>
              </div>

              {/* Professional Summary */}
              <section>
                <h2 className="text-xs font-mono font-black uppercase tracking-[0.25em] text-indigo-400 mb-2.5 pb-1 border-b border-indigo-500/20">
                  Professional Summary
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {PERSONAL_INFO.summary}
                </p>
              </section>

              {/* Experience */}
              <section>
                <h2 className="text-xs font-mono font-black uppercase tracking-[0.25em] text-indigo-400 mb-3 pb-1 border-b border-indigo-500/20">
                  Professional Experience
                </h2>
                {EXPERIENCE.map((exp, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="font-bold text-white text-base">
                        {exp.role} <span className="text-indigo-400">|</span> <span className="text-slate-200">{exp.company}</span>
                      </div>
                      <div className="font-mono text-xs text-indigo-300">{exp.period}</div>
                    </div>

                    <ul className="space-y-2 text-slate-300 text-xs sm:text-sm list-disc pl-5">
                      {exp.impactAreas.flatMap(area => area.points).map((point, pIdx) => (
                        <li key={pIdx} className="leading-relaxed">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              {/* Technical Skills */}
              <section>
                <h2 className="text-xs font-mono font-black uppercase tracking-[0.25em] text-indigo-400 mb-2.5 pb-1 border-b border-indigo-500/20">
                  Technical Skills
                </h2>
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <div>
                    <strong className="text-white font-semibold">Data Engineering:</strong>{' '}
                    <span className="text-slate-300">
                      SQL Server, T-SQL, Stored Procedures, Database Views, Data Synchronization, Joins, Indexing, Query Optimization, Data Validation
                    </span>
                  </div>
                  <div>
                    <strong className="text-white font-semibold">Data & Platforms:</strong>{' '}
                    <span className="text-slate-300">Microsoft Fabric, AWS (EC2, S3, RDS MySQL)</span>
                  </div>
                  <div>
                    <strong className="text-white font-semibold">GenAI & Integration:</strong>{' '}
                    <span className="text-slate-300">
                      Model Context Protocol (MCP), AI Agents, GenAI Scenarios, Prompt and Business-Rule Design, RapidOCR, ONNX Runtime
                    </span>
                  </div>
                  <div>
                    <strong className="text-white font-semibold">Programming & Tools:</strong>{' '}
                    <span className="text-slate-300">Python, Java, MySQL, JDBC, React.js, Node.js, Express.js, GitHub</span>
                  </div>
                </div>
              </section>

              {/* Key Projects */}
              <section>
                <h2 className="text-xs font-mono font-black uppercase tracking-[0.25em] text-indigo-400 mb-3 pb-1 border-b border-indigo-500/20">
                  Key Engineering Projects
                </h2>
                <div className="space-y-4">
                  {FEATURED_PROJECTS.map((proj, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <span className="font-bold text-white text-sm">
                          {proj.title}{' '}
                          <span className="font-mono text-xs font-normal text-indigo-400">
                            | {proj.stack.join(', ')}
                          </span>
                        </span>
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-300">
                        {proj.highlights.map((h, hIdx) => (
                          <li key={hIdx}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications & Leadership */}
              <section>
                <h2 className="text-xs font-mono font-black uppercase tracking-[0.25em] text-indigo-400 mb-2.5 pb-1 border-b border-indigo-500/20">
                  Certifications & Leadership
                </h2>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-300">
                  <li>
                    <strong className="text-white">NPTEL Programming in Java</strong> — 97%, Elite + Top 1% among 16,000+ candidates (Jan–Apr 2025, IIT Kharagpur)
                  </li>
                  <li>
                    <strong className="text-white">Java Trainer</strong> — Supported junior students preparing for Oracle Java certifications and coding interviews
                  </li>
                  <li>
                    <strong className="text-white">C Programming Core</strong> — Comprehensive systems programming and memory mastery
                  </li>
                </ul>
              </section>

              {/* Education */}
              <section>
                <h2 className="text-xs font-mono font-black uppercase tracking-[0.25em] text-indigo-400 mb-2.5 pb-1 border-b border-indigo-500/20">
                  Education
                </h2>
                <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <strong className="text-white">B.Tech, Artificial Intelligence and Data Science</strong> — Bannari Amman Institute of Technology, Sathyamangalam
                    </div>
                    <div className="font-mono text-xs text-indigo-300">2022 – 2026 | CGPA: 8.95</div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <strong className="text-white">Class XII (Pre-University)</strong> — Alvas PU College, Mangalore
                    </div>
                    <div className="font-mono text-xs text-indigo-300">2021 – 2022 | 89%</div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <strong className="text-white">Class X (CBSE)</strong> — Rotary Central School, Mangalore
                    </div>
                    <div className="font-mono text-xs text-indigo-300">2019 – 2020 | 80%</div>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
