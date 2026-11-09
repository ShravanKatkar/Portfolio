import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, Send, Check, Copy, FileDown, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/socials';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-32 bg-[#09090b] text-[#F4F1EA] border-t border-white/10 overflow-hidden"
    >
      {/* Background Radial Ember Vignette */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] h-[350px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(252,107,47,0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FC6B2F]/30 bg-[#FC6B2F]/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FC6B2F]" />
            <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-[#FC6B2F] uppercase">
              GET IN TOUCH
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-[#EAE6E1] tracking-tight leading-[1.15] max-w-3xl mx-auto">
            Let's Create Something Extraordinary
          </h2>

          <p className="mt-4 text-xs sm:text-base text-[#8E8C86] max-w-xl mx-auto leading-relaxed font-mono">
            Have a project in mind, an engineering role, or want to collaborate? Send a message and let's talk.
          </p>
        </div>

        {/* 2-Column Contact Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-stretch">
          {/* Left Column: Contact Details Card */}
          <div className="glass-card p-6 sm:p-10 flex flex-col justify-between lg:col-span-5 relative group">
            {/* Tactile Corner Reticles */}
            <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-[#FC6B2F] pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-[#FC6B2F] pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-[#FC6B2F] pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-[#FC6B2F] pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-6 uppercase tracking-wider">
                Contact Details
              </h3>

              <div className="space-y-6 font-mono">
                {/* Email Item */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#FC6B2F]/10 border border-[#FC6B2F]/20 flex items-center justify-center text-[#FC6B2F] shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-[#8E8C86] uppercase tracking-wider mb-1 font-semibold">
                      Email
                    </p>
                    <button
                      onClick={handleCopyEmail}
                      className="text-xs sm:text-sm text-white hover:text-[#FC6B2F] transition-colors truncate flex items-center gap-2"
                      title="Click to copy email"
                    >
                      <span>{PERSONAL_INFO.email}</span>
                      {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3 text-[#8E8C86]" />}
                    </button>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#FC6B2F]/10 border border-[#FC6B2F]/20 flex items-center justify-center text-[#FC6B2F] shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-[#8E8C86] uppercase tracking-wider mb-1 font-semibold">
                      Location
                    </p>
                    <p className="text-xs sm:text-sm text-[#EAE6E1]">
                      Pune, Maharashtra, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[11px] font-mono text-[#8E8C86] uppercase tracking-wider mb-4 font-semibold">
                  Professional Networks
                </p>
                <div className="flex flex-wrap gap-3 font-mono text-xs">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[#EAE6E1] hover:border-[#FC6B2F] hover:text-white transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[#EAE6E1] hover:border-[#FC6B2F] hover:text-white transition-colors"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Resume Button */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <a
                href={PERSONAL_INFO.resumePath}
                download="Shravan_Katkar_Resume.pdf"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 py-3 font-mono text-xs font-semibold text-white hover:bg-[#FC6B2F] hover:border-[#FC6B2F] transition-all"
              >
                <FileDown className="h-4 w-4" />
                <span>DOWNLOAD CURRICULUM VITAE (PDF)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Direct Message Form */}
          <div className="glass-card p-6 sm:p-10 lg:col-span-7 flex flex-col justify-between relative group">
            {/* Tactile Corner Reticles */}
            <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-[#FC6B2F] pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-[#FC6B2F] pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-[#FC6B2F] pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-[#FC6B2F] pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between h-full">
              <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-6 uppercase tracking-wider">
                Send a Direct Transmission
              </h3>

            {formSubmitted ? (
              <div className="my-auto py-12 flex flex-col items-center justify-center text-center space-y-3 font-mono">
                <div className="w-12 h-12 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Transmission Dispatched</h4>
                <p className="text-xs text-[#8E8C86] max-w-sm">
                  Thank you for reaching out. I will respond to your transmission as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-[#8E8C86] uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-white placeholder:text-[#8E8C86]/50 outline-none focus:border-[#FC6B2F] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#8E8C86] uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-white placeholder:text-[#8E8C86]/50 outline-none focus:border-[#FC6B2F] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-[#8E8C86] uppercase tracking-wider mb-1">
                    Subject / Project Context
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="AI Systems Engineering / Collaboration"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-white placeholder:text-[#8E8C86]/50 outline-none focus:border-[#FC6B2F] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#8E8C86] uppercase tracking-wider mb-1">
                    Message Payload
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, timeline, or engineering opportunity..."
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-white placeholder:text-[#8E8C86]/50 outline-none focus:border-[#FC6B2F] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#FC6B2F] py-3.5 text-xs font-bold tracking-wider text-white hover:bg-[#e0561e] transition-colors shadow-lg shadow-[#FC6B2F]/25"
                >
                  <Send className="h-4 w-4" />
                  <span>TRANSMIT MESSAGE</span>
                </button>
              </form>
            )}
            </div>
          </div>
        </div>

        {/* Minimal Editorial Footer */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8E8C86]">
          <div>
            <span className="text-[#EAE6E1] font-semibold">SHRAVAN KATKAR</span>
            <span className="mx-2">·</span>
            <span>AI ENGINEER</span>
          </div>

          <div className="flex items-center gap-4">
            <span>PUNE, IN</span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#EAE6E1] hover:text-[#FC6B2F] transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
