import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  Github, 
  ArrowUpRight, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  Sparkles, 
  Activity 
} from 'lucide-react';
import { Project } from '../../data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window with Liquid Glass Styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/25 bg-gradient-to-br from-white/[0.09] via-[#14141a]/95 to-[#09090d]/98 backdrop-blur-3xl p-6 sm:p-10 text-[#F4F1EA] shadow-[0_30px_70px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.25)] group"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Liquid Glass Highlight Sheen */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/[0.02] pointer-events-none" />

          {/* Corner reticles */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#FC6B2F] pointer-events-none" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#FC6B2F] pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#FC6B2F] pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#FC6B2F] pointer-events-none" />
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-editorial-accent">
                PROJECT {project.number}
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] tracking-widest uppercase text-editorial-subtle">
                {project.badge}
              </span>
              <span className="hidden sm:inline font-mono text-xs text-editorial-muted">
                {project.period}
              </span>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg border border-white/10 p-2 text-editorial-subtle transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Title & Tagline */}
          <div className="mt-6 space-y-2">
            <h2 className="font-syne text-2xl sm:text-4xl font-extrabold tracking-tight text-editorial-white">
              {project.title}
            </h2>
            <p className="font-sans text-base sm:text-lg text-editorial-accent">
              {project.tagline}
            </p>
          </div>

          {/* Action Links Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-3 border-b border-white/10 pb-6">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs font-medium text-editorial-white transition-all hover:border-white/40 hover:bg-white/10"
            >
              <Github className="h-4 w-4" />
              <span>SOURCE CODE</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-editorial-accent px-4 py-2 font-mono text-xs font-semibold text-black transition-all hover:bg-white"
              >
                <span>OPEN LIVE DEPLOYMENT</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}

            {project.liveNote && (
              <span className="font-mono text-[11px] text-editorial-muted">
                ({project.liveNote})
              </span>
            )}
          </div>

          {/* Problem vs. Solution Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-red-500/20 bg-red-500/[0.02] p-5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-red-400">
                THE PROBLEM
              </span>
              <p className="mt-2.5 font-sans text-xs sm:text-sm leading-relaxed text-editorial-subtle">
                {project.problem}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.02] p-5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                ENGINEERING SOLUTION
              </span>
              <p className="mt-2.5 font-sans text-xs sm:text-sm leading-relaxed text-editorial-subtle">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture / Dataflow Workflow */}
          <div className="mt-8">
            <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-editorial-subtle uppercase mb-4">
              <Layers className="h-4 w-4 text-editorial-accent" />
              <span>SYSTEM ARCHITECTURE &amp; WORKFLOW PIPELINE</span>
            </div>

            <div className="space-y-2 rounded-xl border border-white/10 bg-[#080808] p-5 font-mono text-xs">
              {project.architectureWorkflow.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 py-1.5 border-b border-white/5 last:border-none">
                  <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-editorial-accent font-bold">
                    STEP 0{idx + 1}
                  </span>
                  <span className="text-editorial-white leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features List */}
          <div className="mt-8">
            <div className="font-mono text-xs tracking-wider text-editorial-subtle uppercase mb-4">
              KEY ARCHITECTURAL HIGHLIGHTS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-xs leading-relaxed text-editorial-subtle"
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-editorial-accent" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Stack Tags */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="font-mono text-xs tracking-wider text-editorial-subtle uppercase mb-3">
              TECHNOLOGY STACK
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-editorial-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

