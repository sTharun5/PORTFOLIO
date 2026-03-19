'use client';

import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { ExpertiseSection } from '@/components/ExpertiseSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { EducationSection, CredentialsSection } from '@/components/Sections';
import { CERTS } from '@/lib/data';

export default function Home() {
  return (
    <main className="relative z-10 max-w-7xl mx-auto px-6 py-4 lg:py-8 flex flex-col gap-20">
      {/* Scroll-based layout reveals handled in individual sections */}
      
      {/* Hero Section */}
      <HeroSection />

      {/* Expertise Section */}
      <ExpertiseSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Education Section */}
      <EducationSection />

      {/* Credentials Section */}
      <CredentialsSection certs={CERTS} />
      
      {/* Footer / Final Note */}
      <footer className="py-12 text-center border-t border-slate-100/50">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Designed with Precision & Performance | 2026
        </p>
      </footer>
    </main>
  );
}
