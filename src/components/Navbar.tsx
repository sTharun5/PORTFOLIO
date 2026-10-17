'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Linkedin, Github, Mail, FileText } from 'lucide-react';
import { NAV_ITEMS, PERSONAL_INFO } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ResumeModal } from './ResumeModal';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={cn(
          "sticky top-0 w-full z-50 transition-all duration-300 border-b",
          scrolled 
            ? "bg-[#080C14]/85 backdrop-blur-xl border-slate-800/80 h-16 shadow-[0_10px_30px_rgba(0,0,0,0.6)]" 
            : "bg-transparent border-transparent h-20"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          
          {/* Brand Logo & Status */}
          <div 
            className="flex items-center gap-3 group cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600/30 to-sky-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-mono font-bold text-base shadow-[0_0_20px_rgba(99,102,241,0.25)] group-hover:scale-105 group-hover:border-indigo-400 transition-all">
              TS
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                {PERSONAL_INFO.name}
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase leading-none">
                Data Engineer @ Aptean
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center justify-center gap-7">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-xs font-mono tracking-widest uppercase text-slate-400 hover:text-white transition-all hover:scale-105 relative group py-1"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setResumeOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-indigo-500/50 hover:bg-slate-800 text-slate-200 text-xs font-mono transition-all hover:-translate-y-0.5"
            >
              <FileText size={14} className="text-indigo-400" />
              <span>Resume</span>
            </button>

            <a 
              href={PERSONAL_INFO.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
              aria-label="GitHub Profile"
            >
              <Github size={17} />
            </a>
            
            <a 
              href={PERSONAL_INFO.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-all"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={17} />
            </a>

            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5"
            >
              <Mail size={14} /> Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setResumeOpen(true)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 text-xs font-mono flex items-center gap-1"
            >
              <FileText size={15} />
            </button>
            <button 
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden border-t border-slate-800 bg-[#080C14]/95 backdrop-blur-2xl absolute w-full left-0 shadow-2xl"
            >
              <div className="flex flex-col p-6 gap-3">
                {NAV_ITEMS.map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => scrollToSection(item.id)} 
                    className="text-left w-full px-4 py-2.5 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-900/80 transition-colors font-mono"
                  >
                    {item.label}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setResumeOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-900 border border-indigo-500/30 text-indigo-300 font-mono text-sm"
                >
                  <FileText size={16} /> View & Print Official Resume
                </button>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <a 
                    href={PERSONAL_INFO.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 py-2.5 flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs"
                  >
                    <Github size={15} /> GitHub
                  </a>
                  <a 
                    href={PERSONAL_INFO.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 py-2.5 flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs"
                  >
                    <Linkedin size={15} /> LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Interactive Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
};
