'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, X, Send, Bot, User, 
  Sparkles, Github, Linkedin, ExternalLink, 
  ArrowUpRight, Command, Zap, GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const VortexLogo = ({ className, glow = true }: { className?: string, glow?: boolean }) => (
  <div className={cn("relative flex items-center justify-center", className)}>
    {glow && (
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-indigo-500 rounded-full blur-xl"
      />
    )}
    <svg viewBox="0 0 100 100" className="w-full h-full relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M25 30 L50 75 L75 30"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.circle 
        cx="50" cy="75" r="6" 
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
    </svg>
  </div>
);

const ThinkingIndicator = () => (
  <div className="flex flex-col gap-2 px-6 py-4 bg-white/40 backdrop-blur-xl rounded-[2rem] rounded-tl-none border border-white/60 w-fit shadow-sm">
    <div className="flex items-center gap-2 mb-2 opacity-40">
      <Bot size={12} className="animate-pulse" />
      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Vortex is synchronizing</span>
    </div>

    <div className="flex gap-2">
      <motion.div
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.3, 1, 0.3],
          backgroundColor: ["#6366f1", "#a855f7", "#6366f1"]
        }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="w-2 h-2 rounded-full"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.3, 1, 0.3],
          backgroundColor: ["#a855f7", "#ec4899", "#a855f7"]
        }}
        transition={{ repeat: Infinity, duration: 1.5, delay: 0.2, ease: "easeInOut" }}
        className="w-2 h-2 rounded-full"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.3, 1, 0.3],
          backgroundColor: ["#ec4899", "#6366f1", "#ec4899"]
        }}
        transition={{ repeat: Infinity, duration: 1.5, delay: 0.4, ease: "easeInOut" }}
        className="w-2 h-2 rounded-full"
      />
    </div>
  </div>
);

const ActionCard = ({ href, type }: { href: string, type: 'github' | 'linkedin' | 'link' }) => {
  const isGithub = type === 'github' || href.includes('github.com');
  const isLinkedin = type === 'linkedin' || href.includes('linkedin.com');
  const isCert = href.includes('certificate') || href.includes('pdf') || href.includes('nptel');
  
  return (
    <motion.a
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-4 mt-3 bg-white/60 backdrop-blur-lg border border-white/80 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-indigo-500/10 hover:border-indigo-200 transition-all group no-underline"
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
          isGithub ? "bg-slate-900 text-white" : isCert ? "bg-rose-100 text-rose-600" : "bg-indigo-100 text-indigo-600"
        )}>
          {isGithub ? <Github size={20} /> : isLinkedin ? <Linkedin size={20} /> : isCert ? <GraduationCap size={20} /> : <ExternalLink size={20} />}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-40 leading-none mb-1">
            {isGithub ? 'Repository' : isLinkedin ? 'Connect' : isCert ? 'Official Credential' : 'Resource'}
          </span>
          <span className="text-sm font-bold text-slate-800">
            {isGithub ? 'GitHub Profile' : isLinkedin ? 'LinkedIn' : isCert ? 'View Certificate' : 'View Project'}
          </span>
        </div>
      </div>
      <ArrowUpRight size={18} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
    </motion.a>
  );
};

