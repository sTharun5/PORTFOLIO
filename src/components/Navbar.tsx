'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Linkedin } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/data';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <header 
      className={cn(
        "sticky top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled ? "bg-white/80 backdrop-blur-md border-slate-100/50 h-16" : "bg-transparent border-transparent h-20"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div 
          className="flex items-center gap-2 group cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform">
            T
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 lg:block hidden">
            Tharun <span className="text-indigo-600">S</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center justify-center flex-1 gap-10">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-xs font-black tracking-widest uppercase text-slate-400 hover:text-indigo-600 transition-all hover:scale-105"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <a href="https://linkedin.com/in/tharuntech" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="mailto:stharun612@gmail.com" className="px-7 py-3 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white text-sm font-black shadow-lg hover:shadow-indigo-500/20 transition-all hover:-translate-y-1">
            Contact Me
          </a>
        </div>

        <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-3xl absolute w-full left-0 shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-4">
              {NAV_ITEMS.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => scrollToSection(item.id)} 
                  className="text-left w-full px-4 py-3 text-lg font-bold text-slate-700 hover:text-indigo-600"
                >
                  {item.label}
                </button>
              ))}
              <a href="mailto:stharun612@gmail.com" className="mt-4 w-full px-4 py-4 text-center rounded-xl bg-slate-900 text-white text-lg font-bold shadow-md">
                Contact Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
