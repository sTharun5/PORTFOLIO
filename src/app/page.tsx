'use client';

import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ExpertiseSection } from '@/components/ExpertiseSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { EducationSection, CredentialsSection } from '@/components/Sections';
import { ContactSection } from '@/components/ContactSection';
import { PERSONAL_INFO } from '@/lib/data';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-6 sm:gap-12">
      {/* Hero Section with Live Simulator & Portrait */}
      <HeroSection />

      {/* Experience Section (Aptean TLX) */}
      <ExperienceSection />

      {/* Expertise & Skills Matrix */}
      <ExpertiseSection />

      {/* Featured Projects */}
      <ProjectsSection />

      {/* Verified Credentials */}
      <CredentialsSection />

      {/* Academic Journey */}
      <EducationSection />

      {/* Direct Contact & Collaboration */}
      <ContactSection />
      
      {/* Elevated Professional Footer */}
      <footer className="py-12 mt-10 border-t border-slate-800/80 text-center flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-all"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-bold text-slate-200 tracking-wide">
            Tharun S • Data Engineering & Enterprise GenAI Systems
          </p>
          <p className="text-xs text-slate-500 font-mono">
            Aptean (TLX) • Bannari Amman Institute of Technology (CGPA 8.95) • {new Date().getFullYear()}
          </p>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-indigo-400 transition-colors pt-2"
        >
          <ArrowUp size={14} /> Back to top
        </button>
      </footer>
    </main>
  );
}
