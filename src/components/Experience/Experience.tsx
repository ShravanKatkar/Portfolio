import React from 'react';
import { motion } from 'framer-motion';

export const Experience: React.FC = () => {
  const experiences = [
    {
      period: '2024 — Present',
      context: 'Independent / AI Engineering',
      role: 'AI Developer & Generative AI Engineer',
      description:
        'Building production-style Generative AI and machine learning systems, including RAG pipelines, LLM integrations, and computer vision applications.',
      bullets: [
        'Built VaultAI offline RAG platform with a FastAPI REST API, local LLM inference, automated ingestion, persistent ChromaDB, and hybrid retrieval (0.9538 Hit@1 and 0.9769 MRR over 195 evaluations; 26/26 tests passing).',
        'Engineered A.L.I.A.S. desktop AI assistant with LLM chat, RAG, voice interaction, memory, and desktop automation evaluated across 274 cases (98.1% response-quality, 98.1% automation accuracy, 90.4% Hit@5, 0 false positives).',
        'Developed CineSense hybrid movie recommendation (+221.8% NDCG@10, +307.5% Recall@10 across 561 users) with in-memory CatalogStore (0.72 ms lookup) and grounded Groq Llama-3.3-70B ReAct assistant (100% candidate-ID validation).',
        'Created CivicMind AI multimodal safety platform cutting hazard assessment latency by 59.7% on CPU, with LRU-cached RAG (<0.01 ms hit, 100% Hit@5 across 35 queries), and 33 backend tests (100% pass, 150 scenarios).'
      ],
      skills: ['Python', 'FastAPI', 'LangChain', 'LangGraph', 'PyTorch', 'ChromaDB', 'Ollama', 'React', 'Docker'],
    },
    {
      period: 'Expected 2027',
      context: 'SPPU / JSPM Pune',
      role: 'Bachelor of Science (B.Sc.) in Computer Science',
      description:
        'Pursuing Bachelor of Science in Computer Science at JSPM’s Rajarshi Shahu Commerce and Science College, affiliated with Savitribai Phule Pune University (SPPU).',
      bullets: [
        'Academic Standing: Maintaining an 8.73 CGPA across computer science foundations, algorithms, operating systems, and database management.',
        'Higher Secondary Certificate (HSC): 76.17% at Shree Samarth Uchha Madhyamik Vidyalay, Pune.',
        'Practical Focus: Local LLM orchestration, hybrid vector-keyword retrieval pipelines, and deterministic AI evaluation frameworks.'
      ],
      skills: ['Python', 'C', 'SQL', 'Data Structures', 'Database Systems', 'Algorithms'],
    },
  ];

  return (
    <section
      id="experience"
      className="relative py-20 sm:py-28 md:py-36 bg-[#09090b] text-[#F4F1EA] border-t border-white/10 overflow-hidden"
    >
      {/* Background Subtle Ember Blur */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[90vw] max-w-[600px] h-[300px] rounded-full opacity-15 pointer-events-none blur-[140px]"
        style={{ backgroundColor: '#FC6B2F' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-[#FC6B2F] inline-block rounded-full" />
            <span className="text-[#FC6B2F] text-xs font-mono font-bold tracking-[0.25em] uppercase">
              EXPERIENCE &amp; JOURNEY
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-[#EAE6E1] tracking-tight leading-[1.1]">
            Where I've Been
          </h2>

          <p className="mt-4 text-xs sm:text-base text-[#8E8C86] max-w-xl leading-relaxed font-light font-mono">
            My academic and engineering journey through production software, RAG systems, and AI research.
          </p>
        </div>

        {/* Experience Timeline Rows in Liquid Glass Cards */}
        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/[0.08] via-[#14141a]/85 to-[#09090d]/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.5)] hover:border-[#FC6B2F]/60 hover:shadow-[0_0_35px_rgba(252,107,47,0.18),0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-400 flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-10 group"
            >
              {/* Liquid Specular Glare */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/[0.02] pointer-events-none" />

              {/* Corner reticles */}
              <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-[#FC6B2F] pointer-events-none" />
              <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-[#FC6B2F] pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-[#FC6B2F] pointer-events-none" />
              <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-[#FC6B2F] pointer-events-none" />

              {/* Left Column: Dates and Organization */}
              <div className="md:w-1/3 flex-shrink-0 z-10">
                <span className="text-xs font-mono text-[#8E8C86] tracking-wider block mb-1">
                  {exp.period}
                </span>
                <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase block font-mono text-[#FC6B2F]">
                  {exp.context}
                </span>
              </div>

              {/* Right Column: Role Description & Bullets */}
              <div className="md:w-2/3 z-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-3 tracking-tight group-hover:text-[#FC6B2F] transition-colors">
                  {exp.role}
                </h3>

                <p className="text-xs sm:text-sm text-[#D4D4D8] leading-relaxed mb-6 font-light">
                  {exp.description}
                </p>

                <ul className="space-y-2.5">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#EAE6E1]/90 font-light">
                      <span className="text-[#FC6B2F] font-bold mt-0.5 text-xs">▸</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills Badges */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 font-mono text-[10px] text-neutral-300 backdrop-blur-md uppercase tracking-wider group-hover:border-[#FC6B2F]/30 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

