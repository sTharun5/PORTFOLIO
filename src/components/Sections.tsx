'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Award, 
  MapPin, CheckCircle2, X, Eye 
} from 'lucide-react';
import { TiltCard } from './TiltCard';
import { EDUCATION, CERTIFICATIONS } from '@/lib/data';

export const EducationSection = () => {
  return (
    <motion.section 
      id="education" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-6 py-14"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-10">
        <span className="text-indigo-400 text-xs font-mono uppercase tracking-[0.3em]">
          Academic Pedigree
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Education & Honors
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-1">
          A continuous record of high distinction across Artificial Intelligence, Data Science, and foundational STEM curricula.
        </p>
      </div>

      {/* Timeline Grid */}
      <div className="space-y-6">
        {EDUCATION.map((edu, idx) => (
          <TiltCard 
            key={edu.degree}
            className={`border-slate-800/80 bg-slate-900/60 hover:border-indigo-500/40 transition-all !p-0 shadow-xl ${
              idx === 0 ? 'ring-1 ring-indigo-500/20' : ''
            }`}
            padding="p-7 sm:p-9"
          >
            <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
              
              {/* Institution & Degree Info */}
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                    idx === 0 
                      ? 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-400' 
                      : 'bg-slate-950 border border-slate-800 text-slate-400'
                  }`}>
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {edu.degree}
                      </h3>
                      {idx === 0 && (
                        <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-[10px] font-mono border border-amber-500/20 uppercase tracking-wider font-bold">
                          High Distinction
                        </span>
                      )}
                    </div>
                    <p className="text-indigo-300 text-xs font-mono font-semibold mt-1">
                      {edu.institution}
                    </p>
                    <p className="text-slate-400 text-xs font-mono flex items-center gap-1 mt-0.5">
                      <MapPin size={12} className="text-slate-500" /> {edu.location}
                    </p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="pl-0 sm:pl-16 space-y-1.5 mt-4">
                  {edu.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Score Badges */}
              <div className="flex flex-row lg:flex-col gap-3 items-center justify-center shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800/80">
                <div className="px-6 py-4 bg-gradient-to-br from-indigo-950/80 to-slate-950 border border-indigo-500/30 text-white rounded-2xl text-center shadow-lg min-w-[130px] flex-1 lg:flex-none">
                  <span className="block text-3xl font-black font-mono tracking-tight text-amber-400 mb-0.5">
                    {edu.score}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    {edu.scoreLabel} Score
                  </span>
                </div>

                <div className="px-4 py-2 bg-slate-950/90 border border-slate-800 rounded-xl text-center min-w-[130px] flex-1 lg:flex-none">
                  <span className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                    {edu.period}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    {edu.status}
                  </span>
                </div>
              </div>

            </div>
          </TiltCard>
        ))}
      </div>
    </motion.section>
  );
};

export const CredentialsSection = () => {
  const [activeCertModal, setActiveCertModal] = useState<string | null>(null);

  return (
    <>
      <motion.section 
        id="credentials" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-14"
      >
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-10">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-xs font-mono uppercase tracking-[0.3em]">
              Verified Credentials
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-mono border border-amber-500/20">
              National Honors
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Certifications & Accolades
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-1">
            Nationally proctored computer science examinations and verified software engineering masteries.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CERTIFICATIONS.map((cert) => (
            <TiltCard 
              key={cert.title}
              className="border-slate-800/80 bg-slate-900/60 hover:border-indigo-500/40 transition-all !p-0 h-full flex flex-col justify-between shadow-xl"
              padding="p-7 sm:p-9"
            >
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Award size={24} />
                  </div>

                  <button
                    onClick={() => setActiveCertModal(cert.credentialUrl)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-white text-xs font-mono transition-all"
                    title="View Certificate"
                  >
                    <Eye size={13} className="text-indigo-400" />
                    <span>View Credential</span>
                  </button>
                </div>

                <div className="mb-3">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded font-bold inline-block mb-2">
                    {cert.distinction}
                  </span>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono text-indigo-300 mt-1 font-semibold">
                    {cert.issuer}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {cert.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Period: {cert.period}</span>
                <span className="text-[11px] text-slate-500">ID: {cert.verifyNumber}</span>
              </div>
            </TiltCard>
          ))}
        </div>
      </motion.section>

      {/* Certificate Lightbox Preview Modal */}
      <AnimatePresence>
        {activeCertModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCertModal(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-300">Official Certificate Preview</span>
                <button
                  onClick={() => setActiveCertModal(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 sm:p-6 flex items-center justify-center bg-black/40 max-h-[80vh] overflow-auto">
                <div className="relative w-full aspect-[4/3] max-w-3xl">
                  <Image
                    src={activeCertModal}
                    alt="Verified Certificate"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
