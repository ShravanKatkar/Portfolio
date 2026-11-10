import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  FileDown, 
  Terminal, 
  Menu, 
  X,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/socials';

interface NavbarProps {
  activeSection: string;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onOpenCommandPalette }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'Philosophy', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Certificates', href: '#certificates', id: 'certificates' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 md:px-14 py-5 pointer-events-none">
        {/* Left Monogram / Branding */}
        <a
          href="#hero"
          className="pointer-events-auto group flex items-center gap-3 text-white"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] font-display text-xs font-bold tracking-tight backdrop-blur-md transition-all group-hover:border-[#FC6B2F] group-hover:bg-[#FC6B2F] group-hover:text-white">
            SK
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-mono text-xs font-semibold tracking-wider text-white group-hover:text-[#FC6B2F] transition-colors">
              SHRAVAN KATKAR
            </span>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FC6B2F] animate-pulse" />
              <span className="font-mono text-[9px] tracking-widest text-[#B5B5B5]">
                AI ENGINEER
              </span>
            </div>
          </div>
        </a>

        {/* Center Pill Desktop Navigation */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-[#09090b]/80 px-4 py-1.5 backdrop-blur-xl shadow-2xl shadow-black/80">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative px-4 py-1.5 font-mono text-[11px] tracking-widest uppercase transition-all duration-200 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#8E8C86] hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full border border-[#FC6B2F]/60 bg-[#FC6B2F]/15 shadow-[0_0_12px_rgba(252,107,47,0.3)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-3">
          {/* Command Palette trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs text-[#8E8C86] backdrop-blur-md transition-all hover:border-[#FC6B2F] hover:bg-white/10 hover:text-white"
            title="Command Palette (Cmd+K / Ctrl+K)"
          >
            <Terminal className="h-3.5 w-3.5 text-[#FC6B2F]" />
            <span className="hidden lg:inline text-[11px] font-mono tracking-wider">⌘K</span>
          </button>

          {/* GitHub shortcut */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#8E8C86] backdrop-blur-md transition-all hover:border-[#FC6B2F] hover:text-white"
          >
            <Github className="h-4 w-4" />
          </a>

          {/* LinkedIn shortcut */}
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#8E8C86] backdrop-blur-md transition-all hover:border-[#FC6B2F] hover:text-white"
          >
            <Linkedin className="h-4 w-4" />
          </a>

          {/* Resume Download Button */}
          <a
            href={PERSONAL_INFO.resumePath}
            download="Shravan_Katkar_Resume.pdf"
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#FC6B2F]/60 bg-[#FC6B2F]/10 px-4 py-1.5 font-mono text-[11px] font-semibold tracking-wider text-[#EAE6E1] transition-all hover:bg-[#FC6B2F] hover:text-white shadow-lg shadow-[#FC6B2F]/15"
          >
            <FileDown className="h-3.5 w-3.5 text-[#FC6B2F] group-hover:text-white" />
            <span>RESUME</span>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white backdrop-blur-md"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#09090b]/98 px-6 pt-28 pb-8 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-4 font-mono text-[10px] tracking-widest text-[#FC6B2F]">
                <span className="h-2 w-2 rounded-full bg-[#FC6B2F] animate-pulse" />
                AVAILABLE FOR OPPORTUNITIES
              </div>

              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`flex items-center justify-between border-b border-white/5 py-4 text-xl font-display uppercase tracking-wider ${
                      isActive ? 'text-[#FC6B2F] font-bold' : 'text-[#8E8C86]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-[#8E8C86]">0{index + 1}</span>
                  </motion.a>
                );
              })}
            </div>

            {/* Mobile Footer Links */}
            <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between font-mono text-xs text-[#8E8C86]">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <Github className="h-4 w-4" /> GitHub <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <a
                href={PERSONAL_INFO.resumePath}
                download="Shravan_Katkar_Resume.pdf"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FC6B2F] py-3.5 font-mono text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-[#FC6B2F]/20"
              >
                <FileDown className="h-4 w-4" />
                Download Curriculum Vitae (PDF)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