const MessageBubble = ({ msg, index }: { msg: Message; index: number }) => {
  const isAssistant = msg.role === 'assistant';
  
  const renderContent = (content: string) => {
    const urlRegex = /(https?:\/\/[^\s\)]+)/g;
    const segments = content.split('\n');

    return (
      <div className="space-y-4">
        {segments.map((segment, i) => {
          const hasUrl = segment.match(urlRegex);
          if (hasUrl) {
            return (
              <div key={i} className="space-y-2">
                {segment.split(urlRegex).map((part, j) => (
                  part.match(urlRegex) ? (
                    <ActionCard key={j} href={part} type={part.includes('github') ? 'github' : part.includes('linkedin') ? 'linkedin' : 'link'} />
                  ) : (
                    <span key={j} className="font-medium text-slate-700 leading-relaxed italic">{part}</span>
                  )
                ))}
              </div>
            );
          }

          // Handle bold text (simplified)
          const boldRegex = /\*\*(.*?)\*\*/g;
          const parts = segment.split(boldRegex);
          
          return (
            <p key={i} className="leading-relaxed">
              {parts.map((part, j) => (
                j % 2 === 1 ? <strong key={j} className="text-indigo-600 font-black">{part}</strong> : part
              ))}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className={cn(
        "flex flex-col gap-3 mb-8 w-full",
        isAssistant ? "items-start" : "items-end"
      )}
    >
      <div className={cn(
        "flex items-center gap-2.5 px-2 opacity-50 text-[10px] font-black uppercase tracking-[0.2em]",
        !isAssistant && "flex-row-reverse"
      )}>
        <div className={cn(
          "w-5 h-5 rounded-md flex items-center justify-center shadow-sm",
          isAssistant ? "bg-indigo-600 text-white" : "bg-slate-900 text-white"
        )}>
          {isAssistant ? <Zap size={10} fill="currentColor" /> : <User size={10} />}
        </div>
        <span>{isAssistant ? 'Vortex Intelligence' : 'Visitor Context'}</span>

      </div>
      
      <div className={cn(
        "max-w-[92%] sm:max-w-[85%] p-6 rounded-[2.2rem] text-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] border transition-all duration-500",
        isAssistant 
          ? "bg-white/70 backdrop-blur-2xl border-white/80 text-slate-800 rounded-tl-none ring-1 ring-black/[0.02]" 
          : "bg-slate-900 text-white border-slate-800 rounded-tr-none shadow-xl shadow-slate-200"
      )}>
        {renderContent(msg.content)}
      </div>
    </motion.div>
  );
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Greetings. I am **Vortex**, your technical guide to Tharun's engineering landscape. From **Core Java** to **AI-driven Automation**, I'm here to provide deep insights into his expertise. \n\nHow can I help you navigate his work today?" }

  ]);

  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      const data = await response.json();
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      } else if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: `Protocol Interruption: **${data.error}**` }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "Anomalous response detected. Please re-verify the input sequence." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Network desynchronization. Please check your Uplink status." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="absolute inset-0 flex flex-col pointer-events-auto bg-white/85 backdrop-blur-3xl"
          >
            {/* Ultra Premium Full-Screen Header */}
            <div className="relative p-6 sm:p-10 bg-slate-900 text-white overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full -mr-48 -mt-48 blur-[100px] animate-pulse" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full -ml-32 -mb-32 blur-[80px]" />
              
              <div className="relative flex items-center justify-between max-w-5xl mx-auto w-full">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="relative">
                    <VortexLogo className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-400" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-indigo-500 rounded-full border-2 sm:border-4 border-slate-900 shadow-lg z-20" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg sm:text-2xl tracking-tight flex items-center gap-2">
                      Vortex 
                      <Sparkles size={16} className="text-indigo-400 animate-pulse" />
                    </h3>
                    <p className="text-[8px] sm:text-[10px] opacity-50 uppercase tracking-[0.4em] font-black">Technical Strategist</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center hover:bg-white/10 rounded-xl sm:rounded-2xl transition-all border border-transparent hover:border-white/10 group"
                >
                  <X size={24} className="sm:size-32 group-hover:rotate-90 transition-transform duration-500" />
                </button>
              </div>
            </div>

            {/* Optimized Content Pipeline */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto scroll-smooth custom-scrollbar bg-gradient-to-b from-transparent to-slate-100/20"
            >
              <div className="max-w-4xl mx-auto px-4 sm:px-10 py-10 flex flex-col min-h-full">
                {messages.map((msg, i) => (
                  <MessageBubble key={i} msg={msg} index={i} />
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring' }}
                    className="mb-8"
                  >
                    <ThinkingIndicator />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Neural Input Interface - Anchored to Bottom */}
            <div className="p-4 sm:p-10 bg-white/60 backdrop-blur-2xl border-t border-slate-100 shrink-0">
              <div className="max-w-4xl mx-auto relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Vortex about Tharun's Core Java skills..."
                  className="w-full bg-white border-2 border-slate-100 text-slate-800 px-6 sm:px-10 py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2.5rem] pr-16 sm:pr-24 focus:outline-none focus:ring-[12px] focus:ring-indigo-500/5 focus:border-indigo-500 transition-all placeholder:text-slate-300 text-sm sm:text-lg font-bold shadow-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2.5 sm:right-3 top-2.5 sm:top-3 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 disabled:opacity-20 disabled:grayscale transition-all shadow-xl shadow-indigo-600/30"
                >
                  <Send size={20} className="sm:size-24" />
                </motion.button>
              </div>
              <div className="flex items-center justify-center gap-3 mt-4 sm:mt-8 opacity-20">
                <div className="h-[1px] flex-grow bg-slate-400" />
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em]">Vortex v2.0 - Full Frame Neural</span>
                <div className="h-[1px] flex-grow bg-slate-400" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dimensional Launcher - Positioned bottom right */}
      {!isOpen && (
        <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 pointer-events-auto">
          <motion.button
            whileHover={{ scale: 1.05, rotate: 5, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[2.2rem] flex items-center justify-center shadow-[0_25px_60px_rgba(79,70,229,0.4)] transition-all duration-700 border-2 group relative overflow-hidden backdrop-blur-xl",
              "bg-indigo-600 text-white border-white/20 ring-12 ring-indigo-500/5 px-0"
            )}
            aria-label="Toggle AI Vortex"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.2s] ease-in-out" />
            <VortexLogo className="w-8 h-8 sm:w-10 sm:h-10 text-white" glow={false} />
            
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-indigo-400 rounded-full border-2 sm:border-4 border-indigo-600 z-10 flex items-center justify-center"
            >
               <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </motion.div>
          </motion.button>
        </div>
      )}
    </div>
  );
};

