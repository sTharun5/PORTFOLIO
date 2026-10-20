'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Send, Bot, User, 
  Github, Linkedin, ExternalLink, 
  ArrowUpRight, Zap, GraduationCap,
  Sparkles, CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PERSONAL_INFO } from '@/lib/data';
import { SourceCitation } from '@/lib/rag/types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  citations?: SourceCitation[];
}

const QUICK_PROMPTS = [
  { label: 'Aptean MCP Server', prompt: 'Tell me about the Model Context Protocol (MCP) server Tharun built at Aptean.' },
  { label: 'AI Freight Audit Agent', prompt: 'Explain the architecture of Tharun’s AI Freight Audit Agent project.' },
  { label: 'NPTEL Java (97%)', prompt: 'How did Tharun achieve Top 1% in NPTEL Java at IIT Kharagpur?' },
  { label: 'Enterprise SQL Expertise', prompt: 'What are Tharun’s core enterprise SQL Server and T-SQL capabilities?' }
];

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
  <div className="flex flex-col gap-2 px-5 py-3.5 bg-slate-900/90 backdrop-blur-xl rounded-2xl rounded-tl-none border border-slate-800 w-fit shadow-md">
    <div className="flex items-center gap-2 opacity-60">
      <Bot size={13} className="text-indigo-400 animate-pulse" />
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-300">
        Vortex RAG is retrieving
      </span>
    </div>

    <div className="flex gap-2">
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        className="w-2 h-2 rounded-full bg-indigo-400"
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.2, delay: 0.2, ease: "easeInOut" }}
        className="w-2 h-2 rounded-full bg-sky-400"
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.2, delay: 0.4, ease: "easeInOut" }}
        className="w-2 h-2 rounded-full bg-emerald-400"
      />
    </div>
  </div>
);

const ActionCard = ({ href, type }: { href: string, type: 'github' | 'linkedin' | 'link' | 'cert' }) => {
  const isGithub = type === 'github' || href.includes('github.com');
  const isLinkedin = type === 'linkedin' || href.includes('linkedin.com');
  const isCert = type === 'cert' || href.includes('certificate') || href.includes('pdf') || href.includes('png') || href.includes('nptel') || href.includes('udemy');
  
  return (
    <motion.a
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center justify-between p-3.5 mt-2.5 backdrop-blur-lg border rounded-xl transition-all group no-underline shadow-sm",
        isCert 
          ? "bg-amber-950/30 border-amber-500/30 hover:border-amber-400/60" 
          : "bg-slate-950/80 border-slate-800 hover:border-indigo-500/50"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
          isGithub ? "bg-slate-900 text-white" : isCert ? "bg-amber-500/20 text-amber-400" : "bg-indigo-500/20 text-indigo-400"
        )}>
          {isGithub ? <Github size={17} /> : isLinkedin ? <Linkedin size={17} /> : isCert ? <GraduationCap size={17} /> : <ExternalLink size={17} />}
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 leading-none mb-1">
            {isGithub ? 'Repository' : isLinkedin ? 'LinkedIn' : isCert ? 'Official Credential' : 'Resource'}
          </span>
          <span className="text-xs font-bold text-white">
            {isGithub ? 'GitHub Profile' : isLinkedin ? 'Connect on LinkedIn' : isCert ? 'View Certificate' : 'Open Resource'}
          </span>
        </div>
      </div>
      <ArrowUpRight size={16} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
    </motion.a>
  );
};

