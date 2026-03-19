'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, X, Send, Bot, User, 
  Sparkles, Github, Linkedin, ExternalLink, 
  ArrowUpRight, Command, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

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
          isGithub ? "bg-slate-900 text-white" : "bg-indigo-100 text-indigo-600"
        )}>
          {isGithub ? <Github size={20} /> : isLinkedin ? <Linkedin size={20} /> : <ExternalLink size={20} />}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-40 leading-none mb-1">
            {isGithub ? 'Repository' : isLinkedin ? 'Connect' : 'Resource'}
          </span>
          <span className="text-sm font-bold text-slate-800">
            {isGithub ? 'GitHub Profile' : isLinkedin ? 'LinkedIn' : 'View Project'}
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
    const urlRegex = /(https?:\/\/[^\s]+)/g;
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
    { role: 'assistant', content: "Greetings. I am **Vortex**, your technical guide to Tharun's engineering landscape. From **Java Architecture** to **AI-driven Automation**, I'm here to provide deep insights into his expertise. \n\nHow can I help you navigate his work today?" }
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
    <div className="fixed bottom-10 right-10 z-[9999] flex flex-col items-end pointer-events-auto font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30, filter: 'blur(15px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, y: 30, filter: 'blur(15px)' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="mb-6 w-[calc(100vw-40px)] sm:w-[440px] h-[650px] max-h-[85vh] flex flex-col rounded-[2.8rem] shadow-[0_40px_100px_rgba(0,0,0,0.2)] border border-white/60 overflow-hidden backdrop-blur-3xl bg-white/85"
          >
            {/* Ultra Premium Header */}
            <div className="relative p-8 bg-slate-900 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/10 rounded-full -ml-24 -mb-24 blur-3xl" />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <motion.div 
                      animate={{ border: ['1px solid rgba(255,255,255,0.1)', '1px solid rgba(99,102,241,0.5)', '1px solid rgba(255,255,255,0.1)'] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center backdrop-blur-2xl border border-white/10 shadow-2xl relative z-10"
                    >
                      <Command size={32} className="text-white drop-shadow-glow" />
                    </motion.div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-indigo-500 rounded-full border-4 border-slate-900 shadow-lg z-20 flex items-center justify-center overflow-hidden">
                      <motion.div 
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-full h-full bg-white/50"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-xl tracking-tight flex items-center gap-2">
                      Vortex 
                      <Sparkles size={16} className="text-indigo-400 animate-pulse" />
                    </h3>

                    <p className="text-[10px] opacity-50 uppercase tracking-[0.4em] font-black">Neural Architecture</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-[1.2rem] transition-all border border-transparent hover:border-white/10 group"
                >
                  <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>
              </div>
            </div>

            {/* Content Pipeline */}
            <div 
              ref={scrollRef}
              className="flex-grow p-8 overflow-y-auto scroll-smooth custom-scrollbar bg-gradient-to-b from-transparent to-slate-100/20"
            >
              <div className="flex flex-col">
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

            {/* Neural Input Interface */}
            <div className="p-8 pb-10 pt-2 bg-white/60 backdrop-blur-2xl">
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Vortex about Tharun..."

                  className="w-full bg-white border-2 border-slate-100 text-slate-800 px-8 py-5 rounded-[2rem] pr-20 focus:outline-none focus:ring-[12px] focus:ring-indigo-500/5 focus:border-indigo-500 focus:bg-white transition-all placeholder:text-slate-300 text-sm font-bold shadow-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-3 top-3 w-12 h-12 rounded-[1.2rem] bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 disabled:opacity-20 disabled:grayscale transition-all shadow-xl shadow-indigo-600/30"
                >
                  <Send size={20} />
                </motion.button>
              </div>
              <div className="flex items-center justify-center gap-3 mt-6 opacity-30">
                <div className="h-[1px] flex-grow bg-slate-400/30" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em]">Synapse V1.0 - Groq Neural</span>
                <div className="h-[1px] flex-grow bg-slate-400/30" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dimensional Launcher */}
      <motion.button
        whileHover={{ scale: 1.05, rotate: 5, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-20 h-20 rounded-[2.2rem] flex items-center justify-center shadow-[0_25px_60px_rgba(79,70,229,0.4)] transition-all duration-700 border-2 group relative overflow-hidden backdrop-blur-xl",
          isOpen 
            ? "bg-slate-900 text-white border-slate-700 rotate-90" 
            : "bg-indigo-600 text-white border-white/20 ring-12 ring-indigo-500/5"
        )}
        style={{ pointerEvents: 'auto' }}
        aria-label="Toggle AI Synapse"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.2s] ease-in-out" />
        {isOpen ? <X size={40} /> : <Command size={40} className="group-hover:scale-110 transition-transform duration-500" />}
        
        {!isOpen && (
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-indigo-400 rounded-full border-4 border-indigo-600 z-10 flex items-center justify-center"
          >
             <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};
