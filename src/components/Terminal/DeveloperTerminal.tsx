import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, CornerDownLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/socials';

interface TerminalLog {
  id: string;
  type: 'in' | 'out' | 'sys' | 'success';
  text: string;
}

export const DeveloperTerminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: '0',
      type: 'sys',
      text: 'Shravan Katkar AI Terminal [Version 2.0.0] — Initialized in Pune, India.\nType "help" or select a chip below to query system architectures.'
    }
  ]);
  const logEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newLogs: TerminalLog[] = [
      ...logs,
      { id: Date.now().toString(), type: 'in', text: `$ ${cmd}` }
    ];

    switch (trimmed) {
      case 'help':
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'out',
          text: `AVAILABLE COMMANDS:\n  • projects      - List all engineered AI systems\n  • alias         - Flagship desktop assistant details\n  • cinesense     - Cinema recommendation & ReAct agent\n  • codeguard     - Multi-agent PR review & QLoRA model\n  • vaultai       - Privacy-first offline RAG suite\n  • stack         - Inspect core programming & AI framework stack\n  • contact       - Direct contact channels & verified coordinates\n  • resume        - Trigger Curriculum Vitae download\n  • sudo hire shravan - Fast-track interview & collaboration offer\n  • clear         - Flush terminal log buffer`
        });
        break;

      case 'projects':
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'out',
          text: `SHIPPED PRODUCTION & RESEARCH SYSTEMS:\n  [01] A.L.I.A.S.   - Windows Desktop AI Assistant (FastAPI, React, Groq, SQLite)\n  [02] CineSense   - 10K+ Hybrid RecSys + 0% Hallucination ReAct Agent (Groq, pgvector)\n  [03] CodeGuard   - Multi-Agent PR Review with fine-tuned QLoRA Llama 3.1 8B\n  [04] VaultAI     - 100% Offline RAG Document Intelligence (Ollama, ChromaDB)\n  [05] CivicMind   - Computer Vision Sanitation Worker Safety Platform\n  [06] TransitAI   - Distributed Fleet Telemetry & Haversine Anti-Fraud\n  [07] NeuroPersona- LSTM Sequence Emotional Personality Analytics\n  [08] IronFit     - Production Web Application at ironfitgym.online`
        });
        break;

      case 'alias':
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'out',
          text: `PROJECT A.L.I.A.S. (FLAGSHIP):\n  • Desktop AI assistant with real-time Speech-to-Text & Text-to-Speech\n  • Multi-model dynamic router: Groq, Gemini, OpenAI, DeepSeek\n  • SQLite persistent memory preserving cross-session conversation states\n  • Context-aware window inspector analyzing active VS Code buffers & browsers\n  • Repository: https://github.com/ShravanKatkar/A.L.I.A.S.---Advanced-Logical-Interface-and-Assistant-System`
        });
        break;

      case 'cinesense':
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'out',
          text: `PROJECT CINESENSE:\n  • 2-stage hybrid recsys over 10K+ titles fusing ALS (64 factors) with kNN embeddings\n  • Autonomous Groq Llama 3.3 70B ReAct Agent with 0% hallucination whitelist grounding\n  • Dual-tier Redis 7 + PostgreSQL 16 pgvector cache\n  • Live Demo: https://cinesense-app.onrender.com/`
        });
        break;

      case 'codeguard':
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'out',
          text: `PROJECT CODEGUARD:\n  • Autonomous multi-agent review orchestrated via LangGraph parallel state graphs\n  • Fine-tuned QLoRA Security model (Llama 3.1 8B): +2.3% recall, 61% lower latency\n  • Codebase RAG indexing AST function and class hierarchies\n  • Live Demo: https://codeguard-bm3d38xaaeqhvxppuhcbgv.streamlit.app/`
        });
        break;

      case 'vaultai':
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'out',
          text: `PROJECT VAULTAI:\n  • 100% on-device offline RAG: Zero bytes transmitted to cloud\n  • Ingestion for PDF, TXT, and Markdown with recursive chunking\n  • ChromaDB vector index with local Ollama runtime (Llama 3, Phi-3, Mistral)\n  • Live Demo: https://vault-ai-gamma.vercel.app/`
        });
        break;

      case 'stack':
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'out',
          text: `CORE TECHNICAL STACK:\n  • AI & ML: Generative AI, LLMs, RAG, AI Agents, Prompt Engineering\n  • Frameworks: LangChain, LangGraph, PyTorch, ChromaDB, Hugging Face, Groq\n  • Languages: Python (Expert), Java, C/C++, SQL, TypeScript\n  • Backend: FastAPI, Uvicorn, Spring Boot, WebSockets, REST APIs\n  • Frontend: React 19, Tailwind CSS, Vite, Framer Motion\n  • Storage: PostgreSQL (pgvector), Redis, ChromaDB, SQLite, MySQL`
        });
        break;

      case 'contact':
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'out',
          text: `VERIFIED CONTACT DETAILS:\n  • Name: Shravan Suresh Katkar\n  • Location: Pune, India\n  • Email: ${PERSONAL_INFO.email}\n  • Mobile: ${PERSONAL_INFO.phone}\n  • GitHub: ${PERSONAL_INFO.github}\n  • LinkedIn: ${PERSONAL_INFO.linkedin}`
        });
        break;

      case 'resume':
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'success',
          text: `Triggering Curriculum Vitae download for Shravan Katkar...`
        });
        const link = document.createElement('a');
        link.href = PERSONAL_INFO.resumePath;
        link.download = 'Shravan_Katkar_Resume.pdf';
        link.click();
        break;

      case 'sudo hire shravan':
      case 'hire':
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'success',
          text: `[ROOT ACCESS GRANTED]\n✓ Candidate profile verified: Shravan Katkar (AI Engineer).\n✓ Immediate status: AVAILABLE FOR OPPORTUNITIES.\n✓ Next step: Dispatch invitation to ${PERSONAL_INFO.email} or call ${PERSONAL_INFO.phone}.`
        });
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      default:
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'out',
          text: `Command not recognized: "${cmd}". Type "help" to display valid commands.`
        });
        break;
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  return (
    <>
      {/* Floating Terminal Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-white/15 bg-[#0D0D0F]/90 px-4 py-2 font-mono text-xs text-editorial-white shadow-2xl backdrop-blur-xl transition-all hover:border-editorial-accent hover:bg-editorial-accent hover:text-black group"
        aria-label="Open developer terminal"
      >
        <span className="font-bold text-editorial-accent group-hover:text-black">›_</span>
        <span>ask shravan</span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </button>

      {/* Terminal Dialog Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9992] flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Terminal Window */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex h-[85vh] sm:h-[600px] w-full max-w-2xl flex-col rounded-t-2xl sm:rounded-2xl border border-white/20 bg-[#09090B] shadow-2xl shadow-black font-mono text-xs text-editorial-white overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-[#121214] px-4 py-3 select-none">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block cursor-pointer" onClick={() => setIsOpen(false)} />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="ml-3 text-[11px] text-editorial-subtle">
                    shravan@portfolio ~ bash [AI Daemon]
                  </span>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded p-1 text-editorial-subtle hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Logs Screen */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 leading-relaxed">
                {logs.map((log) => (
                  <div key={log.id}>
                    {log.type === 'in' ? (
                      <div className="text-editorial-accent font-semibold">{log.text}</div>
                    ) : log.type === 'success' ? (
                      <div className="text-emerald-400 whitespace-pre-wrap">{log.text}</div>
                    ) : log.type === 'sys' ? (
                      <div className="text-editorial-muted whitespace-pre-wrap">{log.text}</div>
                    ) : (
                      <div className="text-editorial-white/90 whitespace-pre-wrap">{log.text}</div>
                    )}
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>

              {/* Preset Quick Chips */}
              <div className="flex flex-wrap items-center gap-1.5 border-t border-white/5 bg-[#0C0C0E] px-4 py-2">
                <span className="text-[10px] text-editorial-muted mr-1">QUICK CHIPS:</span>
                {['help', 'projects', 'alias', 'codeguard', 'stack', 'contact', 'sudo hire shravan'].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => executeCommand(chip)}
                    className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-editorial-subtle hover:border-editorial-accent/60 hover:bg-editorial-accent/15 hover:text-editorial-white transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Input Command Line */}
              <div className="flex items-center gap-2 border-t border-white/10 bg-[#121214] px-4 py-3">
                <span className="text-editorial-accent font-bold">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type a command (e.g. projects, alias, contact)..."
                  className="flex-1 bg-transparent font-mono text-xs text-editorial-white outline-none placeholder:text-editorial-muted/50"
                  autoFocus
                />
                <button
                  onClick={() => executeCommand(inputVal)}
                  className="rounded p-1 text-editorial-subtle hover:text-white"
                >
                  <CornerDownLeft className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

