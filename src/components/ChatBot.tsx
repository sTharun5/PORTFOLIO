'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}


export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm AntiGravity AI (Powered by Groq). Ask me anything about Tharun's projects, skills, or experience!" }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.error("DEBUG: ChatBot successfully mounted on client.");
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

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

        const detailStr = data.details ? ` (${data.details})` : '';
        setMessages(prev => [...prev, { role: 'assistant', content: `API Error: ${data.error}${detailStr}` }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting right now. Please try again later!" }]);
      }



    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Oops! Something went wrong. Check your connection." }]);
    } finally {

      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[9999] flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-6 w-[calc(100vw-40px)] sm:w-[400px] h-[500px] max-h-[70vh] bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col overflow-hidden backdrop-blur-xl bg-white/95"
          >
            {/* Header */}
            <div className="p-6 bg-indigo-600 text-white flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Bot size={28} />
                </div>
                <div>
                  <h3 className="font-black text-sm tracking-tight text-white">AntiGravity AI</h3>
                  <p className="text-[10px] opacity-80 uppercase tracking-[0.2em] font-black text-white">Groq Powered</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors text-white"
                aria-label="Close Chat"
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 scrollbar-hide"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "max-w-[85%] p-5 rounded-[1.5rem] text-sm leading-relaxed shadow-sm",
                    msg.role === 'user' 
                      ? "bg-slate-900 text-white self-end rounded-tr-none" 
                      : "bg-indigo-50 text-indigo-900 self-start rounded-tl-none border border-indigo-100"
                  )}
                >
                  <div className="flex items-center gap-2 mb-2 opacity-50">
                    {msg.role === 'assistant' ? <Bot size={12} /> : <User size={12} />}
                    <span className="text-[9px] font-black uppercase tracking-widest">
                      {msg.role === 'assistant' ? 'Assistant' : 'You'}
                    </span>
                  </div>

                  <div className="font-medium">{msg.content}</div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="bg-indigo-50 text-indigo-900 self-start p-5 rounded-[1.5rem] rounded-tl-none border border-indigo-100 flex items-center gap-3">
                  <Loader2 className="animate-spin text-indigo-600" size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Architecting Response...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-slate-100 bg-white">
              <div className="relative flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-5 pr-14 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all font-medium text-slate-800"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-200"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-500 border-2 animate-pulse",
          isOpen 
            ? "bg-slate-900 text-white border-slate-800 rotate-90" 
            : "bg-indigo-600 text-white border-white shadow-indigo-500/80 ring-4 ring-indigo-500/40"
        )}

        style={{ pointerEvents: 'auto' }}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? <X size={32} strokeWidth={2.5} /> : <MessageSquare size={32} strokeWidth={2.5} />}
      </motion.button>
    </div>
  );
};
