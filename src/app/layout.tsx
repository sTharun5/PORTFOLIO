import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { AntiGravityBackground } from "@/components/AntiGravityBackground";

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
      <body className={`${inter.className} bg-slate-50 text-slate-600 antialiased`}>
        <AntiGravityBackground />
        <div className="relative z-10">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
