import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";

import { Nav } from "@/components/Nav";
import { getProfile } from "@/lib/content";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anthony Enujeko · Production ML/AI & Agent Engineer",
  description:
    "Portfolio of Anthony Enujeko — ML/AI engineer building production AI systems, MCP servers, and computer vision pipelines. Chat with Khadibia to explore projects and experience.",
  keywords: [
    "Anthony Enujeko",
    "ML Engineer",
    "AI Agents",
    "Model Context Protocol",
    "MCP",
    "Computer Vision",
    "MLOps",
    "PyTorch",
    "smolagents",
  ],
  authors: [{ name: "Anthony Enujeko" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = getProfile();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col relative selection:bg-accent/30 selection:text-white">
        <Nav profile={profile} />
        {children}
      </body>
    </html>
  );
}
