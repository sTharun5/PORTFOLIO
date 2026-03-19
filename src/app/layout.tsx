import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

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
      <body className={`${inter.className} bg-slate-50 text-slate-600 antialiased selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden`}>
        {/* Ambient glowing nebulas (Restored from Legacy) */}
        <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-100/30 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-sky-100/30 rounded-full blur-[120px] pointer-events-none z-0"></div>
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
