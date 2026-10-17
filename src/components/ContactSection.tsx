'use client';

import React, { useState } from 'react';
import { 
  Mail, Phone, Linkedin, Github, Send, Copy, 
  Check, ArrowUpRight, MessageSquare, MapPin 
} from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/data';
import { TiltCard } from './TiltCard';

export const ContactSection = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      subject || 'Discussion: Engineering Opportunity'
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-16 sm:py-24 max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-12 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <span className="text-indigo-400 text-xs font-mono uppercase tracking-[0.3em]">
            Direct Channel
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase tracking-wider border border-emerald-500/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Open for Opportunities
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Let’s Build High-Scale Systems
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-1">
          Have an opportunity in Data Engineering, Enterprise Database Pipelines, or Autonomous GenAI Systems? Reach out directly via email, phone, or LinkedIn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Methods Column */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Email Card with 1-click Copy */}
          <TiltCard
            className="border-slate-800/80 bg-slate-900/60 hover:border-indigo-500/40 transition-all !p-0"
            padding="p-6 sm:p-7"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-white font-bold text-sm sm:text-base hover:text-indigo-400 transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all text-xs flex items-center gap-1.5"
                title="Copy Email"
              >
                {copiedEmail ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-[11px] font-mono text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span className="text-[11px] font-mono hidden sm:inline">Copy</span>
                  </>
                )}
              </button>
            </div>
          </TiltCard>

          {/* Phone Card with 1-click Copy */}
          <TiltCard
            className="border-slate-800/80 bg-slate-900/60 hover:border-indigo-500/40 transition-all !p-0"
            padding="p-6 sm:p-7"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Direct Phone / WhatsApp
                  </span>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-white font-bold text-sm sm:text-base hover:text-sky-400 transition-colors font-mono"
                  >
                    {PERSONAL_INFO.phoneFormatted}
                  </a>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:border-sky-500/30 transition-all text-xs flex items-center gap-1.5"
                title="Copy Phone"
              >
                {copiedPhone ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-[11px] font-mono text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span className="text-[11px] font-mono hidden sm:inline">Copy</span>
                  </>
                )}
              </button>
            </div>
          </TiltCard>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-4">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Linkedin size={20} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-white">LinkedIn</span>
              </div>
              <ArrowUpRight size={16} className="text-slate-500 group-hover:text-white transition-colors" />
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Github size={20} className="text-slate-300 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-white">GitHub</span>
              </div>
              <ArrowUpRight size={16} className="text-slate-500 group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Location Badge */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/70 flex items-center gap-3 text-xs text-slate-400 font-mono">
            <MapPin size={16} className="text-indigo-400 shrink-0" />
            <span>Bangalore / Tamil Nadu, India • Open to Relocation</span>
          </div>
        </div>

        {/* Quick Message Composer Form */}
        <div className="lg:col-span-7">
          <TiltCard
            className="border-slate-800/80 bg-slate-900/60 !p-0 shadow-xl"
            padding="p-8 sm:p-10"
          >
            <div className="flex items-center gap-2 mb-6 text-xs font-mono uppercase tracking-widest text-indigo-400">
              <MessageSquare size={16} /> Quick Message Dispatch
            </div>

            <form onSubmit={handleSendEmail} className="space-y-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Data Engineering Role / Aptean Project Discussion"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  Message Details
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi Tharun, I came across your portfolio and would like to discuss..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-all resize-none"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <span className="text-xs text-slate-400 font-mono">
                  Directly prepares an email addressed to {PERSONAL_INFO.email}
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all hover:-translate-y-0.5"
                >
                  <Send size={16} /> Send Email
                </button>
              </div>
            </form>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};
