'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles, Github, Linkedin, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const TypingIndicator = () => (
  <div className="flex gap-1.5 px-4 py-3 bg-indigo-50/50 backdrop-blur-sm rounded-2xl rounded-tl-none border border-indigo-100/50 w-fit">
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 1, delay: 0 }}
      className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
    />
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
      className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
    />
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
      className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
    />
  </div>
);

const MessageBubble = ({ msg, index }: { msg: Message; index: number }) => {
  const isAssistant = msg.role === 'assistant';
  
  // Basic markdown-like link detection (simplified for premium UI)
  const renderContent = (content: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return content.split('\n').map((line, i) => (
      <p key={i} className={cn(i > 0 && "mt-2")}>
        {line.split(urlRegex).map((part, j) => {
          if (part.match(urlRegex)) {
            const isGithub = part.includes('github.com');
            const isLinkedin = part.includes('linkedin.com');
            return (
              <a 
                key={j} 
                href={part} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-bold underline decoration-2 underline-offset-4 transition-all"
              >
                {isGithub && <Github size={12} />}
                {isLinkedin && <Linkedin size={12} />}
                {!isGithub && !isLinkedin && <ExternalLink size={12} />}
                Link
              </a>
            );
          }
          return part;
        })}
      </p>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "flex flex-col gap-2 mb-6",
        isAssistant ? "items-start" : "items-end"
      )}
    >
      <div className={cn(
        "flex items-center gap-2 px-2 opacity-40 text-[10px] font-bold uppercase tracking-widest",
        !isAssistant && "flex-row-reverse"
      )}>
        {isAssistant ? <Bot size={12} className="text-indigo-600" /> : <User size={12} />}
        <span>{isAssistant ? 'AntiGravity AI' : 'You'}</span>
      </div>
      
      <div className={cn(
        "max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed shadow-[0_4px_20px_rgba(0,0,0,0.03)] border transition-all duration-300",
        isAssistant 
          ? "bg-white/80 backdrop-blur-md border-indigo-50 text-slate-800 rounded-tl-none hover:shadow-indigo-500/5" 
          : "bg-indigo-600 text-white border-indigo-500 rounded-tr-none shadow-indigo-200"
      )}>
        <div className="font-medium whitespace-pre-wrap">
          {renderContent(msg.content)}
        </div>
      </div>
    </motion.div>
  );
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Greetings. I am **AntiGravity AI**. I'm here to provide architectural insights into Tharun's engineering expertise and project portfolio. How may I assist you today?" }
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
        setMessages(prev => [...prev, { role: 'assistant', content: `Technical interruption: ${data.error}` }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "I encountered an unexpected latency. Please re-initialize the request." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection timeout. Please verify your network stability." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end pointer-events-auto font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 40, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="mb-6 w-[calc(100vw-40px)] sm:w-[420px] h-[600px] max-h-[80vh] flex flex-col rounded-[2.5rem] shadow-[0_32px_84px_rgba(0,0,0,0.18)] border border-white/40 overflow-hidden backdrop-blur-2xl bg-white/90"
          >
            {/* Premium Header */}
            <div className="relative p-7 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-400/20 rounded-full -ml-12 -mb-12 blur-2xl" />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-inner">
                      <Bot size={32} className="text-white drop-shadow-lg" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-4 border-indigo-700 shadow-sm" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg tracking-tight flex items-center gap-2">
                      AntiGravity AI
                      <Sparkles size={14} className="text-indigo-200" />
                    </h3>
                    <p className="text-[10px] opacity-70 uppercase tracking-[0.3em] font-black">Autonomous Assistant</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-2xl transition-all border border-transparent hover:border-white/20 group"
                >
                  <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-grow p-6 overflow-y-auto scroll-smooth custom-scrollbar bg-gradient-to-b from-transparent to-slate-50/30"
            >
              <div className="flex flex-col">
                {messages.map((msg, i) => (
                  <MessageBubble key={i} msg={msg} index={i} />
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <TypingIndicator />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Premium Input */}
            <div className="p-6 pt-2 bg-white/50 backdrop-blur-md">
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Inquire about Tharun's expertise..."
                  className="w-full bg-slate-100/50 border border-slate-200 text-slate-800 px-6 py-4 rounded-[1.5rem] pr-16 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 focus:bg-white transition-all placeholder:text-slate-400 text-sm font-medium shadow-inner"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-2 w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 disabled:opacity-30 disabled:hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-200 active:scale-90"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[9px] text-center mt-4 text-slate-400 font-bold uppercase tracking-widest opacity-60">
                Powered by Groq Llama 3.3
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher */}
      <motion.button
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-18 h-18 rounded-[2rem] flex items-center justify-center shadow-[0_20px_50px_rgba(79,70,229,0.3)] transition-all duration-500 border-2 group relative overflow-hidden",
          isOpen 
            ? "bg-slate-900 text-white border-slate-800 rotate-90" 
            : "bg-indigo-600 text-white border-white ring-8 ring-indigo-500/10"
        )}
        style={{ pointerEvents: 'auto', width: '72px', height: '72px' }}
        aria-label="Toggle AI Assistant"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        {isOpen ? <X size={32} /> : <MessageSquare size={32} className="group-hover:rotate-12 transition-transform" />}
        
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-4 border-indigo-600 animate-bounce" />
        )}
      </motion.button>
    </div>
  );
};
