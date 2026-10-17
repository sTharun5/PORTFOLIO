import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ClientChatBot } from "@/components/ClientChatBot";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"],
});

export const metadata: Metadata = {
  title: "Tharun S | Data Engineering Intern @ Aptean & GenAI Specialist",
  description:
    "Portfolio of Tharun S - Data Engineering Intern at Aptean (TLX) & B.Tech AI & Data Science (CGPA 8.95). Specialized in enterprise T-SQL synchronization, Model Context Protocol (MCP) AI agents, Microsoft Fabric, and high-performance database architectures.",
  keywords: [
    "Tharun S",
    "Data Engineer",
    "Aptean",
    "TLX",
    "GenAI",
    "Model Context Protocol",
    "MCP",
    "SQL Server",
    "T-SQL",
    "Microsoft Fabric",
    "Java",
    "NPTEL Top 1%",
    "Bannari Amman Institute of Technology"
  ],
  authors: [{ name: "Tharun S" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${jakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-[#080C14] text-slate-300 antialiased selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden min-h-screen relative">
        {/* Ambient subtle glow mesh */}
        <div className="fixed top-[-10%] left-[-5%] w-[45vw] h-[45vw] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>
        <div className="fixed bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] bg-sky-600/08 rounded-full blur-[160px] pointer-events-none z-0"></div>
        <div className="fixed top-[40%] right-[25%] w-[35vw] h-[35vw] bg-emerald-600/06 rounded-full blur-[180px] pointer-events-none z-0"></div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
        </div>
        <ClientChatBot />
      </body>
    </html>
  );
}
