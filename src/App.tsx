import React, { useState } from 'react';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useActiveSection } from './hooks/useActiveSection';
import { useLenis } from './hooks/useLenis';
import { Preloader } from './components/Preloader/Preloader';
import { CustomCursor } from './components/CustomCursor/CustomCursor';
import { CommandPalette } from './components/CommandPalette/CommandPalette';
import { DeveloperTerminal } from './components/Terminal/DeveloperTerminal';
import { Navbar } from './components/Navigation/Navbar';
import { Hero } from './components/Hero/Hero';
import { Introduction } from './components/Introduction/Introduction';
import { Projects } from './components/Projects/Projects';
import { Experience } from './components/Experience/Experience';
import { Contact } from './components/Contact/Contact';

export const App: React.FC = () => {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Initialize Lenis smooth scroll synced with GSAP
  useLenis();

  const sectionIds = [
    'hero',
    'about',
    'projects',
    'experience',
    'contact'
  ];

  const activeSection = useActiveSection(sectionIds);
  const scrollProgress = useScrollProgress();

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#F4F1EA] font-sans selection:bg-[#FC6B2F]/30 selection:text-white">
      {/* Subtle Analog Film Grain Texture Overlay */}
      <div className="film-grain" />

      {/* Jishnu-style Monolithic Loading Screen */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Custom Precision Cursor */}
      <CustomCursor />

      {/* Keyboard Accessible Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* Interactive Developer Terminal / AI Shell */}
      <DeveloperTerminal />

      {/* Jishnu Mondal Signature Top Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[9998] h-[2px] pointer-events-none origin-left"
        style={{
          background: 'linear-gradient(90deg, #FC6B2F, #FF8544)',
          transform: `scaleX(${scrollProgress})`,
          transformOrigin: '0 50%',
          boxShadow: '0 0 10px rgba(252,107,47,0.6)',
        }}
      />

      {/* Main Navigation */}
      <Navbar
        activeSection={activeSection}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Primary Editorial Sections */}
      <main className="relative flex flex-col w-full">
        {/* 01. Hero with Dust Particles and Monolithic Typography */}
        <Hero />

        {/* 02. The Philosophy with ScrollExpandMedia */}
        <Introduction />

        {/* 03. Selected Projects with 2D Laptop Showcase */}
        <Projects />

        {/* 04. Where I've Been (Experience & Milestones) */}
        <Experience />

        {/* 05. Contact & Editorial Footer */}
        <Contact />
      </main>
    </div>
  );
};

export default App;
