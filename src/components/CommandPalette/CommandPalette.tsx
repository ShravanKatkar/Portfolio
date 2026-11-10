import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ArrowRight, 
  Code2, 
  User, 
  Layers, 
  Sparkles, 
  GraduationCap, 
  Mail, 
  Github, 
  Linkedin, 
  FileText,
  Award,
  X
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/socials';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'External' | 'Actions';
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigateTo = (hash: string) => {
    onClose();
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commands: CommandItem[] = [
    {
      id: 'nav-home',
      title: 'Navigate to Hero / Home',
      category: 'Navigation',
      shortcut: 'H',
      icon: <Code2 className="h-4 w-4" />,
      action: () => navigateTo('hero'),
    },
    {
      id: 'nav-about',
      title: 'The Philosophy (Kinetic Scroll)',
      category: 'Navigation',
      shortcut: 'A',
      icon: <User className="h-4 w-4" />,
      action: () => navigateTo('about'),
    },
    {
      id: 'nav-projects',
      title: 'Selected Projects & Benchmarks',
      category: 'Navigation',
      shortcut: 'P',
      icon: <Layers className="h-4 w-4" />,
      action: () => navigateTo('projects'),
    },
    {
      id: 'nav-journey',
      title: 'Where I’ve Been (Experience & Milestones)',
      category: 'Navigation',
      shortcut: 'E',
      icon: <GraduationCap className="h-4 w-4" />,
      action: () => navigateTo('experience'),
    },
    {
      id: 'nav-certificates',
      title: 'Verified Credentials & Certifications',
      category: 'Navigation',
      shortcut: 'K',
      icon: <Award className="h-4 w-4" />,
      action: () => navigateTo('certificates'),
    },
    {
      id: 'nav-contact',
      title: 'Initiate Contact & Transmit Message',
      category: 'Navigation',
      shortcut: 'C',
      icon: <Mail className="h-4 w-4" />,
      action: () => navigateTo('contact'),
    },
    {
      id: 'act-github',
      title: 'View Shravan’s GitHub Profile',
      category: 'External',
      icon: <Github className="h-4 w-4" />,
      action: () => {
        window.open(PERSONAL_INFO.github, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'act-linkedin',
      title: 'Connect on LinkedIn',
      category: 'External',
      icon: <Linkedin className="h-4 w-4" />,
      action: () => {
        window.open(PERSONAL_INFO.linkedin, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'act-resume',
      title: 'Download Curriculum Vitae (PDF)',
      category: 'Actions',
      shortcut: 'R',
      icon: <FileText className="h-4 w-4" />,
      action: () => {
        const link = document.createElement('a');
        link.href = PERSONAL_INFO.resumePath;
        link.download = `${PERSONAL_INFO.name.replace(/\s+/g, '_')}_Resume.pdf`;
        link.click();
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] flex items-start justify-center pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[#0D0D0E] shadow-2xl shadow-black/80 text-[#F4F1EA]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <Search className="h-5 w-5 text-[#8E8C86]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or jump to section..."
                className="flex-1 bg-transparent font-mono text-xs outline-none placeholder:text-[#8E8C86]/60 text-white"
                autoFocus
              />
              <button
                onClick={onClose}
                className="rounded p-1 text-[#8E8C86] hover:bg-white/5 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center font-mono text-xs text-[#8E8C86]">
                  No matching commands found.
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredCommands.map((cmd, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-colors ${
                          isSelected ? 'bg-white/10 text-white' : 'text-[#8E8C86] hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={isSelected ? 'text-[#FC6B2F]' : 'text-[#8E8C86]'}>
                            {cmd.icon}
                          </span>
                          <span className="text-xs font-medium tracking-wide">
                            {cmd.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] uppercase text-[#8E8C86]">
                            {cmd.category}
                          </span>
                          {cmd.shortcut && (
                            <span className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-white">
                              {cmd.shortcut}
                            </span>
                          )}
                          <ArrowRight className={`h-3.5 w-3.5 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Micro Footer */}
            <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5 font-mono text-[10px] text-[#8E8C86]">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="text-white/40">SK // COMMAND PALETTE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
