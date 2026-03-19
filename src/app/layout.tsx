import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { AntiGravityBackground } from "@/components/AntiGravityBackground";
import { MagneticCursor } from "@/components/MagneticCursor";
import { ChatBot } from "@/components/ChatBot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tharun S | Portfolio",
  description: "Software Developer | Final Year AI & DS student specialized in robust logic and scalable architectures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-50 text-slate-600 antialiased selection:bg-indigo-100 selection:text-indigo-900`}>
        <MagneticCursor />
        <AntiGravityBackground />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
        </div>
        <ChatBot />
      </body>

    </html>
  );
}
