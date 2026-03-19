'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

import { GraduationCap, Code2 } from 'lucide-react';
import { TiltCard } from './TiltCard';

export const EducationSection = () => {
  return (
    <motion.section 
      id="education" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mt-12"
    >

      <div className="flex flex-col gap-2 mb-10">
        <span className="text-indigo-600 text-xs font-black uppercase tracking-[0.3em] mb-2">History</span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Academic Journey</h2>
      </div>
      <TiltCard className="border-slate-100 group transition-all duration-700 relative !p-0" padding="p-12" isOverflowHidden={false}>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-50/40 rounded-full blur-[100px] z-0 group-hover:bg-indigo-100/40 transition-colors"></div>
        <div className="flex flex-col md:flex-row gap-12 md:items-center justify-between relative z-10 w-full text-left">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform">
                <Code2 size={24} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter">B.Tech Artificial Intelligence & Data Science</h3>
            </div>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Bannari Amman Institute of Technology</p>
            <p className="text-slate-500 font-medium leading-relaxed text-lg max-w-3xl">
              Active candidate in <span className="text-slate-900 font-bold underline decoration-indigo-200 decoration-4">Semester 8 (Final Year)</span>. 
              Focused on high-performance algorithmic logic, scalable data architectures, and efficient backend systems.
            </p>
          </div>
          <div className="px-10 py-8 bg-white rounded-[2rem] text-center shrink-0 shadow-2xl shadow-indigo-100/50 border border-slate-50 group-hover:-translate-y-2 transition-transform duration-500">
            <span className="block text-5xl font-black text-slate-900 tracking-tighter mb-1">2026</span>
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Expected Graduation</span>
          </div>
        </div>
      </TiltCard>
    </motion.section>
  );
};

export const CredentialsSection = ({ certs }: { certs: any[] }) => {
  return (
    <motion.section 
      id="credentials" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mt-12 mb-10"
    >

      <div className="flex flex-col gap-2 mb-10">
        <span className="text-rose-600 text-xs font-black uppercase tracking-[0.3em] mb-2">Verified</span>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Official Credentials</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {certs.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <TiltCard 
              className="border-slate-100 group hover:border-rose-100 transition-all duration-500 !p-0 h-full"
              padding="p-10"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-500">
                  <GraduationCap size={24} />
                </div>
                <a 
                  href={cert.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-rose-500 transition-colors"
                  aria-label={`View ${cert.title} certificate`}
                >
                  <Code2 size={18} />
                </a>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tighter group-hover:text-rose-600 transition-colors">{cert.title}</h3>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{cert.issuer}</p>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
