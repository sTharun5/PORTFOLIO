'use client';

import dynamic from 'next/dynamic';

const ChatBotInner = dynamic(() => import('./ChatBot').then((mod) => mod.ChatBot), {
  ssr: false,
});

export const ClientChatBot = () => {
  return <ChatBotInner />;
};
