import React, { useState } from 'react';
import { Award, ExternalLink, Copy, Check, Eye, X, ShieldCheck, Sparkles } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerBadge: string;
  organization: string;
  issuedDate: string;
  duration?: string;
  credentialId?: string;
  verifyUrl?: string;
  image: string;
  description: string;
  skills: string[];
}

export const Certificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const baseUrl = import.meta.env.BASE_URL || '/';

  const certificates: Certificate[] = [
    {
      id: 'udemy-genai',
      title: 'Complete Generative AI Course With Langchain and Huggingface',
      issuer: 'Udemy',
      issuerBadge: 'AI & LLMs',
      organization: 'Krish Naik · KRISHAI Technologies Private Limited',
      issuedDate: 'May 25, 2026',
      duration: '57.5 Total Hours',
      credentialId: 'UC-b7597c6c-214f-469d-a72a-327ae6ab8980',
      verifyUrl: 'https://ude.my/UC-b7597c6c-214f-469d-a72a-327ae6ab8980',
      image: `${baseUrl}assets/udemy-genai.jpg`,
      description: 'Hands-on production mastery of Large Language Models, LangChain orchestration, Hugging Face transformers, vector stores (ChromaDB, FAISS), and fine-tuned RAG architectures.',
      skills: ['Generative AI', 'LangChain', 'Hugging Face', 'RAG Pipelines', 'Vector Databases', 'Llama 3'],
    },
    {
      id: 'hack-the-horizon',
      title: 'Hack The Horizon 2.0 — Finalist & Participant',
      issuer: 'VIT Chennai',
      issuerBadge: 'Hackathon',
      organization: 'AI Club, VIT Chennai & Zuntra Digital',
      issuedDate: 'August 14, 2025',
      duration: '24-Hour National Hackathon',
      image: `${baseUrl}assets/hack-the-horizon.jpg`,
      description: '24-hour national hackathon finalist with CivicMind AI: engineered a multi-modal municipal sanitation worker safety system combining YOLOv8 hazardous anomaly vision and deterministic rule logic.',
      skills: ['Computer Vision', 'YOLOv8', 'Rapid Prototyping', 'FastAPI', 'CivicTech AI', 'System Design'],
    },
    {
      id: 'hackerrank-sql',
      title: 'SQL (Advanced) Skill Certificate',
      issuer: 'HackerRank',
      issuerBadge: 'Databases',
      organization: 'HackerRank Skill Assessment',
      issuedDate: 'May 30, 2026',
      duration: 'Verified Gold Standard',
      credentialId: '384D48F6701E',
      verifyUrl: 'https://www.hackerrank.com/certificates/384d48f6701e',
      image: `${baseUrl}assets/hackerrank-sql.png`,
      description: 'Rigorous benchmark verification covering recursive CTEs, window functions, complex relational joins, subqueries, execution plan optimization, and enterprise database performance.',
      skills: ['Advanced SQL', 'Window Functions', 'Recursive CTEs', 'Query Optimization', 'Database Architecture'],
    },
  ];

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  return (
    <section
      id="certificates"
      className="relative py-20 sm:py-28 md:py-36 bg-[#09090b] text-[#F4F1EA] border-t border-white/10 overflow-hidden"
    >
      {/* Background Subtle Radial Ember Vignette */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[850px] h-[380px] pointer-events-none opacity-20 blur-[130px]"
        style={{ backgroundColor: '#FC6B2F' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-[#FC6B2F] inline-block rounded-full" />
            <span className="text-[#FC6B2F] text-xs font-mono font-bold tracking-[0.25em] uppercase">
              CREDENTIALS &amp; CERTIFICATIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-[#EAE6E1] tracking-tight leading-[1.1]">
            Verified Competencies
          </h2>

          <p className="mt-4 text-xs sm:text-base text-[#8E8C86] max-w-2xl leading-relaxed font-light font-mono">
            Industry credentials, competitive hackathon recognitions, and verified assessments in Generative AI, machine intelligence, and advanced database engineering.
          </p>
        </div>

        {/* 3-Column Liquid Glass Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] via-[#14141a]/85 to-[#09090d]/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.5)] hover:border-[#FC6B2F]/60 hover:shadow-[0_0_35px_rgba(252,107,47,0.2),0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-400 flex flex-col justify-between group"
            >
              {/* Liquid Specular Glare */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/[0.02] pointer-events-none" />

              {/* Corner Reticles */}
              <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-[#FC6B2F] pointer-events-none" />
              <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-[#FC6B2F] pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-[#FC6B2F] pointer-events-none" />
              <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-[#FC6B2F] pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-4">
                {/* Image Preview with Hover Action */}
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/15 bg-black/60 cursor-pointer group/img"
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity" />

                  {/* Expand badge */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 border border-white/20 text-xs font-mono text-white shadow-xl">
                      <Eye className="w-3.5 h-3.5 text-[#FC6B2F]" />
                      <span>EXPAND</span>
                    </span>
                  </div>

                  {/* Floating Issuer Pill */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 border border-white/15 text-[10px] font-mono text-[#FC6B2F] backdrop-blur-md uppercase tracking-wider font-semibold">
                    <Award className="w-3 h-3 text-[#FC6B2F]" />
                    <span>{cert.issuerBadge}</span>
                  </div>
                </div>

                {/* Metadata Row */}
                <div className="flex items-center justify-between text-xs font-mono border-b border-white/10 pb-2.5">
                  <span className="text-[#8E8C86]">{cert.issuedDate}</span>
                  {cert.duration && (
                    <span className="text-[#B5B5B5] bg-white/[0.05] px-2 py-0.5 rounded-full border border-white/10 text-[10px]">
                      {cert.duration}
                    </span>
                  )}
                </div>

                {/* Certificate Title */}
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white tracking-tight leading-snug group-hover:text-[#FC6B2F] transition-colors">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-xs font-mono text-[#FC6B2F]">
                    {cert.organization}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-[#D4D4D8] font-sans leading-relaxed line-clamp-3">
                  {cert.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/15 text-[10px] font-mono text-neutral-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/15 flex items-center justify-between gap-2">
                {cert.credentialId ? (
                  <button
                    onClick={(e) => handleCopyId(cert.credentialId!, e)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-300 hover:text-white transition-colors"
                    title="Click to copy credential ID"
                  >
                    <span className="text-[#8E8C86]">ID:</span>
                    <span className="font-semibold text-white truncate max-w-[110px] sm:max-w-[130px]">
                      {cert.credentialId}
                    </span>
                    {copiedId === cert.credentialId ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#FC6B2F] shrink-0" />
                    )}
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>VERIFIED</span>
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/15 text-[11px] font-mono text-white transition-all flex items-center gap-1"
                  >
                    <span>VIEW</span>
                    <Eye className="w-3 h-3 text-[#FC6B2F]" />
                  </button>

                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full bg-[#FC6B2F]/15 hover:bg-[#FC6B2F] text-[#FC6B2F] hover:text-black border border-[#FC6B2F]/30 transition-all"
                      title="Verify Certificate at Issuer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── FULLSCREEN LIGHTBOX MODAL ─── */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-fadeIn"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-white/[0.09] via-[#14141a]/95 to-[#09090d]/98 border border-white/20 p-5 sm:p-7 shadow-[0_30px_80px_rgba(0,0,0,0.95)] flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FC6B2F]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FC6B2F]">
                  {selectedCert.issuer} // {selectedCert.issuerBadge}
                </span>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-1.5 rounded-lg border border-white/15 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Image Frame */}
            <div className="relative w-full overflow-hidden rounded-xl border border-white/20 bg-black/60 shadow-inner">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-full h-auto max-h-[65vh] object-contain mx-auto"
              />
            </div>

            {/* Modal Footer Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
              <div>
                <h4 className="text-base sm:text-lg font-display font-bold text-white">
                  {selectedCert.title}
                </h4>
                <p className="text-xs font-mono text-neutral-400">
                  {selectedCert.organization} · {selectedCert.issuedDate}
                </p>
              </div>

              {selectedCert.verifyUrl && (
                <a
                  href={selectedCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FC6B2F] hover:bg-[#ff8544] text-[#09090b] font-mono font-bold text-xs uppercase transition-all shadow-[0_10px_20px_rgba(252,107,47,0.3)] shrink-0"
                >
                  <span>OFFICIAL VERIFY</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;