const MessageBubble = ({ msg, index }: { msg: Message; index: number }) => {
  const isAssistant = msg.role === 'assistant';
  
  const renderContent = (content: string) => {
    const urlRegex = /(https?:\/\/[^\s\)]+|\/[^\s\)]+\.(?:pdf|png|jpg))/g;
    const segments = content.split('\n');

    return (
      <div className="space-y-3">
        {segments.map((segment, i) => {
          const hasUrl = segment.match(urlRegex);
          if (hasUrl) {
            return (
              <div key={i} className="space-y-2">
                {segment.split(urlRegex).map((part, j) => {
                  const isUrl = part.match(urlRegex);
                  if (isUrl) {
                    const isCert = part.match(/\.(pdf|png|jpg)$/) && (part.includes('nptel') || part.includes('udemy') || part.includes('cert'));
                    return <ActionCard key={j} href={part} type={part.includes('github') ? 'github' : part.includes('linkedin') ? 'linkedin' : isCert ? 'cert' : 'link'} />;
                  }
                  return <span key={j} className="text-slate-300 leading-relaxed">{part}</span>;
                })}
              </div>
            );
          }

          // Handle markdown bold text
          const boldRegex = /\*\*(.*?)\*\*/g;
          const parts = segment.split(boldRegex);
          
          return (
            <p key={i} className="leading-relaxed">
              {parts.map((part, j) => (
                j % 2 === 1 ? <strong key={j} className="text-indigo-300 font-bold">{part}</strong> : part
              ))}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className={cn(
        "flex flex-col gap-2 mb-6 w-full",
        isAssistant ? "items-start" : "items-end"
      )}
    >
      <div className={cn(
        "flex items-center gap-2 px-1 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400",
        !isAssistant && "flex-row-reverse"
      )}>
        <div className={cn(
          "w-5 h-5 rounded-md flex items-center justify-center shadow-sm",
          isAssistant ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-300"
        )}>
          {isAssistant ? <Zap size={11} fill="currentColor" /> : <User size={11} />}
        </div>
        <span>{isAssistant ? 'Vortex Assistant • RAG Grounded' : 'You'}</span>
      </div>
      
      <div className={cn(
        "max-w-[94%] sm:max-w-[85%] p-5 sm:p-6 rounded-2xl text-xs sm:text-sm border shadow-lg leading-relaxed",
        isAssistant 
          ? "bg-slate-900/90 backdrop-blur-xl border-slate-800 text-slate-200 rounded-tl-none" 
          : "bg-indigo-600 text-white border-indigo-500 rounded-tr-none shadow-indigo-600/20"
      )}>
        {renderContent(msg.content)}

        {/* Industrial Grounding Citations */}
        {isAssistant && msg.citations && msg.citations.length > 0 && (
          <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              <Sparkles size={11} className="text-indigo-400" />
              <span>Verified RAG Sources</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {msg.citations.map((cite, cIdx) => {
                const hasLink = Boolean(cite.url);
                return (
                  <a
                    key={cIdx}
                    href={cite.url || '#'}
                    target={hasLink ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!hasLink) e.preventDefault();
                    }}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-mono transition-all no-underline",
                      hasLink
                        ? "bg-indigo-950/40 hover:bg-indigo-900/50 border-indigo-500/20 hover:border-indigo-500/50 text-slate-200 cursor-pointer"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 cursor-default"
                    )}
                  >
                    <CheckCircle2 size={10} className="text-emerald-400 shrink-0" />
                    <span className="truncate max-w-[220px]">{cite.title}</span>
                    {hasLink && <ArrowUpRight size={10} className="text-indigo-400 shrink-0" />}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: `Greetings! I am **Vortex**, the industrial RAG-grounded technical intelligence guide for Tharun S.\n\nTharun is currently working as a **Data Engineering Intern at Aptean (TLX)** and is a B.Tech AI & Data Science scholar with an **8.95 CGPA**. His core expertise includes **T-SQL data synchronization**, **Model Context Protocol (MCP)** agent servers, and **SQL Server performance engineering**.\n\nAsk me anything about his Aptean work, projects, tech stack, or certifications below!` 
    }
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

  const handleSend = async (overridePrompt?: string) => {
    const textToSend = overridePrompt || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: textToSend };
    
    // Add user message and prepare empty assistant streaming message
    setMessages(prev => [
      ...prev, 
      userMsg,
      { role: 'assistant', content: '', citations: [] }
    ]);
    
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.body) {
        throw new Error('Readable stream not supported');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';
      let accumulatedCitations: SourceCitation[] = [];
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const rawJson = trimmed.slice(6).trim();
            if (!rawJson) continue;
            try {
              const event = JSON.parse(rawJson);
              if (event.type === 'citations') {
                accumulatedCitations = event.citations || [];
              } else if (event.type === 'delta') {
                accumulatedContent += event.text;
              }

              // Update the assistant message in real-time
              setMessages(prev => {
                const updated = [...prev];
                const lastIdx = updated.length - 1;
                if (lastIdx >= 0 && updated[lastIdx].role === 'assistant') {
                  updated[lastIdx] = {
                    ...updated[lastIdx],
                    content: accumulatedContent,
                    citations: accumulatedCitations,
                  };
                }
                return updated;
              });
            } catch (err) {
              console.error('Error parsing SSE event:', err);
            }
          }
        }
      }

      // If nothing was streamed, provide a fallback
      if (!accumulatedContent.trim()) {
        setMessages(prev => {
          const updated = [...prev];
          const lastIdx = updated.length - 1;
          if (lastIdx >= 0 && updated[lastIdx].role === 'assistant') {
            updated[lastIdx] = {
              ...updated[lastIdx],
              content: `Tharun S is currently a **Data Engineering Intern at Aptean (TLX)** and holds an **8.95 CGPA** in B.Tech AI & Data Science. You can contact him directly at **${PERSONAL_INFO.email}** or connect via LinkedIn!`,
              citations: accumulatedCitations
            };
          }
          return updated;
        });
      }
    } catch {
      setMessages(prev => {
        const updated = [...prev];
        const lastIdx = updated.length - 1;
        if (lastIdx >= 0 && updated[lastIdx].role === 'assistant') {
          updated[lastIdx] = {
            ...updated[lastIdx],
            content: `Network desynchronization. You can reach Tharun directly at **${PERSONAL_INFO.email}** or call **${PERSONAL_INFO.phoneFormatted}**.`
          };
        }
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="absolute inset-0 flex flex-col pointer-events-auto bg-[#070A11]/90 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="relative p-5 sm:p-7 bg-slate-900/95 border-b border-slate-800 text-white shrink-0">
              <div className="flex items-center justify-between max-w-4xl mx-auto w-full">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative">
                    <VortexLogo className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-400" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-xl tracking-tight flex items-center gap-2">
                      Vortex Intelligence 
                      <span className="text-[10px] font-mono text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded bg-indigo-950/40">
                        RAG Agent
                      </span>
                    </h3>
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      Enterprise Grounded • Aptean, MCP, T-SQL & Projects
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 sm:p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 transition-all"
                  aria-label="Close Chat"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages Content Stream */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto custom-scrollbar p-4 sm:p-8"
            >
              <div className="max-w-3xl mx-auto flex flex-col min-h-full">
                {messages.map((msg, i) => (
                  <MessageBubble key={i} msg={msg} index={i} />
                ))}

                {isLoading && messages[messages.length - 1]?.content === '' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <ThinkingIndicator />
                  </motion.div>
                )}

                {/* Quick Prompts Carousel for Instant Exploration */}
                {messages.length <= 2 && !isLoading && (
                  <div className="mt-4 pt-4 border-t border-slate-800/60">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2.5 block">
                      Recommended Engineering Questions:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {QUICK_PROMPTS.map((qp, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => handleSend(qp.prompt)}
                          className="text-left p-3 rounded-xl bg-slate-900/60 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-500/40 text-xs text-slate-300 hover:text-white transition-all flex items-center justify-between group"
                        >
                          <span className="font-medium truncate">{qp.label}</span>
                          <ArrowUpRight size={14} className="text-slate-500 group-hover:text-indigo-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-4 sm:p-6 bg-slate-900/90 border-t border-slate-800 shrink-0">
              <div className="max-w-3xl mx-auto relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Tharun's Aptean internship, MCP server, or projects..."
                  className="w-full bg-slate-950 border border-slate-700/80 text-white px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl pr-14 focus:outline-none focus:border-indigo-500 text-xs sm:text-sm font-medium placeholder:text-slate-500 shadow-inner"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:hover:bg-indigo-600 text-white transition-all shadow-md"
                  aria-label="Send Message"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 pointer-events-auto">
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_15px_35px_rgba(79,70,229,0.35)] border border-indigo-400/30 transition-all font-mono text-xs font-bold"
            aria-label="Ask AI Assistant"
          >
            <VortexLogo className="w-5 h-5 text-white" glow={false} />
            <span className="hidden sm:inline">Ask AI Assistant</span>
          </motion.button>
        </div>
      )}
    </div>
  );
};
